/**
 * Database Migration Script for NEWTUBE
 * 
 * Handles database migrations with proper error handling and logging.
 * Can be run manually or as part of CI/CD pipeline.
 */

import { execSync } from 'child_process';
import { logger } from '../lib/logger';
import { checkDatabaseHealth } from '../db/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Run database migrations
 */
async function runMigrations(): Promise<void> {
  logger.info('Starting database migrations...');
  
  try {
    // Check database connection first
    const isHealthy = await checkDatabaseHealth();
    if (!isHealthy) {
      throw new Error('Database connection failed. Please check DATABASE_URL configuration.');
    }
    
    logger.info('Database connection verified');
    
    // Check if this is the first migration
    const isFirstMigration = process.argv.includes('--init');
    
    if (isFirstMigration) {
      logger.info('Running initial migration (creating database schema)...');
      
      // Generate and apply initial migration
      execSync('npx prisma migrate dev --name init', {
        stdio: 'inherit',
        cwd: process.cwd(),
      });
    } else {
      logger.info('Running database migrations...');
      
      // Apply pending migrations
      execSync('npx prisma migrate deploy', {
        stdio: 'inherit',
        cwd: process.cwd(),
      });
    }
    
    // Generate Prisma client
    logger.info('Generating Prisma client...');
    execSync('npx prisma generate', {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
    
    logger.info('Database migrations completed successfully');
    
  } catch (error) {
    logger.error('Migration failed', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    process.exit(1);
  }
}

/**
 * Reset database (development only)
 */
async function resetDatabase(): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    logger.error('Database reset is not allowed in production');
    process.exit(1);
  }
  
  logger.warn('Resetting database (this will destroy all data)...');
  
  try {
    // Reset database
    execSync('npx prisma migrate reset --force', {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
    
    logger.info('Database reset completed');
    
  } catch (error) {
    logger.error('Database reset failed', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    process.exit(1);
  }
}

/**
 * Check migration status
 */
async function checkMigrationStatus(): Promise<void> {
  logger.info('Checking migration status...');
  
  try {
    execSync('npx prisma migrate status', {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
    
  } catch (error) {
    logger.error('Failed to check migration status', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    process.exit(1);
  }
}

/**
 * Create a new migration
 */
async function createMigration(name: string): Promise<void> {
  if (!name) {
    logger.error('Migration name is required. Usage: npm run migrate:create -- --name "migration_name"');
    process.exit(1);
  }
  
  logger.info(`Creating new migration: ${name}`);
  
  try {
    execSync(`npx prisma migrate dev --name "${name}"`, {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
    
    logger.info(`Migration "${name}" created successfully`);
    
  } catch (error) {
    logger.error('Failed to create migration', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    process.exit(1);
  }
}

/**
 * Main function - handle command line arguments
 */
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  
  // Parse command line arguments
  if (args.includes('--reset')) {
    await resetDatabase();
  } else if (args.includes('--status')) {
    await checkMigrationStatus();
  } else if (args.includes('--create')) {
    const nameIndex = args.findIndex(arg => arg === '--name');
    const name = nameIndex !== -1 ? args[nameIndex + 1] : '';
    await createMigration(name || 'unnamed_migration');
  } else {
    await runMigrations();
  }
}

// Handle unhandled errors
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', { promise, reason });
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', { error: error.message, stack: error.stack });
  process.exit(1);
});

// Run if this file is executed directly
if (require.main === module) {
  main().catch((error) => {
    logger.error('Migration script failed', { error: error.message });
    process.exit(1);
  });
}

export { runMigrations, resetDatabase, checkMigrationStatus, createMigration };