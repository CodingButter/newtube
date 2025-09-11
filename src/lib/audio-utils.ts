import { AudioChunk, AudioBuffer, AudioMetadata } from '../types/voice.types';

/**
 * Audio utility functions for processing and manipulation
 */

/**
 * Audio format detection utilities
 */
export const AUDIO_SIGNATURES = {
  mp3: [0xFF, 0xFB], // MP3 frame header
  mp3_id3: [0x49, 0x44, 0x33], // ID3 tag "ID3"
  wav: [0x52, 0x49, 0x46, 0x46], // "RIFF"
  ogg: [0x4F, 0x67, 0x67, 0x53], // "OggS"
  aac: [0xFF, 0xF1], // AAC ADTS header
  m4a: [0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70] // ftyp box
} as const;

/**
 * Detect audio format from buffer
 */
export function detectAudioFormat(buffer: ArrayBuffer): string | null {
  const bytes = new Uint8Array(buffer.slice(0, 16));
  
  // Check MP3 with ID3 tag
  if (bytes[0] === 0x49 && bytes[1] === 0x44 && bytes[2] === 0x33) {
    return 'mp3';
  }
  
  // Check MP3 frame header
  if (bytes[0] === 0xFF && (bytes[1] & 0xE0) === 0xE0) {
    return 'mp3';
  }
  
  // Check WAV
  if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46) {
    return 'wav';
  }
  
  // Check OGG
  if (bytes[0] === 0x4F && bytes[1] === 0x67 && bytes[2] === 0x67 && bytes[3] === 0x53) {
    return 'ogg';
  }
  
  // Check AAC
  if (bytes[0] === 0xFF && (bytes[1] & 0xF0) === 0xF0) {
    return 'aac';
  }
  
  return null;
}

/**
 * Validate audio buffer integrity
 */
export function validateAudioBuffer(buffer: ArrayBuffer, expectedFormat?: string): {
  isValid: boolean;
  detectedFormat: string | null;
  errors: string[];
  metadata: Partial<AudioMetadata>;
} {
  const errors: string[] = [];
  
  if (buffer.byteLength === 0) {
    errors.push('Audio buffer is empty');
  }
  
  if (buffer.byteLength < 1024) {
    errors.push('Audio buffer too small (minimum 1KB required)');
  }
  
  const detectedFormat = detectAudioFormat(buffer);
  
  if (!detectedFormat) {
    errors.push('Could not detect audio format');
  } else if (expectedFormat && detectedFormat !== expectedFormat) {
    errors.push(`Format mismatch: expected ${expectedFormat}, detected ${detectedFormat}`);
  }
  
  // Basic metadata extraction
  const metadata: Partial<AudioMetadata> = {
    size: buffer.byteLength,
    format: detectedFormat || 'unknown'
  };
  
  // Estimate duration based on format and size
  if (detectedFormat === 'mp3') {
    // Rough estimation for MP3: ~1 minute per 1MB at 128kbps
    metadata.duration = (buffer.byteLength / (128 * 1000 / 8)); // seconds
    metadata.bitRate = 128; // Assumed
    metadata.sampleRate = 44100; // Common default
  }
  
  return {
    isValid: errors.length === 0,
    detectedFormat,
    errors,
    metadata
  };
}

/**
 * Calculate optimal chunk size based on constraints
 */
export function calculateChunkSize(
  totalSize: number,
  targetChunks: number = 10,
  minChunkSize: number = 1024,
  maxChunkSize: number = 64 * 1024
): number {
  const idealChunkSize = Math.ceil(totalSize / targetChunks);
  return Math.max(minChunkSize, Math.min(maxChunkSize, idealChunkSize));
}

/**
 * Split audio buffer into chunks for streaming
 */
