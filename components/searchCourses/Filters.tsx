"use client";

import { useRouter } from "next/navigation";

const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

type Props = {
  difficultyLevel: string;
  searchQuery: string;
};

const Filters = ({ difficultyLevel, searchQuery }: Props) => {
  const router = useRouter();

  const handleFilterClick = (difficulty: string) => {
    router.push(`/searchcourses/?q=${searchQuery}&d=${difficulty}`);

    return;
  };

  return (
    <div className="mb-10 flex flex-wrap justify-center gap-3">
      {difficulties.map((difficulty) => (
        <button
          key={difficulty}
          onClick={() => {
            handleFilterClick(difficulty);
          }}
          className={`px-6 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${
            difficultyLevel.toLowerCase() ===
            difficulty.toLowerCase()
              ? "bg-linear-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
              : "bg-gray-900 text-gray-400 hover:text-emerald-400 border border-gray-800 hover:border-emerald-500/30"
          }`}
        >
          {difficulty}
        </button>
      ))}
    </div>
  );
};

export default Filters;
