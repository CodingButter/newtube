/**
 * NEWTUBE Video Embedding Service
 * Handles OpenAI embeddings for video content analysis and personalization
 * Based on existing implementation from semantic memory
 */

import OpenAI from 'openai';
import { Redis } from 'ioredis';

export interface VideoContent {
  id: string;
  platform: 'youtube' | 'vimeo' | 'nebula';
  title: string;
  description?: string;
  tags?: string[];
  duration?: number;
  publishedAt?: Date;
  channelId?: string;
  viewCount?: number;
}

export interface VideoEmbedding {
  videoId: string;
  platform: string;
  titleEmbedding: number[];
  descriptionEmbedding?: number[];
  combinedEmbedding: number[];
  metadata: {
    title: string;
    description?: string;
    tags?: string[];
    embeddingVersion: string;
    createdAt: Date;
  };
}

export interface UserPreferenceProfile {
  userId: string;
  preferenceEmbedding: number[];
  categories: string[];
  watchHistory: {
    videoId: string;
    platform: string;
    watchTime: number;
    rating?: number;
    timestamp: Date;
  }[];
  lastUpdated: Date;
}

export class EmbeddingService {
  private openai: OpenAI;
  private redis: Redis;
  private embeddingModel = 'text-embedding-3-small';
  private dimensions = 1536;
  private maxRetries = 3;
  private retryDelay = 1000; // 1 second
  
  // Rate limiting based on semantic memory knowledge
  private rateLimitRPM = 3000; // 3000 requests per minute
  private rateLimitTPM = 1000000; // 1M tokens per minute
  private batchSize = 5; // 5 embeddings per batch
  private batchDelay = 1000; // 1s delay between batches

  constructor(apiKey: string, redisClient: Redis) {
    this.openai = new OpenAI({ apiKey });
    this.redis = redisClient;
  }

  /**
   * Generate embeddings for video content with weighted strategy
   * Based on semantic memory: Title (40%), Description (35%), Tags (25%)
   */
  async generateVideoEmbeddings(video: VideoContent): Promise<VideoEmbedding> {
    const cacheKey = `embedding:video:${video.platform}:${video.id}:v2`;
    
    // Check cache first
    const cached = await this.redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    try {
      // Generate individual embeddings
      const titleEmbedding = await this.generateEmbedding(video.title);
      
      let descriptionEmbedding: number[] | undefined;
      if (video.description && video.description.trim().length > 0) {
        descriptionEmbedding = await this.generateEmbedding(video.description);
      }

      // Create combined text with weighted approach
      const combinedText = this.createWeightedCombinedText(video);
      const combinedEmbedding = await this.generateEmbedding(combinedText);

      const embedding: VideoEmbedding = {
        videoId: video.id,
        platform: video.platform,
        titleEmbedding,
        descriptionEmbedding,
        combinedEmbedding,
        metadata: {
          title: video.title,
          description: video.description,
          tags: video.tags,
          embeddingVersion: 'v2.0',
          createdAt: new Date()
        }
      };

      // Cache for 24 hours
      await this.redis.setex(cacheKey, 86400, JSON.stringify(embedding));
      
      return embedding;
    } catch (error) {
      console.error('Error generating video embeddings:', error);
      throw new Error(`Failed to generate embeddings for video ${video.id}: ${error}`);
    }
  }

  /**
   * Generate embedding for a single text with retry logic
   */
  async generateEmbedding(text: string): Promise<number[]> {
    if (!text || text.trim().length === 0) {
      throw new Error('Text cannot be empty for embedding generation');
    }

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        // Rate limiting check
        await this.checkRateLimit();

        const response = await this.openai.embeddings.create({
          model: this.embeddingModel,
          input: text.substring(0, 8000), // Limit text length
          dimensions: this.dimensions
        });

        if (!response.data[0]?.embedding) {
          throw new Error('No embedding returned from OpenAI');
        }

        // Update rate limiting counters
        await this.updateRateLimitCounters(text);

        return response.data[0].embedding;
      } catch (error: any) {
        console.error(`Embedding attempt ${attempt} failed:`, error);
        
        if (attempt === this.maxRetries) {
          throw error;
        }

        // Exponential backoff
        const delay = this.retryDelay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw new Error('All embedding attempts failed');
  }

