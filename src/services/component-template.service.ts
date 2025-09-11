import { 
  ComponentTemplate, 
  DynamicComponentType, 
  ComponentCategory,
  ComponentExample,
  Platform 
} from '@/types/dynamic-ui'

export class ComponentTemplateRegistry {
  private templates: Map<DynamicComponentType, ComponentTemplate> = new Map()

  constructor() {
    this.initializeTemplates()
  }

  private initializeTemplates() {
    // Video Player Component
    this.templates.set('VideoPlayer', {
      type: 'VideoPlayer',
      displayName: 'Video Player',
      description: 'Embedded video player supporting YouTube, Vimeo, and Nebula',
      defaultProps: {
        autoplay: false,
        controls: true,
        showInfo: true,
        loop: false
      },
      requiredProps: ['videoId', 'platform'],
      optionalProps: ['title', 'autoplay', 'controls', 'showInfo', 'loop', 'startTime'],
      supportedPlatforms: ['youtube', 'vimeo', 'nebula'],
      category: 'media',
      complexity: 'simple',
      examples: [
        {
          name: 'YouTube Video',
          description: 'Play a specific YouTube video',
          props: { videoId: 'dQw4w9WgXcQ', platform: 'youtube', title: 'Rick Astley - Never Gonna Give You Up' },
          useCase: 'User wants to watch a specific video'
        }
      ]
    })

    // Video Feed Component
    this.templates.set('VideoFeed', {
      type: 'VideoFeed',
      displayName: 'Video Feed',
      description: 'Curated feed of videos from specific platforms or categories',
      defaultProps: {
        maxVideos: 20,
        autoRefresh: false,
        showThumbnails: true,
        layout: 'grid'
      },
      requiredProps: ['platform'],
      optionalProps: ['category', 'maxVideos', 'autoRefresh', 'query', 'channelId', 'layout'],
      supportedPlatforms: ['youtube', 'vimeo', 'nebula'],
      category: 'media',
      complexity: 'medium',
      examples: [
        {
          name: 'Tech Videos Feed',
          description: 'Latest technology videos from YouTube',
          props: { platform: 'youtube', category: 'technology', maxVideos: 15 },
          useCase: 'User interested in tech content'
        },
        {
          name: 'Channel Feed',
          description: 'Videos from a specific channel',
          props: { platform: 'youtube', channelId: 'UC_x5XG1OV2P6uZZ5FSM9Ttw', maxVideos: 10 },
          useCase: 'User wants to follow a specific creator'
        }
      ]
    })

    // Search Bar Component
    this.templates.set('SearchBar', {
      type: 'SearchBar',
      displayName: 'Universal Search',
      description: 'Search across multiple video platforms simultaneously',
      defaultProps: {
        placeholder: 'Search videos...',
        platforms: ['youtube', 'vimeo', 'nebula'],
        showFilters: true,
        instantSearch: false
      },
      requiredProps: [],
      optionalProps: ['placeholder', 'platforms', 'showFilters', 'defaultQuery', 'instantSearch'],
      supportedPlatforms: ['youtube', 'vimeo', 'nebula'],
      category: 'utility',
      complexity: 'medium',
      examples: [
        {
          name: 'Global Search',
          description: 'Search all platforms at once',
          props: { platforms: ['youtube', 'vimeo', 'nebula'], showFilters: true },
          useCase: 'User wants to find content across platforms'
        }
      ]
    })

    // Recommendations Component
    this.templates.set('Recommendations', {
      type: 'Recommendations',
      displayName: 'AI Recommendations',
      description: 'Personalized video recommendations powered by AI',
      defaultProps: {
        maxRecommendations: 10,
        aiEnabled: true,
        showReasoning: true,
        refreshInterval: 300000 // 5 minutes
      },
      requiredProps: [],
      optionalProps: ['maxRecommendations', 'category', 'basedOn', 'aiEnabled', 'showReasoning'],
      category: 'ai',
      complexity: 'complex',
      examples: [
        {
          name: 'Personalized Feed',
          description: 'AI-curated recommendations based on viewing history',
          props: { maxRecommendations: 15, aiEnabled: true, showReasoning: true },
          useCase: 'User wants personalized content discovery'
        }
      ]
    })

    // Playlist Panel Component
    this.templates.set('PlaylistPanel', {
      type: 'PlaylistPanel',
      displayName: 'Playlist Manager',
      description: 'Manage and display playlists from connected platforms',
      defaultProps: {
        showThumbnails: true,
        allowReorder: true,
        showProgress: true
      },
      requiredProps: ['platform'],
      optionalProps: ['playlistId', 'showThumbnails', 'allowReorder', 'showProgress', 'maxItems'],
      supportedPlatforms: ['youtube', 'vimeo'],
      category: 'media',
      complexity: 'medium',
      examples: [
        {
          name: 'YouTube Playlists',
          description: 'Display user\'s YouTube playlists',
          props: { platform: 'youtube', showThumbnails: true, allowReorder: true },
          useCase: 'User wants to access their saved playlists'
        }
      ]
    })

    // Comments Component
    this.templates.set('Comments', {
      type: 'Comments',
      displayName: 'Smart Comments',
      description: 'AI-filtered and analyzed comments with toxicity detection',
      defaultProps: {
        maxComments: 50,
        filterToxic: true,
        showRelevance: true,
        aiAnalysis: true
      },
      requiredProps: ['videoId', 'platform'],
      optionalProps: ['maxComments', 'filterToxic', 'showRelevance', 'aiAnalysis', 'sortBy'],
      category: 'social',
      complexity: 'complex',
      examples: [
        {
          name: 'Filtered Comments',
          description: 'Show only relevant, non-toxic comments',
          props: { videoId: 'abc123', platform: 'youtube', filterToxic: true, showRelevance: true },
          useCase: 'User wants clean, relevant discussion'
        }
      ]
    })

    // Channel List Component
    this.templates.set('ChannelList', {
      type: 'ChannelList',
      displayName: 'Channel Subscriptions',
      description: 'List of subscribed channels with latest videos',
      defaultProps: {
        showLatestVideo: true,
        showSubscriberCount: false,
        layout: 'list'
      },
      requiredProps: ['platform'],
      optionalProps: ['showLatestVideo', 'showSubscriberCount', 'layout', 'maxChannels'],
      supportedPlatforms: ['youtube', 'vimeo'],
      category: 'social',
      complexity: 'medium',
      examples: [
        {
          name: 'Subscription Feed',
          description: 'Quick access to subscribed channels',
          props: { platform: 'youtube', showLatestVideo: true, layout: 'grid' },
          useCase: 'User wants to browse their subscriptions'
        }
      ]
    })

    // Voice Control Component
    this.templates.set('VoiceControl', {
      type: 'VoiceControl',
      displayName: 'Voice Assistant',
      description: 'Voice control interface for hands-free navigation',
      defaultProps: {
        alwaysListening: false,
        showTranscript: true,
        enableTTS: true,
        wakeWord: 'hey newtube'
      },
      requiredProps: [],
      optionalProps: ['alwaysListening', 'showTranscript', 'enableTTS', 'wakeWord', 'language'],
      category: 'ai',
      complexity: 'complex',
      examples: [
        {
          name: 'Hands-free Control',
          description: 'Voice commands for navigation and control',
          props: { alwaysListening: false, showTranscript: true, enableTTS: true },
          useCase: 'User wants hands-free interaction'
        }
      ]
    })

    // AI Assistant Component
    this.templates.set('AIAssistant', {
      type: 'AIAssistant',
      displayName: 'AI Chat Assistant',
      description: 'Conversational AI for content discovery and UI help',
      defaultProps: {
        showHistory: true,
        enableVoice: false,
        personality: 'helpful',
        contextAware: true
      },
      requiredProps: [],
      optionalProps: ['showHistory', 'enableVoice', 'personality', 'contextAware', 'maxHistory'],
      category: 'ai',
      complexity: 'complex',
      examples: [
        {
          name: 'Content Discovery Chat',
          description: 'Chat with AI to find perfect content',
          props: { showHistory: true, personality: 'enthusiastic', contextAware: true },
          useCase: 'User wants intelligent content recommendations'
        }
      ]
    })

    // Trending Videos Component
    this.templates.set('TrendingVideos', {
      type: 'TrendingVideos',
      displayName: 'Trending Content',
      description: 'Currently trending videos across platforms',
      defaultProps: {
        platform: 'youtube',
        category: 'all',
        region: 'global',
        maxVideos: 20
      },
      requiredProps: ['platform'],
      optionalProps: ['category', 'region', 'maxVideos', 'timeframe'],
      supportedPlatforms: ['youtube', 'vimeo'],
      category: 'media',
      complexity: 'simple',
      examples: [
        {
          name: 'Global Trending',
          description: 'What\'s trending worldwide',
          props: { platform: 'youtube', category: 'all', region: 'global' },
          useCase: 'User wants to see popular content'
        }
      ]
    })

    // Watch Later Component
    this.templates.set('WatchLater', {
      type: 'WatchLater',
      displayName: 'Watch Later Queue',
      description: 'Personal queue of videos to watch later',
      defaultProps: {
        showProgress: true,
        allowReorder: true,
        showEstimatedTime: true
      },
      requiredProps: [],
      optionalProps: ['showProgress', 'allowReorder', 'showEstimatedTime', 'maxItems'],
      category: 'utility',
      complexity: 'medium',
      examples: [
        {
          name: 'Personal Queue',
          description: 'Videos saved for later viewing',
          props: { showProgress: true, allowReorder: true, showEstimatedTime: true },
          useCase: 'User wants to manage their watch queue'
        }
      ]
    })

    // Mini Player Component
    this.templates.set('MiniPlayer', {
      type: 'MiniPlayer',
      displayName: 'Mini Player',
      description: 'Compact video player that stays visible while browsing',
      defaultProps: {
        resizable: true,
        draggable: true,
        showControls: true,
        position: 'bottom-right'
      },
      requiredProps: ['videoId', 'platform'],
      optionalProps: ['resizable', 'draggable', 'showControls', 'position', 'opacity'],
      category: 'media',
      complexity: 'medium',
      examples: [
        {
          name: 'Floating Player',
          description: 'Continue watching while browsing',
          props: { videoId: 'abc123', platform: 'youtube', draggable: true, position: 'bottom-right' },
          useCase: 'User wants to multitask while watching'
        }
      ]
    })

    // Custom Feed Component
    this.templates.set('CustomFeed', {
      type: 'CustomFeed',
      displayName: 'Custom Content Feed',
      description: 'User-defined feed with custom rules and filters',
      defaultProps: {
        rules: [],
        autoRefresh: true,
        showFilters: true,
        maxVideos: 25
      },
      requiredProps: ['rules'],
      optionalProps: ['autoRefresh', 'showFilters', 'maxVideos', 'title', 'description'],
      category: 'personalization',
      complexity: 'complex',
      examples: [
        {
          name: 'Tech & Gaming Feed',
          description: 'Custom feed for tech and gaming content',
          props: { 
            rules: [
              { type: 'category', value: 'technology' },
              { type: 'category', value: 'gaming' }
            ],
            title: 'Tech & Gaming'
          },
          useCase: 'User wants specific content categories'
        }
      ]
    })
  }

