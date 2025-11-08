"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCourseById } from "@/lib/actions/courseActions";

interface Course {
  id: string;
  mainTopic: string;
  subtopics: Subtopic[];
}

interface Subtopic {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  introduction: string;
  summary: string;
  concepts: Concept[];
  videos: Video[];
  articles: Article[];
  quizzes: Quiz[];
}

interface Concept {
  concept: string;
  explanation: string;
  example: string;
}

interface Video {
  title: string;
  url: string;
  thumbnailUrl: string;
  channelTitle: string;
}

interface Article {
  title: string;
  url: string;
  snippet: string;
}

interface Quiz {
  id: string;
  difficulty: string;
  questions: Question[];
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export default function CoursePage() {
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<Subtopic | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});

  const fetchCourse = async () => {
    try {
      const result = await getCourseById("cmhpt2x340000tgwkfrary56j");

      if (result.error || !result.course) {
        console.error("Error:", result.error);
        setLoading(false);
        return;
      }

      setCourse(result.course as Course);
      if (result.course.subtopics.length > 0) {
        setSelectedSubtopic(result.course.subtopics[0] as Subtopic);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching course:", error);
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handleSubmitAnswer = (questionId: string) => {
    setShowResults((prev) => ({
      ...prev,
      [questionId]: true,
    }));
  };

  useEffect(() => {
    fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading your course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">📚</span>
          </div>
          <p className="text-gray-300 text-lg mb-6">Course not found</p>
          <button
            onClick={() => router.push("/")}
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-slate-950 font-semibold rounded-lg transition-all shadow-lg shadow-emerald-500/20"
          >
            Create New Course
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header with gradient */}
      <header className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border-b border-emerald-500/20 sticky top-0 z-20 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <span className="text-slate-950 font-bold text-xl">C</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                CourseUp
              </h1>
              <p className="text-xs text-gray-400">{course.mainTopic}</p>
            </div>
          </div>
          <button
            onClick={() => router.push("/")}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-emerald-500/50 text-gray-300 hover:text-emerald-400 rounded-lg transition-all text-sm font-medium"
          >
            + New Course
          </button>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto flex">
        {/* Fixed Sidebar with own scrollbar */}
        <aside className="w-80 bg-slate-900/50 backdrop-blur-sm border-r border-slate-800 h-screen sticky top-[73px] flex flex-col">
          <div className="p-5 border-b border-slate-800">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
              Course Modules
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {course.subtopics.length} modules
            </p>
          </div>

          {/* Scrollable module list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
            {course.subtopics.map((subtopic, index) => (
              <button
                key={subtopic.id}
                onClick={() => setSelectedSubtopic(subtopic)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 group ${
                  selectedSubtopic?.id === subtopic.id
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30 scale-105"
                    : "bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-emerald-500/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                      selectedSubtopic?.id === subtopic.id
                        ? "bg-slate-950/30 text-white"
                        : "bg-slate-700/50 text-gray-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-semibold text-sm mb-1 line-clamp-2 ${
                        selectedSubtopic?.id === subtopic.id
                          ? "text-white"
                          : "text-gray-200"
                      }`}
                    >
                      {subtopic.title}
                    </p>
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                        selectedSubtopic?.id === subtopic.id
                          ? "bg-slate-950/30 text-slate-200"
                          : "bg-slate-700/50 text-gray-400"
                      }`}
                    >
                      {subtopic.difficulty}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gradient-to-b from-slate-950 to-slate-900">
          {selectedSubtopic && (
            <div className="max-w-4xl mx-auto">
              {/* Module Header with gradient */}
              <div className="mb-10 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-2xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-emerald-500/20 shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-xs font-bold rounded-full uppercase tracking-wide">
                      {selectedSubtopic.difficulty}
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4 leading-tight">
                    {selectedSubtopic.title}
                  </h1>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {selectedSubtopic.description}
                  </p>
                </div>
              </div>

              {/* Introduction */}
              <section className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">📖</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-100">
                    Introduction
                  </h2>
                </div>
                <div className="bg-slate-900/70 backdrop-blur rounded-xl p-7 border border-slate-800 shadow-xl">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {selectedSubtopic.introduction}
                  </p>
                </div>
              </section>

              {/* Key Concepts with better design */}
              <section className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">💡</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-100">
                    Key Concepts
                  </h2>
                </div>
                <div className="space-y-5">
                  {selectedSubtopic.concepts.map((concept, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-7 border border-slate-700/50 hover:border-emerald-500/30 transition-all shadow-lg hover:shadow-emerald-500/10 group"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/30">
                          {index + 1}
                        </div>
                        <h3 className="text-xl font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                          {concept.concept}
                        </h3>
                      </div>
                      <p className="text-gray-300 mb-5 leading-relaxed pl-14">
                        {concept.explanation}
                      </p>
                      <div className="bg-slate-950/50 rounded-lg p-5 border-l-4 border-emerald-500 ml-14">
                        <p className="text-xs text-emerald-400 font-semibold mb-2 uppercase tracking-wide">
                          Example
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                          {concept.example}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Quizzes with improved design */}
              {selectedSubtopic.quizzes &&
                selectedSubtopic.quizzes.length > 0 && (
                  <section className="mb-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">✍️</span>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-100">
                        Practice Quiz
                      </h2>
                    </div>
                    <div className="space-y-6">
                      {selectedSubtopic.quizzes.map((quiz) => (
                        <div key={quiz.id}>
                          <div className="mb-5">
                            <span className="px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-xs font-bold rounded-full uppercase">
                              {quiz.difficulty} Level
                            </span>
                          </div>
                          <div className="space-y-6">
                            {quiz.questions.map((question, qIndex) => {
                              const questionId = question.id;
                              const selectedAnswer = selectedAnswers[questionId];
                              const showResult = showResults[questionId];
                              const isCorrect =
                                selectedAnswer === question.correctIndex;

                              return (
                                <div
                                  key={questionId}
                                  className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-7 border border-slate-700/50 shadow-xl"
                                >
                                  <div className="flex items-start gap-4 mb-5">
                                    <div className="flex-shrink-0 w-10 h-10 bg-slate-950/50 rounded-lg flex items-center justify-center text-emerald-400 font-bold border border-slate-700">
                                      {qIndex + 1}
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-100 leading-relaxed">
                                      {question.question}
                                    </h3>
                                  </div>

                                  <div className="space-y-3 mb-5 pl-14">
                                    {question.options.map((option, optIndex) => {
                                      const isSelected =
                                        selectedAnswer === optIndex;
                                      const isCorrectOption =
                                        optIndex === question.correctIndex;

                                      let buttonClass =
                                        "w-full text-left p-4 rounded-lg border-2 transition-all ";

                                      if (showResult) {
                                        if (isCorrectOption) {
                                          buttonClass +=
                                            "border-emerald-500 bg-emerald-500/20 text-gray-100 shadow-lg shadow-emerald-500/20";
                                        } else if (isSelected && !isCorrect) {
                                          buttonClass +=
                                            "border-red-500 bg-red-500/20 text-gray-100 shadow-lg shadow-red-500/20";
                                        } else {
                                          buttonClass +=
                                            "border-slate-700/50 bg-slate-950/30 text-gray-500";
                                        }
                                      } else {
                                        if (isSelected) {
                                          buttonClass +=
                                            "border-emerald-500 bg-emerald-500/10 text-gray-100 shadow-lg shadow-emerald-500/20";
                                        } else {
                                          buttonClass +=
                                            "border-slate-700 bg-slate-950/30 text-gray-300 hover:border-emerald-500/50 hover:bg-slate-950/50";
                                        }
                                      }

                                      return (
                                        <button
                                          key={optIndex}
                                          onClick={() =>
                                            !showResult &&
                                            handleAnswerSelect(
                                              questionId,
                                              optIndex
                                            )
                                          }
                                          disabled={showResult}
                                          className={buttonClass}
                                        >
                                          <div className="flex items-center gap-3">
                                            <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-sm">
                                              {String.fromCharCode(65 + optIndex)}
                                            </span>
                                            <span className="flex-1">{option}</span>
                                            {showResult && isCorrectOption && (
                                              <span className="text-emerald-400 text-xl">
                                                ✓
                                              </span>
                                            )}
                                            {showResult &&
                                              isSelected &&
                                              !isCorrect && (
                                                <span className="text-red-400 text-xl">
                                                  ✗
                                                </span>
                                              )}
                                          </div>
                                        </button>
                                      );
                                    })}
                                  </div>

                                  {!showResult && selectedAnswer !== undefined && (
                                    <div className="pl-14">
                                      <button
                                        onClick={() =>
                                          handleSubmitAnswer(questionId)
                                        }
                                        className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-slate-950 font-bold rounded-lg transition-all shadow-lg shadow-emerald-500/30"
                                      >
                                        Check Answer
                                      </button>
                                    </div>
                                  )}

                                  {showResult && (
                                    <div
                                      className={`mt-5 p-5 rounded-lg border-2 ${
                                        isCorrect
                                          ? "bg-emerald-500/10 border-emerald-500/50"
                                          : "bg-red-500/10 border-red-500/50"
                                      }`}
                                    >
                                      <p
                                        className={`font-bold mb-3 text-lg flex items-center gap-2 ${
                                          isCorrect
                                            ? "text-emerald-400"
                                            : "text-red-400"
                                        }`}
                                      >
                                        {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
                                      </p>
                                      <p className="text-gray-300 leading-relaxed">
                                        {question.explanation}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

              {/* Videos with embedded iframes */}
              {selectedSubtopic.videos.length > 0 && (
                <section className="mb-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">🎥</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-100">
                      Video Resources
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {selectedSubtopic.videos.map((video, index) => (
                      <div
                        key={index}
                        className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700/50 hover:border-emerald-500/50 transition-all shadow-lg hover:shadow-emerald-500/20"
                      >
                        <div className="relative">
                          <iframe
                            className="w-full aspect-video"
                            src={`https://www.youtube.com/embed/${
                              new URL(video.url).searchParams.get("v")
                            }`}
                            title={video.title}
                            allowFullScreen
                          ></iframe>
                        </div>
                        <div className="p-5">
                          <h3 className="font-semibold text-gray-100 mb-2 line-clamp-2 leading-snug">
                            {video.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {video.channelTitle}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Articles */}
              {selectedSubtopic.articles.length > 0 && (
                <section className="mb-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">📄</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-100">
                      Reading Materials
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {selectedSubtopic.articles.map((article, index) => (
                      <a
                        key={index}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-slate-900/70 backdrop-blur rounded-xl p-6 border border-slate-700/50 hover:border-emerald-500/50 transition-all group shadow-lg hover:shadow-emerald-500/10"
                      >
                        <h3 className="font-semibold text-gray-100 mb-3 group-hover:text-emerald-400 transition-colors text-lg">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                          {article.snippet}
                        </p>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {/* Summary with special styling */}
              <section className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">📝</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-100">Summary</h2>
                </div>
                <div className="bg-gradient-to-br from-emerald-500/10 to-transparent rounded-xl p-7 border-2 border-emerald-500/30 shadow-xl">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {selectedSubtopic.summary}
                  </p>
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
