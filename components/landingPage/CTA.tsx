"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CTA() {
  const router = useRouter();

  return (
    <section className="relative py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Background Image */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&h=600&fit=crop"
              alt="CTA Background"
              className="w-full h-full object-cover opacity-10"
              height={600}
              width={1400}
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
              Join thousands of learners and start your personalized learning
              journey now. It&apos;s free to get started!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/register")}
                className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black font-bold text-xl rounded-xl transition-all shadow-2xl shadow-emerald-500/50 hover:scale-105"
              >
                Get Started For Free
              </button>
              <button
                onClick={() => router.push("/login")}
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
