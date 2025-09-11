import { SimplePrismaClient } from '../db/simple-client.js';
import { ConversationService } from './conversation.service.js';
import { logger } from '../lib/logger.js';

export interface TourStep {
  id: string;
  name: string;
  title: string;
  description: string;
  targetElement?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  content: string;
  nextStep?: string;
  prevStep?: string;
  isOptional?: boolean;
  completionCriteria?: string[];
}

export interface TourProgress {
  userId: string;
  currentStep: string;
  completedSteps: string[];
  startedAt: Date;
  lastActiveAt: Date;
  isCompleted: boolean;
  tourVersion: string;
}

export class TourService {
  // In-memory storage for MVP
  private tourProgress: Map<string, TourProgress> = new Map();
  private tourSteps: Map<string, TourStep> = new Map();

  constructor(
    private prisma: SimplePrismaClient,
    private conversationService: ConversationService
  ) {
    this.initializeTourSteps();
    logger.info('TourService initialized');
  }

  private initializeTourSteps(): void {
    const steps: TourStep[] = [
      {
        id: 'welcome',
        name: 'Welcome',
        title: 'Welcome to NEWTUBE!',
        description: 'Your personalized video streaming experience starts here.',
        content: 'Welcome to NEWTUBE! I\'m NOVA, your AI guide. I\'ll help you discover amazing videos from across the web, all in one customizable interface. Ready to get started?',
        nextStep: 'panels-intro',
      },
      {
        id: 'panels-intro',
        name: 'Panel System',
        title: 'Customizable Panels',
        description: 'Learn about the drag-and-drop panel system.',
        targetElement: '[data-tour="panels-container"]',
        position: 'bottom',
        content: 'NEWTUBE uses a flexible panel system. Each panel can show different content - trending videos, your subscriptions, search results, or custom feeds. You can drag, resize, and arrange them however you like!',
        nextStep: 'video-discovery',
        prevStep: 'welcome',
      },
      {
        id: 'video-discovery',
        name: 'Video Discovery',
        title: 'Smart Discovery',
        description: 'Discover videos from multiple platforms.',
        targetElement: '[data-tour="search-bar"]',
        position: 'bottom',
        content: 'Search across YouTube, Vimeo, and other platforms all at once. Our AI learns your preferences to suggest better content over time. Try searching for something you\'re interested in!',
        nextStep: 'personalization',
        prevStep: 'panels-intro',
      },
      {
        id: 'personalization',
        name: 'AI Personalization',
        title: 'AI-Powered Recommendations',
        description: 'Learn how AI personalizes your experience.',
        targetElement: '[data-tour="recommendations"]',
        position: 'left',
        content: 'Our AI analyzes your viewing patterns, likes, and interactions to create personalized recommendations. The more you use NEWTUBE, the better it gets at finding content you\'ll love!',
        nextStep: 'layout-customization',
        prevStep: 'video-discovery',
      },
      {
        id: 'layout-customization',
        name: 'Layout Customization',
        title: 'Make It Yours',
        description: 'Customize your layout and save presets.',
        targetElement: '[data-tour="layout-controls"]',
        position: 'top',
        content: 'Create multiple layout presets for different moods or activities. Work layout, chill layout, discovery layout - organize your space exactly how you want it!',
        nextStep: 'privacy-controls',
        prevStep: 'personalization',
      },
      {
        id: 'privacy-controls',
        name: 'Privacy & Control',
        title: 'Your Data, Your Control',
        description: 'Understanding privacy features.',
        targetElement: '[data-tour="privacy-settings"]',
        position: 'right',
        content: 'NEWTUBE doesn\'t host videos - we just help you find and organize them. You control what data is stored, and you can always export or delete your information. Privacy first!',
        nextStep: 'tour-complete',
        prevStep: 'layout-customization',
      },
      {
        id: 'tour-complete',
        name: 'Tour Complete',
        title: 'Ready to Explore!',
        description: 'Tour completed successfully.',
        content: 'Congratulations! You\'re all set to explore NEWTUBE. Remember, I\'m always here if you need help. You can access this tour again from the help menu. Happy streaming!',
        prevStep: 'privacy-controls',
      },
    ];

    // Store steps in the map
    steps.forEach(step => {
      this.tourSteps.set(step.id, step);
    });

    logger.info(`Initialized ${steps.length} tour steps`);
  }

