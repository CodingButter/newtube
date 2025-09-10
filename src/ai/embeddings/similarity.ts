/**
 * NEWTUBE Similarity Search and Recommendation Engine
 * Advanced similarity search with personalization and recommendation scoring
 */

import { vectorDatabaseManager, SimilarityResult, SimilaritySearchOptions } from './database';
import { embeddingCache } from './cache';
import { embeddingProviderManager } from './providers';
import { getAIConfig } from '../config';
import { logger } from '../../lib/logger';

export interface PersonalizedSearchOptions extends SimilaritySearchOptions {
  userId?: string;
  diversityFactor?: number;     // 0.0 to 1.0, higher = more diverse results
  recencyBoost?: number;        // 0.0 to 1.0, higher = prefer recent content
  personalizedWeight?: number;  // 0.0 to 1.0, weight of personalization vs content similarity
  excludeWatched?: boolean;     // Exclude videos user has already watched
}

export interface RecommendationOptions {
  userId: string;
  limit?: number;
  categories?: string[];
  platforms?: string[];
  minQualityScore?: number;
  includeExplanation?: boolean;
}

export interface ScoredRecommendation extends SimilarityResult {
  score: number;                    // Final recommendation score (0-1)
  components: {
    contentSimilarity: number;      // Content-based similarity
    personalizedSimilarity: number; // User preference similarity
    popularityScore: number;        // Content popularity
    recencyScore: number;          // Content recency
    diversityBonus: number;        // Diversity bonus/penalty
  };
  explanation?: string;             // Human-readable explanation
}

export interface SearchAnalytics {
  queryId: string;
  userId?: string;
  query: string;
  resultsCount: number;
  processingTimeMs: number;
  cacheHit: boolean;
  personalized: boolean;
  avgSimilarity: number;
  topCategories: string[];
}

export class SimilaritySearchEngine {
  private config = getAIConfig();
  private searchHistory: Map<string, SearchAnalytics[]> = new Map();

  /**
   * Perform content-based similarity search
   */
  async searchByContent(
    query: string,
    options: SimilaritySearchOptions = {}
  ): Promise<SimilarityResult[]> {
    const startTime = Date.now();
    
    // Generate embedding for search query
    const queryEmbedding = await embeddingProviderManager
      .getProvider()
      .generateEmbedding(query);

    // Check cache first
    const queryHash = embeddingCache.generateQueryHash(queryEmbedding, options);
    const cachedResults = await embeddingCache.getCachedSimilarityResults(queryHash);
    
    if (cachedResults) {
      logger.debug('Returning cached similarity results', {
        query,
        resultsCount: cachedResults.results.length,
        cacheAge: Date.now() - cachedResults.timestamp,
      });
      return cachedResults.results;
    }

    // Perform database search
    const results = await vectorDatabaseManager.findSimilarVideos(queryEmbedding, options);

    // Cache results
    await embeddingCache.cacheSimilarityResults(queryHash, results, {
      query,
      options,
      timestamp: Date.now(),
    });

    const processingTime = Date.now() - startTime;
    
    // Log analytics
    this.logSearchAnalytics({
      queryId: this.generateQueryId(),
      query,
      resultsCount: results.length,
      processingTimeMs: processingTime,
      cacheHit: false,
      personalized: false,
      avgSimilarity: results.length > 0 
        ? results.reduce((sum, r) => sum + r.similarity, 0) / results.length 
        : 0,
      topCategories: this.extractTopCategories(results),
    });

    return results;
  }

  /**
   * Perform personalized similarity search
   */
  async searchPersonalized(
    query: string,
    options: PersonalizedSearchOptions = {}
  ): Promise<SimilarityResult[]> {
    const startTime = Date.now();
    const {
      userId,
      diversityFactor = this.config.recommendations.personalization.diversityFactor,
      recencyBoost = this.config.recommendations.personalization.recencyBoost,
      personalizedWeight = this.config.recommendations.personalization.userInteractionWeight,
      ...baseOptions
    } = options;

    if (!userId) {
      // Fall back to content-based search
      return this.searchByContent(query, baseOptions);
    }

    // Get user preference embedding
    const userEmbedding = await this.getUserPreferenceEmbedding(userId);
    if (!userEmbedding) {
      logger.warn(`No user embedding found for user ${userId}, falling back to content search`);
      return this.searchByContent(query, baseOptions);
    }

    // Generate query embedding
    const queryEmbedding = await embeddingProviderManager
      .getProvider()
      .generateEmbedding(query);

    // Create hybrid embedding (query + user preferences)
    const hybridEmbedding = this.combineEmbeddings(
      queryEmbedding,
      userEmbedding.embedding,
      personalizedWeight
    );

    // Search with hybrid embedding
    const results = await vectorDatabaseManager.findSimilarVideos(hybridEmbedding, baseOptions);

    // Apply personalization adjustments
    const personalizedResults = this.applyPersonalizationAdjustments(
      results,
      {
        userEmbedding: userEmbedding.embedding,
        diversityFactor,
        recencyBoost,
        originalQuery: queryEmbedding,
      }
    );

    const processingTime = Date.now() - startTime;

    // Log analytics
    this.logSearchAnalytics({
      queryId: this.generateQueryId(),
      userId,
      query,
      resultsCount: personalizedResults.length,
      processingTimeMs: processingTime,
      cacheHit: false,
      personalized: true,
      avgSimilarity: personalizedResults.length > 0 
        ? personalizedResults.reduce((sum, r) => sum + r.similarity, 0) / personalizedResults.length 
        : 0,
      topCategories: this.extractTopCategories(personalizedResults),
    });

    return personalizedResults;
  }

