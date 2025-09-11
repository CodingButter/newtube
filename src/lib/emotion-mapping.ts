/**
 * Emotion to voice parameter mapping for ElevenLabs TTS
 * Maps different emotional states to specific voice characteristics
 */

import { EmotionType, EmotionConfig, VoiceParameters } from '../types/emotion.types.js';

export const EMOTION_VOICE_MAPPING: Record<EmotionType, EmotionConfig> = {
  happy: {
    emotion: 'happy',
    voiceParams: {
      rate: '1.1',
      pitch: '+10%',
      volume: '+5dB',
      stability: 0.6,
      similarityBoost: 0.8,
      emphasis: 'moderate',
      pauseAfter: '200ms'
    },
    ssmlAttributes: {
      prosody: {
        rate: '110%',
        pitch: '+10%',
        volume: 'loud'
      },
      emphasis: {
        level: 'moderate'
      },
      break: {
        time: '200ms',
        strength: 'weak'
      }
    }
  },
  excited: {
    emotion: 'excited',
    voiceParams: {
      rate: '1.2',
      pitch: '+15%',
      volume: '+8dB',
      stability: 0.7,
      similarityBoost: 0.9,
      emphasis: 'strong',
      pauseAfter: '150ms'
    },
    ssmlAttributes: {
      prosody: {
        rate: '120%',
        pitch: '+15%',
        volume: 'x-loud'
      },
      emphasis: {
        level: 'strong'
      },
      break: {
        time: '150ms',
        strength: 'weak'
      }
    }
  },
  curious: {
    emotion: 'curious',
    voiceParams: {
      rate: '0.9',
      pitch: '+5%',
      volume: 'medium',
      stability: 0.5,
      similarityBoost: 0.7,
      emphasis: 'moderate',
      pauseAfter: '300ms'
    },
    ssmlAttributes: {
      prosody: {
        rate: '90%',
        pitch: '+5%',
        volume: 'medium'
      },
      emphasis: {
        level: 'moderate'
      },
      break: {
        time: '300ms',
        strength: 'medium'
      }
    }
  },
  helpful: {
    emotion: 'helpful',
    voiceParams: {
      rate: '1.0',
      pitch: 'medium',
      volume: 'medium',
      stability: 0.8,
      similarityBoost: 0.8,
      emphasis: 'moderate',
      pauseAfter: '250ms'
    },
    ssmlAttributes: {
      prosody: {
        rate: '100%',
        pitch: 'medium',
        volume: 'medium'
      },
      emphasis: {
        level: 'moderate'
      },
      break: {
        time: '250ms',
        strength: 'weak'
      }
    }
  },
  calm: {
    emotion: 'calm',
    voiceParams: {
      rate: '0.85',
      pitch: '-5%',
      volume: '-2dB',
      stability: 0.9,
      similarityBoost: 0.6,
      emphasis: 'reduced',
      pauseAfter: '400ms'
    },
    ssmlAttributes: {
      prosody: {
        rate: '85%',
        pitch: '-5%',
        volume: 'soft'
      },
      emphasis: {
        level: 'reduced'
      },
      break: {
        time: '400ms',
        strength: 'medium'
      }
    }
  },
  enthusiastic: {
    emotion: 'enthusiastic',
    voiceParams: {
      rate: '1.15',
      pitch: '+12%',
      volume: '+6dB',
      stability: 0.6,
      similarityBoost: 0.85,
      emphasis: 'strong',
      pauseAfter: '180ms'
    },
    ssmlAttributes: {
      prosody: {
        rate: '115%',
        pitch: '+12%',
        volume: 'loud'
      },
      emphasis: {
        level: 'strong'
      },
      break: {
        time: '180ms',
        strength: 'weak'
      }
    }
  },
  confident: {
    emotion: 'confident',
    voiceParams: {
      rate: '1.05',
      pitch: '+3%',
      volume: '+3dB',
      stability: 0.8,
      similarityBoost: 0.9,
      emphasis: 'moderate',
      pauseAfter: '200ms'
    },
    ssmlAttributes: {
      prosody: {
        rate: '105%',
        pitch: '+3%',
        volume: 'medium'
      },
      emphasis: {
        level: 'moderate'
      },
      break: {
        time: '200ms',
        strength: 'weak'
      }
    }
  },
  surprised: {
    emotion: 'surprised',
    voiceParams: {
      rate: '1.1',
      pitch: '+20%',
      volume: '+4dB',
      stability: 0.5,
      similarityBoost: 0.7,
      emphasis: 'strong',
      pauseAfter: '300ms'
    },
    ssmlAttributes: {
      prosody: {
        rate: '110%',
        pitch: '+20%',
        volume: 'loud'
      },
      emphasis: {
        level: 'strong'
      },
      break: {
        time: '300ms',
        strength: 'medium'
      }
    }
  },
  thoughtful: {
    emotion: 'thoughtful',
    voiceParams: {
      rate: '0.8',
      pitch: '-3%',
      volume: 'medium',
      stability: 0.9,
      similarityBoost: 0.6,
      emphasis: 'reduced',
      pauseAfter: '500ms'
    },
    ssmlAttributes: {
      prosody: {
        rate: '80%',
        pitch: '-3%',
        volume: 'medium'
      },
      emphasis: {
        level: 'reduced'
      },
      break: {
        time: '500ms',
        strength: 'strong'
      }
    }
  },
  encouraging: {
    emotion: 'encouraging',
    voiceParams: {
      rate: '1.0',
      pitch: '+8%',
      volume: '+4dB',
      stability: 0.7,
      similarityBoost: 0.85,
      emphasis: 'moderate',
      pauseAfter: '250ms'
    },
    ssmlAttributes: {
      prosody: {
        rate: '100%',
        pitch: '+8%',
        volume: 'loud'
      },
      emphasis: {
        level: 'moderate'
      },
      break: {
        time: '250ms',
        strength: 'weak'
      }
    }
  }
};

