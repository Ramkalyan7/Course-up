import Image from "next/image";
import React from "react";

interface courseType {
  id: string;
  mainTopic: string;
  imageUrl: string;
  difficulty: string;
  _count: {
    subtopics: number;
  };
}

const Course = ({ course, index }: { course: courseType; index: number }) => {
  return (
    <div
      key={course.id}
      className="group relative animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-800 hover:border-emerald-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 cursor-pointer h-full">
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-linear-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Thumbnail */}
        <div className="relative h-52 bg-gray-800 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent z-10" />
          <Image
            src={course.imageUrl}
            alt={course.mainTopic}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            fill={true}
          />
          <div className="absolute top-4 right-4 z-20">
            <span
              className={`px-4 py-1.5 rounded-xl text-xs font-bold backdrop-blur-sm ${
                course.difficulty === "Beginner"
                  ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-400"
                  : course.difficulty === "Intermediate"
                  ? "bg-yellow-500/20 border border-yellow-500/50 text-yellow-400"
                  : "bg-red-500/20 border border-red-500/50 text-red-400"
              }`}
            >
              {course.difficulty}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6">
          <h3 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-emerald-400 transition-colors line-clamp-1">
            {course.mainTopic}
          </h3>
          <p className="text-gray-400 text-sm mb-5 line-clamp-2 leading-relaxed">
            course description
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-5 mb-5 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <span className="font-medium">
                {course._count.subtopics} modules
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full py-3.5 bg-gray-800/50 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-600 border border-gray-700 hover:border-emerald-500 text-gray-300 hover:text-white font-bold rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/30 flex items-center justify-center gap-2">
            <span>Start Learning</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Course;
