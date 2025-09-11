/**
 * NEWTUBE Embedding Providers
 * Handles OpenAI and potential future embedding providers with rate limiting and error handling
 */

import OpenAI from 'openai';
import { getAIConfig } from '../config';
import { logger } from '../../lib/logger';

export interface EmbeddingProvider {
  generateEmbedding(text: string): Promise<number[]>;
  generateBatchEmbeddings(texts: string[]): Promise<number[][]>;
  validateEmbedding(embedding: number[]): boolean;
  getModelInfo(): {
    name: string;
    dimensions: number;
    maxTokens: number;
  };
}

export interface EmbeddingRequest {
  id: string;
  text: string;
  type: 'title' | 'description' | 'combined' | 'comment' | 'search';
}

export interface EmbeddingResult {
  id: string;
  embedding: number[];
  tokenCount: number;
  processingTimeMs: number;
  success: boolean;
  error?: string;
}

export interface BatchEmbeddingResult {
  results: EmbeddingResult[];
  totalTokens: number;
  totalProcessingTimeMs: number;
  successCount: number;
  errorCount: number;
  rateLimitInfo?: {
    requestsRemaining: number;
    tokensRemaining: number;
    resetTime: Date;
  };
}

class RateLimiter {
  private requestTokens: number = 0;
  private tokenTokens: number = 0;
  private requestResetTime: Date = new Date();
  private tokenResetTime: Date = new Date();
  private config = getAIConfig().openai;

  async checkAndWait(tokenCount: number): Promise<void> {
    const now = new Date();
    
    // Reset counters if time window has passed
    if (now >= this.requestResetTime) {
      this.requestTokens = 0;
      this.requestResetTime = new Date(now.getTime() + 60000); // 1 minute window
    }
    
    if (now >= this.tokenResetTime) {
      this.tokenTokens = 0;
      this.tokenResetTime = new Date(now.getTime() + 60000); // 1 minute window
    }
    
    // Check if we would exceed limits
    const wouldExceedRequests = this.requestTokens >= this.config.rateLimitRpm;
    const wouldExceedTokens = this.tokenTokens + tokenCount > this.config.rateLimitTpm;
    
    if (wouldExceedRequests || wouldExceedTokens) {
      const waitTimeRequests = this.requestResetTime.getTime() - now.getTime();
      const waitTimeTokens = this.tokenResetTime.getTime() - now.getTime();
      const waitTime = Math.max(waitTimeRequests, waitTimeTokens);
      
      logger.info(`Rate limit reached. Waiting ${waitTime}ms`, {
        requestTokens: this.requestTokens,
        tokenTokens: this.tokenTokens,
        requestedTokens: tokenCount,
      });
      
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return this.checkAndWait(tokenCount);
    }
    
    // Update counters
    this.requestTokens++;
    this.tokenTokens += tokenCount;
  }
  
  getRemainingCapacity(): { requests: number; tokens: number } {
    return {
      requests: Math.max(0, this.config.rateLimitRpm - this.requestTokens),
      tokens: Math.max(0, this.config.rateLimitTpm - this.tokenTokens),
    };
  }
}

export class OpenAIEmbeddingProvider implements EmbeddingProvider {
  private client: OpenAI;
  private config = getAIConfig().openai;
  private rateLimiter = new RateLimiter();
  private metrics = {
    totalRequests: 0,
    totalTokens: 0,
    totalErrors: 0,
    avgProcessingTime: 0,
  };

  constructor(apiKey?: string) {
    this.client = new OpenAI({
      apiKey: apiKey || process.env.OPENAI_API_KEY,
    });
  }

  async generateEmbedding(text: string): Promise<number[]> {
    const result = await this.generateBatchEmbeddings([text]);
    if (result.length === 0) {
      throw new Error('Failed to generate embedding');
    }
    return result[0];
  }

