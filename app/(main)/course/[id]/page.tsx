"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCourseById, SetProgress } from "@/lib/actions/courseActions";
import LoadingState from "@/components/Loading";
import NotFoundState from "@/components/coursePage/NotFoundState";
import MobileMenuButton from "@/components/coursePage/MobileMenuButton";
import CourseHeader from "@/components/coursePage/CourseHeader";
import CourseSidebar from "@/components/coursePage/CourseSidebar";
import CourseContent from "@/components/coursePage/CourseContent";
import { Course, Subtopic } from "@/lib/types/course";
import {
  useCurrentUser,
  useIsAuthenticated,
} from "@/lib/session/clientSession";

export default function CoursePage() {
  const router = useRouter();
  const params = useParams();
  const isLoggedIn = useIsAuthenticated();
  const user = useCurrentUser();

  const [course, setCourse] = useState<Course | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<Subtopic | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [completedSubtopics, setCompletedSubtopics] = useState<Set<string>>(
    new Set()
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchCourse = async () => {
    try {
      const result = await getCourseById(params.id as string);

      if (result.error || !result.course) {
        console.error("Error:", result.error);
        setLoading(false);
        return;
      }

      console.log("result.course", result.course);
      setCourse(result.course as Course);
      if (result.course.subtopics.length > 0) {
        setSelectedSubtopic(result.course.subtopics[0] as Subtopic);
      }

      const completedTopicSet = new Set<string>();
      if (result.course.progress.length > 0) {
        for (const ele of result.course.progress) {
          if (ele.completed) {
            completedTopicSet.add(ele.subtopicId);
          }
        }
        setCompletedSubtopics(completedTopicSet);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching course:", error);
      setLoading(false);
    }
  };

  const handleMarkAsComplete = async (subtopicId: string) => {
    if (!user?.id || !course?.id) {
      console.error("User or course not found");
      return;
    }

    const isCurrentlyCompleted = completedSubtopics.has(subtopicId);
    const newStatus = !isCurrentlyCompleted;

    setCompletedSubtopics((prev) => {
      const newSet = new Set(prev);
      if (newStatus) {
        newSet.add(subtopicId);
      } else {
        newSet.delete(subtopicId);
      }
      return newSet;
    });

    const result = await SetProgress(user.id, course.id, subtopicId, newStatus);

    if (result?.error) {
      console.error("Failed to save progress:", result.error);
      setCompletedSubtopics((prev) => {
        const newSet = new Set(prev);
        if (newStatus) {
          newSet.delete(subtopicId);
        } else {
          newSet.add(subtopicId);
        }
        return newSet;
      });
    }
  };

  const isSubtopicCompleted = (subtopicId: string) => {
    return completedSubtopics.has(subtopicId);
  };

  const handleSubtopicSelect = (subtopic: Subtopic) => {
    setSelectedSubtopic(subtopic);
    setIsSidebarOpen(false);
  };

  const handleTakeQuiz = () => {
    router.push(
      `/quiz/${selectedSubtopic?.quizzes[0].id}?title=${selectedSubtopic?.title}`
    );
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/searchcourses");
      return;
    }
    if (!params.id) {
      router.push("/searchcourses");
      return;
    }
    fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (!course) {
    return <NotFoundState />;
  }

  return (
    <>
      <CourseHeader courseTitle={course.mainTopic} />
      <div className="min-h-screen bg-black">
        <MobileMenuButton
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-25 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div className="mx-auto flex">
          <CourseSidebar
            subtopics={course.subtopics}
            selectedSubtopic={selectedSubtopic}
            completedSubtopics={completedSubtopics}
            isOpen={isSidebarOpen}
            onSubtopicSelect={handleSubtopicSelect}
            onClose={() => setIsSidebarOpen(false)}
          />

          <CourseContent
            selectedSubtopic={selectedSubtopic}
            isCompleted={
              selectedSubtopic
                ? isSubtopicCompleted(selectedSubtopic.id)
                : false
            }
            onMarkAsComplete={handleMarkAsComplete}
            onTakeQuiz={handleTakeQuiz}
          />
        </div>
      </div>
    </>
  );
}
