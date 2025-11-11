import { Article } from "@/lib/types/course";

interface ArticlesSectionProps {
  articles: Article[];
}

export default function ArticlesSection({ articles }: ArticlesSectionProps) {
  if (articles.length === 0) return null;

  return (
    <section className="mb-6 sm:mb-10">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-base sm:text-lg">📄</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-100">Reading Materials</h2>
      </div>
      <div className="space-y-3 sm:space-y-4">
        {articles.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-900/70 backdrop-blur rounded-xl p-5 sm:p-6 border border-gray-700/50 hover:border-emerald-500/50 transition-all group shadow-lg hover:shadow-emerald-500/10"
          >
            <h3 className="font-semibold text-gray-100 mb-2 sm:mb-3 group-hover:text-emerald-400 transition-colors text-base sm:text-lg ">
              {article.title}
            </h3>
            <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed break-all">
              {article.snippet}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
