import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';
import { logger } from '../lib/logger.js';
import { EmotionType, ConversationEmotionalContext } from '../types/emotion.types.js';

export interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LLMResponse {
  message: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  model: string;
}

export interface LLMOptions {
  temperature?: number;
  maxTokens?: number;
  model?: string;
  emotionContext?: ConversationEmotionalContext;
  targetEmotion?: EmotionType;
  personality?: 'professional' | 'friendly' | 'casual' | 'enthusiastic';
}

export class LLMService {
  private openai: OpenAI | null = null;
  private gemini: GoogleGenerativeAI | null = null;
  private groq: Groq | null = null;
  private defaultProvider: string = 'mock';
  private emotionalContexts: Map<string, ConversationEmotionalContext> = new Map();

  constructor() {
    this.initializeProviders();
  }

  private initializeProviders(): void {
    // Initialize OpenAI
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
      this.defaultProvider = 'openai';
      logger.info('OpenAI initialized');
    }

    // Initialize Gemini
    if (process.env.GEMINI_API_KEY) {
      this.gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      if (this.defaultProvider === 'mock') {
        this.defaultProvider = 'gemini';
      }
      logger.info('Gemini initialized');
    }

    // Initialize Groq
    if (process.env.GROQ_API_KEY) {
      this.groq = new Groq({
        apiKey: process.env.GROQ_API_KEY,
      });
      if (this.defaultProvider === 'mock') {
        this.defaultProvider = 'groq';
      }
      logger.info('Groq initialized');
    }

