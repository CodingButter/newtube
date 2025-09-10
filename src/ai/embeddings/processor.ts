/**
 * NEWTUBE Video Embedding Processor
 * Handles video metadata processing with weighted embedding components
 */

import { getAIConfig } from '../config';
import { embeddingProviderManager, EmbeddingRequest } from './providers';
import { logger } from '../../lib/logger';

export interface VideoMetadata {
  platformId: string;
  platform: 'youtube' | 'vimeo' | 'nebula';
  title?: string;
  description?: string;
  tags?: string[];
  category?: string;
  duration?: number;
  publishedAt?: Date;
  channelId?: string;
  channelName?: string;
}

export interface ProcessedVideoEmbedding {
  platformId: string;
  platform: string;
  metadata: VideoMetadata;
  embeddings: {
    title?: number[];
    description?: number[];
    combined: number[];
  };
  qualityScore: number;
  processingTimeMs: number;
  tokenUsage: {
    title: number;
    description: number;
    total: number;
  };
}

export interface ProcessingResult {
  successful: ProcessedVideoEmbedding[];
  failed: Array<{
    metadata: VideoMetadata;
    error: string;
  }>;
  metrics: {
    totalProcessed: number;
    successCount: number;
    errorCount: number;
    totalProcessingTimeMs: number;
    avgProcessingTimeMs: number;
    totalTokens: number;
  };
}

export class VideoEmbeddingProcessor {
  private config = getAIConfig();

  /**
   * Clean and prepare text for embedding generation
   */
  private cleanText(text: string): string {
    if (!text) return '';
    
    return text
      // Remove excessive whitespace
      .replace(/\s+/g, ' ')
      // Remove HTML tags if any
      .replace(/<[^>]*>/g, '')
      // Remove URLs
      .replace(/https?:\/\/[^\s]+/g, '')
      // Remove excessive punctuation
      .replace(/[^\w\s\-.,!?()]/g, '')
      // Trim and normalize
      .trim()
      .toLowerCase();
  }

  /**
   * Prepare combined text with weighted components
   */
  private prepareCombinedText(metadata: VideoMetadata): string {
    const { weights } = this.config.embeddings;
    const parts: string[] = [];

    // Add title with weight representation (repeat based on weight)
    if (metadata.title) {
      const titleRepeat = Math.round(weights.title * 10); // Convert 0.4 to 4 repetitions
      const cleanTitle = this.cleanText(metadata.title);
      for (let i = 0; i < titleRepeat; i++) {
        parts.push(cleanTitle);
      }
    }

    // Add description with weight representation
    if (metadata.description) {
      const descRepeat = Math.round(weights.description * 10); // Convert 0.35 to 3-4 repetitions
      const cleanDesc = this.cleanText(metadata.description);
      // Split long descriptions to avoid token limits
      const descWords = cleanDesc.split(' ');
      const maxWords = Math.floor(this.config.openai.maxTokens * 0.6 / descRepeat); // Reserve space
      const truncatedDesc = descWords.slice(0, maxWords).join(' ');
      
      for (let i = 0; i < descRepeat; i++) {
        parts.push(truncatedDesc);
      }
    }

    // Add tags with weight representation
    if (metadata.tags && metadata.tags.length > 0) {
      const tagsRepeat = Math.round(weights.tags * 10); // Convert 0.25 to 2-3 repetitions
      const cleanTags = metadata.tags
        .map(tag => this.cleanText(tag))
        .filter(tag => tag.length > 0)
        .join(' ');
      
      for (let i = 0; i < tagsRepeat; i++) {
        parts.push(cleanTags);
      }
    }

    // Add category if available
    if (metadata.category) {
      parts.push(this.cleanText(metadata.category));
    }

    return parts.join(' ').trim();
  }

  /**
   * Calculate embedding quality score based on content richness and embedding properties
   */
  private calculateQualityScore(
    metadata: VideoMetadata,
    embeddings: { title?: number[]; description?: number[]; combined: number[] }
  ): number {
    let score = 0;
    let factors = 0;

    // Content richness factors
    if (metadata.title && metadata.title.length > 10) {
      score += 0.25; // Title quality
      factors++;
    }

    if (metadata.description && metadata.description.length > 50) {
      score += 0.35; // Description quality
      factors++;
    }

    if (metadata.tags && metadata.tags.length > 0) {
      score += 0.20; // Tags presence
      factors++;
    }

    if (metadata.category) {
      score += 0.10; // Category presence
      factors++;
    }

    // Embedding quality factors
    if (embeddings.combined && embeddings.combined.length === this.config.openai.dimensions) {
      // Check embedding magnitude (normalized vectors should have magnitude ~1)
      const magnitude = Math.sqrt(
        embeddings.combined.reduce((sum, val) => sum + val * val, 0)
      );
      
      if (magnitude > 0.5 && magnitude < 2.0) {
        score += 0.10; // Good magnitude
        factors++;
      }
    }

    return factors > 0 ? score : 0;
  }

