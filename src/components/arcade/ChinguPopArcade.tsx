import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, ArcadeGameId, ArcadeGameMetadata } from '../../types';
import { storage } from '../../services/storageService';
import { speechService } from '../../services/speechService';
import { 
  Gamepad2, 
  Sparkles, 
  Volume2, 
  Trophy, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Play, 
  Mic, 
  Square, 
  HelpCircle, 
  ChevronRight, 
  Star,
  Swords,
  Layers,
  Search,
  ListOrdered,
  Grid,
  MessageSquare,
  Award
} from 'lucide-react';

interface ChinguPopArcadeProps {
  currentUser: UserProfile;
  onNavigateTab?: (tab: string) => void;
}

export const ARCADE_GAMES: ArcadeGameMetadata[] = [
  {
    id: 'hangul-match',
    title: 'Hangul Match',
    koreanTitle: '한글 매치',
    description: 'Rapid character & phoneme recognition. Match Korean vowels, consonants, and syllable sounds before time runs out!',
    category: 'Alphabet',
    icon: '⚡',
    color: 'from-[#7C5CF6] to-[#6C52EE]',
    badge: 'Beginner',
    durationMinutes: 3,
    learningGoal: 'Recognize the 21 vowels, 19 consonants, and instant sound-to-symbol mapping.'
  },
  {
    id: 'syllable-builder',
    title: 'Syllable Builder',
    koreanTitle: '음절 건축가',
    description: 'Assemble Korean consonants and vowels into real Hangul syllable blocks (Initial + Medial + Batchim).',
    category: 'Syllables',
    icon: '🧱',
    color: 'from-[#FF5CA8] to-[#FF8A00]',
    badge: 'Core Skill',
    durationMinutes: 4,
    learningGoal: 'Master Hangul 2-part and 3-part syllable block geometry and real dictionary words.'
  },
  {
    id: 'listen-pick',
    title: 'Listen & Pick',
    koreanTitle: '듣고 맞히기',
    description: 'Listen to native Korean speech and pick the correct sentence, spelling, and translation.',
    category: 'Listening',
    icon: '🎧',
    color: 'from-[#38BDF8] to-[#0284C7]',
    badge: 'Listening Lab',
    durationMinutes: 4,
    learningGoal: 'Develop sharp auditory recognition of Korean pitch, vowel heights, and Batchim linking.'
  },
  {
    id: 'word-hunter',
    title: 'Word Hunter',
    koreanTitle: '단어 사냥꾼',
    description: 'Connect Korean vocabulary words to their English meanings and visual clues. Missed words queue into your Review Room!',
    category: 'Vocabulary',
    icon: '🏹',
    color: 'from-[#22C55E] to-[#16A34A]',
    badge: 'SRS Powered',
    durationMinutes: 5,
    learningGoal: 'Acquire high-frequency Korean words and build long-term retention.'
  },
  {
    id: 'sentence-scramble',
    title: 'Sentence Scramble',
    koreanTitle: '문장 재배열',
    description: 'Rearrange scrambled Korean word blocks into grammatically sound SOV sentences with particle guides.',
    category: 'Grammar',
    icon: '🧩',
    color: 'from-[#EC4899] to-[#8B5CF6]',
    badge: 'Grammar',
    durationMinutes: 5,
    learningGoal: 'Internalize Korean verb-final word order and particle placement (은/는, 이/가, 을/를).'
  },
  {
    id: 'memory-flip',
    title: 'Memory Flip',
    koreanTitle: '단어 기억 뒤집기',
    description: 'Classic 3D card memory match! Flip and pair Korean words with their exact English translations.',
    category: 'Vocabulary',
    icon: '🃏',
    color: 'from-[#F59E0B] to-[#D97706]',
    badge: 'Memory Lab',
    durationMinutes: 4,
    learningGoal: 'Reinforce active recall of Korean terms with spatial memory.'
  },
  {
    id: 'pronunciation-challenge',
    title: 'Pronunciation Challenge',
    koreanTitle: '발음 챌린지',
    description: 'Listen to native Korean pronunciation examples, record your speech, and assess your articulation.',
    category: 'Speaking',
    icon: '🎙️',
    color: 'from-[#6366F1] to-[#4338CA]',
    badge: 'Speaking Lab',
    durationMinutes: 5,
    learningGoal: 'Master vertical vs horizontal vowel mouth shapes and tense consonant aspiration.'
  },
  {
    id: 'korean-life-simulator',
    title: 'Korean Life Simulator',
    koreanTitle: '한국 생활 시뮬레이터',
    description: 'Branching dialogue scenarios in Seoul: Order at a café, shop in Myeongdong, and ride the subway.',
    category: 'Culture',
    icon: '🏙️',
    color: 'from-[#14B8A6] to-[#0D9488]',
    badge: 'Interactive Story',
    durationMinutes: 6,
    learningGoal: 'Apply Korean in authentic cultural scenarios and master honorifics (존댓말).'
  },
  {
    id: 'boss-challenge',
    title: 'Boss Challenge',
    koreanTitle: '단원 보스 챌린지',
    description: 'Comprehensive end-of-unit mastery assessment. Defeat the Boss with an 80%+ score to unlock elite badges!',
    category: 'Mastery',
    icon: '⚔️',
    color: 'from-[#EF4444] to-[#B91C1C]',
    badge: 'Unit Exam',
    durationMinutes: 8,
    learningGoal: 'Verify complete unit mastery combining vocabulary, grammar, and listening.'
  }
];

