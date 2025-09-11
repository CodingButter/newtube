import { NextRequest, NextResponse } from 'next/server';

// Intent recognition for browser commands
interface BrowserAction {
  type: 'navigate' | 'click' | 'type' | 'select' | 'scroll' | 'wait';
  target?: string;
  value?: string;
  element?: string;
  ref?: string;
  url?: string;
  description?: string;
}

interface IntentAnalysis {
  intent: string;
  confidence: number;
  actions: BrowserAction[];
  response: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userMessage, currentContext = {} } = body;

    if (!userMessage) {
      return NextResponse.json({ error: 'User message is required' }, { status: 400 });
    }

    // Analyze intent and generate BrowserMCP commands
    const intentAnalysis = await analyzeIntentForBrowser(userMessage, currentContext);
    
    return NextResponse.json({
      intent: intentAnalysis.intent,
      confidence: intentAnalysis.confidence,
      actions: intentAnalysis.actions,
      response: intentAnalysis.response,
      shouldExecute: intentAnalysis.confidence > 0.7
    });

  } catch (error) {
    console.error('Error in BrowserMCP command analysis:', error);
    return NextResponse.json({ 
      error: 'Failed to analyze browser command',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function analyzeIntentForBrowser(userMessage: string, context: any): Promise<IntentAnalysis> {
  const message = userMessage.toLowerCase();
  
  // Navigation commands
  if (message.includes('go to') || message.includes('navigate to') || message.includes('show me')) {
    if (message.includes('dashboard') || message.includes('main page')) {
      return {
        intent: 'navigate_dashboard',
        confidence: 0.9,
        actions: [{
          type: 'navigate',
          url: '/dashboard',
          description: 'Navigate to main dashboard'
        }],
        response: "I'll take you to the main dashboard where you can see all your content panels."
      };
    }
    
    if (message.includes('settings') || message.includes('configuration')) {
      return {
        intent: 'navigate_settings',
        confidence: 0.9,
        actions: [{
          type: 'navigate',
          url: '/settings',
          description: 'Navigate to settings page'
        }],
        response: "Let me take you to the settings where you can customize your NEWTUBE experience."
      };
    }

    if (message.includes('search') || message.includes('find videos')) {
      return {
        intent: 'show_search',
        confidence: 0.85,
        actions: [{
          type: 'click',
          element: 'search panel button',
          target: '[data-panel-type="search"]',
          description: 'Show search panel'
        }],
        response: "I'll open the search panel so you can find videos across all platforms."
      };
    }
  }

  // Interface manipulation commands
  if (message.includes('make') && (message.includes('bigger') || message.includes('larger'))) {
    return {
      intent: 'resize_panel_larger',
      confidence: 0.8,
      actions: [{
        type: 'click',
        element: 'panel resize button',
        target: '[data-action="resize-panel"]',
        description: 'Make active panel larger'
      }],
      response: "I'll make that panel bigger for you."
    };
  }

  if (message.includes('make') && (message.includes('smaller') || message.includes('minimize'))) {
    return {
      intent: 'resize_panel_smaller',
      confidence: 0.8,
      actions: [{
        type: 'click',
        element: 'panel minimize button',
        target: '[data-action="minimize-panel"]',
        description: 'Make active panel smaller'
      }],
      response: "I'll make that panel smaller for you."
    };
  }

  if (message.includes('add') && message.includes('panel')) {
    let panelType = 'video';
    if (message.includes('search')) panelType = 'search';
    if (message.includes('recommendation')) panelType = 'recommendation';
    if (message.includes('list') || message.includes('playlist')) panelType = 'list';
    
    return {
      intent: 'add_panel',
      confidence: 0.85,
      actions: [
        {
          type: 'click',
          element: 'add panel button',
          target: '[data-action="add-panel"]',
          description: 'Click add panel button'
        },
        {
          type: 'select',
          element: 'panel type selector',
          target: '[data-testid="panel-type-select"]',
          value: panelType,
          description: `Select ${panelType} panel type`
        }
      ],
      response: `I'll add a ${panelType} panel to your layout.`
    };
  }

  // Content interaction commands
  if (message.includes('play') || message.includes('start video')) {
    return {
      intent: 'play_video',
      confidence: 0.9,
      actions: [{
        type: 'click',
        element: 'play button',
        target: '[data-action="play"], .play-button, [aria-label*="play"]',
        description: 'Click play button on video'
      }],
      response: "I'll start playing the video for you."
    };
  }

  if (message.includes('pause') || message.includes('stop video')) {
    return {
      intent: 'pause_video',
      confidence: 0.9,
      actions: [{
        type: 'click',
        element: 'pause button',
        target: '[data-action="pause"], .pause-button, [aria-label*="pause"]',
        description: 'Click pause button on video'
      }],
      response: "I'll pause the video for you."
    };
  }

  // Search commands
  if (message.includes('search for') || message.includes('find videos about')) {
    const searchQuery = extractSearchQuery(message);
    return {
      intent: 'search_content',
      confidence: 0.85,
      actions: [
        {
          type: 'click',
          element: 'search input',
          target: '[data-testid="search-input"], input[type="search"]',
          description: 'Focus search input'
        },
        {
          type: 'type',
          element: 'search input',
          target: '[data-testid="search-input"], input[type="search"]',
          value: searchQuery,
          description: `Type search query: ${searchQuery}`
        }
      ],
      response: `I'll search for "${searchQuery}" across all platforms for you.`
    };
  }

  // Layout commands
  if (message.includes('reset layout') || message.includes('default layout')) {
    return {
      intent: 'reset_layout',
      confidence: 0.8,
      actions: [{
        type: 'click',
        element: 'reset layout button',
        target: '[data-action="reset-layout"]',
        description: 'Reset to default layout'
      }],
      response: "I'll reset your layout to the default configuration."
    };
  }

  if (message.includes('save layout') || message.includes('save this layout')) {
    return {
      intent: 'save_layout',
      confidence: 0.8,
      actions: [{
        type: 'click',
        element: 'save layout button',
        target: '[data-action="save-layout"]',
        description: 'Save current layout'
      }],
      response: "I'll save your current layout so you can use it again later."
    };
  }

  // General help or unclear commands
  return {
    intent: 'general_help',
    confidence: 0.3,
    actions: [],
    response: "I can help you navigate NEWTUBE! Try saying things like 'go to dashboard', 'add a search panel', 'make this bigger', or 'search for cooking videos'. What would you like to do?"
  };
}

function extractSearchQuery(message: string): string {
  const patterns = [
    /search for (.+)/i,
    /find videos about (.+)/i,
    /look for (.+)/i,
    /show me (.+) videos/i
  ];
  
  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }
  
  return 'videos';
}

// GET endpoint to fetch available commands and intents
export async function GET() {
  return NextResponse.json({
    availableIntents: [
      'navigate_dashboard',
      'navigate_settings', 
      'show_search',
      'resize_panel_larger',
      'resize_panel_smaller',
      'add_panel',
      'play_video',
      'pause_video',
      'search_content',
      'reset_layout',
      'save_layout'
    ],
    supportedCommands: [
      "Go to dashboard",
      "Show me settings", 
      "Add a search panel",
      "Make this bigger",
      "Make this smaller",
      "Search for cooking videos",
      "Play video",
      "Pause video",
      "Reset layout",
      "Save this layout"
    ]
  });
}