  /**
   * Process a single video's metadata into embeddings
   */
  async processSingleVideo(metadata: VideoMetadata): Promise<ProcessedVideoEmbedding> {
    const startTime = Date.now();
    const requests: EmbeddingRequest[] = [];
    const tokenUsage = { title: 0, description: 0, total: 0 };

    // Prepare embedding requests
    if (metadata.title) {
      const cleanTitle = this.cleanText(metadata.title);
      if (cleanTitle.length > 0) {
        requests.push({
          id: `${metadata.platformId}_title`,
          text: cleanTitle,
          type: 'title',
        });
        tokenUsage.title = Math.ceil(cleanTitle.length / 4);
      }
    }

    if (metadata.description) {
      const cleanDesc = this.cleanText(metadata.description);
      // Truncate description if too long
      const maxDescLength = this.config.openai.maxTokens * 3; // Rough char limit
      const truncatedDesc = cleanDesc.length > maxDescLength 
        ? cleanDesc.substring(0, maxDescLength) + '...'
        : cleanDesc;
      
      if (truncatedDesc.length > 0) {
        requests.push({
          id: `${metadata.platformId}_description`,
          text: truncatedDesc,
          type: 'description',
        });
        tokenUsage.description = Math.ceil(truncatedDesc.length / 4);
      }
    }

    // Always create combined embedding
    const combinedText = this.prepareCombinedText(metadata);
    if (combinedText.length === 0) {
      throw new Error(`No processable content for video ${metadata.platformId}`);
    }

    requests.push({
      id: `${metadata.platformId}_combined`,
      text: combinedText,
      type: 'combined',
    });

    // Generate embeddings
    const batchResult = await embeddingProviderManager.generateBatchEmbeddings(requests);
    
    if (batchResult.errorCount > 0) {
      const errors = batchResult.results
        .filter(r => !r.success)
        .map(r => r.error)
        .join(', ');
      throw new Error(`Embedding generation failed: ${errors}`);
    }

    // Extract embeddings by type
    const embeddings: { title?: number[]; description?: number[]; combined: number[] } = {
      combined: [], // Will be filled below
    };

    for (const result of batchResult.results) {
      if (result.id.endsWith('_title')) {
        embeddings.title = result.embedding;
      } else if (result.id.endsWith('_description')) {
        embeddings.description = result.embedding;
      } else if (result.id.endsWith('_combined')) {
        embeddings.combined = result.embedding;
      }
    }

    if (embeddings.combined.length === 0) {
      throw new Error(`Failed to generate combined embedding for video ${metadata.platformId}`);
    }

    // Calculate quality score
    const qualityScore = this.calculateQualityScore(metadata, embeddings);

    tokenUsage.total = batchResult.totalTokens;
    const processingTimeMs = Date.now() - startTime;

    logger.debug(`Processed video embedding`, {
      platformId: metadata.platformId,
      platform: metadata.platform,
      qualityScore,
      processingTimeMs,
      tokenUsage,
      embeddingTypes: Object.keys(embeddings),
    });

    return {
      platformId: metadata.platformId,
      platform: metadata.platform,
      metadata,
      embeddings,
      qualityScore,
      processingTimeMs,
      tokenUsage,
    };
  }

  /**
   * Process multiple videos in batches
   */
  async processVideoBatch(videos: VideoMetadata[]): Promise<ProcessingResult> {
    const startTime = Date.now();
    const successful: ProcessedVideoEmbedding[] = [];
    const failed: Array<{ metadata: VideoMetadata; error: string }> = [];
    let totalTokens = 0;

    logger.info(`Starting batch processing of ${videos.length} videos`);

    // Process videos with concurrency control
    const batchSize = this.config.embeddings.processing.batchSize;
    const concurrency = this.config.embeddings.processing.concurrency;

    for (let i = 0; i < videos.length; i += batchSize) {
      const batch = videos.slice(i, i + batchSize);
      const batchPromises: Promise<void>[] = [];

      // Process batch with concurrency limit
      for (let j = 0; j < batch.length; j += concurrency) {
        const concurrent = batch.slice(j, j + concurrency);
        
        const concurrentPromises = concurrent.map(async (video) => {
          try {
            const result = await this.processSingleVideo(video);
            successful.push(result);
            totalTokens += result.tokenUsage.total;
          } catch (error) {
            failed.push({
              metadata: video,
              error: error instanceof Error ? error.message : String(error),
            });
            logger.error(`Failed to process video ${video.platformId}`, {
              platform: video.platform,
              error: error instanceof Error ? error.message : String(error),
            });
          }
        });

        batchPromises.push(Promise.all(concurrentPromises).then(() => {}));
      }

      await Promise.all(batchPromises);

      // Log progress
      const processed = successful.length + failed.length;
      logger.info(`Batch progress: ${processed}/${videos.length} videos processed`);

      // Rate limiting pause between batches
      if (i + batchSize < videos.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    const totalProcessingTime = Date.now() - startTime;
    const metrics = {
      totalProcessed: videos.length,
      successCount: successful.length,
      errorCount: failed.length,
      totalProcessingTimeMs: totalProcessingTime,
      avgProcessingTimeMs: successful.length > 0 
        ? successful.reduce((sum, r) => sum + r.processingTimeMs, 0) / successful.length
        : 0,
      totalTokens,
    };

    logger.info(`Batch processing completed`, metrics);

    return {
      successful,
      failed,
      metrics,
    };
  }

  /**
   * Validate processed embedding meets quality standards
   */
  validateProcessedEmbedding(processed: ProcessedVideoEmbedding): boolean {
    const { qualityThresholds } = this.config.embeddings;
    
    // Check quality score
    if (processed.qualityScore < qualityThresholds.minSimilarity) {
      return false;
    }

    // Check embedding dimensions
    if (processed.embeddings.combined.length !== this.config.openai.dimensions) {
      return false;
    }

    // Check for valid embedding values
    if (processed.embeddings.combined.some(val => !Number.isFinite(val))) {
      return false;
    }

    return true;
  }

  /**
   * Get processing statistics
   */
  getProcessingStats() {
    return {
      config: this.config.embeddings,
      providerMetrics: embeddingProviderManager.getProvider().getMetrics?.() || {},
    };
  }
}

export const videoEmbeddingProcessor = new VideoEmbeddingProcessor();