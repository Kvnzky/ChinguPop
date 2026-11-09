import React, { useState } from 'react';
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
  Bell,
  Search,
  MoreHorizontal,
  Folder,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Check,
  Users,
  LayoutDashboard,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Flame,
  Gamepad2,
  RotateCcw,
  Trophy
} from 'lucide-react';
import { NavItemKey } from '../common/Sidebar';

interface StudentDashboardProps {
  currentUser: UserProfile;
  courses: Course[];
  onNavigate: (tab: NavItemKey, lessonId?: string) => void;
  onOpenAuth?: (tab: 'signin' | 'register') => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  currentUser,
  courses,
  onNavigate,
  onOpenAuth
}) => {
  const isGuestVisitor = currentUser.id === 'guest-visitor' || (!storage.isAuthenticated() && !storage.isAdminAuthenticated());
  const completedLessons = storage.getCompletedLessons(currentUser.id);
  const submissions = storage.getSubmissions(currentUser.id);
  const vocabulary = storage.getVocabulary(currentUser.id);
  const assignments = storage.getAssignments();
  const attendanceDates = storage.getAttendance(currentUser.id);
  const currentCourse = courses.find(c => c.id === currentUser.currentCourseId) || courses[0];
  const nextLesson = currentCourse?.units[0]?.lessons.find(l => !completedLessons.includes(l.id)) || currentCourse?.units[0]?.lessons[0];

  const courseProgress = storage.getCourseProgress(currentUser.id, currentCourse?.id || 'course-pre-a1');
  const totalLessonsInCourse = courseProgress.totalLessons;
  const completedInCourse = courseProgress.completedLessonsCount;
  const completionPercent = courseProgress.completionPercent;
  const courseStatus = courseProgress.status;
  const completedCourses = storage.getCompletedCourses(currentUser.id);
  const completedCoursesCount = completedCourses.length;
  const gamification = storage.getGamificationState(currentUser.id);
  const levelInfo = storage.getLevel(currentUser.id);
  const streakInfo = storage.getStreak(currentUser.id);
  const reviewQueue = storage.getReviewQueue(currentUser.id);
  const dueReviewCount = reviewQueue.filter(r => r.nextReviewDate <= new Date().toISOString().split('T')[0]).length;
  const achievementsList = storage.getAchievements(currentUser.id);

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
  const todayIso = new Date().toISOString().split('T')[0];
  const hasLearnedToday = attendanceDates.includes(todayIso);
  const todayLearnedMinutes = hasLearnedToday ? Math.max(15, completedInCourse * 15) : 0;
  const weeklyStudyHours = ((completedInCourse * 0.5) + (activeDaysThisWeek * 0.5)).toFixed(1);
  const weeklyTargetHours = (currentUser.dailyStudyMinutes * currentUser.studyDaysPerWeek / 60).toFixed(1);
  const pendingAssignments = assignments.filter(a => !submissions.some(s => s.assignmentId === a.id));
  const pendingLessonsCount = Math.max(0, totalLessonsInCourse - completedInCourse);

  // Desktop interactive states matching ChinguPop design
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<number>(26);
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState('March 2026');
  const [showAcademicDrawer, setShowAcademicDrawer] = useState(false);
    const [tabletSearchQuery, setTabletSearchQuery] = useState('');
  const [tabletPeriod, setTabletPeriod] = useState<'Today' | 'Week' | 'Month'>('Today');
  const [showTabletPeriodMenu, setShowTabletPeriodMenu] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [activeArticleModal, setActiveArticleModal] = useState<{
    title: string;
    category: string;
    readTime: string;
    content: string;
    tab: NavItemKey;
  } | null>(null);

  // Build authentic searchable items across all Korean courses, lessons, and academy labs
  const searchableItems: Array<{ label: string; sublabel: string; tab: NavItemKey; lessonId?: string }> = [
    ...courses.flatMap(c =>
      c.units.flatMap(u =>
        u.lessons.map(l => ({
          label: `${l.title} (${l.koreanTitle})`,
          sublabel: c.title,
          tab: 'classroom' as NavItemKey,
          lessonId: l.id
        }))
      )
    ),
    { label: 'Hangul Lab & Interactive Alphabet (한글 실험실)', sublabel: 'Phonetics & Stroke Order', tab: 'hangul-lab' as NavItemKey },
    { label: 'Vocabulary Flashcard Deck (SRS 단어장)', sublabel: 'Spaced Repetition Lexicon', tab: 'vocabulary' as NavItemKey },
    { label: 'Speaking & Pronunciation Studio (발음 연습실)', sublabel: 'Acoustic Shadowing', tab: 'speaking-lab' as NavItemKey },
    { label: 'Professor Kim AI Korean Tutor (AI 한국어 선생님)', sublabel: '24/7 Grammar & Conversation Coach', tab: 'ai-tutor' as NavItemKey },
    { label: 'Practice Arcade Games (한국어 게임 아케이드)', sublabel: '9 Interactive Korean Drills', tab: 'arcade' as NavItemKey },
    { label: 'Examinations & Level Tests (정기 시험)', sublabel: 'Academic Certification', tab: 'examinations' as NavItemKey }
  ];

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
    <div className="space-y-5">
      
      

      {isGuestVisitor && (
        <div className="bg-gradient-to-r from-[#2C1E6D] via-[#4F35C8] to-[#6C52EE] rounded-3xl p-5 sm:p-6 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-purple-300/30">
          <div className="space-y-1">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/15 text-purple-100 text-[10px] font-bold uppercase tracking-wider">
              Public Visitor Mode • Not Signed In
            </span>
            <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
              Welcome to ChinguPop Korean Language Academy! 🇰🇷
            </h2>
            <p className="text-xs text-purple-100/90 max-w-xl leading-relaxed">
              Sign in to your account or register a free scholar profile to save your lesson progress, track vocabulary flashcards, and earn certificates.
            </p>
          </div>
          
        </div>
      )}

      {/* 🌟 Gamified Quest Bar: Level, XP Progress, Streak Flame, Arcade & Review Room Shortcuts */}
      <div className="bg-white rounded-3xl p-4 lg:p-5 border border-stone-200/90 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {isGuestVisitor ? (
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 p-0.5 shadow-xs shrink-0 flex items-center justify-center border border-stone-200">
              <div className="w-full h-full rounded-2xl bg-white flex flex-col items-center justify-center text-stone-400 font-bold text-xs">
                <span>Guest</span>
              </div>
            </div>
            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xs text-stone-700 truncate">
                  Guest Visitor Mode
                </span>
                <span className="text-[10px] font-bold text-stone-400">
                  0 XP • No XP in Guest Mode
                </span>
              </div>
              <p className="text-[11px] text-stone-500">
                Sign in to your account to earn XP, track lesson mastery, level up, and maintain streaks!
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6C52EE] to-[#FF5CA8] p-0.5 shadow-xs shrink-0 flex items-center justify-center">
              <div className="w-full h-full rounded-2xl bg-white flex flex-col items-center justify-center text-[#2C1E6D] font-black text-xs">
                <span>Lv.{levelInfo.level}</span>
              </div>
            </div>
            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xs text-[#1E1B4B] truncate">
                  {levelInfo.title}
                </span>
                <span className="text-[10px] font-bold text-stone-400">
                  {levelInfo.currentLevelXP} / {levelInfo.nextLevelXP} XP
                </span>
              </div>
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden max-w-xs">
                <div 
                  className="h-full bg-gradient-to-r from-[#6C52EE] to-[#FF5CA8] rounded-full transition-all duration-500" 
                  style={{ width: `${levelInfo.progressPercent}%` }} 
                />
              </div>
            </div>
          </div>
        )}

        {/* Action Shortcuts: Streak, Arcade & Review Room */}
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          {isGuestVisitor ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-500 font-bold text-xs" title="No streak in Guest Mode">
              <Flame className="w-4 h-4 text-stone-400" />
              <span>0 Day Streak</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200/80 text-orange-600 font-extrabold text-xs">
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
              <span>{streakInfo.currentStreak} Day Streak</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => onNavigate('arcade')}
            className="px-3.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200/80 text-[#6C52EE] font-extrabold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Gamepad2 className="w-4 h-4 text-[#6C52EE]" />
            <span>Arcade Games (9)</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('review-room')}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 text-emerald-700 font-extrabold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs relative"
          >
            <RotateCcw className="w-4 h-4 text-emerald-600" />
            <span>Review Room</span>
            {dueReviewCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white font-extrabold text-[9px] flex items-center justify-center">
                {dueReviewCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowAchievementsModal(true)}
            className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200/80 text-amber-700 font-extrabold text-xs transition-colors flex items-center gap-1 cursor-pointer"
            title="View Achievements"
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Badges</span>
          </button>
        </div>
      </div>

      {/* 📱 1. DEDICATED MOBILE LEARNING APP DASHBOARD VIEW (< 768px) - MATCHING CHINGUPOP UX */}
      <div className="block md:hidden space-y-4">
        
        {/* Top Header: User Avatar + Greeting + Notification Bell */}
        <div className="flex items-center justify-between pt-1 pb-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF5CA8] to-[#6C52EE] p-0.5 shadow-md">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-extrabold text-[#2C1E6D] text-lg">
                {isGuestVisitor ? '🇰🇷' : currentUser.name.charAt(0)}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg font-bold text-[#2C1E6D] tracking-tight">
                  {isGuestVisitor ? 'Welcome to ChinguPop!' : `Hello ${currentUser.name},`}
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
              {completionPercent === 100 ? 'Course Completed! 🎉' : completionPercent >= 70 ? 'Outstanding!' : completionPercent > 0 ? 'Good Progress!' : 'Ready to Start!'}
            </h2>
            <p className="text-xs text-stone-600 font-medium">
              Today Learned <strong className="text-[#2C1E6D] font-bold">{todayLearnedMinutes} Mins</strong>
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
                strokeDashoffset={163.36 - (163.36 * completionPercent) / 100}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="absolute text-center leading-none">
              <span className="font-extrabold text-sm text-[#2C1E6D] font-mono block">
                {completionPercent}%
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
                      style={{ width: `${competencies.hangulReading}%` }} 
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-stone-500 pt-0.5">
                    <span>{completedInCourse}/{totalLessonsInCourse} Lesson</span>
                    <span className="text-[#7C5CF6]">{competencies.hangulReading}%</span>
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
                      style={{ width: `${competencies.grammar}%` }} 
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-stone-500 pt-0.5">
                    <span>{Math.min(10, completedInCourse)}/10 Lesson</span>
                    <span className="text-[#FF8A00]">{competencies.grammar}%</span>
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
                      style={{ width: `${competencies.hangulWriting}%` }} 
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-stone-500 pt-0.5">
                    <span>{submissions.length}/12 Lesson</span>
                    <span className="text-[#22C55E]">{competencies.hangulWriting}%</span>
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
                      style={{ width: `${competencies.vocabulary}%` }} 
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-stone-500 pt-0.5">
                    <span>{vocabLearnedCount}/20 Lesson</span>
                    <span className="text-[#FF5CA8]">{competencies.vocabulary}%</span>
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

      {/* 📟 2. DEDICATED TABLET (iPAD) LEARNING DASHBOARD VIEW (768px - 1279px) - MATCHING CHINGUPOP TABLET UX */}
      <div className="hidden md:block xl:hidden space-y-4">
        <div className="bg-white rounded-[32px] p-5 lg:p-6 shadow-sm border border-stone-200/80">
          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            
            {/* Center Main Workspace (Full width on 768px portrait, 2/3 width on 1024px landscape) */}
            <div className="flex-1 min-w-0 space-y-4">
              
              {/* ChinguPop Cohort & Faculty Quick Strip */}
              <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => onNavigate('academy-overview')}
                    className="w-11 h-11 rounded-full border-2 border-dashed border-[#8E77F7] flex items-center justify-center text-[#6C52EE] hover:bg-purple-50 transition-colors"
                    title="View Cohort Roster"
                  >
                    <Users className="w-4 h-4" />
                  </button>
                  <span className="text-[10px] font-semibold text-[#6C52EE]">Cohort</span>
                </div>

                {[
                  { name: 'Dhie', role: 'Scholar', tab: 'academy-overview' as NavItemKey, badge: 'D', color: 'from-[#6C52EE] to-[#8E77F7]' },
                  { name: 'Mhie', role: 'Scholar', tab: 'academy-overview' as NavItemKey, badge: 'M', color: 'from-[#FF5CA8] to-[#FF8A00]' },
                  { name: 'Prof. Kim', role: 'AI Tutor', tab: 'ai-tutor' as NavItemKey, badge: '김', color: 'from-[#1E1B4B] to-[#4338CA]' },
                  { name: 'Hangul Lab', role: '40 Jamo', tab: 'hangul-lab' as NavItemKey, badge: '한', color: 'from-[#0D9488] to-[#14B8A6]' },
                  { name: 'Arcade', role: '9 Games', tab: 'arcade' as NavItemKey, badge: '🎮', color: 'from-[#EA580C] to-[#F59E0B]' },
                ].map((buddy, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onNavigate(buddy.tab)}
                    className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group"
                  >
                    <div className={`w-11 h-11 rounded-full p-0.5 border-2 border-purple-200 group-hover:border-[#6C52EE] transition-all overflow-hidden bg-gradient-to-tr ${buddy.color} text-white font-serif font-bold text-sm flex items-center justify-center shadow-2xs`}>
                      {buddy.badge}
                    </div>
                    <span className="text-[10px] font-semibold text-stone-700 group-hover:text-[#6C52EE]">
                      {buddy.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Welcome Hero Card */}
              <div className="bg-[#FAF9FF] border border-purple-100/90 rounded-3xl p-4 lg:p-5 relative overflow-hidden flex items-center justify-between shadow-xs">
                <div className="space-y-1.5 z-10 max-w-[65%]">
                  <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-[#6C52EE] bg-purple-100/80 px-2.5 py-0.5 rounded-full">
                    {courseStatus} • {completedInCourse}/{totalLessonsInCourse} Lessons
                  </span>
                  <h2 className="text-lg lg:text-xl font-black text-[#1E1B4B] tracking-tight">
                    환영합니다, <span className="text-[#6C52EE]">{currentUser.name.split(' ')[0]}!</span>
                  </h2>
                  <p className="text-[11px] text-stone-600 font-medium leading-relaxed">
                    {nextLesson
                      ? `Next Lesson: ${nextLesson.title} (${nextLesson.koreanTitle})`
                      : 'Continue your structured Korean mastery from Pre-A1 to C1.'}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigate('classroom', nextLesson?.id)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF7DA0] to-[#7C5CF6] hover:from-[#FF6B93] hover:to-[#6C52EE] text-white font-extrabold text-xs shadow-xs transition-all active:scale-98"
                    >
                      {completedInCourse > 0 ? 'Resume Classroom' : 'Start Lesson 1'}
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('examinations')}
                      className="px-3.5 py-2 rounded-xl bg-white border border-purple-200 text-[#2C1E6D] hover:bg-purple-50 font-bold text-xs transition-all"
                    >
                      Level Exams
                    </button>
                  </div>
                </div>

                {/* 3D Scholar Graphic */}
                <div className="relative z-10 w-28 h-24 lg:w-32 lg:h-28 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 160 140" className="w-full h-full drop-shadow-md select-none">
                    <path d="M 25 110 L 95 125 L 145 105 L 75 92 Z" fill="#22C55E" />
                    <path d="M 25 110 L 25 118 L 95 133 L 95 125 Z" fill="#16A34A" />
                    <path d="M 95 125 L 95 133 L 145 113 L 145 105 Z" fill="#15803D" />
                    <path d="M 27 114 L 93 128 L 93 130 L 27 116 Z" fill="#FEF08A" />

                    <path d="M 32 94 L 98 108 L 140 90 L 74 78 Z" fill="#FFFFFF" />
                    <path d="M 32 94 L 32 101 L 98 115 L 98 108 Z" fill="#E2E8F0" />
                    <path d="M 98 108 L 98 115 L 140 97 L 140 90 Z" fill="#CBD5E1" />

                    <path d="M 38 78 L 96 90 L 135 74 L 77 64 Z" fill="#7C5CF6" />
                    <path d="M 38 78 L 38 84 L 96 96 L 96 90 Z" fill="#6C52EE" />
                    <path d="M 96 90 L 96 96 L 135 80 L 135 74 Z" fill="#5B21B6" />

                    <ellipse cx="65" cy="62" rx="14" ry="7" fill="#1E293B" />
                    <ellipse cx="95" cy="62" rx="14" ry="7" fill="#1E293B" />

                    <rect x="68" y="32" width="24" height="28" rx="6" fill="#FB923C" />
                    <path d="M 74 32 L 80 40 L 86 32 Z" fill="white" />

                    <path d="M 64 40 L 56 48 L 74 54" stroke="#EA580C" strokeWidth="4" strokeLinecap="round" fill="none" />
                    <path d="M 96 40 L 104 48 L 86 54" stroke="#EA580C" strokeWidth="4" strokeLinecap="round" fill="none" />
                    <polygon points="68,46 92,46 88,58 72,58" fill="#F8FAFC" stroke="#64748B" strokeWidth="1" />

                    <circle cx="80" cy="22" r="11" fill="#FED7AA" />
                    <path d="M 69 19 Q 80 11 91 19 Q 85 10 75 12 Z" fill="#FFFFFF" />
                    <ellipse cx="80" cy="14" rx="12" ry="4" fill="#E2E8F0" />
                    <circle cx="80" cy="10" r="2" fill="#F59E0B" />
                    <path d="M 98 12 L 102 7 L 106 12 L 111 16 L 106 20 L 102 25 L 98 20 L 93 16 Z" fill="#FBBF24" opacity="0.8" />
                  </svg>
                </div>
              </div>

              {/* Middle 2 Cards (Last Results & Course Mastery) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Last Results */}
                <div className="bg-white rounded-2xl p-3.5 border border-stone-200/90 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2.5">
                    <h3 className="font-extrabold text-xs text-[#1E1B4B]">Unit Progress</h3>
                    <button 
                      type="button"
                      onClick={() => onNavigate('records')}
                      className="text-[10px] font-bold text-[#6C52EE] hover:underline bg-purple-50 px-2 py-0.5 rounded-md"
                    >
                      Transcript &gt;
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[9.5px] font-semibold text-stone-600">
                        <span className="truncate">Unit 1 • Hangul Basic Vowels (기본 모음)</span>
                        <span className="font-mono font-bold text-[#6C52EE]">{competencies.hangulReading}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#6C52EE] rounded-full" style={{ width: `${competencies.hangulReading}%` }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[9.5px] font-semibold text-stone-600">
                        <span className="truncate">Unit 2 • Basic Consonants (기본 자음)</span>
                        <span className="font-mono font-bold text-[#7C5CF6]">{competencies.grammar}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#B4A0FF] rounded-full" style={{ width: `${competencies.grammar}%` }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[9.5px] font-semibold text-stone-600">
                        <span className="truncate">Unit 3 • Final Consonants (받침 Batchim)</span>
                        <span className="font-mono font-bold text-amber-600">{competencies.hangulWriting}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: `${competencies.hangulWriting}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Completion Donut */}
                <div className="bg-white rounded-2xl p-3.5 border border-stone-200/90 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-extrabold text-xs text-[#1E1B4B]">Course Mastery</h3>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowTabletPeriodMenu(!showTabletPeriodMenu)}
                        className="text-[9.5px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md flex items-center gap-1"
                      >
                        <span>{tabletPeriod}</span>
                        <ChevronDown className="w-3 h-3 text-stone-400" />
                      </button>
                      {showTabletPeriodMenu && (
                        <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-stone-200 p-1 z-30 min-w-20">
                          {(['Today', 'Week', 'Month'] as const).map(p => (
                            <div
                              key={p}
                              onClick={() => {
                                setTabletPeriod(p);
                                setShowTabletPeriodMenu(false);
                              }}
                              className="px-2 py-1 text-[10px] font-bold hover:bg-purple-50 text-stone-700 cursor-pointer rounded-md"
                            >
                              {p}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Donut graphic */}
                  <div className="flex items-center justify-center relative py-1">
                    <svg viewBox="0 0 100 100" className="w-20 h-20">
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#F1F5F9" strokeWidth="9" />
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="#6C52EE"
                        strokeWidth="9"
                        strokeDasharray="238.76"
                        strokeDashoffset={238.76 - (238.76 * completionPercent) / 100}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-sm font-black text-[#1E1B4B]">{completionPercent}%</span>
                    </div>

                    <div className="absolute top-0.5 right-3 text-amber-500">
                      <Flame className="w-3.5 h-3.5 fill-amber-500" />
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 text-[9px] font-semibold text-stone-500">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6C52EE]" />
                      <span>Completed ({completedInCourse}/{totalLessonsInCourse})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Your Courses */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-xs text-[#1E1B4B]">Enrolled Korean Courses</h3>
                  <button
                    type="button"
                    onClick={() => onNavigate('courses')}
                    className="text-[10px] font-bold text-[#6C52EE] hover:underline"
                  >
                    Full Catalog ({courses.length} Courses) &gt;
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => onNavigate('classroom')}
                    className="bg-white rounded-2xl p-3 border border-stone-200/90 shadow-2xs cursor-pointer hover:border-[#6C52EE]/50 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-xs text-[#1E1B4B] group-hover:text-[#6C52EE] transition-colors truncate">
                          Level 1: Pre-A1 Hangul Foundations
                        </h4>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      </div>
                      <div className="flex items-center gap-1.5 text-[9.5px] text-stone-500 mb-2.5">
                        <span className="w-4 h-4 rounded-full bg-[#6C52EE] text-white font-serif font-bold text-[9px] flex items-center justify-center shrink-0">
                          김
                        </span>
                        <span className="truncate">Prof. Min-jun Kim (김민준)</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[9px] text-stone-500 border-t border-stone-100 pt-2 font-medium">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-stone-400" />
                        {totalLessonsInCourse} lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-stone-400" />
                        {courseStatus}
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => onNavigate('courses')}
                    className="bg-white rounded-2xl p-3 border border-stone-200/90 shadow-2xs cursor-pointer hover:border-[#6C52EE]/50 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-xs text-[#1E1B4B] group-hover:text-[#6C52EE] transition-colors truncate">
                          Level 2: Beginner Korean 1 (TOPIK I)
                        </h4>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      </div>
                      <div className="flex items-center gap-1.5 text-[9.5px] text-stone-500 mb-2.5">
                        <span className="w-4 h-4 rounded-full bg-[#FF5CA8] text-white font-serif font-bold text-[9px] flex items-center justify-center shrink-0">
                          박
                        </span>
                        <span className="truncate">Prof. Ji-won Park (박지원)</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[9px] text-stone-500 border-t border-stone-100 pt-2 font-medium">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-stone-400" />
                        8 lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-stone-400" />
                        16 hours
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Panel (Stacks cleanly on 768px portrait, side column on 1024px landscape) */}
            <div className="w-full lg:w-64 shrink-0 space-y-4 pt-4 lg:pt-0 lg:pl-4 border-t lg:border-t-0 lg:border-l border-stone-100">
              
              {/* Search Korean Lessons & Modules */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={tabletSearchQuery}
                  onChange={(e) => setTabletSearchQuery(e.target.value)}
                  placeholder="Search Korean lessons..."
                  className="w-full bg-[#F8F9FD] rounded-xl pl-8 pr-7 py-2 text-xs border border-stone-200/80 focus:outline-none focus:ring-1 focus:ring-[#6C52EE] text-stone-800 placeholder-stone-400 font-medium"
                />
                {tabletSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setTabletSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
                {tabletSearchQuery.trim().length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-2xl border border-stone-200 shadow-xl z-50 p-2 space-y-1 max-h-60 overflow-y-auto">
                    {searchableItems
                      .filter(item => item.label.toLowerCase().includes(tabletSearchQuery.toLowerCase()) || item.sublabel.toLowerCase().includes(tabletSearchQuery.toLowerCase()))
                      .slice(0, 6)
                      .map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setTabletSearchQuery('');
                            onNavigate(item.tab, item.lessonId);
                          }}
                          className="w-full text-left p-2 rounded-xl hover:bg-purple-50 text-[11px] text-[#2C1E6D] font-semibold flex items-center justify-between gap-2"
                        >
                          <span className="truncate">{item.label}</span>
                          <ArrowRight className="w-3 h-3 text-stone-400 shrink-0" />
                        </button>
                      ))}
                  </div>
                )}
              </div>

              {/* Student Profile Snapshot */}
              <div className="text-center pt-1 pb-2">
                <div className="w-14 h-14 rounded-full mx-auto p-0.5 bg-gradient-to-tr from-[#6C52EE] via-[#EC4899] to-[#38BDF8] shadow-md mb-2">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center font-serif font-black text-lg text-[#2C1E6D]">
                    {currentUser.name.charAt(0)}
                  </div>
                </div>
                <h3 className="font-extrabold text-xs text-[#1E1B4B]">{currentUser.name}</h3>
                <span className="text-[10px] font-mono text-stone-500">{currentUser.studentId}</span>

                {/* Real Korean Competency Tracks */}
                <div className="mt-3.5 space-y-2.5 text-left">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono font-bold text-[10px] text-[#6C52EE] w-7 shrink-0">A0</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-[9.5px] font-semibold text-stone-700 leading-none mb-1">
                        <span>Hangul & Phonetics</span>
                        <span className="font-mono text-stone-500">{competencies.hangulReading}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#4F35C8] rounded-full" style={{ width: `${competencies.hangulReading}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono font-bold text-[10px] text-[#7C5CF6] w-7 shrink-0">A1</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-[9.5px] font-semibold text-stone-700 leading-none mb-1">
                        <span>Korean Grammar</span>
                        <span className="font-mono text-stone-500">{competencies.grammar}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#7C5CF6] rounded-full" style={{ width: `${competencies.grammar}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono font-bold text-[10px] text-[#FF5CA8] w-7 shrink-0">SRS</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-[9.5px] font-semibold text-stone-700 leading-none mb-1">
                        <span>Korean Vocabulary</span>
                        <span className="font-mono text-stone-500">{competencies.vocabulary}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#A088FF] rounded-full" style={{ width: `${competencies.vocabulary}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Korean Studio */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-[11px] text-[#1E1B4B]">Active Korean Studio</h4>
                  <button 
                    type="button"
                    onClick={() => onNavigate('speaking-lab')}
                    className="text-[9.5px] font-bold text-stone-400 hover:text-[#6C52EE]"
                  >
                    Open Lab
                  </button>
                </div>

                <div
                  onClick={() => onNavigate('speaking-lab')}
                  className="bg-white rounded-xl p-2.5 border border-stone-200/90 shadow-2xs border-l-4 border-l-[#FF8A00] cursor-pointer hover:shadow-xs transition-all"
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <h5 className="font-bold text-[11px] text-[#1E1B4B] truncate">Korean Speaking Studio (발음 연습)</h5>
                    <Mic className="w-3.5 h-3.5 text-[#FF8A00] shrink-0" />
                  </div>
                  <p className="text-[9.5px] text-stone-500 font-medium mb-2">
                    Daily Acoustic Shadowing • {currentUser.dailyStudyMinutes} mins
                  </p>

                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#6C52EE]">
                    <span>Practice Native Pronunciation &rarr;</span>
                  </div>
                </div>
              </div>

              {/* Academic Assignments & Assessments */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-[11px] text-[#1E1B4B]">Academic Tasks</h4>
                  <button 
                    type="button"
                    onClick={() => onNavigate('assignments')}
                    className="text-[9.5px] font-bold text-stone-400 hover:text-[#6C52EE]"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-1.5">
                  <div
                    onClick={() => onNavigate('examinations')}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-stone-50 cursor-pointer transition-colors"
                  >
                    <div className="w-6 h-6 rounded-lg bg-purple-50 text-[#6C52EE] font-serif font-bold flex items-center justify-center shrink-0 text-xs shadow-2xs">
                      한
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold text-[#1E1B4B] truncate">
                        Hangul Mastery Examination
                      </div>
                      <div className="text-[8.5px] text-stone-500 font-medium">
                        {courseProgress.status === 'Completed' ? 'Passed ✓' : 'Required for Course Completion'}
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => onNavigate('assignments')}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-stone-50 cursor-pointer transition-colors"
                  >
                    <div className="w-6 h-6 rounded-lg bg-pink-50 text-pink-600 font-serif font-bold flex items-center justify-center shrink-0 text-xs shadow-2xs">
                      글
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold text-[#1E1B4B] truncate">
                        Self-Introduction Essay (자기소개서)
                      </div>
                      <div className="text-[8.5px] text-stone-500 font-medium">
                        {submissions.length} Submitted • {pendingAssignments.length} Pending
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* 💻 3. DESKTOP CLASSROOM VIEW (Visible on screens >= 1280px) - MATCHING CHINGUPOP DESKTOP UX */}
      <div className="hidden xl:block space-y-6">
        
        {/* TOP BAR: Search Input + Quick Actions (Folder, Notifications, Profile) */}
        <div className="flex items-center justify-between gap-4">
          {/* Search Input with Live Filter */}
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search something"
              className="w-full bg-white rounded-2xl pl-11 pr-10 py-3 text-xs border border-stone-200/90 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#6C52EE]/30 focus:border-[#6C52EE] text-stone-800 placeholder-stone-400 font-medium"
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-bold"
              >
                ✕
              </button>
            )}

            {/* Quick Search Dropdown */}
            {searchQuery.trim().length > 0 && (() => {
              const matched = searchableItems.filter(
                item =>
                  item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  item.sublabel.toLowerCase().includes(searchQuery.toLowerCase())
              );
              return (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-stone-200 shadow-xl z-50 p-3 space-y-2 max-h-72 overflow-y-auto">
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-2">
                    Matching Korean Lessons & Modules ({matched.length})
                  </div>
                  {matched.length === 0 ? (
                    <div className="p-2.5 text-xs text-stone-500">
                      No matching Korean lessons or modules found for &ldquo;{searchQuery}&rdquo;.
                    </div>
                  ) : (
                    matched.slice(0, 8).map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSearchQuery('');
                          onNavigate(item.tab, item.lessonId);
                        }}
                        className="w-full p-2.5 rounded-xl hover:bg-purple-50 text-left text-xs text-[#2C1E6D] font-medium cursor-pointer flex items-center justify-between gap-2"
                      >
                        <div>
                          <div className="font-bold">{item.label}</div>
                          <div className="text-[10px] text-stone-500">{item.sublabel}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      </button>
                    ))
                  )}
                </div>
              );
            })()}
          </div>

          {/* Right Icons: Assignments/Folder, Notifications, Profile Avatar */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('assignments')}
              className="w-10 h-10 rounded-2xl bg-white border border-stone-200/90 flex items-center justify-center text-stone-600 hover:text-[#6C52EE] hover:border-[#6C52EE]/40 transition-all shadow-2xs relative"
              title="Assignments Portal"
            >
              <Folder className="w-4 h-4" />
              {pendingAssignments.length > 0 && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#FF5CA8]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => onNavigate('records')}
              className="w-10 h-10 rounded-2xl bg-white border border-stone-200/90 flex items-center justify-center text-stone-600 hover:text-[#6C52EE] hover:border-[#6C52EE]/40 transition-all shadow-2xs relative"
              title="Notifications & Academic Records"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#38BDF8]" />
            </button>

            {/* User Profile Avatar (Only shown when signed in) */}
            {!isGuestVisitor && (
              <div 
                onClick={() => onNavigate('settings')}
                className="flex items-center gap-2 cursor-pointer group"
                title={`${currentUser.name} (${currentUser.role})`}
              >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF5CA8] to-[#6C52EE] p-0.5 shadow-2xs group-hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center font-bold text-xs text-[#2C1E6D]">
                    {currentUser.name.charAt(0)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MAIN TWO-COLUMN DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT MAIN COLUMN (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-6">

            {/* 1. HERO PROMOTIONAL BANNER */}
            <div className="bg-[#D8D2FD] rounded-[28px] p-7 md:p-8 relative overflow-hidden flex items-center justify-between shadow-xs">
              <div className="max-w-md space-y-4 z-10">
                <h2 className="text-xl md:text-2xl font-bold text-[#1E1B4B] tracking-tight leading-snug">
                  Have you seen the new vocabulary course that has come out yet?
                </h2>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => onNavigate('vocabulary')}
                    className="px-6 py-2.5 rounded-2xl bg-[#18181B] hover:bg-black text-white font-bold text-xs tracking-wider transition-all shadow-md active:scale-98"
                  >
                    Start course
                  </button>
                </div>
              </div>

              {/* Vector SVG Illustration of Girl Student sitting on books with laptop & checklist */}
              <div className="hidden sm:block shrink-0 w-52 h-44 relative -mr-2 select-none">
                <svg viewBox="0 0 220 180" className="w-full h-full">
                  {/* Floating Checklist at Top */}
                  <g transform="translate(110, 8)">
                    <rect x="0" y="0" width="34" height="24" rx="4" fill="white" stroke="#1E1B4B" strokeWidth="1.5" />
                    <path d="M 6 12 L 11 17 L 20 8" stroke="#FF5CA8" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="16" y1="16" x2="28" y2="16" stroke="#C7D2FE" strokeWidth="1.5" strokeLinecap="round" />
                  </g>

                  {/* Sparkle Stars */}
                  <path d="M 95 32 Q 97 38 103 40 Q 97 42 95 48 Q 93 42 87 40 Q 93 38 95 32 Z" fill="#FF5CA8" />
                  <circle cx="155" cy="42" r="2.5" fill="#FF5CA8" />
                  <circle cx="178" cy="24" r="3" fill="#6C52EE" />

                  {/* Stacked Books Base */}
                  <g transform="translate(50, 115)">
                    {/* Bottom Book (Purple) */}
                    <rect x="0" y="24" width="130" height="16" rx="3" fill="#6C52EE" />
                    <rect x="15" y="27" width="100" height="10" rx="1" fill="#EDE9FE" />
                    
                    {/* Middle Book (White with Pink Spine) */}
                    <rect x="8" y="10" width="116" height="15" rx="3" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="1.5" />
                    <rect x="8" y="10" width="16" height="15" rx="2" fill="#FF5CA8" />
                    
                    {/* Top Book (Pink) */}
                    <rect x="18" y="-4" width="98" height="15" rx="3" fill="#FF5CA8" />
                    <rect x="30" y="-1" width="75" height="9" rx="1" fill="#FFFFFF" />
                  </g>

                  {/* Student Character sitting cross-legged */}
                  <g transform="translate(85, 30)">
                    {/* Legs / Pants */}
                    <path d="M 28 85 Q 10 95 18 105 Q 35 105 45 95 Z" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="2" />
                    <path d="M 45 92 Q 62 105 52 112 Q 35 110 32 95 Z" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="2" />

                    {/* Torso / Top */}
                    <path d="M 28 58 L 22 88 L 48 88 L 44 58 Z" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="2" />

                    {/* Open Laptop on Lap */}
                    <polygon points="12,82 48,82 42,90 18,90" fill="#1E1B4B" />
                    <rect x="15" y="66" width="30" height="17" rx="2" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="1.5" />
                    <circle cx="30" cy="74" r="2.5" fill="#FF5CA8" />

                    {/* Arms holding laptop */}
                    <path d="M 24 64 Q 18 75 22 83" stroke="#1E1B4B" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <path d="M 44 64 Q 48 75 42 83" stroke="#1E1B4B" strokeWidth="2" fill="none" strokeLinecap="round" />

                    {/* Head & Face */}
                    <ellipse cx="34" cy="46" rx="9" ry="10" fill="#FFE4D6" />

                    {/* Hair / Topknot */}
                    <path d="M 25 44 Q 34 32 44 42 Q 40 48 34 48 Q 28 48 25 44 Z" fill="#1E1B4B" />
                    <ellipse cx="44" cy="35" rx="6" ry="6" fill="#1E1B4B" />
                  </g>

                  {/* Little Leaves / Flora */}
                  <path d="M 42 120 Q 35 100 48 95 Q 52 112 42 120 Z" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="1.5" />
                  <path d="M 40 125 Q 30 115 36 108" stroke="#1E1B4B" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
            </div>

            {/* 2. YOUR PROGRESS SECTION */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-[#1E1B4B] tracking-tight">
                  Your progress
                </h3>
                <button 
                  type="button" 
                  onClick={() => onNavigate('courses')}
                  className="text-stone-400 hover:text-stone-600 p-1"
                  title="Course Options"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* 3 Colored Progress Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Card 1: Periwinkle / Lavender */}
                <div 
                  onClick={() => onNavigate('classroom')}
                  className="bg-[#C7D2FE] rounded-2xl p-4 flex flex-col justify-between space-y-5 cursor-pointer hover:shadow-md transition-all active:scale-98"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-2xs">
                      {/* Geometric Symbol */}
                      <svg viewBox="0 0 20 20" className="w-4 h-4">
                        <path d="M 10 3 L 17 15 L 3 15 Z" fill="#1E1B4B" />
                      </svg>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-[#312E81]/60" />
                  </div>

                  <div>
                    <h4 className="font-extrabold text-xs text-[#1E1B4B] leading-snug">
                      Beginner's Language Mastery
                    </h4>
                    <p className="text-[10px] text-[#312E81]/70 font-semibold mt-0.5">Hangul & Vowels</p>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#1E1B4B]">
                      <span className="text-[10px] text-[#312E81]/70 font-medium">Progress</span>
                      <span>{competencies.hangulReading}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1E1B4B]/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#1E1B4B] rounded-full transition-all"
                        style={{ width: `${competencies.hangulReading}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card 2: Warm Peach / Orange */}
                <div 
                  onClick={() => onNavigate('courses')}
                  className="bg-[#FED7AA] rounded-2xl p-4 flex flex-col justify-between space-y-5 cursor-pointer hover:shadow-md transition-all active:scale-98"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-2xs">
                      {/* Orange 3-Dot Cluster */}
                      <svg viewBox="0 0 20 20" className="w-4 h-4">
                        <circle cx="10" cy="6" r="3.5" fill="#431407" />
                        <circle cx="6" cy="13" r="3.5" fill="#431407" />
                        <circle cx="14" cy="13" r="3.5" fill="#431407" />
                      </svg>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-[#7C2D12]/60" />
                  </div>

                  <div>
                    <h4 className="font-extrabold text-xs text-[#431407] leading-snug">
                      Korean Essentials Course
                    </h4>
                    <p className="text-[10px] text-[#7C2D12]/70 font-semibold mt-0.5">Grammar & Structure</p>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#431407]">
                      <span className="text-[10px] text-[#7C2D12]/70 font-medium">Progress</span>
                      <span>{competencies.grammar}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#431407]/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#431407] rounded-full transition-all"
                        style={{ width: `${competencies.grammar}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card 3: Soft Fuchsia / Pink */}
                <div 
                  onClick={() => onNavigate('vocabulary')}
                  className="bg-[#FBCFE8] rounded-2xl p-4 flex flex-col justify-between space-y-5 cursor-pointer hover:shadow-md transition-all active:scale-98"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-2xs">
                      {/* Pink Card Glyphs */}
                      <svg viewBox="0 0 20 20" className="w-4 h-4">
                        <rect x="4" y="4" width="12" height="12" rx="2.5" fill="#500724" />
                        <line x1="7" y1="8" x2="13" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="7" y1="12" x2="11" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-[#831843]/60" />
                  </div>

                  <div>
                    <h4 className="font-extrabold text-xs text-[#500724] leading-snug">
                      Novice to Proficient Korean
                    </h4>
                    <p className="text-[10px] text-[#831843]/70 font-semibold mt-0.5">Vocabulary (SRS)</p>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#500724]">
                      <span className="text-[10px] text-[#831843]/70 font-medium">Progress</span>
                      <span>{competencies.vocabulary}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#500724]/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#500724] rounded-full transition-all"
                        style={{ width: `${competencies.vocabulary}%` }}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* 3. TOP ARTICLES FOR YOU SECTION */}
            <div className="space-y-3">
              <h3 className="text-base font-extrabold text-[#1E1B4B] tracking-tight">
                Top articles for you
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Article 1 */}
                <div 
                  onClick={() => setActiveArticleModal({
                    title: 'Mastering Vocabulary: Proven Strategies for Efficient Korean Word Learning',
                    category: 'Technique',
                    readTime: '5 min',
                    content: 'Learn Korean vocabulary faster with Spaced Repetition (SRS). By scheduling reviews right before you forget a word, you transfer Hangul terms from working memory into permanent long-term fluency.',
                    tab: 'vocabulary'
                  })}
                  className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-2xs hover:shadow-md transition-all flex items-center gap-4 cursor-pointer active:scale-98 group"
                >
                  <div className="w-24 h-24 shrink-0 rounded-2xl bg-[#FCE7F3] flex items-center justify-center relative overflow-hidden select-none">
                    <svg viewBox="0 0 100 100" className="w-20 h-20">
                      {/* Pink Circle BG */}
                      <circle cx="50" cy="50" r="42" fill="#F472B6" opacity="0.3" />
                      
                      {/* Speech Bubble with ? */}
                      <g transform="translate(14, 16)">
                        <path d="M 0 14 C 0 6 6 0 14 0 L 26 0 C 34 0 40 6 40 14 C 40 22 34 28 26 28 L 14 28 L 6 34 L 8 28 C 3 26 0 20 0 14 Z" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="1.5" />
                        <text x="18" y="19" fontSize="16" fontWeight="bold" fill="#FF5CA8" textAnchor="middle">?</text>
                      </g>

                      {/* Speech Bubble with ! */}
                      <g transform="translate(60, 18)">
                        <path d="M 0 10 C 0 4 4 0 10 0 L 16 0 C 22 0 26 4 26 10 C 26 16 22 20 16 20 L 10 20 L 4 24 L 6 20 C 2 18 0 14 0 10 Z" fill="#FF5CA8" />
                        <text x="13" y="15" fontSize="13" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">!</text>
                      </g>

                      {/* Character looking over shoulder */}
                      <g transform="translate(32, 42)">
                        <ellipse cx="24" cy="20" rx="9" ry="10" fill="#FFE4D6" />
                        <path d="M 16 18 Q 24 10 32 18 Q 28 24 24 24 Q 18 24 16 18 Z" fill="#1E1B4B" />
                        <ellipse cx="28" cy="12" rx="4" ry="4" fill="#1E1B4B" />
                        <path d="M 10 35 Q 24 25 38 35 L 42 55 L 6 55 Z" fill="#1E1B4B" />
                      </g>
                    </svg>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-extrabold text-xs text-[#1E1B4B] leading-snug group-hover:text-[#6C52EE] transition-colors">
                      Mastering Vocabulary: Proven Strategies for Efficient Korean Word Learning
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-stone-500 font-medium">
                      <FileText className="w-3 h-3 text-stone-400" />
                      <span>Technique</span>
                      <span>•</span>
                      <span>5 min</span>
                    </div>
                  </div>
                </div>

                {/* Article 2 */}
                <div 
                  onClick={() => setActiveArticleModal({
                    title: 'Embarking on Korean: A Beginner\'s Guide to Kickstart Your Language Learning',
                    category: 'Technique',
                    readTime: '5 min',
                    content: 'King Sejong created Hangul in 1443 with scientific logic. Vowels represent the Sky (•), Earth (ㅡ), and Human (ㅣ), while consonants represent the vocal organ shapes. Master the building blocks and you can read anything in Korean.',
                    tab: 'hangul-lab'
                  })}
                  className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-2xs hover:shadow-md transition-all flex items-center gap-4 cursor-pointer active:scale-98 group"
                >
                  <div className="w-24 h-24 shrink-0 rounded-2xl bg-[#EDE9FE] flex items-center justify-center relative overflow-hidden select-none">
                    <svg viewBox="0 0 100 100" className="w-20 h-20">
                      {/* Lavender Circle BG */}
                      <circle cx="50" cy="50" r="42" fill="#818CF8" opacity="0.3" />

                      {/* Gear Icon in Background */}
                      <g transform="translate(62, 50)">
                        <circle cx="12" cy="12" r="10" fill="#1E1B4B" />
                        <circle cx="12" cy="12" r="4" fill="#EDE9FE" />
                      </g>

                      {/* Info Badge */}
                      <g transform="translate(68, 22)">
                        <circle cx="8" cy="8" r="8" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="1.5" />
                        <text x="8" y="12" fontSize="10" fontWeight="bold" fill="#6C52EE" textAnchor="middle">i</text>
                      </g>

                      {/* Student reading open book */}
                      <g transform="translate(25, 34)">
                        {/* Head */}
                        <ellipse cx="20" cy="16" rx="8" ry="9" fill="#FFE4D6" />
                        <path d="M 12 14 Q 20 6 28 14 Q 26 20 20 20 Q 14 20 12 14 Z" fill="#1E1B4B" />
                        
                        {/* Body / Arms */}
                        <path d="M 6 36 Q 20 26 34 36 L 36 50 L 4 50 Z" fill="#1E1B4B" />

                        {/* Open Pink Book */}
                        <g transform="translate(8, 28)">
                          <polygon points="0,6 12,2 24,6 24,18 12,14 0,18" fill="#FF5CA8" />
                          <polygon points="2,7 12,3 22,7 22,17 12,13 2,17" fill="#FFFFFF" />
                          <line x1="12" y1="3" x2="12" y2="13" stroke="#FF5CA8" strokeWidth="1" />
                        </g>
                      </g>
                    </svg>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-extrabold text-xs text-[#1E1B4B] leading-snug group-hover:text-[#6C52EE] transition-colors">
                      Embarking on Korean: A Beginner's Guide to Kickstart Your Language Learning
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-stone-500 font-medium">
                      <FileText className="w-3 h-3 text-stone-400" />
                      <span>Technique</span>
                      <span>•</span>
                      <span>5 min</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT PANEL COLUMN (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">

            {/* 1. CALENDAR WIDGET */}
            <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-2xs space-y-4">
              {/* Month Navigation */}
              <div className="flex items-center justify-between">
                <button 
                  type="button" 
                  onClick={() => setSelectedCalendarDate(prev => Math.max(23, prev - 1))}
                  className="w-7 h-7 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-500 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-bold text-sm text-[#1E1B4B]">
                  {currentCalendarMonth}
                </span>
                <button 
                  type="button" 
                  onClick={() => setSelectedCalendarDate(prev => Math.min(29, prev + 1))}
                  className="w-7 h-7 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-500 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Days of Week and Dates Row */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                  const dateNum = 23 + idx;
                  const isSelected = selectedCalendarDate === dateNum;
                  return (
                    <div 
                      key={day}
                      onClick={() => setSelectedCalendarDate(dateNum)}
                      className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-[#DDD6FE] text-[#2C1E6D] font-bold shadow-2xs' 
                          : 'hover:bg-stone-50 text-stone-500 font-medium'
                      }`}
                    >
                      <span className="text-[10px]">{day}</span>
                      <span className="text-xs font-bold font-mono">{dateNum}</span>
                    </div>
                  );
                })}
              </div>

              {/* Selected Day Info */}
              <div className="p-2.5 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-center justify-between text-xs">
                <span className="text-stone-600 font-medium text-[11px]">
                  Daily Study Goal:
                </span>
                <span className="font-bold text-[#6C52EE] font-mono">
                  {currentUser.dailyStudyMinutes} Mins Commitment
                </span>
              </div>
            </div>

            {/* 2. ACADEMIC CURRICULUM TRACKS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-[#1E1B4B] tracking-tight">
                  Academic Curriculum Tracks
                </h3>
                <button
                  type="button"
                  onClick={() => onNavigate('courses')}
                  className="text-xs font-bold text-[#6C52EE] hover:underline"
                >
                  All 8 Levels &rarr;
                </button>
              </div>

              {/* Course Card 1 */}
              <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-2xs space-y-3 hover:shadow-md transition-all">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0369A1] text-[10px] font-bold">
                    TOPIK I • A1
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#CCFBF1] text-[#0F766E] text-[10px] font-bold">
                    Grammar & Particles
                  </span>
                </div>

                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="font-extrabold text-sm text-[#1E1B4B]">
                    Beginner Korean 1 (초급 한국어 1)
                  </h4>
                  <span className="font-bold text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-mono shrink-0">
                    Enrolled
                  </span>
                </div>

                <p className="text-[11px] text-stone-500 leading-relaxed">
                  Master Korean SOV sentence structure, topic/subject markers (은/는, 이/가), polite -아/어요 conjugation, and everyday expressions.
                </p>

                <div className="flex items-center gap-4 text-[10px] text-stone-500 font-medium">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-stone-400" />
                    <span>16 hours</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-stone-400" />
                    <span>8 lessons</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                  {/* Enrolled Cohort Stack */}
                  <div className="flex items-center -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-400 to-purple-500 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-2xs" title="Dhie">
                      D
                    </div>
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-2xs" title="Mhie">
                      M
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate('courses')}
                    className="px-5 py-2 rounded-2xl bg-[#18181B] hover:bg-black text-white text-xs font-bold transition-all shadow-xs active:scale-95"
                  >
                    Open Syllabus
                  </button>
                </div>
              </div>

              {/* Course Card 2 */}
              <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-2xs space-y-3 hover:shadow-md transition-all">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFEDD5] text-[#C2410C] text-[10px] font-bold">
                    SRS Lexicon
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FCE7F3] text-[#BE185D] text-[10px] font-bold">
                    Vocabulary
                  </span>
                </div>

                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="font-extrabold text-sm text-[#1E1B4B]">
                    Core Korean Vocabulary & SRS (핵심 어휘)
                  </h4>
                  <span className="font-bold text-[10px] text-[#6C52EE] bg-purple-50 px-2 py-0.5 rounded-full font-mono shrink-0">
                    {vocabulary.length} Words
                  </span>
                </div>

                <p className="text-[11px] text-stone-500 leading-relaxed">
                  Build long-term retention of essential Korean nouns, action verbs, counters, and honorific expressions with Spaced Repetition flashcards.
                </p>

                <div className="flex items-center gap-4 text-[10px] text-stone-500 font-medium">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-stone-400" />
                    <span>Daily SRS</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-stone-400" />
                    <span>{vocabLearnedCount} Mastered</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                  {/* Enrolled Cohort Stack */}
                  <div className="flex items-center -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-400 to-purple-500 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-2xs" title="Dhie">
                      D
                    </div>
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-2xs" title="Mhie">
                      M
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate('vocabulary')}
                    className="px-5 py-2 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all shadow-xs active:scale-95"
                  >
                    Practice Deck
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* 4. EXPANDABLE ACADEMIC OVERVIEW & 9 COMPETENCY RADAR (Preserving all verified student metrics) */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xs overflow-hidden mt-4">
          <button
            type="button"
            onClick={() => setShowAcademicDrawer(prev => !prev)}
            className="w-full p-5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-purple-50 text-[#6C52EE]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-[#1E1B4B]">
                  {isGuestVisitor
                    ? '9 Korean Competency Radar & Daily Study Timetable'
                    : `Academic File & 9 Competency Radar • Student ${currentUser.studentId}`}
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  {isGuestVisitor
                    ? 'Sign in to track your personal academic standing and attendance'
                    : `Grade ${currentUser.currentAcademicGrade} • ${activeDaysThisWeek}/7 Active Days • Verified Progress`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-[#6C52EE]">
              <span>{showAcademicDrawer ? 'Hide Details' : 'View Competencies & Timetable'}</span>
              {showAcademicDrawer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {showAcademicDrawer && (
            <div className="p-6 pt-0 border-t border-stone-100 space-y-6">
              
              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-4">
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
                  <span className="text-stone-500 font-semibold block text-[11px]">Academic Standing</span>
                  <span className="text-base font-bold text-[#FF5CA8]">Grade {currentUser.currentAcademicGrade}</span>
                  <span className="text-[10px] text-stone-400 block mt-0.5">Verified</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
                  <span className="text-stone-500 font-semibold block text-[11px]">Attendance Record</span>
                  <span className="text-base font-bold text-emerald-600">{activeDaysThisWeek} Days Active</span>
                  <span className="text-[10px] text-stone-400 block mt-0.5">Target: {currentUser.studyDaysPerWeek} days</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
                  <span className="text-stone-500 font-semibold block text-[11px]">Completed Lessons</span>
                  <span className="text-base font-bold text-[#1E1B4B]">{completedInCourse}/{totalLessonsInCourse}</span>
                  <span className="text-[10px] text-stone-400 block mt-0.5">{completionPercent}% Complete</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
                  <span className="text-stone-500 font-semibold block text-[11px]">Weekly Target</span>
                  <span className="text-base font-bold text-[#38BDF8]">{weeklyStudyHours} hrs</span>
                  <span className="text-[10px] text-stone-400 block mt-0.5">Goal: {weeklyTargetHours} hrs</span>
                </div>
              </div>

              {/* 9 Competency Radar & Timetable */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* 9 Competency Radar */}
                <div className="space-y-3 p-4 rounded-2xl bg-stone-50/70 border border-stone-200/70">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <span className="font-extrabold text-xs text-[#1E1B4B]">9 Competency Radar</span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">Verified</span>
                  </div>
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

                {/* Daily 60-Minute Timetable Breakdown */}
                <div className="space-y-3 p-4 rounded-2xl bg-stone-50/70 border border-stone-200/70">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <span className="font-extrabold text-xs text-[#1E1B4B]">Daily 60-Minute Timetable Breakdown</span>
                    <button 
                      type="button" 
                      onClick={() => onNavigate('planner')}
                      className="text-[11px] font-bold text-[#6C52EE] hover:underline"
                    >
                      Planner
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
                      <div key={idx} className="p-2 rounded-xl bg-white border border-stone-200/80 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-[#1E1B4B]">{item.label}</span>
                          <span className="text-stone-500 text-[10px] block">{item.desc}</span>
                        </div>
                        <span className="font-mono text-[10px] font-bold text-[#6C52EE] px-1.5 py-0.5 rounded bg-purple-50">
                          {item.min}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}
        </div>

      </div>


      {/* Achievements Modal */}
      {showAchievementsModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-stone-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-base text-[#1E1B4B]">Your Korean Learning Badges</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAchievementsModal(false)}
                className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-400 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {achievementsList.map((ach) => {
                const isUnlocked = Boolean(ach.unlockedAt);
                return (
                  <div
                    key={ach.id}
                    className={`p-3.5 rounded-2xl border transition-all text-center space-y-1 ${
                      isUnlocked 
                        ? 'bg-amber-50/70 border-amber-300 shadow-xs' 
                        : 'bg-stone-50 border-stone-200/70 opacity-60'
                    }`}
                  >
                    <div className="text-3xl">{ach.icon}</div>
                    <div className="font-extrabold text-xs text-[#1E1B4B]">{ach.title}</div>
                    <div className="text-[10px] text-stone-500 leading-tight">{ach.description}</div>
                    <div className="text-[9px] font-black text-amber-600 pt-1">
                      {isUnlocked ? '✓ Unlocked' : `+${ach.xpReward} XP`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Article Detail Modal */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <span className="px-2.5 py-1 rounded-full bg-purple-50 text-[#6C52EE] text-[10px] font-bold uppercase tracking-wider">
                {activeArticleModal.category} • {activeArticleModal.readTime} Read
              </span>
              <button 
                type="button" 
                onClick={() => setActiveArticleModal(null)}
                className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-400 font-bold"
              >
                ✕
              </button>
            </div>
            <h3 className="text-base font-extrabold text-[#1E1B4B] leading-snug">
              {activeArticleModal.title}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {activeArticleModal.content}
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveArticleModal(null)}
                className="px-4 py-2 rounded-xl text-stone-500 font-bold text-xs hover:bg-stone-100"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const target = activeArticleModal.tab;
                  setActiveArticleModal(null);
                  onNavigate(target);
                }}
                className="px-5 py-2 rounded-xl bg-[#6C52EE] hover:bg-[#553ACF] text-white font-bold text-xs shadow-md transition-all"
              >
                Open Studio
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
