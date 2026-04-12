import { cn } from "@/lib/utils";
import { type HighlightColor, highlightColorValues } from "@/hooks/useHighlights";

interface HighlightPickerProps {
  selectedColor: HighlightColor;
  onColorSelect: (color: HighlightColor) => void;
}

const colors: HighlightColor[] = ["gold", "sage", "sky", "rose"];

export function HighlightPicker({ selectedColor, onColorSelect }: HighlightPickerProps) {
  return (
    <div className="flex items-center gap-2">
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => onColorSelect(color)}
          className={cn(
            "h-6 w-6 rounded-full border-2 transition-all duration-200",
            selectedColor === color
              ? "border-foreground scale-110 ring-2 ring-foreground/20"
              : "border-transparent hover:scale-105"
          )}
          style={{ backgroundColor: highlightColorValues[color] }}
          title={color.charAt(0).toUpperCase() + color.slice(1)}
        />
      ))}
    </div>
  );
}
