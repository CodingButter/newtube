/**
 * NEWTUBE Comment Filtering Service
 * Implements toxicity detection, relevance scoring, and intelligent comment lenses
 * Based on semantic memory requirements for comment analysis
 */

import { Redis } from 'ioredis';
import { EmbeddingService } from './embedding-service';

export interface Comment {
  id: string;
  videoId: string;
  platform: string;
  author: string;
  text: string;
  timestamp: Date;
  likeCount?: number;
  replyCount?: number;
  parentCommentId?: string;
}

export interface CommentAnalysis {
  commentId: string;
  toxicityScore: number; // 0-1 (0 = not toxic, 1 = highly toxic)
  relevanceScore: number; // 0-1 (0 = not relevant, 1 = highly relevant)
  sentimentScore: number; // -1 to 1 (-1 = negative, 0 = neutral, 1 = positive)
  categories: string[]; // e.g., ['spam', 'hate_speech', 'relevant_discussion']
  confidence: number; // 0-1 confidence in analysis
  embedding?: number[]; // Vector embedding for similarity search
  metadata: {
    wordCount: number;
    hasLinks: boolean;
    hasEmojis: boolean;
    languageDetected?: string;
    analysisVersion: string;
    analyzedAt: Date;
  };
}

export interface CommentFilter {
  toxicityThreshold: number; // Hide comments above this toxicity score
  relevanceThreshold: number; // Show only comments above this relevance score
  categories: string[]; // Categories to filter by
  includeReplies: boolean;
  sortBy: 'relevance' | 'toxicity' | 'sentiment' | 'timestamp' | 'likes';
  sortOrder: 'asc' | 'desc';
  limit?: number;
}

export interface CommentLens {
  name: string;
  description: string;
  filter: CommentFilter;
  color: string; // UI color for the lens
  icon: string; // UI icon identifier
}

export class CommentFilteringService {
  private embeddingService: EmbeddingService;
  private redis: Redis;
  
  // Toxicity detection keywords and patterns
  private toxicKeywords: Set<string>;
  private spamPatterns: RegExp[];
  
  // Predefined comment lenses
  private readonly defaultLenses: CommentLens[];

  constructor(embeddingService: EmbeddingService, redisClient: Redis) {
    this.embeddingService = embeddingService;
    this.redis = redisClient;
    
    this.initializeToxicityDetection();
    this.defaultLenses = this.createDefaultLenses();
  }

  /**
   * Analyze a single comment for toxicity, relevance, and sentiment
   */
  async analyzeComment(
    comment: Comment,
    videoContext?: { title: string; description?: string; tags?: string[] }
  ): Promise<CommentAnalysis> {
    const cacheKey = `comment_analysis:${comment.id}:v2`;
    
    // Check cache first
    const cached = await this.redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    try {
      // Generate comment embedding for similarity analysis
      const embedding = await this.embeddingService.generateEmbedding(comment.text);

      // Analyze toxicity
      const toxicityScore = await this.analyzeToxicity(comment.text);

      // Analyze relevance (if video context provided)
      const relevanceScore = videoContext 
        ? await this.analyzeRelevance(comment, videoContext, embedding)
        : 0.5; // Default neutral relevance

      // Analyze sentiment
      const sentimentScore = this.analyzeSentiment(comment.text);

      // Categorize comment
      const categories = this.categorizeComment(comment.text, toxicityScore, relevanceScore);

      // Calculate confidence based on text length and clarity
      const confidence = this.calculateConfidence(comment.text, toxicityScore, relevanceScore);

      const analysis: CommentAnalysis = {
        commentId: comment.id,
        toxicityScore,
        relevanceScore,
        sentimentScore,
        categories,
        confidence,
        embedding,
        metadata: {
          wordCount: comment.text.split(/\s+/).length,
          hasLinks: /https?:\/\//.test(comment.text),
          hasEmojis: /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/u.test(comment.text),
          languageDetected: this.detectLanguage(comment.text),
          analysisVersion: 'v2.0',
          analyzedAt: new Date()
        }
      };

      // Cache analysis for 1 hour
      await this.redis.setex(cacheKey, 3600, JSON.stringify(analysis));

      return analysis;

    } catch (error) {
      console.error('Error analyzing comment:', error);
      throw new Error(`Failed to analyze comment ${comment.id}: ${error}`);
    }
  }

