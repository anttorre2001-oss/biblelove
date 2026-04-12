import { useState, useEffect, useCallback, useMemo } from "react";
import { readingPlan } from "@/data/readingPlan";

const STORAGE_KEY = "bible-reading-tracker";
const START_DATE_KEY = "bible-reading-start-date";

interface TrackerState {
  completedReadings: Record<string, boolean>;
}

function getStartDate(): Date {
  const stored = localStorage.getItem(START_DATE_KEY);
  if (stored) return new Date(stored);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  localStorage.setItem(START_DATE_KEY, today.toISOString());
  return today;
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
  const [state, setState] = useState<TrackerState>(loadState);
  const startDate = getStartDate();

  useEffect(() => {
    saveState(state);
  }, [state]);

  const isDayComplete = useCallback(
    (day: number) => {
      const plan = readingPlan[day - 1];
      if (!plan) return false;
      for (let i = 0; i < plan.readings.length; i++) {
        if (!state.completedReadings[`${day}-${i}`]) return false;
      }
      return true;
    },
    [state.completedReadings]
  );

  // Catch-up system: find the first incomplete day (next unread)
  const currentDay = useMemo(() => {
    for (let d = 1; d <= 365; d++) {
      if (!isDayComplete(d)) return d;
    }
    return 365; // all done!
  }, [isDayComplete]);

  const completedDays = useMemo(() => {
    let count = 0;
    for (let d = 1; d <= 365; d++) {
      if (isDayComplete(d)) count++;
    }
    return count;
  }, [isDayComplete]);

  const isAllComplete = completedDays === 365;

  // Calculate current streak
  const currentStreak = useMemo(() => {
    let streak = 0;
    // Count backwards from the last completed day
    for (let d = currentDay - 1; d >= 1; d--) {
      if (isDayComplete(d)) streak++;
      else break;
    }
    return streak;
  }, [currentDay, isDayComplete]);

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

  const totalReadingsCompleted = Object.values(state.completedReadings).filter(Boolean).length;

  return {
    currentDay,
    startDate,
    toggleReading,
    isReadingComplete,
    isDayComplete,
    completedDays,
    totalReadingsCompleted,
    currentStreak,
    isAllComplete,
  };
}
