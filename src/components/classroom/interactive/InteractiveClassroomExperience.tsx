import React, { useState, useEffect } from 'react';
import { Lesson, UserProfile } from '../../../types';
import { 
  BASIC_VOWELS_INTERACTIVE_DATA, 
  VOWEL_LISTENING_QUESTIONS, 
  VOWEL_WRITING_TARGETS, 
  INITIAL_VOWEL_OBJECTIVES 
} from '../../../data/vowelsInteractiveData';
import { KoreanAudioPlayer } from './KoreanAudioPlayer';
import { HangulCharacterCard, CharacterItemData } from './HangulCharacterCard';
import { VoiceRecorder } from './VoiceRecorder';
import { MouthPositionGuide } from './MouthPositionGuide';
import { ListeningExercise } from './ListeningExercise';
import { ListenAndRepeatStudio } from './ListenAndRepeatStudio';
import { HangulWritingCanvas } from './HangulWritingCanvas';
import { SyllableBuilderActivity } from './SyllableBuilderActivity';
import { LearningObjectiveChecklist, InteractiveObjective } from './LearningObjectiveChecklist';
import { LessonAssignmentPortal } from './LessonAssignmentPortal';
import { 
  BookOpen, 
  Sparkles, 
  Headphones, 
  PenTool, 
  Layers, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Globe,
  ArrowRight,
  ArrowLeft,
  RotateCcw
} from 'lucide-react';

interface InteractiveClassroomExperienceProps {
  currentLesson: Lesson;
  currentUser: UserProfile;
  onLessonMastered: (lessonId: string) => void;
}

const buildObjectivesForLesson = (lesson: Lesson): InteractiveObjective[] => {
  if (lesson.id === 'lesson-pre-a1-1') {
    return INITIAL_VOWEL_OBJECTIVES.map(o => ({ ...o, isCompleted: false }));
  }
  return (lesson.objectives || []).map((text, idx) => ({
    id: `obj-${idx + 1}`,
    title: text,
    isCompleted: false
  }));
};