  /**
   * Batch analyze multiple comments
   */
  async batchAnalyzeComments(
    comments: Comment[],
    videoContext?: { title: string; description?: string; tags?: string[] }
  ): Promise<CommentAnalysis[]> {
    const results: CommentAnalysis[] = [];
    const batchSize = 10;

    for (let i = 0; i < comments.length; i += batchSize) {
      const batch = comments.slice(i, i + batchSize);
      
      const batchPromises = batch.map(comment => 
        this.analyzeComment(comment, videoContext).catch(error => {
          console.error(`Failed to analyze comment ${comment.id}:`, error);
          return null;
        })
      );

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults.filter(result => result !== null) as CommentAnalysis[]);

      // Small delay between batches to avoid overwhelming the system
      if (i + batchSize < comments.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    return results;
  }

  /**
   * Filter comments based on criteria
   */
  async filterComments(
    comments: Comment[],
    analyses: CommentAnalysis[],
    filter: CommentFilter
  ): Promise<{ comment: Comment; analysis: CommentAnalysis }[]> {
    // Create lookup map for analyses
    const analysisMap = new Map(analyses.map(a => [a.commentId, a]));

    // Filter comments based on criteria
    const filtered = comments
      .map(comment => {
        const analysis = analysisMap.get(comment.id);
        return analysis ? { comment, analysis } : null;
      })
      .filter((item): item is { comment: Comment; analysis: CommentAnalysis } => {
        if (!item) return false;
        
        const { analysis } = item;
        
        // Apply toxicity threshold
        if (analysis.toxicityScore > filter.toxicityThreshold) {
          return false;
        }

        // Apply relevance threshold
        if (analysis.relevanceScore < filter.relevanceThreshold) {
          return false;
        }

        // Apply category filter
        if (filter.categories.length > 0) {
          const hasMatchingCategory = filter.categories.some(cat => 
            analysis.categories.includes(cat)
          );
          if (!hasMatchingCategory) {
            return false;
          }
        }

        return true;
      });

    // Sort comments
    const sorted = this.sortComments(filtered, filter.sortBy, filter.sortOrder);

    // Apply limit
    return filter.limit ? sorted.slice(0, filter.limit) : sorted;
  }

  /**
   * Apply a comment lens to filter and sort comments
   */
  async applyCommentLens(
    comments: Comment[],
    analyses: CommentAnalysis[],
    lensName: string
  ): Promise<{ comment: Comment; analysis: CommentAnalysis }[]> {
    const lens = this.defaultLenses.find(l => l.name === lensName);
    if (!lens) {
      throw new Error(`Comment lens "${lensName}" not found`);
    }

    return this.filterComments(comments, analyses, lens.filter);
  }

  /**
   * Get available comment lenses
   */
  getAvailableLenses(): CommentLens[] {
    return [...this.defaultLenses];
  }

  /**
   * Analyze toxicity using rule-based approach with keyword detection
   */
  private async analyzeToxicity(text: string): Promise<number> {
    const normalizedText = text.toLowerCase();
    let toxicityScore = 0;

    // Check for toxic keywords
    let toxicKeywordCount = 0;
    for (const keyword of this.toxicKeywords) {
      if (normalizedText.includes(keyword)) {
        toxicKeywordCount++;
      }
    }

    // Keyword toxicity score (0-0.4)
    const keywordScore = Math.min(0.4, toxicKeywordCount * 0.1);

    // Check for spam patterns
    let spamScore = 0;
    for (const pattern of this.spamPatterns) {
      if (pattern.test(text)) {
        spamScore += 0.2;
      }
    }
    spamScore = Math.min(0.3, spamScore);

    // Check for excessive caps or repeated characters
    const capsScore = this.calculateCapsScore(text) * 0.1;
    const repeatScore = this.calculateRepeatScore(text) * 0.1;

    // Check for personal attacks patterns
    const attackScore = this.detectPersonalAttacks(normalizedText) * 0.2;

    // Combine scores
    toxicityScore = keywordScore + spamScore + capsScore + repeatScore + attackScore;

    return Math.min(1, Math.max(0, toxicityScore));
  }

  /**
   * Analyze relevance to video content using semantic similarity
   */
  private async analyzeRelevance(
    comment: Comment,
    videoContext: { title: string; description?: string; tags?: string[] },
    commentEmbedding: number[]
  ): Promise<number> {
    try {
      // Create video context text
      const contextParts = [videoContext.title];
      if (videoContext.description) {
        contextParts.push(videoContext.description.substring(0, 500));
      }
      if (videoContext.tags) {
        contextParts.push(videoContext.tags.join(' '));
      }

      const contextText = contextParts.join(' ');
      const contextEmbedding = await this.embeddingService.generateEmbedding(contextText);

      // Calculate semantic similarity
      const similarity = EmbeddingService.cosineSimilarity(commentEmbedding, contextEmbedding);

      // Boost relevance for longer, thoughtful comments
      const lengthBoost = Math.min(0.2, comment.text.length / 500);

      // Boost relevance for comments with questions or discussion
      const discussionBoost = this.detectDiscussionIntent(comment.text) ? 0.1 : 0;

      return Math.min(1, Math.max(0, similarity + lengthBoost + discussionBoost));

    } catch (error) {
      console.error('Error analyzing relevance:', error);
      return 0.5; // Default neutral relevance
    }
  }

  /**
   * Simple sentiment analysis using keyword-based approach
   */
  private analyzeSentiment(text: string): number {
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'love', 'like', 'awesome', 'fantastic', 'wonderful'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'horrible', 'worst', 'stupid', 'disgusting'];

    const normalizedText = text.toLowerCase();
    let positiveCount = 0;
    let negativeCount = 0;

    positiveWords.forEach(word => {
      if (normalizedText.includes(word)) positiveCount++;
    });

    negativeWords.forEach(word => {
      if (normalizedText.includes(word)) negativeCount++;
    });

    if (positiveCount === 0 && negativeCount === 0) {
      return 0; // Neutral
    }

    const totalSentimentWords = positiveCount + negativeCount;
    return (positiveCount - negativeCount) / totalSentimentWords;
  }

