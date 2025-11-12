"use client";

import QuizOption from "./QuizOption";
import QuizExplanation from "./QuizExplanation";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizQuestionProps {
  question: Question;
  qIndex: number;
  selectedAnswer: number | undefined;
  isSubmitted: boolean;
  isCorrect: boolean;
  onAnswerSelect: (answerIndex: number) => void;
  onSubmit: () => void;
}

export default function QuizQuestion({
  question,
  qIndex,
  selectedAnswer,
  isSubmitted,
  isCorrect,
  onAnswerSelect,
  onSubmit,
}: QuizQuestionProps) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 sm:p-7 border border-gray-800 shadow-xl">
      {/* Question Header */}
      <div className="flex items-start gap-3 sm:gap-4 mb-5">
        <div
          className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center font-bold border text-sm sm:text-base ${
            isSubmitted
              ? isCorrect
                ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                : "bg-red-500/20 border-red-500 text-red-400"
              : "bg-gray-800 border-gray-700 text-gray-400"
          }`}
        >
          {qIndex + 1}
        </div>
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-100 leading-relaxed">{question.question}</h3>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-5 pl-0 sm:pl-16">
        {question.options.map((option, optIndex) => (
          <QuizOption
            key={optIndex}
            option={option}
            optIndex={optIndex}
            isSelected={selectedAnswer === optIndex}
            isSubmitted={isSubmitted}
            isCorrectOption={optIndex === question.correctIndex}
            isCorrect={isCorrect}
            onSelect={() => onAnswerSelect(optIndex)}
          />
        ))}
      </div>

      {/* Submit Button */}
      {!isSubmitted && selectedAnswer !== undefined && (
        <div className="pl-0 sm:pl-16">
          <button
            onClick={onSubmit}
            className="px-6 sm:px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black font-bold rounded-lg transition-all shadow-lg shadow-emerald-500/30 text-sm sm:text-base cursor-pointer"
          >
            Submit Answer
          </button>
        </div>
      )}

      {/* Explanation */}
      {isSubmitted && <QuizExplanation explanation={question.explanation} isCorrect={isCorrect} />}
    </div>
  );
}
