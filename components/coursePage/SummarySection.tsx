interface SummarySectionProps {
  summary: string;
}

export default function SummarySection({ summary }: SummarySectionProps) {
  return (
    <section className="mb-6 sm:mb-10">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-base sm:text-lg">📝</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-100">Summary</h2>
      </div>
      <div className="bg-gradient-to-br from-emerald-500/10 to-transparent rounded-xl p-5 sm:p-7 border-2 border-emerald-500/30 shadow-xl">
        <p className="text-gray-300 leading-relaxed text-base sm:text-lg">{summary}</p>
      </div>
    </section>
  );
}
