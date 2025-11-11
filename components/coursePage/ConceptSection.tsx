import { Concept } from "@/lib/types/course";


interface ConceptsSectionProps {
  concepts: Concept[];
}

export default function ConceptsSection({ concepts }: ConceptsSectionProps) {
  return (
    <section className="mb-6 sm:mb-10">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-base sm:text-lg">💡</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-100">Key Concepts</h2>
      </div>
      <div className="space-y-4 sm:space-y-5">
        {concepts.map((concept, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 sm:p-7 border border-gray-700/50 hover:border-emerald-500/30 transition-all shadow-lg hover:shadow-emerald-500/10 group"
          >
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/30 text-sm sm:text-base">
                {index + 1}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                {concept.concept}
              </h3>
            </div>
            <p className="text-gray-300 mb-4 sm:mb-5 leading-relaxed pl-0 sm:pl-14 text-sm sm:text-base">
              {concept.explanation}
            </p>
            <div className="bg-black/50 rounded-lg p-4 sm:p-5 border-l-4 border-emerald-500 ml-0 sm:ml-14">
              <p className="text-xs text-emerald-400 font-semibold mb-2 uppercase tracking-wide">
                Example
              </p>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                {concept.example}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
