"use client";

import { useRouter } from "next/navigation";

interface QuizNavbarProps {
  title: string | null;
  score: {
    correct: number;
    wrong: number;
    total: number;
  };
  allQuestionsSubmitted: boolean;
}

export default function QuizNavbar({
  title,
  score,
  allQuestionsSubmitted,
}: QuizNavbarProps) {
  const router = useRouter();
  const percentage = allQuestionsSubmitted
    ? Math.round((score.correct / score.total) * 100)
    : 0;

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 border-b border-emerald-500/20 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
        {/* Top Row - Back Button and Title */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <button
              onClick={() => router.back()}
              className="p-1.5 sm:p-2 hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0 cursor-pointer"
              aria-label="Go back"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300"
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
            <h1 className="text-base sm:text-lg md:text-xl font-bold text-gray-100 truncate">
              {title && title.length > 25
                ? `${title.substring(0, 24)}...`
                : title}
            </h1>
          </div>

          {/* Score Badges - Horizontal on all screens */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-emerald-400 font-bold text-xs sm:text-sm md:text-base">
                {score.correct}
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-red-500/10 border border-red-500/30 rounded-lg">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="text-red-400 font-bold text-xs sm:text-sm md:text-base">
                {score.wrong}
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg">
              <span className="text-gray-400 text-sm">Total:</span>
              <span className="text-gray-100 font-bold">{score.total}</span>
            </div>
          </div>
        </div>

        {/* Results Bar - Mobile Optimized */}
        {allQuestionsSubmitted && (
          <div className="animate-fade-in">
            <div
              className={`rounded-lg p-3 sm:p-4 border-2 ${
                percentage >= 70
                  ? "bg-emerald-500/10 border-emerald-500/50"
                  : percentage >= 50
                  ? "bg-yellow-500/10 border-yellow-500/50"
                  : "bg-red-500/10 border-red-500/50"
              }`}
            >
              {/* Mobile Layout - Stacked */}
              <div className="flex flex-col gap-3 sm:hidden">
                <div className="flex items-center gap-2.5">
                  <div className="flex-1">
                    <p className="text-gray-100 font-bold text-base">
                      {percentage}% Score
                    </p>
                    <p
                      className={`text-xs ${
                        percentage >= 70
                          ? "text-emerald-400"
                          : percentage >= 50
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {percentage >= 70
                        ? "Excellent Work!"
                        : percentage >= 50
                        ? "Good Effort!"
                        : "Keep Learning!"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 w-full">
                  <button
                    onClick={() => window.location.reload()}
                    className="flex-1 px-3 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-emerald-500/50 text-gray-300 hover:text-emerald-400 font-semibold rounded-lg transition-all text-xs cursor-pointer"
                  >
                    Retake
                  </button>
                  <button
                    onClick={() => router.back()}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black font-semibold rounded-lg transition-all text-xs cursor-pointer"
                  >
                    Back to Course
                  </button>
                </div>
              </div>

              {/* Desktop/Tablet Layout - Horizontal */}
              <div className="hidden sm:flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-gray-100 font-bold text-lg">
                      {percentage}% Score
                    </p>
                    <p
                      className={`text-sm ${
                        percentage >= 70
                          ? "text-emerald-400"
                          : percentage >= 50
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {percentage >= 70
                        ? "Excellent Work!"
                        : percentage >= 50
                        ? "Good Effort!"
                        : "Keep Learning!"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-emerald-500/50 text-gray-300 hover:text-emerald-400 font-semibold rounded-lg transition-all text-sm cursor-pointer"
                  >
                    Retake
                  </button>
                  <button
                    onClick={() => router.back()}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black font-semibold rounded-lg transition-all text-sm cursor-pointer"
                  >
                    Back to Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
