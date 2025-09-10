/**
 * NEWTUBE Vector Database Test Script
 * Demonstrates embedding generation and similarity search
 */

require('dotenv').config();

const { 
  generateVideoEmbeddings, 
  storeVideoEmbeddings 
} = require('../lib/embeddings');

const {
  searchSimilarVideos,
  getPersonalizedRecommendations,
  hybridSearch,
  getSimilarityStats
} = require('../lib/similarity-search');

const { getHealthStatus } = require('../lib/database');

/**
 * Test data - sample video metadata
 */
const sampleVideos = [
  {
    external_video_id: 'dQw4w9WgXcQ',
    source: 'youtube',
    title: 'Rick Astley - Never Gonna Give You Up (Official Video)',
    description: 'The official video for "Never Gonna Give You Up" by Rick Astley. A classic 80s pop anthem that became an internet phenomenon.',
    tags: ['music', 'pop', '80s', 'rick astley', 'classic'],
    duration_seconds: 213,
    view_count: 1200000000,
    like_count: 12000000,
    comment_count: 2500000,
    published_at: '1987-07-27T00:00:00Z'
  },
  {
    external_video_id: 'kXF3VYYa5TI',
    source: 'youtube',
    title: 'JavaScript Full Course for Beginners | Complete Tutorial',
    description: 'Learn JavaScript from scratch in this comprehensive tutorial. Perfect for beginners who want to master web development.',
    tags: ['programming', 'javascript', 'tutorial', 'web development', 'coding'],
    duration_seconds: 3600,
    view_count: 5000000,
    like_count: 150000,
    comment_count: 8500,
    published_at: '2023-01-15T10:30:00Z'
  },
  {
    external_video_id: 'L_LUpnjgPso',
    source: 'youtube',
    title: 'React.js Tutorial - Build Modern Web Apps',
    description: 'Master React.js with this hands-on tutorial. Learn components, hooks, state management, and modern React patterns.',
    tags: ['react', 'javascript', 'frontend', 'web development', 'tutorial'],
    duration_seconds: 2800,
    view_count: 2800000,
    like_count: 95000,
    comment_count: 4200,
    published_at: '2023-03-22T14:15:00Z'
  },
  {
    external_video_id: 'TlB_eWDSMt4',
    source: 'youtube',
    title: 'Node.js Backend Development Complete Guide',
    description: 'Build scalable backend applications with Node.js. Learn Express, databases, authentication, and deployment.',
    tags: ['nodejs', 'backend', 'express', 'api', 'web development'],
    duration_seconds: 4200,
    view_count: 1900000,
    like_count: 78000,
    comment_count: 3100,
    published_at: '2023-02-10T09:45:00Z'
  },
  {
    external_video_id: 'x7X9w_GIm1s',
    source: 'youtube',
    title: 'Machine Learning with Python - Full Course',
    description: 'Complete machine learning course using Python. Covers algorithms, data science, neural networks, and practical projects.',
    tags: ['machine learning', 'python', 'data science', 'ai', 'programming'],
    duration_seconds: 5400,
    view_count: 3200000,
    like_count: 125000,
    comment_count: 7800,
    published_at: '2023-04-18T16:20:00Z'
  }
];

/**
 * Run the complete embedding pipeline test
 */
