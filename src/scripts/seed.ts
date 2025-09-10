/**
 * Database Seed Script for NEWTUBE Development
 * 
 * Creates sample data for development and testing including:
 * - Sample users with different configurations
 * - Platform connections (mock encrypted tokens)
 * - Various layout configurations  
 * - Panel definitions
 * - User lists and preferences
 */

import { PrismaClient } from '../generated/prisma';
import { logger } from '../lib/logger';
import { encryptOAuthTokens } from '../lib/encryption';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

/**
 * Sample panel definitions for the panel library
 */
const samplePanels = [
  {
    type: 'VIDEO_FEED',
    name: 'Video Feed Panel',
    description: 'Displays a grid of videos from connected platforms',
    category: 'video',
    tags: ['video', 'feed', 'grid'],
    isBuiltIn: true,
    propsJson: {
      layout: 'grid',
      itemsPerPage: 12,
      showThumbnails: true,
      showDescriptions: true,
      autoRefresh: true,
      refreshInterval: 300000, // 5 minutes
    },
  },
  {
    type: 'VIDEO_PLAYER',
    name: 'Video Player Panel',
    description: 'Embedded video player with controls',
    category: 'video',
    tags: ['video', 'player', 'embed'],
    isBuiltIn: true,
    propsJson: {
      autoplay: false,
      showControls: true,
      showRelated: false,
      quality: 'auto',
    },
  },
  {
    type: 'SEARCH',
    name: 'Search Panel',
    description: 'Universal search across all connected platforms',
    category: 'tools',
    tags: ['search', 'universal', 'tools'],
    isBuiltIn: true,
    propsJson: {
      placeholder: 'Search videos...',
      showFilters: true,
      showSuggestions: true,
      maxResults: 20,
    },
  },
  {
    type: 'PLAYLISTS',
    name: 'Playlists Panel',
    description: 'Manage and view user playlists',
    category: 'social',
    tags: ['playlists', 'lists', 'management'],
    isBuiltIn: true,
    propsJson: {
      showThumbnails: true,
      sortBy: 'updated',
      showItemCount: true,
    },
  },
  {
    type: 'TRENDING',
    name: 'Trending Panel',
    description: 'Shows trending content from platforms',
    category: 'video',
    tags: ['trending', 'popular', 'discovery'],
    isBuiltIn: true,
    propsJson: {
      timeframe: '24h',
      platforms: ['youtube', 'vimeo'],
      category: 'all',
    },
  },
  {
    type: 'RECOMMENDATIONS',
    name: 'AI Recommendations Panel',
    description: 'AI-powered content recommendations',
    category: 'video',
    tags: ['ai', 'recommendations', 'personalized'],
    isBuiltIn: true,
    propsJson: {
      algorithm: 'collaborative',
      maxRecommendations: 10,
      includeWatched: false,
      refreshOnView: true,
    },
  },
];

/**
 * Sample user data with different configurations
 */
const sampleUsers = [
  {
    email: 'john.doe@example.com',
    clerkId: 'user_clerk_john_123',
    username: 'johndoe',
    displayName: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    settingsJson: {
      theme: 'dark',
      language: 'en',
      timezone: 'America/New_York',
      notifications: {
        email: true,
        push: false,
        newVideos: true,
        recommendations: true,
      },
    },
    isVerified: true,
  },
  {
    email: 'jane.smith@example.com',
    clerkId: 'user_clerk_jane_456',
    username: 'janesmith',
    displayName: 'Jane Smith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
    settingsJson: {
      theme: 'light',
      language: 'en',
      timezone: 'America/Los_Angeles',
      notifications: {
        email: false,
        push: true,
        newVideos: false,
        recommendations: true,
      },
    },
    isVerified: true,
  },
  {
    email: 'dev.user@example.com',
    clerkId: 'user_clerk_dev_789',
    username: 'devuser',
    displayName: 'Development User',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dev',
    settingsJson: {
      theme: 'auto',
      language: 'en',
      timezone: 'UTC',
      debug: true,
      notifications: {
        email: true,
        push: true,
        newVideos: true,
        recommendations: true,
      },
    },
    isVerified: false,
  },
];

/**
 * Generate mock encrypted OAuth tokens for development
 */
function generateMockTokens() {
  const mockAccessToken = `mock_access_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const mockRefreshToken = `mock_refresh_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  return encryptOAuthTokens({
    accessToken: mockAccessToken,
    refreshToken: mockRefreshToken,
  });
}

/**
 * Sample layout configurations
 */
