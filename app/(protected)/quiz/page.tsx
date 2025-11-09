"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// Dummy quiz data
const dummyQuiz = {
  id: "quiz-1",
  title: "React Fundamentals Quiz",
  difficulty: "Intermediate",
  questions: [
    {
      id: "q1",
      question: "What is the purpose of useEffect hook in React?",
      options: [
        "To manage component state",
        "To handle side effects in functional components",
        "To create refs to DOM elements",
        "To optimize component rendering",
      ],
      correctIndex: 1,
      explanation: "useEffect is used to handle side effects like data fetching, subscriptions, or manually changing the DOM in React functional components. It runs after render and can be configured to run on specific dependency changes.",
    },
    {
      id: "q2",
      question: "Which hook should you use to preserve values between renders without causing re-renders?",
      options: ["useState", "useEffect", "useRef", "useMemo"],
      correctIndex: 2,
      explanation: "useRef returns a mutable ref object that persists for the full lifetime of the component. Unlike state, updating a ref doesn't cause the component to re-render, making it perfect for storing values that don't affect the UI.",
    },
    {
      id: "q3",
      question: "What does the dependency array in useEffect control?",
      options: [
        "The return value of the effect",
        "When the effect runs",
        "The cleanup function",
        "The component's props",
      ],
      correctIndex: 1,
      explanation: "The dependency array controls when the effect runs. An empty array means it runs once after mount, an array with values means it runs when those values change, and no array means it runs after every render.",
    },
    {
      id: "q4",
      question: "What is the virtual DOM in React?",
      options: [
        "A copy of the browser's DOM",
        "A lightweight JavaScript representation of the actual DOM",
        "A testing environment for React components",
        "A database for storing component state",
      ],
      correctIndex: 1,
      explanation: "The virtual DOM is a lightweight JavaScript object that represents the actual DOM. React uses it to efficiently update the UI by comparing the virtual DOM with the previous version and only updating the parts that changed.",
    },
    {
      id: "q5",
      question: "What is prop drilling in React?",
      options: [
        "Passing props through multiple component levels",
        "Creating new props dynamically",
        "Validating props with PropTypes",
        "Removing unused props",
      ],
      correctIndex: 0,
      explanation: "Prop drilling refers to the process of passing props through multiple levels of components to reach a deeply nested component. This can be avoided using Context API or state management libraries.",
    },
  ],
};

