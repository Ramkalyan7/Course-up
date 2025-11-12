"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      if (!formData.password || !formData.email) {
        setError("Enter both Email and Password");
        setIsLoading(false);
        return;
      }

      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (!res?.ok) {
        setError(res?.error as string);
        setIsLoading(false);
        return;
      } else {
        router.push("/searchcourses");
        return;
      }
    } catch (error) {
      console.log("loggin in", error);
      setIsLoading(false);
      setError("Error while Logging In . Please try again!");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href={"/"}>
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <span className="text-black font-bold text-2xl">C</span>
              </div>
              <h1 className="text-3xl font-black bg-linear-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                CourseUp
              </h1>
            </div>
          </Link>
          <p className="text-gray-400 text-lg">Welcome back!</p>
        </div>

        {/* Login Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-r from-emerald-500/10 to-transparent rounded-2xl blur-xl" />
          <div className="relative bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-emerald-500/20 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">Sign In</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  className="w-full px-4 py-3 bg-black/50 border-2 border-gray-700 focus:border-emerald-500 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-300 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  className="w-full px-4 py-3 bg-black/50 border-2 border-gray-700 focus:border-emerald-500 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:from-gray-700 disabled:to-gray-700 text-black disabled:text-gray-500 font-bold rounded-lg transition-all shadow-lg shadow-emerald-500/30 disabled:shadow-none flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="mt-6 text-center text-gray-400 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
