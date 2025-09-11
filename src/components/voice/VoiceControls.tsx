'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Pause, Square, Volume2, VolumeX, Mic, MicOff } from 'lucide-react'
import { useVoiceStore } from '@/stores/voiceStore'

interface VoiceControlsProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showVolumeIndicator?: boolean
  showStatus?: boolean
  variant?: 'compact' | 'full'
}

/**
 * VoiceControls - Reusable voice control component for play/pause/stop/mute actions
 * Used across different voice-enabled interfaces
 */
export function VoiceControls({ 
  className = '', 
  size = 'md',
  showVolumeIndicator = true,
  showStatus = true,
  variant = 'full'
}: VoiceControlsProps) {
  const { 
    isPlaying, 
    isLoading,
    volume,
    currentAudio,
    stopPlayback,
    setVolume
  } = useVoiceStore()

  const handlePlayPause = () => {
    if (currentAudio) {
      if (isPlaying) {
        currentAudio.pause()
      } else {
        currentAudio.play()
      }
    }
  }

  const handleStop = () => {
    stopPlayback()
  }

  const handleMuteToggle = () => {
    setVolume(volume === 0 ? 0.8 : 0)
  }

  const buttonSizeClass = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8', 
    lg: 'h-10 w-10'
  }[size]

  const iconSizeClass = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }[size]

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        {/* Play/Pause */}
        {currentAudio && (
          <Button
            onClick={handlePlayPause}
            size="sm"
            variant="ghost"
            className={buttonSizeClass}
            disabled={isLoading}
          >
            {isPlaying ? (
              <Pause className={iconSizeClass} />
            ) : (
              <Play className={iconSizeClass} />
            )}
          </Button>
        )}

        {/* Stop */}
        {isPlaying && (
          <Button
            onClick={handleStop}
            size="sm"
            variant="ghost"
            className={buttonSizeClass}
          >
            <Square className={iconSizeClass} />
          </Button>
        )}

        {/* Mute */}
        <Button
          onClick={handleMuteToggle}
          size="sm"
          variant="ghost"
          className={buttonSizeClass}
          disabled={isLoading}
        >
          {volume === 0 ? (
            <VolumeX className={iconSizeClass} />
          ) : (
            <Volume2 className={iconSizeClass} />
          )}
        </Button>

        {/* Volume Indicator */}
        {showVolumeIndicator && volume > 0 && (
          <Badge variant="outline" className="text-xs px-1">
            {Math.round(volume * 100)}%
          </Badge>
        )}
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Status Indicator */}
      {showStatus && (
        <div className="flex items-center gap-2">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              <span className="text-sm text-muted-foreground">Loading...</span>
            </div>
          ) : isPlaying ? (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-muted-foreground">Playing</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-400" />
              <span className="text-sm text-muted-foreground">Ready</span>
            </div>
          )}
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex items-center gap-1">
        {/* Play/Pause */}
        {currentAudio && (
          <Button
            onClick={handlePlayPause}
            size="sm"
            variant="outline"
            className={buttonSizeClass}
            disabled={isLoading}
          >
            {isPlaying ? (
              <Pause className={iconSizeClass} />
            ) : (
              <Play className={iconSizeClass} />
            )}
          </Button>
        )}

        {/* Stop */}
        {isPlaying && (
          <Button
            onClick={handleStop}
            size="sm"
            variant="outline"
            className={buttonSizeClass}
          >
            <Square className={iconSizeClass} />
          </Button>
        )}

        {/* Mute Toggle */}
        <Button
          onClick={handleMuteToggle}
          size="sm"
          variant="outline"
          className={buttonSizeClass}
          disabled={isLoading}
        >
          {volume === 0 ? (
            <VolumeX className={iconSizeClass} />
          ) : (
            <Volume2 className={iconSizeClass} />
          )}
        </Button>
      </div>

      {/* Volume Indicator */}
      {showVolumeIndicator && (
        <Badge variant="outline" className="text-sm">
          <Volume2 className="w-3 h-3 mr-1" />
          {Math.round(volume * 100)}%
        </Badge>
      )}
    </div>
  )
}

/**
 * SpeakingIndicator - Simple component to show when AI is speaking
 */
export function SpeakingIndicator({ className = '' }: { className?: string }) {
  const { isPlaying, isLoading } = useVoiceStore()

  if (!isPlaying && !isLoading) return null

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Mic className="w-4 h-4 text-primary animate-pulse" />
      <span className="text-sm text-primary font-medium">
        {isLoading ? 'Preparing voice...' : 'AI is speaking...'}
      </span>
    </div>
  )
}