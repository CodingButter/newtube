import { DynamicUIState, UIStateSnapshot, ComponentDefinition } from '@/types/dynamic-ui'
import { logger } from '@/lib/logger'
import Redis from 'ioredis'

export class UIStateManager {
  private redis: Redis
  private stateCache: Map<string, DynamicUIState> = new Map()

  constructor() {
    // Initialize Redis connection for persistent state storage
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
      lazyConnect: true
    })

    this.redis.on('error', (error) => {
      logger.error('Redis connection error', error)
    })

    this.redis.on('connect', () => {
      logger.info('Connected to Redis for UI state management')
    })
  }

  async saveUIState(sessionId: string, state: DynamicUIState): Promise<void> {
    try {
      // Store in memory cache for fast access
      this.stateCache.set(sessionId, state)

      // Persist to Redis with expiration (24 hours for anonymous sessions)
      const expirationTime = state.userId ? 86400 * 7 : 86400 // 7 days for users, 1 day for anonymous
      
      await this.redis.setex(
        this.getRedisKey(sessionId),
        expirationTime,
        JSON.stringify(state)
      )

      logger.debug('UI state saved', { sessionId, componentCount: state.components.length })

    } catch (error) {
      logger.error('Error saving UI state', error)
      throw error
    }
  }

  async getUIState(sessionId: string): Promise<DynamicUIState | null> {
    try {
      // Check memory cache first
      const cachedState = this.stateCache.get(sessionId)
      if (cachedState) {
        return cachedState
      }

      // Fallback to Redis
      const redisData = await this.redis.get(this.getRedisKey(sessionId))
      if (!redisData) {
        return null
      }

      const state: DynamicUIState = JSON.parse(redisData)
      
      // Update memory cache
      this.stateCache.set(sessionId, state)
      
      return state

    } catch (error) {
      logger.error('Error retrieving UI state', error)
      return null
    }
  }

  async clearUIState(sessionId: string): Promise<void> {
    try {
      // Remove from cache
      this.stateCache.delete(sessionId)
      
      // Remove from Redis
      await this.redis.del(this.getRedisKey(sessionId))
      
      logger.debug('UI state cleared', { sessionId })

    } catch (error) {
      logger.error('Error clearing UI state', error)
      throw error
    }
  }

  async createUISession(userId?: string): Promise<DynamicUIState> {
    const sessionId = this.generateSessionId()
    
    const initialState: DynamicUIState = {
      sessionId,
      userId,
      currentLayout: {
        type: 'grid',
        gap: 16,
        padding: 20,
        template: 'repeat(auto-fit, minmax(300px, 1fr))',
        responsive: [
          { breakpoint: 768, columns: 1, template: '1fr' },
          { breakpoint: 1024, columns: 2, template: 'repeat(2, 1fr)' },
          { breakpoint: 1440, columns: 3, template: 'repeat(3, 1fr)' }
        ]
      },
      components: [],
      history: [],
      preferences: {
        theme: 'auto',
        layoutStyle: 'comfortable',
        interactionMode: 'hybrid',
        animations: true,
        accessibility: {
          screenReader: false,
          highContrast: false,
          reducedMotion: false,
          fontSize: 'medium',
          keyboardNavigation: true
        }
      },
      isVoiceActive: false,
      lastUpdate: Date.now()
    }

    await this.saveUIState(sessionId, initialState)
    return initialState
  }

  async addComponent(sessionId: string, component: ComponentDefinition): Promise<DynamicUIState> {
    const currentState = await this.getUIState(sessionId)
    if (!currentState) {
      throw new Error('Session not found')
    }

    // Add component to state
    const updatedComponents = [...currentState.components, component]
    
    // Create state snapshot for history
    const snapshot: UIStateSnapshot = {
      timestamp: Date.now(),
      components: currentState.components,
      layout: currentState.currentLayout,
      trigger: 'component_added',
      description: `Added ${component.type}: ${component.displayName}`
    }

    const updatedState: DynamicUIState = {
      ...currentState,
      components: updatedComponents,
      history: [...currentState.history, snapshot].slice(-10), // Keep last 10 snapshots
      lastUpdate: Date.now()
    }

    await this.saveUIState(sessionId, updatedState)
    return updatedState
  }

  async removeComponent(sessionId: string, componentId: string): Promise<DynamicUIState> {
    const currentState = await this.getUIState(sessionId)
    if (!currentState) {
      throw new Error('Session not found')
    }

    const componentToRemove = currentState.components.find(c => c.id === componentId)
    if (!componentToRemove) {
      throw new Error('Component not found')
    }

    // Remove component from state
    const updatedComponents = currentState.components.filter(c => c.id !== componentId)
    
    // Create state snapshot for history
    const snapshot: UIStateSnapshot = {
      timestamp: Date.now(),
      components: currentState.components,
      layout: currentState.currentLayout,
      trigger: 'component_removed',
      description: `Removed ${componentToRemove.type}: ${componentToRemove.displayName}`
    }

    const updatedState: DynamicUIState = {
      ...currentState,
      components: updatedComponents,
      history: [...currentState.history, snapshot].slice(-10),
      lastUpdate: Date.now()
    }

    await this.saveUIState(sessionId, updatedState)
    return updatedState
  }

  async updateComponent(
    sessionId: string, 
    componentId: string, 
    updates: Partial<ComponentDefinition>
  ): Promise<DynamicUIState> {
    const currentState = await this.getUIState(sessionId)
    if (!currentState) {
      throw new Error('Session not found')
    }

    const componentIndex = currentState.components.findIndex(c => c.id === componentId)
    if (componentIndex === -1) {
      throw new Error('Component not found')
    }

    // Update component
    const updatedComponents = [...currentState.components]
    updatedComponents[componentIndex] = {
      ...updatedComponents[componentIndex],
      ...updates,
      metadata: {
        ...updatedComponents[componentIndex].metadata,
        updatedAt: Date.now(),
        version: updatedComponents[componentIndex].metadata.version + 1
      }
    }

    // Create state snapshot for history
    const snapshot: UIStateSnapshot = {
      timestamp: Date.now(),
      components: currentState.components,
      layout: currentState.currentLayout,
      trigger: 'component_updated',
      description: `Updated ${updatedComponents[componentIndex].type}: ${updatedComponents[componentIndex].displayName}`
    }

    const updatedState: DynamicUIState = {
      ...currentState,
      components: updatedComponents,
      history: [...currentState.history, snapshot].slice(-10),
      lastUpdate: Date.now()
    }

    await this.saveUIState(sessionId, updatedState)
    return updatedState
  }

  async undoLastAction(sessionId: string): Promise<DynamicUIState | null> {
    const currentState = await this.getUIState(sessionId)
    if (!currentState || currentState.history.length === 0) {
      return null
    }

    // Get the last snapshot
    const lastSnapshot = currentState.history[currentState.history.length - 1]
    
    // Restore to previous state
    const restoredState: DynamicUIState = {
      ...currentState,
      components: lastSnapshot.components,
      currentLayout: lastSnapshot.layout,
      history: currentState.history.slice(0, -1), // Remove the last snapshot
      lastUpdate: Date.now()
    }

    await this.saveUIState(sessionId, restoredState)
    return restoredState
  }

  async getUserSessions(userId: string): Promise<string[]> {
    try {
      // Get all keys for user sessions
      const pattern = this.getRedisKey('*')
      const keys = await this.redis.keys(pattern)
      
      const userSessions: string[] = []
      
      for (const key of keys) {
        const data = await this.redis.get(key)
        if (data) {
          const state: DynamicUIState = JSON.parse(data)
          if (state.userId === userId) {
            userSessions.push(state.sessionId)
          }
        }
      }
      
      return userSessions

    } catch (error) {
      logger.error('Error getting user sessions', error)
      return []
    }
  }

  async getSessionStats(sessionId: string): Promise<any> {
    const state = await this.getUIState(sessionId)
    if (!state) {
      return null
    }

    return {
      sessionId,
      componentCount: state.components.length,
      lastUpdate: state.lastUpdate,
      historyLength: state.history.length,
      componentTypes: state.components.reduce((acc, comp) => {
        acc[comp.type] = (acc[comp.type] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      preferences: state.preferences,
      isVoiceActive: state.isVoiceActive
    }
  }

  private getRedisKey(sessionId: string): string {
    return `newtube:ui_state:${sessionId}`
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 12)}`
  }

  // Cleanup expired sessions (should be called periodically)
  async cleanupExpiredSessions(): Promise<number> {
    try {
      const pattern = this.getRedisKey('*')
      const keys = await this.redis.keys(pattern)
      
      let cleaned = 0
      const now = Date.now()
      const maxAge = 24 * 60 * 60 * 1000 // 24 hours

      for (const key of keys) {
        const data = await this.redis.get(key)
        if (data) {
          const state: DynamicUIState = JSON.parse(data)
          
          // Clean up sessions older than maxAge and have no user
          if (!state.userId && (now - state.lastUpdate) > maxAge) {
            await this.redis.del(key)
            this.stateCache.delete(state.sessionId)
            cleaned++
          }
        }
      }

      logger.info(`Cleaned up ${cleaned} expired UI sessions`)
      return cleaned

    } catch (error) {
      logger.error('Error cleaning up expired sessions', error)
      return 0
    }
  }
}