  getAllTemplates(): ComponentTemplate[] {
    return Array.from(this.templates.values())
  }

  getTemplate(type: DynamicComponentType): ComponentTemplate | undefined {
    return this.templates.get(type)
  }

  getTemplatesByCategory(category: ComponentCategory): ComponentTemplate[] {
    return Array.from(this.templates.values())
      .filter(template => template.category === category)
  }

  getTemplatesByComplexity(complexity: 'simple' | 'medium' | 'complex'): ComponentTemplate[] {
    return Array.from(this.templates.values())
      .filter(template => template.complexity === complexity)
  }

  getTemplatesByPlatform(platform: Platform): ComponentTemplate[] {
    return Array.from(this.templates.values())
      .filter(template => 
        !template.supportedPlatforms || 
        template.supportedPlatforms.includes(platform)
      )
  }

  validateComponentProps(type: DynamicComponentType, props: any): { valid: boolean; errors: string[] } {
    const template = this.getTemplate(type)
    if (!template) {
      return { valid: false, errors: [`Unknown component type: ${type}`] }
    }

    const errors: string[] = []

    // Check required props
    for (const requiredProp of template.requiredProps) {
      if (!(requiredProp in props)) {
        errors.push(`Missing required property: ${requiredProp}`)
      }
    }

    // Validate platform support
    if (props.platform && template.supportedPlatforms) {
      if (!template.supportedPlatforms.includes(props.platform)) {
        errors.push(`Platform ${props.platform} not supported by ${type}`)
      }
    }

    return { valid: errors.length === 0, errors }
  }