export function* createAudioChunks(
  buffer: ArrayBuffer,
  messageId: string,
  chunkSize?: number
): Generator<AudioChunk> {
  const format = detectAudioFormat(buffer) || 'mp3';
  const actualChunkSize = chunkSize || calculateChunkSize(buffer.byteLength);
  const totalChunks = Math.ceil(buffer.byteLength / actualChunkSize);
  const bytes = new Uint8Array(buffer);
  
  for (let i = 0; i < totalChunks; i++) {
    const start = i * actualChunkSize;
    const end = Math.min(start + actualChunkSize, buffer.byteLength);
    const chunkData = bytes.slice(start, end);
    
    yield {
      id: `${messageId}-${i}`,
      sequence: i,
      data: chunkData.buffer,
      format: format as any,
      isLast: i === totalChunks - 1,
      timestamp: Date.now()
    };
  }
}

/**
 * Reconstruct audio buffer from chunks
 */
export function reconstructAudioFromChunks(chunks: AudioChunk[]): ArrayBuffer {
  // Sort chunks by sequence
  const sortedChunks = chunks.sort((a, b) => a.sequence - b.sequence);
  
  // Calculate total size
  const totalSize = sortedChunks.reduce((sum, chunk) => {
    const size = chunk.data instanceof ArrayBuffer 
      ? chunk.data.byteLength 
      : chunk.data.length;
    return sum + size;
  }, 0);
  
  // Reconstruct buffer
  const result = new Uint8Array(totalSize);
  let offset = 0;
  
  for (const chunk of sortedChunks) {
    const chunkBytes = chunk.data instanceof ArrayBuffer
      ? new Uint8Array(chunk.data)
      : new Uint8Array(chunk.data);
    
    result.set(chunkBytes, offset);
    offset += chunkBytes.length;
  }
  
  return result.buffer;
}

/**
 * Convert audio buffer to base64 for transmission
 */
export function audioBufferToBase64(buffer: ArrayBuffer): string {
  return Buffer.from(buffer).toString('base64');
}

/**
 * Convert base64 back to audio buffer
 */
export function base64ToAudioBuffer(base64: string): ArrayBuffer {
  return Buffer.from(base64, 'base64').buffer;
}

/**
 * Estimate audio duration from file size and format
 */
export function estimateAudioDuration(
  fileSize: number, 
  format: string, 
  bitRate?: number
): number {
  // Default bitrates for different formats (kbps)
  const defaultBitRates = {
    mp3: 128,
    wav: 1411, // 44.1kHz 16-bit stereo
    ogg: 96,
    aac: 128,
    m4a: 128
  };
  
  const actualBitRate = bitRate || defaultBitRates[format as keyof typeof defaultBitRates] || 128;
  
  // Duration = (file size in bits) / (bitrate in bits per second)
  return (fileSize * 8) / (actualBitRate * 1000);
}

/**
 * Calculate audio quality metrics
 */
export function calculateAudioQuality(metadata: AudioMetadata): {
  quality: 'poor' | 'fair' | 'good' | 'excellent';
  score: number; // 0-100
  factors: Record<string, number>;
} {
  const factors = {
    bitRate: Math.min(100, (metadata.bitRate || 128) / 320 * 100),
    sampleRate: Math.min(100, (metadata.sampleRate || 22050) / 48000 * 100),
    duration: metadata.duration > 0 ? 100 : 0,
    size: metadata.size > 1024 ? 100 : 50
  };
  
  const score = Object.values(factors).reduce((sum, val) => sum + val, 0) / Object.keys(factors).length;
  
  let quality: 'poor' | 'fair' | 'good' | 'excellent';
  if (score >= 85) quality = 'excellent';
  else if (score >= 70) quality = 'good';
  else if (score >= 50) quality = 'fair';
  else quality = 'poor';
  
  return { quality, score, factors };
}

/**
 * Create silence buffer of specified duration
 */
export function createSilenceBuffer(durationMs: number, sampleRate: number = 44100): ArrayBuffer {
  const samples = Math.floor((durationMs / 1000) * sampleRate);
  const buffer = new ArrayBuffer(samples * 2); // 16-bit samples
  // Buffer is already zero-filled, which represents silence
  return buffer;
}

/**
 * Normalize audio levels (simplified implementation)
 */
