import AINavigator from '@/components/ai-navigator';

export default function AINavigatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">
            NEWTUBE AI Navigator Demo
          </h1>
          <p className="text-gray-600 mt-2">
            Experience how AI can build the perfect streaming platform through voice commands and browser automation
          </p>
        </div>
      </header>

      {/* Navigation breadcrumb */}
      <nav className="bg-gray-100 px-6 py-3 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>NEWTUBE</span>
            <span>/</span>
            <span>AI Navigator</span>
            <span>/</span>
            <span className="text-blue-600 font-medium">BrowserMCP Demo</span>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="py-8">
        <AINavigator />
      </main>

      {/* Footer with instructions */}
      <footer className="bg-white border-t border-gray-200 px-6 py-8 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            How to Use the AI Navigator
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">🎤 Voice Commands</h4>
              <p>Click "Start Voice" and speak naturally. Try commands like "Navigate to dashboard" or "Search for videos".</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">🤖 AI Interpretation</h4>
              <p>Watch as AI interprets your commands and breaks them down into specific browser actions.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">⚡ Live Automation</h4>
              <p>See real-time visual feedback as AI demonstrates building your perfect streaming experience.</p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Pro Tip:</strong> This demo showcases the revolutionary AI-first approach to building NEWTUBE. 
              In the full implementation, AI would actually control your browser through BrowserMCP tools to create your ideal streaming platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}