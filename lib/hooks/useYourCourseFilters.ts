import { useMemo, useState } from "react";
import { CourseProgress } from "../types/course";



export function useYourCourseFilters(courses: CourseProgress[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "in-progress" | "completed">("all");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.mainTopic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesFilter = false;
      if (selectedFilter === "all") {
        matchesFilter = true;
      } else if (selectedFilter === "in-progress") {
        matchesFilter = course.progress.length < course._count.subtopics;
      } else if (selectedFilter === "completed") {
        matchesFilter = course.progress.length === course._count.subtopics;
      }
      return matchesSearch && matchesFilter;
    });
  }, [courses, searchQuery, selectedFilter]);

  const stats = useMemo(() => ({
    total: courses.length,
    inProgress: courses.filter((c) => c._count.subtopics > c.progress.length).length,
    completed: courses.filter((c) => c._count.subtopics === c.progress.length).length,
  }), [courses]);

  return {
    searchQuery,
    setSearchQuery,
    selectedFilter,
    setSelectedFilter,
    filteredCourses,
    stats,
  };
}
