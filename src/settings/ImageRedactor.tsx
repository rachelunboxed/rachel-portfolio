import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { secondaryButtonClass } from './status';

type Box = { x: number; y: number; w: number; h: number };

const DISPLAY_MAX_WIDTH = 720;
const EXPORT_MAX_SIDE = 1600;
const MIN_BOX = 0.005;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

type ImageRedactorProps = {
  file: File;
  onConfirm: (image: Blob) => void;
  onCancel: () => void;
};

export default function ImageRedactor({ file, onConfirm, onCancel }: ImageRedactorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [draft, setDraft] = useState<Box | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => setImage(img);
    img.onerror = () => setError('Could not read this image. Please use a JPG or PNG.');
    img.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const scale = image ? Math.min(1, DISPLAY_MAX_WIDTH / image.naturalWidth) : 1;
  const displayWidth = image ? Math.round(image.naturalWidth * scale) : 0;
  const displayHeight = image ? Math.round(image.naturalHeight * scale) : 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !image) return;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    boxes.forEach((box) => ctx.fillRect(box.x * canvas.width, box.y * canvas.height, box.w * canvas.width, box.h * canvas.height));
    if (draft) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
      ctx.fillRect(draft.x * canvas.width, draft.y * canvas.height, draft.w * canvas.width, draft.h * canvas.height);
      ctx.strokeStyle = '#f2a65a';
      ctx.lineWidth = 2;
      ctx.strokeRect(draft.x * canvas.width, draft.y * canvas.height, draft.w * canvas.width, draft.h * canvas.height);
    }
  }, [image, boxes, draft, displayWidth, displayHeight]);

  const pointFrom = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: clamp((e.clientX - rect.left) / rect.width), y: clamp((e.clientY - rect.top) / rect.height) };
  };

  const handlePointerDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const point = pointFrom(e);
    startRef.current = point;
    setDraft({ ...point, w: 0, h: 0 });
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const start = startRef.current;
    if (!start) return;
    const point = pointFrom(e);
    setDraft({
      x: Math.min(start.x, point.x),
      y: Math.min(start.y, point.y),
      w: Math.abs(point.x - start.x),
      h: Math.abs(point.y - start.y),
    });
  };

  const handlePointerUp = () => {
    startRef.current = null;
    if (draft && draft.w > MIN_BOX && draft.h > MIN_BOX) {
      setBoxes((prev) => [...prev, draft]);
    }
    setDraft(null);
  };

  const handleConfirm = () => {
    if (!image) return;
    const ratio = Math.min(1, EXPORT_MAX_SIDE / Math.max(image.naturalWidth, image.naturalHeight));
    const width = Math.round(image.naturalWidth * ratio);
    const height = Math.round(image.naturalHeight * ratio);

    const out = document.createElement('canvas');
    out.width = width;
    out.height = height;
    const ctx = out.getContext('2d');
    if (!ctx) {
      setError('Could not prepare the image.');
      return;
    }
    // Flatten onto white so transparent PNGs don't turn black when saved as JPEG.
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(image, 0, 0, width, height);
    ctx.fillStyle = '#000';
    boxes.forEach((box) => ctx.fillRect(box.x * width, box.y * height, box.w * width, box.h * height));

    out.toBlob(
      (blob) => {
        if (blob) onConfirm(blob);
        else setError('Could not prepare the image.');
      },
      'image/jpeg',
      0.9,
    );
  };

  if (error && !image) {
    return (
      <div className="mt-4 rounded-xl border border-border p-4">
        <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
        <button type="button" onClick={onCancel} className={`mt-3 ${secondaryButtonClass}`}>
          Choose another image
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-xl border border-border bg-bg p-4">
      <p className="text-xs leading-relaxed text-muted">
        Drag over anything confidential (names, clients, company details). The boxes are burned into the image
        and the original never leaves your browser. Skip this if nothing needs hiding.
      </p>

      {image ? (
        <canvas
          ref={canvasRef}
          width={displayWidth}
          height={displayHeight}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="mt-3 h-auto w-full cursor-crosshair touch-none rounded-lg border border-border"
          aria-label="Image preview. Drag to cover confidential areas."
        />
      ) : (
        <p className="mt-3 text-sm text-muted">Loading image…</p>
      )}

      {error ? <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">{error}</p> : null}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button type="button" onClick={handleConfirm} disabled={!image} className="rounded-full bg-gradient-accent px-4 py-2 text-xs font-semibold text-white disabled:opacity-40">
          Use this image{boxes.length > 0 ? ` (${boxes.length} hidden area${boxes.length === 1 ? '' : 's'})` : ''}
        </button>
        <button type="button" onClick={() => setBoxes((prev) => prev.slice(0, -1))} disabled={boxes.length === 0} className={secondaryButtonClass}>
          Undo last box
        </button>
        <button type="button" onClick={() => setBoxes([])} disabled={boxes.length === 0} className={secondaryButtonClass}>
          Clear boxes
        </button>
        <button type="button" onClick={onCancel} className={secondaryButtonClass}>
          Cancel
        </button>
      </div>
    </div>
  );
}
