import React, { useState } from 'react';
import { AudioButton } from '../common/AudioButton';

const INITIALS = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const MEDIALS = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const FINALS = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

export const SyllableBuilder: React.FC = () => {
  const [initialIndex, setInitialIndex] = useState<number>(11); // 'ㅇ'
  const [medialIndex, setMedialIndex] = useState<number>(0);  // 'ㅏ'
  const [finalIndex, setFinalIndex] = useState<number>(4);   // 'ㄴ' -> '안'

  // Korean Unicode formula
  const unicodeVal = 0xAC00 + (initialIndex * 588) + (medialIndex * 28) + finalIndex;
  const assembledChar = String.fromCharCode(unicodeVal);

  const initialLetter = INITIALS[initialIndex];
  const medialLetter = MEDIALS[medialIndex];
  const finalLetter = FINALS[finalIndex] || '(None)';

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-stone-200">
        <div>
          <h3 className="font-serif font-bold text-lg text-academy-navy">
            Hangul Syllable Block Construction Lab
          </h3>
          <p className="text-xs text-stone-600 mt-1">
            Assemble the 3 structural positions: Initial (초성) + Medial (중성) + Final Batchim (종성).
          </p>
        </div>

        {/* Live Assembled Block Display */}
        <div className="flex items-center gap-4 bg-stone-50 border-2 border-academy-gold/60 p-4 rounded-xl shadow-inner">
          <div className="text-center">
            <span className="text-xs font-mono uppercase text-academy-charcoal-muted tracking-wider block mb-1">
              Assembled Syllable
            </span>
            <span className="text-6xl font-serif font-bold text-academy-navy block leading-none">
              {assembledChar}
            </span>
          </div>

          <div className="border-l border-stone-300 pl-4 space-y-1.5">
            <AudioButton text={assembledChar} size="md" showRateToggle />
            <div className="text-xs font-mono text-stone-500">
              Unicode: U+{unicodeVal.toString(16).toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Assembly Grid Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        
        {/* 1. Initial Consonant (초성) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-academy-navy uppercase tracking-wider">
              1. Initial (초성)
            </span>
            <span className="text-xs font-serif font-bold text-academy-gold-dark px-2 py-0.5 bg-amber-50 rounded border border-amber-200">
              {initialLetter}
            </span>
          </div>
          <div className="grid grid-cols-5 gap-1.5 max-h-48 overflow-y-auto p-1.5 bg-stone-50 rounded-lg border border-stone-200">
            {INITIALS.map((char, idx) => (
              <button
                key={char}
                type="button"
                onClick={() => setInitialIndex(idx)}
                className={`h-9 font-serif font-bold text-sm rounded transition-all ${
                  initialIndex === idx
                    ? 'bg-academy-navy text-academy-gold shadow-sm'
                    : 'bg-white hover:bg-stone-100 text-academy-charcoal border border-stone-200'
                }`}
              >
                {char}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Medial Vowel (중성) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-academy-navy uppercase tracking-wider">
              2. Medial Vowel (중성)
            </span>
            <span className="text-xs font-serif font-bold text-academy-gold-dark px-2 py-0.5 bg-amber-50 rounded border border-amber-200">
              {medialLetter}
            </span>
          </div>
          <div className="grid grid-cols-5 gap-1.5 max-h-48 overflow-y-auto p-1.5 bg-stone-50 rounded-lg border border-stone-200">
            {MEDIALS.map((char, idx) => (
              <button
                key={char}
                type="button"
                onClick={() => setMedialIndex(idx)}
                className={`h-9 font-serif font-bold text-sm rounded transition-all ${
                  medialIndex === idx
                    ? 'bg-academy-navy text-academy-gold shadow-sm'
                    : 'bg-white hover:bg-stone-100 text-academy-charcoal border border-stone-200'
                }`}
              >
                {char}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Final Consonant Batchim (종성) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-academy-navy uppercase tracking-wider">
              3. Final Batchim (종성)
            </span>
            <span className="text-xs font-serif font-bold text-academy-gold-dark px-2 py-0.5 bg-amber-50 rounded border border-amber-200">
              {finalLetter}
            </span>
          </div>
          <div className="grid grid-cols-5 gap-1.5 max-h-48 overflow-y-auto p-1.5 bg-stone-50 rounded-lg border border-stone-200">
            {FINALS.map((char, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setFinalIndex(idx)}
                className={`h-9 font-serif font-bold text-sm rounded transition-all ${
                  finalIndex === idx
                    ? 'bg-academy-navy text-academy-gold shadow-sm'
                    : 'bg-white hover:bg-stone-100 text-academy-charcoal border border-stone-200'
                }`}
              >
                {char || 'Ø'}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Anatomy Explanation Footer */}
      <div className="mt-6 p-4 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-academy-navy">Geometric Architecture:</span>
          <span className="text-stone-600">
            [{initialLetter}] + [{medialLetter}] {finalLetter !== '(None)' ? `+ [${finalLetter}]` : ''} = <strong className="text-academy-navy font-serif font-bold text-sm">{assembledChar}</strong>
          </span>
        </div>
        <span className="text-[11px] text-stone-500 font-mono">
          Complies with KS X 1001 Standard
        </span>
      </div>
    </div>
  );
};
