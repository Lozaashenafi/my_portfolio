"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Fix hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <header className="bg-soft-white dark:bg-dark-primary text-dark-primary dark:text-soft-white py-4 px-6 md:px-10 transition-colors duration-300 sticky top-0 z-50 border-b border-slate-100 dark:border-soft-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between md:grid md:grid-cols-3">
        {/* Left: Logo */}
        <div className="text-primary dark:text-secondary font-bold text-2xl cursor-pointer">
          {"<dev/>"}
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden md:flex justify-center space-x-8 text-dark-tertiary dark:text-light font-medium">
          {["About", "Projects", "Skills", "Blog", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-primary transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex justify-end items-center space-x-3">
          <button className="hidden sm:block bg-primary hover:bg-secondary text-soft-white px-5 py-2 rounded-sm text-sm font-semibold transition">
            Let's Talk
          </button>

          {/* 🌙 Dark Mode Toggle */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="text-dark-tertiary dark:text-soft-white"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Mobile Menu */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden mt-4 flex flex-col space-y-4 pb-4 animate-in slide-in-from-top">
          {["About", "Projects", "Skills", "Blog", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-center py-2 border-b border-slate-50 dark:border-soft-white/5"
            >
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
