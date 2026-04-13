import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useBookmarks } from "./useBookmarks";

describe("useBookmarks", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts empty", () => {
    const { result } = renderHook(() => useBookmarks());
    expect(result.current.bookmarks).toEqual([]);
    expect(result.current.totalBookmarks).toBe(0);
    expect(result.current.isBookmarked("Genesis 1:1")).toBe(false);
  });

  it("adds a bookmark and exposes it via isBookmarked", () => {
    const { result } = renderHook(() => useBookmarks());
    act(() => {
      result.current.addBookmark({
        reference: "Genesis 1:1",
        text: "In the beginning...",
        day: 1,
      });
    });
    expect(result.current.totalBookmarks).toBe(1);
    expect(result.current.isBookmarked("Genesis 1:1")).toBe(true);
    expect(result.current.bookmarks[0].timestamp).toBeTypeOf("number");
  });

  it("dedupes bookmarks on the same reference", () => {
    const { result } = renderHook(() => useBookmarks());
    act(() => {
      result.current.addBookmark({ reference: "John 3:16", text: "a", day: 1 });
      result.current.addBookmark({ reference: "John 3:16", text: "b", day: 1 });
    });
    expect(result.current.totalBookmarks).toBe(1);
    expect(result.current.bookmarks[0].text).toBe("a");
  });

  it("removes a bookmark by reference", () => {
    const { result } = renderHook(() => useBookmarks());
    act(() => {
      result.current.addBookmark({ reference: "Genesis 1:1", text: "t", day: 1 });
      result.current.addBookmark({ reference: "John 3:16", text: "t2", day: 50 });
    });
    expect(result.current.totalBookmarks).toBe(2);

    act(() => result.current.removeBookmark("Genesis 1:1"));

    expect(result.current.totalBookmarks).toBe(1);
    expect(result.current.isBookmarked("Genesis 1:1")).toBe(false);
    expect(result.current.isBookmarked("John 3:16")).toBe(true);
  });

  it("persists bookmarks across hook mounts", () => {
    const { result, unmount } = renderHook(() => useBookmarks());
    act(() => {
      result.current.addBookmark({ reference: "Psalm 23:1", text: "t", day: 100 });
    });
    unmount();

    const { result: result2 } = renderHook(() => useBookmarks());
    expect(result2.current.isBookmarked("Psalm 23:1")).toBe(true);
    expect(result2.current.totalBookmarks).toBe(1);
  });

  it("recovers gracefully from corrupted localStorage", () => {
    localStorage.setItem("bible-bookmarks", "{not-json");
    const { result } = renderHook(() => useBookmarks());
    expect(result.current.bookmarks).toEqual([]);
  });
});
