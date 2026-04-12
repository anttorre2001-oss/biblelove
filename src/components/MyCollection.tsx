import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Highlighter, Bookmark, FileText, PenTool, Trash2 } from "lucide-react";
import { useHighlights, highlightColorValues, type Highlight } from "@/hooks/useHighlights";
import { useBookmarks, type Bookmark as BookmarkType } from "@/hooks/useBookmarks";
import { ShareVerse } from "@/components/ShareVerse";
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
}

interface DrawingEntry {
  day: number;
  storageKey: string;
  preview: string; // base64 thumbnail from localStorage
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
        entries.push({ day, text });
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
          entries.push({ day, storageKey: key, preview: data });
        }
      }
    }
  }
  return entries.sort((a, b) => a.day - b.day);
}

export function MyCollection() {
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
      .map(([day, items]) => ({ day: Number(day), items }));
  }, [highlights]);

  const groupedBookmarks = useMemo(() => {
    const groups: Record<number, BookmarkType[]> = {};
    for (const b of bookmarks) {
      if (!groups[b.day]) groups[b.day] = [];
      groups[b.day].push(b);
    }
    return Object.entries(groups)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([day, items]) => ({ day: Number(day), items }));
  }, [bookmarks]);

  const counts = {
    highlights: highlights.length,
    bookmarks: bookmarks.length,
    notes: notes.length,
    drawings: drawings.length,
  };

  return (
    <section className="mb-8">
      <h2 className="font-serif text-xl font-semibold mb-4">📚 My Collection</h2>

      {/* Tab bar */}
      <div className="flex gap-1 overflow-x-auto mb-4 rounded-xl border border-border bg-card p-1 shadow-warm">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium transition-colors flex-1 justify-center",
              activeTab === tab.key
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <tab.icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{tab.label}</span>
            {counts[tab.key] > 0 && (
              <span
                className={cn(
                  "ml-0.5 text-[10px] rounded-full px-1.5 min-w-[18px] text-center",
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
              groupedHighlights.map(({ day, items }) => (
                <div key={day} className="p-4">
                  <button onClick={() => navigate(`/read/${day}`)} className="text-xs font-semibold text-primary mb-2 hover:underline">
                    Day {day}
                  </button>
                  <div className="space-y-2">
                    {items.map((h) => (
                      <div key={h.timestamp} className="flex items-start gap-2 group">
                        <span
                          className="mt-1.5 h-3 w-3 rounded-full flex-shrink-0 border"
                          style={{ backgroundColor: highlightColorValues[h.color], borderColor: highlightColorValues[h.color] }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-medium text-muted-foreground">{h.reference}</p>
                          <p className="text-sm text-foreground/85 font-serif leading-relaxed line-clamp-2">{h.text}</p>
                        </div>
                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
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
              groupedBookmarks.map(({ day, items }) => (
                <div key={day} className="p-4">
                  <button onClick={() => navigate(`/read/${day}`)} className="text-xs font-semibold text-primary mb-2 hover:underline">
                    Day {day}
                  </button>
                  <div className="space-y-2">
                    {items.map((b) => (
                      <div key={b.reference} className="flex items-start gap-2 group">
                        <Bookmark className="h-3.5 w-3.5 mt-1 text-primary/60 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-medium text-muted-foreground">{b.reference}</p>
                          <p className="text-sm text-foreground/85 font-serif leading-relaxed line-clamp-2">{b.text}</p>
                        </div>
                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
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
                <button key={n.day} onClick={() => navigate(`/read/${n.day}`)} className="w-full p-4 text-left hover:bg-muted/50 transition-colors">
                  <p className="text-xs font-semibold text-primary mb-1">Day {n.day}</p>
                  <p className="text-sm text-foreground/80 line-clamp-3 whitespace-pre-wrap">{n.text}</p>
                </button>
              ))
            )}
          </div>
        )}

        {/* Drawings */}
        {activeTab === "drawings" && (
          <div className="divide-y divide-border">
            {drawings.length === 0 ? (
              <EmptyState icon={PenTool} message="No drawings yet. Open a reading and use the Draw tab in the notes panel." />
            ) : (
              <div className="grid grid-cols-2 gap-2 p-4">
                {drawings.map((d) => (
                  <button
                    key={d.storageKey}
                    onClick={() => navigate(`/read/${d.day}`)}
                    className="rounded-lg border border-border overflow-hidden hover:border-primary/40 transition-colors bg-background"
                  >
                    <div className="aspect-[4/3] bg-muted/30 flex items-center justify-center text-xs text-muted-foreground">
                      <span>Day {d.day} Drawing</span>
                    </div>
                    <div className="px-2 py-1.5 text-[11px] font-medium text-muted-foreground border-t border-border">
                      Day {d.day}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function EmptyState({ icon: Icon, message }: { icon: React.ElementType; message: string }) {
  return (
    <div className="py-12 text-center px-6">
      <Icon className="h-8 w-8 mx-auto text-muted-foreground/25 mb-3" />
      <p className="text-sm text-muted-foreground/70">{message}</p>
    </div>
  );
}
