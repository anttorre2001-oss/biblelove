import { useNavigate } from "react-router-dom";
import { Bookmark, BookOpen, Trash2, ArrowLeft } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

function groupByBook(bookmarks: ReturnType<typeof useBookmarks>["bookmarks"]) {
  const groups: Record<string, typeof bookmarks> = {};
  for (const bm of bookmarks) {
    const book = bm.reference.replace(/\s+\d+:\d+$/, "");
    if (!groups[book]) groups[book] = [];
    groups[book].push(bm);
  }
  return groups;
}

const BookmarksPage = () => {
  const navigate = useNavigate();
  const { bookmarks, removeBookmark } = useBookmarks();
  const grouped = groupByBook(bookmarks);
  const books = Object.keys(grouped);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-2xl px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4 text-muted-foreground" />
            </button>
            <h1 className="font-serif text-2xl font-bold flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-primary" />
              Bookmarks
            </h1>
          </div>
          <ThemeToggle />
        </div>

        {bookmarks.length === 0 ? (
          <div className="text-center py-20">
            <Bookmark className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">No bookmarks yet.</p>
            <p className="text-sm text-muted-foreground/60 mt-1">
              Open a reading and tap the bookmark icon to save verses.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {books.map((book) => (
              <section key={book}>
                <h2 className="font-serif text-lg font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  {book}
                </h2>
                <div className="space-y-2">
                  {grouped[book].map((bm) => (
                    <div
                      key={bm.reference}
                      className="rounded-xl border border-border bg-card p-4 shadow-warm group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <button
                          onClick={() => navigate(`/read/${bm.day}`)}
                          className="flex-1 text-left"
                        >
                          <p className="text-xs font-medium text-primary mb-1">
                            {bm.reference} · Day {bm.day}
                          </p>
                          <p className="font-serif text-sm text-foreground/85 leading-relaxed line-clamp-2">
                            {bm.text}
                          </p>
                        </button>
                        <button
                          onClick={() => removeBookmark(bm.reference)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 rounded-md flex items-center justify-center hover:bg-destructive/10 text-destructive/60 hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
