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
  Volume2
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
      koreanTitle: `친구팝에 오신 것을 환영합니다`,
      badge: `Private Academy • ${currentUser.name} & Partner`,
      icon: GraduationCap,
      description: `ChinguPop is a modern, fun, interactive Korean language learning academy inspired by K-culture, K-drama, and the joy of learning Hangul together. Custom-configured for Dhie and Mhie with rigorous academic standards and conversational fluency.`,
      highlights: [
        `Strict two-student private enrollment (Dhie & Mhie)`,
        `Complete Pre-A1 to TOPIK II academic curriculum`,
        `Progressive immersion tailored to your daily 60-minute schedule`,
        `Integrated Filipino bridge notes for tricky grammar concepts`
      ],
      recommendation: `Begin by exploring your personalized dashboard to review your academic timetable.`
    },
    {
      title: `Your Individual Academic Dashboard`,
      koreanTitle: `개인 학업 대시보드`,
      badge: `Independent Records • 9 Competencies`,
      icon: Sparkles,
      description: `Your dashboard provides a complete academic breakdown of your progress. All homework, quizzes, vocabulary flashcards, and attendance are private to your student ID.`,
      highlights: [
        `9 verified competencies: Reading, Writing, Grammar, Vocabulary, Listening, Speaking, Reading Comp, Writing Comp, Pronunciation`,
        `Daily 60-minute academic timetable with 6 targeted study intervals`,
        `Weekly study statistics: hours logged, attendance consistency, and SRS cards reviewed`,
        `Dynamic recommendations that adapt to your personal learning velocity`
      ],
      recommendation: `Aim for 60 minutes daily, 7 days a week, to maintain distinction standing.`
    },
    {
      title: `Strict Sequential Course Completion`,
      koreanTitle: `엄격한 순차적 과정 이수`,
      badge: `Mastery-First Progression`,
      icon: Lock,
      description: `To prevent foundational knowledge gaps, lessons must be completed sequentially. Advanced lessons and units remain locked until prerequisite modules are formally completed.`,
      highlights: [
        `Sequential lesson locking: Lesson n requires mastery of Lesson n-1`,
        `Comprehensive assessments: homework and quizzes must be submitted`,
        `Clear lock badges indicating prerequisites for each locked module`,
        `Official graduation certificates awarded upon completing course requirements`
      ],
      recommendation: `Complete Lesson 1 (Basic Vowels) to unlock Compound Vowels and Consonants.`
    },
    {
      title: `Interactive Pronunciation & Hangul Lab`,
      koreanTitle: `인터랙티브 발음 및 한글 연구소`,
      badge: `Native Korean Audio & Voice Studio`,
      icon: Volume2,
      description: `Master Korean articulation with high-fidelity native speaker audio, slow playback, detailed mouth position diagrams, voice recording comparison, and an interactive syllable builder.`,
      highlights: [
        `Native Korean audio playback with regular and slow speeds (ko-KR)`,
        `Interactive mouth & tongue position cross-sections for tricky vowels`,
        `Microphone recording with instant audio playback to shadow native speakers`,
        `Syllable block builder displaying real-time vowel and consonant construction`
      ],
      recommendation: `Try recording your pronunciation in the Hangul Lab and compare with native audio.`
    },
    {
      title: `Personal AI Korean Teacher & Speaking Lab`,
      koreanTitle: `전담 AI 한국어 교수 및 말하기 연습실`,
      badge: `24/7 One-on-One Tutoring`,
      icon: Bot,
      description: `Receive instant feedback on grammar, pronunciation, and writing from your personal AI Korean Teacher, Professor Kim. Practice conversational Korean anytime with real-time speech recognition.`,
      highlights: [
        `Available 24/7 for conversational practice and grammar questions`,
        `Bilingual explanations with progressive Korean immersion as you advance`,
        `Detailed speech feedback highlighting liaison, batchim, and tone accuracy`,
        `SuperMemo SM-2 spaced repetition vocabulary flashcards`
      ],
      recommendation: `Ask the AI Teacher: '선생님, ㅏ와 ㅓ의 발음 차이를 설명해 주세요!'`
    }
  ];

  const currentStep = tourSteps[currentStepIndex];
  const StepIcon = currentStep.icon;
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === tourSteps.length - 1;

  const handleFinish = () => {
    if (dontShowAgain) {
      storage.setTourCompleted(currentUser.id, true);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-academy-navy/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-academy-gold/40 max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="bg-academy-navy text-academy-ivory p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-academy-navy-light transition-colors"
            aria-label="Close tour"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-academy-navy-light border border-academy-gold/40 flex items-center justify-center text-academy-gold shadow-inner">
              <StepIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-block text-[10px] font-mono uppercase tracking-wider text-academy-gold bg-academy-navy-light px-2 py-0.5 rounded border border-academy-gold/30 mb-1">
                {currentStep.badge}
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-academy-ivory leading-tight">
                {currentStep.title}
              </h2>
              <p className="text-xs font-korean text-stone-300 mt-0.5">
                {currentStep.koreanTitle}
              </p>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex items-center gap-1.5 mt-5">
            {tourSteps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentStepIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentStepIndex
                    ? 'w-8 bg-academy-gold'
                    : idx < currentStepIndex
                    ? 'w-4 bg-academy-gold/60'
                    : 'w-2 bg-stone-600'
                }`}
                aria-label={`Jump to step ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          <p className="text-stone-700 text-sm leading-relaxed">
            {currentStep.description}
          </p>

          <div className="bg-stone-50 rounded-xl border border-stone-200 p-4 space-y-2">
            <span className="font-serif font-bold text-academy-navy block text-xs uppercase tracking-wider">
              Key Academic Features:
            </span>
            <div className="space-y-1.5">
              {currentStep.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-stone-700">{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 text-academy-charcoal text-[11px] flex items-center gap-2">
            <span className="font-bold text-amber-900 shrink-0">Faculty Advice:</span>
            <span>{currentStep.recommendation}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer self-start sm:self-center">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="w-4 h-4 rounded text-academy-gold focus:ring-academy-gold"
            />
            <span>Don't show this walkthrough again on login</span>
          </label>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {!isFirst && (
              <button
                type="button"
                onClick={() => setCurrentStepIndex(prev => prev - 1)}
                className="px-3.5 py-2 rounded-lg border border-stone-300 hover:bg-stone-100 text-stone-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
            )}

            {!isLast ? (
              <button
                type="button"
                onClick={() => setCurrentStepIndex(prev => prev + 1)}
                className="px-4 py-2 rounded-lg bg-academy-navy hover:bg-academy-navy-light text-academy-ivory font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="px-5 py-2 rounded-lg bg-academy-gold hover:bg-academy-gold-light text-academy-navy font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md active:scale-95"
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
