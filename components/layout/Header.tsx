"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const navItems = ["About", "Projects", "Skills", "Blog", "Experience"];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center px-6">
      <nav className="w-full max-w-4xl p-2 rounded-sm border border-soft-white dark:border-white/5 bg-soft-white/80 dark:bg-dark-tertiary/80 backdrop-blur-md shadow-sm transition-all">
        {/* Changed justify-between to ensure items don't overlap */}
        <div className="flex items-center justify-between px-4 relative">
          {/* Left: Logo - Added w-1/4 to reserve space */}
          <div className="w-1/4">
            <Link
              href="/#home"
              className="text-primary dark:text-secondary font-bold text-2xl cursor-pointer"
            >
              {"<dev/>"}
            </Link>
          </div>

          {/* Center: Desktop Nav - Added z-20 and relative to stay "on top" of overlap */}
          <div className="hidden md:flex flex-1 justify-center space-x-8 text-dark-tertiary dark:text-light font-medium relative z-20">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-primary transition-colors text-sm uppercase tracking-widest whitespace-nowrap"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right: Actions - Added w-1/4 and z-10 */}
          <div className="flex w-1/4 justify-end items-center space-x-3 relative z-10">
            <Link
              href="#contact"
              className="hidden sm:block bg-primary hover:bg-secondary text-soft-white px-5 py-2 rounded-sm text-sm font-bold uppercase transition-all active:scale-95 whitespace-nowrap"
            >
              Let's Talk
            </Link>

            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="text-dark-tertiary dark:text-soft-white p-2 hover:text-primary transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              className="md:hidden p-2 text-dark-tertiary dark:text-soft-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden mt-2 w-full max-w-4xl bg-soft-white dark:bg-dark-tertiary border border-soft-white dark:border-white/5 rounded-sm flex flex-col space-y-2 p-4 animate-in slide-in-from-top-2 shadow-xl">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="text-center py-4 border-b border-slate-100 dark:border-soft-white/5 text-dark-tertiary dark:text-light last:border-0 font-bold uppercase text-xs tracking-widest"
            >
              {item}
            </a>
          ))}
          <Link
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="bg-primary text-soft-white py-4 rounded-sm font-bold uppercase text-center text-xs tracking-widest mt-2"
          >
            Let's Talk
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