export const InteractiveClassroomExperience: React.FC<InteractiveClassroomExperienceProps> = ({
  currentLesson,
  currentUser,
  onLessonMastered
}) => {
  const isBasicVowelsLesson = currentLesson.id === 'lesson-pre-a1-1';

  // Streamlined 6-step Studio Navigation
  const [activeStudioTab, setActiveStudioTab] = useState<
    'vowels-studio' | 'listen-identify' | 'listen-repeat' | 'writing' | 'syllable-builder' | 'knowledge-check'
  >('vowels-studio');

  // Interactive Checklist State synced to currentLesson
  const [objectives, setObjectives] = useState<InteractiveObjective[]>(() => buildObjectivesForLesson(currentLesson));

  // Character Card Selection State (starts at 0 mastered on clean start)
  const [selectedCharItem, setSelectedCharItem] = useState<CharacterItemData>(
    BASIC_VOWELS_INTERACTIVE_DATA[0]
  );
  const [masteredChars, setMasteredChars] = useState<string[]>([]);

  // Active speech target for non-vowel lessons
  const [customVoiceTarget, setCustomVoiceTarget] = useState<{
    korean: string;
    romanization: string;
    english: string;
  } | null>(null);

  // Expandable Introduction / Philosophy Sections
  const [philosophyExpanded, setPhilosophyExpanded] = useState(true);
  const [placementRuleExpanded, setPlacementRuleExpanded] = useState(false);
  const [filipinoNotesExpanded, setFilipinoNotesExpanded] = useState(currentUser.filipinoSupport);

  // Interactive Exercises State (for currentLesson.interactiveExercises)
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<string, string>>({});
  const [exerciseChecked, setExerciseChecked] = useState<Record<string, boolean>>({});

  // Knowledge Check Questions State
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [quizChecked, setQuizChecked] = useState(false);
  const [quizError, setQuizError] = useState<string | null>(null);

  // Reset per-lesson states when switching lessons
  useEffect(() => {
    setObjectives(buildObjectivesForLesson(currentLesson));
    setActiveStudioTab('vowels-studio');
    setAnswers({});
    setQuizChecked(false);
    setQuizError(null);
    setExerciseAnswers({});
    setExerciseChecked({});
    if (currentLesson.koreanExamples && currentLesson.koreanExamples.length > 0) {
      const firstEx = currentLesson.koreanExamples[0];
      setCustomVoiceTarget({
        korean: firstEx.korean,
        romanization: firstEx.pronunciation || firstEx.korean,
        english: firstEx.english
      });
    } else {
      setCustomVoiceTarget(null);
    }
  }, [currentLesson.id]);

  const toggleObjective = (id: string) => {
    setObjectives(prev => prev.map(o => o.id === id ? { ...o, isCompleted: !o.isCompleted } : o));
  };

  const markObjectiveDone = (id: string) => {
    setObjectives(prev => prev.map(o => o.id === id ? { ...o, isCompleted: true } : o));
  };

  const toggleCharMastered = (char: string) => {
    if (masteredChars.includes(char)) {
      setMasteredChars(prev => prev.filter(c => c !== char));
    } else {
      const updated = [...masteredChars, char];
      setMasteredChars(updated);
      if (updated.length >= 8) {
        markObjectiveDone('obj-1');
      }
    }
  };

  const handleSelectChar = (item: CharacterItemData) => {
    setSelectedCharItem(item);
    setCustomVoiceTarget(null);
  };

  const handleQuizAnswer = (qId: string, optIdx: number) => {
    if (quizChecked) return;
    setQuizError(null);
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. LEARNING OBJECTIVES CHECKLIST (Interactive & Tracked) */}
      <LearningObjectiveChecklist
        objectives={objectives}
        onToggleObjective={toggleObjective}
      />

      {/* 2. DYNAMIC LESSON INTRODUCTION, CORE EXPLANATION & HANGUL PHILOSOPHY */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div>
            <span className="text-[10px] uppercase font-mono font-bold text-academy-gold-dark tracking-wider block">
              {isBasicVowelsLesson ? 'Origin of the Script (훈민정음 원리)' : `Core Academic Lecture • ${currentLesson.koreanTitle}`}
            </span>
            <h3 className="font-serif font-bold text-lg text-academy-navy mt-0.5">
              {isBasicVowelsLesson ? 'The Three Philosophical Elements of Hangul Vowels' : currentLesson.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setPhilosophyExpanded(!philosophyExpanded)}
            className="p-1.5 rounded-lg text-stone-500 hover:text-academy-navy hover:bg-stone-100 transition-colors"
            aria-label={philosophyExpanded ? 'Collapse lecture section' : 'Expand lecture section'}
          >
            {philosophyExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {philosophyExpanded && (
          <div className="space-y-4 pt-1 text-xs">
            {/* Dynamic Lesson Introduction & Core Explanation */}
            <div className="space-y-2.5 bg-stone-50/70 p-4 rounded-xl border border-stone-200">
              <p className="text-stone-800 font-medium leading-relaxed">
                {currentLesson.introduction}
              </p>
              {currentLesson.explanation && (
                <p className="text-stone-700 leading-relaxed pt-2 border-t border-stone-200/80">
                  {currentLesson.explanation}
                </p>
              )}
            </div>

            {/* Optional Filipino Linguistic Bridge (Clearly Labeled as Approximation) */}
            {currentLesson.filipinoNotes && (
              <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-900">
                    <Globe className="w-3.5 h-3.5 text-indigo-600" />
                    Optional Filipino / Tagalog Linguistic Comparison (Approximation Only)
                  </span>
                  <button
                    type="button"
                    onClick={() => setFilipinoNotesExpanded(!filipinoNotesExpanded)}
                    className="text-[10px] font-bold text-indigo-700 hover:underline"
                  >
                    {filipinoNotesExpanded ? 'Hide Note' : 'Show Note'}
                  </button>
                </div>
                {filipinoNotesExpanded && (
                  <p className="text-[11px] text-indigo-950 leading-relaxed">
                    {currentLesson.filipinoNotes}
                  </p>
                )}
              </div>
            )}

            {/* The 3 Core Elements Grid (Shown on Basic Vowels Lesson 1) */}
            {isBasicVowelsLesson && (
              <>
                <p className="text-stone-700 leading-relaxed">
                  In 1443, King Sejong the Great created Hangul so every citizen could learn to read within days. Unlike arbitrary alphabets, the basic vowels depict the tripartite harmony of Eastern cosmology:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 text-center space-y-2">
                    <div className="w-12 h-12 mx-auto rounded-full bg-academy-navy text-academy-gold flex items-center justify-center font-serif text-2xl font-bold shadow-inner">
                      •
                    </div>
                    <div className="font-serif font-bold text-sm text-academy-navy">Heaven (천 / 天)</div>
                    <p className="text-[11px] text-stone-600">
                      A round sun dot (ㆍ) representing the round sky and cosmic vitality. In modern Hangul, this dot has evolved into short directional notches.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 text-center space-y-2">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-academy-navy text-academy-ivory flex items-center justify-center font-serif text-2xl font-bold shadow-inner">
                      ㅡ
                    </div>
                    <div className="font-serif font-bold text-sm text-academy-navy">Earth (지 / 地)</div>
                    <p className="text-[11px] text-stone-600">
                      A flat horizontal horizon line (ㅡ) representing the vast, supportive earth and horizontal vowel foundations.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 text-center space-y-2">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-academy-navy text-academy-gold flex items-center justify-center font-serif text-2xl font-bold shadow-inner">
                      ㅣ
                    </div>
                    <div className="font-serif font-bold text-sm text-academy-navy">Humanity (인 / 人)</div>
                    <p className="text-[11px] text-stone-600">
                      A tall standing vertical line (ㅣ) representing human beings upright between heaven and earth.
                    </p>
                  </div>
                </div>
              </>
            )}

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
              <span>
                {isBasicVowelsLesson ? (
                  <>
                    By combining Human (ㅣ) and Sun notches, we generate <strong>Vertical Vowels</strong> (ㅏ, ㅓ). By combining Earth (ㅡ) and Sun notches, we generate <strong>Horizontal Vowels</strong> (ㅗ, ㅜ).
                  </>
                ) : (
                  <>
                    Review the core explanation above and practice the authentic Korean examples with audio below.
                  </>
                )}
              </span>
              <button
                type="button"
                onClick={() => markObjectiveDone(isBasicVowelsLesson ? 'obj-2' : 'obj-1')}
                className="px-3 py-1.5 rounded-lg bg-academy-navy text-academy-ivory text-[10px] font-bold uppercase shrink-0 self-start sm:self-center"
              >
                Mark Lecture Read ✓
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. STEP-BY-STEP INTERACTIVE STUDIO NAVIGATION BAR (Mobile Scrollable) */}
      <div className="bg-gradient-to-r from-[#2C1E6D] via-[#3B288C] to-[#553ACF] text-white rounded-2xl p-2 shadow-md flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scrollbar-none border border-purple-400/20">
        {[
          { key: 'vowels-studio', label: isBasicVowelsLesson ? '1. Vowels & Pronunciation' : '1. Examples & Pronunciation', icon: BookOpen },
          { key: 'listen-identify', label: '2. Listen & Identify', icon: Headphones },
          { key: 'listen-repeat', label: '3. Listen & Repeat', icon: Sparkles },
          { key: 'writing', label: '4. Stroke Writing', icon: PenTool },
          { key: 'syllable-builder', label: '5. Syllable Builder', icon: Layers },
          { key: 'knowledge-check', label: '6. Knowledge Check', icon: HelpCircle }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeStudioTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveStudioTab(tab.key as any)}
              className={`flex items-center gap-2 px-3.5 py-2.5 min-h-[44px] rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 active:scale-95 ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF5CA8] to-[#FF4D94] text-white shadow-md ring-2 ring-pink-400/40'
                  : 'text-purple-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: UNIFIED LESSON EXAMPLES, VOCABULARY, VOWEL ALPHABET & PRONUNCIATION STUDIO */}
      {activeStudioTab === 'vowels-studio' && (
        <div className="space-y-6">
          
          {/* Dynamic Lesson Korean Examples & Vocabulary Cards (Always shown when lesson has examples) */}
          {currentLesson.koreanExamples && currentLesson.koreanExamples.length > 0 && (
            <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-[#6C52EE] tracking-wider block">
                    Authentic Korean Expressions & Sentences
                  </span>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-academy-navy">
                    Core Examples for {currentLesson.title}
                  </h3>
                </div>
                <span className="text-[11px] text-stone-500">
                  Click &ldquo;Practice in Voice Studio&rdquo; to test your pronunciation below
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {currentLesson.koreanExamples.map((ex, idx) => {
                  const isTargeted = customVoiceTarget?.korean === ex.korean;
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                        isTargeted
                          ? 'border-[#6C52EE] bg-purple-50/40 ring-2 ring-purple-400/20'
                          : 'border-stone-200 bg-stone-50/60 hover:border-purple-200'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-serif font-bold text-lg text-academy-navy">
                              {ex.korean}
                            </div>
                            {ex.pronunciation && (
                              <div className="text-xs font-mono text-pink-700 font-semibold">
                                [{ex.pronunciation}]
                              </div>
                            )}
                          </div>
                          <KoreanAudioPlayer text={ex.korean} size="sm" />
                        </div>
                        <div className="text-xs font-bold text-stone-800 pt-1">
                          Meaning: <span className="font-normal">{ex.english}</span>
                        </div>
                        {ex.explanation && (
                          <div className="text-[11px] text-stone-600 bg-white p-2 rounded-lg border border-stone-200/80">
                            <strong className="text-academy-navy">Note:</strong> {ex.explanation}
                          </div>
                        )}
                        {ex.breakdown && ex.breakdown.length > 0 && (
                          <div className="text-[11px] text-stone-600 bg-white p-2 rounded-lg border border-stone-200/80">
                            <strong className="text-academy-navy">Breakdown:</strong>{' '}
                            {ex.breakdown.map((b) => `${b.word} (${b.role})`).join(' • ')}
                          </div>
                        )}
                      </div>

                      <div className="pt-1 flex justify-end">
                        <button
                          type="button"
                          onClick={() =>
                            setCustomVoiceTarget({
                              korean: ex.korean,
                              romanization: ex.pronunciation || ex.korean,
                              english: ex.english
                            })
                          }
                          className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                            isTargeted
                              ? 'bg-[#6C52EE] text-white shadow-sm'
                              : 'bg-white text-[#6C52EE] border border-purple-200 hover:bg-purple-50'
                          }`}
                        >
                          {isTargeted ? 'Active in Voice Studio ✓' : 'Practice in Voice Studio'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Dynamic Lesson Key Vocabulary List (When lesson has vocabularyList) */}
          {currentLesson.vocabularyList && currentLesson.vocabularyList.length > 0 && (
            <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 tracking-wider block">
                    Lesson Lexicon
                  </span>
                  <h4 className="font-serif font-bold text-base text-academy-navy">
                    Key Vocabulary ({currentLesson.vocabularyList.length} items)
                  </h4>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentLesson.vocabularyList.map((vocab, vIdx) => (
                  <div
                    key={`${vocab.korean}-${vIdx}`}
                    className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-base text-academy-navy truncate">
                          {vocab.korean}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-200/70 text-stone-700">
                          {vocab.partOfSpeech}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-stone-500">[{vocab.romanization}]</div>
                      <div className="text-xs font-semibold text-stone-800 mt-0.5 truncate">{vocab.english}</div>
                    </div>
                    <KoreanAudioPlayer text={vocab.korean} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic Interactive Exercises for Current Lesson (When present) */}
          {currentLesson.interactiveExercises && currentLesson.interactiveExercises.length > 0 && (
            <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-sm space-y-4">
              <div className="pb-2 border-b border-stone-100">
                <span className="text-[10px] font-mono uppercase font-bold text-amber-700 tracking-wider block">
                  Guided Classroom Drills
                </span>
                <h4 className="font-serif font-bold text-base text-academy-navy">
                  Interactive Lesson Practice ({currentLesson.interactiveExercises.length})
                </h4>
              </div>
              <div className="space-y-4">
                {currentLesson.interactiveExercises.map((ex, idx) => {
                  const selected = exerciseAnswers[ex.id] || '';
                  const isChecked = !!exerciseChecked[ex.id];
                  const targetAns = Array.isArray(ex.correctAnswer) ? ex.correctAnswer.join(' ') : ex.correctAnswer;
                  const isCorrect = selected.trim() === targetAns.trim();
                  return (
                    <div key={ex.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-academy-navy">
                        <span>DRILL {idx + 1} • {ex.type.replace(/-/g, ' ').toUpperCase()}</span>
                        {isChecked && (
                          <span className={`px-2 py-0.5 rounded text-[11px] ${
                            isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {isCorrect ? 'Correct ✓' : `Expected: ${targetAns}`}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-stone-800">{ex.question}</p>
                      {ex.options && ex.options.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {ex.options.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                setExerciseAnswers(prev => ({ ...prev, [ex.id]: opt }));
                                setExerciseChecked(prev => ({ ...prev, [ex.id]: true }));
                              }}
                              className={`p-2.5 rounded-lg border text-left text-xs font-medium transition-all ${
                                selected === opt
                                  ? isCorrect
                                    ? 'bg-emerald-600 text-white border-emerald-600'
                                    : 'bg-rose-600 text-white border-rose-600'
                                  : 'bg-white hover:bg-stone-100 text-stone-800 border-stone-200'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={selected}
                            onChange={(e) => {
                              setExerciseAnswers(prev => ({ ...prev, [ex.id]: e.target.value }));
                              setExerciseChecked(prev => ({ ...prev, [ex.id]: false }));
                            }}
                            placeholder="Type your Korean answer..."
                            className="flex-1 px-3 py-2 rounded-lg border border-stone-300 text-xs focus:outline-none focus:border-[#6C52EE]"
                          />
                          <button
                            type="button"
                            onClick={() => setExerciseChecked(prev => ({ ...prev, [ex.id]: true }))}
                            className="px-4 py-2 rounded-lg bg-academy-navy text-white text-xs font-bold"
                          >
                            Check Answer
                          </button>
                        </div>
                      )}
                      {isChecked && (
                        <div className="text-[11px] text-stone-700 bg-amber-50/80 p-2.5 rounded-lg border border-amber-200">
                          <strong>Explanation:</strong> {ex.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section A: Interactive Vowel Alphabet Classroom Grid */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-100">
            <div>
              <h3 className="font-serif font-bold text-lg text-academy-navy">
                Interactive Vowel Alphabet Classroom (기본 모음 10자)
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Click any vowel card to hear native Korean audio and practice in the integrated Pronunciation Studio directly below.
              </p>
            </div>
            <span className="text-xs font-mono text-stone-600 bg-white px-3 py-1.5 rounded-lg border border-stone-200 self-start sm:self-center shrink-0">
              Mastered: {masteredChars.length} / {BASIC_VOWELS_INTERACTIVE_DATA.length}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {BASIC_VOWELS_INTERACTIVE_DATA.map((item) => (
              <HangulCharacterCard
                key={item.char}
                item={item}
                isSelected={!customVoiceTarget && selectedCharItem.char === item.char}
                isCompleted={masteredChars.includes(item.char)}
                onSelect={() => handleSelectChar(item)}
                onToggleComplete={() => toggleCharMastered(item.char)}
              />
            ))}
          </div>

          {/* Section B: Unified Active Character / Expression Pronunciation & Articulation Studio */}
          <div className="rounded-2xl border-2 border-stone-200 bg-stone-50/70 p-5 sm:p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div className="flex items-center gap-3 min-w-0">
                <div className="px-3 min-w-[56px] h-14 rounded-2xl bg-gradient-to-tr from-[#6C52EE] to-[#8E77F7] text-white font-serif font-black text-xl sm:text-2xl flex items-center justify-center shadow-md border-2 border-purple-300/40 shrink-0">
                  {customVoiceTarget ? customVoiceTarget.korean.slice(0, 4) : selectedCharItem.char}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-serif font-bold text-lg text-academy-navy truncate">
                      {customVoiceTarget ? `Expression Studio: ${customVoiceTarget.korean}` : `Vowel Studio: ${selectedCharItem.name}`}
                    </h4>
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-pink-50 text-pink-700 border border-pink-200 shrink-0">
                      [{customVoiceTarget ? customVoiceTarget.romanization : selectedCharItem.romanization}]
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-0.5 truncate">
                    {customVoiceTarget
                      ? `Meaning: ${customVoiceTarget.english}`
                      : `${selectedCharItem.approxEnglish} • ${selectedCharItem.mouthSummary}`}
                  </p>
                </div>
              </div>

              {/* Quick character switcher pill row (Touch Friendly) */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scrollbar-none py-1 max-w-full">
                <span className="text-[11px] font-mono text-stone-600 font-bold mr-1 shrink-0">Switch Vowel:</span>
                {BASIC_VOWELS_INTERACTIVE_DATA.map((item) => (
                  <button
                    key={item.char}
                    type="button"
                    onClick={() => handleSelectChar(item)}
                    className={`min-w-[40px] h-10 rounded-xl font-serif font-bold text-sm transition-all border shrink-0 flex items-center justify-center active:scale-95 ${
                      !customVoiceTarget && selectedCharItem.char === item.char
                        ? 'bg-[#6C52EE] text-white border-[#6C52EE] shadow-sm ring-2 ring-purple-400/40'
                        : 'bg-white hover:bg-purple-50 text-stone-700 border-stone-200 hover:border-purple-300'
                    }`}
                    title={`Switch to ${item.char} (${item.name})`}
                  >
                    {item.char}
                  </button>
                ))}
              </div>
            </div>

            {/* Side-by-side Studio Tools: Voice Recording & Articulation Anatomy */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Tool 1: Voice Recorder & Native Reference Audio */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-academy-navy uppercase tracking-wider block">
                  1. Native Speech Reference & Voice Recording Studio
                </span>
                <VoiceRecorder
                  targetKorean={customVoiceTarget ? customVoiceTarget.korean : selectedCharItem.name}
                  targetRomanization={customVoiceTarget ? customVoiceTarget.romanization : selectedCharItem.romanization}
                  targetEnglish={customVoiceTarget ? customVoiceTarget.english : selectedCharItem.approxEnglish}
                  onRecordCompleted={() => markObjectiveDone(isBasicVowelsLesson ? 'obj-6' : 'obj-2')}
                />
              </div>

              {/* Tool 2: Anatomical Vocal Tract & Mouth Position Guide */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-academy-navy uppercase tracking-wider block">
                  2. Anatomical Articulation & Mouth Shape ({selectedCharItem.char})
                </span>
                <MouthPositionGuide
                  info={selectedCharItem.phoneticGuide}
                />
              </div>
            </div>

            {/* Geometric Placement Explainer */}
            <div className="p-4 rounded-xl border border-stone-200 bg-white shadow-sm space-y-2">
              <button
                type="button"
                onClick={() => setPlacementRuleExpanded(!placementRuleExpanded)}
                className="w-full flex items-center justify-between text-left"
              >
                <span className="font-serif font-bold text-sm text-academy-navy">
                  Geometric Placement Rule: Vertical Vowels vs Horizontal Vowels
                </span>
                {placementRuleExpanded ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
              </button>

              {placementRuleExpanded && (
                <div className="pt-2 border-t border-stone-100 text-xs text-stone-700 space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                      <strong className="text-academy-navy font-serif">1. Vertical Vowels (ㅏ, ㅑ, ㅓ, ㅕ, ㅣ):</strong>
                      <p className="text-[11px] text-stone-600 mt-1">
                        Written to the <em>RIGHT</em> of the consonant block (e.g. 아, 야, 어, 여, 이).
                      </p>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                      <strong className="text-academy-navy font-serif">2. Horizontal Vowels (ㅗ, ㅛ, ㅜ, ㅠ, ㅡ):</strong>
                      <p className="text-[11px] text-stone-600 mt-1">
                        Written directly <em>BELOW</em> the consonant block (e.g. 오, 요, 우, 유, 으).
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Progression to Next Step */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setActiveStudioTab('listen-identify');
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-academy-navy hover:bg-academy-navy-light text-academy-ivory font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                <span>Proceed to Step 2: Listen & Identify Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LISTEN AND IDENTIFY (Acoustic Audio Quiz) */}
      {activeStudioTab === 'listen-identify' && (
        <div className="space-y-4">
          <ListeningExercise
            questions={VOWEL_LISTENING_QUESTIONS}
            onCompleteExercise={(score) => {
              if (score >= 80) {
                markObjectiveDone('obj-5');
              }
            }}
          />

          <div className="p-4 bg-white rounded-xl border border-stone-200 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setActiveStudioTab('vowels-studio')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-academy-navy transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Vowels Studio</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveStudioTab('listen-repeat');
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-academy-navy hover:bg-academy-navy-light text-academy-ivory text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              <span>Next: Step 3 Listen & Repeat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: LISTEN AND REPEAT (Guided Syllable Shadowing) */}
      {activeStudioTab === 'listen-repeat' && (
        <div className="space-y-4">
          <ListenAndRepeatStudio
            onComplete={() => markObjectiveDone('obj-6')}
          />

          <div className="p-4 bg-white rounded-xl border border-stone-200 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setActiveStudioTab('listen-identify')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-academy-navy transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Listen & Identify</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveStudioTab('writing');
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-academy-navy hover:bg-academy-navy-light text-academy-ivory text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              <span>Next: Step 4 Stroke Writing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: WRITING PRACTICE (Touch / Mouse Canvas) */}
      {activeStudioTab === 'writing' && (
        <div className="space-y-4">
          <HangulWritingCanvas
            targets={VOWEL_WRITING_TARGETS}
            onPracticeSaved={(char) => markObjectiveDone('obj-7')}
          />

          <div className="p-4 bg-white rounded-xl border border-stone-200 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setActiveStudioTab('listen-repeat')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-academy-navy transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Listen & Repeat</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveStudioTab('syllable-builder');
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-academy-navy hover:bg-academy-navy-light text-academy-ivory text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              <span>Next: Step 5 Syllable Builder</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 5: SYLLABLE BUILDER (Interactive 3-part Block Construction) */}
      {activeStudioTab === 'syllable-builder' && (
        <div className="space-y-4">
          <SyllableBuilderActivity
            onSyllableConstructed={() => markObjectiveDone('obj-8')}
          />

          <div className="p-4 bg-white rounded-xl border border-stone-200 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setActiveStudioTab('writing')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-academy-navy transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Stroke Writing</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveStudioTab('knowledge-check');
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-academy-navy hover:bg-academy-navy-light text-academy-ivory text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              <span>Next: Step 6 Knowledge Check Quiz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 6: KNOWLEDGE CHECK (Comprehension Questions) */}
      {activeStudioTab === 'knowledge-check' && (() => {
        const totalQuestions = currentLesson.comprehensionQuestions.length;
        const answeredCount = Object.keys(answers).length;
        const correctCount = currentLesson.comprehensionQuestions.filter(
          (cq) => answers[cq.id] === cq.correctAnswerIndex
        ).length;
        const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 100;
        const isPassing = totalQuestions <= 2 ? correctCount === totalQuestions : scorePercent >= 70;

        return (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-academy-gold-dark tracking-wider block">
                  Lesson Assessment • {currentLesson.title}
                </span>
                <h3 className="font-serif font-bold text-lg text-academy-navy mt-0.5">
                  Comprehension & Phonetic Knowledge Check
                </h3>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-stone-100 text-stone-700 self-start sm:self-center">
                Answered: {answeredCount} / {totalQuestions}
              </span>
            </div>

            {quizError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-800">
                {quizError}
              </div>
            )}

            {quizChecked && (
              <div
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isPassing
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                <div>
                  <div className="font-serif font-bold text-sm">
                    {isPassing
                      ? `Assessment Passed! Score: ${correctCount}/${totalQuestions} (${scorePercent}%)`
                      : `Review Needed — Score: ${correctCount}/${totalQuestions} (${scorePercent}%)`}
                  </div>
                  <p className="text-xs mt-0.5">
                    {isPassing
                      ? 'Congratulations! This lesson has been verified and recorded in your academic transcript.'
                      : 'Please review the faculty explanations below and click "Retry Quiz" to achieve mastery.'}
                  </p>
                </div>
                {!isPassing && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuizChecked(false);
                      setAnswers({});
                      setQuizError(null);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-academy-navy text-white text-xs font-bold shrink-0 self-start sm:self-center"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retry Quiz</span>
                  </button>
                )}
              </div>
            )}

            <div className="space-y-6">
              {currentLesson.comprehensionQuestions.map((cq, idx) => {
                const selectedIdx = answers[cq.id];
                const isCorrect = selectedIdx === cq.correctAnswerIndex;
                return (
                  <div key={cq.id} className="p-5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-academy-navy">
                      <span>QUESTION {idx + 1}</span>
                      {quizChecked && (
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {isCorrect ? 'Correct ✓' : 'Incorrect ✗'}
                        </span>
                      )}
                    </div>

                    <p className="text-sm font-semibold text-academy-navy">{cq.question}</p>

                    <div className="space-y-2 pt-1 text-xs">
                      {cq.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => handleQuizAnswer(cq.id, oIdx)}
                          className={`w-full text-left p-3 rounded-lg border font-medium transition-all ${
                            selectedIdx === oIdx
                              ? quizChecked
                                ? isCorrect
                                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                                  : 'bg-rose-700 text-white border-rose-700 shadow-sm'
                                : 'bg-academy-navy text-academy-ivory border-academy-navy shadow-sm'
                              : 'bg-white hover:bg-stone-100 text-stone-800 border-stone-200'
                          }`}
                        >
                          <span className="font-bold mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                          {opt}
                        </button>
                      ))}
                    </div>

                    {quizChecked && (
                      <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-950">
                        <strong>Faculty Explanation:</strong> {cq.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveStudioTab('syllable-builder')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-academy-navy transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Step 5</span>
              </button>

              <div className="flex items-center gap-2">
                {quizChecked && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuizChecked(false);
                      setAnswers({});
                      setQuizError(null);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 font-bold text-xs transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Answers</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (answeredCount < totalQuestions) {
                      setQuizError(`Please answer all ${totalQuestions} comprehension questions before verifying (${answeredCount}/${totalQuestions} answered).`);
                      return;
                    }
                    setQuizError(null);
                    setQuizChecked(true);
                    if (isPassing) {
                      onLessonMastered(currentLesson.id);
                    }
                  }}
                  className="px-6 py-2.5 rounded-xl bg-academy-navy hover:bg-academy-navy-light text-academy-ivory font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  Verify Answers & Complete Lesson Assessment
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 11 & 12. LESSON SUMMARY, FILIPINO NOTES & HOMEWORK CARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        
        {/* Lesson Summary */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-academy-navy font-serif font-bold text-base">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Lesson Mastery Summary</span>
          </div>
          <p className="text-xs text-stone-800 leading-relaxed font-medium">
            {currentLesson.summary}
          </p>
          <div className="pt-2 text-xs text-stone-700 font-mono font-semibold">
            {isBasicVowelsLesson
              ? 'Next Milestone: Compound & Diphthong Vowels (ㅐ, ㅔ, ㅘ, ㅝ, ㅢ).'
              : `Module Reference: Lesson ${currentLesson.lessonNumber} • ${currentLesson.koreanTitle}`}
          </div>
        </div>

        {/* Homework & Review */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-academy-navy font-serif font-bold text-base">
            <Sparkles className="w-5 h-5 text-academy-gold-dark" />
            <span>Homework & Academic Drill</span>
          </div>
          <p className="text-xs text-stone-800 leading-relaxed font-medium bg-amber-50 p-3 rounded-xl border border-amber-200">
            {currentLesson.homeworkPrompt || 'Practice writing all 10 basic vowels 5 times each in stroke order, and record yourself pronouncing 우유 (milk) and 아이 (child).'}
          </p>
          <div className="text-xs text-stone-700 font-medium leading-normal">
            Submit your written homework in the <strong className="text-[#6C52EE]">Assignments Portal directly below</strong> for instant AI vision evaluation and academic credit.
          </div>
        </div>

      </div>

      {/* 13. INTEGRATED ASSIGNMENT PORTAL WITH AI VISION EVALUATION (Directly Under Homework Card) */}
      <div id="lesson-assignment-portal" className="pt-2">
        <LessonAssignmentPortal
          lessonId={currentLesson.id}
          lessonTitle={currentLesson.title}
          homeworkPrompt={currentLesson.homeworkPrompt}
          currentUser={currentUser}
          onSubmissionComplete={() => {
            markObjectiveDone('obj-7');
          }}
        />
      </div>

    </div>
  );
};
