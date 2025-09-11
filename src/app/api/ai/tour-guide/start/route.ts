import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { preferredInterface, personality } = body;

    // Generate a simple session ID for this MVP
    const sessionId = `tour_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Simple welcome message based on personality
    const welcomeMessages = {
      professional: "Welcome to NEWTUBE. I'm your AI guide, ready to help you create your perfect streaming experience. What would you like to explore first?",
      friendly: "Hey there! Welcome to NEWTUBE! I'm your friendly AI guide, and I'm super excited to help you build an amazing personalized streaming experience. What interests you most about video content?",
      casual: "Hey! Welcome to NEWTUBE! I'm your AI buddy here to help you set up the perfect video streaming experience. What kind of videos do you love watching?"
    };

    const message = welcomeMessages[personality as keyof typeof welcomeMessages] || welcomeMessages.friendly;

    const response = {
      sessionId,
      response: {
        message,
        progressUpdate: 5,
        nextStep: 'introduction',
        actions: []
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error starting tour:', error);
    return NextResponse.json(
      { error: 'Failed to start tour' },
      { status: 500 }
    );
  }
}