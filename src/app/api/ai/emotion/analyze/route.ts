import { NextRequest, NextResponse } from 'next/server';
import { EmotionAnalysisService } from '../../../../../services/emotion-analysis.service';
import { SSMLGeneratorService } from '../../../../../services/ssml-generator.service';
import { EmotionalConsistencyService } from '../../../../../services/emotional-consistency.service';
import { EmotionType } from '../../../../../types/emotion.types';

// Initialize services
const emotionAnalysis = new EmotionAnalysisService();
const ssmlGenerator = new SSMLGeneratorService();
const emotionalConsistency = new EmotionalConsistencyService();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      text, 
      sessionId,
      userId,
      useAI = true,
      generateSSML = false,
      targetEmotion
    } = body;

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const startTime = Date.now();
    
    // Analyze emotions
    let emotions = await emotionAnalysis.analyzeText(text, useAI);
    
    // Override with target emotion if specified
    if (targetEmotion) {
      emotions.primaryEmotion = targetEmotion as EmotionType;
      emotions.reasoning = `Emotion manually set to ${targetEmotion}. ${emotions.reasoning}`;
    }

    // Generate SSML if requested
    let ssml = null;
    if (generateSSML) {
      ssml = await ssmlGenerator.generateSSML(text, emotions);
    }

    // Get voice parameters
    const voiceParams = emotionAnalysis.mapToVoiceParameters(emotions);

    // Get conversation context if session provided
    let conversationContext = null;
    if (sessionId) {
      conversationContext = emotionalConsistency.getConversationState(sessionId);
    }

    const processingTime = Date.now() - startTime;

    const response = {
      text,
      emotions: {
        primary: emotions.primaryEmotion,
        secondary: emotions.secondaryEmotions,
        confidence: emotions.confidence,
        sentiment: emotions.sentiment,
        intensity: emotions.intensity,
        reasoning: emotions.reasoning
      },
      voiceParameters: voiceParams,
      ssml,
      processingTime,
      conversationContext: conversationContext ? {
        dominantEmotion: conversationContext.dominantEmotion,
        emotionalStability: conversationContext.emotionalStability,
        userEngagement: conversationContext.userEngagement,
        adaptationStrategy: conversationContext.adaptationStrategy,
        conversationLength: conversationContext.emotionalJourney.length
      } : null,
      metadata: {
        emotionalMarkers: emotionAnalysis.identifyEmotionalMarkers(text),
        analysisMethod: useAI ? 'AI-enhanced' : 'rule-based',
        timestamp: new Date().toISOString()
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error in emotion analysis:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (sessionId) {
      // Get conversation state for specific session
      const conversationState = emotionalConsistency.getConversationState(sessionId);
      
      if (!conversationState) {
        return NextResponse.json({ error: 'Session not found' }, { status: 404 });
      }

      return NextResponse.json({
        sessionId,
        state: {
          dominantEmotion: conversationState.dominantEmotion,
          emotionalStability: conversationState.emotionalStability,
          userEngagement: conversationState.userEngagement,
          adaptationStrategy: conversationState.adaptationStrategy,
          conversationLength: conversationState.emotionalJourney.length,
          lastInteraction: conversationState.lastInteraction
        },
        recentEmotions: conversationState.emotionalJourney.slice(-5) // Last 5 emotions
      });
    }

    // Get overall emotion statistics
    const stats = emotionalConsistency.getEmotionalStats();
    const cacheStats = emotionAnalysis.getCacheStats();

    return NextResponse.json({
      systemStats: {
        activeConversations: emotionalConsistency.getActiveConversations(),
        totalConversations: stats.totalConversations,
        averageStability: stats.averageStability,
        averageEngagement: stats.averageEngagement,
        emotionDistribution: stats.emotionDistribution
      },
      cacheStats,
      supportedEmotions: [
        'happy', 'excited', 'curious', 'helpful', 'calm', 
        'enthusiastic', 'confident', 'surprised', 'thoughtful', 'encouraging'
      ],
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error getting emotion stats:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const clearCache = searchParams.get('clearCache') === 'true';

    if (sessionId) {
      // Clear specific conversation
      emotionalConsistency.clearConversation(sessionId);
      return NextResponse.json({ 
        message: `Conversation ${sessionId} cleared successfully` 
      });
    }

    if (clearCache) {
      // Clear emotion analysis cache
      emotionAnalysis.clearCache();
      return NextResponse.json({ 
        message: 'Emotion analysis cache cleared successfully' 
      });
    }

    return NextResponse.json({ 
      error: 'Please specify sessionId or clearCache=true parameter' 
    }, { status: 400 });

  } catch (error) {
    console.error('Error clearing emotion data:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}