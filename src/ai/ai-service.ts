/**
 * NEWTUBE AI Service Facade
 * Main integration point for all AI/ML features
 * Coordinates embedding, personalization, and comment filtering services
 */

import { Pool } from 'pg';
import { Redis } from 'ioredis';
import { EmbeddingService, VideoContent, VideoEmbedding, UserPreferenceProfile } from './embedding-service';
import { PersonalizationService, RecommendationRequest, RecommendationScore } from './personalization-service';
import { CommentFilteringService, Comment, CommentAnalysis, CommentFilter, CommentLens } from './comment-filtering-service';
import { VectorDatabaseService, VectorSearchOptions, HybridSearchOptions, SimilaritySearchResult } from './vector-database-service';

export interface AIServiceConfig {
  openaiApiKey: string;
  pgPool: Pool;
  redisClient: Redis;
  features?: {
    embeddings?: boolean;
    personalization?: boolean;
    commentFiltering?: boolean;
    vectorSearch?: boolean;
  };
}

export interface ContentAnalysisRequest {
  videos?: VideoContent[];
  comments?: Comment[];
  includeEmbeddings?: boolean;
  videoContext?: {
    title: string;
    description?: string;
    tags?: string[];
  };
}

export interface ContentAnalysisResult {
  videoEmbeddings?: VideoEmbedding[];
  commentAnalyses?: CommentAnalysis[];
  processingStats: {
    videosProcessed: number;
    commentsProcessed: number;
    processingTime: number;
    errors: string[];
  };
}

export interface AIRecommendationRequest {
  userId: string;
  type: 'personalized' | 'trending' | 'similar' | 'category';
  context?: {
    currentVideoId?: string;
    currentPlatform?: string;
    categories?: string[];
    excludeVideoIds?: string[];
  };
  options?: {
    limit?: number;
    diversityWeight?: number;
    recencyWeight?: number;
    platforms?: string[];
  };
}

export class AIService {
  private embeddingService: EmbeddingService;
  private personalizationService: PersonalizationService;
  private commentFilteringService: CommentFilteringService;
  private vectorDatabaseService: VectorDatabaseService;
  private config: Required<AIServiceConfig>;

  constructor(config: AIServiceConfig) {
    // Set default feature flags
    this.config = {
      ...config,
      features: {
        embeddings: true,
        personalization: true,
        commentFiltering: true,
        vectorSearch: true,
        ...config.features
      }
    };

    // Initialize services
    this.embeddingService = new EmbeddingService(
      config.openaiApiKey,
      config.redisClient
    );

    this.vectorDatabaseService = new VectorDatabaseService(
      config.pgPool,
      config.redisClient
    );

    this.personalizationService = new PersonalizationService(
      this.embeddingService,
      config.redisClient
    );

    this.commentFilteringService = new CommentFilteringService(
      this.embeddingService,
      config.redisClient
    );
  }

  /**
   * Initialize all AI services and database components
   */
  async initialize(): Promise<void> {
    try {
      console.log('Initializing NEWTUBE AI Service...');

      if (this.config.features.vectorSearch) {
        await this.vectorDatabaseService.initialize();
        console.log('Vector database initialized');
      }

      console.log('AI Service initialization complete');

    } catch (error) {
      console.error('Error initializing AI Service:', error);
      throw new Error(`Failed to initialize AI Service: ${error}`);
    }
  }

  /**
   * Analyze content (videos and comments) for embeddings and analysis
   */
  async analyzeContent(request: ContentAnalysisRequest): Promise<ContentAnalysisResult> {
    const startTime = Date.now();
    const result: ContentAnalysisResult = {
      processingStats: {
        videosProcessed: 0,
        commentsProcessed: 0,
        processingTime: 0,
        errors: []
      }
    };

    try {
      // Process videos if provided and embeddings enabled
      if (request.videos && this.config.features.embeddings) {
        try {
          result.videoEmbeddings = await this.embeddingService.batchProcessVideos(request.videos);
          result.processingStats.videosProcessed = result.videoEmbeddings.length;

          // Store embeddings in vector database if enabled
          if (this.config.features.vectorSearch) {
            for (const embedding of result.videoEmbeddings) {
              await this.vectorDatabaseService.storeVideoEmbedding(embedding);
            }
          }
        } catch (error) {
          const errorMsg = `Error processing videos: ${error}`;
          result.processingStats.errors.push(errorMsg);
          console.error(errorMsg);
        }
      }

      // Process comments if provided and comment filtering enabled
      if (request.comments && this.config.features.commentFiltering) {
        try {
          result.commentAnalyses = await this.commentFilteringService.batchAnalyzeComments(
            request.comments,
            request.videoContext
          );
          result.processingStats.commentsProcessed = result.commentAnalyses.length;

          // Store comment embeddings if vector search enabled
          if (this.config.features.vectorSearch && request.includeEmbeddings && result.commentAnalyses) {
            for (let i = 0; i < result.commentAnalyses.length; i++) {
              const analysis = result.commentAnalyses[i];
              const comment = request.comments?.[i];
              
              if (analysis?.embedding && comment) {
                await this.vectorDatabaseService.storeCommentEmbedding(
                  comment.id,
                  comment.videoId,
                  comment.platform,
                  analysis
                );
              }
            }
          }
        } catch (error) {
          const errorMsg = `Error processing comments: ${error}`;
          result.processingStats.errors.push(errorMsg);
          console.error(errorMsg);
        }
      }

      result.processingStats.processingTime = Date.now() - startTime;
      return result;

    } catch (error) {
      result.processingStats.errors.push(`Critical error: ${error}`);
      result.processingStats.processingTime = Date.now() - startTime;
      throw new Error(`Content analysis failed: ${error}`);
    }
  }

