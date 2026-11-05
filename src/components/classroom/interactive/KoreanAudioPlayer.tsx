import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Gauge, Volume1 } from 'lucide-react';
import { speech } from '../../../services/speechService';

interface KoreanAudioPlayerProps {
  text: string;
  label?: string;
  sublabel?: string;
  size?: 'sm' | 'md' | 'lg';
  autoPlay?: boolean;
  onPlayEnd?: () => void;
  className?: string;
}

export const KoreanAudioPlayer: React.FC<KoreanAudioPlayerProps> = ({
  text,
  label,
  sublabel,
  size = 'md',
  autoPlay = false,
  onPlayEnd,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<0.65 | 0.85 | 1.0>(0.85); // 0.85 is normal learning speed, 0.65 is slow
  const [volume, setVolume] = useState<number>(1.0);
  const [progress, setProgress] = useState<number>(0);
  const progressIntervalRef = useRef<any>(null);

  useEffect(() => {
    if (autoPlay) {
      handlePlay();
    }
    return () => {
      stopAudio();
    };
  }, [text]);

  const stopAudio = () => {
    speech.stopSpeaking();
    setIsPlaying(false);
    setProgress(0);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const handlePlay = (playbackSpeed: 0.65 | 0.85 | 1.0 = speed) => {
    stopAudio();
    setIsPlaying(true);
    setProgress(10);

    // Simulated progress tick for visual feedback
    const startTime = Date.now();
    const approxDuration = Math.max(1200, text.length * 400 * (1 / playbackSpeed));

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(95, Math.round((elapsed / approxDuration) * 100));
      setProgress(pct);
    }, 100);

    speech.speak(text, {
      rate: playbackSpeed,
      onEnd: () => {
        setIsPlaying(false);
        setProgress(100);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        setTimeout(() => setProgress(0), 400);
        if (onPlayEnd) onPlayEnd();
      }
    });
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      handlePlay(speed);
    }
  };

  const handleSlowPlay = () => {
    setSpeed(0.65);
    handlePlay(0.65);
  };

  const handleNormalPlay = () => {
    setSpeed(0.85);
    handlePlay(0.85);
  };

  return (
    <div className={`flex flex-col gap-1.5 p-2.5 sm:p-3 rounded-xl border border-stone-200 bg-stone-50/80 shadow-sm w-full max-w-full box-border ${className}`}>
      
      {/* Header Label if provided */}
      {(label || sublabel) && (
        <div className="flex items-center justify-between gap-2 text-xs mb-1">
          {label && <span className="font-serif font-bold text-academy-navy">{label}</span>}
          {sublabel && <span className="text-[11px] font-mono text-stone-500">{sublabel}</span>}
        </div>
      )}

      {/* Main Audio Controls */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {/* Play / Pause Toggle Button */}
        <button
          type="button"
          onClick={handleTogglePlay}
          className={`flex items-center justify-center rounded-xl font-bold transition-all shadow-md active:scale-95 shrink-0 ${
            size === 'sm' ? 'w-10 h-10 text-xs' : size === 'lg' ? 'w-12 h-12 text-base' : 'w-11 h-11 text-sm'
          } ${
            isPlaying
              ? 'bg-[#FF5CA8] text-white ring-4 ring-pink-400/30 animate-pulse'
              : 'bg-gradient-to-tr from-[#6C52EE] to-[#8E77F7] text-white hover:brightness-110 shadow-sm'
          }`}
          title={isPlaying ? 'Pause pronunciation' : `Listen: "${text}"`}
        >
          {isPlaying ? (
            <Pause className={size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} />
          ) : (
            <Play className={size === 'sm' ? 'w-4 h-4 ml-0.5' : 'w-5 h-5 ml-0.5'} />
          )}
        </button>

        {/* Speed Controls */}
        <div className="inline-flex rounded-xl border border-stone-300 bg-white p-0.5 text-xs font-semibold shrink-0">
          <button
            type="button"
            onClick={handleNormalPlay}
            className={`px-2.5 py-1.5 rounded-lg transition-all ${
              speed === 0.85 ? 'bg-[#6C52EE] text-white font-bold shadow-xs' : 'text-stone-700 hover:text-[#6C52EE]'
            }`}
            title="Play at standard clear learner pace"
          >
            Normal (1x)
          </button>
          <button
            type="button"
            onClick={handleSlowPlay}
            className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
              speed === 0.65 ? 'bg-[#6C52EE] text-white font-bold shadow-xs' : 'text-stone-700 hover:text-[#6C52EE]'
            }`}
            title="Play slowly to inspect vowel/consonant mouth shape"
          >
            <Gauge className="w-3.5 h-3.5 text-[#FF5CA8]" />
            <span>Slow (0.7x)</span>
          </button>
        </div>

        {/* Replay */}
        <button
          type="button"
          onClick={() => handlePlay(speed)}
          className="min-w-[40px] min-h-[40px] flex items-center justify-center text-stone-600 hover:text-[#6C52EE] hover:bg-purple-50 rounded-xl transition-colors shrink-0"
          title="Replay pronunciation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar & Audio Indicator */}
      <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden mt-1">
        <div
          className="bg-academy-gold h-full transition-all duration-100 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Voice Status Disclaimer */}
      <div className="flex items-center justify-between gap-1 text-[10px] text-stone-500 mt-0.5 min-w-0">
        <span className="flex items-center gap-1 truncate min-w-0">
          <Volume1 className="w-3 h-3 text-academy-sage shrink-0" />
          <span className="truncate">Korean Speech Engine (ko-KR)</span>
        </span>
        <span className="font-mono text-stone-400 shrink-0">
          {isPlaying ? 'Playing...' : 'Ready'}
        </span>
      </div>

    </div>
  );
};
