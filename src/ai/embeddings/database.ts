/**
 * NEWTUBE Vector Database Manager
 * Handles pgvector operations for storing and querying embeddings
 */

import { Pool, PoolClient } from 'pg';
import pgvector from 'pgvector/pg';
import { getAIConfig } from '../config';
import { logger } from '../../lib/logger';
import { ProcessedVideoEmbedding } from './processor';

export interface SimilaritySearchOptions {
  limit?: number;
  threshold?: number;
  platform?: string;
  includeMetadata?: boolean;
}

export interface SimilarityResult {
  platformId: string;
  platform: string;
  title?: string;
  description?: string;
  tags?: string[];
  similarity: number;
  qualityScore?: number;
  publishedAt?: Date;
}

export interface EmbeddingStats {
  totalEmbeddings: number;
  platformBreakdown: Record<string, number>;
  qualityDistribution: {
    high: number;    // >= 0.8
    medium: number;  // 0.6 - 0.8
    low: number;     // < 0.6
  };
  processingStatus: Record<string, number>;
}

export class VectorDatabaseManager {
  private pool: Pool;
  private config = getAIConfig();
  private isInitialized = false;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: this.config.database.performance.connectionPoolSize,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: this.config.database.performance.queryTimeout,
    });

    // Register pgvector types when connection is established
    this.pool.on('connect', async (client) => {
      await pgvector.registerTypes(client);
    });
  }

  /**
   * Initialize the vector database with pgvector extension and indexes
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    const client = await this.pool.connect();
    try {
      // Enable pgvector extension
      await client.query('CREATE EXTENSION IF NOT EXISTS vector');
      await pgvector.registerTypes(client);

      // Check if tables exist (they should be created by Prisma)
      const tablesExist = await this.checkTablesExist(client);
      if (!tablesExist) {
        logger.warn('Vector embedding tables not found. Run Prisma migrations first.');
        return;
      }

      // Create vector indexes if they don't exist
      await this.createVectorIndexes(client);
      
      this.isInitialized = true;
      logger.info('Vector database initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize vector database', { error });
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Check if required tables exist
   */
  private async checkTablesExist(client: PoolClient): Promise<boolean> {
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('video_embeddings', 'user_embeddings', 'comment_embeddings', 'search_embeddings')
    `);
    return result.rows.length === 4;
  }

  /**
   * Create optimized HNSW indexes for vector similarity search
   */
  private async createVectorIndexes(client: PoolClient): Promise<void> {
    const { hnsw } = this.config.database;
    
    const indexes = [
      {
        name: 'video_embeddings_title_embedding_idx',
        table: 'video_embeddings',
        column: 'title_embedding',
      },
      {
        name: 'video_embeddings_description_embedding_idx',
        table: 'video_embeddings',
        column: 'description_embedding',
      },
      {
        name: 'video_embeddings_combined_embedding_idx',
        table: 'video_embeddings',
        column: 'combined_embedding',
      },
      {
        name: 'user_embeddings_preference_embedding_idx',
        table: 'user_embeddings',
        column: 'preference_embedding',
      },
      {
        name: 'comment_embeddings_content_embedding_idx',
        table: 'comment_embeddings',
        column: 'content_embedding',
      },
      {
        name: 'search_embeddings_query_embedding_idx',
        table: 'search_embeddings',
        column: 'query_embedding',
      },
    ];

    for (const index of indexes) {
      try {
        // Check if index already exists
        const indexExists = await client.query(`
          SELECT indexname FROM pg_indexes 
          WHERE indexname = $1 AND tablename = $2
        `, [index.name, index.table]);

        if (indexExists.rows.length === 0) {
          logger.info(`Creating HNSW index: ${index.name}`);
          await client.query(`
            CREATE INDEX CONCURRENTLY ${index.name}
            ON ${index.table} USING hnsw (${index.column} vector_cosine_ops)
            WITH (m = ${hnsw.m}, ef_construction = ${hnsw.efConstruction})
          `);
        }
      } catch (error) {
        logger.warn(`Failed to create index ${index.name}`, { error });
      }
    }

    // Create additional performance indexes
    const additionalIndexes = [
      'CREATE INDEX CONCURRENTLY IF NOT EXISTS video_embeddings_platform_status_idx ON video_embeddings (platform, processing_status)',
      'CREATE INDEX CONCURRENTLY IF NOT EXISTS video_embeddings_published_at_idx ON video_embeddings (published_at DESC)',
      'CREATE INDEX CONCURRENTLY IF NOT EXISTS video_embeddings_quality_score_idx ON video_embeddings (quality_score DESC)',
      'CREATE INDEX CONCURRENTLY IF NOT EXISTS video_embeddings_tags_idx ON video_embeddings USING GIN (tags)',
    ];

    for (const indexQuery of additionalIndexes) {
      try {
        await client.query(indexQuery);
      } catch (error) {
        logger.warn('Failed to create additional index', { indexQuery, error });
      }
    }
  }

  /**
   * Store video embeddings in the database
   */
  async storeVideoEmbeddings(embeddings: ProcessedVideoEmbedding[]): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');

      for (const embedding of embeddings) {
        const { metadata, embeddings: emb, qualityScore } = embedding;
        
        // Convert embeddings to pgvector format
        const titleEmbedding = emb.title ? pgvector.toSql(emb.title) : null;
        const descriptionEmbedding = emb.description ? pgvector.toSql(emb.description) : null;
        const combinedEmbedding = pgvector.toSql(emb.combined);

        // Upsert video embedding
        await client.query(`
          INSERT INTO video_embeddings (
            platform_id, platform, title, description, tags, category,
            duration, published_at, channel_id, channel_name,
            title_embedding, description_embedding, combined_embedding,
            quality_score, processing_status, last_processed_at
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW()
          )
          ON CONFLICT (platform_id, platform) DO UPDATE SET
            title = EXCLUDED.title,
            description = EXCLUDED.description,
            tags = EXCLUDED.tags,
            category = EXCLUDED.category,
            duration = EXCLUDED.duration,
            published_at = EXCLUDED.published_at,
            channel_id = EXCLUDED.channel_id,
            channel_name = EXCLUDED.channel_name,
            title_embedding = EXCLUDED.title_embedding,
            description_embedding = EXCLUDED.description_embedding,
            combined_embedding = EXCLUDED.combined_embedding,
            quality_score = EXCLUDED.quality_score,
            processing_status = 'COMPLETED',
            last_processed_at = NOW(),
            updated_at = NOW()
        `, [
          metadata.platformId,
          metadata.platform,
          metadata.title,
          metadata.description,
          metadata.tags || [],
          metadata.category,
          metadata.duration,
          metadata.publishedAt,
          metadata.channelId,
          metadata.channelName,
          titleEmbedding,
          descriptionEmbedding,
          combinedEmbedding,
          qualityScore,
          'COMPLETED',
        ]);
      }

      await client.query('COMMIT');
      logger.info(`Stored ${embeddings.length} video embeddings`);
    } catch (error) {
      await client.query('ROLLBACK');
      logger.error('Failed to store video embeddings', { error });
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Find similar videos using vector similarity search
   */
  async findSimilarVideos(
    queryEmbedding: number[],
    options: SimilaritySearchOptions = {}
  ): Promise<SimilarityResult[]> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const {
      limit = 10,
      threshold = this.config.embeddings.qualityThresholds.minSimilarity,
      platform,
      includeMetadata = true,
    } = options;

    const client = await this.pool.connect();
    try {
      const queryVector = pgvector.toSql(queryEmbedding);
      
      let query = `
        SELECT 
          platform_id,
          platform,
          ${includeMetadata ? 'title, description, tags, quality_score, published_at,' : ''}
          1 - (combined_embedding <=> $1) as similarity
        FROM video_embeddings
        WHERE processing_status = 'COMPLETED'
        AND 1 - (combined_embedding <=> $1) >= $2
      `;
      
      const params: any[] = [queryVector, threshold];
      let paramIndex = 3;

      if (platform) {
        query += ` AND platform = $${paramIndex}`;
        params.push(platform);
        paramIndex++;
      }

      query += ` ORDER BY combined_embedding <=> $1 LIMIT $${paramIndex}`;
      params.push(limit);

      const result = await client.query(query, params);
      
      return result.rows.map(row => ({
        platformId: row.platform_id,
        platform: row.platform,
        title: row.title,
        description: row.description,
        tags: row.tags || [],
        similarity: parseFloat(row.similarity),
        qualityScore: row.quality_score,
        publishedAt: row.published_at,
      }));
    } catch (error) {
      logger.error('Failed to find similar videos', { error });
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Get videos that need embedding processing
   */
  async getVideosNeedingProcessing(limit: number = 100): Promise<any[]> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const client = await this.pool.connect();
    try {
      const result = await client.query(`
        SELECT platform_id, platform, title, description, tags, category,
               duration, published_at, channel_id, channel_name
        FROM video_embeddings
        WHERE processing_status IN ('PENDING', 'FAILED', 'STALE')
        ORDER BY 
          CASE processing_status 
            WHEN 'PENDING' THEN 1 
            WHEN 'STALE' THEN 2 
            WHEN 'FAILED' THEN 3 
          END,
          created_at DESC
        LIMIT $1
      `, [limit]);

      return result.rows.map(row => ({
        platformId: row.platform_id,
        platform: row.platform,
        title: row.title,
        description: row.description,
        tags: row.tags || [],
        category: row.category,
        duration: row.duration,
        publishedAt: row.published_at,
        channelId: row.channel_id,
        channelName: row.channel_name,
      }));
    } catch (error) {
      logger.error('Failed to get videos needing processing', { error });
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Mark embeddings as stale for reprocessing
   */
  async markEmbeddingsStale(olderThanHours: number = 24): Promise<number> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const client = await this.pool.connect();
    try {
      const result = await client.query(`
        UPDATE video_embeddings 
        SET processing_status = 'STALE'
        WHERE processing_status = 'COMPLETED'
        AND last_processed_at < NOW() - INTERVAL '${olderThanHours} hours'
      `);

      logger.info(`Marked ${result.rowCount} embeddings as stale`);
      return result.rowCount || 0;
    } catch (error) {
      logger.error('Failed to mark embeddings as stale', { error });
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Get embedding statistics
   */
  async getEmbeddingStats(): Promise<EmbeddingStats> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const client = await this.pool.connect();
    try {
      // Total embeddings
      const totalResult = await client.query(
        'SELECT COUNT(*) as total FROM video_embeddings'
      );
      const totalEmbeddings = parseInt(totalResult.rows[0].total);

      // Platform breakdown
      const platformResult = await client.query(`
        SELECT platform, COUNT(*) as count 
        FROM video_embeddings 
        GROUP BY platform
      `);
      const platformBreakdown: Record<string, number> = {};
      platformResult.rows.forEach(row => {
        platformBreakdown[row.platform] = parseInt(row.count);
      });

      // Quality distribution
      const qualityResult = await client.query(`
        SELECT 
          COUNT(CASE WHEN quality_score >= 0.8 THEN 1 END) as high,
          COUNT(CASE WHEN quality_score >= 0.6 AND quality_score < 0.8 THEN 1 END) as medium,
          COUNT(CASE WHEN quality_score < 0.6 THEN 1 END) as low
        FROM video_embeddings
        WHERE quality_score IS NOT NULL
      `);
      const qualityDistribution = {
        high: parseInt(qualityResult.rows[0].high),
        medium: parseInt(qualityResult.rows[0].medium),
        low: parseInt(qualityResult.rows[0].low),
      };

      // Processing status
      const statusResult = await client.query(`
        SELECT processing_status, COUNT(*) as count 
        FROM video_embeddings 
        GROUP BY processing_status
      `);
      const processingStatus: Record<string, number> = {};
      statusResult.rows.forEach(row => {
        processingStatus[row.processing_status] = parseInt(row.count);
      });

      return {
        totalEmbeddings,
        platformBreakdown,
        qualityDistribution,
        processingStatus,
      };
    } catch (error) {
      logger.error('Failed to get embedding stats', { error });
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Close database connections
   */
  async close(): Promise<void> {
    await this.pool.end();
    logger.info('Vector database connections closed');
  }

  /**
   * Health check for database connectivity
   */
  async healthCheck(): Promise<boolean> {
    try {
      const client = await this.pool.connect();
      await client.query('SELECT 1');
      client.release();
      return true;
    } catch (error) {
      logger.error('Database health check failed', { error });
      return false;
    }
  }
}

export const vectorDatabaseManager = new VectorDatabaseManager();