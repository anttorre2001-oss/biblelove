import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Settings, Bookmark, Flame, Calendar } from "lucide-react";
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
import { WelcomeSplash } from "@/components/WelcomeSplash";
import { WeeklyProgress } from "@/components/WeeklyProgress";
import { MiniCalendar } from "@/components/MiniCalendar";
import splashBg from "@/assets/splash-bg.jpg";

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

      {/* Compact hero banner for return visits */}
      <div className="relative h-36 sm:h-44 overflow-hidden">
        <img
          src={splashBg}
          alt=""
          className="h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white drop-shadow-md mb-1">
              {getGreeting()}.
            </h1>
            <p className="text-white/70 text-sm">
              Day {currentDay} of 365
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 -mt-6 relative z-10 pb-12">
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
