/**
 * NEWTUBE AI/ML Configuration
 * Configuration for OpenAI embeddings, vector database, and processing pipeline
 */

export const AI_CONFIG = {
  // OpenAI Configuration
  openai: {
    model: 'text-embedding-3-small',
    dimensions: 1536,
    encoding: 'cl100k_base',
    maxTokens: 8191, // Max tokens for text-embedding-3-small
    batchSize: 100, // Max items per batch request
    rateLimitRpm: 3000, // Requests per minute
    rateLimitTpm: 1000000, // Tokens per minute
  },

  // Embedding Strategy Configuration
  embeddings: {
    // Weighted component strategy for combined embeddings
    weights: {
      title: 0.40,       // 40% weight for video titles
      description: 0.35, // 35% weight for descriptions
      tags: 0.25,        // 25% weight for tags
    },
    
    // Quality thresholds
    qualityThresholds: {
      minSimilarity: 0.6,     // Minimum cosine similarity for matches
      highQuality: 0.8,       // High quality embedding threshold
      duplicateThreshold: 0.95, // Threshold for duplicate detection
    },
    
    // Processing configuration
    processing: {
      batchSize: 50,           // Items per processing batch
      concurrency: 3,          // Concurrent API calls
      retryAttempts: 3,        // Max retry attempts for failed requests
      retryDelay: 1000,        // Base retry delay in ms
      timeoutMs: 30000,        // Request timeout
    },
  },

  // Database Configuration
  database: {
    // Vector index configuration
    hnsw: {
      m: 16,                   // Max connections per layer
      efConstruction: 64,      // Size of dynamic candidate list
      efSearch: 40,            // Size of dynamic candidate list for search
    },
    
    // Performance settings
    performance: {
      connectionPoolSize: 20,   // Max connections in pool
      queryTimeout: 60000,      // Query timeout in ms
      batchInsertSize: 100,     // Records per batch insert
    },
  },

  // Job Processing Configuration
  jobs: {
    batchProcessing: {
      defaultBatchSize: 100,
      maxBatchSize: 500,
      priorityThresholds: {
        high: 1000,     // High priority for <1000 items
        medium: 5000,   // Medium priority for <5000 items
        low: Number.MAX_SAFE_INTEGER, // Low priority for everything else
      },
    },
    
    incrementalUpdates: {
      intervalMs: 300000,       // 5 minutes between incremental updates
      maxItemsPerUpdate: 200,   // Max new items per incremental update
      stalenessThresholdHours: 24, // Mark embeddings stale after 24 hours
    },
    
    monitoring: {
      metricsIntervalMs: 60000, // 1 minute metrics collection
      healthCheckIntervalMs: 30000, // 30 second health checks
      alertThresholds: {
        errorRate: 0.1,         // Alert if >10% error rate
        processingTimeMs: 5000, // Alert if avg processing >5s
        queueBacklog: 1000,     // Alert if >1000 items in queue
      },
    },
  },

  // Cache Configuration
  cache: {
    embeddings: {
      ttlSeconds: 86400 * 7,    // 7 days for embeddings
      maxSize: 10000,           // Max cached embeddings
    },
    
    similarity: {
      ttlSeconds: 3600,         // 1 hour for similarity results
      maxSize: 1000,            // Max cached similarity queries
    },
    
    metadata: {
      ttlSeconds: 1800,         // 30 minutes for video metadata
      maxSize: 5000,            // Max cached metadata entries
    },
  },

  // Recommendation Configuration
  recommendations: {
    // Personalization settings
    personalization: {
      userInteractionWeight: 0.7,    // Weight for user interaction history
      contentSimilarityWeight: 0.3,  // Weight for content similarity
      diversityFactor: 0.2,          // Diversity injection factor
      recencyBoost: 0.1,             // Boost for recent content
      minInteractions: 5,            // Min interactions for personalization
    },
    
    // Search and discovery
    search: {
      hybridSearch: {
        semanticWeight: 0.7,         // Weight for semantic similarity
        textMatchWeight: 0.3,        // Weight for text matching
      },
      
      expansion: {
        maxExpandedTerms: 5,         // Max query expansion terms
        expansionThreshold: 0.8,     // Threshold for term expansion
      },
    },
    
    // Content scoring
    scoring: {
      similarityWeight: 0.4,         // Base similarity score weight
      popularityWeight: 0.2,         // Popularity/engagement weight
      recencyWeight: 0.2,            // Content recency weight
      personalizedWeight: 0.2,       // Personalization weight
    },
  },

  // Comment Analysis Configuration
  comments: {
    toxicity: {
      threshold: 0.7,              // Toxicity detection threshold
      moderationQueue: 0.5,        // Queue for manual review threshold
    },
    
    relevance: {
      threshold: 0.6,              // Relevance to video threshold
      boostFactors: {
        questionResponse: 1.2,     // Boost for Q&A patterns
        timestamped: 1.1,          // Boost for timestamped comments
        engagement: 1.3,           // Boost for high engagement
      },
    },
  },
} as const;

export type AIConfig = typeof AI_CONFIG;

// Environment-specific overrides
export function getAIConfig(): AIConfig {
  const env = process.env.NODE_ENV || 'development';
  
  if (env === 'development') {
    return {
      ...AI_CONFIG,
      embeddings: {
        ...AI_CONFIG.embeddings,
        processing: {
          ...AI_CONFIG.embeddings.processing,
          batchSize: 50,      // Smaller batches in development
          concurrency: 3,     // Single concurrent request
        },
      },
      jobs: {
        ...AI_CONFIG.jobs,
        incrementalUpdates: {
          ...AI_CONFIG.jobs.incrementalUpdates,
          intervalMs: 300000,  // 1 minute in development
        },
      },
    };
  }
  
  return AI_CONFIG;
}

// Type exports for TypeScript support
export type EmbeddingWeights = typeof AI_CONFIG.embeddings.weights;
export type QualityThresholds = typeof AI_CONFIG.embeddings.qualityThresholds;
export type ProcessingConfig = typeof AI_CONFIG.embeddings.processing;