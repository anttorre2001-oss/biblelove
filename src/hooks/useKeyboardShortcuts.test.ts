import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useKeyboardShortcuts, type KeyboardShortcut } from "./useKeyboardShortcuts";

function dispatch(key: string, init: KeyboardEventInit = {}) {
  window.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, ...init }));
}

describe("useKeyboardShortcuts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("invokes the matching handler on keydown", () => {
    const handler = vi.fn();
    const shortcuts: KeyboardShortcut[] = [{ key: "ArrowLeft", handler }];
    renderHook(() => useKeyboardShortcuts(shortcuts));

    dispatch("ArrowLeft");
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("matches keys case-insensitively", () => {
    const handler = vi.fn();
    renderHook(() => useKeyboardShortcuts([{ key: "B", handler }]));

    dispatch("b");
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("ignores keydown events while typing in a textarea", () => {
    const handler = vi.fn();
    renderHook(() => useKeyboardShortcuts([{ key: "ArrowRight", handler }]));

    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));

    expect(handler).not.toHaveBeenCalled();
  });

  it("ignores keydown events while typing in an input", () => {
    const handler = vi.fn();
    renderHook(() => useKeyboardShortcuts([{ key: "n", handler }]));

    const input = document.createElement("input");
    document.body.appendChild(input);
    input.focus();
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "n", bubbles: true }));

    expect(handler).not.toHaveBeenCalled();
  });

  it("ignores keydown events inside a contenteditable element", () => {
    const handler = vi.fn();
    renderHook(() => useKeyboardShortcuts([{ key: "b", handler }]));

    const div = document.createElement("div");
    div.setAttribute("contenteditable", "true");
    document.body.appendChild(div);
    div.focus();
    div.dispatchEvent(new KeyboardEvent("keydown", { key: "b", bubbles: true }));

    expect(handler).not.toHaveBeenCalled();
  });

  it("requires shift to match when the shortcut demands it", () => {
    const handler = vi.fn();
    renderHook(() => useKeyboardShortcuts([{ key: "?", shift: true, handler }]));

    dispatch("?", { shiftKey: false });
    expect(handler).not.toHaveBeenCalled();

    dispatch("?", { shiftKey: true });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("does not invoke a shortcut when an extra modifier is pressed", () => {
    const handler = vi.fn();
    renderHook(() => useKeyboardShortcuts([{ key: "ArrowLeft", handler }]));

    dispatch("ArrowLeft", { ctrlKey: true });
    expect(handler).not.toHaveBeenCalled();

    dispatch("ArrowLeft");
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("picks up handler updates without re-binding the listener", () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = renderHook(({ s }: { s: KeyboardShortcut[] }) => useKeyboardShortcuts(s), {
      initialProps: { s: [{ key: "b", handler: first }] },
    });

    dispatch("b");
    expect(first).toHaveBeenCalledTimes(1);

    rerender({ s: [{ key: "b", handler: second }] });
    dispatch("b");
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);
  });

  it("removes the listener on unmount", () => {
    const handler = vi.fn();
    const { unmount } = renderHook(() => useKeyboardShortcuts([{ key: "b", handler }]));

    unmount();
    dispatch("b");
    expect(handler).not.toHaveBeenCalled();
  });
});
