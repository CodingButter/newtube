/**
 * NEWTUBE AI Tour Guide Service
 * Revolutionary conversational navigation system that guides users step-by-step through NEWTUBE
 * Transforms traditional UI into conversational experience
 */

import { Pool } from 'pg';
import { Redis } from 'ioredis';

export interface TourGuideConfig {
  openaiApiKey?: string;
  geminiApiKey?: string;
  groqApiKey?: string;
  elevenLabsApiKey?: string;
  elevenLabsVoiceId?: string;
  redisClient: Redis;
  pgPool: Pool;
  defaultProvider: 'openai' | 'gemini' | 'groq';
  conversationTimeout: number; // milliseconds
}

export interface ConversationState {
  sessionId: string;
  userId?: string;
  currentStep: TourStep;
  progress: number; // 0-100
  context: Record<string, any>;
  history: ConversationMessage[];
  userPreferences: {
    voice: boolean;
    personality: 'professional' | 'friendly' | 'casual';
    pace: 'slow' | 'normal' | 'fast';
  };
  layoutBuilding?: {
    interests: string[];
    panels: any[];
    preferences: Record<string, any>;
  };
  lastActivity: number;
}

export interface ConversationMessage {
  id: string;
  timestamp: number;
  role: 'user' | 'assistant' | 'system';
  content: string;
  audioUrl?: string;
  metadata?: {
    step?: TourStep;
    actionTaken?: string;
    confidence?: number;
  };
}

export enum TourStep {
  WELCOME = 'welcome',
  INTERFACE_SELECTION = 'interface_selection',
  INTRODUCTION = 'introduction',
  INTEREST_DISCOVERY = 'interest_discovery',
  FEATURE_EXPLANATION = 'feature_explanation',
  LAYOUT_BUILDING = 'layout_building',
  PERSONALIZATION = 'personalization',
  FINAL_SETUP = 'final_setup',
  COMPLETED = 'completed'
}

export interface TourGuideResponse {
  message: string;
  audioUrl?: string;
  actions?: TourAction[];
  nextStep?: TourStep;
  progressUpdate?: number;
  uiChanges?: UIUpdate[];
}

export interface TourAction {
  type: 'highlight' | 'click' | 'scroll' | 'zoom' | 'create_panel' | 'navigate';
  target?: string;
  data?: any;
  delay?: number;
}

export interface UIUpdate {
  type: 'show' | 'hide' | 'highlight' | 'update_content';
  element: string;
  data?: any;
}

export interface NaturalLanguageRequest {
  message: string;
  currentContext: {
    step: TourStep;
    layoutState?: any;
    userPreferences?: any;
  };
}

export class TourGuideService {
  private config: TourGuideConfig;
  private conversations: Map<string, ConversationState> = new Map();
  private redis: Redis;
  private pgPool: Pool;

  constructor(config: TourGuideConfig) {
    this.config = config;
    this.redis = config.redisClient;
    this.pgPool = config.pgPool;
    
    // Clean up expired conversations every 5 minutes
    setInterval(() => this.cleanupExpiredConversations(), 5 * 60 * 1000);
  }

  /**
   * Start a new tour guide conversation
   */
  async startTour(
    options: {
      userId?: string;
      preferredInterface: 'voice' | 'keyboard';
      personality?: 'professional' | 'friendly' | 'casual';
    }
  ): Promise<{ sessionId: string; response: TourGuideResponse }> {
    const sessionId = this.generateSessionId();
    
    const conversationState: ConversationState = {
      sessionId,
      userId: options.userId,
      currentStep: TourStep.WELCOME,
      progress: 0,
      context: {
        preferredInterface: options.preferredInterface,
        startTime: Date.now()
      },
      history: [],
      userPreferences: {
        voice: options.preferredInterface === 'voice',
        personality: options.personality || 'friendly',
        pace: 'normal'
      },
      lastActivity: Date.now()
    };

    this.conversations.set(sessionId, conversationState);
    await this.saveConversationState(conversationState);

    // Generate welcome message
    const response = await this.processStep(sessionId, TourStep.WELCOME);
    
    return { sessionId, response };
  }

