import React from 'react';
import { Volume2, Gauge, CheckCircle2, Circle, ChevronRight, Mic } from 'lucide-react';
import { KoreanAudioPlayer } from './KoreanAudioPlayer';
import { PhoneticGuideInfo } from './MouthPositionGuide';

export interface CharacterItemData {
  char: string;
  name: string;
  romanization: string;
  approxEnglish: string;
  mouthSummary: string;
  tongueSummary: string;
  soundGuide: string;
  phoneticGuide: PhoneticGuideInfo;
}

interface HangulCharacterCardProps {
  item: CharacterItemData;
  isSelected: boolean;
  isCompleted: boolean;
  onSelect: () => void;
  onToggleComplete: () => void;
  className?: string;
}

export const HangulCharacterCard: React.FC<HangulCharacterCardProps> = ({
  item,
  isSelected,
  isCompleted,
  onSelect,
  onToggleComplete,
  className = ''
}) => {
  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between select-none ${
        isSelected
          ? 'border-academy-navy bg-white shadow-lg ring-2 ring-academy-gold/40'
          : 'border-stone-200 bg-stone-50/60 hover:bg-white hover:border-stone-300 shadow-sm'
      } ${className}`}
    >
      {/* Top Bar: Name, Romanization & Completed Checkbox */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-mono font-bold text-academy-gold-dark px-2 py-0.5 rounded bg-amber-50 border border-amber-200">
            {item.romanization}
          </span>
          <span className="text-[11px] font-korean text-stone-500">
            {item.name}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleComplete();
          }}
          className="p-1 rounded-full text-stone-400 hover:text-emerald-700 transition-colors"
          title={isCompleted ? 'Marked mastered' : 'Click to mark mastered'}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
          ) : (
            <Circle className="w-5 h-5 text-stone-300" />
          )}
        </button>
      </div>

      {/* Center: Large Hangul Character */}
      <div className="text-center my-3">
        <div className="text-5xl sm:text-6xl font-serif font-black text-academy-navy tracking-tight hover:scale-105 transition-transform">
          {item.char}
        </div>
      </div>

      {/* Sound Guide Summary */}
      <div className="space-y-1 text-xs text-stone-600 border-t border-stone-100 pt-2.5">
        <div className="font-semibold text-academy-navy truncate">
          Sounds like: <span className="text-stone-700 font-normal">{item.approxEnglish}</span>
        </div>
        <div className="text-[11px] text-stone-500 line-clamp-1">
          Mouth: {item.mouthSummary}
        </div>
      </div>

      {/* Audio & Practice Footer Bar */}
      <div className="mt-3 pt-2.5 border-t border-stone-200/80 flex items-center justify-between gap-2">
        <KoreanAudioPlayer text={item.name} size="sm" />

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            isSelected
              ? 'bg-academy-navy text-academy-ivory'
              : 'bg-stone-100 hover:bg-stone-200 text-academy-charcoal'
          }`}
        >
          <Mic className="w-3 h-3 text-academy-gold" />
          <span>Studio</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
