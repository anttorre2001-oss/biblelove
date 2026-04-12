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
    localStorage.setItem(fullKey, text);
  }, [text, fullKey]);

  const updateText = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const clearText = useCallback(() => {
    setText("");
    localStorage.removeItem(fullKey);
  }, [fullKey]);

  return { text, updateText, clearText };
}
