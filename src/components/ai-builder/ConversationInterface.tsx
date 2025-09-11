'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Mic, MicOff, Send, Volume2, VolumeX, Settings } from 'lucide-react'
import { AudioVisualizer } from '@/components/AudioVisualizer'
import { VoiceSettings } from '@/components/VoiceSettings'
import { useVoiceStore } from '@/stores/voiceStore'

interface Message {
  id: string
  role: 'user' | 'ai'
  content: string
  timestamp: Date
}

interface ConversationInterfaceProps {
  interfaceType: 'voice' | 'keyboard'
  onMessage: (message: string) => void
  messages: Message[]
  isProcessing?: boolean
}

export function ConversationInterface({ 
  interfaceType, 
  onMessage, 
  messages, 
  isProcessing = false 
}: ConversationInterfaceProps) {
  const [isListening, setIsListening] = useState(false)
  const [currentInput, setCurrentInput] = useState('')
  const [showVoiceSettings, setShowVoiceSettings] = useState(false)
  const recognitionRef = useRef<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Use ElevenLabs TTS store
  const { 
    isPlaying, 
    isLoading: isTTSLoading, 
    playText, 
    stopPlayback,
    playWithBrowserTTS,
    stopBrowserTTS
  } = useVoiceStore()

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && interfaceType === 'voice' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        onMessage(transcript)
        setIsListening(false)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [interfaceType, onMessage])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Speak AI messages in voice mode using ElevenLabs TTS
  useEffect(() => {
    if (interfaceType === 'voice' && messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.role === 'ai' && !isPlaying && !isTTSLoading) {
        playText(lastMessage.content)
      }
    }
  }, [messages, interfaceType, isPlaying, isTTSLoading, playText])

  const handleStopSpeaking = () => {
    if (isPlaying) {
      stopPlayback()
    }
    // Also stop browser TTS if it's running
    stopBrowserTTS()
  }

  const handleVoiceToggle = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start()
        setIsListening(true)
      }
    }
  }

  const handleSendMessage = () => {
    if (currentInput.trim()) {
      onMessage(currentInput.trim())
      setCurrentInput('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Voice Settings Panel */}
      {showVoiceSettings && interfaceType === 'voice' && (
        <div className="border-b border-border bg-card">
          <VoiceSettings compact={true} className="m-4" />
        </div>
      )}

      {/* Audio Visualizer for Voice Mode */}
      {interfaceType === 'voice' && (isPlaying || isTTSLoading) && (
        <div className="border-b border-border bg-card p-4">
          <AudioVisualizer 
            size="sm" 
            variant="bars" 
            showControls={false}
            className="shadow-none border-0"
          />
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-lg p-3 ${
              message.role === 'user' 
                ? 'bg-primary text-primary-foreground ml-4' 
                : 'bg-muted mr-4'
            }`}>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {(isProcessing || isTTSLoading) && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg p-3 mr-4">
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {isTTSLoading ? 'Preparing voice...' : 'AI is thinking...'}
                </span>
              </div>
            </div>
          </div>
        )}

        {isPlaying && (
          <div className="flex justify-start">
            <div className="bg-primary/10 rounded-lg p-3 mr-4 border border-primary/20">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-xs text-primary font-medium">AI is speaking...</span>
                <Button
                  onClick={handleStopSpeaking}
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 text-xs"
                >
                  Stop
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-card">
        {interfaceType === 'voice' ? (
          <div className="space-y-3">
            <div className="flex gap-2">
              <Button 
                onClick={handleVoiceToggle}
                disabled={isProcessing || isTTSLoading}
                className={`flex-1 h-12 ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-primary hover:bg-primary/90'
                }`}
                size="lg"
              >
                {isListening ? (
                  <>
                    <MicOff className="w-5 h-5 mr-2" />
                    Stop
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5 mr-2" />
                    Speak
                  </>
                )}
              </Button>
              
              <Button 
                onClick={() => setShowVoiceSettings(!showVoiceSettings)}
                variant="outline"
                size="lg"
                className="px-4"
                title="Voice Settings"
              >
                <Settings className="w-5 h-5" />
              </Button>
              
              {(isPlaying || isTTSLoading) && (
                <Button 
                  onClick={handleStopSpeaking}
                  variant="outline"
                  size="lg"
                  className="px-4"
                >
                  <VolumeX className="w-5 h-5" />
                </Button>
              )}
            </div>
            
            {isListening && (
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <div className="w-1 h-4 bg-primary animate-pulse"></div>
                  <div className="w-1 h-6 bg-primary animate-pulse" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-1 h-4 bg-primary animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-1 h-6 bg-primary animate-pulse" style={{animationDelay: '0.3s'}}></div>
                  <div className="w-1 h-4 bg-primary animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
                <p className="text-xs text-muted-foreground">Listening... Speak clearly</p>
              </div>
            )}
            
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex gap-2">
              <textarea
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Describe what you want to create..."
                disabled={isProcessing}
                className="flex-1 px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm resize-none min-h-[2.5rem] max-h-32"
                rows={2}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!currentInput.trim() || isProcessing}
                size="sm"
                className="self-end"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground">
              Press Enter to send, Shift+Enter for new line
            </div>
          </div>
        )}
      </div>
    </div>
  )
}