export default function QuizPage() {
  const router = useRouter();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Set<string>>(new Set());
  const [score, setScore] = useState({ correct: 0, wrong: 0, total: dummyQuiz.questions.length });

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    if (submittedQuestions.has(questionId)) return; // Don't allow changing after submission
    
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handleSubmitAnswer = (questionId: string) => {
    if (submittedQuestions.has(questionId)) return;

    const question = dummyQuiz.questions.find((q) => q.id === questionId);
    if (!question) return;

    const isCorrect = selectedAnswers[questionId] === question.correctIndex;

    setSubmittedQuestions((prev) => new Set(prev).add(questionId));
    setScore((prev) => ({
      ...prev,
      correct: prev.correct + (isCorrect ? 1 : 0),
      wrong: prev.wrong + (isCorrect ? 0 : 1),
    }));
  };

  const isQuestionSubmitted = (questionId: string) => submittedQuestions.has(questionId);
  const isAnswerCorrect = (questionId: string) => {
    const question = dummyQuiz.questions.find((q) => q.id === questionId);
    return question && selectedAnswers[questionId] === question.correctIndex;
  };

  const allQuestionsSubmitted = submittedQuestions.size === dummyQuiz.questions.length;
  const percentage = allQuestionsSubmitted ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 border-b border-emerald-500/20 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-100">{dummyQuiz.title}</h1>
              <p className="text-xs text-gray-500">{dummyQuiz.difficulty} Level</p>
            </div>
          </div>

          {/* Score Display */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-emerald-400 font-bold text-sm sm:text-base">{score.correct}</span>
            </div>
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-red-400 font-bold text-sm sm:text-base">{score.wrong}</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg">
              <span className="text-gray-400 text-sm">Total:</span>
              <span className="text-gray-100 font-bold">{score.total}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Final Result Card */}
        {allQuestionsSubmitted && (
          <div className="mb-8 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-2xl blur-xl"></div>
              <div className={`relative rounded-2xl p-6 sm:p-8 border-2 text-center ${
                percentage >= 70 
                  ? 'bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/50' 
                  : percentage >= 50
                  ? 'bg-gradient-to-br from-yellow-500/10 to-transparent border-yellow-500/50'
                  : 'bg-gradient-to-br from-red-500/10 to-transparent border-red-500/50'
              }`}>
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                  percentage >= 70 ? 'bg-emerald-500/20' : percentage >= 50 ? 'bg-yellow-500/20' : 'bg-red-500/20'
                }`}>
                  <span className="text-4xl sm:text-5xl">
                    {percentage >= 70 ? '🎉' : percentage >= 50 ? '👍' : '📚'}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-2">
                  {percentage}%
                </h2>
                <p className={`text-lg sm:text-xl mb-2 ${
                  percentage >= 70 ? 'text-emerald-400' : percentage >= 50 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {percentage >= 70 ? 'Excellent Work!' : percentage >= 50 ? 'Good Effort!' : 'Keep Learning!'}
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
        )}

        {/* Questions */}
        <div className="space-y-6">
          {dummyQuiz.questions.map((question, qIndex) => {
            const questionId = question.id;
            const selectedAnswer = selectedAnswers[questionId];
            const isSubmitted = isQuestionSubmitted(questionId);
            const isCorrect = isAnswerCorrect(questionId);

            return (
              <div
                key={questionId}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 sm:p-7 border border-gray-800 shadow-xl"
              >
                {/* Question Header */}
                <div className="flex items-start gap-3 sm:gap-4 mb-5">
                  <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center font-bold border text-sm sm:text-base ${
                    isSubmitted
                      ? isCorrect
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : 'bg-red-500/20 border-red-500 text-red-400'
                      : 'bg-gray-800 border-gray-700 text-gray-400'
                  }`}>
                    {qIndex + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-100 leading-relaxed">
                      {question.question}
                    </h3>
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-3 mb-5 pl-0 sm:pl-16">
                  {question.options.map((option, optIndex) => {
                    const isSelected = selectedAnswer === optIndex;
                    const isCorrectOption = optIndex === question.correctIndex;

                    let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all ";

                    if (isSubmitted) {
                      if (isCorrectOption) {
                        buttonClass += "border-emerald-500 bg-emerald-500/20 text-gray-100 shadow-lg shadow-emerald-500/20";
                      } else if (isSelected && !isCorrect) {
                        buttonClass += "border-red-500 bg-red-500/20 text-gray-100 shadow-lg shadow-red-500/20";
                      } else {
                        buttonClass += "border-gray-700/50 bg-black/30 text-gray-500";
                      }
                    } else {
                      if (isSelected) {
                        buttonClass += "border-emerald-500 bg-emerald-500/10 text-gray-100 shadow-lg shadow-emerald-500/20";
                      } else {
                        buttonClass += "border-gray-700 bg-black/30 text-gray-300 hover:border-emerald-500/50 hover:bg-black/50";
                      }
                    }

                    return (
                      <button
                        key={optIndex}
                        onClick={() => handleAnswerSelect(questionId, optIndex)}
                        disabled={isSubmitted}
                        className={buttonClass}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-gray-800 flex items-center justify-center font-bold text-sm">
                            {String.fromCharCode(65 + optIndex)}
                          </span>
                          <span className="flex-1 text-sm sm:text-base">{option}</span>
                          {isSubmitted && isCorrectOption && (
                            <span className="text-emerald-400 text-xl">✓</span>
                          )}
                          {isSubmitted && isSelected && !isCorrect && (
                            <span className="text-red-400 text-xl">✗</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Submit Button */}
                {!isSubmitted && selectedAnswer !== undefined && (
                  <div className="pl-0 sm:pl-16">
                    <button
                      onClick={() => handleSubmitAnswer(questionId)}
                      className="px-6 sm:px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black font-bold rounded-lg transition-all shadow-lg shadow-emerald-500/30 text-sm sm:text-base"
                    >
                      Submit Answer
                    </button>
                  </div>
                )}

                {/* Explanation */}
                {isSubmitted && (
                  <div className={`mt-5 p-5 rounded-lg border-2 animate-fade-in ${
                    isCorrect 
                      ? 'bg-emerald-500/10 border-emerald-500/50' 
                      : 'bg-red-500/10 border-red-500/50'
                  }`}>
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        isCorrect ? 'bg-emerald-500' : 'bg-red-500'
                      }`}>
                        {isCorrect ? (
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-bold text-lg mb-2 ${
                          isCorrect ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {isCorrect ? 'Correct!' : 'Incorrect'}
                        </p>
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Padding */}
        <div className="h-20" />
      </main>
    </div>
  );
}
