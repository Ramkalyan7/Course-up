export default function Features() {
  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Generation",
      description: "Our AI creates personalized learning paths tailored to your goals and learning style.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    },
    {
      icon: "📚",
      title: "Comprehensive Content",
      description: "Get detailed lessons, practical examples, video resources, and quizzes all in one place.",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop",
    },
    {
      icon: "⚡",
      title: "Learn at Your Pace",
      description: "Study when you want, track your progress, and complete courses on your own schedule.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
    },
    {
      icon: "🎯",
      title: "Interactive Quizzes",
      description: "Test your knowledge with AI-generated quizzes and get instant feedback on your answers.",
      image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&h=400&fit=crop",
    },
    {
      icon: "📊",
      title: "Track Progress",
      description: "Monitor your learning journey with detailed progress tracking and completion certificates.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    },
    {
      icon: "🌐",
      title: "Learn Anything",
      description: "From coding to cooking, generate courses on any topic that interests you.",
      image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&h=400&fit=crop",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
              Everything You Need
            </span>
            <br />
            <span className="text-white">To Learn Effectively</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Powerful features designed to make learning engaging, efficient, and enjoyable
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-800 hover:border-emerald-500/50 transition-all duration-500 hover:scale-105"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                <div className="absolute top-4 left-4 w-12 h-12 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/50 rounded-lg flex items-center justify-center text-2xl">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-emerald-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}