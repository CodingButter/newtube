import { gql } from 'graphql-tag';

export const typeDefs = gql`
  scalar DateTime
  scalar JSON

  type Message {
    id: ID!
    role: String!
    content: String!
    timestamp: DateTime!
    metadata: JSON
  }

  type Conversation {
    id: ID!
    userId: String!
    title: String
    messages: [Message!]!
    createdAt: DateTime!
    updatedAt: DateTime!
    metadata: JSON
  }

  type ChatResponse {
    conversationId: ID!
    message: String!
    messageId: ID!
    timestamp: DateTime!
    context: JSON
  }

  type TourStep {
    id: ID!
    name: String!
    title: String!
    description: String!
    targetElement: String
    position: String
    content: String!
    nextStep: String
    prevStep: String
    isOptional: Boolean
    completionCriteria: [String!]
  }

  type TourProgress {
    userId: String!
    currentStep: String!
    completedSteps: [String!]!
    startedAt: DateTime!
    lastActiveAt: DateTime!
    isCompleted: Boolean!
    tourVersion: String!
  }

  type ServiceStats {
    totalConversations: Int!
    totalMessages: Int!
    uniqueUsers: Int!
    llmProvider: JSON!
  }

  type TourStats {
    totalUsers: Int!
    activeUsers: Int!
    completedUsers: Int!
    averageProgress: Float!
  }

  input ChatInput {
    message: String!
    conversationId: ID
    userId: String
    context: JSON
  }

  input TourStepInput {
    userId: String!
    stepId: String!
  }

  type Query {
    # Conversation queries
    conversation(id: ID!): Conversation
    userConversations(userId: String!, limit: Int = 20, offset: Int = 0): [Conversation!]!
    
    # Tour queries
    tourProgress(userId: String!): TourProgress
    tourStep(stepId: String!): TourStep
    allTourSteps: [TourStep!]!
    
    # Service stats
    serviceStats: ServiceStats!
    tourStats: TourStats!
    
    # Health check
    health: String!
  }

  type Mutation {
    # Chat mutations
    sendMessage(input: ChatInput!): ChatResponse!
    
    # Tour mutations
    startTour(userId: String!): TourProgress!
    updateTourStep(input: TourStepInput!): TourStep
    completeTourStep(input: TourStepInput!): Boolean!
    skipTour(userId: String!): Boolean!
    resetTour(userId: String!): Boolean!
    
    # Conversation mutations
    deleteConversation(id: ID!): Boolean!
  }

  type Subscription {
    # Real-time chat updates
    messageAdded(conversationId: ID!): Message!
    
    # Tour progress updates
    tourProgressUpdated(userId: String!): TourProgress!
    
    # System notifications
    systemNotification: JSON!
  }
`;