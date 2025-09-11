'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Play, Search, Heart, TrendingUp, User, List, Settings, Volume2, Pause } from 'lucide-react'

interface ComponentSpec {
  type: 'video-player' | 'search-bar' | 'subscription-list' | 'trending-feed' | 'channel-grid' | 'playlist-manager' | 'settings-panel' | 'recommendation-feed'
  props: any
  layout?: {
    width?: string
    height?: string
    position?: 'relative' | 'absolute' | 'fixed'
  }
}

interface AIUIGeneratorProps {
  components: ComponentSpec[]
  onComponentGenerated: (component: React.ReactNode) => void
}

// Dynamic component generators
const generateVideoPlayer = (props: any) => (
  <Card className="p-6 bg-black text-white relative overflow-hidden">
    <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center mb-4">
      <div className="text-center">
        <Play className="w-16 h-16 text-white/70 mx-auto mb-2" />
        <p className="text-lg font-medium">{props.title || "Your Video Player"}</p>
        <p className="text-sm text-white/60">{props.subtitle || "Ready for your content"}</p>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button size="sm" variant="secondary">
          <Play className="w-4 h-4 mr-2" />
          Play
        </Button>
        <Button size="sm" variant="ghost">
          <Heart className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="ghost">
          <Volume2 className="w-4 h-4" />
        </Button>
      </div>
      <div className="text-sm text-white/60">
        {props.duration || "0:00"} / {props.totalDuration || "0:00"}
      </div>
    </div>
  </Card>
)

const generateSearchBar = (props: any) => (
  <Card className="p-4">
    <div className="flex gap-3">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input 
          type="text"
          placeholder={props.placeholder || "Search for videos, channels, or playlists..."}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      <Button size="sm">
        <Search className="w-4 h-4 mr-2" />
        Search
      </Button>
    </div>
    {props.suggestions && (
      <div className="mt-3 flex flex-wrap gap-2">
        {props.suggestions.map((suggestion: string, index: number) => (
          <Button key={index} variant="outline" size="sm" className="text-xs">
            {suggestion}
          </Button>
        ))}
      </div>
    )}
  </Card>
)

const generateSubscriptionList = (props: any) => (
  <Card className="p-4">
    <h3 className="font-semibold mb-4 flex items-center gap-2">
      <User className="w-4 h-4" />
      {props.title || "Your Subscriptions"}
    </h3>
    <div className="space-y-3">
      {(props.channels || [
        { name: "Tech Channel", subscribers: "1.2M", avatar: "🔧" },
        { name: "Music Vibes", subscribers: "890K", avatar: "🎵" },
        { name: "Cooking Master", subscribers: "2.1M", avatar: "👨‍🍳" }
      ]).map((channel: any, index: number) => (
        <div key={index} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-md cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm">
            {channel.avatar || channel.name[0]}
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">{channel.name}</p>
            <p className="text-xs text-muted-foreground">{channel.subscribers} subscribers</p>
          </div>
        </div>
      ))}
    </div>
  </Card>
)

const generateTrendingFeed = (props: any) => (
  <Card className="p-4">
    <h3 className="font-semibold mb-4 flex items-center gap-2">
      <TrendingUp className="w-4 h-4" />
      {props.title || "Trending Now"}
    </h3>
    <div className="grid gap-4">
      {(props.videos || [
        { title: "Amazing Tech Review", views: "1.2M", duration: "10:45" },
        { title: "Viral Dance Challenge", views: "5.8M", duration: "3:22" },
        { title: "Cooking Tutorial", views: "890K", duration: "15:30" }
      ]).map((video: any, index: number) => (
        <div key={index} className="flex gap-3 hover:bg-muted/50 p-2 rounded-md cursor-pointer">
          <div className="w-20 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded flex items-center justify-center">
            <Play className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm line-clamp-2">{video.title}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {video.views} views • {video.duration}
            </p>
          </div>
        </div>
      ))}
    </div>
  </Card>
)

const generateChannelGrid = (props: any) => (
  <Card className="p-4">
    <h3 className="font-semibold mb-4 flex items-center gap-2">
      <User className="w-4 h-4" />
      {props.title || "Featured Channels"}
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {(props.channels || [
        { name: "Tech Reviews", category: "Technology", avatar: "🔬" },
        { name: "Music Hub", category: "Entertainment", avatar: "🎤" },
        { name: "Food Stories", category: "Lifestyle", avatar: "🍕" },
        { name: "Gaming Zone", category: "Gaming", avatar: "🎮" }
      ]).map((channel: any, index: number) => (
        <div key={index} className="text-center p-3 hover:bg-muted/50 rounded-lg cursor-pointer">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-lg">
            {channel.avatar || channel.name[0]}
          </div>
          <p className="font-medium text-sm">{channel.name}</p>
          <p className="text-xs text-muted-foreground">{channel.category}</p>
        </div>
      ))}
    </div>
  </Card>
)

