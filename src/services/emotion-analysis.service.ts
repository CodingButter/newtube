/**
 * AI-powered emotion analysis service for text processing
 * Analyzes text content to determine emotional state and characteristics
 */

import { LLMService, LLMMessage } from './llm.service.js';
import { 
  EmotionType, 
  EmotionAnalysis, 
  SentimentScore, 
  EmotionalMarker, 
  VoiceParameters, 
  SentimentType 
} from '../types/emotion.types.js';
import { 
  EMOTION_KEYWORDS, 
  EMOTION_PATTERNS, 
  getEmotionForText,
  EMOTION_VOICE_MAPPING,
  blendEmotions
} from '../lib/emotion-mapping.js';
import { logger } from '../lib/logger.js';

export class EmotionAnalysisService {
  private llmService: LLMService;
  private emotionCache: Map<string, EmotionAnalysis> = new Map();
  private cacheExpiry: number = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.llmService = new LLMService();
  }

  /**
   * Analyze the emotional content of text using hybrid AI + rule-based approach
   */
  async analyzeText(text: string, useAI: boolean = true): Promise<EmotionAnalysis> {
    try {
      // Check cache first
      const cacheKey = `${text}-${useAI}`;
      if (this.emotionCache.has(cacheKey)) {
        const cached = this.emotionCache.get(cacheKey)!;
        // Check if cache is still valid
        if (Date.now() - (cached as any).timestamp < this.cacheExpiry) {
          return cached;
        }
        this.emotionCache.delete(cacheKey);
      }

      let analysis: EmotionAnalysis;

      if (useAI && this.llmService.isLLMAvailable()) {
        analysis = await this.analyzeWithAI(text);
      } else {
        analysis = await this.analyzeWithRules(text);
      }

      // Cache the result
      (analysis as any).timestamp = Date.now();
      this.emotionCache.set(cacheKey, analysis);

      logger.info('Emotion analysis completed', {
        textLength: text.length,
        primaryEmotion: analysis.primaryEmotion,
        confidence: analysis.confidence,
        method: useAI ? 'AI' : 'rules'
      });

      return analysis;
    } catch (error) {
      logger.error('Error in emotion analysis:', error);
      // Fallback to rule-based analysis
      return this.analyzeWithRules(text);
    }
  }

  /**
   * AI-powered emotion analysis using LLM
   */
  private async analyzeWithAI(text: string): Promise<EmotionAnalysis> {
    const prompt = this.buildEmotionAnalysisPrompt(text);
    
    try {
      const response = await this.llmService.generateResponse([
        {
          role: 'system',
          content: prompt
        },
        {
          role: 'user',
          content: text
        }
      ], {
        temperature: 0.3,
        maxTokens: 500
      });

      return this.parseAIEmotionResponse(response.message, text);
    } catch (error) {
      logger.error('AI emotion analysis failed, falling back to rules:', error);
      return this.analyzeWithRules(text);
    }
  }

  /**
   * Rule-based emotion analysis as fallback
   */
  private async analyzeWithRules(text: string): Promise<EmotionAnalysis> {
    const sentiment = this.detectSentiment(text);
    const emotionalMarkers = this.identifyEmotionalMarkers(text);
    const primaryEmotion = getEmotionForText(text);
    
    // Find secondary emotions
    const emotionScores: Partial<Record<EmotionType, number>> = {};
    
    for (const marker of emotionalMarkers) {
      emotionScores[marker.emotion] = (emotionScores[marker.emotion] || 0) + marker.intensity;
    }
    
    const secondaryEmotions = Object.entries(emotionScores)
      .filter(([emotion]) => emotion !== primaryEmotion)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 2)
      .map(([emotion]) => emotion as EmotionType);

    // Calculate confidence based on marker strength and clarity
    const confidence = Math.min(0.95, Math.max(0.4, 
      emotionalMarkers.length > 0 
        ? emotionalMarkers.reduce((sum, m) => sum + m.intensity, 0) / emotionalMarkers.length
        : 0.6
    ));

    // Determine intensity
    const avgIntensity = emotionalMarkers.length > 0
      ? emotionalMarkers.reduce((sum, m) => sum + m.intensity, 0) / emotionalMarkers.length
      : 0.5;
    
    const intensity = avgIntensity > 0.7 ? 'high' : avgIntensity > 0.4 ? 'medium' : 'low';

    return {
      primaryEmotion,
      secondaryEmotions,
      confidence,
      sentiment: sentiment.type,
      intensity,
      reasoning: `Rule-based analysis found ${emotionalMarkers.length} emotional markers. Primary emotion "${primaryEmotion}" detected with ${(confidence * 100).toFixed(1)}% confidence.`
    };
  }

  /**
   * Detect sentiment polarity and strength
   */
  detectSentiment(text: string): SentimentScore {
    const positiveWords = [
      'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'like',
      'happy', 'pleased', 'satisfied', 'perfect', 'brilliant', 'awesome', 'super',
      'best', 'better', 'improved', 'success', 'win', 'achieve', 'accomplish'
    ];

    const negativeWords = [
      'bad', 'terrible', 'awful', 'horrible', 'hate', 'dislike', 'sad', 'angry',
      'frustrated', 'disappointed', 'fail', 'failure', 'problem', 'issue', 'wrong',
      'difficult', 'hard', 'impossible', 'annoying', 'irritating', 'upset'
    ];

    const neutralWords = [
      'okay', 'fine', 'normal', 'average', 'standard', 'typical', 'usual', 'regular'
    ];

    const words = text.toLowerCase().split(/\s+/);
    let positiveScore = 0;
    let negativeScore = 0;
    let neutralScore = 0;

    for (const word of words) {
      if (positiveWords.some(pw => word.includes(pw))) positiveScore++;
      else if (negativeWords.some(nw => word.includes(nw))) negativeScore++;
      else if (neutralWords.some(ntw => word.includes(ntw))) neutralScore++;
    }

    const totalWords = words.length;
    const totalEmotionalWords = positiveScore + negativeScore + neutralScore;
    
    if (totalEmotionalWords === 0) {
      return { score: 0, type: 'neutral', confidence: 0.5 };
    }

    const netScore = (positiveScore - negativeScore) / totalWords;
    const confidence = Math.min(0.95, totalEmotionalWords / totalWords + 0.3);

    let type: SentimentType;
    if (netScore > 0.05) type = 'positive';
    else if (netScore < -0.05) type = 'negative';
    else type = 'neutral';

    return {
      score: Math.max(-1, Math.min(1, netScore * 5)), // Scale to -1 to 1
      type,
      confidence
    };
  }

  /**
   * Identify emotional markers in text
   */
  identifyEmotionalMarkers(text: string): EmotionalMarker[] {
    const markers: EmotionalMarker[] = [];
    const lowercaseText = text.toLowerCase();

    // Check keyword-based emotions
    for (const [emotion, keywords] of Object.entries(EMOTION_KEYWORDS)) {
      for (const keyword of keywords) {
        let index = 0;
        while ((index = lowercaseText.indexOf(keyword.toLowerCase(), index)) !== -1) {
          markers.push({
            text: keyword,
            emotion: emotion as EmotionType,
            intensity: this.calculateKeywordIntensity(keyword, text),
            startIndex: index,
            endIndex: index + keyword.length,
            reason: `Keyword match: "${keyword}"`
          });
          index += keyword.length;
        }
      }
    }

    // Check pattern-based emotions
    for (const [patternName, config] of Object.entries(EMOTION_PATTERNS)) {
      for (const pattern of config.patterns) {
        const matches = text.match(pattern);
        if (matches) {
          for (const match of matches) {
            const index = text.indexOf(match);
            markers.push({
              text: match,
              emotion: config.emotion,
              intensity: 0.8, // Patterns are generally high confidence
              startIndex: index,
              endIndex: index + match.length,
              reason: `Pattern match: ${patternName}`
            });
          }
        }
      }
    }

    // Remove duplicates and sort by position
    const uniqueMarkers = markers.filter((marker, index, array) => 
      index === array.findIndex(m => 
        m.startIndex === marker.startIndex && m.endIndex === marker.endIndex
      )
    );

    return uniqueMarkers.sort((a, b) => a.startIndex - b.startIndex);
  }

  /**
   * Map emotions to voice parameters
   */
  mapToVoiceParameters(emotions: EmotionAnalysis): VoiceParameters {
    const primaryConfig = EMOTION_VOICE_MAPPING[emotions.primaryEmotion];
    
    if (emotions.secondaryEmotions.length === 0) {
      return primaryConfig.voiceParams;
    }

    // Blend primary with strongest secondary emotion
    const secondaryEmotion = emotions.secondaryEmotions[0];
    const blendRatio = emotions.confidence > 0.8 ? 0.8 : 0.6;
    
    return blendEmotions(emotions.primaryEmotion, secondaryEmotion, blendRatio);
  }

  /**
   * Calculate intensity of keyword matches
   */
  private calculateKeywordIntensity(keyword: string, context: string): number {
    const contextWords = context.toLowerCase().split(/\s+/);
    const keywordIndex = contextWords.indexOf(keyword.toLowerCase());
    
    let intensity = 0.6; // Base intensity
    
    // Increase intensity for emphasis words nearby
    const emphasisWords = ['very', 'really', 'extremely', 'super', 'absolutely', 'completely'];
    const nearbyWords = contextWords.slice(Math.max(0, keywordIndex - 2), keywordIndex + 3);
    
    for (const emphasisWord of emphasisWords) {
      if (nearbyWords.includes(emphasisWord)) {
        intensity += 0.2;
      }
    }
    
    // Increase intensity for exclamation marks
    if (context.includes('!')) {
      intensity += 0.1;
    }
    
    // Increase intensity for capitalization
    if (keyword === keyword.toUpperCase() && keyword.length > 2) {
      intensity += 0.15;
    }
    
    return Math.min(1.0, intensity);
  }

  /**
   * Build prompt for AI emotion analysis
   */
  private buildEmotionAnalysisPrompt(text: string): string {
    return `You are an expert emotion analysis AI for conversational voice synthesis. Analyze the following text and identify:

1. Primary emotion (one of: happy, excited, curious, helpful, calm, enthusiastic, confident, surprised, thoughtful, encouraging)
2. Secondary emotions (up to 2)
3. Confidence level (0.0 to 1.0)
4. Sentiment (positive, neutral, negative)
5. Intensity (low, medium, high)
6. Brief reasoning for your analysis

Context: This analysis will be used to generate emotionally expressive text-to-speech for a voice assistant helping users with video platform features.

Respond ONLY in this JSON format:
{
  "primaryEmotion": "emotion_name",
  "secondaryEmotions": ["emotion1", "emotion2"],
  "confidence": 0.85,
  "sentiment": "positive",
  "intensity": "medium",
  "reasoning": "Brief explanation of the emotional analysis"
}

Text to analyze:`;
  }

  /**
   * Parse AI response for emotion analysis
   */
  private parseAIEmotionResponse(response: string, originalText: string): EmotionAnalysis {
    try {
      // Try to extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      
      // Validate and sanitize the response
      const primaryEmotion = this.validateEmotion(parsed.primaryEmotion) || 'helpful';
      const secondaryEmotions = (parsed.secondaryEmotions || [])
        .map((e: string) => this.validateEmotion(e))
        .filter(Boolean) as EmotionType[];
      
      const confidence = Math.max(0.1, Math.min(1.0, parsed.confidence || 0.7));
      const sentiment = ['positive', 'neutral', 'negative'].includes(parsed.sentiment) 
        ? parsed.sentiment as SentimentType 
        : 'neutral';
      const intensity = ['low', 'medium', 'high'].includes(parsed.intensity)
        ? parsed.intensity as ('low' | 'medium' | 'high')
        : 'medium';

      return {
        primaryEmotion,
        secondaryEmotions,
        confidence,
        sentiment,
        intensity,
        reasoning: parsed.reasoning || 'AI-generated emotion analysis'
      };
    } catch (error) {
      logger.error('Failed to parse AI emotion response:', error);
      // Fallback to rule-based analysis
      return await this.analyzeWithRules(originalText);
    }
  }

  /**
   * Validate emotion type
   */
  private validateEmotion(emotion: string): EmotionType | null {
    const validEmotions: EmotionType[] = [
      'happy', 'excited', 'curious', 'helpful', 'calm', 
      'enthusiastic', 'confident', 'surprised', 'thoughtful', 'encouraging'
    ];
    
    return validEmotions.includes(emotion as EmotionType) ? emotion as EmotionType : null;
  }

  /**
   * Clear emotion cache
   */
  clearCache(): void {
    this.emotionCache.clear();
    logger.info('Emotion analysis cache cleared');
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number; hitRate?: number } {
    return {
      size: this.emotionCache.size
    };
  }
}