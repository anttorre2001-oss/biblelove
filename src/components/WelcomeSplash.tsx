import { useEffect, useState } from "react";
import { dailyVerses } from "@/data/readingPlan";
import splashBg from "@/assets/splash-bg.jpg";

const FIRST_VISIT_KEY = "bible-first-visit-done";

export function WelcomeSplash() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const verse = dailyVerses[new Date().getDay() % dailyVerses.length];

  useEffect(() => {
    const done = localStorage.getItem(FIRST_VISIT_KEY);
    if (done) {
      setVisible(false);
    }
  }, []);

  const handleBegin = () => {
    localStorage.setItem(FIRST_VISIT_KEY, "true");
    setFadeOut(true);
    setTimeout(() => setVisible(false), 800);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={splashBg}
          alt=""
          className="h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
      </div>

      {/* Animated shimmer overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-20 animate-pulse bg-gradient-to-br from-amber-300/20 via-transparent to-amber-200/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-xl">
        <div className="mb-6">
          <span className="inline-block text-amber-200/80 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            A Year in God's Word
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            Bible in a Year
          </h1>
          <div className="w-24 h-px bg-amber-400/60 mx-auto mb-6" />
        </div>

        <blockquote className="mb-8">
          <p className="font-serif text-lg sm:text-xl italic text-white/85 leading-relaxed mb-3">
            "{verse.text}"
          </p>
          <cite className="text-amber-300/80 text-sm font-medium not-italic">
            — {verse.reference}
          </cite>
        </blockquote>

        <button
          onClick={handleBegin}
          className="group relative inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 px-8 py-3.5 text-white font-medium transition-all duration-300 hover:bg-white/25 hover:border-white/40 hover:shadow-lg hover:shadow-amber-500/10"
        >
          <span className="font-serif text-lg">Begin Your Journey</span>
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function isFirstVisit(): boolean {
  return !localStorage.getItem(FIRST_VISIT_KEY);
}
