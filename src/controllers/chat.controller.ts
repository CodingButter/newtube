import { Request, Response } from 'express';
import { ConversationService } from '../services/conversation.service.js';
import { logger } from '../lib/logger.js';
import { z } from 'zod';

// Request validation schemas
const ChatRequestSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
  conversationId: z.string().optional(),
  userId: z.string().optional(), 
  context: z.object({
    tourStep: z.string().optional(),
    currentPage: z.string().optional(),
    userIntent: z.string().optional(),
  }).optional(),
});

const GetConversationSchema = z.object({
  conversationId: z.string().uuid('Invalid conversation ID'),
});

const GetUserConversationsSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
});

export class ChatController {
  constructor(private conversationService: ConversationService) {}

  async handleChat(req: Request, res: Response): Promise<void> {
    try {
      // Validate request body
      const validationResult = ChatRequestSchema.safeParse(req.body);
      if (!validationResult.success) {
        res.status(400).json({
          error: 'Invalid request data',
          details: validationResult.error.errors,
        });
        return;
      }

      const { message, conversationId, userId, context } = validationResult.data;

      logger.info('Processing chat request', {
        messageLength: message.length,
        conversationId,
        userId,
        context,
      });

      // Create or continue conversation
      const response = await this.conversationService.processMessage({
        message,
        conversationId,
        userId: userId || 'anonymous',
        context: context || {},
      });

      logger.info('Chat response generated', {
        responseLength: response.message.length,
        conversationId: response.conversationId,
      });

      res.json({
        success: true,
        data: response,
        timestamp: new Date().toISOString(),
      });

    } catch (error) {
      logger.error('Error processing chat request:', error);
      
      res.status(500).json({
        error: 'Internal server error',
        message: 'Failed to process chat message',
        timestamp: new Date().toISOString(),
      });
    }
  }

  async getConversation(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = GetConversationSchema.safeParse(req.params);
      if (!validationResult.success) {
        res.status(400).json({
          error: 'Invalid conversation ID',
          details: validationResult.error.errors,
        });
        return;
      }

      const { conversationId } = validationResult.data;

      logger.info('Fetching conversation', { conversationId });

      const conversation = await this.conversationService.getConversation(conversationId);

      if (!conversation) {
        res.status(404).json({
          error: 'Conversation not found',
          message: `No conversation found with ID: ${conversationId}`,
        });
        return;
      }

      res.json({
        success: true,
        data: conversation,
        timestamp: new Date().toISOString(),
      });

    } catch (error) {
      logger.error('Error fetching conversation:', error);
      
      res.status(500).json({
        error: 'Internal server error',
        message: 'Failed to fetch conversation',
        timestamp: new Date().toISOString(),
      });
    }
  }

  async getUserConversations(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = GetUserConversationsSchema.safeParse(req.params);
      if (!validationResult.success) {
        res.status(400).json({
          error: 'Invalid user ID',
          details: validationResult.error.errors,
        });
        return;
      }

      const { userId } = validationResult.data;
      const limit = parseInt(req.query.limit as string) || 20;
      const offset = parseInt(req.query.offset as string) || 0;

      logger.info('Fetching user conversations', { userId, limit, offset });

      const conversations = await this.conversationService.getUserConversations(userId, limit, offset);

      res.json({
        success: true,
        data: conversations,
        pagination: {
          limit,
          offset,
          total: conversations.length,
        },
        timestamp: new Date().toISOString(),
      });

    } catch (error) {
      logger.error('Error fetching user conversations:', error);
      
      res.status(500).json({
        error: 'Internal server error',
        message: 'Failed to fetch user conversations',
        timestamp: new Date().toISOString(),
      });
    }
  }
}