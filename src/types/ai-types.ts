/**
 * NEWTUBE AI/ML Type Definitions
 * Centralized type definitions for all AI services
 */

// Re-export all types from AI services for convenience
export {
  VideoContent,
  VideoEmbedding,
  UserPreferenceProfile,
  EmbeddingService
} from '../ai/embedding-service';

export {
  RecommendationScore,
  RecommendationRequest,
  PersonalizationConfig,
  PersonalizationService
} from '../ai/personalization-service';

export {
  Comment,
  CommentAnalysis,
  CommentFilter,
  CommentLens,
  CommentFilteringService
} from '../ai/comment-filtering-service';

export {
  VectorSearchOptions,
  SimilaritySearchResult,
  HybridSearchOptions,
  VectorDatabaseStats,
  VectorDatabaseService
} from '../ai/vector-database-service';

export {
  AIServiceConfig,
  ContentAnalysisRequest,
  ContentAnalysisResult,
  AIService
} from '../ai/ai-service';

// Additional shared types

export interface AIServiceResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  metadata?: {
    processingTime: number;
    timestamp: Date;
    version: string;
  };
}

export interface AIMetrics {
  embeddings: {
    totalGenerated: number;
    totalStored: number;
    averageGenerationTime: number;
    errorRate: number;
  };
  recommendations: {
    totalRequests: number;
    averageResponseTime: number;
    personalizedRequests: number;
    fallbackRequests: number;
  };
  commentFiltering: {
    totalAnalyzed: number;
    averageToxicityScore: number;
    averageRelevanceScore: number;
    filteredCount: number;
  };
  vectorSearch: {
    totalQueries: number;
    averageQueryTime: number;
    averageSimilarityScore: number;
    indexHealth: boolean;
  };
}

export interface AIConfiguration {
  embedding: {
    model: string;
    dimensions: number;
    batchSize: number;
    rateLimitRPM: number;
    rateLimitTPM: number;
  };
  personalization: {
    semanticWeight: number;
    categoryWeight: number;
    recencyWeight: number;
    diversityWeight: number;
    popularityWeight: number;
    minSimilarityThreshold: number;
  };
  commentFiltering: {
    toxicityThreshold: number;
    relevanceThreshold: number;
    defaultLens: string;
    enabledLenses: string[];
  };
  vectorDatabase: {
    indexType: 'hnsw' | 'ivfflat';
    indexParameters: Record<string, any>;
    connectionPoolSize: number;
    queryTimeout: number;
  };
}

// GraphQL-compatible types for API integration

export interface VideoRecommendationInput {
  userId: string;
  type: 'personalized' | 'trending' | 'similar' | 'category';
  limit?: number;
  excludeVideoIds?: string[];
  categories?: string[];
  platforms?: ('youtube' | 'vimeo' | 'nebula')[];
  currentVideoId?: string;
  diversityWeight?: number;
  recencyWeight?: number;
}

export interface VideoRecommendationResult {
  videoId: string;
  platform: string;
  score: number;
  reasons: string[];
  confidence: number;
  explanation?: string;
}

export interface CommentAnalysisInput {
  comments: Array<{
    id: string;
    videoId: string;
    platform: string;
    author: string;
    text: string;
    timestamp: string;
    likeCount?: number;
    replyCount?: number;
  }>;
  videoContext?: {
    title: string;
    description?: string;
    tags?: string[];
  };
  analysisOptions?: {
    includeToxicity: boolean;
    includeRelevance: boolean;
    includeSentiment: boolean;
    includeEmbedding: boolean;
  };
}

export interface CommentAnalysisResult {
  commentId: string;
  toxicityScore: number;
  relevanceScore: number;
  sentimentScore: number;
  categories: string[];
  confidence: number;
  metadata: {
    wordCount: number;
    hasLinks: boolean;
    hasEmojis: boolean;
    languageDetected?: string;
  };
}

export interface CommentFilterInput {
  comments: CommentAnalysisResult[];
  filter: {
    toxicityThreshold?: number;
    relevanceThreshold?: number;
    categories?: string[];
    sortBy?: 'relevance' | 'toxicity' | 'sentiment' | 'timestamp' | 'likes';
    sortOrder?: 'asc' | 'desc';
    limit?: number;
  } | string; // string for lens name
}

