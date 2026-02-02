"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon, Home } from "lucide-react";

const BlogHeader = () => {
  const [isDark, setIsDark] = useState(false);

  // Sync with your system/app theme logic
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="max-w-4xl  mx-auto  fixed top-6 left-0 right-0 z-50 flex justify-end  px-6">
      <nav className="flex items-center gap-2 p-2 rounded-sm border border-soft-white dark:border-dark-primary bg-soft-white/80 dark:bg-dark-tertiary/80 backdrop-blur-md shadow-sm transition-all">
        {/* Home Link */}
        <Link
          href="/"
          className="flex items-center justify-center w-10 h-10 rounded-full text-dark-tertiary dark:text-light hover:bg-light dark:hover:bg-dark-tertiary transition-colors"
          title="Home"
        >
          <Home size={20} />
        </Link>

        {/* Separator */}
        <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-800 mx-1" />

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-10 h-10 rounded-full text-dark-tertiary dark:text-soft-white hover:bg-light dark:hover:bg-dark-tertiary transition-colors"
          title="Toggle Theme"
        >
          {isDark ? (
            <Sun size={20} className="text-dark-secondary dark:text-light" />
          ) : (
            <Moon size={20} className="text-dark-secondary dark:text-light" />
          )}
        </button>
      </nav>
    </header>
  );
};

export default BlogHeader;
