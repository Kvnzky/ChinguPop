import React, { useState } from 'react';
import { Volume2, Play, Mic, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import { KoreanAudioPlayer } from './KoreanAudioPlayer';
import { VoiceRecorder } from './VoiceRecorder';

interface SyllableSeries {
  seriesName: string;
  vowel: string;
  syllables: { char: string; rom: string; explanation: string }[];
  patternRule: string;
}

const SYLLABLE_PRACTICE_SERIES: SyllableSeries[] = [
  {
    seriesName: 'The "ㅏ" (a) Syllable Series',
    vowel: 'ㅏ',
    patternRule: 'Consonant + Vertical Vowel (Placed on the right side: 가, 나, 다)',
    syllables: [
      { char: '가', rom: 'ga', explanation: 'ㄱ (soft k/g) + ㅏ (a) = [ga]' },
      { char: '나', rom: 'na', explanation: 'ㄴ (n) + ㅏ (a) = [na]' },
      { char: '다', rom: 'da', explanation: 'ㄷ (d/t) + ㅏ (a) = [da]' },
      { char: '라', rom: 'ra', explanation: 'ㄹ (flapped r) + ㅏ (a) = [ra]' },
      { char: '마', rom: 'ma', explanation: 'ㅁ (m) + ㅏ (a) = [ma]' }
    ]
  },
  {
    seriesName: 'The "ㅓ" (eo) Syllable Series',
    vowel: 'ㅓ',
    patternRule: 'Consonant + Vertical Vowel (Deep unrounded sound: 거, 너, 더)',
    syllables: [
      { char: '거', rom: 'geo', explanation: 'ㄱ + ㅓ = [geo] (Not go; tongue is pulled back)' },
      { char: '너', rom: 'neo', explanation: 'ㄴ + ㅓ = [neo] (You in casual Korean)' },
      { char: '더', rom: 'deo', explanation: 'ㄷ + ㅓ = [deo] (More)' },
      { char: '러', rom: 'reo', explanation: 'ㄹ + ㅓ = [reo]' },
      { char: '머', rom: 'meo', explanation: 'ㅁ + ㅓ = [meo]' }
    ]
  },
  {
    seriesName: 'The "ㅗ" (o) Syllable Series',
    vowel: 'ㅗ',
    patternRule: 'Consonant + Horizontal Vowel (Placed underneath: 고, 노, 도)',
    syllables: [
      { char: '고', rom: 'go', explanation: 'ㄱ + ㅗ = [go] (Lips tightly rounded into an "O")' },
      { char: '노', rom: 'no', explanation: 'ㄴ + ㅗ = [no]' },
      { char: '도', rom: 'do', explanation: 'ㄷ + ㅗ = [do] (Also/Too)' },
      { char: '로', rom: 'ro', explanation: 'ㄹ + ㅗ = [ro] (Toward/By)' },
      { char: '모', rom: 'mo', explanation: 'ㅁ + ㅗ = [mo]' }
    ]
  },
  {
    seriesName: 'The "ㅜ" (u) Syllable Series',
    vowel: 'ㅜ',
    patternRule: 'Consonant + Horizontal Vowel (Pursed lips underneath: 구, 누, 두)',
    syllables: [
      { char: '구', rom: 'gu', explanation: 'ㄱ + ㅜ = [gu] (Nine)' },
      { char: '누', rom: 'nu', explanation: 'ㄴ + ㅜ = [nu]' },
      { char: '두', rom: 'du', explanation: 'ㄷ + ㅜ = [du] (Two)' },
      { char: '루', rom: 'ru', explanation: 'ㄹ + ㅜ = [ru]' },
      { char: '무', rom: 'mu', explanation: 'ㅁ + ㅜ = [mu] (Radish)' }
    ]
  }
];

interface ListenAndRepeatStudioProps {
  onComplete?: () => void;
  className?: string;
}

export const ListenAndRepeatStudio: React.FC<ListenAndRepeatStudioProps> = ({
  onComplete,
  className = ''
}) => {
  const [selectedSeriesIdx, setSelectedSeriesIdx] = useState(0);
  const [selectedSyllableIdx, setSelectedSyllableIdx] = useState(0);
  const [masteredSyllables, setMasteredSyllables] = useState<string[]>([]);

  const activeSeries = SYLLABLE_PRACTICE_SERIES[selectedSeriesIdx];
  const activeSyllable = activeSeries.syllables[selectedSyllableIdx];

  const handleMarkMastered = () => {
    if (!masteredSyllables.includes(activeSyllable.char)) {
      const updated = [...masteredSyllables, activeSyllable.char];
      setMasteredSyllables(updated);
      if (updated.length >= 10 && onComplete) {
        onComplete();
      }
    }
  };

  return (
    <div className={`p-6 rounded-2xl border border-stone-200 bg-white shadow-sm space-y-6 ${className}`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-2">
        <div>
          <span className="text-[10px] uppercase font-mono font-bold text-academy-gold-dark tracking-wider block">
            Guided Syllable Shadowing
          </span>
          <h4 className="font-serif font-bold text-lg text-academy-navy mt-0.5">
            Listen & Repeat Guided Studio
          </h4>
        </div>
        <span className="text-xs font-mono text-stone-500 bg-stone-100 px-3 py-1 rounded-lg">
          Mastered: {masteredSyllables.length} syllables
        </span>
      </div>

      {/* Series Selector Pills */}
      <div className="flex flex-wrap gap-2 pb-1 no-scrollbar scrollbar-none">
        {SYLLABLE_PRACTICE_SERIES.map((s, idx) => (
          <button
            key={s.seriesName}
            type="button"
            onClick={() => {
              setSelectedSeriesIdx(idx);
              setSelectedSyllableIdx(0);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold font-serif whitespace-nowrap transition-all border ${
              selectedSeriesIdx === idx
                ? 'bg-academy-navy text-academy-ivory border-academy-navy shadow-sm'
                : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
            }`}
          >
            {s.seriesName}
          </button>
        ))}
      </div>

      {/* Series Construction Rule */}
      <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-center justify-between">
        <span><strong>Geometrical Rule:</strong> {activeSeries.patternRule}</span>
        <span className="text-[11px] font-mono font-bold text-academy-gold-dark">Vowel: {activeSeries.vowel}</span>
      </div>

      {/* Syllable Selection Strip */}
      <div className="grid grid-cols-5 gap-3">
        {activeSeries.syllables.map((syl, i) => {
          const isSelected = selectedSyllableIdx === i;
          const isDone = masteredSyllables.includes(syl.char);
          return (
            <button
              key={syl.char}
              type="button"
              onClick={() => setSelectedSyllableIdx(i)}
              className={`p-3 rounded-xl border-2 text-center transition-all relative ${
                isSelected
                  ? 'border-academy-navy bg-white shadow-md ring-2 ring-academy-gold/40'
                  : 'border-stone-200 bg-stone-50 hover:bg-white'
              }`}
            >
              <div className="text-3xl font-serif font-black text-academy-navy">
                {syl.char}
              </div>
              <div className="text-[11px] font-mono text-academy-gold-dark mt-1">
                {syl.rom}
              </div>
              {isDone && (
                <div className="absolute top-1.5 right-1.5 text-emerald-600">
                  <CheckCircle2 className="w-4 h-4 fill-emerald-100" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Voice Recorder Shadowing Workspace for selected syllable */}
      <div className="space-y-4 pt-2">
        <VoiceRecorder
          targetKorean={activeSyllable.char}
          targetRomanization={activeSyllable.rom}
          targetEnglish={activeSyllable.explanation}
          onRecordCompleted={handleMarkMastered}
        />
      </div>

    </div>
  );
};
