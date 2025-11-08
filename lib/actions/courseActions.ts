'use server'

import prisma from '@/lib/api/prisma'

export async function getLatestCourse() {
    try {
        const course = await prisma.course.findFirst({
            where: { status: 'completed' },
            orderBy: { createdAt: 'desc' },
            include: {
                subtopics: {
                    orderBy: { createdAt: 'asc' },
                    include: {
                        concepts: true,
                        videos: true,
                        articles: true,
                    },
                },
            },
        })

        if (!course) {
            return { error: 'No courses found' }
        }

        return { course }
    } catch (error) {
        console.error('Error fetching course:', error)
        return { error: 'Failed to fetch course' }
    }
}

export async function getCourseById(courseId: string) {
    try {
        const course = await prisma.course.findUnique({
            where: { id: courseId },
            include: {
                subtopics: {
                    orderBy: { createdAt: 'asc' },
                    include: {
                        concepts: true,
                        videos: true,
                        articles: true,
                    },
                },
            },
        })

        if (!course) {
            return { error: 'Course not found' }
        }

        return { course }
    } catch (error) {
        console.error('Error fetching course:', error)
        return { error: 'Failed to fetch course' }
    }
}
