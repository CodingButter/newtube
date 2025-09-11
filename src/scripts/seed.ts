/**
 * Database Seeding Script for NEWTUBE Development
 * 
 * Seeds the database with sample data for development and testing:
 * - Test users with encrypted OAuth tokens
 * - Sample connections to external platforms
 * - Default panel definitions
 * - User lists and preferences
 */

// TODO: Generate Prisma types and re-enable seeding
// import { PrismaClient } from '../generated/prisma';
import { logger } from '../lib/logger';
import { encryptOAuthTokens } from '../lib/encryption';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Main seeding function - temporarily disabled until Prisma types are generated
 */
async function seed() {
  logger.info('Seeding script temporarily disabled - Prisma types not generated yet');
  logger.info('To enable seeding:');
  logger.info('1. Generate Prisma types: npx prisma generate');
  logger.info('2. Uncomment the seeding logic in this file');
  logger.info('3. Run: npm run seed');
}

/**
 * Main execution
 */
async function main() {
  try {
    await seed();
    logger.info('Seeding completed successfully');
  } catch (error) {
    logger.error('Error during seeding:', error);
    process.exit(1);
  }
}

// Run seeding if this script is executed directly
if (require.main === module) {
  main()
    .catch((error) => {
      logger.error('Seeding failed:', error);
      process.exit(1);
    });
}

export { seed, main };