/**
 * Keywords and phrases that indicate specific emotions
 */
export const EMOTION_KEYWORDS: Record<EmotionType, string[]> = {
  happy: [
    'great', 'wonderful', 'awesome', 'fantastic', 'love', 'enjoy', 'delighted',
    'pleased', 'thrilled', 'amazing', 'brilliant', 'excellent', 'perfect',
    'smile', 'laugh', 'joy', 'cheerful', 'positive'
  ],
  excited: [
    'wow', 'incredible', 'unbelievable', 'amazing', 'spectacular', 'revolutionary',
    'breakthrough', 'extraordinary', 'phenomenal', 'outstanding', 'remarkable',
    'astonishing', 'mind-blowing', 'epic', 'super', 'ultra', 'mega'
  ],
  curious: [
    'interesting', 'how', 'why', 'what', 'when', 'where', 'tell me more',
    'I wonder', 'curious', 'explore', 'discover', 'learn', 'understand',
    'fascinating', 'intriguing', 'puzzling', 'mysterious'
  ],
  helpful: [
    'help', 'assist', 'support', 'guide', 'show you', 'let me', 'I can',
    'here to', 'happy to help', 'glad to', 'pleasure', 'service',
    'recommend', 'suggest', 'advise', 'tips', 'solution'
  ],
  calm: [
    'relax', 'peaceful', 'tranquil', 'serene', 'gentle', 'soft', 'quiet',
    'slow down', 'take time', 'breathe', 'rest', 'comfort', 'soothing',
    'no worries', 'it\'s okay', 'don\'t worry', 'easy', 'simple'
  ],
  enthusiastic: [
    'let\'s go', 'absolutely', 'definitely', 'certainly', 'for sure',
    'no doubt', 'without question', 'of course', 'right on', 'yes',
    'totally', 'completely', 'entirely', 'extremely', 'highly'
  ],
  confident: [
    'certain', 'sure', 'confident', 'positive', 'definite', 'clear',
    'obvious', 'evident', 'undoubtedly', 'absolutely', 'precisely',
    'exactly', 'specifically', 'indeed', 'truly', 'really'
  ],
  surprised: [
    'really', 'seriously', 'no way', 'oh my', 'wow', 'incredible',
    'unbelievable', 'shocking', 'unexpected', 'sudden', 'surprising',
    'astonishing', 'remarkable', 'extraordinary', 'unusual'
  ],
  thoughtful: [
    'hmm', 'let me think', 'consider', 'ponder', 'reflect', 'contemplate',
    'analyze', 'examine', 'evaluate', 'assess', 'review', 'study',
    'deep', 'complex', 'intricate', 'nuanced', 'sophisticated'
  ],
  encouraging: [
    'you can do it', 'keep going', 'don\'t give up', 'believe', 'trust',
    'have faith', 'stay strong', 'persevere', 'continue', 'try again',
    'almost there', 'getting close', 'making progress', 'doing well'
  ]
};

/**
 * Contextual patterns that indicate emotional state
 */
