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
    <div className={`inline-flex flex-col gap-1.5 p-3 rounded-xl border border-stone-200 bg-stone-50/80 shadow-sm ${className}`}>
      
      {/* Header Label if provided */}
      {(label || sublabel) && (
        <div className="flex items-center justify-between gap-2 text-xs mb-1">
          {label && <span className="font-serif font-bold text-academy-navy">{label}</span>}
          {sublabel && <span className="text-[11px] font-mono text-stone-500">{sublabel}</span>}
        </div>
      )}

      {/* Main Audio Controls */}
      <div className="flex items-center gap-2">
        {/* Play / Pause Toggle Button */}
        <button
          type="button"
          onClick={handleTogglePlay}
          className={`flex items-center justify-center rounded-lg font-bold transition-all shadow-sm ${
            size === 'sm' ? 'w-8 h-8 text-xs' : size === 'lg' ? 'w-12 h-12 text-base' : 'w-10 h-10 text-sm'
          } ${
            isPlaying
              ? 'bg-academy-navy text-academy-gold ring-2 ring-academy-gold animate-pulse'
              : 'bg-academy-navy text-academy-ivory hover:bg-academy-navy-light'
          }`}
          title={isPlaying ? 'Pause pronunciation' : `Listen: "${text}"`}
        >
          {isPlaying ? (
            <Pause className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
          ) : (
            <Play className={size === 'sm' ? 'w-3.5 h-3.5 ml-0.5' : 'w-4 h-4 ml-0.5'} />
          )}
        </button>

        {/* Speed Controls */}
        <div className="inline-flex rounded-lg border border-stone-300 bg-white p-0.5 text-[11px] font-medium">
          <button
            type="button"
            onClick={handleNormalPlay}
            className={`px-2 py-1 rounded transition-colors ${
              speed === 0.85 ? 'bg-academy-navy text-white font-bold' : 'text-stone-600 hover:text-academy-navy'
            }`}
            title="Play at standard clear learner pace"
          >
            Normal (1x)
          </button>
          <button
            type="button"
            onClick={handleSlowPlay}
            className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${
              speed === 0.65 ? 'bg-academy-navy text-white font-bold' : 'text-stone-600 hover:text-academy-navy'
            }`}
            title="Play slowly to inspect vowel/consonant mouth shape"
          >
            <Gauge className="w-3 h-3 text-academy-gold" />
            <span>Slow (0.7x)</span>
          </button>
        </div>

        {/* Replay */}
        <button
          type="button"
          onClick={() => handlePlay(speed)}
          className="p-2 text-stone-500 hover:text-academy-navy hover:bg-stone-200/60 rounded-lg transition-colors"
          title="Replay pronunciation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
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
      <div className="flex items-center justify-between text-[10px] text-stone-500 mt-0.5">
        <span className="flex items-center gap-1">
          <Volume1 className="w-3 h-3 text-academy-sage" />
          <span>Korean Speech Engine (ko-KR)</span>
        </span>
        <span className="font-mono text-stone-400">
          {isPlaying ? 'Playing...' : 'Ready'}
        </span>
      </div>

    </div>
  );
};
