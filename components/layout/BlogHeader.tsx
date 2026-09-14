"use client";
import React from "react";
import Link from "next/link";
import { Sun, Moon, Home } from "lucide-react";
import { useTheme } from "next-themes";

const BlogHeader = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="max-w-4xl  mx-auto  fixed top-6 left-0 right-0 z-50 flex justify-end  px-6">
      <nav className="flex items-center gap-2 p-2 rounded-sm border border-soft-white dark:border-dark-tertiary bg-soft-white/80 dark:bg-dark-tertiary/80 backdrop-blur-md shadow-sm transition-all">
        {/* Home Link */}
        <Link
          href="/"
          className="flex items-center justify-center w-10 h-10 rounded-full text-dark-tertiary dark:text-light hover:bg-light dark:hover:bg-dark-tertiary transition-colors"
          title="Home"
        >
          <Home size={20} />
        </Link>

        {/* Separator */}
        <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-700 mx-1" />

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center justify-center w-10 h-10 rounded-full text-dark-tertiary dark:text-soft-white hover:bg-light dark:hover:bg-dark-tertiary transition-colors"
          title="Toggle Theme"
        >
          {theme === "dark" ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>
      </nav>
    </header>
  );
};

export default BlogHeader;
