/**
 * SSML Generator Service for emotional text-to-speech synthesis
 * Converts text and emotion analysis into rich SSML markup for ElevenLabs
 */

import { 
  EmotionType, 
  EmotionAnalysis, 
  EmotionalMarker, 
  VoiceParameters 
} from '../types/emotion.types.js';
import { 
  SSMLElement, 
  SSMLGenerationOptions, 
  SSMLContext, 
  SSMLValidationResult,
  SSMLChunk,
  SSMLOptimization
} from '../types/ssml.types.js';
import { EMOTION_VOICE_MAPPING } from '../lib/emotion-mapping.js';
import { logger } from '../lib/logger.js';

export class SSMLGeneratorService {
  private templates: Map<string, string> = new Map();
  private optimizationCache: Map<string, string> = new Map();

  constructor() {
    this.initializeTemplates();
  }

  /**
   * Generate SSML with emotional prosody from text and emotion analysis
   */
  async generateSSML(
    text: string, 
    emotions: EmotionAnalysis,
    options: SSMLGenerationOptions = this.getDefaultOptions()
  ): Promise<string> {
    try {
      logger.info('Generating SSML', {
        textLength: text.length,
        primaryEmotion: emotions.primaryEmotion,
        options
      });

      // Start with base SSML structure
      let ssml = this.buildBaseSSML(text);
      
      // Apply emotional prosody
      if (options.includeProsody) {
        ssml = this.addEmotionalProsody(ssml, emotions);
      }
      
      // Add natural breaks
      if (options.includeBreaks) {
        ssml = this.addNaturalBreaks(ssml, emotions);
      }
      
      // Add emphasis markers
      if (options.includeEmphasis) {
        ssml = this.addEmphasis(ssml, emotions);
      }
      
      // Add emotion tags if supported
      if (options.includeEmotions) {
        ssml = this.addEmotionTags(ssml, emotions);
      }
      
      // Optimize for specific voice if provided
      if (options.optimizeForVoice) {
        ssml = this.optimizeForVoice(ssml, options.optimizeForVoice, options);
      }
      
      // Validate and clean up
      const validation = this.validateSSML(ssml);
      if (!validation.isValid) {
        logger.warn('Generated SSML has validation issues', {
          errors: validation.errors,
          warnings: validation.warnings
        });
        
        // Apply fixes for common issues
        ssml = this.fixCommonSSMLIssues(ssml);
      }

      logger.info('SSML generation completed', {
        originalLength: text.length,
        ssmlLength: ssml.length,
        complexity: validation.complexity
      });

      return ssml;
    } catch (error) {
      logger.error('Error generating SSML:', error);
      // Fallback to simple SSML
      return this.generateFallbackSSML(text, emotions.primaryEmotion);
    }
  }

  /**
   * Add emotional prosody to SSML based on emotion analysis
   */
  addEmotionalProsody(ssml: string, emotions: EmotionAnalysis): string {
    const emotionConfig = EMOTION_VOICE_MAPPING[emotions.primaryEmotion];
    const prosody = emotionConfig.ssmlAttributes.prosody;
    
    if (!prosody) return ssml;

    // Wrap the content in prosody tags
    const prosodyAttributes = [];
    if (prosody.rate) prosodyAttributes.push(`rate="${prosody.rate}"`);
    if (prosody.pitch) prosodyAttributes.push(`pitch="${prosody.pitch}"`);
    if (prosody.volume) prosodyAttributes.push(`volume="${prosody.volume}"`);

    const prosodyTag = `<prosody ${prosodyAttributes.join(' ')}>`;
    const content = this.extractContent(ssml);
    
    return `<speak>${prosodyTag}${content}</prosody></speak>`;
  }

