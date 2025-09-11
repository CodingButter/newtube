/**
 * NEWTUBE Embedding Background Job System
 * Manages continuous processing of video embeddings with job queue and monitoring
 */

import { videoEmbeddingPipeline, PipelineOptions } from './pipeline';
import { vectorDatabaseManager } from './database';
import { VideoMetadata } from './processor';
import { getAIConfig } from '../config';
import { logger } from '../../lib/logger';

export interface EmbeddingJob {
  id: string;
  type: 'VIDEO_EMBEDDING' | 'USER_EMBEDDING' | 'BATCH_UPDATE' | 'INCREMENTAL_UPDATE';
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'RETRYING';
  priority: number; // Higher = more priority
  data: {
    videos?: VideoMetadata[];
    options?: PipelineOptions;
    userId?: string;
    batchSize?: number;
  };
  metadata: {
    createdAt: Date;
    startedAt?: Date;
    completedAt?: Date;
    retryCount: number;
    maxRetries: number;
    errorMessage?: string;
    progressPercent: number;
    estimatedDurationMs?: number;
  };
  result?: {
    processedVideos: number;
    failedVideos: number;
    tokensUsed: number;
    qualityScore: number;
  };
}

export interface JobQueueStats {
  totalJobs: number;
  pendingJobs: number;
  runningJobs: number;
  completedJobs: number;
  failedJobs: number;
  avgProcessingTimeMs: number;
  totalTokensUsed: number;
}

export class EmbeddingJobQueue {
  private jobs: Map<string, EmbeddingJob> = new Map();
  private isProcessing = false;
  private currentJobId: string | null = null;
  private config = getAIConfig();
  private stats = {
    totalJobsProcessed: 0,
    totalTokensUsed: 0,
    avgProcessingTimeMs: 0,
    errorRate: 0,
  };

  constructor() {
    // Start the job processor
    this.startJobProcessor();
    
    // Schedule automatic incremental updates
    this.scheduleIncrementalUpdates();
    
    // Schedule maintenance tasks
    this.scheduleMaintenanceTasks();
  }

