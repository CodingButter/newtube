'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mic, Keyboard, Sparkles, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const router = useRouter()

  const handleInterfaceSelection = async (type: 'voice' | 'keyboard') => {
    setIsTransitioning(true)
    
    // Add a smooth transition delay
    setTimeout(() => {
      router.push(`/ai-canvas?interface=${type}`)
    }, 500)
  }

  return (
    <div className={`h-screen w-full flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden transition-all duration-500 ${
      isTransitioning ? 'scale-110 opacity-50' : 'scale-100 opacity-100'
    }`}>
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_0%,rgba(147,51,234,0.1)_25%,transparent_50%,rgba(59,130,246,0.1)_75%,transparent_100%)]" />
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.3}s`
            }}
          />
        ))}
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center space-y-12 max-w-4xl px-8">
        {/* Enhanced Logo/Title */}
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Sparkles className="w-12 h-12 text-primary animate-pulse" />
            <h1 className="text-6xl md:text-8xl font-bold text-foreground tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              NEWTUBE
            </h1>
            <Sparkles className="w-12 h-12 text-purple-600 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <div className="space-y-4">
            <p className="text-2xl md:text-3xl font-semibold text-foreground leading-relaxed">
              Whatever you can dream, <br />
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                you can create
              </span>
            </p>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The streaming platform of your imagination, built through conversation
            </p>
          </div>
        </div>

        {/* Revolutionary Interface Selection */}
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-xl font-medium text-foreground">
              Choose your creative interface
            </p>
            <p className="text-muted-foreground">
              Start building your perfect streaming experience
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            {/* Voice Button - Enhanced */}
            <Button
              onClick={() => handleInterfaceSelection('voice')}
              disabled={isTransitioning}
              className="group w-64 h-32 text-2xl bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-primary/20 hover:border-primary/40 transform hover:scale-105"
              size="lg"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <Mic className="w-12 h-12 group-hover:scale-125 transition-all duration-300" />
                  <div className="absolute -inset-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 animate-ping" />
                </div>
                <div className="text-center">
                  <div className="font-bold">Voice</div>
                  <div className="text-sm font-normal opacity-90">Speak your vision</div>
                </div>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
            </Button>

            {/* Keyboard Button - Enhanced */}
            <Button
              onClick={() => handleInterfaceSelection('keyboard')}
              disabled={isTransitioning}
              className="group w-64 h-32 text-2xl bg-gradient-to-br from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-purple-500/20 hover:border-purple-400/40 transform hover:scale-105"
              size="lg"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <Keyboard className="w-12 h-12 group-hover:scale-125 transition-all duration-300" />
                  <div className="absolute -inset-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 animate-ping" />
                </div>
                <div className="text-center">
                  <div className="font-bold">Keyboard</div>
                  <div className="text-sm font-normal opacity-90">Type your ideas</div>
                </div>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
            </Button>
          </div>
        </div>

        {/* Enhanced promises */}
        <div className="pt-12 space-y-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Real-time UI creation</span>
            </div>
            <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>No pre-built templates</span>
            </div>
            <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-green-600" />
              <span>Pure conversation</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground/80 font-medium">
            No sign-ups, no forms, no limits – just your imagination
          </p>
        </div>
      </div>

      {/* Loading overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-primary animate-spin" />
              <div className="text-xl font-semibold">Preparing your AI canvas...</div>
            </div>
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}