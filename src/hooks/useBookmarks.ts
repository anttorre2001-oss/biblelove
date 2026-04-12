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
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(load);

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
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
