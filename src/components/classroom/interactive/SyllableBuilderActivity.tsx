import React, { useState } from 'react';
import { Layers, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { KoreanAudioPlayer } from './KoreanAudioPlayer';

const PRACTICE_INITIALS = [
  { char: 'ㄱ', name: 'g/k' },
  { char: 'ㄴ', name: 'n' },
  { char: 'ㄷ', name: 'd/t' },
  { char: 'ㄹ', name: 'r/l' },
  { char: 'ㅁ', name: 'm' },
  { char: 'ㅂ', name: 'b/p' },
  { char: 'ㅅ', name: 's' },
  { char: 'ㅇ', name: 'silent/ng' }
];

const PRACTICE_VOWELS = [
  { char: 'ㅏ', type: 'vertical', name: 'a' },
  { char: 'ㅓ', type: 'vertical', name: 'eo' },
  { char: 'ㅗ', type: 'horizontal', name: 'o' },
  { char: 'ㅜ', type: 'horizontal', name: 'u' },
  { char: 'ㅡ', type: 'horizontal', name: 'eu' },
  { char: 'ㅣ', type: 'vertical', name: 'i' }
];

const PRACTICE_BATCHIM = [
  { char: '', name: 'None (No Batchim)' },
  { char: 'ㄱ', name: '[k̚] stop' },
  { char: 'ㄴ', name: '[n]' },
  { char: 'ㄹ', name: '[l]' },
  { char: 'ㅁ', name: '[m]' },
  { char: 'ㅂ', name: '[p̚] stop' },
  { char: 'ㅇ', name: '[ŋ] "ng"' }
];

// Meaning dictionary for common syllables
const COMMON_WORD_DICTIONARY: Record<string, string> = {
  '가': 'Go (가다)',
  '나': 'I / Me (informal)',
  '다': 'All / Everything',
  '물': 'Water',
  '밥': 'Meal / Cooked Rice',
  '산': 'Mountain',
  '눈': 'Eye / Snow',
  '달': 'Moon',
  '말': 'Word / Speech / Horse',
  '방': 'Room',
  '문': 'Door',
  '강': 'River',
  '공': 'Ball',
  '손': 'Hand',
  '봄': 'Spring Season',
  '밤': 'Night / Chestnut'
};

const INITIAL_UNICODE_MAP: Record<string, number> = {
  'ㄱ': 0, 'ㄴ': 2, 'ㄷ': 3, 'ㄹ': 5, 'ㅁ': 6, 'ㅂ': 7, 'ㅅ': 9, 'ㅇ': 11
};

const VOWEL_UNICODE_MAP: Record<string, number> = {
  'ㅏ': 0, 'ㅓ': 4, 'ㅗ': 8, 'ㅜ': 13, 'ㅡ': 18, 'ㅣ': 20
};

const BATCHIM_UNICODE_MAP: Record<string, number> = {
  '': 0, 'ㄱ': 1, 'ㄴ': 4, 'ㄹ': 8, 'ㅁ': 16, 'ㅂ': 17, 'ㅇ': 21
};

interface SyllableBuilderActivityProps {
  onSyllableConstructed?: (syllable: string) => void;
  className?: string;
}

export const SyllableBuilderActivity: React.FC<SyllableBuilderActivityProps> = ({
  onSyllableConstructed,
  className = ''
}) => {
  const [selectedInitial, setSelectedInitial] = useState('ㄱ');
  const [selectedVowel, setSelectedVowel] = useState('ㅏ');
  const [selectedBatchim, setSelectedBatchim] = useState('');

  const initIdx = INITIAL_UNICODE_MAP[selectedInitial] ?? 0;
  const vowelIdx = VOWEL_UNICODE_MAP[selectedVowel] ?? 0;
  const batchimIdx = BATCHIM_UNICODE_MAP[selectedBatchim] ?? 0;

  const unicodeCode = 0xAC00 + (initIdx * 588) + (vowelIdx * 28) + batchimIdx;
  const assembledChar = String.fromCharCode(unicodeCode);

  const vowelInfo = PRACTICE_VOWELS.find(v => v.char === selectedVowel);
  const isVertical = vowelInfo?.type === 'vertical';
  const meaning = COMMON_WORD_DICTIONARY[assembledChar];

  return (
    <div className={`p-6 rounded-2xl border border-stone-200 bg-white shadow-sm space-y-6 ${className}`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-2">
        <div>
          <span className="text-[10px] uppercase font-mono font-bold text-academy-gold-dark tracking-wider block">
            Geometric Architectural Assembly
          </span>
          <h4 className="font-serif font-bold text-lg text-academy-navy mt-0.5">
            Interactive Syllable Block Construction Lab
          </h4>
        </div>
        <span className="text-xs font-mono text-stone-500 bg-stone-100 px-3 py-1 rounded-lg">
          Orientation: {isVertical ? 'Side-by-Side (Vertical)' : 'Top-and-Bottom (Horizontal)'}
        </span>
      </div>

      {/* Main Assembly Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-stone-50/70 p-6 rounded-2xl border border-stone-200">
        
        {/* Assembled Character Display */}
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-40 h-40 rounded-2xl bg-white border-2 border-academy-gold shadow-md flex items-center justify-center relative">
            <span className="text-7xl font-serif font-black text-academy-navy select-none">
              {assembledChar}
            </span>
            {meaning && (
              <span className="absolute bottom-2 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Vocabulary Word!
              </span>
            )}
          </div>

          <div className="space-y-1">
            <KoreanAudioPlayer text={assembledChar} size="md" label={`Sound: ${assembledChar}`} />
            {meaning && (
              <div className="text-xs font-semibold text-emerald-800 flex items-center gap-1 justify-center">
                <Sparkles className="w-3.5 h-3.5 text-academy-gold" />
                <span>Meaning: {meaning}</span>
              </div>
            )}
          </div>
        </div>

        {/* Structural Formula Explanation */}
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
            <span className="text-[10px] font-bold text-academy-gold-dark uppercase font-mono block">
              Syllable Construction Formula:
            </span>
            <div className="text-sm font-serif font-bold text-academy-navy">
              [{selectedInitial}] + [{selectedVowel}] {selectedBatchim ? `+ [${selectedBatchim}]` : ''} = {assembledChar}
            </div>
            <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
              {isVertical ? (
                <>Because <strong>{selectedVowel}</strong> is a vertical vowel (standing line), it sits to the <em>RIGHT</em> of the consonant.</>
              ) : (
                <>Because <strong>{selectedVowel}</strong> is a horizontal vowel (flat line), it sits directly <em>BELOW</em> the consonant.</>
              )}
            </p>
          </div>

          {selectedBatchim && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950">
              <strong>Batchim (받침) Placement:</strong> The final consonant <strong>{selectedBatchim}</strong> acts as the supporting floor at the very bottom of the square block.
            </div>
          )}
        </div>

      </div>

      {/* Component Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
        
        {/* 1. Initial Consonant */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-academy-navy uppercase tracking-wider block">
            1. Initial Consonant (초성)
          </span>
          <div className="grid grid-cols-4 gap-2">
            {PRACTICE_INITIALS.map((init) => (
              <button
                key={init.char}
                type="button"
                onClick={() => setSelectedInitial(init.char)}
                className={`h-12 rounded-xl border font-serif font-bold text-lg transition-all ${
                  selectedInitial === init.char
                    ? 'border-academy-navy bg-academy-navy text-academy-gold shadow-sm'
                    : 'border-stone-200 bg-white hover:bg-stone-50 text-academy-charcoal'
                }`}
              >
                {init.char}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Medial Vowel */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-academy-navy uppercase tracking-wider block">
            2. Medial Vowel (중성)
          </span>
          <div className="grid grid-cols-3 gap-2">
            {PRACTICE_VOWELS.map((v) => (
              <button
                key={v.char}
                type="button"
                onClick={() => setSelectedVowel(v.char)}
                className={`h-12 rounded-xl border font-serif font-bold text-lg transition-all ${
                  selectedVowel === v.char
                    ? 'border-academy-navy bg-academy-navy text-academy-gold shadow-sm'
                    : 'border-stone-200 bg-white hover:bg-stone-50 text-academy-charcoal'
                }`}
              >
                {v.char}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Final Batchim */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-academy-navy uppercase tracking-wider block">
            3. Final Batchim (종성 - Optional)
          </span>
          <div className="grid grid-cols-3 gap-2">
            {PRACTICE_BATCHIM.map((b) => (
              <button
                key={b.char || 'empty'}
                type="button"
                onClick={() => setSelectedBatchim(b.char)}
                className={`h-12 rounded-xl border font-serif font-bold text-sm transition-all ${
                  selectedBatchim === b.char
                    ? 'border-academy-navy bg-academy-navy text-academy-gold shadow-sm'
                    : 'border-stone-200 bg-white hover:bg-stone-50 text-academy-charcoal'
                }`}
              >
                {b.char || 'Ø'}
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