  /**
   * Add a new embedding job to the queue
   */
  async addJob(
    type: EmbeddingJob['type'],
    data: EmbeddingJob['data'],
    priority: number = 0,
    maxRetries: number = 3
  ): Promise<string> {
    const jobId = `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const job: EmbeddingJob = {
      id: jobId,
      type,
      status: 'PENDING',
      priority,
      data,
      metadata: {
        createdAt: new Date(),
        retryCount: 0,
        maxRetries,
        progressPercent: 0,
      },
    };

    this.jobs.set(jobId, job);
    
    logger.info(`Added job ${jobId} to queue`, {
      type,
      priority,
      queueSize: this.jobs.size,
      videosCount: data.videos?.length || 0,
    });

    // Trigger job processing if not already running
    if (!this.isProcessing) {
      setImmediate(() => this.processNextJob());
    }

    return jobId;
  }

  /**
   * Get job status and details
   */
  getJob(jobId: string): EmbeddingJob | undefined {
    return this.jobs.get(jobId);
  }

  /**
   * Cancel a pending job
   */
  cancelJob(jobId: string): boolean {
    const job = this.jobs.get(jobId);
    if (!job || job.status === 'RUNNING' || job.status === 'COMPLETED') {
      return false;
    }

    job.status = 'CANCELLED';
    job.metadata.completedAt = new Date();
    
    logger.info(`Cancelled job ${jobId}`);
    return true;
  }

  /**
   * Get queue statistics
   */
  getQueueStats(): JobQueueStats {
    const jobs = Array.from(this.jobs.values());
    
    const totalJobs = jobs.length;
    const pendingJobs = jobs.filter(j => j.status === 'PENDING').length;
    const runningJobs = jobs.filter(j => j.status === 'RUNNING').length;
    const completedJobs = jobs.filter(j => j.status === 'COMPLETED').length;
    const failedJobs = jobs.filter(j => j.status === 'FAILED').length;
    
    const completedJobsWithTime = jobs.filter(j => 
      j.status === 'COMPLETED' && j.metadata.startedAt && j.metadata.completedAt
    );
    
    const avgProcessingTimeMs = completedJobsWithTime.length > 0
      ? completedJobsWithTime.reduce((sum, job) => {
          const duration = job.metadata.completedAt!.getTime() - job.metadata.startedAt!.getTime();
          return sum + duration;
        }, 0) / completedJobsWithTime.length
      : 0;

    const totalTokensUsed = jobs
      .filter(j => j.result)
      .reduce((sum, job) => sum + (job.result?.tokensUsed || 0), 0);

    return {
      totalJobs,
      pendingJobs,
      runningJobs,
      completedJobs,
      failedJobs,
      avgProcessingTimeMs,
      totalTokensUsed,
    };
  }

  /**
   * Clean up old completed jobs
   */
  cleanupOldJobs(olderThanHours: number = 24): number {
    const cutoffTime = new Date(Date.now() - olderThanHours * 60 * 60 * 1000);
    let cleanedCount = 0;

    for (const [jobId, job] of this.jobs.entries()) {
      if (
        (job.status === 'COMPLETED' || job.status === 'FAILED') &&
        job.metadata.completedAt &&
        job.metadata.completedAt < cutoffTime
      ) {
        this.jobs.delete(jobId);
        cleanedCount++;
      }
    }

    if (cleanedCount > 0) {
      logger.info(`Cleaned up ${cleanedCount} old jobs`);
    }

    return cleanedCount;
  }

  /**
   * Start the job processor loop
   */
  private startJobProcessor(): void {
    setInterval(async () => {
      if (!this.isProcessing) {
        await this.processNextJob();
      }
    }, 5000); // Check for new jobs every 5 seconds
  }

  /**
   * Process the next job in the queue
   */
  private async processNextJob(): Promise<void> {
    if (this.isProcessing) return;

    // Get highest priority pending job
    const pendingJobs = Array.from(this.jobs.values())
      .filter(job => job.status === 'PENDING')
      .sort((a, b) => b.priority - a.priority || a.metadata.createdAt.getTime() - b.metadata.createdAt.getTime());

    if (pendingJobs.length === 0) return;

    const job = pendingJobs[0];
    this.isProcessing = true;
    this.currentJobId = job.id;

    try {
      await this.executeJob(job);
    } catch (error) {
      logger.error(`Job processor error for job ${job.id}`, { error });
    } finally {
      this.isProcessing = false;
      this.currentJobId = null;
    }
  }

  /**
   * Execute a specific job
   */
  private async executeJob(job: EmbeddingJob): Promise<void> {
    logger.info(`Starting job ${job.id}`, {
      type: job.type,
      priority: job.priority,
      retryCount: job.metadata.retryCount,
    });

    job.status = 'RUNNING';
    job.metadata.startedAt = new Date();
    job.metadata.progressPercent = 0;

    try {
      switch (job.type) {
        case 'VIDEO_EMBEDDING':
          await this.executeVideoEmbeddingJob(job);
          break;
        
        case 'BATCH_UPDATE':
          await this.executeBatchUpdateJob(job);
          break;
        
        case 'INCREMENTAL_UPDATE':
          await this.executeIncrementalUpdateJob(job);
          break;
        
        default:
          throw new Error(`Unknown job type: ${job.type}`);
      }

      job.status = 'COMPLETED';
      job.metadata.completedAt = new Date();
      job.metadata.progressPercent = 100;

      this.updateStats(job, true);
      
      logger.info(`Completed job ${job.id}`, {
        type: job.type,
        result: job.result,
        durationMs: job.metadata.completedAt.getTime() - job.metadata.startedAt!.getTime(),
      });
    } catch (error) {
      job.metadata.errorMessage = error instanceof Error ? error.message : String(error);
      job.metadata.retryCount++;

      if (job.metadata.retryCount < job.metadata.maxRetries) {
        job.status = 'RETRYING';
        // Exponential backoff for retries
        const retryDelayMs = Math.min(1000 * Math.pow(2, job.metadata.retryCount), 60000);
        
        logger.warn(`Job ${job.id} failed, retrying in ${retryDelayMs}ms`, {
          error: job.metadata.errorMessage,
          retryCount: job.metadata.retryCount,
          maxRetries: job.metadata.maxRetries,
        });

        setTimeout(() => {
          job.status = 'PENDING';
        }, retryDelayMs);
      } else {
        job.status = 'FAILED';
        job.metadata.completedAt = new Date();
        this.updateStats(job, false);
        
        logger.error(`Job ${job.id} failed permanently`, {
          error: job.metadata.errorMessage,
          retryCount: job.metadata.retryCount,
        });
      }
    }
  }

  /**
   * Execute video embedding job
   */
  private async executeVideoEmbeddingJob(job: EmbeddingJob): Promise<void> {
    if (!job.data.videos || job.data.videos.length === 0) {
      throw new Error('No videos provided for embedding job');
    }

    const result = await videoEmbeddingPipeline.runPipeline(
      job.data.videos,
      job.data.options || {}
    );

    job.result = {
      processedVideos: result.processedVideos,
      failedVideos: result.failedVideos,
      tokensUsed: result.tokensUsed,
      qualityScore: result.qualityStats.avgQualityScore,
    };

    // Update progress during processing (simplified)
    job.metadata.progressPercent = (result.processedVideos / job.data.videos.length) * 100;
  }

  /**
   * Execute batch update job
   */
  private async executeBatchUpdateJob(job: EmbeddingJob): Promise<void> {
    const batchSize = job.data.batchSize || this.config.jobs.batchProcessing.defaultBatchSize;
    const videosNeedingUpdate = await vectorDatabaseManager.getVideosNeedingProcessing(batchSize);

    if (videosNeedingUpdate.length === 0) {
      job.result = { processedVideos: 0, failedVideos: 0, tokensUsed: 0, qualityScore: 0 };
      return;
    }

    const result = await videoEmbeddingPipeline.runPipeline(videosNeedingUpdate, {
      batchSize: Math.min(50, batchSize),
      skipExisting: false,
    });

    job.result = {
      processedVideos: result.processedVideos,
      failedVideos: result.failedVideos,
      tokensUsed: result.tokensUsed,
      qualityScore: result.qualityStats.avgQualityScore,
    };
  }

  /**
   * Execute incremental update job
   */
  private async executeIncrementalUpdateJob(job: EmbeddingJob): Promise<void> {
    const result = await videoEmbeddingPipeline.runIncrementalUpdate();

    job.result = {
      processedVideos: result.newVideosProcessed,
      failedVideos: 0, // Incremental updates don't track failures separately
      tokensUsed: result.tokensUsed,
      qualityScore: 0, // Not applicable for incremental updates
    };
  }

  /**
   * Schedule automatic incremental updates
   */
  private scheduleIncrementalUpdates(): void {
    const intervalMs = this.config.jobs.incrementalUpdates.intervalMs;
    
    setInterval(async () => {
      // Only add incremental update if queue isn't overloaded
      const stats = this.getQueueStats();
      if (stats.pendingJobs < 5) {
        await this.addJob('INCREMENTAL_UPDATE', {}, 1, 1); // Low priority, single retry
      } else {
        logger.warn('Skipping incremental update - queue overloaded', { pendingJobs: stats.pendingJobs });
      }
    }, intervalMs);
  }

  /**
   * Schedule maintenance tasks
   */
  private scheduleMaintenanceTasks(): void {
    // Clean up old jobs every hour
    setInterval(() => {
      this.cleanupOldJobs(24);
    }, 60 * 60 * 1000);

    // Mark stale embeddings every 6 hours
    setInterval(async () => {
      try {
        await vectorDatabaseManager.markEmbeddingsStale(24);
      } catch (error) {
        logger.error('Failed to mark stale embeddings', { error });
      }
    }, 6 * 60 * 60 * 1000);
  }

  /**
   * Update internal statistics
   */
  private updateStats(job: EmbeddingJob, success: boolean): void {
    this.stats.totalJobsProcessed++;
    
    if (job.result) {
      this.stats.totalTokensUsed += job.result.tokensUsed;
    }

    if (job.metadata.startedAt && job.metadata.completedAt) {
      const duration = job.metadata.completedAt.getTime() - job.metadata.startedAt.getTime();
      this.stats.avgProcessingTimeMs = 
        (this.stats.avgProcessingTimeMs * (this.stats.totalJobsProcessed - 1) + duration) / 
        this.stats.totalJobsProcessed;
    }

    // Update error rate
    const totalJobs = this.stats.totalJobsProcessed;
    const successfulJobs = success ? totalJobs : totalJobs - 1;
    this.stats.errorRate = (totalJobs - successfulJobs) / totalJobs;
  }

  /**
   * Get current job processing status
   */
  getCurrentStatus(): {
    isProcessing: boolean;
    currentJobId: string | null;
    queueStats: JobQueueStats;
    systemStats: typeof this.stats;
  } {
    return {
      isProcessing: this.isProcessing,
      currentJobId: this.currentJobId,
      queueStats: this.getQueueStats(),
      systemStats: this.stats,
    };
  }
}

export const embeddingJobQueue = new EmbeddingJobQueue();