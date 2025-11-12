"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



const Search = ({initialSearchInput=""}:{initialSearchInput:string}) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/searchcourses?q=${searchInput}`);
  };

  useEffect(()=>{
    setSearchInput(initialSearchInput)
  },[initialSearchInput])

  return (
    <div className="mb-10 max-w-xl w-xl mx-auto">
      <div className="flex items-center gap-2">
        <div className=" flex-1">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for anything..."
            className="w-full px-6 py-3 bg-gray-900/80 backdrop-blur-xl border-2 border-gray-800 hover:border-emerald-500/50 focus:border-emerald-500 rounded-2xl text-gray-100 text-lg placeholder-gray-500 focus:outline-none transition-all shadow-2xl"
          />
        </div>

        {/* Search Button */}
        <button
          disabled={searchInput===initialSearchInput}
          onClick={handleSearch}
          className="px-5 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black font-bold rounded-2xl transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 flex items-center gap-2 whitespace-nowrap cursor-pointer"
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Search;
