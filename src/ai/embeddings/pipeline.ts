/**
 * NEWTUBE Video Embedding Pipeline
 * Main orchestrator for batch processing video embeddings with incremental updates
 */

import { videoEmbeddingProcessor, VideoMetadata, ProcessingResult } from './processor';
import { vectorDatabaseManager, EmbeddingStats } from './database';
import { getAIConfig } from '../config';
import { logger } from '../../lib/logger';

export interface PipelineOptions {
  batchSize?: number;
  maxRetries?: number;
  skipExisting?: boolean;
  platform?: 'youtube' | 'vimeo' | 'nebula';
  priority?: 'high' | 'medium' | 'low';
  dryRun?: boolean;
}

export interface PipelineResult {
  totalVideos: number;
  processedVideos: number;
  skippedVideos: number;
  failedVideos: number;
  processingTimeMs: number;
  tokensUsed: number;
  qualityStats: {
    avgQualityScore: number;
    highQualityCount: number;
    lowQualityCount: number;
  };
  errors: string[];
}

export interface IncrementalUpdateResult {
  newVideosProcessed: number;
  staleVideosUpdated: number;
  totalProcessingTimeMs: number;
  tokensUsed: number;
  nextUpdateEstimate: Date;
}

export class VideoEmbeddingPipeline {
  private config = getAIConfig();
  private isRunning = false;
  private stats = {
    totalRuns: 0,
    totalVideosProcessed: 0,
    totalTokensUsed: 0,
    avgProcessingTimeMs: 0,
  };

  constructor() {
    // Initialize database connection
    vectorDatabaseManager.initialize().catch(error => {
      logger.error('Failed to initialize vector database', { error });
    });
  }

