import { NextRequest, NextResponse } from 'next/server'
import { ConversationalOAuthService } from '@/services/conversational-oauth.service'
import { ConversationalOAuthRequest, ConversationalOAuthResponse } from '@/types/dynamic-ui'
import { logger } from '@/lib/logger'

const oauthService = new ConversationalOAuthService()

export async function POST(request: NextRequest) {
  try {
    const body: ConversationalOAuthRequest = await request.json()
    
    // Validate request
    if (!body.service || !body.context || !body.sessionId) {
      return NextResponse.json(
        { 
          error: 'Service, context, and sessionId are required',
          code: 'MISSING_REQUIRED_FIELDS' 
        },
        { status: 400 }
      )
    }

    // Validate supported platforms
    const supportedPlatforms = ['youtube', 'vimeo', 'nebula']
    if (!supportedPlatforms.includes(body.service)) {
      return NextResponse.json(
        {
          error: `Unsupported platform: ${body.service}. Supported: ${supportedPlatforms.join(', ')}`,
          code: 'UNSUPPORTED_PLATFORM'
        },
        { status: 400 }
      )
    }

    logger.info('Processing conversational OAuth request', {
      service: body.service,
      context: body.context,
      sessionId: body.sessionId,
      userId: body.userId
    })

    // Process the conversational OAuth request
    const response: ConversationalOAuthResponse = await oauthService.processOAuthRequest(body)

    logger.info('Conversational OAuth response generated', {
      success: response.success,
      requiresUserAction: response.requiresUserAction,
      sessionId: body.sessionId
    })

    return NextResponse.json(response)

  } catch (error) {
    logger.error('Error processing conversational OAuth:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process OAuth request',
        code: 'OAUTH_ERROR',
        message: 'Unable to connect to the service at this time',
        nextStep: 'Please try again or contact support',
        requiresUserAction: false,
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
    const service = searchParams.get('service')
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required', code: 'MISSING_SESSION_ID' },
        { status: 400 }
      )
    }

    // Get OAuth status for session
    const status = await oauthService.getOAuthStatus(sessionId, service || undefined)
    
    return NextResponse.json({
      sessionId,
      service,
      status,
      timestamp: Date.now()
    })

  } catch (error) {
    logger.error('Error fetching OAuth status:', error)
    
    return NextResponse.json(
      {
        error: 'Failed to fetch OAuth status',
        code: 'STATUS_ERROR'
      },
      { status: 500 }
    )
  }
}

// Handle OAuth callback
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, service, code, state, error } = body

    if (!sessionId || !service) {
      return NextResponse.json(
        { error: 'Session ID and service are required', code: 'MISSING_REQUIRED_FIELDS' },
        { status: 400 }
      )
    }

    if (error) {
      logger.warn('OAuth callback with error', { sessionId, service, error })
      
      const response: ConversationalOAuthResponse = {
        success: false,
        message: `Failed to connect to ${service}: ${error}`,
        nextStep: 'You can try connecting again or continue without this service',
        requiresUserAction: false
      }

      return NextResponse.json(response)
    }

    if (!code) {
      return NextResponse.json(
        { error: 'Authorization code is required', code: 'MISSING_AUTH_CODE' },
        { status: 400 }
      )
    }

    logger.info('Processing OAuth callback', { sessionId, service })

    // Exchange code for tokens and complete OAuth flow
    const response = await oauthService.handleOAuthCallback(sessionId, service, code, state)

    return NextResponse.json(response)

  } catch (error) {
    logger.error('Error handling OAuth callback:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to complete OAuth flow',
        code: 'CALLBACK_ERROR',
        message: 'Unable to complete the connection',
        nextStep: 'Please try connecting again',
        requiresUserAction: false
      },
      { status: 500 }
    )
  }
}