export function normalizeAudioLevels(buffer: ArrayBuffer, targetLevel: number = 0.8): ArrayBuffer {
  // For MVP, return buffer unchanged
  // Real implementation would analyze and adjust audio levels
  console.log(`Audio normalization requested: target level ${targetLevel}`);
  return buffer;
}

/**
 * Apply fade effects to audio
 */
export function applyFadeEffects(
  buffer: ArrayBuffer, 
  fadeInMs: number = 0, 
  fadeOutMs: number = 0,
  sampleRate: number = 44100
): ArrayBuffer {
  // For MVP, return buffer unchanged
  // Real implementation would apply fade in/out effects
  if (fadeInMs > 0 || fadeOutMs > 0) {
    console.log(`Fade effects requested: fadeIn=${fadeInMs}ms, fadeOut=${fadeOutMs}ms`);
  }
  return buffer;
}

/**
 * Compress audio for web delivery
 */
export function compressAudioForWeb(
  buffer: ArrayBuffer,
  quality: 'low' | 'medium' | 'high' = 'medium'
): ArrayBuffer {
  // For MVP, return buffer unchanged
  // Real implementation would compress audio based on quality setting
  console.log(`Audio compression requested: quality=${quality}`);
  return buffer;
}

/**
 * Merge multiple audio buffers
 */
export function mergeAudioBuffers(buffers: ArrayBuffer[]): ArrayBuffer {
  if (buffers.length === 0) {
    return new ArrayBuffer(0);
  }
  
  if (buffers.length === 1) {
    return buffers[0];
  }
  
  // Calculate total size
  const totalSize = buffers.reduce((sum, buffer) => sum + buffer.byteLength, 0);
  
  // Merge buffers
  const result = new Uint8Array(totalSize);
  let offset = 0;
  
  for (const buffer of buffers) {
    result.set(new Uint8Array(buffer), offset);
    offset += buffer.byteLength;
  }
  
  return result.buffer;
}

/**
 * Extract audio segments based on time ranges
 */
export function extractAudioSegment(
  buffer: ArrayBuffer,
  startMs: number,
  endMs: number,
  sampleRate: number = 44100
): ArrayBuffer {
  const bytesPerSecond = sampleRate * 2; // 16-bit samples
  const startByte = Math.floor((startMs / 1000) * bytesPerSecond);
  const endByte = Math.floor((endMs / 1000) * bytesPerSecond);
  
  const segmentLength = Math.min(endByte - startByte, buffer.byteLength - startByte);
  
  if (segmentLength <= 0 || startByte >= buffer.byteLength) {
    return new ArrayBuffer(0);
  }
  
  return buffer.slice(startByte, startByte + segmentLength);
}

/**
 * Create audio buffer with Web Audio API compatibility
 */
export function createWebAudioBuffer(
  buffer: ArrayBuffer,
  sampleRate: number = 44100,
  channels: number = 1
): {
  buffer: ArrayBuffer;
  metadata: AudioMetadata;
  webAudioConfig: {
    sampleRate: number;
    channels: number;
    length: number;
  };
} {
  const length = buffer.byteLength / (2 * channels); // 16-bit samples
  
  return {
    buffer,
    metadata: {
      format: 'pcm',
      sampleRate,
      bitRate: sampleRate * 16 * channels / 1000, // kbps
      channels,
      duration: length / sampleRate,
      size: buffer.byteLength
    },
    webAudioConfig: {
      sampleRate,
      channels,
      length
    }
  };
}

/**
 * Performance monitoring for audio processing
 */
export class AudioProcessingMonitor {
  private startTime: number = 0;
  private metrics: Record<string, number> = {};
  
  start(operation: string): void {
    this.startTime = performance.now();
    this.metrics[`${operation}_start`] = this.startTime;
  }
  
  end(operation: string): number {
    const endTime = performance.now();
    const duration = endTime - this.startTime;
    this.metrics[`${operation}_duration`] = duration;
    this.metrics[`${operation}_end`] = endTime;
    return duration;
  }
  
  getMetrics(): Record<string, number> {
    return { ...this.metrics };
  }
  
  reset(): void {
    this.metrics = {};
    this.startTime = 0;
  }
}