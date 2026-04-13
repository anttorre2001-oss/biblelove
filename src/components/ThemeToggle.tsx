import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

// Light/dark overlay toggle. This is independent of the named color
// profile handled by useTheme.ts (`bible-theme-profile` key).
const THEME_KEY = "bible-theme";

export function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored) return stored === "dark";
    } catch {
      // fall through to system preference
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (dark) {
      root.classList.add("dark");
      body.classList.add("dark");
    } else {
      root.classList.remove("dark");
      body.classList.remove("dark");
    }
    try {
      localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
    } catch {
      // ignore quota / privacy errors
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className={cn(
        "h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300",
        "border border-border bg-card hover:bg-muted shadow-warm"
      )}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? (
        <Sun className="h-4 w-4 text-primary" />
      ) : (
        <Moon className="h-4 w-4 text-muted-foreground" />
      )}
    </button>
  );
}
