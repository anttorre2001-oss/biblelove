import { useRef, useEffect, useState, useCallback } from "react";
import { Eraser, Undo2, Redo2, Trash2, Download, Pen, Highlighter, PenTool } from "lucide-react";
import { cn } from "@/lib/utils";

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
  "#3d2b1f", "#8b4513", "#2d5016", "#1a3a5c",
  "#c0392b", "#e67e22", "#f1c40f", "#27ae60",
  "#2980b9", "#8e44ad", "#1abc9c", "#e91e63",
];

const BRUSH_CONFIGS: Record<BrushType, { width: number; opacity: number; icon: typeof Pen; label: string }> = {
  pen: { width: 3, opacity: 1, icon: Pen, label: "Pen" },
  highlighter: { width: 20, opacity: 0.3, icon: Highlighter, label: "Highlighter" },
  fine: { width: 1.5, opacity: 1, icon: PenTool, label: "Fine Pen" },
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
  const [isEraser, setIsEraser] = useState(false);
  const [showColors, setShowColors] = useState(false);

  const brush = BRUSH_CONFIGS[brushType];

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try { setStrokes(JSON.parse(saved)); } catch {}
    }
  }, [storageKey]);

  useEffect(() => {
    if (strokes.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(strokes));
    }
  }, [strokes, storageKey]);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ruled lines
    ctx.strokeStyle = "hsl(35 25% 88%)";
    ctx.lineWidth = 0.5;
    for (let y = 30; y < canvas.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
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
      setCurrentStroke({ points: [point], color, width: brush.width, opacity: brush.opacity });
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

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Toolbar */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-card/50 flex-wrap">
        {/* Brush types */}
        {(Object.keys(BRUSH_CONFIGS) as BrushType[]).map((bt) => {
          const cfg = BRUSH_CONFIGS[bt];
          const Icon = cfg.icon;
          return (
            <button
              key={bt}
              onClick={() => { setBrushType(bt); setIsEraser(false); }}
              className={cn(
                "h-7 w-7 rounded-md flex items-center justify-center transition-colors",
                brushType === bt && !isEraser ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"
              )}
              title={cfg.label}
            >
              <Icon className="h-3.5 w-3.5" />
            </button>
          );
        })}

        <div className="w-px h-5 bg-border mx-0.5" />

        {/* Color picker toggle */}
        <button
          onClick={() => setShowColors(!showColors)}
          className="h-7 w-7 rounded-md flex items-center justify-center border-2 border-border hover:border-primary transition-colors"
        >
          <div className="h-4 w-4 rounded-full" style={{ backgroundColor: color }} />
        </button>

        <div className="w-px h-5 bg-border mx-0.5" />

        <button
          onClick={() => setIsEraser(!isEraser)}
          className={cn("h-7 w-7 rounded-md flex items-center justify-center transition-colors", isEraser ? "bg-destructive/10 text-destructive" : "hover:bg-muted text-muted-foreground")}
          title="Eraser"
        >
          <Eraser className="h-3.5 w-3.5" />
        </button>
        <button onClick={handleUndo} className="h-7 w-7 rounded-md flex items-center justify-center hover:bg-muted text-muted-foreground transition-colors" title="Undo">
          <Undo2 className="h-3.5 w-3.5" />
        </button>
        <button onClick={handleRedo} disabled={redoStack.length === 0} className="h-7 w-7 rounded-md flex items-center justify-center hover:bg-muted text-muted-foreground transition-colors disabled:opacity-30" title="Redo">
          <Redo2 className="h-3.5 w-3.5" />
        </button>
        <button onClick={handleExport} className="h-7 w-7 rounded-md flex items-center justify-center hover:bg-muted text-muted-foreground transition-colors" title="Export as PNG">
          <Download className="h-3.5 w-3.5" />
        </button>
        <button onClick={handleClear} className="h-7 w-7 rounded-md flex items-center justify-center hover:bg-muted text-muted-foreground transition-colors" title="Clear all">
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Color palette (expandable) */}
      {showColors && (
        <div className="flex flex-wrap gap-1.5 px-3 py-2 border-b border-border bg-card/30">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => { setColor(c); setIsEraser(false); }}
              className={cn(
                "h-6 w-6 rounded-full border-2 transition-all",
                color === c && !isEraser ? "ring-2 ring-primary scale-110 border-primary" : "border-border hover:scale-105"
              )}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      )}

      {/* Canvas */}
      <div
        ref={containerRef}
        className="flex-1 min-h-[300px] bg-card rounded-b-xl border border-t-0 border-border overflow-hidden"
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
