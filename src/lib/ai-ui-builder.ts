// REVOLUTIONARY AI UI BUILDER - Core System
// Converts user imagination into real-time UI components

import { Panel, PanelType, PanelConfig, Position, Size } from '@/types'
import { UILearningSystem, uiLearningSystem, LearningFeedback } from './ui-learning-system'

export interface UIIntent {
  component: PanelType | 'custom'
  properties: Record<string, any>
  position?: 'left' | 'right' | 'top' | 'bottom' | 'center' | 'floating'
  size?: 'small' | 'medium' | 'large' | 'full'
  description: string
  confidence: number
}

export interface ConversationContext {
  userDescription: string
  previousComponents: Panel[]
  userPreferences: Record<string, any>
  layoutConstraints: {
    availableSpace: Size
    existingPanels: Panel[]
  }
  conversationHistory: ConversationTurn[]
}

export interface ConversationTurn {
  user: string
  ai: string
  timestamp: Date
  generatedComponents?: UIIntent[]
}

export interface UIGenerationResponse {
  components: UIIntent[]
  explanation: string
  suggestions: string[]
  needsMoreInfo?: boolean
  questions?: string[]
}

export class AIUIBuilder {
  private conversationContext: ConversationContext | null = null
  private learningSystem: UILearningSystem
  
  constructor(private openaiApiKey?: string, userId?: string) {
    this.learningSystem = new UILearningSystem(userId)
  }

