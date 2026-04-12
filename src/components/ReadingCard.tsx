import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { getArtForReference } from "@/data/bookArt";

interface ReadingCardProps {
  label: string;
  reference: string;
  category: string;
  isComplete: boolean;
  onToggle: () => void;
  onRead?: () => void;
}

const categoryColors: Record<string, string> = {
  "old-testament": "bg-accent text-accent-foreground",
  "new-testament": "bg-secondary text-secondary-foreground",
  psalm: "bg-primary/10 text-primary",
  proverbs: "bg-muted text-muted-foreground",
  gospel: "bg-secondary text-secondary-foreground",
};

export function ReadingCard({ label, reference, category, isComplete, onToggle, onRead }: ReadingCardProps) {
  const artSrc = getArtForReference(reference);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-card shadow-warm transition-all duration-300 hover:shadow-warm-lg group",
        isComplete && "opacity-70"
      )}
    >
      {/* Art banner */}
      <div className="h-24 overflow-hidden relative">
        <img
          src={artSrc}
          alt={label}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width={800}
          height={512}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
        <span
          className={cn(
            "absolute top-3 left-3 inline-block rounded-md px-2 py-0.5 text-xs font-medium",
            categoryColors[category] || "bg-muted text-muted-foreground"
          )}
        >
          {category.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            className={cn(
              "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-all duration-300",
              isComplete
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background hover:border-primary/50"
            )}
          >
            {isComplete && <Check className="h-3.5 w-3.5" />}
          </button>
          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                "font-serif text-base font-semibold transition-all duration-300 leading-tight",
                isComplete && "line-through decoration-primary/30"
              )}
            >
              {label}
            </h3>
            <p className="text-muted-foreground text-sm mt-0.5">{reference}</p>
          </div>
          {onRead && (
            <button
              onClick={(e) => { e.stopPropagation(); onRead(); }}
              className="text-xs font-medium text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
            >
              Read →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
