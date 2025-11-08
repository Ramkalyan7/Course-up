"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLatestCourse } from "@/lib/actions/courseActions";
import Image from "next/image";

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

export default function CoursePage() {
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<Subtopic | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const fetchCourse = async () => {
    try {
      const result = await getLatestCourse();

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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCourse();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-300 mb-4">Course not found</p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold rounded-lg transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-emerald-500">CourseUp</h1>
            <p className="text-sm text-gray-400">{course.mainTopic}</p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-lg transition-colors text-sm"
          >
            New Course
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar - Module List */}
        <aside className="w-80 bg-slate-900 border-r border-gray-700 min-h-screen p-4 sticky top-[73px] self-start">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">
            Course Modules
          </h2>
          <div className="space-y-2">
            {course.subtopics.map((subtopic, index) => (
              <button
                key={subtopic.id}
                onClick={() => setSelectedSubtopic(subtopic)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedSubtopic?.id === subtopic.id
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-slate-800 text-gray-300 hover:bg-slate-700"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-sm font-semibold">{index + 1}</span>
                  <div>
                    <p className="font-medium text-sm">{subtopic.title}</p>
                    <p
                      className={`text-xs mt-1 ${
                        selectedSubtopic?.id === subtopic.id
                          ? "text-slate-800"
                          : "text-gray-400"
                      }`}
                    >
                      {subtopic.difficulty}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {selectedSubtopic && (
            <div className="max-w-4xl">
              {/* Module Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500 text-emerald-400 text-xs rounded-full">
                    {selectedSubtopic.difficulty}
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-gray-100 mb-3">
                  {selectedSubtopic.title}
                </h1>
                <p className="text-gray-300 text-lg">
                  {selectedSubtopic.description}
                </p>
              </div>

              {/* Introduction */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-100 mb-4">
                  Introduction
                </h2>
                <div className="bg-slate-900 rounded-lg p-6 border border-gray-700">
                  <p className="text-gray-300 leading-relaxed">
                    {selectedSubtopic.introduction}
                  </p>
                </div>
              </section>

              {/* Key Concepts */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-100 mb-4">
                  Key Concepts
                </h2>
                <div className="space-y-4">
                  {selectedSubtopic.concepts.map((concept, index) => (
                    <div
                      key={index}
                      className="bg-slate-900 rounded-lg p-6 border border-gray-700"
                    >
                      <h3 className="text-xl font-semibold text-emerald-400 mb-3">
                        {concept.concept}
                      </h3>
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {concept.explanation}
                      </p>
                      <div className="bg-slate-800 rounded p-4 border-l-4 border-emerald-500">
                        <p className="text-sm text-gray-400 mb-1">Example:</p>
                        <p className="text-gray-300">{concept.example}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Videos */}
              {selectedSubtopic.videos.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-100 mb-4">
                    Video Resources
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedSubtopic.videos.map((video, index) => (
                      <a
                        key={index}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-slate-900 rounded-lg overflow-hidden border border-gray-700 hover:border-emerald-500 transition-colors group"
                      >
                        {/* <Image
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="w-full aspect-video object-cover"
                          height={100}
                          width={100}
                        /> */}
                        <div className="p-4">
                          <h3 className="font-medium text-gray-100 mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                            {video.title}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {video.channelTitle}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {/* Articles */}
              {selectedSubtopic.articles.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-100 mb-4">
                    Reading Materials
                  </h2>
                  <div className="space-y-3">
                    {selectedSubtopic.articles.map((article, index) => (
                      <a
                        key={index}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-slate-900 rounded-lg p-4 border border-gray-700 hover:border-emerald-500 transition-colors group"
                      >
                        <h3 className="font-medium text-gray-100 mb-2 group-hover:text-emerald-400 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2">
                          {article.snippet}
                        </p>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {/* Summary */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-100 mb-4">
                  Summary
                </h2>
                <div className="bg-slate-900 rounded-lg p-6 border border-gray-700">
                  <p className="text-gray-300 leading-relaxed">
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
