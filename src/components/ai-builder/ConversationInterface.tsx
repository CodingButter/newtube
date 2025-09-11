'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Mic, MicOff, Send, Volume2, VolumeX } from 'lucide-react'

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
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const recognitionRef = useRef<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize speech synthesis and recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSpeechSynthesis(window.speechSynthesis)
      
      if (interfaceType === 'voice' && 'webkitSpeechRecognition' in window) {
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
    }
  }, [interfaceType, onMessage])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Speak AI messages in voice mode
  useEffect(() => {
    if (interfaceType === 'voice' && speechSynthesis && messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.role === 'ai' && !isSpeaking) {
        speakText(lastMessage.content)
      }
    }
  }, [messages, interfaceType, speechSynthesis, isSpeaking])

  const speakText = (text: string) => {
    if (!speechSynthesis) return

    setIsSpeaking(true)
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1.0
    utterance.volume = 0.8

    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    speechSynthesis.speak(utterance)
  }

  const stopSpeaking = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
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
        
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg p-3 mr-4">
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-xs text-muted-foreground">AI is thinking...</span>
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
                disabled={isProcessing}
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
              
              {isSpeaking && (
                <Button 
                  onClick={stopSpeaking}
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
            
            {isSpeaking && (
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Volume2 className="w-4 h-4 text-primary animate-pulse" />
                </div>
                <p className="text-xs text-muted-foreground">AI is speaking...</p>
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