import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Settings, Bookmark, BookmarkCheck, Calendar, Search } from "lucide-react";
import { readingPlan } from "@/data/readingPlan";
import { useReadingPlan } from "@/hooks/useReadingPlan";
import { useSeasonalTheme } from "@/hooks/useSeasonalTheme";
import { useReminders } from "@/hooks/useReminders";
import { useHighlights } from "@/hooks/useHighlights";
import { useBookmarks } from "@/hooks/useBookmarks";
import { ReadingCard } from "@/components/ReadingCard";
import { ProgressRing } from "@/components/ProgressRing";
import { DailyVerse } from "@/components/DailyVerse";
import { JournalingPrompt } from "@/components/JournalingPrompt";
import { SeasonBadge } from "@/components/SeasonBadge";
import { StreakCounter } from "@/components/StreakCounter";
import { GentleNudge } from "@/components/GentleNudge";
import { ReminderSettings } from "@/components/ReminderSettings";
import { CompletionCelebration } from "@/components/CompletionCelebration";
import { WelcomeSplash } from "@/components/WelcomeSplash";
import { WeeklyProgress } from "@/components/WeeklyProgress";
import { MiniCalendar } from "@/components/MiniCalendar";
import { ThemeToggle } from "@/components/ThemeToggle";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

const Index = () => {
  const navigate = useNavigate();
  const {
    currentDay,
    startDate,
    toggleReading,
    isReadingComplete,
    isDayComplete,
    completedDays,
    currentStreak,
    isAllComplete,
  } = useReadingPlan();

  const { season, seasonLabel } = useSeasonalTheme();
  const { shouldShowNudge, markTodayAsRead } = useReminders();
  const { totalHighlights } = useHighlights();
  const { bookmarks, totalBookmarks } = useBookmarks();
  const [showSettings, setShowSettings] = useState(false);
  const [nudgeDismissed, setNudgeDismissed] = useState(false);

  const todayPlan = readingPlan[currentDay - 1];

  const handleDaySelect = (day: number) => {
    navigate(`/read/${day}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* First-visit splash */}
      <WelcomeSplash />

      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="font-serif text-lg font-bold">Bible in a Year</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/search")}
              className="h-9 w-9 rounded-full flex items-center justify-center border border-border bg-card hover:bg-muted shadow-warm transition-colors"
            >
              <Search className="h-4 w-4 text-muted-foreground" />
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Hero greeting */}
      <div className="bg-gradient-to-b from-primary/5 to-transparent px-4 py-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-3">
          <BookOpen className="h-4 w-4" />
          Day {currentDay} of 365
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-1">
          {getGreeting()}.
        </h2>
        <p className="text-muted-foreground text-lg">
          Here is your reading for today.
        </p>
      </div>

      <div className="mx-auto max-w-2xl px-4 -mt-6 relative z-10 pb-24">
        {/* Season & Streak badges */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          <SeasonBadge season={season} label={seasonLabel} />
          <StreakCounter streak={currentStreak} />
          {totalHighlights > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-card border border-border px-3 py-1 text-xs font-medium text-accent-foreground shadow-warm">
              <Bookmark className="h-3 w-3 text-primary" />
              {totalHighlights} highlights
            </span>
          )}
          {totalBookmarks > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-card border border-border px-3 py-1 text-xs font-medium text-accent-foreground shadow-warm">
              <BookmarkCheck className="h-3 w-3 text-primary" />
              {totalBookmarks} bookmarks
            </span>
          )}
        </div>

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

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Progress Ring */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-warm flex items-center justify-center">
            <ProgressRing current={completedDays} total={365} />
          </div>

          {/* Weekly Progress */}
          <WeeklyProgress currentDay={currentDay} isDayComplete={isDayComplete} />
        </div>

        {/* Today's Readings */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="font-serif text-xl font-semibold">Today's Readings</h2>
          </div>
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
                onRead={() => navigate(`/read/${currentDay}`)}
              />
            ))}
          </div>
        </section>

        {/* Journaling Prompt */}
        <section className="mb-8">
          <h2 className="font-serif text-xl font-semibold mb-4">✍️ Reflect</h2>
          <JournalingPrompt day={currentDay} />
        </section>

        {/* Daily Verse */}
        <section className="mb-8">
          <h2 className="font-serif text-xl font-semibold mb-4">✝️ Daily Verse</h2>
          <DailyVerse day={currentDay} />
        </section>

        {/* Mini Calendar */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-primary" />
            <h2 className="font-serif text-xl font-semibold">Reading Calendar</h2>
          </div>
          <MiniCalendar
            currentDay={currentDay}
            isDayComplete={isDayComplete}
            onDaySelect={handleDaySelect}
            startDate={startDate}
          />
        </section>

        {/* Settings */}
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
