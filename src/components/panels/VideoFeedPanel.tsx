'use client'

import React, { useState, useEffect } from 'react'
import { BasePanel } from './BasePanel'
import { PanelProps, VideoFeedPanelConfig, Video, Platform } from '@/types'
import { Button } from '@/components/ui/button'
import { RefreshCw, Play, Clock, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDuration, formatViewCount, formatRelativeTime } from '@/utils'

export const VideoFeedPanel: React.FC<PanelProps> = (props) => {
  const { panel } = props
  const config = panel.config as VideoFeedPanelConfig
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Mock data for development
  const mockVideos: Video[] = [
    {
      id: '1',
      title: 'Introduction to React Server Components',
      description: 'Learn about the latest React Server Components',
      thumbnailUrl: '/api/placeholder/280/157',
      duration: 1245, // 20:45
      viewCount: 125000,
      publishedAt: '2025-01-09T10:00:00Z',
      platform: config.platform,
      channelId: 'channel1',
      channelName: 'React Tutorials',
      tags: ['react', 'tutorial', 'web development'],
      embedUrl: ''
    },
    {
      id: '2',
      title: 'Advanced TypeScript Patterns',
      description: 'Deep dive into advanced TypeScript patterns and practices',
      thumbnailUrl: '/api/placeholder/280/157',
      duration: 2160, // 36:00
      viewCount: 89000,
      publishedAt: '2025-01-08T15:30:00Z',
      platform: config.platform,
      channelId: 'channel2',
      channelName: 'TypeScript Deep Dive',
      tags: ['typescript', 'patterns', 'programming'],
      embedUrl: ''
    }
  ]

  const fetchVideos = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setVideos(mockVideos)
    } catch (err) {
      setError('Failed to load videos')
      console.error('Error fetching videos:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [config.platform, config.category])

  const handleVideoClick = (video: Video) => {
    // TODO: Open video in player panel or navigate to watch page
    console.log('Play video:', video.id)
  }

  const renderVideoCard = (video: Video) => (
    <div
      key={video.id}
      className="group cursor-pointer rounded-lg overflow-hidden hover:bg-muted/50 transition-colors"
      onClick={() => handleVideoClick(video)}
    >
      <div className="relative aspect-video bg-muted">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <Play className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
          {formatDuration(video.duration)}
        </div>
      </div>
      
      <div className="p-3">
        <h4 className="font-medium text-sm line-clamp-2 mb-1">
          {video.title}
        </h4>
        <p className="text-xs text-muted-foreground mb-2">
          {video.channelName}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {formatViewCount(video.viewCount)}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatRelativeTime(video.publishedAt)}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <BasePanel {...props}>
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={cn(
              'w-3 h-3 rounded-full',
              config.platform === 'youtube' && 'bg-red-500',
              config.platform === 'vimeo' && 'bg-blue-500',
              config.platform === 'nebula' && 'bg-purple-500'
            )} />
            <span className="text-sm font-medium capitalize">
              {config.platform} {config.category || 'Feed'}
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchVideos}
            disabled={loading}
            className="h-7"
          >
            <RefreshCw className={cn('h-3 w-3', loading && 'animate-spin')} />
          </Button>
        </div>

        <div className="flex-1 overflow-auto">
          {loading && videos.length === 0 && (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-sm text-destructive mb-2">{error}</p>
              <Button variant="outline" size="sm" onClick={fetchVideos}>
                Try Again
              </Button>
            </div>
          )}

          {videos.length > 0 && (
            <div className="space-y-3">
              {videos.slice(0, config.maxVideos || 10).map(renderVideoCard)}
            </div>
          )}

          {!loading && !error && videos.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">No videos found</p>
            </div>
          )}
        </div>
      </div>
    </BasePanel>
  )
}

export default VideoFeedPanel