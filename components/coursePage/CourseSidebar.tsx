import { Subtopic } from "@/lib/types/course";

interface CourseSidebarProps {
  subtopics: Subtopic[];
  selectedSubtopic: Subtopic | null;
  completedSubtopics: Set<string>;
  isOpen: boolean;
  onSubtopicSelect: (subtopic: Subtopic) => void;
  onClose: () => void;
}

export default function CourseSidebar({
  subtopics,
  selectedSubtopic,
  completedSubtopics,
  isOpen,
  onSubtopicSelect,
  onClose,
}: CourseSidebarProps) {
  return (
    <aside
      className={`fixed lg:sticky inset-y-0 lg:inset-y-auto left-0 lg:top-[73px] w-80 lg:h-[calc(100vh-73px)] bg-gray-900/95 lg:bg-gray-900/50 backdrop-blur-sm border-r border-gray-800 z-25 transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } flex flex-col`}
    >
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center justify-between lg:block">
          <div>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
              Course Modules
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {completedSubtopics.size} / {subtopics.length} completed
            </p>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-emerald-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-black">
        {subtopics.map((subtopic, index) => (
          <button
            key={subtopic.id}
            onClick={() => onSubtopicSelect(subtopic)}
            className={`relative w-full text-left p-4 rounded-xl transition-all duration-200 group ${
              selectedSubtopic?.id === subtopic.id
                ? "bg-linear-to-r from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30 scale-105"
                : "bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 hover:border-emerald-500/30"
            }`}
          >
            {completedSubtopics.has(subtopic.id) && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}

            <div className="flex items-start gap-3">
              <div
                className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                  selectedSubtopic?.id === subtopic.id
                    ? "bg-black/30 text-white"
                    : "bg-gray-700/50 text-gray-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-400"
                }`}
              >
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`font-semibold text-sm mb-1 line-clamp-2 ${
                    selectedSubtopic?.id === subtopic.id ? "text-white" : "text-gray-200"
                  }`}
                >
                  {subtopic.title}
                </p>
                <span
                  className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                    selectedSubtopic?.id === subtopic.id ? "bg-black/30 text-gray-200" : "bg-gray-700/50 text-gray-400"
                  }`}
                >
                  {subtopic.difficulty}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
