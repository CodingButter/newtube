/**
 * Emotional Consistency Service
 * Maintains emotional coherence across conversations and adapts to user preferences
 */

import { 
  EmotionType, 
  EmotionAnalysis, 
  ConversationEmotionalContext,
  EmotionResponse 
} from '../types/emotion.types.js';
import { EmotionAnalysisService } from './emotion-analysis.service.js';
import { SSMLGeneratorService } from './ssml-generator.service.js';
import { LLMService } from './llm.service.js';
import { logger } from '../lib/logger.js';

export interface EmotionalTransition {
  from: EmotionType;
  to: EmotionType;
  confidence: number;
  reason: string;
  naturalness: number; // 0-1, how natural this transition feels
}

export interface ConversationState {
  sessionId: string;
  userId?: string;
  emotionalJourney: EmotionAnalysis[];
  dominantEmotion: EmotionType;
  emotionalStability: number; // 0-1, how consistent emotions have been
  userEngagement: number; // 0-1, estimated user engagement level
  adaptationStrategy: 'mirror' | 'complement' | 'guide' | 'stabilize';
  lastInteraction: Date;
}

export class EmotionalConsistencyService {
  private emotionAnalysis: EmotionAnalysisService;
  private ssmlGenerator: SSMLGeneratorService;
  private llmService: LLMService;
  private conversationStates: Map<string, ConversationState> = new Map();
  private emotionalTransitionRules: Map<string, EmotionalTransition[]> = new Map();

  constructor() {
    this.emotionAnalysis = new EmotionAnalysisService();
    this.ssmlGenerator = new SSMLGeneratorService();
    this.llmService = new LLMService();
    this.initializeTransitionRules();
  }

  /**
   * Process a complete emotional conversation turn
   */
  async processConversationTurn(
    sessionId: string,
    userInput: string,
    responseText: string,
    userId?: string
  ): Promise<EmotionResponse> {
    try {
      const startTime = Date.now();
      
      // Get or create conversation state
      const conversationState = this.getOrCreateConversationState(sessionId, userId);
      
      // Analyze user input emotion
      const userEmotion = await this.emotionAnalysis.analyzeText(userInput);
      
      // Determine appropriate response emotion based on context
      const responseEmotion = await this.determineResponseEmotion(
        userEmotion, 
        conversationState,
        responseText
      );
      
      // Generate emotionally appropriate SSML
      const ssml = await this.ssmlGenerator.generateSSML(responseText, responseEmotion);
      
      // Map to voice parameters
      const voiceParams = this.emotionAnalysis.mapToVoiceParameters(responseEmotion);
      
      // Update conversation state
      await this.updateConversationState(sessionId, userEmotion, responseEmotion);
      
      const processingTime = Date.now() - startTime;
      
      // Build emotion response
      const emotionResponse: EmotionResponse = {
        originalText: responseText,
        emotions: responseEmotion,
        ssml,
        voiceParams,
        processingTime,
        metadata: {
          keyPhrases: this.extractKeyPhrases(responseText),
          emotionalMarkers: this.emotionAnalysis.identifyEmotionalMarkers(responseText),
          contextFactors: this.getContextFactors(conversationState, userEmotion)
        }
      };

      logger.info('Emotion processing completed', {
        sessionId,
        userEmotion: userEmotion.primaryEmotion,
        responseEmotion: responseEmotion.primaryEmotion,
        processingTime
      });

      return emotionResponse;
    } catch (error) {
      logger.error('Error processing conversation turn:', error);
      throw error;
    }
  }

  /**
   * Determine the most appropriate response emotion based on context
   */
  private async determineResponseEmotion(
    userEmotion: EmotionAnalysis,
    conversationState: ConversationState,
    responseText: string
  ): Promise<EmotionAnalysis> {
    // Analyze the response text for its natural emotion
    const naturalResponseEmotion = await this.emotionAnalysis.analyzeText(responseText, false);
    
    // Apply emotional consistency rules
    const contextualEmotion = this.applyEmotionalConsistency(
      userEmotion,
      naturalResponseEmotion,
      conversationState
    );
    
    return contextualEmotion;
  }

