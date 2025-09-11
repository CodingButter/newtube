import { Button } from "@/components/ui/button"

interface WatchPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { id } = await params
  
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main video player area */}
        <div className="lg:col-span-2">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Video Player</h2>
              <p className="text-muted-foreground mb-4">
                Video ID: {id}
              </p>
              <p className="text-sm text-muted-foreground">
                Official embed player will be rendered here based on platform
              </p>
            </div>
          </div>
          
          <div className="panel p-6">
            <h1 className="text-2xl font-bold mb-2">Video Title Placeholder</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-muted-foreground">Channel Name</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">Views</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">Upload Date</span>
            </div>
            
            <div className="flex gap-2 mb-4">
              <Button size="sm">Like</Button>
              <Button size="sm" variant="outline">Share</Button>
              <Button size="sm" variant="outline">Save</Button>
              <Button size="sm" variant="outline">Add to List</Button>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">
                Video description and metadata will be displayed here. This includes 
                information from the original platform while respecting platform guidelines.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar with recommendations and comments */}
        <div className="space-y-6">
          <div className="panel p-6">
            <h3 className="font-semibold mb-4">AI Comment Lens</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Smart comment filtering and summarization
            </p>
            <div className="space-y-2">
              <Button size="sm" variant="outline" className="w-full">
                Show Relevant Comments
              </Button>
              <Button size="sm" variant="outline" className="w-full">
                Hide Toxic Comments
              </Button>
              <Button size="sm" variant="outline" className="w-full">
                AI Summary
              </Button>
            </div>
          </div>

          <div className="panel p-6">
            <h3 className="font-semibold mb-4">Related Videos</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-24 h-16 bg-muted rounded flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2">
                      Related Video Title {i}
                    </h4>
                    <p className="text-xs text-muted-foreground">Channel Name</p>
                    <p className="text-xs text-muted-foreground">Views • Date</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-6">
            <h3 className="font-semibold mb-4">Cross-Platform Suggestions</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Similar content from other platforms
            </p>
            <div className="space-y-2">
              <Button size="sm" variant="outline" className="w-full">
                YouTube Suggestions
              </Button>
              <Button size="sm" variant="outline" className="w-full">
                Vimeo Picks
              </Button>
              <Button size="sm" variant="outline" className="w-full">
                Nebula Content
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}