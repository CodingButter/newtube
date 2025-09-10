/**
 * Database Type Definitions for NEWTUBE
 * 
 * Provides TypeScript types that extend Prisma-generated types
 * with additional utility types and validation schemas.
 */

import { z } from 'zod';
import type {
  User,
  Connection,
  Layout,
  Panel,
  LayoutPanel,
  List,
  ListItem,
  Preference,
  ConnectionStatus,
  PanelType,
  ListType,
} from '../generated/prisma';

// ================================
// EXTENDED MODEL TYPES
// ================================

/**
 * User with decrypted connections for API responses
 */
export interface UserWithConnections extends User {
  connections: ConnectionWithTokens[];
}

/**
 * Connection with decrypted OAuth tokens
 */
export interface ConnectionWithTokens extends Omit<Connection, 'accessTokenEnc' | 'refreshTokenEnc'> {
  accessToken: string;
  refreshToken?: string;
}

/**
 * Layout with populated panels and user data
 */
export interface LayoutWithPanels extends Layout {
  user: User;
  layoutPanels: (LayoutPanel & {
    panel: Panel;
  })[];
}

/**
 * List with populated items
 */
export interface ListWithItems extends List {
  user: User;
  listItems: ListItem[];
}

/**
 * Panel with usage statistics
 */
export interface PanelWithStats extends Panel {
  usageCount: number;
  lastUsed: Date | null;
}

// ================================
// API REQUEST/RESPONSE TYPES
// ================================

/**
 * User registration data
 */
export interface CreateUserRequest {
  email: string;
  clerkId?: string;
  username?: string;
  displayName?: string;
  avatar?: string;
  settings?: Record<string, any>;
}

/**
 * Platform connection creation
 */
export interface CreateConnectionRequest {
  provider: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
  scopes: string[];
  providerUserId?: string;
  providerUsername?: string;
}

/**
 * Layout creation/update
 */
export interface CreateLayoutRequest {
  name: string;
  theme?: string;
  gridSpecJson: Record<string, any>;
  description?: string;
  tags?: string[];
  isDefault?: boolean;
  isPublic?: boolean;
  panels: CreateLayoutPanelRequest[];
}

export interface CreateLayoutPanelRequest {
  panelId: string;
  gridX: number;
  gridY: number;
  gridWidth: number;
  gridHeight: number;
  propsJson?: Record<string, any>;
  isVisible?: boolean;
  zIndex?: number;
}

/**
 * List creation/update
 */
export interface CreateListRequest {
  name: string;
  type: ListType;
  description?: string;
  isPublic?: boolean;
  rulesJson?: Record<string, any>;
  tags?: string[];
}

/**
 * List item addition
 */
export interface CreateListItemRequest {
  platformId: string;
  platform: string;
  contentType?: string;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  duration?: number;
  publishedAt?: Date;
  position?: number;
  notes?: string;
}

/**
 * User preference update
 */
export interface SetPreferenceRequest {
  key: string;
  value: any;
  category?: string;
  description?: string;
}

// ================================
// VALIDATION SCHEMAS
// ================================

/**
 * User validation schema
 */
export const CreateUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  clerkId: z.string().optional(),
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores').optional(),
  displayName: z.string().min(1).max(100).optional(),
  avatar: z.string().url('Invalid avatar URL').optional(),
  settings: z.record(z.any()).optional(),
});

/**
 * Connection validation schema
 */
export const CreateConnectionSchema = z.object({
  provider: z.enum(['youtube', 'vimeo', 'nebula'], {
    errorMap: () => ({ message: 'Provider must be youtube, vimeo, or nebula' }),
  }),
  accessToken: z.string().min(1, 'Access token is required'),
  refreshToken: z.string().optional(),
  expiresAt: z.date().optional(),
  scopes: z.array(z.string()).min(1, 'At least one scope is required'),
  providerUserId: z.string().optional(),
  providerUsername: z.string().optional(),
});

/**
 * Layout validation schema
 */
