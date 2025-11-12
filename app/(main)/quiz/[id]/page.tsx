"use client";

import LoadingState from "@/components/Loading";
import QuizNavbar from "@/components/QuizPage/QuizNavbar";
import QuizQuestion from "@/components/QuizPage/QuizQuestion";
import { useRouter } from "next/navigation";
import { useQuizLogic } from "@/lib/hooks/useQuizLogic";
import { useParams, useSearchParams } from "next/navigation";

export default function QuizPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const title = searchParams.get("title");

  const {
    quiz,
    selectedAnswers,
    score,
    handleAnswerSelect,
    handleSubmitAnswer,
    isQuestionSubmitted,
    isAnswerCorrect,
    allQuestionsSubmitted,
    loading,
  } = useQuizLogic(id as string);

  if (loading) return <LoadingState />;

  return (
    <div className="min-h-screen bg-black">
      {quiz && quiz.length > 0 && (
        <QuizNavbar
          allQuestionsSubmitted={allQuestionsSubmitted}
          title={title}
          score={score}
        />
      )}

      <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        {quiz.length === 0 ? (
          <QuizEmptyState />
        ) : (
          <div className="space-y-6">
            {quiz.map((question, qIndex) => (
              <QuizQuestion
                key={question.id}
                question={question}
                qIndex={qIndex}
                selectedAnswer={selectedAnswers[question.id]}
                isSubmitted={isQuestionSubmitted(question.id)}
                isCorrect={isAnswerCorrect(question.id) || false}
                onAnswerSelect={(answerIndex) =>
                  handleAnswerSelect(question.id, answerIndex)
                }
                onSubmit={() => handleSubmitAnswer(question.id)}
              />
            ))}
          </div>
        )}

        <div className="h-20" />
      </main>
    </div>
  );
}

function QuizEmptyState() {
  const router = useRouter();

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-3">
          Quiz Not Available
        </h2>
        <p className="text-gray-400 mb-6 text-sm sm:text-base">
          This quiz could not be found or is currently unavailable. Please check
          back later or contact support if the problem persists.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-emerald-500/50 text-gray-300 hover:text-emerald-400 font-semibold rounded-lg transition-all"
          >
            Go Back
          </button>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black font-semibold rounded-lg transition-all shadow-lg shadow-emerald-500/30"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
