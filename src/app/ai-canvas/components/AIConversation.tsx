'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  VolumeX, 
  Settings, 
  Sparkles,
  MessageSquare,
  User,
  Bot
} from 'lucide-react'
import { AudioVisualizer } from '@/components/voice/AudioVisualizer'
import { VoiceSettings } from '@/components/voice/VoiceSettings'
import { useVoiceStore } from '@/stores/voiceStore'

interface Message {
  id: string
  role: 'user' | 'ai'
  content: string
  timestamp: Date
  uiComponents?: React.ReactNode
}

interface AIConversationProps {
  messages: Message[]
  onMessage: (message: string) => void
  isProcessing?: boolean
  interfaceType?: 'voice' | 'keyboard'
  className?: string
  showHeader?: boolean
}

export function AIConversation({
  messages,
  onMessage,
  isProcessing = false,
  interfaceType = 'keyboard',
  className = '',
  showHeader = true
}: AIConversationProps) {
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
    <Card className={`flex flex-col h-full ${className}`}>
      {showHeader && (
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {interfaceType === 'voice' ? (
                  <div className="flex items-center gap-2 text-primary">
                    <Mic className="w-5 h-5" />
                    <span className="font-medium">Voice Mode</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-purple-600">
                    <MessageSquare className="w-5 h-5" />
                    <span className="font-medium">Text Mode</span>
                  </div>
                )}
              </div>
              
              {interfaceType === 'voice' && (
                <Button
                  onClick={() => setShowVoiceSettings(!showVoiceSettings)}
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <Badge variant="outline" className="text-xs">
                {messages.length} message{messages.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          </div>
        </CardHeader>
      )}

      {/* Voice Settings Panel */}
      {showVoiceSettings && interfaceType === 'voice' && (
        <div className="border-b border-border bg-muted/20">
          <VoiceSettings compact={true} className="m-4" />
        </div>
      )}

      {/* Audio Visualizer for Voice Mode */}
      {interfaceType === 'voice' && (isPlaying || isTTSLoading) && (
        <div className="border-b border-border bg-card px-4 py-2">
          <AudioVisualizer 
            size="sm" 
            variant="bars" 
            showControls={false}
            className="shadow-none border-0"
          />
        </div>
      )}

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Bot className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2 max-w-sm">
                <h3 className="font-semibold">Start a Conversation</h3>
                <p className="text-sm text-muted-foreground">
                  Tell me what you'd like to create and I'll help you build it.
                </p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-lg p-3 ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground ml-4' 
                      : 'bg-muted mr-4'
                  }`}>
                    <div className="flex items-start gap-2">
                      {message.role === 'ai' && (
                        <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      )}
                      {message.role === 'user' && (
                        <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        {message.uiComponents && (
                          <div className="mt-3">
                            {message.uiComponents}
                          </div>
                        )}
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
          
          {(isProcessing || isTTSLoading) && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3 mr-4">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
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
                      Stop Listening
                    </>
                  ) : (
                    <>
                      <Mic className="w-5 h-5 mr-2" />
                      Speak
                    </>
                  )}
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
      </CardContent>
    </Card>
  )
}