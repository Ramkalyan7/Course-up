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
                        quizzes: {
                            include: {
                                questions: true
                            }
                        }
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
                        quizzes: {
                            include: {
                                questions: true
                            }
                        }
                    },
                },
                progress: {
                    where: {
                        courseId: courseId,
                    },
                    select: {
                        subtopicId: true,
                        completed: true
                    }
                }
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


export async function SetProgress(
    userId: string,
    courseId: string,
    subtopicId: string,
    status: boolean
) {
    try {
        await prisma.progress.upsert({
            where: {
                userId_courseId_subtopicId: {
                    userId: userId,
                    courseId: courseId,
                    subtopicId: subtopicId,
                },
            },
            create: {
                userId: userId,
                courseId: courseId,
                subtopicId: subtopicId,
                completed: status,
            },
            update: {
                completed: status,
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Error while updating course progress", error);
        return { error: "Failed to update progress" };
    }
}


export const getUserProgress = async (userId: string) => {
    const courses = await prisma.course.findMany({
        where: {
            progress: {
                some: {
                    userId: userId,
                },
            },
        },
        include: {
            progress: {
                where: {
                    userId: userId,
                    completed: true,
                },
            },
            _count: {
                select: {
                    subtopics: true,
                },
            },
        },
       
        orderBy: {
            updatedAt: "desc",
        },
    });

    return courses;
}

