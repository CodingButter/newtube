// Constants for NEWTUBE application

export const PLATFORMS = {
  YOUTUBE: 'youtube' as const,
  VIMEO: 'vimeo' as const,
  NEBULA: 'nebula' as const,
} as const

export const PLATFORM_COLORS = {
  [PLATFORMS.YOUTUBE]: '#FF0000',
  [PLATFORMS.VIMEO]: '#1AB7EA',
  [PLATFORMS.NEBULA]: '#7B68EE',
} as const

export const PLATFORM_DOMAINS = {
  [PLATFORMS.YOUTUBE]: ['youtube.com', 'youtu.be'],
  [PLATFORMS.VIMEO]: ['vimeo.com'],
  [PLATFORMS.NEBULA]: ['nebula.tv', 'nebula.app'],
} as const

export const PANEL_TYPES = {
  VIDEO_FEED: 'video-feed',
  RECOMMENDATIONS: 'recommendations',
  WATCH_LATER: 'watch-later',
  SUBSCRIPTIONS: 'subscriptions',
  SEARCH: 'search',
  TRENDING: 'trending',
  AI_CURATED: 'ai-curated',
  CUSTOM: 'custom',
} as const

export const LAYOUT_PRESETS = {
  DEFAULT: 'default',
  MINIMAL: 'minimal',
  POWER_USER: 'power-user',
  MOBILE: 'mobile',
} as const

export const THEME_OPTIONS = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
} as const

export const DENSITY_OPTIONS = {
  COMPACT: 'compact',
  COMFORTABLE: 'comfortable',
  SPACIOUS: 'spacious',
} as const

export const API_ENDPOINTS = {
  VIDEOS: '/api/videos',
  CHANNELS: '/api/channels',
  SEARCH: '/api/search',
  RECOMMENDATIONS: '/api/recommendations',
  LAYOUTS: '/api/layouts',
  PANELS: '/api/panels',
  USER: '/api/user',
  AUTH: '/api/auth',
} as const

export const CACHE_KEYS = {
  USER_PREFERENCES: 'user-preferences',
  LAYOUT: 'layout',
  VIDEOS: 'videos',
  CHANNELS: 'channels',
  SEARCH_RESULTS: 'search-results',
} as const

export const STORAGE_KEYS = {
  THEME: 'newtube-theme',
  LAYOUT: 'newtube-layout',
  PREFERENCES: 'newtube-preferences',
  AUTH_TOKEN: 'newtube-auth-token',
} as const

export const PERFORMANCE_BUDGETS = {
  INITIAL_JS: 180 * 1024, // 180KB
  TOTAL_JS: 500 * 1024, // 500KB
  CSS: 50 * 1024, // 50KB
  IMAGES: 1 * 1024 * 1024, // 1MB
} as const

export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 250,
  SLOW: 350,
} as const

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const

export const GRID_CONFIG = {
  DEFAULT_COLUMNS: 12,
  DEFAULT_ROWS: 8,
  MIN_PANEL_WIDTH: 2,
  MIN_PANEL_HEIGHT: 2,
  DEFAULT_GAP: 16,
} as const

export const VIDEO_QUALITY_OPTIONS = [
  { value: 'auto', label: 'Auto' },
  { value: '144p', label: '144p' },
  { value: '240p', label: '240p' },
  { value: '360p', label: '360p' },
  { value: '480p', label: '480p' },
  { value: '720p', label: '720p (HD)' },
  { value: '1080p', label: '1080p (Full HD)' },
  { value: '1440p', label: '1440p (2K)' },
  { value: '2160p', label: '2160p (4K)' },
] as const

export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'date', label: 'Upload Date' },
  { value: 'views', label: 'View Count' },
  { value: 'rating', label: 'Rating' },
  { value: 'duration', label: 'Duration' },
] as const

export const DURATION_FILTERS = [
  { value: 'all', label: 'Any Duration' },
  { value: 'short', label: 'Under 4 minutes' },
  { value: 'medium', label: '4-20 minutes' },
  { value: 'long', label: 'Over 20 minutes' },
] as const

export const UPLOAD_DATE_FILTERS = [
  { value: 'all', label: 'Any Time' },
  { value: 'hour', label: 'Last Hour' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
] as const

export const AI_FEATURES = {
  COMMENT_LENS: 'comment-lens',
  RECOMMENDATIONS: 'recommendations',
  TRANSCRIPTION: 'transcription',
  SUMMARY: 'summary',
  VOICE_CONTROL: 'voice-control',
} as const

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  API_ERROR: 'Something went wrong. Please try again later.',
  INVALID_URL: 'Please enter a valid URL.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PASSWORD: 'Password must be at least 8 characters with uppercase, lowercase, and number.',
  UNAUTHORIZED: 'Please log in to continue.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
} as const