export interface SimilaritySearchInput {
  query: string;
  searchType: 'videos' | 'comments';
  options?: {
    limit?: number;
    threshold?: number;
    platforms?: string[];
    categories?: string[];
    excludeIds?: string[];
  };
}

export interface SimilaritySearchResult {
  id: string;
  platform: string;
  similarity: number;
  metadata?: any;
}

export interface HybridSearchInput {
  query: string;
  options?: {
    semanticWeight?: number;
    limit?: number;
    threshold?: number;
    platforms?: string[];
    excludeIds?: string[];
  };
}

// Event types for real-time updates

export interface AIEvent {
  type: 'embedding_generated' | 'recommendation_requested' | 'comment_analyzed' | 'user_preference_updated';
  userId?: string;
  videoId?: string;
  platform?: string;
  timestamp: Date;
  metadata: Record<string, any>;
}

export interface EmbeddingGeneratedEvent extends AIEvent {
  type: 'embedding_generated';
  data: {
    videoId: string;
    platform: string;
    embeddingType: 'title' | 'description' | 'combined';
    processingTime: number;
  };
}

export interface RecommendationRequestedEvent extends AIEvent {
  type: 'recommendation_requested';
  data: {
    userId: string;
    recommendationType: string;
    resultCount: number;
    processingTime: number;
  };
}

export interface CommentAnalyzedEvent extends AIEvent {
  type: 'comment_analyzed';
  data: {
    commentId: string;
    videoId: string;
    platform: string;
    toxicityScore: number;
    relevanceScore: number;
    processingTime: number;
  };
}

export interface UserPreferenceUpdatedEvent extends AIEvent {
  type: 'user_preference_updated';
  data: {
    userId: string;
    interactionType: string;
    videoId: string;
    platform: string;
    preferenceChangeScore: number;
  };
}

// Error types

export interface AIError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  service: 'embedding' | 'personalization' | 'comment_filtering' | 'vector_database';
}

export class EmbeddingError extends Error implements AIError {
  code: string;
  service: 'embedding' = 'embedding';
  details?: any;
  timestamp: Date;

  constructor(message: string, code: string = 'EMBEDDING_ERROR', details?: any) {
    super(message);
    this.name = 'EmbeddingError';
    this.code = code;
    this.details = details;
    this.timestamp = new Date();
  }
}

export class PersonalizationError extends Error implements AIError {
  code: string;
  service: 'personalization' = 'personalization';
  details?: any;
  timestamp: Date;

  constructor(message: string, code: string = 'PERSONALIZATION_ERROR', details?: any) {
    super(message);
    this.name = 'PersonalizationError';
    this.code = code;
    this.details = details;
    this.timestamp = new Date();
  }
}

export class CommentFilteringError extends Error implements AIError {
  code: string;
  service: 'comment_filtering' = 'comment_filtering';
  details?: any;
  timestamp: Date;

  constructor(message: string, code: string = 'COMMENT_FILTERING_ERROR', details?: any) {
    super(message);
    this.name = 'CommentFilteringError';
    this.code = code;
    this.details = details;
    this.timestamp = new Date();
  }
}

export class VectorDatabaseError extends Error implements AIError {
  code: string;
  service: 'vector_database' = 'vector_database';
  details?: any;
  timestamp: Date;

  constructor(message: string, code: string = 'VECTOR_DATABASE_ERROR', details?: any) {
    super(message);
    this.name = 'VectorDatabaseError';
    this.code = code;
    this.details = details;
    this.timestamp = new Date();
  }
}

// Utility types

export type AIServiceStatus = 'initializing' | 'ready' | 'degraded' | 'error';

export interface AIServiceHealth {
  status: AIServiceStatus;
  services: {
    embedding: AIServiceStatus;
    personalization: AIServiceStatus;
    commentFiltering: AIServiceStatus;
    vectorDatabase: AIServiceStatus;
  };
  lastHealthCheck: Date;
  errors: AIError[];
}