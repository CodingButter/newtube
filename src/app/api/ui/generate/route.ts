import { NextRequest, NextResponse } from 'next/server'
import { DynamicUIService } from '@/services/dynamic-ui.service'
import { DynamicComponentRequest, DynamicUIResponse } from '@/types/dynamic-ui'
import { logger } from '@/lib/logger'

const dynamicUIService = new DynamicUIService()

export async function POST(request: NextRequest) {
  try {
    const body: DynamicComponentRequest = await request.json()
    
    // Validate request
    if (!body.userPrompt || body.userPrompt.trim().length === 0) {
      return NextResponse.json(
        { 
          error: 'User prompt is required',
          code: 'MISSING_PROMPT' 
        },
        { status: 400 }
      )
    }

    logger.info('Generating dynamic UI', { 
      prompt: body.userPrompt,
      sessionId: body.sessionId,
      userId: body.userId 
    })

    // Generate dynamic UI through AI
    const startTime = Date.now()
    const uiResponse: DynamicUIResponse = await dynamicUIService.generateUI(body)
    const processingTime = Date.now() - startTime

    // Add processing time to metadata
    uiResponse.metadata.processingTime = processingTime

    logger.info('Dynamic UI generated successfully', {
      componentCount: uiResponse.components.length,
      processingTime,
      sessionId: body.sessionId
    })

    return NextResponse.json(uiResponse)

  } catch (error) {
    logger.error('Error generating dynamic UI', error)
    
    return NextResponse.json(
      {
        error: 'Failed to generate UI',
        code: 'GENERATION_ERROR',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required', code: 'MISSING_SESSION_ID' },
        { status: 400 }
      )
    }

    // Get current UI state for session
    const currentState = await dynamicUIService.getUIState(sessionId)
    
    if (!currentState) {
      return NextResponse.json(
        { error: 'Session not found', code: 'SESSION_NOT_FOUND' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      sessionId,
      components: currentState.components,
      layout: currentState.currentLayout,
      lastUpdate: currentState.lastUpdate,
      preferences: currentState.preferences
    })

  } catch (error) {
    logger.error('Error fetching UI state', error)
    
    return NextResponse.json(
      {
        error: 'Failed to fetch UI state',
        code: 'FETCH_ERROR'
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, components, layout, action } = body

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required', code: 'MISSING_SESSION_ID' },
        { status: 400 }
      )
    }

    logger.info('Updating UI state', { sessionId, action })

    // Update UI state
    const updatedState = await dynamicUIService.updateUIState(sessionId, {
      components,
      layout,
      action,
      timestamp: Date.now()
    })

    return NextResponse.json({
      success: true,
      sessionId,
      updatedAt: updatedState.lastUpdate
    })

  } catch (error) {
    logger.error('Error updating UI state', error)
    
    return NextResponse.json(
      {
        error: 'Failed to update UI state',
        code: 'UPDATE_ERROR'
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required', code: 'MISSING_SESSION_ID' },
        { status: 400 }
      )
    }

    logger.info('Clearing UI session', { sessionId })

    await dynamicUIService.clearUIState(sessionId)

    return NextResponse.json({
      success: true,
      message: 'UI session cleared'
    })

  } catch (error) {
    logger.error('Error clearing UI session', error)
    
    return NextResponse.json(
      {
        error: 'Failed to clear UI session',
        code: 'CLEAR_ERROR'
      },
      { status: 500 }
    )
  }
}