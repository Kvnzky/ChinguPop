import React, { useState } from 'react';
import { Volume2, VolumeX, Gauge } from 'lucide-react';
import { speech } from '../../services/speechService';

interface AudioButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  showRateToggle?: boolean;
  className?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  size = 'md',
  showRateToggle = false,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rate, setRate] = useState<number>(0.85); // 0.85 default slow/clear for learners

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      speech.stopSpeaking();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    speech.speak(text, {
      rate,
      onEnd: () => setIsPlaying(false)
    });
  };

  const toggleRate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRate(prev => (prev === 0.85 ? 0.65 : 0.85));
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-3 text-base'
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <button
        type="button"
        onClick={handlePlay}
        title={isPlaying ? 'Stop audio' : `Listen to Korean pronunciation: "${text}"`}
        className={`inline-flex items-center justify-center rounded-lg border border-academy-gold/40 bg-academy-ivory hover:bg-academy-gold/15 active:bg-academy-gold/30 text-academy-navy transition-all duration-150 shadow-sm ${sizeClasses[size]} ${
          isPlaying ? 'ring-2 ring-academy-gold animate-pulse text-academy-gold-dark' : ''
        }`}
      >
        {isPlaying ? (
          <VolumeX className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
        ) : (
          <Volume2 className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
        )}
      </button>

      {showRateToggle && (
        <button
          type="button"
          onClick={toggleRate}
          title={`Playback speed: ${rate === 0.85 ? 'Standard (0.85x)' : 'Slow (0.65x)'}`}
          className="px-2 py-1 text-xs font-medium text-academy-charcoal-muted bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded flex items-center gap-1"
        >
          <Gauge className="w-3 h-3 text-academy-gold-dark" />
          <span>{rate === 0.85 ? 'Normal' : 'Slow'}</span>
        </button>
      )}
    </div>
  );
};
