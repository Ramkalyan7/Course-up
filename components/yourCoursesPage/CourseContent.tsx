"use client";

import { useRouter } from "next/navigation";

type CourseContentProps = {
  mainTopic: string;
  description: string;
  isCourseCompleted: boolean;
  courseId: string;
};

export function CourseContent({ mainTopic, description, isCourseCompleted, courseId }: CourseContentProps) {
  const router = useRouter();

  return (
    <div className="p-4 sm:p-5 lg:p-6">
      <h3 className="text-base sm:text-xl font-bold text-gray-100 group-hover:text-emerald-400 transition-colors line-clamp-2 break-words overflow-hidden mb-2 sm:mb-3">
        {mainTopic}
      </h3>

      <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed break-words">
        {description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-gray-800">
        <div className={`px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
          isCourseCompleted ? "bg-emerald-500/20 text-emerald-400" : "bg-yellow-500/20 text-yellow-400"
        }`}>
          {isCourseCompleted ? "Completed" : "In Progress"}
        </div>
      </div>

      <button
        onClick={() => router.push(`/course/${courseId}`)}
        className="mt-3 sm:mt-4 w-full py-2.5 sm:py-3 bg-gray-800/50 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-600 active:from-emerald-600 active:to-emerald-700 border border-gray-700 hover:border-emerald-500 text-gray-300 hover:text-white font-semibold text-xs sm:text-base rounded-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/30 cursor-pointer touch-manipulation"
      >
        {isCourseCompleted ? "Review Course" : "Continue Learning"}
      </button>
    </div>
  );
}
