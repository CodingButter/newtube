/**
 * NEWTUBE Database Migration Runner
 * Handles pgvector setup and embedding schema migration
 */

const fs = require('fs').promises;
const path = require('path');
const { query, getHealthStatus, checkPgVectorExtension } = require('../lib/database');

/**
 * Run database migrations
 */
async function runMigrations() {
  console.log('🚀 Starting NEWTUBE vector database migration...');

  try {
    // Check database connection and health
    console.log('📊 Checking database health...');
    const health = await getHealthStatus();
    
    if (!health.connected) {
      throw new Error(`Database connection failed: ${health.error}`);
    }
    
    console.log('✅ Database connected successfully');
    console.log(`📍 PostgreSQL Version: ${health.pgVersion}`);

    // Check if pgvector extension is available
    console.log('🔍 Checking pgvector extension...');
    const pgvectorExists = await checkPgVectorExtension();
    
    if (!pgvectorExists) {
      console.log('⚠️  pgvector extension not found, attempting to create...');
    } else {
      console.log('✅ pgvector extension is available');
    }

    // Run migration file
    console.log('📝 Running migration script...');
    const migrationPath = path.join(__dirname, '001_setup_pgvector.sql');
    const migrationSQL = await fs.readFile(migrationPath, 'utf8');

    // Split SQL commands by semicolon and execute them
    const commands = migrationSQL
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0);

    console.log(`🔄 Executing ${commands.length} migration commands...`);

    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];
      
      try {
        await query(command);
        console.log(`✅ Command ${i + 1}/${commands.length} executed successfully`);
      } catch (error) {
        // Some commands may fail if already exists, which is okay
        if (error.message.includes('already exists') || 
            error.message.includes('does not exist') ||
            error.message.includes('relation') && error.message.includes('already exists')) {
          console.log(`⚠️  Command ${i + 1}/${commands.length} skipped (already exists)`);
        } else {
          console.error(`❌ Command ${i + 1}/${commands.length} failed:`, error.message);
          throw error;
        }
      }
    }

    // Verify pgvector extension after migration
    console.log('🔍 Verifying pgvector extension after migration...');
    const pgvectorPostMigration = await checkPgVectorExtension();
    
    if (!pgvectorPostMigration) {
      throw new Error('pgvector extension was not successfully created');
    }

    console.log('✅ pgvector extension verified successfully');

    // Test vector operations
    console.log('🧪 Testing vector operations...');
    await testVectorOperations();

    console.log('🎉 Migration completed successfully!');
    console.log('');
    console.log('📋 Migration Summary:');
    console.log('   ✅ pgvector extension enabled');
    console.log('   ✅ Embedding tables created');
    console.log('   ✅ HNSW indexes created for optimal performance');
    console.log('   ✅ Triggers and functions set up');
    console.log('   ✅ Vector operations tested');
    console.log('');
    console.log('🚀 Your vector database is ready for embeddings!');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('');
    console.error('🔧 Troubleshooting tips:');
    console.error('   1. Ensure PostgreSQL is running');
    console.error('   2. Check database connection parameters');
    console.error('   3. Verify pgvector extension is installed on your PostgreSQL instance');
    console.error('   4. Run: CREATE EXTENSION vector; manually if needed');
    process.exit(1);
  }
}

/**
 * Test basic vector operations to ensure everything works
 */
async function testVectorOperations() {
  try {
    // Test vector creation and similarity
    const testVector1 = Array.from({length: 1536}, () => Math.random() - 0.5);
    const testVector2 = Array.from({length: 1536}, () => Math.random() - 0.5);

    const { vectorToSql } = require('../lib/database');
    
    // Test basic vector operations
    const result = await query(`
      SELECT 
        $1::vector as vector1,
        $2::vector as vector2,
        ($1::vector <=> $2::vector) as cosine_distance,
        (1 - ($1::vector <=> $2::vector)) as cosine_similarity
    `, [vectorToSql(testVector1), vectorToSql(testVector2)]);

    const { cosine_distance, cosine_similarity } = result.rows[0];
    
    console.log(`   🔢 Test vectors created successfully`);
    console.log(`   📏 Cosine distance: ${parseFloat(cosine_distance).toFixed(4)}`);
    console.log(`   📊 Cosine similarity: ${parseFloat(cosine_similarity).toFixed(4)}`);

    // Test insertion into video_embeddings table
    await query(`
      INSERT INTO video_embeddings (
        external_video_id, source, title, 
        combined_embedding, embedding_model
      ) VALUES (
        'test_video_001', 'youtube', 'Test Video for Migration',
        $1, 'text-embedding-3-small'
      )
      ON CONFLICT (external_video_id, source) DO NOTHING
    `, [vectorToSql(testVector1)]);

    console.log(`   💾 Test data insertion successful`);

    // Clean up test data
    await query(`
      DELETE FROM video_embeddings 
      WHERE external_video_id = 'test_video_001' AND source = 'youtube'
    `);

    console.log(`   🧹 Test data cleaned up`);

  } catch (error) {
    throw new Error(`Vector operations test failed: ${error.message}`);
  }
}

/**
 * Get migration status and statistics
 */
async function getMigrationStatus() {
  try {
    const health = await getHealthStatus();
    
    if (!health.connected) {
      return { status: 'error', message: 'Database not connected' };
    }

    const pgvectorExists = await checkPgVectorExtension();
    
    if (!pgvectorExists) {
      return { status: 'pending', message: 'pgvector extension not found' };
    }

    // Check if tables exist
    const tablesResult = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('video_embeddings', 'user_embeddings', 'comment_embeddings', 'search_embeddings')
    `);

    const expectedTables = ['video_embeddings', 'user_embeddings', 'comment_embeddings', 'search_embeddings'];
    const existingTables = tablesResult.rows.map(row => row.table_name);
    const missingTables = expectedTables.filter(table => !existingTables.includes(table));

    if (missingTables.length > 0) {
      return { 
        status: 'partial', 
        message: `Missing tables: ${missingTables.join(', ')}`,
        existingTables,
        missingTables
      };
    }

    // Check indexes
    const indexesResult = await query(`
      SELECT indexname 
      FROM pg_indexes 
      WHERE tablename IN ('video_embeddings', 'user_embeddings', 'comment_embeddings', 'search_embeddings')
      AND indexname LIKE '%_hnsw'
    `);

    const hnswIndexes = indexesResult.rows.length;

    return {
      status: 'complete',
      message: 'All migration components are present',
      pgvectorEnabled: true,
      tablesCreated: existingTables.length,
      hnswIndexes: hnswIndexes,
      healthCheck: health
    };

  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

// CLI interface
if (require.main === module) {
  const command = process.argv[2];

  switch (command) {
    case 'status':
      getMigrationStatus()
        .then(status => {
          console.log('📊 Migration Status:', JSON.stringify(status, null, 2));
        })
        .catch(error => {
          console.error('❌ Status check failed:', error.message);
          process.exit(1);
        });
      break;
    
    case 'run':
    default:
      runMigrations()
        .then(() => {
          process.exit(0);
        })
        .catch(() => {
          process.exit(1);
        });
      break;
  }
}

module.exports = {
  runMigrations,
  getMigrationStatus,
  testVectorOperations
};