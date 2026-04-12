import { useState } from "react";
import { BookOpen, Settings, Bookmark } from "lucide-react";
import { readingPlan } from "@/data/readingPlan";
import { useReadingPlan } from "@/hooks/useReadingPlan";
import { useSeasonalTheme } from "@/hooks/useSeasonalTheme";
import { useReminders } from "@/hooks/useReminders";
import { useHighlights } from "@/hooks/useHighlights";
import { ReadingCard } from "@/components/ReadingCard";
import { ProgressRing } from "@/components/ProgressRing";
import { DailyVerse } from "@/components/DailyVerse";
import { JournalingPrompt } from "@/components/JournalingPrompt";
import { SeasonBadge } from "@/components/SeasonBadge";
import { StreakCounter } from "@/components/StreakCounter";
import { GentleNudge } from "@/components/GentleNudge";
import { ReminderSettings } from "@/components/ReminderSettings";
import { CompletionCelebration } from "@/components/CompletionCelebration";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

const Index = () => {
  const {
    currentDay,
    startDate,
    toggleReading,
    isReadingComplete,
    completedDays,
    currentStreak,
    isAllComplete,
  } = useReadingPlan();

  const { season, seasonLabel } = useSeasonalTheme();
  const { shouldShowNudge, markTodayAsRead } = useReminders();
  const { totalHighlights } = useHighlights();
  const [showSettings, setShowSettings] = useState(false);
  const [nudgeDismissed, setNudgeDismissed] = useState(false);

  const todayPlan = readingPlan[currentDay - 1];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-lg px-4 py-8 sm:py-12">
        {/* Header */}
        <header className="mb-6 text-center">
          <div className="flex justify-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <BookOpen className="h-4 w-4" />
              Day {currentDay} of 365
            </div>
            <SeasonBadge season={season} label={seasonLabel} />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            {getGreeting()}.
          </h1>
          <p className="text-muted-foreground text-lg">
            Here is your reading for today.
          </p>
        </header>

        {/* Gentle Nudge */}
        {shouldShowNudge && !nudgeDismissed && (
          <GentleNudge onDismiss={() => setNudgeDismissed(true)} />
        )}

        {/* Completion Celebration */}
        {isAllComplete && (
          <div className="mb-8">
            <CompletionCelebration
              startDate={startDate}
              completedDays={completedDays}
              streak={currentStreak}
            />
          </div>
        )}

        {/* Stats Row */}
        <div className="mb-8 flex items-center justify-center gap-4 flex-wrap">
          <ProgressRing current={completedDays} total={365} />
          <div className="flex flex-col items-center gap-2">
            <StreakCounter streak={currentStreak} />
            {totalHighlights > 0 && (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
                <Bookmark className="h-3.5 w-3.5 text-primary" />
                {totalHighlights} highlights
              </div>
            )}
          </div>
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
                onToggle={() => {
                  toggleReading(currentDay, idx);
                  markTodayAsRead();
                }}
              />
            ))}
          </div>
        </section>

        {/* Journaling Prompt */}
        <section className="mb-8">
          <h2 className="font-serif text-xl font-semibold mb-4">Reflect</h2>
          <JournalingPrompt day={currentDay} />
        </section>

        {/* Daily Verse */}
        <section className="mb-8">
          <h2 className="font-serif text-xl font-semibold mb-4">Daily Verse</h2>
          <DailyVerse day={currentDay} />
        </section>

        {/* Settings Toggle */}
        <section className="mb-8">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Settings className="h-4 w-4" />
            {showSettings ? "Hide Settings" : "Reminder Settings"}
          </button>
          {showSettings && (
            <div className="mt-4">
              <ReminderSettings />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Index;
