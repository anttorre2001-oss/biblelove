import { useState, useEffect, useCallback } from "react";

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

function getInitialDark(): boolean {
  try {
    const stored = localStorage.getItem(DARK_KEY);
    if (stored !== null) return stored === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return false;
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeProfile>(() => {
    try {
      return (localStorage.getItem(THEME_KEY) as ThemeProfile) || "parchment";
    } catch {
      return "parchment";
    }
  });

  const [isDark, setIsDark] = useState(getInitialDark);

  const applyTheme = useCallback((t: ThemeProfile, dark: boolean) => {
    const root = document.documentElement;
    // Remove all theme classes
    root.classList.remove("theme-parchment", "theme-midnight", "theme-forest", "theme-sepia", "theme-contrast", "dark");
    root.classList.add(`theme-${t}`);
    if (dark) {
      root.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    localStorage.setItem(DARK_KEY, String(isDark));
    applyTheme(theme, isDark);
  }, [theme, isDark, applyTheme]);

  const toggleDark = useCallback(() => setIsDark((d) => !d), []);

  return { theme, setTheme, isDark, setIsDark, toggleDark, profiles: themeProfiles };
}