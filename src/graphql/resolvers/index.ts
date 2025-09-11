import { Resolvers } from '../types.js';
import { GraphQLContext } from '../context.js';
import { GraphQLScalarType, Kind } from 'graphql';
import { logger } from '../../lib/logger.js';

// Custom scalar types
const DateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'DateTime custom scalar type',
  serialize(value: any) {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return new Date(value).toISOString();
  },
  parseValue(value: any) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

const JSONScalar = new GraphQLScalarType({
  name: 'JSON',
  description: 'JSON custom scalar type',
  serialize(value: any) {
    return value;
  },
  parseValue(value: any) {
    return value;
  },
  parseLiteral(ast: any) {
    switch (ast.kind) {
      case Kind.STRING:
      case Kind.BOOLEAN:
        return ast.value;
      case Kind.INT:
      case Kind.FLOAT:
        return parseFloat(ast.value);
      case Kind.OBJECT:
        return ast.fields.reduce((value: any, field: any) => {
          value[field.name.value] = JSONScalar.parseLiteral!(field.value, {});
          return value;
        }, {});
      case Kind.LIST:
        return ast.values.map((v: any) => JSONScalar.parseLiteral!(v, {}));
      default:
        return null;
    }
  },
});

export const resolvers: Resolvers = {
  // Custom scalars
  DateTime: DateTimeScalar,
  JSON: JSONScalar,

  // Queries
  Query: {
    health: () => {
      return 'NEWTUBE Conversation API is healthy';
    },

    conversation: async (_, { id }, context: GraphQLContext) => {
      logger.info('GraphQL: Fetching conversation', { id });
      return await context.conversationService.getConversation(id);
    },

    userConversations: async (_, { userId, limit, offset }, context: GraphQLContext) => {
      logger.info('GraphQL: Fetching user conversations', { userId, limit, offset });
      return await context.conversationService.getUserConversations(userId, limit, offset);
    },

    tourProgress: async (_, { userId }, context: GraphQLContext) => {
      logger.info('GraphQL: Fetching tour progress', { userId });
      return await context.tourService.getTourProgress(userId);
    },

    tourStep: (_, { stepId }, context: GraphQLContext) => {
      logger.info('GraphQL: Fetching tour step', { stepId });
      return context.tourService.getTourStep(stepId);
    },

    allTourSteps: (_, __, context: GraphQLContext) => {
      logger.info('GraphQL: Fetching all tour steps');
      return context.tourService.getAllTourSteps();
    },

    serviceStats: (_, __, context: GraphQLContext) => {
      logger.info('GraphQL: Fetching service stats');
      return context.conversationService.getServiceStats();
    },

    tourStats: async (_, __, context: GraphQLContext) => {
      logger.info('GraphQL: Fetching tour stats');
      return await context.tourService.getTourStats();
    },
  },

  // Mutations
  Mutation: {
    sendMessage: async (_, { input }, context: GraphQLContext) => {
      logger.info('GraphQL: Processing chat message', { 
        messageLength: input.message.length,
        conversationId: input.conversationId,
        userId: input.userId 
      });

      const response = await context.conversationService.processMessage({
        message: input.message,
        conversationId: input.conversationId,
        userId: input.userId || 'anonymous',
        context: input.context || {},
      });

      return response;
    },

    startTour: async (_, { userId }, context: GraphQLContext) => {
      logger.info('GraphQL: Starting tour', { userId });
      return await context.tourService.startTour(userId);
    },

    updateTourStep: async (_, { input }, context: GraphQLContext) => {
      logger.info('GraphQL: Updating tour step', { userId: input.userId, stepId: input.stepId });
      return await context.tourService.updateTourStep(input.userId, input.stepId);
    },

    completeTourStep: async (_, { input }, context: GraphQLContext) => {
      logger.info('GraphQL: Completing tour step', { userId: input.userId, stepId: input.stepId });
      return await context.tourService.completeTourStep(input.userId, input.stepId);
    },

    skipTour: async (_, { userId }, context: GraphQLContext) => {
      logger.info('GraphQL: Skipping tour', { userId });
      return await context.tourService.skipTour(userId);
    },

    resetTour: async (_, { userId }, context: GraphQLContext) => {
      logger.info('GraphQL: Resetting tour', { userId });
      return await context.tourService.resetTour(userId);
    },

    deleteConversation: async (_, { id }, context: GraphQLContext) => {
      logger.info('GraphQL: Deleting conversation', { id });
      return await context.conversationService.deleteConversation(id);
    },
  },

  // Subscriptions (stubbed for MVP)
  Subscription: {
    messageAdded: {
      // For MVP, we'll implement this later with proper pub/sub
      subscribe: () => {
        throw new Error('Subscriptions not implemented in MVP');
      },
    },

    tourProgressUpdated: {
      subscribe: () => {
        throw new Error('Subscriptions not implemented in MVP');
      },
    },

    systemNotification: {
      subscribe: () => {
        throw new Error('Subscriptions not implemented in MVP');
      },
    },
  },
};