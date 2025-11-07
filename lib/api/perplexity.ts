import { Perplexity } from '@perplexity-ai/perplexity_ai';
import { TopicBreakdownSchema, type TopicBreakdown } from '@/lib/schemas/course';
import { SubtopicContentSchema, type SubtopicContent } from '@/lib/schemas/subtopic';


const perplexityClient = new Perplexity({
    apiKey: process.env.PERPLEXITY_API_KEY!,
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
4. If you cannot create a proper breakdown, state this clearly in the response`
            },
            {
                role: 'user',
                content: `Create a comprehensive learning curriculum for: "${topic}"

Break this into 5-10 sequential subtopics. For each subtopic provide:
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
4. Each quiz must have exactly 4 options
5. correctAnswerIndex must be 0, 1, 2, or 3`
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

5. QUIZZES: Create 3 multiple-choice questions:
   - EASY: Test basic recall/understanding
   - MEDIUM: Test application of concepts
   - HARD: Test analysis/synthesis
   
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
                            type: 'object',
                            properties: {
                                easy: {
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
                                medium: {
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
                                hard: {
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
                                }
                            },
                            required: ['easy', 'medium', 'hard']
                        }
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