export const EMOTION_PATTERNS = {
  questions: {
    emotion: 'curious' as EmotionType,
    patterns: [/\?$/, /^(what|how|why|when|where|who)/i, /tell me about/i]
  },
  exclamations: {
    emotion: 'excited' as EmotionType,
    patterns: [/!$/, /^wow/i, /amazing/i, /incredible/i]
  },
  instructions: {
    emotion: 'helpful' as EmotionType,
    patterns: [/^(let me|I'll|I can)/i, /here's how/i, /follow these/i]
  },
  reassurance: {
    emotion: 'calm' as EmotionType,
    patterns: [/don't worry/i, /it's okay/i, /no problem/i, /easy/i]
  },
  agreement: {
    emotion: 'confident' as EmotionType,
    patterns: [/^(yes|absolutely|definitely|certainly)/i, /I agree/i, /exactly/i]
  }
};

/**
 * Get the most appropriate emotion for a given text
 */
export function getEmotionForText(text: string): EmotionType {
  const lowercaseText = text.toLowerCase();
  
  // Check patterns first (higher priority)
  for (const [, config] of Object.entries(EMOTION_PATTERNS)) {
    for (const pattern of config.patterns) {
      if (pattern.test(text)) {
        return config.emotion;
      }
    }
  }
  
  // Check keywords
  const emotionScores: Record<EmotionType, number> = {} as any;
  
  for (const [emotion, keywords] of Object.entries(EMOTION_KEYWORDS)) {
    emotionScores[emotion as EmotionType] = 0;
    
    for (const keyword of keywords) {
      if (lowercaseText.includes(keyword.toLowerCase())) {
        emotionScores[emotion as EmotionType]++;
      }
    }
  }
  
  // Find emotion with highest score
  let maxScore = 0;
  let bestEmotion: EmotionType = 'helpful'; // default
  
  for (const [emotion, score] of Object.entries(emotionScores)) {
    if (score > maxScore) {
      maxScore = score;
      bestEmotion = emotion as EmotionType;
    }
  }
  
  return bestEmotion;
}

/**
 * Blend multiple emotions for more nuanced expression
 */
export function blendEmotions(
  primary: EmotionType,
  secondary: EmotionType,
  ratio: number = 0.7
): VoiceParameters {
  const primaryConfig = EMOTION_VOICE_MAPPING[primary];
  const secondaryConfig = EMOTION_VOICE_MAPPING[secondary];
  
  // Blend numeric parameters
  const blendNumeric = (a: number, b: number) => a * ratio + b * (1 - ratio);
  
  // Parse rate strings like '1.1' to numbers
  const parseRate = (rate: string) => parseFloat(rate);
  
  // Parse pitch strings like '+10%' to numbers (percentage change)
  const parsePitch = (pitch: string) => {
    if (pitch === 'medium') return 0;
    if (pitch.includes('%')) {
      return parseFloat(pitch.replace('%', ''));
    }
    return 0;
  };
  
  // Parse volume strings
  const parseVolume = (volume: string) => {
    if (volume === 'medium') return 0;
    if (volume.includes('dB')) {
      return parseFloat(volume.replace('dB', ''));
    }
    return 0;
  };
  
  const blendedRate = blendNumeric(
    parseRate(primaryConfig.voiceParams.rate),
    parseRate(secondaryConfig.voiceParams.rate)
  );
  
  const blendedPitch = blendNumeric(
    parsePitch(primaryConfig.voiceParams.pitch),
    parsePitch(secondaryConfig.voiceParams.pitch)
  );
  
  const blendedVolume = blendNumeric(
    parseVolume(primaryConfig.voiceParams.volume),
    parseVolume(secondaryConfig.voiceParams.volume)
  );
  
  return {
    rate: blendedRate.toFixed(2),
    pitch: blendedPitch >= 0 ? `+${blendedPitch.toFixed(1)}%` : `${blendedPitch.toFixed(1)}%`,
    volume: blendedVolume >= 0 ? `+${blendedVolume.toFixed(1)}dB` : `${blendedVolume.toFixed(1)}dB`,
    stability: blendNumeric(
      primaryConfig.voiceParams.stability,
      secondaryConfig.voiceParams.stability
    ),
    similarityBoost: blendNumeric(
      primaryConfig.voiceParams.similarityBoost,
      secondaryConfig.voiceParams.similarityBoost
    ),
    emphasis: primaryConfig.voiceParams.emphasis, // Take primary emphasis
    pauseAfter: primaryConfig.voiceParams.pauseAfter // Take primary pause
  };
}