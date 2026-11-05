import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'navy' | 'sage' | 'wine' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = ''
}) => {
  const variantStyles = {
    gold: 'bg-academy-gold/15 text-academy-gold-dark border-academy-gold/30',
    navy: 'bg-academy-navy text-academy-ivory border-academy-navy-light',
    sage: 'bg-academy-sage-light text-academy-sage border-academy-sage/30',
    wine: 'bg-academy-wine-light text-academy-wine border-academy-wine/30',
    neutral: 'bg-stone-100 text-academy-charcoal-muted border-stone-200'
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold'
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-md border tracking-wide uppercase ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
};
