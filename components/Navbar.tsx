"use client";

import { useState } from "react";

interface NavbarProps {
  isLoggedIn?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

export default function Navbar({
  isLoggedIn = false,
  onLogin,
  onLogout,
}: NavbarProps) {
  return (
    <nav className="bg-black border-b border-gray-800 fixed left-0 right-0 top-0 z-50 backdrop-blur-sm w-full">
      <div className="w-full mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Side */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <span className="text-black font-bold text-xl">C</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                CourseUp
              </h1>
            </div>
          </div>

          {/* Login/Logout Button Side */}
          <div>
            {isLoggedIn ? (
              <button
                onClick={onLogout}
                className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-emerald-500/50 text-gray-300 hover:text-emerald-400 rounded-lg transition-all font-medium"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={onLogin}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black font-semibold rounded-lg transition-all shadow-lg shadow-emerald-500/30"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
