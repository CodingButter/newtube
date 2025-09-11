import { 
  ElevenLabsConfig, 
  VoiceConfig, 
  Voice, 
  VoiceError, 
  FEMALE_VOICES 
} from '../types/voice.types';

/**
 * ElevenLabs API utility functions and configurations
 */

export const ELEVENLABS_API_BASE = 'https://api.elevenlabs.io/v1';

export const DEFAULT_CONFIG: ElevenLabsConfig = {
  apiKey: process.env.ELEVENLABS_API_KEY || '',
  voiceId: FEMALE_VOICES.rachel.id,
  modelId: 'eleven_monolingual_v1',
  voiceSettings: {
    stability: 0.5,
    similarityBoost: 0.5,
    style: 0.3,
    useSpeakerBoost: true
  }
};

export const MODEL_CONFIGS = {
  eleven_monolingual_v1: {
    name: 'Eleven Monolingual v1',
    description: 'English only, fastest and most reliable',
    languages: ['en'],
    maxCharacters: 5000,
    recommended: true
  },
  eleven_multilingual_v2: {
    name: 'Eleven Multilingual v2',
    description: 'Supports multiple languages',
    languages: ['en', 'es', 'fr', 'de', 'it', 'pl', 'pt', 'hi'],
    maxCharacters: 2500,
    recommended: false
  },
  eleven_multilingual_v1: {
    name: 'Eleven Multilingual v1',
    description: 'Legacy multilingual model',
    languages: ['en', 'es', 'fr', 'de', 'it', 'pl', 'pt'],
    maxCharacters: 2500,
    recommended: false
  },
  eleven_english_v1: {
    name: 'Eleven English v1',
    description: 'Legacy English model',
    languages: ['en'],
    maxCharacters: 5000,
    recommended: false
  }
} as const;

/**
 * Rate limiting configuration for ElevenLabs API
 */
export const RATE_LIMITS = {
  defaultRpm: 20, // requests per minute
  maxConcurrentRequests: 5,
  retryAttempts: 3,
  retryDelayMs: 1000,
  timeoutMs: 30000
};

/**
 * Audio quality presets
 */
export const QUALITY_PRESETS = {
  high: {
    stability: 0.7,
    similarityBoost: 0.3,
    style: 0.2,
    useSpeakerBoost: false,
    description: 'High quality, more stable'
  },
  balanced: {
    stability: 0.5,
    similarityBoost: 0.5,
    style: 0.3,
    useSpeakerBoost: true,
    description: 'Balanced quality and expressiveness'
  },
  expressive: {
    stability: 0.3,
    similarityBoost: 0.7,
    style: 0.5,
    useSpeakerBoost: true,
    description: 'More expressive, less stable'
  }
} as const;

/**
 * Validate ElevenLabs configuration
 */
export function validateConfig(config: Partial<ElevenLabsConfig>): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check API key
  if (!config.apiKey || config.apiKey.trim().length === 0) {
    errors.push('API key is required');
  } else if (!config.apiKey.startsWith('sk-')) {
    warnings.push('API key format appears invalid (should start with sk-)');
  }

  // Check voice ID
  if (config.voiceId && !isValidVoiceId(config.voiceId)) {
    warnings.push(`Voice ID "${config.voiceId}" is not in recommended list`);
  }

  // Check model ID
  if (config.modelId && !Object.keys(MODEL_CONFIGS).includes(config.modelId)) {
    errors.push(`Invalid model ID: ${config.modelId}`);
  }

  // Check voice settings
  if (config.voiceSettings) {
    const { stability, similarityBoost, style, useSpeakerBoost } = config.voiceSettings;
    
    if (stability !== undefined && (stability < 0 || stability > 1)) {
      errors.push('Stability must be between 0 and 1');
    }
    
    if (similarityBoost !== undefined && (similarityBoost < 0 || similarityBoost > 1)) {
      errors.push('Similarity boost must be between 0 and 1');
    }
    
    if (style !== undefined && (style < 0 || style > 1)) {
      errors.push('Style must be between 0 and 1');
    }
    
    if (useSpeakerBoost !== undefined && typeof useSpeakerBoost !== 'boolean') {
      errors.push('Use speaker boost must be a boolean');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Check if voice ID is in our recommended list
 */
export function isValidVoiceId(voiceId: string): boolean {
  return Object.values(FEMALE_VOICES).some(voice => voice.id === voiceId);
}

/**
 * Get recommended voice settings for a specific voice
 */
export function getRecommendedSettings(voiceId: string): VoiceConfig | null {
  const femaleVoice = Object.values(FEMALE_VOICES).find(voice => voice.id === voiceId);
  
  if (!femaleVoice) {
    return null;
  }

  return {
    voiceId,
    ...femaleVoice.defaultSettings,
    modelId: DEFAULT_CONFIG.modelId
  };
}

/**
 * Calculate estimated cost for text-to-speech
 */
export function estimateCost(text: string, modelId: string = 'eleven_monolingual_v1'): {
  characters: number;
  estimatedCostUSD: number;
  tier: 'free' | 'starter' | 'creator' | 'pro' | 'scale';
} {
  const characters = text.length;
  
  // Rough cost estimates (as of 2024, may vary)
  const costs = {
    free: 0, // 10,000 chars/month free
    starter: 0.30 / 1000, // $0.30 per 1K chars
    creator: 0.22 / 1000, // $0.22 per 1K chars  
    pro: 0.18 / 1000, // $0.18 per 1K chars
    scale: 0.15 / 1000 // $0.15 per 1K chars (custom pricing)
  };

  // Determine likely tier based on usage (simplified)
  let tier: keyof typeof costs = 'starter';
  if (characters > 100000) tier = 'creator';
  if (characters > 500000) tier = 'pro';
  if (characters > 2000000) tier = 'scale';

  return {
    characters,
    estimatedCostUSD: characters * costs[tier],
    tier
  };
}

/**
 * Create request headers for ElevenLabs API
 */
export function createHeaders(apiKey: string, contentType: string = 'application/json'): HeadersInit {
  return {
    'Accept': 'audio/mpeg',
    'Content-Type': contentType,
    'xi-api-key': apiKey,
    'User-Agent': 'NEWTUBE/1.0'
  };
}

/**
 * Create API URL for specific endpoint
 */
export function createApiUrl(endpoint: string, params?: Record<string, string>): string {
  let url = `${ELEVENLABS_API_BASE}${endpoint}`;
  
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }
  
  return url;
}

/**
 * Parse ElevenLabs API error response
 */
export async function parseErrorResponse(response: Response): Promise<VoiceError> {
  let errorData: any = {};
  
  try {
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      errorData = await response.json();
    } else {
      errorData = { message: await response.text() };
    }
  } catch {
    errorData = { message: `HTTP ${response.status} ${response.statusText}` };
  }

  // Map common ElevenLabs error codes
  const errorCode = getErrorCode(response.status, errorData);
  const retryable = isRetryableError(response.status);

  return {
    code: errorCode,
    message: getErrorMessage(errorData),
    details: errorData,
    retryable
  };
}

