import { NextRequest, NextResponse } from 'next/server';
import { EmotionAnalysisService } from '../../../../../services/emotion-analysis.service.js';
import { SSMLGeneratorService } from '../../../../../services/ssml-generator.service.js';
import { EmotionalConsistencyService } from '../../../../../services/emotional-consistency.service.js';
import { EmotionType } from '../../../../../types/emotion.types.js';

// Initialize emotion services
const emotionAnalysis = new EmotionAnalysisService();
const ssmlGenerator = new SSMLGeneratorService();
const emotionalConsistency = new EmotionalConsistencyService();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      text, 
      voiceId = "pNInz6obpgDQGcFmaJgB", 
      stability = 0.5, 
      similarityBoost = 0.5,
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

    const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;
    
    if (!elevenLabsApiKey) {
      return NextResponse.json({ error: 'ElevenLabs API key not configured' }, { status: 500 });
    }

    let finalText = text;
    let emotionResponse = null;
    let adjustedStability = stability;
    let adjustedSimilarityBoost = similarityBoost;

    // Process emotions if enabled and we have session context
    if (enableEmotion && sessionId) {
      try {
        // Process complete emotional conversation turn
        emotionResponse = await emotionalConsistency.processConversationTurn(
          sessionId,
          userInput || '', // User's input that led to this response
          text,
          userId
        );

        // Use SSML if requested and emotion processing succeeded
        if (useSSML && emotionResponse.ssml) {
          finalText = emotionResponse.ssml;
        }

        // Apply emotion-based voice parameter adjustments
        if (emotionResponse.voiceParams) {
          adjustedStability = emotionResponse.voiceParams.stability;
          adjustedSimilarityBoost = emotionResponse.voiceParams.similarityBoost;
        }
      } catch (emotionError) {
        console.warn('Emotion processing failed, using original text:', emotionError);
        // Continue with original text if emotion processing fails
      }
    } else if (enableEmotion && targetEmotion) {
      // Direct emotion override without conversation context
      try {
        const emotions = await emotionAnalysis.analyzeText(text);
        emotions.primaryEmotion = targetEmotion as EmotionType;
        
        if (useSSML) {
          finalText = await ssmlGenerator.generateSSML(text, emotions);
        }
        
        const voiceParams = emotionAnalysis.mapToVoiceParameters(emotions);
        adjustedStability = voiceParams.stability;
        adjustedSimilarityBoost = voiceParams.similarityBoost;
      } catch (emotionError) {
        console.warn('Direct emotion processing failed:', emotionError);
      }
    }

    // Call ElevenLabs Text-to-Speech API with emotion-enhanced parameters
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': elevenLabsApiKey
      },
      body: JSON.stringify({
        text: finalText, // Use emotion-processed text (may include SSML)
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: adjustedStability,
          similarity_boost: adjustedSimilarityBoost
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs API error:', errorText);
      return NextResponse.json({ 
        error: 'ElevenLabs API error', 
        details: errorText 
      }, { status: response.status });
    }

    // Get the audio data as array buffer
    const audioBuffer = await response.arrayBuffer();
    
    // Convert to base64 for client transmission
    const audioBase64 = Buffer.from(audioBuffer).toString('base64');
    
    // Build response with emotion metadata
    const responseData: any = {
      audio: audioBase64,
      mimeType: 'audio/mpeg',
      originalText: text,
      processedText: finalText,
      voiceSettings: {
        stability: adjustedStability,
        similarity_boost: adjustedSimilarityBoost
      }
    };

    // Include emotion analysis if available
    if (emotionResponse) {
      responseData.emotion = {
        primaryEmotion: emotionResponse.emotions.primaryEmotion,
        confidence: emotionResponse.emotions.confidence,
        intensity: emotionResponse.emotions.intensity,
        processingTime: emotionResponse.processingTime,
        ssmlUsed: useSSML && !!emotionResponse.ssml,
        keyPhrases: emotionResponse.metadata.keyPhrases
      };
    }
    
    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Error in ElevenLabs TTS:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Get available voices
export async function GET() {
  try {
    const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;
    
    if (!elevenLabsApiKey) {
      return NextResponse.json({ error: 'ElevenLabs API key not configured' }, { status: 500 });
    }

    const response = await fetch('https://api.elevenlabs.io/v1/voices', {
      headers: {
        'xi-api-key': elevenLabsApiKey
      }
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Return recommended voices and all available ones
    const recommendedVoices = data.voices.filter((voice: any) => 
      voice.name === 'Rachel' || voice.name === 'Josh' || voice.name === 'Adam'
    );

    return NextResponse.json({
      recommended: recommendedVoices,
      all: data.voices
    });

  } catch (error) {
    console.error('Error fetching voices:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch voices',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}