"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProgressUpdate {
  status: "in_progress" | "completed";
  message: string;
}

export default function Home() {
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
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 relative">
      {/* Main Content - Blurred when generating */}
      <div
        className={`w-full max-w-2xl transition-all duration-300 ${
          isGenerating ? "blur-sm opacity-50 pointer-events-none" : ""
        }`}
      >
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-2 text-emerald-500">CourseUp</h1>
          <p className="text-lg text-gray-300">
            Generate complete courses in minutes with AI
          </p>
        </div>

        {/* Main Input Form */}
        <div className="w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Box */}
            <div>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="What do you want to learn?"
                disabled={isGenerating}
                className="w-full px-6 py-4 bg-slate-900 border-2 border-emerald-500 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors disabled:bg-gray-700 disabled:border-gray-600 disabled:cursor-not-allowed"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isGenerating || !topic.trim()}
              className="w-full py-4 px-6 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-700 text-slate-950 font-semibold rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
            >
              {isGenerating ? "Creating..." : "Generate Course"}
            </button>
          </form>

          {/* Examples Section */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-sm text-gray-300 mb-4">Example topics:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "React Fundamentals",
                "Python Basics",
                "Web Design 101",
                "Data Science",
              ].map((example) => (
                <button
                  key={example}
                  onClick={() => setTopic(example)}
                  disabled={isGenerating}
                  className="p-3 bg-slate-900 border border-gray-700 rounded text-sm text-gray-300 hover:text-emerald-300 hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overlay - Shown on top when generating */}
      {isGenerating && (
        <div className="fixed inset-0 flex items-center justify-center px-4 z-50">
          <div className="w-full max-w-2xl">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2 text-gray-100">
                Creating <span className="text-emerald-500">{topic}</span>
              </h2>
              <p className="text-gray-300">
                {isComplete
                  ? "Course ready! Redirecting..."
                  : "Please wait while we generate your course"}
              </p>
            </div>

            {/* Progress Messages */}
            <div className="bg-slate-900 rounded-lg p-6 min-h-96 max-h-96 overflow-y-auto space-y-3 border border-gray-700 shadow-2xl">
              {messages.length === 0 ? (
                <p className="text-gray-400">Starting course generation...</p>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-800 rounded border-l-4 border-emerald-500 text-gray-100 text-sm animate-fade-in"
                  >
                    {msg}
                  </div>
                ))
              )}

              {!isComplete && (
                <div className="flex items-center space-x-2 p-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-400 text-sm">Processing...</span>
                </div>
              )}
            </div>

            {/* Completion Message */}
            {isComplete && (
              <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500 rounded text-emerald-300 text-center animate-fade-in">
                ✅ Course generated successfully! Redirecting...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
