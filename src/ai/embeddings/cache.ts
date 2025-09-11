/**
 * NEWTUBE Embedding Cache with TTL Management
 * High-performance caching for embeddings and similarity search results
 */

import Redis from 'ioredis';
import { getAIConfig } from '../config';
import { logger } from '../../lib/logger';
import { SimilarityResult } from './database';

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
  accessCount: number;
  lastAccessed: number;
}

export interface CacheStats {
  totalKeys: number;
  hitRate: number;
  missRate: number;
  avgAccessTime: number;
  memoryUsage: {
    embeddings: number;
    similarity: number;
    metadata: number;
    total: number;
  };
}

export class EmbeddingCache {
  private redis?: Redis;
  private memoryCache: Map<string, CacheEntry<any>> = new Map();
  private config = getAIConfig().cache;
  private stats = {
    hits: 0,
    misses: 0,
    totalRequests: 0,
    avgAccessTime: 0,
  };

  constructor() {
    this.initializeRedis();
    this.startCacheCleanup();
  }

  /**
   * Initialize Redis connection if available
   */
  private initializeRedis(): void {
    if (process.env.REDIS_URL) {
      try {
        this.redis = new Redis(process.env.REDIS_URL, {
          maxRetriesPerRequest: 3,
          lazyConnect: true,
        });

        this.redis.on('connect', () => {
          logger.info('Connected to Redis for embedding cache');
        });

        this.redis.on('error', (error) => {
          logger.warn('Redis connection error, falling back to memory cache', { error });
          this.redis = undefined;
        });
      } catch (error) {
        logger.warn('Failed to initialize Redis, using memory cache only', { error });
      }
    } else {
      logger.info('No Redis URL provided, using memory cache only');
    }
  }

  /**
   * Cache video embedding
   */
  async cacheEmbedding(
    platformId: string,
    platform: string,
    embedding: number[],
    metadata?: any
  ): Promise<void> {
    const key = `embedding:${platform}:${platformId}`;
    const value = {
      embedding,
      metadata,
      platform,
      platformId,
    };

    await this.set(key, value, this.config.embeddings.ttlSeconds);
  }

  /**
   * Get cached embedding
   */
  async getCachedEmbedding(
    platformId: string,
    platform: string
  ): Promise<{ embedding: number[]; metadata?: any } | null> {
    const key = `embedding:${platform}:${platformId}`;
    return await this.get(key);
  }

  /**
   * Cache similarity search results
   */
  async cacheSimilarityResults(
    queryHash: string,
    results: SimilarityResult[],
    queryMetadata?: any
  ): Promise<void> {
    const key = `similarity:${queryHash}`;
    const value = {
      results,
      queryMetadata,
      timestamp: Date.now(),
    };

    await this.set(key, value, this.config.similarity.ttlSeconds);
  }

  /**
   * Get cached similarity results
   */
  async getCachedSimilarityResults(queryHash: string): Promise<{
    results: SimilarityResult[];
    queryMetadata?: any;
    timestamp: number;
  } | null> {
    const key = `similarity:${queryHash}`;
    return await this.get(key);
  }

  /**
   * Cache video metadata
   */
  async cacheMetadata(
    platformId: string,
    platform: string,
    metadata: any
  ): Promise<void> {
    const key = `metadata:${platform}:${platformId}`;
    await this.set(key, metadata, this.config.metadata.ttlSeconds);
  }

  /**
   * Get cached metadata
   */
  async getCachedMetadata(platformId: string, platform: string): Promise<any | null> {
    const key = `metadata:${platform}:${platformId}`;
    return await this.get(key);
  }

  /**
   * Cache user preference embedding
   */
  async cacheUserEmbedding(
    userId: string,
    embedding: number[],
    confidenceScore: number
  ): Promise<void> {
    const key = `user:${userId}`;
    const value = {
      embedding,
      confidenceScore,
      timestamp: Date.now(),
    };

    await this.set(key, value, this.config.embeddings.ttlSeconds);
  }