const sampleLayouts = [
  {
    name: 'Default Dashboard',
    theme: 'default',
    isDefault: true,
    description: 'Standard dashboard layout with video feed and recommendations',
    tags: ['default', 'dashboard'],
    gridSpecJson: {
      cols: 12,
      rows: 8,
      gap: 16,
      padding: 16,
    },
  },
  {
    name: 'Video Focus',
    theme: 'dark',
    isDefault: false,
    description: 'Layout optimized for video watching',
    tags: ['video', 'watching', 'focus'],
    gridSpecJson: {
      cols: 16,
      rows: 10,
      gap: 8,
      padding: 8,
    },
  },
  {
    name: 'Discovery Mode',
    theme: 'light',
    isDefault: false,
    description: 'Layout for discovering new content',
    tags: ['discovery', 'trending', 'search'],
    gridSpecJson: {
      cols: 12,
      rows: 12,
      gap: 12,
      padding: 12,
    },
  },
];

/**
 * Sample user preferences
 */
const samplePreferences = [
  { key: 'ui.theme', category: 'ui', valueJson: 'dark' },
  { key: 'ui.sidebarCollapsed', category: 'ui', valueJson: false },
  { key: 'ui.layoutAnimations', category: 'ui', valueJson: true },
  { key: 'video.autoplay', category: 'video', valueJson: false },
  { key: 'video.defaultQuality', category: 'video', valueJson: 'auto' },
  { key: 'video.rememberPosition', category: 'video', valueJson: true },
  { key: 'ai.recommendations.enabled', category: 'ai', valueJson: true },
  { key: 'ai.recommendations.algorithm', category: 'ai', valueJson: 'collaborative' },
  { key: 'privacy.analyticsOptIn', category: 'privacy', valueJson: true },
  { key: 'privacy.shareWatchHistory', category: 'privacy', valueJson: false },
];

/**
 * Sample lists and list items
 */
const sampleLists = [
  {
    name: 'My Favorites',
    type: 'FAVORITES',
    description: 'My favorite videos from across platforms',
    isPublic: false,
    tags: ['favorites', 'personal'],
    thumbnail: 'https://picsum.photos/300/200?random=1',
  },
  {
    name: 'Watch Later',
    type: 'WATCHLIST',
    description: 'Videos to watch later',
    isPublic: false,
    tags: ['watchlist', 'queue'],
    thumbnail: 'https://picsum.photos/300/200?random=2',
  },
  {
    name: 'Tech Tutorials',
    type: 'PLAYLIST',
    description: 'Programming and technology tutorials',
    isPublic: true,
    tags: ['tech', 'programming', 'tutorials'],
    thumbnail: 'https://picsum.photos/300/200?random=3',
  },
];

/**
 * Clear existing data (development only)
 */
async function clearData(): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Cannot clear data in production');
  }
  
  logger.info('Clearing existing seed data...');
  
  // Delete in correct order to respect foreign key constraints
  await prisma.listItem.deleteMany();
  await prisma.list.deleteMany();
  await prisma.layoutPanel.deleteMany();
  await prisma.layout.deleteMany();
  await prisma.panel.deleteMany();
  await prisma.preference.deleteMany();
  await prisma.connection.deleteMany();
  await prisma.user.deleteMany();
  
  logger.info('Existing data cleared');
}

/**
 * Seed panel definitions
 */
async function seedPanels(): Promise<any[]> {
  logger.info('Seeding panel definitions...');
  
  const panels = await Promise.all(
    samplePanels.map((panel) =>
      prisma.panel.create({
        data: panel,
      })
    )
  );
  
  logger.info(`Created ${panels.length} panel definitions`);
  return panels;
}

/**
 * Seed users
 */
async function seedUsers(): Promise<any[]> {
  logger.info('Seeding users...');
  
  const users = await Promise.all(
    sampleUsers.map((user) =>
      prisma.user.create({
        data: user,
      })
    )
  );
  
  logger.info(`Created ${users.length} users`);
  return users;
}

/**
 * Seed platform connections
 */
async function seedConnections(users: any[]): Promise<void> {
  logger.info('Seeding platform connections...');
  
  const connections = [];
  
  // Give first user YouTube and Vimeo connections
  if (users[0]) {
    connections.push({
      userId: users[0].id,
      provider: 'youtube',
      ...generateMockTokens(),
      expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
      scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
      status: 'ACTIVE',
      providerUserId: 'youtube_user_123',
      providerUsername: 'johndoe_yt',
    });
    
    connections.push({
      userId: users[0].id,
      provider: 'vimeo',
      ...generateMockTokens(),
      expiresAt: new Date(Date.now() + 86400000), // 24 hours from now
      scopes: ['public'],
      status: 'ACTIVE',
      providerUserId: 'vimeo_user_456',
      providerUsername: 'johndoe_vimeo',
    });
  }
  
  // Give second user only YouTube
  if (users[1]) {
    connections.push({
      userId: users[1].id,
      provider: 'youtube',
      ...generateMockTokens(),
      expiresAt: new Date(Date.now() + 7200000), // 2 hours from now
      scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
      status: 'ACTIVE',
      providerUserId: 'youtube_user_789',
      providerUsername: 'janesmith_yt',
    });
  }
  
  await Promise.all(
    connections.map((connection) =>
      prisma.connection.create({ data: connection })
    )
  );
  
  logger.info(`Created ${connections.length} platform connections`);
}

