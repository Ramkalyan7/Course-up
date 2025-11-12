
export interface Course {
  id: string;
  imageUrl: string;
  mainTopic: string;
  subtopics: Subtopic[];
}

export interface Subtopic {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  introduction: string;
  summary: string;
  concepts: Concept[];
  videos: Video[];
  articles: Article[];
  quizzes: Quiz[];
}

export interface Concept {
  concept: string;
  explanation: string;
  example: string;
}

export interface Video {
  title: string;
  url: string;
  thumbnailUrl: string;
  channelTitle: string;
}

export interface Article {
  title: string;
  url: string;
  snippet: string;
}

export interface Quiz {
  id: string;
  questions: Question[];
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type CourseProgress = {
  id: string;
  mainTopic: string;
  description: string;
  imageUrl: string;
  difficulty: string;
  userId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  progress: Progress[];
  _count: { subtopics: number };
};

export type Progress = {
  id: string;
  userId: string;
  courseId: string;
  subtopicId: string;
  completed: boolean;
};
