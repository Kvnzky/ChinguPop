import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { storage } from '../../services/storageService';
import { 
  GraduationCap, 
  BookOpen, 
  Lock, 
  Sparkles, 
  Bot, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  X,
  Volume2,
  FileCheck,
  Award,
  Layers,
  RotateCcw
} from 'lucide-react';

interface GuidedOnboardingTourProps {
  currentUser: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab?: (tab: any) => void;
}

interface TourStep {
  title: string;
  koreanTitle: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  highlights: string[];
  recommendation: string;
  targetTab?: string;
  actionText?: string;
}

export const GuidedOnboardingTour: React.FC<GuidedOnboardingTourProps> = ({
  currentUser,
  isOpen,
  onClose,
  onNavigateTab
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  if (!isOpen) return null;

  const tourSteps: TourStep[] = [
    {
      title: `Welcome to ChinguPop, ${currentUser.name}`,
      koreanTitle: '친구팝에 오신 것을 환영합니다',
      badge: 'Private Korean Academy',
      icon: GraduationCap,
      description: 'ChinguPop is an intensive, private Korean language learning academy engineered to guide you from absolute zero Hangul knowledge to full TOPIK II advanced conversational fluency.',
      highlights: [
        'Private personalized profile with strictly isolated academic records',
        'Balanced 60-minute daily timetable across 7 days per week',
        'Progressive Korean immersion supported by English & Filipino linguistic notes',
        'Mastery-first curriculum with no fake metrics or unearned certificates'
      ],
      recommendation: 'Begin by familiarizing yourself with your personal dashboard and academic roadmap.',
      targetTab: 'dashboard',
      actionText: 'View Dashboard'
    },
    {
      title: 'Individual Academic Dashboard & 9 Competencies',
      koreanTitle: '개인 학업 대시보드 및 9대 핵심 역량',
      badge: 'Real-Time Database Records',
      icon: Sparkles,
      description: 'Your dashboard provides an unrounded, rigorous breakdown of your progress across all 9 core language competencies. All homework, exam results, and flashcards belong exclusively to your student account.',
      highlights: [
        '9 tracked competencies: Reading, Writing, Grammar, Vocabulary, Listening, Speaking, Reading Comp, Writing Comp, Pronunciation',
        'Daily 60-minute study breakdown across 6 balanced intervals',
        'Weekly hours logged, active study days, and SuperMemo review volume',
        'Dynamic pedagogical recommendations that adjust to your personal pace'
      ],
      recommendation: 'Complete your daily recommended activity to maintain your study rhythm and retain Korean phonology.',
      targetTab: 'dashboard',
      actionText: 'Inspect Competency Radar'
    },
    {
      title: '7-Level Progressive Curriculum & Course Sequence',
      koreanTitle: '7단계 순차적 한국어 정규 교육과정',
      badge: 'Pre-A1 to TOPIK II Level 6',
      icon: BookOpen,
      description: 'Our curriculum spans 7 structured levels: Foundations (Pre-A1), Beginner (TOPIK I Level 1), Sentence Construction (Level 2), Everyday Conversation (Level 3), Intermediate (Level 4), Advanced Idioms (Level 5), and Professional Fluency (Level 6).',
      highlights: [
        'Sequential lesson unlocking: each lesson builds on prerequisite mastery',
        'Clear learning objectives for vowels, consonants, batchim, and grammar',
        'Integrated cultural notes, Seoul life scenarios, and honorific registers',
        'Honest TOPIK alignment focused on practical spoken and written Korean'
      ],
      recommendation: 'Start with Pre-A1 Lesson 1 (Basic Vowels) to establish clean mouth shapes and stroke geometry.',
      targetTab: 'courses',
      actionText: 'Explore Courses'
    },
    {
      title: 'Virtual Classroom: 7-Step Pedagogical Sequence',
      koreanTitle: '가상 강의실: 7단계 입체적 학습 시스템',
      badge: 'Active Mastery Architecture',
      icon: Layers,
      description: 'Inside every lesson, you follow a proven instructional sequence: LEARN (grammar rules) -> LISTEN (native audio) -> WATCH (mouth guide) -> PRACTICE (syllable builder) -> SPEAK (shadowing) -> WRITE (stroke canvas) -> TEST (knowledge check).',
      highlights: [
        'No passive text blocks: hands-on interactive activities at every step',
        'Native voice dictation and high-contrast stroke order animations',
        'Bilingual breakdown with grammar notes saved persistently to your transcript',
        'Immediate answer verification with clear linguistic explanations'
      ],
      recommendation: 'Engage with all 7 steps in the classroom before marking a lesson completed.',
      targetTab: 'classroom',
      actionText: 'Open Virtual Classroom'
    },
    {
      title: 'Native Pronunciation Studio & Speaking Lab',
      koreanTitle: '원어민 발음 연구소 및 음성 인식 랩',
      badge: 'High-Fidelity Audio & Mic Shadowing',
      icon: Volume2,
      description: 'Master Korean articulation using native speaker audio, adjustable playback speeds (including slow 0.85x mode), mouth & tongue cross-sections, and real-time voice recording comparison.',
      highlights: [
        'Native Korean audio playback with slow repetition for nuanced vowels',
        'Microphone recording with instant audio comparison to native target',
        'Browser-based speech recognition analyzing syllable match accuracy',
        'Clear feedback acknowledging acoustic approximations without fake scores'
      ],
      recommendation: 'Practice vertical vowels (ㅏ, ㅓ) vs horizontal vowels (ㅗ, ㅜ) in the Speaking Lab.',
      targetTab: 'speaking-lab',
      actionText: 'Launch Speaking Lab'
    },
    {
      title: 'SuperMemo SM-2 Vocabulary Spaced Repetition',
      koreanTitle: 'SM-2 간격 반복 어휘 기억 시스템',
      badge: 'Long-Term Memory Retention',
      icon: RotateCcw,
      description: 'Overcome the forgetting curve with the SuperMemo SM-2 spaced repetition algorithm. Rate cards as Again (1d), Hard (2d), Good (4d), or Easy (7d+) to schedule optimal review intervals.',
      highlights: [
        'Curated vocabulary cards with Hangul, romanization, English, and Filipino notes',
        'SM-2 interval scheduling automatically queues due cards daily',
        'One-click native audio pronunciation for every vocabulary entry',
        'Add custom personal vocabulary words with example sentences anytime'
      ],
      recommendation: 'Spend 10 minutes every morning reviewing your due flashcard deck.',
      targetTab: 'vocabulary',
      actionText: 'Open Vocabulary Deck'
    },
    {
      title: 'Homework Management & Written Assignments',
      koreanTitle: '과제 제출 및 교수 첨삭 시스템',
      badge: 'Calligraphy & Composition',
      icon: FileCheck,
      description: 'Submit written homework exercises, self-introduction essays, and photographic or digital canvas proof of your Hangul calligraphy for faculty review and automated grammar checking.',
      highlights: [
        'Structured assignment prompts matching lesson milestones',
        'Support for text composition, stroke drawing, and handwriting image uploads',
        'Instant AI pedagogical feedback highlighting particle and conjugation accuracy',
        'Formal grading records tracked directly in your student file'
      ],
      recommendation: 'Complete the Basic Vowels Calligraphy Drill (Assignment 1) once you finish Lesson 1.',
      targetTab: 'assignments',
      actionText: 'View Assignments'
    },
    {
      title: 'Examinations, Weekly Quizzes & Strict Completion',
      koreanTitle: '정기 시험 및 엄격한 수료 인증',
      badge: 'No Rounded Percentages',
      icon: Award,
      description: 'Courses are only marked COMPLETED when 100% of mandatory lessons are finished, written homework is graded and passed, and the formal course examination is cleared with a score of 70% or higher.',
      highlights: [
        'Weekly quizzes and timed monthly comprehensive examinations',
        'Strict 100% completion requirement with zero fake rounding',
        'Status states: Not Started, In Progress, Awaiting Assessment, Not Completed, Completed',
        'Official graduation certificates unlocked only upon satisfying all academic requirements'
      ],
      recommendation: 'Review your notes carefully before attempting timed examinations.',
      targetTab: 'examinations',
      actionText: 'Open Exam System'
    },
    {
      title: 'Personal AI Korean Teacher (Professor Kim)',
      koreanTitle: '전담 AI 한국어 교수 (김민준 교수)',
      badge: '24/7 Pedagogical Tutoring',
      icon: Bot,
      description: 'Professor Kim is available around the clock to answer your grammar questions, analyze sentence structure, practice real-life conversational dialogues, and explain tricky Korean linguistic nuances.',
      highlights: [
        'Available 24/7 for conversational practice and grammar questions',
        'Bilingual explanations with progressive Korean immersion as you advance',
        'Detailed corrections highlighting particles, tense, honorifics, and batchim',
        'Filipino bridge notes clarifying linguistic concepts when helpful'
      ],
      recommendation: 'Ask Professor Kim: \'선생님, 은/는과 이/가의 차이점을 알려주세요!\'',
      targetTab: 'ai-tutor',
      actionText: 'Chat with AI Tutor'
    }
  ];

  const currentStep = tourSteps[currentStepIndex];
  const StepIcon = currentStep.icon;
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === tourSteps.length - 1;

  const handleFinish = () => {
    storage.setTourCompleted(currentUser.id, true);
    onClose();
  };

  const handleSkip = () => {
    if (dontShowAgain) {
      storage.setTourCompleted(currentUser.id, true);
    }
    onClose();
  };

  const handleActionClick = (tabKey?: string) => {
    if (tabKey && onNavigateTab) {
      onNavigateTab(tabKey);
      if (dontShowAgain) {
        storage.setTourCompleted(currentUser.id, true);
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18181B]/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-purple-200/90 max-w-xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#2C1E6D] via-[#4F35C8] to-[#6C52EE] text-white p-5 sm:p-6 relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-purple-200 bg-white/10 px-2.5 py-0.5 rounded-full border border-purple-300/30 font-bold">
              Tour Step {currentStepIndex + 1} of {tourSteps.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleSkip}
                className="text-[11px] text-purple-200 hover:text-white px-2 py-1 rounded hover:bg-white/10 transition-colors font-medium"
              >
                Skip Tour
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg text-purple-200 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close tour"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/15 border border-purple-300/40 flex items-center justify-center text-white shadow-inner shrink-0">
              <StepIcon className="w-6 h-6 text-[#FF5CA8]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="inline-block text-[10px] font-mono uppercase tracking-wider text-[#55C8F5] font-bold">
                {currentStep.badge}
              </div>
              <h2 className="font-serif font-bold text-base sm:text-lg text-white leading-tight truncate">
                {currentStep.title}
              </h2>
              <p className="text-xs font-korean text-purple-200 mt-0.5">
                {currentStep.koreanTitle}
              </p>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex items-center gap-1.5 mt-4">
            {tourSteps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentStepIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === currentStepIndex
                    ? 'w-7 bg-[#FF5CA8]'
                    : idx < currentStepIndex
                    ? 'w-3.5 bg-[#8E77F7]'
                    : 'w-2 bg-purple-400/40 hover:bg-purple-300'
                }`}
                aria-label={`Jump to tour step ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
          <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-medium">
            {currentStep.description}
          </p>

          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-4 space-y-2">
            <span className="font-serif font-bold text-[#1E1B4B] block text-xs uppercase tracking-wider">
              Academic Highlights:
            </span>
            <div className="space-y-1.5">
              {currentStep.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-stone-700 leading-normal">{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/90 text-stone-800 text-[11px] flex items-start gap-2.5">
            <span className="font-bold text-amber-900 shrink-0">Faculty Advice:</span>
            <span className="leading-relaxed">{currentStep.recommendation}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer self-start sm:self-center select-none">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="w-4 h-4 rounded text-[#6C52EE] focus:ring-[#6C52EE]"
            />
            <span>Don't show this walkthrough again on login</span>
          </label>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {!isFirst && (
              <button
                type="button"
                onClick={() => setCurrentStepIndex(prev => prev - 1)}
                className="px-3.5 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
            )}

            {currentStep.targetTab && (
              <button
                type="button"
                onClick={() => handleActionClick(currentStep.targetTab)}
                className="px-3.5 py-2 rounded-xl border border-purple-200 text-[#6C52EE] hover:bg-purple-50 font-bold text-xs transition-colors cursor-pointer"
              >
                {currentStep.actionText || 'Go to Section'}
              </button>
            )}

            {!isLast ? (
              <button
                type="button"
                onClick={() => setCurrentStepIndex(prev => prev + 1)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF5CA8] to-[#FF4D94] hover:from-[#FF4D94] hover:to-[#E63985] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Enter Academy</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
