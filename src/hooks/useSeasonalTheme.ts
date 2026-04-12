import { useEffect, useMemo } from "react";

export type LiturgicalSeason =
  | "advent"
  | "christmas"
  | "epiphany"
  | "lent"
  | "easter"
  | "ordinary";

// Approximate liturgical season dates (simplified)
function getLiturgicalSeason(date: Date): LiturgicalSeason {
  const month = date.getMonth(); // 0-indexed
  const day = date.getDate();

  // Advent: ~Dec 1 – Dec 24
  if (month === 11 && day <= 24) return "advent";
  // Christmas: Dec 25 – Jan 5
  if ((month === 11 && day >= 25) || (month === 0 && day <= 5)) return "christmas";
  // Epiphany: Jan 6 – Feb (before Lent, simplified)
  if (month === 0 && day >= 6) return "epiphany";
  if (month === 1) return "epiphany";
  // Lent: ~Mar 1 – Apr 15 (simplified)
  if (month === 2 || (month === 3 && day <= 15)) return "lent";
  // Easter: ~Apr 16 – Jun 8 (simplified)
  if ((month === 3 && day >= 16) || month === 4 || (month === 5 && day <= 8))
    return "easter";
  // Ordinary Time: everything else
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
