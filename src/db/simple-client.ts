// Simple mock database client for MVP
// This will be replaced with actual Prisma client once database is set up

export class SimplePrismaClient {
  // Mock implementation for MVP
  async $connect() {
    // No-op for mock
  }

  async $disconnect() {
    // No-op for mock
  }
}

export const prisma = new SimplePrismaClient();