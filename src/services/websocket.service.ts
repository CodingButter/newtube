import { Server as SocketIOServer, Socket } from 'socket.io';
import { ConversationService } from './conversation.service.js';
import { TourService } from './tour.service.js';
import { logger } from '../lib/logger.js';

export interface SocketWithUser extends Socket {
  userId?: string;
}

export class WebSocketService {
  private connectedUsers: Map<string, string> = new Map(); // userId -> socketId
  private socketUsers: Map<string, string> = new Map(); // socketId -> userId

  constructor(
    private io: SocketIOServer,
    private conversationService: ConversationService,
    private tourService: TourService
  ) {}

  initialize(): void {
    this.io.on('connection', (socket: SocketWithUser) => {
      logger.info('WebSocket connection established', { socketId: socket.id });

      // Handle user authentication/identification
      socket.on('authenticate', async (data: { userId: string; token?: string }) => {
        try {
          // For MVP, we'll accept any userId without validation
          // In production, validate the token here
          socket.userId = data.userId;
          this.connectedUsers.set(data.userId, socket.id);
          this.socketUsers.set(socket.id, data.userId);

          logger.info('User authenticated via WebSocket', {
            userId: data.userId,
            socketId: socket.id,
          });

          socket.emit('authenticated', { success: true, userId: data.userId });
        } catch (error) {
          logger.error('WebSocket authentication error:', error);
          socket.emit('authenticated', { success: false, error: 'Authentication failed' });
        }
      });

      // Handle chat messages
      socket.on('chat:message', async (data: {
        message: string;
        conversationId?: string;
        context?: Record<string, any>;
      }) => {
        try {
          if (!socket.userId) {
            socket.emit('error', { message: 'Not authenticated' });
            return;
          }

          logger.info('Processing WebSocket chat message', {
            userId: socket.userId,
            messageLength: data.message.length,
            conversationId: data.conversationId,
          });

          // Process message through conversation service
          const response = await this.conversationService.processMessage({
            message: data.message,
            conversationId: data.conversationId,
            userId: socket.userId,
            context: data.context || {},
          });

          // Send response back to user
          socket.emit('chat:response', {
            success: true,
            data: response,
          });

          logger.info('WebSocket chat response sent', {
            userId: socket.userId,
            conversationId: response.conversationId,
            messageId: response.messageId,
          });

        } catch (error) {
          logger.error('Error processing WebSocket chat message:', error);
          socket.emit('chat:error', {
            success: false,
            error: 'Failed to process message',
          });
        }
      });

      // Handle tour-related events
      socket.on('tour:start', async () => {
        try {
          if (!socket.userId) {
            socket.emit('error', { message: 'Not authenticated' });
            return;
          }

          logger.info('Starting tour via WebSocket', { userId: socket.userId });

          const progress = await this.tourService.startTour(socket.userId);
          socket.emit('tour:started', { success: true, progress });

        } catch (error) {
          logger.error('Error starting tour via WebSocket:', error);
          socket.emit('tour:error', { error: 'Failed to start tour' });
        }
      });

      socket.on('tour:step', async (data: { stepId: string }) => {
        try {
          if (!socket.userId) {
            socket.emit('error', { message: 'Not authenticated' });
            return;
          }

          logger.info('Tour step update via WebSocket', {
            userId: socket.userId,
            stepId: data.stepId,
          });

          const step = await this.tourService.updateTourStep(socket.userId, data.stepId);
          if (step) {
            socket.emit('tour:step_updated', { success: true, step });
          } else {
            socket.emit('tour:error', { error: 'Invalid step or no tour progress' });
          }

        } catch (error) {
          logger.error('Error updating tour step via WebSocket:', error);
          socket.emit('tour:error', { error: 'Failed to update tour step' });
        }
      });

      socket.on('tour:complete_step', async (data: { stepId: string }) => {
        try {
          if (!socket.userId) {
            socket.emit('error', { message: 'Not authenticated' });
            return;
          }

          const success = await this.tourService.completeTourStep(socket.userId, data.stepId);
          socket.emit('tour:step_completed', { success, stepId: data.stepId });

        } catch (error) {
          logger.error('Error completing tour step via WebSocket:', error);
          socket.emit('tour:error', { error: 'Failed to complete tour step' });
        }
      });

      socket.on('tour:skip', async () => {
        try {
          if (!socket.userId) {
            socket.emit('error', { message: 'Not authenticated' });
            return;
          }

          const success = await this.tourService.skipTour(socket.userId);
          socket.emit('tour:skipped', { success });

        } catch (error) {
          logger.error('Error skipping tour via WebSocket:', error);
          socket.emit('tour:error', { error: 'Failed to skip tour' });
        }
      });

      // Handle conversation management
      socket.on('conversation:get', async (data: { conversationId: string }) => {
        try {
          const conversation = await this.conversationService.getConversation(data.conversationId);
          socket.emit('conversation:data', { success: true, conversation });
        } catch (error) {
          logger.error('Error fetching conversation via WebSocket:', error);
          socket.emit('conversation:error', { error: 'Failed to fetch conversation' });
        }
      });

      socket.on('conversation:list', async (data: { limit?: number; offset?: number }) => {
        try {
          if (!socket.userId) {
            socket.emit('error', { message: 'Not authenticated' });
            return;
          }

          const conversations = await this.conversationService.getUserConversations(
            socket.userId,
            data.limit || 20,
            data.offset || 0
          );

          socket.emit('conversation:list', { success: true, conversations });
        } catch (error) {
          logger.error('Error fetching conversations via WebSocket:', error);
          socket.emit('conversation:error', { error: 'Failed to fetch conversations' });
        }
      });

      // Handle typing indicators
      socket.on('chat:typing_start', () => {
        if (socket.userId) {
          socket.broadcast.emit('chat:user_typing', { userId: socket.userId });
        }
      });

      socket.on('chat:typing_stop', () => {
        if (socket.userId) {
          socket.broadcast.emit('chat:user_stopped_typing', { userId: socket.userId });
        }
      });

      // Handle disconnection
      socket.on('disconnect', (reason) => {
        logger.info('WebSocket disconnection', {
          socketId: socket.id,
          userId: socket.userId,
          reason,
        });

        if (socket.userId) {
          this.connectedUsers.delete(socket.userId);
          this.socketUsers.delete(socket.id);
        }
      });

      // Handle errors
      socket.on('error', (error) => {
        logger.error('WebSocket error:', error);
      });
    });

    logger.info('WebSocket service initialized');
  }

