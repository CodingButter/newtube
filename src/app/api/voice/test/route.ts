import { NextRequest, NextResponse } from 'next/server';
import { getVoiceService } from '../../../../services/voice.service';
import { getSSMLService } from '../../../../services/ssml.service';
import { getAudioService } from '../../../../services/audio.service';
import { VoiceTestRequest, FEMALE_VOICES } from '../../../../types/voice.types';

/**
 * POST /api/voice/test - Test voice with sample text and settings
 */
export async function POST(request: NextRequest) {
  try {
    const body: VoiceTestRequest = await request.json();
    const { voiceId, sampleText, voiceSettings } = body;

    if (!voiceId) {
      return NextResponse.json({
        error: 'Voice ID is required'
      }, { status: 400 });
    }

    const voiceService = getVoiceService();
    const ssmlService = getSSMLService();
    const audioService = getAudioService();

    // Get voice information
    const femaleVoice = Object.values(FEMALE_VOICES).find(fv => fv.id === voiceId);
    const voiceName = femaleVoice?.name || voiceId;

    // Use provided sample text or create a comprehensive test
    const testText = sampleText || 
      `Hello! I'm ${voiceName}, your NEWTUBE voice assistant. ` +
      `I'm excited to demonstrate my capabilities! ` +
      `I can be helpful when explaining features, ` +
      `curious when asking questions, ` +
      `and calm when providing detailed information. ` +
      `How does this sound to you?`;

    // Analyze emotional content
    const emotionalAnalysis = ssmlService.analyzeEmotionalMarkers(testText);
    
    // Generate SSML for enhanced synthesis
    const ssml = ssmlService.generateSSML(testText, emotionalAnalysis.emotions);
    
    // Test the voice
    const audioResult = await voiceService.testVoice(voiceId, testText, voiceSettings);
    
    // Get audio metadata
    const metadata = await audioService.getAudioMetadata(audioResult.data, audioResult.format);

    // Validate audio quality
    const validation = audioService.validateAudioBuffer(audioResult.data, audioResult.format);

    return NextResponse.json({
      success: true,
      data: {
        test: {
          voiceId,
          voiceName,
          testText,
          ssml: ssml,
          settings: voiceSettings || femaleVoice?.defaultSettings || 'default'
        },
        audio: {
          data: Buffer.from(audioResult.data).toString('base64'),
          format: audioResult.format,
          mimeType: `audio/${audioResult.format}`,
          duration: audioResult.duration,
          sampleRate: audioResult.sampleRate
        },
        analysis: {
          emotions: emotionalAnalysis.emotions,
          confidence: emotionalAnalysis.confidence,
          segments: emotionalAnalysis.segments.length,
          textLength: testText.length,
          estimatedReadingTime: Math.ceil(testText.split(' ').length / 150 * 60) // seconds
        },
        metadata: {
          size: metadata.size,
          bitRate: metadata.bitRate,
          channels: metadata.channels,
          actualDuration: metadata.duration
        },
        validation: {
          isValid: validation.isValid,
          errors: validation.errors,
          quality: validation.isValid ? 'good' : 'poor'
        },
        performance: {
          processingTime: Date.now(), // Would calculate actual time
          estimatedCost: 'Varies by ElevenLabs plan',
          charactersUsed: testText.length
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
        retryable: error.retryable || false,
        fallback: {
          type: 'browser-tts',
          message: 'Try using browser text-to-speech for testing'
        }
      }
    }, { status: error.retryable ? 503 : 500 });
  }
}

/**
 * GET /api/voice/test - Get test configurations and sample texts
 */
export async function GET() {
  try {
    const voiceService = getVoiceService();
    const healthStatus = await voiceService.healthCheck();

    const sampleTexts = {
      short: "Hello! This is a quick voice test.",
      medium: "Hello! I'm your NEWTUBE voice assistant. I'm excited to help you explore amazing content!",
      long: "Welcome to NEWTUBE! I'm your AI voice assistant, and I'm absolutely thrilled to help you discover incredible videos from across the web. Whether you're looking for educational content, entertainment, or just browsing for inspiration, I can help you find exactly what you're looking for. I'm curious - what kind of content interests you most today?",
      emotional: "I'm so excited to help you today! This is absolutely fantastic content. I'm curious about your preferences. Let me calmly explain the features available to you.",
      technical: "The video streaming aggregator utilizes advanced algorithms to curate personalized content recommendations based on your viewing history and preferences."
    };

    const testConfigurations = Object.values(FEMALE_VOICES).map(voice => ({
      voiceId: voice.id,
      name: voice.name,
      category: voice.category,
      description: voice.description,
      defaultSettings: voice.defaultSettings,
      recommendedTests: [
        { name: 'Conversational', text: sampleTexts.medium },
        { name: 'Emotional Range', text: sampleTexts.emotional },
        { name: 'Professional', text: sampleTexts.technical }
      ]
    }));

    return NextResponse.json({
      success: true,
      data: {
        healthStatus,
        sampleTexts,
        testConfigurations,
        testingGuidelines: {
          recommended: [
            'Test with different text lengths',
            'Try various emotional contexts',
            'Compare voice settings',
            'Test in different use cases'
          ],
          limits: {
            maxTextLength: 1000,
            maxTestsPerMinute: 10,
            cooldownBetweenTests: 3000 // milliseconds
          }
        },
        voiceMetrics: {
          evaluationCriteria: [
            'Clarity and pronunciation',
            'Emotional expression',
            'Natural intonation',
            'Appropriate pacing',
            'Audio quality'
          ],
          qualityThresholds: {
            excellent: { duration: '>0', size: '>1KB', errors: 0 },
            good: { duration: '>0', size: '>500B', errors: '<=1' },
            poor: { duration: '<=0', size: '<=500B', errors: '>1' }
          }
        }
      }
    });

  } catch (error) {
    console.error('Error fetching test configurations:', error);
    
    return NextResponse.json({
      success: false,
      error: {
        code: 'TEST_CONFIG_FAILED',
        message: 'Failed to fetch test configurations',
        details: error.message
      }
    }, { status: 500 });
  }
}