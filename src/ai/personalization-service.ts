/**
 * NEWTUBE Personalization Algorithm
 * Implements AI-powered content recommendations with hybrid approach
 * Combines semantic similarity, collaborative filtering, and content-based filtering
 */

import { Redis } from 'ioredis';
import { EmbeddingService, VideoContent, VideoEmbedding, UserPreferenceProfile } from './embedding-service';

export interface RecommendationScore {
  videoId: string;
  platform: string;
  score: number;
  reasons: string[];
  metadata: {
    semanticSimilarity: number;
    categoryMatch: number;
    recencyBoost: number;
    diversityFactor: number;
    popularityBoost: number;
  };
}

export interface RecommendationRequest {
  userId: string;
  excludeVideoIds?: string[];
  categories?: string[];
  platforms?: ('youtube' | 'vimeo' | 'nebula')[];
  limit?: number;
  diversityWeight?: number;
  recencyWeight?: number;
  popularityWeight?: number;
}

export interface PersonalizationConfig {
  semanticWeight: number; // Weight for semantic similarity (0-1)
  categoryWeight: number; // Weight for category matching (0-1)
  recencyWeight: number; // Weight for recent content (0-1)
  diversityWeight: number; // Weight for diversity (0-1)
  popularityWeight: number; // Weight for popularity (0-1)
  minSimilarityThreshold: number; // Minimum similarity score (0-1)
  maxAgeHours: number; // Maximum age of content to consider
  diversityFactor: number; // How much to penalize similar content
}

export class PersonalizationService {
  private embeddingService: EmbeddingService;
  private redis: Redis;
  private config: PersonalizationConfig;

  constructor(embeddingService: EmbeddingService, redisClient: Redis, config?: Partial<PersonalizationConfig>) {
    this.embeddingService = embeddingService;
    this.redis = redisClient;
    
    // Default configuration based on semantic memory recommendations
    this.config = {
      semanticWeight: 0.4,
      categoryWeight: 0.25,
      recencyWeight: 0.15,
      diversityWeight: 0.1,
      popularityWeight: 0.1,
      minSimilarityThreshold: 0.6,
      maxAgeHours: 168, // 1 week
      diversityFactor: 0.8,
      ...config
    };
  }