  /**
   * Get personalized recommendations for a user
   */
  async getRecommendations(request: AIRecommendationRequest): Promise<RecommendationScore[]> {
    if (!this.config.features.personalization) {
      throw new Error('Personalization feature is disabled');
    }

    try {
      switch (request.type) {
        case 'personalized':
          return this.getPersonalizedRecommendations(request);
        
        case 'similar':
          return this.getSimilarContentRecommendations(request);
        
        case 'trending':
          return this.getTrendingRecommendations(request);
        
        case 'category':
          return this.getCategoryRecommendations(request);
        
        default:
          throw new Error(`Unknown recommendation type: ${request.type}`);
      }

    } catch (error) {
      console.error('Error getting recommendations:', error);
      throw new Error(`Failed to get recommendations: ${error}`);
    }
  }

  /**
   * Filter and analyze comments with various lenses
   */
  async filterComments(
    comments: Comment[],
    filter: CommentFilter | string, // string for lens name
    videoContext?: { title: string; description?: string; tags?: string[] }
  ): Promise<{ comment: Comment; analysis: CommentAnalysis }[]> {
    if (!this.config.features.commentFiltering) {
      throw new Error('Comment filtering feature is disabled');
    }

    try {
      // Analyze comments first
      const analyses = await this.commentFilteringService.batchAnalyzeComments(
        comments,
        videoContext
      );

      // Apply filter or lens
      if (typeof filter === 'string') {
        return this.commentFilteringService.applyCommentLens(comments, analyses, filter);
      } else {
        return this.commentFilteringService.filterComments(comments, analyses, filter);
      }

    } catch (error) {
      console.error('Error filtering comments:', error);
      throw new Error(`Failed to filter comments: ${error}`);
    }
  }

  /**
   * Search for similar content using vector similarity
   */
  async searchSimilarContent(
    query: string | number[],
    options: VectorSearchOptions & { searchType?: 'videos' | 'comments' } = {}
  ): Promise<SimilaritySearchResult[]> {
    if (!this.config.features.vectorSearch) {
      throw new Error('Vector search feature is disabled');
    }

    try {
      // Generate embedding if query is text
      let queryEmbedding: number[];
      if (typeof query === 'string') {
        queryEmbedding = await this.embeddingService.generateEmbedding(query);
      } else {
        queryEmbedding = query;
      }

      const { searchType = 'videos', ...searchOptions } = options;

      // Search based on type
      if (searchType === 'videos') {
        return this.vectorDatabaseService.findSimilarVideos(queryEmbedding, searchOptions);
      } else {
        return this.vectorDatabaseService.findSimilarComments(queryEmbedding, searchOptions);
      }

    } catch (error) {
      console.error('Error searching similar content:', error);
      throw new Error(`Failed to search similar content: ${error}`);
    }
  }

  /**
   * Perform hybrid search combining semantic and text matching
   */
  async hybridSearch(
    query: string,
    options: HybridSearchOptions = {}
  ): Promise<SimilaritySearchResult[]> {
    if (!this.config.features.vectorSearch || !this.config.features.embeddings) {
      throw new Error('Hybrid search requires both vector search and embeddings features');
    }

    try {
      // Generate query embedding
      const queryEmbedding = await this.embeddingService.generateEmbedding(query);

      // Perform hybrid search
      return this.vectorDatabaseService.hybridSearch(queryEmbedding, {
        textQuery: query,
        ...options
      });

    } catch (error) {
      console.error('Error performing hybrid search:', error);
      throw new Error(`Failed to perform hybrid search: ${error}`);
    }
  }

