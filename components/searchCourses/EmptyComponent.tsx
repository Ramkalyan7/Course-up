"use client"
import { useRouter } from "next/navigation";

const EmptyStateComponent = () => {

    const router = useRouter()

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
      <button
        onClick={() => {
          router.push(`/searchcourses?q=&d=&p=`);
        }}
        className="px-8 py-3 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/30"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default EmptyStateComponent;
