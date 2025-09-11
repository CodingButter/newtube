// Voice Components Export Index
export { VoiceSettings } from './VoiceSettings'
export { VoiceSettingsPanel } from './VoiceSettingsPanel'
export { AudioVisualizer } from './AudioVisualizer'
export { VoiceControls, SpeakingIndicator } from './VoiceControls'

// Types
export type { AudioVisualizerProps } from './AudioVisualizer'
export type { VoiceSettingsProps } from './VoiceSettings'

// Re-export voice store and hooks for convenience
export { useVoiceStore } from '@/stores/voiceStore'
export { useVoice, useAutoSpeak, useSpeechRecognition } from '@/hooks/useVoice'