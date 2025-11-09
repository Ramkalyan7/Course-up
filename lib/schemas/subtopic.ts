import { z } from 'zod';

export const SubtopicContentSchema = z.object({
  title: z.string(),
  
  aiGeneratedContent: z.object({
    introduction: z.string(),
    keyConceptsExplained: z.array(
      z.object({
        concept: z.string(),
        explanation: z.string(),
        realWorldExample: z.string()
      })
    ),
    commonMistakes: z.array(z.string()),
    summary: z.string()
  }),
  
  quizzes: z.array(
      z.object({
        question: z.string(),
        options: z.array(z.string()),
        correctAnswerIndex: z.number(),
        explanation: z.string()
      }))
});

export type SubtopicContent = z.infer<typeof SubtopicContentSchema>;
