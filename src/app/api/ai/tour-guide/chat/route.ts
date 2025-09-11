import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory session storage for MVP (in production, use Redis/Database)
const sessions = new Map<string, {
  step: string;
  progress: number;
  history: Array<{ role: string; content: string; timestamp: number }>;
}>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, message } = body;

    // Get or create session
    let session = sessions.get(sessionId);
    if (!session) {
      session = {
        step: 'welcome',
        progress: 5,
        history: []
      };
      sessions.set(sessionId, session);
    }

    // Add user message to history
    session.history.push({
      role: 'user',
      content: message,
      timestamp: Date.now()
    });

    // Get OpenAI API key from environment
    const openaiApiKey = process.env.OPENAI_API_KEY;
    
    if (!openaiApiKey) {
      // Fallback response if no API key
      const fallbackResponse = generateFallbackResponse(message, session);
      session.history.push({
        role: 'assistant',
        content: fallbackResponse.message,
        timestamp: Date.now()
      });
      
      return NextResponse.json({ response: fallbackResponse });
    }

    // Build context for ChatGPT
    const context = buildTourGuideContext(session, message);

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an enthusiastic AI tour guide for NEWTUBE, a revolutionary streaming platform that aggregates content from YouTube, Vimeo, and other platforms. Your job is to help users understand and set up their personalized streaming experience.

Key features to highlight:
- Custom panel-based layouts that users can design
- AI-assisted content discovery and curation  
- Aggregates videos from multiple platforms (YouTube, Vimeo, Nebula)
- Personalized recommendations
- Voice control interface
- Smart content filtering and organization

Your personality should be:
- Friendly and enthusiastic
- Helpful and patient
- Conversational and engaging
- Focused on making complex features feel simple

Keep responses under 100 words unless explaining something complex. Always guide users toward the next step in their tour experience.

Current tour progress: ${session.progress}%
Current step: ${session.step}`
          },
          {
            role: 'user',
            content: context
          }
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    });

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.statusText}`);
    }

    const openaiData = await openaiResponse.json();
    const aiMessage = openaiData.choices[0]?.message?.content || 'I apologize, I\'m having trouble responding right now.';

    // Update session progress based on conversation
    const progressUpdate = calculateProgress(message, session);
    const nextStep = determineNextStep(message, session);

    session.progress = progressUpdate;
    session.step = nextStep;
    session.history.push({
      role: 'assistant',
      content: aiMessage,
      timestamp: Date.now()
    });

    const response = {
      message: aiMessage,
      progressUpdate,
      nextStep,
      actions: generateActions(message, session)
    };

    return NextResponse.json({ response });

  } catch (error) {
    console.error('Error in tour guide chat:', error);
    
    // Fallback response on error
    const fallbackResponse = {
      message: "I'm having trouble connecting right now, but I'm here to help! NEWTUBE is an amazing streaming platform that lets you create custom layouts and discover content from multiple sources. Could you try asking your question again?",
      progressUpdate: 10,
      nextStep: 'introduction',
      actions: []
    };

    return NextResponse.json({ response: fallbackResponse });
  }
}

function buildTourGuideContext(session: any, currentMessage: string): string {
  const recentHistory = session.history.slice(-4);
  let context = `User just said: "${currentMessage}"\n\n`;
  
  if (recentHistory.length > 0) {
    context += 'Recent conversation:\n';
    recentHistory.forEach((msg: any) => {
      context += `${msg.role}: ${msg.content}\n`;
    });
  }
  
  context += `\nPlease respond as their helpful NEWTUBE tour guide. Guide them through understanding the platform's features and help them get excited about creating their personalized streaming experience.`;
  
  return context;
}

function calculateProgress(message: string, session: any): number {
  const currentProgress = session.progress;
  const messageLower = message.toLowerCase();
  
  // Simple progress calculation based on keywords
  if (messageLower.includes('feature') || messageLower.includes('what') || messageLower.includes('how')) {
    return Math.min(currentProgress + 15, 100);
  }
  if (messageLower.includes('layout') || messageLower.includes('customize') || messageLower.includes('create')) {
    return Math.min(currentProgress + 20, 100);
  }
  if (messageLower.includes('video') || messageLower.includes('content') || messageLower.includes('watch')) {
    return Math.min(currentProgress + 10, 100);
  }
  if (messageLower.includes('interested') || messageLower.includes('like') || messageLower.includes('love')) {
    return Math.min(currentProgress + 25, 100);
  }
  
  return Math.min(currentProgress + 5, 100);
}

function determineNextStep(message: string, session: any): string {
  const messageLower = message.toLowerCase();
  const currentStep = session.step;
  
  if (messageLower.includes('layout') || messageLower.includes('customize')) {
    return 'layout_building';
  }
  if (messageLower.includes('interested') || messageLower.includes('like') || messageLower.includes('love')) {
    return 'interest_discovery';
  }
  if (messageLower.includes('feature') || messageLower.includes('what can')) {
    return 'feature_explanation';
  }
  if (messageLower.includes('done') || messageLower.includes('finished') || messageLower.includes('complete')) {
    return 'completed';
  }
  
  // Progress through steps naturally
  const stepProgression = {
    'welcome': 'introduction',
    'introduction': 'interest_discovery',
    'interest_discovery': 'feature_explanation',
    'feature_explanation': 'layout_building',
    'layout_building': 'personalization',
    'personalization': 'completed'
  };
  
  return stepProgression[currentStep as keyof typeof stepProgression] || currentStep;
}

function generateActions(message: string, session: any): any[] {
  const messageLower = message.toLowerCase();
  const actions = [];
  
  if (messageLower.includes('show') || messageLower.includes('see')) {
    actions.push({
      type: 'highlight',
      target: 'main-interface',
      delay: 1000
    });
  }
  
  if (messageLower.includes('layout') || messageLower.includes('customize')) {
    actions.push({
      type: 'show',
      target: 'layout-builder',
      delay: 500
    });
  }
  
  return actions;
}

function generateFallbackResponse(message: string, session: any) {
  const messageLower = message.toLowerCase();
  
  if (messageLower.includes('feature') || messageLower.includes('what')) {
    return {
      message: "NEWTUBE has amazing features! You can create custom panel layouts, get AI-powered recommendations, and stream content from YouTube, Vimeo, and more. What interests you most - the custom layouts or the content discovery?",
      progressUpdate: Math.min(session.progress + 15, 100),
      nextStep: 'feature_explanation',
      actions: []
    };
  }
  
  if (messageLower.includes('layout') || messageLower.includes('customize')) {
    return {
      message: "Great question! With NEWTUBE, you can design your own streaming interface. Imagine placing your video player exactly where you want it, with search panels, recommendations, and playlists arranged just for you. Would you like me to show you how?",
      progressUpdate: Math.min(session.progress + 20, 100),
      nextStep: 'layout_building',
      actions: []
    };
  }
  
  return {
    message: "I love your enthusiasm! NEWTUBE is all about giving you control over your streaming experience. Instead of being stuck with one layout, you create your perfect setup. What would you like to explore first - the features or how to get started?",
    progressUpdate: Math.min(session.progress + 10, 100),
    nextStep: 'introduction',
    actions: []
  };
}