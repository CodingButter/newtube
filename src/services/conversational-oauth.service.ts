import OpenAI from 'openai'
import { 
  ConversationalOAuthRequest, 
  ConversationalOAuthResponse, 
  ComponentDefinition,
  Platform 
} from '@/types/dynamic-ui'
import { logger } from '@/lib/logger'
import { ComponentTemplateRegistry } from './component-template.service'
import { UIStateManager } from './ui-state-manager.service'

interface OAuthConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
  scope: string[]
  authUrl: string
  tokenUrl: string
}

interface OAuthSession {
  sessionId: string
  service: Platform
  state: string
  codeVerifier?: string
  context: string
  timestamp: number
  userId?: string
}

export class ConversationalOAuthService {
  private openai: OpenAI
  private templateRegistry: ComponentTemplateRegistry
  private stateManager: UIStateManager
  private oauthSessions: Map<string, OAuthSession> = new Map()

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
    this.templateRegistry = new ComponentTemplateRegistry()
    this.stateManager = new UIStateManager()
  }

  async processOAuthRequest(request: ConversationalOAuthRequest): Promise<ConversationalOAuthResponse> {
    try {
      // Analyze user intent with AI
      const intent = await this.analyzeOAuthIntent(request.context, request.service)
      
      // Generate OAuth URL based on service
      const oauthConfig = this.getOAuthConfig(request.service)
      if (!oauthConfig) {
        return {
          success: false,
          message: `Sorry, ${request.service} integration is not available yet. We're working on adding support for this platform.`,
          nextStep: 'You can try connecting a different service like YouTube or continue building your interface',
          requiresUserAction: false
        }
      }

      // Generate state parameter for security
      const state = this.generateState(request.sessionId)
      
      // Store OAuth session
      const oauthSession: OAuthSession = {
        sessionId: request.sessionId,
        service: request.service,
        state,
        context: request.context,
        timestamp: Date.now(),
        userId: request.userId
      }
      
      this.oauthSessions.set(state, oauthSession)

      // Build authorization URL
      const authUrl = this.buildAuthUrl(oauthConfig, state)

      // Generate suggested component to add after successful OAuth
      const suggestedComponent = await this.generatePostOAuthComponent(request.service, intent)

      // Create conversational response
      const response: ConversationalOAuthResponse = {
        success: true,
        authUrl,
        message: this.generateOAuthMessage(request.service, intent),
        nextStep: `I'll open ${request.service} in a new tab for you to sign in. Once you're connected, I'll add the perfect components to your interface.`,
        requiresUserAction: true,
        component: suggestedComponent
      }

      logger.info('OAuth request processed successfully', {
        service: request.service,
        sessionId: request.sessionId,
        intent: intent.primary
      })

      return response

    } catch (error) {
      logger.error('Error processing OAuth request:', error)
      
      return {
        success: false,
        message: `I had trouble connecting to ${request.service}. Let me try a different approach.`,
        nextStep: 'Would you like to try connecting again, or shall we continue building your interface?',
        requiresUserAction: false
      }
    }
  }

  async handleOAuthCallback(
    sessionId: string, 
    service: Platform, 
    code: string, 
    state: string
  ): Promise<ConversationalOAuthResponse> {
    try {
      // Validate state parameter
      const oauthSession = this.oauthSessions.get(state)
      if (!oauthSession || oauthSession.sessionId !== sessionId || oauthSession.service !== service) {
        throw new Error('Invalid OAuth state or session mismatch')
      }

      // Exchange code for access token
      const tokens = await this.exchangeCodeForTokens(service, code, state)
      
      // Store tokens securely (in a real app, encrypt these)
      await this.storeUserTokens(sessionId, service, tokens, oauthSession.userId)

      // Add suggested component to UI
      if (oauthSession.context) {
        const intent = await this.analyzeOAuthIntent(oauthSession.context, service)
        const component = await this.generatePostOAuthComponent(service, intent)
        
        if (component) {
          await this.stateManager.addComponent(sessionId, component)
        }
      }

      // Clean up OAuth session
      this.oauthSessions.delete(state)

      const response: ConversationalOAuthResponse = {
        success: true,
        message: `Perfect! I've successfully connected your ${service} account and added the components you wanted to your interface.`,
        nextStep: 'Your interface is now personalized with your content. What would you like to do next?',
        requiresUserAction: false,
        component: undefined // Component already added to state
      }

      logger.info('OAuth callback processed successfully', {
        service,
        sessionId,
        userId: oauthSession.userId
      })

      return response

    } catch (error) {
      logger.error('Error handling OAuth callback:', error)
      
      return {
        success: false,
        message: `I had trouble completing the connection to ${service}. The authorization might have failed or expired.`,
        nextStep: 'Would you like to try connecting again?',
        requiresUserAction: false
      }
    }
  }

  async getOAuthStatus(sessionId: string, service?: string): Promise<any> {
    try {
      // Get current UI state to see what's connected
      const uiState = await this.stateManager.getUIState(sessionId)
      if (!uiState) {
        return { connected: false, services: [] }
      }

      // Check which services have components in the current state
      const connectedServices = new Set<string>()
      
      for (const component of uiState.components) {
        if (component.props.platform) {
          connectedServices.add(component.props.platform)
        }
      }

      if (service) {
        return {
          connected: connectedServices.has(service),
          service,
          hasComponents: uiState.components.filter(c => c.props.platform === service).length > 0
        }
      }

      return {
        connected: connectedServices.size > 0,
        services: Array.from(connectedServices),
        totalComponents: uiState.components.length
      }

    } catch (error) {
      logger.error('Error getting OAuth status:', error)
      return { connected: false, error: 'Failed to check status' }
    }
  }

  private async analyzeOAuthIntent(context: string, service: Platform): Promise<{ primary: string; components: string[] }> {
    try {
      const prompt = `Analyze this user request for ${service} integration: "${context}"
      
What does the user want to do? Return JSON with:
{
  "primary": "main intent (e.g., 'watch_playlists', 'browse_subscriptions', 'search_content')",
  "components": ["suggested component types"]
}`

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at understanding user intent for video platform integrations. Always respond with valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 200,
        response_format: { type: 'json_object' }
      })

      const result = JSON.parse(response.choices[0]?.message?.content || '{"primary": "general", "components": []}')
      return result

    } catch (error) {
      logger.error('Error analyzing OAuth intent:', error)
      return { primary: 'general', components: ['VideoFeed'] }
    }
  }

  private async generatePostOAuthComponent(service: Platform, intent: any): Promise<ComponentDefinition | undefined> {
    try {
      // Get appropriate template based on intent
      let componentType = 'VideoFeed' // default
      
      switch (intent.primary) {
        case 'watch_playlists':
          componentType = 'PlaylistPanel'
          break
        case 'browse_subscriptions':
          componentType = 'ChannelList'
          break
        case 'search_content':
          componentType = 'SearchBar'
          break
        case 'trending':
          componentType = 'TrendingVideos'
          break
        default:
          componentType = 'VideoFeed'
      }

      const template = this.templateRegistry.getTemplate(componentType as any)
      if (!template) {
        return undefined
      }

      // Create component definition
      const component: ComponentDefinition = {
        id: `${componentType.toLowerCase()}_${service}_${Date.now()}`,
        type: componentType as any,
        displayName: `${service.charAt(0).toUpperCase() + service.slice(1)} ${template.displayName}`,
        props: {
          ...template.defaultProps,
          platform: service,
          title: `My ${service.charAt(0).toUpperCase() + service.slice(1)} ${template.displayName}`
        },
        position: { x: 0, y: 0, gridArea: 'auto' },
        size: { width: 'auto', height: 400 },
        style: {
          backgroundColor: '#ffffff',
          borderRadius: 8,
          border: '1px solid #e5e7eb',
          overflow: 'hidden'
        },
        metadata: {
          createdAt: Date.now(),
          createdBy: 'ai',
          version: 1,
          tags: [service, 'oauth', 'connected'],
          description: `Connected ${service} ${template.displayName.toLowerCase()}`,
          aiReasoning: `Added ${template.displayName} for ${service} based on user's request to "${intent.primary}"`
        }
      }

      return component

    } catch (error) {
      logger.error('Error generating post-OAuth component:', error)
      return undefined
    }
  }

  private getOAuthConfig(service: Platform): OAuthConfig | null {
    const configs: Record<Platform, OAuthConfig | null> = {
      youtube: {
        clientId: process.env.YOUTUBE_CLIENT_ID || '',
        clientSecret: process.env.YOUTUBE_CLIENT_SECRET || '',
        redirectUri: process.env.YOUTUBE_REDIRECT_URI || `${process.env.NEXT_PUBLIC_BASE_URL}/api/connect/callback`,
        scope: ['https://www.googleapis.com/auth/youtube.readonly'],
        authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenUrl: 'https://oauth2.googleapis.com/token'
      },
      vimeo: {
        clientId: process.env.VIMEO_CLIENT_ID || '',
        clientSecret: process.env.VIMEO_CLIENT_SECRET || '',
        redirectUri: process.env.VIMEO_REDIRECT_URI || `${process.env.NEXT_PUBLIC_BASE_URL}/api/connect/callback`,
        scope: ['public', 'private'],
        authUrl: 'https://api.vimeo.com/oauth/authorize',
        tokenUrl: 'https://api.vimeo.com/oauth/access_token'
      },
      nebula: null // Not yet implemented
    }

    const config = configs[service]
    if (!config || !config.clientId) {
      return null
    }

    return config
  }

  private buildAuthUrl(config: OAuthConfig, state: string): string {
    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      scope: config.scope.join(' '),
      response_type: 'code',
      state,
      access_type: 'offline', // For refresh tokens
      prompt: 'consent'
    })

    return `${config.authUrl}?${params.toString()}`
  }

  private generateOAuthMessage(service: Platform, intent: any): string {
    const messages = {
      youtube: {
        watch_playlists: "Great! I'll connect your YouTube account so you can access all your playlists right here.",
        browse_subscriptions: "Perfect! Let me connect your YouTube account to show your subscriptions in a beautiful interface.",
        search_content: "Excellent! I'll connect YouTube so you can search your personal content and the entire platform.",
        general: "Awesome! I'll connect your YouTube account to personalize your video experience."
      },
      vimeo: {
        general: "Great choice! I'll connect your Vimeo account to access your creative content."
      },
      nebula: {
        general: "I'd love to connect Nebula, but that integration isn't ready yet. Let me know if you'd like to try YouTube or Vimeo instead!"
      }
    }

    const serviceMessages = messages[service] || { general: `I'll connect your ${service} account.` }
    return serviceMessages[intent.primary as keyof typeof serviceMessages] || serviceMessages.general
  }

  private async exchangeCodeForTokens(service: Platform, code: string, state: string): Promise<any> {
    const config = this.getOAuthConfig(service)
    if (!config) {
      throw new Error(`OAuth config not found for ${service}`)
    }

    const tokenData = {
      code,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: config.redirectUri,
      grant_type: 'authorization_code'
    }

    const response = await fetch(config.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams(tokenData)
    })

    if (!response.ok) {
      throw new Error(`Token exchange failed: ${response.statusText}`)
    }

    return response.json()
  }

  private async storeUserTokens(sessionId: string, service: Platform, tokens: any, userId?: string): Promise<void> {
    // In a real app, encrypt tokens before storing
    const tokenData = {
      service,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: tokens.expires_in ? Date.now() + (tokens.expires_in * 1000) : undefined,
      scope: tokens.scope,
      tokenType: tokens.token_type || 'Bearer',
      connectedAt: Date.now()
    }

    // Store in your database or cache
    // For MVP, we'll just log it
    logger.info('Tokens stored for user', {
      sessionId,
      userId,
      service,
      hasRefreshToken: !!tokens.refresh_token
    })
  }

  private generateState(sessionId: string): string {
    return `${sessionId}_${Date.now()}_${Math.random().toString(36).substr(2, 10)}`
  }

  // Cleanup expired OAuth sessions
  private cleanupExpiredSessions(): void {
    const now = Date.now()
    const maxAge = 10 * 60 * 1000 // 10 minutes

    for (const [state, session] of this.oauthSessions.entries()) {
      if (now - session.timestamp > maxAge) {
        this.oauthSessions.delete(state)
      }
    }
  }
}