  /**
   * Process user input and continue the conversation
   */
  async processUserInput(
    sessionId: string,
    input: string,
    options?: {
      audioData?: ArrayBuffer;
      forceStep?: TourStep;
    }
  ): Promise<TourGuideResponse> {
    const conversation = await this.getConversation(sessionId);
    if (!conversation) {
      throw new Error('Conversation not found or expired');
    }

    // Add user message to history
    const userMessage: ConversationMessage = {
      id: this.generateMessageId(),
      timestamp: Date.now(),
      role: 'user',
      content: input,
      metadata: {
        step: conversation.currentStep
      }
    };

    conversation.history.push(userMessage);
    conversation.lastActivity = Date.now();

    // Process the input based on current step
    const response = await this.processNaturalLanguageInput(sessionId, input);
    
    // Add assistant response to history
    const assistantMessage: ConversationMessage = {
      id: this.generateMessageId(),
      timestamp: Date.now(),
      role: 'assistant',
      content: response.message,
      audioUrl: response.audioUrl,
      metadata: {
        step: conversation.currentStep,
        confidence: 0.95
      }
    };

    conversation.history.push(assistantMessage);
    
    // Update conversation state
    if (response.nextStep) {
      conversation.currentStep = response.nextStep;
    }
    if (response.progressUpdate) {
      conversation.progress = response.progressUpdate;
    }

    await this.saveConversationState(conversation);
    
    return response;
  }

