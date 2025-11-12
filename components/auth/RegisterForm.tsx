"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RegisterUser from "@/lib/actions/auth/Register";

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const response = await RegisterUser(
      formData.email,
      formData.name,
      formData.password
    );
    if (!response.success) {
      setErrors({ ...errors, general: response.message });
    } else {
      router.push("/login");
    }
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
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
          <p className="text-gray-400 text-lg">Start your learning journey</p>
        </div>

        {/* Signup Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-r from-emerald-500/10 to-transparent rounded-2xl blur-xl" />
          <div className="relative bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-emerald-500/20 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">
              Create Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                {errors.general && (
                  <p className="mt-1 pb-2 text-sm text-red-400">
                    {errors.general}
                  </p>
                )}
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-300 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-black/50 border-2 ${
                    errors.name
                      ? "border-red-500"
                      : "border-gray-700 focus:border-emerald-500"
                  } rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none transition-all`}
                  placeholder="John Doe"
                  disabled={isLoading}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

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
                  className={`w-full px-4 py-3 bg-black/50 border-2 ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-700 focus:border-emerald-500"
                  } rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none transition-all`}
                  placeholder="you@example.com"
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
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
                  className={`w-full px-4 py-3 bg-black/50 border-2 ${
                    errors.password
                      ? "border-red-500"
                      : "border-gray-700 focus:border-emerald-500"
                  } rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none transition-all`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-300 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-black/50 border-2 ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-700 focus:border-emerald-500"
                  } rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none transition-all`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.confirmPassword}
                  </p>
                )}
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
                    <span>Creating account...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </button>
            </form>

            {/* Login Link */}
            <p className="mt-6 text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
