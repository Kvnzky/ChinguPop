import React, { useState, useEffect } from 'react';
import { Volume2, Play, Pause, Gauge, CheckCircle2, Circle, ChevronRight, Mic } from 'lucide-react';
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
  const [currentRate, setCurrentRate] = useState<0.85 | 0.65>(0.85);

  useEffect(() => {
    return () => {
      speech.stopSpeaking();
    };
  }, []);

  const handlePlayAudio = (rate: 0.85 | 0.65 = 0.85) => {
    speech.stopSpeaking();
    setIsPlaying(true);
    setCurrentRate(rate);

    speech.speak(item.name, {
      rate: rate,
      onEnd: () => {
        setIsPlaying(false);
      }
    });
  };

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying && currentRate === 0.85) {
      speech.stopSpeaking();
      setIsPlaying(false);
    } else {
      handlePlayAudio(0.85);
    }
  };

  const handlePlaySlow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying && currentRate === 0.65) {
      speech.stopSpeaking();
      setIsPlaying(false);
    } else {
      handlePlayAudio(0.65);
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`group p-3 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between select-none min-w-0 w-full overflow-hidden bg-white shadow-sm relative ${
        isSelected
          ? 'border-academy-navy shadow-lg ring-2 ring-academy-gold/50'
          : 'border-stone-200 hover:border-academy-gold/60 hover:shadow-md'
      } ${className}`}
    >
      {/* Top Bar: Romanization, Name, Mastered Status */}
      <div className="flex items-center justify-between gap-1 min-w-0">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-[11px] sm:text-xs font-mono font-bold text-academy-gold-dark px-1.5 sm:px-2 py-0.5 rounded bg-amber-50 border border-amber-200 shrink-0">
            {item.romanization}
          </span>
          <span className="text-xs sm:text-sm font-korean font-semibold text-stone-600 truncate">
            {item.name}
          </span>
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
      <div className="text-center my-2 sm:my-3">
        <div className="text-5xl sm:text-6xl font-serif font-black text-academy-navy tracking-tight group-hover:scale-105 transition-transform">
          {item.char}
        </div>
      </div>

      {/* Sound & Mouth Articulation Guidance */}
      <div className="space-y-1 text-xs border-t border-stone-100 pt-2 min-w-0">
        <div className="text-[11px] sm:text-xs text-stone-700 leading-snug line-clamp-2">
          <span className="font-bold text-academy-navy">Sound: </span>
          <span>{item.approxEnglish}</span>
        </div>
        <div className="text-[10px] sm:text-[11px] text-stone-500 leading-tight line-clamp-2">
          <span className="font-semibold text-stone-600">Mouth: </span>
          <span>{item.mouthSummary}</span>
        </div>
      </div>

      {/* Responsive Audio & Practice Controls Footer */}
      <div className="mt-3 pt-2.5 border-t border-stone-100 flex flex-col gap-1.5 min-w-0">
        
        {/* Button Row */}
        <div className="flex items-center justify-between gap-1 w-full min-w-0">
          
          <div className="flex items-center gap-1 shrink-0">
            {/* Play Normal Audio (ko-KR) */}
            <button
              type="button"
              onClick={handleTogglePlay}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all ${
                isPlaying && currentRate === 0.85
                  ? 'bg-academy-navy text-academy-gold ring-2 ring-academy-gold shadow-sm'
                  : 'bg-academy-navy text-academy-ivory hover:bg-academy-navy-light'
              }`}
              title={isPlaying && currentRate === 0.85 ? 'Pause' : `Listen to ${item.name}`}
              aria-label={`Listen to ${item.name}`}
            >
              {isPlaying && currentRate === 0.85 ? (
                <Pause className="w-3.5 h-3.5" />
              ) : (
                <Play className="w-3.5 h-3.5 ml-0.5" />
              )}
            </button>

            {/* Slow Audio (0.65x) */}
            <button
              type="button"
              onClick={handlePlaySlow}
              className={`px-1.5 sm:px-2 py-1 rounded-lg border text-[10px] sm:text-[11px] font-mono font-medium flex items-center gap-1 transition-all ${
                isPlaying && currentRate === 0.65
                  ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold ring-1 ring-amber-400'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-academy-navy'
              }`}
              title={`Play ${item.name} slowly to inspect articulation`}
              aria-label={`Play ${item.name} slowly`}
            >
              <Gauge className="w-3 h-3 text-academy-gold-dark" />
              <span>Slow</span>
            </button>
          </div>

          {/* Studio Link Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold transition-all shrink-0 ${
              isSelected
                ? 'bg-academy-navy text-academy-ivory shadow-sm'
                : 'bg-stone-100 hover:bg-stone-200 text-academy-charcoal'
            }`}
            title="Open pronunciation studio with recording & mouth diagram"
          >
            <Mic className="w-3 h-3 text-academy-gold" />
            <span>Studio</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Live Audio Status Indicator Pill */}
        {isPlaying && (
          <div className="w-full bg-amber-50 border border-amber-200/80 text-amber-900 text-[10px] font-mono py-0.5 px-2 rounded-md flex items-center justify-between animate-in fade-in duration-150">
            <span className="flex items-center gap-1 truncate">
              <Volume2 className="w-3 h-3 text-amber-700 animate-pulse shrink-0" />
              <span>{currentRate === 0.65 ? 'Slow (0.7x)' : 'Normal (1x)'}</span>
            </span>
            <span className="text-[9px] text-amber-800 font-semibold uppercase shrink-0">ko-KR</span>
          </div>
        )}

      </div>
    </div>
  );
};
