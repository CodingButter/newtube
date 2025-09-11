import { EmotionType, SSMLConfig, EMOTION_VOICE_MAPPING } from '../types/voice.types';

export interface EmotionContext {
  emotion: EmotionType;
  startIndex: number;
  endIndex: number;
  text: string;
}

export interface ChatGPTResponse {
  content: string;
  emotions?: EmotionType[];
  intent?: string;
  confidence?: number;
}

export class SSMLService {
  private emotionKeywords = {
    happy: ['great', 'awesome', 'wonderful', 'fantastic', 'excellent', 'amazing', 'brilliant'],
    excited: ['wow', 'incredible', 'unbelievable', 'spectacular', 'phenomenal', 'extraordinary'],
    curious: ['interesting', 'wonder', 'hmm', 'really?', 'how', 'why', 'what if'],
    helpful: ['help', 'assist', 'guide', 'support', 'explain', 'show', 'let me'],
    concerned: ['problem', 'issue', 'error', 'trouble', 'difficult', 'challenge', 'worry'],
    calm: ['okay', 'alright', 'sure', 'fine', 'peaceful', 'relaxed', 'steady'],
    enthusiastic: ['yes!', 'absolutely', 'definitely', 'certainly', 'perfect', 'love it'],
    neutral: ['is', 'are', 'the', 'and', 'but', 'so', 'then']
  };

  private punctuationEmotions = {
    '!': { type: 'excited' as const, intensity: 0.7 },
    '?': { type: 'curious' as const, intensity: 0.6 },
    '.': { type: 'neutral' as const, intensity: 0.3 },
    '...': { type: 'curious' as const, intensity: 0.5 },
    '!!': { type: 'excited' as const, intensity: 0.9 }
  };

  /**
   * Parse ChatGPT responses to detect emotional context
   */
  parseEmotionalContext(response: string, existingEmotions?: EmotionType[]): EmotionType[] {
    const detectedEmotions: EmotionType[] = [];
    const text = response.toLowerCase();

    // Analyze keywords for emotional content
    Object.entries(this.emotionKeywords).forEach(([emotion, keywords]) => {
      const matches = keywords.filter(keyword => text.includes(keyword.toLowerCase()));
      if (matches.length > 0) {
        const intensity = Math.min(0.9, matches.length * 0.2 + 0.3);
        detectedEmotions.push({
          type: emotion as EmotionType['type'],
          intensity
        });
      }
    });

    // Analyze punctuation patterns
    Object.entries(this.punctuationEmotions).forEach(([punctuation, emotion]) => {
      const count = (response.match(new RegExp(`\\${punctuation}`, 'g')) || []).length;
      if (count > 0) {
        const intensity = Math.min(0.9, emotion.intensity + count * 0.1);
        detectedEmotions.push({
          type: emotion.type,
          intensity
        });
      }
    });

    // Merge with existing emotions
    const allEmotions = [...(existingEmotions || []), ...detectedEmotions];
    
    // Deduplicate and average intensities for same emotion types
    const emotionMap = new Map<string, number>();
    allEmotions.forEach(emotion => {
      const current = emotionMap.get(emotion.type) || 0;
      emotionMap.set(emotion.type, Math.max(current, emotion.intensity));
    });

    return Array.from(emotionMap.entries()).map(([type, intensity]) => ({
      type: type as EmotionType['type'],
      intensity
    }));
  }