  // Utility methods
  async broadcastToUser(userId: string, event: string, data: any): Promise<boolean> {
    const socketId = this.connectedUsers.get(userId);
    if (!socketId) {
      logger.warn('User not connected for broadcast', { userId, event });
      return false;
    }

    const socket = this.io.sockets.sockets.get(socketId);
    if (!socket) {
      logger.warn('Socket not found for broadcast', { userId, socketId, event });
      this.connectedUsers.delete(userId);
      return false;
    }

    socket.emit(event, data);
    logger.info('Broadcast sent to user', { userId, event });
    return true;
  }

  async broadcastToAll(event: string, data: any): Promise<void> {
    this.io.emit(event, data);
    logger.info('Broadcast sent to all users', { event });
  }

  getConnectedUsers(): string[] {
    return Array.from(this.connectedUsers.keys());
  }

  getUserCount(): number {
    return this.connectedUsers.size;
  }

  isUserConnected(userId: string): boolean {
    return this.connectedUsers.has(userId);
  }

  getConnectionStats(): {
    totalConnections: number;
    authenticatedUsers: number;
    anonymousConnections: number;
  } {
    const totalConnections = this.io.sockets.sockets.size;
    const authenticatedUsers = this.connectedUsers.size;
    const anonymousConnections = totalConnections - authenticatedUsers;

    return {
      totalConnections,
      authenticatedUsers,
      anonymousConnections,
    };
  }
}