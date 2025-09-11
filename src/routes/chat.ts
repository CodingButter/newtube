import express from 'express';
import { ChatController } from '../controllers/chat.controller.js';
import { ConversationService } from '../services/conversation.service.js';
import { LLMService } from '../services/llm.service.js';
import { prisma } from '../db/simple-client.js';

const router = express.Router();

// Initialize services
const llmService = new LLMService();
const conversationService = new ConversationService(prisma, llmService);
const chatController = new ChatController(conversationService);

// Chat endpoint
router.post('/', chatController.handleChat.bind(chatController));

// Get conversation history
router.get('/:conversationId', chatController.getConversation.bind(chatController));

// Get user conversations
router.get('/user/:userId', chatController.getUserConversations.bind(chatController));

export { router as chatRouter };