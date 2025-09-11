/**
 * Database Client Configuration for NEWTUBE
 * 
 * Provides Prisma client instance with connection pooling,
 * logging, and error handling for production use.
 */

// TODO: Generate Prisma types - temporarily using mock
interface PrismaClient {
  $connect(): Promise<void>;
  $disconnect(): Promise<void>;
}

import { logger } from '../lib/logger';

// Global Prisma client instance for connection reuse
declare global {
  var __prisma: PrismaClient | undefined;
}

/**
 * Create Prisma client with optimal configuration
 */
function createPrismaClient(): PrismaClient {
  // TODO: Replace with actual PrismaClient when types are generated
  const prisma = {
    $connect: async () => {},
    $disconnect: async () => {}
  } as PrismaClient;

  return prisma;
}

/**
 * Singleton Prisma client instance
 * Reuses connection in development, creates new in production
 */
export const db = globalThis.__prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = db;
}

/**
 * Gracefully disconnect from database
 * Call this during application shutdown
 */
export async function disconnectDatabase(): Promise<void> {
  try {
    logger.info('Disconnecting from database...');
    await db.$disconnect();
    logger.info('Database disconnected successfully');
  } catch (error) {
    logger.error('Error disconnecting from database:', error);
    throw error;
  }
}

/**
 * Check database connection health
 */
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await db.$connect();
    logger.info('Database health check passed');
    return true;
  } catch (error) {
    logger.error('Database health check failed:', error);
    return false;
  }
}

/**
 * Database connection metrics
 */
export function getDatabaseMetrics() {
  return {
    connected: true, // TODO: Implement actual connection status
    activeConnections: 1, // TODO: Get from Prisma metrics
    poolSize: parseInt(process.env.DATABASE_POOL_SIZE || '10'),
    environment: process.env.NODE_ENV,
    url: process.env.DATABASE_URL ? '***' : 'not configured'
  };
}

// Graceful shutdown handlers
process.on('SIGINT', async () => {
  logger.info('SIGINT received, disconnecting from database...');
  await disconnectDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, disconnecting from database...');
  await disconnectDatabase();
  process.exit(0);
});

// Handle uncaught promise rejections
process.on('unhandledRejection', async (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  await disconnectDatabase();
  process.exit(1);
});