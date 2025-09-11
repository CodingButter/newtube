'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Mic, Send, Sparkles, ArrowLeft, Volume2, Settings } from 'lucide-react'
import Link from 'next/link'
import { AIUIGenerator } from '@/components/ai-builder/AIUIGenerator'
import { AIConversation } from './components/AIConversation'
import { VoiceSettings } from '@/components/VoiceSettings'
import { AudioVisualizer } from '@/components/AudioVisualizer'
import { uiGenerator } from '@/lib/ui-generator'
import { useVoiceStore } from '@/stores/voiceStore'

interface Message {
  id: string
  role: 'user' | 'ai'
  content: string
  timestamp: Date
  uiComponents?: React.ReactNode
}

export default function AICanvasPage() {
  const [interfaceType, setInterfaceType] = useState<'voice' | 'keyboard' | null>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: "Hello! I'm your AI assistant. Tell me what kind of streaming experience you'd like to create, and I'll build it for you in real-time. What's your vision?",
      timestamp: new Date()
    }
  ])
  const [generatedComponents, setGeneratedComponents] = useState<React.ReactNode[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [showGlobalVoiceSettings, setShowGlobalVoiceSettings] = useState(false)
  
  // Use voice store for TTS state
  const { isPlaying, isLoading: isTTSLoading } = useVoiceStore()

  useEffect(() => {
    // Get interface type from URL params
    const urlParams = new URLSearchParams(window.location.search)
    const type = urlParams.get('interface') as 'voice' | 'keyboard' | null
    if (type) {
      setInterfaceType(type)
    }
  }, [])

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setIsProcessing(true)

    // Generate AI response and UI components using the generator
    try {
      const result = await uiGenerator.generateComponents(message, {
        existingComponents: [],
        conversationHistory: messages.map(m => ({ role: m.role, content: m.content }))
      })
      
      if (result.success && result.components.length > 0) {
        // Generate UI components
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          content: result.response,
          timestamp: new Date(),
          uiComponents: (
            <AIUIGenerator 
              components={result.components}
              onComponentGenerated={(component) => {
                setGeneratedComponents(prev => [...prev, component])
              }}
            />
          )
        }
        setMessages(prev => [...prev, aiMessage])
      } else {
        // Just add text response
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          content: result.response,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiMessage])
      }

    } catch (error) {
      console.error('Error generating AI response:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: "I apologize, but I'm having trouble generating your UI right now. Please try again.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="h-screen w-full bg-background flex">
      {/* Left Side - Generated UI Canvas */}
      <div className="flex-1 bg-muted/20 border-r border-border relative overflow-hidden">
        {/* Canvas Header */}
        <div className="absolute top-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-b border-border p-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <h1 className="text-lg font-semibold">AI Canvas</h1>
              
              {/* Voice Status Indicator */}
              {interfaceType === 'voice' && (isPlaying || isTTSLoading) && (
                <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                  <Volume2 className="w-3 h-3 text-primary animate-pulse" />
                  <span className="text-xs text-primary font-medium">
                    {isTTSLoading ? 'Preparing voice...' : 'AI speaking'}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {interfaceType === 'voice' && (
                <Button
                  onClick={() => setShowGlobalVoiceSettings(!showGlobalVoiceSettings)}
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Voice Settings
                </Button>
              )}
              
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {generatedComponents.length} component{generatedComponents.length !== 1 ? 's' : ''} created
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Canvas Content */}
        <div className="pt-20 h-full overflow-auto p-6">
          {generatedComponents.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-6 max-w-md">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-primary animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">Your Canvas Awaits</h2>
                  <p className="text-muted-foreground text-lg">
                    Start a conversation and watch as I build your perfect streaming interface in real-time.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4 space-y-2">
                  <p className="text-sm font-medium">Try saying:</p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>"Show me a big video player"</p>
                    <p>"Add a search bar for tech videos"</p>
                    <p>"I want my subscriptions on the side"</p>
                    <p>"Create a trending videos feed"</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Your Custom Interface</h2>
                <p className="text-muted-foreground">Built through conversation with AI</p>
              </div>
              {generatedComponents.map((component, index) => (
                <div key={index} className="animate-in fade-in duration-500 transform hover:scale-[1.02] transition-transform">
                  {component}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Side - AI Conversation */}
      <div className="w-96 bg-card border-l border-border flex flex-col">
        {/* Global Voice Settings Panel */}
        {showGlobalVoiceSettings && interfaceType === 'voice' && (
          <div className="border-b border-border bg-muted/20">
            <VoiceSettings className="m-4" />
          </div>
        )}

        {/* Global Audio Visualizer */}
        {interfaceType === 'voice' && (isPlaying || isTTSLoading) && !showGlobalVoiceSettings && (
          <div className="border-b border-border bg-card p-4">
            <AudioVisualizer 
              size="md" 
              variant="wave" 
              showControls={true}
              className="shadow-none border-0"
            />
          </div>
        )}

        {/* AI Conversation Component */}
        <AIConversation
          interfaceType={interfaceType || 'keyboard'}
          onMessage={handleSendMessage}
          messages={messages}
          isProcessing={isProcessing}
          showHeader={false}
          className="border-0 shadow-none"
        />
      </div>
    </div>
  )
}