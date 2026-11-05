import React, { useState } from 'react';
import { AudioButton } from '../common/AudioButton';

export const HangulChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vowels' | 'consonants' | 'batchim'>('vowels');

  const basicVowels = [
    { char: 'ㅏ', rom: 'a', name: '아', desc: 'Open mouth wide (like "father")' },
    { char: 'ㅑ', rom: 'ya', name: '야', desc: 'Add "y" glide + a' },
    { char: 'ㅓ', rom: 'eo', name: '어', desc: 'Open mouth moderately, pull tongue back ("uh")' },
    { char: 'ㅕ', rom: 'yeo', name: '여', desc: 'Add "y" glide + eo' },
    { char: 'ㅗ', rom: 'o', name: '오', desc: 'Round lips tightly into a circle' },
    { char: 'ㅛ', rom: 'yo', name: '요', desc: 'Add "y" glide + o' },
    { char: 'ㅜ', rom: 'u', name: '우', desc: 'Pucker lips forward like sipping straw' },
    { char: 'ㅠ', rom: 'yu', name: '유', desc: 'Add "y" glide + u' },
    { char: 'ㅡ', rom: 'eu', name: '으', desc: 'Smile wide, pull tongue back (unrounded)' },
    { char: 'ㅣ', rom: 'i', name: '이', desc: 'Gentle smile, tongue high ("ee")' }
  ];

  const compoundVowels = [
    { char: 'ㅐ', rom: 'ae', name: '애', desc: 'ㅏ + ㅣ (open "e" as in pet)' },
    { char: 'ㅔ', rom: 'e', name: '에', desc: 'ㅓ + ㅣ (standard "e")' },
    { char: 'ㅒ', rom: 'yae', name: '얘', desc: 'ㅑ + ㅣ (rare)' },
    { char: 'ㅖ', rom: 'ye', name: '예', desc: 'ㅕ + ㅣ ("ye" as in yes / 예요)' },
    { char: 'ㅘ', rom: 'wa', name: '와', desc: 'ㅗ + ㅏ ("wa" as in 와요)' },
    { char: 'ㅙ', rom: 'wae', name: '왜', desc: 'ㅗ + ㅐ ("wae" as in 왜 why?)' },
    { char: 'ㅚ', rom: 'oe', name: '외', desc: 'ㅗ + ㅣ (pronounced "weh" e.g. 회사)' },
    { char: 'ㅝ', rom: 'wo', name: '워', desc: 'ㅜ + ㅓ ("wo" as in 뭘)' },
    { char: 'ㅞ', rom: 'we', name: '웨', desc: 'ㅜ + ㅔ ("we" as in 웨딩)' },
    { char: 'ㅟ', rom: 'wi', name: '위', desc: 'ㅜ + ㅣ ("wi" as in 위)' },
    { char: 'ㅢ', rom: 'ui', name: '의', desc: 'ㅡ + ㅣ ("ui" / "i" / "e")' }
  ];

  const basicConsonants = [
    { char: 'ㄱ', rom: 'g/k', name: '기역', type: 'Plain (Molar)', desc: 'Soft k at start, g between vowels' },
    { char: 'ㄴ', rom: 'n', name: '니은', type: 'Lingual', desc: 'Tongue touches upper gums' },
    { char: 'ㄷ', rom: 'd/t', name: '디귿', type: 'Lingual', desc: 'Soft t at start, d between vowels' },
    { char: 'ㄹ', rom: 'r/l', name: '리을', type: 'Lingual', desc: 'Tap flap r between vowels, l at end' },
    { char: 'ㅁ', rom: 'm', name: '미음', type: 'Labial', desc: 'Both lips closed' },
    { char: 'ㅂ', rom: 'b/p', name: '비읍', type: 'Labial', desc: 'Soft p at start, b between vowels' },
    { char: 'ㅅ', rom: 's', name: '시옷', type: 'Dental', desc: 'Soft s (becomes "sh" before i)' },
    { char: 'ㅇ', rom: 'silent/ng', name: '이응', type: 'Throat', desc: 'Silent in initial, "ng" in Batchim' },
    { char: 'ㅈ', rom: 'j/ch', name: '지읒', type: 'Dental', desc: 'Soft j/ch' },
    { char: 'ㅊ', rom: 'ch', name: '치읓', type: 'Aspirated', desc: 'Strong burst of air with "ch"' },
    { char: 'ㅋ', rom: 'k', name: '키읔', type: 'Aspirated', desc: 'Strong aspirated k with air puff' },
    { char: 'ㅌ', rom: 't', name: '티읔', type: 'Aspirated', desc: 'Strong aspirated t with air puff' },
    { char: 'ㅍ', rom: 'p', name: '피읗', type: 'Aspirated', desc: 'Strong aspirated p with air puff' },
    { char: 'ㅎ', rom: 'h', name: '히읗', type: 'Throat', desc: 'Aspirated throat sound like home' }
  ];

  const doubleConsonants = [
    { char: 'ㄲ', rom: 'kk', name: '쌍기역', type: 'Tense', desc: 'Glottal stop, sharp k (zero breath)' },
    { char: 'ㄸ', rom: 'tt', name: '쌍디귿', type: 'Tense', desc: 'Glottal stop, sharp t (zero breath)' },
    { char: 'ㅃ', rom: 'pp', name: '쌍비읍', type: 'Tense', desc: 'Glottal stop, sharp p (zero breath)' },
    { char: 'ㅆ', rom: 'ss', name: '쌍시옷', type: 'Tense', desc: 'Intense hiss-like ss' },
    { char: 'ㅉ', rom: 'jj', name: '쌍지읒', type: 'Tense', desc: 'High pitch tense jj' }
  ];

  const batchimFamilies = [
    { sound: '[ㄱ]', reps: 'ㄱ, ㅋ, ㄲ', example: '국 (soup), 밖 (outside), 부엌 (kitchen)', desc: 'Unreleased stop [k̚]' },
    { sound: '[ㄴ]', reps: 'ㄴ', example: '문 (door), 산 (mountain)', desc: 'Clean final [n]' },
    { sound: '[ㄷ]', reps: 'ㄷ, ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ', example: '옷 [옫], 낮 [낟], 꽃 [꼳], 끝 [끋], 있다 [읻따]', desc: 'All collapse into unreleased [t̚]!' },
    { sound: '[ㄹ]', reps: 'ㄹ', example: '물 (water), 달 (moon), 말 (speech)', desc: 'Soft liquid [l]' },
    { sound: '[ㅁ]', reps: 'ㅁ', example: '봄 (spring), 밤 (night)', desc: 'Closed lip [m]' },
    { sound: '[ㅂ]', reps: 'ㅂ, ㅍ', example: '밥 [밥], 잎 [입]', desc: 'Unreleased bilabial stop [p̚]' },
    { sound: '[ㅇ]', reps: 'ㅇ', example: '강 (river), 방 (room), 사랑 (love)', desc: 'Nasal [ŋ] "ng"' }
  ];

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
      
      {/* Tab Switcher */}
      <div className="flex border-b border-stone-200 gap-4 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab('vowels')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'vowels'
              ? 'border-academy-navy text-academy-navy'
              : 'border-transparent text-stone-500 hover:text-academy-navy'
          }`}
        >
          Hangul Vowels (모음 21자)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('consonants')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'consonants'
              ? 'border-academy-navy text-academy-navy'
              : 'border-transparent text-stone-500 hover:text-academy-navy'
          }`}
        >
          Hangul Consonants (자음 19자)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('batchim')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'batchim'
              ? 'border-academy-navy text-academy-navy'
              : 'border-transparent text-stone-500 hover:text-academy-navy'
          }`}
        >
          Batchim 7 Representative Sounds (받침)
        </button>
      </div>

      {/* Vowels Tab */}
      {activeTab === 'vowels' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-serif font-bold text-academy-navy mb-3 flex items-center justify-between">
              <span>10 Basic Vowels (기본 모음)</span>
              <span className="text-xs font-sans text-stone-500 font-normal">Click letter or speaker to hear pronunciation</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {basicVowels.map((v) => (
                <div
                  key={v.char}
                  className="p-3 rounded-lg border border-stone-200 hover:border-academy-gold bg-stone-50/50 hover:bg-amber-50/20 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-3xl font-serif font-bold text-academy-navy">{v.char}</span>
                    <AudioButton text={v.name} size="sm" />
                  </div>
                  <div className="mt-2">
                    <div className="text-xs font-mono font-bold text-academy-gold-dark">{v.rom}</div>
                    <div className="text-[11px] text-stone-600 line-clamp-2 mt-0.5">{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100">
            <h3 className="text-sm font-serif font-bold text-academy-navy mb-3">
              11 Compound & Diphthong Vowels (이중 모음)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {compoundVowels.map((v) => (
                <div
                  key={v.char}
                  className="p-3 rounded-lg border border-stone-200 hover:border-academy-gold bg-stone-50/50 hover:bg-amber-50/20 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-2xl font-serif font-bold text-academy-navy">{v.char}</span>
                    <AudioButton text={v.name} size="sm" />
                  </div>
                  <div className="mt-2">
                    <div className="text-xs font-mono font-bold text-academy-gold-dark">{v.rom}</div>
                    <div className="text-[11px] text-stone-600 line-clamp-2 mt-0.5">{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Consonants Tab */}
      {activeTab === 'consonants' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-serif font-bold text-academy-navy mb-3">
              14 Basic Consonants (기본 자음)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
              {basicConsonants.map((c) => (
                <div
                  key={c.char}
                  className="p-3 rounded-lg border border-stone-200 hover:border-academy-gold bg-stone-50/50 hover:bg-amber-50/20 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-3xl font-serif font-bold text-academy-navy">{c.char}</span>
                    <AudioButton text={c.name} size="sm" />
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-academy-gold-dark">{c.rom}</span>
                      <span className="text-[10px] text-stone-500 font-korean">{c.name}</span>
                    </div>
                    <div className="text-[11px] text-stone-600 line-clamp-2 mt-0.5">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100">
            <h3 className="text-sm font-serif font-bold text-academy-navy mb-3">
              5 Double Consonants (쌍자음 - Tense)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {doubleConsonants.map((c) => (
                <div
                  key={c.char}
                  className="p-3 rounded-lg border border-amber-200 bg-amber-50/30 hover:border-academy-gold transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-3xl font-serif font-bold text-academy-navy">{c.char}</span>
                    <AudioButton text={c.name} size="sm" />
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-academy-wine">{c.rom}</span>
                      <span className="text-[10px] text-stone-500 font-korean">{c.name}</span>
                    </div>
                    <div className="text-[11px] text-stone-600 line-clamp-2 mt-0.5">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Batchim Tab */}
      {activeTab === 'batchim' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200/80 rounded-lg p-4 text-xs text-amber-900 leading-relaxed">
            <span className="font-bold">The Golden Rule of Batchim (받침 7종성):</span> Even though many consonants can be written at the bottom of a Korean syllable block, in isolated speech they collapse into exactly 7 phonetic sounds. Notice how <code className="bg-white px-1 py-0.5 rounded font-bold text-academy-wine">ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ</code> all share the unreleased [ㄷ] sound!
          </div>

          <div className="divide-y divide-stone-100 border border-stone-200 rounded-lg overflow-hidden">
            {batchimFamilies.map((b) => (
              <div key={b.sound} className="p-4 hover:bg-stone-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-academy-navy text-academy-gold font-bold text-lg flex items-center justify-center font-serif">
                    {b.sound}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-academy-charcoal">
                      Consonants represented: <span className="font-mono text-academy-navy font-bold">{b.reps}</span>
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5">{b.desc}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-stone-100 px-3 py-2 rounded-lg">
                  <div className="text-xs">
                    <span className="text-stone-500">Examples:</span> <span className="font-medium text-academy-charcoal">{b.example}</span>
                  </div>
                  <AudioButton text={b.example.split('(')[0]} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
