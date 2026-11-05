import React, { useState } from 'react';
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
import { 
  BookOpen, 
  Sparkles, 
  Mic, 
  Headphones, 
  PenTool, 
  Layers, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sun, 
  Compass, 
  User, 
  Globe 
} from 'lucide-react';

interface InteractiveClassroomExperienceProps {
  currentLesson: Lesson;
  currentUser: UserProfile;
  onLessonMastered: (lessonId: string) => void;
}

export const InteractiveClassroomExperience: React.FC<InteractiveClassroomExperienceProps> = ({
  currentLesson,
  currentUser,
  onLessonMastered
}) => {
  // Navigation tabs for the structured flow: LEARN → LISTEN → WATCH → PRACTICE → SPEAK → WRITE → TEST
  const [activeStudioTab, setActiveStudioTab] = useState<
    'alphabet-classroom' | 'pronunciation-studio' | 'mouth-guide' | 'listen-identify' | 'listen-repeat' | 'writing' | 'syllable-builder' | 'knowledge-check'
  >('alphabet-classroom');

  // Interactive Checklist State
  const [objectives, setObjectives] = useState<InteractiveObjective[]>(INITIAL_VOWEL_OBJECTIVES);

  // Character Card Selection State
  const [selectedCharItem, setSelectedCharItem] = useState<CharacterItemData>(
    BASIC_VOWELS_INTERACTIVE_DATA[0]
  );
  const [masteredChars, setMasteredChars] = useState<string[]>(['ㅏ', 'ㅣ']);

  // Expandable Introduction / Philosophy Sections
  const [philosophyExpanded, setPhilosophyExpanded] = useState(true);
  const [placementRuleExpanded, setPlacementRuleExpanded] = useState(false);
  const [filipinoNotesExpanded, setFilipinoNotesExpanded] = useState(currentUser.filipinoSupport);

  // Knowledge Check Questions State
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [quizChecked, setQuizChecked] = useState(false);

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
  };

  const handleQuizAnswer = (qId: string, optIdx: number) => {
    if (quizChecked) return;
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. LEARNING OBJECTIVES CHECKLIST (Interactive & Tracked) */}
      <LearningObjectiveChecklist
        objectives={objectives}
        onToggleObjective={toggleObjective}
      />

      {/* 2. INTRODUCTION TO HANGUL & PHILOSOPHICAL ORIGINS (Interactive Cards) */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div>
            <span className="text-[10px] uppercase font-mono font-bold text-academy-gold-dark tracking-wider block">
              Origin of the Script (훈민정음 원리)
            </span>
            <h3 className="font-serif font-bold text-lg text-academy-navy mt-0.5">
              The Three Philosophical Elements of Hangul Vowels
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setPhilosophyExpanded(!philosophyExpanded)}
            className="p-1.5 rounded-lg text-stone-500 hover:text-academy-navy hover:bg-stone-100 transition-colors"
          >
            {philosophyExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {philosophyExpanded && (
          <div className="space-y-4 pt-1 text-xs">
            <p className="text-stone-700 leading-relaxed">
              In 1443, King Sejong the Great created Hangul so every citizen could learn to read within days. Unlike arbitrary alphabets, the basic vowels depict the tripartite harmony of Eastern cosmology:
            </p>

            {/* The 3 Core Elements Grid */}
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

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-600 flex items-center justify-between text-[11px]">
              <span>
                By combining Human (ㅣ) and Sun notches, we generate <strong>Vertical Vowels</strong> (ㅏ, ㅓ). By combining Earth (ㅡ) and Sun notches, we generate <strong>Horizontal Vowels</strong> (ㅗ, ㅜ).
              </span>
              <button
                type="button"
                onClick={() => markObjectiveDone('obj-2')}
                className="px-3 py-1 rounded-lg bg-academy-navy text-academy-ivory text-[10px] font-bold uppercase shrink-0 ml-3"
              >
                Mark Mastered ✓
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. STEP-BY-STEP INTERACTIVE STUDIO NAVIGATION BAR */}
      <div className="bg-academy-navy text-academy-ivory rounded-2xl p-2.5 shadow-md flex flex-wrap items-center gap-1.5 sm:gap-2 no-scrollbar scrollbar-none">
        {[
          { key: 'alphabet-classroom', label: '1. Vowel Grid', icon: BookOpen },
          { key: 'pronunciation-studio', label: '2. Pronunciation Studio', icon: Mic },
          { key: 'mouth-guide', label: '3. Mouth & Vocal Tract', icon: Compass },
          { key: 'listen-identify', label: '4. Listen & Identify', icon: Headphones },
          { key: 'listen-repeat', label: '5. Listen & Repeat', icon: Sparkles },
          { key: 'writing', label: '6. Stroke Writing', icon: PenTool },
          { key: 'syllable-builder', label: '7. Syllable Builder', icon: Layers },
          { key: 'knowledge-check', label: '8. Knowledge Check', icon: HelpCircle }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeStudioTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveStudioTab(tab.key as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-academy-gold text-academy-navy shadow-md ring-2 ring-academy-gold/40'
                  : 'text-stone-300 hover:text-white hover:bg-academy-navy-light'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: INTERACTIVE ALPHABET CLASSROOM (10 Basic Vowel Cards) */}
      {activeStudioTab === 'alphabet-classroom' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-100">
            <div>
              <h3 className="font-serif font-bold text-lg text-academy-navy">
                Interactive Vowel Alphabet Classroom (기본 모음 10자)
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Click any vowel card to preview audio, inspect articulation, and open its pronunciation studio.
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
                isSelected={selectedCharItem.char === item.char}
                isCompleted={masteredChars.includes(item.char)}
                onSelect={() => {
                  handleSelectChar(item);
                  setActiveStudioTab('pronunciation-studio');
                }}
                onToggleComplete={() => toggleCharMastered(item.char)}
              />
            ))}
          </div>

          {/* Vertical vs Horizontal Placement Explainer */}
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
        </div>
      )}

      {/* TAB 2: PRONUNCIATION STUDIO (Listen Reference, Record Voice, Replay, Compare) */}
      {activeStudioTab === 'pronunciation-studio' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <div>
              <h3 className="font-serif font-bold text-lg text-academy-navy">
                Korean Pronunciation Studio
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Active target: <strong className="text-academy-navy text-sm font-serif">{selectedCharItem.char} ({selectedCharItem.name})</strong>
              </p>
            </div>
            
            {/* Quick character switcher */}
            <div className="flex flex-wrap items-center gap-1 no-scrollbar scrollbar-none">
              {BASIC_VOWELS_INTERACTIVE_DATA.map((item) => (
                <button
                  key={item.char}
                  type="button"
                  onClick={() => setSelectedCharItem(item)}
                  className={`w-8 h-8 rounded-lg font-serif font-bold text-sm transition-all border ${
                    selectedCharItem.char === item.char
                      ? 'bg-academy-navy text-academy-gold border-academy-navy'
                      : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200'
                  }`}
                >
                  {item.char}
                </button>
              ))}
            </div>
          </div>

          <VoiceRecorder
            targetKorean={selectedCharItem.name}
            targetRomanization={selectedCharItem.romanization}
            targetEnglish={selectedCharItem.approxEnglish}
            onRecordCompleted={() => markObjectiveDone('obj-6')}
          />
        </div>
      )}

      {/* TAB 3: MOUTH POSITION AND SOUND GUIDE (Visual SVG Anatomy) */}
      {activeStudioTab === 'mouth-guide' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <div>
              <h3 className="font-serif font-bold text-lg text-academy-navy">
                Visual Mouth Position & Articulation Guide
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Biomechanical vocal tract inspection for <strong className="text-academy-navy text-sm font-serif">{selectedCharItem.char}</strong>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1 no-scrollbar scrollbar-none">
              {BASIC_VOWELS_INTERACTIVE_DATA.map((item) => (
                <button
                  key={item.char}
                  type="button"
                  onClick={() => setSelectedCharItem(item)}
                  className={`w-8 h-8 rounded-lg font-serif font-bold text-sm transition-all border ${
                    selectedCharItem.char === item.char
                      ? 'bg-academy-navy text-academy-gold border-academy-navy'
                      : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200'
                  }`}
                >
                  {item.char}
                </button>
              ))}
            </div>
          </div>

          <MouthPositionGuide
            info={selectedCharItem.phoneticGuide}
          />
        </div>
      )}

      {/* TAB 4: LISTEN AND IDENTIFY (Acoustic Audio Quiz) */}
      {activeStudioTab === 'listen-identify' && (
        <ListeningExercise
          questions={VOWEL_LISTENING_QUESTIONS}
          onCompleteExercise={(score) => {
            if (score >= 80) {
              markObjectiveDone('obj-5');
            }
          }}
        />
      )}

      {/* TAB 5: LISTEN AND REPEAT (Guided Syllable Shadowing) */}
      {activeStudioTab === 'listen-repeat' && (
        <ListenAndRepeatStudio
          onComplete={() => markObjectiveDone('obj-6')}
        />
      )}

      {/* TAB 6: WRITING PRACTICE (Touch / Mouse Canvas) */}
      {activeStudioTab === 'writing' && (
        <HangulWritingCanvas
          targets={VOWEL_WRITING_TARGETS}
          onPracticeSaved={(char) => markObjectiveDone('obj-7')}
        />
      )}

      {/* TAB 7: SYLLABLE BUILDER (Interactive 3-part Block Construction) */}
      {activeStudioTab === 'syllable-builder' && (
        <SyllableBuilderActivity
          onSyllableConstructed={() => markObjectiveDone('obj-8')}
        />
      )}

      {/* TAB 8: KNOWLEDGE CHECK (Comprehension Questions) */}
      {activeStudioTab === 'knowledge-check' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-academy-gold-dark tracking-wider block">
                Lesson Assessment
              </span>
              <h3 className="font-serif font-bold text-lg text-academy-navy mt-0.5">
                Comprehension & Phonetic Knowledge Check
              </h3>
            </div>
          </div>

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
                            ? 'bg-academy-navy text-academy-ivory border-academy-navy shadow-sm'
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

          <div className="pt-3 border-t border-stone-200 flex justify-end">
            <button
              type="button"
              onClick={() => {
                setQuizChecked(true);
                onLessonMastered(currentLesson.id);
              }}
              className="px-6 py-2.5 rounded-xl bg-academy-navy hover:bg-academy-navy-light text-academy-ivory font-bold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              Verify Answers & Complete Lesson Assessment
            </button>
          </div>
        </div>
      )}

      {/* 11 & 12. LESSON SUMMARY, FILIPINO NOTES & HOMEWORK CARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        
        {/* Lesson Summary */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-academy-navy font-serif font-bold text-base">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Lesson Mastery Summary</span>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">
            {currentLesson.summary}
          </p>
          <div className="pt-2 text-xs text-stone-500 font-mono">
            Next Milestone: Compound & Diphthong Vowels (ㅐ, ㅔ, ㅘ, ㅝ, ㅢ).
          </div>
        </div>

        {/* Homework & Review */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-academy-navy font-serif font-bold text-base">
            <Sparkles className="w-5 h-5 text-academy-gold-dark" />
            <span>Homework & Academic Drill</span>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed bg-amber-50/60 p-3 rounded-xl border border-amber-200">
            {currentLesson.homeworkPrompt || 'Practice writing all 10 basic vowels 5 times each in stroke order, and record yourself pronouncing 우유 (milk) and 아이 (child).'}
          </p>
          <div className="text-[11px] text-stone-500">
            Submit your written homework in the <strong>Assignments Portal</strong> for instructor feedback.
          </div>
        </div>

      </div>

    </div>
  );
};
