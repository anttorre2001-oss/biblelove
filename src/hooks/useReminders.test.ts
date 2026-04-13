import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useReminders } from "./useReminders";

describe("useReminders", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-04-20T12:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns sensible defaults with empty storage", () => {
    const { result } = renderHook(() => useReminders());
    expect(result.current.settings).toEqual({
      enabled: false,
      hour: 8,
      minute: 0,
    });
    expect(result.current.hasReadToday).toBe(false);
    expect(result.current.shouldShowNudge).toBe(true);
  });

  it("hasReadToday flips to true after markTodayAsRead and persists", () => {
    const { result, unmount } = renderHook(() => useReminders());
    expect(result.current.hasReadToday).toBe(false);

    act(() => result.current.markTodayAsRead());
    expect(result.current.hasReadToday).toBe(true);
    expect(result.current.shouldShowNudge).toBe(false);

    unmount();

    const { result: result2 } = renderHook(() => useReminders());
    expect(result2.current.hasReadToday).toBe(true);
  });

  it("hasReadToday flips back to false when the date rolls over", () => {
    const { result } = renderHook(() => useReminders());
    act(() => result.current.markTodayAsRead());
    expect(result.current.hasReadToday).toBe(true);

    // Advance to the next calendar day.
    vi.setSystemTime(new Date("2025-04-21T08:00:00"));

    const { result: nextDay } = renderHook(() => useReminders());
    expect(nextDay.current.hasReadToday).toBe(false);
    expect(nextDay.current.shouldShowNudge).toBe(true);
  });

  it("setReminderTime persists the settings", () => {
    const { result, unmount } = renderHook(() => useReminders());
    act(() => result.current.setReminderTime(21, 30));
    expect(result.current.settings.hour).toBe(21);
    expect(result.current.settings.minute).toBe(30);
    unmount();

    const { result: result2 } = renderHook(() => useReminders());
    expect(result2.current.settings.hour).toBe(21);
    expect(result2.current.settings.minute).toBe(30);
  });

  it("disableReminders turns enabled off", () => {
    localStorage.setItem(
      "bible-reminder-settings",
      JSON.stringify({ enabled: true, hour: 9, minute: 15 })
    );
    const { result } = renderHook(() => useReminders());
    expect(result.current.settings.enabled).toBe(true);

    act(() => result.current.disableReminders());
    expect(result.current.settings.enabled).toBe(false);
  });

  it("falls back to defaults when stored settings are corrupted", () => {
    localStorage.setItem("bible-reminder-settings", "{not-json");
    const { result } = renderHook(() => useReminders());
    expect(result.current.settings).toEqual({
      enabled: false,
      hour: 8,
      minute: 0,
    });
  });
});
