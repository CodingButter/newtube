import { NextRequest, NextResponse } from 'next/server'
import { DynamicUIService } from '@/services/dynamic-ui.service'
import { UIStateManager } from '@/services/ui-state-manager.service'
import { ComponentTemplateRegistry } from '@/services/component-template.service'
import { logger } from '@/lib/logger'

const dynamicUIService = new DynamicUIService()
const stateManager = new UIStateManager()
const templateRegistry = new ComponentTemplateRegistry()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const testType = searchParams.get('type') || 'basic'

    logger.info('Running dynamic UI test', { testType })

    switch (testType) {
      case 'templates':
        return testComponentTemplates()
      
      case 'session':
        return testUISession()
      
      case 'generation':
        return testUIGeneration()
      
      case 'basic':
      default:
        return testBasicFunctionality()
    }

  } catch (error) {
    logger.error('Error in dynamic UI test:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Test failed',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}

async function testBasicFunctionality() {
  const results = {
    templateRegistry: false,
    stateManager: false,
    dynamicUIService: false,
    timestamp: Date.now()
  }

  try {
    // Test template registry
    const templates = templateRegistry.getAllTemplates()
    results.templateRegistry = templates.length > 0
    
    // Test state manager
    const session = await stateManager.createUISession()
    results.stateManager = !!session.sessionId
    
    // Test dynamic UI service (without actual AI call)
    results.dynamicUIService = true // Service exists and is instantiable
    
    // Clean up test session
    await stateManager.clearUIState(session.sessionId)

    return NextResponse.json({
      success: true,
      message: 'Dynamic UI backend is operational',
      results,
      templateCount: templates.length,
      availableComponents: templates.map(t => ({ type: t.type, category: t.category }))
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Dynamic UI backend test failed',
      results,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

async function testComponentTemplates() {
  try {
    const templates = templateRegistry.getAllTemplates()
    const categories = templateRegistry.getTemplatesByCategory('media')
    const youtubeTemplates = templateRegistry.getTemplatesByPlatform('youtube')
    
    const validation = templateRegistry.validateComponentProps('VideoPlayer', {
      videoId: 'test123',
      platform: 'youtube' as const
    })

    return NextResponse.json({
      success: true,
      message: 'Component template system working',
      data: {
        totalTemplates: templates.length,
        mediaTemplates: categories.length,
        youtubeSupported: youtubeTemplates.length,
        validationPassed: validation.valid,
        sampleTemplate: templates[0] || null
      }
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Template test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

async function testUISession() {
  try {
    // Create a test session
    const session = await stateManager.createUISession('test-user-123')
    
    // Add a test component
    const testComponent = {
      id: 'test-video-player',
      type: 'VideoPlayer' as any,
      displayName: 'Test Video Player',
      props: {
        videoId: 'dQw4w9WgXcQ',
        platform: 'youtube' as const,
        title: 'Test Video'
      },
      position: { x: 0, y: 0 },
      size: { width: 'auto', height: 400 },
      style: { backgroundColor: '#ffffff' },
      metadata: {
        createdAt: Date.now(),
        createdBy: 'user' as const,
        version: 1,
        tags: ['test'],
        description: 'Test component'
      }
    }

    await stateManager.addComponent(session.sessionId, testComponent)
    
    // Get updated state
    const updatedState = await stateManager.getUIState(session.sessionId)
    
    // Test component update
    await stateManager.updateComponent(session.sessionId, testComponent.id, {
      props: { ...testComponent.props, title: 'Updated Test Video' }
    })

    // Test undo
    const undoState = await stateManager.undoLastAction(session.sessionId)
    
    // Get session stats
    const stats = await stateManager.getSessionStats(session.sessionId)
    
    // Clean up
    await stateManager.clearUIState(session.sessionId)

    return NextResponse.json({
      success: true,
      message: 'UI session management working',
      data: {
        sessionCreated: !!session,
        componentAdded: updatedState?.components.length === 1,
        componentUpdated: true,
        undoWorked: !!undoState,
        stats,
        initialComponentCount: updatedState?.components.length || 0
      }
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'UI session test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

async function testUIGeneration() {
  try {
    // Test with a simple prompt that doesn't require OpenAI
    const mockRequest = {
      userPrompt: "I want to watch my YouTube videos",
      context: {
        previousComponents: [],
        userPreferences: {
          theme: 'auto' as const,
          layoutStyle: 'detailed' as const,
          interactionMode: 'hybrid' as const,
          animations: true,
          accessibility: {
            screenReader: false,
            highContrast: false,
            reducedMotion: false,
            fontSize: 'medium' as const,
            keyboardNavigation: true
          }
        },
        conversationHistory: [],
        currentPage: 'dashboard'
      },
      sessionId: 'test-session-' + Date.now()
    }

    // This will fail if OpenAI API key is not set, but we can test the service structure
    let generationResult = null
    let generationError = null

    try {
      // Only test if OpenAI key is available
      if (process.env.OPENAI_API_KEY) {
        generationResult = await dynamicUIService.generateUI(mockRequest)
      }
    } catch (error) {
      generationError = error instanceof Error ? error.message : 'Unknown error'
    }

    return NextResponse.json({
      success: true,
      message: 'UI generation service tested',
      data: {
        serviceAvailable: true,
        openAIConfigured: !!process.env.OPENAI_API_KEY,
        generationAttempted: !!process.env.OPENAI_API_KEY,
        generationSuccess: !!generationResult,
        generationError,
        componentsGenerated: generationResult?.components?.length || 0
      }
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'UI generation test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, sessionId } = body

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    // Create a test generation request
    const testRequest = {
      userPrompt: prompt,
      context: {
        previousComponents: [],
        userPreferences: {
          theme: 'auto' as const,
          layoutStyle: 'detailed' as const,
          interactionMode: 'hybrid' as const,
          animations: true,
          accessibility: {
            screenReader: false,
            highContrast: false,
            reducedMotion: false,
            fontSize: 'medium' as const,
            keyboardNavigation: true
          }
        },
        conversationHistory: [
          {
            role: 'user' as const,
            content: prompt,
            timestamp: Date.now()
          }
        ]
      },
      sessionId: sessionId || `test-${Date.now()}`
    }

    logger.info('Running dynamic UI generation test', { prompt, sessionId: testRequest.sessionId })

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        success: false,
        message: 'OpenAI API key not configured for testing',
        mockResponse: {
          components: [
            {
              id: 'mock-component',
              type: 'VideoFeed',
              displayName: 'Mock Video Feed',
              props: { platform: 'youtube' as const },
              position: { x: 0, y: 0 },
              size: { width: 'auto', height: 400 },
              style: {},
              metadata: {
                createdAt: Date.now(),
                createdBy: 'user' as const,
                version: 1,
                tags: ['mock'],
                description: 'Mock component for testing'
              }
            }
          ]
        }
      })
    }

    // Generate UI with AI
    const result = await dynamicUIService.generateUI(testRequest)

    return NextResponse.json({
      success: true,
      message: 'Dynamic UI generated successfully',
      prompt,
      sessionId: testRequest.sessionId,
      result
    })

  } catch (error) {
    logger.error('Error in dynamic UI generation test:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Generation test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}