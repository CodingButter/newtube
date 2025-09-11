import { 
  ElevenLabsConfig, 
  VoiceConfig, 
  Voice, 
  AudioChunk, 
  AudioStream, 
  AudioBuffer, 
  EmotionType, 
  VoiceSynthesisRequest,
  VoiceTestRequest,
  VoiceResponse,
  StreamingVoiceResponse,
  VoiceError,
  FEMALE_VOICES,
  EMOTION_VOICE_MAPPING,
  AudioProcessingOptions
} from '../types/voice.types';

import { Readable } from 'stream';
import { randomUUID } from 'crypto';

export class VoiceService {
  private apiKey: string;
  private baseURL = 'https://api.elevenlabs.io/v1';
  private defaultModelId = 'eleven_monolingual_v1';
  private activeStreams = new Map<string, AbortController>();

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.ELEVENLABS_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('ElevenLabs API key is required');
    }
  }

  /**
   * Synthesize speech with emotion-aware configuration
   */
  async synthesizeSpeech(
    text: string, 
    emotions: EmotionType[] = [],
    voiceConfig?: Partial<VoiceConfig>
  ): Promise<VoiceResponse> {
    try {
      // Get default voice config and apply emotion adjustments
      const config = this.applyEmotionalAdjustments(voiceConfig, emotions);
      
      const response = await fetch(`${this.baseURL}/text-to-speech/${config.voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey
        },
        body: JSON.stringify({
          text,
          model_id: config.modelId || this.defaultModelId,
          voice_settings: {
            stability: config.stability,
            similarity_boost: config.similarityBoost,
            style: config.style,
            use_speaker_boost: config.useSpeakerBoost
          }
        })
      });

      if (!response.ok) {
        throw await this.createVoiceError(response);
      }

      const audioBuffer = await response.arrayBuffer();
      const audioBase64 = Buffer.from(audioBuffer).toString('base64');

      return {
        audio: audioBase64,
        mimeType: 'audio/mpeg',
        voiceId: config.voiceId,
        messageId: randomUUID()
      };

    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Stream TTS with SSML markup and real-time audio chunks
   */
  async streamTTS(
    ssml: string, 
    voiceConfig: Partial<VoiceConfig> = {},
    messageId?: string
  ): Promise<StreamingVoiceResponse> {
    const streamId = messageId || randomUUID();
    
    try {
      const config = this.getDefaultVoiceConfig(voiceConfig);
      const abortController = new AbortController();
      this.activeStreams.set(streamId, abortController);

      // Use streaming endpoint
      const response = await fetch(`${this.baseURL}/text-to-speech/${config.voiceId}/stream`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey
        },
        body: JSON.stringify({
          text: ssml,
          model_id: config.modelId || this.defaultModelId,
          voice_settings: {
            stability: config.stability,
            similarity_boost: config.similarityBoost,
            style: config.style,
            use_speaker_boost: config.useSpeakerBoost
          }
        }),
        signal: abortController.signal
      });

      if (!response.ok) {
        throw await this.createVoiceError(response);
      }

      return {
        messageId: streamId,
        streamUrl: `/api/voice/stream/${streamId}`,
        format: 'audio/mpeg',
        estimatedDuration: this.estimateAudioDuration(ssml)
      };

    } catch (error) {
      this.activeStreams.delete(streamId);
      throw this.handleError(error);
    }
  }

  /**
   * Get available voices with enhanced metadata
   */
  async getAvailableVoices(): Promise<{ recommended: Voice[], all: Voice[] }> {
    try {
      const response = await fetch(`${this.baseURL}/voices`, {
        headers: {
          'xi-api-key': this.apiKey
        }
      });

      if (!response.ok) {
        throw await this.createVoiceError(response);
      }

      const data = await response.json();
      
      // Filter and enhance recommended voices
      const recommendedVoices = data.voices.filter((voice: Voice) => 
        Object.values(FEMALE_VOICES).some(fv => fv.id === voice.voice_id)
      ).map((voice: Voice) => ({
        ...voice,
        recommended: true,
        category: Object.values(FEMALE_VOICES).find(fv => fv.id === voice.voice_id)?.category || 'general'
      }));

      return {
        recommended: recommendedVoices,
        all: data.voices
      };

    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Test a voice with sample text
   */
  async testVoice(voiceId: string, sampleText: string, voiceSettings?: VoiceConfig): Promise<AudioBuffer> {
    try {
      const config = this.getDefaultVoiceConfig({ ...voiceSettings, voiceId });
      
      const response = await fetch(`${this.baseURL}/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey
        },
        body: JSON.stringify({
          text: sampleText,
          model_id: config.modelId || this.defaultModelId,
          voice_settings: {
            stability: config.stability,
            similarity_boost: config.similarityBoost,
            style: config.style,
            use_speaker_boost: config.useSpeakerBoost
          }
        })
      });

      if (!response.ok) {
        throw await this.createVoiceError(response);
      }

      const audioBuffer = await response.arrayBuffer();
      
      return {
        data: audioBuffer,
        format: 'audio/mpeg',
        duration: this.estimateAudioDuration(sampleText),
        sampleRate: 44100 // ElevenLabs default
      };

    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Process audio stream into chunks for WebSocket transmission
   */
  async *processAudioStream(
    audioStream: ReadableStream, 
    messageId: string,
    chunkSize: number = 4096
  ): AsyncIterableIterator<AudioChunk> {
    const reader = audioStream.getReader();
    let sequence = 0;
    let buffer = new Uint8Array(0);

    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          // Send final chunk if buffer has remaining data
          if (buffer.length > 0) {
            yield {
              id: `${messageId}-${sequence}`,
              sequence: sequence++,
              data: buffer.buffer,
              format: 'mp3',
              isLast: true,
              timestamp: Date.now()
            };
          }
          break;
        }

        // Append new data to buffer
        const newBuffer = new Uint8Array(buffer.length + value.length);
        newBuffer.set(buffer);
        newBuffer.set(value, buffer.length);
        buffer = newBuffer;

        // Send chunks when buffer is large enough
        while (buffer.length >= chunkSize) {
          const chunk = buffer.slice(0, chunkSize);
          buffer = buffer.slice(chunkSize);

          yield {
            id: `${messageId}-${sequence}`,
            sequence: sequence++,
            data: chunk.buffer,
            format: 'mp3',
            isLast: false,
            timestamp: Date.now()
          };
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  /**
   * Process audio with compression and optimization
   */
  async processAudio(
    audioBuffer: ArrayBuffer, 
    options: AudioProcessingOptions = {}
  ): Promise<ArrayBuffer> {
    // For MVP, return buffer as-is
    // In production, would implement audio processing pipeline
    // using libraries like ffmpeg-wasm or node-ffmpeg
    
    if (options.normalize || options.compression || options.fadeIn || options.fadeOut) {
      console.warn('Audio processing options not yet implemented in MVP');
    }

    return audioBuffer;
  }

  /**
   * Cancel an active audio stream
   */
  cancelStream(messageId: string): boolean {
    const controller = this.activeStreams.get(messageId);
    if (controller) {
      controller.abort();
      this.activeStreams.delete(messageId);
      return true;
    }
    return false;
  }

  /**
   * Get voice usage statistics
   */
  async getUsageStats(): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}/user/subscription`, {
        headers: {
          'xi-api-key': this.apiKey
        }
      });

      if (!response.ok) {
        throw await this.createVoiceError(response);
      }

      return await response.json();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Private helper methods
   */
  private applyEmotionalAdjustments(
    baseConfig: Partial<VoiceConfig> = {}, 
    emotions: EmotionType[]
  ): VoiceConfig {
    const config = this.getDefaultVoiceConfig(baseConfig);
    
    if (emotions.length === 0) {
      return config;
    }

    // Apply emotional adjustments based on dominant emotion
    const dominantEmotion = emotions.reduce((prev, current) => 
      prev.intensity > current.intensity ? prev : current
    );

    const emotionMapping = EMOTION_VOICE_MAPPING[dominantEmotion.type];
    if (emotionMapping) {
      config.stability = Math.max(0, Math.min(1, emotionMapping.stability * dominantEmotion.intensity + config.stability * (1 - dominantEmotion.intensity)));
      config.similarityBoost = Math.max(0, Math.min(1, emotionMapping.similarityBoost * dominantEmotion.intensity + config.similarityBoost * (1 - dominantEmotion.intensity)));
      config.style = Math.max(0, Math.min(1, emotionMapping.style * dominantEmotion.intensity + (config.style || 0.3) * (1 - dominantEmotion.intensity)));
    }

    return config;
  }

  private getDefaultVoiceConfig(partial: Partial<VoiceConfig> = {}): VoiceConfig {
    const defaultVoice = FEMALE_VOICES.rachel;
    
    return {
      voiceId: partial.voiceId || defaultVoice.id,
      stability: partial.stability ?? defaultVoice.defaultSettings.stability,
      similarityBoost: partial.similarityBoost ?? defaultVoice.defaultSettings.similarityBoost,
      style: partial.style ?? defaultVoice.defaultSettings.style,
      useSpeakerBoost: partial.useSpeakerBoost ?? defaultVoice.defaultSettings.useSpeakerBoost,
      modelId: partial.modelId || this.defaultModelId
    };
  }

  private estimateAudioDuration(text: string): number {
    // Rough estimation: ~150 words per minute, average 5 characters per word
    const wordsPerMinute = 150;
    const avgCharsPerWord = 5;
    const words = text.length / avgCharsPerWord;
    return (words / wordsPerMinute) * 60; // duration in seconds
  }

  private async createVoiceError(response: Response): Promise<VoiceError> {
    const errorText = await response.text();
    let errorData;
    
    try {
      errorData = JSON.parse(errorText);
    } catch {
      errorData = { message: errorText };
    }

    return {
      code: `ELEVENLABS_${response.status}`,
      message: errorData.detail?.message || errorData.message || `ElevenLabs API error: ${response.statusText}`,
      details: errorData,
      retryable: response.status >= 500 || response.status === 429
    };
  }

  private handleError(error: any): VoiceError {
    if (error.name === 'AbortError') {
      return {
        code: 'STREAM_CANCELLED',
        message: 'Audio stream was cancelled',
        retryable: false
      };
    }

    if (error.code && error.message) {
      return error; // Already a VoiceError
    }

    return {
      code: 'UNKNOWN_ERROR',
      message: error.message || 'Unknown voice service error',
      details: error,
      retryable: true
    };
  }

  /**
   * Health check for ElevenLabs API
   */
  async healthCheck(): Promise<{ status: 'healthy' | 'unhealthy', details?: any }> {
    try {
      const response = await fetch(`${this.baseURL}/voices`, {
        headers: { 'xi-api-key': this.apiKey },
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });

      if (response.ok) {
        return { status: 'healthy' };
      } else {
        return { 
          status: 'unhealthy', 
          details: { status: response.status, statusText: response.statusText }
        };
      }
    } catch (error) {
      return { 
        status: 'unhealthy', 
        details: { error: error instanceof Error ? error.message : 'Unknown error' }
      };
    }
  }
}

// Singleton instance for application use
let voiceServiceInstance: VoiceService | null = null;

export function getVoiceService(): VoiceService {
  if (!voiceServiceInstance) {
    voiceServiceInstance = new VoiceService();
  }
  return voiceServiceInstance;
}

export default VoiceService;