'use client'

// REVOLUTIONARY AI UI BUILDER DEMO PAGE
// Experience the future of UI design - imagine it, speak it, see it built!

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Sparkles, 
  Mic, 
  MessageCircle, 
  Layout, 
  Zap, 
  Brain,
  Wand2,
  Video,
  Search,
  Heart
} from 'lucide-react'
import { AIUIBuilder } from '@/components/ai-ui-builder'
import { VoiceUIBuilder } from '@/components/voice-ui-builder'
import { Panel } from '@/types'
import { PanelFactory } from '@/components/panels/PanelFactory'

export default function UIBuilderPage() {
  const [generatedPanels, setGeneratedPanels] = useState<Panel[]>([])
  const [activeDemo, setActiveDemo] = useState<'voice' | 'text'>('voice')
  const [showResults, setShowResults] = useState(false)

  const handlePanelsGenerated = (panels: Panel[]) => {
    setGeneratedPanels(prev => [...prev, ...panels])
    setShowResults(true)
  }

  const clearResults = () => {
    setGeneratedPanels([])
    setShowResults(false)
  }

  const demoExamples = [
    {
      input: "I want a big video player with my subscriptions on the right",
      description: "Creates a main video player with subscription sidebar"
    },
    {
      input: "Show me trending cooking videos and a search bar for recipes",
      description: "Builds a specialized cooking video discovery interface"
    },
    {
      input: "Build me a music streaming layout with playlists and discovery",
      description: "Generates a music-focused streaming platform design"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      {/* Hero Section */}
      <div className="border-b bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-purple-600" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI UI Builder
              </h1>
              <Badge variant="secondary" className="ml-2 animate-pulse">
                Revolutionary Technology
              </Badge>
            </div>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Imagine your perfect streaming platform. Describe it in natural language or just speak your dreams. 
              Watch as AI builds it in real-time, exactly as you envisioned.
            </p>
            
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Brain className="h-4 w-4 text-blue-600" />
                <span>GPT-4 Powered</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mic className="h-4 w-4 text-green-600" />
                <span>Voice Enabled</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4 text-yellow-600" />
                <span>Real-time Generation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Builder Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5 text-purple-600" />
                    Build Your Dream Interface
                  </CardTitle>
                  
                  <Tabs value={activeDemo} onValueChange={(v) => setActiveDemo(v as 'voice' | 'text')}>
                    <TabsList>
                      <TabsTrigger value="voice" className="flex items-center gap-2">
                        <Mic className="h-4 w-4" />
                        Voice
                      </TabsTrigger>
                      <TabsTrigger value="text" className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        Text
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              
              <CardContent className="h-[500px] p-0">
                {activeDemo === 'voice' ? (
                  <VoiceUIBuilder onPanelsGenerated={handlePanelsGenerated} />
                ) : (
                  <AIUIBuilder onPanelsGenerated={handlePanelsGenerated} />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Examples & Results */}
          <div className="space-y-6">
            {/* Example Prompts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">💡 Try These Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {demoExamples.map((example, index) => (
                  <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <p className="text-sm font-medium mb-1">"{example.input}"</p>
                    <p className="text-xs text-muted-foreground">{example.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Features List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🚀 Revolutionary Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Brain className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Natural Language Processing</p>
                    <p className="text-xs text-muted-foreground">Understands complex UI descriptions</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mic className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Voice-First Interface</p>
                    <p className="text-xs text-muted-foreground">Speak your ideas, see them built</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Real-time Generation</p>
                    <p className="text-xs text-muted-foreground">Instant UI component creation</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Learning System</p>
                    <p className="text-xs text-muted-foreground">Improves with your feedback</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Generated Components */}
            {showResults && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Layout className="h-5 w-5 text-purple-600" />
                      Generated Components
                    </CardTitle>
                    <Button size="sm" variant="outline" onClick={clearResults}>
                      Clear
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {generatedPanels.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No components generated yet
                    </p>
                  ) : (
                    generatedPanels.map((panel, index) => (
                      <div key={panel.id} className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{panel.title}</span>
                          <Badge variant="secondary" className="text-xs">
                            {panel.type}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>Size: {panel.size.width}x{panel.size.height}</p>
                          <p>Position: ({panel.position.x}, {panel.position.y})</p>
                          {panel.config.aiGenerated && (
                            <p className="text-blue-600">✨ AI Generated</p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Live Preview Section */}
        {generatedPanels.length > 0 && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-purple-600" />
                  Live Preview - Your Generated Interface
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  This is how your described interface looks in real-time
                </p>
              </CardHeader>
              <CardContent>
                <div 
                  className="relative bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 overflow-hidden"
                  style={{ minHeight: '400px' }}
                >
                  {generatedPanels.map((panel) => (
                    <div
                      key={panel.id}
                      className="absolute border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded shadow-sm"
                      style={{
                        left: `${(panel.position.x / 1200) * 100}%`,
                        top: `${(panel.position.y / 800) * 100}%`,
                        width: `${Math.min((panel.size.width / 1200) * 100, 90)}%`,
                        height: `${Math.min((panel.size.height / 800) * 100, 90)}%`,
                        transform: 'scale(0.8)',
                        transformOrigin: 'top left'
                      }}
                    >
                      <PanelFactory
                        panel={panel}
                        onUpdate={() => {}}
                        onRemove={() => {}}
                      />
                    </div>
                  ))}
                  
                  {generatedPanels.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <Layout className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Your generated components will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}