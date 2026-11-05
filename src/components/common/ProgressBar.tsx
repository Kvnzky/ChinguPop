import React from 'react';

interface ProgressBarProps {
  value: number; // 0 - 100
  label?: string;
  subLabel?: string;
  color?: 'gold' | 'sage' | 'navy' | 'wine' | 'purple' | 'pink' | 'blue';
  height?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  subLabel,
  color = 'purple',
  height = 'h-2.5',
  className = ''
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  const barColors: Record<string, string> = {
    purple: 'bg-[#6C52EE]',
    pink: 'bg-[#FF5CA8]',
    blue: 'bg-[#44C5F5]',
    gold: 'bg-[#FF5CA8]',
    sage: 'bg-emerald-500',
    navy: 'bg-[#6C52EE]',
    wine: 'bg-[#FF5CA8]'
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
