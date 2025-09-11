import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Voice {
  voice_id: string
  name: string
  category: string
  description?: string
}

interface VoiceSettings {
  stability: number
  similarityBoost: number
  style?: number
  useEmotion?: boolean
}

interface VoiceStore {
  // Voice Selection
  selectedVoice: Voice
  availableVoices: Voice[]
  
  // Audio Settings
  volume: number
  speed: number
  
  // ElevenLabs Settings
  voiceSettings: VoiceSettings
  
  // UI State
  isPlaying: boolean
  isLoading: boolean
  audioContext: AudioContext | null
  currentAudio: HTMLAudioElement | null
  
  // Actions
  setSelectedVoice: (voice: Voice) => void
  setVolume: (volume: number) => void
  setSpeed: (speed: number) => void
  setVoiceSettings: (settings: Partial<VoiceSettings>) => void
  setIsPlaying: (playing: boolean) => void
  setIsLoading: (loading: boolean) => void
  setAudioContext: (context: AudioContext | null) => void
  setCurrentAudio: (audio: HTMLAudioElement | null) => void
  fetchAvailableVoices: () => Promise<void>
  
  // Audio Playback
  playText: (text: string) => Promise<void>
  stopPlayback: () => void
  
  // Fallback TTS
  playWithBrowserTTS: (text: string) => void
  stopBrowserTTS: () => void
}

// Default voices (Rachel is default for warm, friendly tone)
const defaultVoices: Voice[] = [
  {
    voice_id: 'pNInz6obpgDQGcFmaJgB',
    name: 'Rachel',
    category: 'premade'
  },
  {
    voice_id: '21m00Tcm4TlvDq8ikWAM',
    name: 'Rachel',
    category: 'premade'
  },
  {
    voice_id: 'AZnzlk1XvdvUeBnXmlld',
    name: 'Domi',
    category: 'premade'
  },
  {
    voice_id: 'EXAVITQu4vr4xnSDxMaL',
    name: 'Bella',
    category: 'premade'
  }
]

export const useVoiceStore = create<VoiceStore>()(
  persist(
    (set, get) => ({
      // Initial State
      selectedVoice: defaultVoices[0], // Rachel as default
      availableVoices: defaultVoices,
      volume: 0.8,
      speed: 1.0,
      voiceSettings: {
        stability: 0.5,
        similarityBoost: 0.75,
        style: 0,
        useEmotion: true
      },
      isPlaying: false,
      isLoading: false,
      audioContext: null,
      currentAudio: null,

      // Actions
      setSelectedVoice: (voice) => set({ selectedVoice: voice }),
      setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
      setSpeed: (speed) => set({ speed: Math.max(0.5, Math.min(2.0, speed)) }),
      setVoiceSettings: (settings) => 
        set((state) => ({ 
          voiceSettings: { ...state.voiceSettings, ...settings } 
        })),
      setIsPlaying: (playing) => set({ isPlaying: playing }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      setAudioContext: (context) => set({ audioContext: context }),
      setCurrentAudio: (audio) => set({ currentAudio: audio }),

      fetchAvailableVoices: async () => {
        try {
          const response = await fetch('/api/ai/elevenlabs/tts')
          if (response.ok) {
            const data = await response.json()
            const voices = [...(data.recommended || []), ...(data.all || [])]
            set({ availableVoices: voices.length > 0 ? voices : defaultVoices })
          }
        } catch (error) {
          console.error('Failed to fetch voices:', error)
          // Keep default voices on error
        }
      },

      playText: async (text: string) => {
        const state = get()
        if (state.isPlaying) {
          state.stopPlayback()
        }

        set({ isLoading: true })

        try {
          // Try ElevenLabs TTS first
          const response = await fetch('/api/ai/elevenlabs/tts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              text,
              voiceId: state.selectedVoice.voice_id,
              stability: state.voiceSettings.stability,
              similarityBoost: state.voiceSettings.similarityBoost,
            }),
          })

          if (response.ok) {
            const data = await response.json()
            
            // Create audio from base64
            const audio = new Audio(`data:audio/mpeg;base64,${data.audio}`)
            audio.volume = state.volume
            audio.playbackRate = state.speed

            audio.onplay = () => set({ isPlaying: true, isLoading: false })
            audio.onended = () => set({ isPlaying: false })
            audio.onerror = () => {
              set({ isPlaying: false, isLoading: false })
              // Fallback to browser TTS
              get().playWithBrowserTTS(text)
            }

            set({ currentAudio: audio })
            await audio.play()
          } else {
            throw new Error('ElevenLabs TTS failed')
          }
        } catch (error) {
          console.error('ElevenLabs TTS error:', error)
          set({ isLoading: false })
          // Fallback to browser TTS
          get().playWithBrowserTTS(text)
        }
      },

      stopPlayback: () => {
        const state = get()
        if (state.currentAudio) {
          state.currentAudio.pause()
          state.currentAudio.currentTime = 0
          set({ currentAudio: null })
        }
        // Also stop browser TTS
        get().stopBrowserTTS()
        set({ isPlaying: false, isLoading: false })
      },

      playWithBrowserTTS: (text: string) => {
        const state = get()
        if ('speechSynthesis' in window) {
          // Stop any existing speech
          window.speechSynthesis.cancel()
          
          const utterance = new SpeechSynthesisUtterance(text)
          utterance.rate = state.speed
          utterance.volume = state.volume
          utterance.pitch = 1.0

          utterance.onstart = () => set({ isPlaying: true, isLoading: false })
          utterance.onend = () => set({ isPlaying: false })
          utterance.onerror = () => set({ isPlaying: false, isLoading: false })

          window.speechSynthesis.speak(utterance)
        } else {
          set({ isLoading: false })
        }
      },

      stopBrowserTTS: () => {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel()
        }
        set({ isPlaying: false })
      }
    }),
    {
      name: 'newtube-voice-settings',
      partialize: (state) => ({
        selectedVoice: state.selectedVoice,
        volume: state.volume,
        speed: state.speed,
        voiceSettings: state.voiceSettings
      })
    }
  )
)