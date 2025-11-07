import { generateCompleteCourseWithStream } from '@/lib/services/course';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { topic } = await req.json();

        if (!topic || typeof topic !== 'string') {
            return NextResponse.json(
                { error: 'Invalid topic' },
                { status: 400 }
            );
        }

        const userId = 'user-123';
        const encoder = new TextEncoder();

        const stream = new ReadableStream({
            async start(controller) {
                try {
                    await generateCompleteCourseWithStream(topic, userId, (progress) => {
                        controller.enqueue(
                            encoder.encode(JSON.stringify(progress) + '\n')
                        );
                    });

                    controller.close();
                } catch (error) {
                    controller.enqueue(
                        encoder.encode(
                            JSON.stringify({
                                status: 'completed',
                                message: ` ${(error as Error).message}`
                            }) + '\n'
                        )
                    );
                    controller.close();
                }
            }
        });

        return new NextResponse(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
            }
        });
    } catch (error) {
        console.error('Error in POST /api/courses/generate:', error);
        return NextResponse.json(
            { error: 'Failed to start course generation' },
            { status: 500 }
        );
    }
}
