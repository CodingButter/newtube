'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Pause, Play, Volume2, VolumeX, Mic, MicOff } from 'lucide-react'
import { useVoiceStore } from '@/stores/voiceStore'

interface AudioVisualizerProps {
  className?: string
  showControls?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'bars' | 'wave' | 'circle'
}

export function AudioVisualizer({ 
  className = '', 
  showControls = true, 
  size = 'md',
  variant = 'bars' 
}: AudioVisualizerProps) {
  const { isPlaying, isLoading, volume, currentAudio, stopPlayback, setVolume } = useVoiceStore()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const audioContextRef = useRef<AudioContext>()
  const analyserRef = useRef<AnalyserNode>()
  const dataArrayRef = useRef<Uint8Array>()
  const sourceRef = useRef<MediaElementAudioSourceNode>()
  const [isMuted, setIsMuted] = useState(false)
  const [previousVolume, setPreviousVolume] = useState(volume)

  // Size configurations
  const sizeConfig = {
    sm: { width: 120, height: 40, bars: 16 },
    md: { width: 200, height: 60, bars: 24 },
    lg: { width: 300, height: 80, bars: 32 }
  }

  const config = sizeConfig[size]

  // Initialize audio visualization when audio is playing
  useEffect(() => {
    if (isPlaying && currentAudio && canvasRef.current) {
      initializeAudioVisualization()
    } else {
      stopVisualization()
    }

    return () => stopVisualization()
  }, [isPlaying, currentAudio])

  const initializeAudioVisualization = async () => {
    if (!currentAudio || !canvasRef.current) return

    try {
      // Create audio context if it doesn't exist
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }

      // Resume audio context if suspended
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume()
      }

      // Create analyser if it doesn't exist
      if (!analyserRef.current) {
        analyserRef.current = audioContextRef.current.createAnalyser()
        analyserRef.current.fftSize = 256
        dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount)
      }

      // Create source and connect to analyser
      if (!sourceRef.current) {
        sourceRef.current = audioContextRef.current.createMediaElementSource(currentAudio)
        sourceRef.current.connect(analyserRef.current)
        analyserRef.current.connect(audioContextRef.current.destination)
      }

      startVisualization()
    } catch (error) {
      console.warn('Audio visualization not available:', error)
      // Fallback to simple animation
      startFallbackAnimation()
    }
  }

  const startVisualization = () => {
    if (!analyserRef.current || !dataArrayRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      if (!analyserRef.current || !dataArrayRef.current) return

      analyserRef.current.getByteFrequencyData(dataArrayRef.current)

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      if (variant === 'bars') {
        drawBars(ctx, canvas, dataArrayRef.current)
      } else if (variant === 'wave') {
        drawWaveform(ctx, canvas, dataArrayRef.current)
      } else if (variant === 'circle') {
        drawCircle(ctx, canvas, dataArrayRef.current)
      }

      if (isPlaying) {
        animationRef.current = requestAnimationFrame(draw)
      }
    }

    draw()
  }

  const startFallbackAnimation = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let phase = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Generate fake frequency data for animation
      const fakeData = new Uint8Array(config.bars)
      for (let i = 0; i < config.bars; i++) {
        fakeData[i] = Math.random() * 128 + 64 + Math.sin(phase + i * 0.5) * 32
      }

      if (variant === 'bars') {
        drawBars(ctx, canvas, fakeData)
      } else if (variant === 'wave') {
        drawWaveform(ctx, canvas, fakeData)
      } else if (variant === 'circle') {
        drawCircle(ctx, canvas, fakeData)
      }

      phase += 0.1

      if (isPlaying) {
        animationRef.current = requestAnimationFrame(draw)
      }
    }

    draw()
  }

  const drawBars = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, dataArray: Uint8Array) => {
    const barWidth = canvas.width / config.bars
    const barSpacing = barWidth * 0.1

    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#3b82f6'

    for (let i = 0; i < config.bars; i++) {
      const barHeight = (dataArray[i % dataArray.length] / 255) * canvas.height * 0.8
      const x = i * barWidth + barSpacing / 2
      const y = canvas.height - barHeight

      ctx.fillRect(x, y, barWidth - barSpacing, barHeight)
    }
  }

  const drawWaveform = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, dataArray: Uint8Array) => {
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#3b82f6'
    ctx.lineWidth = 2
    ctx.beginPath()

    const sliceWidth = canvas.width / dataArray.length
    let x = 0

    for (let i = 0; i < dataArray.length; i++) {
      const v = dataArray[i] / 255
      const y = v * canvas.height

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }

      x += sliceWidth
    }

    ctx.stroke()
  }

  const drawCircle = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, dataArray: Uint8Array) => {
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(canvas.width, canvas.height) / 4

    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#3b82f6'
    ctx.lineWidth = 2

    for (let i = 0; i < dataArray.length; i++) {
      const angle = (i / dataArray.length) * Math.PI * 2
      const amplitude = (dataArray[i] / 255) * radius
      
      const x1 = centerX + Math.cos(angle) * radius
      const y1 = centerY + Math.sin(angle) * radius
      const x2 = centerX + Math.cos(angle) * (radius + amplitude)
      const y2 = centerY + Math.sin(angle) * (radius + amplitude)

      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }
  }

  const stopVisualization = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = undefined
    }

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      }
    }
  }

  const handlePauseResume = () => {
    if (isPlaying && currentAudio) {
      currentAudio.pause()
    } else if (currentAudio) {
      currentAudio.play()
    }
  }

  const handleMuteToggle = () => {
    if (isMuted) {
      setVolume(previousVolume)
      setIsMuted(false)
    } else {
      setPreviousVolume(volume)
      setVolume(0)
      setIsMuted(true)
    }
  }

  const handleStop = () => {
    stopPlayback()
  }

  return (
    <Card className={`${className}`}>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Status Indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                  <span className="text-sm text-muted-foreground">Loading...</span>
                </div>
              ) : isPlaying ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-muted-foreground">AI is speaking</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                  <span className="text-sm text-muted-foreground">Ready</span>
                </div>
              )}
            </div>
            
            {isPlaying && (
              <Badge variant="secondary" className="text-xs">
                <Volume2 className="w-3 h-3 mr-1" />
                {Math.round(volume * 100)}%
              </Badge>
            )}
          </div>

          {/* Visualizer Canvas */}
          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              width={config.width}
              height={config.height}
              className="border border-border rounded-lg bg-card"
              style={{ 
                filter: isPlaying ? 'none' : 'grayscale(100%)',
                transition: 'filter 0.3s ease'
              }}
            />
          </div>

          {/* Controls */}
          {showControls && (
            <div className="flex items-center justify-center gap-2">
              {currentAudio && (
                <Button
                  onClick={handlePauseResume}
                  size="sm"
                  variant="outline"
                  disabled={isLoading}
                >
                  {isPlaying ? (
                    <Pause className="w-3 h-3" />
                  ) : (
                    <Play className="w-3 h-3" />
                  )}
                </Button>
              )}

              <Button
                onClick={handleMuteToggle}
                size="sm"
                variant="outline"
                disabled={isLoading}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-3 h-3" />
                ) : (
                  <Volume2 className="w-3 h-3" />
                )}
              </Button>

              {isPlaying && (
                <Button
                  onClick={handleStop}
                  size="sm"
                  variant="destructive"
                >
                  Stop
                </Button>
              )}
            </div>
          )}

          {/* Speaking Indicator */}
          {isPlaying && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Mic className="w-4 h-4 text-primary animate-pulse" />
              </div>
              <p className="text-xs text-muted-foreground">
                AI is speaking...
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}