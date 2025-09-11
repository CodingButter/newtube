'use client';

import React, { useState, useEffect } from 'react';
import EnhancedVoiceInterface, { speakWithElevenLabs } from './enhanced-voice-interface';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, User, Loader2, Zap, Navigation } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  actions?: BrowserAction[];
}

interface BrowserAction {
  type: 'navigate' | 'click' | 'type' | 'select' | 'scroll' | 'wait';
  target?: string;
  value?: string;
  element?: string;
  ref?: string;
  url?: string;
  description?: string;
}

interface TourProgress {
  step: string;
  progress: number;
  description: string;
}

export default function EnhancedAITourGuide() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [tourProgress, setTourProgress] = useState<TourProgress>({
    step: 'welcome',
    progress: 0,
    description: 'Welcome to NEWTUBE!'
  });
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [browserActionsEnabled, setBrowserActionsEnabled] = useState(true);
  
  const router = useRouter();

  // Initialize tour on component mount
  useEffect(() => {
    initializeTour();
  }, []);

  const initializeTour = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/tour-guide/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preferredInterface: 'voice',
          personality: 'friendly',
          enableBrowserActions: true
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start tour');
      }

      const data = await response.json();
      setSessionId(data.sessionId);
      
      // Add welcome message
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.response.message,
        timestamp: Date.now()
      };
      
      setMessages([welcomeMessage]);
      setTourProgress({
        step: 'welcome',
        progress: data.response.progressUpdate || 5,
        description: 'Getting started with NEWTUBE'
      });

      // Speak the welcome message with ElevenLabs
      await speakWithElevenLabs(data.response.message);
      setIsSpeaking(true);
      
    } catch (error) {
      console.error('Error initializing tour:', error);
      // Enhanced fallback message
      const fallbackMessage = "Welcome to NEWTUBE! I'm your AI guide powered by ElevenLabs voice technology. I can help you navigate the platform, customize your layout, and discover amazing content. Try saying 'show me the dashboard' or 'add a search panel'!";
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: fallbackMessage,
        timestamp: Date.now()
      };
      setMessages([welcomeMessage]);
      await speakWithElevenLabs(fallbackMessage);
      setIsSpeaking(true);
    } finally {
      setIsLoading(false);
    }
  };

  const executeBrowserActions = async (actions: BrowserAction[]) => {
    if (!browserActionsEnabled || actions.length === 0) return;

    for (const action of actions) {
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Small delay between actions
        
        switch (action.type) {
          case 'navigate':
            if (action.url) {
              router.push(action.url);
            }
            break;
            
          case 'click':
            if (action.target) {
              const element = document.querySelector(action.target);
              if (element) {
                (element as HTMLElement).click();
              } else {
                console.warn(`Element not found for selector: ${action.target}`);
              }
            }
            break;
            
          case 'type':
            if (action.target && action.value) {
              const element = document.querySelector(action.target) as HTMLInputElement;
              if (element) {
                element.focus();
                element.value = action.value;
                element.dispatchEvent(new Event('input', { bubbles: true }));
                element.dispatchEvent(new Event('change', { bubbles: true }));
              }
            }
            break;
            
          case 'select':
            if (action.target && action.value) {
              const element = document.querySelector(action.target) as HTMLSelectElement;
              if (element) {
                element.value = action.value;
                element.dispatchEvent(new Event('change', { bubbles: true }));
              }
            }
            break;
        }
      } catch (error) {
        console.error('Error executing browser action:', error);
      }
    }
  };

  const handleUserInput = async (input: string) => {
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // First, analyze for browser commands
      let browserActions: BrowserAction[] = [];
      let browserResponse = '';
      
      if (browserActionsEnabled) {
        const browserApiResponse = await fetch('/api/ai/browsermcp/commands', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userMessage: input,
            currentContext: {
              currentPath: window.location.pathname,
              tourStep: tourProgress.step
            }
          }),
        });

        if (browserApiResponse.ok) {
          const browserData = await browserApiResponse.json();
          if (browserData.shouldExecute) {
            browserActions = browserData.actions;
            browserResponse = browserData.response;
          }
        }
      }

      // Get AI response from tour guide
      const response = await fetch('/api/ai/tour-guide/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionId || 'fallback-session',
          message: input,
          browserActions: browserActions,
          browserResponse: browserResponse
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      
      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response.message,
        timestamp: Date.now(),
        actions: browserActions
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Update progress if provided
      if (data.response.progressUpdate) {
        setTourProgress(prev => ({
          ...prev,
          progress: data.response.progressUpdate,
          step: data.response.nextStep || prev.step
        }));
      }

      // Execute browser actions before speaking
      if (browserActions.length > 0) {
        await executeBrowserActions(browserActions);
      }

      // Speak the AI response with ElevenLabs
      await speakWithElevenLabs(data.response.message);
      setIsSpeaking(true);

    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Enhanced fallback response
      const fallbackResponse = "I'm having trouble connecting right now, but I can still help! Try saying 'go to dashboard', 'add a panel', or 'search for videos'. What would you like to explore?";
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fallbackResponse,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      await speakWithElevenLabs(fallbackResponse);
      setIsSpeaking(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceStart = () => {
    // Stop any ongoing speech when user starts talking
    if ((window as any).enhancedVoiceInterface?.stopElevenLabsPlayback) {
      (window as any).enhancedVoiceInterface.stopElevenLabsPlayback();
    }
    setIsSpeaking(false);
  };

  const handleVoiceEnd = () => {
    // Voice input ended
  };

  const restartTour = () => {
    setMessages([]);
    setSessionId(null);
    setTourProgress({
      step: 'welcome',
      progress: 0,
      description: 'Welcome to NEWTUBE!'
    });
    initializeTour();
  };

  const quickCommands = [
    { text: "Show me the dashboard", action: () => handleUserInput("Show me the dashboard") },
    { text: "Add a search panel", action: () => handleUserInput("Add a search panel") },
    { text: "Search for tech videos", action: () => handleUserInput("Search for technology videos") },
    { text: "Make this bigger", action: () => handleUserInput("Make this panel bigger") },
    { text: "Tell me about features", action: () => handleUserInput("What are NEWTUBE's features?") },
    { text: "Save this layout", action: () => handleUserInput("Save this layout") }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-blue-600" />
            <span>NEWTUBE AI Tour Guide</span>
            <Badge variant="secondary" className="ml-2">
              ElevenLabs + BrowserMCP
            </Badge>
          </CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                Step: {tourProgress.step} ({tourProgress.progress}%)
              </Badge>
              <Button 
                onClick={() => setBrowserActionsEnabled(!browserActionsEnabled)} 
                variant="outline" 
                size="sm"
                className={browserActionsEnabled ? "bg-green-50" : "bg-red-50"}
              >
                <Navigation className="w-4 h-4 mr-1" />
                Browser Actions {browserActionsEnabled ? 'ON' : 'OFF'}
              </Button>
            </div>
            <Button onClick={restartTour} variant="outline" size="sm">
              Restart Tour
            </Button>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${tourProgress.progress}%` }}
            ></div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Chat Messages */}
          <div className="h-80 overflow-y-auto space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <Bot className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                )}
                <div
                  className={`max-w-sm p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.actions && message.actions.length > 0 && (
                    <div className="mt-2 text-xs opacity-70">
                      <Zap className="w-3 h-3 inline mr-1" />
                      {message.actions.length} action(s) executed
                    </div>
                  )}
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                {message.role === 'user' && (
                  <User className="w-6 h-6 text-gray-600 mt-1 flex-shrink-0" />
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start space-x-3">
                <Bot className="w-6 h-6 text-blue-600 mt-1" />
                <div className="bg-white border border-gray-200 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Voice Interface */}
          <EnhancedVoiceInterface
            onUserInput={handleUserInput}
            onVoiceStart={handleVoiceStart}
            onVoiceEnd={handleVoiceEnd}
            isSpeaking={isSpeaking}
            disabled={isLoading}
          />

          {/* Quick Commands */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Quick Voice Commands:</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {quickCommands.map((cmd, index) => (
                <Button
                  key={index}
                  onClick={cmd.action}
                  variant="outline"
                  size="sm"
                  disabled={isLoading}
                  className="text-xs h-8"
                >
                  {cmd.text}
                </Button>
              ))}
            </div>
          </div>

          <div className="text-xs text-gray-500 text-center">
            <p>💡 <strong>Voice-First Experience:</strong> Say commands like "go to dashboard", "add a search panel", or "make this bigger"</p>
            <p className="mt-1">🎵 <strong>Powered by:</strong> ElevenLabs TTS • OpenAI ChatGPT • BrowserMCP Navigation</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}