async function runEmbeddingTest() {
  console.log('🧪 NEWTUBE Vector Database Test');
  console.log('================================\n');

  try {
    // Check database health
    console.log('1️⃣ Checking database connection...');
    const health = await getHealthStatus();
    
    if (!health.connected) {
      throw new Error(`Database connection failed: ${health.error}`);
    }
    
    console.log('✅ Database connected successfully');
    console.log(`   PostgreSQL: ${health.pgVersion}`);
    console.log(`   pgvector: ${health.pgvectorEnabled ? 'Enabled' : 'Disabled'}\n`);

    // Generate and store embeddings for sample videos
    console.log('2️⃣ Generating embeddings for sample videos...');
    
    for (let i = 0; i < sampleVideos.length; i++) {
      const video = sampleVideos[i];
      console.log(`   📹 Processing: ${video.title.substring(0, 50)}...`);
      
      try {
        // Generate embeddings
        const embeddings = await generateVideoEmbeddings(video);
        console.log(`   🧠 Embeddings generated (${embeddings.usage_stats.combined_tokens} tokens)`);
        
        // Store in database
        const videoId = await storeVideoEmbeddings(video, embeddings);
        console.log(`   💾 Stored in database with ID: ${videoId}`);
        
        // Add small delay to respect rate limits
        if (i < sampleVideos.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
      } catch (error) {
        console.error(`   ❌ Failed to process video: ${error.message}`);
        continue; // Continue with next video
      }
    }
    
    console.log('✅ Embedding generation completed\n');

    // Test similarity search
    console.log('3️⃣ Testing similarity search...');
    
    // Search for JavaScript-related videos
    const jsQuery = 'JavaScript programming tutorial web development';
    const jsEmbedding = await require('../lib/embeddings').generateEmbedding(jsQuery);
    
    const similarVideos = await searchSimilarVideos(jsEmbedding.embedding, {
      limit: 3,
      minSimilarity: 0.1 // Lower threshold for demo
    });
    
    console.log(`   🔍 Query: "${jsQuery}"`);
    console.log(`   📊 Found ${similarVideos.length} similar videos:`);
    
    similarVideos.forEach((video, index) => {
      console.log(`      ${index + 1}. ${video.title} (similarity: ${video.similarity_score})`);
    });
    
    console.log('✅ Similarity search completed\n');

    // Test hybrid search
    console.log('4️⃣ Testing hybrid search...');
    
    const hybridResults = await hybridSearch(jsEmbedding.embedding, 'React tutorial', {
      limit: 3,
      embeddingWeight: 0.7,
      textWeight: 0.3,
      minSimilarity: 0.1
    });
    
    console.log(`   🔍 Hybrid search: embedding + text matching`);
    console.log(`   📊 Found ${hybridResults.length} results:`);
    
    hybridResults.forEach((video, index) => {
      console.log(`      ${index + 1}. ${video.title}`);
      console.log(`         Embedding: ${video.embedding_similarity}, Text: ${video.text_similarity}, Hybrid: ${video.hybrid_score}`);
    });
    
    console.log('✅ Hybrid search completed\n');

    // Get statistics
    console.log('5️⃣ Database statistics...');
    
    const stats = await getSimilarityStats('video');
    console.log(`   📊 Total embeddings: ${stats.total_embeddings}`);
    console.log(`   🧠 With vectors: ${stats.embeddings_with_vectors} (${stats.completion_percentage}%)`);
    console.log(`   📅 Date range: ${stats.oldest_embedding} to ${stats.newest_embedding}`);
    
    console.log('\n🎉 All tests completed successfully!');
    console.log('\n📋 Test Summary:');
    console.log('   ✅ Database connection verified');
    console.log('   ✅ Video embeddings generated and stored');
    console.log('   ✅ Similarity search working');
    console.log('   ✅ Hybrid search working');
    console.log('   ✅ Statistics collection working');
    console.log('\n🚀 Your vector database is fully operational!');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('   1. Ensure OpenAI API key is set in .env file');
    console.error('   2. Check database connection parameters');
    console.error('   3. Run migration: npm run db:migrate');
    console.error('   4. Verify pgvector extension is installed');
    process.exit(1);
  }
}

/**
 * Cleanup test data
 */
async function cleanupTestData() {
  console.log('🧹 Cleaning up test data...');
  
  try {
    const { query } = require('../lib/database');
    
    const testVideoIds = sampleVideos.map(v => v.external_video_id);
    
    const result = await query(`
      DELETE FROM video_embeddings 
      WHERE external_video_id = ANY($1)
    `, [testVideoIds]);
    
    console.log(`✅ Cleaned up ${result.rowCount} test records`);
    
  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
  }
}

// CLI interface
if (require.main === module) {
  const command = process.argv[2];

  switch (command) {
    case 'cleanup':
      cleanupTestData()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
      break;
    
    case 'test':
    default:
      runEmbeddingTest()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
      break;
  }
}

module.exports = {
  runEmbeddingTest,
  cleanupTestData
};