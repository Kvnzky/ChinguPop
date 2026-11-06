import React, { useState } from 'react';
import { VocabularyWord, UserProfile, SRSGrade } from '../../types';
import { storage } from '../../services/storageService';
import { calculateSM2 } from '../../services/srsService';
import { AudioButton } from '../common/AudioButton';
import { 
  Sparkles, 
  RotateCw, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  Volume2 
} from 'lucide-react';

interface VocabularySRSProps {
  currentUser: UserProfile;
}

export const VocabularySRS: React.FC<VocabularySRSProps> = ({ currentUser }) => {
  const [words, setWords] = useState<VocabularyWord[]>(
    storage.getVocabulary(currentUser.id)
  );
  const [activeTab, setActiveTab] = useState<'flashcards' | 'deck' | 'add'>('flashcards');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // New Word Form State
  const [newKorean, setNewKorean] = useState('');
  const [newRom, setNewRom] = useState('');
  const [newEnglish, setNewEnglish] = useState('');
  const [newFilipino, setNewFilipino] = useState('');
  const [newPOS, setNewPOS] = useState<VocabularyWord['partOfSpeech']>('noun');
  const [newExKorean, setNewExKorean] = useState('');
  const [newExEnglish, setNewExEnglish] = useState('');
  const [newCategory, setNewCategory] = useState('Custom Vocabulary');

  const todayStr = new Date().toISOString().split('T')[0];
  const dueWords = words.filter(w => !w.nextReviewDate || w.nextReviewDate <= todayStr);
  const activeDeck = dueWords.length > 0 ? dueWords : words;
  const currentWord = activeDeck[currentCardIndex % activeDeck.length];

  const handleGrade = (grade: SRSGrade) => {
    if (!currentWord) return;
    const updated = calculateSM2(currentWord, grade);
    storage.saveVocabularyWord(currentUser.id, updated);
    if (currentUser.id !== 'guest-visitor') {
      storage.addXP(currentUser.id, 5, `Vocabulary Review: ${currentWord.korean}`);
    }
    setWords(storage.getVocabulary(currentUser.id));
    setIsFlipped(false);
    setCurrentCardIndex(prev => (prev + 1) % activeDeck.length);
  };

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKorean.trim() || !newEnglish.trim()) return;

    const word: VocabularyWord = {
      id: `voc-${Date.now()}`,
      korean: newKorean.trim(),
      romanization: newRom.trim() || 'rom',
      pronunciationGuide: newRom.trim(),
      english: newEnglish.trim(),
      filipino: newFilipino.trim() || undefined,
      partOfSpeech: newPOS,
      exampleKorean: newExKorean.trim() || `${newKorean}을/를 사용해요.`,
      exampleEnglish: newExEnglish.trim() || `I use ${newEnglish}.`,
      category: newCategory,
      difficulty: currentUser.proficiency,
      repetitionNumber: 0,
      intervalDays: 1,
      easeFactor: 2.5,
      nextReviewDate: todayStr,
      status: 'new',
      timesCorrect: 0,
      timesIncorrect: 0
    };

    storage.saveVocabularyWord(currentUser.id, word);
    setWords(storage.getVocabulary(currentUser.id));
    setNewKorean('');
    setNewRom('');
    setNewEnglish('');
    setNewFilipino('');
    setNewExKorean('');
    setNewExEnglish('');
    setActiveTab('deck');
  };

  const filteredWords = words.filter(w => {
    const matchesSearch = w.korean.includes(searchQuery) || 
      w.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (w.filipino && w.filipino.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'all' || w.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const categories = Array.from(new Set(words.map(w => w.category)));

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-50 text-academy-gold-dark border border-amber-200">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-xl text-academy-navy">
              Vocabulary Spaced Repetition System (SM-2)
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              SuperMemo SM-2 memory intervals: Again (1d), Hard (1-2d), Good (3-6d), Easy (7+d).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-stone-100 border border-stone-200 text-stone-700">
            Due Today: <strong className="text-academy-wine">{dueWords.length}</strong> words
          </span>
          <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-stone-100 border border-stone-200 text-stone-700">
            Total Deck: <strong className="text-academy-navy">{words.length}</strong>
          </span>
        </div>
      </div>

      {/* Tabs (Mobile Scrollable) */}
      <div className="flex border-b border-stone-200 gap-2 sm:gap-4 overflow-x-auto no-scrollbar scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('flashcards')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all shrink-0 ${
            activeTab === 'flashcards'
              ? 'border-[#6C52EE] text-[#6C52EE]'
              : 'border-transparent text-stone-600 hover:text-[#6C52EE]'
          }`}
        >
          Spaced Repetition Drill (플래시카드)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('deck')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all shrink-0 ${
            activeTab === 'deck'
              ? 'border-[#6C52EE] text-[#6C52EE]'
              : 'border-transparent text-stone-600 hover:text-[#6C52EE]'
          }`}
        >
          My Academic Vocabulary Deck ({words.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('add')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all shrink-0 ${
            activeTab === 'add'
              ? 'border-[#6C52EE] text-[#6C52EE]'
              : 'border-transparent text-stone-600 hover:text-[#6C52EE]'
          }`}
        >
          + Add New Vocabulary
        </button>
      </div>

      {/* Tab 1: Interactive Flashcard Drill */}
      {activeTab === 'flashcards' && currentWord && (
        <div className="max-w-2xl mx-auto space-y-4">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={`min-h-[300px] sm:min-h-[340px] bg-white rounded-2xl border-2 cursor-pointer shadow-md p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 transform select-none relative active:scale-99 ${
              isFlipped
                ? 'border-[#FF5CA8]/80 bg-purple-50/30 ring-2 ring-pink-400/20'
                : 'border-stone-200 hover:border-[#6C52EE]'
            }`}
          >
            {/* Card Header */}
            <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
              <span className="font-mono uppercase font-bold text-[#6C52EE]">
                {currentWord.category} • {currentWord.difficulty}
              </span>
              <span className="font-mono font-semibold">
                Card {(currentCardIndex % activeDeck.length) + 1} of {activeDeck.length}
              </span>
            </div>

            {/* Front or Back Content */}
            {!isFlipped ? (
              <div className="text-center my-6 space-y-4">
                <span className="text-xs uppercase font-mono text-stone-500 font-semibold tracking-widest block">
                  Tap card to reveal English meaning
                </span>
                <div className="text-5xl sm:text-6xl font-serif font-black text-[#2C1E6D] tracking-wide">
                  {currentWord.korean}
                </div>
                <div className="inline-block mt-2">
                  <AudioButton text={currentWord.korean} size="lg" showRateToggle />
                </div>
              </div>
            ) : (
              <div className="text-center my-4 space-y-3 animate-in fade-in duration-150">
                <div className="text-3xl sm:text-4xl font-serif font-bold text-[#2C1E6D]">
                  {currentWord.korean}
                </div>
                <div className="text-sm font-mono text-[#FF5CA8] font-bold">
                  [{currentWord.romanization}] • {currentWord.partOfSpeech}
                </div>
                <div className="text-xl font-bold text-stone-800">
                  {currentWord.english}
                </div>
                {currentUser.filipinoSupport && currentWord.filipino && (
                  <div className="text-sm text-amber-800 italic font-medium">
                    🇵🇭 {currentWord.filipino}
                  </div>
                )}

                <div className="p-3 bg-stone-50 rounded-xl text-xs space-y-1 text-left mt-3 border border-stone-200">
                  <div className="text-[#2C1E6D] font-bold font-serif text-sm">
                    {currentWord.exampleKorean}
                  </div>
                  <div className="text-stone-700 font-medium">{currentWord.exampleEnglish}</div>
                  {currentWord.exampleFilipino && (
                    <div className="text-amber-800 text-[11px] italic font-medium">🇵🇭 {currentWord.exampleFilipino}</div>
                  )}
                </div>
              </div>
            )}

            {/* Card Footer Hint */}
            <div className="text-center text-xs text-stone-600 font-medium flex items-center justify-center gap-1.5 pt-2">
              <RotateCw className="w-3.5 h-3.5 text-[#6C52EE]" />
              <span>Tap anywhere to {isFlipped ? 'flip back' : 'reveal meaning'}</span>
            </div>
          </div>

          {/* Quick One-Hand Card Navigation Controls */}
          <div className="flex items-center justify-between gap-2 px-1">
            <button
              type="button"
              onClick={() => {
                setIsFlipped(false);
                setCurrentCardIndex(prev => (prev - 1 + activeDeck.length) % activeDeck.length);
              }}
              className="px-4 py-2.5 min-h-[44px] rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold transition-all active:scale-95 shadow-2xs"
            >
              ← Previous Card
            </button>

            <button
              type="button"
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-4 py-2.5 min-h-[44px] rounded-xl bg-purple-50 hover:bg-purple-100 text-[#6C52EE] border border-purple-200 text-xs font-bold transition-all active:scale-95"
            >
              🔄 Flip Card
            </button>

            <button
              type="button"
              onClick={() => {
                setIsFlipped(false);
                setCurrentCardIndex(prev => (prev + 1) % activeDeck.length);
              }}
              className="px-4 py-2.5 min-h-[44px] rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold transition-all active:scale-95 shadow-2xs"
            >
              Next Card →
            </button>
          </div>

          {/* SM-2 Response Grading Buttons */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-mono uppercase font-bold text-stone-600 block text-center">
              Rate your recall quality (SM-2 Interval Scheduling):
            </span>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => handleGrade(0)}
                className="p-3 min-h-[52px] rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-900 font-bold text-xs flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95 shadow-2xs"
              >
                <span>Again</span>
                <span className="text-[10px] font-semibold font-mono text-rose-700">1d</span>
              </button>

              <button
                type="button"
                onClick={() => handleGrade(2)}
                className="p-3 min-h-[52px] rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95 shadow-2xs"
              >
                <span>Hard</span>
                <span className="text-[10px] font-semibold font-mono text-amber-700">~2d</span>
              </button>

              <button
                type="button"
                onClick={() => handleGrade(4)}
                className="p-3 min-h-[52px] rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95 shadow-2xs"
              >
                <span>Good</span>
                <span className="text-[10px] font-semibold font-mono text-emerald-700">~4d</span>
              </button>

              <button
                type="button"
                onClick={() => handleGrade(5)}
                className="p-3 min-h-[52px] rounded-xl border border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95 shadow-2xs"
              >
                <span>Easy</span>
                <span className="text-[10px] font-semibold font-mono text-blue-700">~7d+</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Full Vocabulary Deck List */}
      {activeTab === 'deck' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Korean word, English meaning, or Filipino..."
                className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-academy-gold"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-stone-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-700 focus:outline-none"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="divide-y divide-stone-100">
            {filteredWords.map((w) => (
              <div key={w.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/60 px-2 rounded-lg transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center font-serif font-bold text-lg text-academy-navy shrink-0">
                    {w.korean}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base text-academy-navy">{w.korean}</span>
                      <span className="text-xs font-mono text-stone-400">[{w.romanization}]</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-stone-100 text-stone-600 font-mono uppercase">{w.partOfSpeech}</span>
                    </div>
                    <div className="text-xs text-stone-700 font-medium mt-0.5">
                      {w.english}
                      {currentUser.filipinoSupport && w.filipino && (
                        <span className="text-amber-800 ml-2 font-normal">🇵🇭 {w.filipino}</span>
                      )}
                    </div>
                    <div className="text-[11px] text-stone-500 italic mt-0.5">{w.exampleKorean} — {w.exampleEnglish}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right text-[11px] font-mono text-stone-500">
                    <div>Rep: {w.repetitionNumber} | EF: {w.easeFactor}</div>
                    <div className="text-[10px] text-academy-gold-dark font-semibold">Next: {w.nextReviewDate}</div>
                  </div>
                  <AudioButton text={w.korean} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Add Custom Vocabulary */}
      {activeTab === 'add' && (
        <form onSubmit={handleAddWord} className="max-w-xl mx-auto bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-base text-academy-navy pb-3 border-b border-stone-200">
            Add New Word to Student Deck
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-academy-navy mb-1">
                Korean Word (Hangul) *
              </label>
              <input
                type="text"
                required
                value={newKorean}
                onChange={(e) => setNewKorean(e.target.value)}
                placeholder="e.g., 커피"
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-academy-navy mb-1">
                Romanization Guide
              </label>
              <input
                type="text"
                value={newRom}
                onChange={(e) => setNewRom(e.target.value)}
                placeholder="e.g., keo-pi"
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-academy-navy mb-1">
                English Meaning *
              </label>
              <input
                type="text"
                required
                value={newEnglish}
                onChange={(e) => setNewEnglish(e.target.value)}
                placeholder="e.g., Coffee"
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-academy-navy mb-1">
                Filipino Meaning (Optional)
              </label>
              <input
                type="text"
                value={newFilipino}
                onChange={(e) => setNewFilipino(e.target.value)}
                placeholder="e.g., Kape"
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-academy-navy mb-1">
                Part of Speech
              </label>
              <select
                value={newPOS}
                onChange={(e) => setNewPOS(e.target.value as any)}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              >
                <option value="noun">Noun (명사)</option>
                <option value="verb">Verb (동사)</option>
                <option value="adjective">Adjective (형용사)</option>
                <option value="particle">Particle (조사)</option>
                <option value="adverb">Adverb (부사)</option>
                <option value="expression">Expression (표현)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-academy-navy mb-1">
                Topic Category
              </label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-academy-navy mb-1">
              Example Korean Sentence
            </label>
            <input
              type="text"
              value={newExKorean}
              onChange={(e) => setNewExKorean(e.target.value)}
              placeholder="e.g., 아침에 따뜻한 커피를 마셔요."
              className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-academy-navy mb-1">
              Sentence English Translation
            </label>
            <input
              type="text"
              value={newExEnglish}
              onChange={(e) => setNewExEnglish(e.target.value)}
              placeholder="e.g., I drink warm coffee in the morning."
              className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-academy-navy hover:bg-academy-navy-light text-academy-ivory font-bold text-xs uppercase tracking-wider transition-all"
            >
              Add to Spaced Repetition Deck
            </button>
          </div>
        </form>
      )}

    </div>
  );
};
