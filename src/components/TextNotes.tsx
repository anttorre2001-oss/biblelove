import { useTextNotes } from "@/hooks/useTextNotes";

interface TextNotesProps {
  storageKey: string;
}

export function TextNotes({ storageKey }: TextNotesProps) {
  const { text, updateText } = useTextNotes(storageKey);

  return (
    <div className="flex flex-col h-full">
      <textarea
        value={text}
        onChange={(e) => updateText(e.target.value)}
        placeholder="Type your reflections, notes, and thoughts here..."
        className="flex-1 w-full resize-none bg-transparent p-4 font-serif text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/40 focus:outline-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(transparent, transparent 29px, hsl(var(--border)) 29px, hsl(var(--border)) 30px)",
          backgroundSize: "100% 30px",
          lineHeight: "30px",
          paddingTop: "5px",
        }}
      />
    </div>
  );
}