  /**
   * Parse natural language into UI components
   */
  async parseDescription(
    description: string, 
    context?: ConversationContext
  ): Promise<UIGenerationResponse> {
    try {
      // Get personalized prompts from learning system
      const personalizedPrompt = context ? 
        this.learningSystem.generatePersonalizedPrompt(context) : null
      
      const systemPrompt = this.buildSystemPrompt(personalizedPrompt)
      const userPrompt = this.buildUserPrompt(description, context)
      
      // Get predictive suggestions
      const predictions = this.learningSystem.predictUserPreferences(description)

      const response = await fetch('/api/ai/ui-builder/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemPrompt,
          userPrompt,
          context,
          predictions,
          personalizedPrompt
        })
      })

      if (!response.ok) {
        throw new Error(`AI UI Builder API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Failed to parse UI description:', error)
      return {
        components: [],
        explanation: 'Sorry, I had trouble understanding that. Could you describe what you want more specifically?',
        suggestions: [
          'Try describing the layout you want',
          'Mention specific features like "video player" or "search bar"',
          'Tell me where you want things positioned'
        ]
      }
    }
  }

  /**
   * Convert UI intents to actual panels
   */
  convertIntentsToPanels(
    intents: UIIntent[], 
    availableSpace: Size
  ): Panel[] {
    const panels: Panel[] = []
    const usedPositions: Position[] = []
    
    intents.forEach((intent, index) => {
      const position = this.calculatePosition(
        intent, 
        availableSpace, 
        usedPositions, 
        index
      )
      
      const size = this.calculateSize(intent, availableSpace)
      
      const panel: Panel = {
        id: `ai-generated-${Date.now()}-${index}`,
        type: intent.component as PanelType,
        title: this.generatePanelTitle(intent),
        position,
        size,
        config: this.convertPropertiesToConfig(intent),
        minimized: false,
        visible: true
      }
      
      panels.push(panel)
      usedPositions.push(position)
    })
    
    return panels
  }

  /**
   * Handle conversation updates
   */
  updateConversation(
    userInput: string, 
    aiResponse: string, 
    generatedComponents?: UIIntent[]
  ): void {
    if (!this.conversationContext) {
      this.conversationContext = {
        userDescription: userInput,
        previousComponents: [],
        userPreferences: {},
        layoutConstraints: {
          availableSpace: { width: 1200, height: 800 },
          existingPanels: []
        },
        conversationHistory: []
      }
    }

    this.conversationContext.conversationHistory.push({
      user: userInput,
      ai: aiResponse,
      timestamp: new Date(),
      generatedComponents
    })
  }

  /**
   * Learn from user interactions with enhanced feedback
   */
  async learnFromInteraction(
    originalIntent: UIIntent,
    userFeedback: 'good' | 'bad' | 'modify',
    modifications?: Partial<UIIntent>
  ): Promise<void> {
    // Create detailed feedback for learning system
    const feedback: LearningFeedback = {
      intentId: `intent-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      originalIntent,
      userAction: userFeedback === 'good' ? 'accepted' : 
                  userFeedback === 'bad' ? 'rejected' : 'modified',
      modifications,
      contextFactors: {
        timeOfDay: new Date().getHours().toString(),
        sessionDuration: this.conversationContext?.conversationHistory.length || 0,
        previousComponents: this.conversationContext?.previousComponents.map(p => p.type) || [],
        userDescription: this.conversationContext?.userDescription || ''
      },
      timestamp: new Date()
    }

    // Learn from the feedback
    await this.learningSystem.learnFromFeedback(feedback)

    // Also store in backend
    try {
      await fetch('/api/ai/ui-builder/learn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback)
      })
    } catch (error) {
      console.error('Failed to store learning data:', error)
    }
  }

  private buildSystemPrompt(personalizedPrompt?: any): string {
    return `You are NEWTUBE's AI UI Builder. Your job is to convert user descriptions into precise UI component instructions.

NEWTUBE is a streaming aggregator with these panel types:
- video-feed: Shows video feeds from platforms
- video-player: Plays a specific video
- search: Search interface for finding videos
- list: Shows playlists, watch later, subscriptions
- recommendations: AI-curated content recommendations
- trending: Trending videos
- ai-curated: AI-selected content
- custom: Custom panels for special features

POSITIONING KEYWORDS:
- "big" / "large" → size: "large"
- "small" / "tiny" → size: "small"
- "on the left" → position: "left"
- "on the right" → position: "right"
- "at the top" → position: "top"
- "at the bottom" → position: "bottom"
- "in the center" → position: "center"
- "floating" → position: "floating"

FEATURE KEYWORDS:
- "video player" → type: "video-player"
- "search" / "find" → type: "search"
- "subscriptions" / "my channels" → type: "subscriptions"
- "recommendations" / "suggested" → type: "recommendations"
- "trending" / "popular" → type: "trending"
- "watch later" → type: "watch-later"
- "video feed" / "videos" → type: "video-feed"

EXAMPLES:
Input: "I want a big video player with comments on the side"
Output: {
  "components": [
    {
      "component": "video-player",
      "properties": {"showComments": true},
      "position": "center",
      "size": "large",
      "description": "Main video player",
      "confidence": 0.95
    },
    {
      "component": "custom",
      "properties": {"type": "comments", "layout": "sidebar"},
      "position": "right",
      "size": "medium",
      "description": "Comments sidebar",
      "confidence": 0.90
    }
  ],
  "explanation": "I've created a large video player in the center with a comments sidebar on the right.",
  "suggestions": ["Would you like to add a search bar?", "Should I include recommended videos below?"]
}

Input: "Show me trending videos on the left and my subscriptions on the right"
Output: {
  "components": [
    {
      "component": "trending",
      "properties": {"maxVideos": 10},
      "position": "left",
      "size": "medium",
      "description": "Trending videos panel",
      "confidence": 0.98
    },
    {
      "component": "subscriptions",
      "properties": {"sortBy": "recent"},
      "position": "right",
      "size": "medium",
      "description": "Subscriptions panel",
      "confidence": 0.98
    }
  ],
  "explanation": "I've set up trending videos on the left and your subscriptions on the right side.",
  "suggestions": ["Would you like a search bar at the top?", "Should I add a main video player?"]
}

Always respond with valid JSON. Be creative but practical. If unsure, ask clarifying questions.

${personalizedPrompt ? `

PERSONALIZATION DATA:
${personalizedPrompt.userPersonalizations.join('\n')}

LEARNED PATTERNS:
${Object.entries(personalizedPrompt.preferenceWeights).map(([pattern, weight]) => 
  `- ${pattern} (weight: ${weight})`).join('\n')}
` : ''}

Remember to incorporate these learned preferences into your suggestions while still being responsive to the current request.`
  }

  private buildUserPrompt(description: string, context?: ConversationContext): string {
    let prompt = `User wants: "${description}"`
    
    if (context?.conversationHistory?.length) {
      prompt += `\n\nConversation history:\n`
      context.conversationHistory.slice(-3).forEach(turn => {
        prompt += `User: ${turn.user}\nAI: ${turn.ai}\n`
      })
    }
    
    if (context?.previousComponents?.length) {
      prompt += `\n\nExisting components: ${context.previousComponents.map(p => p.type).join(', ')}`
    }
    
    return prompt
  }

  private calculatePosition(
    intent: UIIntent,
    availableSpace: Size,
    usedPositions: Position[],
    index: number
  ): Position {
    const positionMap = {
      'left': { x: 0, y: index * 300 },
      'right': { x: availableSpace.width - 400, y: index * 300 },
      'top': { x: index * 400, y: 0 },
      'bottom': { x: index * 400, y: availableSpace.height - 300 },
      'center': { x: availableSpace.width / 2 - 200, y: availableSpace.height / 2 - 150 },
      'floating': { x: 100 + index * 50, y: 100 + index * 50 }
    }

    const defaultPosition = positionMap[intent.position as keyof typeof positionMap] || 
                           { x: index * 350, y: index * 250 }

    // Avoid collisions
    let finalPosition = defaultPosition
    while (usedPositions.some(pos => 
      Math.abs(pos.x - finalPosition.x) < 300 && 
      Math.abs(pos.y - finalPosition.y) < 250
    )) {
      finalPosition = {
        x: finalPosition.x + 350,
        y: finalPosition.y + (finalPosition.x > availableSpace.width - 400 ? 250 : 0)
      }
      
      if (finalPosition.x > availableSpace.width - 400) {
        finalPosition.x = 0
      }
    }

    return finalPosition
  }

  private calculateSize(intent: UIIntent, availableSpace: Size): Size {
    const sizeMap = {
      'small': { width: 300, height: 200 },
      'medium': { width: 400, height: 300 },
      'large': { width: 600, height: 400 },
      'full': { width: availableSpace.width - 100, height: availableSpace.height - 100 }
    }

    return sizeMap[intent.size as keyof typeof sizeMap] || sizeMap.medium
  }

  private generatePanelTitle(intent: UIIntent): string {
    const titleMap: Record<string, string> = {
      'video-feed': 'Video Feed',
      'video-player': 'Video Player',
      'search': 'Search',
      'list': 'My List',
      'recommendations': 'Recommended',
      'trending': 'Trending',
      'subscriptions': 'Subscriptions',
      'watch-later': 'Watch Later',
      'ai-curated': 'AI Curated',
      'custom': intent.properties?.title || 'Custom Panel'
    }

    return titleMap[intent.component] || intent.description
  }

  private convertPropertiesToConfig(intent: UIIntent): PanelConfig {
    const baseConfig: PanelConfig = {
      aiGenerated: true,
      originalDescription: intent.description,
      confidence: intent.confidence,
      ...intent.properties
    }

    // Add type-specific configurations
    switch (intent.component) {
      case 'video-feed':
        return {
          ...baseConfig,
          platform: intent.properties?.platform || 'youtube',
          maxVideos: intent.properties?.maxVideos || 12,
          category: intent.properties?.category
        }
      
      case 'search':
        return {
          ...baseConfig,
          platforms: intent.properties?.platforms || ['youtube', 'vimeo'],
          resultsLimit: intent.properties?.resultsLimit || 20
        }
      
      case 'recommendations':
        return {
          ...baseConfig,
          category: intent.properties?.category || 'personalized',
          maxRecommendations: intent.properties?.maxRecommendations || 10,
          aiEnabled: true
        }

      default:
        return baseConfig
    }
  }

  /**
   * Get conversation context
   */
  getContext(): ConversationContext | null {
    return this.conversationContext
  }

  /**
   * Reset conversation
   */
  resetConversation(): void {
    this.conversationContext = null
  }
}

// Export singleton instance
export const aiUIBuilder = new AIUIBuilder()