import { useState, useEffect, useCallback } from "react";

const HIGHLIGHTS_KEY = "bible-highlights";

export type HighlightColor = "gold" | "sage" | "sky" | "rose";

export interface Highlight {
  reference: string; // e.g. "Genesis 1:1"
  text: string;
  color: HighlightColor;
  day: number;
  timestamp: number;
}

export const highlightColorMap: Record<HighlightColor, string> = {
  gold: "bg-amber-200/60",
  sage: "bg-green-200/50",
  sky: "bg-sky-200/50",
  rose: "bg-rose-200/50",
};

export const highlightColorValues: Record<HighlightColor, string> = {
  gold: "hsl(45 93% 70%)",
  sage: "hsl(140 30% 70%)",
  sky: "hsl(200 80% 75%)",
  rose: "hsl(350 70% 75%)",
};

function loadHighlights(): Highlight[] {
  try {
    const stored = localStorage.getItem(HIGHLIGHTS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed as Highlight[];
    }
  } catch {
    // corrupted / unavailable storage — fall back to empty state
  }
  return [];
}

export function useHighlights() {
  const [highlights, setHighlights] = useState<Highlight[]>(loadHighlights);

  useEffect(() => {
    try {
      localStorage.setItem(HIGHLIGHTS_KEY, JSON.stringify(highlights));
    } catch {
      // ignore quota / privacy errors
    }
  }, [highlights]);

  const addHighlight = useCallback((highlight: Omit<Highlight, "timestamp">) => {
    setHighlights((prev) => [...prev, { ...highlight, timestamp: Date.now() }]);
  }, []);

  const removeHighlight = useCallback((timestamp: number) => {
    setHighlights((prev) => prev.filter((h) => h.timestamp !== timestamp));
  }, []);

  const getHighlightsForDay = useCallback(
    (day: number) => highlights.filter((h) => h.day === day),
    [highlights]
  );

  const getHighlightsForReference = useCallback(
    (reference: string) => highlights.filter((h) => h.reference === reference),
    [highlights]
  );

  return {
    highlights,
    addHighlight,
    removeHighlight,
    getHighlightsForDay,
    getHighlightsForReference,
    totalHighlights: highlights.length,
  };
}
