import Pagination from "@/components/searchCourses/Btns";
import Course from "@/components/searchCourses/Course";
import EmptyStateComponent from "@/components/searchCourses/EmptyComponent";
import Filters from "@/components/searchCourses/Filters";
import Search from "@/components/searchCourses/Search";
import prisma from "@/lib/api/prisma";
import { Prisma } from "@/lib/generated/prisma";

type Props = {
  searchParams: Promise<{
    q?: string;
    p?: string;
    d?: string;
  }>;
};

export default async function CoursesPage({ searchParams }: Props) {
  const ITEMS_PER_PAGE = 6;
  const { q, p, d } = await searchParams;
  console.log(q, p, d);

  const searchQuery = q?.toLowerCase().trim() || "";
  let currentPage = parseInt(p || "1");
  const difficultyLevel = d?.toLocaleLowerCase().trim() || "all";

  const filter1: Prisma.CourseWhereInput = {
    difficulty:
      difficultyLevel === "all"
        ? undefined
        : {
            equals: difficultyLevel.toString(),
            mode: "insensitive",
          },
    OR: [
      { mainTopic: { contains: searchQuery, mode: "insensitive" } },
      { description: { contains: searchQuery, mode: "insensitive" } },
    ],
  };

  const filter2: Prisma.CourseWhereInput = {
    difficulty:
      difficultyLevel === "all"
        ? undefined
        : {
            equals: difficultyLevel.toString(),
            mode: "insensitive",
          },
  };

  const getCourses = async () => {
    try {
      const skip = (currentPage - 1) * ITEMS_PER_PAGE;
      const coursesList = await prisma.course.findMany({
        where:
          searchQuery.length > 0 ? filter1 : difficultyLevel ? filter2 : {},
        skip: skip > 0 ? skip : 0,
        take: ITEMS_PER_PAGE,
        select: {
          id: true,
          status: true,
          mainTopic: true,
          description: true,
          imageUrl: true,
          difficulty: true,
          _count: {
            select: {
              subtopics: true,
            },
          },
        },
      });
      return coursesList;
    } catch (error) {
      console.log("getCourses", error);
      return [];
    }
  };

  const getTotalPages = async () => {
    try {
      const totalPages = await prisma.course.count({
        where:
          searchQuery.length > 0 ? filter1 : difficultyLevel ? filter2 : {},
      });
      return totalPages;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  let TotalPages = await getTotalPages();
  TotalPages = Math.ceil(TotalPages / ITEMS_PER_PAGE);
  if (currentPage > TotalPages) currentPage = TotalPages;

  const courses = await getCourses();

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
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent mb-4 leading-tight">
              Explore Courses
            </h1>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto">
              Discover personalized learning paths crafted by AI
            </p>
          </div>

          <Search initialSearchInput={searchQuery} />
          <Filters
            difficultyLevel={difficultyLevel}
            searchQuery={searchQuery}
          />

          {courses.length > 0 && TotalPages > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course, index) => (
                  <Course key={course.id} course={course} index={index} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={TotalPages}
                searchQuery={searchQuery}
              />
            </>
          ) : (
            <EmptyStateComponent />
          )}
        </div>
      </div>
    </div>
  );
}
