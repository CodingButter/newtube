import { NextRequest, NextResponse } from 'next/server';
import { getVoiceService } from '../../../../../services/voice.service';
import { getSSMLService } from '../../../../../services/ssml.service';
import { getAudioService } from '../../../../../services/audio.service';
import { EmotionAnalysisService } from '../../../../../services/emotion-analysis.service';
import { SSMLGeneratorService } from '../../../../../services/ssml-generator.service';
import { EmotionalConsistencyService } from '../../../../../services/emotional-consistency.service';
import { EmotionType, VoiceSynthesisRequest } from '../../../../../types/voice.types';

// Initialize emotion services
const emotionAnalysis = new EmotionAnalysisService();
const ssmlGenerator = new SSMLGeneratorService();
const emotionalConsistency = new EmotionalConsistencyService();

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
      messageId,
      sessionId,
      userId,
      userInput,
      enableEmotion = true,
      targetEmotion,
      useSSML = true
    } = body;

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const voiceService = getVoiceService();
    const ssmlService = getSSMLService();
    const audioService = getAudioService();

    let finalText = text;
    let detectedEmotions = emotions;
    let emotionResponse = null;

    // Enhanced emotion processing with conversation context
    if (enableEmotion && sessionId) {
      try {
        // Process complete emotional conversation turn
        emotionResponse = await emotionalConsistency.processConversationTurn(
          sessionId,
          userInput || '', 
          text,
          userId
        );

        // Use enhanced emotion data
        if (emotionResponse.emotions) {
          detectedEmotions = [emotionResponse.emotions];
        }

        // Use SSML if requested and emotion processing succeeded
        if (useSSML && emotionResponse.ssml) {
          finalText = emotionResponse.ssml;
        }
      } catch (emotionError) {
        console.warn('Emotion processing failed, using fallback:', emotionError);
        // Fallback to basic emotion detection
        detectedEmotions = emotions.length > 0 
          ? emotions 
          : ssmlService.parseEmotionalContext(text);
      }
    } else if (enableEmotion && targetEmotion) {
      // Direct emotion override without conversation context
      try {
        const emotions = await emotionAnalysis.analyzeText(text);
        emotions.primaryEmotion = targetEmotion as EmotionType;
        detectedEmotions = [emotions];
        
        if (useSSML) {
          finalText = await ssmlGenerator.generateSSML(text, emotions);
        }
      } catch (emotionError) {
        console.warn('Direct emotion processing failed:', emotionError);
        detectedEmotions = emotions.length > 0 
          ? emotions 
          : ssmlService.parseEmotionalContext(text);
      }
    } else {
      // Parse emotional context from text if not provided
      detectedEmotions = emotions.length > 0 
        ? emotions 
        : ssmlService.parseEmotionalContext(text);
    }

    // Generate SSML with emotional context if not already done
    if (useSSML && finalText === text) {
      finalText = ssmlService.generateSSML(text, detectedEmotions, ssmlConfig);
    }

    if (streaming) {
      // Return streaming response
      const streamResponse = await voiceService.streamTTS(finalText, { voiceId }, messageId);
      return NextResponse.json({
        ...streamResponse,
        emotions: detectedEmotions,
        emotionResponse: emotionResponse
      });
    } else {
      // Generate standard TTS response
      const voiceResponse = await voiceService.synthesizeSpeech(finalText, detectedEmotions, { voiceId });
      
      // Apply audio processing if needed
      let audioBuffer = Buffer.from(voiceResponse.audio, 'base64');
      
      if (format !== 'mp3') {
        audioBuffer = Buffer.from(await audioService.convertFormat(audioBuffer.buffer, 'mp3', format));
      }

      // Build comprehensive response
      const responseData = {
        ...voiceResponse,
        audio: audioBuffer.toString('base64'),
        emotions: detectedEmotions,
        ssml: finalText,
        originalText: text,
        processedText: finalText
      };

      // Include emotion analysis if available
      if (emotionResponse) {
        responseData.emotion = {
          primaryEmotion: emotionResponse.emotions.primaryEmotion,
          confidence: emotionResponse.emotions.confidence,
          intensity: emotionResponse.emotions.intensity,
          processingTime: emotionResponse.processingTime,
          ssmlUsed: useSSML && !!emotionResponse.ssml,
          keyPhrases: emotionResponse.metadata?.keyPhrases || []
        };
      }

      return NextResponse.json(responseData);
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
      femaleVoices: require('../../../../../types/voice.types').FEMALE_VOICES,
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