  /**
   * Generate SSML markup with emotional context
   */
  generateSSML(text: string, emotions: EmotionType[], config?: SSMLConfig): string {
    const dominantEmotion = this.getDominantEmotion(emotions);
    const mergedConfig = this.mergeSSMLConfig(config, dominantEmotion);

    // Clean text for SSML
    const cleanText = this.sanitizeTextForSSML(text);
    
    // Apply emotional context segments
    const emotionalSegments = this.segmentTextByEmotion(cleanText, emotions);
    
    let ssml = '<speak>';
    
    // Add global prosody settings
    ssml += `<prosody rate="${mergedConfig.rate}" pitch="${mergedConfig.pitch}" volume="${mergedConfig.volume}">`;
    
    // Process each emotional segment
    emotionalSegments.forEach((segment, index) => {
      if (segment.emotion && segment.emotion.type !== 'neutral') {
        const emotionSettings = this.getEmotionSSMLSettings(segment.emotion);
        ssml += `<prosody rate="${emotionSettings.rate}" pitch="${emotionSettings.pitch}">`;
        ssml += `<emphasis level="${emotionSettings.emphasis}">${segment.text}</emphasis>`;
        ssml += '</prosody>';
      } else {
        ssml += segment.text;
      }
      
      // Add pause after segments
      if (index < emotionalSegments.length - 1) {
        const pauseDuration = this.calculatePauseDuration(segment.emotion);
        if (pauseDuration > 0) {
          ssml += `<break time="${pauseDuration}ms"/>`;
        }
      }
    });

    // Add final pause if configured
    if (mergedConfig.pauseAfter && mergedConfig.pauseAfter > 0) {
      ssml += `<break time="${mergedConfig.pauseAfter}ms"/>`;
    }
    
    ssml += '</prosody>';
    ssml += '</speak>';

    return ssml;
  }

  /**
   * Convert emotions to voice parameter adjustments
   */
  mapEmotionsToVoiceParams(emotions: EmotionType[]): {
    stability: number;
    similarityBoost: number;
    style: number;
    rateModifier: number;
    pitchModifier: number;
  } {
    if (emotions.length === 0) {
      return EMOTION_VOICE_MAPPING.neutral;
    }

    const dominantEmotion = this.getDominantEmotion(emotions);
    const mapping = EMOTION_VOICE_MAPPING[dominantEmotion.type];
    
    // Apply intensity scaling
    return {
      stability: this.scaleByIntensity(mapping.stability, dominantEmotion.intensity, 0.5),
      similarityBoost: this.scaleByIntensity(mapping.similarityBoost, dominantEmotion.intensity, 0.5),
      style: this.scaleByIntensity(mapping.style, dominantEmotion.intensity, 0.3),
      rateModifier: this.scaleByIntensity(mapping.rateModifier, dominantEmotion.intensity, 1.0),
      pitchModifier: this.scaleByIntensity(mapping.pitchModifier, dominantEmotion.intensity, 1.0)
    };
  }

  /**
   * Analyze text for emotional markers and context
   */
  analyzeEmotionalMarkers(text: string): {
    emotions: EmotionType[];
    confidence: number;
    segments: EmotionContext[];
  } {
    const emotions = this.parseEmotionalContext(text);
    const segments = this.segmentTextByEmotion(text, emotions);
    
    // Calculate confidence based on keyword matches and punctuation
    const keywordMatches = Object.values(this.emotionKeywords).flat()
      .filter(keyword => text.toLowerCase().includes(keyword)).length;
    const punctuationCount = text.match(/[!?]+/g)?.length || 0;
    
    const confidence = Math.min(0.95, (keywordMatches * 0.1 + punctuationCount * 0.2 + 0.3));

    return {
      emotions,
      confidence,
      segments: segments.map((seg, index) => ({
        emotion: seg.emotion || { type: 'neutral', intensity: 0.3 },
        startIndex: index * (text.length / segments.length),
        endIndex: (index + 1) * (text.length / segments.length),
        text: seg.text
      }))
    };
  }

  /**
   * Create optimized SSML for specific use cases
   */
  createOptimizedSSML(
    text: string, 
    useCase: 'tutorial' | 'casual' | 'professional' | 'enthusiastic'
  ): string {
    let emotions: EmotionType[];
    let config: SSMLConfig;

    switch (useCase) {
      case 'tutorial':
        emotions = [{ type: 'helpful', intensity: 0.7 }, { type: 'calm', intensity: 0.5 }];
        config = { rate: 'medium', pitch: 'medium', volume: 'medium', pauseAfter: 500 };
        break;
      case 'casual':
        emotions = [{ type: 'happy', intensity: 0.6 }, { type: 'neutral', intensity: 0.4 }];
        config = { rate: 'medium', pitch: 'medium', volume: 'medium', pauseAfter: 300 };
        break;
      case 'professional':
        emotions = [{ type: 'calm', intensity: 0.8 }, { type: 'helpful', intensity: 0.6 }];
        config = { rate: 'medium', pitch: 'medium', volume: 'medium', pauseAfter: 400 };
        break;
      case 'enthusiastic':
        emotions = [{ type: 'excited', intensity: 0.8 }, { type: 'enthusiastic', intensity: 0.9 }];
        config = { rate: 'fast', pitch: 'high', volume: 'loud', pauseAfter: 200 };
        break;
    }

    return this.generateSSML(text, emotions, config);
  }

