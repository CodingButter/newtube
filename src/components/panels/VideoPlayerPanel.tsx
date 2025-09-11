'use client'

import React, { useState, useEffect } from 'react'
import { BasePanel } from './BasePanel'
import { PanelProps, VideoPlayerPanelConfig, Platform } from '@/types'
import { Button } from '@/components/ui/button'
import { ExternalLink, Volume2, VolumeX, Maximize } from 'lucide-react'
import { cn } from '@/lib/utils'

export const VideoPlayerPanel: React.FC<PanelProps> = (props) => {
  const { panel } = props
  const config = panel.config as VideoPlayerPanelConfig
  const [embedUrl, setEmbedUrl] = useState<string>('')
  const [muted, setMuted] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    // Generate embed URL based on platform and videoId
    const generateEmbedUrl = () => {
      const { platform, videoId, autoplay = false, controls = true } = config
      
      switch (platform) {
        case 'youtube':
          return `https://www.youtube.com/embed/${videoId}?` +
            `autoplay=${autoplay ? 1 : 0}&` +
            `controls=${controls ? 1 : 0}&` +
            `rel=0&modestbranding=1&playsinline=1`
        
        case 'vimeo':
          return `https://player.vimeo.com/video/${videoId}?` +
            `autoplay=${autoplay ? 1 : 0}&` +
            `controls=${controls ? 1 : 0}&` +
            `title=0&byline=0&portrait=0`
        
        case 'nebula':
          // Note: Nebula embed implementation would depend on their API
          return `https://nebula.tv/embed/${videoId}?` +
            `autoplay=${autoplay ? 1 : 0}&` +
            `controls=${controls ? 1 : 0}`
        
        default:
          return ''
      }
    }

    setEmbedUrl(generateEmbedUrl())
  }, [config])

  const handleOpenInNewTab = () => {
    const { platform, videoId } = config
    let url = ''
    
    switch (platform) {
      case 'youtube':
        url = `https://www.youtube.com/watch?v=${videoId}`
        break
      case 'vimeo':
        url = `https://vimeo.com/${videoId}`
        break
      case 'nebula':
        url = `https://nebula.tv/videos/${videoId}`
        break
    }
    
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const handleToggleMute = () => {
    setMuted(!muted)
    // This would need to communicate with the iframe
    // Implementation depends on platform's postMessage API
  }

  const handleFullscreen = () => {
    setFullscreen(!fullscreen)
    // TODO: Implement fullscreen functionality
  }

  const getPlatformColor = (platform: Platform) => {
    switch (platform) {
      case 'youtube':
        return 'text-red-500'
      case 'vimeo':
        return 'text-blue-500'
      case 'nebula':
        return 'text-purple-500'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <BasePanel 
      {...props} 
      className={cn(
        panel.minimized ? '' : 'min-h-[300px]',
        fullscreen && 'fixed inset-4 z-50 min-h-[80vh]'
      )}
    >
      <div className="h-full flex flex-col">
        {/* Player Controls */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={cn('text-sm font-medium capitalize', getPlatformColor(config.platform))}>
              {config.platform} Player
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleMute}
              className="h-7 w-7 p-0"
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              {muted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFullscreen}
              className="h-7 w-7 p-0"
              aria-label="Toggle fullscreen"
            >
              <Maximize className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleOpenInNewTab}
              className="h-7 w-7 p-0"
              aria-label="Open in new tab"
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Video Player */}
        <div className="flex-1 relative bg-black rounded-md overflow-hidden">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title={`${config.platform} video player`}
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              <div className="text-center">
                <div className="text-lg font-medium mb-2">Video Not Available</div>
                <div className="text-sm text-white/70">
                  Unable to load video from {config.platform}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="mt-3 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Video ID: {config.videoId}</span>
            <span className="capitalize">{config.platform}</span>
          </div>
        </div>
      </div>
    </BasePanel>
  )
}

export default VideoPlayerPanel