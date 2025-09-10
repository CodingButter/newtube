// NEWTUBE Core Types

export interface Video {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  duration: number
  viewCount: number
  publishedAt: string
  platform: Platform
  channelId: string
  channelName: string
  tags: string[]
  embedUrl: string
}

export interface Channel {
  id: string
  name: string
  description: string
  avatarUrl: string
  platform: Platform
  subscriberCount?: number
  videoCount?: number
  verified: boolean
}

export interface User {
  id: string
  email: string
  name: string
  avatarUrl?: string
  preferences: UserPreferences
  connections: PlatformConnection[]
  createdAt: string
  updatedAt: string
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  language: string
  autoplay: boolean
  layoutDensity: 'compact' | 'comfortable' | 'spacious'
  notifications: NotificationSettings
  privacy: PrivacySettings
}

export interface NotificationSettings {
  newVideos: boolean
  recommendations: boolean
  comments: boolean
  mentions: boolean
}

export interface PrivacySettings {
  shareWatchHistory: boolean
  personalizedAds: boolean
  dataCollection: boolean
}

export interface PlatformConnection {
  id: string
  platform: Platform
  userId: string
  accessToken: string
  refreshToken?: string
  expiresAt?: string
  scope: string[]
  connectedAt: string
}

export interface Panel {
  id: string
  type: PanelType
  title: string
  position: Position
  size: Size
  config: PanelConfig
  minimized: boolean
  visible: boolean
}

export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface PanelConfig {
  [key: string]: any
}

export interface Layout {
  id: string
  userId: string
  name: string
  panels: Panel[]
  gridConfig: GridConfig
  version: number
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export interface GridConfig {
  columns: number
  rows: number
  gap: number
  cellSize: number
}

export interface AIRecommendation {
  id: string
  videoId: string
  score: number
  reason: string
  category: RecommendationCategory
  platform: Platform
  generatedAt: string
}

export interface CommentLens {
  id: string
  videoId: string
  relevanceScore: number
  toxicityScore: number
  summary: string
  filteredComments: Comment[]
  analysis: CommentAnalysis
}

export interface Comment {
  id: string
  text: string
  author: string
  authorAvatar?: string
  publishedAt: string
  likeCount: number
  replyCount: number
  relevanceScore?: number
  toxicityScore?: number
}

export interface CommentAnalysis {
  totalComments: number
  filteredComments: number
  averageRelevance: number
  averageToxicity: number
  mainTopics: string[]
  sentiment: 'positive' | 'negative' | 'neutral'
}

// Enums
export type Platform = 'youtube' | 'vimeo' | 'nebula'

export type PanelType = 
  | 'video-feed'
  | 'video-player'
  | 'search'
  | 'list'
  | 'recommendations'
  | 'watch-later'
  | 'subscriptions'
  | 'trending'
  | 'ai-curated'
  | 'custom'

export type RecommendationCategory =
  | 'similar-content'
  | 'trending'
  | 'personalized'
  | 'cross-platform'
  | 'ai-curated'

// API Response Types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Event Types
export interface PanelEvent {
  type: 'move' | 'resize' | 'minimize' | 'close' | 'configure'
  panelId: string
  payload?: any
}

export interface VideoEvent {
  type: 'play' | 'pause' | 'seek' | 'ended' | 'error'
  videoId: string
  currentTime?: number
  duration?: number
  error?: string
}

// Form Types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface SearchForm {
  query: string
  platform?: Platform[]
  duration?: 'short' | 'medium' | 'long'
  uploadDate?: 'hour' | 'today' | 'week' | 'month' | 'year'
  sortBy?: 'relevance' | 'date' | 'views' | 'rating'
}

// Drag and Drop Types
export interface DndItem {
  id: string
  type: PanelType
  data?: any
}

export interface PanelProps {
  panel: Panel
  onUpdate: (panelId: string, updates: Partial<Panel>) => void
  onRemove: (panelId: string) => void
  isDragging?: boolean
  className?: string
}

// Specific Panel Config Types
export interface VideoFeedPanelConfig extends PanelConfig {
  platform: Platform
  category?: string
  maxVideos?: number
  refreshInterval?: number
}

export interface VideoPlayerPanelConfig extends PanelConfig {
  videoId: string
  platform: Platform
  autoplay?: boolean
  controls?: boolean
}

export interface SearchPanelConfig extends PanelConfig {
  platforms: Platform[]
  defaultQuery?: string
  resultsLimit?: number
}

export interface ListPanelConfig extends PanelConfig {
  listType: 'playlist' | 'favorites' | 'watch-later' | 'history'
  platform?: Platform
  listId?: string
}

export interface RecommendationPanelConfig extends PanelConfig {
  category: RecommendationCategory
  maxRecommendations?: number
  aiEnabled?: boolean
}

// Layout and Grid Types
export interface LayoutEngine {
  addPanel: (type: PanelType, config?: PanelConfig) => void
  removePanel: (panelId: string) => void
  updatePanel: (panelId: string, updates: Partial<Panel>) => void
  movePanel: (panelId: string, position: Position) => void
  resizePanel: (panelId: string, size: Size) => void
  saveLayout: () => Promise<void>
  loadLayout: (layoutId: string) => Promise<void>
}

export interface ResponsiveBreakpoint {
  name: string
  minWidth: number
  columns: number
  maxPanelWidth: number
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>
}[keyof T]