  /**
   * Update user preferences based on interaction
   */
  async updateUserPreferences(
    userId: string,
    video: VideoContent,
    interaction: {
      type: 'watch' | 'like' | 'share' | 'skip';
      duration?: number;
      rating?: number;
    }
  ): Promise<void> {
    if (!this.config.features.personalization) {
      return; // Silently skip if personalization disabled
    }

    try {
      await this.personalizationService.updateUserPreferences(userId, video, interaction);
    } catch (error) {
      console.error('Error updating user preferences:', error);
      // Don't throw - this is a background operation
    }
  }

  /**
   * Get available comment lenses
   */
  getCommentLenses(): CommentLens[] {
    return this.commentFilteringService.getAvailableLenses();
  }

  /**
   * Get AI service health and statistics
   */
  async getServiceHealth(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    features: Record<string, boolean>;
    stats?: any;
    errors: string[];
  }> {
    const errors: string[] = [];
    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';

    try {
      let stats;
      if (this.config.features.vectorSearch) {
        try {
          stats = await this.vectorDatabaseService.getStats();
        } catch (error) {
          errors.push(`Vector database error: ${error}`);
          status = 'degraded';
        }
      }

      // Test basic embedding functionality
      if (this.config.features.embeddings) {
        try {
          await this.embeddingService.generateEmbedding('test');
        } catch (error) {
          errors.push(`Embedding service error: ${error}`);
          status = errors.length > 1 ? 'unhealthy' : 'degraded';
        }
      }

      return {
        status,
        features: this.config.features,
        stats,
        errors
      };

    } catch (error) {
      return {
        status: 'unhealthy',
        features: this.config.features,
        errors: [`Service health check failed: ${error}`]
      };
    }
  }

  // Private helper methods

  private async getPersonalizedRecommendations(request: AIRecommendationRequest): Promise<RecommendationScore[]> {
    return this.personalizationService.getPersonalizedRecommendations({
      userId: request.userId,
      excludeVideoIds: request.context?.excludeVideoIds,
      categories: request.context?.categories,
      platforms: request.options?.platforms as ('youtube' | 'vimeo' | 'nebula')[],
      limit: request.options?.limit,
      diversityWeight: request.options?.diversityWeight,
      recencyWeight: request.options?.recencyWeight
    });
  }

  private async getSimilarContentRecommendations(request: AIRecommendationRequest): Promise<RecommendationScore[]> {
    if (!request.context?.currentVideoId) {
      throw new Error('Current video context required for similar content recommendations');
    }

    try {
      // Get current video embedding
      // This would typically fetch from database, but for now we'll simulate
      const currentVideoEmbedding = await this.generateVideoQueryEmbedding(
        request.context.currentVideoId,
        request.context.currentPlatform || 'youtube'
      );

      // Find similar videos
      const similarResults = await this.vectorDatabaseService.findSimilarVideos(
        currentVideoEmbedding,
        {
          limit: request.options?.limit || 20,
          excludeIds: [request.context.currentVideoId],
          ...(request.options?.platforms && { platforms: request.options.platforms })
        }
      );

      // Convert to recommendation scores
      return similarResults.map(result => ({
        videoId: result.id,
        platform: result.platform,
        score: result.similarity,
        reasons: ['Similar to current video'],
        metadata: {
          semanticSimilarity: result.similarity,
          categoryMatch: 0,
          recencyBoost: 0,
          diversityFactor: 1,
          popularityBoost: 0
        }
      }));

    } catch (error) {
      console.error('Error getting similar content recommendations:', error);
      return [];
    }
  }

  private async getTrendingRecommendations(request: AIRecommendationRequest): Promise<RecommendationScore[]> {
    // TODO: Implement trending algorithm based on recent popularity metrics
    console.log('Trending recommendations not yet implemented');
    return [];
  }

  private async getCategoryRecommendations(request: AIRecommendationRequest): Promise<RecommendationScore[]> {
    if (!request.context?.categories || request.context.categories.length === 0) {
      throw new Error('Categories required for category-based recommendations');
    }

    // TODO: Implement category-based recommendations
    console.log('Category recommendations not yet implemented');
    return [];
  }

  private async generateVideoQueryEmbedding(videoId: string, platform: string): Promise<number[]> {
    // This would typically fetch stored embedding from database
    // For now, return a placeholder embedding
    return new Array(1536).fill(0).map(() => Math.random() - 0.5);
  }
}