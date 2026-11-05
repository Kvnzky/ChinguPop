import React, { useState } from 'react';
import { Lesson, UserProfile } from '../../types';
import { AudioButton } from '../common/AudioButton';
import { storage } from '../../services/storageService';
import { 
  GraduationCap, 
  BookOpen, 
  CheckCircle, 
  HelpCircle, 
  Video, 
  Calendar, 
  MessageSquare, 
  Save, 
  ExternalLink 
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
  const [activeTab, setActiveTab] = useState<'lecture' | 'grammar-board' | 'exercises' | 'notes'>('lecture');
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<string, string>>({});
  const [submittedExercises, setSubmittedExercises] = useState(false);
  const [studentNotes, setStudentNotes] = useState<string>(() => {
    return localStorage.getItem(`ha_notes_${currentUser.id}_${currentLesson.id}`) || '';
  });
  const [notesSaved, setNotesSaved] = useState(false);

  const completedLessons = storage.getCompletedLessons(currentUser.id);
  const isLessonCompleted = completedLessons.includes(currentLesson.id);

  const handleAnswerSelect = (exerciseId: string, answer: string) => {
    setExerciseAnswers(prev => ({ ...prev, [exerciseId]: answer }));
  };

  const handleSaveNotes = () => {
    localStorage.setItem(`ha_notes_${currentUser.id}_${currentLesson.id}`, studentNotes);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Classroom Header Banner */}
      <div className="bg-academy-navy text-academy-ivory rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-academy-gold">
              <GraduationCap className="w-4 h-4 text-academy-gold" />
              <span>SEOUL NATIONAL UNIVERSITY AFFILIATED VIRTUAL HALL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-academy-ivory">
              {currentLesson.title}
            </h1>
            <p className="text-sm font-korean text-stone-300">
              {currentLesson.koreanTitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {!isLessonCompleted ? (
              <button
                type="button"
                onClick={() => onCompleteLesson(currentLesson.id)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-academy-gold hover:bg-academy-gold-light text-academy-navy font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
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

        {/* Professor Scaffolding Information */}
        <div className="mt-6 pt-4 border-t border-academy-navy-light flex flex-wrap items-center justify-between gap-4 text-xs text-stone-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-academy-gold/20 border border-academy-gold/50 flex items-center justify-center font-bold text-academy-gold">
              김
            </div>
            <div>
              <span className="font-semibold text-academy-ivory">Lead Professor:</span> Prof. Min-jun Kim (김민준 교수)
              <span className="text-stone-400 block text-[11px]">Applied Korean Linguistics Dept.</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-stone-300">
              <Calendar className="w-3.5 h-3.5 text-academy-gold" />
              Attendance: 100% (Logged)
            </span>
            <div className="flex items-center gap-1.5 text-stone-400">
              <Video className="w-3.5 h-3.5 text-stone-500" />
              <span>Live Conferencing Ready (Zoom/Meet WebRTC Bridge)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Classroom Tab Navigation */}
      <div className="flex border-b border-stone-200 gap-6">
        {[
          { key: 'lecture', label: 'Structured Lecture', icon: BookOpen },
          { key: 'grammar-board', label: 'Virtual Grammar Whiteboard', icon: GraduationCap },
          { key: 'exercises', label: 'Interactive Practice Check', icon: HelpCircle },
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
                  ? 'border-academy-navy text-academy-navy'
                  : 'border-transparent text-stone-500 hover:text-academy-navy'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-academy-gold-dark' : 'text-stone-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Lecture Content */}
      {activeTab === 'lecture' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Lecture Body */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Objectives Card */}
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
              <h3 className="font-serif font-bold text-base text-academy-navy mb-3">
                Learning Objectives (학습 목표)
              </h3>
              <ul className="space-y-2 text-xs text-stone-700">
                {currentLesson.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-50 text-academy-gold-dark border border-amber-200 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Academic Explanation */}
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-base text-academy-navy">
                Detailed Academic Explanation
              </h3>
              <div className="prose prose-stone text-xs leading-relaxed text-stone-700 whitespace-pre-line font-sans">
                {currentLesson.explanation}
              </div>

              {/* Filipino Notes Scaffolding */}
              {currentUser.filipinoSupport && currentLesson.filipinoNotes && (
                <div className="mt-4 p-4 rounded-lg bg-amber-50/70 border border-amber-200/90 text-xs text-amber-950">
                  <div className="font-bold flex items-center gap-2 text-academy-navy mb-1">
                    <span>🇵🇭 Filipino Linguistic Note & Cultural Comparison</span>
                  </div>
                  <p className="leading-relaxed">{currentLesson.filipinoNotes}</p>
                </div>
              )}
            </div>

            {/* Dialogue & Examples */}
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-base text-academy-navy">
                Korean Examples in Context (예문과 발음)
              </h3>
              <div className="space-y-3">
                {currentLesson.koreanExamples.map((ex, idx) => (
                  <div key={idx} className="p-4 rounded-lg border border-stone-200 bg-stone-50/50 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-serif font-bold text-academy-navy">
                          {ex.korean}
                        </span>
                        {ex.pronunciation && (
                          <span className="text-xs font-mono text-academy-gold-dark">
                            [{ex.pronunciation}]
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-stone-700 font-medium">{ex.english}</div>
                      {currentUser.filipinoSupport && ex.filipino && (
                        <div className="text-[11px] text-amber-800 italic">🇵🇭 {ex.filipino}</div>
                      )}
                      {ex.explanation && (
                        <div className="text-[11px] text-stone-500 mt-1">{ex.explanation}</div>
                      )}
                    </div>
                    <AudioButton text={ex.korean} size="md" showRateToggle />
                  </div>
                ))}
              </div>
            </div>

            {/* Lesson Summary */}
            <div className="bg-stone-50 rounded-xl border border-stone-200 p-5 text-xs text-stone-700">
              <div className="font-bold text-academy-navy uppercase tracking-wider mb-1">
                Lesson Summary & Takeaway
              </div>
              <p>{currentLesson.summary}</p>
            </div>

          </div>

          {/* Right Sidebar: Vocabulary Drawer & Grammar Highlights */}
          <div className="space-y-6">
            
            {/* Vocabulary Card */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <h4 className="font-serif font-bold text-sm text-academy-navy">
                  Key Vocabulary (어휘 목록)
                </h4>
                <span className="text-xs font-mono text-stone-500">
                  {currentLesson.vocabularyList.length} items
                </span>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {currentLesson.vocabularyList.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-stone-100 bg-stone-50/70 hover:bg-amber-50/20 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-base text-academy-navy">
                        {item.korean}
                      </span>
                      <AudioButton text={item.korean} size="sm" />
                    </div>
                    <div className="text-xs font-medium text-stone-700 mt-0.5">
                      {item.english}
                    </div>
                    {currentUser.filipinoSupport && item.filipino && (
                      <div className="text-[11px] text-amber-800">
                        🇵🇭 {item.filipino}
                      </div>
                    )}
                    <div className="text-[10px] text-stone-500 font-mono mt-1">
                      {item.romanization} • {item.partOfSpeech}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Grammar Notes */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-3">
              <h4 className="font-serif font-bold text-sm text-academy-navy pb-2 border-b border-stone-200">
                Grammar Blueprint
              </h4>
              {currentLesson.grammarNotes.map((g, idx) => (
                <div key={idx} className="space-y-1.5 text-xs">
                  <div className="font-bold text-academy-gold-dark font-mono">{g.pattern}</div>
                  <div className="text-stone-700">{g.meaning}</div>
                  <ul className="list-disc list-inside text-[11px] text-stone-600 space-y-1">
                    {g.rules.map((r, rIdx) => (
                      <li key={rIdx}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* Tab 2: Virtual Grammar Whiteboard */}
      {activeTab === 'grammar-board' && (
        <div className="bg-slate-900 text-slate-100 rounded-2xl p-8 border-4 border-stone-700 shadow-2xl relative overflow-hidden font-mono">
          <div className="flex items-center justify-between pb-6 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                PROFESSOR KIM'S INTERACTIVE LECTURE WHITEBOARD
              </span>
            </div>
            <span className="text-xs text-slate-400">Department of Korean Linguistics</span>
          </div>

          <div className="mt-8 space-y-8">
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

      {/* Tab 3: Interactive Practice Check */}
      {activeTab === 'exercises' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <div>
              <h3 className="font-serif font-bold text-base text-academy-navy">
                Lesson Knowledge Check & Exercises
              </h3>
              <p className="text-xs text-stone-600">
                Test your mastery before progressing to the subsequent curriculum unit.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {currentLesson.interactiveExercises.map((ex, idx) => {
              const selected = exerciseAnswers[ex.id];
              const isCorrect = selected === ex.correctAnswer;
              return (
                <div key={ex.id} className="p-5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-academy-gold-dark">
                      QUESTION {idx + 1}
                    </span>
                    {submittedExercises && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                        {isCorrect ? 'Correct ✓' : 'Incorrect ✗'}
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-academy-navy">{ex.question}</p>
                  {ex.koreanPrompt && (
                    <div className="text-base font-serif font-bold text-academy-navy bg-white p-3 rounded border border-stone-200 inline-block">
                      {ex.koreanPrompt}
                    </div>
                  )}

                  {ex.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {ex.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleAnswerSelect(ex.id, opt)}
                          className={`p-3 text-xs text-left rounded-lg border transition-all ${
                            selected === opt
                              ? 'bg-academy-navy text-academy-ivory border-academy-navy font-semibold shadow-sm'
                              : 'bg-white hover:bg-stone-100 text-academy-charcoal border-stone-200'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {submittedExercises && (
                    <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-950 mt-2">
                      <span className="font-bold">Explanation:</span> {ex.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-stone-200 flex justify-end">
            <button
              type="button"
              onClick={() => setSubmittedExercises(true)}
              className="px-5 py-2.5 rounded-lg bg-academy-navy hover:bg-academy-navy-light text-academy-ivory font-bold text-xs uppercase tracking-wider transition-all"
            >
              Verify Answers & Show Explanations
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Student Notebook */}
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
