import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, Undo2, Check, PenTool, Eye, EyeOff, Save } from 'lucide-react';
import { KoreanAudioPlayer } from './KoreanAudioPlayer';

export interface WritingPracticeTarget {
  char: string;
  name: string;
  romanization: string;
  strokesCount: number;
  strokeDirections: string[];
}

interface HangulWritingCanvasProps {
  targets: WritingPracticeTarget[];
  onPracticeSaved?: (char: string) => void;
  className?: string;
}

export const HangulWritingCanvas: React.FC<HangulWritingCanvasProps> = ({
  targets,
  onPracticeSaved,
  className = ''
}) => {
  const [selectedCharIndex, setSelectedCharIndex] = useState(0);
  const [showWatermark, setShowWatermark] = useState(true);
  const [lineWidth, setLineWidth] = useState(8);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const currentTarget = targets[selectedCharIndex];

  useEffect(() => {
    clearCanvas();
  }, [selectedCharIndex]);

  const saveStateToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory(prev => [...prev.slice(-15), imgData]);
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas || history.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const previousHistory = [...history];
    previousHistory.pop(); // remove current state
    const previousState = previousHistory[previousHistory.length - 1];

    if (previousState) {
      ctx.putImageData(previousState, 0, 0);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setHistory(previousHistory);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHistory([]);
    setSavedSuccess(false);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveStateToHistory();
    setIsDrawing(true);

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = '#0B1B3D';
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleSaveResult = () => {
    setSavedSuccess(true);
    if (onPracticeSaved) {
      onPracticeSaved(currentTarget.char);
    }
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className={`p-6 rounded-2xl border border-stone-200 bg-white shadow-sm space-y-6 ${className}`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-2">
        <div>
          <span className="text-[10px] uppercase font-mono font-bold text-academy-gold-dark tracking-wider block">
            Tactile Kinesthetic Learning
          </span>
          <h4 className="font-serif font-bold text-lg text-academy-navy mt-0.5">
            Hangul Stroke Order Writing Studio
          </h4>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 no-scrollbar scrollbar-none">
          {targets.map((t, idx) => (
            <button
              key={t.char}
              type="button"
              onClick={() => setSelectedCharIndex(idx)}
              className={`w-9 h-9 rounded-xl font-serif font-bold text-base transition-all border ${
                selectedCharIndex === idx
                  ? 'bg-academy-navy text-academy-gold border-academy-navy shadow-sm'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
              }`}
            >
              {t.char}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left: Stroke Order Rules & Directions */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-4xl font-serif font-black text-academy-navy">
                {currentTarget.char}
              </span>
              <KoreanAudioPlayer text={currentTarget.name} size="sm" />
            </div>

            <div className="text-xs font-mono text-stone-600">
              Name: <strong className="text-academy-navy">{currentTarget.name}</strong> • Total Strokes: <strong className="text-academy-navy">{currentTarget.strokesCount}</strong>
            </div>

            <div className="pt-2 border-t border-stone-200 space-y-1">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                Standard Stroke Sequence:
              </span>
              <ol className="list-decimal list-inside space-y-1 text-xs text-stone-700">
                {currentTarget.strokeDirections.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          </div>

          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-950">
            <strong>Traditional Rule:</strong> Always write from <em>Top to Bottom</em>, then <em>Left to Right</em>. Never reverse stroke order, as this distorts the natural balance of the block.
          </div>
        </div>

        {/* Right: The Interactive HTML5 Writing Canvas */}
        <div className="flex flex-col items-center">
          <div className="relative border-2 border-dashed border-stone-300 rounded-2xl bg-white shadow-inner p-2 w-full max-w-[320px] aspect-square flex items-center justify-center">
            
            {/* Guide Grid Lines */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-full h-0.5 bg-stone-400" />
              <div className="absolute h-full w-0.5 bg-stone-400" />
            </div>

            {/* Faint watermark guide in background for tracing */}
            {showWatermark && (
              <div className="absolute inset-0 flex items-center justify-center text-stone-300 font-serif font-black text-9xl pointer-events-none select-none opacity-40">
                {currentTarget.char}
              </div>
            )}

            {/* Drawing Canvas */}
            <canvas
              ref={canvasRef}
              width={280}
              height={280}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="relative z-10 w-full h-full cursor-crosshair touch-none"
            />
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between w-full max-w-[320px] mt-4 text-xs">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setShowWatermark(!showWatermark)}
                className={`p-2 rounded-lg border transition-colors ${
                  showWatermark ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-white border-stone-200 text-stone-500'
                }`}
                title={showWatermark ? 'Hide guide watermark' : 'Show guide watermark'}
              >
                {showWatermark ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={handleUndo}
                className="p-2 rounded-lg bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
                title="Undo last stroke"
              >
                <Undo2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={clearCanvas}
                className="p-2 rounded-lg bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
                title="Clear canvas"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleSaveResult}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-academy-navy hover:bg-academy-navy-light text-academy-ivory font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Recorded!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Stroke</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
