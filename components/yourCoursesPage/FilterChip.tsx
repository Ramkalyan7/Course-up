type FilterChipProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

export function FilterChip({ label, isActive, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold transition-all cursor-pointer text-xs sm:text-base touch-manipulation whitespace-nowrap ${
        isActive
          ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
          : "bg-gray-900 text-gray-400 hover:text-emerald-400 border border-gray-800 hover:border-emerald-500/30"
      }`}
    >
      {label}
    </button>
  );
}
