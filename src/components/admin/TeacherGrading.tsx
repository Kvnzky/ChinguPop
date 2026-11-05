import React, { useState } from 'react';
import { AssignmentSubmission, UserProfile } from '../../types';
import { storage } from '../../services/storageService';
import { ClipboardList, CheckCircle, Save, User, Clock } from 'lucide-react';

interface TeacherGradingProps {
  currentUser: UserProfile;
}

export const TeacherGrading: React.FC<TeacherGradingProps> = ({ currentUser }) => {
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>(storage.getSubmissions());
  const [selectedSub, setSelectedSub] = useState<AssignmentSubmission | null>(submissions[0] || null);
  const [gradeInput, setGradeInput] = useState<number>(selectedSub?.grade || 95);
  const [feedbackInput, setFeedbackInput] = useState<string>(selectedSub?.teacherFeedback || '');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSelectSub = (sub: AssignmentSubmission) => {
    setSelectedSub(sub);
    setGradeInput(sub.grade || 90);
    setFeedbackInput(sub.teacherFeedback || '');
    setStatusMessage(null);
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;

    const updated: AssignmentSubmission = {
      ...selectedSub,
      grade: Number(gradeInput),
      teacherFeedback: feedbackInput.trim(),
      status: 'graded'
    };

    storage.saveSubmission(updated);
    const refreshed = storage.getSubmissions();
    setSubmissions(refreshed);
    setSelectedSub(updated);
    setStatusMessage('Grade and academic feedback recorded successfully!');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-800 border border-blue-200">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-xl text-academy-navy">
              Faculty Grading & Student Evaluation Portal
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Review student written submissions, assign marks, and provide qualitative Korean linguistic feedback.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Submissions Queue */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <h3 className="font-serif font-bold text-sm text-academy-navy">
              Submissions Queue ({submissions.length})
            </h3>
            <span className="text-xs font-mono text-stone-500">All Students</span>
          </div>

          <div className="space-y-2">
            {submissions.map((sub) => {
              const isSelected = selectedSub?.id === sub.id;
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => handleSelectSub(sub)}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all ${
                    isSelected
                      ? 'border-blue-900 bg-blue-50/50 shadow-sm'
                      : 'border-stone-100 hover:border-stone-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-bold text-academy-navy flex items-center gap-1">
                      <User className="w-3 h-3 text-stone-400" />
                      {sub.studentName}
                    </span>
                    <span className={`px-2 py-0.2 rounded text-[10px] font-bold uppercase ${
                      sub.status === 'graded' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {sub.status}
                    </span>
                  </div>
                  <div className="text-xs font-serif text-stone-700 line-clamp-1">
                    {sub.content}
                  </div>
                  <div className="text-[10px] text-stone-400 font-mono mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {sub.submittedAt}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center/Right: Grading Workspace */}
        <div className="lg:col-span-2 space-y-6">
          {selectedSub ? (
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div>
                  <h3 className="font-serif font-bold text-base text-academy-navy">
                    Student Submission Review: {selectedSub.studentName}
                  </h3>
                  <span className="text-xs text-stone-500 font-mono">
                    ID: {selectedSub.studentId} • Received: {selectedSub.submittedAt}
                  </span>
                </div>
              </div>

              {/* Student's Written Work */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-stone-700 block">
                  Original Student Text:
                </span>
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs font-serif text-academy-navy leading-relaxed whitespace-pre-line">
                  {selectedSub.content}
                </div>
              </div>

              {/* Grading Form */}
              <form onSubmit={handleSaveGrade} className="space-y-4 pt-4 border-t border-stone-200">
                <div className="w-48">
                  <label className="block text-xs font-semibold text-academy-navy mb-1">
                    Grade Awarded (0 - 100) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={gradeInput}
                    onChange={(e) => setGradeInput(Number(e.target.value))}
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-sm font-mono font-bold text-academy-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-academy-navy mb-1">
                    Professor's Pedagogical Feedback *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={feedbackInput}
                    onChange={(e) => setFeedbackInput(e.target.value)}
                    placeholder="Enter academic praise, grammar corrections, particle adjustments, or encouragement..."
                    className="w-full p-3 border border-stone-300 rounded-lg text-xs leading-relaxed"
                  />
                </div>

                {statusMessage && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Grade & Feedback</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-stone-200 p-8 text-center text-stone-400 text-xs">
              Select a submission from the queue to begin grading.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
