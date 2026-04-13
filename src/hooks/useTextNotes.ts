import { useState, useEffect, useCallback } from "react";

const NOTES_KEY_PREFIX = "bible-text-notes-";

export function useTextNotes(storageKey: string) {
  const fullKey = `${NOTES_KEY_PREFIX}${storageKey}`;

  const [text, setText] = useState(() => {
    try {
      return localStorage.getItem(fullKey) || "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(fullKey, text);
    } catch {
      // ignore quota / privacy errors
    }
  }, [text, fullKey]);

  const updateText = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const clearText = useCallback(() => {
    setText("");
    try {
      localStorage.removeItem(fullKey);
    } catch {
      // ignore
    }
  }, [fullKey]);

  return { text, updateText, clearText };
}
