"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize from localStorage or media query if needed
    if (document.documentElement.classList.contains("dark")) {
      setDark(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark, mounted]);

  if (!mounted) {
    return <div className="h-9 w-9" />; // Placeholder with same dimensions
  }

  return (
    <button
      onClick={() => setDark(!dark)}
      className="flex items-center justify-center rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}