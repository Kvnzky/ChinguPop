import React, { useState, useEffect } from 'react';
import { UserProfile, ReviewItem } from '../../types';
import { storage } from '../../services/storageService';
import { speechService } from '../../services/speechService';
import { 
  RotateCcw, 
  BrainCircuit, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Flame, 
  BookOpen, 
  Gamepad2,
  Clock,
  AlertCircle
} from 'lucide-react';

interface ReviewRoomProps {
  currentUser: UserProfile;
  onNavigateTab?: (tab: string) => void;
}

export const ReviewRoom: React.FC<ReviewRoomProps> = ({ currentUser, onNavigateTab }) => {
  const [queue, setQueue] = useState<ReviewItem[]>(() => storage.getReviewQueue(currentUser.id));
  const [activePracticeIndex, setActivePracticeIndex] = useState<number | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'vocabulary' | 'grammar' | 'pronunciation' | 'listening'>('all');

  useEffect(() => {
    setQueue(storage.getReviewQueue(currentUser.id));
    setActivePracticeIndex(null);
    setIsFlipped(false);
  }, [currentUser.id]);

  const handleSeedFoundationDeck = () => {
    const starterItems: Array<{ type: ReviewItem['type']; korean: string; romanization: string; english: string; hint: string }> = [
      { type: 'pronunciation', korean: 'ㅏ vs ㅓ', romanization: 'a vs eo', english: 'Bright "ah" (ㅏ) vs Open-back "eo" (ㅓ)', hint: 'Drop your jaw slightly lower for ㅓ.' },
      { type: 'pronunciation', korean: 'ㅗ vs ㅜ', romanization: 'o vs u', english: 'Rounded high "o" (ㅗ) vs Pursed forward "oo" (ㅜ)', hint: 'ㅗ points up (Heaven), ㅜ points down (Earth).' },
      { type: 'vocabulary', korean: '안녕하세요', romanization: 'annyeonghaseyo', english: 'Hello / Good day (Polite)', hint: 'Standard polite greeting used at any time of day.' },
      { type: 'vocabulary', korean: '감사합니다', romanization: 'gamsahamnida', english: 'Thank you (Formal Polite)', hint: 'Used to express polite gratitude.' },
      { type: 'grammar', korean: '은 / 는', romanization: 'eun / neun', english: 'Topic Marker Particle', hint: 'Use 은 after a consonant Batchim, 는 after a vowel.' },
      { type: 'grammar', korean: '이 / 가', romanization: 'i / ga', english: 'Subject Marker Particle', hint: 'Use 이 after a consonant Batchim, 가 after a vowel.' },
      { type: 'listening', korean: '우유', romanization: 'uyu', english: 'Milk', hint: 'Composed of horizontal vowels ㅜ (u) and ㅠ (yu).' },
      { type: 'vocabulary', korean: '한국어', romanization: 'hangugeo', english: 'Korean Language', hint: 'Pronounced [한구거] due to Batchim liaison.' }
    ];
    starterItems.forEach(item => storage.addReviewItem(currentUser.id, item));
    setQueue(storage.getReviewQueue(currentUser.id));
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const dueItems = queue.filter(item => item.nextReviewDate <= todayStr);
  const upcomingItems = queue.filter(item => item.nextReviewDate > todayStr);

  const filteredItems = filterType === 'all' 
    ? queue 
    : queue.filter(item => item.type === filterType);

  const currentItem = activePracticeIndex !== null ? dueItems[activePracticeIndex] : null;

  const handleStartReview = () => {
    if (dueItems.length > 0) {
      setActivePracticeIndex(0);
      setIsFlipped(false);
      speechService.speak(dueItems[0].korean);
    }
  };

  const handleRate = (success: boolean) => {
    if (!currentItem) return;
    storage.resolveReviewItem(currentUser.id, currentItem.id, success);
    const updated = storage.getReviewQueue(currentUser.id);
    setQueue(updated);

    if (activePracticeIndex !== null && activePracticeIndex + 1 < dueItems.length) {
      setActivePracticeIndex(i => (i !== null ? i + 1 : null));
      setIsFlipped(false);
      const next = dueItems[activePracticeIndex + 1];
      if (next) speechService.speak(next.korean);
    } else {
      setActivePracticeIndex(null);
      setIsFlipped(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#2C1E6D] via-[#4F35C8] to-[#6C52EE] p-6 lg:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-black uppercase tracking-wider text-purple-200">
              <BrainCircuit className="w-4 h-4 text-purple-300" />
              <span>SuperMemo SM-2 Spaced Repetition</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
              My Review Room 🔄
            </h1>
            <p className="text-xs lg:text-sm text-purple-100/90 leading-relaxed max-w-xl">
              Turn your past mistakes into permanent memory. Spaced repetition automatically calculates the optimal review intervals so concepts stick forever.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-md shrink-0">
            <div className="text-center px-2">
              <div className="text-xs font-bold text-purple-200">Due Today</div>
              <div className="text-2xl font-black text-amber-300 font-mono">
                {dueItems.length}
              </div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center px-2">
              <div className="text-xs font-bold text-purple-200">Total in Queue</div>
              <div className="text-2xl font-black text-white font-mono">
                {queue.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Flashcard Review Modal / Arena */}
      {currentItem ? (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-xl max-w-lg mx-auto space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
              Card {activePracticeIndex! + 1} of {dueItems.length} • {currentItem.type}
            </span>
            <button
              onClick={() => setActivePracticeIndex(null)}
              className="text-stone-400 hover:text-stone-600 text-xs font-bold"
            >
              ✕ Exit Review
            </button>
          </div>

          {/* Flashcard Body */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-56 rounded-3xl bg-gradient-to-br from-[#FAF9FE] to-purple-50/60 border-2 border-dashed border-purple-200/90 p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:border-[#6C52EE] select-none"
          >
            {!isFlipped ? (
              <div className="space-y-3">
                <div className="text-4xl lg:text-5xl font-black text-[#1E1B4B]">
                  {currentItem.korean}
                </div>
                {currentItem.romanization && (
                  <div className="text-xs font-mono font-bold text-stone-400">
                    {currentItem.romanization}
                  </div>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speechService.speak(currentItem.korean);
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-white text-[#6C52EE] font-extrabold text-xs shadow-2xs hover:bg-purple-50 inline-flex items-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Pronounce</span>
                </button>
                <div className="pt-4 text-[11px] font-bold text-stone-400">
                  Tap to flip and check answer ↷
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-xs font-extrabold text-stone-400 uppercase">Meaning</div>
                <div className="text-2xl font-black text-[#1E1B4B]">
                  {currentItem.english}
                </div>
                {currentItem.hint && (
                  <div className="p-3 bg-white/90 rounded-xl border border-stone-200 text-xs text-stone-600 font-medium">
                    💡 {currentItem.hint}
                  </div>
                )}
                <div className="text-[10px] text-stone-400 font-medium">
                  Current Interval: {currentItem.intervalDays} days • Consecutive: {currentItem.consecutiveCorrect}
                </div>
              </div>
            )}
          </div>

          {/* Response Buttons */}
          {isFlipped ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleRate(false)}
                className="py-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold text-xs border border-rose-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <XCircle className="w-4 h-4" />
                <span>Need Practice (Reset)</span>
              </button>
              <button
                type="button"
                onClick={() => handleRate(true)}
                className="py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mastered (+5 XP)</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsFlipped(true)}
              className="w-full py-3 rounded-2xl bg-[#6C52EE] text-white font-extrabold text-xs shadow-md"
            >
              Show Answer
            </button>
          )}
        </div>
      ) : (
        /* Overview Dashboard & Queue List */
        <div className="space-y-6">
          
          {/* Quick Actions Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-xl">
                ⏳
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#1E1B4B]">
                  {dueItems.length > 0 
                    ? `You have ${dueItems.length} review items ready for practice today!` 
                    : 'All caught up! No items currently due today.'}
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  Spaced intervals: 1d → 3d → 7d → 14d → 30d retention intervals.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {dueItems.length > 0 && (
                <button
                  type="button"
                  onClick={handleStartReview}
                  className="px-5 py-2.5 rounded-2xl bg-[#6C52EE] hover:bg-[#5839DE] text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Due Review ({dueItems.length})</span>
                </button>
              )}

              {onNavigateTab && (
                <button
                  type="button"
                  onClick={() => onNavigateTab('arcade')}
                  className="px-4 py-2.5 rounded-2xl bg-purple-50 text-[#6C52EE] hover:bg-purple-100 font-extrabold text-xs border border-purple-200 transition-colors flex items-center gap-1.5"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Practice in Arcade</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {(['all', 'vocabulary', 'grammar', 'pronunciation', 'listening'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition-all ${
                  filterType === type 
                    ? 'bg-[#1E1B4B] text-white shadow-xs' 
                    : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200/80'
                }`}
              >
                {type === 'all' ? `All Items (${queue.length})` : `${type}`}
              </button>
            ))}
          </div>

          {/* Items Queue Grid */}
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-3xl border border-stone-200 p-8 text-center space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#6C52EE] flex items-center justify-center mx-auto">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#1E1B4B]">
                {queue.length === 0
                  ? 'Your Spaced Repetition Review Queue is Currently Empty'
                  : `No ${filterType} items in your review queue`}
              </h4>
              <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                {queue.length === 0
                  ? 'Items you miss in classroom quizzes or arcade games are automatically added here. You can also load the Foundation Review Deck right now to practice core Hangul vowels, particles, and greetings.'
                  : 'Try switching the filter tab above to view all review items.'}
              </p>
              {queue.length === 0 && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleSeedFoundationDeck}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#6C52EE] hover:bg-[#5839DE] text-white font-extrabold text-xs shadow-md transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Load Foundation Review Deck (8 Items)</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredItems.map((item) => {
                const isDue = item.nextReviewDate <= todayStr;
                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-2xl p-4 border transition-all flex items-start justify-between gap-3 ${
                      isDue 
                        ? 'border-amber-300 bg-amber-50/20 shadow-xs' 
                        : 'border-stone-200/80 shadow-2xs'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                          {item.type}
                        </span>
                        {isDue ? (
                          <span className="text-[10px] font-black uppercase text-amber-600 flex items-center gap-1">
                            <Flame className="w-3 h-3 fill-amber-500" />
                            <span>Due Today</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium text-stone-400">
                            Next: {item.nextReviewDate} ({item.intervalDays}d interval)
                          </span>
                        )}
                      </div>

                      <div className="flex items-baseline gap-2 pt-0.5">
                        <h4 className="text-base font-black text-[#1E1B4B] truncate">
                          {item.korean}
                        </h4>
                        {item.romanization && (
                          <span className="text-xs text-stone-400 font-mono">
                            {item.romanization}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-stone-600 font-medium">
                        {item.english}
                      </p>

                      {item.hint && (
                        <p className="text-[11px] text-stone-400 italic">
                          Tip: {item.hint}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => speechService.speak(item.korean)}
                        className="w-8 h-8 rounded-xl bg-purple-50 text-[#6C52EE] hover:bg-purple-100 flex items-center justify-center transition-colors"
                        title="Listen"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <span className="text-[9px] font-bold text-stone-400">
                        {item.consecutiveCorrect} streak
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

    </div>
  );
};
