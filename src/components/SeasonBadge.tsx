import { Leaf, Snowflake, Sun, Flower2, Cross, Church } from "lucide-react";
import type { LiturgicalSeason } from "@/hooks/useSeasonalTheme";

const seasonIcons: Record<LiturgicalSeason, React.ReactNode> = {
  advent: <Snowflake className="h-3.5 w-3.5" />,
  christmas: <Church className="h-3.5 w-3.5" />,
  epiphany: <Sun className="h-3.5 w-3.5" />,
  lent: <Cross className="h-3.5 w-3.5" />,
  easter: <Flower2 className="h-3.5 w-3.5" />,
  ordinary: <Leaf className="h-3.5 w-3.5" />,
};

interface SeasonBadgeProps {
  season: LiturgicalSeason;
  label: string;
}

export function SeasonBadge({ season, label }: SeasonBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
      {seasonIcons[season]}
      {label}
    </span>
  );
}
