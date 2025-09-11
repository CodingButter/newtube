import { describe, it, expect, beforeEach } from '@jest/globals';
import { SSMLService } from '../../src/services/ssml.service';
import { EmotionType } from '../../src/types/voice.types';

describe('SSMLService', () => {
  let ssmlService: SSMLService;

  beforeEach(() => {
    ssmlService = new SSMLService();
  });

  describe('parseEmotionalContext', () => {
    it('should detect happy emotions from keywords', () => {
      const text = "This is absolutely fantastic and amazing!";
      const emotions = ssmlService.parseEmotionalContext(text);

      expect(emotions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'happy',
            intensity: expect.any(Number)
          })
        ])
      );
    });

    it('should detect excited emotions from punctuation', () => {
      const text = "Wow!! This is incredible!!";
      const emotions = ssmlService.parseEmotionalContext(text);

      expect(emotions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'excited',
            intensity: expect.any(Number)
          })
        ])
      );
    });

    it('should detect curious emotions from question words', () => {
      const text = "How does this work? What happens next?";
      const emotions = ssmlService.parseEmotionalContext(text);

      expect(emotions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'curious',
            intensity: expect.any(Number)
          })
        ])
      );
    });

    it('should detect helpful emotions from assistance keywords', () => {
      const text = "Let me help you with this explanation.";
      const emotions = ssmlService.parseEmotionalContext(text);

      expect(emotions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'helpful',
            intensity: expect.any(Number)
          })
        ])
      );
    });

    it('should merge existing emotions with detected ones', () => {
      const text = "This is amazing!";
      const existingEmotions: EmotionType[] = [
        { type: 'calm', intensity: 0.5 }
      ];

      const emotions = ssmlService.parseEmotionalContext(text, existingEmotions);

      expect(emotions).toHaveLength(2);
      expect(emotions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: 'calm' }),
          expect.objectContaining({ type: 'happy' })
        ])
      );
    });

    it('should handle neutral text', () => {
      const text = "The weather is mild today.";
      const emotions = ssmlService.parseEmotionalContext(text);

      // Should detect some neutral emotion or have minimal emotions
      expect(emotions).toBeDefined();
    });
  });

  describe('generateSSML', () => {
    it('should generate basic SSML markup', () => {
      const text = "Hello world";
      const emotions: EmotionType[] = [
        { type: 'happy', intensity: 0.7 }
      ];

      const ssml = ssmlService.generateSSML(text, emotions);

      expect(ssml).toContain('<speak>');
      expect(ssml).toContain('</speak>');
      expect(ssml).toContain('<prosody');
      expect(ssml).toContain('Hello world');
    });

    it('should apply emotional prosody settings', () => {
      const text = "I'm so excited to help you!";
      const emotions: EmotionType[] = [
        { type: 'excited', intensity: 0.9 }
      ];

      const ssml = ssmlService.generateSSML(text, emotions);

      expect(ssml).toContain('<prosody');
      expect(ssml).toContain('<emphasis');
      expect(ssml).toContain('excited');
    });

    it('should handle custom SSML config', () => {
      const text = "Welcome to NEWTUBE";
      const emotions: EmotionType[] = [{ type: 'neutral', intensity: 0.5 }];
      const config = {
        rate: 'fast' as const,
        pitch: 'high' as const,
        volume: 'loud' as const,
        pauseAfter: 1000
      };

      const ssml = ssmlService.generateSSML(text, emotions, config);

      expect(ssml).toContain('rate="fast"');
      expect(ssml).toContain('pitch="high"');
      expect(ssml).toContain('volume="loud"');
      expect(ssml).toContain('time="1000ms"');
    });

    it('should sanitize text for SSML', () => {
      const text = 'Text with <brackets> & "quotes" and \'apostrophes\'';
      const emotions: EmotionType[] = [];

      const ssml = ssmlService.generateSSML(text, emotions);

      expect(ssml).toContain('&lt;brackets&gt;');
      expect(ssml).toContain('&amp;');
      expect(ssml).toContain('&quot;quotes&quot;');
      expect(ssml).toContain('&apos;apostrophes&apos;');
    });

    it('should segment text by emotion', () => {
      const text = "Hello! I'm excited. But let me explain calmly.";
      const emotions: EmotionType[] = [
        { type: 'excited', intensity: 0.8 },
        { type: 'calm', intensity: 0.6 }
      ];

      const ssml = ssmlService.generateSSML(text, emotions);

      expect(ssml).toContain('<emphasis');
      expect(ssml).toContain('<break');
    });
  });

  describe('mapEmotionsToVoiceParams', () => {
    it('should map excited emotion to voice parameters', () => {
      const emotions: EmotionType[] = [
        { type: 'excited', intensity: 0.8 }
      ];

      const params = ssmlService.mapEmotionsToVoiceParams(emotions);

      expect(params.stability).toBeLessThan(0.5); // Excited should be less stable
      expect(params.similarityBoost).toBeGreaterThan(0.5); // More expressive
      expect(params.rateModifier).toBeGreaterThan(1.0); // Faster speech
      expect(params.pitchModifier).toBeGreaterThan(1.0); // Higher pitch
    });

    it('should map calm emotion to voice parameters', () => {
      const emotions: EmotionType[] = [
        { type: 'calm', intensity: 0.9 }
      ];

      const params = ssmlService.mapEmotionsToVoiceParams(emotions);

      expect(params.stability).toBeGreaterThan(0.5); // Calm should be more stable
      expect(params.rateModifier).toBeLessThan(1.0); // Slower speech
      expect(params.pitchModifier).toBeLessThan(1.0); // Lower pitch
    });

    it('should handle neutral emotions', () => {
      const emotions: EmotionType[] = [
        { type: 'neutral', intensity: 0.5 }
      ];

      const params = ssmlService.mapEmotionsToVoiceParams(emotions);

      expect(params.stability).toBe(0.5);
      expect(params.similarityBoost).toBe(0.5);
      expect(params.rateModifier).toBe(1.0);
      expect(params.pitchModifier).toBe(1.0);
    });

    it('should return neutral params for empty emotions array', () => {
      const emotions: EmotionType[] = [];

      const params = ssmlService.mapEmotionsToVoiceParams(emotions);

      expect(params.stability).toBe(0.5);
      expect(params.similarityBoost).toBe(0.5);
      expect(params.rateModifier).toBe(1.0);
      expect(params.pitchModifier).toBe(1.0);
    });
  });

  describe('analyzeEmotionalMarkers', () => {
    it('should analyze text and return emotional analysis', () => {
      const text = "Wow! This is absolutely fantastic! How amazing is this?";

      const analysis = ssmlService.analyzeEmotionalMarkers(text);

      expect(analysis).toMatchObject({
        emotions: expect.any(Array),
        confidence: expect.any(Number),
        segments: expect.any(Array)
      });

      expect(analysis.emotions.length).toBeGreaterThan(0);
      expect(analysis.confidence).toBeGreaterThan(0);
      expect(analysis.segments.length).toBeGreaterThan(0);
    });

    it('should calculate confidence based on markers', () => {
      const highMarkerText = "Amazing! Fantastic! Incredible! How wonderful!!!";
      const lowMarkerText = "The weather is okay today.";

      const highAnalysis = ssmlService.analyzeEmotionalMarkers(highMarkerText);
      const lowAnalysis = ssmlService.analyzeEmotionalMarkers(lowMarkerText);

      expect(highAnalysis.confidence).toBeGreaterThan(lowAnalysis.confidence);
    });

    it('should segment text with emotional context', () => {
      const text = "Hello there! I'm excited to help. Let me explain this calmly.";

      const analysis = ssmlService.analyzeEmotionalMarkers(text);

      expect(analysis.segments).toHaveLength(3); // Three sentences
      analysis.segments.forEach(segment => {
        expect(segment).toMatchObject({
          emotion: expect.objectContaining({
            type: expect.any(String),
            intensity: expect.any(Number)
          }),
          startIndex: expect.any(Number),
          endIndex: expect.any(Number),
          text: expect.any(String)
        });
      });
    });
  });

  describe('createOptimizedSSML', () => {
    it('should create tutorial-optimized SSML', () => {
      const text = "Let me show you how this feature works.";

      const ssml = ssmlService.createOptimizedSSML(text, 'tutorial');

      expect(ssml).toContain('<speak>');
      expect(ssml).toContain('rate="medium"');
      expect(ssml).toContain('time="500ms"'); // Tutorial pause
    });

    it('should create casual-optimized SSML', () => {
      const text = "Hey there! How are you doing today?";

      const ssml = ssmlService.createOptimizedSSML(text, 'casual');

      expect(ssml).toContain('<speak>');
      expect(ssml).toContain('time="300ms"'); // Casual pause
    });

    it('should create professional-optimized SSML', () => {
      const text = "Welcome to our professional service platform.";

      const ssml = ssmlService.createOptimizedSSML(text, 'professional');

      expect(ssml).toContain('<speak>');
      expect(ssml).toContain('time="400ms"'); // Professional pause
    });

    it('should create enthusiastic-optimized SSML', () => {
      const text = "This is absolutely incredible news!";

      const ssml = ssmlService.createOptimizedSSML(text, 'enthusiastic');

      expect(ssml).toContain('<speak>');
      expect(ssml).toContain('rate="fast"');
      expect(ssml).toContain('pitch="high"');
      expect(ssml).toContain('volume="loud"');
      expect(ssml).toContain('time="200ms"'); // Quick enthusiastic pause
    });
  });

  describe('validateSSML', () => {
    it('should validate correct SSML', () => {
      const validSSML = '<speak><prosody rate="medium">Hello world</prosody></speak>';

      const validation = ssmlService.validateSSML(validSSML);

      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should detect missing speak tags', () => {
      const invalidSSML = '<prosody rate="medium">Hello world</prosody>';

      const validation = ssmlService.validateSSML(invalidSSML);

      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('SSML must be wrapped in <speak> tags');
    });

    it('should detect unclosed tags', () => {
      const invalidSSML = '<speak><prosody rate="medium">Hello world</speak>';

      const validation = ssmlService.validateSSML(invalidSSML);

      expect(validation.isValid).toBe(false);
      expect(validation.errors).toEqual(
        expect.arrayContaining([
          expect.stringContaining('Unclosed tag: prosody')
        ])
      );
    });

    it('should handle empty SSML', () => {
      const emptySSML = '';

      const validation = ssmlService.validateSSML(emptySSML);

      expect(validation.isValid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });

    it('should validate complex nested SSML', () => {
      const complexSSML = `
        <speak>
          <prosody rate="medium" pitch="medium">
            <emphasis level="moderate">Hello there!</emphasis>
            <break time="500ms"/>
            <prosody rate="fast">I'm excited to help you today.</prosody>
          </prosody>
        </speak>
      `;

      const validation = ssmlService.validateSSML(complexSSML);

      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });
  });

  describe('emotional processing edge cases', () => {
    it('should handle very long text', () => {
      const longText = "Hello ".repeat(1000) + "world!";
      const emotions = ssmlService.parseEmotionalContext(longText);

      expect(emotions).toBeDefined();
      expect(Array.isArray(emotions)).toBe(true);
    });

    it('should handle text with only punctuation', () => {
      const punctuationText = "!!! ??? ... !!!";
      const emotions = ssmlService.parseEmotionalContext(punctuationText);

      expect(emotions).toBeDefined();
      expect(emotions.length).toBeGreaterThan(0);
    });

    it('should handle text with mixed emotions', () => {
      const mixedText = "I'm happy about this! But I'm also concerned... How will this work?";
      const emotions = ssmlService.parseEmotionalContext(mixedText);

      const emotionTypes = emotions.map(e => e.type);
      expect(emotionTypes).toEqual(
        expect.arrayContaining(['happy', 'concerned', 'curious'])
      );
    });

    it('should handle text with no emotional content', () => {
      const neutralText = "The temperature is 72 degrees. The time is 3 PM.";
      const emotions = ssmlService.parseEmotionalContext(neutralText);

      // Should still work, might return neutral or minimal emotions
      expect(emotions).toBeDefined();
      expect(Array.isArray(emotions)).toBe(true);
    });
  });
});