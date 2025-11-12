type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchBar({
  value,
  onChange,
  placeholder = "Search your courses...",
}: SearchBarProps) {
  return (
    <div className="relative w-full sm:max-w-2xl">
      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-5 flex items-center pointer-events-none">
        <svg
          className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500"
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
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 sm:pl-14 sm:pr-6 sm:py-4 bg-gray-900 border-2 border-gray-800 hover:border-emerald-500/50 focus:border-emerald-500 rounded-lg sm:rounded-xl text-gray-100 text-sm sm:text-lg placeholder-gray-500 focus:outline-none transition-all shadow-xl"
      />
    </div>
  );
}
