import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookIntros, chapterTheology, type BookIntro, type ChapterTheology } from "@/data/theologyData";
import { GraduationCap, BookOpen, ChevronRight, ArrowLeft, Cross, ScrollText, Lightbulb, Link2, HelpCircle, History } from "lucide-react";
import { cn } from "@/lib/utils";

const TheologyPage = () => {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState<BookIntro | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<ChapterTheology | null>(null);

  const chaptersForBook = selectedBook
    ? chapterTheology.filter((c) => c.book.toLowerCase() === selectedBook.book.toLowerCase())
    : [];

  if (selectedChapter) {
    return (
      <div className="min-h-screen bg-background pb-24 lg:pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button onClick={() => setSelectedChapter(null)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to {selectedBook?.book}
          </button>

          <h1 className="font-serif text-2xl font-bold mb-1">{selectedChapter.book} {selectedChapter.chapter}</h1>
          <h2 className="font-serif text-lg text-primary mb-2">{selectedChapter.title}</h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{selectedChapter.summary}</p>

          {/* Key Themes */}
          <div className="flex flex-wrap gap-2 mb-8">
            {selectedChapter.keyThemes.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{t}</span>
            ))}
          </div>

          {/* Theological Concepts */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-4 w-4 text-primary" />
              <h3 className="font-serif text-lg font-semibold">Theological Concepts</h3>
            </div>
            <div className="space-y-4">
              {selectedChapter.theologicalConcepts.map((concept) => (
                <div key={concept.term} className="bg-card border border-border rounded-xl p-5">
                  <h4 className="font-serif font-bold text-base mb-2 text-primary">{concept.term}</h4>
                  <p className="text-sm text-foreground/90 leading-relaxed mb-3">{concept.definition}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {concept.relatedVerses.map((v) => (
                      <span key={v} className="px-2 py-0.5 rounded-md bg-muted text-xs text-muted-foreground font-medium">{v}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cross References */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Link2 className="h-4 w-4 text-primary" />
              <h3 className="font-serif text-lg font-semibold">Cross References</h3>
            </div>
            <div className="space-y-3">
              {selectedChapter.crossReferences.map((cr) => (
                <div key={cr.reference} className="flex gap-3 p-3 rounded-lg bg-card border border-border">
                  <ScrollText className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{cr.reference}</p>
                    <p className="text-xs text-muted-foreground">{cr.connection}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Historical Context */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <History className="h-4 w-4 text-primary" />
              <h3 className="font-serif text-lg font-semibold">Historical & Cultural Context</h3>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-sm text-foreground/90 leading-relaxed">{selectedChapter.historicalContext}</p>
            </div>
          </section>

          {/* Application Questions */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="h-4 w-4 text-primary" />
              <h3 className="font-serif text-lg font-semibold">Application Questions</h3>
            </div>
            <div className="space-y-3">
              {selectedChapter.applicationQuestions.map((q, i) => (
                <div key={i} className="flex gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                  <p className="text-sm text-foreground/90 leading-relaxed">{q}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (selectedBook) {
    return (
      <div className="min-h-screen bg-background pb-24 lg:pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button onClick={() => setSelectedBook(null)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> All Books
          </button>

          <h1 className="font-serif text-3xl font-bold mb-2">{selectedBook.book}</h1>
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-6">
            <span className="px-2 py-1 rounded-md bg-muted">✍️ {selectedBook.author}</span>
            <span className="px-2 py-1 rounded-md bg-muted">📅 {selectedBook.dateWritten}</span>
            <span className="px-2 py-1 rounded-md bg-muted">📖 {selectedBook.genre}</span>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 mb-6">
            <h3 className="font-serif font-semibold mb-2">Audience</h3>
            <p className="text-sm text-muted-foreground">{selectedBook.audience}</p>
          </div>

          {/* Outline */}
          <section className="mb-6">
            <h3 className="font-serif font-semibold mb-3">Book Outline</h3>
            <div className="space-y-2">
              {selectedBook.outline.map((item, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-lg bg-card border border-border">
                  <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                  <p className="text-sm text-foreground/90">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Key Themes */}
          <section className="mb-6">
            <h3 className="font-serif font-semibold mb-3">Key Themes</h3>
            <div className="flex flex-wrap gap-2">
              {selectedBook.keyThemes.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{t}</span>
              ))}
            </div>
          </section>

          {/* Theological Significance */}
          <section className="mb-6">
            <h3 className="font-serif font-semibold mb-3">Theological Significance</h3>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-sm text-foreground/90 leading-relaxed">{selectedBook.theologicalSignificance}</p>
            </div>
          </section>

          {/* Christ Connection */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Cross className="h-4 w-4 text-primary" />
              <h3 className="font-serif font-semibold">How This Book Points to Christ</h3>
            </div>
            <div className="bg-primary/5 border border-primary/10 rounded-xl p-5">
              <p className="text-sm text-foreground/90 leading-relaxed">{selectedBook.christConnection}</p>
            </div>
          </section>

          {/* Chapter Deep Dives */}
          {chaptersForBook.length > 0 && (
            <section className="mb-8">
              <h3 className="font-serif font-semibold mb-3">Chapter Deep Dives</h3>
              <div className="space-y-2">
                {chaptersForBook.map((ch) => (
                  <button
                    key={ch.chapter}
                    onClick={() => setSelectedChapter(ch)}
                    className="w-full flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-muted/50 transition-all text-left"
                  >
                    <span className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">{ch.chapter}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{ch.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{ch.keyThemes.slice(0, 3).join(" · ")}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  // Book list
  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground">Theology</h1>
            <p className="text-sm text-muted-foreground">Deep dive into each book of the Bible</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {bookIntros.map((book) => {
            const chapterCount = chapterTheology.filter((c) => c.book.toLowerCase() === book.book.toLowerCase()).length;
            return (
              <button
                key={book.book}
                onClick={() => setSelectedBook(book)}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all text-left"
              >
                <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-serif font-semibold text-sm">{book.book}</p>
                  <p className="text-xs text-muted-foreground truncate">{book.genre} · {book.author.split("(")[0].trim()}</p>
                </div>
                {chapterCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">{chapterCount} ch</span>
                )}
                <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TheologyPage;
