"use client";

import { useRouter } from "next/navigation";

interface QuizResultCardProps {
  score: {
    correct: number;
    wrong: number;
    total: number;
  };
}

export default function QuizResultCard({ score }: QuizResultCardProps) {
  const router = useRouter();
  const percentage = Math.round((score.correct / score.total) * 100);

  return (
    <div className="mb-8 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-2xl blur-xl"></div>
        <div
          className={`relative rounded-2xl p-6 sm:p-8 border-2 text-center ${
            percentage >= 70
              ? "bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/50"
              : percentage >= 50
              ? "bg-gradient-to-br from-yellow-500/10 to-transparent border-yellow-500/50"
              : "bg-gradient-to-br from-red-500/10 to-transparent border-red-500/50"
          }`}
        >
          <div
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              percentage >= 70
                ? "bg-emerald-500/20"
                : percentage >= 50
                ? "bg-yellow-500/20"
                : "bg-red-500/20"
            }`}
          >
            <span className="text-4xl sm:text-5xl">
              {percentage >= 70 ? "🎉" : percentage >= 50 ? "👍" : "📚"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-2">
            {percentage}%
          </h2>
          <p
            className={`text-lg sm:text-xl mb-2 ${
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
          <p className="text-gray-400 mb-6">
            You got {score.correct} out of {score.total} questions correct
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-emerald-500/50 text-gray-300 hover:text-emerald-400 font-semibold rounded-lg transition-all"
            >
              Retake Quiz
            </button>
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black font-semibold rounded-lg transition-all shadow-lg shadow-emerald-500/30"
            >
              Back to Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
