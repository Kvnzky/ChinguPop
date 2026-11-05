import React from 'react';

export interface PhoneticGuideInfo {
  char: string;
  name: string;
  category: 'Vowel' | 'Consonant';
  mouthOpening: 'Wide Open' | 'Half-Open' | 'Slightly Open' | 'Narrow / Closed' | 'Neutral';
  lipShape: 'Rounded (Circle)' | 'Spread Wide (Smile)' | 'Neutral / Relaxed' | 'Puckered';
  tonguePosition: 'Low & Flat' | 'Mid-Low' | 'High & Front' | 'High & Back' | 'Pulled Back (Flat)';
  jawPosition: 'Dropped Low' | 'Relaxed Mid' | 'High / Nearly Closed';
  articulationArea?: string;
  airflowExplanation: string;
  filipinoComparison?: string;
  commonMistake: string;
}

interface MouthPositionGuideProps {
  info: PhoneticGuideInfo;
  className?: string;
}

export const MouthPositionGuide: React.FC<MouthPositionGuideProps> = ({ info, className = '' }) => {
  // SVG Graphic dynamically representing the mouth profile
  const isRounded = info.lipShape.includes('Rounded') || info.lipShape.includes('Puckered');
  const isWide = info.mouthOpening.includes('Wide');
  const isSpread = info.lipShape.includes('Spread');
  const isHighTongue = info.tonguePosition.includes('High');
  const isBackTongue = info.tonguePosition.includes('Back');

  return (
    <div className={`p-5 rounded-2xl border border-stone-200 bg-white shadow-sm space-y-5 ${className}`}>
      
      {/* Title */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
        <div>
          <span className="text-[10px] uppercase font-mono font-bold text-academy-gold-dark tracking-wider block">
            Vocal Tract & Articulation Guide
          </span>
          <h4 className="font-serif font-bold text-lg text-academy-navy flex items-center gap-2 mt-0.5">
            <span>Sound Production for</span>
            <span className="w-8 h-8 rounded-lg bg-academy-navy text-academy-gold font-bold flex items-center justify-center text-xl">
              {info.char}
            </span>
            <span className="text-xs font-mono text-stone-500">({info.name})</span>
          </h4>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded bg-stone-100 text-stone-700 font-semibold">
          {info.category}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        
        {/* Left: Clean Educational Anatomical Diagram (SVG) */}
        <div className="bg-stone-50 rounded-xl border border-stone-200 p-4 flex flex-col items-center justify-center text-center">
          <svg
            viewBox="0 0 200 160"
            className="w-48 h-36 drop-shadow-sm select-none"
            aria-label={`Mouth diagram for ${info.char}`}
          >
            {/* Background Head Silhouette Outline */}
            <path
              d="M 40,20 Q 120,10 160,50 Q 170,90 150,130 Q 120,150 90,140 Q 50,130 40,90 Z"
              fill="#FAF8F5"
              stroke="#D6D3D1"
              strokeWidth="2"
            />
            {/* Hard Palate / Roof of Mouth */}
            <path
              d="M 70,55 Q 110,48 135,70"
              fill="none"
              stroke="#0B1B3D"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Upper Teeth */}
            <rect x="68" y="55" width="8" height="10" rx="2" fill="#FFFFFF" stroke="#0B1B3D" strokeWidth="1.5" />
            {/* Lower Teeth */}
            <rect x="68" y={isWide ? 105 : 85} width="8" height="10" rx="2" fill="#FFFFFF" stroke="#0B1B3D" strokeWidth="1.5" />

            {/* Lips (Opening changes based on isWide or isRounded) */}
            <path
              d={
                isRounded
                  ? "M 55,60 C 50,65 50,75 55,80 C 60,78 60,62 55,60 Z"
                  : isWide
                  ? "M 55,50 C 45,70 45,95 55,115"
                  : "M 55,60 C 48,68 48,78 55,86"
              }
              fill="none"
              stroke="#C5A880"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Tongue Body (Changes based on tongue elevation and front/back) */}
            <path
              d={
                isHighTongue && !isBackTongue
                  ? "M 75,85 Q 100,56 130,80 Q 110,120 75,100 Z" // High front (ㅣ)
                  : isHighTongue && isBackTongue
                  ? "M 75,95 Q 105,90 130,60 Q 135,110 75,105 Z" // High back (ㅡ, ㅜ)
                  : isWide
                  ? "M 75,115 Q 100,110 130,105 Q 115,130 75,120 Z" // Low flat (ㅏ)
                  : "M 75,100 Q 105,80 130,90 Q 110,125 75,110 Z" // Mid (ㅓ, ㅗ)
              }
              fill="#E9D5C4"
              stroke="#8B2635"
              strokeWidth="2.5"
            />

            {/* Airflow arrow */}
            <path
              d={
                isBackTongue
                  ? "M 135,100 Q 120,70 65,70"
                  : "M 120,110 Q 95,85 60,80"
              }
              fill="none"
              stroke="#3B7A57"
              strokeWidth="2"
              strokeDasharray="4 3"
            />

            {/* Text legend inside SVG */}
            <text x="100" y="150" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#78716C">
              {isRounded ? 'Lips: Rounded' : isSpread ? 'Lips: Spread Wide' : 'Lips: Open'}
            </text>
          </svg>

          <div className="mt-2 text-xs font-serif font-bold text-academy-navy">
            {info.lipShape} • {info.mouthOpening}
          </div>
          <div className="text-[11px] text-stone-500 font-mono mt-0.5">
            Tongue Position: {info.tonguePosition}
          </div>
        </div>

        {/* Right: Step-by-Step Biomechanical Breakdown */}
        <div className="space-y-3 text-xs">
          <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
            <span className="font-bold text-academy-navy block text-[11px] uppercase tracking-wider">
              1. Mouth & Jaw Opening:
            </span>
            <span className="text-stone-700 font-medium">{info.mouthOpening} (Jaw: {info.jawPosition})</span>
          </div>

          <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
            <span className="font-bold text-academy-navy block text-[11px] uppercase tracking-wider">
              2. Lip Curvature:
            </span>
            <span className="text-stone-700 font-medium">{info.lipShape}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
            <span className="font-bold text-academy-navy block text-[11px] uppercase tracking-wider">
              3. Tongue Height & Placement:
            </span>
            <span className="text-stone-700 font-medium">{info.tonguePosition}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200">
            <span className="font-bold text-amber-900 block text-[11px] uppercase tracking-wider">
              Airflow & Articulation Guidance:
            </span>
            <span className="text-stone-800 leading-relaxed block mt-0.5">{info.airflowExplanation}</span>
          </div>
        </div>

      </div>

      {/* Critical Common Mistake Alert */}
      <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-950 space-y-0.5">
        <span className="font-bold uppercase tracking-wider text-[10px] text-rose-800">
          ⚠️ Common Beginner Articulation Trap:
        </span>
        <p className="leading-relaxed">{info.commonMistake}</p>
      </div>

      {/* Filipino Language Comparison caveat if provided */}
      {info.filipinoComparison && (
        <div className="p-3 bg-stone-100 rounded-xl border border-stone-200 text-xs text-stone-800 space-y-0.5">
          <span className="font-bold text-academy-navy text-[10px] uppercase font-mono tracking-wider block">
            🇵🇭 Tagalog / Filipino Sound Comparison Note:
          </span>
          <p className="text-stone-700 leading-relaxed">{info.filipinoComparison}</p>
        </div>
      )}

    </div>
  );
};
