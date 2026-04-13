import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useReadingPlan } from "./useReadingPlan";
import { readingPlan } from "@/data/readingPlan";

describe("useReadingPlan", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts with day 1, zero streak, zero completed", () => {
    const { result } = renderHook(() => useReadingPlan());
    expect(result.current.currentDay).toBe(1);
    expect(result.current.completedDays).toBe(0);
    expect(result.current.currentStreak).toBe(0);
    expect(result.current.isAllComplete).toBe(false);
    expect(result.current.totalReadingsCompleted).toBe(0);
  });

  it("isDayComplete is false for any unchecked day and true once all sub-readings are toggled", () => {
    const { result } = renderHook(() => useReadingPlan());
    const day1Readings = readingPlan[0].readings.length;
    expect(result.current.isDayComplete(1)).toBe(false);

    act(() => {
      for (let i = 0; i < day1Readings; i++) {
        result.current.toggleReading(1, i);
      }
    });

    expect(result.current.isDayComplete(1)).toBe(true);
    expect(result.current.completedDays).toBe(1);
  });

  it("advances currentDay to the first incomplete day", () => {
    const { result } = renderHook(() => useReadingPlan());
    act(() => {
      readingPlan[0].readings.forEach((_, i) => result.current.toggleReading(1, i));
    });
    expect(result.current.currentDay).toBe(2);

    act(() => {
      readingPlan[1].readings.forEach((_, i) => result.current.toggleReading(2, i));
    });
    expect(result.current.currentDay).toBe(3);
  });

  it("currentStreak counts contiguous completed days back from currentDay", () => {
    const { result } = renderHook(() => useReadingPlan());
    act(() => {
      readingPlan[0].readings.forEach((_, i) => result.current.toggleReading(1, i));
      readingPlan[1].readings.forEach((_, i) => result.current.toggleReading(2, i));
      readingPlan[2].readings.forEach((_, i) => result.current.toggleReading(3, i));
    });
    expect(result.current.currentDay).toBe(4);
    expect(result.current.currentStreak).toBe(3);
  });

  it("toggleReading twice on the same reading flips it back to incomplete", () => {
    const { result } = renderHook(() => useReadingPlan());
    act(() => result.current.toggleReading(1, 0));
    expect(result.current.isReadingComplete(1, 0)).toBe(true);
    act(() => result.current.toggleReading(1, 0));
    expect(result.current.isReadingComplete(1, 0)).toBe(false);
  });

  it("persists completion state across hook mounts via localStorage", () => {
    const { result, unmount } = renderHook(() => useReadingPlan());
    act(() => {
      readingPlan[0].readings.forEach((_, i) => result.current.toggleReading(1, i));
    });
    unmount();

    const { result: result2 } = renderHook(() => useReadingPlan());
    expect(result2.current.isDayComplete(1)).toBe(true);
    expect(result2.current.currentDay).toBe(2);
  });

  it("isAllComplete becomes true only when all 365 days are done", () => {
    const { result } = renderHook(() => useReadingPlan());
    act(() => {
      for (let d = 1; d <= 365; d++) {
        readingPlan[d - 1].readings.forEach((_, i) => result.current.toggleReading(d, i));
      }
    });
    expect(result.current.completedDays).toBe(365);
    expect(result.current.isAllComplete).toBe(true);
    expect(result.current.currentDay).toBe(365);
  });
});