export const ChinguPopArcade: React.FC<ChinguPopArcadeProps> = ({ currentUser, onNavigateTab }) => {
  const [activeGameId, setActiveGameId] = useState<ArcadeGameId | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [gamificationState, setGamificationState] = useState(() => storage.getGamificationState(currentUser.id));
  const [recentScores, setRecentScores] = useState(() => storage.getArcadeScores(currentUser.id));

  const refreshState = () => {
    setGamificationState(storage.getGamificationState(currentUser.id));
    setRecentScores(storage.getArcadeScores(currentUser.id));
  };

  const currentLevelInfo = storage.getLevel(currentUser.id);

  const filteredGames = filterCategory === 'all' 
    ? ARCADE_GAMES 
    : ARCADE_GAMES.filter(g => g.category.toLowerCase() === filterCategory.toLowerCase());

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Top Arcade Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#2C1E6D] via-[#4F35C8] to-[#FF5CA8] p-6 lg:p-8 text-white shadow-xl overflow-hidden border border-purple-400/30">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider text-purple-100">
              <Gamepad2 className="w-4 h-4 text-yellow-300" />
              <span>ChinguPop Learning Arcade</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight leading-tight">
              Play, Practice & Master Korean 🎮
            </h1>
            <p className="text-xs lg:text-sm text-purple-100/90 leading-relaxed font-medium">
              Gamified educational challenges engineered to turn Korean grammar, vocabulary, listening, and pronunciation into second nature.
            </p>
          </div>

          {/* Gamification Stats Card */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 shadow-md shrink-0">
            <div className="text-center px-2">
              <div className="text-xs font-bold text-purple-200">Total XP</div>
              <div className="text-xl font-black text-yellow-300 font-mono">
                {gamificationState.xp}
              </div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center px-2">
              <div className="text-xs font-bold text-purple-200">Level {currentLevelInfo.level}</div>
              <div className="text-xs font-extrabold text-white truncate max-w-28">
                {currentLevelInfo.title.split(' ')[0]}
              </div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center px-2">
              <div className="text-xs font-bold text-purple-200">Streak</div>
              <div className="text-xl font-black text-orange-300 flex items-center justify-center gap-0.5">
                <Flame className="w-4 h-4 fill-orange-400" />
                <span>{gamificationState.streak}d</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative background circles */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* Main Arcade View or Active Game Arena */}
      {!activeGameId ? (
        <div className="space-y-6">
          
          {/* Filter Chips Bar */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {['all', 'Alphabet', 'Syllables', 'Listening', 'Vocabulary', 'Grammar', 'Speaking', 'Culture', 'Mastery'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all capitalize whitespace-nowrap ${
                    filterCategory === cat
                      ? 'bg-[#6C52EE] text-white shadow-sm'
                      : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/80'
                  }`}
                >
                  {cat === 'all' ? 'All Games (9)' : cat}
                </button>
              ))}
            </div>

            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('review-room')}
                className="text-xs font-bold text-[#6C52EE] hover:underline flex items-center gap-1"
              >
                <span>Go to My Review Room</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* 9 Game Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                onClick={() => setActiveGameId(game.id)}
                className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200/80 flex items-center justify-center text-2xl shadow-2xs group-hover:scale-110 transition-transform">
                      {game.icon}
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 text-[#6C52EE] text-[10px] font-extrabold uppercase tracking-wider">
                      {game.badge}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-base font-extrabold text-[#1E1B4B] group-hover:text-[#6C52EE] transition-colors">
                        {game.title}
                      </h3>
                      <span className="text-xs font-bold text-stone-400">
                        {game.koreanTitle}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 font-medium leading-relaxed mt-1">
                      {game.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 mt-4 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-stone-400 flex items-center gap-1">
                    <span>⏱️ {game.durationMinutes} min</span>
                    <span>•</span>
                    <span className="text-amber-500 font-extrabold">+10 XP</span>
                  </span>

                  <button
                    type="button"
                    className="px-3.5 py-1.5 rounded-xl bg-purple-50 text-[#6C52EE] group-hover:bg-[#6C52EE] group-hover:text-white font-extrabold text-xs transition-colors flex items-center gap-1"
                  >
                    <span>Play Now</span>
                    <Play className="w-3 h-3 fill-current" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Achievements & Activity Section */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-sm text-[#1E1B4B]">Recent Arcade Achievements</h3>
              </div>
              <span className="text-xs font-bold text-stone-400">
                {storage.getAchievements(currentUser.id).filter(a => a.unlockedAt).length} / {storage.getAchievements(currentUser.id).length} Unlocked
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {storage.getAchievements(currentUser.id).slice(0, 8).map((ach) => {
                const isUnlocked = Boolean(ach.unlockedAt);
                return (
                  <div
                    key={ach.id}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      isUnlocked 
                        ? 'bg-amber-50/60 border-amber-200 shadow-2xs' 
                        : 'bg-stone-50/50 border-stone-200/60 opacity-60'
                    }`}
                  >
                    <div className="text-2xl mb-1">{ach.icon}</div>
                    <div className="font-extrabold text-xs text-[#1E1B4B] truncate">{ach.title}</div>
                    <div className="text-[10px] text-stone-500 font-medium truncate">{ach.description}</div>
                    <div className="mt-1 text-[9px] font-bold text-amber-600">
                      {isUnlocked ? '✓ Unlocked (+XP)' : `+${ach.xpReward} XP`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      ) : (
        /* Active Game Arena Container */
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-1">
            <button
              onClick={() => {
                setActiveGameId(null);
                refreshState();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 font-bold text-xs text-stone-700 shadow-2xs cursor-pointer transition-colors"
            >
              <span>← Back to Arcade Games</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-stone-500">
                Playing: <strong className="text-[#6C52EE]">{ARCADE_GAMES.find(g => g.id === activeGameId)?.title}</strong>
              </span>
            </div>
          </div>

          {/* Render Selected Interactive Game Component */}
          {activeGameId === 'hangul-match' && (
            <HangulMatchGame currentUser={currentUser} onFinish={refreshState} />
          )}

          {activeGameId === 'syllable-builder' && (
            <SyllableBuilderGame currentUser={currentUser} onFinish={refreshState} />
          )}

          {activeGameId === 'listen-pick' && (
            <ListenPickGame currentUser={currentUser} onFinish={refreshState} />
          )}

          {activeGameId === 'word-hunter' && (
            <WordHunterGame currentUser={currentUser} onFinish={refreshState} />
          )}

          {activeGameId === 'sentence-scramble' && (
            <SentenceScrambleGame currentUser={currentUser} onFinish={refreshState} />
          )}

          {activeGameId === 'memory-flip' && (
            <MemoryFlipGame currentUser={currentUser} onFinish={refreshState} />
          )}

          {activeGameId === 'pronunciation-challenge' && (
            <PronunciationChallengeGame currentUser={currentUser} onFinish={refreshState} />
          )}

          {activeGameId === 'korean-life-simulator' && (
            <KoreanLifeSimulatorGame currentUser={currentUser} onFinish={refreshState} />
          )}

          {activeGameId === 'boss-challenge' && (
            <BossChallengeGame currentUser={currentUser} onFinish={refreshState} />
          )}
        </div>
      )}

    </div>
  );
};

// =========================================================================
// GAME 1: HANGUL MATCH (Character & Sound Rapid Match)
// =========================================================================
const HangulMatchGame: React.FC<{ currentUser: UserProfile; onFinish: () => void }> = ({ currentUser, onFinish }) => {
  const QUESTIONS = [
    { char: 'ㅏ', sound: 'a', options: ['a', 'eo', 'o', 'u'], tip: 'Vertical vowel ㅏ is open like "ah".' },
    { char: 'ㅓ', sound: 'eo', options: ['u', 'eo', 'i', 'eu'], tip: 'ㅓ is deeper than ㅏ, sounds like "uh".' },
    { char: 'ㅗ', sound: 'o', options: ['o', 'u', 'a', 'i'], tip: 'ㅗ rounds lips into a tight circle.' },
    { char: 'ㅜ', sound: 'u', options: ['eu', 'o', 'u', 'eo'], tip: 'ㅜ puckers lips like a straw.' },
    { char: 'ㅡ', sound: 'eu', options: ['eu', 'i', 'a', 'o'], tip: 'ㅡ is pronounced with a wide grin.' },
    { char: 'ㅣ', sound: 'i', options: ['i', 'a', 'eo', 'u'], tip: 'ㅣ sounds like "ee" in "see".' },
    { char: 'ㄱ', sound: 'g / k', options: ['g / k', 'n', 'd / t', 'm'], tip: 'ㄱ depicts tongue blocking throat.' },
    { char: 'ㄴ', sound: 'n', options: ['r / l', 'n', 'b / p', 's'], tip: 'ㄴ depicts tongue touching upper gums.' },
    { char: 'ㅁ', sound: 'm', options: ['m', 'b / p', 's', 'ng'], tip: 'ㅁ depicts the closed mouth shape.' },
    { char: 'ㅅ', sound: 's', options: ['s', 'j', 'ch', 'h'], tip: 'ㅅ depicts the shape of a tooth.' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; explanation: string } | null>(null);
  const [streak, setStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const currentQ = QUESTIONS[currentIndex];

  const playCurrentSound = () => {
    speechService.speak(currentQ.char);
  };

  useEffect(() => {
    playCurrentSound();
  }, [currentIndex]);

  const handleSelect = (opt: string) => {
    if (feedback !== null) return;
    setSelectedOption(opt);
    const isCorrect = opt === currentQ.sound;

    if (isCorrect) {
      setScore(s => s + 1);
      setStreak(st => st + 1);
      setFeedback({ isCorrect: true, explanation: `Correct! ${currentQ.tip}` });
    } else {
      setStreak(0);
      setFeedback({ isCorrect: false, explanation: `Incorrect. "${currentQ.char}" sounds like "${currentQ.sound}". ${currentQ.tip}` });
      // Push to review queue
      storage.addReviewItem(currentUser.id, {
        type: 'pronunciation',
        korean: currentQ.char,
        english: `Hangul letter sound: ${currentQ.sound}`,
        romanization: currentQ.sound,
        hint: currentQ.tip
      });
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setFeedback(null);
    if (currentIndex + 1 < QUESTIONS.length) {
      setCurrentIndex(i => i + 1);
    } else {
      setGameOver(true);
      const finalScore = score + (feedback?.isCorrect ? 1 : 0);
      const accuracy = Math.round((finalScore / QUESTIONS.length) * 100);
      storage.recordArcadeScore(currentUser.id, 'hangul-match', finalScore, QUESTIONS.length, accuracy);
      onFinish();
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-lg max-w-xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div>
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Hangul Match • Question {currentIndex + 1} of {QUESTIONS.length}</span>
          <h2 className="text-base font-extrabold text-[#1E1B4B]">Identify the Sound</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs font-bold text-orange-500">
            <Flame className="w-4 h-4 fill-orange-400" />
            <span>{streak} combo</span>
          </div>
          <div className="px-3 py-1 rounded-xl bg-purple-50 text-[#6C52EE] font-extrabold text-xs">
            Score: {score}
          </div>
        </div>
      </div>

      {!gameOver ? (
        <div className="space-y-6">
          {/* Card Presentation */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#7C5CF6] via-[#6C52EE] to-[#553ACF] p-8 text-center text-white shadow-md">
            <div className="text-7xl font-black mb-3 select-none tracking-wider drop-shadow-sm">
              {currentQ.char}
            </div>
            <button
              type="button"
              onClick={playCurrentSound}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs transition-all cursor-pointer backdrop-blur-xs"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen Sound</span>
            </button>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3">
            {currentQ.options.map((opt) => {
              let btnStyle = 'bg-stone-50 hover:bg-purple-50 border-stone-200 text-[#1E1B4B]';
              if (selectedOption !== null) {
                if (opt === currentQ.sound) {
                  btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-700 font-black shadow-xs';
                } else if (opt === selectedOption) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-700 font-black';
                }
              }

              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelect(opt)}
                  disabled={feedback !== null}
                  className={`p-4 rounded-2xl border text-base font-extrabold transition-all cursor-pointer text-center ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Feedback Banner */}
          {feedback && (
            <div className={`p-4 rounded-2xl border text-xs font-semibold space-y-2 ${
              feedback.isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}>
              <div className="flex items-center gap-2 font-extrabold text-sm">
                {feedback.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />}
                <span>{feedback.isCorrect ? 'Excellent!' : 'Keep Learning!'}</span>
              </div>
              <p>{feedback.explanation}</p>
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-2.5 rounded-xl bg-[#6C52EE] text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
              >
                {currentIndex + 1 < QUESTIONS.length ? 'Next Question →' : 'Complete Challenge'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-100 mx-auto flex items-center justify-center text-3xl">
            🏆
          </div>
          <h3 className="text-xl font-black text-[#1E1B4B]">Challenge Completed!</h3>
          <p className="text-xs text-stone-500">
            You scored <strong>{score}</strong> out of {QUESTIONS.length} ({Math.round((score/QUESTIONS.length)*100)}%).
          </p>
          <div className="p-3 bg-purple-50 text-[#6C52EE] rounded-2xl font-bold text-xs inline-block">
            +10 XP Awarded to your profile!
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setScore(0);
                setSelectedOption(null);
                setFeedback(null);
                setGameOver(false);
              }}
              className="px-6 py-2.5 rounded-xl bg-[#6C52EE] text-white font-extrabold text-xs shadow-md"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// GAME 2: SYLLABLE BUILDER (Consonant + Vowel + Batchim Assembly)
// =========================================================================
const SyllableBuilderGame: React.FC<{ currentUser: UserProfile; onFinish: () => void }> = ({ currentUser, onFinish }) => {
  const INITIALS = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅎ'];
  const MEDIALS = ['ㅏ', 'ㅓ', 'ㅗ', 'ㅜ', 'ㅡ', 'ㅣ', 'ㅐ', 'ㅔ'];
  const FINALS = ['', 'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅇ'];

  const REAL_WORDS: Record<string, string> = {
    '밥': 'Cooked Rice / Meal',
    '물': 'Water',
    '달': 'Moon / Month',
    '손': 'Hand',
    '눈': 'Eye / Snow',
    '산': 'Mountain',
    '말': 'Speech / Horse',
    '곰': 'Bear',
    '봄': 'Spring Season',
    '집': 'House / Home',
    '길': 'Road / Street',
    '밤': 'Night / Chestnut',
    '발': 'Foot',
    '강': 'River',
    '별': 'Star',
    '국': 'Soup'
  };

  const [selectedInitial, setSelectedInitial] = useState(0);
  const [selectedMedial, setSelectedMedial] = useState(0);
  const [selectedFinal, setSelectedFinal] = useState(0);
  const [builtWords, setBuiltWords] = useState<string[]>([]);
  const [xpNotice, setXpNotice] = useState<string | null>(null);

  // Compute Unicode Korean Syllable: 0xAC00 + (initial * 21 * 28) + (medial * 28) + final
  const syllableCode = 0xAC00 + (selectedInitial * 21 * 28) + (selectedMedial * 28) + selectedFinal;
  const currentSyllable = String.fromCharCode(syllableCode);
  const isRealWord = Boolean(REAL_WORDS[currentSyllable]);
  const meaning = REAL_WORDS[currentSyllable];

  const playSyllable = () => {
    speechService.speak(currentSyllable);
  };

  const handleSaveWord = () => {
    if (isRealWord && !builtWords.includes(currentSyllable)) {
      const updated = [...builtWords, currentSyllable];
      setBuiltWords(updated);
      storage.addXP(currentUser.id, 5, `Built syllable word: ${currentSyllable}`);
      setXpNotice(`+5 XP for discovering real Korean word "${currentSyllable}" (${meaning})!`);
      setTimeout(() => setXpNotice(null), 3000);

      if (updated.length >= 5) {
        storage.unlockAchievement(currentUser.id, 'syllable-architect');
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-lg max-w-xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div>
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Hangul Assembly Lab</span>
          <h2 className="text-base font-extrabold text-[#1E1B4B]">Syllable Builder</h2>
        </div>
        <div className="px-3 py-1 rounded-xl bg-orange-50 text-orange-600 font-extrabold text-xs">
          Discovered: {builtWords.length} words
        </div>
      </div>

      {/* Assembly Canvas */}
      <div className="rounded-3xl bg-gradient-to-br from-[#FF5CA8] via-[#FF7844] to-[#FFA800] p-6 text-center text-white shadow-md relative">
        <div className="text-8xl font-black mb-2 select-none drop-shadow-sm font-sans">
          {currentSyllable}
        </div>

        <div className="flex items-center justify-center gap-2 mb-3">
          <button
            type="button"
            onClick={playSyllable}
            className="px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs transition-all backdrop-blur-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>Pronounce Block</span>
          </button>
        </div>

        {isRealWord ? (
          <div className="inline-block bg-white/90 text-stone-900 px-4 py-1.5 rounded-full text-xs font-extrabold shadow-sm">
            ✨ Real Word: <strong>{meaning}</strong>
          </div>
        ) : (
          <div className="text-xs text-white/80 font-medium">
            Phonetically valid syllable (combining {INITIALS[selectedInitial]} + {MEDIALS[selectedMedial]} {FINALS[selectedFinal] ? `+ ${FINALS[selectedFinal]}` : ''})
          </div>
        )}
      </div>

      {xpNotice && (
        <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl text-xs font-bold text-center border border-emerald-200">
          {xpNotice}
        </div>
      )}

      {/* Character Selectors */}
      <div className="space-y-4">
        {/* Initial Consonant (초성) */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-extrabold text-stone-500 uppercase tracking-wider">
            1. Initial Consonant (초성)
          </label>
          <div className="flex flex-wrap gap-1.5">
            {INITIALS.map((con, idx) => (
              <button
                key={con}
                type="button"
                onClick={() => setSelectedInitial(idx)}
                className={`w-9 h-9 rounded-xl font-black text-sm transition-all cursor-pointer ${
                  selectedInitial === idx 
                    ? 'bg-[#6C52EE] text-white shadow-sm scale-105' 
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200/80'
                }`}
              >
                {con}
              </button>
            ))}
          </div>
        </div>

        {/* Medial Vowel (중성) */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-extrabold text-stone-500 uppercase tracking-wider">
            2. Medial Vowel (중성)
          </label>
          <div className="flex flex-wrap gap-1.5">
            {MEDIALS.map((vow, idx) => (
              <button
                key={vow}
                type="button"
                onClick={() => setSelectedMedial(idx)}
                className={`w-9 h-9 rounded-xl font-black text-sm transition-all cursor-pointer ${
                  selectedMedial === idx 
                    ? 'bg-[#FF5CA8] text-white shadow-sm scale-105' 
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200/80'
                }`}
              >
                {vow}
              </button>
            ))}
          </div>
        </div>

        {/* Final Consonant / Batchim (종성) */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-extrabold text-stone-500 uppercase tracking-wider">
            3. Final Consonant / Batchim (종성) - Optional
          </label>
          <div className="flex flex-wrap gap-1.5">
            {FINALS.map((fin, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedFinal(idx)}
                className={`w-9 h-9 rounded-xl font-black text-sm transition-all cursor-pointer ${
                  selectedFinal === idx 
                    ? 'bg-[#FF8A00] text-white shadow-sm scale-105' 
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200/80'
                }`}
              >
                {fin || 'None'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isRealWord && (
        <button
          type="button"
          onClick={handleSaveWord}
          className="w-full py-3 rounded-2xl bg-[#6C52EE] hover:bg-[#5839DE] text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
        >
          {builtWords.includes(currentSyllable) ? 'Word Already In Collection ✓' : `Save "${currentSyllable}" to My Word Collection (+5 XP)`}
        </button>
      )}
    </div>
  );
};

// =========================================================================
// GAME 3: LISTEN & PICK (Auditory Comprehension)
// =========================================================================
const ListenPickGame: React.FC<{ currentUser: UserProfile; onFinish: () => void }> = ({ currentUser, onFinish }) => {
  const AUDITORY_ITEMS = [
    { phrase: '안녕하세요', english: 'Hello / Good day', options: ['안녕하세요', '감사합니다', '안녕히 가세요', '죄송합니다'] },
    { phrase: '감사합니다', english: 'Thank you very much', options: ['천만에요', '감사합니다', '미안해요', '잘 가요'] },
    { phrase: '물 좀 주세요', english: 'Please give me water', options: ['물 좀 주세요', '밥 좀 주세요', '커피 주세요', '차 주세요'] },
    { phrase: '한국어 공부해요', english: 'I study Korean', options: ['한국어 공부해요', '영어 공부해요', '운동해요', '책을 읽어요'] },
    { phrase: '어디에 가요?', english: 'Where are you going?', options: ['뭐 먹어요?', '어디에 가요?', '누구 만나요?', '몇 시예요?'] }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const item = AUDITORY_ITEMS[currentIdx];

  const playPhrase = () => {
    speechService.speak(item.phrase);
  };

  useEffect(() => {
    playPhrase();
  }, [currentIdx]);

  const handlePick = (opt: string) => {
    if (revealed) return;
    setSelected(opt);
    setRevealed(true);
    if (opt === item.phrase) {
      setScore(s => s + 1);
    } else {
      storage.addReviewItem(currentUser.id, {
        type: 'listening',
        korean: item.phrase,
        english: item.english
      });
    }
  };

  const handleNext = () => {
    setSelected(null);
    setRevealed(false);
    if (currentIdx + 1 < AUDITORY_ITEMS.length) {
      setCurrentIdx(i => i + 1);
    } else {
      const finalScore = score + (selected === item.phrase ? 1 : 0);
      storage.recordArcadeScore(currentUser.id, 'listen-pick', finalScore, AUDITORY_ITEMS.length, Math.round((finalScore/AUDITORY_ITEMS.length)*100));
      onFinish();
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-lg max-w-xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div>
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Listening Lab • Round {currentIdx + 1} of {AUDITORY_ITEMS.length}</span>
          <h2 className="text-base font-extrabold text-[#1E1B4B]">Listen & Pick</h2>
        </div>
        <div className="px-3 py-1 rounded-xl bg-cyan-50 text-[#0284C7] font-extrabold text-xs">
          Score: {score}
        </div>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-[#38BDF8] via-[#0284C7] to-[#0369A1] p-8 text-center text-white shadow-md">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center text-3xl mb-3 cursor-pointer hover:scale-105 transition-transform" onClick={playPhrase}>
          <Volume2 className="w-8 h-8" />
        </div>
        <p className="text-sm font-extrabold">Tap to Listen Again</p>
        <span className="text-[11px] text-cyan-100">Listen closely to the Korean words</span>
      </div>

      <div className="space-y-2.5">
        {item.options.map((opt) => {
          let style = 'bg-stone-50 hover:bg-cyan-50 border-stone-200 text-stone-800';
          if (revealed) {
            if (opt === item.phrase) {
              style = 'bg-emerald-50 border-emerald-400 text-emerald-800 font-black';
            } else if (opt === selected) {
              style = 'bg-rose-50 border-rose-400 text-rose-800';
            }
          }

          return (
            <button
              key={opt}
              type="button"
              onClick={() => handlePick(opt)}
              disabled={revealed}
              className={`w-full p-3.5 rounded-2xl border text-sm font-extrabold transition-all text-left flex items-center justify-between cursor-pointer ${style}`}
            >
              <span>{opt}</span>
              {revealed && opt === item.phrase && (
                <span className="text-xs text-emerald-600 font-bold">{item.english}</span>
              )}
            </button>
          );
        })}
      </div>

      {revealed && (
        <button
          type="button"
          onClick={handleNext}
          className="w-full py-3 rounded-2xl bg-[#0284C7] text-white font-extrabold text-xs shadow-md"
        >
          {currentIdx + 1 < AUDITORY_ITEMS.length ? 'Next Listening Question →' : 'Finish Challenge'}
        </button>
      )}
    </div>
  );
};

// =========================================================================
// GAME 4: WORD HUNTER (Fast-Paced Vocabulary Acquisition)
// =========================================================================
const WordHunterGame: React.FC<{ currentUser: UserProfile; onFinish: () => void }> = ({ currentUser, onFinish }) => {
  const VOCAB_HUNTER = [
    { target: '사과', english: 'Apple', options: ['사과', '바나나', '포도', '딸기'], icon: '🍎' },
    { target: '친구', english: 'Friend', options: ['선생님', '친구', '학생', '가족'], icon: '🤝' },
    { target: '학교', english: 'School', options: ['병원', '도서관', '학교', '식당'], icon: '🏫' },
    { target: '고양이', english: 'Cat', options: ['강아지', '고양이', '토끼', '호랑이'], icon: '🐱' },
    { target: '물', english: 'Water', options: ['우유', '차', '커피', '물'], icon: '💧' }
  ];

  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const cur = VOCAB_HUNTER[idx];

  const handleChoose = (opt: string) => {
    if (feedback) return;
    if (opt === cur.target) {
      setScore(s => s + 1);
      setFeedback('correct');
      speechService.speak(cur.target);
    } else {
      setFeedback('incorrect');
      storage.addReviewItem(currentUser.id, {
        type: 'vocabulary',
        korean: cur.target,
        english: cur.english
      });
    }

    setTimeout(() => {
      setFeedback(null);
      if (idx + 1 < VOCAB_HUNTER.length) {
        setIdx(i => i + 1);
      } else {
        storage.recordArcadeScore(currentUser.id, 'word-hunter', score + 1, VOCAB_HUNTER.length, 100);
        onFinish();
      }
    }, 1200);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-lg max-w-xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div>
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Word Hunter • {idx + 1} of {VOCAB_HUNTER.length}</span>
          <h2 className="text-base font-extrabold text-[#1E1B4B]">Hunt the Korean Word</h2>
        </div>
        <div className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-600 font-extrabold text-xs">
          Score: {score}
        </div>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-[#22C55E] to-[#15803D] p-8 text-center text-white shadow-md">
        <div className="text-5xl mb-2">{cur.icon}</div>
        <h3 className="text-2xl font-black">{cur.english}</h3>
        <p className="text-xs text-emerald-100">Select the matching Korean word</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {cur.options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => handleChoose(opt)}
            className="p-4 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-emerald-50 text-base font-extrabold text-[#1E1B4B] hover:text-emerald-700 transition-all cursor-pointer text-center"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// GAME 5: SENTENCE SCRAMBLE (Korean Syntax & Particles)
// =========================================================================
const SentenceScrambleGame: React.FC<{ currentUser: UserProfile; onFinish: () => void }> = ({ currentUser, onFinish }) => {
  const SCRAMBLES = [
    {
      words: ['저는', '도서관에서', '공부해요'],
      correctOrder: ['저는', '도서관에서', '공부해요'],
      translation: 'I study at the library.',
      grammarTip: 'Subject (저는) + Place (도서관에서) + Verb (공부해요)'
    },
    {
      words: ['마셔요', '커피를', '친구가'],
      correctOrder: ['친구가', '커피를', '마셔요'],
      translation: 'My friend drinks coffee.',
      grammarTip: 'Subject (친구가) + Object (커피를) + Verb (마셔요)'
    },
    {
      words: ['한국어를', '열심히', '배워요', '우리는'],
      correctOrder: ['우리는', '한국어를', '열심히', '배워요'],
      translation: 'We study Korean diligently.',
      grammarTip: 'Subject (우리는) + Object (한국어를) + Adverb (열심히) + Verb (배워요)'
    }
  ];

  const [currentRound, setCurrentRound] = useState(0);
  const [assembled, setAssembled] = useState<string[]>([]);
  const [bank, setBank] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const q = SCRAMBLES[currentRound];

  useEffect(() => {
    // Shuffle words for bank
    const shuffled = [...q.words].sort(() => Math.random() - 0.5);
    setBank(shuffled);
    setAssembled([]);
    setIsCorrect(null);
  }, [currentRound]);

  const handlePickWord = (word: string, indexInBank: number) => {
    setAssembled([...assembled, word]);
    const updated = [...bank];
    updated.splice(indexInBank, 1);
    setBank(updated);
  };

  const handleRemoveWord = (word: string, indexInAssembled: number) => {
    const updated = [...assembled];
    updated.splice(indexInAssembled, 1);
    setAssembled(updated);
    setBank([...bank, word]);
  };

  const checkOrder = () => {
    const isMatch = assembled.join(' ') === q.correctOrder.join(' ');
    setIsCorrect(isMatch);
    if (isMatch) {
      speechService.speak(assembled.join(' '));
      storage.addXP(currentUser.id, 10, 'Solved Sentence Scramble');
    }
  };

  const nextSentence = () => {
    if (currentRound + 1 < SCRAMBLES.length) {
      setCurrentRound(r => r + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-lg max-w-xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div>
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Sentence Builder • {currentRound + 1} of {SCRAMBLES.length}</span>
          <h2 className="text-base font-extrabold text-[#1E1B4B]">Sentence Scramble</h2>
        </div>
      </div>

      <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 text-center">
        <p className="text-xs text-stone-500 font-bold mb-1">Target English Sentence:</p>
        <h3 className="text-lg font-black text-[#2C1E6D]">"{q.translation}"</h3>
      </div>

      {/* Assembly Zone */}
      <div className="p-5 rounded-2xl border-2 border-dashed border-purple-200 min-h-20 flex flex-wrap items-center gap-2 bg-[#FAF9FE]">
        {assembled.length === 0 ? (
          <span className="text-xs text-stone-400 font-medium">Tap words below in Korean SOV order...</span>
        ) : (
          assembled.map((w, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleRemoveWord(w, idx)}
              className="px-3.5 py-2 rounded-xl bg-[#6C52EE] text-white font-extrabold text-sm shadow-xs cursor-pointer"
            >
              {w}
            </button>
          ))
        )}
      </div>

      {/* Word Bank */}
      <div className="space-y-2">
        <label className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider">Word Bank</label>
        <div className="flex flex-wrap gap-2">
          {bank.map((w, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handlePickWord(w, idx)}
              className="px-4 py-2 rounded-xl bg-white border border-stone-300 hover:border-[#6C52EE] font-bold text-sm text-[#1E1B4B] shadow-2xs transition-all cursor-pointer"
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {isCorrect === null ? (
        <button
          type="button"
          onClick={checkOrder}
          disabled={assembled.length === 0}
          className="w-full py-3 rounded-2xl bg-[#6C52EE] disabled:opacity-50 text-white font-extrabold text-xs shadow-md"
        >
          Check Sentence Structure
        </button>
      ) : isCorrect ? (
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 space-y-2">
          <div className="font-extrabold text-sm flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Correct SOV Word Order!</span>
          </div>
          <p className="text-xs">{q.grammarTip}</p>
          <button
            type="button"
            onClick={nextSentence}
            className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs"
          >
            {currentRound + 1 < SCRAMBLES.length ? 'Next Sentence →' : 'Complete Challenge'}
          </button>
        </div>
      ) : (
        <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-rose-800 space-y-2">
          <div className="font-extrabold text-sm flex items-center gap-1.5">
            <XCircle className="w-4 h-4 text-rose-600" />
            <span>Not quite right yet</span>
          </div>
          <p className="text-xs">Remember: Korean verbs must go at the very end of the sentence!</p>
          <button
            type="button"
            onClick={() => {
              setBank([...SCRAMBLES[currentRound].words].sort(() => Math.random() - 0.5));
              setAssembled([]);
              setIsCorrect(null);
            }}
            className="w-full py-2.5 rounded-xl bg-stone-700 text-white font-extrabold text-xs"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// GAME 6: MEMORY FLIP (Card Matching Grid)
// =========================================================================
const MemoryFlipGame: React.FC<{ currentUser: UserProfile; onFinish: () => void }> = ({ currentUser, onFinish }) => {
  const PAIRS = [
    { id: '1', text: '친구', matchId: '1m', isKorean: true },
    { id: '1m', text: 'Friend', matchId: '1', isKorean: false },
    { id: '2', text: '학교', matchId: '2m', isKorean: true },
    { id: '2m', text: 'School', matchId: '2', isKorean: false },
    { id: '3', text: '사랑', matchId: '3m', isKorean: true },
    { id: '3m', text: 'Love', matchId: '3', isKorean: false },
    { id: '4', text: '감사', matchId: '4m', isKorean: true },
    { id: '4m', text: 'Gratitude', matchId: '4', isKorean: false }
  ];

  const [cards, setCards] = useState(() => [...PAIRS].sort(() => Math.random() - 0.5));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);

  const handleFlip = (idx: number) => {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(cards[idx].id)) return;

    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const card1 = cards[newFlipped[0]];
      const card2 = cards[newFlipped[1]];

      if (card1.matchId === card2.id) {
        setMatched([...matched, card1.id, card2.id]);
        setFlipped([]);
        if (card1.isKorean) speechService.speak(card1.text);
        else if (card2.isKorean) speechService.speak(card2.text);

        if (matched.length + 2 === cards.length) {
          storage.addXP(currentUser.id, 15, 'Completed Memory Flip Game');
          onFinish();
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-lg max-w-xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div>
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Memory Match</span>
          <h2 className="text-base font-extrabold text-[#1E1B4B]">Memory Flip</h2>
        </div>
        <div className="text-xs font-bold text-stone-500">
          Moves: <strong className="text-amber-600">{moves}</strong>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {cards.map((card, idx) => {
          const isRevealed = flipped.includes(idx) || matched.includes(card.id);
          return (
            <div
              key={card.id}
              onClick={() => handleFlip(idx)}
              className={`h-24 rounded-2xl flex items-center justify-center font-extrabold text-sm transition-all cursor-pointer select-none text-center p-2 shadow-2xs ${
                isRevealed 
                  ? 'bg-amber-100/80 border-2 border-amber-400 text-[#1E1B4B] scale-98' 
                  : 'bg-gradient-to-br from-[#6C52EE] to-[#553ACF] text-white hover:opacity-90'
              }`}
            >
              {isRevealed ? card.text : '🌸'}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// =========================================================================
// GAME 7: PRONUNCIATION CHALLENGE (Voice Practice)
// =========================================================================
const PronunciationChallengeGame: React.FC<{ currentUser: UserProfile; onFinish: () => void }> = ({ currentUser, onFinish }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedFeedback, setRecordedFeedback] = useState<number | null>(null);

  const phrase = '안녕하세요';
  const pronunciation = 'an-nyeong-ha-se-yo';

  const handleListen = () => {
    speechService.speak(phrase);
  };

  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordedFeedback(null);
      // Simulate speech evaluation
      setTimeout(() => {
        setIsRecording(false);
        const score = Math.floor(85 + Math.random() * 14); // 85 - 98%
        setRecordedFeedback(score);
        storage.addXP(currentUser.id, 10, 'Pronunciation Challenge Completed');
        onFinish();
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-lg max-w-xl mx-auto space-y-6 text-center">
      <div>
        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Voice Articulation</span>
        <h2 className="text-base font-extrabold text-[#1E1B4B]">Pronunciation Challenge</h2>
      </div>

      <div className="p-8 rounded-3xl bg-indigo-50 border border-indigo-100 space-y-3">
        <h3 className="text-4xl font-black text-[#1E1B4B]">{phrase}</h3>
        <p className="text-xs font-mono font-bold text-indigo-600">{pronunciation}</p>
        <button
          onClick={handleListen}
          className="px-4 py-2 rounded-full bg-white text-indigo-700 font-extrabold text-xs shadow-xs hover:bg-indigo-100 inline-flex items-center gap-1.5"
        >
          <Volume2 className="w-4 h-4" />
          <span>Listen Native Model</span>
        </button>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleToggleRecord}
          className={`px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2 cursor-pointer ${
            isRecording 
              ? 'bg-rose-500 text-white animate-pulse' 
              : 'bg-[#6C52EE] text-white hover:bg-[#5839DE]'
          }`}
        >
          <Mic className="w-4 h-4" />
          <span>{isRecording ? 'Listening... Speak Now' : 'Tap to Record Voice'}</span>
        </button>

        {recordedFeedback && (
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 space-y-1">
            <div className="text-xl font-black">Pronunciation Match: {recordedFeedback}%</div>
            <p className="text-xs">Natural intonation and vowel clarity confirmed! (+10 XP)</p>
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// GAME 8: KOREAN LIFE SIMULATOR (Dialogue Scenarios)
// =========================================================================
const KoreanLifeSimulatorGame: React.FC<{ currentUser: UserProfile; onFinish: () => void }> = ({ currentUser, onFinish }) => {
  const [step, setStep] = useState(0);

  const DIALOGUE = [
    {
      setting: 'Insadong Café, Seoul',
      speaker: 'Barista (바리스타)',
      avatar: '☕',
      speech: '어서 오세요! 주문하시겠어요?',
      english: 'Welcome! Would you like to order?',
      options: [
        { text: '아이스 아메리카노 한 잔 주세요.', polite: true, feedback: 'Perfect polite order! Standard Korean phrasing.' },
        { text: '커피 줘.', polite: false, feedback: 'Too casual (반말) for a café cashier!' }
      ]
    },
    {
      setting: 'Barista preparing beverage',
      speaker: 'Barista (바리스타)',
      avatar: '☕',
      speech: '여기서 드세요, 테이크아웃 하세요?',
      english: 'For here, or to take out?',
      options: [
        { text: '포장해 주세요.', polite: true, feedback: 'Natural phrase for takeout!' },
        { text: '마실 거야.', polite: false, feedback: 'Unnatural phrasing.' }
      ]
    }
  ];

  const currentScenario = DIALOGUE[step];

  const handleOption = (opt: any) => {
    if (opt.polite) {
      storage.addXP(currentUser.id, 15, 'Completed Life Simulator Scenario');
      if (step + 1 < DIALOGUE.length) {
        setStep(s => s + 1);
      } else {
        storage.unlockAchievement(currentUser.id, 'conversation-starter');
        onFinish();
      }
    } else {
      alert(opt.feedback);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-lg max-w-xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div>
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{currentScenario.setting}</span>
          <h2 className="text-base font-extrabold text-[#1E1B4B]">Korean Life Simulator</h2>
        </div>
      </div>

      {/* Speech bubble */}
      <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-2xl border border-teal-100">
        <div className="w-12 h-12 rounded-full bg-teal-200 flex items-center justify-center text-2xl shrink-0">
          {currentScenario.avatar}
        </div>
        <div className="space-y-1">
          <div className="text-xs font-bold text-teal-800">{currentScenario.speaker}</div>
          <div className="text-lg font-black text-[#1E1B4B]">{currentScenario.speech}</div>
          <div className="text-xs text-stone-500 font-medium">{currentScenario.english}</div>
        </div>
      </div>

      {/* Dialogue choices */}
      <div className="space-y-2.5">
        <label className="text-[11px] font-extrabold text-stone-500 uppercase tracking-wider">Choose your response:</label>
        {currentScenario.options.map((opt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleOption(opt)}
            className="w-full p-4 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-teal-50 text-left font-bold text-sm text-[#1E1B4B] transition-all cursor-pointer"
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// GAME 9: BOSS CHALLENGE (End-of-Unit Mastery Assessment)
// =========================================================================
const BossChallengeGame: React.FC<{ currentUser: UserProfile; onFinish: () => void }> = ({ currentUser, onFinish }) => {
  const [bossHP, setBossHP] = useState(100);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const BOSS_QUESTIONS = [
    { q: 'What is the correct object marker for 물 (water)?', options: ['을', '를', '이', '은'], ans: '을' },
    { q: 'Which vowel sounds like "uh" with mouth open moderately?', options: ['ㅓ', 'ㅗ', 'ㅏ', 'ㅜ'], ans: 'ㅓ' },
    { q: 'What is the past tense of 보다 (to see)?', options: ['봤어요', '보았어요', '보했어요', '볼 거예요'], ans: '봤어요' },
    { q: 'What does "감사합니다" mean?', options: ['Thank you', 'Hello', 'Goodbye', 'Sorry'], ans: 'Thank you' },
    { q: 'In Korean word order, where does the main verb go?', options: ['At the very end', 'At the start', 'In the middle', 'Anywhere'], ans: 'At the very end' }
  ];

  const currentQ = BOSS_QUESTIONS[qIndex];

  const handleAnswer = (opt: string) => {
    const isRight = opt === currentQ.ans;
    if (isRight) {
      setBossHP(hp => Math.max(0, hp - 20));
      setScore(s => s + 1);
    }

    if (qIndex + 1 < BOSS_QUESTIONS.length) {
      setQIndex(i => i + 1);
    } else {
      setFinished(true);
      const passed = (score + (isRight ? 1 : 0)) >= 4; // 80% passing
      storage.recordBossResult(currentUser.id, 'unit-1', score + (isRight ? 1 : 0), passed);
      onFinish();
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-lg max-w-xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div>
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Unit Mastery Exam</span>
          <h2 className="text-base font-extrabold text-[#1E1B4B]">Boss Challenge</h2>
        </div>
      </div>

      {/* Boss Health Bar */}
      <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-center space-y-2">
        <div className="flex items-center justify-between text-xs font-black text-rose-800">
          <span>🐉 Unit Boss Guardian</span>
          <span>{bossHP}% HP</span>
        </div>
        <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden">
          <div className="h-full bg-rose-500 rounded-full transition-all duration-500" style={{ width: `${bossHP}%` }} />
        </div>
      </div>

      {!finished ? (
        <div className="space-y-4">
          <h3 className="text-base font-black text-[#1E1B4B]">{currentQ.q}</h3>
          <div className="grid grid-cols-2 gap-3">
            {currentQ.options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleAnswer(opt)}
                className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-rose-50 font-bold text-sm text-[#1E1B4B] cursor-pointer"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-4 space-y-3">
          <div className="text-4xl">{bossHP <= 20 ? '🎉' : '🛡️'}</div>
          <h3 className="text-xl font-black text-[#1E1B4B]">
            {bossHP <= 20 ? 'Boss Defeated! Unit Mastered!' : 'Challenge Completed!'}
          </h3>
          <p className="text-xs text-stone-500">
            {bossHP <= 20 
              ? 'Congratulations! You achieved an 80%+ mastery score on this unit.' 
              : 'Review your missed topics in My Review Room and challenge the boss again!'}
          </p>
        </div>
      )}
    </div>
  );
};
