interface ActionButtonsProps {
  hasQuiz: boolean;
  isCompleted: boolean;
  onTakeQuiz: () => void;
  onMarkAsComplete: () => void;
}

export default function ActionButtons({
  hasQuiz,
  isCompleted,
  onTakeQuiz,
  onMarkAsComplete,
}: ActionButtonsProps) {
  return (
    <div className="mb-8 sm:mb-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      {hasQuiz && (
        <button
          onClick={onTakeQuiz}
          className="w-full py-3.5 sm:py-4 px-5 sm:px-6 bg-gray-900 hover:bg-gray-800 border-2 border-emerald-500 hover:border-emerald-400 text-emerald-400 hover:text-emerald-300 font-bold text-sm sm:text-base rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/20 cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          <span>Take Quiz</span>
        </button>
      )}

      <button
        onClick={onMarkAsComplete}
        className={`w-full py-3.5 sm:py-4 px-5 sm:px-6 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
          isCompleted
            ? "bg-gray-800 border-2 border-emerald-500/50 text-emerald-400 hover:bg-gray-700"
            : "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
        } ${!hasQuiz ? "sm:col-span-2" : ""}`}
      >
        {isCompleted ? (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Completed</span>
          </>
        ) : (
          <>
            <span>Mark as Complete</span>
            <svg
              className="w-5 h-5"
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
          </>
        )}
      </button>
    </div>
  );
}
