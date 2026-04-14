import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface KeyboardShortcutsHelpProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ShortcutRow {
  keys: string[];
  description: string;
}

const shortcuts: ShortcutRow[] = [
  { keys: ["←"], description: "Previous day" },
  { keys: ["→"], description: "Next day" },
  { keys: ["b"], description: "Toggle bookmark mode" },
  { keys: ["h"], description: "Toggle highlight mode" },
  { keys: ["p"], description: "Toggle preferences bar" },
  { keys: ["n"], description: "Toggle notes panel" },
  { keys: ["Esc"], description: "Close open panels" },
  { keys: ["?"], description: "Show this help" },
];

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded border border-border bg-muted px-1.5 font-mono text-xs font-medium text-foreground shadow-sm">
      {children}
    </kbd>
  );
}

export function KeyboardShortcutsHelp({ open, onOpenChange }: KeyboardShortcutsHelpProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-serif">Keyboard shortcuts</DialogTitle>
          <DialogDescription>
            Navigate the reading page without touching the mouse.
          </DialogDescription>
        </DialogHeader>
        <ul className="mt-2 divide-y divide-border">
          {shortcuts.map((s) => (
            <li key={s.description} className="flex items-center justify-between py-2">
              <span className="text-sm text-foreground/80">{s.description}</span>
              <span className="flex items-center gap-1">
                {s.keys.map((k) => (
                  <Kbd key={k}>{k}</Kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
