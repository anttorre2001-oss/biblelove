import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type ThemeProfile = "parchment" | "midnight" | "forest" | "sepia" | "contrast";

const THEME_KEY = "bible-theme-profile";
const DARK_KEY = "bible-dark-mode";

export const themeProfiles: Record<ThemeProfile, { label: string; description: string; emoji: string }> = {
  parchment: { label: "Parchment", description: "Warm cream & terracotta", emoji: "📜" },
  midnight: { label: "Midnight Navy", description: "Deep blue & gold", emoji: "🌙" },
  forest: { label: "Forest Study", description: "Earthy greens & wood tones", emoji: "🌿" },
  sepia: { label: "Sepia Classic", description: "Aged paper & brown ink", emoji: "📖" },
  contrast: { label: "High Contrast", description: "Sharp black & white", emoji: "⚡" },
};

function getInitialTheme(): ThemeProfile {
  try {
    return (localStorage.getItem(THEME_KEY) as ThemeProfile) || "parchment";
  } catch {
    return "parchment";
  }
}

function getInitialDark(): boolean {
  try {
    const stored = localStorage.getItem(DARK_KEY);
    if (stored !== null) return stored === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return false;
  }
}

function applyThemeToDOM(t: ThemeProfile, dark: boolean) {
  const root = document.documentElement;
  root.classList.remove("theme-parchment", "theme-midnight", "theme-forest", "theme-sepia", "theme-contrast", "dark");
  root.classList.add(`theme-${t}`);
  if (dark) root.classList.add("dark");
}

interface ThemeContextValue {
  theme: ThemeProfile;
  setTheme: (t: ThemeProfile) => void;
  isDark: boolean;
  setIsDark: (d: boolean) => void;
  toggleDark: () => void;
  profiles: typeof themeProfiles;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useThemeState() {
  const [theme, setThemeState] = useState<ThemeProfile>(getInitialTheme);
  const [isDark, setIsDarkState] = useState(getInitialDark);

  const setTheme = useCallback((t: ThemeProfile) => {
    setThemeState(t);
    localStorage.setItem(THEME_KEY, t);
  }, []);

  const setIsDark = useCallback((d: boolean) => {
    setIsDarkState(d);
    localStorage.setItem(DARK_KEY, String(d));
  }, []);

  const toggleDark = useCallback(() => {
    setIsDarkState((prev) => {
      const next = !prev;
      localStorage.setItem(DARK_KEY, String(next));
      return next;
    });
  }, []);

  useEffect(() => {
    applyThemeToDOM(theme, isDark);
  }, [theme, isDark]);

  return { theme, setTheme, isDark, setIsDark, toggleDark, profiles: themeProfiles };
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
