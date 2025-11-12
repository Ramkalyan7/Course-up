"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserProgress } from "@/lib/actions/courseActions";
import {
  useCurrentUser,
  useIsAuthenticated,
} from "@/lib/session/clientSession";
import LoadingState from "@/components/Loading";

type Course = {
  id: string;
  mainTopic: string;
  description: string;
  imageUrl: string;
  difficulty: string;
  userId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  progress: Progress[];
  _count: {
    subtopics: number;
  };
};

type Progress = {
  id: string;
  userId: string;
  courseId: string;
  subtopicId: string;
  completed: boolean;
};

export default function YourCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const isLoggedIn = useIsAuthenticated();
  const user = useCurrentUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "in-progress" | "completed"
  >("all");

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.mainTopic
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "in-progress" && course.status === "in-progress") ||
      (selectedFilter === "completed" && course.status === "completed");
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: courses.length,
    inProgress: courses.filter((c) => c._count.subtopics > c.progress.length)
      .length,
    completed: courses.filter((c) => c._count.subtopics === c.progress.length)
      .length,
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    if (!user?.id) {
      router.push("/yourcourses");
      return;
    }
    const getCourses = async () => {
      const coursesFetched = await getUserProgress(user?.id as string);
      console.log(coursesFetched);
      setCourses(coursesFetched);
    };
    getCourses();
  }, [isLoggedIn, router, user?.id]);


  if(courses && courses.length<=0){
    return <LoadingState/>
  }

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
                  <svg
                    className="w-6 h-6 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Courses</p>
                  <p className="text-3xl font-bold text-gray-100">
                    {stats.total}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">In Progress</p>
                  <p className="text-3xl font-bold text-gray-100">
                    {stats.inProgress}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Completed</p>
                  <p className="text-3xl font-bold text-gray-100">
                    {stats.completed}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-500"
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
              {filteredCourses.length} course
              {filteredCourses.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => {
                const isCourseCompleted =
                  course._count.subtopics === course.progress.length;
                return (
                  <div
                    key={course.id}
                    className="group relative animate-fade-in cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => router.push(`/course/${course.id}`)}
                  >
                    {/* Completion Badge */}
                    {isCourseCompleted && (
                      <div className="absolute -top-3 -right-3 z-20">
                        <div className="relative">
                          <div className="absolute inset-0 bg-emerald-500 rounded-full blur animate-pulse" />
                          <div className="relative w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl">
                            <svg
                              className="w-6 h-6 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
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
                          src={course.imageUrl}
                          alt={course.mainTopic}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        {/* Progress Overlay */}
                        <div className="absolute bottom-4 left-4 right-4 z-20">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white text-sm font-bold">
                              {course._count.subtopics}%
                            </span>
                            <span className="text-gray-300 text-xs">
                              {course.progress.length}/{course._count.subtopics}
                              modules
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-800/50 backdrop-blur-sm rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500"
                              style={{ width: `${course.progress.length}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold text-gray-100 group-hover:text-emerald-400 transition-colors line-clamp-1">
                            {course.mainTopic}
                          </h3>
                        </div>

                        <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                          {course.description}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              isCourseCompleted
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {isCourseCompleted ? "Completed" : "In Progress"}
                          </div>
                        </div>

                        {/* Continue Button */}
                        <button className="mt-4 w-full py-3 bg-gray-800/50 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-600 border border-gray-700 hover:border-emerald-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/30">
                          {course._count.subtopics === course.progress.length
                            ? "Review Course"
                            : "Continue Learning"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Empty State
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-900 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-800">
                <span className="text-5xl">📚</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-300 mb-3">
                No courses found
              </h3>
              <p className="text-gray-500 mb-8">
                Try adjusting your search or filters
              </p>
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
