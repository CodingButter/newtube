import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { VoiceService } from '../../src/services/voice.service';
import { EmotionType, VoiceError, FEMALE_VOICES } from '../../src/types/voice.types';

// Mock fetch globally
global.fetch = jest.fn();

describe('VoiceService', () => {
  let voiceService: VoiceService;
  const mockApiKey = 'sk-test-api-key';

  beforeEach(() => {
    voiceService = new VoiceService(mockApiKey);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('should throw error if no API key provided', () => {
      expect(() => new VoiceService('')).toThrow('ElevenLabs API key is required');
    });

    it('should use environment variable if no API key provided', () => {
      process.env.ELEVENLABS_API_KEY = 'env-api-key';
      const service = new VoiceService();
      expect(service).toBeInstanceOf(VoiceService);
    });
  });

  describe('synthesizeSpeech', () => {
    const mockAudioBuffer = new ArrayBuffer(1024);

    beforeEach(() => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        arrayBuffer: () => Promise.resolve(mockAudioBuffer)
      });
    });

    it('should synthesize speech with default settings', async () => {
      const result = await voiceService.synthesizeSpeech('Hello world');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/text-to-speech/'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'xi-api-key': mockApiKey
          }),
          body: expect.stringContaining('Hello world')
        })
      );

      expect(result).toEqual({
        audio: expect.any(String),
        mimeType: 'audio/mpeg',
        voiceId: expect.any(String),
        messageId: expect.any(String)
      });
    });

    it('should apply emotional adjustments', async () => {
      const emotions: EmotionType[] = [
        { type: 'excited', intensity: 0.8 }
      ];

      await voiceService.synthesizeSpeech('Hello world', emotions);

      const fetchCall = (fetch as jest.Mock).mock.calls[0];
      const requestBody = JSON.parse(fetchCall[1].body);

      expect(requestBody.voice_settings.stability).toBeLessThan(0.5); // Excited = less stable
      expect(requestBody.voice_settings.similarity_boost).toBeGreaterThan(0.5); // Excited = more expressive
    });

    it('should handle API errors', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 429,
        text: () => Promise.resolve('Rate limit exceeded')
      });

      await expect(voiceService.synthesizeSpeech('Hello world'))
        .rejects
        .toMatchObject({
          code: 'ELEVENLABS_429',
          retryable: true
        });
    });

    it('should handle network errors', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      await expect(voiceService.synthesizeSpeech('Hello world'))
        .rejects
        .toMatchObject({
          code: 'UNKNOWN_ERROR',
          retryable: true
        });
    });
  });

  describe('streamTTS', () => {
    it('should initiate streaming TTS', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        body: {
          getReader: () => ({
            read: () => Promise.resolve({ done: true, value: undefined })
          })
        }
      });

      const result = await voiceService.streamTTS('Hello world');

      expect(result).toEqual({
        messageId: expect.any(String),
        streamUrl: expect.stringContaining('/api/voice/stream/'),
        format: 'audio/mpeg',
        estimatedDuration: expect.any(Number)
      });
    });

    it('should handle streaming errors', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        text: () => Promise.resolve('Server error')
      });

      await expect(voiceService.streamTTS('Hello world'))
        .rejects
        .toMatchObject({
          code: 'ELEVENLABS_500',
          retryable: true
        });
    });
  });

  describe('getAvailableVoices', () => {
    const mockVoicesResponse = {
      voices: [
        {
          voice_id: FEMALE_VOICES.rachel.id,
          name: 'Rachel',
          category: 'conversational'
        },
        {
          voice_id: 'other-voice-id',
          name: 'Other Voice',
          category: 'general'
        }
      ]
    };

    beforeEach(() => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockVoicesResponse)
      });
    });

    it('should fetch and categorize voices', async () => {
      const result = await voiceService.getAvailableVoices();

      expect(result.recommended).toHaveLength(1);
      expect(result.recommended[0].voice_id).toBe(FEMALE_VOICES.rachel.id);
      expect(result.all).toHaveLength(2);
    });

    it('should handle API errors', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 401,
        text: () => Promise.resolve('Unauthorized')
      });

      await expect(voiceService.getAvailableVoices())
        .rejects
        .toMatchObject({
          code: 'ELEVENLABS_401'
        });
    });
  });

  describe('testVoice', () => {
    const mockAudioBuffer = new ArrayBuffer(2048);

    beforeEach(() => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        arrayBuffer: () => Promise.resolve(mockAudioBuffer)
      });
    });

    it('should test voice with sample text', async () => {
      const result = await voiceService.testVoice(
        FEMALE_VOICES.rachel.id,
        'Test voice sample'
      );

      expect(result).toEqual({
        data: mockAudioBuffer,
        format: 'audio/mpeg',
        duration: expect.any(Number),
        sampleRate: 44100
      });
    });

    it('should use custom voice settings', async () => {
      const customSettings = {
        voiceId: FEMALE_VOICES.bella.id,
        stability: 0.8,
        similarityBoost: 0.3,
        style: 0.1,
        useSpeakerBoost: false
      };

      await voiceService.testVoice(
        FEMALE_VOICES.bella.id,
        'Test',
        customSettings
      );

      const fetchCall = (fetch as jest.Mock).mock.calls[0];
      const requestBody = JSON.parse(fetchCall[1].body);

      expect(requestBody.voice_settings).toMatchObject({
        stability: 0.8,
        similarity_boost: 0.3,
        style: 0.1,
        use_speaker_boost: false
      });
    });
  });

  describe('processAudioStream', () => {
    it('should process stream into chunks', async () => {
      const mockStream = new ReadableStream({
        start(controller) {
          controller.enqueue(new Uint8Array([1, 2, 3, 4]));
          controller.enqueue(new Uint8Array([5, 6, 7, 8]));
          controller.close();
        }
      });

      const chunks = [];
      const chunkGenerator = voiceService.processAudioStream(mockStream, 'test-id', 4);

      for await (const chunk of chunkGenerator) {
        chunks.push(chunk);
      }

      expect(chunks).toHaveLength(2);
      expect(chunks[0].sequence).toBe(0);
      expect(chunks[0].isLast).toBe(false);
      expect(chunks[1].sequence).toBe(1);
      expect(chunks[1].isLast).toBe(true);
    });
  });

  describe('cancelStream', () => {
    it('should cancel active stream', () => {
      // First start a stream to have something to cancel
      const result = voiceService.cancelStream('non-existent-id');
      expect(result).toBe(false);
    });
  });

  describe('healthCheck', () => {
    it('should return healthy status when API is accessible', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: true
      });

      const result = await voiceService.healthCheck();

      expect(result.status).toBe('healthy');
    });

    it('should return unhealthy status when API is not accessible', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      const result = await voiceService.healthCheck();

      expect(result.status).toBe('unhealthy');
      expect(result.details).toMatchObject({
        status: 500,
        statusText: 'Internal Server Error'
      });
    });

    it('should handle network timeouts', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('Timeout'));

      const result = await voiceService.healthCheck();

      expect(result.status).toBe('unhealthy');
      expect(result.details.error).toBe('Timeout');
    });
  });

  describe('error handling', () => {
    it('should create VoiceError from API response', async () => {
      const errorResponse = {
        ok: false,
        status: 422,
        text: () => Promise.resolve(JSON.stringify({
          detail: {
            message: 'Validation error'
          }
        }))
      };

      (fetch as jest.Mock).mockResolvedValue(errorResponse);

      try {
        await voiceService.synthesizeSpeech('Hello');
      } catch (error) {
        expect(error).toMatchObject({
          code: 'ELEVENLABS_422',
          message: 'Validation error',
          retryable: false
        });
      }
    });

    it('should handle abort errors', async () => {
      const abortError = new Error('Aborted');
      abortError.name = 'AbortError';
      
      (fetch as jest.Mock).mockRejectedValue(abortError);

      try {
        await voiceService.synthesizeSpeech('Hello');
      } catch (error) {
        expect(error).toMatchObject({
          code: 'STREAM_CANCELLED',
          retryable: false
        });
      }
    });
  });

  describe('voice configuration', () => {
    it('should use Rachel as default voice', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(1024))
      });

      await voiceService.synthesizeSpeech('Hello');

      const fetchCall = (fetch as jest.Mock).mock.calls[0];
      expect(fetchCall[0]).toContain(FEMALE_VOICES.rachel.id);
    });

    it('should apply female voice default settings', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(1024))
      });

      await voiceService.synthesizeSpeech('Hello', [], { voiceId: FEMALE_VOICES.bella.id });

      const fetchCall = (fetch as jest.Mock).mock.calls[0];
      const requestBody = JSON.parse(fetchCall[1].body);

      expect(requestBody.voice_settings).toMatchObject(
        FEMALE_VOICES.bella.defaultSettings
      );
    });
  });

  describe('usage statistics', () => {
    it('should fetch usage statistics', async () => {
      const mockStats = {
        character_count: 1000,
        character_limit: 10000,
        next_character_count_reset_unix: Date.now() + 86400000
      };

      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockStats)
      });

      const result = await voiceService.getUsageStats();

      expect(result).toEqual(mockStats);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/user/subscription'),
        expect.any(Object)
      );
    });
  });
});