  /**
   * Generate user preference embedding from watch history
   */
  async generateUserPreferenceEmbedding(
    userId: string,
    watchHistory: VideoContent[]
  ): Promise<UserPreferenceProfile> {
    if (watchHistory.length === 0) {
      throw new Error('Watch history cannot be empty');
    }

    // Create weighted text based on user interactions
    const weightedTexts: string[] = [];
    const categories = new Set<string>();

    for (const video of watchHistory) {
      // Weight by engagement (assuming longer videos watched = higher engagement)
      const weight = Math.min(3, Math.floor((video.duration || 300) / 300)); // Max weight of 3
      
      for (let i = 0; i < weight; i++) {
        weightedTexts.push(video.title);
        if (video.description) {
          weightedTexts.push(video.description.substring(0, 500));
        }
      }

      // Extract categories from tags
      if (video.tags) {
        video.tags.forEach(tag => categories.add(tag.toLowerCase()));
      }
    }

    const combinedText = weightedTexts.join(' ');
    const preferenceEmbedding = await this.generateEmbedding(combinedText);

    const profile: UserPreferenceProfile = {
      userId,
      preferenceEmbedding,
      categories: Array.from(categories),
      watchHistory: watchHistory.map(video => ({
        videoId: video.id,
        platform: video.platform,
        watchTime: video.duration || 0,
        timestamp: new Date()
      })),
      lastUpdated: new Date()
    };

    // Cache user profile
    const cacheKey = `user_profile:${userId}`;
    await this.redis.setex(cacheKey, 3600, JSON.stringify(profile)); // 1 hour cache

    return profile;
  }

  /**
   * Create weighted combined text for comprehensive similarity
   * Based on semantic memory: Title (40%), Description (35%), Tags (25%)
   */
  private createWeightedCombinedText(video: VideoContent): string {
    const parts: string[] = [];

    // Title: 40% weight (repeat 2 times)
    for (let i = 0; i < 2; i++) {
      parts.push(video.title);
    }

    // Description: 35% weight (repeat ~1.75 times, round to 2)
    if (video.description) {
      for (let i = 0; i < 2; i++) {
        parts.push(video.description.substring(0, 1000));
      }
    }

    // Tags: 25% weight (repeat 1 time)
    if (video.tags && video.tags.length > 0) {
      parts.push(video.tags.join(' '));
    }

    return parts.join(' ');
  }

  /**
   * Rate limiting check based on semantic memory
   */
  private async checkRateLimit(): Promise<void> {
    const now = Date.now();
    const minute = Math.floor(now / 60000);
    const requestKey = `rate_limit:requests:${minute}`;
    const tokenKey = `rate_limit:tokens:${minute}`;

    const requests = await this.redis.incr(requestKey);
    await this.redis.expire(requestKey, 60);

    if (requests > this.rateLimitRPM) {
      const waitTime = 60000 - (now % 60000);
      throw new Error(`Rate limit exceeded. Wait ${waitTime}ms`);
    }
  }

  /**
   * Update rate limiting counters
   */
  private async updateRateLimitCounters(text: string): Promise<void> {
    const now = Date.now();
    const minute = Math.floor(now / 60000);
    const tokenKey = `rate_limit:tokens:${minute}`;
    
    // Rough token estimation (1 token ≈ 4 characters)
    const estimatedTokens = Math.ceil(text.length / 4);
    
    await this.redis.incrby(tokenKey, estimatedTokens);
    await this.redis.expire(tokenKey, 60);
  }

  /**
   * Calculate cosine similarity between two vectors
   */
  static cosineSimilarity(vecA: number[], vecB: number[]): number {
    if (vecA.length !== vecB.length) {
      throw new Error('Vectors must have the same length');
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  /**
   * Batch process multiple videos for embedding generation
   */
  async batchProcessVideos(videos: VideoContent[]): Promise<VideoEmbedding[]> {
    const results: VideoEmbedding[] = [];
    
    for (let i = 0; i < videos.length; i += this.batchSize) {
      const batch = videos.slice(i, i + this.batchSize);
      
      const batchPromises = batch.map(video => 
        this.generateVideoEmbeddings(video).catch(error => {
          console.error(`Failed to process video ${video.id}:`, error);
          return null;
        })
      );

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults.filter(result => result !== null) as VideoEmbedding[]);

      // Delay between batches to respect rate limits
      if (i + this.batchSize < videos.length) {
        await new Promise(resolve => setTimeout(resolve, this.batchDelay));
      }
    }

    return results;
  }
}