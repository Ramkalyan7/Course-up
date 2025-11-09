"use client";

import { useState } from "react";

// Dummy course data
const dummyCourses = [
  {
    id: 1,
    title: "React Fundamentals",
    description: "Learn the basics of React including components, props, state, and hooks",
    difficulty: "Beginner",
    modules: 8,
    duration: "4 hours",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Python for Data Science",
    description: "Master Python programming with focus on data analysis and visualization",
    difficulty: "Intermediate",
    modules: 12,
    duration: "6 hours",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Web Design Masterclass",
    description: "Complete guide to modern web design principles and best practices",
    difficulty: "Beginner",
    modules: 10,
    duration: "5 hours",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Machine Learning Basics",
    description: "Introduction to ML algorithms, models, and practical applications",
    difficulty: "Advanced",
    modules: 15,
    duration: "8 hours",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    title: "JavaScript Advanced Concepts",
    description: "Deep dive into closures, promises, async/await, and design patterns",
    difficulty: "Advanced",
    modules: 10,
    duration: "5 hours",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    title: "Node.js Backend Development",
    description: "Build scalable backend applications with Node.js and Express",
    difficulty: "Intermediate",
    modules: 14,
    duration: "7 hours",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
  },
];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");

  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = dummyCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "All" || course.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-black relative overflow-hidden ">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-bold rounded-full">
                ✨ AI-Powered Learning
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent mb-4 leading-tight">
              Explore Courses
            </h1>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto">
              Discover personalized learning paths crafted by AI
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-10">
            <div className="relative max-w-3xl mx-auto group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300" />
              <div className="relative flex items-center">
                <div className="absolute left-6 pointer-events-none">
                  <svg
                    className="h-6 w-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for anything..."
                  className="w-full pl-16 pr-6 py-5 bg-gray-900/80 backdrop-blur-xl border-2 border-gray-800 hover:border-emerald-500/50 focus:border-emerald-500 rounded-2xl text-gray-100 text-lg placeholder-gray-500 focus:outline-none transition-all shadow-2xl"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-6 text-gray-500 hover:text-emerald-400 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                  selectedDifficulty === difficulty
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                    : "bg-gray-900 text-gray-400 hover:text-emerald-400 border border-gray-800 hover:border-emerald-500/30"
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">Found</span>
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-bold rounded-full">
                {filteredCourses.length}
              </span>
              <span className="text-gray-500 text-sm">courses</span>
            </div>
            <button className="text-gray-500 hover:text-emerald-400 text-sm flex items-center gap-2 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
              Sort by relevance
            </button>
          </div>

          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <div
                  key={course.id}
                  className="group relative animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Featured Badge */}
                  {course.featured && (
                    <div className="absolute -top-3 -right-3 z-30">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full blur animate-pulse" />
                        <div className="relative px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold rounded-full shadow-xl">
                          ⭐ Featured
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-800 hover:border-emerald-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 cursor-pointer h-full">
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Thumbnail */}
                    <div className="relative h-52 bg-gray-800 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4 z-20">
                        <span
                          className={`px-4 py-1.5 rounded-xl text-xs font-bold backdrop-blur-sm ${
                            course.difficulty === "Beginner"
                              ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-400"
                              : course.difficulty === "Intermediate"
                              ? "bg-yellow-500/20 border border-yellow-500/50 text-yellow-400"
                              : "bg-red-500/20 border border-red-500/50 text-red-400"
                          }`}
                        >
                          {course.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative p-6">
                      <h3 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-emerald-400 transition-colors line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-5 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-5 mb-5 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <span className="font-medium">{course.modules} modules</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span className="font-medium">{course.duration}</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button className="w-full py-3.5 bg-gray-800/50 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-600 border border-gray-700 hover:border-emerald-500 text-gray-300 hover:text-white font-bold rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/30 flex items-center justify-center gap-2">
                        <span>Start Learning</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Enhanced Empty State
            <div className="text-center py-32">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl" />
                <div className="relative w-24 h-24 bg-gradient-to-br from-gray-900 to-gray-800 rounded-full flex items-center justify-center border border-gray-800">
                  <span className="text-5xl">🔍</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-300 mb-3">
                No courses found
              </h3>
              <p className="text-gray-500 mb-8 text-lg">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDifficulty("All");
                }}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/30"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
