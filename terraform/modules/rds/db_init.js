// Database initialization script for NEWTUBE
// Sets up pgvector extension and initial schema

const { Client } = require('pg');

exports.handler = async (event, context) => {
  const client = new Client({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Create pgvector extension
    await client.query('CREATE EXTENSION IF NOT EXISTS vector;');
    console.log('pgvector extension created/verified');

    // Create uuid extension
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    console.log('uuid-ossp extension created/verified');

    // Create basic table for testing vector functionality
    await client.query(`
      CREATE TABLE IF NOT EXISTS vector_test (
        id SERIAL PRIMARY KEY,
        content TEXT,
        embedding VECTOR(1536),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Test table created/verified');

    // Create index for vector similarity search
    await client.query(`
      CREATE INDEX IF NOT EXISTS vector_test_embedding_idx 
      ON vector_test USING hnsw (embedding vector_cosine_ops);
    `);
    console.log('Vector index created/verified');

    // Verify pgvector functionality
    const testResult = await client.query(`
      SELECT 1 as test, '[1,2,3]'::vector as sample_vector;
    `);
    console.log('pgvector functionality verified:', testResult.rows[0]);

    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Database initialization completed successfully',
        extensions: ['vector', 'uuid-ossp'],
        tables: ['vector_test'],
        indexes: ['vector_test_embedding_idx']
      })
    };

  } catch (error) {
    console.error('Database initialization error:', error);
    
    try {
      await client.end();
    } catch (e) {
      console.error('Error closing connection:', e);
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Database initialization failed',
        error: error.message
      })
    };
  }
};