import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { isDark, toggleDark } = useTheme();

  return (
    <button
      onClick={toggleDark}
      className={cn(
        "h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300",
        "border border-border bg-card hover:bg-muted shadow-warm"
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-primary" />
      ) : (
        <Moon className="h-4 w-4 text-muted-foreground" />
      )}
    </button>
  );
}