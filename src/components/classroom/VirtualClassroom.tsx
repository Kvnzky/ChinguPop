import React, { useState } from 'react';
import { Lesson, UserProfile } from '../../types';
import { storage } from '../../services/storageService';
import { InteractiveClassroomExperience } from './interactive/InteractiveClassroomExperience';
import { 
  GraduationCap, 
  Sparkles, 
  CheckCircle, 
  Video, 
  Calendar, 
  MessageSquare, 
  Save 
} from 'lucide-react';

interface VirtualClassroomProps {
  currentLesson: Lesson;
  currentUser: UserProfile;
  onCompleteLesson: (lessonId: string) => void;
}

export const VirtualClassroom: React.FC<VirtualClassroomProps> = ({
  currentLesson,
  currentUser,
  onCompleteLesson
}) => {
  const [activeTab, setActiveTab] = useState<'interactive-classroom' | 'grammar-board' | 'notes'>('interactive-classroom');
  const [studentNotes, setStudentNotes] = useState<string>(() => {
    return localStorage.getItem(`ha_notes_${currentUser.id}_${currentLesson.id}`) || '';
  });
  const [notesSaved, setNotesSaved] = useState(false);

  const completedLessons = storage.getCompletedLessons(currentUser.id);
  const isLessonCompleted = completedLessons.includes(currentLesson.id);

  const handleSaveNotes = () => {
    localStorage.setItem(`ha_notes_${currentUser.id}_${currentLesson.id}`, studentNotes);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Classroom Header Banner */}
      <div className="bg-gradient-to-br from-[#2C1E6D] via-[#3B288C] to-[#553ACF] text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-purple-400/20">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#55C8F5]">
              <GraduationCap className="w-4 h-4 text-[#55C8F5]" />
              <span className="font-bold">CHINGUPOP KOREAN LANGUAGE ACADEMY • VIRTUAL CLASSROOM</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {currentLesson.title}
            </h1>
            <p className="text-sm font-korean text-purple-200">
              {currentLesson.koreanTitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {!isLessonCompleted ? (
              <button
                type="button"
                onClick={() => onCompleteLesson(currentLesson.id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5CA8] to-[#FF4D94] hover:from-[#FF4D94] hover:to-[#E63985] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Mark Lesson Complete</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-900/60 border border-emerald-600/50 text-emerald-200 text-xs font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Lesson Completed</span>
              </div>
            )}
          </div>
        </div>

        {/* Professor Information & Attendance */}
        <div className="mt-6 pt-4 border-t border-purple-400/30 flex flex-wrap items-center justify-between gap-4 text-xs text-purple-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 border border-pink-400/50 flex items-center justify-center font-bold text-[#FF5CA8]">
              김
            </div>
            <div>
              <span className="font-semibold text-white">Lead Professor:</span> Prof. Min-jun Kim (김민준 교수)
              <span className="text-purple-200 block text-[11px] font-medium">Applied Korean Linguistics Dept.</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-purple-100 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#55C8F5]" />
              Attendance: 100% (Logged)
            </span>
            <div className="flex items-center gap-1.5 text-purple-200 font-medium">
              <Video className="w-3.5 h-3.5 text-[#FF5CA8]" />
              <span>Live Conferencing Ready (Zoom/Meet WebRTC Bridge)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Classroom Tab Navigation */}
      <div className="flex border-b border-stone-200 gap-6">
        {[
          { key: 'interactive-classroom', label: 'Interactive Pronunciation Classroom', icon: Sparkles },
          { key: 'grammar-board', label: 'Virtual Grammar Whiteboard', icon: GraduationCap },
          { key: 'notes', label: 'Student Notebook', icon: MessageSquare }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-all ${
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

      {/* Tab 1: The Modern Interactive Classroom (12 Integrated Activities) */}
      {activeTab === 'interactive-classroom' && (
        <InteractiveClassroomExperience
          currentLesson={currentLesson}
          currentUser={currentUser}
          onLessonMastered={onCompleteLesson}
        />
      )}

      {/* Tab 2: Virtual Grammar Whiteboard */}
      {activeTab === 'grammar-board' && (
        <div className="bg-slate-900 text-slate-100 rounded-2xl p-8 border-4 border-stone-700 shadow-2xl relative overflow-hidden font-mono space-y-6">
          <div className="flex items-center justify-between pb-6 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                PROFESSOR KIM'S INTERACTIVE LECTURE WHITEBOARD
              </span>
            </div>
            <span className="text-xs text-slate-400">Department of Korean Linguistics</span>
          </div>

          <div className="space-y-6">
            {currentLesson.grammarNotes.map((note, idx) => (
              <div key={idx} className="space-y-4 bg-slate-800/80 p-6 rounded-xl border border-slate-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-serif font-bold text-amber-300">
                    PATTERN: {note.pattern}
                  </h3>
                  <span className="text-xs font-korean text-slate-400">{note.koreanName}</span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">{note.meaning}</p>

                {note.filipinoComparison && (
                  <div className="p-3 bg-amber-950/40 border border-amber-600/40 rounded text-xs text-amber-200">
                    🇵🇭 Comparison: {note.filipinoComparison}
                  </div>
                )}

                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                    Core Formulation Rules:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {note.rules.map((rule, rIdx) => (
                      <div key={rIdx} className="p-3 bg-slate-900 rounded border border-slate-700 text-xs text-slate-200">
                        {rule}
                      </div>
                    ))}
                  </div>
                </div>

                {note.commonMistakes && note.commonMistakes.length > 0 && (
                  <div className="p-3 bg-rose-950/40 border border-rose-800/40 rounded text-xs text-rose-300">
                    <span className="font-bold">Common Beginner Pitfall:</span> {note.commonMistakes.join(' ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Student Notebook */}
      {activeTab === 'notes' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <h3 className="font-serif font-bold text-base text-academy-navy">
                Personal Academic Notebook
              </h3>
              <p className="text-xs text-stone-500">
                Your private notes for this lesson. Saved persistently in your student academic record.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSaveNotes}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-academy-navy text-academy-ivory text-xs font-semibold hover:bg-academy-navy-light transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{notesSaved ? 'Saved!' : 'Save Notes'}</span>
            </button>
          </div>

          <textarea
            value={studentNotes}
            onChange={(e) => setStudentNotes(e.target.value)}
            placeholder="Jot down difficult Hangul syllables, grammar reminders, questions for the professor, or mnemonics..."
            rows={10}
            className="w-full p-4 rounded-xl border border-stone-300 font-sans text-xs focus:ring-2 focus:ring-academy-gold focus:border-transparent outline-none leading-relaxed text-academy-charcoal"
          />
        </div>
      )}

    </div>
  );
};
