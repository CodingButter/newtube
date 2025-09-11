'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX, Settings } from 'lucide-react';

export interface EnhancedVoiceInterfaceProps {
  onUserInput?: (text: string) => void;
  onVoiceStart?: () => void;
  onVoiceEnd?: () => void;
  isListening?: boolean;
  isSpeaking?: boolean;
  disabled?: boolean;
}

export default function EnhancedVoiceInterface({
  onUserInput,
  onVoiceStart,
  onVoiceEnd,
  isListening = false,
  isSpeaking = false,
  disabled = false
}: EnhancedVoiceInterfaceProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState('');
  const [audioQueue, setAudioQueue] = useState<string[]>([]);
  const [currentVoice, setCurrentVoice] = useState('pNInz6obpgDQGcFmaJgB'); // Rachel's voice ID
  const [isPlayingElevenLabs, setIsPlayingElevenLabs] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentAudioRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    // Check if browser supports Web Speech API
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      setIsSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      // Configure speech recognition
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      
      // Set up event handlers
      recognitionRef.current.onstart = () => {
        setIsRecording(true);
        onVoiceStart?.();
      };
      
      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        setTranscript(finalTranscript || interimTranscript);
        
        if (finalTranscript) {
          onUserInput?.(finalTranscript);
        }
      };
      
      recognitionRef.current.onerror = (event) => {
        setError(`Speech recognition error: ${event.error}`);
        setIsRecording(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsRecording(false);
        onVoiceEnd?.();
      };
    }

    // Initialize Web Audio API for ElevenLabs playback
    try {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API not supported');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [onUserInput, onVoiceStart, onVoiceEnd]);

  const startListening = () => {
    if (!recognitionRef.current || disabled) return;
    
    // Stop any ongoing ElevenLabs playback when user starts speaking
    stopElevenLabsPlayback();
    
    setError('');
    setTranscript('');
    
    try {
      recognitionRef.current.start();
    } catch (error) {
      setError('Failed to start speech recognition');
      console.error('Speech recognition error:', error);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
    }
  };

  const stopElevenLabsPlayback = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.stop();
      currentAudioRef.current = null;
    }
    setIsPlayingElevenLabs(false);
  };

  const speakWithElevenLabs = async (text: string) => {
    if (!audioContextRef.current) {
      console.error('Audio context not available');
      return;
    }

    try {
      setIsPlayingElevenLabs(true);
      
      const response = await fetch('/api/ai/elevenlabs/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voiceId: currentVoice,
          stability: 0.5,
          similarityBoost: 0.5
        }),
      });

      if (!response.ok) {
        throw new Error(`TTS API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Convert base64 audio to ArrayBuffer
      const audioData = Uint8Array.from(atob(data.audio), c => c.charCodeAt(0)).buffer;
      
      // Decode audio data
      const audioBuffer = await audioContextRef.current.decodeAudioData(audioData);
      
      // Create and play audio source
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      
      currentAudioRef.current = source;
      
      source.onended = () => {
        setIsPlayingElevenLabs(false);
        currentAudioRef.current = null;
      };
      
      source.start();

    } catch (error) {
      console.error('ElevenLabs TTS error:', error);
      setError(`Voice synthesis error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsPlayingElevenLabs(false);
      
      // Fallback to browser speech synthesis
      fallbackToBrowserSpeech(text);
    }
  };

  const fallbackToBrowserSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const preferredVoice = voices.find(v => 
          v.name.includes('Google') || 
          v.name.includes('Microsoft') ||
          v.lang.includes('en-US')
        );
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };

  // Expose speak function for parent components
  useEffect(() => {
    (window as any).enhancedVoiceInterface = { 
      speakWithElevenLabs, 
      stopElevenLabsPlayback,
      fallbackToBrowserSpeech
    };
  }, [currentVoice]);

  if (!isSupported) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800 text-sm">
          Voice features are not supported in this browser. Please use Chrome, Edge, or Safari for the best experience.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center space-x-4">
        <Button
          onClick={isRecording ? stopListening : startListening}
          disabled={disabled || isPlayingElevenLabs}
          variant={isRecording ? "destructive" : "default"}
          size="lg"
          className="relative"
        >
          {isRecording ? (
            <>
              <MicOff className="w-5 h-5 mr-2" />
              Stop Listening
            </>
          ) : (
            <>
              <Mic className="w-5 h-5 mr-2" />
              Start Voice
            </>
          )}
          {isRecording && (
            <div className="absolute -inset-1 bg-red-500 rounded-full animate-ping opacity-75"></div>
          )}
        </Button>

        {isPlayingElevenLabs && (
          <Button
            onClick={stopElevenLabsPlayback}
            variant="outline"
            size="lg"
          >
            <VolumeX className="w-5 h-5 mr-2" />
            Stop Speaking
          </Button>
        )}

        <Button
          onClick={() => speakWithElevenLabs("This is a test of the ElevenLabs voice synthesis.")}
          variant="outline"
          size="sm"
          disabled={disabled || isRecording}
        >
          <Volume2 className="w-4 h-4 mr-1" />
          Test Voice
        </Button>
      </div>

      {transcript && (
        <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md">
          <p className="text-sm text-gray-700">
            <strong>You said:</strong> {transcript}
          </p>
        </div>
      )}

      {error && (
        <div className="w-full p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="text-xs text-gray-500 text-center">
        {isRecording && (
          <p className="text-blue-600 font-medium">🎤 Listening... Speak now!</p>
        )}
        {isPlayingElevenLabs && (
          <p className="text-green-600 font-medium">🔊 AI speaking with ElevenLabs...</p>
        )}
        {!isRecording && !isPlayingElevenLabs && (
          <p>Click "Start Voice" to interact with AI tour guide using high-quality voice</p>
        )}
        <p className="mt-1 text-xs">Powered by ElevenLabs TTS & Web Speech API</p>
      </div>
    </div>
  );
}

// Enhanced utility function for parent components
export const speakWithElevenLabs = async (text: string) => {
  if ((window as any).enhancedVoiceInterface?.speakWithElevenLabs) {
    await (window as any).enhancedVoiceInterface.speakWithElevenLabs(text);
  } else {
    // Fallback to browser speech
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  }
};

// Type declarations for enhanced Speech APIs
declare global {
  interface Window {
    enhancedVoiceInterface?: {
      speakWithElevenLabs: (text: string) => Promise<void>;
      stopElevenLabsPlayback: () => void;
      fallbackToBrowserSpeech: (text: string) => void;
    };
  }
}