  /**
   * Apply emotional consistency rules to determine appropriate response emotion
   */
  private applyEmotionalConsistency(
    userEmotion: EmotionAnalysis,
    naturalResponseEmotion: EmotionAnalysis,
    conversationState: ConversationState
  ): EmotionAnalysis {
    const strategy = conversationState.adaptationStrategy;
    
    switch (strategy) {
      case 'mirror':
        return this.mirrorUserEmotion(userEmotion, naturalResponseEmotion);
      
      case 'complement':
        return this.complementUserEmotion(userEmotion, naturalResponseEmotion);
      
      case 'guide':
        return this.guideEmotionalDirection(userEmotion, naturalResponseEmotion, conversationState);
      
      case 'stabilize':
        return this.stabilizeEmotion(naturalResponseEmotion, conversationState);
      
      default:
        return naturalResponseEmotion;
    }
  }

  /**
   * Mirror the user's emotional state (empathetic response)
   */
  private mirrorUserEmotion(
    userEmotion: EmotionAnalysis,
    naturalResponseEmotion: EmotionAnalysis
  ): EmotionAnalysis {
    // Blend user emotion with natural response emotion
    const blendRatio = 0.7; // 70% user emotion, 30% natural response
    
    return {
      primaryEmotion: userEmotion.primaryEmotion,
      secondaryEmotions: [
        naturalResponseEmotion.primaryEmotion,
        ...userEmotion.secondaryEmotions.slice(0, 1)
      ],
      confidence: Math.min(userEmotion.confidence, naturalResponseEmotion.confidence),
      sentiment: userEmotion.sentiment,
      intensity: this.blendIntensity(userEmotion.intensity, naturalResponseEmotion.intensity, blendRatio),
      reasoning: `Mirroring user emotion (${userEmotion.primaryEmotion}) with natural response (${naturalResponseEmotion.primaryEmotion})`
    };
  }

  /**
   * Complement the user's emotion (balancing response)
   */
  private complementUserEmotion(
    userEmotion: EmotionAnalysis,
    naturalResponseEmotion: EmotionAnalysis
  ): EmotionAnalysis {
    // Choose complementary emotions
    const complementaryEmotions: Record<EmotionType, EmotionType> = {
      excited: 'calm',
      calm: 'enthusiastic',
      curious: 'confident',
      confident: 'curious',
      happy: 'thoughtful',
      thoughtful: 'encouraging',
      surprised: 'helpful',
      helpful: 'excited',
      encouraging: 'happy',
      enthusiastic: 'thoughtful'
    };

    const complementaryEmotion = complementaryEmotions[userEmotion.primaryEmotion] || 'helpful';

    return {
      primaryEmotion: complementaryEmotion,
      secondaryEmotions: [userEmotion.primaryEmotion, naturalResponseEmotion.primaryEmotion],
      confidence: (userEmotion.confidence + naturalResponseEmotion.confidence) / 2,
      sentiment: naturalResponseEmotion.sentiment,
      intensity: 'medium',
      reasoning: `Complementing user emotion (${userEmotion.primaryEmotion}) with ${complementaryEmotion}`
    };
  }

