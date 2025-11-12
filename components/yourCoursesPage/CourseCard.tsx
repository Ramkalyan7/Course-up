"use client";

import { useRouter } from "next/navigation";
import { CompletionBadge } from "./CompletionBadge";
import { CourseThumbnail } from "./CourseThumbnail";
import { CourseContent } from "./CourseContent";

type CourseCardProps = {
  course: {
    id: string;
    mainTopic: string;
    description: string;
    imageUrl: string;
    progress: { id: string }[];
    _count: { subtopics: number };
  };
  index: number;
};

export function CourseCard({ course, index }: CourseCardProps) {
  const router = useRouter();
  const progressPercentage = Math.ceil((course.progress.length / course._count.subtopics) * 100);
  const isCourseCompleted = course._count.subtopics === course.progress.length;

  return (
    <div
      className="group relative animate-fade-in cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => router.push(`/course/${course.id}`)}
    >
      {isCourseCompleted && <CompletionBadge />}
      
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-800 hover:border-emerald-500/50 transition-all duration-500 active:scale-[0.98] sm:hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20">
        <CourseThumbnail 
          imageUrl={course.imageUrl}
          mainTopic={course.mainTopic}
          progressPercentage={progressPercentage}
          completedModules={course.progress.length}
          totalModules={course._count.subtopics}
        />
        
        <CourseContent
          mainTopic={course.mainTopic}
          description={course.description}
          isCourseCompleted={isCourseCompleted}
          courseId={course.id}
        />
      </div>
    </div>
  );
}
