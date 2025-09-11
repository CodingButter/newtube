'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Play, Volume2, Gauge, Settings, Mic2, Sparkles } from 'lucide-react'
import { useVoiceStore } from '@/stores/voiceStore'

interface VoiceSettingsProps {
  className?: string
  compact?: boolean
}

const testPhrases = [
  "Hello! I'm your AI assistant, ready to help you create the perfect streaming experience.",
  "Welcome to NEWTUBE, where your voice shapes your viewing experience.",
  "Let's build something amazing together using natural conversation.",
  "I can help you discover, organize, and enjoy content from across the web."
]

export function VoiceSettings({ className = '', compact = false }: VoiceSettingsProps) {
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
    fetchAvailableVoices,
    playText,
    stopPlayback
  } = useVoiceStore()

  const [testPhrase, setTestPhrase] = useState('')

  useEffect(() => {
    // Fetch available voices on mount
    fetchAvailableVoices()
    
    // Set a random test phrase
    setTestPhrase(testPhrases[Math.floor(Math.random() * testPhrases.length)])
  }, [fetchAvailableVoices])

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
      await playText(testPhrase)
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

  if (compact) {
    return (
      <Card className={`w-full ${className}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Mic2 className="w-4 h-4 text-primary" />
            <CardTitle className="text-sm">Voice Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Voice Selection */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Voice</label>
            <Select value={selectedVoice.voice_id} onValueChange={handleVoiceChange}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableVoices.map((voice) => (
                  <SelectItem key={voice.voice_id} value={voice.voice_id}>
                    <div className="flex items-center gap-2">
                      <span>{voice.name}</span>
                      {voice.category === 'premade' && (
                        <Badge variant="secondary" className="text-xs">Premium</Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quick Controls */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Speed</label>
              <div className="flex items-center gap-2">
                <Slider
                  value={[speed]}
                  onValueChange={handleSpeedChange}
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  className="flex-1"
                />
                <span className="text-xs w-8 text-right">{speed.toFixed(1)}x</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Volume</label>
              <div className="flex items-center gap-2">
                <Slider
                  value={[volume]}
                  onValueChange={handleVolumeChange}
                  min={0}
                  max={1}
                  step={0.05}
                  className="flex-1"
                />
                <span className="text-xs w-8 text-right">{Math.round(volume * 100)}%</span>
              </div>
            </div>
          </div>

          {/* Test Button */}
          <Button 
            onClick={handleTestVoice}
            disabled={isLoading}
            size="sm"
            className="w-full"
            variant={isPlaying ? "destructive" : "default"}
          >
            <Play className="w-3 h-3 mr-1" />
            {isLoading ? 'Loading...' : isPlaying ? 'Stop' : 'Test Voice'}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`w-full max-w-md ${className}`}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Mic2 className="w-5 h-5 text-primary" />
          <div>
            <CardTitle>Voice Settings</CardTitle>
            <CardDescription>
              Customize your AI assistant's voice and speech patterns
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Voice Selection */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <label className="text-sm font-medium">Voice Selection</label>
          </div>
          <Select value={selectedVoice.voice_id} onValueChange={handleVoiceChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availableVoices.map((voice) => (
                <SelectItem key={voice.voice_id} value={voice.voice_id}>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{voice.name}</span>
                      {voice.description && (
                        <span className="text-xs text-muted-foreground">
                          ({voice.description})
                        </span>
                      )}
                    </div>
                    {voice.category === 'premade' && (
                      <Badge variant="secondary" className="ml-2">Premium</Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Speed Control */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4" />
            <label className="text-sm font-medium">Speed</label>
            <Badge variant="outline" className="ml-auto">{speed.toFixed(1)}x</Badge>
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
            <span>Slow (0.5x)</span>
            <span>Normal (1.0x)</span>
            <span>Fast (2.0x)</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            <label className="text-sm font-medium">Volume</label>
            <Badge variant="outline" className="ml-auto">{Math.round(volume * 100)}%</Badge>
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
            <span>Mute</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* ElevenLabs Voice Settings */}
        <div className="space-y-4 border-t pt-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <label className="text-sm font-medium">ElevenLabs Settings</label>
          </div>

          {/* Stability */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-muted-foreground">Stability</label>
              <Badge variant="outline">{Math.round(voiceSettings.stability * 100)}%</Badge>
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
              <Badge variant="outline">{Math.round(voiceSettings.similarityBoost * 100)}%</Badge>
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
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <label className="text-sm font-medium">Emotional Responses</label>
              <p className="text-xs text-muted-foreground">
                Allow AI to express emotions through voice
              </p>
            </div>
            <Switch
              checked={voiceSettings.useEmotion || false}
              onCheckedChange={handleEmotionToggle}
            />
          </div>
        </div>

        {/* Test Voice */}
        <div className="space-y-3 border-t pt-4">
          <label className="text-sm font-medium">Test Voice</label>
          <p className="text-xs text-muted-foreground mb-2">
            "{testPhrase}"
          </p>
          <Button 
            onClick={handleTestVoice}
            disabled={isLoading}
            className="w-full"
            variant={isPlaying ? "destructive" : "default"}
          >
            <Play className="w-4 h-4 mr-2" />
            {isLoading ? 'Loading...' : isPlaying ? 'Stop Playback' : 'Test Voice'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}