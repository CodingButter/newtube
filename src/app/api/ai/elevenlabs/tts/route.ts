import { NextRequest, NextResponse } from 'next/server';
import { getVoiceService } from '../../../../../services/voice.service';
import { getSSMLService } from '../../../../../services/ssml.service';
import { getAudioService } from '../../../../../services/audio.service';
import { EmotionType, VoiceSynthesisRequest } from '../../../../../types/voice.types';

export async function POST(request: NextRequest) {
  try {
    const body: VoiceSynthesisRequest = await request.json();
    const { 
      text, 
      voiceId, 
      emotions = [], 
      ssmlConfig, 
      format = 'mp3', 
      streaming = false,
      messageId 
    } = body;

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const voiceService = getVoiceService();
    const ssmlService = getSSMLService();
    const audioService = getAudioService();

    // Parse emotional context from text if not provided
    const detectedEmotions = emotions.length > 0 
      ? emotions 
      : ssmlService.parseEmotionalContext(text);

    // Generate SSML with emotional context
    const ssml = ssmlService.generateSSML(text, detectedEmotions, ssmlConfig);

    if (streaming) {
      // Return streaming response
      const streamResponse = await voiceService.streamTTS(ssml, { voiceId }, messageId);
      return NextResponse.json(streamResponse);
    } else {
      // Generate standard TTS response
      const voiceResponse = await voiceService.synthesizeSpeech(text, detectedEmotions, { voiceId });
      
      // Apply audio processing if needed
      let audioBuffer = Buffer.from(voiceResponse.audio, 'base64');
      
      if (format !== 'mp3') {
        audioBuffer = Buffer.from(await audioService.convertFormat(audioBuffer.buffer, 'mp3', format));
      }

      return NextResponse.json({
        ...voiceResponse,
        audio: audioBuffer.toString('base64'),
        emotions: detectedEmotions,
        ssml: ssml
      });
    }

  } catch (error) {
    console.error('Error in enhanced ElevenLabs TTS:', error);
    
    // Enhanced error handling with fallback
    if (error.retryable) {
      return NextResponse.json({ 
        error: 'Temporary service error',
        details: error.message,
        retryAfter: 5000,
        fallback: 'browser-tts'
      }, { status: 503 });
    }

    return NextResponse.json({ 
      error: 'Voice synthesis failed',
      details: error.message || 'Unknown error',
      fallback: 'browser-tts'
    }, { status: 500 });
  }
}

// Get available voices with enhanced metadata
export async function GET() {
  try {
    const voiceService = getVoiceService();
    const voices = await voiceService.getAvailableVoices();
    
    // Add usage statistics if available
    let usageStats;
    try {
      usageStats = await voiceService.getUsageStats();
    } catch (error) {
      console.warn('Could not fetch usage stats:', error.message);
    }

    return NextResponse.json({
      ...voices,
      usageStats,
      femaleVoices: Object.values(require('../../../../../types/voice.types').FEMALE_VOICES),
      healthStatus: await voiceService.healthCheck()
    });

  } catch (error) {
    console.error('Error fetching voices:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch voices',
      details: error instanceof Error ? error.message : 'Unknown error',
      fallback: 'Use browser speech synthesis'
    }, { status: 500 });
  }
}