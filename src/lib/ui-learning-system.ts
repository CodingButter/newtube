// DYNAMIC LEARNING SYSTEM FOR AI UI BUILDER
// Learns from user interactions and preferences to improve UI generation

import { UIIntent, ConversationContext } from './ai-ui-builder'
import { Panel, PanelType } from '@/types'

export interface UserPreference {
  id: string
  userId?: string
  category: 'layout' | 'component' | 'interaction' | 'style'
  pattern: string
  weight: number
  confidence: number
  createdAt: Date
  lastUsed: Date
  usageCount: number
}

export interface LearningFeedback {
  intentId: string
  originalIntent: UIIntent
  userAction: 'accepted' | 'rejected' | 'modified' | 'ignored'
  modifications?: Partial<UIIntent>
  contextFactors: {
    timeOfDay: string
    sessionDuration: number
    previousComponents: string[]
    userDescription: string
  }
  timestamp: Date
}

export interface PersonalizedPrompt {
  basePrompt: string
  userPersonalizations: string[]
  preferenceWeights: Record<string, number>
}

export class UILearningSystem {
  private preferences: UserPreference[] = []
  private feedbackHistory: LearningFeedback[] = []
  private userPatterns: Map<string, number> = new Map()

  constructor(private userId?: string) {
    this.loadStoredPreferences()
  }

  /**
   * Learn from user feedback on generated UI components
   */
  async learnFromFeedback(feedback: LearningFeedback): Promise<void> {
    this.feedbackHistory.push(feedback)
    
    // Analyze the feedback and update preferences
    await this.analyzeFeedback(feedback)
    
    // Store the learning data
    await this.persistLearning()
    
    console.log('🧠 Learning from feedback:', {
      action: feedback.userAction,
      component: feedback.originalIntent.component,
      description: feedback.originalIntent.description
    })
  }

  /**
   * Generate personalized prompts based on learned preferences
   */
  generatePersonalizedPrompt(context: ConversationContext): PersonalizedPrompt {
    const basePrompt = this.getBaseSystemPrompt()
    const personalizations: string[] = []
    const weights: Record<string, number> = {}

    // Add layout preferences
    const layoutPrefs = this.getPreferencesByCategory('layout')
    if (layoutPrefs.length > 0) {
      personalizations.push(`LEARNED LAYOUT PREFERENCES:`)
      layoutPrefs.forEach(pref => {
        personalizations.push(`- ${pref.pattern} (confidence: ${pref.confidence})`)
        weights[pref.pattern] = pref.weight
      })
    }

    // Add component preferences
    const componentPrefs = this.getPreferencesByCategory('component')
    if (componentPrefs.length > 0) {
      personalizations.push(`LEARNED COMPONENT PREFERENCES:`)
      componentPrefs.forEach(pref => {
        personalizations.push(`- ${pref.pattern} (used ${pref.usageCount} times)`)
        weights[pref.pattern] = pref.weight
      })
    }

    // Add interaction patterns
    const interactionPrefs = this.getPreferencesByCategory('interaction')
    if (interactionPrefs.length > 0) {
      personalizations.push(`LEARNED INTERACTION PATTERNS:`)
      interactionPrefs.forEach(pref => {
        personalizations.push(`- ${pref.pattern}`)
        weights[pref.pattern] = pref.weight
      })
    }

    // Add context-specific adaptations
    if (context.conversationHistory.length > 0) {
      const commonPatterns = this.extractCommonPatterns(context)
      if (commonPatterns.length > 0) {
        personalizations.push(`SESSION PATTERNS:`)
        commonPatterns.forEach(pattern => {
          personalizations.push(`- User often requests: ${pattern}`)
        })
      }
    }

    return {
      basePrompt,
      userPersonalizations: personalizations,
      preferenceWeights: weights
    }
  }

