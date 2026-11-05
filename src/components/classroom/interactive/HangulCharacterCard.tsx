import React, { useState } from 'react';
import { Volume2, CheckCircle2, Circle } from 'lucide-react';
import { speech } from '../../../services/speechService';
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
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClickCard = () => {
    // Play native Korean audio feedback
    setIsPlaying(true);
    speech.stopSpeaking();
    speech.speak(item.name, {
      rate: 0.85,
      onEnd: () => setIsPlaying(false)
    });
    // Select this vowel for active pronunciation studio below
    onSelect();
  };

  return (
    <div
      onClick={handleClickCard}
      className={`group p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between select-none min-w-0 w-full overflow-hidden shadow-sm relative hover:shadow-md ${
        isSelected
          ? 'border-academy-gold bg-amber-50/40 shadow-md ring-2 ring-academy-gold/60 scale-[1.02]'
          : 'border-stone-200 bg-white hover:border-academy-gold/60'
      } ${className}`}
      title={`Click to pronounce "${item.name}" (${item.romanization}) and practice in studio below`}
    >
      {/* Top Bar: Romanization, Syllable Name, Sound Indicator & Mastered Checkbox */}
      <div className="flex items-center justify-between gap-1 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-mono font-bold text-academy-gold-dark px-2 py-0.5 rounded bg-amber-50 border border-amber-200 shrink-0">
            {item.romanization}
          </span>
          <span className="text-sm font-korean font-semibold text-stone-600 truncate">
            {item.name}
          </span>
          <Volume2 
            className={`w-3.5 h-3.5 text-stone-400 group-hover:text-academy-gold transition-colors shrink-0 ${
              isPlaying ? 'text-academy-gold animate-pulse' : ''
            }`} 
          />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleComplete();
          }}
          className="p-1 rounded-full text-stone-300 hover:text-emerald-600 transition-colors shrink-0"
          title={isCompleted ? 'Marked mastered' : 'Click to mark mastered'}
          aria-label={isCompleted ? 'Marked mastered' : 'Click to mark mastered'}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
          ) : (
            <Circle className="w-5 h-5 text-stone-300 hover:text-stone-400" />
          )}
        </button>
      </div>

      {/* Center: Large Hangul Character */}
      <div className="text-center my-3 sm:my-4">
        <div className="text-5xl sm:text-6xl font-serif font-black text-academy-navy tracking-tight group-hover:scale-105 transition-transform">
          {item.char}
        </div>
      </div>

      {/* Sound & Mouth Articulation Guidance (Clean, no buttons, no horizontal divider line) */}
      <div className="space-y-1.5 text-xs min-w-0">
        <div className="text-[11px] sm:text-xs text-stone-700 leading-snug line-clamp-2">
          <span className="font-bold text-academy-navy">Sound: </span>
          <span>{item.approxEnglish}</span>
        </div>
        <div className="text-[10px] sm:text-[11px] text-stone-500 leading-tight line-clamp-2">
          <span className="font-semibold text-stone-600">Mouth: </span>
          <span>{item.mouthSummary}</span>
        </div>
      </div>
    </div>
  );
};
