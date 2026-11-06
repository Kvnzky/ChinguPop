import React, { useState } from 'react';
import { StudyPlanItem, UserProfile } from '../../types';
import { studyPlanner } from '../../services/studyPlannerService';
import { storage } from '../../services/storageService';
import { ProgressBar } from '../common/ProgressBar';
import { 
  CalendarClock, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Flame, 
  BookOpen, 
  Sparkles, 
  Mic, 
  Headphones, 
  FileText 
} from 'lucide-react';

interface StudyPlannerProps {
  currentUser: UserProfile;
}

export const StudyPlanner: React.FC<StudyPlannerProps> = ({ currentUser }) => {
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay()); // today 0-6
  const [planItems, setPlanItems] = useState<StudyPlanItem[]>(() => {
    const saved = storage.getStudyPlan(currentUser.id);
    if (saved && saved.length > 0) return saved;
    const generated = studyPlanner.generateWeeklyPlan(currentUser);
    storage.saveStudyPlan(currentUser.id, generated);
    return generated;
  });

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const currentDayItems = planItems.filter(item => item.dayOfWeek === selectedDay);
  const completedToday = currentDayItems.filter(i => i.completed).length;
  const progressPercent = currentDayItems.length > 0 
    ? Math.round((completedToday / currentDayItems.length) * 100) 
    : 0;

  const handleToggleItem = (id: string) => {
    const updated = planItems.map(item => {
      if (item.id === id) {
        const nextCompleted = !item.completed;
        if (nextCompleted && currentUser.id !== 'guest-visitor') {
          storage.addXP(currentUser.id, 15, `Completed Study Plan Task: ${item.title}`, `planner-${item.id}`);
        }
        return { ...item, completed: nextCompleted };
      }
      return item;
    });
    setPlanItems(updated);
    storage.saveStudyPlan(currentUser.id, updated);
  };

  const getActivityIcon = (type: StudyPlanItem['activityType']) => {
    switch (type) {
      case 'Structured lesson': return BookOpen;
      case 'Grammar and vocabulary': return Sparkles;
      case 'Listening practice': return Headphones;
      case 'Speaking practice': return Mic;
      case 'Reading or writing': return FileText;
      case 'Review and homework': return CheckCircle2;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Planner Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-academy-navy text-academy-gold">
            <CalendarClock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-xl text-academy-navy">
              Dynamic 60-Minute Daily Study Planner
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Personalized schedule calibrated for: <strong className="text-academy-navy">{currentUser.dailyStudyMinutes} min/day, {currentUser.studyDaysPerWeek} days/week</strong> ({currentUser.proficiency} level).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-stone-50 px-4 py-2.5 rounded-xl border border-stone-200">
          <div className="text-right">
            <span className="text-[11px] font-mono text-stone-500 block">Daily Target Completion</span>
            <span className="text-base font-bold text-academy-navy font-mono">{progressPercent}% Completed</span>
          </div>
          <div className="w-24">
            <ProgressBar value={progressPercent} color="gold" />
          </div>
        </div>
      </div>

      {/* 7-Day Day Selector Strip */}
      <div className="grid grid-cols-7 gap-2">
        {dayNames.map((name, idx) => {
          const isSelected = selectedDay === idx;
          const dayItems = planItems.filter(i => i.dayOfWeek === idx);
          const doneCount = dayItems.filter(i => i.completed).length;
          const isDone = dayItems.length > 0 && doneCount === dayItems.length;

          return (
            <button
              key={name}
              type="button"
              onClick={() => setSelectedDay(idx)}
              className={`p-3 rounded-xl border text-center transition-all ${
                isSelected
                  ? 'border-academy-navy bg-academy-navy text-academy-ivory shadow-md ring-2 ring-academy-gold/40'
                  : 'border-stone-200 hover:border-stone-300 bg-white text-stone-700'
              }`}
            >
              <div className="text-[10px] uppercase font-mono tracking-wider font-semibold opacity-75">
                {name.slice(0, 3)}
              </div>
              <div className="text-sm font-bold mt-0.5">
                {name.slice(0, 3)}
              </div>
              <div className="text-[10px] mt-1 font-mono">
                {isDone ? (
                  <span className="text-emerald-400 font-bold">Done ✓</span>
                ) : (
                  <span>{doneCount}/{dayItems.length}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Today's 60-Minute Allocation Schedule */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div>
            <h3 className="font-serif font-bold text-lg text-academy-navy flex items-center gap-2">
              <span>{dayNames[selectedDay]}'s 60-Minute Curriculum Schedule</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Structured University Routine: 20m Core Lecture + 10m Vocab + 10m Listening + 10m Speaking + 5m Reading + 5m Homework.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {currentDayItems.map((item, idx) => {
            const Icon = getActivityIcon(item.activityType);
            return (
              <div
                key={item.id}
                onClick={() => handleToggleItem(item.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-4 select-none ${
                  item.completed
                    ? 'bg-stone-50/70 border-stone-200 opacity-80'
                    : 'bg-white hover:border-academy-gold border-stone-200 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`mt-0.5 ${item.completed ? 'text-emerald-600' : 'text-stone-300'}`}>
                    {item.completed ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-academy-gold-dark">
                        {item.timeSlot} ({item.durationMinutes} min)
                      </span>
                      <span className="text-[10px] px-2 py-0.2 rounded bg-stone-100 text-stone-600 font-medium uppercase font-mono">
                        {item.activityType}
                      </span>
                    </div>

                    <h4 className={`text-sm font-serif font-bold ${item.completed ? 'line-through text-stone-500' : 'text-academy-navy'}`}>
                      {item.title}
                    </h4>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-stone-50 border border-stone-200 text-academy-navy shrink-0">
                  <Icon className="w-4 h-4 text-academy-gold-dark" />
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
