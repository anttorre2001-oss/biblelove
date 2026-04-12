import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Highlighter, Bookmark, FileText, PenTool, Trash2 } from "lucide-react";
import { useHighlights, highlightColorValues, type Highlight } from "@/hooks/useHighlights";
import { useBookmarks, type Bookmark as BookmarkType } from "@/hooks/useBookmarks";
import { ShareVerse } from "@/components/ShareVerse";
import { ThemeToggle } from "@/components/ThemeToggle";
import { readingPlan } from "@/data/readingPlan";
import { cn } from "@/lib/utils";

type TabKey = "highlights" | "bookmarks" | "notes" | "drawings";

const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: "highlights", label: "Highlights", icon: Highlighter },
  { key: "bookmarks", label: "Bookmarks", icon: Bookmark },
  { key: "notes", label: "Notes", icon: FileText },
  { key: "drawings", label: "Drawings", icon: PenTool },
];

interface NoteEntry {
  day: number;
  text: string;
  reading: string;
}

interface DrawingEntry {
  day: number;
  storageKey: string;
  reading: string;
}

function getReadingLabel(day: number): string {
  const plan = readingPlan[day - 1];
  return plan ? plan.readings.map((r) => r.label).join(", ") : `Day ${day}`;
}

function loadAllNotes(): NoteEntry[] {
  const entries: NoteEntry[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("bible-text-notes-day-")) {
      const dayStr = key.replace("bible-text-notes-day-", "");
      const day = parseInt(dayStr, 10);
      const text = localStorage.getItem(key) || "";
      if (text.trim() && !isNaN(day)) {
        entries.push({ day, text, reading: getReadingLabel(day) });
      }
    }
  }
  return entries.sort((a, b) => a.day - b.day);
}

function loadAllDrawings(): DrawingEntry[] {
  const entries: DrawingEntry[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("bible-notes-day-")) {
      const data = localStorage.getItem(key);
      if (data) {
        const dayStr = key.replace("bible-notes-day-", "");
        const day = parseInt(dayStr, 10);
        if (!isNaN(day)) {
          entries.push({ day, storageKey: key, reading: getReadingLabel(day) });
        }
      }
    }
  }
  return entries.sort((a, b) => a.day - b.day);
}

const CollectionPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>("highlights");
  const { highlights, removeHighlight } = useHighlights();
  const { bookmarks, removeBookmark } = useBookmarks();
  const [notes, setNotes] = useState<NoteEntry[]>([]);
  const [drawings, setDrawings] = useState<DrawingEntry[]>([]);

  useEffect(() => {
    setNotes(loadAllNotes());
    setDrawings(loadAllDrawings());
  }, []);

  const groupedHighlights = useMemo(() => {
    const groups: Record<number, Highlight[]> = {};
    for (const h of highlights) {
      if (!groups[h.day]) groups[h.day] = [];
      groups[h.day].push(h);
    }
    return Object.entries(groups)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([day, items]) => ({ day: Number(day), items, reading: getReadingLabel(Number(day)) }));
  }, [highlights]);

  const groupedBookmarks = useMemo(() => {
    const groups: Record<number, BookmarkType[]> = {};
    for (const b of bookmarks) {
      if (!groups[b.day]) groups[b.day] = [];
      groups[b.day].push(b);
    }
    return Object.entries(groups)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([day, items]) => ({ day: Number(day), items, reading: getReadingLabel(Number(day)) }));
  }, [bookmarks]);

  const counts = {
    highlights: highlights.length,
    bookmarks: bookmarks.length,
    notes: notes.length,
    drawings: drawings.length,
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8 lg:pt-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
              <ArrowLeft className="h-4 w-4 text-muted-foreground" />
            </button>
            <h1 className="font-serif text-2xl font-bold">📚 My Collection</h1>
          </div>
          <ThemeToggle />
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 overflow-x-auto mb-6 rounded-xl border border-border bg-card p-1 shadow-warm">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium transition-colors flex-1 justify-center",
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {counts[tab.key] > 0 && (
                <span
                  className={cn(
                    "ml-1 text-[10px] rounded-full px-1.5 min-w-[18px] text-center",
                    activeTab === tab.key
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted-foreground/10 text-muted-foreground"
                  )}
                >
                  {counts[tab.key]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="rounded-xl border border-border bg-card shadow-warm overflow-hidden">
          {/* Highlights */}
          {activeTab === "highlights" && (
            <div className="divide-y divide-border">
              {highlights.length === 0 ? (
                <EmptyState icon={Highlighter} message="No highlights yet. Open a reading and tap the highlighter to save verses." />
              ) : (
                groupedHighlights.map(({ day, items, reading }) => (
                  <div key={day} className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <button onClick={() => navigate(`/read/${day}`)} className="text-xs font-bold text-primary hover:underline">
                        Day {day}
                      </button>
                      <span className="text-[11px] text-muted-foreground">· {reading}</span>
                    </div>
                    <div className="space-y-2">
                      {items.map((h) => (
                        <div
                          key={h.timestamp}
                          onClick={() => navigate(`/read/${h.day}`)}
                          className="flex items-start gap-3 group cursor-pointer rounded-lg p-2 -mx-2 hover:bg-muted/50 transition-colors"
                        >
                          <span
                            className="mt-1.5 h-3 w-3 rounded-full flex-shrink-0 border"
                            style={{ backgroundColor: highlightColorValues[h.color], borderColor: highlightColorValues[h.color] }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-medium text-muted-foreground">{h.reference}</p>
                            <p className="text-sm text-foreground/85 font-serif leading-relaxed">{h.text}</p>
                          </div>
                          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                            <ShareVerse reference={h.reference} text={h.text} />
                            <button onClick={() => removeHighlight(h.timestamp)} className="h-7 w-7 rounded-md flex items-center justify-center hover:bg-destructive/10 text-destructive/50 hover:text-destructive">
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Bookmarks */}
          {activeTab === "bookmarks" && (
            <div className="divide-y divide-border">
              {bookmarks.length === 0 ? (
                <EmptyState icon={Bookmark} message="No bookmarks yet. Open a reading and tap the bookmark icon to save verses." />
              ) : (
                groupedBookmarks.map(({ day, items, reading }) => (
                  <div key={day} className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <button onClick={() => navigate(`/read/${day}`)} className="text-xs font-bold text-primary hover:underline">
                        Day {day}
                      </button>
                      <span className="text-[11px] text-muted-foreground">· {reading}</span>
                    </div>
                    <div className="space-y-2">
                      {items.map((b) => (
                        <div
                          key={b.reference}
                          onClick={() => navigate(`/read/${b.day}`)}
                          className="flex items-start gap-3 group cursor-pointer rounded-lg p-2 -mx-2 hover:bg-muted/50 transition-colors"
                        >
                          <Bookmark className="h-4 w-4 mt-1 text-primary/60 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-medium text-muted-foreground">{b.reference}</p>
                            <p className="text-sm text-foreground/85 font-serif leading-relaxed">{b.text}</p>
                          </div>
                          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                            <ShareVerse reference={b.reference} text={b.text} />
                            <button onClick={() => removeBookmark(b.reference)} className="h-7 w-7 rounded-md flex items-center justify-center hover:bg-destructive/10 text-destructive/50 hover:text-destructive">
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Notes */}
          {activeTab === "notes" && (
            <div className="divide-y divide-border">
              {notes.length === 0 ? (
                <EmptyState icon={FileText} message="No notes yet. Open a reading and use the notes panel to write reflections." />
              ) : (
                notes.map((n) => (
                  <button
                    key={n.day}
                    onClick={() => navigate(`/read/${n.day}`)}
                    className="w-full p-4 text-left hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-xs font-bold text-primary">Day {n.day}</p>
                      <span className="text-[11px] text-muted-foreground">· {n.reading}</span>
                    </div>
                    <p className="text-sm text-foreground/80 line-clamp-3 whitespace-pre-wrap font-serif">{n.text}</p>
                  </button>
                ))
              )}
            </div>
          )}

          {/* Drawings */}
          {activeTab === "drawings" && (
            <div>
              {drawings.length === 0 ? (
                <EmptyState icon={PenTool} message="No drawings yet. Open a reading and use the Draw tab in the notes panel." />
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
                  {drawings.map((d) => (
                    <button
                      key={d.storageKey}
                      onClick={() => navigate(`/read/${d.day}`)}
                      className="rounded-xl border border-border overflow-hidden hover:border-primary/40 hover:shadow-warm transition-all bg-background text-left"
                    >
                      <div className="aspect-[4/3] bg-muted/20 flex items-center justify-center">
                        <PenTool className="h-6 w-6 text-muted-foreground/30" />
                      </div>
                      <div className="px-3 py-2 border-t border-border">
                        <p className="text-xs font-bold text-primary">Day {d.day}</p>
                        <p className="text-[11px] text-muted-foreground truncate">{d.reading}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function EmptyState({ icon: Icon, message }: { icon: React.ElementType; message: string }) {
  return (
    <div className="py-16 text-center px-6">
      <Icon className="h-10 w-10 mx-auto text-muted-foreground/20 mb-4" />
      <p className="text-sm text-muted-foreground/60">{message}</p>
    </div>
  );
}

export default CollectionPage;
