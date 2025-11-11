interface ModuleHeaderProps {
  title: string;
  description: string;
  difficulty: string;
  isCompleted: boolean;
}

export default function ModuleHeader({ title, description, difficulty, isCompleted }: ModuleHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-2xl blur-xl"></div>
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-emerald-500/20 shadow-xl">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-xs font-bold rounded-full uppercase tracking-wide">
            {difficulty}
          </span>
          {isCompleted && (
            <div className="flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-xs font-bold rounded-full">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>COMPLETED</span>
            </div>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mb-3 sm:mb-4 leading-tight">
          {title}
        </h1>
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
