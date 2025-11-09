"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  totalModules: number;
  completedModules: number;
  progress: number;
  status: "in-progress" | "completed";
  lastAccessed: string;
}

// Dummy course data
const dummyCourses: Course[] = [
  {
    id: "1",
    title: "React Fundamentals",
    description: "Master the basics of React including hooks, state management, and component architecture",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    totalModules: 8,
    completedModules: 6,
    progress: 75,
    status: "in-progress",
    lastAccessed: "2 hours ago",
  },
  {
    id: "2",
    title: "Python for Data Science",
    description: "Complete guide to Python programming for data analysis and machine learning",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
    totalModules: 12,
    completedModules: 12,
    progress: 100,
    status: "completed",
    lastAccessed: "1 day ago",
  },
  {
    id: "3",
    title: "Web Design Masterclass",
    description: "Learn modern web design principles, UI/UX best practices, and responsive design",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    totalModules: 10,
    completedModules: 10,
    progress: 100,
    status: "completed",
    lastAccessed: "3 days ago",
  },
  {
    id: "4",
    title: "Machine Learning Basics",
    description: "Introduction to ML algorithms, neural networks, and practical applications",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
    totalModules: 15,
    completedModules: 4,
    progress: 27,
    status: "in-progress",
    lastAccessed: "5 hours ago",
  },
  {
    id: "5",
    title: "JavaScript Advanced Concepts",
    description: "Deep dive into closures, promises, async/await, and advanced patterns",
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=300&fit=crop",
    totalModules: 10,
    completedModules: 8,
    progress: 80,
    status: "in-progress",
    lastAccessed: "1 hour ago",
  },
  {
    id: "6",
    title: "Node.js Backend Development",
    description: "Build scalable backend applications with Node.js, Express, and databases",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
    totalModules: 14,
    completedModules: 14,
    progress: 100,
    status: "completed",
    lastAccessed: "1 week ago",
  },
  {
    id: "7",
    title: "TypeScript Complete Guide",
    description: "Master TypeScript from basics to advanced type systems and generics",
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop",
    totalModules: 9,
    completedModules: 3,
    progress: 33,
    status: "in-progress",
    lastAccessed: "2 days ago",
  },
  {
    id: "8",
    title: "Docker & Kubernetes",
    description: "Learn containerization and orchestration for modern applications",
    thumbnail: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=300&fit=crop",
    totalModules: 11,
    completedModules: 11,
    progress: 100,
    status: "completed",
    lastAccessed: "2 weeks ago",
  },
  {
    id: "9",
    title: "GraphQL API Design",
    description: "Build efficient APIs with GraphQL, Apollo, and best practices",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
    totalModules: 7,
    completedModules: 2,
    progress: 29,
    status: "in-progress",
    lastAccessed: "6 hours ago",
  },
  {
    id: "10",
    title: "AWS Cloud Solutions",
    description: "Master AWS services including EC2, S3, Lambda, and cloud architecture",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    totalModules: 16,
    completedModules: 5,
    progress: 31,
    status: "in-progress",
    lastAccessed: "4 hours ago",
  },
];

export default function YourCoursesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "in-progress" | "completed">("all");

  const filteredCourses = dummyCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "in-progress" && course.status === "in-progress") ||
      (selectedFilter === "completed" && course.status === "completed");
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: dummyCourses.length,
    inProgress: dummyCourses.filter((c) => c.status === "in-progress").length,
    completed: dummyCourses.filter((c) => c.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent mb-4">
              Your Courses
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl">
              Track your learning progress and continue where you left off
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Courses</p>
                  <p className="text-3xl font-bold text-gray-100">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">In Progress</p>
                  <p className="text-3xl font-bold text-gray-100">{stats.inProgress}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Completed</p>
                  <p className="text-3xl font-bold text-gray-100">{stats.completed}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your courses..."
                className="w-full pl-14 pr-6 py-4 bg-gray-900 border-2 border-gray-800 hover:border-emerald-500/50 focus:border-emerald-500 rounded-xl text-gray-100 text-lg placeholder-gray-500 focus:outline-none transition-all shadow-xl"
              />
            </div>
          </div>

          {/* Filter Chips */}
          <div className="mb-8 flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                selectedFilter === "all"
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-gray-900 text-gray-400 hover:text-emerald-400 border border-gray-800 hover:border-emerald-500/30"
              }`}
            >
              All Courses
            </button>
            <button
              onClick={() => setSelectedFilter("in-progress")}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                selectedFilter === "in-progress"
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-gray-900 text-gray-400 hover:text-emerald-400 border border-gray-800 hover:border-emerald-500/30"
              }`}
            >
              In Progress ({stats.inProgress})
            </button>
            <button
              onClick={() => setSelectedFilter("completed")}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                selectedFilter === "completed"
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-gray-900 text-gray-400 hover:text-emerald-400 border border-gray-800 hover:border-emerald-500/30"
              }`}
            >
              Completed ({stats.completed})
            </button>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-500 text-sm">
              {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <div
                  key={course.id}
                  className="group relative animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => router.push(`/course/${course.id}`)}
                >
                  {/* Completion Badge */}
                  {course.status === "completed" && (
                    <div className="absolute -top-3 -right-3 z-20">
                      <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500 rounded-full blur animate-pulse" />
                        <div className="relative w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-800 hover:border-emerald-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20">
                    {/* Thumbnail */}
                    <div className="relative h-48 bg-gray-800 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Progress Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 z-20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white text-sm font-bold">{course.progress}%</span>
                          <span className="text-gray-300 text-xs">{course.completedModules}/{course.totalModules} modules</span>
                        </div>
                        <div className="w-full h-2 bg-gray-800/50 backdrop-blur-sm rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-100 group-hover:text-emerald-400 transition-colors line-clamp-1">
                          {course.title}
                        </h3>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{course.lastAccessed}</span>
                        </div>
                        
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          course.status === "completed"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}>
                          {course.status === "completed" ? "Completed" : "In Progress"}
                        </div>
                      </div>

                      {/* Continue Button */}
                      <button className="mt-4 w-full py-3 bg-gray-800/50 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-600 border border-gray-700 hover:border-emerald-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/30">
                        {course.status === "completed" ? "Review Course" : "Continue Learning"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Empty State
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-900 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-800">
                <span className="text-5xl">📚</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-300 mb-3">No courses found</h3>
              <p className="text-gray-500 mb-8">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFilter("all");
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
