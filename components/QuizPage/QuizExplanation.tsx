"use client";

interface QuizExplanationProps {
  explanation: string;
  isCorrect: boolean;
}

export default function QuizExplanation({
  explanation,
  isCorrect,
}: QuizExplanationProps) {
  return (
    <div
      className={`mt-5 p-5 rounded-lg border-2 animate-fade-in ${
        isCorrect
          ? "bg-emerald-500/10 border-emerald-500/50"
          : "bg-red-500/10 border-red-500/50"
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isCorrect ? "bg-emerald-500" : "bg-red-500"
          }`}
        >
          {isCorrect ? (
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <p
            className={`font-bold text-lg mb-2 ${
              isCorrect ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {isCorrect ? "Correct!" : "Incorrect"}
          </p>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            {explanation}
          </p>
        </div>
      </div>
    </div>
  );
}