/**
 * Seed layouts and layout panels
 */
async function seedLayouts(users: any[], panels: any[]): Promise<void> {
  logger.info('Seeding layouts...');
  
  for (const user of users) {
    for (const layoutData of sampleLayouts) {
      const layout = await prisma.layout.create({
        data: {
          ...layoutData,
          userId: user.id,
        },
      });
      
      // Add some panels to each layout
      const layoutPanels = [
        {
          layoutId: layout.id,
          panelId: panels.find(p => p.type === 'VIDEO_FEED')?.id,
          gridX: 0,
          gridY: 0,
          gridWidth: 8,
          gridHeight: 4,
          propsJson: { showFilters: true },
        },
        {
          layoutId: layout.id,
          panelId: panels.find(p => p.type === 'SEARCH')?.id,
          gridX: 8,
          gridY: 0,
          gridWidth: 4,
          gridHeight: 2,
          propsJson: {},
        },
        {
          layoutId: layout.id,
          panelId: panels.find(p => p.type === 'RECOMMENDATIONS')?.id,
          gridX: 8,
          gridY: 2,
          gridWidth: 4,
          gridHeight: 2,
          propsJson: { maxRecommendations: 5 },
        },
      ].filter(panel => panel.panelId); // Filter out any undefined panels
      
      await Promise.all(
        layoutPanels.map((panelData) =>
          prisma.layoutPanel.create({ data: panelData })
        )
      );
    }
  }
  
  logger.info('Layouts and panels seeded');
}

/**
 * Seed user preferences
 */
async function seedPreferences(users: any[]): Promise<void> {
  logger.info('Seeding user preferences...');
  
  let totalPreferences = 0;
  
  for (const user of users) {
    const userPreferences = samplePreferences.map((pref) => ({
      ...pref,
      userId: user.id,
    }));
    
    await Promise.all(
      userPreferences.map((pref) =>
        prisma.preference.create({ data: pref })
      )
    );
    
    totalPreferences += userPreferences.length;
  }
  
  logger.info(`Created ${totalPreferences} user preferences`);
}

/**
 * Seed lists and list items
 */
async function seedLists(users: any[]): Promise<void> {
  logger.info('Seeding lists and list items...');
  
  for (const user of users) {
    for (const listData of sampleLists) {
      const list = await prisma.list.create({
        data: {
          ...listData,
          userId: user.id,
        },
      });
      
      // Add some sample list items
      const listItems = [
        {
          listId: list.id,
          platformId: 'dQw4w9WgXcQ',
          platform: 'youtube',
          title: 'Rick Astley - Never Gonna Give You Up',
          description: 'The official video for Rick Astley - Never Gonna Give You Up',
          thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          duration: 212,
          publishedAt: new Date('2009-10-25'),
          position: 0,
          rating: 5,
          isFavorite: true,
        },
        {
          listId: list.id,
          platformId: '9bZkp7q19f0',
          platform: 'youtube',
          title: 'PSY - GANGNAM STYLE',
          description: 'PSY - GANGNAM STYLE (강남스타일) M/V',
          thumbnailUrl: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
          duration: 252,
          publishedAt: new Date('2012-07-15'),
          position: 1,
          watchProgress: 0.75,
        },
        {
          listId: list.id,
          platformId: '123456789',
          platform: 'vimeo',
          title: 'Sample Vimeo Video',
          description: 'A sample video from Vimeo platform',
          thumbnailUrl: 'https://picsum.photos/640/360?random=4',
          duration: 180,
          publishedAt: new Date('2023-01-15'),
          position: 2,
          notes: 'Great cinematography in this one',
        },
      ];
      
      await Promise.all(
        listItems.map((item) =>
          prisma.listItem.create({ data: item })
        )
      );
      
      // Update list item count
      await prisma.list.update({
        where: { id: list.id },
        data: { itemCount: listItems.length },
      });
    }
  }
  
  logger.info('Lists and list items seeded');
}

/**
 * Main seed function
 */
async function seed(): Promise<void> {
  try {
    logger.info('Starting database seeding...');
    
    // Clear existing data in development
    if (process.env.NODE_ENV !== 'production') {
      await clearData();
    }
    
    // Seed data in correct order
    const panels = await seedPanels();
    const users = await seedUsers();
    await seedConnections(users);
    await seedLayouts(users, panels);
    await seedPreferences(users);
    await seedLists(users);
    
    logger.info('Database seeding completed successfully');
    
  } catch (error) {
    logger.error('Database seeding failed', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run if this file is executed directly
if (require.main === module) {
  seed().catch((error) => {
    logger.error('Seed script failed', { error: error.message });
    process.exit(1);
  });
}

export { seed };