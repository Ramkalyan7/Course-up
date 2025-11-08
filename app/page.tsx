"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}


 function Hero() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop"
          alt="Students learning"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

     

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="inline-block mb-6">
          <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-bold rounded-full">
            ✨ AI-Powered Learning Platform
          </span>
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
          <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent">
            Learn Anything
          </span>
          <br />
          <span className="text-white">In Minutes</span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Transform any topic into a complete, personalized learning path with AI. 
          Start learning smarter, not harder.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => router.push("/signup")}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black font-bold text-lg rounded-xl transition-all shadow-2xl shadow-emerald-500/50 hover:scale-105 flex items-center gap-3"
          >
            <span>Start Learning Free</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <button
            onClick={() => router.push("/courses")}
            className="px-8 py-4 bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 hover:border-emerald-500/50 text-gray-300 hover:text-emerald-400 font-bold text-lg rounded-xl transition-all"
          >
            Explore Courses
          </button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div>
            <p className="text-4xl font-bold text-emerald-400 mb-2">10K+</p>
            <p className="text-gray-500 text-sm">Active Learners</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-emerald-400 mb-2">500+</p>
            <p className="text-gray-500 text-sm">Courses Created</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-emerald-400 mb-2">95%</p>
            <p className="text-gray-500 text-sm">Satisfaction Rate</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}


 function Features() {
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


 function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Enter Your Topic",
      description: "Simply type in what you want to learn - anything from Python to Photography.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
    },
    {
      number: "02",
      title: "AI Creates Your Course",
      description: "Our AI generates a complete course with lessons, examples, and resources in seconds.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    },
    {
      number: "03",
      title: "Learn & Practice",
      description: "Study at your own pace, watch videos, read articles, and take quizzes to test your knowledge.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
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






 function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Developer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      content: "CourseUp helped me learn React in just two weeks. The AI-generated content was spot-on and the quizzes really helped reinforce my learning.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Marketing Manager",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      content: "I've tried many learning platforms, but none compare to the personalization and quality of CourseUp. It's like having a personal tutor available 24/7.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Design Student",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      content: "The best investment in my education. The courses are comprehensive, engaging, and I can learn at my own pace. Highly recommend!",
      rating: 5,
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6">
            <span className="text-white">Loved By</span>{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
              Learners
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join thousands of students transforming their learning journey
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-800 hover:border-emerald-500/50 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-emerald-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
                />
                <div>
                  <p className="font-bold text-gray-100">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




function CTA() {
  const router = useRouter();

  return (
    <section className="relative py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Background Image */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&h=600&fit=crop"
              alt="CTA Background"
              className="w-full h-full object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20" />
          </div>

          {/* Content */}
          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-3xl p-12 sm:p-16 border-2 border-emerald-500/20 text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6">
              <span className="text-white">Ready To Start</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                Learning Today?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of learners and start your personalized learning journey now. It&apos;s free to get started!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/signup")}
                className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black font-bold text-xl rounded-xl transition-all shadow-2xl shadow-emerald-500/50 hover:scale-105"
              >
                Get Started Free
              </button>
              <button
                onClick={() => router.push("/courses")}
                className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 hover:border-emerald-500/50 text-white font-bold text-xl rounded-xl transition-all"
              >
                Browse Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}





function Footer() {
  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Pricing", href: "/pricing" },
      { name: "Courses", href: "/courses" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Licenses", href: "/licenses" },
    ],
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-xl">C</span>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                CourseUp
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              AI-powered learning platform that helps you master any subject in minutes.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-emerald-500/20 rounded-lg flex items-center justify-center transition-all">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-emerald-500/20 rounded-lg flex items-center justify-center transition-all">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-emerald-500/20 rounded-lg flex items-center justify-center transition-all">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-emerald-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-emerald-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-emerald-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 CourseUp. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Made with ❤️ for learners worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
