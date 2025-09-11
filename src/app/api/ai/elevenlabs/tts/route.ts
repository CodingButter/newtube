import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, voiceId = "pNInz6obpgDQGcFmaJgB", stability = 0.5, similarityBoost = 0.5 } = body;

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;
    
    if (!elevenLabsApiKey) {
      return NextResponse.json({ error: 'ElevenLabs API key not configured' }, { status: 500 });
    }

    // Call ElevenLabs Text-to-Speech API
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': elevenLabsApiKey
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability,
          similarity_boost: similarityBoost
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
    
    return NextResponse.json({
      audio: audioBase64,
      mimeType: 'audio/mpeg'
    });

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