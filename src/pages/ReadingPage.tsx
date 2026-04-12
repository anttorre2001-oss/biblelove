import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2, PanelRightOpen, PanelRightClose, Pencil, Type, Highlighter, X } from "lucide-react";
import { readingPlan } from "@/data/readingPlan";
import { useReadingPlan } from "@/hooks/useReadingPlan";
import { useHighlights, type HighlightColor, highlightColorMap, highlightColorValues } from "@/hooks/useHighlights";
import { HandwritingCanvas } from "@/components/HandwritingCanvas";
import { TextNotes } from "@/components/TextNotes";
import { JournalingPrompt } from "@/components/JournalingPrompt";
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

// Split a reference like "Genesis 1-3" into ["Genesis 1", "Genesis 2", "Genesis 3"]
// or "Psalm 104" into ["Psalm 104"]
function splitReference(reference: string): string[] {
  // Match patterns like "Genesis 1-3", "1 Samuel 5-7", "Psalm 104", "Proverbs 3:1-12"
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
  // Single chapter or verse range like "Proverbs 3:1-12" or "Psalm 104"
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
    if (data.verses) {
      allVerses.push(...data.verses);
    }
    if (data.text) {
      fullText += data.text;
    }
  }

  return {
    reference,
    verses: allVerses,
    text: fullText,
  };
}

