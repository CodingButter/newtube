'use client'

// REVOLUTIONARY AI UI BUILDER COMPONENT
// Users describe their dream streaming platform, AI builds it in real-time

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Mic, MicOff, Send, Sparkles, Layout, MessageCircle, Trash2, Heart, X } from 'lucide-react'
import { aiUIBuilder, UIIntent, ConversationContext, UIGenerationResponse } from '@/lib/ai-ui-builder'
import { Panel } from '@/types'
import { PanelFactory } from '@/components/panels/PanelFactory'

interface AIUIBuilderProps {
  onPanelsGenerated?: (panels: Panel[]) => void
  initialPrompt?: string
  enableVoice?: boolean
}

interface ConversationMessage {
  type: 'user' | 'ai' | 'system'
  content: string
  timestamp: Date
  intents?: UIIntent[]
  panels?: Panel[]
}

export function AIUIBuilder({ 
  onPanelsGenerated, 
  initialPrompt = '',
  enableVoice = true 
}: AIUIBuilderProps) {
  const [messages, setMessages] = useState<ConversationMessage[]>([
    {
      type: 'ai',
      content: "Hi! I'm your AI UI builder. Describe your dream streaming platform and I'll build it for you in real-time! 🎬✨",
      timestamp: new Date()
    }
  ])
  
  const [currentInput, setCurrentInput] = useState(initialPrompt)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [generatedPanels, setGeneratedPanels] = useState<Panel[]>([])
  const [showPreview, setShowPreview] = useState(false)
  
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthesisRef = useRef<SpeechSynthesis | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (enableVoice && typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setCurrentInput(prev => prev + ' ' + transcript)
        setIsListening(false)
      }
      
      recognition.onerror = () => {
        setIsListening(false)
      }
      
      recognition.onend = () => {
        setIsListening(false)
      }
      
      recognitionRef.current = recognition
      synthesisRef.current = window.speechSynthesis
    }
  }, [enableVoice])

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Process initial prompt
  useEffect(() => {
    if (initialPrompt && !messages.some(m => m.content.includes(initialPrompt))) {
      handleSubmit()
    }
  }, [initialPrompt])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const speak = (text: string) => {
    if (synthesisRef.current && enableVoice) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      synthesisRef.current.speak(utterance)
    }
  }

  const handleSubmit = async () => {
    if (!currentInput.trim() || isGenerating) return

    const userMessage: ConversationMessage = {
      type: 'user',
      content: currentInput.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsGenerating(true)

    try {
      const context = aiUIBuilder.getContext()
      const response: UIGenerationResponse = await aiUIBuilder.parseDescription(
        currentInput.trim(),
        context
      )

      // Generate panels from intents
      const newPanels = aiUIBuilder.convertIntentsToPanels(
        response.components,
        { width: 1200, height: 800 }
      )

      // Update conversation context
      aiUIBuilder.updateConversation(
        currentInput.trim(),
        response.explanation,
        response.components
      )

      // Add AI response message
      const aiMessage: ConversationMessage = {
        type: 'ai',
        content: response.explanation,
        timestamp: new Date(),
        intents: response.components,
        panels: newPanels
      }

      setMessages(prev => [...prev, aiMessage])
      setGeneratedPanels(prev => [...prev, ...newPanels])

      // Notify parent component
      if (onPanelsGenerated && newPanels.length > 0) {
        onPanelsGenerated(newPanels)
      }

      // Speak the response if voice is enabled
      speak(response.explanation)

      // Add suggestions if any
      if (response.suggestions && response.suggestions.length > 0) {
        const suggestionsMessage: ConversationMessage = {
          type: 'system',
          content: `💡 Suggestions: ${response.suggestions.join(' • ')}`,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, suggestionsMessage])
      }

    } catch (error) {
      console.error('Failed to generate UI:', error)
      
      const errorMessage: ConversationMessage = {
        type: 'ai',
        content: "I'm having trouble understanding that request. Could you describe what you want more specifically? Try mentioning specific features like 'video player' or 'search bar'.",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsGenerating(false)
      setCurrentInput('')
    }
  }

  const handleQuickPrompt = (prompt: string) => {
    setCurrentInput(prompt)
    setTimeout(() => handleSubmit(), 100)
  }

  const provideFeedback = async (intent: UIIntent, feedback: 'good' | 'bad') => {
    await aiUIBuilder.learnFromInteraction(intent, feedback)
    
    const feedbackMessage: ConversationMessage = {
      type: 'system',
      content: `Thanks for the feedback! I'll ${feedback === 'good' ? 'remember what worked well' : 'learn from this for next time'}.`,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, feedbackMessage])
  }

  const clearConversation = () => {
    setMessages([
      {
        type: 'ai',
        content: "Hi! I'm your AI UI builder. Describe your dream streaming platform and I'll build it for you in real-time! 🎬✨",
        timestamp: new Date()
      }
    ])
    setGeneratedPanels([])
    aiUIBuilder.resetConversation()
  }

  const quickPrompts = [
    "Big video player with search on top",
    "My subscriptions on the left, trending on the right",
    "Create a layout for cooking videos",
    "I want to discover new music videos",
    "Build me a productivity-focused layout",
    "Show trending content prominently"
  ]

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="border-b bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI UI Builder
            </h2>
            <Badge variant="secondary" className="ml-2">
              Revolutionary
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowPreview(!showPreview)}
            >
              <Layout className="h-4 w-4 mr-1" />
              {showPreview ? 'Hide' : 'Show'} Preview
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearConversation}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 gap-4 p-4">
        {/* Conversation Panel */}
        <div className="flex-1 flex flex-col">
          {/* Quick Prompts */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">Quick ideas to get started:</p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickPrompt(prompt)}
                  className="text-xs"
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <Card className="flex-1 flex flex-col">
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : message.type === 'ai'
                        ? 'bg-white dark:bg-gray-800 border'
                        : 'bg-gray-100 dark:bg-gray-700 text-center'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    
                    {/* Show generated intents */}
                    {message.intents && message.intents.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs font-medium opacity-70">Generated Components:</p>
                        {message.intents.map((intent, i) => (
                          <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded p-2">
                            <div className="flex-1">
                              <span className="text-xs font-medium">{intent.component}</span>
                              <span className="text-xs opacity-70 ml-2">{intent.description}</span>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => provideFeedback(intent, 'good')}
                                className="h-6 w-6 p-0"
                              >
                                <Heart className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => provideFeedback(intent, 'bad')}
                                className="h-6 w-6 p-0"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="text-xs opacity-50 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {isGenerating && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 border rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                      <span className="text-sm">Building your UI...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Textarea
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    placeholder="Describe your dream streaming interface... (e.g., 'I want a big video player with my subscriptions on the right')"
                    className="min-h-[60px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmit()
                      }
                    }}
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  {enableVoice && (
                    <Button
                      size="sm"
                      variant={isListening ? "destructive" : "outline"}
                      onClick={isListening ? stopListening : startListening}
                      disabled={isGenerating}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  )}
                  
                  <Button
                    size="sm"
                    onClick={handleSubmit}
                    disabled={!currentInput.trim() || isGenerating}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Live Preview Panel */}
        {showPreview && (
          <div className="w-96">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-sm">Live Preview</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {generatedPanels.length} components generated
                </p>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto">
                {generatedPanels.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <Layout className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Start describing your UI to see it appear here!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {generatedPanels.map((panel, index) => (
                      <div
                        key={panel.id}
                        className="border rounded-lg p-2 bg-gray-50 dark:bg-gray-800"
                        style={{
                          minHeight: Math.min(panel.size.height / 4, 120),
                          opacity: 0.8
                        }}
                      >
                        <div className="text-xs font-medium mb-1">{panel.title}</div>
                        <div className="text-xs text-muted-foreground mb-2">
                          {panel.type} • {panel.size.width}x{panel.size.height}
                        </div>
                        
                        {/* Mini preview of the actual component */}
                        <div className="scale-50 origin-top-left pointer-events-none">
                          <PanelFactory
                            panel={panel}
                            onUpdate={() => {}}
                            onRemove={() => {}}
                            className="transform-gpu"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default AIUIBuilder