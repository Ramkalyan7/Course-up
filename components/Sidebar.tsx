"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/searchcourses", label: "Courses", icon: "📚" },
    { href: "/yourcourses", label: "Your Courses", icon: "🎓" },
    { href: "/createcourse", label: "Generate Course", icon: "✨" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 lg:hidden p-2 bg-gray-900 hover:bg-gray-800 border-2 border-emerald-600 hover:border-emerald-500/50 rounded-lg transition-all"
      >
        <svg
          className="w-6 h-6 text-emerald-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar (fixed) */}
      <aside
        className={`pt-20 fixed left-0 top-0 h-screen w-72 bg-black border-r border-gray-800 z-40 transition-transform duration-300 lg:hidden overflow-hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Navigation Links */}
        <nav className="px-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group ${
                isActive(link.href)
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
                  : "text-gray-400 hover:text-emerald-400 hover:bg-gray-900/30"
              }`}
            >
              <span className="text-2xl">{link.icon}</span>
              <span className="font-semibold">{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
          <div className="bg-gradient-to-br from-emerald-500/10 to-transparent rounded-xl p-4 border border-emerald-500/20">
            <p className="text-sm text-gray-400 mb-2">Need help?</p>
            <button className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition-colors">
              Contact Support →
            </button>
          </div>
        </div>
      </aside>

      {/* Desktop Sidebar (static, part of layout) */}
      <aside className="hidden lg:block w-64 bg-black border-r border-gray-800 overflow-hidden max-h-screen sticky top-0 left-0 pt-20">
        {/* Navigation Links */}
        <nav className="px-4 space-y-1 pt-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group ${
                isActive(link.href)
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
                  : "text-gray-400 hover:text-emerald-400 hover:bg-gray-900/30"
              }`}
            >
              <span className="text-2xl">{link.icon}</span>
              <span className="font-semibold">{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
