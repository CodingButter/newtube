// Validation utilities for NEWTUBE

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPassword(password: string): boolean {
  // At least 8 characters, one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function isValidYouTubeUrl(url: string): boolean {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+$/
  return youtubeRegex.test(url)
}

export function isValidVimeoUrl(url: string): boolean {
  const vimeoRegex = /^(https?:\/\/)?(www\.)?vimeo\.com\/\d+$/
  return vimeoRegex.test(url)
}

export function extractVideoId(url: string, platform: 'youtube' | 'vimeo'): string | null {
  try {
    const urlObj = new URL(url)
    
    if (platform === 'youtube') {
      // Handle youtube.com/watch?v=VIDEO_ID
      if (urlObj.hostname.includes('youtube.com')) {
        return urlObj.searchParams.get('v')
      }
      // Handle youtu.be/VIDEO_ID
      if (urlObj.hostname === 'youtu.be') {
        return urlObj.pathname.slice(1)
      }
    }
    
    if (platform === 'vimeo' && urlObj.hostname.includes('vimeo.com')) {
      const match = urlObj.pathname.match(/\/(\d+)/)
      return match ? match[1] : null
    }
    
    return null
  } catch {
    return null
  }
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 1000) // Limit length
}

export function isValidPanelType(type: string): boolean {
  const validTypes = [
    'video-feed',
    'recommendations', 
    'watch-later',
    'subscriptions',
    'search',
    'trending',
    'ai-curated',
    'custom'
  ]
  return validTypes.includes(type)
}

export function validatePanelConfig(config: any): boolean {
  if (!config || typeof config !== 'object') return false
  
  // Basic validation - can be extended based on panel type
  if (config.title && typeof config.title !== 'string') return false
  if (config.maxItems && (typeof config.maxItems !== 'number' || config.maxItems < 1)) return false
  if (config.refreshInterval && (typeof config.refreshInterval !== 'number' || config.refreshInterval < 1000)) return false
  
  return true
}

export function isValidPosition(position: { x: number; y: number }): boolean {
  return (
    typeof position.x === 'number' &&
    typeof position.y === 'number' &&
    position.x >= 0 &&
    position.y >= 0
  )
}

export function isValidSize(size: { width: number; height: number }): boolean {
  return (
    typeof size.width === 'number' &&
    typeof size.height === 'number' &&
    size.width > 0 &&
    size.height > 0
  )
}

export function validateApiKey(key: string): boolean {
  // Basic API key validation - starts with expected prefix and has minimum length
  const patterns = {
    openai: /^sk-[a-zA-Z0-9]{32,}$/,
    youtube: /^[a-zA-Z0-9_-]{39}$/,
    vimeo: /^[a-zA-Z0-9]{32}$/
  }
  
  return Object.values(patterns).some(pattern => pattern.test(key))
}