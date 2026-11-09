import React, { useState, useEffect, useMemo } from 'react';
import { Course, Lesson, UserProfile } from '../../types';
import { storage } from '../../services/storageService';
import { InteractiveClassroomExperience } from './interactive/InteractiveClassroomExperience';
import { 
  GraduationCap, 
  Sparkles, 
  CheckCircle, 
  Calendar, 
  MessageSquare, 
  Save,
  ChevronLeft,
  ChevronRight,
  Bot,
  BookOpen,
  Lock
} from 'lucide-react';

interface VirtualClassroomProps {
  currentLesson: Lesson;
  currentUser: UserProfile;
  courses?: Course[];
  onCompleteLesson: (lessonId: string) => void;
  onSelectLesson?: (lesson: Lesson) => void;
  onNavigateTab?: (tab: any) => void;
}

export const VirtualClassroom: React.FC<VirtualClassroomProps> = ({
  currentLesson,
  currentUser,
  courses,
  onCompleteLesson,
  onSelectLesson,
  onNavigateTab
}) => {
  const [activeTab, setActiveTab] = useState<'interactive-classroom' | 'grammar-board' | 'notes'>('interactive-classroom');
  const [studentNotes, setStudentNotes] = useState<string>(() => {
    return localStorage.getItem(`ha_notes_${currentUser.id}_${currentLesson.id}`) || '';
  });
  const [notesSaved, setNotesSaved] = useState(false);

  // Sync student notes when lesson or user changes
  useEffect(() => {
    setStudentNotes(localStorage.getItem(`ha_notes_${currentUser.id}_${currentLesson.id}`) || '');
    setNotesSaved(false);
  }, [currentUser.id, currentLesson.id]);

  const allCourses = useMemo(() => courses || storage.getCourses(), [courses]);
  const activeCourse = useMemo(
    () => allCourses.find(c => c.id === currentLesson.courseId) || allCourses[0],
    [allCourses, currentLesson.courseId]
  );

  const courseLessons = useMemo(() => {
    if (!activeCourse || !activeCourse.units) return [currentLesson];
    return activeCourse.units.flatMap(u => u.lessons);
  }, [activeCourse, currentLesson]);

  const currentLessonIdx = useMemo(
    () => courseLessons.findIndex(l => l.id === currentLesson.id),
    [courseLessons, currentLesson.id]
  );

  const prevLesson = currentLessonIdx > 0 ? courseLessons[currentLessonIdx - 1] : null;
  const nextLesson = currentLessonIdx >= 0 && currentLessonIdx < courseLessons.length - 1
    ? courseLessons[currentLessonIdx + 1]
    : null;

  const completedLessons = storage.getCompletedLessons(currentUser.id);
  const isLessonCompleted = completedLessons.includes(currentLesson.id);
  const attendanceCount = storage.getAttendance(currentUser.id).length;
  const isFaculty = currentUser.role === 'teacher' || currentUser.role === 'admin' || storage.isAdminAuthenticated();
  const isNextUnlocked = nextLesson
    ? isFaculty || isLessonCompleted || storage.isAdminUnlockAll()
    : false;

  const handleSaveNotes = () => {
    localStorage.setItem(`ha_notes_${currentUser.id}_${currentLesson.id}`, studentNotes);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Classroom Header Banner */}
      <div className="bg-gradient-to-br from-[#2C1E6D] via-[#3B288C] to-[#553ACF] text-white rounded-2xl p-5 sm:p-8 shadow-xl relative overflow-hidden border border-purple-400/20">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono tracking-wider text-[#55C8F5]">
              <GraduationCap className="w-4 h-4 text-[#55C8F5] shrink-0" />
              <span className="font-bold uppercase">
                {activeCourse?.level || 'Pre-A1'} • {activeCourse?.title || 'Korean Foundations'} • LESSON {currentLesson.lessonNumber}
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl font-bold text-white tracking-tight break-words">
              {currentLesson.title}
            </h1>
            <p className="text-sm font-korean text-purple-200">
              {currentLesson.koreanTitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Lesson Switcher Dropdown */}
            {onSelectLesson && courseLessons.length > 1 && (
              <select
                value={currentLesson.id}
                onChange={(e) => {
                  const found = courseLessons.find(l => l.id === e.target.value);
                  if (found) onSelectLesson(found);
                }}
                aria-label="Select lesson in course"
                className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-purple-300/30 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#FF5CA8] cursor-pointer max-w-[220px] truncate"
              >
                {courseLessons.map((l, idx) => {
                  const prevId = idx > 0 ? courseLessons[idx - 1].id : undefined;
                  const unlocked = isFaculty || idx === 0 || (prevId ? completedLessons.includes(prevId) : true) || storage.isAdminUnlockAll();
                  const done = completedLessons.includes(l.id);
                  return (
                    <option
                      key={l.id}
                      value={l.id}
                      disabled={!unlocked}
                      className="bg-[#2C1E6D] text-white"
                    >
                      {done ? '✓ ' : !unlocked ? '🔒 ' : ''}Lesson {l.lessonNumber}: {l.title}
                    </option>
                  );
                })}
              </select>
            )}

            {!isLessonCompleted ? (
              <button
                type="button"
                onClick={() => onCompleteLesson(currentLesson.id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[42px] rounded-xl bg-gradient-to-r from-[#FF5CA8] to-[#FF4D94] hover:from-[#FF4D94] hover:to-[#E63985] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Mark Lesson Complete</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 px-3.5 py-2.5 min-h-[42px] rounded-xl bg-emerald-900/60 border border-emerald-500/50 text-emerald-200 text-xs font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Lesson Completed ✓</span>
              </div>
            )}
          </div>
        </div>

        {/* Professor Information, Attendance & Lesson Navigation Bar */}
        <div className="mt-6 pt-4 border-t border-purple-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-purple-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 border border-pink-400/50 flex items-center justify-center font-bold text-[#FF5CA8] shrink-0">
              김
            </div>
            <div>
              <span className="font-semibold text-white">Lead Professor:</span> Prof. Min-jun Kim (김민준 교수)
              <span className="text-purple-200 block text-[11px] font-medium">
                Applied Korean Linguistics Dept. • {attendanceCount} {attendanceCount === 1 ? 'Day' : 'Days'} Logged
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onSelectLesson && prevLesson && (
              <button
                type="button"
                onClick={() => onSelectLesson(prevLesson)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-all cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev Lesson</span>
              </button>
            )}

            {onSelectLesson && nextLesson && (
              <button
                type="button"
                disabled={!isNextUnlocked}
                onClick={() => isNextUnlocked && onSelectLesson(nextLesson)}
                title={isNextUnlocked ? `Proceed to ${nextLesson.title}` : 'Complete this lesson first to unlock the next lesson'}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isNextUnlocked
                    ? 'bg-[#55C8F5]/20 hover:bg-[#55C8F5]/30 border border-[#55C8F5]/40 text-white cursor-pointer'
                    : 'bg-white/5 border border-white/10 text-purple-300/60 cursor-not-allowed'
                }`}
              >
                {!isNextUnlocked && <Lock className="w-3 h-3" />}
                <span>Next Lesson</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}

            {onNavigateTab && (
              <button
                type="button"
                onClick={() => onNavigateTab('ai-tutor')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-pink-400/40 text-pink-200 hover:text-white text-xs font-semibold transition-all cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5 text-[#FF5CA8]" />
                <span>Ask Prof. Kim (AI Tutor)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Classroom Tab Navigation */}
      <div className="flex border-b border-stone-200 gap-4 sm:gap-6 overflow-x-auto no-scrollbar scrollbar-none">
        {[
          { key: 'interactive-classroom', label: 'Interactive Lesson Studio', icon: Sparkles },
          { key: 'grammar-board', label: `Grammar Whiteboard (${currentLesson.grammarNotes?.length || 0})`, icon: GraduationCap },
          { key: 'notes', label: 'Student Notebook', icon: MessageSquare }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 pb-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'border-[#6C52EE] text-[#6C52EE]'
                  : 'border-transparent text-stone-600 hover:text-[#6C52EE]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF5CA8]' : 'text-stone-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: The Modern Interactive Classroom */}
      {activeTab === 'interactive-classroom' && (
        <InteractiveClassroomExperience
          currentLesson={currentLesson}
          currentUser={currentUser}
          onLessonMastered={onCompleteLesson}
        />
      )}

      {/* Tab 2: Virtual Grammar Whiteboard */}
      {activeTab === 'grammar-board' && (
        <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 sm:p-8 border-4 border-stone-700 shadow-2xl relative overflow-hidden font-mono space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                PROFESSOR KIM'S INTERACTIVE LECTURE WHITEBOARD
              </span>
            </div>
            <span className="text-xs text-slate-400">{currentLesson.title}</span>
          </div>

          <div className="space-y-6">
            {currentLesson.grammarNotes && currentLesson.grammarNotes.length > 0 ? (
              currentLesson.grammarNotes.map((note, idx) => (
                <div key={idx} className="space-y-4 bg-slate-800/80 p-5 sm:p-6 rounded-xl border border-slate-700">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-base sm:text-lg font-serif font-bold text-amber-300">
                      PATTERN: {note.pattern}
                    </h3>
                    <span className="text-xs font-korean text-slate-400">{note.koreanName}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{note.meaning}</p>

                  {note.filipinoComparison && (
                    <div className="p-3 bg-amber-950/40 border border-amber-600/40 rounded text-xs text-amber-200 leading-relaxed">
                      🇵🇭 Linguistic Comparison (Approximation): {note.filipinoComparison}
                    </div>
                  )}

                  <div className="space-y-2">
                    <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block">
                      Core Formulation Rules:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {note.rules.map((rule, rIdx) => (
                        <div key={rIdx} className="p-3 bg-slate-900 rounded border border-slate-700 text-xs text-slate-200 leading-relaxed">
                          {rule}
                        </div>
                      ))}
                    </div>
                  </div>

                  {note.examples && note.examples.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider block">
                        Board Examples:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {note.examples.map((ex, eIdx) => (
                          <div key={eIdx} className="p-3 bg-slate-900/90 rounded border border-slate-700 text-xs space-y-1">
                            <div className="font-bold text-amber-200 text-sm">{ex.korean}</div>
                            {ex.pronunciation && <div className="text-[11px] text-slate-400">[{ex.pronunciation}]</div>}
                            <div className="text-slate-300">{ex.english}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {note.commonMistakes && note.commonMistakes.length > 0 && (
                    <div className="p-3 bg-rose-950/40 border border-rose-800/40 rounded text-xs text-rose-300">
                      <span className="font-bold">Common Beginner Pitfall:</span> {note.commonMistakes.join(' ')}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-6 bg-slate-800/60 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-2">
                <div className="font-bold text-amber-300 text-sm">Lecture Summary Notes: {currentLesson.title}</div>
                <p className="leading-relaxed whitespace-pre-line">{currentLesson.explanation}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Student Notebook */}
      {activeTab === 'notes' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
            <div>
              <h3 className="font-serif font-bold text-base text-academy-navy">
                Personal Academic Notebook — {currentLesson.title}
              </h3>
              <p className="text-xs text-stone-500">
                Your private notes for this lesson. Saved persistently in your student academic record ({currentUser.name}).
              </p>
            </div>
            <button
              type="button"
              onClick={handleSaveNotes}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-academy-navy text-academy-ivory text-xs font-semibold hover:bg-academy-navy-light transition-colors self-start sm:self-center cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{notesSaved ? 'Saved to Notebook ✓' : 'Save Notes'}</span>
            </button>
          </div>

          <textarea
            value={studentNotes}
            onChange={(e) => setStudentNotes(e.target.value)}
            placeholder="Jot down difficult Hangul syllables, grammar reminders, questions for Professor Kim, or mnemonics..."
            rows={10}
            className="w-full p-4 rounded-xl border border-stone-300 font-sans text-xs focus:ring-2 focus:ring-academy-gold focus:border-transparent outline-none leading-relaxed text-academy-charcoal"
          />
        </div>
      )}

      {/* Bottom Lesson Progression Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {onNavigateTab && (
            <button
              type="button"
              onClick={() => onNavigateTab('courses')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#6C52EE]" />
              <span>Course Syllabus</span>
            </button>
          )}
          {onSelectLesson && prevLesson && (
            <button
              type="button"
              onClick={() => onSelectLesson(prevLesson)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="truncate max-w-[160px]">Prev: {prevLesson.title}</span>
            </button>
          )}
        </div>

        <div className="flex items-center justify-end gap-2.5">
          {!isLessonCompleted && (
            <button
              type="button"
              onClick={() => onCompleteLesson(currentLesson.id)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Complete Lesson {currentLesson.lessonNumber}</span>
            </button>
          )}

          {onSelectLesson && nextLesson && (
            <button
              type="button"
              disabled={!isNextUnlocked}
              onClick={() => isNextUnlocked && onSelectLesson(nextLesson)}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isNextUnlocked
                  ? 'bg-gradient-to-r from-[#2C1E6D] to-[#6C52EE] hover:brightness-110 text-white shadow-sm cursor-pointer'
                  : 'bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed'
              }`}
            >
              {!isNextUnlocked && <Lock className="w-3.5 h-3.5" />}
              <span className="truncate max-w-[180px]">Next: {nextLesson.title}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
