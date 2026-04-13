import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useHighlights } from "./useHighlights";

describe("useHighlights", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-01T00:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts empty", () => {
    const { result } = renderHook(() => useHighlights());
    expect(result.current.highlights).toEqual([]);
    expect(result.current.totalHighlights).toBe(0);
  });

  it("adds highlights with timestamps", () => {
    const { result } = renderHook(() => useHighlights());
    act(() => {
      result.current.addHighlight({
        reference: "Genesis 1:1",
        text: "In the beginning...",
        color: "gold",
        day: 1,
      });
    });
    expect(result.current.totalHighlights).toBe(1);
    expect(result.current.highlights[0].color).toBe("gold");
    expect(result.current.highlights[0].timestamp).toBeTypeOf("number");
  });

  it("removes a highlight by timestamp", () => {
    const { result } = renderHook(() => useHighlights());
    act(() => {
      result.current.addHighlight({
        reference: "Genesis 1:1",
        text: "a",
        color: "gold",
        day: 1,
      });
    });
    act(() => {
      vi.advanceTimersByTime(1000);
      result.current.addHighlight({
        reference: "Genesis 1:2",
        text: "b",
        color: "sage",
        day: 1,
      });
    });
    expect(result.current.totalHighlights).toBe(2);

    const toRemove = result.current.highlights[0].timestamp;
    act(() => result.current.removeHighlight(toRemove));

    expect(result.current.totalHighlights).toBe(1);
    expect(result.current.highlights[0].reference).toBe("Genesis 1:2");
  });

  it("filters highlights by day", () => {
    const { result } = renderHook(() => useHighlights());
    act(() => {
      result.current.addHighlight({ reference: "A", text: "a", color: "gold", day: 1 });
      result.current.addHighlight({ reference: "B", text: "b", color: "sky", day: 2 });
      result.current.addHighlight({ reference: "C", text: "c", color: "rose", day: 1 });
    });
    expect(result.current.getHighlightsForDay(1)).toHaveLength(2);
    expect(result.current.getHighlightsForDay(2)).toHaveLength(1);
    expect(result.current.getHighlightsForDay(99)).toHaveLength(0);
  });

  it("filters highlights by reference", () => {
    const { result } = renderHook(() => useHighlights());
    act(() => {
      result.current.addHighlight({
        reference: "John 3:16",
        text: "a",
        color: "gold",
        day: 50,
      });
      result.current.addHighlight({
        reference: "John 3:16",
        text: "b",
        color: "sage",
        day: 50,
      });
      result.current.addHighlight({
        reference: "Psalm 23:1",
        text: "c",
        color: "sky",
        day: 100,
      });
    });
    expect(result.current.getHighlightsForReference("John 3:16")).toHaveLength(2);
    expect(result.current.getHighlightsForReference("Psalm 23:1")).toHaveLength(1);
  });

  it("persists highlights with color across mounts", () => {
    const { result, unmount } = renderHook(() => useHighlights());
    act(() => {
      result.current.addHighlight({
        reference: "R",
        text: "t",
        color: "rose",
        day: 1,
      });
    });
    unmount();

    const { result: result2 } = renderHook(() => useHighlights());
    expect(result2.current.totalHighlights).toBe(1);
    expect(result2.current.highlights[0].color).toBe("rose");
  });

  it("recovers gracefully from corrupted localStorage", () => {
    localStorage.setItem("bible-highlights", "not-json");
    const { result } = renderHook(() => useHighlights());
    expect(result.current.highlights).toEqual([]);
  });
});
