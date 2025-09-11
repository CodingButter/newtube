'use client'

// VOICE-POWERED UI BUILDER
// Natural speech → AI analysis → Real-time UI generation

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mic, MicOff, Volume2, VolumeX, Sparkles, Wand2 } from 'lucide-react'
import { AIUIBuilder } from './ai-ui-builder'
import { Panel } from '@/types'

interface VoiceUIBuilderProps {
  onPanelsGenerated?: (panels: Panel[]) => void
  onConversationStart?: () => void
  onConversationEnd?: () => void
}

interface VoiceState {
  isListening: boolean
  isProcessing: boolean
  isSpeaking: boolean
  transcript: string
  confidence: number
}

export function VoiceUIBuilder({ 
  onPanelsGenerated,
  onConversationStart,
  onConversationEnd
}: VoiceUIBuilderProps) {
  const [voiceState, setVoiceState] = useState<VoiceState>({
    isListening: false,
    isProcessing: false,
    isSpeaking: false,
    transcript: '',
    confidence: 0
  })
  
  const [conversationActive, setConversationActive] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [currentPrompt, setCurrentPrompt] = useState('')
  
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-US'
      recognition.maxAlternatives = 1
      
      recognition.onstart = () => {
        setVoiceState(prev => ({ ...prev, isListening: true }))
      }
      
      recognition.onresult = (event) => {
        let finalTranscript = ''
        let interimTranscript = ''
        let confidence = 0
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i]
          const transcript = result[0].transcript
          
          if (result.isFinal) {
            finalTranscript += transcript
            confidence = result[0].confidence
          } else {
            interimTranscript += transcript
          }
        }
        
        setVoiceState(prev => ({
          ...prev,
          transcript: finalTranscript || interimTranscript,
          confidence: confidence
        }))
        
        // Process final transcript
        if (finalTranscript.trim()) {
          processVoiceInput(finalTranscript.trim(), confidence)
        }
      }
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setVoiceState(prev => ({ 
          ...prev, 
          isListening: false, 
          isProcessing: false 
        }))
      }
      
      recognition.onend = () => {
        setVoiceState(prev => ({ 
          ...prev, 
          isListening: false 
        }))
        
        // Restart if conversation is active
        if (conversationActive) {
          setTimeout(() => {
            if (recognitionRef.current && conversationActive) {
              recognitionRef.current.start()
            }
          }, 1000)
        }
      }
      
      recognitionRef.current = recognition
    }
  }, [conversationActive])

  const processVoiceInput = async (transcript: string, confidence: number) => {
    if (confidence < 0.7) {
      // Low confidence, ask for clarification
      speak("I didn't catch that clearly. Could you repeat what you'd like me to build?")
      return
    }

    setVoiceState(prev => ({ ...prev, isProcessing: true }))
    
    try {
      // Check for conversation control commands
      const lowerTranscript = transcript.toLowerCase()
      
      if (lowerTranscript.includes('stop') || lowerTranscript.includes('end conversation')) {
        endConversation()
        return
      }
      
      if (lowerTranscript.includes('clear') || lowerTranscript.includes('start over')) {
        speak("Starting fresh! What would you like me to build for you?")
        setCurrentPrompt('')
        return
      }
      
      // Set the prompt for the AI UI Builder
      setCurrentPrompt(transcript)
      
      // Provide immediate voice feedback
      speak("Got it! Let me build that for you.")
      
    } catch (error) {
      console.error('Voice processing error:', error)
      speak("I'm having trouble processing that. Could you try again?")
    } finally {
      setVoiceState(prev => ({ ...prev, isProcessing: false, transcript: '' }))
    }
  }

  const speak = async (text: string) => {
    if (!audioEnabled) return
    
    setVoiceState(prev => ({ ...prev, isSpeaking: true }))
    
    try {
      // Use ElevenLabs TTS API if available
      const response = await fetch('/api/ai/elevenlabs/speak', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text,
          voice_id: 'pNInz6obpgDQGcFmaJgB', // Rachel voice
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.85,
            style: 0.15,
            use_speaker_boost: true
          }
        })
      })

      if (response.ok) {
        const audioBlob = await response.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        
        if (audioRef.current) {
          audioRef.current.src = audioUrl
          audioRef.current.onended = () => {
            setVoiceState(prev => ({ ...prev, isSpeaking: false }))
            URL.revokeObjectURL(audioUrl)
          }
          await audioRef.current.play()
        }
      } else {
        // Fallback to browser speech synthesis
        fallbackSpeak(text)
      }
    } catch (error) {
      console.error('TTS error:', error)
      fallbackSpeak(text)
    }
  }

  const fallbackSpeak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 0.8
      
      utterance.onend = () => {
        setVoiceState(prev => ({ ...prev, isSpeaking: false }))
      }
      
      window.speechSynthesis.speak(utterance)
    } else {
      setVoiceState(prev => ({ ...prev, isSpeaking: false }))
    }
  }

  const startConversation = () => {
    setConversationActive(true)
    setVoiceState(prev => ({ ...prev, transcript: '', confidence: 0 }))
    onConversationStart?.()
    
    speak("Hi! I'm your AI UI builder. Tell me about your dream streaming platform and I'll build it for you in real-time!")
    
    setTimeout(() => {
      if (recognitionRef.current) {
        recognitionRef.current.start()
      }
    }, 2000)
  }

  const endConversation = () => {
    setConversationActive(false)
    setVoiceState({
      isListening: false,
      isProcessing: false,
      isSpeaking: false,
      transcript: '',
      confidence: 0
    })
    onConversationEnd?.()
    
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    
    speak("Conversation ended. Click the microphone to start again!")
  }

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled)
    if (!audioEnabled) {
      speak("Audio is now enabled!")
    }
  }

  // Handle panels generated from AI UI Builder
  const handlePanelsGenerated = (panels: Panel[]) => {
    onPanelsGenerated?.(panels)
    
    // Provide voice feedback about what was created
    if (panels.length > 0) {
      const panelTypes = panels.map(p => p.title).join(', ')
      speak(`I've created ${panels.length} component${panels.length > 1 ? 's' : ''} for you: ${panelTypes}. What else would you like me to add?`)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Voice Control Header */}
      <div className="border-b bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wand2 className="h-6 w-6" />
            <div>
              <h2 className="text-lg font-bold">Voice UI Builder</h2>
              <p className="text-sm opacity-90">Speak your dreams, see them built instantly</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleAudio}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            
            <Button
              variant={conversationActive ? "destructive" : "secondary"}
              size="sm"
              onClick={conversationActive ? endConversation : startConversation}
              className={conversationActive ? "bg-red-500 hover:bg-red-600" : "bg-white/20 hover:bg-white/30 text-white border-white/30"}
            >
              {voiceState.isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              {conversationActive ? 'End Chat' : 'Start Talking'}
            </Button>
          </div>
        </div>
        
        {/* Voice Status */}
        {conversationActive && (
          <div className="mt-3 flex items-center gap-4">
            <Badge 
              variant={voiceState.isListening ? "default" : "secondary"}
              className={voiceState.isListening ? "bg-green-500 animate-pulse" : "bg-white/20"}
            >
              {voiceState.isListening ? '🎤 Listening...' : '⏸️ Paused'}
            </Badge>
            
            {voiceState.isProcessing && (
              <Badge className="bg-blue-500 animate-pulse">
                🧠 Processing...
              </Badge>
            )}
            
            {voiceState.isSpeaking && (
              <Badge className="bg-purple-500 animate-pulse">
                🗣️ Speaking...
              </Badge>
            )}
            
            {voiceState.transcript && (
              <div className="flex-1 bg-white/10 rounded px-3 py-1">
                <span className="text-sm">{voiceState.transcript}</span>
                {voiceState.confidence > 0 && (
                  <span className="text-xs opacity-70 ml-2">
                    ({Math.round(voiceState.confidence * 100)}% confident)
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main AI UI Builder */}
      <div className="flex-1">
        <AIUIBuilder
          onPanelsGenerated={handlePanelsGenerated}
          initialPrompt={currentPrompt}
          enableVoice={false} // Disable built-in voice since we're handling it here
        />
      </div>

      {/* Hidden audio element for ElevenLabs playback */}
      <audio ref={audioRef} preload="none" />

      {/* Floating voice hints */}
      {conversationActive && (
        <div className="absolute bottom-4 left-4">
          <Card className="bg-black/80 text-white border-none">
            <CardContent className="p-3">
              <p className="text-xs font-medium mb-1">💡 Voice Commands:</p>
              <ul className="text-xs space-y-1 opacity-90">
                <li>"Big video player with search"</li>
                <li>"My subscriptions on the left"</li>
                <li>"Create a cooking video layout"</li>
                <li>"Stop" or "Clear" to control</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default VoiceUIBuilder