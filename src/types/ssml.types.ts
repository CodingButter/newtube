/**
 * SSML-specific types for emotional text-to-speech generation
 */

export interface SSMLElement {
  tag: string;
  attributes?: Record<string, string>;
  content: string | SSMLElement[];
  emotion?: string;
}

export interface SSMLProsody {
  rate?: string; // 'x-slow' | 'slow' | 'medium' | 'fast' | 'x-fast' | percentage
  pitch?: string; // 'x-low' | 'low' | 'medium' | 'high' | 'x-high' | percentage
  volume?: string; // 'silent' | 'x-soft' | 'soft' | 'medium' | 'loud' | 'x-loud' | dB
}

export interface SSMLBreak {
  time?: string; // '100ms', '2s', etc.
  strength?: 'none' | 'x-weak' | 'weak' | 'medium' | 'strong' | 'x-strong';
}

export interface SSMLEmphasis {
  level?: 'strong' | 'moderate' | 'reduced';
}

export interface SSMLEmotion {
  name: string; // emotion name
  intensity?: 'low' | 'medium' | 'high';
}

export interface SSMLGenerationOptions {
  includeBreaks: boolean;
  includeProsody: boolean;
  includeEmphasis: boolean;
  includeEmotions: boolean;
  optimizeForVoice?: string; // voice ID for voice-specific optimizations
  naturalness?: 'high' | 'medium' | 'low'; // how natural vs. expressive
  performance?: 'quality' | 'speed'; // optimize for quality vs. speed
}

export interface SSMLTemplate {
  name: string;
  description: string;
  template: string;
  variables: string[];
  supportedEmotions: string[];
  voiceCompatibility: string[];
}

export interface SSMLValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
  estimatedDuration?: number; // seconds
  complexity?: 'low' | 'medium' | 'high';
}

export interface SSMLOptimization {
  originalSSML: string;
  optimizedSSML: string;
  optimizations: {
    type: 'prosody' | 'breaks' | 'emphasis' | 'structure';
    description: string;
    impact: 'low' | 'medium' | 'high';
  }[];
  performanceImprovement?: {
    sizeReduction?: number; // percentage
    processingSpeedUp?: number; // percentage
    qualityImpact?: 'positive' | 'neutral' | 'negative';
  };
}

export interface SSMLContext {
  conversationType: 'greeting' | 'explanation' | 'question' | 'instruction' | 'farewell';
  audience: 'professional' | 'casual' | 'technical' | 'general';
  urgency: 'low' | 'medium' | 'high';
  previousMessages?: string[];
  userPreferences?: {
    pace: 'slow' | 'normal' | 'fast';
    formality: 'formal' | 'neutral' | 'informal';
    expressiveness: 'minimal' | 'moderate' | 'high';
  };
}

export interface SSMLChunk {
  id: string;
  originalText: string;
  ssml: string;
  emotion: string;
  duration?: number; // estimated seconds
  priority: number; // 1-10, for streaming priority
  dependencies?: string[]; // chunk IDs this depends on
}

export interface SSMLStreamingConfig {
  chunkSize: number; // characters per chunk
  overlap: number; // characters of overlap between chunks
  priorityMode: 'sequential' | 'emotion-based' | 'importance-based';
  bufferSize: number; // number of chunks to buffer
}