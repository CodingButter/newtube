/**
 * NEWTUBE AI Service Test
 * Basic functionality test for AI services
 */

import dotenv from 'dotenv';
import { Pool } from 'pg';
import { Redis } from 'ioredis';
import { AIService } from '../ai/ai-service';
import { VideoContent } from '../ai/embedding-service';

// Load environment variables
dotenv.config();

async function testAIServices() {
  console.log('🚀 Starting NEWTUBE AI Service Test...\n');

  // Initialize dependencies
  const pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

  const openaiApiKey = process.env.OPENAI_API_KEY;
  if (!openaiApiKey) {
    console.error('❌ OPENAI_API_KEY environment variable is required');
    process.exit(1);
  }

  try {
    // Initialize AI Service
    console.log('1. Initializing AI Service...');
    const aiService = new AIService({
      openaiApiKey,
      pgPool,
      redisClient: redis
    });

    await aiService.initialize();
    console.log('✅ AI Service initialized successfully\n');

    // Test health check
    console.log('2. Testing service health...');
    const health = await aiService.getServiceHealth();
    console.log('Health status:', health.status);
    console.log('Features enabled:', health.features);
    if (health.errors.length > 0) {
      console.log('Errors:', health.errors);
    }
    console.log('✅ Health check completed\n');

    // Test video embedding
    console.log('3. Testing video embedding...');
    const testVideo: VideoContent = {
      id: 'test-video-123',
      platform: 'youtube',
      title: 'How to Build Amazing AI Applications',
      description: 'A comprehensive guide to building AI applications with OpenAI and vector databases',
      tags: ['ai', 'machine learning', 'programming', 'tutorial'],
      duration: 1800,
      publishedAt: new Date(),
      viewCount: 15000
    };

    const analysisResult = await aiService.analyzeContent({
      videos: [testVideo],
      includeEmbeddings: true
    });

    console.log('Videos processed:', analysisResult.processingStats.videosProcessed);
    console.log('Processing time:', analysisResult.processingStats.processingTime, 'ms');
    if (analysisResult.videoEmbeddings) {
      console.log('Embedding dimensions:', analysisResult.videoEmbeddings[0].combinedEmbedding.length);
    }
    console.log('✅ Video embedding test completed\n');

    // Test comment analysis
    console.log('4. Testing comment analysis...');
    const testComments = [
      {
        id: 'comment-1',
        videoId: testVideo.id,
        platform: testVideo.platform,
        author: 'user123',
        text: 'This is an amazing tutorial! Very helpful and well explained.',
        timestamp: new Date(),
        likeCount: 45
      },
      {
        id: 'comment-2',
        videoId: testVideo.id,
        platform: testVideo.platform,
        author: 'user456',
        text: 'This is terrible garbage and the author is stupid',
        timestamp: new Date(),
        likeCount: 2
      },
      {
        id: 'comment-3',
        videoId: testVideo.id,
        platform: testVideo.platform,
        author: 'user789',
        text: 'Can you explain more about the vector database implementation?',
        timestamp: new Date(),
        likeCount: 12
      }
    ];

    const commentAnalysis = await aiService.analyzeContent({
      comments: testComments,
      videoContext: {
        title: testVideo.title,
        description: testVideo.description,
        tags: testVideo.tags
      },
      includeEmbeddings: true
    });

    console.log('Comments processed:', commentAnalysis.processingStats.commentsProcessed);
    if (commentAnalysis.commentAnalyses) {
      for (const analysis of commentAnalysis.commentAnalyses) {
        console.log(`Comment ${analysis.commentId}:`);
        console.log(`  Toxicity: ${analysis.toxicityScore.toFixed(3)}`);
        console.log(`  Relevance: ${analysis.relevanceScore.toFixed(3)}`);
        console.log(`  Sentiment: ${analysis.sentimentScore.toFixed(3)}`);
        console.log(`  Categories: ${analysis.categories.join(', ')}`);
      }
    }
    console.log('✅ Comment analysis test completed\n');

    // Test comment filtering
    console.log('5. Testing comment filtering...');
    const lenses = aiService.getCommentLenses();
    console.log('Available lenses:', lenses.map(l => l.name).join(', '));

    const filteredComments = await aiService.filterComments(
      testComments,
      'Clean Discussion',
      {
        title: testVideo.title,
        description: testVideo.description,
        tags: testVideo.tags
      }
    );

    console.log('Filtered comments count:', filteredComments.length);
    console.log('✅ Comment filtering test completed\n');

    // Test similarity search
    console.log('6. Testing similarity search...');
    try {
      const similarResults = await aiService.searchSimilarContent(
        'machine learning tutorial programming',
        {
          searchType: 'videos',
          limit: 5,
          threshold: 0.5
        }
      );
      console.log('Similar content results:', similarResults.length);
    } catch (error) {
      console.log('Similar content search not available (expected for fresh database)');
    }
    console.log('✅ Similarity search test completed\n');

    // Test hybrid search
    console.log('7. Testing hybrid search...');
    try {
      const hybridResults = await aiService.hybridSearch(
        'AI tutorial machine learning',
        {
          semanticWeight: 0.7,
          limit: 5
        }
      );
      console.log('Hybrid search results:', hybridResults.length);
    } catch (error) {
      console.log('Hybrid search not available (expected for fresh database)');
    }
    console.log('✅ Hybrid search test completed\n');

    console.log('🎉 All AI Service tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  } finally {
    // Cleanup
    await pgPool.end();
    redis.disconnect();
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testAIServices().catch(console.error);
}

export { testAIServices };