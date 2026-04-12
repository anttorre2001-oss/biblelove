import { Flame } from "lucide-react";

interface StreakCounterProps {
  streak: number;
}

export function StreakCounter({ streak }: StreakCounterProps) {
  if (streak === 0) return null;

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
      <Flame className="h-4 w-4 text-primary" />
      {streak} day streak
    </div>
  );
}
