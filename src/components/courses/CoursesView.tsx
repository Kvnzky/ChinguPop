import React, { useState } from 'react';
import { Course, Lesson, UserProfile } from '../../types';
import { storage } from '../../services/storageService';
import { 
  BookOpen, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  GraduationCap, 
  ChevronRight, 
  ChevronDown 
} from 'lucide-react';

interface CoursesViewProps {
  courses: Course[];
  currentUser: UserProfile;
  onSelectLesson: (lesson: Lesson) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  courses,
  currentUser,
  onSelectLesson
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    currentUser.currentCourseId || courses[0].id
  );
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({
    'unit-pre-a1-1': true,
    'unit-pre-a1-2': true,
    'unit-pre-a1-3': true,
    'unit-pre-a1-4': true,
    'unit-topik1-1': true
  });

  const completedLessons = storage.getCompletedLessons(currentUser.id);
  const activeCourse = courses.find(c => c.id === selectedCourseId) || courses[0];

  const toggleUnit = (unitId: string) => {
    setExpandedUnits(prev => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  return (
    <div className="space-y-6">
      
      {/* Course Level Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {courses.map((course) => {
          const isSelected = selectedCourseId === course.id;
          return (
            <button
              key={course.id}
              type="button"
              onClick={() => setSelectedCourseId(course.id)}
              className={`px-4 py-3 rounded-xl border text-left shrink-0 transition-all ${
                isSelected
                  ? 'border-academy-navy bg-academy-navy text-academy-ivory shadow-md ring-2 ring-academy-gold/40'
                  : 'border-stone-200 hover:border-stone-300 bg-white text-stone-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider opacity-80">
                  {course.level}
                </span>
                {course.topikLevel && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${isSelected ? 'bg-academy-navy-light text-academy-gold' : 'bg-stone-100 text-stone-600'}`}>
                    {course.topikLevel}
                  </span>
                )}
              </div>
              <div className="font-serif font-bold text-xs mt-1 truncate max-w-[200px]">
                {course.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Course Header Banner */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-academy-gold-dark uppercase">
                {activeCourse.level} • {activeCourse.topikLevel}
              </span>
              <span className="text-xs font-korean text-stone-400">
                {activeCourse.koreanTitle}
              </span>
            </div>
            <h2 className="font-serif font-bold text-2xl text-academy-navy mt-1">
              {activeCourse.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-stone-500 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
              {activeCourse.totalLessons} Lessons • {activeCourse.unitsCount} Units
            </span>
          </div>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed max-w-3xl">
          {activeCourse.description}
        </p>

        {/* Objectives */}
        <div className="pt-2">
          <span className="text-xs font-bold text-academy-navy block mb-2">
            Target Competency Outcomes:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
            {activeCourse.objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-academy-sage shrink-0 mt-0.5" />
                <span>{obj}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Units & Lesson Breakdown */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-lg text-academy-navy">
          Curriculum Syllabus & Units
        </h3>

        {activeCourse.units && activeCourse.units.length > 0 ? (
          activeCourse.units.map((unit) => {
            const isExpanded = expandedUnits[unit.id] ?? true;
            return (
              <div key={unit.id} className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                
                {/* Unit Header Bar */}
                <button
                  type="button"
                  onClick={() => toggleUnit(unit.id)}
                  className="w-full p-4 bg-stone-50/80 hover:bg-stone-100/70 text-left flex items-center justify-between border-b border-stone-200 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-academy-navy text-academy-gold flex items-center justify-center font-bold text-xs font-mono">
                      U{unit.unitNumber}
                    </span>
                    <div>
                      <div className="font-serif font-bold text-sm text-academy-navy">
                        {unit.title}
                      </div>
                      <div className="text-[11px] text-stone-500 font-korean">
                        {unit.koreanTitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-stone-500">
                      {unit.lessons.length} Lessons
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-stone-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-stone-400" />
                    )}
                  </div>
                </button>

                {/* Lessons in Unit */}
                {isExpanded && (
                  <div className="divide-y divide-stone-100 p-2">
                    {unit.lessons.map((lesson) => {
                      const isDone = completedLessons.includes(lesson.id);
                      return (
                        <div
                          key={lesson.id}
                          className="p-3 sm:p-4 rounded-lg hover:bg-stone-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-academy-gold-dark">
                                Lesson {lesson.lessonNumber}
                              </span>
                              {isDone ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                                  Completed
                                </span>
                              ) : (
                                <span className="text-[10px] text-stone-400 font-mono">Available</span>
                              )}
                            </div>
                            <div className="font-serif font-bold text-sm text-academy-navy">
                              {lesson.title}
                            </div>
                            <div className="text-xs text-stone-500 font-korean">
                              {lesson.koreanTitle}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => onSelectLesson(lesson)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-academy-navy hover:bg-academy-navy-light text-academy-ivory text-xs font-semibold uppercase tracking-wider transition-all shrink-0 self-start sm:self-center"
                          >
                            <span>Enter Classroom</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-xl border border-stone-200 p-8 text-center text-xs text-stone-500 space-y-2">
            <BookOpen className="w-8 h-8 text-stone-300 mx-auto" />
            <p className="font-serif font-bold text-sm text-academy-navy">Syllabus Outline Active</p>
            <p>Higher-level units for {activeCourse.title} are managed by academic faculty. Administrators can add lessons using the Dean Admin Portal.</p>
          </div>
        )}
      </div>

    </div>
  );
};