  /**
   * Guide emotional direction based on conversation goals
   */
  private guideEmotionalDirection(
    userEmotion: EmotionAnalysis,
    naturalResponseEmotion: EmotionAnalysis,
    conversationState: ConversationState
  ): EmotionAnalysis {
    // Gradually move toward more positive/helpful emotions
    const targetEmotion: EmotionType = 'helpful';
    const guidanceStrength = 0.3; // 30% guidance, 70% natural
    
    const guidedEmotion = userEmotion.sentiment === 'negative' ? 'encouraging' : 
                         userEmotion.primaryEmotion === 'curious' ? 'confident' :
                         targetEmotion;

    return {
      primaryEmotion: guidedEmotion,
      secondaryEmotions: [naturalResponseEmotion.primaryEmotion, userEmotion.primaryEmotion],
      confidence: naturalResponseEmotion.confidence * (1 - guidanceStrength) + 0.8 * guidanceStrength,
      sentiment: 'positive',
      intensity: naturalResponseEmotion.intensity,
      reasoning: `Guiding conversation toward ${guidedEmotion} from ${userEmotion.primaryEmotion}`
    };
  }

  /**
   * Stabilize emotion to maintain consistency
   */
  private stabilizeEmotion(
    naturalResponseEmotion: EmotionAnalysis,
    conversationState: ConversationState
  ): EmotionAnalysis {
    const dominantEmotion = conversationState.dominantEmotion;
    const stabilityFactor = conversationState.emotionalStability;
    
    // Higher stability means less deviation from dominant emotion
    if (stabilityFactor > 0.7) {
      return {
        ...naturalResponseEmotion,
        primaryEmotion: dominantEmotion,
        secondaryEmotions: [naturalResponseEmotion.primaryEmotion],
        reasoning: `Stabilizing to dominant emotion (${dominantEmotion}) for consistency`
      };
    }
    
    return naturalResponseEmotion;
  }

  /**
   * Update conversation state with new emotional data
   */
  private async updateConversationState(
    sessionId: string,
    userEmotion: EmotionAnalysis,
    responseEmotion: EmotionAnalysis
  ): Promise<void> {
    const state = this.conversationStates.get(sessionId)!;
    
    // Add to emotional journey
    state.emotionalJourney.push(userEmotion, responseEmotion);
    
    // Update dominant emotion
    state.dominantEmotion = this.calculateDominantEmotion(state.emotionalJourney);
    
    // Update emotional stability
    state.emotionalStability = this.calculateEmotionalStability(state.emotionalJourney);
    
    // Update engagement (simplified)
    state.userEngagement = this.estimateUserEngagement(userEmotion, state);
    
    // Adapt strategy based on conversation patterns
    state.adaptationStrategy = this.determineAdaptationStrategy(state);
    
    state.lastInteraction = new Date();
    
    // Trim history to keep recent context (last 20 emotions)
    if (state.emotionalJourney.length > 20) {
      state.emotionalJourney = state.emotionalJourney.slice(-20);
    }
  }

  /**
   * Calculate the dominant emotion across the conversation
   */
  private calculateDominantEmotion(journey: EmotionAnalysis[]): EmotionType {
    const emotionCounts: Partial<Record<EmotionType, number>> = {};
    
    for (const emotion of journey) {
      emotionCounts[emotion.primaryEmotion] = (emotionCounts[emotion.primaryEmotion] || 0) + 1;
    }
    
    let maxCount = 0;
    let dominantEmotion: EmotionType = 'helpful';
    
    for (const [emotion, count] of Object.entries(emotionCounts)) {
      if ((count as number) > maxCount) {
        maxCount = count as number;
        dominantEmotion = emotion as EmotionType;
      }
    }
    
    return dominantEmotion;
  }

  /**
   * Calculate emotional stability (consistency) score
   */
  private calculateEmotionalStability(journey: EmotionAnalysis[]): number {
    if (journey.length < 2) return 1.0;
    
    let consistencyScore = 0;
    for (let i = 1; i < journey.length; i++) {
      const prev = journey[i - 1];
      const curr = journey[i];
      
      // Check if emotions are similar or naturally flowing
      if (prev.primaryEmotion === curr.primaryEmotion) {
        consistencyScore += 1;
      } else if (this.isNaturalTransition(prev.primaryEmotion, curr.primaryEmotion)) {
        consistencyScore += 0.7;
      } else {
        consistencyScore += 0.3;
      }
    }
    
    return consistencyScore / (journey.length - 1);
  }

