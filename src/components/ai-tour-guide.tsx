'use client';

import React, { useState, useEffect } from 'react';
import VoiceInterface, { speakText } from './voice-interface';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, User, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface TourProgress {
  step: string;
  progress: number;
  description: string;
}

export default function AITourGuide() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [tourProgress, setTourProgress] = useState<TourProgress>({
    step: 'welcome',
    progress: 0,
    description: 'Welcome to NEWTUBE!'
  });
  const [sessionId, setSessionId] = useState<string | null>(null);

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
          personality: 'friendly'
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

      // Speak the welcome message
      speakText(data.response.message);
      setIsSpeaking(true);
      
    } catch (error) {
      console.error('Error initializing tour:', error);
      // Fallback message if API fails
      const fallbackMessage = "Welcome to NEWTUBE! I'm your AI guide. I'll help you discover the amazing features of our streaming platform. Let's get started!";
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: fallbackMessage,
        timestamp: Date.now()
      };
      setMessages([welcomeMessage]);
      speakText(fallbackMessage);
      setIsSpeaking(true);
    } finally {
      setIsLoading(false);
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
      const response = await fetch('/api/ai/tour-guide/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionId || 'fallback-session',
          message: input
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
        timestamp: Date.now()
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

      // Speak the AI response
      speakText(data.response.message);
      setIsSpeaking(true);

    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Fallback response
      const fallbackResponse = "I'm having trouble connecting right now, but I'm here to help! Could you try asking your question again?";
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fallbackResponse,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      speakText(fallbackResponse);
      setIsSpeaking(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceStart = () => {
    // Stop any ongoing speech when user starts talking
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const handleVoiceEnd = () => {
    // Voice input ended
  };

  // Handle speech synthesis events
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const handleSpeechEnd = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.addEventListener('end', handleSpeechEnd);
      return () => {
        window.speechSynthesis.removeEventListener('end', handleSpeechEnd);
      };
    }
  }, []);

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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-blue-600" />
            <span>NEWTUBE AI Tour Guide</span>
          </CardTitle>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-sm">
              Step: {tourProgress.step} ({tourProgress.progress}%)
            </Badge>
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
          <div className="h-64 overflow-y-auto space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
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
                  className={`max-w-xs p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
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

          {/* Voice Interface */}
          <VoiceInterface
            onUserInput={handleUserInput}
            onVoiceStart={handleVoiceStart}
            onVoiceEnd={handleVoiceEnd}
            isSpeaking={isSpeaking}
            disabled={isLoading}
          />

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => handleUserInput("Tell me about NEWTUBE features")}
              variant="outline"
              size="sm"
              disabled={isLoading}
            >
              What are the features?
            </Button>
            <Button
              onClick={() => handleUserInput("How do I create a custom layout?")}
              variant="outline"
              size="sm"
              disabled={isLoading}
            >
              How to customize?
            </Button>
            <Button
              onClick={() => handleUserInput("I'm interested in technology videos")}
              variant="outline"
              size="sm"
              disabled={isLoading}
            >
              I like tech videos
            </Button>
            <Button
              onClick={() => handleUserInput("Show me the main video player")}
              variant="outline"
              size="sm"
              disabled={isLoading}
            >
              Show video player
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            <p>💡 Try saying: "Tell me about NEWTUBE" or "How do I get started?"</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}