  /**
   * Predict user preferences for new descriptions
   */
  predictUserPreferences(description: string): {
    suggestedComponents: PanelType[]
    confidence: number
    reasoning: string[]
  } {
    const lowercaseDesc = description.toLowerCase()
    const suggestions: PanelType[] = []
    const reasoning: string[] = []
    let totalConfidence = 0

    // Check for learned patterns
    this.preferences.forEach(pref => {
      if (lowercaseDesc.includes(pref.pattern.toLowerCase())) {
        // Extract component type from preference
        const componentMatch = pref.pattern.match(/(\w+)-(?:panel|component|widget)/)
        if (componentMatch) {
          const componentType = componentMatch[1] as PanelType
          if (!suggestions.includes(componentType)) {
            suggestions.push(componentType)
            reasoning.push(`User often likes ${componentType} based on past feedback`)
            totalConfidence += pref.confidence
          }
        }
      }
    })

    // Check usage patterns
    const commonComponents = this.getMostUsedComponents()
    commonComponents.forEach(([component, usage]) => {
      if (usage > 3 && !suggestions.includes(component as PanelType)) {
        suggestions.push(component as PanelType)
        reasoning.push(`${component} is frequently used (${usage} times)`)
        totalConfidence += 0.7
      }
    })

    return {
      suggestedComponents: suggestions.slice(0, 3), // Top 3 suggestions
      confidence: Math.min(totalConfidence / suggestions.length || 0, 1),
      reasoning
    }
  }

  /**
   * Adapt generation based on time of day and context
   */
  getContextualAdaptations(context: ConversationContext): string[] {
    const adaptations: string[] = []
    const now = new Date()
    const hour = now.getHours()

    // Time-based adaptations
    if (hour >= 6 && hour < 12) {
      adaptations.push("Consider morning browsing patterns - users often prefer news and productivity content")
    } else if (hour >= 12 && hour < 17) {
      adaptations.push("Afternoon usage - balance between work and entertainment content")
    } else if (hour >= 17 && hour < 22) {
      adaptations.push("Evening relaxation time - prioritize entertainment and longer-form content")
    } else {
      adaptations.push("Late night browsing - suggest compact, easy-to-scan layouts")
    }

    // Session length adaptations
    if (context.conversationHistory.length > 5) {
      adaptations.push("Extended session - user is engaged, suggest advanced features")
    } else if (context.conversationHistory.length === 1) {
      adaptations.push("New session - keep initial suggestions simple and clear")
    }

    // Device/screen size adaptations (if available)
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth
      if (screenWidth < 768) {
        adaptations.push("Mobile screen detected - prioritize vertical layouts and larger touch targets")
      } else if (screenWidth > 1920) {
        adaptations.push("Large screen detected - utilize extra space with multi-column layouts")
      }
    }

