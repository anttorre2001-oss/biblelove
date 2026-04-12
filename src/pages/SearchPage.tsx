import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon, BookOpen, Loader2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ShareVerse } from "@/components/ShareVerse";
import { cn } from "@/lib/utils";

interface SearchResult {
  reference: string;
  text: string;
  verses?: Array<{ book_name: string; chapter: number; verse: number; text: string }>;
}

const BIBLE_BOOKS = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
  "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles",
  "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
  "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah",
  "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
  "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah",
  "Haggai", "Zechariah", "Malachi",
  "Matthew", "Mark", "Luke", "John", "Acts",
  "Romans", "1 Corinthians", "2 Corinthians", "Galatians",
  "Ephesians", "Philippians", "Colossians",
  "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy",
  "Titus", "Philemon", "Hebrews", "James",
  "1 Peter", "2 Peter", "1 John", "2 John", "3 John",
  "Jude", "Revelation",
];

const SearchPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const encoded = query.trim().replace(/\s+/g, "+");
      const res = await fetch(`https://bible-api.com/${encoded}?translation=web`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || data.error || "Not found");
      }
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [query]);

  const handleBookClick = (book: string) => {
    setQuery(`${book} 1`);
    setLoading(true);
    setError(null);
    setResult(null);
    fetch(`https://bible-api.com/${book.replace(/\s+/g, "+")}+1?translation=web`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json();
      })
      .then((data) => setResult(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-2xl px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back
            </button>
            <h1 className="font-serif text-2xl font-bold text-foreground">Search the Bible</h1>
          </div>
          <ThemeToggle />
        </div>

        {/* Search bar */}
        <div className="flex gap-2 mb-8">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search verse, e.g. John 3:16 or Romans 8"
              className="w-full rounded-xl border border-border bg-card text-foreground pl-10 pr-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="rounded-xl bg-primary px-5 py-3 text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl bg-destructive/5 border border-destructive/20 p-4 mb-6">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="rounded-xl border border-border bg-card p-6 shadow-warm mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl font-bold text-foreground">{result.reference}</h2>
              <ShareVerse reference={result.reference} text={result.text} />
            </div>
            <div className="space-y-1">
              {result.verses?.map((v) => (
                <span key={`${v.chapter}-${v.verse}`}>
                  <sup className="text-xs text-primary/50 font-medium mr-0.5">
                    {v.verse}
                  </sup>
                  <span className="font-serif text-foreground/90 leading-[1.9]">
                    {v.text}{" "}
                  </span>
                </span>
              )) || (
                <p className="font-serif text-foreground/90 leading-[1.9] whitespace-pre-wrap">
                  {result.text}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Browse by book */}
        <section>
          <h2 className="font-serif text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Browse by Book
          </h2>

          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Old Testament
          </h3>
          <div className="flex flex-wrap gap-1.5 mb-6">
            {BIBLE_BOOKS.slice(0, 39).map((book) => (
              <button
                key={book}
                onClick={() => handleBookClick(book)}
                className="rounded-lg border border-border bg-card text-foreground px-2.5 py-1.5 text-xs font-medium hover:bg-muted hover:border-primary/30 transition-colors"
              >
                {book}
              </button>
            ))}
          </div>

          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            New Testament
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {BIBLE_BOOKS.slice(39).map((book) => (
              <button
                key={book}
                onClick={() => handleBookClick(book)}
                className="rounded-lg border border-border bg-card text-foreground px-2.5 py-1.5 text-xs font-medium hover:bg-muted hover:border-primary/30 transition-colors"
              >
                {book}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SearchPage;