/**
 * Get error code from response
 */
function getErrorCode(status: number, errorData: any): string {
  if (errorData?.code) {
    return `ELEVENLABS_${errorData.code}`;
  }

  switch (status) {
    case 400:
      return 'ELEVENLABS_BAD_REQUEST';
    case 401:
      return 'ELEVENLABS_UNAUTHORIZED';
    case 402:
      return 'ELEVENLABS_QUOTA_EXCEEDED';
    case 403:
      return 'ELEVENLABS_FORBIDDEN';
    case 404:
      return 'ELEVENLABS_NOT_FOUND';
    case 422:
      return 'ELEVENLABS_VALIDATION_ERROR';
    case 429:
      return 'ELEVENLABS_RATE_LIMITED';
    case 500:
      return 'ELEVENLABS_SERVER_ERROR';
    case 502:
      return 'ELEVENLABS_BAD_GATEWAY';
    case 503:
      return 'ELEVENLABS_SERVICE_UNAVAILABLE';
    case 504:
      return 'ELEVENLABS_TIMEOUT';
    default:
      return `ELEVENLABS_HTTP_${status}`;
  }
}

/**
 * Get human-readable error message
 */
function getErrorMessage(errorData: any): string {
  if (errorData?.detail?.message) {
    return errorData.detail.message;
  }
  
  if (errorData?.message) {
    return errorData.message;
  }
  
  if (errorData?.error) {
    return errorData.error;
  }
  
  return 'Unknown ElevenLabs API error';
}

/**
 * Check if error is retryable
 */
function isRetryableError(status: number): boolean {
  return status >= 500 || status === 429;
}

/**
 * Implement retry logic with exponential backoff
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxAttempts: number = RATE_LIMITS.retryAttempts,
  baseDelayMs: number = RATE_LIMITS.retryDelayMs
): Promise<T> {
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      // Don't retry if error is not retryable
      if (error.retryable === false) {
        throw error;
      }
      
      // Don't delay after last attempt
      if (attempt < maxAttempts) {
        const delayMs = baseDelayMs * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }
  
  throw lastError;
}

/**
 * Create abort signal with timeout
 */
export function createTimeoutSignal(timeoutMs: number = RATE_LIMITS.timeoutMs): AbortSignal {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeoutMs);
  return controller.signal;
}

/**
 * Text preprocessing for better TTS results
 */
export function preprocessText(text: string): string {
  return text
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim()
    // Handle common abbreviations
    .replace(/\bDr\./g, 'Doctor')
    .replace(/\bMr\./g, 'Mister')
    .replace(/\bMrs\./g, 'Missus')
    .replace(/\bMs\./g, 'Miss')
    // Handle numbers
    .replace(/\b(\d{1,3}),(\d{3})\b/g, '$1$2') // Remove commas from numbers
    // Handle URLs (basic)
    .replace(/https?:\/\/[^\s]+/g, 'link')
    // Handle email addresses
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, 'email address')
    // Ensure proper sentence endings
    .replace(/([.!?])([A-Z])/g, '$1 $2');
}

/**
 * Validate text length for model
 */
export function validateTextLength(text: string, modelId: string): {
  isValid: boolean;
  length: number;
  maxLength: number;
  error?: string;
} {
  const modelConfig = MODEL_CONFIGS[modelId as keyof typeof MODEL_CONFIGS];
  const maxLength = modelConfig?.maxCharacters || 5000;
  const length = text.length;
  
  return {
    isValid: length <= maxLength,
    length,
    maxLength,
    error: length > maxLength ? `Text too long: ${length} characters (max: ${maxLength})` : undefined
  };
}

/**
 * Format usage statistics
 */
export function formatUsageStats(stats: any): {
  formatted: string;
  details: Record<string, any>;
  warnings: string[];
} {
  const warnings: string[] = [];
  
  if (!stats) {
    return {
      formatted: 'Usage statistics unavailable',
      details: {},
      warnings: ['Could not fetch usage statistics']
    };
  }

  // Check quota usage
  if (stats.character_count && stats.character_limit) {
    const usagePercent = (stats.character_count / stats.character_limit) * 100;
    if (usagePercent > 80) {
      warnings.push(`High quota usage: ${usagePercent.toFixed(1)}%`);
    }
  }

  return {
    formatted: `Characters used: ${stats.character_count || 0} / ${stats.character_limit || 'unlimited'}`,
    details: stats,
    warnings
  };
}