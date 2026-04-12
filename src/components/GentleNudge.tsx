import { BookOpen } from "lucide-react";

interface GentleNudgeProps {
  onDismiss: () => void;
}

export function GentleNudge({ onDismiss }: GentleNudgeProps) {
  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 mb-6">
      <div className="flex items-center gap-3">
        <BookOpen className="h-5 w-5 text-primary shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-foreground/80">
            <span className="font-serif font-medium">You haven't read today yet.</span>{" "}
            Even a few minutes in God's Word can transform your day.
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
