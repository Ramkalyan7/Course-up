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
  const [completedSubtopics, setCompletedSubtopics] = useState<Set<string>>(new Set());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchCourse = async () => {
    try {
      const result = await getCourseById("cmhpwfr2r003mtgwkn2h4sb0b");

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

  const handleMarkAsComplete = (subtopicId: string) => {
    setCompletedSubtopics((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(subtopicId)) {
        newSet.delete(subtopicId);
      } else {
        newSet.add(subtopicId);
      }
      return newSet;
    });
  };

  const isSubtopicCompleted = (subtopicId: string) => {
    return completedSubtopics.has(subtopicId);
  };

  const handleSubtopicSelect = (subtopic: Subtopic) => {
    setSelectedSubtopic(subtopic);
    setIsSidebarOpen(false);
  };

  const handleTakeQuiz = () => {
    router.push(`/quiz/${selectedSubtopic?.id}`);
  };

  useEffect(() => {
    fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading your course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">📚</span>
          </div>
          <p className="text-gray-300 text-lg mb-6">Course not found</p>
          <button
            onClick={() => router.push("/")}
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black font-semibold rounded-lg transition-all shadow-lg shadow-emerald-500/20"
          >
            Create New Course
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-6 right-6 z-50 lg:hidden w-14 h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isSidebarOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Header with gradient */}
      <header className="bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 border-b border-emerald-500/20 sticky top-0 z-30 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <span className="text-black font-bold text-lg sm:text-xl">C</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                CourseUp
              </h1>
              <p className="text-xs text-gray-400 line-clamp-1">{course.mainTopic}</p>
            </div>
          </div>
          <button
            onClick={() => router.push("/")}
            className="px-3 sm:px-5 py-2 sm:py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-emerald-500/50 text-gray-300 hover:text-emerald-400 rounded-lg transition-all text-xs sm:text-sm font-medium"
          >
            <span className="hidden sm:inline">+ New Course</span>
            <span className="sm:hidden">+</span>
          </button>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 w-80 bg-gray-900/95 lg:bg-gray-900/50 backdrop-blur-sm border-r border-gray-800 z-40 transition-transform duration-300 lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:h-screen lg:sticky lg:top-[73px] flex flex-col`}
        >
          <div className="p-5 border-b border-gray-800">
            <div className="flex items-center justify-between lg:block">
              <div>
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  Course Modules
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  {completedSubtopics.size} / {course.subtopics.length} completed
                </p>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-emerald-400"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-black">
            {course.subtopics.map((subtopic, index) => (
              <button
                key={subtopic.id}
                onClick={() => handleSubtopicSelect(subtopic)}
                className={`relative w-full text-left p-4 rounded-xl transition-all duration-200 group ${
                  selectedSubtopic?.id === subtopic.id
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30 scale-105"
                    : "bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 hover:border-emerald-500/30"
                }`}
              >
                {isSubtopicCompleted(subtopic.id) && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                      selectedSubtopic?.id === subtopic.id
                        ? "bg-black/30 text-white"
                        : "bg-gray-700/50 text-gray-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-semibold text-sm mb-1 line-clamp-2 ${
                        selectedSubtopic?.id === subtopic.id ? "text-white" : "text-gray-200"
                      }`}
                    >
                      {subtopic.title}
                    </p>
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                        selectedSubtopic?.id === subtopic.id
                          ? "bg-black/30 text-gray-200"
                          : "bg-gray-700/50 text-gray-400"
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
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-black to-gray-900">
          {selectedSubtopic && (
            <div className="max-w-4xl mx-auto">
              {/* Module Header */}
              <div className="mb-6 sm:mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-2xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-emerald-500/20 shadow-xl">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-xs font-bold rounded-full uppercase tracking-wide">
                      {selectedSubtopic.difficulty}
                    </span>
                    {isSubtopicCompleted(selectedSubtopic.id) && (
                      <div className="flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-xs font-bold rounded-full">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>COMPLETED</span>
                      </div>
                    )}
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mb-3 sm:mb-4 leading-tight">
                    {selectedSubtopic.title}
                  </h1>
                  <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                    {selectedSubtopic.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons - MOVED TO TOP */}
              <div className="mb-8 sm:mb-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Take Quiz Button */}
                {selectedSubtopic.quizzes && selectedSubtopic.quizzes.length > 0 && (
                  <button
                    onClick={handleTakeQuiz}
                    className="w-full py-3.5 sm:py-4 px-5 sm:px-6 bg-gray-900 hover:bg-gray-800 border-2 border-emerald-500 hover:border-emerald-400 text-emerald-400 hover:text-emerald-300 font-bold text-sm sm:text-base rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/20"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <span>Take Quiz</span>
                  </button>
                )}

                {/* Mark as Complete Button */}
                <button
                  onClick={() => handleMarkAsComplete(selectedSubtopic.id)}
                  className={`w-full py-3.5 sm:py-4 px-5 sm:px-6 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubtopicCompleted(selectedSubtopic.id)
                      ? "bg-gray-800 border-2 border-emerald-500/50 text-emerald-400 hover:bg-gray-700"
                      : "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
                  } ${selectedSubtopic.quizzes && selectedSubtopic.quizzes.length > 0 ? '' : 'sm:col-span-2'}`}
                >
                  {isSubtopicCompleted(selectedSubtopic.id) ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Completed</span>
                    </>
                  ) : (
                    <>
                      <span>Mark as Complete</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

              {/* Introduction */}
              <section className="mb-6 sm:mb-10">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-base sm:text-lg">📖</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-100">Introduction</h2>
                </div>
                <div className="bg-gray-900/70 backdrop-blur rounded-xl p-5 sm:p-7 border border-gray-800 shadow-xl">
                  <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
                    {selectedSubtopic.introduction}
                  </p>
                </div>
              </section>

              {/* Key Concepts */}
              <section className="mb-6 sm:mb-10">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-base sm:text-lg">💡</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-100">Key Concepts</h2>
                </div>
                <div className="space-y-4 sm:space-y-5">
                  {selectedSubtopic.concepts.map((concept, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 sm:p-7 border border-gray-700/50 hover:border-emerald-500/30 transition-all shadow-lg hover:shadow-emerald-500/10 group"
                    >
                      <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/30 text-sm sm:text-base">
                          {index + 1}
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                          {concept.concept}
                        </h3>
                      </div>
                      <p className="text-gray-300 mb-4 sm:mb-5 leading-relaxed pl-0 sm:pl-14 text-sm sm:text-base">
                        {concept.explanation}
                      </p>
                      <div className="bg-black/50 rounded-lg p-4 sm:p-5 border-l-4 border-emerald-500 ml-0 sm:ml-14">
                        <p className="text-xs text-emerald-400 font-semibold mb-2 uppercase tracking-wide">
                          Example
                        </p>
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{concept.example}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Videos, Articles, Summary sections remain the same... */}
              {/* (keeping existing sections for brevity) */}

              {/* Videos */}
              {selectedSubtopic.videos.length > 0 && (
                <section className="mb-6 sm:mb-10">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-base sm:text-lg">🎥</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-100">Video Resources</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    {selectedSubtopic.videos.map((video, index) => (
                      <div
                        key={index}
                        className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700/50 hover:border-emerald-500/50 transition-all shadow-lg hover:shadow-emerald-500/20"
                      >
                        <div className="relative">
                          <iframe
                            className="w-full aspect-video"
                            src={`https://www.youtube.com/embed/${new URL(video.url).searchParams.get("v")}`}
                            title={video.title}
                            allowFullScreen
                          ></iframe>
                        </div>
                        <div className="p-4 sm:p-5">
                          <h3 className="font-semibold text-gray-100 mb-2 line-clamp-2 leading-snug text-sm sm:text-base">
                            {video.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500">{video.channelTitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Articles */}
              {selectedSubtopic.articles.length > 0 && (
                <section className="mb-6 sm:mb-10">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-base sm:text-lg">📄</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-100">Reading Materials</h2>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    {selectedSubtopic.articles.map((article, index) => (
                      <a
                        key={index}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-gray-900/70 backdrop-blur rounded-xl p-5 sm:p-6 border border-gray-700/50 hover:border-emerald-500/50 transition-all group shadow-lg hover:shadow-emerald-500/10"
                      >
                        <h3 className="font-semibold text-gray-100 mb-2 sm:mb-3 group-hover:text-emerald-400 transition-colors text-base sm:text-lg">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">{article.snippet}</p>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {/* Summary */}
              <section className="mb-6 sm:mb-10">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-base sm:text-lg">📝</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-100">Summary</h2>
                </div>
                <div className="bg-gradient-to-br from-emerald-500/10 to-transparent rounded-xl p-5 sm:p-7 border-2 border-emerald-500/30 shadow-xl">
                  <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
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
