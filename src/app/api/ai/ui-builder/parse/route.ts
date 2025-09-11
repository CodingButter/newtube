// AI UI Builder API - Parse Natural Language to UI Components
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { systemPrompt, userPrompt, context } = await request.json()

    if (!systemPrompt || !userPrompt) {
      return NextResponse.json(
        { error: 'Missing required prompts' },
        { status: 400 }
      )
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    })

    const rawResponse = completion.choices[0]?.message?.content
    
    if (!rawResponse) {
      throw new Error('No response from AI')
    }

    // Parse the JSON response
    let parsedResponse
    try {
      parsedResponse = JSON.parse(rawResponse)
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError)
      
      // Fallback response
      parsedResponse = {
        components: [],
        explanation: "I'm having trouble understanding that request. Could you be more specific about what UI elements you want?",
        suggestions: [
          "Try describing specific features like 'video player' or 'search bar'",
          "Mention where you want things positioned",
          "Describe the layout you have in mind"
        ]
      }
    }

    // Validate the response structure
    if (!parsedResponse.components || !Array.isArray(parsedResponse.components)) {
      parsedResponse.components = []
    }

    if (!parsedResponse.explanation) {
      parsedResponse.explanation = "I've analyzed your request and here's what I can build for you."
    }

    if (!parsedResponse.suggestions) {
      parsedResponse.suggestions = []
    }

    return NextResponse.json(parsedResponse)

  } catch (error) {
    console.error('AI UI Builder API error:', error)
    
    return NextResponse.json(
      {
        components: [],
        explanation: "I'm experiencing some technical difficulties. Please try again in a moment.",
        suggestions: [
          "Check your internet connection",
          "Try a simpler description",
          "Refresh the page and try again"
        ],
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}