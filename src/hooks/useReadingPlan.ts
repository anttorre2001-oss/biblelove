import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "bible-reading-tracker";
const START_DATE_KEY = "bible-reading-start-date";

interface TrackerState {
  completedReadings: Record<string, boolean>; // "day-readingIndex" -> true
}

function getStartDate(): Date {
  const stored = localStorage.getItem(START_DATE_KEY);
  if (stored) return new Date(stored);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  localStorage.setItem(START_DATE_KEY, today.toISOString());
  return today;
}

function getCurrentDay(): number {
  const start = getStartDate();
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.min(diff + 1, 365));
}

function loadState(): TrackerState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { completedReadings: {} };
}

function saveState(state: TrackerState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useReadingPlan() {
  const [currentDay, setCurrentDay] = useState(getCurrentDay);
  const [state, setState] = useState<TrackerState>(loadState);
  const startDate = getStartDate();

  useEffect(() => {
    saveState(state);
  }, [state]);

  const toggleReading = useCallback((day: number, readingIndex: number) => {
    const key = `${day}-${readingIndex}`;
    setState((prev) => ({
      ...prev,
      completedReadings: {
        ...prev.completedReadings,
        [key]: !prev.completedReadings[key],
      },
    }));
  }, []);

  const isReadingComplete = useCallback(
    (day: number, readingIndex: number) => {
      return !!state.completedReadings[`${day}-${readingIndex}`];
    },
    [state.completedReadings]
  );

  const isDayComplete = useCallback(
    (day: number, readingCount: number) => {
      for (let i = 0; i < readingCount; i++) {
        if (!state.completedReadings[`${day}-${i}`]) return false;
      }
      return true;
    },
    [state.completedReadings]
  );

  const completedDays = (() => {
    // Count how many unique days have all readings complete
    // This is approximate — we check days 1 through currentDay
    let count = 0;
    for (let d = 1; d <= currentDay; d++) {
      // We need the reading count per day; assume 2 for simplicity
      if (isDayComplete(d, 2)) count++;
    }
    return count;
  })();

  const totalReadingsCompleted = Object.values(state.completedReadings).filter(Boolean).length;

  return {
    currentDay,
    setCurrentDay,
    startDate,
    toggleReading,
    isReadingComplete,
    isDayComplete,
    completedDays,
    totalReadingsCompleted,
  };
}