  /**
   * Get cached user embedding
   */
  async getCachedUserEmbedding(userId: string): Promise<{
    embedding: number[];
    confidenceScore: number;
    timestamp: number;
  } | null> {
    const key = `user:${userId}`;
    return await this.get(key);
  }

  /**
   * Generate hash for query embedding (for caching similarity results)
   */
  generateQueryHash(
    embedding: number[],
    options: {
      limit?: number;
      threshold?: number;
      platform?: string;
    } = {}
  ): string {
    // Create a hash from the embedding and options
    const embeddingHash = this.hashArray(embedding);
    const optionsString = JSON.stringify(options);
    return `${embeddingHash}:${this.hashString(optionsString)}`;
  }

  /**
   * Invalidate cache entries by pattern
   */
  async invalidate(pattern: string): Promise<number> {
    let deletedCount = 0;

    // Invalidate Redis cache
    if (this.redis) {
      try {
        const keys = await this.redis.keys(pattern);
        if (keys.length > 0) {
          deletedCount += await this.redis.del(...keys);
        }
      } catch (error) {
        logger.warn('Failed to invalidate Redis cache', { error, pattern });
      }
    }

    // Invalidate memory cache
    for (const key of this.memoryCache.keys()) {
      if (this.matchesPattern(key, pattern)) {
        this.memoryCache.delete(key);
        deletedCount++;
      }
    }

    logger.info(`Invalidated ${deletedCount} cache entries`, { pattern });
    return deletedCount;
  }

  /**
   * Get cache statistics
   */
  async getStats(): Promise<CacheStats> {
    const totalKeys = await this.getTotalKeys();
    const hitRate = this.stats.totalRequests > 0 ? this.stats.hits / this.stats.totalRequests : 0;
    const missRate = this.stats.totalRequests > 0 ? this.stats.misses / this.stats.totalRequests : 0;

    const memoryUsage = {
      embeddings: this.getMemoryUsageByPrefix('embedding:'),
      similarity: this.getMemoryUsageByPrefix('similarity:'),
      metadata: this.getMemoryUsageByPrefix('metadata:'),
      total: this.memoryCache.size,
    };

    return {
      totalKeys,
      hitRate,
      missRate,
      avgAccessTime: this.stats.avgAccessTime,
      memoryUsage,
    };
  }

  /**
   * Clear all cache entries
   */
  async clear(): Promise<void> {
    if (this.redis) {
      await this.redis.flushdb();
    }
    this.memoryCache.clear();
    
    logger.info('Cleared all cache entries');
  }

  /**
   * Generic set method
   */
  private async set(key: string, value: any, ttlSeconds: number): Promise<void> {
    const startTime = Date.now();

    try {
      // Try Redis first
      if (this.redis) {
        await this.redis.setex(key, ttlSeconds, JSON.stringify(value));
      } else {
        // Fallback to memory cache
        const entry: CacheEntry<any> = {
          data: value,
          timestamp: Date.now(),
          ttl: ttlSeconds * 1000, // Convert to milliseconds
          accessCount: 0,
          lastAccessed: Date.now(),
        };

        // Enforce memory cache size limits
        if (this.memoryCache.size >= this.getMaxSizeForKey(key)) {
          this.evictLRU(key);
        }

        this.memoryCache.set(key, entry);
      }

      this.updateAccessTime(Date.now() - startTime);
    } catch (error) {
      logger.warn('Cache set failed', { key, error });
    }
  }

