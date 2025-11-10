import { z } from "zod";



export const TopicBreakdownSchema = z.object({
  mainTopic: z.string(),
  imageUrl: z.string(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  subtopics: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      searchTerms: z.array(z.string()),
      difficulty: z.enum(['beginner', 'intermediate', 'advanced'])
    })
  )
});


export type TopicBreakdown = z.infer<typeof TopicBreakdownSchema>;