    return adaptations
  }

  private async analyzeFeedback(feedback: LearningFeedback): Promise<void> {
    const { originalIntent, userAction, modifications, contextFactors } = feedback

    switch (userAction) {
      case 'accepted':
        // Reinforce this pattern
        await this.reinforcePattern(originalIntent, contextFactors, 1.2)
        break

      case 'rejected':
        // Weaken this pattern
        await this.reinforcePattern(originalIntent, contextFactors, 0.8)
        break

      case 'modified':
        if (modifications) {
          // Learn from the modifications
          await this.learnFromModifications(originalIntent, modifications, contextFactors)
        }
        break

      case 'ignored':
        // Slightly weaken the pattern
        await this.reinforcePattern(originalIntent, contextFactors, 0.95)
        break
    }
  }

  private async reinforcePattern(
    intent: UIIntent, 
    context: any, 
    multiplier: number
  ): Promise<void> {
    const pattern = `${intent.component}-${intent.position}-${intent.size}`
    
    const existingPref = this.preferences.find(p => 
      p.pattern === pattern && p.category === 'component'
    )

    if (existingPref) {
      existingPref.weight *= multiplier
      existingPref.confidence = Math.min(existingPref.confidence * 1.1, 1.0)
      existingPref.usageCount += 1
      existingPref.lastUsed = new Date()
    } else {
      this.preferences.push({
        id: `pref-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId: this.userId,
        category: 'component',
        pattern,
        weight: multiplier,
        confidence: 0.7,
        createdAt: new Date(),
        lastUsed: new Date(),
        usageCount: 1
      })
    }
  }

  private async learnFromModifications(
    original: UIIntent,
    modifications: Partial<UIIntent>,
    context: any
  ): Promise<void> {
    // Learn that user prefers the modified version over the original
    Object.entries(modifications).forEach(([key, value]) => {
      if (value !== undefined) {
        const preferencePattern = `${key}:${value}`
        
        this.preferences.push({
          id: `mod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          userId: this.userId,
          category: 'interaction',
          pattern: preferencePattern,
          weight: 1.1,
          confidence: 0.8,
          createdAt: new Date(),
          lastUsed: new Date(),
          usageCount: 1
        })
      }
    })
  }

  private getPreferencesByCategory(category: string): UserPreference[] {
    return this.preferences
      .filter(p => p.category === category)
      .sort((a, b) => b.weight * b.confidence - a.weight * a.confidence)
      .slice(0, 5) // Top 5 preferences per category
  }

  private extractCommonPatterns(context: ConversationContext): string[] {
    const patterns: Map<string, number> = new Map()
    
    context.conversationHistory.forEach(turn => {
      // Extract keywords from user input
      const keywords = turn.user.toLowerCase().match(/\b\w{4,}\b/g) || []
      keywords.forEach(keyword => {
        patterns.set(keyword, (patterns.get(keyword) || 0) + 1)
      })
    })

    return Array.from(patterns.entries())
      .filter(([_, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([pattern, _]) => pattern)
  }

  private getMostUsedComponents(): Array<[string, number]> {
    const componentUsage: Map<string, number> = new Map()
    
    this.preferences
      .filter(p => p.category === 'component')
      .forEach(pref => {
        const component = pref.pattern.split('-')[0]
        componentUsage.set(component, (componentUsage.get(component) || 0) + pref.usageCount)
      })

    return Array.from(componentUsage.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
  }

  private getBaseSystemPrompt(): string {
    return `You are NEWTUBE's personalized AI UI Builder. You learn from user preferences and adapt your responses accordingly.`
  }

  private loadStoredPreferences(): void {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(`newtube-ui-preferences-${this.userId || 'anonymous'}`)
        if (stored) {
          const data = JSON.parse(stored)
          this.preferences = data.preferences || []
          this.feedbackHistory = data.feedbackHistory || []
        }
      } catch (error) {
        console.error('Failed to load stored preferences:', error)
      }
    }
  }

  private async persistLearning(): Promise<void> {
    if (typeof window !== 'undefined') {
      try {
        const data = {
          preferences: this.preferences,
          feedbackHistory: this.feedbackHistory.slice(-50) // Keep last 50 feedback items
        }
        localStorage.setItem(`newtube-ui-preferences-${this.userId || 'anonymous'}`, JSON.stringify(data))
      } catch (error) {
        console.error('Failed to persist learning data:', error)
      }
    }

    // Also send to backend for cross-device learning
    try {
      await fetch('/api/ai/ui-builder/learn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: this.userId,
          preferences: this.preferences.slice(-10), // Last 10 preferences
          feedback: this.feedbackHistory.slice(-5)  // Last 5 feedback items
        })
      })
    } catch (error) {
      console.error('Failed to sync learning data:', error)
    }
  }

  /**
   * Get learning analytics for debugging
   */
  getAnalytics(): {
    totalPreferences: number
    totalFeedback: number
    topComponents: string[]
    confidenceDistribution: Record<string, number>
  } {
    const topComponents = this.getMostUsedComponents()
      .slice(0, 5)
      .map(([component, _]) => component)

    const confidenceDistribution: Record<string, number> = {}
    this.preferences.forEach(pref => {
      const bucket = Math.floor(pref.confidence * 10) / 10
      confidenceDistribution[bucket.toString()] = (confidenceDistribution[bucket.toString()] || 0) + 1
    })

    return {
      totalPreferences: this.preferences.length,
      totalFeedback: this.feedbackHistory.length,
      topComponents,
      confidenceDistribution
    }
  }
}

// Export singleton instance
export const uiLearningSystem = new UILearningSystem()