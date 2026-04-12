import { useState, useEffect } from "react";

export type ThemeProfile = "parchment" | "midnight" | "forest" | "sepia" | "contrast";

const THEME_KEY = "bible-theme-profile";

export const themeProfiles: Record<ThemeProfile, { label: string; description: string; emoji: string }> = {
  parchment: { label: "Parchment", description: "Warm cream & terracotta", emoji: "📜" },
  midnight: { label: "Midnight Navy", description: "Deep blue & gold", emoji: "🌙" },
  forest: { label: "Forest Study", description: "Earthy greens & wood tones", emoji: "🌿" },
  sepia: { label: "Sepia Classic", description: "Aged paper & brown ink", emoji: "📖" },
  contrast: { label: "High Contrast", description: "Sharp black & white", emoji: "⚡" },
};

export function useTheme() {
  const [theme, setTheme] = useState<ThemeProfile>(() => {
    try {
      return (localStorage.getItem(THEME_KEY) as ThemeProfile) || "parchment";
    } catch {
      return "parchment";
    }
  });

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    const root = document.documentElement;
    // Remove all theme classes
    root.classList.remove("theme-parchment", "theme-midnight", "theme-forest", "theme-sepia", "theme-contrast");
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  return { theme, setTheme, profiles: themeProfiles };
}