  /**
   * Private helper methods
   */
  private getDominantEmotion(emotions: EmotionType[]): EmotionType {
    if (emotions.length === 0) {
      return { type: 'neutral', intensity: 0.3 };
    }
    
    return emotions.reduce((prev, current) => 
      prev.intensity > current.intensity ? prev : current
    );
  }

  private mergeSSMLConfig(config?: SSMLConfig, emotion?: EmotionType): Required<SSMLConfig> {
    const defaults: Required<SSMLConfig> = {
      emotions: emotion ? [emotion] : [],
      rate: 'medium',
      pitch: 'medium',
      volume: 'medium',
      pauseAfter: 300
    };

    if (!config) return defaults;

    return {
      emotions: config.emotions || defaults.emotions,
      rate: config.rate || defaults.rate,
      pitch: config.pitch || defaults.pitch,
      volume: config.volume || defaults.volume,
      pauseAfter: config.pauseAfter ?? defaults.pauseAfter
    };
  }

  private sanitizeTextForSSML(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
      .trim();
  }

  private segmentTextByEmotion(text: string, emotions: EmotionType[]): Array<{
    text: string;
    emotion?: EmotionType;
  }> {
    // Simple implementation: split by sentences and assign emotions
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    return sentences.map((sentence, index) => {
      const sentenceEmotions = this.parseEmotionalContext(sentence);
      const dominantEmotion = sentenceEmotions.length > 0 
        ? this.getDominantEmotion(sentenceEmotions)
        : emotions[index % emotions.length];
      
      return {
        text: sentence.trim() + (index < sentences.length - 1 ? '.' : ''),
        emotion: dominantEmotion
      };
    });
  }

  private getEmotionSSMLSettings(emotion: EmotionType): {
    rate: string;
    pitch: string;
    emphasis: string;
  } {
    const mapping = EMOTION_VOICE_MAPPING[emotion.type];
    
    return {
      rate: mapping.rateModifier > 1.05 ? 'fast' : mapping.rateModifier < 0.95 ? 'slow' : 'medium',
      pitch: mapping.pitchModifier > 1.05 ? 'high' : mapping.pitchModifier < 0.95 ? 'low' : 'medium',
      emphasis: emotion.intensity > 0.7 ? 'strong' : emotion.intensity > 0.4 ? 'moderate' : 'reduced'
    };
  }

  private calculatePauseDuration(emotion?: EmotionType): number {
    if (!emotion) return 300;
    
    // Longer pauses for calm/concerned emotions, shorter for excited
    switch (emotion.type) {
      case 'excited':
      case 'enthusiastic':
        return 100;
      case 'curious':
        return 200;
      case 'calm':
      case 'concerned':
        return 500;
      default:
        return 300;
    }
  }

  private scaleByIntensity(value: number, intensity: number, defaultValue: number): number {
    return value * intensity + defaultValue * (1 - intensity);
  }

  /**
   * Validate SSML markup
   */
  validateSSML(ssml: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Basic SSML validation
    if (!ssml.includes('<speak>') || !ssml.includes('</speak>')) {
      errors.push('SSML must be wrapped in <speak> tags');
    }
    
    // Check for unclosed tags
    const tagPattern = /<(\w+)([^>]*)>/g;
    const closeTagPattern = /<\/(\w+)>/g;
    
    const openTags = [...ssml.matchAll(tagPattern)].map(match => match[1]);
    const closeTags = [...ssml.matchAll(closeTagPattern)].map(match => match[1]);
    
    openTags.forEach(tag => {
      if (!closeTags.includes(tag)) {
        errors.push(`Unclosed tag: ${tag}`);
      }
    });
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Singleton instance
let ssmlServiceInstance: SSMLService | null = null;

export function getSSMLService(): SSMLService {
  if (!ssmlServiceInstance) {
    ssmlServiceInstance = new SSMLService();
  }
  return ssmlServiceInstance;
}

export default SSMLService;