export const CreateLayoutSchema = z.object({
  name: z.string().min(1).max(100, 'Layout name too long'),
  theme: z.string().optional(),
  gridSpecJson: z.record(z.any(), 'Grid specification must be an object'),
  description: z.string().max(500, 'Description too long').optional(),
  tags: z.array(z.string()).max(10, 'Too many tags').optional(),
  isDefault: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  panels: z.array(z.object({
    panelId: z.string().cuid('Invalid panel ID'),
    gridX: z.number().int().min(0),
    gridY: z.number().int().min(0),
    gridWidth: z.number().int().min(1).max(24),
    gridHeight: z.number().int().min(1).max(24),
    propsJson: z.record(z.any()).optional(),
    isVisible: z.boolean().optional(),
    zIndex: z.number().int().min(0).max(1000).optional(),
  })),
});

/**
 * List validation schema
 */
export const CreateListSchema = z.object({
  name: z.string().min(1).max(100, 'List name too long'),
  type: z.nativeEnum(ListType),
  description: z.string().max(500, 'Description too long').optional(),
  isPublic: z.boolean().optional(),
  rulesJson: z.record(z.any()).optional(),
  tags: z.array(z.string()).max(10, 'Too many tags').optional(),
});

/**
 * List item validation schema
 */
export const CreateListItemSchema = z.object({
  platformId: z.string().min(1, 'Platform ID is required'),
  platform: z.enum(['youtube', 'vimeo', 'nebula']),
  contentType: z.string().default('video'),
  title: z.string().max(200, 'Title too long').optional(),
  description: z.string().max(1000, 'Description too long').optional(),
  thumbnailUrl: z.string().url('Invalid thumbnail URL').optional(),
  duration: z.number().int().min(0).optional(),
  publishedAt: z.date().optional(),
  position: z.number().int().min(0).optional(),
  notes: z.string().max(500, 'Notes too long').optional(),
});

/**
 * Preference validation schema
 */
export const SetPreferenceSchema = z.object({
  key: z.string().min(1).max(100, 'Preference key too long'),
  value: z.any(),
  category: z.string().max(50, 'Category too long').optional(),
  description: z.string().max(200, 'Description too long').optional(),
});

// ================================
// QUERY FILTER TYPES
// ================================

/**
 * User query filters
 */
export interface UserFilters {
  email?: string;
  username?: string;
  isActive?: boolean;
  isVerified?: boolean;
  createdAfter?: Date;
  createdBefore?: Date;
}

/**
 * Layout query filters
 */
export interface LayoutFilters {
  userId?: string;
  isDefault?: boolean;
  isPublic?: boolean;
  theme?: string;
  tags?: string[];
  searchTerm?: string;
}

/**
 * List query filters
 */
export interface ListFilters {
  userId?: string;
  type?: ListType;
  isPublic?: boolean;
  tags?: string[];
  searchTerm?: string;
}

/**
 * Panel query filters
 */
export interface PanelFilters {
  type?: PanelType;
  category?: string;
  isBuiltIn?: boolean;
  tags?: string[];
  searchTerm?: string;
}

// ================================
// PAGINATION TYPES
// ================================

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// ================================
// UTILITY TYPES
// ================================

/**
 * Database operation result
 */
export type DatabaseResult<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
  code?: string;
};

/**
 * Common timestamps
 */
export interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User settings structure
 */
export interface UserSettings {
  theme?: 'light' | 'dark' | 'auto';
  language?: string;
  timezone?: string;
  notifications?: {
    email?: boolean;
    push?: boolean;
    newVideos?: boolean;
    recommendations?: boolean;
  };
  privacy?: {
    analyticsOptIn?: boolean;
    shareWatchHistory?: boolean;
  };
  video?: {
    autoplay?: boolean;
    defaultQuality?: 'auto' | '144p' | '240p' | '360p' | '480p' | '720p' | '1080p';
    rememberPosition?: boolean;
  };
  debug?: boolean;
}

/**
 * Grid specification for layouts
 */
export interface GridSpecification {
  cols: number;
  rows: number;
  gap?: number;
  padding?: number;
  breakpoints?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

/**
 * Smart list rules for automated content curation
 */
export interface SmartListRules {
  platforms?: string[];
  keywords?: string[];
  excludeKeywords?: string[];
  maxAge?: number; // Days
  minDuration?: number; // Seconds
  maxDuration?: number; // Seconds
  minViews?: number;
  categories?: string[];
  channels?: string[];
  sortBy?: 'newest' | 'oldest' | 'views' | 'rating' | 'relevance';
  limit?: number;
}

export {
  ConnectionStatus,
  PanelType,
  ListType,
};