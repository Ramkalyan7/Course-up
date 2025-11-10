import Pagination from "@/components/searchCourses/Btns";
import Course from "@/components/searchCourses/Course";
import Filters from "@/components/searchCourses/Filters";
import Search from "@/components/searchCourses/Search";
import prisma from "@/lib/api/prisma";
import Link from "next/link";

type Props = {
  searchParams: Promise<{
    q?: string;
    p?: string;
    d?: string;
  }>;
};

export default async function CoursesPage({ searchParams }: Props) {
  const ITEMS_PER_PAGE = 3;
  const { q, p, d } = await searchParams;

  const searchQuery = q?.toLowerCase().trim() || "";
  let currentPage = parseInt(p || "1");
  const difficultyLevel = d?.toLocaleLowerCase().trim() || "all";

  const getCourses = async () => {
    const skip = currentPage - 1 * ITEMS_PER_PAGE;
    const coursesList = await prisma.course.findMany({
      where:
        searchQuery.length > 0
          ? {
              mainTopic: { contains: searchQuery, mode: "insensitive" },
              difficulty: difficultyLevel=="all" ? undefined : difficultyLevel,
            }
          : {},
      skip: skip > 0 ? skip : 0,
      take: ITEMS_PER_PAGE,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        status: true,
        mainTopic: true,
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
  };

  const getTotalPages = async () => {
    const totalPages = await prisma.course.count({
      where:
        searchQuery.length > 0
          ? {
              mainTopic: { contains: searchQuery, mode: "insensitive" },
              difficulty: difficultyLevel,
            }
          : {},
    });
    return totalPages;
  };

  let TotalPages = await getTotalPages();
  TotalPages = Math.ceil(TotalPages / ITEMS_PER_PAGE);
  if (currentPage > TotalPages) currentPage = TotalPages;

  const courses = await getCourses();
  console.log(courses);
  console.log(TotalPages);

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

          <Search />
          <Filters difficultyLevel={difficultyLevel} />

          {courses.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course, index) => (
                  <Course key={course.id} course={course} index={index} />
                ))}
              </div>
              <Pagination currentPage={currentPage} totalPages={TotalPages} />
            </>
          ) : (
            <EmptyStateComponent />
          )}
        </div>
      </div>
    </div>
  );
}

const EmptyStateComponent = () => {
  return (
    <div className="text-center py-32">
      <div className="relative inline-block mb-8">
        <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl" />
        <div className="relative w-24 h-24 bg-linear-to-br from-gray-900 to-gray-800 rounded-full flex items-center justify-center border border-gray-800">
          <span className="text-5xl">🔍</span>
        </div>
      </div>
      <h3 className="text-3xl font-bold text-gray-300 mb-3">
        No courses found
      </h3>
      <p className="text-gray-500 mb-8 text-lg">
        Try adjusting your search or filter criteria
      </p>
      <Link
        href={"/searchcourses"}
        className="px-8 py-3 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/30"
      >
        Clear Filters
      </Link>
    </div>
  );
};
