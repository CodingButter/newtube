/**
 * NEWTUBE AI Services - Main Export
 * Centralized export for all AI/ML services and types
 */

// Main AI Service
export { AIService } from './ai-service';

// Individual Services
export { EmbeddingService } from './embedding-service';
export { PersonalizationService } from './personalization-service';
export { CommentFilteringService } from './comment-filtering-service';
export { VectorDatabaseService } from './vector-database-service';

// Types
export * from '../types/ai-types';

// API Integration
export { aiResolvers, aiTypeDefs, initializeAIService } from '../api/ai-resolvers';

// Test utilities
export { testAIServices } from '../test/ai-service-test';

// Default configuration
export const DEFAULT_AI_CONFIG = {
  embedding: {
    model: 'text-embedding-3-small',
    dimensions: 1536,
    batchSize: 5,
    rateLimitRPM: 3000,
    rateLimitTPM: 1000000
  },
  personalization: {
    semanticWeight: 0.4,
    categoryWeight: 0.25,
    recencyWeight: 0.15,
    diversityWeight: 0.1,
    popularityWeight: 0.1,
    minSimilarityThreshold: 0.6
  },
  commentFiltering: {
    toxicityThreshold: 0.3,
    relevanceThreshold: 0.5,
    defaultLens: 'Clean Discussion',
    enabledLenses: ['Clean Discussion', 'Top Comments', 'Recent Discussion', 'Questions Only']
  },
  vectorDatabase: {
    indexType: 'hnsw' as const,
    indexParameters: {
      m: 16,
      ef_construction: 64
    },
    connectionPoolSize: 20,
    queryTimeout: 30000
  }
};