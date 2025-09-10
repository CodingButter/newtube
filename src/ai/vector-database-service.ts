/**
 * NEWTUBE Vector Database Service
 * Handles pgvector operations for similarity search and AI features
 * Based on semantic memory: PostgreSQL + pgvector with HNSW indexes
 */

import { Pool } from 'pg';
import { Redis } from 'ioredis';
import { VideoEmbedding, UserPreferenceProfile } from './embedding-service';
import { CommentAnalysis } from './comment-filtering-service';

export interface VectorSearchOptions {
  limit?: number;
  threshold?: number; // Minimum similarity score (0-1)
  includeMetadata?: boolean;
  excludeIds?: string[];
  platforms?: string[];
  categories?: string[];
}

export interface SimilaritySearchResult {
  id: string;
  platform: string;
  similarity: number;
  metadata?: any;
}

export interface HybridSearchOptions extends VectorSearchOptions {
  textQuery?: string;
  semanticWeight?: number; // 0-1, weight for semantic vs text search
  includeTextScore?: boolean;
}

export interface VectorDatabaseStats {
  totalVideoEmbeddings: number;
  totalUserEmbeddings: number;
  totalCommentEmbeddings: number;
  totalSearchEmbeddings: number;
  averageEmbeddingDimensions: number;
  indexHealth: {
    videoIndex: boolean;
    userIndex: boolean;
    commentIndex: boolean;
    searchIndex: boolean;
  };
}

export class VectorDatabaseService {
  private pg: Pool;
  private redis: Redis;
  private dimensions = 1536; // OpenAI text-embedding-3-small dimensions

  constructor(pgPool: Pool, redisClient: Redis) {
    this.pg = pgPool;
    this.redis = redisClient;
  }

