import { NextRequest, NextResponse } from 'next/server';
import { getVoiceService } from '../../../../services/voice.service';
import { FEMALE_VOICES } from '../../../../types/voice.types';

/**
 * GET /api/voice/voices - Get available voices with enhanced metadata
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const recommended = url.searchParams.get('recommended') === 'true';

    const voiceService = getVoiceService();
    const voices = await voiceService.getAvailableVoices();
    
    // Get usage statistics
    let usageStats;
    try {
      usageStats = await voiceService.getUsageStats();
    } catch (error) {
      console.warn('Could not fetch usage stats:', error.message);
      usageStats = null;
    }

    // Get health status
    const healthStatus = await voiceService.healthCheck();

    let filteredVoices = voices.all;

    // Apply filters
    if (recommended) {
      filteredVoices = voices.recommended;
    }

    if (category) {
      filteredVoices = filteredVoices.filter(voice => {
        const femaleVoice = Object.values(FEMALE_VOICES).find(fv => fv.id === voice.voice_id);
        return femaleVoice?.category === category;
      });
    }

    // Enhance voice data with additional metadata
    const enhancedVoices = filteredVoices.map(voice => {
      const femaleVoice = Object.values(FEMALE_VOICES).find(fv => fv.id === voice.voice_id);
      
      return {
        ...voice,
        category: femaleVoice?.category || 'general',
        recommended: femaleVoice?.recommended || false,
        defaultSettings: femaleVoice?.defaultSettings || {
          stability: 0.5,
          similarityBoost: 0.5,
          style: 0.3,
          useSpeakerBoost: false
        },
        description: femaleVoice?.description || voice.description,
        emotionalRange: femaleVoice ? [
          'happy', 'curious', 'helpful', 'excited', 'neutral'
        ] : ['neutral'],
        sampleText: femaleVoice ? 
          `Hi there! I'm ${voice.name}, and I'm excited to help you with your NEWTUBE experience.` :
          `Hello, I'm ${voice.name}.`
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        voices: enhancedVoices,
        statistics: {
          total: voices.all.length,
          recommended: voices.recommended.length,
          filtered: enhancedVoices.length,
          categories: Object.values(FEMALE_VOICES).reduce((acc, voice) => {
            acc[voice.category] = (acc[voice.category] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)
        },
        usageStats,
        healthStatus,
        featuredVoices: Object.values(FEMALE_VOICES),
        supportedEmotions: [
          'happy', 'curious', 'helpful', 'excited', 
          'concerned', 'neutral', 'enthusiastic', 'calm'
        ]
      }
    });

  } catch (error) {
    console.error('Error fetching voices:', error);
    
    return NextResponse.json({
      success: false,
      error: {
        code: 'VOICES_FETCH_FAILED',
        message: 'Failed to fetch available voices',
        details: error.message,
        fallback: {
          type: 'browser-voices',
          message: 'Use browser speech synthesis voices as fallback'
        }
      }
    }, { status: 500 });
  }
}

/**
 * POST /api/voice/voices - Test voice configuration
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { voiceId, settings, sampleText } = body;

    if (!voiceId) {
      return NextResponse.json({
        error: 'Voice ID is required'
      }, { status: 400 });
    }

    const voiceService = getVoiceService();
    
    // Use provided sample text or default
    const testText = sampleText || 
      `Hello! This is a voice test for ${voiceId}. I'm demonstrating different emotions: ` +
      `I'm excited to help you! I'm curious about your project. Let me explain this calmly.`;

    // Test the voice with provided settings
    const audioResult = await voiceService.testVoice(voiceId, testText, settings);

    return NextResponse.json({
      success: true,
      data: {
        voiceId,
        testText,
        settings: settings || 'default',
        audio: {
          data: Buffer.from(audioResult.data).toString('base64'),
          format: audioResult.format,
          duration: audioResult.duration,
          sampleRate: audioResult.sampleRate,
          mimeType: `audio/${audioResult.format}`
        },
        metadata: {
          size: audioResult.data.byteLength || audioResult.data.length,
          estimatedCost: 'Varies by plan',
          processingTime: Date.now() // Would calculate actual processing time
        }
      }
    });

  } catch (error) {
    console.error('Voice test error:', error);
    
    return NextResponse.json({
      success: false,
      error: {
        code: 'VOICE_TEST_FAILED',
        message: 'Voice test failed',
        details: error.message,
        retryable: error.retryable || false
      }
    }, { status: error.retryable ? 503 : 500 });
  }
}