  /**
   * Categorize comment based on analysis results
   */
  private categorizeComment(
    text: string,
    toxicityScore: number,
    relevanceScore: number
  ): string[] {
    const categories: string[] = [];

    if (toxicityScore > 0.7) {
      categories.push('toxic');
    } else if (toxicityScore > 0.4) {
      categories.push('potentially_toxic');
    }

    if (relevanceScore > 0.7) {
      categories.push('highly_relevant');
    } else if (relevanceScore > 0.4) {
      categories.push('relevant');
    } else {
      categories.push('off_topic');
    }

    // Check for spam patterns
    if (this.spamPatterns.some(pattern => pattern.test(text))) {
      categories.push('spam');
    }

    // Check for constructive discussion
    if (this.detectDiscussionIntent(text)) {
      categories.push('discussion');
    }

    // Check for questions
    if (text.includes('?')) {
      categories.push('question');
    }

    return categories;
  }

  /**
   * Calculate confidence in the analysis
   */
  private calculateConfidence(
    text: string,
    toxicityScore: number,
    relevanceScore: number
  ): number {
    let confidence = 0.5; // Base confidence

    // Higher confidence for longer comments
    const wordCount = text.split(/\s+/).length;
    if (wordCount > 10) confidence += 0.2;
    if (wordCount > 50) confidence += 0.1;

    // Higher confidence for clear toxicity/relevance signals
    if (toxicityScore > 0.8 || toxicityScore < 0.2) confidence += 0.2;
    if (relevanceScore > 0.8 || relevanceScore < 0.2) confidence += 0.1;

    return Math.min(1, Math.max(0, confidence));
  }

  /**
   * Sort comments based on criteria
   */
  private sortComments(
    items: { comment: Comment; analysis: CommentAnalysis }[],
    sortBy: string,
    sortOrder: 'asc' | 'desc'
  ): { comment: Comment; analysis: CommentAnalysis }[] {
    const multiplier = sortOrder === 'asc' ? 1 : -1;

    return items.sort((a, b) => {
      let aValue: number;
      let bValue: number;

      switch (sortBy) {
        case 'relevance':
          aValue = a.analysis.relevanceScore;
          bValue = b.analysis.relevanceScore;
          break;
        case 'toxicity':
          aValue = a.analysis.toxicityScore;
          bValue = b.analysis.toxicityScore;
          break;
        case 'sentiment':
          aValue = a.analysis.sentimentScore;
          bValue = b.analysis.sentimentScore;
          break;
        case 'likes':
          aValue = a.comment.likeCount || 0;
          bValue = b.comment.likeCount || 0;
          break;
        case 'timestamp':
        default:
          aValue = a.comment.timestamp.getTime();
          bValue = b.comment.timestamp.getTime();
          break;
      }

      return (aValue - bValue) * multiplier;
    });
  }

