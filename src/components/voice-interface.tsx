'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

export interface VoiceInterfaceProps {
  onUserInput?: (text: string) => void;
  onVoiceStart?: () => void;
  onVoiceEnd?: () => void;
  isListening?: boolean;
  isSpeaking?: boolean;
  disabled?: boolean;
}

export default function VoiceInterface({
  onUserInput,
  onVoiceStart,
  onVoiceEnd,
  isListening = false,
  isSpeaking = false,
  disabled = false
}: VoiceInterfaceProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState('');
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);

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

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      speechSynthesisRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
      }
    };
  }, [onUserInput, onVoiceStart, onVoiceEnd]);

  const startListening = () => {
    if (!recognitionRef.current || disabled) return;
    
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

  const speak = (text: string, voice?: string) => {
    if (!speechSynthesisRef.current) return;

    // Cancel any ongoing speech
    speechSynthesisRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice settings
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    // Try to use a specific voice
    const voices = speechSynthesisRef.current.getVoices();
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

    speechSynthesisRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
    }
  };

  // Expose speak function through ref for parent components
  useEffect(() => {
    (window as any).voiceInterface = { speak, stopSpeaking };
  }, []);

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
          disabled={disabled || isSpeaking}
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

        {isSpeaking && (
          <Button
            onClick={stopSpeaking}
            variant="outline"
            size="lg"
          >
            <VolumeX className="w-5 h-5 mr-2" />
            Stop Speaking
          </Button>
        )}
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
          <p className="text-blue-600 font-medium">Listening... Speak now!</p>
        )}
        {isSpeaking && (
          <p className="text-green-600 font-medium">AI is speaking...</p>
        )}
        {!isRecording && !isSpeaking && (
          <p>Click "Start Voice" and speak to interact with the AI tour guide</p>
        )}
      </div>
    </div>
  );
}

// Utility function for parent components to use TTS
export const speakText = (text: string) => {
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

// Type declarations for Speech APIs
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
    voiceInterface?: {
      speak: (text: string) => void;
      stopSpeaking: () => void;
    };
  }
}