import { useState, useEffect } from "react";

const PREFS_KEY = "bible-reading-prefs";

export interface ReadingPreferences {
  fontSize: number; // 16-28
  lineHeight: number; // 1.6-2.4
  fontFamily: "serif" | "sans" | "mono";
}

const defaults: ReadingPreferences = {
  fontSize: 18,
  lineHeight: 1.9,
  fontFamily: "serif",
};

function load(): ReadingPreferences {
  try {
    const stored = localStorage.getItem(PREFS_KEY);
    if (stored) return { ...defaults, ...JSON.parse(stored) };
  } catch {}
  return defaults;
}

export function useReadingPreferences() {
  const [prefs, setPrefs] = useState<ReadingPreferences>(load);

  useEffect(() => {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  }, [prefs]);

  const updatePref = <K extends keyof ReadingPreferences>(key: K, value: ReadingPreferences[K]) => {
    setPrefs((prev) => ({ ...prev, [key]: value }));
  };

  return { prefs, updatePref, resetPrefs: () => setPrefs(defaults) };
}