const generatePlaylistManager = (props: any) => (
  <Card className="p-4">
    <h3 className="font-semibold mb-4 flex items-center gap-2">
      <List className="w-4 h-4" />
      {props.title || "Your Playlists"}
    </h3>
    <div className="space-y-2">
      {(props.playlists || [
        { name: "Favorites", count: 42, color: "bg-red-500" },
        { name: "Watch Later", count: 18, color: "bg-blue-500" },
        { name: "Learning", count: 15, color: "bg-green-500" }
      ]).map((playlist: any, index: number) => (
        <div key={index} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-md cursor-pointer">
          <div className={`w-8 h-8 rounded ${playlist.color} flex items-center justify-center`}>
            <List className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">{playlist.name}</p>
            <p className="text-xs text-muted-foreground">{playlist.count} videos</p>
          </div>
        </div>
      ))}
    </div>
    <Button variant="outline" size="sm" className="w-full mt-3">
      Create New Playlist
    </Button>
  </Card>
)

const generateSettingsPanel = (props: any) => (
  <Card className="p-4">
    <h3 className="font-semibold mb-4 flex items-center gap-2">
      <Settings className="w-4 h-4" />
      {props.title || "Quick Settings"}
    </h3>
    <div className="space-y-3">
      {(props.settings || [
        { label: "Auto-play", enabled: true },
        { label: "Dark Mode", enabled: false },
        { label: "Notifications", enabled: true },
        { label: "HD Quality", enabled: true }
      ]).map((setting: any, index: number) => (
        <div key={index} className="flex items-center justify-between">
          <span className="text-sm">{setting.label}</span>
          <Button 
            variant={setting.enabled ? "default" : "outline"} 
            size="sm"
            className="h-6 px-2 text-xs"
          >
            {setting.enabled ? "ON" : "OFF"}
          </Button>
        </div>
      ))}
    </div>
  </Card>
)

const generateRecommendationFeed = (props: any) => (
  <Card className="p-4">
    <h3 className="font-semibold mb-4 flex items-center gap-2">
      <Heart className="w-4 h-4" />
      {props.title || "Recommended for You"}
    </h3>
    <div className="space-y-4">
      {(props.videos || [
        { title: "Based on your viewing history", category: "Technology", thumbnail: "🚀" },
        { title: "Similar to videos you liked", category: "Entertainment", thumbnail: "🎬" },
        { title: "From channels you follow", category: "Education", thumbnail: "📚" }
      ]).map((video: any, index: number) => (
        <div key={index} className="flex gap-3 hover:bg-muted/50 p-2 rounded-md cursor-pointer">
          <div className="w-16 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded flex items-center justify-center text-lg">
            {video.thumbnail}
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm line-clamp-1">{video.title}</p>
            <p className="text-xs text-muted-foreground">{video.category}</p>
          </div>
        </div>
      ))}
    </div>
  </Card>
)

export function AIUIGenerator({ components, onComponentGenerated }: AIUIGeneratorProps) {
  useEffect(() => {
    components.forEach((spec, index) => {
      setTimeout(() => {
        let component: React.ReactNode = null

        switch (spec.type) {
          case 'video-player':
            component = generateVideoPlayer(spec.props)
            break
          case 'search-bar':
            component = generateSearchBar(spec.props)
            break
          case 'subscription-list':
            component = generateSubscriptionList(spec.props)
            break
          case 'trending-feed':
            component = generateTrendingFeed(spec.props)
            break
          case 'channel-grid':
            component = generateChannelGrid(spec.props)
            break
          case 'playlist-manager':
            component = generatePlaylistManager(spec.props)
            break
          case 'settings-panel':
            component = generateSettingsPanel(spec.props)
            break
          case 'recommendation-feed':
            component = generateRecommendationFeed(spec.props)
            break
          default:
            component = (
              <Card className="p-4">
                <p>Unknown component type: {spec.type}</p>
              </Card>
            )
        }

        if (component) {
          onComponentGenerated(component)
        }
      }, index * 500) // Stagger component generation for smooth animation
    })
  }, [components, onComponentGenerated])

  return (
    <div className="text-xs text-muted-foreground">
      Generating {components.length} component{components.length > 1 ? 's' : ''}...
    </div>
  )
}