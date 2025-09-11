import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';
import { logger } from '../lib/logger.js';

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
}

export class LLMService {
  private openai: OpenAI | null = null;
  private gemini: GoogleGenerativeAI | null = null;
  private groq: Groq | null = null;
  private defaultProvider: string = 'mock';

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
}