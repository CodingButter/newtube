/**
 * NEWTUBE Embeddings Module
 * Main exports for the video embedding pipeline and similarity search system
 */

// Core processors and pipeline
export { videoEmbeddingProcessor } from './processor';
export type { VideoMetadata, ProcessedVideoEmbedding, ProcessingResult } from './processor';
export { videoEmbeddingPipeline } from './pipeline';
export type { PipelineOptions, PipelineResult, IncrementalUpdateResult } from './pipeline';

// Providers and models
export { 
  embeddingProviderManager, 
  OpenAIEmbeddingProvider
} from './providers';
export type {
  EmbeddingProvider,
  EmbeddingRequest,
  EmbeddingResult,
  BatchEmbeddingResult 
} from './providers';

// Database operations
export { vectorDatabaseManager } from './database';
export type { 
  SimilaritySearchOptions, 
  SimilarityResult, 
  EmbeddingStats 
} from './database';

// Caching system
export { embeddingCache } from './cache';
export type { CacheEntry, CacheStats } from './cache';

// Background job system
export { embeddingJobQueue } from './jobs';
export type { 
  EmbeddingJob, 
  JobQueueStats 
} from './jobs';

// Similarity search and recommendations
export { similaritySearchEngine } from './similarity';
export type {
  PersonalizedSearchOptions,
  RecommendationOptions,
  ScoredRecommendation,
  SearchAnalytics
} from './similarity';

// Configuration
export { getAIConfig, AI_CONFIG } from '../config';

/**
 * Initialize the complete embedding system
 */
export async function initializeEmbeddingSystem(): Promise<{
  pipeline: typeof videoEmbeddingPipeline;
  database: typeof vectorDatabaseManager;
  cache: typeof embeddingCache;
  jobs: typeof embeddingJobQueue;
  search: typeof similaritySearchEngine;
  providers: typeof embeddingProviderManager;
}> {
  // Initialize database
  await vectorDatabaseManager.initialize();
  
  // Health check all components
  const healthChecks = await Promise.all([
    vectorDatabaseManager.healthCheck(),
    embeddingProviderManager.healthCheck(),
  ]);

  if (!healthChecks.every(check => check)) {
    throw new Error('Failed to initialize embedding system - health checks failed');
  }

  return {
    pipeline: videoEmbeddingPipeline,
    database: vectorDatabaseManager,
    cache: embeddingCache,
    jobs: embeddingJobQueue,
    search: similaritySearchEngine,
    providers: embeddingProviderManager,
  };
}

/**
 * Get system health status
 */
export async function getSystemHealth(): Promise<{
  overall: boolean;
  components: {
    pipeline: boolean;
    database: boolean;
    providers: boolean;
    cache: boolean;
    jobs: boolean;
  };
  stats: {
    pipeline: any;
    database: EmbeddingStats;
    cache: CacheStats;
    jobs: JobQueueStats;
  };
}> {
  const [
    pipelineHealth,
    databaseHealth,
    providerHealth,
    databaseStats,
    cacheStats,
    jobStats,
  ] = await Promise.all([
    videoEmbeddingPipeline.healthCheck(),
    vectorDatabaseManager.healthCheck(),
    embeddingProviderManager.healthCheck(),
    vectorDatabaseManager.getEmbeddingStats(),
    embeddingCache.getStats(),
    embeddingJobQueue.getQueueStats(),
  ]);

  const components = {
    pipeline: pipelineHealth.overall,
    database: databaseHealth,
    providers: providerHealth,
    cache: true, // Cache doesn't have explicit health check
    jobs: true,  // Jobs system doesn't have explicit health check
  };

  const overall = Object.values(components).every(status => status);

  return {
    overall,
    components,
    stats: {
      pipeline: pipelineHealth,
      database: databaseStats,
      cache: cacheStats,
      jobs: jobStats,
    },
  };
}

/**
 * Shutdown the embedding system gracefully
 */
export async function shutdownEmbeddingSystem(): Promise<void> {
  await Promise.all([
    vectorDatabaseManager.close(),
    embeddingCache.clear(),
  ]);
}