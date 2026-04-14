import { dailyVerses } from "@/data/readingPlan";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function pickVerseForToday() {
  const now = new Date();
  // Use local-midnight epoch days so the verse flips at the viewer's local
  // midnight rather than at UTC midnight.
  const localEpochDay = Math.floor(
    (now.getTime() - now.getTimezoneOffset() * 60 * 1000) / MS_PER_DAY,
  );
  const index = ((localEpochDay % dailyVerses.length) + dailyVerses.length) % dailyVerses.length;
  return dailyVerses[index];
}

export function DailyVerse() {
  const verse = pickVerseForToday();

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-warm text-center">
      <p className="font-serif text-base italic leading-relaxed text-foreground/80">
        "{verse.text}"
      </p>
      <p className="mt-3 text-sm font-medium text-primary">— {verse.reference}</p>
    </div>
  );
}
