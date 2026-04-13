import { describe, it, expect } from "vitest";
import { easterSunday, getLiturgicalSeason } from "./useSeasonalTheme";

describe("easterSunday", () => {
  // Known-good values from a liturgical calendar (Gregorian / Western Easter)
  const cases: Array<[number, number, number]> = [
    [2020, 4, 12],
    [2021, 4, 4],
    [2022, 4, 17],
    [2023, 4, 9],
    [2024, 3, 31],
    [2025, 4, 20],
    [2026, 4, 5],
    [2027, 3, 28],
    [2030, 4, 21],
  ];

  it.each(cases)("year %i -> %i/%i", (year, month, day) => {
    const e = easterSunday(year);
    expect(e.getFullYear()).toBe(year);
    expect(e.getMonth() + 1).toBe(month);
    expect(e.getDate()).toBe(day);
  });
});

describe("getLiturgicalSeason", () => {
  it("Ash Wednesday 2025 is the start of Lent", () => {
    // Easter 2025 = Apr 20 → Ash Wed = Mar 5
    expect(getLiturgicalSeason(new Date(2025, 2, 5))).toBe("lent");
  });

  it("the day before Ash Wednesday is still Epiphany", () => {
    expect(getLiturgicalSeason(new Date(2025, 2, 4))).toBe("epiphany");
  });

  it("Easter Sunday 2025 is in Eastertide", () => {
    expect(getLiturgicalSeason(new Date(2025, 3, 20))).toBe("easter");
  });

  it("Holy Saturday 2025 is still Lent", () => {
    expect(getLiturgicalSeason(new Date(2025, 3, 19))).toBe("lent");
  });

  it("Pentecost 2025 flips to Ordinary Time", () => {
    // Easter + 49 = Jun 8 2025 → Pentecost (exclusive upper bound on "easter")
    expect(getLiturgicalSeason(new Date(2025, 5, 8))).toBe("ordinary");
  });

  it("Christmas Day is Christmastide", () => {
    expect(getLiturgicalSeason(new Date(2025, 11, 25))).toBe("christmas");
  });

  it("January 5 is still Christmastide", () => {
    expect(getLiturgicalSeason(new Date(2025, 0, 5))).toBe("christmas");
  });

  it("January 6 is Epiphany", () => {
    expect(getLiturgicalSeason(new Date(2025, 0, 6))).toBe("epiphany");
  });

  it("early December 2025 is Advent", () => {
    // Advent 2025 begins Nov 30; Dec 10 should be Advent.
    expect(getLiturgicalSeason(new Date(2025, 11, 10))).toBe("advent");
  });

  it("late July is Ordinary Time", () => {
    expect(getLiturgicalSeason(new Date(2025, 6, 20))).toBe("ordinary");
  });
});
