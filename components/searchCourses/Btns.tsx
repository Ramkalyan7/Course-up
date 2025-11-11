"use client";

import { useRouter } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchQuery: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  searchQuery,
}: PaginationProps) {
  const router = useRouter();

  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Show all pages if 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      router.push(`/searchcourses?q=${searchQuery}&p=${currentPage - 1}`);
      return;
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      router.push(`/searchcourses?q=${searchQuery}&p=${currentPage + 1}`);
      return;
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-900/50 border border-gray-800 hover:border-emerald-500/50 disabled:border-gray-800 text-gray-300 hover:text-emerald-400 disabled:text-gray-600 rounded-lg transition-all disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-gray-500"
              >
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <button
              onClick={() => {
                router.push(
                  `/searchcourses?q=${searchQuery}&p=${pageNumber}`
                );
                return;
              }}
              key={pageNumber}
              className={`min-w-[40px] h-10 rounded-lg font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-emerald-500/50 text-gray-300 hover:text-emerald-400"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-900/50 border border-gray-800 hover:border-emerald-500/50 disabled:border-gray-800 text-gray-300 hover:text-emerald-400 disabled:text-gray-600 rounded-lg transition-all disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
      >
        <span className="hidden sm:inline">Next</span>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
