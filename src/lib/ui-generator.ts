import React from 'react'

export interface ComponentSpec {
  type: 'video-player' | 'search-bar' | 'subscription-list' | 'trending-feed' | 'channel-grid' | 'playlist-manager' | 'settings-panel' | 'recommendation-feed'
  props: Record<string, any>
  layout?: {
    width?: string
    height?: string
    position?: 'relative' | 'absolute' | 'fixed'
    className?: string
  }
}

export interface UIGenerationResponse {
  response: string
  components: ComponentSpec[]
  success: boolean
  error?: string
}

/**
 * Analyzes natural language input and generates UI component specifications
 */
export class UIGenerator {
  private static instance: UIGenerator
  
  public static getInstance(): UIGenerator {
    if (!UIGenerator.instance) {
      UIGenerator.instance = new UIGenerator()
    }
    return UIGenerator.instance
  }

  /**
   * Generate UI components based on natural language description
   */
  async generateComponents(
    message: string, 
    context?: {
      existingComponents?: ComponentSpec[]
      userPreferences?: Record<string, any>
      conversationHistory?: Array<{ role: 'user' | 'ai'; content: string }>
    }
  ): Promise<UIGenerationResponse> {
    try {
      const response = await fetch('/api/ai/canvas-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          conversationHistory: context?.conversationHistory || [],
          currentComponents: context?.existingComponents?.length || 0,
          userPreferences: context?.userPreferences
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      return {
        response: data.response,
        components: data.components || [],
        success: true
      }
    } catch (error) {
      console.error('Error generating UI components:', error)
      
      return {
        response: "I'm having trouble generating your UI right now. Please try again or describe what you want in a different way.",
        components: [],
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * Parse and validate component specifications
   */
  validateComponentSpec(spec: ComponentSpec): boolean {
    const validTypes = [
      'video-player', 'search-bar', 'subscription-list', 'trending-feed',
      'channel-grid', 'playlist-manager', 'settings-panel', 'recommendation-feed'
    ]
    
    if (!validTypes.includes(spec.type)) {
      console.warn(`Invalid component type: ${spec.type}`)
      return false
    }
    
    if (!spec.props || typeof spec.props !== 'object') {
      console.warn(`Invalid props for component: ${spec.type}`)
      return false
    }
    
    return true
  }

  /**
   * Generate layout suggestions based on component types
   */
  suggestLayout(components: ComponentSpec[]): {
    gridCols: number
    suggestions: Record<string, { span: number; order: number }>
  } {
    const componentCount = components.length
    let gridCols = 1
    
    if (componentCount <= 2) gridCols = 1
    else if (componentCount <= 4) gridCols = 2
    else if (componentCount <= 6) gridCols = 3
    else gridCols = 4
    
    const suggestions: Record<string, { span: number; order: number }> = {}
    
    components.forEach((component, index) => {
      let span = 1
      let order = index
      
      switch (component.type) {
        case 'video-player':
          span = Math.min(2, gridCols)
          order = 0
          break
        case 'search-bar':
          span = gridCols
          order = -1
          break
        case 'trending-feed':
        case 'recommendation-feed':
          span = Math.min(2, gridCols)
          break
        case 'subscription-list':
        case 'playlist-manager':
          span = 1
          break
        case 'settings-panel':
          span = 1
          order = 999
          break
        case 'channel-grid':
          span = Math.min(3, gridCols)
          break
      }
      
      suggestions[`${component.type}-${index}`] = { span, order }
    })
    
    return { gridCols, suggestions }
  }

  /**
   * Convert natural language to component props
   */
  parsePropsFromMessage(message: string, componentType: string): Record<string, any> {
    const props: Record<string, any> = {}
    const lowerMessage = message.toLowerCase()
    
    switch (componentType) {
      case 'video-player':
        if (lowerMessage.includes('large') || lowerMessage.includes('big') || lowerMessage.includes('huge')) {
          props.size = 'large'
          props.title = 'Large Video Player'
        }
        if (lowerMessage.includes('small') || lowerMessage.includes('mini')) {
          props.size = 'small'
          props.title = 'Compact Player'
        }
        break
        
      case 'search-bar':
        if (lowerMessage.includes('tech')) {
          props.placeholder = 'Search for technology videos...'
          props.suggestions = ['AI Tutorials', 'Programming', 'Tech Reviews']
        } else if (lowerMessage.includes('music')) {
          props.placeholder = 'Search for music videos...'
          props.suggestions = ['Top Charts', 'New Releases', 'Live Concerts']
        } else if (lowerMessage.includes('cooking')) {
          props.placeholder = 'Search for cooking videos...'
          props.suggestions = ['Quick Recipes', 'Cooking Tips', 'Food Reviews']
        }
        break
        
      case 'subscription-list':
        if (lowerMessage.includes('favorite')) {
          props.title = 'Favorite Channels'
        }
        break
    }
    
    return props
  }

  /**
   * Extract user intent from natural language
   */
  extractIntent(message: string): {
    action: 'create' | 'modify' | 'remove' | 'arrange'
    components: string[]
    modifiers: string[]
  } {
    const lowerMessage = message.toLowerCase()
    
    let action: 'create' | 'modify' | 'remove' | 'arrange' = 'create'
    
    if (lowerMessage.includes('remove') || lowerMessage.includes('delete')) {
      action = 'remove'
    } else if (lowerMessage.includes('change') || lowerMessage.includes('modify') || lowerMessage.includes('update')) {
      action = 'modify'
    } else if (lowerMessage.includes('arrange') || lowerMessage.includes('move') || lowerMessage.includes('organize')) {
      action = 'arrange'
    }
    
    const components: string[] = []
    const modifiers: string[] = []
    
    // Extract component mentions
    if (lowerMessage.includes('video') || lowerMessage.includes('player')) {
      components.push('video-player')
    }
    if (lowerMessage.includes('search')) {
      components.push('search-bar')
    }
    if (lowerMessage.includes('subscription') || lowerMessage.includes('channel')) {
      components.push('subscription-list')
    }
    if (lowerMessage.includes('trending') || lowerMessage.includes('popular')) {
      components.push('trending-feed')
    }
    if (lowerMessage.includes('playlist')) {
      components.push('playlist-manager')
    }
    if (lowerMessage.includes('setting')) {
      components.push('settings-panel')
    }
    if (lowerMessage.includes('recommend')) {
      components.push('recommendation-feed')
    }
    
    // Extract modifiers
    if (lowerMessage.includes('big') || lowerMessage.includes('large') || lowerMessage.includes('huge')) {
      modifiers.push('large')
    }
    if (lowerMessage.includes('small') || lowerMessage.includes('mini') || lowerMessage.includes('compact')) {
      modifiers.push('small')
    }
    if (lowerMessage.includes('side') || lowerMessage.includes('sidebar')) {
      modifiers.push('sidebar')
    }
    if (lowerMessage.includes('top') || lowerMessage.includes('header')) {
      modifiers.push('top')
    }
    
    return { action, components, modifiers }
  }
}

// Export singleton instance
export const uiGenerator = UIGenerator.getInstance()

// Utility functions
export function isValidComponentType(type: string): type is ComponentSpec['type'] {
  const validTypes = [
    'video-player', 'search-bar', 'subscription-list', 'trending-feed',
    'channel-grid', 'playlist-manager', 'settings-panel', 'recommendation-feed'
  ]
  return validTypes.includes(type as ComponentSpec['type'])
}

export function generateComponentId(type: ComponentSpec['type'], index: number = 0): string {
  return `${type}-${index}-${Date.now()}`
}

export function getComponentDisplayName(type: ComponentSpec['type']): string {
  const displayNames: Record<ComponentSpec['type'], string> = {
    'video-player': 'Video Player',
    'search-bar': 'Search Bar',
    'subscription-list': 'Subscriptions',
    'trending-feed': 'Trending Videos',
    'channel-grid': 'Channel Grid',
    'playlist-manager': 'Playlists',
    'settings-panel': 'Settings',
    'recommendation-feed': 'Recommendations'
  }
  
  return displayNames[type] || type
}