import { generateCompleteCourse } from '@/lib/services/course';
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

        generateCompleteCourse(topic, userId).catch(error => {
            console.error('Background course generation failed:', error);
        });

        // Return immediately
        return NextResponse.json(
            {
                message: 'Course generation started',
                status: 'generating'
            },
            { status: 202 }
        );
    } catch (error) {
        console.error('Error in POST /api/courses/generate:', error);
        return NextResponse.json(
            { error: 'Failed to start course generation' },
            { status: 500 }
        );
    }
}
