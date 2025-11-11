"use client";

import Link from "next/link";

interface CourseHeaderProps {
  courseTitle: string;
}

export default function CourseHeader({ courseTitle }: CourseHeaderProps) {

  return (
    <header className="bg-linear-to-r from-gray-900 via-gray-900 to-gray-800 border-b border-emerald-500/20 sticky top-0 left-0 right-0 z-30 py-3">
        <Link href={"/"} className="flex items-center gap-3 sm:gap-4">
          {/* Back Button */}
          <button
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors group cursor-pointer"
            aria-label="Go back"
          >
            <svg
              className="w-6 h-6 text-gray-400 group-hover:text-emerald-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <span className="text-black font-bold text-lg sm:text-xl">C</span>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
              CourseUp
            </h1>
            <p className="text-xs text-gray-400 line-clamp-1">{courseTitle}</p>
          </div>
        </Link>
    </header>
  );
}
