import { useRef, useEffect, useState, useCallback } from "react";
import { Eraser, Undo2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface HandwritingCanvasProps {
  storageKey: string;
  className?: string;
}

interface Stroke {
  points: Array<{ x: number; y: number; pressure: number }>;
  color: string;
  width: number;
}

const COLORS = ["#3d2b1f", "#8b4513", "#2d5016", "#1a3a5c"];
const WIDTHS = [2, 4, 6];

export function HandwritingCanvas({ storageKey, className }: HandwritingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [color, setColor] = useState(COLORS[0]);
  const [width, setWidth] = useState(WIDTHS[1]);
  const [isEraser, setIsEraser] = useState(false);

  // Load saved strokes
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setStrokes(JSON.parse(saved));
      } catch {}
    }
  }, [storageKey]);

  // Save strokes
  useEffect(() => {
    if (strokes.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(strokes));
    }
  }, [strokes, storageKey]);

  // Redraw canvas
  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ruled lines
    ctx.strokeStyle = "hsl(35 25% 88%)";
    ctx.lineWidth = 0.5;
    for (let y = 30; y < canvas.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw strokes
    const allStrokes = currentStroke ? [...strokes, currentStroke] : strokes;
    for (const stroke of allStrokes) {
      if (stroke.points.length < 2) continue;
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
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
    }
  }, [strokes, currentStroke]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  // Resize canvas
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
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      pressure: e.pressure || 0.5,
    };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    const point = getPoint(e);

    if (isEraser) {
      // Erase strokes near the point
      setStrokes((prev) =>
        prev.filter((s) =>
          !s.points.some(
            (p) => Math.abs(p.x - point.x) < 15 && Math.abs(p.y - point.y) < 15
          )
        )
      );
    } else {
      setCurrentStroke({
        points: [point],
        color,
        width,
      });
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const point = getPoint(e);

    if (isEraser) {
      setStrokes((prev) =>
        prev.filter((s) =>
          !s.points.some(
            (p) => Math.abs(p.x - point.x) < 15 && Math.abs(p.y - point.y) < 15
          )
        )
      );
    } else if (currentStroke) {
      setCurrentStroke({
        ...currentStroke,
        points: [...currentStroke.points, point],
      });
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
    setStrokes((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setStrokes([]);
    localStorage.removeItem(storageKey);
  };

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-card/50 rounded-t-xl">
        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => { setColor(c); setIsEraser(false); }}
            className={cn(
              "h-5 w-5 rounded-full border transition-all",
              color === c && !isEraser ? "ring-2 ring-primary scale-110 border-primary" : "border-border"
            )}
            style={{ backgroundColor: c }}
          />
        ))}
        <div className="w-px h-4 bg-border mx-1" />
        {WIDTHS.map((w) => (
          <button
            key={w}
            onClick={() => setWidth(w)}
            className={cn(
              "h-6 w-6 rounded-md flex items-center justify-center hover:bg-muted transition-colors",
              width === w && "bg-muted"
            )}
          >
            <div className="rounded-full bg-foreground" style={{ width: w * 2, height: w * 2 }} />
          </button>
        ))}
        <div className="w-px h-4 bg-border mx-1" />
        <button
          onClick={() => setIsEraser(!isEraser)}
          className={cn(
            "h-6 w-6 rounded-md flex items-center justify-center transition-colors",
            isEraser ? "bg-destructive/10 text-destructive" : "hover:bg-muted text-muted-foreground"
          )}
        >
          <Eraser className="h-3.5 w-3.5" />
        </button>
        <button onClick={handleUndo} className="h-6 w-6 rounded-md flex items-center justify-center hover:bg-muted text-muted-foreground transition-colors">
          <Undo2 className="h-3.5 w-3.5" />
        </button>
        <button onClick={handleClear} className="h-6 w-6 rounded-md flex items-center justify-center hover:bg-muted text-muted-foreground transition-colors">
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className="flex-1 min-h-[300px] bg-card rounded-b-xl border border-t-0 border-border overflow-hidden"
        style={{ touchAction: "none" }}
      >
        <canvas
          ref={canvasRef}
          className={cn("w-full h-full", isEraser ? "cursor-crosshair" : "cursor-crosshair")}
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
