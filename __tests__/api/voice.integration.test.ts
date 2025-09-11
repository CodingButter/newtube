import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { NextRequest } from 'next/server';

// Mock the services
jest.mock('../../src/services/voice.service');
jest.mock('../../src/services/ssml.service');
jest.mock('../../src/services/audio.service');

import { POST as synthesizePost, GET as synthesizeGet } from '../../src/app/api/voice/synthesize/route';
import { GET as voicesGet, POST as voicesPost } from '../../src/app/api/voice/voices/route';
import { POST as testPost, GET as testGet } from '../../src/app/api/voice/test/route';

// Mock implementations
const mockVoiceService = {
  synthesizeSpeech: jest.fn(),
  getAvailableVoices: jest.fn(),
  testVoice: jest.fn(),
  healthCheck: jest.fn(),
  getUsageStats: jest.fn()
};

const mockSSMLService = {
  parseEmotionalContext: jest.fn(),
  generateSSML: jest.fn(),
  analyzeEmotionalMarkers: jest.fn()
};

const mockAudioService = {
  convertFormat: jest.fn(),
  getAudioMetadata: jest.fn(),
  validateAudioBuffer: jest.fn()
};

// Import the getters and mock them
import { getVoiceService } from '../../src/services/voice.service';
import { getSSMLService } from '../../src/services/ssml.service';
import { getAudioService } from '../../src/services/audio.service';

(getVoiceService as jest.Mock).mockReturnValue(mockVoiceService);
(getSSMLService as jest.Mock).mockReturnValue(mockSSMLService);
(getAudioService as jest.Mock).mockReturnValue(mockAudioService);

