import { generateCompleteCourseWithStream } from '@/lib/services/course';
import { getCurrentUser } from '@/lib/session/serverSession';
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

        const user = await getCurrentUser()
        const encoder = new TextEncoder();

        const stream = new ReadableStream({
            async start(controller) {

                await generateCompleteCourseWithStream(topic, user?.id || "", (progress) => {
                    controller.enqueue(
                        encoder.encode(JSON.stringify(progress) + '\n')
                    );
                });

                controller.close();

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
