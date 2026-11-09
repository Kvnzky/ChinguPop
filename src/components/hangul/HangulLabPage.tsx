import React, { useState } from 'react';
import { HangulChart } from './HangulChart';
import { SyllableBuilder } from './SyllableBuilder';
import { DrawingCanvas } from './DrawingCanvas';
import { Grid, Layers, PenTool } from 'lucide-react';

export const HangulLabPage: React.FC = () => {
  const [subTab, setSubTab] = useState<'chart' | 'builder' | 'canvas'>('chart');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-academy-gold/20 text-academy-gold-dark border border-academy-gold/40">
            <Grid className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-xl text-academy-navy">
              Dedicated Hangul Reading & Writing Laboratory
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Comprehensive interactive alphabet charts, 3-part syllable block construction, and stroke tracing.
            </p>
          </div>
        </div>

        {/* Sub-tab pills */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1.5 rounded-xl border border-stone-200 overflow-x-auto max-w-full no-scrollbar">
          <button
            type="button"
            onClick={() => setSubTab('chart')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
              subTab === 'chart'
                ? 'bg-academy-navy text-academy-ivory shadow-sm'
                : 'text-stone-600 hover:text-academy-navy'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Alphabet Chart</span>
          </button>
          <button
            type="button"
            onClick={() => setSubTab('builder')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
              subTab === 'builder'
                ? 'bg-academy-navy text-academy-ivory shadow-sm'
                : 'text-stone-600 hover:text-academy-navy'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Syllable Builder</span>
          </button>
          <button
            type="button"
            onClick={() => setSubTab('canvas')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
              subTab === 'canvas'
                ? 'bg-academy-navy text-academy-ivory shadow-sm'
                : 'text-stone-600 hover:text-academy-navy'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Stroke Writing Canvas</span>
          </button>
        </div>
      </div>

      {/* Render active sub-tool */}
      {subTab === 'chart' && <HangulChart />}
      {subTab === 'builder' && <SyllableBuilder />}
      {subTab === 'canvas' && <DrawingCanvas />}

    </div>
  );
};
