import AITourGuide from '@/components/ai-tour-guide';

export default function AITourPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            NEWTUBE AI Tour Guide
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the future of streaming with our AI-powered voice guide. 
            Speak naturally to discover features, customize your layout, and get started with NEWTUBE.
          </p>
          <div className="mt-4 p-4 bg-blue-100 rounded-lg max-w-md mx-auto">
            <p className="text-sm text-blue-800">
              🎤 <strong>Voice MVP:</strong> Click "Start Voice" and try saying:
              <br />• "Tell me about NEWTUBE features"
              <br />• "How do I create a custom layout?"
              <br />• "I'm interested in technology videos"
            </p>
          </div>
        </div>
        
        <AITourGuide />
        
        <div className="mt-8 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">🚀 AI Integration MVP Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-green-50 rounded">
                <strong>✅ Voice Input</strong>
                <br />Web Speech API
              </div>
              <div className="p-3 bg-green-50 rounded">
                <strong>✅ AI Responses</strong>
                <br />ChatGPT Integration
              </div>
              <div className="p-3 bg-green-50 rounded">
                <strong>✅ Voice Output</strong>
                <br />Browser TTS
              </div>
            </div>
            <p className="mt-4 text-gray-600">
              This MVP demonstrates the complete voice → AI → voice flow working live!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}