  /**
   * Generate personalized recommendations for a user
   */
  async generateRecommendations(
    options: RecommendationOptions
  ): Promise<ScoredRecommendation[]> {
    const {
      userId,
      limit = 20,
      categories,
      platforms,
      minQualityScore = this.config.embeddings.qualityThresholds.minSimilarity,
      includeExplanation = false,
    } = options;

    logger.info(`Generating recommendations for user ${userId}`, { limit, categories, platforms });

    // Get user preference embedding
    const userEmbedding = await this.getUserPreferenceEmbedding(userId);
    if (!userEmbedding) {
      throw new Error(`No user preference data found for user ${userId}`);
    }

    // Search for similar content
    const searchOptions: SimilaritySearchOptions = {
      limit: limit * 3, // Get more results to allow for filtering and ranking
      threshold: minQualityScore,
      platform: platforms?.[0], // TODO: Handle multiple platforms
      includeMetadata: true,
    };

    const similarVideos = await vectorDatabaseManager.findSimilarVideos(
      userEmbedding.embedding,
      searchOptions
    );

    // Filter by categories if specified
    let filteredVideos = similarVideos;
    if (categories && categories.length > 0) {
      filteredVideos = similarVideos.filter(video => 
        video.tags?.some(tag => categories.includes(tag)) ||
        (video as any).category && categories.includes((video as any).category)
      );
    }

    // Score and rank recommendations
    const scoredRecommendations = await this.scoreRecommendations(
      filteredVideos,
      userId,
      userEmbedding.embedding,
      includeExplanation
    );

    // Apply diversity filtering
    const diverseRecommendations = this.applyDiversityFiltering(
      scoredRecommendations,
      this.config.recommendations.personalization.diversityFactor
    );

    // Return top recommendations
    return diverseRecommendations.slice(0, limit);
  }

  /**
   * Find similar videos to a given video
   */
  async findSimilarToVideo(
    platformId: string,
    platform: string,
    options: SimilaritySearchOptions = {}
  ): Promise<SimilarityResult[]> {
    // Get the video's embedding from cache or database
    const cachedEmbedding = await embeddingCache.getCachedEmbedding(platformId, platform);
    
    if (!cachedEmbedding) {
      throw new Error(`No embedding found for video ${platformId} on ${platform}`);
    }

    // Exclude the source video from results
    const results = await vectorDatabaseManager.findSimilarVideos(
      cachedEmbedding.embedding,
      options
    );

    return results.filter(result => 
      !(result.platformId === platformId && result.platform === platform)
    );
  }

  /**
   * Update user preferences based on interaction
   */
  async updateUserPreferences(
    userId: string,
    interaction: {
      platformId: string;
      platform: string;
      action: 'watch' | 'like' | 'dislike' | 'share' | 'skip';
      watchTime?: number;
      videoLength?: number;
    }
  ): Promise<void> {
    logger.debug(`Updating user preferences for ${userId}`, interaction);

    // Get current user embedding
    let userEmbedding = await this.getUserPreferenceEmbedding(userId);
    
    // Get video embedding
    const videoEmbedding = await embeddingCache.getCachedEmbedding(
      interaction.platformId,
      interaction.platform
    );

    if (!videoEmbedding) {
      logger.warn(`No video embedding found for preference update`, interaction);
      return;
    }

    // Calculate interaction weight based on action and engagement
    const interactionWeight = this.calculateInteractionWeight(interaction);
    
    if (userEmbedding) {
      // Update existing user embedding
      userEmbedding.embedding = this.updateEmbeddingWithInteraction(
        userEmbedding.embedding,
        videoEmbedding.embedding,
        interactionWeight
      );
      userEmbedding.confidenceScore = Math.min(1.0, userEmbedding.confidenceScore + 0.1);
    } else {
      // Create new user embedding
      userEmbedding = {
        embedding: videoEmbedding.embedding.slice(), // Copy the video embedding
        confidenceScore: 0.3, // Low initial confidence
        timestamp: Date.now(),
      };
    }

    // Cache updated user embedding
    await embeddingCache.cacheUserEmbedding(
      userId,
      userEmbedding.embedding,
      userEmbedding.confidenceScore
    );
  }

