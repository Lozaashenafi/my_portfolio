"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 border border-dark-tertiary hover:border-primary transition-all rounded-sm flex items-center justify-center bg-dark-secondary"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} className="text-slate-900" />
      )}
    </button>
  );
};
