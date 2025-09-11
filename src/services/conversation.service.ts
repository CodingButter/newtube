import { SimplePrismaClient } from '../db/simple-client.js';
import { LLMService, LLMMessage } from './llm.service.js';
import { logger } from '../lib/logger.js';
import { v4 as uuidv4 } from 'uuid';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface Conversation {
  id: string;
  userId: string;
  title?: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
}

export interface ProcessMessageInput {
  message: string;
  conversationId?: string;
  userId: string;
  context?: {
    tourStep?: string;
    currentPage?: string;
    userIntent?: string;
    [key: string]: any;
  };
}

export interface ProcessMessageOutput {
  conversationId: string;
  message: string;
  messageId: string;
  timestamp: Date;
  context?: Record<string, any>;
}

export class ConversationService {
  // In-memory storage for MVP (will be replaced with database)
  private conversations: Map<string, Conversation> = new Map();
  
  constructor(
    private prisma: SimplePrismaClient,
    private llmService: LLMService
  ) {
    logger.info('ConversationService initialized');
  }

  async processMessage(input: ProcessMessageInput): Promise<ProcessMessageOutput> {
    const { message, conversationId, userId, context = {} } = input;

    logger.info('Processing message', {
      messageLength: message.length,
      conversationId,
      userId,
      context,
    });

    let conversation: Conversation;

    // Get or create conversation
    if (conversationId && this.conversations.has(conversationId)) {
      conversation = this.conversations.get(conversationId)!;
      logger.info('Using existing conversation', { conversationId });
    } else {
      const newConversationId = uuidv4();
      conversation = {
        id: newConversationId,
        userId,
        title: this.generateConversationTitle(message),
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: context,
      };
      this.conversations.set(newConversationId, conversation);
      logger.info('Created new conversation', { conversationId: newConversationId });
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content: message,
      timestamp: new Date(),
      metadata: context,
    };
    conversation.messages.push(userMessage);

    // Generate AI response
    const aiResponse = await this.generateAIResponse(conversation, context);

    // Add AI message
    const aiMessage: ChatMessage = {
      id: uuidv4(),
      role: 'assistant',
      content: aiResponse.message,
      timestamp: new Date(),
      metadata: {
        model: aiResponse.model,
        usage: aiResponse.usage,
        context,
      },
    };
    conversation.messages.push(aiMessage);

    // Update conversation timestamp
    conversation.updatedAt = new Date();

    logger.info('Message processed successfully', {
      conversationId: conversation.id,
      messageCount: conversation.messages.length,
      responseLength: aiResponse.message.length,
    });

    return {
      conversationId: conversation.id,
      message: aiResponse.message,
      messageId: aiMessage.id,
      timestamp: aiMessage.timestamp,
      context: aiMessage.metadata,
    };
  }

  async getConversation(conversationId: string): Promise<Conversation | null> {
    logger.info('Fetching conversation', { conversationId });
    
    const conversation = this.conversations.get(conversationId);
    if (!conversation) {
      logger.warn('Conversation not found', { conversationId });
      return null;
    }

    return conversation;
  }

  async getUserConversations(userId: string, limit: number = 20, offset: number = 0): Promise<Conversation[]> {
    logger.info('Fetching user conversations', { userId, limit, offset });

    const userConversations = Array.from(this.conversations.values())
      .filter(conv => conv.userId === userId)
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(offset, offset + limit);

    logger.info('Found user conversations', { 
      userId, 
      count: userConversations.length,
      totalStored: this.conversations.size 
    });

    return userConversations;
  }

  async deleteConversation(conversationId: string): Promise<boolean> {
    logger.info('Deleting conversation', { conversationId });

    const deleted = this.conversations.delete(conversationId);
    if (deleted) {
      logger.info('Conversation deleted successfully', { conversationId });
    } else {
      logger.warn('Conversation not found for deletion', { conversationId });
    }

    return deleted;
  }

  private async generateAIResponse(conversation: Conversation, context: Record<string, any>) {
    // Build context for the AI
    const systemPrompt = this.buildSystemPrompt(context);
    
    // Convert conversation messages to LLM format
    const messages: LLMMessage[] = [
      { role: 'system', content: systemPrompt },
      ...conversation.messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      } as LLMMessage)),
    ];

    // Generate response using LLM service
    try {
      const response = await this.llmService.generateResponse(messages, {
        temperature: 0.7,
        maxTokens: 1000,
      });

      logger.info('AI response generated', {
        model: response.model,
        tokens: response.usage?.totalTokens,
      });

      return response;
    } catch (error) {
      logger.error('Error generating AI response:', error);
      
      // Return fallback response
      return {
        message: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        model: 'fallback',
        usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
      };
    }
  }

  private buildSystemPrompt(context: Record<string, any>): string {
    const basePrompt = `You are NOVA, an intelligent AI assistant for NEWTUBE - a personalized video streaming aggregator platform. You help users discover, organize, and enjoy videos from multiple platforms including YouTube, Vimeo, and Nebula.

Your primary responsibilities:
1. Help users navigate and understand NEWTUBE's features
2. Assist with video discovery and recommendation
3. Guide users through the platform's customizable panel-based interface
4. Provide personalized content suggestions
5. Answer questions about video streaming and content management

Key platform features to highlight:
- Customizable drag-and-drop panel layouts
- Multi-platform video aggregation
- AI-powered personalization
- Smart content discovery
- User-controlled recommendation algorithms
- Privacy-focused design with no content hosting

Always be helpful, friendly, and focused on improving the user's video streaming experience.`;

    // Add context-specific guidance
    if (context.tourStep) {
      return basePrompt + `\n\nCurrent tour step: ${context.tourStep}. Focus on explaining this specific feature and guide the user through it.`;
    }

    if (context.currentPage) {
      return basePrompt + `\n\nUser is currently on: ${context.currentPage}. Tailor your response to be relevant to this page.`;
    }

    if (context.userIntent) {
      return basePrompt + `\n\nUser intent: ${context.userIntent}. Focus your response on helping achieve this goal.`;
    }

    return basePrompt;
  }

  private generateConversationTitle(firstMessage: string): string {
    // Generate a title from the first message (truncated)
    const cleanMessage = firstMessage.replace(/[^\w\s]/g, '').trim();
    const words = cleanMessage.split(/\s+/).slice(0, 4);
    
    if (words.length === 0) {
      return 'New Conversation';
    }

    let title = words.join(' ');
    if (cleanMessage.split(/\s+/).length > 4) {
      title += '...';
    }

    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  // Utility method to get service statistics
  getServiceStats() {
    const totalConversations = this.conversations.size;
    const totalMessages = Array.from(this.conversations.values())
      .reduce((total, conv) => total + conv.messages.length, 0);
    
    const uniqueUsers = new Set(
      Array.from(this.conversations.values()).map(conv => conv.userId)
    ).size;

    return {
      totalConversations,
      totalMessages,
      uniqueUsers,
      llmProvider: this.llmService.getProviderInfo(),
    };
  }
}