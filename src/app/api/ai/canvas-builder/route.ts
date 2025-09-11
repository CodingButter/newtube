import { NextRequest, NextResponse } from 'next/server'

interface ComponentSpec {
  type: 'video-player' | 'search-bar' | 'subscription-list' | 'trending-feed' | 'channel-grid' | 'playlist-manager' | 'settings-panel' | 'recommendation-feed'
  props: any
  layout?: {
    width?: string
    height?: string
    position?: 'relative' | 'absolute' | 'fixed'
  }
}

// AI Component Generation Logic
function analyzeMessageAndGenerateComponents(message: string): {
  response: string
  components: ComponentSpec[]
} {
  const lowerMessage = message.toLowerCase()
  const components: ComponentSpec[] = []
  let response = ""

  // Video Player requests
  if (lowerMessage.includes('video player') || lowerMessage.includes('play video') || lowerMessage.includes('big player') || lowerMessage.includes('huge player')) {
    components.push({
      type: 'video-player',
      props: {
        title: lowerMessage.includes('big') || lowerMessage.includes('huge') ? "Large Video Player" : "Video Player",
        subtitle: "Your personalized viewing experience",
        duration: "0:00",
        totalDuration: "0:00"
      }
    })
    response += "I've created a beautiful video player for you! "
  }

  // Search functionality
  if (lowerMessage.includes('search') || lowerMessage.includes('find') || lowerMessage.includes('look for')) {
    const suggestions = []
    if (lowerMessage.includes('tech') || lowerMessage.includes('technology')) {
      suggestions.push("AI Tutorials", "Coding Tips", "Tech Reviews")
    } else if (lowerMessage.includes('music')) {
      suggestions.push("New Releases", "Top Charts", "Live Concerts")
    } else if (lowerMessage.includes('cooking') || lowerMessage.includes('food')) {
      suggestions.push("Quick Recipes", "Cooking Tips", "Food Reviews")
    } else {
      suggestions.push("Trending", "Popular", "Recent")
    }

    components.push({
      type: 'search-bar',
      props: {
        placeholder: lowerMessage.includes('tech') ? "Search for tech videos..." : 
                     lowerMessage.includes('music') ? "Search for music videos..." :
                     lowerMessage.includes('cooking') ? "Search for cooking videos..." :
                     "Search for videos, channels, or playlists...",
        suggestions
      }
    })
    response += "I've added a smart search bar with personalized suggestions! "
  }

  // Subscriptions/Channels
  if (lowerMessage.includes('subscription') || lowerMessage.includes('channel') || lowerMessage.includes('favorite') || lowerMessage.includes('follow')) {
    if (lowerMessage.includes('grid') || lowerMessage.includes('all') || lowerMessage.includes('browse')) {
      components.push({
        type: 'channel-grid',
        props: {
          title: "Your Favorite Channels",
          channels: [
            { name: "Tech Insider", category: "Technology", avatar: "🔬" },
            { name: "Music Central", category: "Music", avatar: "🎵" },
            { name: "Cooking Pro", category: "Food & Drink", avatar: "👨‍🍳" },
            { name: "Gaming World", category: "Gaming", avatar: "🎮" },
            { name: "Art Studio", category: "Art & Design", avatar: "🎨" },
            { name: "Travel Vlogs", category: "Travel", avatar: "✈️" }
          ]
        }
      })
      response += "Here's a beautiful grid showing all your favorite channels! "
    } else {
      components.push({
        type: 'subscription-list',
        props: {
          title: lowerMessage.includes('favorite') ? "Favorite Channels" : "Your Subscriptions"
        }
      })
      response += "I've created your subscription list on the side! "
    }
  }

  // Trending/Popular content
  if (lowerMessage.includes('trending') || lowerMessage.includes('popular') || lowerMessage.includes('hot') || lowerMessage.includes('viral')) {
    components.push({
      type: 'trending-feed',
      props: {
        title: "What's Trending",
        videos: [
          { title: "Viral AI Breakthrough Explained", views: "2.1M", duration: "12:34" },
          { title: "Epic Gaming Moments Compilation", views: "1.8M", duration: "8:45" },
          { title: "10-Minute Healthy Meal Prep", views: "945K", duration: "10:22" },
          { title: "Mind-Blowing Science Experiment", views: "1.3M", duration: "7:18" }
        ]
      }
    })
    response += "Check out what's trending right now! "
  }

  // Playlists
  if (lowerMessage.includes('playlist') || lowerMessage.includes('saved') || lowerMessage.includes('list')) {
    components.push({
      type: 'playlist-manager',
      props: {
        title: "Your Playlists",
        playlists: [
          { name: "Watch Later", count: 23, color: "bg-blue-500" },
          { name: "Favorites", count: 48, color: "bg-red-500" },
          { name: "Study Music", count: 12, color: "bg-green-500" },
          { name: "Workout Videos", count: 15, color: "bg-orange-500" }
        ]
      }
    })
    response += "Your playlist manager is ready! "
  }

  // Recommendations
  if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('for me') || lowerMessage.includes('personal')) {
    components.push({
      type: 'recommendation-feed',
      props: {
        title: "Recommended for You",
        videos: [
          { title: "Based on your recent watches", category: "Technology", thumbnail: "🚀" },
          { title: "Similar to videos you liked", category: "Education", thumbnail: "📚" },
          { title: "From creators you follow", category: "Entertainment", thumbnail: "🎬" },
          { title: "Trending in your interests", category: "Music", thumbnail: "🎵" }
        ]
      }
    })
    response += "Here are some personalized recommendations! "
  }

  // Settings/Controls
  if (lowerMessage.includes('setting') || lowerMessage.includes('control') || lowerMessage.includes('option') || lowerMessage.includes('configure')) {
    components.push({
      type: 'settings-panel',
      props: {
        title: "Quick Settings",
        settings: [
          { label: "Auto-play", enabled: true },
          { label: "HD Quality", enabled: true },
          { label: "Dark Mode", enabled: false },
          { label: "Notifications", enabled: true }
        ]
      }
    })
    response += "I've added a settings panel for quick controls! "
  }

  // Default response if no specific components were generated
  if (components.length === 0) {
    response = "I'd love to help you create that! Could you be more specific about what kind of streaming interface you'd like? For example:\n\n• 'Show me a big video player'\n• 'Add a search bar for tech videos'\n• 'I want to see my subscriptions on the side'\n• 'Create a trending videos feed'\n• 'Add my playlists'\n\nWhat sounds interesting to you?"
    
    // Add a sample component to show capability
    components.push({
      type: 'video-player',
      props: {
        title: "Sample Video Player",
        subtitle: "Here's what I can create for you",
        duration: "0:00",
        totalDuration: "0:00"
      }
    })
  } else {
    response += "\n\nWhat would you like to add next? I can create search bars, subscription lists, trending feeds, playlists, settings panels, and much more!"
  }

  return { response, components }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, conversationHistory, currentComponents } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Generate components based on the message
    const result = analyzeMessageAndGenerateComponents(message)

    // Add context about existing components
    if (currentComponents > 0) {
      result.response = `Perfect! I see you already have ${currentComponents} component${currentComponents > 1 ? 's' : ''}. ${result.response}`
    }

    return NextResponse.json({
      response: result.response,
      components: result.components,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error in canvas-builder API:', error)
    return NextResponse.json(
      { 
        response: "I'm having trouble processing your request right now. Please try again!",
        components: [],
        error: 'Internal server error'
      },
      { status: 500 }
    )
  }
}