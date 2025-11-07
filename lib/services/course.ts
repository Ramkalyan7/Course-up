import { breakdownTopic, generateSubtopicContent, searchArticles } from '@/lib/api/perplexity';
import { fetchYoutubeVideos } from '@/lib/api/youtube';
import prisma from '@/lib/api/prisma';

export async function generateCompleteCourse(topic: string, userId: string) {
  try {
    console.log(`Starting course generation for topic: "${topic}"`);

    const course = await prisma.course.create({
      data: {
        mainTopic: topic,
        userId,
        status: 'generating'
      }
    });

    console.log(`Course created with ID: ${course.id}`);


    const breakdown = await breakdownTopic(topic);
    console.log(`Topic broken down into ${breakdown.subtopics.length} subtopics`);

    for (const subtopic of breakdown.subtopics) {
      try {
        console.log(`Processing subtopic: "${subtopic.title}"`);

        const content = await generateSubtopicContent(
          subtopic.title,
          subtopic.description
        );

        const [videos, articles] = await Promise.all([
          fetchYoutubeVideos(subtopic.searchTerms[0]),
          searchArticles(subtopic.searchTerms[0])
        ]);

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


        for (const [difficulty, questions] of Object.entries(content.quizzes)) {
          const quiz = await prisma.quiz.create({
            data: {
              subtopicId: dbSubtopic.id,
              difficulty
            }
          });


          await prisma.question.createMany({
            data: questions.map(q => ({
              quizId: quiz.id,
              question: q.question,
              options: q.options,
              correctIndex: q.correctAnswerIndex,
              explanation: q.explanation
            }))
          });
        }


        console.log(`Completed: "${subtopic.title}"`);
      } catch (subtopicError) {
        console.error(`Error processing subtopic "${subtopic.title}":`, subtopicError);
        // Continue with next subtopic instead of failing entire course
      }
    }

    // Marking course as completed
    await prisma.course.update({
      where: { id: course.id },
      data: { status: 'completed' }
    });


    console.log(`Course generation completed: ${course.id}`);
    return course;
  } catch (error) {
    console.error('Error while generating the course :', error);
    throw error;
  }
}
