import { useRef, useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import { NBButton, NBCard } from "@/lib/nb";

interface ImageCropProps {
  imageSrc: string;
  onCrop: (croppedDataUrl: string) => void;
  onCancel: () => void;
}

export function ImageCrop({ imageSrc, onCrop, onCancel }: ImageCropProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleCrop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        offsetX,
        offsetY,
        canvas.width / scale,
        canvas.height / scale,
        0,
        0,
        canvas.width,
        canvas.height
      );
      const croppedDataUrl = canvas.toDataURL("image/png");
      onCrop(croppedDataUrl);
    };
    img.src = imageSrc;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setDragStart({ x: e.clientX - offsetX, y: e.clientY - offsetY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setOffsetX(e.clientX - dragStart.x);
    setOffsetY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <NBCard className="w-full max-w-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black">Crop your image</h3>
          <button
            onClick={onCancel}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border-2 border-ink">
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="w-full cursor-move bg-cover"
            style={{
              backgroundImage: `url(${imageSrc})`,
              backgroundPosition: `${offsetX}px ${offsetY}px`,
              backgroundSize: `${100 * scale}%`,
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold uppercase text-ink/60">Zoom</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScale(Math.max(0.5, scale - 0.1))}
              className="nb-press inline-flex h-9 w-9 items-center justify-center rounded-lg bg-muted"
            >
              <Minus className="h-4 w-4" />
            </button>
            <div className="flex-1 h-2 bg-muted rounded-full">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${((scale - 0.5) / 1.5) * 100}%` }}
              />
            </div>
            <button
              onClick={() => setScale(Math.min(2, scale + 0.1))}
              className="nb-press inline-flex h-9 w-9 items-center justify-center rounded-lg bg-muted"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <NBButton full tone="secondary" onClick={onCancel}>
            Cancel
          </NBButton>
          <NBButton full tone="primary" onClick={handleCrop}>
            Apply
          </NBButton>
        </div>
      </NBCard>
    </div>
  );
}
