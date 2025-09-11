import { NextRequest, NextResponse } from 'next/server';
import { getVoiceService } from '../../../../../services/voice.service';
import { getAudioService } from '../../../../../services/audio.service';

interface RouteParams {
  params: {
    messageId: string;
  };
}

/**
 * GET /api/voice/stream/[messageId] - Stream audio chunks for a message
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { messageId } = params;

  if (!messageId) {
    return NextResponse.json({ 
      error: 'Message ID is required' 
    }, { status: 400 });
  }

  try {
    const voiceService = getVoiceService();
    const audioService = getAudioService();

    // Check if stream exists and is active
    // For MVP, we'll create a simple streaming response
    // In production, this would check against active streams storage
    
    const headers = new Headers({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control',
    });

    // Create a readable stream for Server-Sent Events
    const stream = new ReadableStream({
      start(controller) {
        // Send initial connection event
        const encoder = new TextEncoder();
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({
          type: 'stream_start',
          messageId,
          timestamp: Date.now()
        })}\n\n`));

        // For MVP, simulate streaming by sending status updates
        // In production, this would stream actual audio chunks
        let chunkCount = 0;
        const interval = setInterval(() => {
          chunkCount++;
          
          const event = {
            type: 'audio_progress',
            messageId,
            progress: Math.min(chunkCount * 10, 100),
            timestamp: Date.now()
          };

          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));

          if (chunkCount >= 10) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({
              type: 'stream_complete',
              messageId,
              timestamp: Date.now()
            })}\n\n`));
            
            clearInterval(interval);
            controller.close();
          }
        }, 100);

        // Handle client disconnect
        request.signal.addEventListener('abort', () => {
          clearInterval(interval);
          controller.close();
        });
      }
    });

    return new Response(stream, { headers });

  } catch (error) {
    console.error(`Streaming error for message ${messageId}:`, error);
    
    return NextResponse.json({
      error: 'Streaming failed',
      messageId,
      details: error.message || 'Unknown streaming error'
    }, { status: 500 });
  }
}

/**
 * DELETE /api/voice/stream/[messageId] - Cancel an active stream
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { messageId } = params;

  if (!messageId) {
    return NextResponse.json({ 
      error: 'Message ID is required' 
    }, { status: 400 });
  }

  try {
    const voiceService = getVoiceService();
    const cancelled = voiceService.cancelStream(messageId);

    if (cancelled) {
      return NextResponse.json({
        success: true,
        message: `Stream ${messageId} cancelled successfully`,
        messageId
      });
    } else {
      return NextResponse.json({
        success: false,
        message: `Stream ${messageId} not found or already completed`,
        messageId
      }, { status: 404 });
    }

  } catch (error) {
    console.error(`Error cancelling stream ${messageId}:`, error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to cancel stream',
      messageId,
      details: error.message
    }, { status: 500 });
  }
}

/**
 * POST /api/voice/stream/[messageId] - Update stream configuration
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  const { messageId } = params;

  if (!messageId) {
    return NextResponse.json({ 
      error: 'Message ID is required' 
    }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { action, ...config } = body;

    switch (action) {
      case 'pause':
        // Pause streaming (MVP: log action)
        console.log(`Pausing stream ${messageId}`);
        return NextResponse.json({
          success: true,
          message: `Stream ${messageId} paused`,
          messageId
        });

      case 'resume':
        // Resume streaming (MVP: log action)
        console.log(`Resuming stream ${messageId}`);
        return NextResponse.json({
          success: true,
          message: `Stream ${messageId} resumed`,
          messageId
        });

      case 'update_quality':
        // Update streaming quality (MVP: log action)
        console.log(`Updating quality for stream ${messageId}:`, config);
        return NextResponse.json({
          success: true,
          message: `Quality updated for stream ${messageId}`,
          messageId,
          newConfig: config
        });

      default:
        return NextResponse.json({
          error: `Unknown action: ${action}`,
          validActions: ['pause', 'resume', 'update_quality']
        }, { status: 400 });
    }

  } catch (error) {
    console.error(`Error updating stream ${messageId}:`, error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to update stream',
      messageId,
      details: error.message
    }, { status: 500 });
  }
}