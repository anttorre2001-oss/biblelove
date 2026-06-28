import { useMemo } from "react";

export type LiturgicalSeason =
  | "advent"
  | "christmas"
  | "epiphany"
  | "lent"
  | "easter"
  | "ordinary";

// Approximate liturgical season dates (simplified)
function getLiturgicalSeason(date: Date): LiturgicalSeason {
  const month = date.getMonth();
  const day = date.getDate();

  if (month === 11 && day <= 24) return "advent";
  if ((month === 11 && day >= 25) || (month === 0 && day <= 5)) return "christmas";
  if (month === 0 && day >= 6) return "epiphany";
  if (month === 1) return "epiphany";
  if (month === 2 || (month === 3 && day <= 15)) return "lent";
  if ((month === 3 && day >= 16) || month === 4 || (month === 5 && day <= 8))
    return "easter";
  return "ordinary";
}

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
  // Note: seasonal color overrides removed so the user's selected theme
  // profile and dark mode apply consistently across the app.
  return {
    season,
    seasonLabel: seasonLabels[season],
  };
}
