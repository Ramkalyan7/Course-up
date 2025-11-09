import { Perplexity } from '@perplexity-ai/perplexity_ai';
import { TopicBreakdownSchema, type TopicBreakdown } from '@/lib/schemas/course';
import { SubtopicContentSchema, type SubtopicContent } from '@/lib/schemas/subtopic';
import "dotenv/config"


const perplexityClient = new Perplexity({
    apiKey: process.env.PERPLEXITY_API_KEY,
});

export async function breakdownTopic(topic: string): Promise<TopicBreakdown> {
    const completion = await perplexityClient.chat.completions.create({
        model: 'sonar-pro',
        messages: [
            {
                role: 'system',
                content: `You are an expert course curriculum designer. Create structured learning paths by breaking complex topics into logical, sequential subtopics.

Rules:
1. Return ONLY valid JSON with no markdown formatting or explanation
2. Each subtopic must be a distinct, learnable concept
3. Order subtopics from beginner to advanced progression
4. Also give an image url representing the main topic`
            },
            {
                role: 'user',
                content: `Create a comprehensive learning curriculum for: "${topic}"

Break this into 2-8 sequential subtopics. For each subtopic provide:
- title: Clear, specific subtopic name (e.g., "Introduction to Variables" not just "Variables")
- description: 1-2 sentences explaining what learners will understand after this subtopic
- searchTerms: 2-3 specific search phrases to find quality educational content (think like a web search user)
- difficulty: beginner, intermediate, or advanced

Focus on creating a logical learning progression from foundational concepts to advanced topics.`
            }
        ],
        response_format: {
            type: 'json_schema',
            json_schema: {
                schema: {
                    type: 'object',
                    properties: {
                        mainTopic: { type: 'string' },
                        imageUrl: { type: 'string' },
                        subtopics: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    title: { type: 'string' },
                                    description: { type: 'string' },
                                    searchTerms: { type: 'array', items: { type: 'string' } },
                                    difficulty: { type: 'string', enum: ['beginner', 'intermediate', 'advanced'] }
                                },
                                required: ['title', 'description', 'searchTerms', 'difficulty']
                            }
                        }
                    },
                    required: ['mainTopic', 'subtopics']
                }
            }
        }
    });

    const content = completion.choices[0].message.content;
    const parsed = JSON.parse(content as string);
    return TopicBreakdownSchema.parse(parsed);
}


export async function generateSubtopicContent(
    subtopicTitle: string,
    subtopicDescription: string
): Promise<SubtopicContent> {
    const completion = await perplexityClient.chat.completions.create({
        model: 'sonar-pro',
        messages: [
            {
                role: 'system',
                content: `You are an expert educator creating comprehensive, engaging learning content.

Rules:
1. Return ONLY valid JSON with no markdown or extra text
2. Write in clear, simple language suitable for learners
3. Include practical, real-world examples
4. Give a quiz with 10 questions and each question has 4 options and only one correct answer , explanations for each answer`
            },
            {
                role: 'user',
                content: `Create educational content for: "${subtopicTitle}"
Context: ${subtopicDescription}

Provide:

1. INTRODUCTION (150-300 words): Explain what this topic is, why it matters, and what learners will gain

2. KEY CONCEPTS (3-5 concepts): For each concept provide:
   - concept: Name of the concept
   - explanation: Clear explanation in 100-200 words
   - realWorldExample: Practical example showing how this concept is used (50-100 words)

3. COMMON MISTAKES (2-4 mistakes): List typical errors learners make with this topic

4. SUMMARY (100-150 words): Recap the main points and key takeaways

5. QUIZZES: Create a quiz section with 10 questions divided into three difficulty levels:
   - EASY (4 questions)
   - MEDIUM (3 questions)
   - HARD (3 questions)
   
   Each question needs:
   - question: Clear, specific question
   - options: Exactly 4 choices (array of strings)
   - correctAnswerIndex: Index of correct answer (0-3)
   - explanation: Why this answer is correct (2-3 sentences)`
            }
        ],
        response_format: {
            type: 'json_schema',
            json_schema: {
                schema: {
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        aiGeneratedContent: {
                            type: 'object',
                            properties: {
                                introduction: { type: 'string' },
                                keyConceptsExplained: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            concept: { type: 'string' },
                                            explanation: { type: 'string' },
                                            realWorldExample: { type: 'string' }
                                        },
                                        required: ['concept', 'explanation', 'realWorldExample']
                                    }
                                },
                                commonMistakes: { type: 'array', items: { type: 'string' } },
                                summary: { type: 'string' }
                            },
                            required: ['introduction', 'keyConceptsExplained', 'commonMistakes', 'summary']
                        },
                        quizzes: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    question: { type: 'string' },
                                    options: { type: 'array', items: { type: 'string' } },
                                    correctAnswerIndex: { type: 'number' },
                                    explanation: { type: 'string' }
                                },
                                required: ['question', 'options', 'correctAnswerIndex', 'explanation']
                            }
                        },
                    },
                    required: ['title', 'aiGeneratedContent', 'quizzes']
                }
            }
        }
    });

    const content = completion.choices[0].message.content;
    const parsed = JSON.parse(content as string);
    return SubtopicContentSchema.parse(parsed);
}




export async function searchArticles(searchTerm: string) {
    const response = await perplexityClient.search.create({
        query: searchTerm,
        max_results: 5
    });

    return response.results.map((result) => ({
        url: result.url,
        title: result.title,
        snippet: result.snippet || 'No preview available'
    }));
}