  /**
   * Get search analytics for a user or overall
   */
  getSearchAnalytics(userId?: string): SearchAnalytics[] {
    if (userId) {
      return this.searchHistory.get(userId) || [];
    }
    
    // Return all analytics
    const allAnalytics: SearchAnalytics[] = [];
    for (const userAnalytics of this.searchHistory.values()) {
      allAnalytics.push(...userAnalytics);
    }
    return allAnalytics;
  }

  /**
   * Tune similarity thresholds based on user feedback
   */
  async tuneSimilarityThresholds(
    feedback: Array<{
      queryId: string;
      resultPlatformId: string;
      resultPlatform: string;
      relevant: boolean;
      similarity: number;
    }>
  ): Promise<{
    recommendedThreshold: number;
    precision: number;
    recall: number;
  }> {
    // Analyze feedback to find optimal threshold
    const relevantResults = feedback.filter(f => f.relevant);
    const irrelevantResults = feedback.filter(f => !f.relevant);

    if (relevantResults.length === 0) {
      return {
        recommendedThreshold: this.config.embeddings.qualityThresholds.minSimilarity,
        precision: 0,
        recall: 0,
      };
    }

    // Find threshold that maximizes F1 score
    const thresholds = Array.from(new Set(feedback.map(f => f.similarity)))
      .sort((a, b) => b - a);

    let bestThreshold = this.config.embeddings.qualityThresholds.minSimilarity;
    let bestF1 = 0;

    for (const threshold of thresholds) {
      const tp = relevantResults.filter(f => f.similarity >= threshold).length;
      const fp = irrelevantResults.filter(f => f.similarity >= threshold).length;
      const fn = relevantResults.filter(f => f.similarity < threshold).length;

      const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
      const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
      const f1 = precision + recall > 0 ? 2 * (precision * recall) / (precision + recall) : 0;

      if (f1 > bestF1) {
        bestF1 = f1;
        bestThreshold = threshold;
      }
    }

    const finalTp = relevantResults.filter(f => f.similarity >= bestThreshold).length;
    const finalFp = irrelevantResults.filter(f => f.similarity >= bestThreshold).length;
    const finalFn = relevantResults.filter(f => f.similarity < bestThreshold).length;

    const finalPrecision = finalTp + finalFp > 0 ? finalTp / (finalTp + finalFp) : 0;
    const finalRecall = finalTp + finalFn > 0 ? finalTp / (finalTp + finalFn) : 0;

    logger.info('Similarity threshold tuning completed', {
      recommendedThreshold: bestThreshold,
      precision: finalPrecision,
      recall: finalRecall,
      f1Score: bestF1,
      feedbackSamples: feedback.length,
    });

    return {
      recommendedThreshold: bestThreshold,
      precision: finalPrecision,
      recall: finalRecall,
    };
  }

  // Private helper methods

  private async getUserPreferenceEmbedding(userId: string): Promise<{
    embedding: number[];
    confidenceScore: number;
    timestamp: number;
  } | null> {
    return await embeddingCache.getCachedUserEmbedding(userId);
  }

  private combineEmbeddings(
    embedding1: number[],
    embedding2: number[],
    weight: number
  ): number[] {
    const combined = embedding1.map((val, i) => 
      val * (1 - weight) + embedding2[i] * weight
    );
    
    // Normalize the combined embedding
    const magnitude = Math.sqrt(combined.reduce((sum, val) => sum + val * val, 0));
    return combined.map(val => val / magnitude);
  }

  private applyPersonalizationAdjustments(
    results: SimilarityResult[],
    adjustments: {
      userEmbedding: number[];
      diversityFactor: number;
      recencyBoost: number;
      originalQuery: number[];
    }
  ): SimilarityResult[] {
    const now = Date.now();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;

    return results.map(result => {
      // Apply recency boost
      let adjustedSimilarity = result.similarity;
      
      if (result.publishedAt && adjustments.recencyBoost > 0) {
        const age = now - result.publishedAt.getTime();
        const recencyScore = Math.max(0, 1 - (age / oneWeek));
        adjustedSimilarity += recencyScore * adjustments.recencyBoost;
      }

      return {
        ...result,
        similarity: Math.min(1.0, adjustedSimilarity),
      };
    }).sort((a, b) => b.similarity - a.similarity);
  }

