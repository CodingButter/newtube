import { NextRequest, NextResponse } from 'next/server';
import { getVoiceService } from '../../../../services/voice.service';
import { getSSMLService } from '../../../../services/ssml.service';
import { getAudioService } from '../../../../services/audio.service';
import { VoiceSynthesisRequest } from '../../../../types/voice.types';

/**
 * POST /api/voice/synthesize - Enhanced voice synthesis with emotional context
 */
export async function POST(request: NextRequest) {
  try {
    const body: VoiceSynthesisRequest = await request.json();
    const { 
      text, 
      voiceId, 
      emotions = [], 
      ssmlConfig, 
      format = 'mp3',
      messageId 
    } = body;

    // Validation
    if (!text || text.trim().length === 0) {
      return NextResponse.json({ 
        error: 'Text is required and cannot be empty' 
      }, { status: 400 });
    }

    if (text.length > 5000) {
      return NextResponse.json({ 
        error: 'Text too long (max 5000 characters)' 
      }, { status: 400 });
    }

    const voiceService = getVoiceService();
    const ssmlService = getSSMLService();
    const audioService = getAudioService();

    // Parse emotional context from text
    const emotionalAnalysis = ssmlService.analyzeEmotionalMarkers(text);
    const finalEmotions = emotions.length > 0 ? emotions : emotionalAnalysis.emotions;

    // Generate optimized SSML
    const ssml = ssmlService.generateSSML(text, finalEmotions, ssmlConfig);
    
    // Validate SSML
    const ssmlValidation = ssmlService.validateSSML(ssml);
    if (!ssmlValidation.isValid) {
      console.warn('SSML validation failed:', ssmlValidation.errors);
      // Continue with plain text if SSML is invalid
    }

    // Synthesize speech with emotional adjustments
    const voiceResponse = await voiceService.synthesizeSpeech(
      ssmlValidation.isValid ? ssml : text, 
      finalEmotions, 
      { voiceId }
    );

    // Process audio if format conversion needed
    let audioBuffer = Buffer.from(voiceResponse.audio, 'base64');
    
    if (format !== 'mp3') {
      try {
        audioBuffer = Buffer.from(
          await audioService.convertFormat(audioBuffer.buffer, 'mp3', format)
        );
      } catch (conversionError) {
        console.warn(`Format conversion failed: ${conversionError.message}, using MP3`);
      }
    }

    // Get audio metadata
    const metadata = await audioService.getAudioMetadata(audioBuffer.buffer, format);

    return NextResponse.json({
      success: true,
      data: {
        audio: audioBuffer.toString('base64'),
        mimeType: `audio/${format}`,
        messageId: voiceResponse.messageId,
        voiceId: voiceResponse.voiceId,
        emotions: finalEmotions,
        emotionalAnalysis: {
          confidence: emotionalAnalysis.confidence,
          segments: emotionalAnalysis.segments.length
        },
        ssml: ssmlValidation.isValid ? ssml : null,
        metadata: {
          duration: metadata.duration,
          size: metadata.size,
          format: metadata.format,
          sampleRate: metadata.sampleRate
        }
      }
    });

  } catch (error) {
    console.error('Voice synthesis error:', error);
    
    // Enhanced error response with fallback information
    const errorResponse = {
      success: false,
      error: {
        code: error.code || 'SYNTHESIS_FAILED',
        message: error.message || 'Voice synthesis failed',
        retryable: error.retryable || false,
        fallback: {
          type: 'browser-tts',
          message: 'Use browser text-to-speech as fallback'
        }
      }
    };

    const statusCode = error.retryable ? 503 : 500;
    return NextResponse.json(errorResponse, { status: statusCode });
  }
}

/**
 * GET /api/voice/synthesize - Get synthesis capabilities and configuration
 */
export async function GET() {
  try {
    const voiceService = getVoiceService();
    const healthStatus = await voiceService.healthCheck();

    return NextResponse.json({
      success: true,
      data: {
        healthStatus,
        capabilities: {
          supportedFormats: ['mp3', 'wav', 'ogg'],
          maxTextLength: 5000,
          supportedEmotions: [
            'happy', 'curious', 'helpful', 'excited', 
            'concerned', 'neutral', 'enthusiastic', 'calm'
          ],
          features: {
            emotionalSynthesis: true,
            ssmlSupport: true,
            formatConversion: true,
            realTimeStreaming: true
          }
        },
        limits: {
          dailyQuota: 'Depends on ElevenLabs plan',
          rateLimiting: '20 requests per minute',
          maxConcurrentStreams: 5
        }
      }
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: {
        code: 'SERVICE_UNAVAILABLE',
        message: 'Voice synthesis service is temporarily unavailable'
      }
    }, { status: 503 });
  }
}