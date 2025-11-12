"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserProgress } from "@/lib/actions/courseActions";
import {
  useCurrentUser,
  useIsAuthenticated,
} from "@/lib/session/clientSession";
import LoadingState from "@/components/Loading";
import { useYourCourseFilters } from "@/lib/hooks/useYourCourseFilters";
import { StatsCard } from "@/components/yourCoursesPage/StatsCard";
import { SearchBar } from "@/components/yourCoursesPage/SearchBar";
import { FilterChip } from "@/components/yourCoursesPage/FilterChip";
import { CourseCard } from "@/components/yourCoursesPage/CourseCard";
import { CourseProgress } from "@/lib/types/course";

export default function YourCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<CourseProgress[]>([]);
  const isLoggedIn = useIsAuthenticated();
  const user = useCurrentUser();

  const {
    searchQuery,
    setSearchQuery,
    selectedFilter,
    setSelectedFilter,
    filteredCourses,
    stats,
  } = useYourCourseFilters(courses);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    if (!user?.id) return;

    const getCourses = async () => {
     
      try {
         const coursesFetched = await getUserProgress(user.id as string);
      setCourses(coursesFetched);
      } catch (error) {
        console.log(error)
      }
    };
    getCourses();
  }, [isLoggedIn, router, user?.id]);

  if (courses && courses.length <= 0) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-48 h-48 sm:w-96 sm:h-96 sm:top-20 sm:left-20 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-48 h-48 sm:w-96 sm:h-96 sm:bottom-20 sm:right-20 bg-emerald-600/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 px-3 py-4 sm:px-6 sm:py-6 lg:p-8">
        <div className="max-w-7xl md:min-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8 lg:mb-12">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent mb-2 sm:mb-4 leading-tight break-words">
              Your Courses
            </h1>
            <p className="text-gray-400 text-sm sm:text-lg md:text-xl leading-relaxed">
              Track your learning progress and continue where you left off
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-3 mb-6 sm:grid-cols-3 sm:gap-4 sm:mb-8">
            <StatsCard
              icon={
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400"
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
              }
              label="Total Courses"
              value={stats.total}
              bgColor="bg-emerald-500/20"
              iconColor="text-emerald-400"
            />
            <StatsCard
              icon={
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400"
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
              }
              label="In Progress"
              value={stats.inProgress}
              bgColor="bg-yellow-500/20"
              iconColor="text-yellow-400"
            />
            <StatsCard
              icon={
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400"
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
              }
              label="Completed"
              value={stats.completed}
              bgColor="bg-emerald-500/20"
              iconColor="text-emerald-400"
            />
          </div>

          {/* Search Bar */}
          <div className="mb-4 sm:mb-6">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* Filter Chips */}
          <div className="mb-5 sm:mb-8 flex flex-wrap gap-2 sm:gap-3">
            <FilterChip
              label="All Courses"
              isActive={selectedFilter === "all"}
              onClick={() => setSelectedFilter("all")}
            />
            <FilterChip
              label={`In Progress (${stats.inProgress})`}
              isActive={selectedFilter === "in-progress"}
              onClick={() => setSelectedFilter("in-progress")}
            />
            <FilterChip
              label={`Completed (${stats.completed})`}
              isActive={selectedFilter === "completed"}
              onClick={() => setSelectedFilter("completed")}
            />
          </div>

          {/* Results Count */}
          <div className="mb-4 sm:mb-6">
            <p className="text-gray-500 text-xs sm:text-sm">
              {filteredCourses.length} course
              {filteredCourses.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {filteredCourses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </div>
          ) : (
            <EmptyState
              onClearFilters={() => {
                setSearchQuery("");
                setSelectedFilter("all");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <div className="text-center py-12 sm:py-16 lg:py-20 px-4">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-300 mb-2 sm:mb-3">
        No courses found
      </h3>
      <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
        Try adjusting your search or filters
      </p>
      <button
        onClick={onClearFilters}
        className="px-6 sm:px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold text-sm sm:text-base rounded-xl transition-all shadow-lg shadow-emerald-500/30 touch-manipulation"
      >
        Clear Filters
      </button>
    </div>
  );
}