describe('Voice API Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mocks
    mockVoiceService.synthesizeSpeech.mockResolvedValue({
      audio: 'base64-audio-data',
      mimeType: 'audio/mpeg',
      voiceId: 'test-voice-id',
      messageId: 'test-message-id'
    });

    mockSSMLService.parseEmotionalContext.mockReturnValue([
      { type: 'happy', intensity: 0.7 }
    ]);

    mockSSMLService.generateSSML.mockReturnValue(
      '<speak>Hello world</speak>'
    );

    mockSSMLService.analyzeEmotionalMarkers.mockReturnValue({
      emotions: [{ type: 'happy', intensity: 0.7 }],
      confidence: 0.8,
      segments: []
    });

    mockAudioService.convertFormat.mockImplementation((buffer) => buffer);
    mockAudioService.getAudioMetadata.mockResolvedValue({
      format: 'mp3',
      duration: 3.5,
      size: 1024,
      sampleRate: 44100
    });
  });

  describe('/api/voice/synthesize', () => {
    describe('POST', () => {
      it('should synthesize speech successfully', async () => {
        const request = new NextRequest('http://localhost/api/voice/synthesize', {
          method: 'POST',
          body: JSON.stringify({
            text: 'Hello world',
            voiceId: 'test-voice',
            emotions: [{ type: 'happy', intensity: 0.8 }]
          })
        });

        const response = await synthesizePost(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data).toMatchObject({
          audio: expect.any(String),
          mimeType: 'audio/mp3',
          voiceId: 'test-voice-id',
          emotions: expect.any(Array),
          ssml: '<speak>Hello world</speak>'
        });

        expect(mockVoiceService.synthesizeSpeech).toHaveBeenCalledWith(
          '<speak>Hello world</speak>',
          [{ type: 'happy', intensity: 0.7 }],
          { voiceId: 'test-voice' }
        );
      });

      it('should return validation error for empty text', async () => {
        const request = new NextRequest('http://localhost/api/voice/synthesize', {
          method: 'POST',
          body: JSON.stringify({
            text: ''
          })
        });

        const response = await synthesizePost(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.error).toContain('Text is required');
      });

      it('should return validation error for long text', async () => {
        const longText = 'a'.repeat(5001);
        const request = new NextRequest('http://localhost/api/voice/synthesize', {
          method: 'POST',
          body: JSON.stringify({
            text: longText
          })
        });

        const response = await synthesizePost(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.error).toContain('Text too long');
      });

      it('should handle service errors gracefully', async () => {
        mockVoiceService.synthesizeSpeech.mockRejectedValue({
          code: 'ELEVENLABS_429',
          message: 'Rate limit exceeded',
          retryable: true
        });

        const request = new NextRequest('http://localhost/api/voice/synthesize', {
          method: 'POST',
          body: JSON.stringify({
            text: 'Hello world'
          })
        });

        const response = await synthesizePost(request);
        const data = await response.json();

        expect(response.status).toBe(503);
        expect(data.success).toBe(false);
        expect(data.error.retryable).toBe(true);
        expect(data.error.fallback).toMatchObject({
          type: 'browser-tts'
        });
      });
    });

    describe('GET', () => {
      it('should return synthesis capabilities', async () => {
        mockVoiceService.healthCheck.mockResolvedValue({
          status: 'healthy'
        });

        const request = new NextRequest('http://localhost/api/voice/synthesize');
        const response = await synthesizeGet();
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data).toMatchObject({
          healthStatus: { status: 'healthy' },
          capabilities: {
            supportedFormats: expect.arrayContaining(['mp3', 'wav', 'ogg']),
            maxTextLength: 5000,
            supportedEmotions: expect.any(Array),
            features: {
              emotionalSynthesis: true,
              ssmlSupport: true,
              formatConversion: true,
              realTimeStreaming: true
            }
          }
        });
      });

      it('should handle service unavailable', async () => {
        mockVoiceService.healthCheck.mockRejectedValue(new Error('Service down'));

        const request = new NextRequest('http://localhost/api/voice/synthesize');
        const response = await synthesizeGet();
        const data = await response.json();

        expect(response.status).toBe(503);
        expect(data.success).toBe(false);
        expect(data.error.code).toBe('SERVICE_UNAVAILABLE');
      });
    });
  });

  describe('/api/voice/voices', () => {
    const mockVoicesResponse = {
      recommended: [
        {
          voice_id: 'rachel-id',
          name: 'Rachel',
          category: 'conversational'
        }
      ],
      all: [
        {
          voice_id: 'rachel-id',
          name: 'Rachel',
          category: 'conversational'
        },
        {
          voice_id: 'other-id',
          name: 'Other',
          category: 'general'
        }
      ]
    };

    beforeEach(() => {
      mockVoiceService.getAvailableVoices.mockResolvedValue(mockVoicesResponse);
      mockVoiceService.healthCheck.mockResolvedValue({ status: 'healthy' });
      mockVoiceService.getUsageStats.mockResolvedValue({
        character_count: 1000,
        character_limit: 10000
      });
    });

    describe('GET', () => {
      it('should return enhanced voices list', async () => {
        const request = new NextRequest('http://localhost/api/voice/voices');
        const response = await voicesGet(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data).toMatchObject({
          voices: expect.any(Array),
          statistics: {
            total: 2,
            recommended: 1,
            filtered: expect.any(Number)
          },
          healthStatus: { status: 'healthy' },
          featuredVoices: expect.any(Object),
          supportedEmotions: expect.any(Array)
        });
      });

      it('should filter voices by category', async () => {
        const request = new NextRequest('http://localhost/api/voice/voices?category=conversational');
        const response = await voicesGet(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.data.voices.length).toBeGreaterThan(0);
        // Filtered voices should be less than or equal to total
        expect(data.data.statistics.filtered).toBeLessThanOrEqual(data.data.statistics.total);
      });

      it('should filter recommended voices only', async () => {
        const request = new NextRequest('http://localhost/api/voice/voices?recommended=true');
        const response = await voicesGet(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.data.statistics.filtered).toBe(data.data.statistics.recommended);
      });

      it('should handle service errors', async () => {
        mockVoiceService.getAvailableVoices.mockRejectedValue(new Error('API Error'));

        const request = new NextRequest('http://localhost/api/voice/voices');
        const response = await voicesGet(request);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data.success).toBe(false);
        expect(data.error.fallback).toMatchObject({
          type: 'browser-voices'
        });
      });
    });

    describe('POST', () => {
      it('should test voice successfully', async () => {
        mockVoiceService.testVoice.mockResolvedValue({
          data: new ArrayBuffer(1024),
          format: 'audio/mpeg',
          duration: 2.5,
          sampleRate: 44100
        });

        const request = new NextRequest('http://localhost/api/voice/voices', {
          method: 'POST',
          body: JSON.stringify({
            voiceId: 'test-voice-id',
            settings: { stability: 0.8 },
            sampleText: 'Test voice sample'
          })
        });

        const response = await voicesPost(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data).toMatchObject({
          voiceId: 'test-voice-id',
          testText: 'Test voice sample',
          audio: {
            data: expect.any(String),
            format: 'audio/mpeg',
            duration: 2.5
          }
        });
      });

      it('should return error for missing voice ID', async () => {
        const request = new NextRequest('http://localhost/api/voice/voices', {
          method: 'POST',
          body: JSON.stringify({
            sampleText: 'Test'
          })
        });

        const response = await voicesPost(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.error).toContain('Voice ID is required');
      });
    });
  });

  describe('/api/voice/test', () => {
    beforeEach(() => {
      mockVoiceService.testVoice.mockResolvedValue({
        data: new ArrayBuffer(2048),
        format: 'audio/mpeg',
        duration: 3.0,
        sampleRate: 44100
      });

      mockAudioService.validateAudioBuffer.mockReturnValue({
        isValid: true,
        errors: [],
        quality: 'good'
      });
    });

    describe('POST', () => {
      it('should test voice with comprehensive analysis', async () => {
        const request = new NextRequest('http://localhost/api/voice/test', {
          method: 'POST',
          body: JSON.stringify({
            voiceId: 'test-voice-id',
            sampleText: 'This is a comprehensive test!'
          })
        });

        const response = await testPost(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data).toMatchObject({
          test: {
            voiceId: 'test-voice-id',
            testText: 'This is a comprehensive test!',
            ssml: expect.any(String)
          },
          audio: {
            data: expect.any(String),
            format: 'audio/mpeg',
            duration: 3.0
          },
          analysis: {
            emotions: expect.any(Array),
            confidence: expect.any(Number)
          },
          validation: {
            isValid: true,
            quality: 'good'
          }
        });

        expect(mockSSMLService.analyzeEmotionalMarkers).toHaveBeenCalled();
        expect(mockAudioService.validateAudioBuffer).toHaveBeenCalled();
      });

      it('should use default sample text if none provided', async () => {
        const request = new NextRequest('http://localhost/api/voice/test', {
          method: 'POST',
          body: JSON.stringify({
            voiceId: 'test-voice-id'
          })
        });

        const response = await testPost(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.data.test.testText).toContain('NEWTUBE voice assistant');
      });

      it('should handle test failures', async () => {
        mockVoiceService.testVoice.mockRejectedValue({
          code: 'VOICE_TEST_FAILED',
          message: 'Test failed',
          retryable: false
        });

        const request = new NextRequest('http://localhost/api/voice/test', {
          method: 'POST',
          body: JSON.stringify({
            voiceId: 'invalid-voice-id'
          })
        });

        const response = await testPost(request);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data.success).toBe(false);
        expect(data.error.fallback).toMatchObject({
          type: 'browser-tts'
        });
      });
    });

    describe('GET', () => {
      it('should return test configurations', async () => {
        mockVoiceService.healthCheck.mockResolvedValue({ status: 'healthy' });

        const request = new NextRequest('http://localhost/api/voice/test');
        const response = await testGet();
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data).toMatchObject({
          healthStatus: { status: 'healthy' },
          sampleTexts: {
            short: expect.any(String),
            medium: expect.any(String),
            long: expect.any(String),
            emotional: expect.any(String),
            technical: expect.any(String)
          },
          testConfigurations: expect.any(Array),
          testingGuidelines: {
            recommended: expect.any(Array),
            limits: {
              maxTextLength: expect.any(Number),
              maxTestsPerMinute: expect.any(Number)
            }
          }
        });
      });
    });
  });

  describe('Error handling across endpoints', () => {
    it('should handle JSON parsing errors', async () => {
      const request = new NextRequest('http://localhost/api/voice/synthesize', {
        method: 'POST',
        body: 'invalid json'
      });

      const response = await synthesizePost(request);

      expect(response.status).toBe(500);
    });

    it('should provide consistent error structure', async () => {
      mockVoiceService.synthesizeSpeech.mockRejectedValue({
        code: 'TEST_ERROR',
        message: 'Test error message',
        retryable: true
      });

      const request = new NextRequest('http://localhost/api/voice/synthesize', {
        method: 'POST',
        body: JSON.stringify({ text: 'Hello' })
      });

      const response = await synthesizePost(request);
      const data = await response.json();

      expect(data).toMatchObject({
        success: false,
        error: {
          code: expect.any(String),
          message: expect.any(String),
          retryable: expect.any(Boolean),
          fallback: {
            type: expect.any(String),
            message: expect.any(String)
          }
        }
      });
    });
  });
});