  async generateBatchEmbeddings(texts: string[]): Promise<number[][]> {
    if (texts.length === 0) return [];
    if (texts.length > this.config.batchSize) {
      throw new Error(`Batch size ${texts.length} exceeds maximum ${this.config.batchSize}`);
    }

    // Estimate token count (rough approximation: 1 token ≈ 4 characters)
    const estimatedTokens = texts.reduce((sum, text) => sum + Math.ceil(text.length / 4), 0);
    
    // Wait for rate limit if necessary
    await this.rateLimiter.checkAndWait(estimatedTokens);

    const startTime = Date.now();
    
    try {
      logger.debug(`Generating embeddings for ${texts.length} texts`, {
        estimatedTokens,
        modelName: this.config.model,
      });

      const response = await this.client.embeddings.create({
        model: this.config.model,
        input: texts,
        dimensions: this.config.dimensions,
      });

      const processingTime = Date.now() - startTime;
      const embeddings = response.data.map(item => item.embedding);
      
      // Update metrics
      this.metrics.totalRequests++;
      this.metrics.totalTokens += response.usage.total_tokens;
      this.metrics.avgProcessingTime = 
        (this.metrics.avgProcessingTime * (this.metrics.totalRequests - 1) + processingTime) / 
        this.metrics.totalRequests;

      logger.info(`Generated ${embeddings.length} embeddings`, {
        tokensUsed: response.usage.total_tokens,
        processingTimeMs: processingTime,
        avgDimensions: embeddings.length > 0 ? embeddings[0].length : 0,
      });

      return embeddings;
    } catch (error) {
      this.metrics.totalErrors++;
      logger.error('Failed to generate embeddings', {
        error: error instanceof Error ? error.message : String(error),
        textsCount: texts.length,
        estimatedTokens,
      });
      throw error;
    }
  }

  validateEmbedding(embedding: number[]): boolean {
    if (!Array.isArray(embedding)) return false;
    if (embedding.length !== this.config.dimensions) return false;
    if (embedding.some(val => !Number.isFinite(val))) return false;
    
    // Check if vector is normalized (optional, but good practice)
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    return magnitude > 0.1 && magnitude < 10; // Reasonable magnitude range
  }

  getModelInfo() {
    return {
      name: this.config.model,
      dimensions: this.config.dimensions,
      maxTokens: this.config.maxTokens,
    };
  }

  getMetrics() {
    return {
      ...this.metrics,
      rateLimitCapacity: this.rateLimiter.getRemainingCapacity(),
    };
  }

  async healthCheck(): Promise<boolean> {
    try {
      const testEmbedding = await this.generateEmbedding('health check test');
      return this.validateEmbedding(testEmbedding);
    } catch (error) {
      logger.error('Health check failed', { error });
      return false;
    }
  }
}

export class EmbeddingProviderManager {
  private providers: Map<string, EmbeddingProvider> = new Map();
  private defaultProvider: string;

  constructor() {
    // Initialize OpenAI provider
    const openaiProvider = new OpenAIEmbeddingProvider();
    this.providers.set('openai', openaiProvider);
    this.defaultProvider = 'openai';
  }

  getProvider(name?: string): EmbeddingProvider {
    const providerName = name || this.defaultProvider;
    const provider = this.providers.get(providerName);
    if (!provider) {
      throw new Error(`Unknown embedding provider: ${providerName}`);
    }
    return provider;
  }

  async generateBatchEmbeddings(
    requests: EmbeddingRequest[],
    providerName?: string
  ): Promise<BatchEmbeddingResult> {
    const provider = this.getProvider(providerName);
    const startTime = Date.now();
    const results: EmbeddingResult[] = [];
    let totalTokens = 0;

    for (const request of requests) {
      const requestStartTime = Date.now();
      try {
        const embedding = await provider.generateEmbedding(request.text);
        const processingTime = Date.now() - requestStartTime;
        
        // Estimate tokens (rough approximation)
        const tokenCount = Math.ceil(request.text.length / 4);
        totalTokens += tokenCount;

        results.push({
          id: request.id,
          embedding,
          tokenCount,
          processingTimeMs: processingTime,
          success: true,
        });

        logger.debug(`Generated embedding for ${request.type}`, {
          id: request.id,
          textLength: request.text.length,
          processingTimeMs: processingTime,
        });
      } catch (error) {
        results.push({
          id: request.id,
          embedding: [],
          tokenCount: 0,
          processingTimeMs: Date.now() - requestStartTime,
          success: false,
          error: error instanceof Error ? error.message : String(error),
        });

        logger.error(`Failed to generate embedding for ${request.type}`, {
          id: request.id,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    const totalProcessingTime = Date.now() - startTime;
    const successCount = results.filter(r => r.success).length;
    const errorCount = results.length - successCount;

    logger.info(`Batch embedding generation completed`, {
      totalRequests: requests.length,
      successCount,
      errorCount,
      totalTokens,
      totalProcessingTimeMs: totalProcessingTime,
      avgProcessingTimeMs: totalProcessingTime / requests.length,
    });

    return {
      results,
      totalTokens,
      totalProcessingTimeMs: totalProcessingTime,
      successCount,
      errorCount,
    };
  }

  async healthCheck(providerName?: string): Promise<boolean> {
    const provider = this.getProvider(providerName);
    if ('healthCheck' in provider && typeof provider.healthCheck === 'function') {
      return await provider.healthCheck();
    }
    return true; // Assume healthy if no health check method
  }
}

// Singleton instance
export const embeddingProviderManager = new EmbeddingProviderManager();