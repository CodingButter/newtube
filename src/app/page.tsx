'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mic, Keyboard } from 'lucide-react'

interface AIConversationProps {
  interfaceType: 'voice' | 'keyboard'
  onClose: () => void
}

function AIConversation({ interfaceType, onClose }: AIConversationProps) {
  const [isMinimized, setIsMinimized] = useState(false)

  return (
    <div className={`fixed transition-all duration-500 ease-in-out z-50 ${
      isMinimized 
        ? 'bottom-4 right-4 w-80 h-16' 
        : 'inset-0 bg-background/95 backdrop-blur-sm'
    }`}>
      <div className={`${
        isMinimized 
          ? 'bg-primary text-primary-foreground rounded-lg shadow-lg p-4 flex items-center justify-between'
          : 'h-full flex items-center justify-center p-8'
      }`}>
        {isMinimized ? (
          <>
            <div className="flex items-center gap-2">
              {interfaceType === 'voice' ? <Mic className="w-4 h-4" /> : <Keyboard className="w-4 h-4" />}
              <span className="text-sm font-medium">AI Assistant</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              Expand
            </Button>
          </>
        ) : (
          <div className="w-full max-w-2xl bg-card border border-border rounded-lg p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {interfaceType === 'voice' ? (
                  <Mic className="w-6 h-6 text-primary" />
                ) : (
                  <Keyboard className="w-6 h-6 text-primary" />
                )}
                <h2 className="text-xl font-semibold">Welcome to NEWTUBE</h2>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMinimized(true)}
                >
                  Minimize
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                >
                  ×
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">AI Assistant:</p>
                <p className="text-foreground">
                  {interfaceType === 'voice' 
                    ? "Hello! I'm your AI guide. I'll help you create the perfect streaming experience through conversation. Let's start by telling me what kind of content you enjoy watching."
                    : "Welcome! I'm here to help you build your ideal streaming dashboard. Type your preferences and I'll guide you through creating a personalized video experience."
                  }
                </p>
              </div>
              
              <div className="space-y-3">
                {interfaceType === 'voice' ? (
                  <div className="flex flex-col gap-3">
                    <Button 
                      className="w-full py-6 text-lg" 
                      size="lg"
                      onClick={() => window.location.href = '/dashboard'}
                    >
                      <Mic className="w-5 h-5 mr-2" />
                      Start Voice Conversation
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Click to start talking. I'll listen and respond naturally.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <textarea
                      placeholder="Tell me about your video preferences, favorite topics, or what you'd like to see..."
                      className="w-full h-24 p-3 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => window.location.href = '/dashboard'}
                    >
                      Start Building My Experience
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  I'll help you create panels, discover content, and build your perfect streaming layout.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function HomePage() {
  const [selectedInterface, setSelectedInterface] = useState<'voice' | 'keyboard' | null>(null)

  const handleInterfaceSelection = (type: 'voice' | 'keyboard') => {
    setSelectedInterface(type)
  }

  const handleCloseConversation = () => {
    setSelectedInterface(null)
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(59,130,246,0.05)_50%,transparent_100%)]" />
      
      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Logo/Title */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold text-foreground tracking-tight">
            NEWTUBE
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Create your perfect streaming experience through conversation
          </p>
        </div>

        {/* Revolutionary Interface Selection */}
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground">
            How would you like to begin?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Voice Button */}
            <Button
              onClick={() => handleInterfaceSelection('voice')}
              className="w-48 h-24 text-2xl bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 group"
              size="lg"
            >
              <div className="flex flex-col items-center gap-2">
                <Mic className="w-8 h-8 group-hover:scale-110 transition-transform duration-200" />
                <span>Voice</span>
              </div>
            </Button>

            {/* Keyboard Button */}
            <Button
              onClick={() => handleInterfaceSelection('keyboard')}
              className="w-48 h-24 text-2xl bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group"
              size="lg"
            >
              <div className="flex flex-col items-center gap-2">
                <Keyboard className="w-8 h-8 group-hover:scale-110 transition-transform duration-200" />
                <span>Keyboard</span>
              </div>
            </Button>
          </div>
        </div>

        {/* Subtle hint */}
        <div className="pt-8">
          <p className="text-sm text-muted-foreground/70">
            No sign-ups, no forms – just conversation
          </p>
        </div>
      </div>

      {/* AI Conversation Interface */}
      {selectedInterface && (
        <AIConversation
          interfaceType={selectedInterface}
          onClose={handleCloseConversation}
        />
      )}
    </div>
  )
}
