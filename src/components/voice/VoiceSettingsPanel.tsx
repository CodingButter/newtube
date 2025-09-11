'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
// Separator component not available, using div instead
import { Mic2, Settings, Sparkles, Volume2, Gauge, Play, X } from 'lucide-react'
import { useVoiceStore } from '@/stores/voiceStore'

interface VoiceSettingsPanelProps {
  onClose?: () => void
  className?: string
}

/**
 * VoiceSettingsPanel - A dedicated panel for configuring ElevenLabs TTS settings
 * Designed for use in sidebars, modals, or dedicated settings areas
 */
export function VoiceSettingsPanel({ onClose, className = '' }: VoiceSettingsPanelProps) {
  const {
    selectedVoice,
    availableVoices,
    volume,
    speed,
    voiceSettings,
    isPlaying,
    isLoading,
    setSelectedVoice,
    setVolume,
    setSpeed,
    setVoiceSettings,
    playText,
    stopPlayback
  } = useVoiceStore()

  const testPhrases = [
    "Hello! This is a test of the ElevenLabs voice synthesis with emotional expression.",
    "Welcome to NEWTUBE, where AI helps you discover amazing content.",
    "Your voice settings have been updated successfully."
  ]

  const handleVoiceChange = (voiceId: string) => {
    const voice = availableVoices.find(v => v.voice_id === voiceId)
    if (voice) {
      setSelectedVoice(voice)
    }
  }

  const handleTestVoice = async () => {
    if (isPlaying) {
      stopPlayback()
    } else {
      const randomPhrase = testPhrases[Math.floor(Math.random() * testPhrases.length)]
      await playText(randomPhrase)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
  }

  const handleSpeedChange = (value: number[]) => {
    setSpeed(value[0])
  }

  const handleStabilityChange = (value: number[]) => {
    setVoiceSettings({ stability: value[0] })
  }

  const handleSimilarityChange = (value: number[]) => {
    setVoiceSettings({ similarityBoost: value[0] })
  }

  const handleEmotionToggle = (checked: boolean) => {
    setVoiceSettings({ useEmotion: checked })
  }

  const femaleVoices = availableVoices.filter(voice => 
    ['Rachel', 'Bella', 'Elli', 'Charlotte'].includes(voice.name)
  )

  return (
    <Card className={`w-full max-w-sm ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic2 className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Voice Settings</CardTitle>
          </div>
          {onClose && (
            <Button 
              onClick={onClose} 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Voice Selection */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <label className="text-sm font-medium">Voice</label>
          </div>
          <Select value={selectedVoice.voice_id} onValueChange={handleVoiceChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {/* Show female voices first (project requirement) */}
              {femaleVoices.length > 0 && (
                <>
                  <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                    Recommended Female Voices
                  </div>
                  {femaleVoices.map((voice) => (
                    <SelectItem key={voice.voice_id} value={voice.voice_id}>
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium">{voice.name}</span>
                        {voice.category === 'premade' && (
                          <Badge variant="secondary" className="ml-2 text-xs">Premium</Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                  <div className="border-t border-border my-1" />
                </>
              )}
              
              {/* Other voices */}
              {availableVoices.filter(voice => 
                !['Rachel', 'Bella', 'Elli', 'Charlotte'].includes(voice.name)
              ).map((voice) => (
                <SelectItem key={voice.voice_id} value={voice.voice_id}>
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">{voice.name}</span>
                    {voice.category === 'premade' && (
                      <Badge variant="secondary" className="ml-2 text-xs">Premium</Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Basic Controls */}
        <div className="space-y-4">
          {/* Speed Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4" />
                <label className="text-sm font-medium">Speed</label>
              </div>
              <Badge variant="outline" className="text-xs">{speed.toFixed(1)}x</Badge>
            </div>
            <Slider
              value={[speed]}
              onValueChange={handleSpeedChange}
              min={0.5}
              max={2.0}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0.5x</span>
              <span>1.0x</span>
              <span>2.0x</span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                <label className="text-sm font-medium">Volume</label>
              </div>
              <Badge variant="outline" className="text-xs">{Math.round(volume * 100)}%</Badge>
            </div>
            <Slider
              value={[volume]}
              onValueChange={handleVolumeChange}
              min={0}
              max={1}
              step={0.05}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border" />

        {/* ElevenLabs Advanced Settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <label className="text-sm font-medium">ElevenLabs Settings</label>
          </div>

          {/* Stability */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-muted-foreground">Stability</label>
              <Badge variant="outline" className="text-xs">
                {Math.round(voiceSettings.stability * 100)}%
              </Badge>
            </div>
            <Slider
              value={[voiceSettings.stability]}
              onValueChange={handleStabilityChange}
              min={0}
              max={1}
              step={0.05}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Higher values make speech more consistent but less expressive
            </p>
          </div>

          {/* Similarity Boost */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-muted-foreground">Similarity Boost</label>
              <Badge variant="outline" className="text-xs">
                {Math.round(voiceSettings.similarityBoost * 100)}%
              </Badge>
            </div>
            <Slider
              value={[voiceSettings.similarityBoost]}
              onValueChange={handleSimilarityChange}
              min={0}
              max={1}
              step={0.05}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Enhances voice similarity to the original speaker
            </p>
          </div>

          {/* Emotional Responses */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="space-y-1">
              <label className="text-sm font-medium">Emotional Responses</label>
              <p className="text-xs text-muted-foreground">
                Allow AI to express emotions through voice modulation
              </p>
            </div>
            <Switch
              checked={voiceSettings.useEmotion || false}
              onCheckedChange={handleEmotionToggle}
            />
          </div>
        </div>

        <div className="border-t border-border" />

        {/* Test Voice */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Test Voice</label>
          <Button 
            onClick={handleTestVoice}
            disabled={isLoading}
            className="w-full"
            variant={isPlaying ? "destructive" : "default"}
          >
            <Play className="w-4 h-4 mr-2" />
            {isLoading ? 'Loading...' : isPlaying ? 'Stop Test' : 'Test Voice'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}