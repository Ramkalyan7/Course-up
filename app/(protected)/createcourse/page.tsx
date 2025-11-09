"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProgressUpdate {
  status: "in_progress" | "completed";
  message: string;
}

export default function CreateCourse() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setMessages([]);
    setIsComplete(false);

    try {
      const response = await fetch("/api/courses/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim() }),
      });

      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split("\n").filter((line) => line.trim());

        for (const line of lines) {
          try {
            const update: ProgressUpdate = JSON.parse(line);
            setMessages((prev) => [...prev, update.message]);

            if (update.status === "completed") {
              setIsComplete(true);
              setTimeout(() => {
                router.push("/course");
              }, 2000);
            }
          } catch (e) {
            // Ignore parse errors
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, "❌ Error generating course"]);
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br bg-black flex flex-col items-center justify-center px-4 relative overflow-hidden pb-10 mx-auto">
        {/* Animated background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Main Content - Blurred when generating */}
        <div
          className={`w-full max-w-3xl transition-all duration-500 relative z-10 ${
            isGenerating
              ? "blur-sm opacity-50 pointer-events-none scale-95"
              : ""
          }`}
        >
          {/* Header with animation */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent animate-fade-in">
              Create a Course
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Transform any topic into a complete, structured learning
              experience with AI in minutes
            </p>
          </div>

          {/* Main Input Form */}
          <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Input Box with better design */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="What do you want to master today?"
                  disabled={isGenerating}
                  className="relative w-full px-8 py-5 bg-slate-900/80 backdrop-blur-sm border-2 border-slate-700 hover:border-emerald-500/50 focus:border-emerald-500 rounded-xl text-gray-100 text-lg placeholder-gray-500 focus:outline-none transition-all duration-300 disabled:bg-gray-800 disabled:border-gray-700 disabled:cursor-not-allowed shadow-xl"
                />
              </div>

              {/* Submit Button with gradient */}
              <button
                type="submit"
                disabled={isGenerating || !topic.trim()}
                className="group relative w-full py-5 px-8 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:from-gray-700 disabled:to-gray-700 text-slate-950 font-bold text-lg rounded-xl transition-all duration-300 disabled:cursor-not-allowed shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 disabled:scale-100 disabled:shadow-none"
              >
                <span className="relative z-10">
                  {isGenerating ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Creating Your Course...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      <span>✨ Generate Course</span>
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  )}
                </span>
              </button>
            </form>

            {/* Examples Section with cards */}
            <div className="mt-16 pt-10 border-t border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  Popular Topics
                </h3>
                <span className="text-xs text-gray-500">Click to try</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "React Fundamentals",
                    icon: "⚛️",
                    color: "from-blue-500/20 to-cyan-500/20",
                  },
                  {
                    title: "Python Basics",
                    icon: "🐍",
                    color: "from-yellow-500/20 to-green-500/20",
                  },
                  {
                    title: "Web Design 101",
                    icon: "🎨",
                    color: "from-purple-500/20 to-pink-500/20",
                  },
                  {
                    title: "Data Science",
                    icon: "📊",
                    color: "from-orange-500/20 to-red-500/20",
                  },
                ].map((example) => (
                  <button
                    key={example.title}
                    onClick={() => setTopic(example.title)}
                    disabled={isGenerating}
                    className={`group relative p-5 bg-gradient-to-br ${example.color} backdrop-blur-sm border border-slate-700/50 hover:border-emerald-500/50 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-emerald-500/10`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{example.icon}</div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-gray-200 group-hover:text-emerald-400 transition-colors">
                          {example.title}
                        </p>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overlay with better design */}
        {isGenerating && (
          <div className="fixed inset-0 flex items-center justify-center px-4 z-50 bg-slate-950/80 backdrop-blur-md animate-fade-in">
            <div className="w-full max-w-3xl">
              {/* Header with animation */}
              <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center animate-pulse">
                      <svg
                        className="w-6 h-6 text-slate-950 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  </div>
                </div>
                <h2 className="text-4xl font-bold mb-3 text-gray-100">
                  Crafting <span className="text-emerald-400">{topic}</span>
                </h2>
                <p className="text-gray-400 text-lg">
                  {isComplete
                    ? "✨ Your course is ready!"
                    : "Generating personalized content just for you..."}
                </p>
              </div>

              {/* Progress Messages with better styling */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-2xl blur-2xl"></div>
                <div className="relative bg-slate-900/80 backdrop-blur-sm rounded-2xl p-8 min-h-96 max-h-96 overflow-y-auto border border-slate-800 shadow-2xl scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
                      <p className="text-gray-400">
                        Initializing course generator...
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((msg, idx) => (
                        <div
                          key={idx}
                          className="group p-4 bg-gradient-to-r from-slate-800 to-slate-800/50 rounded-lg border-l-4 border-emerald-500 text-gray-100 animate-fade-in hover:from-slate-800/80 hover:to-slate-800/30 transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-emerald-400 flex-shrink-0 mt-0.5">
                              {msg.includes("✅")
                                ? "✅"
                                : msg.includes("⏳")
                                ? "⏳"
                                : msg.includes("🚀")
                                ? "🚀"
                                : "📝"}
                            </span>
                            <p className="flex-1 leading-relaxed">{msg}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {!isComplete && messages.length > 0 && (
                    <div className="flex items-center gap-3 p-4 mt-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-200"></div>
                      </div>
                      <span className="text-gray-400 text-sm">
                        Processing next step...
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Completion Message */}
              {isComplete && (
                <div className="mt-6 relative animate-fade-in">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl blur-xl opacity-50"></div>
                  <div className="relative p-6 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 backdrop-blur-sm border-2 border-emerald-500/50 rounded-xl text-center shadow-2xl">
                    <div className="text-5xl mb-3">🎉</div>
                    <p className="text-emerald-300 font-bold text-xl mb-2">
                      Course Generated Successfully!
                    </p>
                    <p className="text-gray-400">
                      Redirecting you to your course...
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
