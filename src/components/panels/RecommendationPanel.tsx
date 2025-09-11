'use client'

import React, { useState, useEffect } from 'react'
import { BasePanel } from './BasePanel'
import { PanelProps, RecommendationPanelConfig, Video, AIRecommendation } from '@/types'
import { Button } from '@/components/ui/button'
import { Sparkles, TrendingUp, Users, Brain, RefreshCw, Play, Clock, Eye, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDuration, formatViewCount, formatRelativeTime } from '@/utils'

export const RecommendationPanel: React.FC<PanelProps> = (props) => {
  const { panel } = props
  const config = panel.config as RecommendationPanelConfig
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([])
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(false)

  // Mock recommendation data
  const generateMockRecommendations = (): { recommendations: AIRecommendation[], videos: Video[] } => {
    const mockVideos: Video[] = [
      {
        id: 'rec1',
        title: 'Advanced React Hooks Patterns You Should Know',
        description: 'Explore advanced React hooks patterns for better code organization',
        thumbnailUrl: '/api/placeholder/280/157',
        duration: 1920, // 32 minutes
        viewCount: 380000,
        publishedAt: '2025-01-08T14:20:00Z',
        platform: 'youtube',
        channelId: 'channel8',
        channelName: 'React Advanced',
        tags: ['react', 'hooks', 'patterns'],
        embedUrl: ''
      },
      {
        id: 'rec2',
        title: 'Building Scalable Node.js Applications',
        description: 'Learn how to build and scale Node.js applications effectively',
        thumbnailUrl: '/api/placeholder/280/157',
        duration: 2640, // 44 minutes
        viewCount: 290000,
        publishedAt: '2025-01-07T11:45:00Z',
        platform: 'vimeo',
        channelId: 'channel9',
        channelName: 'Node.js Pro',
        tags: ['nodejs', 'scalability', 'backend'],
        embedUrl: ''
      },
      {
        id: 'rec3',
        title: 'Modern CSS Animation Techniques',
        description: 'Create stunning animations with modern CSS techniques',
        thumbnailUrl: '/api/placeholder/280/157',
        duration: 1560, // 26 minutes
        viewCount: 165000,
        publishedAt: '2025-01-06T09:30:00Z',
        platform: 'nebula',
        channelId: 'channel10',
        channelName: 'CSS Animations',
        tags: ['css', 'animations', 'design'],
        embedUrl: ''
      }
    ]

    const mockRecommendations: AIRecommendation[] = mockVideos.map((video, index) => ({
      id: `rec-${video.id}`,
      videoId: video.id,
      score: 0.9 - (index * 0.1),
      reason: getReasonForCategory(config.category),
      category: config.category,
      platform: video.platform,
      generatedAt: new Date().toISOString()
    }))

    return { recommendations: mockRecommendations, videos: mockVideos }
  }

  const getReasonForCategory = (category: string): string => {
    switch (category) {
      case 'similar-content':
        return 'Based on your viewing history'
      case 'trending':
        return 'Currently trending in your region'
      case 'personalized':
        return 'Personalized for your interests'
      case 'cross-platform':
        return 'Popular across multiple platforms'
      case 'ai-curated':
        return 'AI-selected based on engagement patterns'
      default:
        return 'Recommended for you'
    }
  }

  const loadRecommendations = async () => {
    setLoading(true)
    try {
      // Simulate AI recommendation API call
      await new Promise(resolve => setTimeout(resolve, 1200))
      
      const { recommendations: newRecs, videos: newVideos } = generateMockRecommendations()
      setRecommendations(newRecs)
      setVideos(newVideos)
    } catch (error) {
      console.error('Error loading recommendations:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRecommendations()
  }, [config.category])

  const handleVideoClick = (video: Video) => {
    // TODO: Open video in player panel
    console.log('Play recommended video:', video.id)
  }

  const getCategoryIcon = () => {
    switch (config.category) {
      case 'trending':
        return <TrendingUp className="h-4 w-4 text-orange-500" />
      case 'personalized':
        return <Users className="h-4 w-4 text-blue-500" />
      case 'ai-curated':
        return <Brain className="h-4 w-4 text-purple-500" />
      default:
        return <Sparkles className="h-4 w-4 text-yellow-500" />
    }
  }

  const getCategoryTitle = () => {
    switch (config.category) {
      case 'similar-content':
        return 'Similar Content'
      case 'trending':
        return 'Trending Now'
      case 'personalized':
        return 'For You'
      case 'cross-platform':
        return 'Cross-Platform'
      case 'ai-curated':
        return 'AI Curated'
      default:
        return 'Recommendations'
    }
  }

  const renderRecommendationCard = (recommendation: AIRecommendation, video: Video) => (
    <div
      key={recommendation.id}
      className="group cursor-pointer rounded-lg p-3 hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
      onClick={() => handleVideoClick(video)}
    >
      <div className="flex gap-3">
        {/* Thumbnail with Score */}
        <div className="relative w-24 h-14 bg-muted rounded overflow-hidden flex-shrink-0">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <Play className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="absolute top-1 left-1 bg-black/80 text-white text-[10px] px-1 py-0.5 rounded flex items-center gap-0.5">
            <Star className="h-2 w-2 fill-current" />
            {Math.round(recommendation.score * 100)}
          </div>
          <div className="absolute bottom-0.5 right-0.5 bg-black/80 text-white text-[10px] px-1 py-0.5 rounded">
            {formatDuration(video.duration)}
          </div>
        </div>
        
        {/* Video Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm line-clamp-2 mb-1">
            {video.title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <div className={cn(
              'w-2 h-2 rounded-full',
              video.platform === 'youtube' && 'bg-red-500',
              video.platform === 'vimeo' && 'bg-blue-500',
              video.platform === 'nebula' && 'bg-purple-500'
            )} />
            <span className="truncate">{video.channelName}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-1">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {formatViewCount(video.viewCount)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatRelativeTime(video.publishedAt)}
            </div>
          </div>
          {/* AI Reason */}
          <div className="text-xs text-primary/80 italic">
            {recommendation.reason}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <BasePanel {...props}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {getCategoryIcon()}
            <span className="text-sm font-medium">
              {getCategoryTitle()}
            </span>
            {config.aiEnabled && (
              <div className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                AI
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={loadRecommendations}
            disabled={loading}
            className="h-7"
          >
            <RefreshCw className={cn('h-3 w-3', loading && 'animate-spin')} />
          </Button>
        </div>

        {/* Recommendations */}
        <div className="flex-1 overflow-auto">
          {loading && recommendations.length === 0 && (
            <div className="flex items-center justify-center h-32">
              <div className="text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">
                  {config.aiEnabled ? 'AI is analyzing your preferences...' : 'Loading recommendations...'}
                </p>
              </div>
            </div>
          )}

          {recommendations.length > 0 && videos.length > 0 && (
            <div className="space-y-2">
              {recommendations
                .slice(0, config.maxRecommendations || 8)
                .map((rec) => {
                  const video = videos.find(v => v.id === rec.videoId)
                  return video ? renderRecommendationCard(rec, video) : null
                })}
            </div>
          )}

          {!loading && recommendations.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {getCategoryIcon()}
              <div className="mt-2">
                <p className="text-sm">No recommendations available</p>
                <p className="text-xs mt-1">Try refreshing or check back later</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </BasePanel>
  )
}

export default RecommendationPanel