import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface WeeklyProgressProps {
  currentDay: number;
  isDayComplete: (day: number) => boolean;
}

export function WeeklyProgress({ currentDay, isDayComplete }: WeeklyProgressProps) {
  const days = useMemo(() => {
    // Show 7 days centered around current day
    const start = Math.max(1, currentDay - 3);
    const result = [];
    for (let i = 0; i < 7; i++) {
      const day = start + i;
      if (day > 365) break;
      result.push({
        day,
        complete: isDayComplete(day),
        isCurrent: day === currentDay,
      });
    }
    return result;
  }, [currentDay, isDayComplete]);

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-warm">
      <h3 className="font-serif text-sm font-semibold text-muted-foreground mb-3">
        This Week
      </h3>
      <ul className="flex items-center justify-between gap-1" aria-label="This week's reading progress">
        {days.map((d) => {
          const status = d.complete ? "read" : "not read";
          const current = d.isCurrent ? ", current day" : "";
          return (
            <li key={d.day} className="flex flex-col items-center gap-1.5">
              <div
                role="img"
                aria-label={`Day ${d.day}, ${status}${current}`}
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium transition-all",
                  d.complete && "bg-primary text-primary-foreground",
                  d.isCurrent && !d.complete && "bg-primary/15 text-primary ring-2 ring-primary/30",
                  !d.complete && !d.isCurrent && "bg-muted text-muted-foreground"
                )}
              >
                {d.day}
              </div>
              {d.complete && (
                <div className="h-1 w-1 rounded-full bg-primary" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
