import { useRef, useEffect, useState, useCallback } from "react";
import { Eraser, Undo2, Redo2, Trash2, Download, Pen, Highlighter, PenTool } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";

interface HandwritingCanvasProps {
  storageKey: string;
  className?: string;
}

interface Stroke {
  points: Array<{ x: number; y: number; pressure: number }>;
  color: string;
  width: number;
  opacity: number;
}

type BrushType = "pen" | "highlighter" | "fine";

const COLORS = [
  "#1a1a2e", "#3d2b1f", "#8b4513", "#1a3a5c",
  "#c0392b", "#e67e22", "#27ae60", "#2980b9",
  "#8e44ad", "#e91e63", "#f39c12", "#1abc9c",
];

const BRUSH_CONFIGS: Record<BrushType, { width: number; opacity: number; icon: typeof Pen; label: string; description: string }> = {
  pen: { width: 3, opacity: 1, icon: Pen, label: "Pen", description: "Standard ink pen" },
  highlighter: { width: 20, opacity: 0.3, icon: Highlighter, label: "Highlighter", description: "Transparent marker" },
  fine: { width: 1.5, opacity: 1, icon: PenTool, label: "Fine", description: "Precise thin line" },
};

export function HandwritingCanvas({ storageKey, className }: HandwritingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [redoStack, setRedoStack] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [color, setColor] = useState(COLORS[0]);
  const [brushType, setBrushType] = useState<BrushType>("pen");
  const [brushSize, setBrushSize] = useState(3);
  const [isEraser, setIsEraser] = useState(false);

  const brush = BRUSH_CONFIGS[brushType];

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setStrokes(JSON.parse(saved));
    } catch {
      // corrupted / unavailable storage — start with empty canvas
    }
  }, [storageKey]);

  useEffect(() => {
    if (strokes.length > 0) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(strokes));
      } catch {
        // ignore quota / privacy errors
      }
    }
  }, [strokes, storageKey]);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw subtle dot grid
    ctx.fillStyle = "rgba(150,150,150,0.15)";
    for (let x = 20; x < canvas.width; x += 20) {
      for (let y = 20; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.arc(x, y, 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const allStrokes = currentStroke ? [...strokes, currentStroke] : strokes;
    for (const stroke of allStrokes) {
      if (stroke.points.length < 2) continue;
      ctx.globalAlpha = stroke.opacity;
      ctx.strokeStyle = stroke.color;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        const p = stroke.points[i];
        ctx.lineWidth = stroke.width * (p.pressure * 1.5 + 0.5);
        ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }, [strokes, currentStroke]);

  useEffect(() => { redraw(); }, [redraw]);

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      redraw();
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [redraw]);

  const getPoint = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0, pressure: 0.5 };
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top, pressure: e.pressure || 0.5 };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    const point = getPoint(e);
    if (isEraser) {
      setStrokes((prev) => prev.filter((s) => !s.points.some((p) => Math.abs(p.x - point.x) < 15 && Math.abs(p.y - point.y) < 15)));
    } else {
      const effectiveWidth = brushType === "highlighter" ? brushSize * 5 : brushType === "fine" ? brushSize * 0.5 : brushSize;
      setCurrentStroke({ points: [point], color, width: effectiveWidth, opacity: brush.opacity });
      setRedoStack([]);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const point = getPoint(e);
    if (isEraser) {
      setStrokes((prev) => prev.filter((s) => !s.points.some((p) => Math.abs(p.x - point.x) < 15 && Math.abs(p.y - point.y) < 15)));
    } else if (currentStroke) {
      setCurrentStroke({ ...currentStroke, points: [...currentStroke.points, point] });
    }
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
    if (currentStroke && currentStroke.points.length > 1) {
      setStrokes((prev) => [...prev, currentStroke]);
    }
    setCurrentStroke(null);
  };

  const handleUndo = () => {
    setStrokes((prev) => {
      if (prev.length === 0) return prev;
      const removed = prev[prev.length - 1];
      setRedoStack((r) => [...r, removed]);
      return prev.slice(0, -1);
    });
  };

  const handleRedo = () => {
    setRedoStack((prev) => {
      if (prev.length === 0) return prev;
      const restored = prev[prev.length - 1];
      setStrokes((s) => [...s, restored]);
      return prev.slice(0, -1);
    });
  };

  const handleClear = () => {
    setStrokes([]);
    setRedoStack([]);
    localStorage.removeItem(storageKey);
  };

  const handleExport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `bible-notes-${storageKey}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const ToolButton = ({ onClick, active, disabled, title, children }: { onClick: () => void; active?: boolean; disabled?: boolean; title: string; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "h-9 w-9 rounded-lg flex items-center justify-center transition-all duration-200",
        active ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-muted text-muted-foreground hover:text-foreground",
        disabled && "opacity-30 cursor-not-allowed"
      )}
    >
      {children}
    </button>
  );

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-border bg-background/80 backdrop-blur-sm">
        {/* Brush types */}
        <div className="flex items-center bg-muted/50 rounded-lg p-0.5 gap-0.5">
          {(Object.keys(BRUSH_CONFIGS) as BrushType[]).map((bt) => {
            const cfg = BRUSH_CONFIGS[bt];
            const Icon = cfg.icon;
            return (
              <button
                key={bt}
                onClick={() => { setBrushType(bt); setIsEraser(false); }}
                title={`${cfg.label} — ${cfg.description}`}
                className={cn(
                  "h-8 px-2.5 rounded-md flex items-center gap-1.5 text-xs font-medium transition-all duration-200",
                  brushType === bt && !isEraser
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{cfg.label}</span>
              </button>
            );
          })}
        </div>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Color picker */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="h-9 w-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
              title="Choose color"
            >
              <div className="h-5 w-5 rounded-full ring-2 ring-border shadow-sm" style={{ backgroundColor: color }} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3" side="bottom" align="start">
            <div className="space-y-3">
              <p className="text-xs font-medium text-muted-foreground">Color</p>
              <div className="grid grid-cols-6 gap-1.5">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setColor(c); setIsEraser(false); }}
                    className={cn(
                      "h-7 w-7 rounded-full transition-all duration-200",
                      color === c ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110" : "hover:scale-110"
                    )}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground">Size: {brushSize}</p>
                <Slider
                  value={[brushSize]}
                  onValueChange={([v]) => setBrushSize(v)}
                  min={1}
                  max={10}
                  step={0.5}
                  className="w-36"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="w-px h-6 bg-border mx-1" />

        <ToolButton onClick={() => setIsEraser(!isEraser)} active={isEraser} title="Eraser">
          <Eraser className="h-4 w-4" />
        </ToolButton>

        <div className="flex-1" />

        {/* Action buttons */}
        <div className="flex items-center gap-0.5">
          <ToolButton onClick={handleUndo} disabled={strokes.length === 0} title="Undo">
            <Undo2 className="h-4 w-4" />
          </ToolButton>
          <ToolButton onClick={handleRedo} disabled={redoStack.length === 0} title="Redo">
            <Redo2 className="h-4 w-4" />
          </ToolButton>
          <ToolButton onClick={handleExport} title="Export as PNG">
            <Download className="h-4 w-4" />
          </ToolButton>
          <ToolButton onClick={handleClear} title="Clear all">
            <Trash2 className="h-4 w-4" />
          </ToolButton>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className="flex-1 min-h-[300px] bg-card overflow-hidden"
        style={{ touchAction: "none" }}
      >
        <canvas
          ref={canvasRef}
          className={cn("w-full h-full", isEraser ? "cursor-cell" : "cursor-crosshair")}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
        />
      </div>
    </div>
  );
}
