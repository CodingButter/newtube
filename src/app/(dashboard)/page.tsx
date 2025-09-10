import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Welcome to NEWTUBE
        </h1>
        <p className="text-lg text-muted-foreground">
          Your customizable streaming aggregator for YouTube, Vimeo, and Nebula
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Panel-based layout placeholder */}
        <div className="panel p-6">
          <h2 className="text-xl font-semibold mb-4">YouTube Feed</h2>
          <p className="text-muted-foreground mb-4">
            Your personalized YouTube content will appear here
          </p>
          <Button variant="outline">Configure Panel</Button>
        </div>

        <div className="panel p-6">
          <h2 className="text-xl font-semibold mb-4">Vimeo Discover</h2>
          <p className="text-muted-foreground mb-4">
            Curated Vimeo content based on your preferences
          </p>
          <Button variant="outline">Configure Panel</Button>
        </div>

        <div className="panel p-6">
          <h2 className="text-xl font-semibold mb-4">Nebula Collections</h2>
          <p className="text-muted-foreground mb-4">
            Educational content from your favorite creators
          </p>
          <Button variant="outline">Configure Panel</Button>
        </div>

        <div className="panel p-6">
          <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>
          <p className="text-muted-foreground mb-4">
            Smart suggestions across all platforms
          </p>
          <Button variant="outline">Configure Panel</Button>
        </div>

        <div className="panel p-6">
          <h2 className="text-xl font-semibold mb-4">Watch Later</h2>
          <p className="text-muted-foreground mb-4">
            Your saved videos from all platforms
          </p>
          <Button variant="outline">Configure Panel</Button>
        </div>

        <div className="panel p-6">
          <h2 className="text-xl font-semibold mb-4">Custom Layout</h2>
          <p className="text-muted-foreground mb-4">
            Drag and drop to customize your dashboard
          </p>
          <Button>Start Customizing</Button>
        </div>
      </div>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>NEWTUBE - Streaming content aggregated, simplified, and personalized</p>
      </footer>
    </div>
  )
}