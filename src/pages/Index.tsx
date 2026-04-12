import { BookOpen } from "lucide-react";
import { readingPlan } from "@/data/readingPlan";
import { useReadingPlan } from "@/hooks/useReadingPlan";
import { ReadingCard } from "@/components/ReadingCard";
import { ProgressRing } from "@/components/ProgressRing";
import { DailyVerse } from "@/components/DailyVerse";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

const Index = () => {
  const {
    currentDay,
    toggleReading,
    isReadingComplete,
    completedDays,
  } = useReadingPlan();

  const todayPlan = readingPlan[currentDay - 1];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-lg px-4 py-8 sm:py-12">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            <BookOpen className="h-4 w-4" />
            Day {currentDay} of 365
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            {getGreeting()}.
          </h1>
          <p className="text-muted-foreground text-lg">
            Here is your reading for today.
          </p>
        </header>

        {/* Progress */}
        <div className="mb-8 flex justify-center">
          <ProgressRing current={completedDays} total={365} />
        </div>

        {/* Reading Cards */}
        <section className="mb-8">
          <h2 className="font-serif text-xl font-semibold mb-4">Today's Readings</h2>
          <div className="space-y-3">
            {todayPlan.readings.map((reading, idx) => (
              <ReadingCard
                key={idx}
                label={reading.label}
                reference={reading.reference}
                category={reading.category}
                isComplete={isReadingComplete(currentDay, idx)}
                onToggle={() => toggleReading(currentDay, idx)}
              />
            ))}
          </div>
        </section>

        {/* Daily Verse */}
        <section>
          <h2 className="font-serif text-xl font-semibold mb-4">Daily Verse</h2>
          <DailyVerse day={currentDay} />
        </section>
      </div>
    </div>
  );
};

export default Index;
