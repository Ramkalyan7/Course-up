"use client";
import { useRouter } from "next/navigation";

export default function NotFoundState() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="text-center">
        <p className="text-gray-300 text-lg mb-6">Course not found</p>
        <button
          onClick={() => router.push("/searchcourses")}
          className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black font-semibold rounded-lg transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
