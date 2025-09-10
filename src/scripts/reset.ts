/**
 * Database Reset Script for NEWTUBE Development
 * 
 * Safely resets the database and optionally re-seeds with sample data.
 * Development only - prevents accidental production data loss.
 */

import { execSync } from 'child_process';
import { logger } from '../lib/logger';
import { seed } from './seed';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Confirm production environment protection
 */
function checkEnvironment(): void {
  if (process.env.NODE_ENV === 'production') {
    logger.error('DATABASE RESET IS NOT ALLOWED IN PRODUCTION');
    logger.error('This script will destroy all data and cannot be run in production');
    process.exit(1);
  }
  
  if (!process.env.DATABASE_URL) {
    logger.error('DATABASE_URL environment variable is required');
    process.exit(1);
  }
  
  // Additional safety check for production-like URLs
  const dbUrl = process.env.DATABASE_URL;
  const productionKeywords = [
    'prod',
    'production',
    'live',
    'aws',
    'azure',
    'gcp',
    'cloud',
  ];
  
  const hasProductionKeyword = productionKeywords.some(keyword => 
    dbUrl.toLowerCase().includes(keyword)
  );
  
  if (hasProductionKeyword) {
    logger.error('Database URL appears to be production environment');
    logger.error('Refusing to reset potentially production database');
    process.exit(1);
  }
}

/**
 * Interactive confirmation for reset
 */
async function confirmReset(): Promise<boolean> {
  // In CI/CD or automated environments, skip confirmation
  if (process.env.CI || process.argv.includes('--force')) {
    logger.warn('Skipping confirmation due to --force flag or CI environment');
    return true;
  }
  
  // For manual runs, require explicit confirmation
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  return new Promise((resolve) => {
    rl.question(
      '\n⚠️  This will PERMANENTLY DELETE ALL DATA in the database.\n' +
      '   Are you sure you want to continue? (type "RESET" to confirm): ',
      (answer: string) => {
        rl.close();
        resolve(answer === 'RESET');
      }
    );
  });
}

/**
 * Reset database schema and migrations
 */
async function resetDatabase(): Promise<void> {
  logger.info('Resetting database schema...');
  
  try {
    // Reset migrations and recreate schema
    execSync('npx prisma migrate reset --force', {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
    
    logger.info('Database schema reset completed');
    
  } catch (error) {
    logger.error('Database reset failed', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    throw error;
  }
}

/**
 * Regenerate Prisma client
 */
async function regenerateClient(): Promise<void> {
  logger.info('Regenerating Prisma client...');
  
  try {
    execSync('npx prisma generate', {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
    
    logger.info('Prisma client regenerated');
    
  } catch (error) {
    logger.error('Client regeneration failed', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    throw error;
  }
}

/**
 * Main reset function
 */
async function reset(): Promise<void> {
  logger.info('Starting database reset process...');
  
  try {
    // Safety checks
    checkEnvironment();
    
    // Confirm with user (unless forced)
    const confirmed = await confirmReset();
    if (!confirmed) {
      logger.info('Database reset cancelled by user');
      return;
    }
    
    logger.warn('Proceeding with database reset...');
    
    // Reset database
    await resetDatabase();
    
    // Regenerate client
    await regenerateClient();
    
    // Optionally seed with sample data
    const shouldSeed = process.argv.includes('--seed') || 
                      process.argv.includes('--with-seed');
    
    if (shouldSeed) {
      logger.info('Seeding database with sample data...');
      await seed();
    }
    
    logger.info('Database reset completed successfully');
    
    if (shouldSeed) {
      logger.info('Sample data has been added to the database');
      logger.info('You can now start the development server');
    } else {
      logger.info('Database is empty - run "npm run db:seed" to add sample data');
    }
    
  } catch (error) {
    logger.error('Database reset process failed', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    process.exit(1);
  }
}

/**
 * Display help information
 */
function showHelp(): void {
  console.log(`
NEWTUBE Database Reset Script

Usage:
  npm run db:reset                # Reset database (with confirmation)
  npm run db:reset -- --force     # Reset without confirmation
  npm run db:reset -- --seed      # Reset and seed with sample data
  npm run db:reset -- --help      # Show this help

Options:
  --force      Skip confirmation prompt (use in CI/CD)
  --seed       Seed database with sample data after reset
  --help       Show this help message

Environment Variables:
  NODE_ENV     Must NOT be 'production'
  DATABASE_URL Database connection string
  CI           Auto-confirms if set (CI/CD mode)

Safety Features:
  ✓ Prevents running in production
  ✓ Checks for production-like database URLs
  ✓ Requires explicit confirmation
  ✓ Logs all operations

Examples:
  # Development reset with sample data
  npm run db:reset -- --seed

  # CI/CD automated reset
  NODE_ENV=test npm run db:reset -- --force --seed
`);
}

/**
 * Main function - handle command line arguments
 */
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }
  
  await reset();
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
    logger.error('Reset script failed', { error: error.message });
    process.exit(1);
  });
}

export { reset };