  /**
   * Add natural breaks based on punctuation and emotion
   */
  addNaturalBreaks(text: string, emotions: EmotionAnalysis): string {
    const emotionConfig = EMOTION_VOICE_MAPPING[emotions.primaryEmotion];
    const breakConfig = emotionConfig.ssmlAttributes.break;
    
    let result = text;
    
    // Add breaks after punctuation based on emotion
    const punctuationBreaks = {
      '.': this.getBreakTime(emotions.primaryEmotion, 'sentence'),
      '!': this.getBreakTime(emotions.primaryEmotion, 'exclamation'), 
      '?': this.getBreakTime(emotions.primaryEmotion, 'question'),
      ',': this.getBreakTime(emotions.primaryEmotion, 'comma'),
      ';': this.getBreakTime(emotions.primaryEmotion, 'semicolon'),
      ':': this.getBreakTime(emotions.primaryEmotion, 'colon')
    };

    for (const [punctuation, breakTime] of Object.entries(punctuationBreaks)) {
      const regex = new RegExp(`\\${punctuation}(?=\\s)`, 'g');
      result = result.replace(regex, `${punctuation}<break time="${breakTime}"/>`);
    }

    // Add emphasis breaks for emotional markers
    if (emotions.intensity === 'high') {
      result = this.addEmphasisBreaks(result, emotions);
    }

    return result;
  }

  /**
   * Add emphasis markup to emotionally significant words
   */
  addEmphasis(text: string, emotions: EmotionAnalysis): string {
    const emotionConfig = EMOTION_VOICE_MAPPING[emotions.primaryEmotion];
    const emphasis = emotionConfig.ssmlAttributes.emphasis;
    
    if (!emphasis) return text;

    // Keywords that should be emphasized for each emotion
    const emphasisKeywords = this.getEmphasisKeywords(emotions.primaryEmotion);
    
    let result = text;
    for (const keyword of emphasisKeywords) {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
      result = result.replace(regex, `<emphasis level="${emphasis.level}">$1</emphasis>`);
    }

    return result;
  }

  /**
   * Add emotion tags (for ElevenLabs emotional synthesis)
   */
  addEmotionTags(text: string, emotions: EmotionAnalysis): string {
    const segments = this.segmentTextByEmotion(text, emotions);
    
    let result = '';
    for (const segment of segments) {
      if (segment.emotion) {
        const intensity = this.mapIntensityToEmotionTag(emotions.intensity);
        result += `<emotion name="${segment.emotion}" intensity="${intensity}">${segment.text}</emotion>`;
      } else {
        result += segment.text;
      }
    }
    
    return result;
  }

  /**
   * Optimize SSML for specific voice characteristics
   */
  optimizeForVoice(ssml: string, voiceId: string, options: SSMLGenerationOptions): string {
    // Voice-specific optimizations
    const voiceOptimizations = this.getVoiceOptimizations(voiceId);
    
    let optimized = ssml;
    
    // Apply voice-specific rate adjustments
    if (voiceOptimizations.rateAdjustment) {
      optimized = this.adjustProsodyRates(optimized, voiceOptimizations.rateAdjustment);
    }
    
    // Apply voice-specific break adjustments
    if (voiceOptimizations.breakAdjustment) {
      optimized = this.adjustBreakTimes(optimized, voiceOptimizations.breakAdjustment);
    }
    
    // Apply performance optimizations
    if (options.performance === 'speed') {
      optimized = this.optimizeForSpeed(optimized);
    } else if (options.performance === 'quality') {
      optimized = this.optimizeForQuality(optimized);
    }

    return optimized;
  }

