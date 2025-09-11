import { useCallback, useEffect, useState, useRef } from 'react'
import { useVoiceStore } from '@/stores/voiceStore'

/**
 * useVoice Hook - Simplified interface for voice functionality
 * Provides common voice operations with built-in error handling and fallbacks
 */
export function useVoice() {
  const store = useVoiceStore()

  // Initialize voices on mount
  useEffect(() => {
    store.fetchAvailableVoices()
  }, [store.fetchAvailableVoices])

  // Speak text with automatic fallback
  const speak = useCallback(async (text: string, options?: {
    interrupt?: boolean
    fallbackToBrowser?: boolean
  }) => {
    const { interrupt = true, fallbackToBrowser = true } = options || {}

    try {
      // Stop current playback if interrupting
      if (interrupt && store.isPlaying) {
        store.stopPlayback()
      }

      // Use ElevenLabs TTS
      await store.playText(text)
    } catch (error) {
      console.error('ElevenLabs TTS failed:', error)
      
      // Fallback to browser TTS if enabled
      if (fallbackToBrowser) {
        store.playWithBrowserTTS(text)
      }
    }
  }, [store])

  // Stop all audio playback
  const stop = useCallback(() => {
    store.stopPlayback()
    store.stopBrowserTTS()
  }, [store])

  // Pause/resume current audio
  const togglePlayPause = useCallback(() => {
    if (store.currentAudio) {
      if (store.isPlaying) {
        store.currentAudio.pause()
      } else {
        store.currentAudio.play()
      }
    }
  }, [store.currentAudio, store.isPlaying])

  // Mute/unmute
  const toggleMute = useCallback(() => {
    const currentVolume = store.volume
    if (currentVolume === 0) {
      store.setVolume(0.8) // Restore to default volume
    } else {
      store.setVolume(0)
    }
  }, [store])

  // Set voice by name (helper function)
  const setVoiceByName = useCallback((voiceName: string) => {
    const voice = store.availableVoices.find(v => 
      v.name.toLowerCase() === voiceName.toLowerCase()
    )
    if (voice) {
      store.setSelectedVoice(voice)
      return true
    }
    return false
  }, [store])

  // Quick voice presets
  const voicePresets = {
    rachel: () => setVoiceByName('Rachel'),
    bella: () => setVoiceByName('Bella'),
    elli: () => setVoiceByName('Elli'),
    charlotte: () => setVoiceByName('Charlotte')
  }

  // Voice settings helpers
  const setEmotionalResponse = useCallback((enabled: boolean) => {
    store.setVoiceSettings({ useEmotion: enabled })
  }, [store])

  const setVoiceStability = useCallback((stability: number) => {
    store.setVoiceSettings({ stability: Math.max(0, Math.min(1, stability)) })
  }, [store])

  const setSimilarityBoost = useCallback((boost: number) => {
    store.setVoiceSettings({ similarityBoost: Math.max(0, Math.min(1, boost)) })
  }, [store])

  // Test current voice settings
  const testVoice = useCallback(async (customText?: string) => {
    const testPhrases = [
      "Hello! This is a test of the current voice settings.",
      "Welcome to NEWTUBE, your personalized streaming experience.",
      "Voice synthesis is working correctly with emotional expression."
    ]
    
    const text = customText || testPhrases[Math.floor(Math.random() * testPhrases.length)]
    await speak(text, { interrupt: true })
  }, [speak])

  // Check if voice features are available
  const capabilities = {
    elevenlabs: typeof window !== 'undefined',
    browserTTS: typeof window !== 'undefined' && 'speechSynthesis' in window,
    speechRecognition: typeof window !== 'undefined' && 
      ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
  }

  return {
    // State
    isPlaying: store.isPlaying,
    isLoading: store.isLoading,
    volume: store.volume,
    speed: store.speed,
    selectedVoice: store.selectedVoice,
    availableVoices: store.availableVoices,
    voiceSettings: store.voiceSettings,
    currentAudio: store.currentAudio,
    
    // Actions
    speak,
    stop,
    togglePlayPause,
    toggleMute,
    testVoice,
    
    // Settings
    setVolume: store.setVolume,
    setSpeed: store.setSpeed,
    setSelectedVoice: store.setSelectedVoice,
    setVoiceSettings: store.setVoiceSettings,
    setVoiceByName,
    setEmotionalResponse,
    setVoiceStability,
    setSimilarityBoost,
    
    // Voice presets
    voices: voicePresets,
    
    // Capabilities
    capabilities,
    
    // Store methods (for advanced usage)
    store
  }
}

/**
 * useAutoSpeak Hook - Automatically speak AI messages
 * Useful for conversation interfaces
 */
export function useAutoSpeak(messages: Array<{ role: string; content: string }>, enabled = true) {
  const { speak, isPlaying } = useVoice()

  useEffect(() => {
    if (!enabled || messages.length === 0) return

    const lastMessage = messages[messages.length - 1]
    
    // Only speak AI messages and avoid interrupting current speech
    if (lastMessage.role === 'ai' && !isPlaying) {
      speak(lastMessage.content, { interrupt: false })
    }
  }, [messages, enabled, speak, isPlaying])
}

/**
 * useSpeechRecognition Hook - Browser speech recognition with fallbacks
 */
export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    
    if (!SpeechRecognition) {
      setError('Speech recognition not supported in this browser')
      return
    }

    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.continuous = false
    recognitionRef.current.interimResults = false
    recognitionRef.current.lang = 'en-US'

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setTranscript(transcript)
      setIsListening(false)
    }

    recognitionRef.current.onerror = (event: any) => {
      setError(`Speech recognition error: ${event.error}`)
      setIsListening(false)
    }

    recognitionRef.current.onend = () => {
      setIsListening(false)
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return false

    try {
      recognitionRef.current.start()
      setIsListening(true)
      setError(null)
      setTranscript('')
      return true
    } catch (err) {
      setError('Failed to start speech recognition')
      return false
    }
  }, [])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
  }, [])

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    isSupported: !!recognitionRef.current
  }
}