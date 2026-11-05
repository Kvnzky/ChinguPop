import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, PenTool, CheckCircle2 } from 'lucide-react';
import { AudioButton } from '../common/AudioButton';

const SAMPLE_PRACTICE_CHARS = [
  { char: '한', rom: 'han', desc: 'ㅎ + ㅏ + ㄴ (Korea / Great)' },
  { char: '글', rom: 'geul', desc: 'ㄱ + ㅡ + ㄹ (Script / Writing)' },
  { char: '안', rom: 'an', desc: 'ㅇ + ㅏ + ㄴ (Peace / Well)' },
  { char: '녕', rom: 'nyeong', desc: 'ㄴ + ㅕ + ㅇ (Tranquil)' },
  { char: '사', rom: 'sa', desc: 'ㅅ + ㅏ (Four / Apple stem)' },
  { char: '물', rom: 'mul', desc: 'ㅁ + ㅜ + ㄹ (Water)' }
];

export const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedChar, setSelectedChar] = useState(SAMPLE_PRACTICE_CHARS[0]);
  const [strokeColor, setStrokeColor] = useState('#0B1B3D');
  const [lineWidth, setLineWidth] = useState(8);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    clearCanvas();
  }, [selectedChar]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = strokeColor;
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

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-4">
        <div>
          <h3 className="font-serif font-bold text-lg text-academy-navy flex items-center gap-2">
            <PenTool className="w-5 h-5 text-academy-gold-dark" />
            Hangul Stroke Tracing & Writing Pad
          </h3>
          <p className="text-xs text-stone-600 mt-0.5">
            Practice stroke order on touchscreens or with mouse. Rule: Top to bottom, left to right.
          </p>
        </div>

        {/* Character Selector Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {SAMPLE_PRACTICE_CHARS.map((item) => (
            <button
              key={item.char}
              type="button"
              onClick={() => setSelectedChar(item)}
              className={`px-3 py-1.5 rounded-lg font-serif font-bold text-sm transition-all ${
                selectedChar.char === item.char
                  ? 'bg-academy-navy text-academy-gold ring-2 ring-academy-gold/40 shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-academy-charcoal'
              }`}
            >
              {item.char}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 items-center">
        
        {/* Left: Guide & Character Anatomy */}
        <div className="space-y-4">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 text-center relative overflow-hidden">
            <div className="text-xs font-mono uppercase text-academy-charcoal-muted tracking-wider mb-2">
              Reference Character
            </div>
            
            <div className="text-8xl font-serif font-bold text-academy-navy my-2 select-none tracking-normal">
              {selectedChar.char}
            </div>

            <div className="text-sm font-bold text-academy-gold-dark font-mono">
              {selectedChar.rom}
            </div>
            <div className="text-xs text-stone-600 mt-1">
              {selectedChar.desc}
            </div>

            <div className="mt-4 flex items-center justify-center gap-3">
              <AudioButton text={selectedChar.char} size="md" showRateToggle />
            </div>
          </div>

          <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 space-y-1">
            <div className="font-semibold text-academy-navy">Stroke Order Reminders:</div>
            <ol className="list-decimal list-inside space-y-0.5 text-stone-700">
              <li>Top to bottom (위에서 아래로)</li>
              <li>Left to right (왼쪽에서 오른쪽으로)</li>
              <li>Consonant initial first, vowel next, bottom Batchim last</li>
            </ol>
          </div>
        </div>

        {/* Right: The Interactive HTML5 Canvas */}
        <div className="flex flex-col items-center">
          <div className="relative border-2 border-dashed border-stone-300 rounded-2xl bg-white shadow-inner p-2 w-full max-w-[320px] aspect-square flex items-center justify-center">
            
            {/* Faint watermark guide in background for tracing */}
            <div className="absolute inset-0 flex items-center justify-center text-stone-200 font-serif font-black text-9xl pointer-events-none select-none opacity-40">
              {selectedChar.char}
            </div>

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

          {/* Canvas Controls */}
          <div className="flex items-center justify-between w-full max-w-[320px] mt-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-stone-500 font-medium">Width:</span>
              <button
                type="button"
                onClick={() => setLineWidth(6)}
                className={`px-2 py-1 rounded text-xs ${lineWidth === 6 ? 'bg-academy-navy text-white font-bold' : 'bg-stone-100 text-stone-700'}`}
              >
                Thin
              </button>
              <button
                type="button"
                onClick={() => setLineWidth(10)}
                className={`px-2 py-1 rounded text-xs ${lineWidth === 10 ? 'bg-academy-navy text-white font-bold' : 'bg-stone-100 text-stone-700'}`}
              >
                Thick
              </button>
            </div>

            <button
              type="button"
              onClick={clearCanvas}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
              <span>Clear</span>
            </button>
          </div>

          {hasDrawn && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-academy-sage font-medium">
              <CheckCircle2 className="w-4 h-4 text-academy-sage" />
              <span>Stroke recorded! Compare your character with the template.</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