  /**
   * Validate SSML markup
   */
  validateSSML(ssml: string): SSMLValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];
    
    // Check for basic SSML structure
    if (!ssml.includes('<speak>') || !ssml.includes('</speak>')) {
      errors.push('SSML must be wrapped in <speak> tags');
    }
    
    // Check for unclosed tags
    const tagRegex = /<(\w+)(?:\s[^>]*)?>/g;
    const closeTagRegex = /<\/(\w+)>/g;
    
    const openTags = [];
    const closeTags = [];
    
    let match;
    while ((match = tagRegex.exec(ssml)) !== null) {
      if (!match[0].includes('/>')) { // Not self-closing
        openTags.push(match[1]);
      }
    }
    
    while ((match = closeTagRegex.exec(ssml)) !== null) {
      closeTags.push(match[1]);
    }
    
    // Check for tag balance
    for (const tag of openTags) {
      if (!closeTags.includes(tag)) {
        errors.push(`Unclosed tag: ${tag}`);
      }
    }
    
    // Check for invalid attributes
    if (ssml.includes('rate="') && !ssml.match(/rate="[\d.]+%?"/)) {
      warnings.push('Invalid rate attribute format');
    }
    
    // Estimate complexity
    const tagCount = (ssml.match(/<\w+/g) || []).length;
    const complexity = tagCount > 20 ? 'high' : tagCount > 10 ? 'medium' : 'low';
    
    // Estimate duration (rough)
    const textContent = ssml.replace(/<[^>]*>/g, '');
    const estimatedDuration = textContent.length / 15; // ~15 chars per second
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions,
      estimatedDuration,
      complexity
    };
  }

  /**
   * Generate fallback SSML for error cases
   */
  private generateFallbackSSML(text: string, emotion: EmotionType): string {
    const emotionConfig = EMOTION_VOICE_MAPPING[emotion];
    const prosody = emotionConfig.ssmlAttributes.prosody;
    
    if (prosody) {
      return `<speak><prosody rate="${prosody.rate || '100%'}" pitch="${prosody.pitch || 'medium'}">${text}</prosody></speak>`;
    }
    
    return `<speak>${text}</speak>`;
  }

  /**
   * Initialize SSML templates
   */
  private initializeTemplates(): void {
    this.templates.set('greeting', `
      <speak>
        <prosody rate="105%" pitch="+5%">
          <emotion name="friendly" intensity="medium">{{content}}</emotion>
        </prosody>
      </speak>
    `);

    this.templates.set('explanation', `
      <speak>
        <prosody rate="95%" pitch="medium">
          {{content}}
        </prosody>
      </speak>
    `);

    this.templates.set('question', `
      <speak>
        <prosody rate="100%" pitch="+3%">
          {{content}}
        </prosody>
        <break time="300ms"/>
      </speak>
    `);

    this.templates.set('excitement', `
      <speak>
        <prosody rate="115%" pitch="+12%" volume="loud">
          <emotion name="excited" intensity="high">{{content}}</emotion>
        </prosody>
      </speak>
    `);
  }

  /**
   * Get default SSML generation options
   */
  private getDefaultOptions(): SSMLGenerationOptions {
    return {
      includeBreaks: true,
      includeProsody: true,
      includeEmphasis: true,
      includeEmotions: true,
      naturalness: 'high',
      performance: 'quality'
    };
  }

  /**
   * Build base SSML structure
   */
  private buildBaseSSML(text: string): string {
    return `<speak>${text}</speak>`;
  }

  /**
   * Extract content from SSML (remove tags)
   */
  private extractContent(ssml: string): string {
    return ssml.replace(/<speak>|<\/speak>/g, '').trim();
  }

  /**
   * Get break time based on emotion and punctuation type
   */
  private getBreakTime(emotion: EmotionType, type: string): string {
    const breakTimes = {
      excited: { sentence: '200ms', question: '150ms', exclamation: '100ms', comma: '100ms', semicolon: '150ms', colon: '200ms' },
      calm: { sentence: '500ms', question: '400ms', exclamation: '300ms', comma: '200ms', semicolon: '300ms', colon: '400ms' },
      curious: { sentence: '300ms', question: '250ms', exclamation: '200ms', comma: '150ms', semicolon: '200ms', colon: '250ms' },
      confident: { sentence: '250ms', question: '200ms', exclamation: '150ms', comma: '100ms', semicolon: '150ms', colon: '200ms' },
      // Add more emotions as needed
    };

    return breakTimes[emotion]?.[type] || '200ms';
  }

  /**
   * Get keywords that should be emphasized for each emotion
   */
  private getEmphasisKeywords(emotion: EmotionType): string[] {
    const keywords = {
      excited: ['amazing', 'incredible', 'fantastic', 'wow', 'awesome'],
      confident: ['definitely', 'certainly', 'absolutely', 'sure', 'confident'],
      helpful: ['help', 'assist', 'support', 'guide', 'show'],
      curious: ['interesting', 'how', 'why', 'what', 'discover'],
      // Add more emotions as needed
    };

    return keywords[emotion] || [];
  }

  /**
   * Segment text by emotional markers
   */
  private segmentTextByEmotion(text: string, emotions: EmotionAnalysis): Array<{text: string, emotion?: string}> {
    // For now, apply the primary emotion to the entire text
    // In a more sophisticated implementation, this would use emotional markers
    return [{
      text: text,
      emotion: emotions.primaryEmotion
    }];
  }

  /**
   * Map emotion intensity to emotion tag intensity
   */
  private mapIntensityToEmotionTag(intensity: string): string {
    const mapping = {
      'low': 'low',
      'medium': 'medium', 
      'high': 'high'
    };
    return mapping[intensity] || 'medium';
  }

  /**
   * Get voice-specific optimizations
   */
  private getVoiceOptimizations(voiceId: string): any {
    // Voice-specific optimization rules
    const optimizations = {
      'pNInz6obpgDQGcFmaJgB': { // Rachel
        rateAdjustment: 0.95,
        breakAdjustment: 1.1
      },
      // Add more voice-specific optimizations
    };

    return optimizations[voiceId] || {};
  }

  /**
   * Adjust prosody rates in SSML
   */
  private adjustProsodyRates(ssml: string, adjustment: number): string {
    return ssml.replace(/rate="([\d.]+)%"/g, (match, rate) => {
      const newRate = Math.round(parseFloat(rate) * adjustment);
      return `rate="${newRate}%"`;
    });
  }

  /**
   * Adjust break times in SSML
   */
  private adjustBreakTimes(ssml: string, adjustment: number): string {
    return ssml.replace(/time="(\d+)ms"/g, (match, time) => {
      const newTime = Math.round(parseInt(time) * adjustment);
      return `time="${newTime}ms"`;
    });
  }

  /**
   * Optimize SSML for speed
   */
  private optimizeForSpeed(ssml: string): string {
    // Remove unnecessary breaks and reduce complexity
    return ssml
      .replace(/<break time="[^"]*"\/>/g, '') // Remove all breaks
      .replace(/<emphasis[^>]*>(.*?)<\/emphasis>/g, '$1'); // Remove emphasis tags
  }

  /**
   * Optimize SSML for quality
   */
  private optimizeForQuality(ssml: string): string {
    // Keep all emotional markup for best quality
    return ssml;
  }

  /**
   * Add emphasis breaks for high-intensity emotions
   */
  private addEmphasisBreaks(text: string, emotions: EmotionAnalysis): string {
    if (emotions.intensity !== 'high') return text;
    
    // Add slight pauses before emotionally charged words
    const emotionalWords = ['amazing', 'incredible', 'fantastic', 'absolutely', 'definitely'];
    
    let result = text;
    for (const word of emotionalWords) {
      const regex = new RegExp(`\\b(${word})\\b`, 'gi');
      result = result.replace(regex, `<break time="100ms"/>$1`);
    }
    
    return result;
  }

  /**
   * Fix common SSML issues
   */
  private fixCommonSSMLIssues(ssml: string): string {
    let fixed = ssml;
    
    // Ensure speak tags
    if (!fixed.includes('<speak>')) {
      fixed = `<speak>${fixed}</speak>`;
    }
    
    // Fix nested speak tags
    fixed = fixed.replace(/<speak><speak>/g, '<speak>');
    fixed = fixed.replace(/<\/speak><\/speak>/g, '</speak>');
    
    // Fix unclosed tags (basic)
    fixed = fixed.replace(/<prosody([^>]*)>([^<]*)<\/speak>/g, '<prosody$1>$2</prosody></speak>');
    
    return fixed;
  }
}