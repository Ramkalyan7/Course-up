import { Subtopic } from "@/lib/types/course";
import ActionButtons from "./ActionButtons";
import ArticlesSection from "./ArticleSection";
import ConceptsSection from "./ConceptSection";
import IntroductionSection from "./IntroSection";
import ModuleHeader from "./ModuleHeader";
import SummarySection from "./SummarySection";
import VideosSection from "./VideoSection";

interface CourseContentProps {
  selectedSubtopic: Subtopic | null;
  isCompleted: boolean;
  onMarkAsComplete: (id: string) => void;
  onTakeQuiz: () => void;
}

export default function CourseContent({
  selectedSubtopic,
  isCompleted,
  onMarkAsComplete,
  onTakeQuiz,
}: CourseContentProps) {
  if (!selectedSubtopic) return null;

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-4xl mx-auto">
        <ModuleHeader
          title={selectedSubtopic.title}
          description={selectedSubtopic.description}
          difficulty={selectedSubtopic.difficulty}
          isCompleted={isCompleted}
        />

        <ActionButtons
          hasQuiz={selectedSubtopic.quizzes && selectedSubtopic.quizzes.length > 0}
          isCompleted={isCompleted}
          onTakeQuiz={onTakeQuiz}
          onMarkAsComplete={() => onMarkAsComplete(selectedSubtopic.id)}
        />

        <IntroductionSection introduction={selectedSubtopic.introduction} />
        <ConceptsSection concepts={selectedSubtopic.concepts} />
        <VideosSection videos={selectedSubtopic.videos} />
        <ArticlesSection articles={selectedSubtopic.articles} />
        <SummarySection summary={selectedSubtopic.summary} />
      </div>
    </main>
  );
}