  private async scoreRecommendations(
    videos: SimilarityResult[],
    userId: string,
    userEmbedding: number[],
    includeExplanation: boolean
  ): Promise<ScoredRecommendation[]> {
    const scoringConfig = this.config.recommendations.scoring;

    return videos.map(video => {
      // Component scores
      const contentSimilarity = video.similarity;
      const personalizedSimilarity = contentSimilarity; // Could be enhanced with additional user data
      const popularityScore = 0.5; // Placeholder - would calculate from engagement metrics
      const recencyScore = this.calculateRecencyScore(video.publishedAt);
      const diversityBonus = 0; // Will be calculated during diversity filtering

      // Calculate weighted final score
      const score = 
        contentSimilarity * scoringConfig.similarityWeight +
        popularityScore * scoringConfig.popularityWeight +
        recencyScore * scoringConfig.recencyWeight +
        personalizedSimilarity * scoringConfig.personalizedWeight;

      const components = {
        contentSimilarity,
        personalizedSimilarity,
        popularityScore,
        recencyScore,
        diversityBonus,
      };

      const explanation = includeExplanation 
        ? this.generateExplanation(video, components)
        : undefined;

      return {
        ...video,
        score,
        components,
        explanation,
      };
    }).sort((a, b) => b.score - a.score);
  }

  private applyDiversityFiltering(
    recommendations: ScoredRecommendation[],
    diversityFactor: number
  ): ScoredRecommendation[] {
    if (diversityFactor === 0) return recommendations;

    const diverseResults: ScoredRecommendation[] = [];
    const seenCategories = new Set<string>();

    for (const rec of recommendations) {
      const categories = rec.tags || [];
      const hasNewCategory = categories.some(cat => !seenCategories.has(cat));
      
      if (hasNewCategory || diverseResults.length < 3) {
        // Add diversity bonus for new categories
        if (hasNewCategory) {
          rec.components.diversityBonus = diversityFactor * 0.1;
          rec.score += rec.components.diversityBonus;
        }
        
        diverseResults.push(rec);
        categories.forEach(cat => seenCategories.add(cat));
      } else if (Math.random() < diversityFactor) {
        // Randomly include some items for diversity
        diverseResults.push(rec);
      }
    }

    return diverseResults.sort((a, b) => b.score - a.score);
  }

  private calculateInteractionWeight(interaction: {
    action: string;
    watchTime?: number;
    videoLength?: number;
  }): number {
    const baseWeights = {
      watch: 0.3,
      like: 0.8,
      dislike: -0.5,
      share: 1.0,
      skip: -0.2,
    };

    let weight = baseWeights[interaction.action as keyof typeof baseWeights] || 0;

    // Adjust weight based on watch completion
    if (interaction.watchTime && interaction.videoLength && interaction.action === 'watch') {
      const completion = interaction.watchTime / interaction.videoLength;
      weight *= Math.min(1.0, completion * 2); // Boost for high completion
    }

    return weight;
  }

  private updateEmbeddingWithInteraction(
    userEmbedding: number[],
    videoEmbedding: number[],
    weight: number
  ): number[] {
    const learningRate = 0.1;
    const adjustedWeight = weight * learningRate;

    return userEmbedding.map((val, i) => 
      val + adjustedWeight * videoEmbedding[i]
    );
  }

  private calculateRecencyScore(publishedAt?: Date): number {
    if (!publishedAt) return 0;

    const now = Date.now();
    const age = now - publishedAt.getTime();
    const oneMonth = 30 * 24 * 60 * 60 * 1000;

    return Math.max(0, 1 - (age / oneMonth));
  }

  private generateExplanation(
    video: SimilarityResult,
    components: ScoredRecommendation['components']
  ): string {
    const explanations: string[] = [];

    if (components.contentSimilarity > 0.8) {
      explanations.push('highly similar to your interests');
    }
    if (components.popularityScore > 0.7) {
      explanations.push('popular with other users');
    }
    if (components.recencyScore > 0.5) {
      explanations.push('recently published');
    }
    if (components.diversityBonus > 0) {
      explanations.push('explores new topics for you');
    }

    return explanations.length > 0 
      ? `Recommended because it's ${explanations.join(', ')}.`
      : 'Recommended based on your viewing patterns.';
  }

  private generateQueryId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private extractTopCategories(results: SimilarityResult[]): string[] {
    const categoryCount = new Map<string, number>();
    
    for (const result of results) {
      if (result.tags) {
        for (const tag of result.tags) {
          categoryCount.set(tag, (categoryCount.get(tag) || 0) + 1);
        }
      }
    }

    return Array.from(categoryCount.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([category]) => category);
  }

  private logSearchAnalytics(analytics: SearchAnalytics): void {
    if (analytics.userId) {
      const userHistory = this.searchHistory.get(analytics.userId) || [];
      userHistory.push(analytics);
      
      // Keep only last 100 searches per user
      if (userHistory.length > 100) {
        userHistory.shift();
      }
      
      this.searchHistory.set(analytics.userId, userHistory);
    }

    logger.debug('Search analytics logged', analytics);
  }
}

export const similaritySearchEngine = new SimilaritySearchEngine();