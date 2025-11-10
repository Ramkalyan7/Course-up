const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

const Filters = ({difficultyLevel}:{difficultyLevel:string}) => {
  return (
    <div className="mb-10 flex flex-wrap justify-center gap-3">
      {difficulties.map((difficulty) => (
        <button
          key={difficulty}
          className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
            difficultyLevel.toLocaleLowerCase() ===
            difficulty.toLocaleUpperCase()
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
