// Voice and Audio types for NEWTUBE ElevenLabs TTS integration

export interface ElevenLabsConfig {
  apiKey: string;
  voiceId: string;
  modelId: 'eleven_monolingual_v1' | 'eleven_multilingual_v2' | 'eleven_multilingual_v1' | 'eleven_english_v1';
  voiceSettings: {
    stability: number;
    similarityBoost: number;
    style?: number;
    useSpeakerBoost?: boolean;
  };
}

export interface VoiceConfig {
  voiceId: string;
  stability: number;
  similarityBoost: number;
  style?: number;
  useSpeakerBoost?: boolean;
  modelId?: string;
}

export interface Voice {
  voice_id: string;
  name: string;
  category: string;
  description?: string;
  labels: {
    accent?: string;
    description?: string;
    age?: string;
    gender?: string;
    use_case?: string;
  };
  preview_url?: string;
  fine_tuning?: {
    is_allowed_to_fine_tune: boolean;
    language: string;
  };
}

export interface AudioChunk {
  id: string;
  sequence: number;
  data: Buffer | ArrayBuffer;
  format: 'mp3' | 'wav' | 'ogg' | 'aac';
  isLast: boolean;
  timestamp: number;
}

export interface AudioStream {
  chunks: AsyncIterableIterator<AudioChunk>;
  metadata: {
    voiceId: string;
    messageId: string;
    format: string;
    sampleRate: number;
    bitRate: number;
  };
}

export interface AudioBuffer {
  data: Buffer | ArrayBuffer;
  format: string;
  duration: number;
  sampleRate: number;
}

export interface EmotionType {
  type: 'happy' | 'curious' | 'helpful' | 'excited' | 'concerned' | 'neutral' | 'enthusiastic' | 'calm';
  intensity: number; // 0.0 to 1.0
}

export interface SSMLConfig {
  emotions: EmotionType[];
  rate?: 'x-slow' | 'slow' | 'medium' | 'fast' | 'x-fast';
  pitch?: 'x-low' | 'low' | 'medium' | 'high' | 'x-high';
  volume?: 'silent' | 'x-soft' | 'soft' | 'medium' | 'loud' | 'x-loud';
  pauseAfter?: number; // milliseconds
}

export interface VoiceResponse {
  audio: string; // Base64 encoded audio
  mimeType: string;
  duration?: number;
  voiceId: string;
  messageId?: string;
}

export interface StreamingVoiceResponse {
  messageId: string;
  streamUrl: string;
  format: string;
  estimatedDuration?: number;
}

export interface VoiceError {
  code: string;
  message: string;
  details?: any;
  retryable: boolean;
}

export interface VoiceSynthesisRequest {
  text: string;
  voiceId?: string;
  emotions?: EmotionType[];
  ssmlConfig?: SSMLConfig;
  format?: 'mp3' | 'wav' | 'ogg';
  streaming?: boolean;
  messageId?: string;
}

export interface VoiceTestRequest {
  voiceId: string;
  sampleText: string;
  voiceSettings?: VoiceConfig;
}

// Female voice configurations optimized for NEWTUBE
export const FEMALE_VOICES = {
  rachel: {
    id: "21m00Tcm4TlvDq8ikWAM",
    name: "Rachel",
    description: "Warm, friendly American voice",
    category: "conversational",
    recommended: true,
    defaultSettings: {
      stability: 0.5,
      similarityBoost: 0.5,
      style: 0.3,
      useSpeakerBoost: true
    }
  },
  bella: {
    id: "EXAVITQu4vr4xnSDxMaL",
    name: "Bella",
    description: "Young, energetic voice",
    category: "enthusiastic",
    recommended: true,
    defaultSettings: {
      stability: 0.4,
      similarityBoost: 0.6,
      style: 0.4,
      useSpeakerBoost: true
    }
  },
  elli: {
    id: "MF3mGyEYCl7XYWbV9V6O",
    name: "Elli",
    description: "Clear, professional voice",
    category: "professional",
    recommended: true,
    defaultSettings: {
      stability: 0.6,
      similarityBoost: 0.4,
      style: 0.2,
      useSpeakerBoost: false
    }
  },
  charlotte: {
    id: "XB0fDUnXU5powFXDhCwa",
    name: "Charlotte",
    description: "British, sophisticated voice",
    category: "sophisticated",
    recommended: true,
    defaultSettings: {
      stability: 0.7,
      similarityBoost: 0.3,
      style: 0.1,
      useSpeakerBoost: false
    }
  }
} as const;

// Emotion to voice parameter mapping
export const EMOTION_VOICE_MAPPING = {
  happy: {
    stability: 0.4,
    similarityBoost: 0.6,
    style: 0.4,
    rateModifier: 1.1,
    pitchModifier: 1.05
  },
  curious: {
    stability: 0.3,
    similarityBoost: 0.7,
    style: 0.5,
    rateModifier: 1.0,
    pitchModifier: 1.1
  },
  helpful: {
    stability: 0.6,
    similarityBoost: 0.4,
    style: 0.2,
    rateModifier: 1.0,
    pitchModifier: 1.0
  },
  excited: {
    stability: 0.2,
    similarityBoost: 0.8,
    style: 0.6,
    rateModifier: 1.2,
    pitchModifier: 1.15
  },
  concerned: {
    stability: 0.8,
    similarityBoost: 0.2,
    style: 0.1,
    rateModifier: 0.9,
    pitchModifier: 0.95
  },
  neutral: {
    stability: 0.5,
    similarityBoost: 0.5,
    style: 0.3,
    rateModifier: 1.0,
    pitchModifier: 1.0
  },
  enthusiastic: {
    stability: 0.3,
    similarityBoost: 0.7,
    style: 0.5,
    rateModifier: 1.15,
    pitchModifier: 1.1
  },
  calm: {
    stability: 0.8,
    similarityBoost: 0.3,
    style: 0.1,
    rateModifier: 0.95,
    pitchModifier: 0.98
  }
} as const;

export interface WebSocketMessage {
  type: 'audio_chunk' | 'audio_complete' | 'audio_error' | 'audio_start';
  messageId: string;
  data?: any;
  error?: VoiceError;
}

export interface AudioProcessingOptions {
  compression?: 'high' | 'medium' | 'low' | 'none';
  normalize?: boolean;
  fadeIn?: number; // milliseconds
  fadeOut?: number; // milliseconds
  maxDuration?: number; // seconds
}