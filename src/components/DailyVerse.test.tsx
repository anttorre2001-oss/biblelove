import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { DailyVerse } from "./DailyVerse";
import { dailyVerses } from "@/data/readingPlan";

describe("DailyVerse", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  it("renders today's verse text and reference", () => {
    vi.setSystemTime(new Date("2025-04-14T12:00:00"));
    render(<DailyVerse />);
    // Should render *some* verse from the curated list.
    const reference = dailyVerses.find((v) =>
      screen.queryByText(`— ${v.reference}`) !== null,
    );
    expect(reference).toBeDefined();
    expect(screen.getByText(`"${reference!.text}"`)).toBeInTheDocument();
  });

  it("picks a different verse on consecutive calendar days", () => {
    vi.setSystemTime(new Date("2025-04-14T12:00:00"));
    const { container: first } = render(<DailyVerse />);
    const firstRef = first.querySelector("p.text-primary")?.textContent;
    cleanup();

    vi.setSystemTime(new Date("2025-04-15T12:00:00"));
    const { container: second } = render(<DailyVerse />);
    const secondRef = second.querySelector("p.text-primary")?.textContent;

    expect(firstRef).toBeTruthy();
    expect(secondRef).toBeTruthy();
    expect(firstRef).not.toEqual(secondRef);
  });

  it("is stable for the same calendar day regardless of time-of-day", () => {
    vi.setSystemTime(new Date("2025-04-14T08:00:00"));
    const { container: morning } = render(<DailyVerse />);
    const morningRef = morning.querySelector("p.text-primary")?.textContent;
    cleanup();

    vi.setSystemTime(new Date("2025-04-14T22:30:00"));
    const { container: night } = render(<DailyVerse />);
    const nightRef = night.querySelector("p.text-primary")?.textContent;

    expect(morningRef).toEqual(nightRef);
  });

  it("cycles through the rotation over dailyVerses.length days", () => {
    const refs = new Set<string>();
    for (let i = 0; i < dailyVerses.length; i++) {
      vi.setSystemTime(new Date(2025, 0, 1 + i, 12, 0, 0));
      const { container } = render(<DailyVerse />);
      const ref = container.querySelector("p.text-primary")?.textContent;
      if (ref) refs.add(ref);
      cleanup();
    }
    expect(refs.size).toBe(dailyVerses.length);
  });
});
