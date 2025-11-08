export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Enter Your Topic",
      description:
        "Simply type in what you want to learn - anything from Python to Photography.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
    },
    {
      number: "02",
      title: "AI Creates Your Course",
      description:
        "Our AI generates a complete course with lessons, examples, and resources in seconds.",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    },
    {
      number: "03",
      title: "Learn & Practice",
      description:
        "Study at your own pace, watch videos, read articles, and take quizzes to test your knowledge.",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
    },
  ];

  return (
    <section className="relative py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6">
            <span className="text-white">How It</span>{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Three simple steps to start your learning journey
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-24">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="flex-1 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent rounded-2xl blur-3xl" />
                <div className="relative rounded-2xl overflow-hidden border-2 border-gray-800 hover:border-emerald-500/50 transition-all shadow-2xl">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 relative">
                <div className="text-8xl font-black text-emerald-500/10 absolute -top-8 -left-4">
                  {step.number}
                </div>
                <div className="relative">
                  <div className="inline-block mb-4">
                    <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-bold rounded-full">
                      Step {step.number}
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                    {step.title}
                  </h3>
                  <p className="text-xl text-gray-400 leading-relaxed mb-8">
                    {step.description}
                  </p>
                  <div className="flex gap-2">
                    <div className="w-12 h-1 bg-emerald-500 rounded-full" />
                    <div className="w-12 h-1 bg-emerald-500/30 rounded-full" />
                    <div className="w-12 h-1 bg-emerald-500/10 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