  getRecommendedComponents(userIntent: string, context: any): ComponentTemplate[] {
    const intent = userIntent.toLowerCase()
    const recommended: ComponentTemplate[] = []

    // Intent-based recommendations
    if (intent.includes('search')) {
      recommended.push(this.getTemplate('SearchBar')!)
    }
    
    if (intent.includes('playlist') || intent.includes('queue')) {
      recommended.push(this.getTemplate('PlaylistPanel')!)
      recommended.push(this.getTemplate('WatchLater')!)
    }
    
    if (intent.includes('voice') || intent.includes('hands-free')) {
      recommended.push(this.getTemplate('VoiceControl')!)
      recommended.push(this.getTemplate('AIAssistant')!)
    }
    
    if (intent.includes('trending') || intent.includes('popular')) {
      recommended.push(this.getTemplate('TrendingVideos')!)
    }
    
    if (intent.includes('recommend') || intent.includes('discover')) {
      recommended.push(this.getTemplate('Recommendations')!)
      recommended.push(this.getTemplate('CustomFeed')!)
    }
    
    if (intent.includes('channel') || intent.includes('subscription')) {
      recommended.push(this.getTemplate('ChannelList')!)
    }
    
    if (intent.includes('comment') || intent.includes('discussion')) {
      recommended.push(this.getTemplate('Comments')!)
    }

    // Default recommendations if no specific intent detected
    if (recommended.length === 0) {
      recommended.push(
        this.getTemplate('VideoFeed')!,
        this.getTemplate('SearchBar')!,
        this.getTemplate('Recommendations')!
      )
    }

    return recommended
  }
}