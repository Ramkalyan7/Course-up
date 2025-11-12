export function CompletionBadge() {
  return (
    <div className="absolute -top-2 -right-2 z-20">
      <div className="relative">
        <div className="absolute inset-0 bg-emerald-500 rounded-full blur animate-pulse" />
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
