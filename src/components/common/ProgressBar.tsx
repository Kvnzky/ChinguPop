import React from 'react';

interface ProgressBarProps {
  value: number; // 0 - 100
  label?: string;
  subLabel?: string;
  color?: 'gold' | 'sage' | 'navy' | 'wine';
  height?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  subLabel,
  color = 'gold',
  height = 'h-2.5',
  className = ''
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  const barColors = {
    gold: 'bg-academy-gold',
    sage: 'bg-academy-sage',
    navy: 'bg-academy-navy',
    wine: 'bg-academy-wine'
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || subLabel) && (
        <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
          {label && <span className="text-academy-charcoal">{label}</span>}
          {subLabel && <span className="text-academy-charcoal-muted font-mono">{subLabel}</span>}
        </div>
      )}
      <div className={`w-full ${height} bg-stone-200 rounded-full overflow-hidden border border-stone-300/50`}>
        <div
          className={`h-full transition-all duration-500 rounded-full ${barColors[color]}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};