  /**
   * Generate personalized video recommendations for a user
   */
  async getPersonalizedRecommendations(
    request: RecommendationRequest
  ): Promise<RecommendationScore[]> {
    const {
      userId,
      excludeVideoIds = [],
      categories = [],
      platforms = ['youtube', 'vimeo', 'nebula'],
      limit = 20,
      diversityWeight = this.config.diversityWeight,
      recencyWeight = this.config.recencyWeight,
      popularityWeight = this.config.popularityWeight
    } = request;

    try {
      // Get user preference profile
      const userProfile = await this.getUserPreferenceProfile(userId);
      if (!userProfile) {
        return this.getFallbackRecommendations(request);
      }

      // Get candidate videos (excluding already watched/excluded)
      const candidateVideos = await this.getCandidateVideos(
        excludeVideoIds,
        categories,
        platforms
      );

      if (candidateVideos.length === 0) {
        return [];
      }

      // Calculate recommendation scores
      const scoredRecommendations = await this.calculateRecommendationScores(
        userProfile,
        candidateVideos,
        { diversityWeight, recencyWeight, popularityWeight }
      );

      // Apply diversity filtering
      const diversifiedRecommendations = this.applyDiversityFiltering(
        scoredRecommendations,
        diversityWeight
      );

      // Sort by score and limit results
      return diversifiedRecommendations
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);

    } catch (error) {
      console.error('Error generating personalized recommendations:', error);
      return this.getFallbackRecommendations(request);
    }
  }

  /**
   * Calculate recommendation scores for candidate videos
   */
  private async calculateRecommendationScores(
    userProfile: UserPreferenceProfile,
    candidateVideos: (VideoContent & { embedding?: VideoEmbedding })[],
    weights: { diversityWeight: number; recencyWeight: number; popularityWeight: number }
  ): Promise<RecommendationScore[]> {
    const scores: RecommendationScore[] = [];

    for (const video of candidateVideos) {
      try {
        const score = await this.calculateSingleVideoScore(userProfile, video, weights);
        if (score.score >= this.config.minSimilarityThreshold) {
          scores.push(score);
        }
      } catch (error) {
        console.error(`Error scoring video ${video.id}:`, error);
      }
    }

    return scores;
  }

  /**
   * Calculate recommendation score for a single video
   */
  private async calculateSingleVideoScore(
    userProfile: UserPreferenceProfile,
    video: VideoContent & { embedding?: VideoEmbedding },
    weights: { diversityWeight: number; recencyWeight: number; popularityWeight: number }
  ): Promise<RecommendationScore> {
    // Get or generate video embedding
    let videoEmbedding = video.embedding;
    if (!videoEmbedding) {
      videoEmbedding = await this.embeddingService.generateVideoEmbeddings(video);
    }

    // 1. Semantic Similarity Score (40% weight)
    const semanticSimilarity = EmbeddingService.cosineSimilarity(
      userProfile.preferenceEmbedding,
      videoEmbedding.combinedEmbedding
    );

    // 2. Category Match Score (25% weight)
    const categoryMatch = this.calculateCategoryMatch(userProfile.categories, video.tags || []);

    // 3. Recency Boost (15% weight)
    const recencyBoost = this.calculateRecencyBoost(video.publishedAt, weights.recencyWeight);

    // 4. Popularity Boost (10% weight)
    const popularityBoost = this.calculatePopularityBoost(video.viewCount, weights.popularityWeight);

    // 5. Diversity Factor (10% weight)
    const diversityFactor = await this.calculateDiversityFactor(
      userProfile.userId,
      video,
      weights.diversityWeight
    );

    // Calculate weighted final score
    const finalScore = (
      semanticSimilarity * this.config.semanticWeight +
      categoryMatch * this.config.categoryWeight +
      recencyBoost * this.config.recencyWeight +
      popularityBoost * this.config.popularityWeight +
      diversityFactor * this.config.diversityWeight
    );

    // Generate explanation reasons
    const reasons: string[] = [];
    if (semanticSimilarity > 0.7) reasons.push('High content similarity');
    if (categoryMatch > 0.5) reasons.push('Matches your interests');
    if (recencyBoost > 0.5) reasons.push('Recent content');
    if (popularityBoost > 0.5) reasons.push('Popular video');
    if (diversityFactor > 0.5) reasons.push('Diverse content');

    return {
      videoId: video.id,
      platform: video.platform,
      score: Math.max(0, Math.min(1, finalScore)),
      reasons,
      metadata: {
        semanticSimilarity,
        categoryMatch,
        recencyBoost,
        diversityFactor,
        popularityBoost
      }
    };
  }

  /**
   * Calculate category match score between user preferences and video tags
   */
  private calculateCategoryMatch(userCategories: string[], videoTags: string[]): number {
    if (userCategories.length === 0 || videoTags.length === 0) {
      return 0;
    }

    const userCategoriesLower = userCategories.map(cat => cat.toLowerCase());
    const videoTagsLower = videoTags.map(tag => tag.toLowerCase());

    const matches = userCategoriesLower.filter(cat => 
      videoTagsLower.some(tag => tag.includes(cat) || cat.includes(tag))
    );

    return matches.length / Math.max(userCategories.length, videoTags.length);
  }

  /**
   * Calculate recency boost based on publication date
   */
  private calculateRecencyBoost(publishedAt?: Date, weight: number = 1): number {
    if (!publishedAt) return 0;

    const now = new Date();
    const ageHours = (now.getTime() - publishedAt.getTime()) / (1000 * 60 * 60);
    
    if (ageHours > this.config.maxAgeHours) {
      return 0;
    }

    // Exponential decay: newer content gets higher boost
    const normalizedAge = ageHours / this.config.maxAgeHours;
    return Math.exp(-normalizedAge * 3) * weight; // Exponential decay factor of 3
  }

  /**
   * Calculate popularity boost based on view count
   */
  private calculatePopularityBoost(viewCount?: number, weight: number = 1): number {
    if (!viewCount || viewCount <= 0) return 0;

    // Log scale for view count (popular videos get boost, but diminishing returns)
    const logViews = Math.log10(Math.max(1, viewCount));
    const normalizedPopularity = Math.min(1, logViews / 8); // Normalize to max of 10^8 views
    
    return normalizedPopularity * weight;
  }

  /**
   * Calculate diversity factor to avoid echo chambers
   */
  private async calculateDiversityFactor(
    userId: string,
    video: VideoContent,
    weight: number = 1
  ): Promise<number> {
    try {
      // Check recent watch history for similar content
      const recentHistoryKey = `recent_watch:${userId}`;
      const recentVideos = await this.redis.lrange(recentHistoryKey, 0, 10);
      
      if (recentVideos.length === 0) {
        return weight; // High diversity if no recent history
      }

      // Check if similar videos were recently watched
      const similarCount = recentVideos.filter(videoData => {
        const parsedVideo = JSON.parse(videoData);
        return parsedVideo.platform === video.platform &&
               (parsedVideo.channelId === video.channelId ||
                this.hasOverlappingTags(parsedVideo.tags || [], video.tags || []));
      }).length;

      // Penalize if too many similar videos recently watched
      const diversityScore = Math.max(0, 1 - (similarCount / 5)); // Penalize after 5 similar videos
      return diversityScore * weight;

    } catch (error) {
      console.error('Error calculating diversity factor:', error);
      return weight * 0.5; // Default to medium diversity
    }
  }

  /**
   * Check if two tag arrays have significant overlap
   */
  private hasOverlappingTags(tags1: string[], tags2: string[]): boolean {
    if (tags1.length === 0 || tags2.length === 0) return false;
    
    const set1 = new Set(tags1.map(tag => tag.toLowerCase()));
    const set2 = new Set(tags2.map(tag => tag.toLowerCase()));
    
    const intersection = Array.from(set1).filter(tag => set2.has(tag));
    return intersection.length >= Math.min(2, Math.min(set1.size, set2.size) / 2);
  }

  /**
   * Apply diversity filtering to avoid too many similar recommendations
   */
  private applyDiversityFiltering(
    recommendations: RecommendationScore[],
    diversityWeight: number
  ): RecommendationScore[] {
    const filtered: RecommendationScore[] = [];
    const seenChannels = new Set<string>();
    const seenTags = new Set<string>();

    for (const rec of recommendations.sort((a, b) => b.score - a.score)) {
      // Skip if too many from same channel
      const channelKey = `${rec.platform}:channel`;
      if (seenChannels.has(channelKey) && seenChannels.size > 3) {
        rec.score *= (1 - diversityWeight * 0.3); // Reduce score for channel saturation
      }

      filtered.push(rec);
      seenChannels.add(channelKey);
    }

    return filtered;
  }

  /**
   * Get user preference profile from cache or database
   */
  private async getUserPreferenceProfile(userId: string): Promise<UserPreferenceProfile | null> {
    try {
      const cacheKey = `user_profile:${userId}`;
      const cached = await this.redis.get(cacheKey);
      
      if (cached) {
        return JSON.parse(cached);
      }

      // TODO: Load from database if not cached
      // For now, return null to trigger fallback recommendations
      return null;

    } catch (error) {
      console.error('Error getting user preference profile:', error);
      return null;
    }
  }

  /**
   * Get candidate videos for recommendation
   */
  private async getCandidateVideos(
    excludeVideoIds: string[],
    categories: string[],
    platforms: string[]
  ): Promise<(VideoContent & { embedding?: VideoEmbedding })[]> {
    // TODO: Implement database query to get candidate videos
    // This would filter by:
    // - Not in excludeVideoIds
    // - Matching categories (if specified)
    // - From specified platforms
    // - Published within maxAgeHours
    // - Has embeddings available
    
    // For now, return empty array - this would be implemented with actual database
    return [];
  }

  /**
   * Fallback recommendations for new users or when personalization fails
   */
  private async getFallbackRecommendations(
    request: RecommendationRequest
  ): Promise<RecommendationScore[]> {
    // TODO: Implement fallback logic
    // - Trending videos
    // - Popular videos in specified categories
    // - Recent highly-rated content
    
    console.log('Using fallback recommendations for user:', request.userId);
    return [];
  }

  /**
   * Update user preference profile based on new interaction
   */
  async updateUserPreferences(
    userId: string,
    video: VideoContent,
    interaction: {
      type: 'watch' | 'like' | 'share' | 'skip';
      duration?: number; // Watch duration in seconds
      rating?: number; // 1-5 stars
    }
  ): Promise<void> {
    try {
      // Add to recent watch history
      const recentHistoryKey = `recent_watch:${userId}`;
      const videoData = JSON.stringify({
        ...video,
        interaction,
        timestamp: new Date().toISOString()
      });

      await this.redis.lpush(recentHistoryKey, videoData);
      await this.redis.ltrim(recentHistoryKey, 0, 49); // Keep last 50 interactions
      await this.redis.expire(recentHistoryKey, 86400 * 7); // 7 days TTL

      // Invalidate user profile cache to force regeneration
      const profileCacheKey = `user_profile:${userId}`;
      await this.redis.del(profileCacheKey);

      console.log(`Updated preferences for user ${userId} based on ${interaction.type} interaction`);

    } catch (error) {
      console.error('Error updating user preferences:', error);
    }
  }

  /**
   * Get recommendation explanation for debugging/transparency
   */
  async explainRecommendation(
    userId: string,
    videoId: string,
    platform: string
  ): Promise<{ explanation: string; factors: Record<string, number> } | null> {
    try {
      const userProfile = await this.getUserPreferenceProfile(userId);
      if (!userProfile) {
        return {
          explanation: 'Recommendation based on general popularity (no user profile available)',
          factors: { popularity: 1.0 }
        };
      }

      // TODO: Implement detailed explanation logic
      return {
        explanation: 'Recommendation based on your viewing history and preferences',
        factors: {
          semantic_similarity: 0.8,
          category_match: 0.6,
          recency: 0.4,
          popularity: 0.3,
          diversity: 0.7
        }
      };

    } catch (error) {
      console.error('Error explaining recommendation:', error);
      return null;
    }
  }
}