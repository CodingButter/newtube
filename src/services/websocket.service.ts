import { Server as SocketIOServer, Socket } from 'socket.io';
import { ConversationService } from './conversation.service.js';
import { TourService } from './tour.service.js';
import { getVoiceService } from './voice.service.js';
import { getAudioService } from './audio.service.js';
import { UIUpdateEvent, DynamicUIState, ComponentDefinition, VoiceCommand, VoiceResponse } from '../types/dynamic-ui';
import { AudioChunk, WebSocketMessage } from '../types/voice.types';
import { logger } from '../lib/logger';

export interface SocketWithUser extends Socket {
  userId?: string;
  sessionId?: string;
}

export class WebSocketService {
  private connectedUsers: Map<string, string> = new Map(); // userId -> socketId
  private socketUsers: Map<string, string> = new Map(); // socketId -> userId
  private sessionSockets: Map<string, string> = new Map(); // sessionId -> socketId
  private socketSessions: Map<string, string> = new Map(); // socketId -> sessionId

  constructor(
    private io: SocketIOServer,
    private conversationService: ConversationService,
    private tourService: TourService
  ) {}

  initialize(): void {
    this.io.on('connection', (socket: SocketWithUser) => {
      logger.info('WebSocket connection established', { socketId: socket.id });

      // Handle user authentication/identification
      socket.on('authenticate', async (data: { userId: string; sessionId?: string; token?: string }) => {
        try {
          // For MVP, we'll accept any userId without validation
          // In production, validate the token here
          socket.userId = data.userId;
          this.connectedUsers.set(data.userId, socket.id);
          this.socketUsers.set(socket.id, data.userId);

          // Handle session association
          if (data.sessionId) {
            socket.sessionId = data.sessionId;
            this.sessionSockets.set(data.sessionId, socket.id);
            this.socketSessions.set(socket.id, data.sessionId);
          }

          logger.info('User authenticated via WebSocket', {
            userId: data.userId,
            sessionId: data.sessionId,
            socketId: socket.id,
          });

          socket.emit('authenticated', { success: true, userId: data.userId, sessionId: data.sessionId });
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

      // DYNAMIC UI EVENT HANDLERS
      
      // Join a UI session for real-time updates
      socket.on('ui:join_session', (data: { sessionId: string }) => {
        try {
          socket.sessionId = data.sessionId;
          socket.join(`ui_session_${data.sessionId}`);
          this.sessionSockets.set(data.sessionId, socket.id);
          this.socketSessions.set(socket.id, data.sessionId);

          logger.info('Socket joined UI session', {
            socketId: socket.id,
            sessionId: data.sessionId,
            userId: socket.userId
          });

          socket.emit('ui:session_joined', { success: true, sessionId: data.sessionId });
        } catch (error) {
          logger.error('Error joining UI session:', error);
          socket.emit('ui:session_error', { error: 'Failed to join session' });
        }
      });

      // Leave a UI session
      socket.on('ui:leave_session', (data: { sessionId: string }) => {
        try {
          socket.leave(`ui_session_${data.sessionId}`);
          this.sessionSockets.delete(data.sessionId);
          this.socketSessions.delete(socket.id);
          socket.sessionId = undefined;

          logger.info('Socket left UI session', {
            socketId: socket.id,
            sessionId: data.sessionId
          });

          socket.emit('ui:session_left', { success: true, sessionId: data.sessionId });
        } catch (error) {
          logger.error('Error leaving UI session:', error);
          socket.emit('ui:session_error', { error: 'Failed to leave session' });
        }
      });

      // Handle voice commands for dynamic UI
      socket.on('ui:voice_command', async (data: VoiceCommand) => {
        try {
          if (!socket.sessionId) {
            socket.emit('ui:voice_error', { error: 'No active UI session' });
            return;
          }

          logger.info('Processing voice command for UI', {
            sessionId: socket.sessionId,
            transcript: data.transcript,
            confidence: data.confidence
          });

          // Broadcast to session that voice command is being processed
          this.io.to(`ui_session_${socket.sessionId}`).emit('ui:voice_processing', {
            sessionId: socket.sessionId,
            transcript: data.transcript
          });

          // Here you would integrate with your dynamic UI service
          // For now, we'll emit a placeholder response
          const response: VoiceResponse = {
            text: `Processing command: "${data.transcript}"`,
            actions: [],
            shouldSpeak: true,
            confidence: 0.8
          };

          socket.emit('ui:voice_response', response);

        } catch (error) {
          logger.error('Error processing voice command:', error);
          socket.emit('ui:voice_error', { error: 'Failed to process voice command' });
        }
      });

      // ENHANCED VOICE AND AUDIO STREAMING HANDLERS

      // Handle audio streaming requests
      socket.on('audio:stream_start', async (data: {
        messageId: string;
        text: string;
        voiceId?: string;
        emotions?: any[];
        streaming?: boolean;
      }) => {
        try {
          if (!socket.userId) {
            socket.emit('audio:error', { error: 'Not authenticated', messageId: data.messageId });
            return;
          }

          logger.info('Starting audio stream', {
            userId: socket.userId,
            messageId: data.messageId,
            textLength: data.text?.length || 0
          });

          const voiceService = getVoiceService();
          const audioService = getAudioService();

          // Emit stream start event
          const startMessage: WebSocketMessage = {
            type: 'audio_start',
            messageId: data.messageId,
            data: {
              status: 'started',
              timestamp: Date.now()
            }
          };
          socket.emit('audio:stream_event', startMessage);

          if (data.streaming) {
            // Handle streaming TTS
            const streamResponse = await voiceService.streamTTS(
              data.text, 
              { voiceId: data.voiceId }, 
              data.messageId
            );

            // For MVP, simulate streaming by sending progress updates
            let progress = 0;
            const streamInterval = setInterval(() => {
              progress += 10;
              
              const progressMessage: WebSocketMessage = {
                type: 'audio_chunk',
                messageId: data.messageId,
                data: {
                  progress,
                  sequence: Math.floor(progress / 10),
                  timestamp: Date.now()
                }
              };
              
              socket.emit('audio:stream_event', progressMessage);

              if (progress >= 100) {
                clearInterval(streamInterval);
                
                const completeMessage: WebSocketMessage = {
                  type: 'audio_complete',
                  messageId: data.messageId,
                  data: {
                    status: 'completed',
                    streamUrl: streamResponse.streamUrl,
                    timestamp: Date.now()
                  }
                };
                socket.emit('audio:stream_event', completeMessage);
              }
            }, 200);

            // Store interval for potential cancellation
            socket.data = socket.data || {};
            socket.data[`stream_${data.messageId}`] = streamInterval;

          } else {
            // Handle regular TTS
            const voiceResponse = await voiceService.synthesizeSpeech(
              data.text, 
              data.emotions || [], 
              { voiceId: data.voiceId }
            );

            const completeMessage: WebSocketMessage = {
              type: 'audio_complete',
              messageId: data.messageId,
              data: {
                audio: voiceResponse.audio,
                mimeType: voiceResponse.mimeType,
                voiceId: voiceResponse.voiceId,
                timestamp: Date.now()
              }
            };
            socket.emit('audio:stream_event', completeMessage);
          }

        } catch (error) {
          logger.error('Audio streaming error:', error);
          
          const errorMessage: WebSocketMessage = {
            type: 'audio_error',
            messageId: data.messageId,
            error: {
              code: error.code || 'AUDIO_STREAM_FAILED',
              message: error.message || 'Audio streaming failed',
              retryable: error.retryable || false
            }
          };
          socket.emit('audio:stream_event', errorMessage);
        }
      });

      // Handle stream cancellation
      socket.on('audio:stream_cancel', (data: { messageId: string }) => {
        try {
          logger.info('Cancelling audio stream', {
            userId: socket.userId,
            messageId: data.messageId
          });

          const voiceService = getVoiceService();
          const cancelled = voiceService.cancelStream(data.messageId);

          // Clear any local intervals
          if (socket.data && socket.data[`stream_${data.messageId}`]) {
            clearInterval(socket.data[`stream_${data.messageId}`]);
            delete socket.data[`stream_${data.messageId}`];
          }

          socket.emit('audio:stream_cancelled', {
            success: cancelled,
            messageId: data.messageId,
            timestamp: Date.now()
          });

        } catch (error) {
          logger.error('Error cancelling audio stream:', error);
          socket.emit('audio:stream_error', {
            error: 'Failed to cancel stream',
            messageId: data.messageId
          });
        }
      });

      // Handle audio chunk requests (for custom streaming)
      socket.on('audio:request_chunk', async (data: {
        messageId: string;
        sequence: number;
        chunkSize?: number;
      }) => {
        try {
          // For MVP, this would fetch from an active stream
          // In production, would implement proper chunk management
          
          logger.debug('Audio chunk requested', {
            messageId: data.messageId,
            sequence: data.sequence,
            chunkSize: data.chunkSize
          });

          // Simulate chunk response
          const chunk: AudioChunk = {
            id: `${data.messageId}-${data.sequence}`,
            sequence: data.sequence,
            data: new ArrayBuffer(data.chunkSize || 4096), // Empty buffer for MVP
            format: 'mp3',
            isLast: data.sequence >= 10, // Simulate 10 chunks
            timestamp: Date.now()
          };

          socket.emit('audio:chunk', {
            messageId: data.messageId,
            chunk: {
              ...chunk,
              data: Buffer.from(chunk.data).toString('base64') // Convert for transmission
            }
          });

        } catch (error) {
          logger.error('Error handling chunk request:', error);
          socket.emit('audio:chunk_error', {
            error: 'Failed to fetch chunk',
            messageId: data.messageId,
            sequence: data.sequence
          });
        }
      });

      // Handle audio quality updates
      socket.on('audio:update_quality', (data: {
        messageId: string;
        quality: 'high' | 'medium' | 'low';
        bitRate?: number;
      }) => {
        try {
          logger.info('Audio quality update requested', {
            messageId: data.messageId,
            quality: data.quality,
            bitRate: data.bitRate
          });

          // For MVP, acknowledge the update
          socket.emit('audio:quality_updated', {
            success: true,
            messageId: data.messageId,
            newQuality: data.quality,
            appliedBitRate: data.bitRate || (data.quality === 'high' ? 320 : data.quality === 'medium' ? 192 : 128)
          });

        } catch (error) {
          logger.error('Error updating audio quality:', error);
          socket.emit('audio:quality_error', {
            error: 'Failed to update quality',
            messageId: data.messageId
          });
        }
      });

      // Handle voice health checks
      socket.on('voice:health_check', async () => {
        try {
          const voiceService = getVoiceService();
          const healthStatus = await voiceService.healthCheck();
          
          socket.emit('voice:health_status', {
            status: healthStatus.status,
            timestamp: Date.now(),
            details: healthStatus.details
          });

        } catch (error) {
          logger.error('Voice health check error:', error);
          socket.emit('voice:health_status', {
            status: 'unhealthy',
            timestamp: Date.now(),
            error: error.message
          });
        }
      });

      // Handle component updates
      socket.on('ui:update_component', async (data: {
        sessionId: string;
        componentId: string;
        updates: Partial<ComponentDefinition>;
      }) => {
        try {
          if (!socket.sessionId || socket.sessionId !== data.sessionId) {
            socket.emit('ui:update_error', { error: 'Invalid session' });
            return;
          }

          logger.info('Component update via WebSocket', {
            sessionId: data.sessionId,
            componentId: data.componentId,
            socketId: socket.id
          });

          // Broadcast update to all clients in the session
          this.io.to(`ui_session_${data.sessionId}`).emit('ui:component_updated', {
            sessionId: data.sessionId,
            componentId: data.componentId,
            updates: data.updates,
            timestamp: Date.now(),
            source: socket.userId || 'anonymous'
          });

        } catch (error) {
          logger.error('Error updating component:', error);
          socket.emit('ui:update_error', { error: 'Failed to update component' });
        }
      });

      // Handle layout changes
      socket.on('ui:update_layout', async (data: {
        sessionId: string;
        layout: any;
        reason?: string;
      }) => {
        try {
          if (!socket.sessionId || socket.sessionId !== data.sessionId) {
            socket.emit('ui:update_error', { error: 'Invalid session' });
            return;
          }

          logger.info('Layout update via WebSocket', {
            sessionId: data.sessionId,
            reason: data.reason,
            socketId: socket.id
          });

          // Broadcast layout update to all clients in the session
          this.io.to(`ui_session_${data.sessionId}`).emit('ui:layout_updated', {
            sessionId: data.sessionId,
            layout: data.layout,
            timestamp: Date.now(),
            reason: data.reason,
            source: socket.userId || 'anonymous'
          });

        } catch (error) {
          logger.error('Error updating layout:', error);
          socket.emit('ui:update_error', { error: 'Failed to update layout' });
        }
      });

      // Handle state sync requests
      socket.on('ui:sync_state', async (data: { sessionId: string }) => {
        try {
          if (!socket.sessionId || socket.sessionId !== data.sessionId) {
            socket.emit('ui:sync_error', { error: 'Invalid session' });
            return;
          }

          // Here you would fetch the current UI state from your state manager
          // For now, we'll emit a placeholder
          socket.emit('ui:state_synced', {
            sessionId: data.sessionId,
            timestamp: Date.now(),
            success: true
          });

        } catch (error) {
          logger.error('Error syncing UI state:', error);
          socket.emit('ui:sync_error', { error: 'Failed to sync state' });
        }
      });

      // Handle disconnection
      socket.on('disconnect', (reason) => {
        logger.info('WebSocket disconnection', {
          socketId: socket.id,
          userId: socket.userId,
          sessionId: socket.sessionId,
          reason,
        });

        if (socket.userId) {
          this.connectedUsers.delete(socket.userId);
          this.socketUsers.delete(socket.id);
        }

        if (socket.sessionId) {
          this.sessionSockets.delete(socket.sessionId);
          this.socketSessions.delete(socket.id);
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
    activeSessions: number;
  } {
    const totalConnections = this.io.sockets.sockets.size;
    const authenticatedUsers = this.connectedUsers.size;
    const anonymousConnections = totalConnections - authenticatedUsers;
    const activeSessions = this.sessionSockets.size;

    return {
      totalConnections,
      authenticatedUsers,
      anonymousConnections,
      activeSessions,
    };
  }

  // DYNAMIC UI BROADCASTING METHODS

  async broadcastUIUpdate(update: UIUpdateEvent): Promise<void> {
    try {
      const sessionRoom = `ui_session_${update.sessionId}`;
      
      logger.info('Broadcasting UI update', {
        sessionId: update.sessionId,
        updateType: update.type,
        timestamp: update.metadata.timestamp
      });

      this.io.to(sessionRoom).emit('ui:update', update);
    } catch (error) {
      logger.error('Error broadcasting UI update:', error);
    }
  }

  async broadcastToSession(sessionId: string, event: string, data: any): Promise<boolean> {
    try {
      const sessionRoom = `ui_session_${sessionId}`;
      this.io.to(sessionRoom).emit(event, data);
      
      logger.debug('Broadcast sent to session', { sessionId, event });
      return true;
    } catch (error) {
      logger.error('Error broadcasting to session:', error);
      return false;
    }
  }

  async notifyComponentUpdate(
    sessionId: string, 
    componentId: string, 
    updates: Partial<ComponentDefinition>
  ): Promise<void> {
    const updateEvent: UIUpdateEvent = {
      type: 'component_updated',
      sessionId,
      component: { id: componentId, ...updates } as ComponentDefinition,
      metadata: {
        timestamp: Date.now(),
        source: 'system',
        reason: 'Component state changed'
      }
    };

    await this.broadcastUIUpdate(updateEvent);
  }

  async notifyLayoutChange(sessionId: string, layout: any, reason?: string): Promise<void> {
    const updateEvent: UIUpdateEvent = {
      type: 'layout_changed',
      sessionId,
      layout,
      metadata: {
        timestamp: Date.now(),
        source: 'system',
        reason: reason || 'Layout modified'
      }
    };

    await this.broadcastUIUpdate(updateEvent);
  }

  async notifyVoiceCommandProcessed(
    sessionId: string, 
    transcript: string, 
    response: VoiceResponse
  ): Promise<void> {
    await this.broadcastToSession(sessionId, 'ui:voice_command_result', {
      transcript,
      response,
      timestamp: Date.now()
    });
  }

  getSessionSocketId(sessionId: string): string | undefined {
    return this.sessionSockets.get(sessionId);
  }

  getSocketSession(socketId: string): string | undefined {
    return this.socketSessions.get(socketId);
  }

  isSessionActive(sessionId: string): boolean {
    return this.sessionSockets.has(sessionId);
  }

  getActiveSessions(): string[] {
    return Array.from(this.sessionSockets.keys());
  }

  async syncUIStateToSession(sessionId: string, state: DynamicUIState): Promise<void> {
    await this.broadcastToSession(sessionId, 'ui:state_update', {
      sessionId,
      state,
      timestamp: Date.now()
    });
  }
}