  /**
   * Run the complete embedding pipeline for a batch of videos
   */
  async runPipeline(videos: VideoMetadata[], options: PipelineOptions = {}): Promise<PipelineResult> {
    if (this.isRunning) {
      throw new Error('Pipeline is already running');
    }

    this.isRunning = true;
    const startTime = Date.now();
    
    try {
      const {
        batchSize = this.config.jobs.batchProcessing.defaultBatchSize,
        maxRetries = 3,
        skipExisting = true,
        platform,
        dryRun = false,
      } = options;

      logger.info('Starting video embedding pipeline', {
        totalVideos: videos.length,
        batchSize,
        platform,
        dryRun,
      });

      // Filter videos by platform if specified
      let filteredVideos = platform 
        ? videos.filter(v => v.platform === platform)
        : videos;

      // Skip existing videos if requested
      if (skipExisting && !dryRun) {
        filteredVideos = await this.filterExistingVideos(filteredVideos);
      }

      const result: PipelineResult = {
        totalVideos: videos.length,
        processedVideos: 0,
        skippedVideos: videos.length - filteredVideos.length,
        failedVideos: 0,
        processingTimeMs: 0,
        tokensUsed: 0,
        qualityStats: {
          avgQualityScore: 0,
          highQualityCount: 0,
          lowQualityCount: 0,
        },
        errors: [],
      };

      if (filteredVideos.length === 0) {
        logger.info('No videos to process');
        return result;
      }

      // Process videos in batches
      const batches = this.createBatches(filteredVideos, batchSize);
      let allSuccessful: any[] = [];
      let retryQueue: VideoMetadata[] = [];

      for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
        const batch = batches[batchIndex];
        logger.info(`Processing batch ${batchIndex + 1}/${batches.length} (${batch.length} videos)`);

        try {
          const batchResult = await videoEmbeddingProcessor.processVideoBatch(batch);
          
          if (!dryRun && batchResult.successful.length > 0) {
            await vectorDatabaseManager.storeVideoEmbeddings(batchResult.successful);
          }

          // Accumulate results
          allSuccessful.push(...batchResult.successful);
          result.processedVideos += batchResult.successful.length;
          result.failedVideos += batchResult.failed.length;
          result.tokensUsed += batchResult.metrics.totalTokens;

          // Queue failed videos for retry
          retryQueue.push(...batchResult.failed.map(f => f.metadata));
          result.errors.push(...batchResult.failed.map(f => f.error));

          logger.info(`Batch ${batchIndex + 1} completed`, {
            successful: batchResult.successful.length,
            failed: batchResult.failed.length,
            tokensUsed: batchResult.metrics.totalTokens,
          });
        } catch (error) {
          logger.error(`Batch ${batchIndex + 1} failed completely`, { error });
          result.failedVideos += batch.length;
          result.errors.push(error instanceof Error ? error.message : String(error));
        }

        // Rate limiting pause between batches
        if (batchIndex < batches.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      // Retry failed videos
      if (retryQueue.length > 0 && maxRetries > 0) {
        logger.info(`Retrying ${retryQueue.length} failed videos`);
        const retryResult = await this.retryFailedVideos(retryQueue, maxRetries, dryRun);
        allSuccessful.push(...retryResult.successful);
        result.processedVideos += retryResult.successful.length;
        result.failedVideos = retryQueue.length - retryResult.successful.length;
        result.tokensUsed += retryResult.tokensUsed;
      }

      // Calculate quality statistics
      if (allSuccessful.length > 0) {
        const qualityScores = allSuccessful.map(v => v.qualityScore);
        result.qualityStats.avgQualityScore = 
          qualityScores.reduce((sum, score) => sum + score, 0) / qualityScores.length;
        result.qualityStats.highQualityCount = 
          qualityScores.filter(score => score >= this.config.embeddings.qualityThresholds.highQuality).length;
        result.qualityStats.lowQualityCount = 
          qualityScores.filter(score => score < this.config.embeddings.qualityThresholds.minSimilarity).length;
      }

      result.processingTimeMs = Date.now() - startTime;

      // Update statistics
      this.updateStats(result);

      logger.info('Pipeline completed', result);
      return result;
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Run incremental updates for new and stale videos
   */
  async runIncrementalUpdate(): Promise<IncrementalUpdateResult> {
    const startTime = Date.now();
    const config = this.config.jobs.incrementalUpdates;

    logger.info('Starting incremental update');

    try {
      // Mark stale embeddings
      const staleCount = await vectorDatabaseManager.markEmbeddingsStale(
        config.stalenessThresholdHours
      );

      // Get videos needing processing (new + stale + failed)
      const videosToProcess = await vectorDatabaseManager.getVideosNeedingProcessing(
        config.maxItemsPerUpdate
      );

      let tokensUsed = 0;
      let processedCount = 0;

      if (videosToProcess.length > 0) {
        const pipelineResult = await this.runPipeline(videosToProcess, {
          batchSize: Math.min(50, config.maxItemsPerUpdate),
          skipExisting: false, // We already filtered for videos needing processing
          dryRun: false,
        });

        processedCount = pipelineResult.processedVideos;
        tokensUsed = pipelineResult.tokensUsed;
      }

      const processingTime = Date.now() - startTime;
      const nextUpdateEstimate = new Date(Date.now() + config.intervalMs);

      const result: IncrementalUpdateResult = {
        newVideosProcessed: processedCount,
        staleVideosUpdated: staleCount,
        totalProcessingTimeMs: processingTime,
        tokensUsed,
        nextUpdateEstimate,
      };

      logger.info('Incremental update completed', result);
      return result;
    } catch (error) {
      logger.error('Incremental update failed', { error });
      throw error;
    }
  }

  /**
   * Get pipeline statistics and health metrics
   */
  async getStats(): Promise<{
    pipeline: typeof this.stats;
    database: EmbeddingStats;
    provider: any;
  }> {
    const databaseStats = await vectorDatabaseManager.getEmbeddingStats();
    const providerStats = videoEmbeddingProcessor.getProcessingStats();

    return {
      pipeline: this.stats,
      database: databaseStats,
      provider: providerStats,
    };
  }

  /**
   * Health check for all pipeline components
   */
  async healthCheck(): Promise<{
    pipeline: boolean;
    database: boolean;
    provider: boolean;
    overall: boolean;
  }> {
    const checks = {
      pipeline: !this.isRunning, // Pipeline should not be stuck
      database: await vectorDatabaseManager.healthCheck(),
      provider: await videoEmbeddingProcessor.getProcessingStats().providerMetrics?.healthCheck?.() ?? true,
      overall: false,
    };

    checks.overall = checks.pipeline && checks.database && checks.provider;
    return checks;
  }

  /**
   * Schedule automatic incremental updates
   */
  startIncrementalUpdates(): NodeJS.Timeout {
    const intervalMs = this.config.jobs.incrementalUpdates.intervalMs;
    
    logger.info(`Starting incremental updates every ${intervalMs}ms`);
    
    return setInterval(async () => {
      try {
        if (!this.isRunning) {
          await this.runIncrementalUpdate();
        } else {
          logger.warn('Skipping incremental update - pipeline is running');
        }
      } catch (error) {
        logger.error('Scheduled incremental update failed', { error });
      }
    }, intervalMs);
  }

  /**
   * Filter out videos that already have current embeddings
   */
  private async filterExistingVideos(videos: VideoMetadata[]): Promise<VideoMetadata[]> {
    // This would typically query the database to check existing embeddings
    // For now, return all videos (implement based on database schema)
    return videos;
  }

  /**
   * Create batches from video list
   */
  private createBatches<T>(items: T[], batchSize: number): T[][] {
    const batches: T[][] = [];
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }
    return batches;
  }

  /**
   * Retry failed videos with exponential backoff
   */
  private async retryFailedVideos(
    videos: VideoMetadata[],
    maxRetries: number,
    dryRun: boolean
  ): Promise<{ successful: any[]; tokensUsed: number }> {
    let successful: any[] = [];
    let tokensUsed = 0;
    let retryCount = 0;

    while (videos.length > 0 && retryCount < maxRetries) {
      retryCount++;
      const delay = Math.min(1000 * Math.pow(2, retryCount - 1), 10000); // Exponential backoff, max 10s
      
      logger.info(`Retry attempt ${retryCount}/${maxRetries} for ${videos.length} videos (delay: ${delay}ms)`);
      await new Promise(resolve => setTimeout(resolve, delay));

      try {
        const retryResult = await videoEmbeddingProcessor.processVideoBatch(videos);
        
        if (!dryRun && retryResult.successful.length > 0) {
          await vectorDatabaseManager.storeVideoEmbeddings(retryResult.successful);
        }

        successful.push(...retryResult.successful);
        tokensUsed += retryResult.metrics.totalTokens;

        // Remove successful videos from retry queue
        const successfulIds = new Set(retryResult.successful.map(v => v.platformId));
        videos = videos.filter(v => !successfulIds.has(v.platformId));
      } catch (error) {
        logger.error(`Retry attempt ${retryCount} failed`, { error });
      }
    }

    return { successful, tokensUsed };
  }

  /**
   * Update internal statistics
   */
  private updateStats(result: PipelineResult): void {
    this.stats.totalRuns++;
    this.stats.totalVideosProcessed += result.processedVideos;
    this.stats.totalTokensUsed += result.tokensUsed;
    this.stats.avgProcessingTimeMs = 
      (this.stats.avgProcessingTimeMs * (this.stats.totalRuns - 1) + result.processingTimeMs) / 
      this.stats.totalRuns;
  }
}

export const videoEmbeddingPipeline = new VideoEmbeddingPipeline();