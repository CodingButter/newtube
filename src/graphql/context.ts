import { Request, Response } from 'express';
import { prisma } from '../db/simple-client.js';
import { ConversationService } from '../services/conversation.service.js';
import { TourService } from '../services/tour.service.js';
import { LLMService } from '../services/llm.service.js';
import { logger } from '../lib/logger.js';

export interface GraphQLContext {
  req: Request;
  res: Response;
  prisma: typeof prisma;
  conversationService: ConversationService;
  tourService: TourService;
  llmService: LLMService;
  user?: {
    id: string;
    email?: string;
  };
}

// Initialize services (singleton pattern for consistency)
let conversationServiceInstance: ConversationService;
let tourServiceInstance: TourService;
let llmServiceInstance: LLMService;

function getServices() {
  if (!llmServiceInstance) {
    llmServiceInstance = new LLMService();
    logger.info('LLMService instance created for GraphQL context');
  }
  
  if (!conversationServiceInstance) {
    conversationServiceInstance = new ConversationService(prisma, llmServiceInstance);
    logger.info('ConversationService instance created for GraphQL context');
  }
  
  if (!tourServiceInstance) {
    tourServiceInstance = new TourService(prisma, conversationServiceInstance);
    logger.info('TourService instance created for GraphQL context');
  }

  return {
    conversationService: conversationServiceInstance,
    tourService: tourServiceInstance,
    llmService: llmServiceInstance,
  };
}

export async function createContext({ req, res }: { req: Request; res: Response }): Promise<GraphQLContext> {
  const services = getServices();
  
  // Basic context without authentication for MVP
  // In production, extract and validate JWT token from Authorization header
  let user = undefined;
  
  // For MVP, accept user info from headers if provided
  const userId = req.headers['x-user-id'] as string;
  const userEmail = req.headers['x-user-email'] as string;
  
  if (userId) {
    user = {
      id: userId,
      email: userEmail,
    };
  }

  return {
    req,
    res,
    prisma,
    user,
    ...services,
  };
}