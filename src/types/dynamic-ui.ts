// Dynamic UI Generation Types for NEWTUBE

export interface DynamicComponentRequest {
  userPrompt: string
  context: ConversationContext
  sessionId?: string
  userId?: string
}

export interface ConversationContext {
  previousComponents: ComponentDefinition[]
  userPreferences: UserUIPreferences
  conversationHistory: ConversationMessage[]
  currentPage?: string
  activeComponents?: string[]
}

export interface UserUIPreferences {
  theme: 'light' | 'dark' | 'auto'
  layoutStyle: 'minimal' | 'detailed' | 'compact'
  interactionMode: 'voice' | 'text' | 'hybrid'
  colorScheme?: string
  animations: boolean
  accessibility: AccessibilitySettings
}

export interface AccessibilitySettings {
  screenReader: boolean
  highContrast: boolean
  reducedMotion: boolean
  fontSize: 'small' | 'medium' | 'large'
  keyboardNavigation: boolean
}

export interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  context?: any
}

export interface ComponentDefinition {
  id: string
  type: DynamicComponentType
  displayName: string
  props: ComponentProps
  position: ComponentPosition
  size: ComponentSize
  style: ComponentStyle
  children?: ComponentDefinition[]
  metadata: ComponentMetadata
}

export interface ComponentProps {
  [key: string]: any
  // Dynamic properties based on component type
  title?: string
  platform?: Platform
  query?: string
  videoId?: string
  maxItems?: number
  autoRefresh?: boolean
  showControls?: boolean
}

export interface ComponentPosition {
  x: number
  y: number
  z?: number // For layering
  gridArea?: string // CSS Grid area
  flexOrder?: number
}

export interface ComponentSize {
  width: number | 'auto' | string
  height: number | 'auto' | string
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  aspectRatio?: string
}

export interface ComponentStyle {
  backgroundColor?: string
  borderRadius?: number
  border?: string
  shadow?: string
  opacity?: number
  transform?: string
  transition?: string
  overflow?: 'hidden' | 'visible' | 'scroll' | 'auto'
}

export interface ComponentMetadata {
  createdAt: number
  updatedAt?: number
  createdBy: 'user' | 'ai'
  version: number
  tags: string[]
  description?: string
  aiReasoning?: string
}

export type DynamicComponentType = 
  | 'VideoPlayer'
  | 'VideoFeed'
  | 'SearchBar'
  | 'ChannelList'
  | 'PlaylistPanel'
  | 'Comments'
  | 'Recommendations'
  | 'TrendingVideos'
  | 'WatchLater'
  | 'Subscriptions'
  | 'CustomFeed'
  | 'MiniPlayer'
  | 'VoiceControl'
  | 'AIAssistant'
  | 'StatsPanel'
  | 'SettingsPanel'
  | 'NotificationCenter'
  | 'QuickActions'
  | 'CustomHTML'

export interface DynamicUIResponse {
  components: ComponentDefinition[]
  layout: LayoutDefinition
  actions: UIAction[]
  suggestions: AISuggestion[]
  metadata: ResponseMetadata
}

export interface LayoutDefinition {
  type: 'grid' | 'flex' | 'absolute' | 'flow'
  direction?: 'row' | 'column'
  wrap?: boolean
  gap?: number
  padding?: number
  template?: string // CSS grid template
  areas?: string[] // Named grid areas
  responsive: ResponsiveLayout[]
}

export interface ResponsiveLayout {
  breakpoint: number
  columns?: number
  template?: string
  hideComponents?: string[]
  transformComponents?: ComponentTransform[]
}

export interface ComponentTransform {
  componentId: string
  newSize?: ComponentSize
  newPosition?: ComponentPosition
  newProps?: ComponentProps
}

export interface UIAction {
  type: ActionType
  targetComponent?: string
  payload?: any
  condition?: ActionCondition
}

export type ActionType =
  | 'add_component'
  | 'remove_component'
  | 'update_component'
  | 'move_component'
  | 'resize_component'
  | 'style_component'
  | 'connect_service'
  | 'fetch_data'
  | 'play_video'
  | 'navigate'

export interface ActionCondition {
  trigger: 'user_action' | 'voice_command' | 'timer' | 'data_change'
  value?: any
}

export interface AISuggestion {
  id: string
  type: SuggestionType
  title: string
  description: string
  action: UIAction
  confidence: number
  reasoning: string
}

export type SuggestionType =
  | 'layout_optimization'
  | 'component_addition'
  | 'workflow_improvement'
  | 'accessibility_enhancement'
  | 'performance_optimization'
  | 'personalization'

export interface ResponseMetadata {
  processingTime: number
  aiModel: string
  confidence: number
  tokensUsed?: number
  reasoning: string
  alternatives?: DynamicUIResponse[]
}

// Component Templates for AI to use
export interface ComponentTemplate {
  type: DynamicComponentType
  displayName: string
  description: string
  defaultProps: ComponentProps
  requiredProps: string[]
  optionalProps: string[]
  supportedPlatforms?: Platform[]
  category: ComponentCategory
  complexity: 'simple' | 'medium' | 'complex'
  dependencies?: string[]
  examples: ComponentExample[]
}

export type ComponentCategory =
  | 'media'
  | 'navigation'
  | 'social'
  | 'utility'
  | 'ai'
  | 'personalization'
  | 'accessibility'

export interface ComponentExample {
  name: string
  description: string
  props: ComponentProps
  useCase: string
}

// State Management Types
export interface DynamicUIState {
  sessionId: string
  userId?: string
  currentLayout: LayoutDefinition
  components: ComponentDefinition[]
  history: UIStateSnapshot[]
  preferences: UserUIPreferences
  isVoiceActive: boolean
  lastUpdate: number
}

export interface UIStateSnapshot {
  timestamp: number
  components: ComponentDefinition[]
  layout: LayoutDefinition
  trigger: string
  description?: string
}

// Real-time Update Types
export interface UIUpdateEvent {
  type: UIUpdateType
  sessionId: string
  component?: ComponentDefinition
  layout?: LayoutDefinition
  action?: UIAction
  metadata: {
    timestamp: number
    source: 'ai' | 'user' | 'system'
    reason?: string
  }
}

export type UIUpdateType =
  | 'component_added'
  | 'component_removed'
  | 'component_updated'
  | 'layout_changed'
  | 'state_synced'
  | 'voice_command_processed'
  | 'ai_suggestion_generated'

// OAuth Integration Types
export interface ConversationalOAuthRequest {
  service: Platform
  context: string // What the user said
  sessionId: string
  userId?: string
}

export interface ConversationalOAuthResponse {
  success: boolean
  authUrl?: string
  message: string
  nextStep: string
  requiresUserAction: boolean
  component?: ComponentDefinition // Component to add after auth
}

// Error Types
export interface DynamicUIError {
  code: string
  message: string
  details?: any
  suggestions?: string[]
  recovery?: UIAction[]
}

// Voice Integration Types
export interface VoiceCommand {
  transcript: string
  confidence: number
  sessionId: string
  context: VoiceContext
}

export interface VoiceContext {
  currentComponents: string[]
  activeComponent?: string
  lastAction?: string
  userLocation?: string // Which part of UI they're focused on
}

export interface VoiceResponse {
  text: string
  actions: UIAction[]
  components?: ComponentDefinition[]
  shouldSpeak: boolean
  confidence: number
}

export type Platform = 'youtube' | 'vimeo' | 'nebula'