  async startTour(userId: string): Promise<TourProgress> {
    logger.info('Starting tour for user', { userId });

    const progress: TourProgress = {
      userId,
      currentStep: 'welcome',
      completedSteps: [],
      startedAt: new Date(),
      lastActiveAt: new Date(),
      isCompleted: false,
      tourVersion: '1.0.0',
    };

    this.tourProgress.set(userId, progress);

    // Send welcome message via conversation service
    await this.conversationService.processMessage({
      message: 'I want to start the tour',
      userId,
      context: {
        tourStep: 'welcome',
        userIntent: 'start_tour',
      },
    });

    return progress;
  }

  async getTourProgress(userId: string): Promise<TourProgress | null> {
    logger.info('Getting tour progress', { userId });
    
    const progress = this.tourProgress.get(userId);
    if (!progress) {
      logger.info('No tour progress found for user', { userId });
      return null;
    }

    return progress;
  }

  async updateTourStep(userId: string, stepId: string): Promise<TourStep | null> {
    logger.info('Updating tour step', { userId, stepId });

    const progress = this.tourProgress.get(userId);
    const step = this.tourSteps.get(stepId);

    if (!progress) {
      logger.error('No tour progress found for user', { userId });
      return null;
    }

    if (!step) {
      logger.error('Invalid tour step', { stepId });
      return null;
    }

    // Update progress
    if (!progress.completedSteps.includes(progress.currentStep)) {
      progress.completedSteps.push(progress.currentStep);
    }

    progress.currentStep = stepId;
    progress.lastActiveAt = new Date();

    // Check if tour is completed
    if (stepId === 'tour-complete') {
      progress.isCompleted = true;
      logger.info('Tour completed for user', { userId });
    }

    // Send contextual message via conversation service
    await this.conversationService.processMessage({
      message: `Tell me about step: ${step.name}`,
      userId,
      context: {
        tourStep: stepId,
        userIntent: 'tour_step_info',
      },
    });

    return step;
  }

  async completeTourStep(userId: string, stepId: string): Promise<boolean> {
    logger.info('Completing tour step', { userId, stepId });

    const progress = this.tourProgress.get(userId);
    if (!progress) {
      logger.error('No tour progress found for user', { userId });
      return false;
    }

    if (!progress.completedSteps.includes(stepId)) {
      progress.completedSteps.push(stepId);
      progress.lastActiveAt = new Date();
    }

    return true;
  }

  async skipTour(userId: string): Promise<boolean> {
    logger.info('Skipping tour for user', { userId });

    const progress = this.tourProgress.get(userId);
    if (!progress) {
      return false;
    }

    progress.isCompleted = true;
    progress.currentStep = 'tour-complete';
    progress.lastActiveAt = new Date();

    return true;
  }

  async resetTour(userId: string): Promise<boolean> {
    logger.info('Resetting tour for user', { userId });

    this.tourProgress.delete(userId);
    return true;
  }

  getTourStep(stepId: string): TourStep | null {
    return this.tourSteps.get(stepId) || null;
  }

  getAllTourSteps(): TourStep[] {
    return Array.from(this.tourSteps.values());
  }

  async getTourStats(): Promise<{
    totalUsers: number;
    activeUsers: number;
    completedUsers: number;
    averageProgress: number;
  }> {
    const allProgress = Array.from(this.tourProgress.values());
    
    const totalUsers = allProgress.length;
    const activeUsers = allProgress.filter(p => 
      (Date.now() - p.lastActiveAt.getTime()) < 24 * 60 * 60 * 1000 // Active in last 24h
    ).length;
    const completedUsers = allProgress.filter(p => p.isCompleted).length;
    
    const averageProgress = totalUsers > 0 
      ? allProgress.reduce((sum, p) => sum + p.completedSteps.length, 0) / totalUsers 
      : 0;

    return {
      totalUsers,
      activeUsers,
      completedUsers,
      averageProgress,
    };
  }
}