'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Bot, 
  Eye, 
  MousePointer2, 
  Type, 
  Navigation, 
  Mic,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Monitor,
  MessageSquare,
  Loader2
} from 'lucide-react';
import VoiceInterface, { speakText } from './voice-interface';

interface BrowserAction {
  id: string;
  type: 'navigate' | 'click' | 'type' | 'select' | 'screenshot' | 'wait';
  description: string;
  element?: string;
  value?: string;
  timestamp: number;
  status: 'pending' | 'executing' | 'completed' | 'error';
  result?: string;
}

interface AICommand {
  id: string;
  input: string;
  interpretation: string;
  actions: BrowserAction[];
  timestamp: number;
}

interface NavigationSession {
  sessionId: string;
  goal: string;
  progress: number;
  currentStep: string;
  commands: AICommand[];
  isActive: boolean;
}

export default function AINavigator() {
  const [session, setSession] = useState<NavigationSession | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [highlightedElement, setHighlightedElement] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<BrowserAction | null>(null);
  const [demoProgress, setDemoProgress] = useState(0);
  const [transcript, setTranscript] = useState('');
  
  const actionsQueueRef = useRef<BrowserAction[]>([]);
  const processingRef = useRef(false);

  useEffect(() => {
    // Initialize demo session
    initializeDemoSession();
  }, []);

  const initializeDemoSession = () => {
    const demoSession: NavigationSession = {
      sessionId: `demo-${Date.now()}`,
      goal: 'Build the perfect streaming platform through AI automation',
      progress: 0,
      currentStep: 'Waiting for voice command',
      commands: [],
      isActive: true
    };
    setSession(demoSession);
  };

  const handleVoiceCommand = async (voiceInput: string) => {
    if (!session || isProcessing) return;

    setTranscript(voiceInput);
    setIsProcessing(true);

    try {
      // Interpret the voice command and generate browser actions
      const interpretation = await interpretVoiceCommand(voiceInput);
      
      const command: AICommand = {
        id: `cmd-${Date.now()}`,
        input: voiceInput,
        interpretation: interpretation.description,
        actions: interpretation.actions,
        timestamp: Date.now()
      };

      // Update session with new command
      setSession(prev => prev ? {
        ...prev,
        commands: [...prev.commands, command],
        currentStep: interpretation.description
      } : null);

      // Speak the interpretation
      await speakText(`I understand: ${interpretation.description}. Let me show you how to ${interpretation.description.toLowerCase()}.`);
      
      // Queue and execute the browser actions
      actionsQueueRef.current = [...interpretation.actions];
      await processActionQueue();

    } catch (error) {
      console.error('Error processing voice command:', error);
      await speakText('I had trouble understanding that command. Could you try again?');
    } finally {
      setIsProcessing(false);
    }
  };

  const interpretVoiceCommand = async (input: string): Promise<{
    description: string;
    actions: BrowserAction[];
  }> => {
    // This would normally call your ChatGPT/AI backend
    // For demo purposes, we'll simulate intelligent interpretation
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('navigate') || lowerInput.includes('go to')) {
      return {
        description: 'Navigate to NEWTUBE dashboard',
        actions: [
          {
            id: 'nav-1',
            type: 'navigate',
            description: 'Navigating to NEWTUBE dashboard',
            value: '/dashboard',
            timestamp: Date.now(),
            status: 'pending'
          },
          {
            id: 'wait-1',
            type: 'wait',
            description: 'Waiting for page to load',
            value: '2',
            timestamp: Date.now(),
            status: 'pending'
          },
          {
            id: 'screenshot-1',
            type: 'screenshot',
            description: 'Taking screenshot of dashboard',
            timestamp: Date.now(),
            status: 'pending'
          }
        ]
      };
    }
    
    if (lowerInput.includes('search') || lowerInput.includes('find')) {
      return {
        description: 'Search for videos',
        actions: [
          {
            id: 'click-1',
            type: 'click',
            description: 'Clicking on search panel',
            element: '[data-panel="search"]',
            timestamp: Date.now(),
            status: 'pending'
          },
          {
            id: 'type-1',
            type: 'type',
            description: 'Typing search query',
            element: 'input[placeholder*="search"]',
            value: 'artificial intelligence',
            timestamp: Date.now(),
            status: 'pending'
          },
          {
            id: 'screenshot-2',
            type: 'screenshot',
            description: 'Showing search results',
            timestamp: Date.now(),
            status: 'pending'
          }
        ]
      };
    }
    
    if (lowerInput.includes('layout') || lowerInput.includes('organize')) {
      return {
        description: 'Customize panel layout',
        actions: [
          {
            id: 'click-2',
            type: 'click',
            description: 'Opening layout customization',
            element: '[data-testid="layout-controls"]',
            timestamp: Date.now(),
            status: 'pending'
          },
          {
            id: 'wait-2',
            type: 'wait',
            description: 'Waiting for layout controls',
            value: '1',
            timestamp: Date.now(),
            status: 'pending'
          },
          {
            id: 'screenshot-3',
            type: 'screenshot',
            description: 'Showing customizable layout',
            timestamp: Date.now(),
            status: 'pending'
          }
        ]
      };
    }

    // Default action for unrecognized commands
    return {
      description: 'Show NEWTUBE features',
      actions: [
        {
          id: 'demo-1',
          type: 'screenshot',
          description: 'Taking overview screenshot',
          timestamp: Date.now(),
          status: 'pending'
        }
      ]
    };
  };

  const processActionQueue = async () => {
    if (processingRef.current || actionsQueueRef.current.length === 0) return;
    
    processingRef.current = true;
    
    while (actionsQueueRef.current.length > 0) {
      const action = actionsQueueRef.current.shift()!;
      setCurrentAction(action);
      
      // Update action status to executing
      updateActionStatus(action.id, 'executing');
      
      try {
        // Highlight element if applicable
        if (action.element) {
          setHighlightedElement(action.element);
          await delay(500); // Show highlight
        }
        
        // Execute the browser action
        const result = await executeBrowserAction(action);
        
        // Update action status to completed
        updateActionStatus(action.id, 'completed', result);
        
        // Update progress
        const progress = Math.min(demoProgress + 20, 100);
        setDemoProgress(progress);
        
        // Speak progress update
        await speakText(action.description);
        
        // Delay between actions for better UX
        await delay(1000);
        
      } catch (error) {
        console.error('Error executing action:', error);
        updateActionStatus(action.id, 'error', error instanceof Error ? error.message : 'Unknown error');
        await speakText(`Error: ${action.description} failed.`);
      }
    }
    
    setCurrentAction(null);
    setHighlightedElement(null);
    processingRef.current = false;
    
    // Session completion
    if (session) {
      setSession(prev => prev ? {
        ...prev,
        progress: demoProgress,
        currentStep: 'Demo completed! Try another command.'
      } : null);
      
      await speakText('Perfect! I\'ve demonstrated how AI can automate building your ideal streaming experience. What would you like to explore next?');
    }
  };

  const executeBrowserAction = async (action: BrowserAction): Promise<string> => {
    try {
      // Call the backend API which will execute BrowserMCP tools
      const response = await fetch('/api/ai/browser-navigator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          sessionId: session?.sessionId
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        return data.result;
      } else {
        throw new Error(data.error || 'Action failed');
      }
    } catch (error) {
      console.error('Error executing browser action:', error);
      // Fallback to simulated behavior for demo
      switch (action.type) {
        case 'navigate':
          return `Navigated to ${action.value}`;
        case 'click':
          return `Clicked ${action.element}`;
        case 'type':
          return `Typed "${action.value}"`;
        case 'screenshot':
          return 'Screenshot captured';
        case 'wait':
          const waitTime = parseInt(action.value || '1') * 1000;
          await delay(waitTime);
          return `Waited ${action.value} seconds`;
        default:
          return 'Action completed';
      }
    }
  };

  const updateActionStatus = (actionId: string, status: BrowserAction['status'], result?: string) => {
    setSession(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        commands: prev.commands.map(cmd => ({
          ...cmd,
          actions: cmd.actions.map(action => 
            action.id === actionId 
              ? { ...action, status, result }
              : action
          )
        }))
      };
    });
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleQuickDemo = async (demoType: string) => {
    const demoCommands = {
      'navigation': 'Navigate to the dashboard and show me the panels',
      'search': 'Search for artificial intelligence videos',
      'layout': 'Customize the layout and organize panels',
      'features': 'Show me all the amazing NEWTUBE features'
    };
    
    const command = demoCommands[demoType as keyof typeof demoCommands];
    if (command) {
      await handleVoiceCommand(command);
    }
  };

  const resetDemo = () => {
    setSession(null);
    setCurrentAction(null);
    setHighlightedElement(null);
    setDemoProgress(0);
    setTranscript('');
    actionsQueueRef.current = [];
    processingRef.current = false;
    initializeDemoSession();
    speakText('Demo reset! Ready for your next command.');
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <Bot className="w-8 h-8 text-blue-600" />
            <span>AI Navigation Controller</span>
            <Badge variant="secondary" className="ml-auto">
              BrowserMCP Integration
            </Badge>
          </CardTitle>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Goal: {session.goal}</p>
                <p className="text-xs text-gray-500">Current: {session.currentStep}</p>
              </div>
              <Button onClick={resetDemo} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Demo
              </Button>
            </div>
            <Progress value={demoProgress} className="w-full" />
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voice Control Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mic className="w-5 h-5" />
              <span>Voice Commands</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <VoiceInterface
              onUserInput={handleVoiceCommand}
              onVoiceStart={() => setIsRecording(true)}
              onVoiceEnd={() => setIsRecording(false)}
              isListening={isRecording}
              isSpeaking={isSpeaking}
              disabled={isProcessing}
            />
            
            {transcript && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm"><strong>Last Command:</strong> {transcript}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={() => handleQuickDemo('navigation')}
                variant="outline" 
                size="sm"
                disabled={isProcessing}
              >
                <Navigation className="w-4 h-4 mr-2" />
                Navigate
              </Button>
              <Button 
                onClick={() => handleQuickDemo('search')}
                variant="outline" 
                size="sm"
                disabled={isProcessing}
              >
                <Eye className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button 
                onClick={() => handleQuickDemo('layout')}
                variant="outline" 
                size="sm"
                disabled={isProcessing}
              >
                <Monitor className="w-4 h-4 mr-2" />
                Layout
              </Button>
              <Button 
                onClick={() => handleQuickDemo('features')}
                variant="outline" 
                size="sm"
                disabled={isProcessing}
              >
                <Zap className="w-4 h-4 mr-2" />
                Features
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Action Display */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Live Action Preview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentAction ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    {currentAction.type === 'navigate' && <Navigation className="w-4 h-4 text-blue-600" />}
                    {currentAction.type === 'click' && <MousePointer2 className="w-4 h-4 text-blue-600" />}
                    {currentAction.type === 'type' && <Type className="w-4 h-4 text-blue-600" />}
                    {currentAction.type === 'screenshot' && <Monitor className="w-4 h-4 text-blue-600" />}
                    {currentAction.type === 'wait' && <Pause className="w-4 h-4 text-blue-600" />}
                  </div>
                  <div>
                    <p className="font-medium">{currentAction.description}</p>
                    <p className="text-xs text-gray-500">
                      Status: {currentAction.status}
                    </p>
                  </div>
                </div>
                
                {currentAction.element && (
                  <div className="p-2 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-xs">
                      <strong>Target:</strong> {currentAction.element}
                    </p>
                  </div>
                )}
                
                {currentAction.value && (
                  <div className="p-2 bg-green-50 border border-green-200 rounded">
                    <p className="text-xs">
                      <strong>Value:</strong> {currentAction.value}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Waiting for voice command...</p>
                <p className="text-xs mt-1">
                  Try saying: "Navigate to dashboard" or "Search for videos"
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Command History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="w-5 h-5" />
            <span>Command History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {session.commands.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No commands executed yet. Use voice or click quick demo buttons!
              </p>
            ) : (
              session.commands.map((command) => (
                <div key={command.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{command.input}</p>
                      <p className="text-sm text-gray-600">{command.interpretation}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(command.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {command.actions.map((action) => (
                      <div key={action.id} className="flex items-center space-x-3 text-sm">
                        <div className={`w-3 h-3 rounded-full ${
                          action.status === 'completed' ? 'bg-green-500' :
                          action.status === 'executing' ? 'bg-blue-500 animate-pulse' :
                          action.status === 'error' ? 'bg-red-500' :
                          'bg-gray-300'
                        }`} />
                        <span>{action.description}</span>
                        {action.result && (
                          <span className="text-xs text-gray-500">
                            → {action.result}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Highlighted Element Overlay */}
      {highlightedElement && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 bg-blue-500 bg-opacity-20 animate-pulse" />
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
            <p className="text-sm">AI is interacting with: {highlightedElement}</p>
          </div>
        </div>
      )}
    </div>
  );
}