  /**
   * Check if an emotional transition is natural
   */
  private isNaturalTransition(from: EmotionType, to: EmotionType): boolean {
    const naturalTransitions: Record<EmotionType, EmotionType[]> = {
      curious: ['excited', 'surprised', 'thoughtful'],
      excited: ['happy', 'enthusiastic', 'surprised'],
      happy: ['excited', 'enthusiastic', 'confident'],
      calm: ['thoughtful', 'helpful', 'confident'],
      surprised: ['excited', 'curious', 'happy'],
      thoughtful: ['curious', 'calm', 'confident'],
      confident: ['helpful', 'enthusiastic', 'happy'],
      helpful: ['encouraging', 'calm', 'confident'],
      enthusiastic: ['excited', 'happy', 'confident'],
      encouraging: ['helpful', 'confident', 'happy']
    };
    
    return naturalTransitions[from]?.includes(to) || false;
  }

  /**
   * Estimate user engagement based on emotional patterns
   */
  private estimateUserEngagement(userEmotion: EmotionAnalysis, state: ConversationState): number {
    let engagement = 0.5; // baseline
    
    // Higher engagement for positive emotions
    if (userEmotion.sentiment === 'positive') engagement += 0.2;
    if (userEmotion.intensity === 'high') engagement += 0.2;
    
    // Specific emotions that indicate engagement
    const engagementEmotions: EmotionType[] = ['curious', 'excited', 'surprised', 'enthusiastic'];
    if (engagementEmotions.includes(userEmotion.primaryEmotion)) {
      engagement += 0.3;
    }
    
    // Consider conversation length (more turns = more engagement)
    const conversationLength = state.emotionalJourney.length;
    if (conversationLength > 10) engagement += 0.1;
    if (conversationLength > 20) engagement += 0.1;
    
    return Math.min(1.0, Math.max(0.0, engagement));
  }

  /**
   * Determine the best adaptation strategy for the conversation
   */
  private determineAdaptationStrategy(state: ConversationState): 'mirror' | 'complement' | 'guide' | 'stabilize' {
    const stability = state.emotionalStability;
    const engagement = state.userEngagement;
    const dominantEmotion = state.dominantEmotion;
    
    // High engagement and stability - maintain with mirroring
    if (engagement > 0.7 && stability > 0.7) {
      return 'mirror';
    }
    
    // Low engagement - try to guide toward more positive emotions
    if (engagement < 0.4) {
      return 'guide';
    }
    
    // High volatility - stabilize
    if (stability < 0.4) {
      return 'stabilize';
    }
    
    // Negative dominant emotion - complement to balance
    if (['thoughtful', 'calm'].includes(dominantEmotion)) {
      return 'complement';
    }
    
    // Default to mirroring for good engagement
    return 'mirror';
  }

  /**
   * Get or create conversation state
   */
  private getOrCreateConversationState(sessionId: string, userId?: string): ConversationState {
    if (this.conversationStates.has(sessionId)) {
      return this.conversationStates.get(sessionId)!;
    }
    
    const newState: ConversationState = {
      sessionId,
      userId,
      emotionalJourney: [],
      dominantEmotion: 'helpful',
      emotionalStability: 1.0,
      userEngagement: 0.5,
      adaptationStrategy: 'mirror',
      lastInteraction: new Date()
    };
    
    this.conversationStates.set(sessionId, newState);
    return newState;
  }

