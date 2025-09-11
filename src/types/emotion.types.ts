/**
 * Core emotion types for AI-powered TTS with SSML generation
 */

export type EmotionType = 
  | 'happy' 
  | 'excited' 
  | 'curious' 
  | 'helpful' 
  | 'calm' 
  | 'enthusiastic' 
  | 'confident'
  | 'surprised'
  | 'thoughtful'
  | 'encouraging';

export type SentimentType = 'positive' | 'neutral' | 'negative';

export interface EmotionAnalysis {
  primaryEmotion: EmotionType;
  secondaryEmotions: EmotionType[];
  confidence: number; // 0-1
  sentiment: SentimentType;
  intensity: 'low' | 'medium' | 'high';
  reasoning?: string;
}

export interface SentimentScore {
  score: number; // -1 to 1
  type: SentimentType;
  confidence: number; // 0-1
}

export interface EmotionalMarker {
  text: string;
  emotion: EmotionType;
  intensity: number; // 0-1
  startIndex: number;
  endIndex: number;
  reason: string;
}

export interface VoiceParameters {
  rate: string; // e.g., '1.1', '0.9'
  pitch: string; // e.g., '+10%', '-5%'
  volume: string; // e.g., '+5dB', 'medium'
  stability: number; // 0-1 for ElevenLabs
  similarityBoost: number; // 0-1 for ElevenLabs
  emphasis?: 'strong' | 'moderate' | 'reduced';
  pauseAfter?: string; // e.g., '200ms', '500ms'
  pauseBefore?: string;
}

export interface EmotionConfig {
  emotion: EmotionType;
  voiceParams: VoiceParameters;
  ssmlAttributes: {
    prosody?: {
      rate?: string;
      pitch?: string;
      volume?: string;
    };
    emphasis?: {
      level?: 'strong' | 'moderate' | 'reduced';
    };
    break?: {
      time?: string;
      strength?: 'none' | 'x-weak' | 'weak' | 'medium' | 'strong' | 'x-strong';
    };
  };
}

export interface ConversationEmotionalContext {
  userId?: string;
  sessionId: string;
  emotionalHistory: EmotionAnalysis[];
  currentMood: EmotionType;
  preferredStyle: 'professional' | 'friendly' | 'casual' | 'enthusiastic';
  adaptations: Record<string, any>;
  lastUpdate: Date;
}

export interface EmotionResponse {
  originalText: string;
  emotions: EmotionAnalysis;
  ssml: string;
  voiceParams: VoiceParameters;
  processingTime: number;
  metadata: {
    keyPhrases: string[];
    emotionalMarkers: EmotionalMarker[];
    contextFactors: string[];
  };
}

export interface EmotionMappingStrategy {
  textAnalysis: {
    keywordMatching: boolean;
    sentimentAnalysis: boolean;
    contextualAnalysis: boolean;
    grammarPatterns: boolean;
  };
  voiceMapping: {
    prosodyModulation: boolean;
    pauseInsertion: boolean;
    emphasisMarking: boolean;
    volumeControl: boolean;
  };
  adaptiveThresholds: {
    minConfidence: number;
    emotionBlending: boolean;
    contextualDamping: number;
  };
}