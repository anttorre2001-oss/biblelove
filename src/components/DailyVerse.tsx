import { dailyVerses } from "@/data/readingPlan";

interface DailyVerseProps {
  day: number;
}

export function DailyVerse({ day }: DailyVerseProps) {
  const verse = dailyVerses[(day - 1) % dailyVerses.length];

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-warm text-center">
      <p className="font-serif text-base italic leading-relaxed text-foreground/80">
        "{verse.text}"
      </p>
      <p className="mt-3 text-sm font-medium text-primary">— {verse.reference}</p>
    </div>
  );
}
