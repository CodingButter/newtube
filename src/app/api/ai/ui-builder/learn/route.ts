// AI UI Builder Learning API - Store user feedback for continuous improvement
import { NextRequest, NextResponse } from 'next/server'

// In a production environment, this would connect to a database
// For now, we'll store learning data in memory (could be enhanced with Redis/PostgreSQL)
const learningData: Array<{
  originalIntent: any
  userFeedback: 'good' | 'bad' | 'modify'
  modifications?: any
  timestamp: Date
}> = []

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    if (!data.originalIntent || !data.userFeedback) {
      return NextResponse.json(
        { error: 'Missing required fields: originalIntent and userFeedback' },
        { status: 400 }
      )
    }

    // Store the learning data
    learningData.push({
      originalIntent: data.originalIntent,
      userFeedback: data.userFeedback,
      modifications: data.modifications,
      timestamp: new Date(data.timestamp || Date.now())
    })

    // Log learning for development
    console.log('📚 AI UI Builder Learning:', {
      intent: data.originalIntent.description,
      feedback: data.userFeedback,
      modifications: data.modifications ? Object.keys(data.modifications) : 'none'
    })

    // TODO: In production, implement:
    // 1. Store in PostgreSQL for persistence
    // 2. Analyze patterns for model improvement
    // 3. Update AI prompts based on feedback
    // 4. Create user preference profiles

    return NextResponse.json({ 
      success: true, 
      message: 'Learning data stored successfully',
      totalFeedbackCount: learningData.length
    })

  } catch (error) {
    console.error('Learning API error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Return learning analytics (for debugging/development)
    const analytics = {
      totalFeedback: learningData.length,
      feedbackBreakdown: {
        good: learningData.filter(d => d.userFeedback === 'good').length,
        bad: learningData.filter(d => d.userFeedback === 'bad').length,
        modify: learningData.filter(d => d.userFeedback === 'modify').length
      },
      recentFeedback: learningData.slice(-10).map(d => ({
        intent: d.originalIntent.description,
        feedback: d.userFeedback,
        timestamp: d.timestamp
      }))
    }

    return NextResponse.json(analytics)

  } catch (error) {
    console.error('Learning analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch learning analytics' },
      { status: 500 }
    )
  }
}