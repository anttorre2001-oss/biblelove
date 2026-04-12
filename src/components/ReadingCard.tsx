import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReadingCardProps {
  label: string;
  reference: string;
  category: string;
  isComplete: boolean;
  onToggle: () => void;
}

const categoryColors: Record<string, string> = {
  "old-testament": "bg-accent text-accent-foreground",
  "new-testament": "bg-secondary text-secondary-foreground",
  psalm: "bg-primary/10 text-primary",
  proverbs: "bg-muted text-muted-foreground",
  gospel: "bg-secondary text-secondary-foreground",
};

export function ReadingCard({ label, reference, category, isComplete, onToggle }: ReadingCardProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "w-full text-left rounded-xl border border-border bg-card p-5 shadow-warm transition-all duration-300 hover:shadow-warm-lg group",
        isComplete && "opacity-60"
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 transition-all duration-300",
            isComplete
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background group-hover:border-primary/50"
          )}
        >
          {isComplete && <Check className="h-4 w-4" />}
        </div>
        <div className="flex-1 min-w-0">
          <span
            className={cn(
              "inline-block rounded-md px-2 py-0.5 text-xs font-medium mb-2",
              categoryColors[category] || "bg-muted text-muted-foreground"
            )}
          >
            {category.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </span>
          <h3
            className={cn(
              "font-serif text-lg font-semibold transition-all duration-300",
              isComplete && "line-through decoration-primary/30"
            )}
          >
            {label}
          </h3>
          <p className="text-muted-foreground text-sm mt-0.5">{reference}</p>
        </div>
      </div>
    </button>
  );
}