  /**
   * Process natural language input for layout building
   */
  async processLayoutCommand(
    sessionId: string,
    command: string
  ): Promise<{
    layoutChanges: any[];
    response: string;
    audioUrl?: string;
  }> {
    const conversation = await this.getConversation(sessionId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    // Analyze the command using AI
    const analysis = await this.analyzeLayoutCommand(command, conversation.context);
    
    // Generate layout changes
    const layoutChanges = await this.generateLayoutFromCommand(analysis, conversation);
    
    // Update conversation context
    if (!conversation.layoutBuilding) {
      conversation.layoutBuilding = { interests: [], panels: [], preferences: {} };
    }
    conversation.layoutBuilding.panels.push(...layoutChanges);

    await this.saveConversationState(conversation);

    // Generate explanatory response
    const response = await this.generateLayoutExplanation(layoutChanges, conversation);
    const audioUrl = conversation.userPreferences.voice 
      ? await this.generateAudio(response, conversation.userPreferences.personality)
      : undefined;

    return {
      layoutChanges,
      response,
      audioUrl
    };
  }

  /**
   * Generate audio for text using ElevenLabs TTS
   */
  async generateAudio(
    text: string,
    personality: 'professional' | 'friendly' | 'casual' = 'friendly'
  ): Promise<string | undefined> {
    if (!this.config.elevenLabsApiKey) {
      return undefined;
    }

    try {
      const voiceId = this.config.elevenLabsVoiceId || this.getVoiceIdForPersonality(personality);
      
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.config.elevenLabsApiKey
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        })
      });

      if (!response.ok) {
        console.error('ElevenLabs TTS error:', response.statusText);
        return undefined;
      }

      const audioBuffer = await response.arrayBuffer();
      
      // Store audio temporarily and return URL
      const audioId = this.generateMessageId();
      await this.redis.setex(`audio:${audioId}`, 3600, Buffer.from(audioBuffer).toString('base64'));
      
      return `/api/audio/${audioId}`;

    } catch (error) {
      console.error('Error generating audio:', error);
      return undefined;
    }
  }

  /**
   * Get conversation state by session ID
   */
  async getConversation(sessionId: string): Promise<ConversationState | null> {
    // Try memory first
    if (this.conversations.has(sessionId)) {
      return this.conversations.get(sessionId)!;
    }

    // Try Redis cache
    try {
      const cached = await this.redis.get(`conversation:${sessionId}`);
      if (cached) {
        const conversation = JSON.parse(cached);
        this.conversations.set(sessionId, conversation);
        return conversation;
      }
    } catch (error) {
      console.error('Error loading conversation from cache:', error);
    }

    return null;
  }

  /**
   * Get tour progress for a session
   */
  async getTourProgress(sessionId: string): Promise<{
    currentStep: TourStep;
    progress: number;
    stepsCompleted: TourStep[];
    estimatedTimeRemaining: number;
  } | null> {
    const conversation = await this.getConversation(sessionId);
    if (!conversation) {
      return null;
    }

    const stepsCompleted = this.getCompletedSteps(conversation);
    const estimatedTimeRemaining = this.estimateTimeRemaining(conversation);

    return {
      currentStep: conversation.currentStep,
      progress: conversation.progress,
      stepsCompleted,
      estimatedTimeRemaining
    };
  }

  /**
   * End the tour and prepare for main app transition
   */
  async completeTour(sessionId: string): Promise<{
    layoutConfiguration: any;
    userPreferences: any;
    transitionData: any;
  }> {
    const conversation = await this.getConversation(sessionId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    // Generate final layout configuration
    const layoutConfiguration = this.generateFinalLayout(conversation);
    
    // Extract user preferences
    const userPreferences = this.extractUserPreferences(conversation);
    
    // Prepare transition data for main app
    const transitionData = {
      completedTour: true,
      tourDuration: Date.now() - conversation.context.startTime,
      interactionCount: conversation.history.length,
      preferredInterface: conversation.userPreferences.voice ? 'voice' : 'keyboard',
      customizations: conversation.layoutBuilding
    };

    // Mark conversation as completed
    conversation.currentStep = TourStep.COMPLETED;
    conversation.progress = 100;
    await this.saveConversationState(conversation);

    return {
      layoutConfiguration,
      userPreferences,
      transitionData
    };
  }

  // Private helper methods

  private async processStep(sessionId: string, step: TourStep): Promise<TourGuideResponse> {
    const conversation = this.conversations.get(sessionId)!;
    
    switch (step) {
      case TourStep.WELCOME:
        return this.processWelcomeStep(conversation);
      case TourStep.INTRODUCTION:
        return this.processIntroductionStep(conversation);
      case TourStep.INTEREST_DISCOVERY:
        return this.processInterestDiscoveryStep(conversation);
      case TourStep.LAYOUT_BUILDING:
        return this.processLayoutBuildingStep(conversation);
      default:
        return this.processGenericStep(conversation, step);
    }
  }

  private async processWelcomeStep(conversation: ConversationState): Promise<TourGuideResponse> {
    const personality = conversation.userPreferences.personality;
    const isVoice = conversation.userPreferences.voice;
    
    const messages = {
      professional: "Welcome to NEWTUBE. I'm your AI guide, ready to help you create your perfect streaming experience. Shall we begin?",
      friendly: "Hey there! Welcome to NEWTUBE! I'm your friendly AI guide, and I'm super excited to help you build an amazing personalized streaming experience. Ready to get started?",
      casual: "Hey! Welcome to NEWTUBE! I'm your AI buddy here to help you set up the perfect video streaming experience. Let's dive in!"
    };

    const message = messages[personality];
    const audioUrl = isVoice ? await this.generateAudio(message, personality) : undefined;

    return {
      message,
      audioUrl,
      nextStep: TourStep.INTRODUCTION,
      progressUpdate: 5,
      actions: [
        {
          type: 'highlight',
          target: 'interface-selection',
          delay: 1000
        }
      ]
    };
  }

  private async processIntroductionStep(conversation: ConversationState): Promise<TourGuideResponse> {
    const message = "NEWTUBE is a revolutionary streaming platform that aggregates content from YouTube, Vimeo, and other platforms. Instead of endless scrolling, you'll create custom layouts with AI assistance. What interests you most about video content?";
    
    const audioUrl = conversation.userPreferences.voice 
      ? await this.generateAudio(message, conversation.userPreferences.personality)
      : undefined;

    return {
      message,
      audioUrl,
      nextStep: TourStep.INTEREST_DISCOVERY,
      progressUpdate: 15,
      uiChanges: [
        {
          type: 'show',
          element: 'interest-categories'
        }
      ]
    };
  }

  private async processInterestDiscoveryStep(conversation: ConversationState): Promise<TourGuideResponse> {
    const message = "Great! Let's discover what you're passionate about. I can see categories like Technology, Creative Arts, Business, Lifestyle, and Education. Tell me what catches your eye, or describe what you love watching!";
    
    const audioUrl = conversation.userPreferences.voice 
      ? await this.generateAudio(message, conversation.userPreferences.personality)
      : undefined;

    return {
      message,
      audioUrl,
      nextStep: TourStep.LAYOUT_BUILDING,
      progressUpdate: 35,
      actions: [
        {
          type: 'highlight',
          target: 'interest-grid',
          delay: 500
        }
      ]
    };
  }

  private async processLayoutBuildingStep(conversation: ConversationState): Promise<TourGuideResponse> {
    const message = "Perfect! Now here's where the magic happens. Instead of using a standard layout, I'll create a custom interface just for you. Tell me how you'd like to organize your streaming experience. For example, 'Put my main video player on the left, search on top right, and recommendations below.'";
    
    const audioUrl = conversation.userPreferences.voice 
      ? await this.generateAudio(message, conversation.userPreferences.personality)
      : undefined;

    return {
      message,
      audioUrl,
      progressUpdate: 60,
      uiChanges: [
        {
          type: 'show',
          element: 'layout-builder'
        }
      ]
    };
  }

  private async processGenericStep(conversation: ConversationState, step: TourStep): Promise<TourGuideResponse> {
    const message = `Continuing with ${step}...`;
    const audioUrl = conversation.userPreferences.voice 
      ? await this.generateAudio(message, conversation.userPreferences.personality)
      : undefined;

    return {
      message,
      audioUrl,
      progressUpdate: Math.min(conversation.progress + 10, 90)
    };
  }

  private async processNaturalLanguageInput(sessionId: string, input: string): Promise<TourGuideResponse> {
    const conversation = this.conversations.get(sessionId)!;
    
    // Use AI to understand user intent and generate appropriate response
    const aiResponse = await this.generateAIResponse(input, conversation);
    
    return aiResponse;
  }

  private async generateAIResponse(input: string, conversation: ConversationState): Promise<TourGuideResponse> {
    const provider = this.config.defaultProvider;
    const apiKey = this.getApiKeyForProvider(provider);
    
    if (!apiKey) {
      return this.generateFallbackResponse(input, conversation);
    }

    try {
      const context = this.buildContextForAI(conversation);
      const prompt = this.buildPrompt(input, context, conversation);
      
      const response = await this.callAIProvider(provider, apiKey, prompt);
      const parsed = this.parseAIResponse(response);
      
      // Generate audio if voice is enabled
      const audioUrl = conversation.userPreferences.voice 
        ? await this.generateAudio(parsed.message, conversation.userPreferences.personality)
        : undefined;

      return {
        ...parsed,
        audioUrl
      };

    } catch (error) {
      console.error('Error generating AI response:', error);
      return this.generateFallbackResponse(input, conversation);
    }
  }

  private buildPrompt(input: string, context: string, conversation: ConversationState): string {
    const personality = conversation.userPreferences.personality;
    const step = conversation.currentStep;
    
    return `You are an AI tour guide for NEWTUBE, a revolutionary streaming platform. 

Your personality: ${personality}
Current step: ${step}
User's preferred interaction: ${conversation.userPreferences.voice ? 'voice' : 'text'}

Context: ${context}

User said: "${input}"

Respond as a helpful tour guide who:
1. Explains NEWTUBE features conversationally 
2. Guides users step-by-step through setup
3. Understands natural language layout requests
4. Creates personalized streaming experiences
5. Makes the complex feel simple and exciting

Your response should be conversational, encouraging, and focused on helping them build their perfect streaming experience. Keep responses under 100 words unless explaining something complex.

If they're describing a layout, acknowledge their vision and explain how you'll build it.
If they're asking questions, answer helpfully and guide them to the next step.
If they seem confused, simplify and offer specific examples.

Response:`;
  }

  private buildContextForAI(conversation: ConversationState): string {
    const recentHistory = conversation.history.slice(-6);
    const context = [];
    
    context.push(`Current step: ${conversation.currentStep}`);
    context.push(`Progress: ${conversation.progress}%`);
    
    if (conversation.layoutBuilding) {
      context.push(`User interests: ${conversation.layoutBuilding.interests.join(', ')}`);
      context.push(`Panels created: ${conversation.layoutBuilding.panels.length}`);
    }
    
    if (recentHistory.length > 0) {
      context.push('Recent conversation:');
      recentHistory.forEach(msg => {
        context.push(`${msg.role}: ${msg.content}`);
      });
    }
    
    return context.join('\n');
  }

  private async callAIProvider(provider: string, apiKey: string, prompt: string): Promise<string> {
    switch (provider) {
      case 'openai':
        return this.callOpenAI(apiKey, prompt);
      case 'gemini':
        return this.callGemini(apiKey, prompt);
      case 'groq':
        return this.callGroq(apiKey, prompt);
      default:
        throw new Error(`Unknown AI provider: ${provider}`);
    }
  }

  private async callOpenAI(apiKey: string, prompt: string): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful AI tour guide for NEWTUBE streaming platform.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    });

    const data = await response.json();
    return data.choices[0]?.message?.content || 'I apologize, I\'m having trouble responding right now.';
  }

  private async callGemini(apiKey: string, prompt: string): Promise<string> {
    // Implement Gemini API call
    return 'Gemini integration coming soon!';
  }

  private async callGroq(apiKey: string, prompt: string): Promise<string> {
    // Implement Groq API call
    return 'Groq integration coming soon!';
  }

  private parseAIResponse(response: string): Omit<TourGuideResponse, 'audioUrl'> {
    // Basic parsing - could be enhanced to extract structured data
    return {
      message: response,
      actions: [],
      uiChanges: []
    };
  }

  private generateFallbackResponse(input: string, conversation: ConversationState): TourGuideResponse {
    const fallbacks = [
      "I understand you're interested in that! Let's continue building your perfect NEWTUBE experience.",
      "That sounds great! Tell me more about how you'd like to organize your streaming interface.",
      "I'm here to help you create an amazing personalized layout. What would you like to see next?"
    ];
    
    const message = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    
    return {
      message,
      actions: [],
      uiChanges: []
    };
  }

  private async analyzeLayoutCommand(command: string, context: any): Promise<any> {
    // Analyze natural language layout commands
    const keywords = {
      panels: ['video', 'player', 'search', 'recommendations', 'trending', 'playlist'],
      positions: ['left', 'right', 'top', 'bottom', 'center', 'side'],
      sizes: ['large', 'small', 'medium', 'full', 'half']
    };
    
    const analysis = {
      panels: [],
      layout: {},
      confidence: 0.8
    };
    
    // Simple keyword matching - could be enhanced with NLP
    for (const panel of keywords.panels) {
      if (command.toLowerCase().includes(panel)) {
        analysis.panels.push(panel);
      }
    }
    
    return analysis;
  }

  private async generateLayoutFromCommand(analysis: any, conversation: ConversationState): Promise<any[]> {
    // Generate actual layout configuration from command analysis
    const layoutChanges = [];
    
    for (const panel of analysis.panels) {
      layoutChanges.push({
        type: panel,
        position: { x: 0, y: 0, w: 4, h: 3 },
        props: {}
      });
    }
    
    return layoutChanges;
  }

  private async generateLayoutExplanation(layoutChanges: any[], conversation: ConversationState): Promise<string> {
    const panelNames = layoutChanges.map(change => change.type).join(', ');
    return `Perfect! I've created ${layoutChanges.length} panels for you: ${panelNames}. This layout matches what you described. How does it look?`;
  }

  private getApiKeyForProvider(provider: string): string | undefined {
    switch (provider) {
      case 'openai':
        return this.config.openaiApiKey;
      case 'gemini':
        return this.config.geminiApiKey;
      case 'groq':
        return this.config.groqApiKey;
      default:
        return undefined;
    }
  }

  private getVoiceIdForPersonality(personality: string): string {
    const voiceMap = {
      'professional': '21m00Tcm4TlvDq8ikWAM', // Rachel
      'friendly': 'AZnzlk1XvdvUeBnXmlld', // Domi
      'casual': 'EXAVITQu4vr4xnSDxMaL'    // Bella
    };
    return voiceMap[personality] || voiceMap['friendly'];
  }

  private async saveConversationState(conversation: ConversationState): Promise<void> {
    try {
      // Save to memory
      this.conversations.set(conversation.sessionId, conversation);
      
      // Cache in Redis for persistence
      await this.redis.setex(
        `conversation:${conversation.sessionId}`,
        this.config.conversationTimeout / 1000,
        JSON.stringify(conversation)
      );
    } catch (error) {
      console.error('Error saving conversation state:', error);
    }
  }

  private cleanupExpiredConversations(): void {
    const now = Date.now();
    for (const [sessionId, conversation] of this.conversations) {
      if (now - conversation.lastActivity > this.config.conversationTimeout) {
        this.conversations.delete(sessionId);
      }
    }
  }

  private generateSessionId(): string {
    return `tour_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  }

  private getCompletedSteps(conversation: ConversationState): TourStep[] {
    const allSteps = Object.values(TourStep);
    const currentIndex = allSteps.indexOf(conversation.currentStep);
    return allSteps.slice(0, currentIndex);
  }

  private estimateTimeRemaining(conversation: ConversationState): number {
    const avgTimePerStep = 90; // seconds
    const remainingSteps = Object.values(TourStep).length - this.getCompletedSteps(conversation).length;
    return remainingSteps * avgTimePerStep;
  }

  private generateFinalLayout(conversation: ConversationState): any {
    return {
      panels: conversation.layoutBuilding?.panels || [],
      preferences: conversation.layoutBuilding?.preferences || {},
      customizations: {
        voice: conversation.userPreferences.voice,
        personality: conversation.userPreferences.personality
      }
    };
  }

  private extractUserPreferences(conversation: ConversationState): any {
    return {
      ...conversation.userPreferences,
      interests: conversation.layoutBuilding?.interests || [],
      completedTour: true,
      tourVersion: '1.0'
    };
  }
}