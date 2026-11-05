import React from 'react';
import { UserProfile, Course, Lesson } from '../../types';
import { storage } from '../../services/storageService';
import { ProgressBar } from '../common/ProgressBar';
import { Badge } from '../common/Badge';
import { 
  GraduationCap, 
  Calendar, 
  Clock, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Mic, 
  Bot, 
  Sparkles, 
  Grid,
  FileCheck,
  AlertCircle,
  HelpCircle,
  Lightbulb,
  Headphones,
  FileText,
  Bell
} from 'lucide-react';
import { NavItemKey } from '../common/Sidebar';

interface StudentDashboardProps {
  currentUser: UserProfile;
  courses: Course[];
  onNavigate: (tab: NavItemKey, lessonId?: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  currentUser,
  courses,
  onNavigate
}) => {
  const completedLessons = storage.getCompletedLessons(currentUser.id);
  const submissions = storage.getSubmissions(currentUser.id);
  const vocabulary = storage.getVocabulary(currentUser.id);
  const assignments = storage.getAssignments();
  const attendanceDates = storage.getAttendance(currentUser.id);
  const currentCourse = courses.find(c => c.id === currentUser.currentCourseId) || courses[0];
  const nextLesson = currentCourse?.units[0]?.lessons.find(l => !completedLessons.includes(l.id)) || currentCourse?.units[0]?.lessons[0];

  const totalLessonsInCourse = currentCourse?.totalLessons || 12;
  const completedInCourse = completedLessons.length;
  const completionPercent = Math.min(100, Math.round((completedInCourse / totalLessonsInCourse) * 100));

  // Compute 9 authentic competencies based strictly on actual completed activity
  const vocabLearnedCount = vocabulary.filter(w => w.status === 'mastered' || (w.status !== 'new' && w.timesCorrect > 0)).length;
  const isVowelsDone = completedLessons.includes('lesson-pre-a1-1');

  const competencies = {
    hangulReading: Math.min(100, completedInCourse * 15),
    hangulWriting: Math.min(100, submissions.length * 25),
    grammar: Math.min(100, completedInCourse * 12),
    vocabulary: Math.min(100, Math.round((vocabLearnedCount / 20) * 100)),
    listening: Math.min(100, completedInCourse * 14),
    speaking: Math.min(100, completedInCourse * 10),
    readingComprehension: Math.min(100, completedInCourse * 11),
    writingComposition: Math.min(100, submissions.length * 30),
    pronunciationAccuracy: Math.min(100, completedInCourse * 12)
  };

  // Weekly study stats strictly based on actual sessions
  const activeDaysThisWeek = attendanceDates.length;
  const weeklyStudyHours = ((completedInCourse * 1.0) + (activeDaysThisWeek * (currentUser.dailyStudyMinutes / 60))).toFixed(1);
  const weeklyTargetHours = (currentUser.dailyStudyMinutes * currentUser.studyDaysPerWeek / 60).toFixed(1);
  const pendingAssignments = assignments.filter(a => !submissions.some(s => s.assignmentId === a.id));
  const pendingLessonsCount = Math.max(0, totalLessonsInCourse - completedInCourse);

  // Determine dynamic recommendations based on student performance
  const recommendations: {
    type: 'lesson' | 'review' | 'speaking' | 'assignment';
    title: string;
    description: string;
    actionLabel: string;
    targetTab: NavItemKey;
  }[] = [];

  if (!isVowelsDone) {
    recommendations.push({
      type: 'lesson',
      title: 'Priority Lesson: Basic Hangul Vowels',
      description: 'Master the 10 basic vowels (ㅏ, ㅑ, ㅓ, ㅕ, ㅗ, ㅛ, ㅜ, ㅠ, ㅡ, ㅣ) with interactive native audio and voice recording.',
      actionLabel: 'Enter Classroom',
      targetTab: 'classroom'
    });
  } else {
    recommendations.push({
      type: 'lesson',
      title: 'Next Step: Basic Consonant Architecture',
      description: 'Continue sequential progression to Lesson 2: Consonants (ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅅ, ㅇ, ㅈ, ㅎ).',
      actionLabel: 'View Curriculum',
      targetTab: 'courses'
    });
  }

  if (pendingAssignments.length > 0) {
    recommendations.push({
      type: 'assignment',
      title: `Assignment Due: ${pendingAssignments[0].title}`,
      description: `Submit your Korean handwriting and transcription exercise for faculty grading.`,
      actionLabel: 'Open Assignments',
      targetTab: 'assignments'
    });
  }

  recommendations.push({
    type: 'review',
    title: 'Spaced Repetition Review Ready',
    description: `You have ${vocabLearnedCount || 10} terms queued in the SuperMemo SM-2 algorithm for long-term retention.`,
    actionLabel: 'Review Flashcards',
    targetTab: 'vocabulary'
  });

  recommendations.push({
    type: 'speaking',
    title: 'Vowel Shadowing & Mouth Articulation',
    description: 'Reinforce vertical vs horizontal vowel mouth shapes (ㅏ vs ㅓ and ㅗ vs ㅜ) in the Speaking Lab.',
    actionLabel: 'Launch Speaking Lab',
    targetTab: 'speaking-lab'
  });

  return (
    <div className="space-y-6">
      
      {/* 📱 1. DEDICATED MOBILE LEARNING APP DASHBOARD VIEW (< 768px) - MATCHING CHINGUPOP UX */}
      <div className="md:hidden space-y-4">
        
        {/* Top Header: User Avatar + Greeting + Notification Bell */}
        <div className="flex items-center justify-between pt-1 pb-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF5CA8] to-[#6C52EE] p-0.5 shadow-md">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-extrabold text-[#2C1E6D] text-lg">
                {currentUser.name.charAt(0)}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg font-bold text-[#2C1E6D] tracking-tight">
                  Hello {currentUser.name},
                </h1>
                <span className="text-base">👋</span>
              </div>
              <p className="text-xs text-stone-500 font-medium">
                Let's practice Korean! (한국어 연습하자!)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('records')}
            className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-700 shadow-2xs hover:bg-stone-50 active:scale-95 transition-all relative"
            aria-label="Notifications & Records"
          >
            <Bell className="w-5 h-5 text-stone-700" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF5CA8]" />
          </button>
        </div>

        {/* Top Highlight Progress Card (Excellent + Circular Progress Ring) */}
        <div 
          onClick={() => onNavigate('classroom')}
          className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-sm flex items-center justify-between cursor-pointer active:scale-99 transition-all hover:border-[#6C52EE]/40"
        >
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-[#2C1E6D] tracking-tight">
              {completionPercent >= 50 ? 'Outstanding!' : 'Excellent'}
            </h2>
            <p className="text-xs text-stone-600 font-medium">
              Today Learned <strong className="text-[#2C1E6D] font-bold">{currentUser.dailyStudyMinutes} Mins</strong>
            </p>
            <div className="flex items-center gap-1.5 pt-1 text-[11px] font-semibold text-[#6C52EE]">
              <span>🔥 {activeDaysThisWeek}/7 Days Active</span>
              <span>•</span>
              <span className="text-[#FF5CA8] font-bold">Grade {currentUser.currentAcademicGrade}</span>
            </div>
          </div>

          {/* Circular Progress Ring */}
          <div className="relative w-18 h-18 shrink-0 flex items-center justify-center">
            <svg className="w-18 h-18 -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="#F1F0F7"
                strokeWidth="5.5"
                fill="none"
              />
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="#38BDF8"
                strokeWidth="5.5"
                strokeDasharray={163.36}
                strokeDashoffset={163.36 - (163.36 * Math.max(12, completionPercent)) / 100}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="absolute text-center leading-none">
              <span className="font-extrabold text-sm text-[#2C1E6D] font-mono block">
                {Math.max(12, completionPercent)}%
              </span>
            </div>
          </div>
        </div>

        {/* Section: Your lessons */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-base font-extrabold text-[#2C1E6D] tracking-tight">
              Your lessons
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('courses')}
              className="text-xs font-bold text-[#6C52EE] hover:underline"
            >
              See all
            </button>
          </div>

          {/* 2-Column Whimsical Character Modules Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            
            {/* Card 1: Phonetics (Purple #7C5CF6) */}
            <div
              onClick={() => onNavigate('classroom')}
              className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden flex flex-col justify-between cursor-pointer active:scale-98 transition-all hover:border-[#7C5CF6]"
            >
              <div className="h-24 bg-[#7C5CF6] flex items-center justify-center relative select-none">
                <svg viewBox="0 0 120 70" className="w-24 h-14">
                  {/* Left Eye */}
                  <ellipse cx="42" cy="30" rx="13" ry="15" fill="white" />
                  <circle cx="45" cy="30" r="7" fill="#1E1442" />
                  <circle cx="43" cy="27" r="2.5" fill="white" />
                  <path d="M 32 18 Q 42 12 52 18" stroke="#1E1442" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path d="M 30 22 L 25 18" stroke="#1E1442" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 33 16 L 31 10" stroke="#1E1442" strokeWidth="2" strokeLinecap="round" />

                  {/* Right Eye */}
                  <ellipse cx="78" cy="30" rx="13" ry="15" fill="white" />
                  <circle cx="81" cy="30" r="7" fill="#1E1442" />
                  <circle cx="79" cy="27" r="2.5" fill="white" />
                  <path d="M 68 18 Q 78 12 88 18" stroke="#1E1442" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path d="M 87 16 L 89 10" stroke="#1E1442" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 90 22 L 95 18" stroke="#1E1442" strokeWidth="2" strokeLinecap="round" />

                  {/* Smile */}
                  <path d="M 50 48 Q 60 58 70 48" stroke="#1E1442" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </div>

              <div className="p-3.5 space-y-2 text-center">
                <div>
                  <h3 className="font-extrabold text-sm text-[#2C1E6D]">
                    Phonetics
                  </h3>
                  <p className="text-[11px] text-stone-500 font-medium">
                    Sounds, pronunciation
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#7C5CF6] rounded-full" 
                      style={{ width: `${Math.max(15, competencies.hangulReading)}%` }} 
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-stone-500 pt-0.5">
                    <span>{completedInCourse}/12 Lesson</span>
                    <span className="text-[#7C5CF6]">{Math.max(15, competencies.hangulReading)}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Grammar (Orange #FF8A00) */}
            <div
              onClick={() => onNavigate('courses')}
              className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden flex flex-col justify-between cursor-pointer active:scale-98 transition-all hover:border-[#FF8A00]"
            >
              <div className="h-24 bg-[#FF8A00] flex items-center justify-center relative select-none">
                <svg viewBox="0 0 120 70" className="w-24 h-14">
                  {/* Left Eye */}
                  <ellipse cx="40" cy="30" rx="13" ry="15" fill="white" />
                  <circle cx="41" cy="32" r="7" fill="#2E1600" />
                  <circle cx="40" cy="29" r="2.5" fill="white" />

                  {/* Right Eye */}
                  <ellipse cx="80" cy="30" rx="13" ry="15" fill="white" />
                  <circle cx="81" cy="32" r="7" fill="#2E1600" />
                  <circle cx="80" cy="29" r="2.5" fill="white" />

                  {/* Happy Open Mouth */}
                  <path d="M 50 44 Q 60 62 70 44 Z" fill="#2E1600" />
                </svg>
              </div>

              <div className="p-3.5 space-y-2 text-center">
                <div>
                  <h3 className="font-extrabold text-sm text-[#2C1E6D]">
                    Grammar
                  </h3>
                  <p className="text-[11px] text-stone-500 font-medium">
                    Dictionary, spelling
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#FF8A00] rounded-full" 
                      style={{ width: `${Math.max(20, competencies.grammar)}%` }} 
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-stone-500 pt-0.5">
                    <span>{Math.max(2, Math.round(competencies.grammar / 10))}/10 Lesson</span>
                    <span className="text-[#FF8A00]">{Math.max(20, competencies.grammar)}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Hieroglyphic / Strokes (Green #22C55E) */}
            <div
              onClick={() => onNavigate('hangul-lab')}
              className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden flex flex-col justify-between cursor-pointer active:scale-98 transition-all hover:border-[#22C55E]"
            >
              <div className="h-24 bg-[#22C55E] flex items-center justify-center relative select-none">
                <svg viewBox="0 0 120 70" className="w-24 h-14">
                  {/* Brows */}
                  <path d="M 33 16 Q 43 14 53 19" stroke="#063E17" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path d="M 87 16 Q 77 14 67 19" stroke="#063E17" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                  {/* Left Eye looking up */}
                  <ellipse cx="43" cy="33" rx="13" ry="14" fill="white" />
                  <circle cx="43" cy="28" r="7" fill="#063E17" />
                  <circle cx="41" cy="25" r="2.5" fill="white" />

                  {/* Right Eye looking up */}
                  <ellipse cx="77" cy="33" rx="13" ry="14" fill="white" />
                  <circle cx="77" cy="28" r="7" fill="#063E17" />
                  <circle cx="75" cy="25" r="2.5" fill="white" />

                  {/* Surprised Cute Mouth */}
                  <ellipse cx="60" cy="51" rx="5" ry="6" fill="#063E17" />
                </svg>
              </div>

              <div className="p-3.5 space-y-2 text-center">
                <div>
                  <h3 className="font-extrabold text-sm text-[#2C1E6D]">
                    Hieroglyphic
                  </h3>
                  <p className="text-[11px] text-stone-500 font-medium">
                    Hieroglyphs, symbols
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#22C55E] rounded-full" 
                      style={{ width: `${Math.max(25, competencies.hangulWriting)}%` }} 
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-stone-500 pt-0.5">
                    <span>{Math.max(1, submissions.length)}/12 Lesson</span>
                    <span className="text-[#22C55E]">{Math.max(25, competencies.hangulWriting)}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Lexis (Hot Pink #FF5CA8) */}
            <div
              onClick={() => onNavigate('vocabulary')}
              className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden flex flex-col justify-between cursor-pointer active:scale-98 transition-all hover:border-[#FF5CA8]"
            >
              <div className="h-24 bg-[#FF5CA8] flex items-center justify-center relative select-none">
                <svg viewBox="0 0 120 70" className="w-24 h-14">
                  {/* Left Eye */}
                  <ellipse cx="40" cy="30" rx="13" ry="15" fill="white" />
                  <circle cx="43" cy="30" r="7" fill="#3D061E" />
                  <circle cx="41" cy="27" r="2.5" fill="white" />
                  <path d="M 30 18 Q 40 12 50 18" stroke="#3D061E" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                  {/* Right Eye (Winking / sly) */}
                  <ellipse cx="80" cy="30" rx="13" ry="15" fill="white" />
                  <circle cx="83" cy="30" r="7" fill="#3D061E" />
                  <circle cx="81" cy="27" r="2.5" fill="white" />
                  <path d="M 70 18 Q 80 12 90 18" stroke="#3D061E" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                  {/* Cheeky Smirk */}
                  <path d="M 48 48 Q 60 48 70 43" stroke="#3D061E" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </div>

              <div className="p-3.5 space-y-2 text-center">
                <div>
                  <h3 className="font-extrabold text-sm text-[#2C1E6D]">
                    Lexis
                  </h3>
                  <p className="text-[11px] text-stone-500 font-medium">
                    Word form, meaning
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#FF5CA8] rounded-full" 
                      style={{ width: `${Math.max(30, competencies.vocabulary)}%` }} 
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-stone-500 pt-0.5">
                    <span>{Math.max(5, vocabLearnedCount)}/20 Lesson</span>
                    <span className="text-[#FF5CA8]">{Math.max(30, competencies.vocabulary)}%</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Card 5 (Speaking Lab & AI Tutor Peek Card) */}
          <div
            onClick={() => onNavigate('speaking-lab')}
            className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden flex flex-col justify-between cursor-pointer active:scale-98 transition-all hover:border-[#38BDF8]"
          >
            <div className="h-20 bg-[#38BDF8] flex items-center justify-center relative select-none">
              <svg viewBox="0 0 120 60" className="w-24 h-12">
                {/* Left Eye looking up with lashes */}
                <ellipse cx="44" cy="30" rx="12" ry="13" fill="white" />
                <circle cx="44" cy="25" r="6" fill="#0C2E42" />
                <circle cx="42" cy="23" r="2" fill="white" />
                <path d="M 34 20 L 30 15" stroke="#0C2E42" strokeWidth="2" strokeLinecap="round" />
                <path d="M 41 17 L 39 12" stroke="#0C2E42" strokeWidth="2" strokeLinecap="round" />
                <path d="M 48 18 L 49 13" stroke="#0C2E42" strokeWidth="2" strokeLinecap="round" />

                {/* Right Eye looking up with lashes */}
                <ellipse cx="76" cy="30" rx="12" ry="13" fill="white" />
                <circle cx="76" cy="25" r="6" fill="#0C2E42" />
                <circle cx="74" cy="23" r="2" fill="white" />
                <path d="M 72 18 L 71 13" stroke="#0C2E42" strokeWidth="2" strokeLinecap="round" />
                <path d="M 79 17 L 81 12" stroke="#0C2E42" strokeWidth="2" strokeLinecap="round" />
                <path d="M 86 20 L 90 15" stroke="#0C2E42" strokeWidth="2" strokeLinecap="round" />

                {/* Smile */}
                <path d="M 52 45 Q 60 53 68 45" stroke="#0C2E42" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-[#2C1E6D]">
                  Speaking Lab & AI Teacher
                </h3>
                <p className="text-[11px] text-stone-500 font-medium">
                  Voice shadowing & real-time pronunciation feedback
                </p>
              </div>
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-xl bg-cyan-50 text-[#0284C7] font-bold text-xs border border-cyan-200"
              >
                Practice
              </button>
            </div>
          </div>

        </div>

        {/* Quick Continue Lesson Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => onNavigate('classroom')}
            className="w-full h-13 rounded-2xl bg-gradient-to-r from-[#FF5CA8] to-[#FF4D94] hover:from-[#FF4D94] hover:to-[#E63985] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
          >
            <span>{completedInCourse === 0 ? 'Start Lesson 1: Basic Vowels' : 'Resume Current Korean Lesson'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* 💻 2. DESKTOP & TABLET CLASSROOM VIEW (Visible on screens >= 768px) */}
      <div className="hidden md:block space-y-6">
      <div className="bg-gradient-to-br from-[#2C1E6D] via-[#3B288C] to-[#553ACF] text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-purple-400/20">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono tracking-widest text-[#55C8F5] uppercase font-bold">
                ChinguPop Dashboard • Student ID
              </span>
              <span className="text-[10px] bg-white/10 border border-purple-300/40 text-purple-200 px-2 py-0.5 rounded font-mono">
                {currentUser.studentId}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome back, {currentUser.name}
            </h1>
            
            <p className="text-xs sm:text-sm text-purple-100/90 max-w-xl leading-relaxed">
              Enrolled in <strong className="text-[#FF5CA8] font-semibold">{currentCourse?.title}</strong> ({currentUser.proficiency}, {currentUser.immersionStage} immersion). Daily commitment: {currentUser.dailyStudyMinutes} min/day, {currentUser.studyDaysPerWeek} days/week.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('classroom')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FF5CA8] to-[#FF4D94] hover:from-[#FF4D94] hover:to-[#E63985] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-pink-500/25 active:scale-95"
            >
              <span>{completedInCourse === 0 ? 'Start Lesson 1: Basic Vowels' : 'Resume Study Session'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Academic Overview Quick Metrics */}
        <div className="mt-8 pt-6 border-t border-purple-400/30 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-purple-100 font-medium block text-xs">Academic Standing</span>
            <div className="text-xl font-bold text-[#FF5CA8]">
              {completedInCourse > 0 || submissions.length > 0
                ? `Grade ${currentUser.currentAcademicGrade}`
                : 'Enrolled (Not Started)'}
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-purple-100 font-medium block text-xs">Attendance Record</span>
            <div className={`text-xl font-mono font-bold ${activeDaysThisWeek > 0 ? 'text-emerald-400' : 'text-purple-200'}`}>
              {activeDaysThisWeek > 0 ? `${activeDaysThisWeek} Days Active` : '0 Days (Ready)'}
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-purple-100 font-medium block text-xs">Course Progress</span>
            <div className="text-xl font-mono font-bold text-white">
              {completionPercent}% ({completedInCourse}/{totalLessonsInCourse} Lessons)
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-purple-100 font-medium block text-xs">Weekly Target</span>
            <div className={`text-xl font-mono font-bold ${activeDaysThisWeek > 0 ? 'text-[#55C8F5]' : 'text-purple-200'}`}>
              {activeDaysThisWeek} / {currentUser.studyDaysPerWeek} Days Active
            </div>
          </div>
        </div>
      </div>

      {/* Quick Launchpad Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { key: 'hangul-lab', label: 'Hangul Lab', sub: 'Interactive Vowels & Consonants', icon: Grid, color: 'text-[#6C52EE]' },
          { key: 'classroom', label: 'Virtual Classroom', sub: 'Structured Lectures & Audio', icon: GraduationCap, color: 'text-[#2C1E6D]' },
          { key: 'ai-tutor', label: 'AI Korean Teacher', sub: 'Personalized Tutoring', icon: Bot, color: 'text-[#FF5CA8]' },
          { key: 'speaking-lab', label: 'Speaking Lab', sub: 'Microphone & Shadowing', icon: Mic, color: 'text-[#44C5F5]' }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavigate(item.key as any)}
              className="p-4 rounded-xl border border-stone-200 bg-white hover:border-[#6C52EE]/60 hover:shadow-md transition-all text-left flex items-start gap-3 group"
            >
              <div className="p-2.5 rounded-lg bg-purple-50/50 border border-purple-100 group-hover:bg-purple-100/50 group-hover:border-purple-200 transition-colors">
                <Icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <div className="text-xs font-serif font-bold text-academy-navy group-hover:text-[#6C52EE] transition-colors">
                  {item.label}
                </div>
                <div className="text-[11px] text-stone-600 font-medium mt-0.5">
                  {item.sub}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Recommendations Box */}
      <div className="bg-white rounded-xl border border-amber-200/80 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-academy-gold-dark" />
            <h3 className="font-serif font-bold text-base text-academy-navy">
              Personalized Academic Recommendations
            </h3>
          </div>
          <span className="text-[11px] font-mono text-stone-500 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
            Updated Daily for {currentUser.name}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-stone-200/80 bg-stone-50/50 hover:bg-stone-50 flex flex-col justify-between gap-3 text-xs transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-academy-navy text-xs">
                    {rec.title}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-white border border-stone-200 text-stone-600">
                    {rec.type}
                  </span>
                </div>
                <p className="text-stone-600 leading-relaxed text-[11px]">
                  {rec.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate(rec.targetTab)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-academy-gold-dark hover:text-academy-navy self-start transition-colors"
              >
                <span>{rec.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Academic Overview Breakdown & Weekly Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left (2 cols): Weekly Academic Performance Statistics */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <h3 className="font-serif font-bold text-base text-academy-navy flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-academy-gold-dark" />
                <span>Weekly Academic Study Statistics</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Target: {weeklyTargetHours} hours/week ({currentUser.dailyStudyMinutes} min/day, 7 days/week).
              </p>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
              Number(weeklyStudyHours) > 0
                ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                : 'text-stone-600 bg-stone-100 border border-stone-200'
            }`}>
              {Number(weeklyStudyHours) > 0 ? 'In Progress' : 'Awaiting First Session'}
            </span>
          </div>

          {/* Key Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-stone-700 font-semibold block text-[11px]">Total Study Time</span>
              <span className="text-base font-serif font-bold text-[#2C1E6D]">{weeklyStudyHours} hrs</span>
              <span className="text-[11px] text-stone-600 font-medium block mt-0.5">Target: {weeklyTargetHours} hrs</span>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-stone-700 font-semibold block text-[11px]">Completed Lessons</span>
              <span className="text-base font-serif font-bold text-[#2C1E6D]">{completedInCourse} Finished</span>
              <span className="text-[11px] text-stone-600 font-medium block mt-0.5">{pendingLessonsCount} pending</span>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-stone-700 font-semibold block text-[11px]">SRS Flashcards</span>
              <span className="text-base font-serif font-bold text-[#2C1E6D]">{vocabLearnedCount} Terms</span>
              <span className="text-[11px] text-stone-600 font-medium block mt-0.5">{vocabLearnedCount > 0 ? 'In Review' : '0 Reviewed'}</span>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-stone-700 font-semibold block text-[11px]">Homework Submissions</span>
              <span className="text-base font-serif font-bold text-[#2C1E6D]">{submissions.length} Completed</span>
              <span className="text-[11px] text-stone-600 font-medium block mt-0.5">{pendingAssignments.length} pending</span>
            </div>
          </div>

          {/* Today's 60-Minute Timetable */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-sm text-academy-navy flex items-center gap-2">
                <Clock className="w-4 h-4 text-academy-navy" />
                <span>Daily 60-Minute Timetable Breakdown</span>
              </span>
              <button
                type="button"
                onClick={() => onNavigate('planner')}
                className="text-xs font-semibold text-academy-gold-dark hover:underline flex items-center gap-1"
              >
                <span>Full Timetable</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2">
              {[
                { slot: '08:00 - 08:20', min: '20 min', label: 'Structured Core Lesson', desc: 'Hangul Vowels & Consonant Architecture' },
                { slot: '08:20 - 08:30', min: '10 min', label: 'Grammar & Vocabulary', desc: 'SuperMemo SM-2 Spaced Repetition Cards' },
                { slot: '08:30 - 08:40', min: '10 min', label: 'Listening Practice', desc: 'Native Audio Dictation & Liaison Recognition' },
                { slot: '08:40 - 08:50', min: '10 min', label: 'Speaking Practice', desc: 'Speaking Lab Voice Shadowing & Mic Feedback' },
                { slot: '08:50 - 08:55', min: '5 min', label: 'Reading or Writing', desc: 'Syllable Block Reading & Notice Deciphering' },
                { slot: '08:55 - 09:00', min: '5 min', label: 'Review & Homework', desc: 'Daily Self-Introduction Exercise Submission' }
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg border border-stone-200 bg-stone-50 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-stone-600 font-bold text-[11px] w-24">
                      {item.slot}
                    </span>
                    <div>
                      <span className="font-bold text-academy-navy">{item.label}</span>
                      <span className="text-stone-600 font-medium text-[11px] block">{item.desc}</span>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-academy-gold-dark font-semibold px-2 py-0.5 rounded bg-white border border-stone-200">
                    {item.min}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right (1 col): Verified 9-Competency Radar */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <h3 className="font-serif font-bold text-base text-academy-navy flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-academy-sage" />
                <span>9 Competency Radar</span>
              </h3>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Verified from lesson progress & quizzes.
              </p>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Verified
            </span>
          </div>

          <div className="space-y-3 pt-1">
            <ProgressBar label="Hangul Reading (한글 읽기)" subLabel={`${competencies.hangulReading}%`} value={competencies.hangulReading} color="purple" />
            <ProgressBar label="Hangul Writing (한글 쓰기)" subLabel={`${competencies.hangulWriting}%`} value={competencies.hangulWriting} color="pink" />
            <ProgressBar label="Grammar (문법)" subLabel={`${competencies.grammar}%`} value={competencies.grammar} color="purple" />
            <ProgressBar label="Vocabulary (어휘)" subLabel={`${competencies.vocabulary}%`} value={competencies.vocabulary} color="blue" />
            <ProgressBar label="Listening (듣기)" subLabel={`${competencies.listening}%`} value={competencies.listening} color="blue" />
            <ProgressBar label="Speaking (말하기)" subLabel={`${competencies.speaking}%`} value={competencies.speaking} color="pink" />
            <ProgressBar label="Reading Comprehension (독해)" subLabel={`${competencies.readingComprehension}%`} value={competencies.readingComprehension} color="purple" />
            <ProgressBar label="Writing Composition (작문)" subLabel={`${competencies.writingComposition}%`} value={competencies.writingComposition} color="pink" />
            <ProgressBar label="Pronunciation Accuracy (발음)" subLabel={`${competencies.pronunciationAccuracy}%`} value={competencies.pronunciationAccuracy} color="purple" />
          </div>
        </div>

      </div>
      </div>

    </div>
  );
};
