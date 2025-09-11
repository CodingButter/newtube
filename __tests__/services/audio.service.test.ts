import { describe, it, expect, beforeEach } from '@jest/globals';
import { AudioService } from '../../src/services/audio.service';
import { AudioChunk } from '../../src/types/voice.types';

describe('AudioService', () => {
  let audioService: AudioService;

  beforeEach(() => {
    audioService = new AudioService();
  });

  describe('bufferToChunks', () => {
    it('should split audio buffer into chunks', async () => {
      const audioBuffer = new ArrayBuffer(16384); // 16KB
      const messageId = 'test-message-123';
      const chunkSize = 4096; // 4KB

      const chunks: AudioChunk[] = [];
      for await (const chunk of audioService.bufferToChunks(audioBuffer, messageId, chunkSize)) {
        chunks.push(chunk);
      }

      expect(chunks).toHaveLength(4); // 16KB / 4KB = 4 chunks
      expect(chunks[0].sequence).toBe(0);
      expect(chunks[0].isLast).toBe(false);
      expect(chunks[3].sequence).toBe(3);
      expect(chunks[3].isLast).toBe(true);

      chunks.forEach(chunk => {
        expect(chunk.id).toContain(messageId);
        expect(chunk.format).toBe('mp3');
        expect(chunk.timestamp).toBeLessThanOrEqual(Date.now());
        expect(chunk.data).toBeInstanceOf(ArrayBuffer);
      });
    });

    it('should handle small buffers', async () => {
      const audioBuffer = new ArrayBuffer(1024); // 1KB
      const messageId = 'small-test';
      const chunkSize = 4096; // Larger than buffer

      const chunks: AudioChunk[] = [];
      for await (const chunk of audioService.bufferToChunks(audioBuffer, messageId, chunkSize)) {
        chunks.push(chunk);
      }

      expect(chunks).toHaveLength(1);
      expect(chunks[0].isLast).toBe(true);
      expect(chunks[0].data.byteLength).toBe(1024);
    });

    it('should handle empty buffers', async () => {
      const audioBuffer = new ArrayBuffer(0);
      const messageId = 'empty-test';

      const chunks: AudioChunk[] = [];
      for await (const chunk of audioService.bufferToChunks(audioBuffer, messageId)) {
        chunks.push(chunk);
      }

      expect(chunks).toHaveLength(1);
      expect(chunks[0].isLast).toBe(true);
      expect(chunks[0].data.byteLength).toBe(0);
    });
  });

  describe('chunksToBuffer', () => {
    it('should reconstruct buffer from chunks', async () => {
      const originalData = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
      const chunks: AudioChunk[] = [
        {
          id: 'test-0',
          sequence: 0,
          data: originalData.slice(0, 4).buffer,
          format: 'mp3',
          isLast: false,
          timestamp: Date.now()
        },
        {
          id: 'test-1',
          sequence: 1,
          data: originalData.slice(4, 8).buffer,
          format: 'mp3',
          isLast: true,
          timestamp: Date.now()
        }
      ];

      const result = await audioService.chunksToBuffer(chunks);

      expect(result.data.byteLength).toBe(8);
      expect(new Uint8Array(result.data)).toEqual(originalData);
      expect(result.format).toBe('mp3');
      expect(result.duration).toBeGreaterThan(0);
      expect(result.sampleRate).toBe(44100);
    });

    it('should handle out-of-order chunks', async () => {
      const originalData = new Uint8Array([1, 2, 3, 4, 5, 6]);
      const chunks: AudioChunk[] = [
        {
          id: 'test-2',
          sequence: 2,
          data: originalData.slice(4, 6).buffer,
          format: 'mp3',
          isLast: true,
          timestamp: Date.now()
        },
        {
          id: 'test-0',
          sequence: 0,
          data: originalData.slice(0, 2).buffer,
          format: 'mp3',
          isLast: false,
          timestamp: Date.now()
        },
        {
          id: 'test-1',
          sequence: 1,
          data: originalData.slice(2, 4).buffer,
          format: 'mp3',
          isLast: false,
          timestamp: Date.now()
        }
      ];

      const result = await audioService.chunksToBuffer(chunks);

      expect(new Uint8Array(result.data)).toEqual(originalData);
    });

    it('should handle empty chunks array', async () => {
      const result = await audioService.chunksToBuffer([]);

      expect(result.data.byteLength).toBe(0);
      expect(result.format).toBe('mp3');
    });
  });

  describe('getAudioMetadata', () => {
    it('should extract metadata from audio buffer', async () => {
      const audioBuffer = new ArrayBuffer(10240); // 10KB
      const format = 'mp3';

      const metadata = await audioService.getAudioMetadata(audioBuffer, format);

      expect(metadata).toMatchObject({
        format: 'mp3',
        sampleRate: 44100,
        bitRate: expect.any(Number),
        channels: 1,
        duration: expect.any(Number),
        size: 10240
      });

      expect(metadata.duration).toBeGreaterThan(0);
      expect(metadata.bitRate).toBeGreaterThan(0);
    });

    it('should handle different audio formats', async () => {
      const audioBuffer = new ArrayBuffer(5120);

      const mp3Metadata = await audioService.getAudioMetadata(audioBuffer, 'mp3');
      const wavMetadata = await audioService.getAudioMetadata(audioBuffer, 'wav');

      expect(mp3Metadata.format).toBe('mp3');
      expect(wavMetadata.format).toBe('wav');
      expect(wavMetadata.bitRate).toBeGreaterThan(mp3Metadata.bitRate); // WAV has higher bitrate
    });
  });

  describe('validateAudioBuffer', () => {
    it('should validate correct audio buffer', () => {
      // Create a mock MP3 buffer with valid header
      const audioBuffer = new ArrayBuffer(2048);
      const view = new Uint8Array(audioBuffer);
      view[0] = 0xFF; // MP3 sync word
      view[1] = 0xFB; // MP3 sync word

      const validation = audioService.validateAudioBuffer(audioBuffer, 'mp3');

      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should detect empty buffers', () => {
      const audioBuffer = new ArrayBuffer(0);

      const validation = audioService.validateAudioBuffer(audioBuffer, 'mp3');

      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Audio buffer is empty');
    });

    it('should detect small buffers', () => {
      const audioBuffer = new ArrayBuffer(512); // Less than 1KB

      const validation = audioService.validateAudioBuffer(audioBuffer, 'mp3');

      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Audio buffer too small (< 1KB)');
    });

    it('should validate MP3 with ID3 tag', () => {
      const audioBuffer = new ArrayBuffer(2048);
      const view = new Uint8Array(audioBuffer);
      view[0] = 0x49; // 'I'
      view[1] = 0x44; // 'D'
      view[2] = 0x33; // '3'

      const validation = audioService.validateAudioBuffer(audioBuffer, 'mp3');

      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should detect invalid MP3 format', () => {
      const audioBuffer = new ArrayBuffer(2048);
      const view = new Uint8Array(audioBuffer);
      view[0] = 0x00; // Invalid MP3 header
      view[1] = 0x00;

      const validation = audioService.validateAudioBuffer(audioBuffer, 'mp3');

      expect(validation.isValid).toBe(false);
      expect(validation.errors).toEqual(
        expect.arrayContaining([
          expect.stringContaining('Invalid MP3 format')
        ])
      );
    });
  });

  describe('calculateOptimalChunkSize', () => {
    it('should calculate chunk size based on network speed', () => {
      const slowChunkSize = audioService.calculateOptimalChunkSize('slow');
      const mediumChunkSize = audioService.calculateOptimalChunkSize('medium');
      const fastChunkSize = audioService.calculateOptimalChunkSize('fast');

      expect(slowChunkSize).toBeLessThan(mediumChunkSize);
      expect(mediumChunkSize).toBeLessThan(fastChunkSize);
    });

    it('should adjust chunk size for latency requirements', () => {
      const lowLatencySize = audioService.calculateOptimalChunkSize('medium', 'low');
      const highLatencySize = audioService.calculateOptimalChunkSize('medium', 'high');

      expect(lowLatencySize).toBeLessThan(highLatencySize);
    });

    it('should provide reasonable defaults', () => {
      const defaultSize = audioService.calculateOptimalChunkSize();

      expect(defaultSize).toBeGreaterThan(0);
      expect(defaultSize).toBeLessThanOrEqual(64 * 1024); // Max chunk size
    });
  });

  describe('createAudioStream', () => {
    it('should create readable stream from buffer', () => {
      const audioBuffer = new ArrayBuffer(8192);
      const chunkSize = 2048;

      const stream = audioService.createAudioStream(audioBuffer, chunkSize);

      expect(stream).toBeDefined();
      expect(stream.readable).toBe(true);
    });

    it('should handle empty buffers', () => {
      const audioBuffer = new ArrayBuffer(0);

      const stream = audioService.createAudioStream(audioBuffer);

      expect(stream).toBeDefined();
      expect(stream.readable).toBe(true);
    });
  });

  describe('createProcessingTransform', () => {
    it('should create transform stream', () => {
      const transform = audioService.createProcessingTransform();

      expect(transform).toBeDefined();
      expect(transform.writable).toBe(true);
      expect(transform.readable).toBe(true);
    });

    it('should handle compression options', () => {
      const transform = audioService.createProcessingTransform({
        compression: 'high'
      });

      expect(transform).toBeDefined();
    });
  });

  describe('createPerformanceMonitor', () => {
    it('should track audio processing performance', () => {
      const monitor = audioService.createPerformanceMonitor();

      monitor.recordChunk({
        id: 'test-chunk',
        sequence: 0,
        data: new ArrayBuffer(1024),
        format: 'mp3',
        isLast: false,
        timestamp: Date.now()
      });

      const stats = monitor.getStats();

      expect(stats).toMatchObject({
        bytesTransferred: 1024,
        chunksProcessed: 1,
        startTime: expect.any(Number),
        lastChunkTime: expect.any(Number),
        averageChunkInterval: expect.any(Number)
      });

      expect(stats.throughputKbps).toBeGreaterThan(0);
    });

    it('should reset performance metrics', () => {
      const monitor = audioService.createPerformanceMonitor();

      monitor.recordChunk({
        id: 'test-chunk',
        sequence: 0,
        data: new ArrayBuffer(1024),
        format: 'mp3',
        isLast: false,
        timestamp: Date.now()
      });

      monitor.reset();

      const stats = monitor.getStats();

      expect(stats.bytesTransferred).toBe(0);
      expect(stats.chunksProcessed).toBe(0);
    });

    it('should calculate throughput correctly', () => {
      const monitor = audioService.createPerformanceMonitor();

      // Record multiple chunks
      for (let i = 0; i < 5; i++) {
        monitor.recordChunk({
          id: `chunk-${i}`,
          sequence: i,
          data: new ArrayBuffer(1024),
          format: 'mp3',
          isLast: i === 4,
          timestamp: Date.now()
        });
      }

      const stats = monitor.getStats();

      expect(stats.bytesTransferred).toBe(5 * 1024);
      expect(stats.chunksProcessed).toBe(5);
      expect(stats.throughputKbps).toBeGreaterThan(0);
      expect(stats.averageChunkIntervalMs).toBeGreaterThan(0);
    });
  });

  describe('audio processing operations', () => {
    it('should handle audio compression', async () => {
      const audioBuffer = new ArrayBuffer(4096);

      const compressedBuffer = await audioService.compressAudio(audioBuffer, {
        quality: 'medium'
      });

      expect(compressedBuffer).toBeInstanceOf(ArrayBuffer);
      // For MVP, should return original buffer
      expect(compressedBuffer).toBe(audioBuffer);
    });

    it('should handle audio processing options', async () => {
      const audioBuffer = new ArrayBuffer(4096);

      const processedBuffer = await audioService.processAudio(audioBuffer, {
        normalize: true,
        fadeIn: 500,
        fadeOut: 1000,
        maxDuration: 30
      });

      expect(processedBuffer).toBeInstanceOf(ArrayBuffer);
    });

    it('should handle format conversion', async () => {
      const audioBuffer = new ArrayBuffer(4096);

      const convertedBuffer = await audioService.convertFormat(
        audioBuffer,
        'mp3',
        'wav'
      );

      expect(convertedBuffer).toBeInstanceOf(ArrayBuffer);
      // For MVP, should return original buffer
      expect(convertedBuffer).toBe(audioBuffer);
    });

    it('should reject unsupported formats', async () => {
      const audioBuffer = new ArrayBuffer(4096);

      await expect(
        audioService.convertFormat(audioBuffer, 'mp3', 'unsupported')
      ).rejects.toThrow('Unsupported target format: unsupported');
    });
  });
});