  /**
   * Initialize toxicity detection keywords and patterns
   */
  private initializeToxicityDetection(): void {
    // Common toxic keywords (this would be expanded in production)
    this.toxicKeywords = new Set([
      'hate', 'stupid', 'idiot', 'moron', 'kill', 'die', 'loser',
      'trash', 'garbage', 'worthless', 'pathetic', 'disgusting'
    ]);

    // Spam patterns
    this.spamPatterns = [
      /(.)\1{4,}/g, // Repeated characters (5+ times)
      /https?:\/\/[^\s]+/g, // URLs (potential spam)
      /\b(FIRST|first|1st)\b/i, // "First" comments
      /subscribe|sub4sub|follow/gi, // Self-promotion
      /click|link|visit|check/gi // Link encouragement
    ];
  }

  /**
   * Create default comment lenses
   */
  private createDefaultLenses(): CommentLens[] {
    return [
      {
        name: 'Clean Discussion',
        description: 'Shows relevant, non-toxic comments',
        filter: {
          toxicityThreshold: 0.3,
          relevanceThreshold: 0.5,
          categories: ['relevant', 'highly_relevant', 'discussion'],
          includeReplies: true,
          sortBy: 'relevance',
          sortOrder: 'desc',
          limit: 50
        },
        color: '#10B981',
        icon: 'chat-bubble-left-right'
      },
      {
        name: 'Top Comments',
        description: 'Most liked and relevant comments',
        filter: {
          toxicityThreshold: 0.4,
          relevanceThreshold: 0.6,
          categories: [],
          includeReplies: false,
          sortBy: 'likes',
          sortOrder: 'desc',
          limit: 20
        },
        color: '#F59E0B',
        icon: 'star'
      },
      {
        name: 'Recent Discussion',
        description: 'Latest comments with good relevance',
        filter: {
          toxicityThreshold: 0.5,
          relevanceThreshold: 0.4,
          categories: [],
          includeReplies: true,
          sortBy: 'timestamp',
          sortOrder: 'desc',
          limit: 30
        },
        color: '#3B82F6',
        icon: 'clock'
      },
      {
        name: 'Questions Only',
        description: 'Comments that ask questions',
        filter: {
          toxicityThreshold: 0.3,
          relevanceThreshold: 0.3,
          categories: ['question'],
          includeReplies: false,
          sortBy: 'relevance',
          sortOrder: 'desc',
          limit: 25
        },
        color: '#8B5CF6',
        icon: 'question-mark-circle'
      }
    ];
  }

  // Helper methods
  private calculateCapsScore(text: string): number {
    const uppercaseChars = (text.match(/[A-Z]/g) || []).length;
    return uppercaseChars / Math.max(1, text.length);
  }

  private calculateRepeatScore(text: string): number {
    const repeatedPattern = /(.)\1{3,}/g;
    const matches = text.match(repeatedPattern) || [];
    return Math.min(1, matches.length * 0.2);
  }

  private detectPersonalAttacks(text: string): number {
    const attackPatterns = [
      /you are\s+(stupid|dumb|idiot)/,
      /your\s+(stupid|dumb|pathetic)/,
      /go\s+(die|kill)/,
      /shut up/
    ];

    return attackPatterns.some(pattern => pattern.test(text)) ? 1 : 0;
  }

  private detectDiscussionIntent(text: string): boolean {
    const discussionKeywords = [
      'i think', 'in my opinion', 'what do you think', 'discussion',
      'perspective', 'analysis', 'thoughts', 'explain', 'because'
    ];

    const normalizedText = text.toLowerCase();
    return discussionKeywords.some(keyword => normalizedText.includes(keyword));
  }

  private detectLanguage(text: string): string {
    // Simple language detection (would use proper library in production)
    if (/[a-zA-Z]/.test(text)) return 'en';
    if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) return 'ja';
    if (/[\u4E00-\u9FFF]/.test(text)) return 'zh';
    return 'unknown';
  }
}