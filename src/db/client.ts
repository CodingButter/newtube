/**
 * Database Client Configuration for NEWTUBE
 * 
 * Provides Prisma client instance with connection pooling,
 * logging, and error handling for production use.
 */

import { PrismaClient } from '../generated/prisma';
import { logger } from '../lib/logger';

// Global Prisma client instance for connection reuse
declare global {
  var __prisma: PrismaClient | undefined;
}

/**
 * Create Prisma client with optimal configuration
 */
function createPrismaClient(): PrismaClient {
  const prisma = new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'event',
        level: 'error',
      },
      {
        emit: 'event',
        level: 'info',
      },
      {
        emit: 'event',
        level: 'warn',
      },
    ],
    errorFormat: 'pretty',
  });

  // Query logging in development
  if (process.env.NODE_ENV === 'development' && process.env.DEBUG_SQL === 'true') {
    prisma.$on('query', (e) => {
      logger.debug('Database Query', {
        query: e.query,
        params: e.params,
        duration: `${e.duration}ms`,
        target: e.target,
      });
    });
  }

  // Error logging for all environments
  prisma.$on('error', (e) => {
    logger.error('Database Error', {
      message: e.message,
      target: e.target,
    });
  });

  // Info and warning logging
  prisma.$on('info', (e) => {
    logger.info('Database Info', { message: e.message, target: e.target });
  });

  prisma.$on('warn', (e) => {
    logger.warn('Database Warning', { message: e.message, target: e.target });
  });

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
    await db.$disconnect();
    logger.info('Database disconnected successfully');
  } catch (error) {
    logger.error('Error disconnecting from database', { error });
    throw error;
  }
}

/**
 * Health check for database connection
 */
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await db.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    logger.error('Database health check failed', { error });
    return false;
  }
}

/**
 * Get database connection info for monitoring
 */
export async function getDatabaseInfo() {
  try {
    const result = await db.$queryRaw<Array<{ version: string }>>`SELECT version()`;
    const version = result[0]?.version || 'Unknown';
    
    return {
      connected: true,
      version,
      prismaVersion: '6.16.0', // Current Prisma version
    };
  } catch (error) {
    return {
      connected: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Transaction helper with retry logic
 */
export async function withTransaction<T>(
  fn: (tx: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$extends'>) => Promise<T>,
  maxRetries = 3
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await db.$transaction(fn) as T;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown transaction error');
      
      if (attempt === maxRetries) {
        logger.error('Transaction failed after max retries', {
          attempts: maxRetries,
          error: lastError.message,
        });
        break;
      }
      
      // Wait before retry (exponential backoff)
      const delay = Math.pow(2, attempt - 1) * 100; // 100ms, 200ms, 400ms, etc.
      await new Promise(resolve => setTimeout(resolve, delay));
      
      logger.warn('Transaction retry', {
        attempt,
        maxRetries,
        delay,
        error: lastError.message,
      });
    }
  }
  
  throw lastError!;
}

/**
 * Soft delete helper - marks records as inactive instead of deleting
 */
export async function softDelete(
  model: keyof typeof db,
  where: any
): Promise<any> {
  const modelInstance = db[model] as any;
  
  if (!modelInstance.update) {
    throw new Error(`Model ${String(model)} does not support soft delete`);
  }
  
  return modelInstance.update({
    where,
    data: {
      isActive: false,
      updatedAt: new Date(),
    },
  });
}

export default db;