  /**
   * Initialize emotional transition rules
   */
  private initializeTransitionRules(): void {
    // Define natural emotional transition patterns
    // This would be based on psychological research and user testing
    const transitions: Array<{ from: EmotionType; to: EmotionType; naturalness: number }> = [
      { from: 'curious', to: 'excited', naturalness: 0.9 },
      { from: 'excited', to: 'happy', naturalness: 0.8 },
      { from: 'surprised', to: 'curious', naturalness: 0.9 },
      { from: 'calm', to: 'thoughtful', naturalness: 0.8 },
      // Add more transition rules...
    ];
    
    for (const transition of transitions) {
      const key = `${transition.from}-${transition.to}`;
      if (!this.emotionalTransitionRules.has(key)) {
        this.emotionalTransitionRules.set(key, []);
      }
      
      this.emotionalTransitionRules.get(key)!.push({
        from: transition.from,
        to: transition.to,
        confidence: 0.8,
        reason: 'Natural emotional flow',
        naturalness: transition.naturalness
      });
    }
  }

  /**
   * Helper methods
   */
  private blendIntensity(
    intensity1: 'low' | 'medium' | 'high', 
    intensity2: 'low' | 'medium' | 'high', 
    ratio: number
  ): 'low' | 'medium' | 'high' {
    const intensityValues = { low: 1, medium: 2, high: 3 };
    const val1 = intensityValues[intensity1];
    const val2 = intensityValues[intensity2];
    const blended = Math.round(val1 * ratio + val2 * (1 - ratio));
    
    const valueToIntensity = { 1: 'low', 2: 'medium', 3: 'high' } as const;
    return valueToIntensity[blended as keyof typeof valueToIntensity] || 'medium';
  }

  private extractKeyPhrases(text: string): string[] {
    // Simple keyword extraction (in production, use NLP library)
    const words = text.toLowerCase().split(/\s+/);
    const keyPhrases: string[] = [];
    
    for (let i = 0; i < words.length - 1; i++) {
      if (words[i].length > 4 && words[i + 1].length > 4) {
        keyPhrases.push(`${words[i]} ${words[i + 1]}`);
      }
    }
    
    return keyPhrases.slice(0, 5); // Top 5 key phrases
  }

  private getContextFactors(state: ConversationState, userEmotion: EmotionAnalysis): string[] {
    const factors: string[] = [];
    
    factors.push(`Conversation length: ${state.emotionalJourney.length} turns`);
    factors.push(`Emotional stability: ${(state.emotionalStability * 100).toFixed(1)}%`);
    factors.push(`User engagement: ${(state.userEngagement * 100).toFixed(1)}%`);
    factors.push(`Strategy: ${state.adaptationStrategy}`);
    factors.push(`User emotion: ${userEmotion.primaryEmotion} (${userEmotion.confidence.toFixed(2)})`);
    
    return factors;
  }

  /**
   * Public methods for managing conversations
   */
  
  public getConversationState(sessionId: string): ConversationState | null {
    return this.conversationStates.get(sessionId) || null;
  }

  public clearConversation(sessionId: string): void {
    this.conversationStates.delete(sessionId);
    this.llmService.clearEmotionalContext(sessionId);
  }

  public getActiveConversations(): number {
    return this.conversationStates.size;
  }

  public getEmotionalStats(): {
    totalConversations: number;
    averageStability: number;
    averageEngagement: number;
    emotionDistribution: Record<EmotionType, number>;
  } {
    const states = Array.from(this.conversationStates.values());
    
    if (states.length === 0) {
      return {
        totalConversations: 0,
        averageStability: 0,
        averageEngagement: 0,
        emotionDistribution: {} as Record<EmotionType, number>
      };
    }
    
    const avgStability = states.reduce((sum, s) => sum + s.emotionalStability, 0) / states.length;
    const avgEngagement = states.reduce((sum, s) => sum + s.userEngagement, 0) / states.length;
    
    const emotionDistribution: Record<EmotionType, number> = {} as any;
    for (const state of states) {
      emotionDistribution[state.dominantEmotion] = (emotionDistribution[state.dominantEmotion] || 0) + 1;
    }
    
    return {
      totalConversations: states.length,
      averageStability: avgStability,
      averageEngagement: avgEngagement,
      emotionDistribution
    };
  }
}