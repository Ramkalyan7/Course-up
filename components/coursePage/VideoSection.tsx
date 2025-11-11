interface VideosSectionProps {
  videos: Video[];
}

export default function VideosSection({ videos }: VideosSectionProps) {
  if (videos.length === 0) return null;

  return (
    <section className="mb-6 sm:mb-10">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-base sm:text-lg">🎥</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-100">Video Resources</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {videos.map((video, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700/50 hover:border-emerald-500/50 transition-all shadow-lg hover:shadow-emerald-500/20"
          >
            <div className="relative">
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${new URL(video.url).searchParams.get("v")}`}
                title={video.title}
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4 sm:p-5">
              <h3 className="font-semibold text-gray-100 mb-2 line-clamp-2 leading-snug text-sm sm:text-base">
                {video.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">{video.channelTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