    logger.info(`Default LLM provider: ${this.defaultProvider}`);
  }

  async generateResponse(
    messages: LLMMessage[],
    options: LLMOptions = {}
  ): Promise<LLMResponse> {
    const {
      temperature = 0.7,
      maxTokens = 1000,
      model = 'auto',
    } = options;

    // Try providers in order of preference
    if (this.defaultProvider === 'openai' && this.openai) {
      return this.generateWithOpenAI(messages, { temperature, maxTokens, model });
    }

    if (this.defaultProvider === 'groq' && this.groq) {
      return this.generateWithGroq(messages, { temperature, maxTokens, model });
    }

    if (this.defaultProvider === 'gemini' && this.gemini) {
      return this.generateWithGemini(messages, { temperature, maxTokens, model });
    }

    // Fallback to mock responses
    return this.generateMockResponse(messages);
  }

  private async generateWithOpenAI(
    messages: LLMMessage[],
    options: LLMOptions
  ): Promise<LLMResponse> {
    try {
      const completion = await this.openai!.chat.completions.create({
        model: options.model === 'auto' ? 'gpt-3.5-turbo' : options.model || 'gpt-3.5-turbo',
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 1000,
      });

      const message = completion.choices[0]?.message?.content || 'No response generated';

      return {
        message,
        usage: {
          promptTokens: completion.usage?.prompt_tokens || 0,
          completionTokens: completion.usage?.completion_tokens || 0,
          totalTokens: completion.usage?.total_tokens || 0,
        },
        model: completion.model,
      };
    } catch (error) {
      logger.error('OpenAI API error:', error);
      throw new Error('Failed to generate response with OpenAI');
    }
  }

  private async generateWithGroq(
    messages: LLMMessage[],
    options: LLMOptions
  ): Promise<LLMResponse> {
    try {
      const completion = await this.groq!.chat.completions.create({
        model: options.model === 'auto' ? 'llama3-8b-8192' : options.model || 'llama3-8b-8192',
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 1000,
      });

      const message = completion.choices[0]?.message?.content || 'No response generated';

      return {
        message,
        usage: {
          promptTokens: completion.usage?.prompt_tokens || 0,
          completionTokens: completion.usage?.completion_tokens || 0,
          totalTokens: completion.usage?.total_tokens || 0,
        },
        model: completion.model,
      };
    } catch (error) {
      logger.error('Groq API error:', error);
      throw new Error('Failed to generate response with Groq');
    }
  }

  private async generateWithGemini(
    messages: LLMMessage[],
    options: LLMOptions
  ): Promise<LLMResponse> {
    try {
      const model = this.gemini!.getGenerativeModel({
        model: options.model === 'auto' ? 'gemini-pro' : options.model || 'gemini-pro',
      });

      // Convert messages to Gemini format
      const prompt = messages
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const message = response.text();

      return {
        message,
        model: 'gemini-pro',
      };
    } catch (error) {
      logger.error('Gemini API error:', error);
      throw new Error('Failed to generate response with Gemini');
    }
  }

  private generateMockResponse(messages: LLMMessage[]): LLMResponse {
    const lastMessage = messages[messages.length - 1];
    const userMessage = lastMessage?.content.toLowerCase() || '';

    let mockResponse: string;

    // Generate contextual mock responses
    if (userMessage.includes('tour') || userMessage.includes('guide')) {
      mockResponse = "Welcome to NEWTUBE! I'm your AI tour guide. I can help you navigate the platform, discover new features, and find the perfect videos for your interests. What would you like to explore first?";
    } else if (userMessage.includes('help') || userMessage.includes('how')) {
      mockResponse = "I'm here to help! You can ask me about:\n\n• Finding and organizing videos\n• Customizing your layout panels\n• Discovering new content\n• Managing your preferences\n• Understanding platform features\n\nWhat specific topic would you like assistance with?";
    } else if (userMessage.includes('video') || userMessage.includes('watch')) {
      mockResponse = "I can help you find amazing videos! NEWTUBE aggregates content from YouTube, Vimeo, and other platforms. You can organize videos in custom panels, create personalized feeds, and discover content tailored to your interests. What type of videos are you looking for?";
    } else if (userMessage.includes('layout') || userMessage.includes('panel')) {
      mockResponse = "Great question about layouts! NEWTUBE's panel system lets you customize your viewing experience. You can drag and drop panels, resize them, and create personalized dashboards. Each panel can show different types of content like trending videos, your subscriptions, or custom feeds. Would you like me to show you how to customize your layout?";
    } else {
      // Default friendly response
      mockResponse = `Thanks for your message! I'm a mock AI assistant helping with NEWTUBE development. In the full version, I'll provide intelligent responses about video discovery, platform navigation, and personalized recommendations. Your message: "${userMessage}"`;
    }

    logger.info('Generated mock response', {
      userMessage: userMessage.substring(0, 100),
      responseLength: mockResponse.length,
    });

    return {
      message: mockResponse,
      usage: {
        promptTokens: userMessage.length / 4, // Rough estimate
        completionTokens: mockResponse.length / 4,
        totalTokens: (userMessage.length + mockResponse.length) / 4,
      },
      model: 'mock-llm-v1',
    };
  }

  // Helper method to check if any LLM provider is available
  isLLMAvailable(): boolean {
    return !!(this.openai || this.gemini || this.groq);
  }

  // Get current provider info
  getProviderInfo(): { provider: string; available: boolean } {
    return {
      provider: this.defaultProvider,
      available: this.isLLMAvailable(),
    };
  }

  /**
   * Generate emotionally aware response with conversation context
   */
  async generateEmotionalResponse(
    messages: LLMMessage[],
    options: LLMOptions = {}
  ): Promise<LLMResponse> {
    // Enhance messages with emotional context
    const enhancedMessages = this.enhanceMessagesWithEmotion(messages, options);
    
    // Generate response with emotional awareness
    const response = await this.generateResponse(enhancedMessages, options);
    
    // Update emotional context if provided
    if (options.emotionContext) {
      this.updateEmotionalContext(options.emotionContext, response.message, options.targetEmotion);
    }
    
    return response;
  }

  /**
   * Enhance messages with emotional context and personality
   */
  private enhanceMessagesWithEmotion(messages: LLMMessage[], options: LLMOptions): LLMMessage[] {
    const enhanced = [...messages];
    
    // Add emotional system prompt if we have context
    if (options.emotionContext || options.targetEmotion || options.personality) {
      const emotionalPrompt = this.buildEmotionalSystemPrompt(options);
      
      // Insert emotional prompt as first system message or update existing one
      const existingSystemIndex = enhanced.findIndex(m => m.role === 'system');
      if (existingSystemIndex >= 0) {
        enhanced[existingSystemIndex].content = `${enhanced[existingSystemIndex].content}\n\n${emotionalPrompt}`;
      } else {
        enhanced.unshift({
          role: 'system',
          content: emotionalPrompt
        });
      }
    }
    
    return enhanced;
  }

  /**
   * Build emotional system prompt based on context and target emotion
   */
  private buildEmotionalSystemPrompt(options: LLMOptions): string {
    let prompt = 'EMOTIONAL CONTEXT INSTRUCTIONS:\n';
    
    // Add personality guidance
    const personality = options.personality || 'friendly';
    const personalityPrompts = {
      professional: 'Respond in a professional, competent, and reliable manner. Use clear, precise language and maintain a respectful tone.',
      friendly: 'Respond in a warm, approachable, and conversational manner. Be personable and engaging while remaining helpful.',
      casual: 'Respond in a relaxed, informal, and easy-going manner. Use conversational language and be naturally expressive.',
      enthusiastic: 'Respond with energy, excitement, and passion. Show genuine enthusiasm for helping and sharing information.'
    };
    
    prompt += `- Personality: ${personalityPrompts[personality]}\n`;
    
    // Add target emotion guidance
    if (options.targetEmotion) {
      const emotionPrompts = {
        happy: 'Express joy and positivity. Use upbeat language and convey satisfaction.',
        excited: 'Show enthusiasm and energy. Use dynamic language and express anticipation.',
        curious: 'Demonstrate interest and inquisitiveness. Ask follow-up questions and show engagement.',
        helpful: 'Focus on being supportive and solution-oriented. Offer assistance and guidance.',
        calm: 'Maintain a peaceful and reassuring tone. Speak slowly and thoughtfully.',
        enthusiastic: 'Show passion and excitement. Use energetic language and express genuine interest.',
        confident: 'Express certainty and assurance. Use decisive language and show expertise.',
        surprised: 'Show amazement and wonder. Express unexpected delight or astonishment.',
        thoughtful: 'Demonstrate deep consideration. Use reflective language and show contemplation.',
        encouraging: 'Provide motivation and support. Use uplifting language and express belief in success.'
      };
      
      prompt += `- Target Emotion: ${emotionPrompts[options.targetEmotion]}\n`;
    }
    
    // Add conversation context if available
    if (options.emotionContext) {
      prompt += `- Previous Mood: The conversation has been ${options.emotionContext.currentMood}. Maintain emotional consistency.\n`;
      prompt += `- User Preference: The user prefers ${options.emotionContext.preferredStyle} communication style.\n`;
      
      if (options.emotionContext.emotionalHistory.length > 0) {
        const recentEmotion = options.emotionContext.emotionalHistory[options.emotionContext.emotionalHistory.length - 1];
        prompt += `- Recent Context: The last exchange was ${recentEmotion.primaryEmotion} with ${recentEmotion.intensity} intensity.\n`;
      }
    }
    
    prompt += '\nIMPORTANT: Your response should naturally embody these emotional characteristics without explicitly mentioning them. The goal is natural, emotionally appropriate communication.';
    
    return prompt;
  }

  /**
   * Update emotional context with new conversation data
   */
  private updateEmotionalContext(
    context: ConversationEmotionalContext, 
    response: string, 
    targetEmotion?: EmotionType
  ): void {
    // Store updated context
    this.emotionalContexts.set(context.sessionId, {
      ...context,
      lastUpdate: new Date(),
      // Add simple emotion tracking (in a real implementation, this would analyze the response)
      currentMood: targetEmotion || context.currentMood
    });
  }

  /**
   * Get or create emotional context for a session
   */
  getEmotionalContext(sessionId: string, userId?: string): ConversationEmotionalContext {
    if (this.emotionalContexts.has(sessionId)) {
      return this.emotionalContexts.get(sessionId)!;
    }
    
    // Create new context
    const newContext: ConversationEmotionalContext = {
      userId,
      sessionId,
      emotionalHistory: [],
      currentMood: 'helpful',
      preferredStyle: 'friendly',
      adaptations: {},
      lastUpdate: new Date()
    };
    
    this.emotionalContexts.set(sessionId, newContext);
    return newContext;
  }

  /**
   * Update user's preferred communication style
   */
  updateUserPreferences(
    sessionId: string, 
    style: 'professional' | 'friendly' | 'casual' | 'enthusiastic'
  ): void {
    const context = this.getEmotionalContext(sessionId);
    context.preferredStyle = style;
    context.lastUpdate = new Date();
    this.emotionalContexts.set(sessionId, context);
  }

  /**
   * Clear emotional context for a session
   */
  clearEmotionalContext(sessionId: string): void {
    this.emotionalContexts.delete(sessionId);
  }

  /**
   * Get emotional context statistics
   */
  getEmotionalStats(): { 
    activeSessions: number; 
    totalContexts: number;
    moodDistribution: Record<EmotionType, number>;
  } {
    const contexts = Array.from(this.emotionalContexts.values());
    const moodDistribution: Record<EmotionType, number> = {} as any;
    
    for (const context of contexts) {
      moodDistribution[context.currentMood] = (moodDistribution[context.currentMood] || 0) + 1;
    }
    
    return {
      activeSessions: contexts.length,
      totalContexts: this.emotionalContexts.size,
      moodDistribution
    };
  }
}