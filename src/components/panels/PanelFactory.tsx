import React from 'react'
import { Panel, PanelProps } from '@/types'
import { VideoFeedPanel } from './VideoFeedPanel'
import { VideoPlayerPanel } from './VideoPlayerPanel'
import { SearchPanel } from './SearchPanel'
import { ListPanel } from './ListPanel'
import { RecommendationPanel } from './RecommendationPanel'

export const PanelFactory: React.FC<PanelProps> = (props) => {
  const { panel } = props

  switch (panel.type) {
    case 'video-feed':
      return <VideoFeedPanel {...props} />
    
    case 'video-player':
      return <VideoPlayerPanel {...props} />
    
    case 'search':
      return <SearchPanel {...props} />
    
    case 'list':
    case 'watch-later':
    case 'subscriptions':
      return <ListPanel {...props} />
    
    case 'recommendations':
    case 'trending':
    case 'ai-curated':
      return <RecommendationPanel {...props} />
    
    default:
      return (
        <div className="p-4 text-center text-muted-foreground">
          Unknown panel type: {panel.type}
        </div>
      )
  }
}

export default PanelFactory