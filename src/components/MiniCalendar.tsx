import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MiniCalendarProps {
  currentDay: number;
  isDayComplete: (day: number) => boolean;
  onDaySelect: (day: number) => void;
  startDate: Date;
}

export function MiniCalendar({ currentDay, isDayComplete, onDaySelect, startDate }: MiniCalendarProps) {
  const [monthOffset, setMonthOffset] = useState(0);

  const today = new Date();
  const viewDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const monthName = viewDate.toLocaleString("en-US", { month: "long", year: "numeric" });

  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: Array<{ date: number; readingDay: number | null; isToday: boolean }> = [];

    // Padding
    for (let i = 0; i < firstDay; i++) {
      days.push({ date: 0, readingDay: null, isToday: false });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      date.setHours(0, 0, 0, 0);
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      const diff = Math.floor((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      const readingDay = diff >= 0 && diff < 365 ? diff + 1 : null;
      const isToday = date.toDateString() === today.toDateString();
      days.push({ date: d, readingDay, isToday });
    }

    return days;
  }, [viewDate, startDate]);

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-warm">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setMonthOffset((p) => p - 1)}
          className="h-7 w-7 rounded-md flex items-center justify-center hover:bg-muted transition-colors"
        >
          <ChevronLeft className="h-4 w-4 text-muted-foreground" />
        </button>
        <h3 className="font-serif text-sm font-semibold">{monthName}</h3>
        <button
          onClick={() => setMonthOffset((p) => p + 1)}
          className="h-7 w-7 rounded-md flex items-center justify-center hover:bg-muted transition-colors"
        >
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 text-center">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i} className="text-[10px] font-medium text-muted-foreground py-1">
            {d}
          </span>
        ))}
        {calendarDays.map((d, i) => {
          if (d.date === 0) return <span key={i} />;
          const complete = d.readingDay ? isDayComplete(d.readingDay) : false;
          const isCurrent = d.readingDay === currentDay;

          return (
            <button
              key={i}
              onClick={() => d.readingDay && onDaySelect(d.readingDay)}
              disabled={!d.readingDay}
              className={cn(
                "relative h-7 w-7 rounded-full text-[11px] font-medium transition-all mx-auto flex items-center justify-center",
                complete && "bg-primary text-primary-foreground",
                isCurrent && !complete && "ring-1 ring-primary text-primary",
                d.isToday && !complete && !isCurrent && "bg-accent text-accent-foreground",
                !complete && !isCurrent && !d.isToday && d.readingDay && "hover:bg-muted text-foreground",
                !d.readingDay && "text-muted-foreground/30 cursor-default"
              )}
            >
              <span>{d.date}</span>
              {complete && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary-foreground" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
