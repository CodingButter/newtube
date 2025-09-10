'use client'

import React, { useState, useEffect } from 'react'
import { BasePanel } from './BasePanel'
import { PanelProps, SearchPanelConfig, Video, Platform } from '@/types'
import { Button } from '@/components/ui/button'
import { Search, Filter, X, Play, Clock, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDuration, formatViewCount, formatRelativeTime } from '@/utils'

export const SearchPanel: React.FC<PanelProps> = (props) => {
  const { panel } = props
  const config = panel.config as SearchPanelConfig
  const [query, setQuery] = useState(config.defaultQuery || '')
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(config.platforms || ['youtube', 'vimeo', 'nebula'])
  const [results, setResults] = useState<Video[]>([])
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  // Mock search results
  const mockResults: Video[] = [
    {
      id: 'search1',
      title: 'React Performance Optimization Techniques',
      description: 'Learn how to optimize React applications for better performance',
      thumbnailUrl: '/api/placeholder/280/157',
      duration: 1845,
      viewCount: 245000,
      publishedAt: '2025-01-05T14:20:00Z',
      platform: 'youtube',
      channelId: 'channel3',
      channelName: 'React Performance Pro',
      tags: ['react', 'performance', 'optimization'],
      embedUrl: ''
    },
    {
      id: 'search2',
      title: 'Modern CSS Grid Layouts',
      description: 'Master CSS Grid with practical examples and real-world projects',
      thumbnailUrl: '/api/placeholder/280/157',
      duration: 2280,
      viewCount: 156000,
      publishedAt: '2025-01-03T09:15:00Z',
      platform: 'vimeo',
      channelId: 'channel4',
      channelName: 'CSS Masters',
      tags: ['css', 'grid', 'layout'],
      embedUrl: ''
    }
  ]

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) return
    
    setLoading(true)
    try {
      // Simulate API search across platforms
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Filter results based on selected platforms
      const filteredResults = mockResults.filter(video => 
        selectedPlatforms.includes(video.platform) &&
        (video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
         video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      )
      
      setResults(filteredResults)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    )
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
  }

  const handleVideoClick = (video: Video) => {
    // TODO: Open video in player panel
    console.log('Open video:', video.id)
  }

  const renderVideoResult = (video: Video) => (
    <div
      key={video.id}
      className="group cursor-pointer rounded-lg p-3 hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
      onClick={() => handleVideoClick(video)}
    >
      <div className="flex gap-3">
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
          <div className="absolute bottom-0.5 right-0.5 bg-black/80 text-white text-[10px] px-1 py-0.5 rounded">
            {formatDuration(video.duration)}
          </div>
        </div>
        
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
            <span>{video.channelName}</span>
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
      </div>
    </div>
  )

  return (
    <BasePanel {...props}>
      <div className="h-full flex flex-col">
        {/* Search Input */}
        <div className="relative mb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search videos across platforms..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-10 pr-20 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              {query && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="h-6 w-6 p-0"
              >
                <Filter className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          <Button
            onClick={() => handleSearch()}
            disabled={loading || !query.trim()}
            className="w-full mt-2"
            size="sm"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              'Search'
            )}
          </Button>
        </div>

        {/* Platform Filters */}
        {showFilters && (
          <div className="mb-3 p-3 border border-border rounded-md bg-muted/20">
            <div className="text-xs font-medium mb-2">Platforms</div>
            <div className="flex flex-wrap gap-2">
              {(['youtube', 'vimeo', 'nebula'] as Platform[]).map((platform) => (
                <button
                  key={platform}
                  onClick={() => togglePlatform(platform)}
                  className={cn(
                    'px-2 py-1 rounded text-xs border transition-colors',
                    selectedPlatforms.includes(platform)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background border-border hover:bg-muted'
                  )}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        <div className="flex-1 overflow-auto">
          {loading && (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-1">
              {results.slice(0, config.resultsLimit || 20).map(renderVideoResult)}
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No results found for "{query}"</p>
              <p className="text-xs mt-1">Try different keywords or check other platforms</p>
            </div>
          )}

          {!loading && !query && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Enter a search query to find videos</p>
            </div>
          )}
        </div>
      </div>
    </BasePanel>
  )
}

export default SearchPanel