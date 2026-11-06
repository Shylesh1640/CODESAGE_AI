import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { validateReviewRequest, isValidLanguage, isValidReviewType } from '@/lib/validation';
import { buildSystemPrompt, buildUserPrompt } from '@/lib/prompts';
import type { ProgrammingLanguage, ReviewType } from '@/types/review';

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not configured');
      return NextResponse.json(
        { error: 'AI service is not properly configured. Please contact the administrator.' },
        { status: 500 }
      );
    }

    // Initialize OpenAI client (done here to avoid build-time errors)
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid request format. Please send valid JSON.' },
        { status: 400 }
      );
    }

    const { code, language, reviewType, context } = body;

    // Validate inputs
    const validation = validateReviewRequest(code, language, reviewType);
    if (!validation.valid) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          errors: validation.errors
        },
        { status: 400 }
      );
    }

    // Type guards
    if (!isValidLanguage(language) || !isValidReviewType(reviewType)) {
      return NextResponse.json(
        { error: 'Invalid language or review type' },
        { status: 400 }
      );
    }

    // Build prompts
    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(
      code.trim(),
      language as ProgrammingLanguage,
      reviewType as ReviewType,
      context
    );

    // Call OpenAI API with streaming
    const stream = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 4000,
    });

    // Create a readable stream for the response
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          controller.error(error);
        }
      },
    });

    // Return streaming response
    return new NextResponse(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'X-Content-Type-Options': 'nosniff',
      },
    });

  } catch (error: any) {
    console.error('API error:', error);

    // Handle specific OpenAI errors
    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'Invalid API credentials. Please check the API key configuration.' },
        { status: 500 }
      );
    }

    if (error?.status === 429) {
      return NextResponse.json(
        { error: 'API rate limit reached. Please try again in a few moments.' },
        { status: 429 }
      );
    }

    if (error?.status === 402 || error?.code === 'insufficient_quota') {
      return NextResponse.json(
        { error: 'API quota exceeded. Please check your OpenAI account.' },
        { status: 500 }
      );
    }

    // Generic error
    return NextResponse.json(
      { error: 'Unable to connect to the AI service. Please try again.' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
