import { useEffect, useRef, useState } from "react";
import { Award, Download, Sparkles } from "lucide-react";

interface CompletionCelebrationProps {
  startDate: Date;
  completedDays: number;
  streak: number;
}

export function CompletionCelebration({
  startDate,
  completedDays,
  streak,
}: CompletionCelebrationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiRef = useRef<HTMLCanvasElement>(null);
  const [showCert, setShowCert] = useState(false);

  // Confetti animation
  useEffect(() => {
    const canvas = confettiRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      rotation: number;
      rotSpeed: number;
    }> = [];

    const colors = [
      "hsl(45 93% 70%)",
      "hsl(16 65% 50%)",
      "hsl(140 30% 60%)",
      "hsl(35 55% 70%)",
      "hsl(280 30% 60%)",
    ];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 3,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
      });
    }

    let frame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03;
        p.rotation += p.rotSpeed;

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
          p.vy = Math.random() * 3 + 1;
        }
      });
      frame = requestAnimationFrame(animate);
    };
    animate();

    const timeout = setTimeout(() => {
      cancelAnimationFrame(frame);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 8000);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, []);

  const generateCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Render at the device's pixel ratio so the downloaded PNG is sharp
    // on retina / high-DPI screens. We keep the drawing API in logical
    // (800x600) coordinates by scaling the context.
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 800 * dpr;
    canvas.height = 600 * dpr;
    canvas.style.width = "800px";
    canvas.style.height = "600px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Parchment background
    ctx.fillStyle = "#f5f0e8";
    ctx.fillRect(0, 0, 800, 600);

    // Border
    ctx.strokeStyle = "#c4956a";
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 30, 740, 540);
    ctx.strokeStyle = "#d4a574";
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 40, 720, 520);

    // Title
    ctx.fillStyle = "#3d2b1f";
    ctx.font = "italic 16px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("Certificate of Completion", 400, 100);

    ctx.font = "bold 32px Georgia, serif";
    ctx.fillStyle = "#8b4513";
    ctx.fillText("The Holy Bible", 400, 150);

    ctx.font = "18px Georgia, serif";
    ctx.fillStyle = "#3d2b1f";
    ctx.fillText("Read in One Year", 400, 185);

    // Decorative line
    ctx.beginPath();
    ctx.moveTo(200, 210);
    ctx.lineTo(600, 210);
    ctx.strokeStyle = "#c4956a";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Body text
    ctx.font = "16px Georgia, serif";
    ctx.fillStyle = "#4a3728";
    ctx.fillText("This certifies the faithful completion of", 400, 260);
    ctx.fillText("reading through the entire Bible", 400, 285);
    ctx.fillText("in chronological order over 365 days.", 400, 310);

    // Dates
    const endDate = new Date();
    ctx.font = "14px Georgia, serif";
    ctx.fillStyle = "#6b5744";
    ctx.fillText(
      `${startDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })} — ${endDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}`,
      400,
      360
    );

    // Verse
    ctx.font = "italic 13px Georgia, serif";
    ctx.fillStyle = "#8b7355";
    ctx.fillText(
      '"Your word is a lamp to my feet and a light to my path."',
      400,
      430
    );
    ctx.fillText("— Psalm 119:105", 400, 455);

    // Decorative bottom line
    ctx.beginPath();
    ctx.moveTo(250, 500);
    ctx.lineTo(550, 500);
    ctx.strokeStyle = "#c4956a";
    ctx.stroke();

    ctx.font = "12px Georgia, serif";
    ctx.fillStyle = "#8b7355";
    ctx.fillText("✝ Soli Deo Gloria ✝", 400, 530);

    setShowCert(true);
  };

  const downloadCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "bible-completion-certificate.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="relative">
      {/* Confetti overlay */}
      <canvas
        ref={confettiRef}
        className="fixed inset-0 z-50 pointer-events-none"
      />

      <div className="rounded-2xl border border-border bg-card p-8 shadow-warm-lg text-center">
        <div className="mb-4 inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>

        <h2 className="font-serif text-2xl font-bold mb-2">
          🎉 You Did It! 🎉
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          You have faithfully completed reading through the entire Bible. 
          What an incredible journey of {completedDays} days.
          {streak > 30 && ` Your longest streak was ${streak} days!`}
        </p>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={generateCertificate}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-primary-foreground font-medium shadow-warm hover:shadow-warm-lg transition-all"
          >
            <Award className="h-5 w-5" />
            Generate Certificate
          </button>

          {showCert && (
            <div className="space-y-3">
              <canvas
                ref={canvasRef}
                className="mx-auto rounded-lg border border-border shadow-warm max-w-full"
                style={{ width: "100%", maxWidth: 500 }}
              />
              <button
                onClick={downloadCertificate}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
              >
                <Download className="h-4 w-4" />
                Download Certificate
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
