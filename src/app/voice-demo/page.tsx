import EnhancedAITourGuide from '@/components/enhanced-ai-tour-guide';

export default function VoiceDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            NEWTUBE Voice Experience Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of streaming with our AI-powered voice interface featuring{' '}
            <span className="font-semibold text-blue-600">ElevenLabs TTS</span>,{' '}
            <span className="font-semibold text-green-600">ChatGPT conversation</span>, and{' '}
            <span className="font-semibold text-purple-600">BrowserMCP navigation</span>.
          </p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-200">
              <h3 className="font-semibold text-blue-600 mb-2">🎵 High-Quality Voice</h3>
              <p className="text-sm text-gray-600">ElevenLabs TTS with natural-sounding voices</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-green-200">
              <h3 className="font-semibold text-green-600 mb-2">🧠 Smart Conversations</h3>
              <p className="text-sm text-gray-600">ChatGPT-powered contextual responses</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-200">
              <h3 className="font-semibold text-purple-600 mb-2">🖱️ Browser Control</h3>
              <p className="text-sm text-gray-600">Voice commands that control the interface</p>
            </div>
          </div>
          
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
            <h3 className="font-semibold text-yellow-800 mb-2">Try These Voice Commands:</h3>
            <div className="text-sm text-yellow-700 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>"Go to dashboard"</div>
              <div>"Add a search panel"</div>
              <div>"Make this bigger"</div>
              <div>"Search for cooking videos"</div>
              <div>"Save this layout"</div>
              <div>"Tell me about features"</div>
            </div>
          </div>
        </div>
        
        <EnhancedAITourGuide />
        
        <div className="mt-8 text-center">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="font-semibold text-gray-800 mb-4">Technical Implementation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-blue-600 mb-2">Voice Pipeline</h4>
                <p className="text-gray-600">
                  Speech Recognition → Intent Analysis → Action Execution → ElevenLabs TTS Response
                </p>
              </div>
              <div>
                <h4 className="font-medium text-green-600 mb-2">AI Integration</h4>
                <p className="text-gray-600">
                  OpenAI ChatGPT for conversation + Custom intent recognition for browser commands
                </p>
              </div>
              <div>
                <h4 className="font-medium text-purple-600 mb-2">Browser Control</h4>
                <p className="text-gray-600">
                  BrowserMCP-style commands for real-time UI manipulation and navigation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}