  /**
   * Generic get method
   */
  private async get<T>(key: string): Promise<T | null> {
    const startTime = Date.now();
    this.stats.totalRequests++;

    try {
      // Try Redis first
      if (this.redis) {
        const result = await this.redis.get(key);
        if (result) {
          this.stats.hits++;
          this.updateAccessTime(Date.now() - startTime);
          return JSON.parse(result);
        }
      } else {
        // Try memory cache
        const entry = this.memoryCache.get(key);
        if (entry) {
          // Check if entry has expired
          const now = Date.now();
          if (now - entry.timestamp < entry.ttl) {
            entry.accessCount++;
            entry.lastAccessed = now;
            this.stats.hits++;
            this.updateAccessTime(Date.now() - startTime);
            return entry.data;
          } else {
            // Entry expired, remove it
            this.memoryCache.delete(key);
          }
        }
      }

      this.stats.misses++;
      this.updateAccessTime(Date.now() - startTime);
      return null;
    } catch (error) {
      logger.warn('Cache get failed', { key, error });
      this.stats.misses++;
      return null;
    }
  }

  /**
   * Get total number of keys across all cache stores
   */
  private async getTotalKeys(): Promise<number> {
    let total = this.memoryCache.size;

    if (this.redis) {
      try {
        const redisKeys = await this.redis.dbsize();
        total += redisKeys;
      } catch (error) {
        logger.warn('Failed to get Redis key count', { error });
      }
    }

    return total;
  }

  /**
   * Get memory usage for keys with specific prefix
   */
  private getMemoryUsageByPrefix(prefix: string): number {
    let count = 0;
    for (const key of this.memoryCache.keys()) {
      if (key.startsWith(prefix)) {
        count++;
      }
    }
    return count;
  }

  /**
   * Get maximum cache size for a given key type
   */
  private getMaxSizeForKey(key: string): number {
    if (key.startsWith('embedding:')) return this.config.embeddings.maxSize;
    if (key.startsWith('similarity:')) return this.config.similarity.maxSize;
    if (key.startsWith('metadata:')) return this.config.metadata.maxSize;
    return 1000; // Default max size
  }

  /**
   * Evict least recently used entries to make room
   */
  private evictLRU(newKey: string): void {
    const prefix = newKey.split(':')[0] + ':';
    const entries = Array.from(this.memoryCache.entries())
      .filter(([key]) => key.startsWith(prefix))
      .sort(([, a], [, b]) => a.lastAccessed - b.lastAccessed);

    // Remove 20% of entries with this prefix
    const toRemove = Math.max(1, Math.floor(entries.length * 0.2));
    for (let i = 0; i < toRemove; i++) {
      this.memoryCache.delete(entries[i][0]);
    }
  }

  /**
   * Start periodic cache cleanup
   */
  private startCacheCleanup(): void {
    // Clean up expired entries every 5 minutes
    setInterval(() => {
      this.cleanupExpiredEntries();
    }, 5 * 60 * 1000);
  }

  /**
   * Clean up expired entries from memory cache
   */
  private cleanupExpiredEntries(): void {
    const now = Date.now();
    let cleanedCount = 0;

    for (const [key, entry] of this.memoryCache.entries()) {
      if (now - entry.timestamp >= entry.ttl) {
        this.memoryCache.delete(key);
        cleanedCount++;
      }
    }

    if (cleanedCount > 0) {
      logger.debug(`Cleaned up ${cleanedCount} expired cache entries`);
    }
  }

  /**
   * Update average access time statistics
   */
  private updateAccessTime(accessTime: number): void {
    this.stats.avgAccessTime = 
      (this.stats.avgAccessTime * (this.stats.totalRequests - 1) + accessTime) / 
      this.stats.totalRequests;
  }

  /**
   * Create hash from array (for embedding vectors)
   */
  private hashArray(arr: number[]): string {
    // Sample every 10th element to create a representative hash
    const sample = arr.filter((_, i) => i % 10 === 0);
    return this.hashString(sample.join(','));
  }

  /**
   * Create hash from string
   */
  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Check if key matches pattern (simple wildcard support)
   */
  private matchesPattern(key: string, pattern: string): boolean {
    const regex = new RegExp(pattern.replace(/\*/g, '.*'));
    return regex.test(key);
  }
}

export const embeddingCache = new EmbeddingCache();