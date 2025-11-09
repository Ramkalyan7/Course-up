import { breakdownTopic, generateSubtopicContent, searchArticles } from '@/lib/api/perplexity';
import { fetchYoutubeVideos } from '@/lib/api/youtube';
import prisma from '@/lib/api/prisma';
import { ProgressUpdate } from '@/lib/types/progress';

export async function generateCompleteCourseWithStream(
    topic: string,
    userId: string,
    onProgress: (data: ProgressUpdate) => void
) {
    try {
        onProgress({
            status: 'in_progress',
            message: 'Starting to create your course...'
        });


        onProgress({
            status: 'in_progress',
            message: `Breaking down "${topic}" into modules...`
        });

        const breakdown = await breakdownTopic(topic);

        const course = await prisma.course.create({
            data: {
                mainTopic: topic,
                imageUrl: breakdown.imageUrl,
                userId, status: 'generating'
            }
        });

        onProgress({
            status: 'in_progress',
            message: `✅ Divided into ${breakdown.subtopics.length} learning modules`
        });

        for (let i = 0; i < breakdown.subtopics.length; i++) {
            const subtopic = breakdown.subtopics[i];

            onProgress({
                status: 'in_progress',
                message: `[${i + 1}/${breakdown.subtopics.length}] Starting: "${subtopic.title}"`
            });

            onProgress({
                status: 'in_progress',
                message: `⏳ Generating lesson content...`
            });

            const content = await generateSubtopicContent(subtopic.title, subtopic.description);

            onProgress({
                status: 'in_progress',
                message: `Created ${content.aiGeneratedContent.keyConceptsExplained.length} concepts`
            });

            onProgress({
                status: 'in_progress',
                message: `Finding videos and articles...`
            });

            const [videos, articles] = await Promise.all([
                fetchYoutubeVideos(subtopic.searchTerms[0]),
                searchArticles(subtopic.searchTerms[0])
            ]);

            onProgress({
                status: 'in_progress',
                message: `Found ${videos.length} videos & ${articles.length} articles`
            });

            onProgress({
                status: 'in_progress',
                message: `Saving to database...`
            });

            const dbSubtopic = await prisma.subtopic.create({
                data: {
                    courseId: course.id,
                    title: subtopic.title,
                    description: subtopic.description,
                    difficulty: subtopic.difficulty,
                    introduction: content.aiGeneratedContent.introduction,
                    summary: content.aiGeneratedContent.summary,
                    commonMistakes: JSON.stringify(content.aiGeneratedContent.commonMistakes)
                }
            });

            await prisma.concept.createMany({
                data: content.aiGeneratedContent.keyConceptsExplained.map(c => ({
                    subtopicId: dbSubtopic.id,
                    concept: c.concept,
                    explanation: c.explanation,
                    example: c.realWorldExample
                }))
            });

            if (videos.length > 0) {
                await prisma.youtubeVideo.createMany({
                    data: videos.map(v => ({
                        subtopicId: dbSubtopic.id,
                        videoId: v.videoId,
                        title: v.title,
                        thumbnailUrl: v.thumbnailUrl,
                        channelTitle: v.channelTitle,
                        url: v.url
                    }))
                });
            }

            if (articles.length > 0) {
                await prisma.article.createMany({
                    data: articles.map(a => ({
                        subtopicId: dbSubtopic.id,
                        url: a.url,
                        title: a.title,
                        snippet: a.snippet
                    }))
                });
            }

            const quiz = await prisma.quiz.create({
                data: { subtopicId: dbSubtopic.id }
            });

            await prisma.question.createMany({
                data: (content.quizzes).map(q => ({
                    quizId: quiz.id,
                    question: q.question,
                    options: q.options,
                    correctIndex: q.correctAnswerIndex,
                    explanation: q.explanation
                }))
            });


            onProgress({
                status: 'in_progress',
                message: `Module complete: "${subtopic.title}"`
            });
        }

        await prisma.course.update({
            where: { id: course.id },
            data: { status: 'completed' }
        });

        onProgress({
            status: 'completed',
            message: `Your course "${topic}" is ready!`
        });

        return course.id;
    } catch (error) {
        onProgress({
            status: 'completed',
            message: `Error: ${(error as Error).message}`
        });
        throw error;
    }
}