const ReadingPage = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const dayNum = parseInt(day || "1", 10);
  const plan = readingPlan[dayNum - 1];
  const { toggleReading, isReadingComplete } = useReadingPlan();

  const { addHighlight, removeHighlight, getHighlightsForDay } = useHighlights();
  const [highlightMode, setHighlightMode] = useState(false);
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
    if (!highlightMode) return;
    const ref = `${bookName} ${chapter}:${verse}`;
    const existing = dayHighlights.find((h) => h.reference === ref);
    if (existing) {
      removeHighlight(existing.timestamp);
    } else {
      addHighlight({ reference: ref, text: text.trim(), color: activeColor, day: dayNum });
    }
  };

  const currentReading = plan?.readings[selectedReading];

  // Fetch scripture from bible-api.com
  useEffect(() => {
    if (!currentReading) return;
    setLoading(true);
    setError(null);

    fetchScripture(currentReading.reference)
      .then((data) => {
        setScripture(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [currentReading]);

  if (!plan) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Day not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-card/95 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4 text-muted-foreground" />
            </Link>
            <div>
              <h1 className="font-serif text-lg font-semibold leading-tight">Day {dayNum}</h1>
              <p className="text-xs text-muted-foreground">{currentReading?.label}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/read/${Math.max(1, dayNum - 1)}`)}
              disabled={dayNum <= 1}
              className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigate(`/read/${Math.min(365, dayNum + 1)}`)}
              disabled={dayNum >= 365}
              className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setNotesOpen(!notesOpen)}
              className={cn(
                "h-8 w-8 rounded-lg flex items-center justify-center transition-colors",
                notesOpen ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"
              )}
            >
              {notesOpen ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setHighlightMode(!highlightMode)}
              className={cn(
                "h-8 w-8 rounded-lg flex items-center justify-center transition-colors",
                highlightMode ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"
              )}
              title="Highlight mode"
            >
              <Highlighter className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Highlight color bar */}
      {highlightMode && (
        <div className="sticky top-[57px] z-20 bg-card/95 backdrop-blur-sm border-b border-border px-4 py-2">
          <div className="max-w-6xl mx-auto flex items-center gap-3">
            <span className="text-xs text-muted-foreground font-medium">Tap a verse to highlight:</span>
            <div className="flex items-center gap-2">
              {(["gold", "sage", "sky", "rose"] as HighlightColor[]).map((color) => (
                <button
                  key={color}
                  onClick={() => setActiveColor(color)}
                  className={cn(
                    "h-6 w-6 rounded-full border-2 transition-all duration-200",
                    activeColor === color
                      ? "border-foreground scale-110 ring-2 ring-foreground/20"
                      : "border-transparent hover:scale-105"
                  )}
                  style={{ backgroundColor: highlightColorValues[color] }}
                  title={color}
                />
              ))}
            </div>
            <button onClick={() => setHighlightMode(false)} className="ml-auto text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Reading tabs */}
      <div className="border-b border-border bg-card/50 px-4">
        <div className="max-w-6xl mx-auto flex gap-1 overflow-x-auto py-2">
          {plan.readings.map((reading, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedReading(idx)}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                selectedReading === idx
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground"
              )}
            >
              {reading.label}
              {isReadingComplete(dayNum, idx) && (
                <span className="h-2 w-2 rounded-full bg-primary-foreground/70" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex">
        {/* Scripture panel */}
        <main className={cn("flex-1 overflow-y-auto", notesOpen ? "hidden sm:block" : "")}>
          <div className="max-w-2xl mx-auto px-6 py-8">
            {/* Reading header */}
            <div className="mb-8">
              <h2 className="font-serif text-2xl font-bold mb-1">
                {currentReading?.reference}
              </h2>
              <p className="text-sm text-muted-foreground">World English Bible</p>
            </div>

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
              <div className="prose prose-lg max-w-none">
                {scripture.verses?.map((verse, idx, arr) => {
                  const prevChapter = idx > 0 ? arr[idx - 1].chapter : null;
                  const showChapterHeader = verse.chapter !== prevChapter;
                  return (
                    <span key={`${verse.chapter}-${verse.verse}`}>
                      {showChapterHeader && (
                        <div className={cn(
                          "font-serif text-xl font-bold text-foreground flex items-center gap-3",
                          idx === 0 ? "mb-4" : "mt-10 mb-4 pt-8 border-t border-border"
                        )}>
                          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary text-sm font-bold">
                            {verse.chapter}
                          </span>
                          {currentReading?.reference.split(/\d/)[0].trim()} {verse.chapter}
                        </div>
                      )}
                      <span className="group">
                        <sup className="text-xs text-primary/50 font-medium mr-0.5 select-none">
                          {verse.verse}
                        </sup>
                        <span className="font-serif text-foreground/90 leading-[1.9] text-lg">
                          {verse.text}{" "}
                        </span>
                      </span>
                    </span>
                  );
                }) || (
                  <p className="font-serif text-foreground/90 leading-[1.9] text-lg whitespace-pre-wrap">
                    {scripture.text}
                  </p>
                )}
              </div>
            )}

            {/* Mark complete button */}
            <div className="mt-12 mb-8 flex justify-center">
              <button
                onClick={() => toggleReading(dayNum, selectedReading)}
                className={cn(
                  "rounded-xl px-8 py-3 font-medium transition-all duration-300 shadow-warm",
                  isReadingComplete(dayNum, selectedReading)
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "bg-primary text-primary-foreground hover:shadow-warm-lg"
                )}
              >
                {isReadingComplete(dayNum, selectedReading)
                  ? "✓ Completed"
                  : "Mark as Read"}
              </button>
            </div>
          </div>
        </main>

        {/* Notes side panel */}
        <aside
          className={cn(
            "border-l border-border bg-card/30 flex flex-col transition-all duration-300",
            notesOpen ? "w-full sm:w-96" : "w-0 overflow-hidden"
          )}
        >
          {notesOpen && (
            <>
              <div className="p-4 border-b border-border">
                <h3 className="font-serif text-sm font-semibold mb-2">Notes & Reflections</h3>
                <JournalingPrompt day={dayNum} />
              </div>
              {/* Notes tabs */}
              <div className="flex border-b border-border">
                <button
                  onClick={() => setNotesTab("type")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium transition-colors",
                    notesTab === "type" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Type className="h-3.5 w-3.5" /> Type
                </button>
                <button
                  onClick={() => setNotesTab("draw")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium transition-colors",
                    notesTab === "draw" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Pencil className="h-3.5 w-3.5" /> Draw
                </button>
              </div>
              {notesTab === "type" ? (
                <TextNotes storageKey={`day-${dayNum}`} />
              ) : (
                <HandwritingCanvas
                  storageKey={`bible-notes-day-${dayNum}`}
                  className="flex-1"
                />
              )}
            </>
          )}
        </aside>
      </div>
    </div>
  );
};

export default ReadingPage;
