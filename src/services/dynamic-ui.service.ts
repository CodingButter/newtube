import OpenAI from 'openai'
import { 
  DynamicComponentRequest, 
  DynamicUIResponse, 
  ComponentDefinition, 
  LayoutDefinition,
  ComponentTemplate,
  DynamicUIState,
  UIUpdateEvent,
  AISuggestion,
  DynamicComponentType,
  ComponentCategory
} from '@/types/dynamic-ui'
import { logger } from '@/lib/logger'
import { ComponentTemplateRegistry } from './component-template.service'
import { UIStateManager } from './ui-state-manager.service'
import { WebSocketService } from './websocket.service'

export class DynamicUIService {
  private openai: OpenAI
  private templateRegistry: ComponentTemplateRegistry
  private stateManager: UIStateManager
  private wsService: WebSocketService

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
    this.templateRegistry = new ComponentTemplateRegistry()
    this.stateManager = new UIStateManager()
    this.wsService = new WebSocketService()
  }

  async generateUI(request: DynamicComponentRequest): Promise<DynamicUIResponse> {
    const startTime = Date.now()
    
    try {
      // Get available component templates
      const availableTemplates = this.templateRegistry.getAllTemplates()
      
      // Build AI prompt for UI generation
      const prompt = this.buildUIGenerationPrompt(request, availableTemplates)
      
      // Call OpenAI to generate UI
      const aiResponse = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: this.getSystemPrompt()
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
        response_format: { type: 'json_object' }
      })

      // Parse AI response
      const aiContent = aiResponse.choices[0]?.message?.content
      if (!aiContent) {
        throw new Error('No response from AI')
      }

      const parsedResponse = JSON.parse(aiContent)
      
      // Transform AI response into our component format
      const uiResponse: DynamicUIResponse = await this.transformAIResponse(
        parsedResponse, 
        request
      )

      // Save state if session provided
      if (request.sessionId) {
        await this.stateManager.saveUIState(request.sessionId, {
          sessionId: request.sessionId,
          userId: request.userId,
          currentLayout: uiResponse.layout,
          components: uiResponse.components,
          history: [],
          preferences: request.context.userPreferences,
          isVoiceActive: false,
          lastUpdate: Date.now()
        })

        // Broadcast update via WebSocket
        this.wsService.broadcastUIUpdate({
          type: 'component_added',
          sessionId: request.sessionId,
          layout: uiResponse.layout,
          metadata: {
            timestamp: Date.now(),
            source: 'ai',
            reason: 'UI generation from prompt'
          }
        })
      }

      // Add processing metadata
      uiResponse.metadata = {
        ...uiResponse.metadata,
        processingTime: Date.now() - startTime,
        aiModel: 'gpt-4-turbo-preview',
        tokensUsed: aiResponse.usage?.total_tokens
      }

      return uiResponse

    } catch (error) {
      logger.error('Error in generateUI', error)
      throw error
    }
  }

  private getSystemPrompt(): string {
    return `You are NEWTUBE's AI UI Generation Expert. Your job is to create perfect, personalized user interfaces through conversation.

CORE PRINCIPLES:
1. NEVER create fixed layouts - everything is dynamic and conversation-driven
2. Focus on user intent, not traditional UI patterns
3. Create components that work together seamlessly
4. Prioritize accessibility and responsive design
5. Generate layouts that feel magical and intuitive

RESPONSE FORMAT:
You MUST respond with valid JSON in this exact format:
{
  "components": [
    {
      "id": "unique-id",
      "type": "ComponentType",
      "displayName": "Human readable name",
      "props": {
        "title": "Component title",
        "platform": "youtube|vimeo|nebula",
        "autoRefresh": true
      },
      "position": { "x": 0, "y": 0, "gridArea": "main" },
      "size": { "width": "auto", "height": 400 },
      "style": {
        "backgroundColor": "#ffffff",
        "borderRadius": 8,
        "border": "1px solid #e5e7eb"
      },
      "metadata": {
        "createdAt": ${Date.now()},
        "createdBy": "ai",
        "version": 1,
        "tags": ["tag1", "tag2"],
        "description": "What this component does",
        "aiReasoning": "Why I chose this component"
      }
    }
  ],
  "layout": {
    "type": "grid",
    "template": "repeat(auto-fit, minmax(300px, 1fr))",
    "gap": 16,
    "padding": 20,
    "responsive": [
      {
        "breakpoint": 768,
        "columns": 1,
        "template": "1fr"
      }
    ]
  },
  "suggestions": [
    {
      "id": "suggestion-1",
      "type": "component_addition",
      "title": "Add voice control",
      "description": "Would you like voice commands?",
      "confidence": 0.8,
      "reasoning": "User mentioned hands-free control"
    }
  ],
  "reasoning": "Detailed explanation of UI decisions"
}

AVAILABLE COMPONENTS: VideoPlayer, VideoFeed, SearchBar, ChannelList, PlaylistPanel, Comments, Recommendations, TrendingVideos, WatchLater, Subscriptions, CustomFeed, MiniPlayer, VoiceControl, AIAssistant, StatsPanel, SettingsPanel, NotificationCenter, QuickActions, CustomHTML

CONVERSATION CONTEXT ANALYSIS:
- Analyze user's natural language for UI intent
- Consider their preferences and past components
- Create components that anticipate their needs
- Suggest improvements and additions

MAGIC MOMENTS TO CREATE:
- "Show me tech videos" → Curated tech feed with trending sidebar
- "I want my YouTube playlists" → Playlist panel + mini player
- "Search across all platforms" → Universal search with filters
- "Create a watching room" → Video player + chat + recommendations

Remember: You're creating the future of UI - make it feel magical!`
  }

  private buildUIGenerationPrompt(
    request: DynamicComponentRequest, 
    templates: ComponentTemplate[]
  ): string {
    const context = request.context

    return `USER PROMPT: "${request.userPrompt}"

CONVERSATION CONTEXT:
- Previous components: ${JSON.stringify(context.previousComponents.map(c => ({ type: c.type, displayName: c.displayName })))}
- User preferences: ${JSON.stringify(context.userPreferences)}
- Current page: ${context.currentPage || 'unknown'}
- Conversation history: ${context.conversationHistory.slice(-3).map(m => `${m.role}: ${m.content}`).join('\n')}

AVAILABLE COMPONENT TEMPLATES:
${templates.map(t => `- ${t.type}: ${t.description} (${t.category})`).join('\n')}

USER PREFERENCES ANALYSIS:
- Theme: ${context.userPreferences.theme}
- Layout style: ${context.userPreferences.layoutStyle}
- Interaction mode: ${context.userPreferences.interactionMode}
- Accessibility needs: ${JSON.stringify(context.userPreferences.accessibility)}

TASK:
Generate a perfect UI that matches the user's intent. Consider:
1. What components would fulfill their request?
2. How should they be arranged for optimal flow?
3. What additional components would enhance the experience?
4. How can we make this feel magical and intuitive?

Create components that work together seamlessly and anticipate the user's next actions.`
  }

  private async transformAIResponse(
    aiResponse: any, 
    request: DynamicComponentRequest
  ): Promise<DynamicUIResponse> {
    // Validate and enhance AI response
    const components: ComponentDefinition[] = aiResponse.components.map((comp: any) => ({
      ...comp,
      id: comp.id || this.generateComponentId(),
      metadata: {
        ...comp.metadata,
        createdAt: comp.metadata?.createdAt || Date.now(),
        createdBy: 'ai',
        version: 1
      }
    }))

    const layout: LayoutDefinition = {
      type: 'grid',
      gap: 16,
      padding: 20,
      template: 'repeat(auto-fit, minmax(300px, 1fr))',
      responsive: [
        { breakpoint: 768, columns: 1, template: '1fr' },
        { breakpoint: 1024, columns: 2, template: 'repeat(2, 1fr)' },
        { breakpoint: 1440, columns: 3, template: 'repeat(3, 1fr)' }
      ],
      ...aiResponse.layout
    }

    const suggestions: AISuggestion[] = (aiResponse.suggestions || []).map((s: any) => ({
      ...s,
      id: s.id || this.generateSuggestionId()
    }))

    return {
      components,
      layout,
      actions: aiResponse.actions || [],
      suggestions,
      metadata: {
        processingTime: 0, // Will be set by caller
        aiModel: 'gpt-4-turbo-preview',
        confidence: aiResponse.confidence || 0.8,
        reasoning: aiResponse.reasoning || 'AI-generated UI based on user prompt',
        tokensUsed: 0 // Will be set by caller
      }
    }
  }

  async getUIState(sessionId: string): Promise<DynamicUIState | null> {
    return this.stateManager.getUIState(sessionId)
  }

  async updateUIState(sessionId: string, update: any): Promise<DynamicUIState> {
    const currentState = await this.stateManager.getUIState(sessionId)
    
    if (!currentState) {
      throw new Error('Session not found')
    }

    // Apply updates
    const updatedState: DynamicUIState = {
      ...currentState,
      components: update.components || currentState.components,
      currentLayout: update.layout || currentState.currentLayout,
      lastUpdate: Date.now(),
      history: [
        ...currentState.history,
        {
          timestamp: Date.now(),
          components: currentState.components,
          layout: currentState.currentLayout,
          trigger: update.action || 'manual_update'
        }
      ].slice(-10) // Keep last 10 states
    }

    await this.stateManager.saveUIState(sessionId, updatedState)

    // Broadcast update
    this.wsService.broadcastUIUpdate({
      type: 'state_synced',
      sessionId,
      metadata: {
        timestamp: Date.now(),
        source: 'user',
        reason: update.action
      }
    })

    return updatedState
  }

  async clearUIState(sessionId: string): Promise<void> {
    await this.stateManager.clearUIState(sessionId)
  }

  async generateSuggestions(
    sessionId: string, 
    context: string
  ): Promise<AISuggestion[]> {
    const currentState = await this.getUIState(sessionId)
    
    if (!currentState) {
      return []
    }

    // Use AI to generate contextual suggestions
    const prompt = `
    Current UI State: ${JSON.stringify(currentState.components.map(c => ({ type: c.type, displayName: c.displayName })))}
    User Context: ${context}
    
    Generate 3-5 intelligent suggestions for improving or extending the current UI.
    Focus on what would be most helpful for the user's workflow.
    
    Return as JSON array of suggestions.`

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: 'You are a UI optimization expert. Generate helpful UI suggestions.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.6,
        max_tokens: 1000,
        response_format: { type: 'json_object' }
      })

      const suggestions = JSON.parse(response.choices[0]?.message?.content || '{"suggestions": []}')
      return suggestions.suggestions || []

    } catch (error) {
      logger.error('Error generating suggestions', error)
      return []
    }
  }

  private generateComponentId(): string {
    return `comp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private generateSuggestionId(): string {
    return `sugg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
}