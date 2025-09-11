import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { logger } from './lib/logger.js';
import { prisma } from './db/simple-client.js';
import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers/index.js';
import { createContext } from './graphql/context.js';
import { ConversationService } from './services/conversation.service.js';
import { TourService } from './services/tour.service.js';
import { LLMService } from './services/llm.service.js';
import { WebSocketService } from './services/websocket.service.js';

const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

async function startServer() {
  // Create Express app and HTTP server
  const app = express();
  const httpServer = createServer(app);

  // Initialize Socket.IO with CORS configuration
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: [FRONTEND_URL, 'http://localhost:3000', 'http://localhost:3001'],
      methods: ['GET', 'POST'],
      allowedHeaders: ['authorization', 'content-type'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
  });

  // Initialize services
  const llmService = new LLMService();
  const conversationService = new ConversationService(prisma, llmService);
  const tourService = new TourService(prisma, conversationService);
  const webSocketService = new WebSocketService(io, conversationService, tourService);

  // Set up Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: process.env.NODE_ENV !== 'production',
    includeStacktraceInErrorResponses: process.env.NODE_ENV === 'development',
  });

  await server.start();

  // Middleware
  app.use(cors({
    origin: [FRONTEND_URL, 'http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  }));

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    });
  });

  // REST API routes
  const { chatRouter } = await import('./routes/chat.js');
  app.use('/api/chat', chatRouter);

  // GraphQL endpoint
  app.use('/graphql', expressMiddleware(server, {
    context: createContext,
  }));

  // WebSocket connection handling
  webSocketService.initialize();

  // Start server
  httpServer.listen(PORT, () => {
    logger.info(`🚀 NEWTUBE Conversation Backend ready at http://localhost:${PORT}`);
    logger.info(`📊 GraphQL endpoint: http://localhost:${PORT}/graphql`);
    logger.info(`🔌 WebSocket server running on port ${PORT}`);
    logger.info(`🌐 Frontend URL: ${FRONTEND_URL}`);
  });

  // Graceful shutdown
  const shutdown = async () => {
    logger.info('Starting graceful shutdown...');
    
    await new Promise<void>((resolve) => {
      io.close(() => {
        logger.info('WebSocket server closed');
        resolve();
      });
    });

    await server.stop();
    logger.info('Apollo Server stopped');

    await prisma.$disconnect();
    logger.info('Database connection closed');

    process.exit(0);
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

// Start the server
startServer().catch((error) => {
  logger.error('Failed to start server:', error);
  process.exit(1);
});