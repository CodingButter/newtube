'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PanelType } from '@/types'
import { useLayoutStore } from '@/stores/layoutStore'
import {
  Plus,
  Video,
  Play,
  Search,
  List,
  Sparkles,
  Clock,
  Users,
  TrendingUp,
  Brain,
  ChevronDown
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface PanelOption {
  type: PanelType
  label: string
  description: string
  icon: React.ReactNode
  category: 'content' | 'tools' | 'ai'
}

const panelOptions: PanelOption[] = [
  // Content Panels
  {
    type: 'video-feed',
    label: 'Video Feed',
    description: 'Browse videos from YouTube, Vimeo, or Nebula',
    icon: <Video className="h-4 w-4" />,
    category: 'content'
  },
  {
    type: 'video-player',
    label: 'Video Player',
    description: 'Embedded video player',
    icon: <Play className="h-4 w-4" />,
    category: 'content'
  },
  {
    type: 'trending',
    label: 'Trending',
    description: 'Popular videos right now',
    icon: <TrendingUp className="h-4 w-4" />,
    category: 'content'
  },
  
  // Tools
  {
    type: 'search',
    label: 'Search',
    description: 'Search across multiple platforms',
    icon: <Search className="h-4 w-4" />,
    category: 'tools'
  },
  {
    type: 'watch-later',
    label: 'Watch Later',
    description: 'Your saved videos',
    icon: <Clock className="h-4 w-4" />,
    category: 'tools'
  },
  {
    type: 'subscriptions',
    label: 'Subscriptions',
    description: 'Latest from your subscriptions',
    icon: <Users className="h-4 w-4" />,
    category: 'tools'
  },
  {
    type: 'list',
    label: 'Playlist',
    description: 'Custom playlists and collections',
    icon: <List className="h-4 w-4" />,
    category: 'tools'
  },
  
  // AI-Powered
  {
    type: 'recommendations',
    label: 'Recommendations',
    description: 'Personalized video suggestions',
    icon: <Sparkles className="h-4 w-4" />,
    category: 'ai'
  },
  {
    type: 'ai-curated',
    label: 'AI Curated',
    description: 'AI-selected content collections',
    icon: <Brain className="h-4 w-4" />,
    category: 'ai'
  }
]

export const PanelToolbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { addPanel, currentLayout } = useLayoutStore()

  const handleAddPanel = (type: PanelType) => {
    // Add default config based on panel type
    const defaultConfigs: Record<PanelType, any> = {
      'video-feed': { platform: 'youtube', maxVideos: 10 },
      'video-player': { videoId: '', platform: 'youtube', autoplay: false },
      'search': { platforms: ['youtube', 'vimeo', 'nebula'], resultsLimit: 20 },
      'list': { listType: 'playlist' },
      'watch-later': { listType: 'watch-later' },
      'subscriptions': { listType: 'subscriptions' },
      'recommendations': { category: 'personalized', maxRecommendations: 8, aiEnabled: true },
      'trending': { category: 'trending', maxRecommendations: 8 },
      'ai-curated': { category: 'ai-curated', maxRecommendations: 8, aiEnabled: true },
      'custom': {}
    }

    addPanel(type, defaultConfigs[type] || {})
    setIsOpen(false)
  }

  const groupedOptions = panelOptions.reduce((acc, option) => {
    if (!acc[option.category]) {
      acc[option.category] = []
    }
    acc[option.category].push(option)
    return acc
  }, {} as Record<string, PanelOption[]>)

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'content': return 'Content'
      case 'tools': return 'Tools'
      case 'ai': return 'AI-Powered'
      default: return category
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'content': return <Video className="h-4 w-4" />
      case 'tools': return <Search className="h-4 w-4" />
      case 'ai': return <Brain className="h-4 w-4" />
      default: return null
    }
  }

  if (!currentLayout) {
    return null
  }

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
        size="sm"
      >
        <Plus className="h-4 w-4" />
        Add Panel
        <ChevronDown className={cn(
          'h-3 w-3 transition-transform',
          isOpen && 'rotate-180'
        )} />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel Options Menu */}
          <div className="absolute top-full left-0 mt-2 w-80 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden">
            <div className="p-3 border-b border-border">
              <h3 className="font-medium text-sm">Add New Panel</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Choose a panel type to add to your layout
              </p>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {Object.entries(groupedOptions).map(([category, options]) => (
                <div key={category} className="p-2">
                  <div className="flex items-center gap-2 px-2 py-1 mb-1">
                    {getCategoryIcon(category)}
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {getCategoryTitle(category)}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    {options.map((option) => (
                      <button
                        key={option.type}
                        onClick={() => handleAddPanel(option.type)}
                        className="w-full text-left p-3 rounded-md hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 p-1.5 rounded-md bg-muted group-hover:bg-muted/80">
                            {option.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm mb-1">
                              {option.label}
                            </div>
                            <div className="text-xs text-muted-foreground line-clamp-2">
                              {option.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-3 border-t border-border bg-muted/20">
              <p className="text-xs text-muted-foreground">
                💡 Pro tip: You can drag panels to reorder them after adding
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PanelToolbar