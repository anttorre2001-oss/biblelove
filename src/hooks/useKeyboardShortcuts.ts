import { useEffect, useRef } from "react";

export interface KeyboardShortcut {
  /** The `event.key` to match, compared case-insensitively. E.g. "ArrowLeft", "Escape", "?", "b". */
  key: string;
  /** Handler invoked on match. */
  handler: (event: KeyboardEvent) => void;
  /** Require meta / ctrl. Defaults to false. */
  meta?: boolean;
  /** Require shift. Defaults to false. */
  shift?: boolean;
  /** Require alt. Defaults to false. */
  alt?: boolean;
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  // `isContentEditable` is the canonical check, but jsdom does not implement
  // its getter, so also accept the attribute form used in tests and in any
  // explicit `contenteditable="true"` markup.
  if (target.isContentEditable) return true;
  const editable = target.getAttribute("contenteditable");
  if (editable === "" || editable === "true" || editable === "plaintext-only") return true;
  return false;
}

/**
 * Attach keyboard shortcuts to the window. Shortcuts are ignored while the
 * user is typing in an input, textarea, select, or contenteditable element so
 * that typing notes never triggers navigation.
 *
 * The listener is bound once on mount; the hook reads the latest shortcuts
 * array through a ref so callers don't need to memoize it.
 */
export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]): void {
  const shortcutsRef = useRef(shortcuts);
  shortcutsRef.current = shortcuts;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return;
      const pressedKey = event.key.toLowerCase();
      for (const s of shortcutsRef.current) {
        if (s.key.toLowerCase() !== pressedKey) continue;
        if ((s.meta ?? false) !== (event.metaKey || event.ctrlKey)) continue;
        if ((s.shift ?? false) !== event.shiftKey) continue;
        if ((s.alt ?? false) !== event.altKey) continue;
        s.handler(event);
        return;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
