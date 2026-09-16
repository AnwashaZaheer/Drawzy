import { useCallback, useEffect, useRef } from 'react';
import type { MutableRefObject } from 'react';
import type { BrushSize, Tool } from './types';

const widths: Record<BrushSize, number> = { small: 4, medium: 9, large: 16 };
interface CanvasActions { undo: () => void; redo: () => void; clear: () => void; }
interface Props { tool: Tool; color: string; size: BrushSize; disabled: boolean; onHistoryChange: (undo: boolean, redo: boolean) => void; actionsRef: MutableRefObject<CanvasActions | null>; }

export const DrawingCanvas = ({ tool, color, size, disabled, onHistoryChange, actionsRef }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const historyRef = useRef<string[]>([]);
  const redoRef = useRef<string[]>([]);
  const historyChangeRef = useRef(onHistoryChange);


  useEffect(() => { historyChangeRef.current = onHistoryChange; }, [onHistoryChange]);

  const reportHistory = useCallback(() => historyChangeRef.current(historyRef.current.length > 1, redoRef.current.length > 0), []);
  const paint = useCallback((source?: string) => {
    const canvas = canvasRef.current;
    if (!canvas || !source) return;
    const image = new Image();
    image.onload = () => {
      const context = canvas.getContext('2d');
      const ratio = window.devicePixelRatio || 1;
      if (context) context.drawImage(image, 0, 0, canvas.width / ratio, canvas.height / ratio);
    };
    image.src = source;
  }, []);
  const snapshot = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    historyRef.current.push(canvas.toDataURL());
    redoRef.current = [];
    reportHistory();
  }, [reportHistory]);
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const rect = parent.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    const previous = historyRef.current.at(-1);
    const cssWidth = Math.max(1, rect.width);
    const cssHeight = Math.max(1, rect.height);
    canvas.width = Math.round(cssWidth * ratio);
    canvas.height = Math.round(cssHeight * ratio);
    const context = canvas.getContext('2d');
    if (!context) return;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, cssWidth, cssHeight);
    if (previous) paint(previous); else snapshot();
  }, [paint, snapshot]);

  useEffect(() => {
    resize();
    const parent = canvasRef.current?.parentElement;
    if (!parent) return undefined;
    const observer = new ResizeObserver(() => requestAnimationFrame(resize));
    observer.observe(parent);
    return () => observer.disconnect();
  }, [resize]);

  useEffect(() => {
    actionsRef.current = {
      undo: () => { if (historyRef.current.length < 2) return; const current = historyRef.current.pop(); if (current) redoRef.current.push(current); paint(historyRef.current.at(-1)); reportHistory(); },
      redo: () => { const next = redoRef.current.pop(); if (!next) return; historyRef.current.push(next); paint(next); reportHistory(); },
      clear: () => { const canvas = canvasRef.current; const context = canvas?.getContext('2d'); if (!canvas || !context) return; const ratio = window.devicePixelRatio || 1; context.fillStyle = '#ffffff'; context.fillRect(0, 0, canvas.width / ratio, canvas.height / ratio); snapshot(); },
    };
    return () => { actionsRef.current = null; };
  }, [actionsRef, paint, reportHistory, snapshot]);

  const point = (event: React.PointerEvent<HTMLCanvasElement>) => { const rect = event.currentTarget.getBoundingClientRect(); return { x: event.clientX - rect.left, y: event.clientY - rect.top }; };
  const start = (event: React.PointerEvent<HTMLCanvasElement>) => { if (disabled) return; event.currentTarget.setPointerCapture(event.pointerId); drawingRef.current = true; lastPointRef.current = point(event); };
  const move = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current || disabled || !lastPointRef.current) return;
    const context = event.currentTarget.getContext('2d');
    if (!context) return;
    const next = point(event);
    context.lineCap = 'round'; context.lineJoin = 'round'; context.strokeStyle = tool === 'eraser' ? '#ffffff' : color; context.lineWidth = widths[size];
    context.beginPath(); context.moveTo(lastPointRef.current.x, lastPointRef.current.y); context.lineTo(next.x, next.y); context.stroke();
    lastPointRef.current = next;
  };
  const end = () => { if (drawingRef.current) snapshot(); drawingRef.current = false; lastPointRef.current = null; };

  return <div className="h-[340px] overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm sm:h-[470px]"><canvas ref={canvasRef} className={disabled ? 'block h-full w-full touch-none cursor-not-allowed' : 'block h-full w-full touch-none cursor-crosshair'} onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end} aria-label="Drawing canvas" /></div>;
};

