/**
 * NEWTUBE Vector Database Connection and Management
 * Handles PostgreSQL with pgvector extension
 */

const { Pool } = require('pg');
const pgvector = require('pgvector');

// Register pgvector types with node-postgres
pgvector.registerTypes(require('pg'));

/**
 * Database configuration with optimized settings for vector operations
 */
const createPool = () => {
  const config = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'newtube',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    
    // Connection pool configuration optimized for vector operations
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 10000, // Return an error after 10 seconds if connection could not be established
    
    // Performance optimizations for pgvector
    statement_timeout: 60000, // 60 second timeout for vector operations
    query_timeout: 60000,
    
    // Additional PostgreSQL configuration for vector operations
    // These can be overridden via environment variables
    options: `-c maintenance_work_mem=${process.env.DB_MAINTENANCE_WORK_MEM || '1GB'}`
  };

  // SSL configuration for production
  if (process.env.NODE_ENV === 'production' || process.env.DB_SSL === 'true') {
    config.ssl = {
      rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false'
    };
  }

  return new Pool(config);
};

// Global pool instance
let pool = null;

/**
 * Get or create database pool
 */
const getPool = () => {
  if (!pool) {
    pool = createPool();
    
    // Handle pool errors
    pool.on('error', (err) => {
      console.error('Unexpected error on idle client:', err);
      process.exit(-1);
    });
  }
  return pool;
};

/**
 * Execute a query with proper error handling
 */
const query = async (text, params) => {
  const client = getPool();
  const start = Date.now();
  
  try {
    const result = await client.query(text, params);
    const duration = Date.now() - start;
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Executed query:', { text: text.substring(0, 100), duration, rows: result.rowCount });
    }
    
    return result;
  } catch (error) {
    console.error('Database query error:', {
      error: error.message,
      query: text.substring(0, 100),
      params: params ? params.slice(0, 3) : null // Log first 3 params only for security
    });
    throw error;
  }
};

/**
 * Execute a transaction with multiple queries
 */
const transaction = async (queries) => {
  const client = await getPool().connect();
  
  try {
    await client.query('BEGIN');
    
    const results = [];
    for (const { text, params } of queries) {
      const result = await client.query(text, params);
      results.push(result);
    }
    
    await client.query('COMMIT');
    return results;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Transaction error:', error);
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Check if pgvector extension is available
 */
const checkPgVectorExtension = async () => {
  try {
    const result = await query(`
      SELECT EXISTS(
        SELECT 1 FROM pg_extension 
        WHERE extname = 'vector'
      ) as extension_exists
    `);
    
    return result.rows[0].extension_exists;
  } catch (error) {
    console.error('Error checking pgvector extension:', error);
    return false;
  }
};

/**
 * Get database health status including vector extension
 */
const getHealthStatus = async () => {
  try {
    const [pgVersionResult, vectorExtensionResult, connectionResult] = await Promise.all([
      query('SELECT version()'),
      checkPgVectorExtension(),
      query('SELECT 1 as connection_test')
    ]);
    
    return {
      connected: true,
      pgVersion: pgVersionResult.rows[0].version,
      pgvectorEnabled: vectorExtensionResult,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      connected: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
};

/**
 * Format vector for SQL insertion using pgvector.toSql()
 */
const vectorToSql = (embedding) => {
  if (!embedding || !Array.isArray(embedding)) {
    throw new Error('Embedding must be a non-empty array');
  }
  
  if (embedding.length !== 1536) {
    throw new Error('Embedding must be 1536 dimensions for OpenAI text-embedding-3-small');
  }
  
  return pgvector.toSql(embedding);
};

/**
 * Calculate cosine similarity between two vectors using SQL
 */
const cosineSimilarity = async (vector1, vector2) => {
  const result = await query(`
    SELECT (1 - ($1 <=> $2)) as similarity
  `, [vectorToSql(vector1), vectorToSql(vector2)]);
  
  return result.rows[0].similarity;
};

/**
 * Gracefully close database connections
 */
const close = async () => {
  if (pool) {
    await pool.end();
    pool = null;
  }
};

// Graceful shutdown
process.on('SIGINT', close);
process.on('SIGTERM', close);

module.exports = {
  query,
  transaction,
  getPool,
  checkPgVectorExtension,
  getHealthStatus,
  vectorToSql,
  cosineSimilarity,
  close
};