  /**
   * Initialize vector database with required extensions and tables
   */
  async initialize(): Promise<void> {
    try {
      // Enable pgvector extension
      await this.pg.query('CREATE EXTENSION IF NOT EXISTS vector;');

      // Create video embeddings table
      await this.pg.query(`
        CREATE TABLE IF NOT EXISTS video_embeddings (
          id SERIAL PRIMARY KEY,
          video_id VARCHAR(255) NOT NULL,
          platform VARCHAR(50) NOT NULL,
          title_embedding vector(${this.dimensions}),
          description_embedding vector(${this.dimensions}),
          combined_embedding vector(${this.dimensions}) NOT NULL,
          metadata JSONB DEFAULT '{}',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(video_id, platform)
        );
      `);

      // Create user preference embeddings table
      await this.pg.query(`
        CREATE TABLE IF NOT EXISTS user_embeddings (
          id SERIAL PRIMARY KEY,
          user_id VARCHAR(255) NOT NULL UNIQUE,
          preference_embedding vector(${this.dimensions}) NOT NULL,
          categories TEXT[] DEFAULT '{}',
          confidence_score FLOAT DEFAULT 0.5,
          interaction_count INTEGER DEFAULT 0,
          metadata JSONB DEFAULT '{}',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Create comment embeddings table
      await this.pg.query(`
        CREATE TABLE IF NOT EXISTS comment_embeddings (
          id SERIAL PRIMARY KEY,
          comment_id VARCHAR(255) NOT NULL UNIQUE,
          video_id VARCHAR(255) NOT NULL,
          platform VARCHAR(50) NOT NULL,
          comment_embedding vector(${this.dimensions}) NOT NULL,
          toxicity_score FLOAT DEFAULT 0.0,
          relevance_score FLOAT DEFAULT 0.5,
          sentiment_score FLOAT DEFAULT 0.0,
          categories TEXT[] DEFAULT '{}',
          metadata JSONB DEFAULT '{}',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Create search query embeddings table
      await this.pg.query(`
        CREATE TABLE IF NOT EXISTS search_embeddings (
          id SERIAL PRIMARY KEY,
          query_hash VARCHAR(64) NOT NULL UNIQUE,
          query_text TEXT NOT NULL,
          query_embedding vector(${this.dimensions}) NOT NULL,
          user_id VARCHAR(255),
          result_count INTEGER DEFAULT 0,
          metadata JSONB DEFAULT '{}',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          last_used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Create HNSW indexes for high-performance similarity search
      await this.createVectorIndexes();

      console.log('Vector database initialized successfully');

    } catch (error) {
      console.error('Error initializing vector database:', error);
      throw new Error(`Failed to initialize vector database: ${error}`);
    }
  }

  /**
   * Store video embedding in the database
   */
  async storeVideoEmbedding(embedding: VideoEmbedding): Promise<void> {
    try {
      await this.pg.query(`
        INSERT INTO video_embeddings (
          video_id, platform, title_embedding, description_embedding, 
          combined_embedding, metadata
        ) VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (video_id, platform) 
        DO UPDATE SET
          title_embedding = EXCLUDED.title_embedding,
          description_embedding = EXCLUDED.description_embedding,
          combined_embedding = EXCLUDED.combined_embedding,
          metadata = EXCLUDED.metadata,
          updated_at = CURRENT_TIMESTAMP
      `, [
        embedding.videoId,
        embedding.platform,
        `[${embedding.titleEmbedding.join(',')}]`,
        embedding.descriptionEmbedding ? `[${embedding.descriptionEmbedding.join(',')}]` : null,
        `[${embedding.combinedEmbedding.join(',')}]`,
        JSON.stringify(embedding.metadata)
      ]);

      // Invalidate related caches
      await this.invalidateVideoCache(embedding.videoId, embedding.platform);

    } catch (error) {
      console.error('Error storing video embedding:', error);
      throw new Error(`Failed to store video embedding: ${error}`);
    }
  }

  /**
   * Store user preference embedding
   */
  async storeUserEmbedding(profile: UserPreferenceProfile): Promise<void> {
    try {
      await this.pg.query(`
        INSERT INTO user_embeddings (
          user_id, preference_embedding, categories, interaction_count, metadata
        ) VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (user_id)
        DO UPDATE SET
          preference_embedding = EXCLUDED.preference_embedding,
          categories = EXCLUDED.categories,
          interaction_count = EXCLUDED.interaction_count,
          metadata = EXCLUDED.metadata,
          updated_at = CURRENT_TIMESTAMP
      `, [
        profile.userId,
        `[${profile.preferenceEmbedding.join(',')}]`,
        profile.categories,
        profile.watchHistory.length,
        JSON.stringify({ 
          lastUpdated: profile.lastUpdated,
          historyCount: profile.watchHistory.length 
        })
      ]);

      // Invalidate user cache
      await this.redis.del(`user_profile:${profile.userId}`);

    } catch (error) {
      console.error('Error storing user embedding:', error);
      throw new Error(`Failed to store user embedding: ${error}`);
    }
  }

  /**
   * Store comment analysis with embedding
   */
  async storeCommentEmbedding(
    commentId: string,
    videoId: string,
    platform: string,
    analysis: CommentAnalysis
  ): Promise<void> {
    try {
      if (!analysis.embedding) {
        throw new Error('Comment analysis must include embedding vector');
      }

      await this.pg.query(`
        INSERT INTO comment_embeddings (
          comment_id, video_id, platform, comment_embedding,
          toxicity_score, relevance_score, sentiment_score, categories, metadata
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (comment_id)
        DO UPDATE SET
          comment_embedding = EXCLUDED.comment_embedding,
          toxicity_score = EXCLUDED.toxicity_score,
          relevance_score = EXCLUDED.relevance_score,
          sentiment_score = EXCLUDED.sentiment_score,
          categories = EXCLUDED.categories,
          metadata = EXCLUDED.metadata
      `, [
        commentId,
        videoId,
        platform,
        `[${analysis.embedding.join(',')}]`,
        analysis.toxicityScore,
        analysis.relevanceScore,
        analysis.sentimentScore,
        analysis.categories,
        JSON.stringify(analysis.metadata)
      ]);

    } catch (error) {
      console.error('Error storing comment embedding:', error);
      throw new Error(`Failed to store comment embedding: ${error}`);
    }
  }

  /**
   * Find similar videos using semantic search
   */
  async findSimilarVideos(
    queryEmbedding: number[],
    options: VectorSearchOptions = {}
  ): Promise<SimilaritySearchResult[]> {
    const {
      limit = 20,
      threshold = 0.6,
      includeMetadata = false,
      excludeIds = [],
      platforms = [],
      categories = []
    } = options;

    try {
      // Build WHERE clause
      const whereConditions: string[] = [];
      const queryParams: any[] = [`[${queryEmbedding.join(',')}]`, limit];
      let paramIndex = 3;

      if (threshold > 0) {
        whereConditions.push(`(1 - (combined_embedding <=> $1)) >= $${paramIndex}`);
        queryParams.push(threshold);
        paramIndex++;
      }

      if (excludeIds.length > 0) {
        whereConditions.push(`video_id != ALL($${paramIndex})`);
        queryParams.push(excludeIds);
        paramIndex++;
      }

      if (platforms.length > 0) {
        whereConditions.push(`platform = ANY($${paramIndex})`);
        queryParams.push(platforms);
        paramIndex++;
      }

      if (categories.length > 0) {
        whereConditions.push(`metadata->>'tags' && $${paramIndex}`);
        queryParams.push(categories);
        paramIndex++;
      }

      const whereClause = whereConditions.length > 0 
        ? `WHERE ${whereConditions.join(' AND ')}`
        : '';

      const metadataSelect = includeMetadata ? ', metadata' : '';

      const query = `
        SELECT 
          video_id,
          platform,
          (1 - (combined_embedding <=> $1)) as similarity
          ${metadataSelect}
        FROM video_embeddings
        ${whereClause}
        ORDER BY combined_embedding <=> $1
        LIMIT $2
      `;

      const result = await this.pg.query(query, queryParams);

      return result.rows.map(row => ({
        id: row.video_id,
        platform: row.platform,
        similarity: parseFloat(row.similarity),
        ...(includeMetadata && { metadata: row.metadata })
      }));

    } catch (error) {
      console.error('Error finding similar videos:', error);
      throw new Error(`Failed to find similar videos: ${error}`);
    }
  }

  /**
   * Hybrid search combining semantic similarity and text matching
   * Based on semantic memory: 70% semantic + 30% text matching
   */
  async hybridSearch(
    queryEmbedding: number[],
    options: HybridSearchOptions = {}
  ): Promise<SimilaritySearchResult[]> {
    const {
      textQuery,
      semanticWeight = 0.7,
      includeTextScore = false,
      ...searchOptions
    } = options;

    try {
      if (!textQuery) {
        // Fall back to pure semantic search
        return this.findSimilarVideos(queryEmbedding, searchOptions);
      }

      // Build hybrid search query
      const whereConditions: string[] = [];
      const queryParams: any[] = [
        `[${queryEmbedding.join(',')}]`,
        textQuery,
        semanticWeight,
        1 - semanticWeight,
        searchOptions.limit || 20
      ];
      let paramIndex = 6;

      if (searchOptions.threshold && searchOptions.threshold > 0) {
        // Apply threshold to combined score
        whereConditions.push(`
          ($3 * (1 - (combined_embedding <=> $1)) + 
           $4 * ts_rank_cd(to_tsvector(metadata->>'title' || ' ' || COALESCE(metadata->>'description', '')), plainto_tsquery($2))) 
          >= $${paramIndex}
        `);
        queryParams.push(searchOptions.threshold);
        paramIndex++;
      }

      if (searchOptions.excludeIds && searchOptions.excludeIds.length > 0) {
        whereConditions.push(`video_id != ALL($${paramIndex})`);
        queryParams.push(searchOptions.excludeIds);
        paramIndex++;
      }

      if (searchOptions.platforms && searchOptions.platforms.length > 0) {
        whereConditions.push(`platform = ANY($${paramIndex})`);
        queryParams.push(searchOptions.platforms);
        paramIndex++;
      }

      const whereClause = whereConditions.length > 0 
        ? `WHERE ${whereConditions.join(' AND ')}`
        : '';

      const textScoreSelect = includeTextScore 
        ? ', ts_rank_cd(to_tsvector(metadata->\'title\' || \' \' || COALESCE(metadata->\'description\', \'\')), plainto_tsquery($2)) as text_score'
        : '';

      const query = `
        SELECT 
          video_id,
          platform,
          (1 - (combined_embedding <=> $1)) as semantic_similarity,
          ($3 * (1 - (combined_embedding <=> $1)) + 
           $4 * ts_rank_cd(to_tsvector(metadata->>'title' || ' ' || COALESCE(metadata->>'description', '')), plainto_tsquery($2))
          ) as similarity
          ${searchOptions.includeMetadata ? ', metadata' : ''}
          ${textScoreSelect}
        FROM video_embeddings
        ${whereClause}
        ORDER BY similarity DESC
        LIMIT $5
      `;

      const result = await this.pg.query(query, queryParams);

      return result.rows.map(row => ({
        id: row.video_id,
        platform: row.platform,
        similarity: parseFloat(row.similarity),
        ...(searchOptions.includeMetadata && { metadata: row.metadata }),
        ...(includeTextScore && { textScore: parseFloat(row.text_score || 0) }),
        ...(includeTextScore && { semanticSimilarity: parseFloat(row.semantic_similarity) })
      }));

    } catch (error) {
      console.error('Error performing hybrid search:', error);
      throw new Error(`Failed to perform hybrid search: ${error}`);
    }
  }

  /**
   * Find similar comments for moderation or analysis
   */
  async findSimilarComments(
    queryEmbedding: number[],
    options: VectorSearchOptions & { 
      minToxicity?: number;
      maxToxicity?: number;
      minRelevance?: number;
    } = {}
  ): Promise<SimilaritySearchResult[]> {
    const {
      limit = 10,
      threshold = 0.7,
      includeMetadata = false,
      minToxicity,
      maxToxicity,
      minRelevance
    } = options;

    try {
      const whereConditions: string[] = [];
      const queryParams: any[] = [`[${queryEmbedding.join(',')}]`, limit];
      let paramIndex = 3;

      if (threshold > 0) {
        whereConditions.push(`(1 - (comment_embedding <=> $1)) >= $${paramIndex}`);
        queryParams.push(threshold);
        paramIndex++;
      }

      if (minToxicity !== undefined) {
        whereConditions.push(`toxicity_score >= $${paramIndex}`);
        queryParams.push(minToxicity);
        paramIndex++;
      }

      if (maxToxicity !== undefined) {
        whereConditions.push(`toxicity_score <= $${paramIndex}`);
        queryParams.push(maxToxicity);
        paramIndex++;
      }

      if (minRelevance !== undefined) {
        whereConditions.push(`relevance_score >= $${paramIndex}`);
        queryParams.push(minRelevance);
        paramIndex++;
      }

      const whereClause = whereConditions.length > 0 
        ? `WHERE ${whereConditions.join(' AND ')}`
        : '';

      const metadataSelect = includeMetadata 
        ? ', metadata, toxicity_score, relevance_score, sentiment_score, categories'
        : '';

      const query = `
        SELECT 
          comment_id,
          platform,
          (1 - (comment_embedding <=> $1)) as similarity
          ${metadataSelect}
        FROM comment_embeddings
        ${whereClause}
        ORDER BY comment_embedding <=> $1
        LIMIT $2
      `;

      const result = await this.pg.query(query, queryParams);

      return result.rows.map(row => ({
        id: row.comment_id,
        platform: row.platform,
        similarity: parseFloat(row.similarity),
        ...(includeMetadata && {
          metadata: {
            ...row.metadata,
            toxicityScore: row.toxicity_score,
            relevanceScore: row.relevance_score,
            sentimentScore: row.sentiment_score,
            categories: row.categories
          }
        })
      }));

    } catch (error) {
      console.error('Error finding similar comments:', error);
      throw new Error(`Failed to find similar comments: ${error}`);
    }
  }

  /**
   * Get user preference embedding from database
   */
  async getUserEmbedding(userId: string): Promise<UserPreferenceProfile | null> {
    try {
      const result = await this.pg.query(`
        SELECT 
          user_id,
          preference_embedding,
          categories,
          confidence_score,
          interaction_count,
          metadata,
          updated_at
        FROM user_embeddings
        WHERE user_id = $1
      `, [userId]);

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];
      return {
        userId: row.user_id,
        preferenceEmbedding: row.preference_embedding,
        categories: row.categories,
        watchHistory: [], // Would need to fetch from separate table
        lastUpdated: row.updated_at
      };

    } catch (error) {
      console.error('Error getting user embedding:', error);
      return null;
    }
  }

  /**
   * Get database statistics
   */
  async getStats(): Promise<VectorDatabaseStats> {
    try {
      const [videoCount, userCount, commentCount, searchCount] = await Promise.all([
        this.pg.query('SELECT COUNT(*) as count FROM video_embeddings'),
        this.pg.query('SELECT COUNT(*) as count FROM user_embeddings'),
        this.pg.query('SELECT COUNT(*) as count FROM comment_embeddings'),
        this.pg.query('SELECT COUNT(*) as count FROM search_embeddings')
      ]);

      // Check index health
      const indexHealth = await this.checkIndexHealth();

      return {
        totalVideoEmbeddings: parseInt(videoCount.rows[0].count),
        totalUserEmbeddings: parseInt(userCount.rows[0].count),
        totalCommentEmbeddings: parseInt(commentCount.rows[0].count),
        totalSearchEmbeddings: parseInt(searchCount.rows[0].count),
        averageEmbeddingDimensions: this.dimensions,
        indexHealth
      };

    } catch (error) {
      console.error('Error getting database stats:', error);
      throw new Error(`Failed to get database stats: ${error}`);
    }
  }

  /**
   * Create HNSW indexes for vector similarity search
   */
  private async createVectorIndexes(): Promise<void> {
    try {
      // Video embeddings indexes
      await this.pg.query(`
        CREATE INDEX IF NOT EXISTS idx_video_embeddings_combined_hnsw
        ON video_embeddings USING hnsw (combined_embedding vector_cosine_ops)
        WITH (m = 16, ef_construction = 64);
      `);

      await this.pg.query(`
        CREATE INDEX IF NOT EXISTS idx_video_embeddings_title_hnsw
        ON video_embeddings USING hnsw (title_embedding vector_cosine_ops)
        WITH (m = 16, ef_construction = 64);
      `);

      // User embeddings index
      await this.pg.query(`
        CREATE INDEX IF NOT EXISTS idx_user_embeddings_preference_hnsw
        ON user_embeddings USING hnsw (preference_embedding vector_cosine_ops)
        WITH (m = 16, ef_construction = 64);
      `);

      // Comment embeddings index
      await this.pg.query(`
        CREATE INDEX IF NOT EXISTS idx_comment_embeddings_hnsw
        ON comment_embeddings USING hnsw (comment_embedding vector_cosine_ops)
        WITH (m = 16, ef_construction = 64);
      `);

      // Search embeddings index
      await this.pg.query(`
        CREATE INDEX IF NOT EXISTS idx_search_embeddings_hnsw
        ON search_embeddings USING hnsw (query_embedding vector_cosine_ops)
        WITH (m = 16, ef_construction = 64);
      `);

      // Additional indexes for filtering
      await this.pg.query(`
        CREATE INDEX IF NOT EXISTS idx_video_embeddings_platform 
        ON video_embeddings (platform);
      `);

      await this.pg.query(`
        CREATE INDEX IF NOT EXISTS idx_comment_embeddings_scores
        ON comment_embeddings (toxicity_score, relevance_score);
      `);

      console.log('Vector indexes created successfully');

    } catch (error) {
      console.error('Error creating vector indexes:', error);
      throw error;
    }
  }

  /**
   * Check health of vector indexes
   */
  private async checkIndexHealth(): Promise<VectorDatabaseStats['indexHealth']> {
    try {
      const indexQueries = [
        "SELECT 1 FROM pg_indexes WHERE indexname = 'idx_video_embeddings_combined_hnsw'",
        "SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_embeddings_preference_hnsw'",
        "SELECT 1 FROM pg_indexes WHERE indexname = 'idx_comment_embeddings_hnsw'",
        "SELECT 1 FROM pg_indexes WHERE indexname = 'idx_search_embeddings_hnsw'"
      ];

      const results = await Promise.all(
        indexQueries.map(query => this.pg.query(query))
      );

      return {
        videoIndex: results[0].rows.length > 0,
        userIndex: results[1].rows.length > 0,
        commentIndex: results[2].rows.length > 0,
        searchIndex: results[3].rows.length > 0
      };

    } catch (error) {
      console.error('Error checking index health:', error);
      return {
        videoIndex: false,
        userIndex: false,
        commentIndex: false,
        searchIndex: false
      };
    }
  }

  /**
   * Invalidate video-related caches
   */
  private async invalidateVideoCache(videoId: string, platform: string): Promise<void> {
    const cacheKeys = [
      `video_embedding:${platform}:${videoId}`,
      `similar_videos:${platform}:${videoId}:*`
    ];

    for (const pattern of cacheKeys) {
      if (pattern.includes('*')) {
        const keys = await this.redis.keys(pattern);
        if (keys.length > 0) {
          await this.redis.del(...keys);
        }
      } else {
        await this.redis.del(pattern);
      }
    }
  }
}