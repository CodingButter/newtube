'use client'

import React, { useState, useEffect } from 'react'
import { BasePanel } from './BasePanel'
import { PanelProps, ListPanelConfig, Video } from '@/types'
import { Button } from '@/components/ui/button'
import { Play, Clock, Eye, Heart, BookmarkPlus, History, List, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDuration, formatViewCount, formatRelativeTime } from '@/utils'

export const ListPanel: React.FC<PanelProps> = (props) => {
  const { panel } = props
  const config = panel.config as ListPanelConfig
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(false)

  // Mock data based on list type
  const generateMockData = (): Video[] => {
    const baseVideos = [
      {
        id: 'list1',
        title: 'Next.js 14 Complete Guide',
        description: 'Everything you need to know about Next.js 14',
        thumbnailUrl: '/api/placeholder/280/157',
        duration: 3600, // 1 hour
        viewCount: 450000,
        publishedAt: '2025-01-07T12:00:00Z',
        platform: 'youtube' as const,
        channelId: 'channel5',
        channelName: 'Web Dev Mastery',
        tags: ['nextjs', 'react', 'tutorial'],
        embedUrl: ''
      },
      {
        id: 'list2',
        title: 'Understanding Docker Containers',
        description: 'Learn Docker from basics to advanced concepts',
        thumbnailUrl: '/api/placeholder/280/157',
        duration: 2400, // 40 minutes
        viewCount: 320000,
        publishedAt: '2025-01-06T16:30:00Z',
        platform: 'vimeo' as const,
        channelId: 'channel6',
        channelName: 'DevOps Academy',
        tags: ['docker', 'containers', 'devops'],
        embedUrl: ''
      },
      {
        id: 'list3',
        title: 'TypeScript Advanced Patterns',
        description: 'Deep dive into TypeScript advanced features',
        thumbnailUrl: '/api/placeholder/280/157',
        duration: 1800, // 30 minutes
        viewCount: 180000,
        publishedAt: '2025-01-04T10:15:00Z',
        platform: 'nebula' as const,
        channelId: 'channel7',
        channelName: 'TS Expert',
        tags: ['typescript', 'programming'],
        embedUrl: ''
      }
    ]

    // Filter or modify based on list type
    switch (config.listType) {
      case 'favorites':
        return baseVideos.slice(0, 2) // Fewer favorites
      case 'watch-later':
        return baseVideos
      case 'history':
        return [...baseVideos].reverse() // Most recent first
      default:
        return baseVideos
    }
  }

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        setVideos(generateMockData())
      } catch (error) {
        console.error('Error loading videos:', error)
      } finally {
        setLoading(false)
      }
    }

    loadVideos()
  }, [config.listType])

  const handleVideoClick = (video: Video) => {
    // TODO: Open video in player panel
    console.log('Play video from list:', video.id)
  }

  const handleRemoveFromList = (videoId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    setVideos(prev => prev.filter(video => video.id !== videoId))
  }

  const getListIcon = () => {
    switch (config.listType) {
      case 'favorites':
        return <Heart className="h-4 w-4 text-red-500" />
      case 'watch-later':
        return <BookmarkPlus className="h-4 w-4 text-blue-500" />
      case 'history':
        return <History className="h-4 w-4 text-green-500" />
      case 'playlist':
        return <List className="h-4 w-4 text-purple-500" />
      default:
        return <List className="h-4 w-4" />
    }
  }

  const getListTitle = () => {
    switch (config.listType) {
      case 'favorites':
        return 'Favorites'
      case 'watch-later':
        return 'Watch Later'
      case 'history':
        return 'Watch History'
      case 'playlist':
        return 'Playlist'
      default:
        return 'Videos'
    }
  }

  const renderVideoItem = (video: Video, index: number) => (
    <div
      key={video.id}
      className="group cursor-pointer rounded-lg p-3 hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
      onClick={() => handleVideoClick(video)}
    >
      <div className="flex gap-3">
        {/* Index Number */}
        <div className="flex-shrink-0 w-6 flex items-start justify-center pt-1">
          <span className="text-xs text-muted-foreground font-mono">
            {index + 1}
          </span>
        </div>

        {/* Thumbnail */}
        <div className="relative w-20 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <Play className="h-3 w-3 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="absolute bottom-0.5 right-0.5 bg-black/80 text-white text-[10px] px-1 rounded">
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
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
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

        {/* Remove Button */}
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => handleRemoveFromList(video.id, e)}
            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
            aria-label={`Remove from ${config.listType}`}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <BasePanel {...props}>
      <div className="h-full flex flex-col">
        {/* List Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {getListIcon()}
            <span className="text-sm font-medium">
              {getListTitle()} ({videos.length})
            </span>
          </div>
        </div>

        {/* Video List */}
        <div className="flex-1 overflow-auto">
          {loading && (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
            </div>
          )}

          {!loading && videos.length > 0 && (
            <div className="space-y-1">
              {videos.map((video, index) => renderVideoItem(video, index))}
            </div>
          )}

          {!loading && videos.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {getListIcon()}
              <div className="mt-2">
                <p className="text-sm">Your {getListTitle().toLowerCase()} is empty</p>
                <p className="text-xs mt-1">
                  {config.listType === 'favorites' && 'Heart videos to add them to favorites'}
                  {config.listType === 'watch-later' && 'Save videos to watch later'}
                  {config.listType === 'history' && 'Videos you watch will appear here'}
                  {config.listType === 'playlist' && 'Add videos to this playlist'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </BasePanel>
  )
}

export default ListPanel