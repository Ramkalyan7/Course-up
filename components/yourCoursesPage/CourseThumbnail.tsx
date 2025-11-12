type CourseThumbnailProps = {
  imageUrl: string;
  mainTopic: string;
  progressPercentage: number;
  completedModules: number;
  totalModules: number;
};

export function CourseThumbnail({ 
  imageUrl, 
  mainTopic, 
  progressPercentage, 
  completedModules, 
  totalModules 
}: CourseThumbnailProps) {
  return (
    <div className="relative h-40 sm:h-48 bg-gray-800 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
      <img
        src={imageUrl}
        alt={mainTopic}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      
      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-white text-xs sm:text-sm font-bold">{progressPercentage}%</span>
          <span className="text-gray-300 text-xs">{completedModules}/{totalModules} modules</span>
        </div>
        <div className="w-full h-1.5 sm:h-2 bg-gray-800/50 backdrop-blur-sm rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
