import { useState, useEffect, useCallback } from "react";

const BOOKMARKS_KEY = "bible-bookmarks";

export interface Bookmark {
  reference: string; // "Genesis 1:3"
  text: string;
  day: number;
  timestamp: number;
}

function load(): Bookmark[] {
  try {
    const stored = localStorage.getItem(BOOKMARKS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed as Bookmark[];
    }
  } catch {
    // corrupted / unavailable storage — fall back to empty state
  }
  return [];
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(load);

  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    } catch {
      // ignore quota / privacy errors
    }
  }, [bookmarks]);

  const addBookmark = useCallback((bm: Omit<Bookmark, "timestamp">) => {
    setBookmarks((prev) => {
      if (prev.some((b) => b.reference === bm.reference)) return prev;
      return [...prev, { ...bm, timestamp: Date.now() }];
    });
  }, []);

  const removeBookmark = useCallback((reference: string) => {
    setBookmarks((prev) => prev.filter((b) => b.reference !== reference));
  }, []);

  const isBookmarked = useCallback(
    (reference: string) => bookmarks.some((b) => b.reference === reference),
    [bookmarks]
  );

  return { bookmarks, addBookmark, removeBookmark, isBookmarked, totalBookmarks: bookmarks.length };
}
