import React from 'react';
import { CheckSquare, Square, Award } from 'lucide-react';
import { ProgressBar } from '../../common/ProgressBar';

export interface InteractiveObjective {
  id: string;
  title: string;
  isCompleted: boolean;
  requiredAction?: string;
}

interface LearningObjectiveChecklistProps {
  objectives: InteractiveObjective[];
  onToggleObjective: (id: string) => void;
  className?: string;
}

export const LearningObjectiveChecklist: React.FC<LearningObjectiveChecklistProps> = ({
  objectives,
  onToggleObjective,
  className = ''
}) => {
  const completedCount = objectives.filter(o => o.isCompleted).length;
  const progressPercent = Math.round((completedCount / objectives.length) * 100);

  return (
    <div className={`p-6 rounded-2xl border border-stone-200 bg-white shadow-sm space-y-4 ${className}`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-3">
        <div>
          <span className="text-[10px] uppercase font-mono font-bold text-academy-gold-dark tracking-wider block">
            Competency-Based Progress Checklist
          </span>
          <h3 className="font-serif font-bold text-lg text-academy-navy mt-0.5">
            Lesson Learning Objectives (학습 목표 달성도)
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-mono font-bold text-academy-navy">{completedCount} of {objectives.length} Mastered</span>
            <span className="text-[10px] text-stone-500 block">({progressPercent}%)</span>
          </div>
          <div className="w-24">
            <ProgressBar value={progressPercent} color="gold" />
          </div>
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {objectives.map((obj) => (
          <div
            key={obj.id}
            onClick={() => onToggleObjective(obj.id)}
            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
              obj.isCompleted
                ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                : 'bg-stone-50/60 border-stone-200 hover:border-stone-300 text-stone-800'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {obj.isCompleted ? (
                <CheckSquare className="w-4 h-4 text-emerald-600" />
              ) : (
                <Square className="w-4 h-4 text-stone-300" />
              )}
            </div>

            <div className="space-y-0.5">
              <span className={`text-xs font-medium leading-relaxed block ${obj.isCompleted ? 'font-semibold' : ''}`}>
                {obj.title}
              </span>
              {obj.requiredAction && (
                <span className="text-[10px] font-mono text-stone-500 block">
                  Action: {obj.requiredAction}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {progressPercent === 100 && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2 font-semibold animate-in fade-in">
          <Award className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>All lesson objectives verified! You have demonstrated practical Korean mastery of this unit.</span>
        </div>
      )}

    </div>
  );
};
