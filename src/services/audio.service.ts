import { AudioChunk, AudioBuffer, AudioProcessingOptions } from '../types/voice.types';
import { Readable, Transform } from 'stream';
import { randomUUID } from 'crypto';

export interface AudioMetadata {
  format: string;
  sampleRate: number;
  bitRate: number;
  channels: number;
  duration: number;
  size: number;
}

export interface CompressionSettings {
  quality: 'high' | 'medium' | 'low';
  bitRate?: number;
  sampleRate?: number;
}

export class AudioService {
  private readonly supportedFormats = ['mp3', 'wav', 'ogg', 'aac'];
  private readonly chunkSize = 4096; // Default chunk size for streaming

  /**
   * Convert audio buffer to streaming chunks
   */
  async *bufferToChunks(
    audioBuffer: ArrayBuffer,
    messageId: string,
    chunkSize: number = this.chunkSize
  ): AsyncIterableIterator<AudioChunk> {
    const buffer = new Uint8Array(audioBuffer);
    const totalChunks = Math.ceil(buffer.length / chunkSize);
    
    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, buffer.length);
      const chunk = buffer.slice(start, end);
      
      yield {
        id: `${messageId}-${i}`,
        sequence: i,
        data: chunk.buffer,
        format: 'mp3', // Default format from ElevenLabs
        isLast: i === totalChunks - 1,
        timestamp: Date.now()
      };
    }
  }

  /**
   * Reconstruct audio buffer from chunks
   */
  async chunksToBuffer(chunks: AudioChunk[]): Promise<AudioBuffer> {
    // Sort chunks by sequence number
    const sortedChunks = chunks.sort((a, b) => a.sequence - b.sequence);
    
    // Calculate total size
    const totalSize = sortedChunks.reduce((sum, chunk) => 
      sum + (chunk.data instanceof ArrayBuffer ? chunk.data.byteLength : chunk.data.length), 0
    );
    
    // Reconstruct buffer
    const result = new Uint8Array(totalSize);
    let offset = 0;
    
    for (const chunk of sortedChunks) {
      const chunkData = chunk.data instanceof ArrayBuffer 
        ? new Uint8Array(chunk.data)
        : new Uint8Array(chunk.data);
      
      result.set(chunkData, offset);
      offset += chunkData.length;
    }
    
    return {
      data: result.buffer,
      format: chunks[0]?.format || 'mp3',
      duration: this.estimateDuration(result.buffer, chunks[0]?.format || 'mp3'),
      sampleRate: 44100 // Default ElevenLabs sample rate
    };
  }

  /**
   * Compress audio for web streaming
   */
  async compressAudio(
    audioBuffer: ArrayBuffer,
    settings: CompressionSettings = { quality: 'medium' }
  ): Promise<ArrayBuffer> {
    // For MVP, return buffer as-is with logging
    // In production, would use ffmpeg-wasm or similar
    console.log(`Audio compression requested: ${settings.quality}`);
    
    // Simulate compression by returning original buffer
    // Real implementation would reduce file size based on settings
    return audioBuffer;
  }

  /**
   * Apply audio effects and processing
   */
  async processAudio(
    audioBuffer: ArrayBuffer,
    options: AudioProcessingOptions = {}
  ): Promise<ArrayBuffer> {
    let processedBuffer = audioBuffer;
    
    // For MVP, log processing options
    if (options.normalize) {
      console.log('Audio normalization requested');
      // Real implementation would normalize audio levels
    }
    
    if (options.fadeIn || options.fadeOut) {
      console.log(`Fade effects requested: fadeIn=${options.fadeIn}ms, fadeOut=${options.fadeOut}ms`);
      // Real implementation would apply fade effects
    }
    
    if (options.maxDuration) {
      console.log(`Duration limit requested: ${options.maxDuration}s`);
      // Real implementation would truncate audio if needed
      processedBuffer = await this.truncateAudio(processedBuffer, options.maxDuration);
    }
    
    return processedBuffer;
  }

  /**
   * Convert between audio formats
   */
  async convertFormat(
    audioBuffer: ArrayBuffer,
    fromFormat: string,
    toFormat: string
  ): Promise<ArrayBuffer> {
    if (fromFormat === toFormat) {
      return audioBuffer;
    }
    
    if (!this.supportedFormats.includes(toFormat)) {
      throw new Error(`Unsupported target format: ${toFormat}`);
    }
    
    console.log(`Audio format conversion: ${fromFormat} -> ${toFormat}`);
    
    // For MVP, return original buffer
    // Real implementation would use ffmpeg-wasm for conversion
    return audioBuffer;
  }

  /**
   * Extract audio metadata
   */
  async getAudioMetadata(audioBuffer: ArrayBuffer, format: string = 'mp3'): Promise<AudioMetadata> {
    const size = audioBuffer.byteLength;
    
    // Basic metadata extraction (simplified for MVP)
    // Real implementation would parse audio file headers
    const metadata: AudioMetadata = {
      format,
      sampleRate: 44100, // ElevenLabs default
      bitRate: this.estimateBitRate(size, format),
      channels: 1, // Most TTS is mono
      duration: this.estimateDuration(audioBuffer, format),
      size
    };
    
    return metadata;
  }

  /**
   * Create audio stream from buffer with backpressure handling
   */
  createAudioStream(
    audioBuffer: ArrayBuffer,
    chunkSize: number = this.chunkSize
  ): Readable {
    let offset = 0;
    const buffer = new Uint8Array(audioBuffer);
    
    return new Readable({
      read() {
        if (offset >= buffer.length) {
          this.push(null); // End of stream
          return;
        }
        
        const end = Math.min(offset + chunkSize, buffer.length);
        const chunk = buffer.slice(offset, end);
        offset = end;
        
        this.push(Buffer.from(chunk));
      }
    });
  }

  /**
   * Transform stream for real-time audio processing
   */
  createProcessingTransform(options: AudioProcessingOptions = {}): Transform {
    return new Transform({
      transform(chunk: Buffer, encoding, callback) {
        // For MVP, pass through chunks unchanged
        // Real implementation would apply real-time processing
        
        if (options.compression) {
          // Simulate compression delay
          setTimeout(() => callback(null, chunk), 1);
        } else {
          callback(null, chunk);
        }
      }
    });
  }

  /**
   * Validate audio buffer integrity
   */
  validateAudioBuffer(audioBuffer: ArrayBuffer, expectedFormat: string = 'mp3'): {
    isValid: boolean;
    errors: string[];
    metadata?: AudioMetadata;
  } {
    const errors: string[] = [];
    
    if (audioBuffer.byteLength === 0) {
      errors.push('Audio buffer is empty');
    }
    
    if (audioBuffer.byteLength < 1024) {
      errors.push('Audio buffer too small (< 1KB)');
    }
    
    // Basic format validation for MP3
    if (expectedFormat === 'mp3') {
      const header = new Uint8Array(audioBuffer.slice(0, 3));
      const isMP3 = header[0] === 0xFF && (header[1] & 0xE0) === 0xE0;
      
      if (!isMP3) {
        // Check for ID3 tag (alternative MP3 start)
        const id3Header = new Uint8Array(audioBuffer.slice(0, 3));
        const hasID3 = String.fromCharCode(...id3Header) === 'ID3';
        
        if (!hasID3) {
          errors.push('Invalid MP3 format: missing MP3 sync word or ID3 tag');
        }
      }
    }
    
    const metadata = errors.length === 0 
      ? this.extractBasicMetadata(audioBuffer, expectedFormat)
      : undefined;
    
    return {
      isValid: errors.length === 0,
      errors,
      metadata
    };
  }

  /**
   * Calculate optimal chunk size based on network conditions
   */
  calculateOptimalChunkSize(
    networkSpeed: 'slow' | 'medium' | 'fast' = 'medium',
    latencyRequirement: 'low' | 'medium' | 'high' = 'medium'
  ): number {
    const baseSizes = {
      slow: 2048,
      medium: 4096,
      fast: 8192
    };
    
    const latencyMultipliers = {
      low: 0.5,   // Smaller chunks for lower latency
      medium: 1.0,
      high: 2.0   // Larger chunks for higher throughput
    };
    
    return Math.floor(baseSizes[networkSpeed] * latencyMultipliers[latencyRequirement]);
  }

  /**
   * Monitor streaming performance
   */
  createPerformanceMonitor() {
    const stats = {
      bytesTransferred: 0,
      chunksProcessed: 0,
      startTime: Date.now(),
      lastChunkTime: Date.now(),
      averageChunkInterval: 0
    };
    
    return {
      recordChunk: (chunk: AudioChunk) => {
        stats.bytesTransferred += chunk.data instanceof ArrayBuffer 
          ? chunk.data.byteLength 
          : chunk.data.length;
        stats.chunksProcessed++;
        
        const now = Date.now();
        const interval = now - stats.lastChunkTime;
        stats.averageChunkInterval = 
          (stats.averageChunkInterval * (stats.chunksProcessed - 1) + interval) / stats.chunksProcessed;
        stats.lastChunkTime = now;
      },
      
      getStats: () => ({
        ...stats,
        totalDuration: Date.now() - stats.startTime,
        throughputKbps: (stats.bytesTransferred * 8) / ((Date.now() - stats.startTime) / 1000) / 1024,
        averageChunkIntervalMs: stats.averageChunkInterval
      })
    };
  }

  /**
   * Private helper methods
   */
  private estimateDuration(audioBuffer: ArrayBuffer, format: string): number {
    // Simplified duration estimation
    // Real implementation would parse audio headers
    const size = audioBuffer.byteLength;
    const estimatedBitRate = this.estimateBitRate(size, format);
    
    // Duration = (size in bits) / (bitrate in bits per second)
    return (size * 8) / (estimatedBitRate * 1000);
  }
  
  private estimateBitRate(size: number, format: string): number {
    // Rough bitrate estimates based on typical file sizes
    switch (format) {
      case 'mp3':
        return 128; // 128 kbps typical for speech
      case 'wav':
        return 1411; // 44.1kHz 16-bit stereo
      case 'ogg':
        return 96; // 96 kbps typical
      case 'aac':
        return 128; // 128 kbps typical
      default:
        return 128;
    }
  }
  
  private async truncateAudio(audioBuffer: ArrayBuffer, maxDurationSeconds: number): Promise<ArrayBuffer> {
    const metadata = await this.getAudioMetadata(audioBuffer);
    
    if (metadata.duration <= maxDurationSeconds) {
      return audioBuffer; // No truncation needed
    }
    
    // Calculate bytes to keep
    const ratio = maxDurationSeconds / metadata.duration;
    const truncatedSize = Math.floor(audioBuffer.byteLength * ratio);
    
    return audioBuffer.slice(0, truncatedSize);
  }
  
  private extractBasicMetadata(audioBuffer: ArrayBuffer, format: string): AudioMetadata {
    return {
      format,
      sampleRate: 44100,
      bitRate: this.estimateBitRate(audioBuffer.byteLength, format),
      channels: 1,
      duration: this.estimateDuration(audioBuffer, format),
      size: audioBuffer.byteLength
    };
  }
}

// Singleton instance
let audioServiceInstance: AudioService | null = null;

export function getAudioService(): AudioService {
  if (!audioServiceInstance) {
    audioServiceInstance = new AudioService();
  }
  return audioServiceInstance;
}

export default AudioService;