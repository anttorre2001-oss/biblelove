import { Feather } from "lucide-react";
import { getJournalPrompt } from "@/data/journalPrompts";

interface JournalingPromptProps {
  day: number;
}

export function JournalingPrompt({ day }: JournalingPromptProps) {
  const prompt = getJournalPrompt(day);

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-warm">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Feather className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="font-serif text-sm font-semibold text-muted-foreground mb-1">
            Today's Reflection
          </h3>
          <p className="font-serif text-base italic text-foreground/80 leading-relaxed">
            {prompt}
          </p>
        </div>
      </div>
    </div>
  );
}
