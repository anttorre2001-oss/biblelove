import { useEffect, useMemo } from "react";

export type LiturgicalSeason =
  | "advent"
  | "christmas"
  | "epiphany"
  | "lent"
  | "easter"
  | "ordinary";

/**
 * Gregorian Easter Sunday (Meeus/Jones/Butcher algorithm).
 * Returns the local-time Date for the given year.
 */
export function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // 3=Mar, 4=Apr
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Advent Sunday = the Sunday nearest to (and on or after) Nov 27,
 * or equivalently, the 4th Sunday before Dec 25.
 */
function adventSunday(year: number): Date {
  const christmas = new Date(year, 11, 25);
  const christmasDow = christmas.getDay(); // 0 = Sunday
  // Advent 4 = Sunday on/before Christmas
  const advent4 = addDays(christmas, -christmasDow);
  return addDays(advent4, -21);
}

/**
 * Classify a date into a liturgical season using the correct Easter
 * calculation. Ranges (inclusive start, exclusive end unless noted):
 *   Advent:    Advent Sunday .. Dec 24
 *   Christmas: Dec 25 .. Jan 5
 *   Epiphany:  Jan 6 .. Ash Wednesday (Easter - 46)
 *   Lent:      Ash Wednesday .. Holy Saturday (Easter - 1)
 *   Easter:    Easter Sunday .. Pentecost (Easter + 49)
 *   Ordinary:  everything else
 */
export function getLiturgicalSeason(date: Date): LiturgicalSeason {
  const year = date.getFullYear();
  const time = date.getTime();

  // Advent for *this* year (Nov/Dec) — if we're already past it, we've
  // entered the Christmas season.
  const advent = adventSunday(year);
  const christmas = new Date(year, 11, 25);
  if (time >= advent.getTime() && time < christmas.getTime()) return "advent";
  if (time >= christmas.getTime()) return "christmas"; // Dec 25..31

  // Jan 1..5 still counts as Christmastide.
  const epiphany = new Date(year, 0, 6);
  if (time < epiphany.getTime()) return "christmas";

  const easter = easterSunday(year);
  const ashWednesday = addDays(easter, -46);
  const pentecost = addDays(easter, 49);

  if (time < ashWednesday.getTime()) return "epiphany";
  if (time < easter.getTime()) return "lent";
  if (time < pentecost.getTime()) return "easter";
  return "ordinary";
}

const seasonThemes: Record<LiturgicalSeason, Record<string, string>> = {
  advent: {
    "--primary": "260 45% 40%",
    "--accent": "240 30% 85%",
    "--background": "250 20% 96%",
    "--card": "250 25% 97%",
  },
  christmas: {
    "--primary": "40 70% 45%",
    "--accent": "40 60% 88%",
    "--background": "42 35% 96%",
    "--card": "42 40% 97%",
  },
  epiphany: {
    "--primary": "16 65% 50%",
    "--accent": "35 55% 88%",
    "--background": "40 33% 96%",
    "--card": "39 40% 97%",
  },
  lent: {
    "--primary": "280 30% 45%",
    "--accent": "30 15% 85%",
    "--background": "30 10% 95%",
    "--card": "30 12% 96%",
  },
  easter: {
    "--primary": "45 80% 48%",
    "--accent": "45 60% 90%",
    "--background": "48 40% 97%",
    "--card": "48 45% 98%",
  },
  ordinary: {
    "--primary": "16 65% 50%",
    "--accent": "35 55% 88%",
    "--background": "40 33% 96%",
    "--card": "39 40% 97%",
  },
};

const seasonLabels: Record<LiturgicalSeason, string> = {
  advent: "Advent",
  christmas: "Christmastide",
  epiphany: "Epiphany",
  lent: "Lent",
  easter: "Eastertide",
  ordinary: "Ordinary Time",
};

export function useSeasonalTheme() {
  const season = useMemo(() => getLiturgicalSeason(new Date()), []);

  useEffect(() => {
    const root = document.documentElement;
    const theme = seasonThemes[season];
    Object.entries(theme).forEach(([prop, value]) => {
      root.style.setProperty(prop, value);
    });

    return () => {
      // Reset to default on unmount
      Object.keys(theme).forEach((prop) => {
        root.style.removeProperty(prop);
      });
    };
  }, [season]);

  return {
    season,
    seasonLabel: seasonLabels[season],
  };
}
