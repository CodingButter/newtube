import express from 'express'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import http from 'http'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// GraphQL type definitions
const typeDefs = `#graphql
  type Query {
    hello: String
    version: String
  }

  type User {
    id: ID!
    email: String!
    createdAt: String!
  }

  type Video {
    id: ID!
    title: String!
    description: String
    provider: String!
    externalId: String!
    thumbnailUrl: String
    duration: Int
    createdAt: String!
  }
`

// GraphQL resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello from NEWTUBE Backend API! 🎥',
    version: () => '1.0.0'
  }
}

async function startServer() {
  // Create Express app
  const app = express()
  const httpServer = http.createServer(app)

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  // Start Apollo Server
  await server.start()

  // Configure CORS for frontend communication
  app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }))

  app.use(express.json())

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      service: 'newtube-backend',
      version: '1.0.0'
    })
  })

  // GraphQL endpoint
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      // Add authentication context here when needed
      return {
        user: null // TODO: Add user context from JWT
      }
    }
  }))

  // Start HTTP server
  const PORT = process.env.PORT || 4000
  
  await new Promise<void>((resolve) => {
    httpServer.listen({ port: PORT }, resolve)
  })

  console.log(`🚀 NEWTUBE Backend ready!`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`🎯 GraphQL endpoint: http://localhost:${PORT}/graphql`)
  console.log(`🌐 GraphQL Playground: http://localhost:${PORT}/graphql`)
}

// Start the server
startServer().catch((error) => {
  console.error('Failed to start server:', error)
  process.exit(1)
})