import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Customize your NEWTUBE experience and manage your connections
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Connections */}
        <div className="panel p-6">
          <h2 className="text-xl font-semibold mb-4">Platform Connections</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-sm font-bold">
                  YT
                </div>
                <div>
                  <h3 className="font-medium">YouTube</h3>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button size="sm">Connect</Button>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-sm font-bold">
                  V
                </div>
                <div>
                  <h3 className="font-medium">Vimeo</h3>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button size="sm">Connect</Button>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white text-sm font-bold">
                  N
                </div>
                <div>
                  <h3 className="font-medium">Nebula</h3>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button size="sm">Connect</Button>
            </div>
          </div>
        </div>

        {/* Display Preferences */}
        <div className="panel p-6">
          <h2 className="text-xl font-semibold mb-4">Display Preferences</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Theme</label>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Light</Button>
                <Button size="sm" variant="outline">Dark</Button>
                <Button size="sm">Auto</Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Layout Density</label>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Compact</Button>
                <Button size="sm">Comfortable</Button>
                <Button size="sm" variant="outline">Spacious</Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Auto-play</label>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Off</Button>
                <Button size="sm">On</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Panel Layout */}
        <div className="panel p-6">
          <h2 className="text-xl font-semibold mb-4">Panel Layout</h2>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Customize your dashboard with drag-and-drop panels
            </p>
            
            <div className="space-y-2">
              <Button size="sm" variant="outline" className="w-full">
                Reset to Default Layout
              </Button>
              <Button size="sm" variant="outline" className="w-full">
                Save Current Layout
              </Button>
              <Button size="sm" className="w-full">
                Enter Layout Editor
              </Button>
            </div>
          </div>
        </div>

        {/* AI & Personalization */}
        <div className="panel p-6">
          <h2 className="text-xl font-semibold mb-4">AI & Personalization</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">AI API Key</label>
              <p className="text-xs text-muted-foreground mb-2">
                Bring your own API key for enhanced AI features
              </p>
              <div className="flex gap-2">
                <input 
                  type="password" 
                  placeholder="sk-..." 
                  className="flex-1 px-3 py-2 border rounded-md bg-background"
                />
                <Button size="sm">Save</Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Comment Lens</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" defaultChecked />
                  Hide toxic comments
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" defaultChecked />
                  Show relevance scores
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" />
                  AI comment summaries
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Data & Privacy */}
        <div className="panel p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Data & Privacy</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Data Collection</h3>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  Personalization data
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Usage analytics
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Performance metrics
                </label>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Data Management</h3>
              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full">
                  Export Your Data
                </Button>
                <Button size="sm" variant="outline" className="w-full">
                  Clear Cache
                </Button>
                <Button size="sm" variant="destructive" className="w-full">
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}