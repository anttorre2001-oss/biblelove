import { Share2, Check } from "lucide-react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ShareVerseProps {
  reference: string;
  text: string;
  className?: string;
}

export function ShareVerse({ reference, text, className }: ShareVerseProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    const formatted = `"${text.trim()}"\n— ${reference} (WEB)`;

    if (navigator.share) {
      try {
        await navigator.share({ title: reference, text: formatted });
        return;
      } catch {}
    }

    await navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [reference, text]);

  return (
    <button
      onClick={handleShare}
      className={cn(
        "h-7 w-7 rounded-md flex items-center justify-center transition-colors hover:bg-muted text-muted-foreground hover:text-foreground",
        copied && "text-primary",
        className
      )}
      title="Share verse"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
    </button>
  );
}
