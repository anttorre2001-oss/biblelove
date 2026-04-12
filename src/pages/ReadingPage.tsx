import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2, PanelRightOpen, PanelRightClose, Pencil, Type, Highlighter, X, Bookmark, BookmarkCheck, Settings2, MapPin, Clock, Info, Share2 } from "lucide-react";
import { AudioPlayer } from "@/components/AudioPlayer";
import { ShareVerse } from "@/components/ShareVerse";
import { ThemeToggle } from "@/components/ThemeToggle";
import { readingPlan } from "@/data/readingPlan";
import { useReadingPlan } from "@/hooks/useReadingPlan";
import { useHighlights, type HighlightColor, highlightColorMap, highlightColorValues } from "@/hooks/useHighlights";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useReadingPreferences } from "@/hooks/useReadingPreferences";
import { getContextForReading, type BibleContextEntry } from "@/data/bibleContext";
import { HandwritingCanvas } from "@/components/HandwritingCanvas";
import { TextNotes } from "@/components/TextNotes";
import { JournalingPrompt } from "@/components/JournalingPrompt";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface BibleVerse {
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

interface BibleApiResponse {
  reference: string;
  verses: BibleVerse[];
  text: string;
}

function splitReference(reference: string): string[] {
  const rangeMatch = reference.match(/^(.+?)\s+(\d+)\s*-\s*(\d+)$/);
  if (rangeMatch) {
    const book = rangeMatch[1];
    const start = parseInt(rangeMatch[2], 10);
    const end = parseInt(rangeMatch[3], 10);
    const refs: string[] = [];
    for (let ch = start; ch <= end; ch++) {
      refs.push(`${book} ${ch}`);
    }
    return refs;
  }
  return [reference];
}

async function fetchScripture(reference: string): Promise<BibleApiResponse> {
  const refs = splitReference(reference);
  const allVerses: BibleVerse[] = [];
  let fullText = "";

  for (const ref of refs) {
    const encoded = ref.replace(/\s+/g, "+");
    const res = await fetch(`https://bible-api.com/${encoded}?translation=web`);
    if (!res.ok) {
      const errData = await res.json().catch(() => ({ error: "Unknown error" }));
      throw new Error(errData.detail || errData.error || `Failed to fetch ${ref}`);
    }
    const data = await res.json();
    if (data.verses) allVerses.push(...data.verses);
    if (data.text) fullText += data.text;
  }

  return { reference, verses: allVerses, text: fullText };
}

const fontFamilyMap = {
  serif: "font-serif",
  sans: "font-sans",
  mono: "font-mono",
};

// Context popup component
const ContextPopup = ({ entry }: { entry: BibleContextEntry }) => {
  const icon = entry.type === "map" ? <MapPin className="h-4 w-4" /> : entry.type === "timeline" ? <Clock className="h-4 w-4" /> : <Info className="h-4 w-4" />;
  const bgColor = entry.type === "map" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : entry.type === "timeline" ? "bg-amber-500/10 text-amber-700 dark:text-amber-400" : "bg-sky-500/10 text-sky-700 dark:text-sky-400";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all hover:scale-105", bgColor)}>
          {icon}
          {entry.title}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" side="bottom" align="start">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={cn("h-7 w-7 rounded-full flex items-center justify-center", bgColor)}>{icon}</span>
            <h4 className="font-serif font-bold text-sm">{entry.title}</h4>
          </div>
          <p className="text-xs text-muted-foreground mb-3">{entry.description}</p>

          {entry.timelineEvents && (
            <div className="space-y-2 border-l-2 border-primary/20 pl-3">
              {entry.timelineEvents.map((evt, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[17px] top-1 h-2.5 w-2.5 rounded-full bg-primary/60 border-2 border-background" />
                  <p className="text-[11px] font-medium text-primary/80">{evt.year}</p>
                  <p className="text-xs text-foreground/80">{evt.event}</p>
                </div>
              ))}
            </div>
          )}

          {entry.details && (
            <div className="space-y-1.5">
              {entry.details.map((d, i) => (
                <p key={i} className="text-xs text-foreground/80 leading-relaxed">{d}</p>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const ReadingPage = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const dayNum = parseInt(day || "1", 10);
  const plan = readingPlan[dayNum - 1];
  const { toggleReading, isReadingComplete } = useReadingPlan();

  const { addHighlight, removeHighlight, getHighlightsForDay } = useHighlights();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const { prefs, updatePref } = useReadingPreferences();
  const [highlightMode, setHighlightMode] = useState(false);
  const [bookmarkMode, setBookmarkMode] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [activeColor, setActiveColor] = useState<HighlightColor>("gold");
  const dayHighlights = getHighlightsForDay(dayNum);

  const [selectedReading, setSelectedReading] = useState(0);
  const [scripture, setScripture] = useState<BibleApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notesOpen, setNotesOpen] = useState(false);
  const [notesTab, setNotesTab] = useState<"draw" | "type">("type");

  const getVerseHighlight = (bookName: string, chapter: number, verse: number) => {
    const ref = `${bookName} ${chapter}:${verse}`;
    return dayHighlights.find((h) => h.reference === ref);
  };

  const handleVerseTap = (bookName: string, chapter: number, verse: number, text: string) => {
    const ref = `${bookName} ${chapter}:${verse}`;
    if (bookmarkMode) {
      if (isBookmarked(ref)) {
        removeBookmark(ref);
      } else {
        addBookmark({ reference: ref, text: text.trim(), day: dayNum });
      }
      return;
    }
    if (!highlightMode) return;
    const existing = dayHighlights.find((h) => h.reference === ref);
    if (existing) {
      removeHighlight(existing.timestamp);
    } else {
      addHighlight({ reference: ref, text: text.trim(), color: activeColor, day: dayNum });
    }
  };

  const currentReading = plan?.readings[selectedReading];

  // Gather context entries for visible chapters
  const contextEntries = useMemo(() => {
    if (!scripture?.verses?.length) return [];
    const seen = new Set<string>();
    const entries: BibleContextEntry[] = [];
    for (const v of scripture.verses) {
      const key = `${v.book_name}-${v.chapter}`;
      if (seen.has(key)) continue;
      seen.add(key);
      entries.push(...getContextForReading(v.book_name, v.chapter));
    }
    // Deduplicate by title
    const unique = new Map<string, BibleContextEntry>();
    entries.forEach((e) => unique.set(e.title, e));
    return Array.from(unique.values());
  }, [scripture]);

  useEffect(() => {
    if (!currentReading) return;
    setLoading(true);
    setError(null);
    fetchScripture(currentReading.reference)
      .then((data) => { setScripture(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, [currentReading]);

  if (!plan) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Day not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col lg:pt-14">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-card/95 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <Link to="/" className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
              <ArrowLeft className="h-4 w-4 text-muted-foreground" />
            </Link>
            <div>
              <h1 className="font-serif text-lg font-semibold leading-tight">Day {dayNum}</h1>
              <p className="text-xs text-muted-foreground">{currentReading?.label}</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button onClick={() => navigate(`/read/${Math.max(1, dayNum - 1)}`)} disabled={dayNum <= 1} className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={() => navigate(`/read/${Math.min(365, dayNum + 1)}`)} disabled={dayNum >= 365} className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30">
              <ChevronRight className="h-4 w-4" />
            </button>
            <ThemeToggle />
            <button onClick={() => setShowPrefs(!showPrefs)} className={cn("h-8 w-8 rounded-lg flex items-center justify-center transition-colors", showPrefs ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground")} title="Reading preferences">
              <Settings2 className="h-4 w-4" />
            </button>
            <button onClick={() => { setBookmarkMode(!bookmarkMode); setHighlightMode(false); }} className={cn("h-8 w-8 rounded-lg flex items-center justify-center transition-colors", bookmarkMode ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground")} title="Bookmark mode">
              <Bookmark className="h-4 w-4" />
            </button>
            <button onClick={() => setNotesOpen(!notesOpen)} className={cn("h-8 w-8 rounded-lg flex items-center justify-center transition-colors", notesOpen ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground")}>
              {notesOpen ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
            </button>
            <button onClick={() => { setHighlightMode(!highlightMode); setBookmarkMode(false); }} className={cn("h-8 w-8 rounded-lg flex items-center justify-center transition-colors", highlightMode ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground")} title="Highlight mode">
              <Highlighter className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Reading preferences bar */}
      {showPrefs && (
        <div className="sticky top-[57px] z-20 bg-card/95 backdrop-blur-sm border-b border-border px-4 py-3">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-xs text-muted-foreground font-medium whitespace-nowrap">Size</label>
              <input type="range" min={14} max={28} step={1} value={prefs.fontSize} onChange={(e) => updatePref("fontSize", Number(e.target.value))} className="w-20 accent-primary" />
              <span className="text-xs text-muted-foreground w-6">{prefs.fontSize}</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-muted-foreground font-medium whitespace-nowrap">Spacing</label>
              <input type="range" min={1.4} max={2.6} step={0.1} value={prefs.lineHeight} onChange={(e) => updatePref("lineHeight", Number(e.target.value))} className="w-20 accent-primary" />
            </div>
            <div className="flex items-center gap-1">
              {(["serif", "sans", "mono"] as const).map((f) => (
                <button key={f} onClick={() => updatePref("fontFamily", f)} className={cn("px-2.5 py-1 rounded text-xs font-medium transition-colors", prefs.fontFamily === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground", f === "serif" && "font-serif", f === "sans" && "font-sans", f === "mono" && "font-mono")}>
                  {f === "serif" ? "Serif" : f === "sans" ? "Sans" : "Mono"}
                </button>
              ))}
            </div>
            <button onClick={() => setShowPrefs(false)} className="ml-auto text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Highlight color bar */}
      {highlightMode && (
        <div className={cn("sticky z-20 bg-card/95 backdrop-blur-sm border-b border-border px-4 py-2", showPrefs ? "top-[108px]" : "top-[57px]")}>
          <div className="max-w-6xl mx-auto flex items-center gap-3">
            <span className="text-xs text-muted-foreground font-medium">Tap a verse to highlight:</span>
            <div className="flex items-center gap-2">
              {(["gold", "sage", "sky", "rose"] as HighlightColor[]).map((color) => (
                <button key={color} onClick={() => setActiveColor(color)} className={cn("h-6 w-6 rounded-full border-2 transition-all duration-200", activeColor === color ? "border-foreground scale-110 ring-2 ring-foreground/20" : "border-transparent hover:scale-105")} style={{ backgroundColor: highlightColorValues[color] }} title={color} />
              ))}
            </div>
            <button onClick={() => setHighlightMode(false)} className="ml-auto text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Bookmark mode bar */}
      {bookmarkMode && (
        <div className={cn("sticky z-20 bg-card/95 backdrop-blur-sm border-b border-border px-4 py-2", showPrefs ? "top-[108px]" : "top-[57px]")}>
          <div className="max-w-6xl mx-auto flex items-center gap-3">
            <BookmarkCheck className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground font-medium">Tap a verse to bookmark / unbookmark it</span>
            <button onClick={() => setBookmarkMode(false)} className="ml-auto text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Reading tabs */}
      <div className="border-b border-border bg-card/50 px-4">
        <div className="max-w-6xl mx-auto flex gap-1 overflow-x-auto py-2">
          {plan.readings.map((reading, idx) => (
            <button key={idx} onClick={() => setSelectedReading(idx)} className={cn("flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors", selectedReading === idx ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground")}>
              {reading.label}
              {isReadingComplete(dayNum, idx) && <span className="h-2 w-2 rounded-full bg-primary-foreground/70" />}
            </button>
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex">
        {/* Scripture panel */}
        <main className={cn("flex-1 overflow-y-auto", notesOpen ? "hidden sm:block" : "")}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
            {/* Reading header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold mb-1">{currentReading?.reference}</h2>
                <div className="flex items-center gap-1">
                  {scripture && <ShareVerse reference={currentReading?.reference || ""} text={scripture.text} />}
                  {scripture && <AudioPlayer text={scripture.text} />}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">World English Bible</p>
            </div>

            {/* Context popups */}
            {contextEntries.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {contextEntries.map((entry) => (
                  <ContextPopup key={entry.title} entry={entry} />
                ))}
              </div>
            )}

            {/* Scripture content */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
              </div>
            )}

            {error && (
              <div className="rounded-xl bg-destructive/5 border border-destructive/20 p-6 text-center">
                <p className="text-destructive text-sm mb-2">Unable to load scripture</p>
                <p className="text-muted-foreground text-xs">{error}</p>
              </div>
            )}

            {scripture && !loading && (
              <div className="prose max-w-none">
                {scripture.verses?.map((verse, idx, arr) => {
                  const prevChapter = idx > 0 ? arr[idx - 1].chapter : null;
                  const showChapterHeader = verse.chapter !== prevChapter;
                  const ref = `${verse.book_name} ${verse.chapter}:${verse.verse}`;
                  const vh = getVerseHighlight(verse.book_name, verse.chapter, verse.verse);
                  const bm = isBookmarked(ref);
                  return (
                    <span key={`${verse.chapter}-${verse.verse}`}>
                      {showChapterHeader && (
                        <div className={cn("font-serif text-xl font-bold text-foreground flex items-center gap-3", idx === 0 ? "mb-4" : "mt-10 mb-4 pt-8 border-t border-border")}>
                          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary text-sm font-bold">{verse.chapter}</span>
                          {currentReading?.reference.split(/\d/)[0].trim()} {verse.chapter}
                        </div>
                      )}
                      <span
                        className={cn(
                          "group inline rounded-sm px-0.5 -mx-0.5 transition-colors duration-200",
                          (highlightMode || bookmarkMode) && "cursor-pointer hover:bg-muted",
                          vh && highlightColorMap[vh.color],
                          bm && !vh && "border-b-2 border-primary/40"
                        )}
                        onClick={() => handleVerseTap(verse.book_name, verse.chapter, verse.verse, verse.text)}
                      >
                        <sup className="text-xs text-primary/50 font-medium mr-0.5 select-none">
                          {verse.verse}
                        </sup>
                        {bm && <Bookmark className="inline h-3 w-3 text-primary/60 mr-0.5" />}
                        <span
                          className={cn("text-foreground/90", fontFamilyMap[prefs.fontFamily])}
                          style={{ fontSize: `${prefs.fontSize}px`, lineHeight: prefs.lineHeight }}
                        >
                          {verse.text}{" "}
                        </span>
                      </span>
                    </span>
                  );
                }) || (
                  <p className={cn("text-foreground/90 whitespace-pre-wrap", fontFamilyMap[prefs.fontFamily])} style={{ fontSize: `${prefs.fontSize}px`, lineHeight: prefs.lineHeight }}>
                    {scripture.text}
                  </p>
                )}
              </div>
            )}

            {/* Mark complete button */}
            <div className="mt-12 mb-8 flex justify-center">
              <button
                onClick={() => toggleReading(dayNum, selectedReading)}
                className={cn("rounded-xl px-8 py-3 font-medium transition-all duration-300 shadow-warm", isReadingComplete(dayNum, selectedReading) ? "bg-primary/10 text-primary border border-primary/20" : "bg-primary text-primary-foreground hover:shadow-warm-lg")}
              >
                {isReadingComplete(dayNum, selectedReading) ? "✓ Completed" : "Mark as Read"}
              </button>
            </div>
          </div>
        </main>

        {/* Notes side panel */}
        <aside className={cn("border-l border-border bg-card/30 flex flex-col transition-all duration-300", notesOpen ? "w-full sm:w-96" : "w-0 overflow-hidden")}>
          {notesOpen && (
            <>
              <div className="p-4 border-b border-border">
                <h3 className="font-serif text-sm font-semibold mb-2">Notes & Reflections</h3>
                <JournalingPrompt day={dayNum} />
              </div>
              <div className="flex border-b border-border">
                <button onClick={() => setNotesTab("type")} className={cn("flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium transition-colors", notesTab === "type" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground")}>
                  <Type className="h-3.5 w-3.5" /> Type
                </button>
                <button onClick={() => setNotesTab("draw")} className={cn("flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium transition-colors", notesTab === "draw" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground")}>
                  <Pencil className="h-3.5 w-3.5" /> Draw
                </button>
              </div>
              {notesTab === "type" ? (
                <TextNotes storageKey={`day-${dayNum}`} />
              ) : (
                <HandwritingCanvas storageKey={`bible-notes-day-${dayNum}`} className="flex-1" />
              )}
            </>
          )}
        </aside>
      </div>
    </div>
  );
};

export default ReadingPage;
