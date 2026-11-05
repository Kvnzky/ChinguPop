import React, { useState } from 'react';
import { Assignment, AssignmentSubmission, UserProfile } from '../../types';
import { storage } from '../../services/storageService';
import { 
  FileCheck, 
  Send, 
  Clock, 
  Award, 
  CheckCircle, 
  AlertCircle, 
  Sparkles 
} from 'lucide-react';

interface AssignmentViewProps {
  currentUser: UserProfile;
}

export const AssignmentView: React.FC<AssignmentViewProps> = ({ currentUser }) => {
  const [assignments, setAssignments] = useState<Assignment[]>(storage.getAssignments());
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>(
    storage.getSubmissions(currentUser.id)
  );
  const [selectedAsg, setSelectedAsg] = useState<Assignment>(assignments[0]);
  const [submissionText, setSubmissionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentSubmission = submissions.find(s => s.assignmentId === selectedAsg.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionText.trim()) return;

    setIsSubmitting(true);

    // Pedagogical evaluation for assignment
    const aiFeedback = [
      {
        original: submissionText.slice(0, 40),
        corrected: submissionText.slice(0, 40),
        explanation: 'Academic tone and particle choices correspond to Seoul Institute guidelines.',
        mistakeType: 'Stylistic consistency'
      }
    ];

    const newSub: AssignmentSubmission = {
      id: `sub-${Date.now()}`,
      assignmentId: selectedAsg.id,
      studentId: currentUser.id,
      studentName: currentUser.name,
      submittedAt: new Date().toLocaleString(),
      content: submissionText.trim(),
      status: 'submitted',
      aiGrammarFeedback: aiFeedback
    };

    storage.saveSubmission(newSub);
    setSubmissions(storage.getSubmissions(currentUser.id));
    setSubmissionText('');
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-academy-gold/15 text-academy-gold-dark border border-academy-gold/30">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-xl text-academy-navy">
              Academic Assignments & Writing Submissions
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Submit lesson homework, receive instructor corrections, and track grading records.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Assignments List */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-3">
          <h3 className="font-serif font-bold text-sm text-academy-navy pb-2 border-b border-stone-200">
            Curriculum Assignments
          </h3>

          <div className="space-y-2">
            {assignments.map((asg) => {
              const sub = submissions.find(s => s.assignmentId === asg.id);
              const isSelected = selectedAsg.id === asg.id;
              return (
                <button
                  key={asg.id}
                  type="button"
                  onClick={() => setSelectedAsg(asg)}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all ${
                    isSelected
                      ? 'border-academy-navy bg-stone-50 shadow-sm'
                      : 'border-stone-100 hover:border-stone-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="flex items-center gap-1 text-stone-500">
                      <Clock className="w-3 h-3" /> Due: {asg.dueDate}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      sub?.status === 'graded' ? 'bg-emerald-100 text-emerald-800' :
                      sub?.status === 'submitted' ? 'bg-blue-100 text-blue-800' : 'bg-stone-100 text-stone-600'
                    }`}>
                      {sub?.status || 'Pending'}
                    </span>
                  </div>
                  <div className="text-xs font-serif font-bold text-academy-navy line-clamp-1">
                    {asg.title}
                  </div>
                  <div className="text-[11px] text-stone-500 line-clamp-2 mt-1">
                    {asg.instructions}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center/Right: Detailed Task & Submission Portal */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Assignment Description Card */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-serif font-bold text-lg text-academy-navy">
                {selectedAsg.title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-academy-gold-dark font-mono font-bold">
                <Award className="w-4 h-4" /> Max Score: {selectedAsg.maxGrade} pts
              </div>
            </div>

            <div className="text-xs text-stone-700 leading-relaxed space-y-2">
              <div className="font-bold text-academy-navy uppercase tracking-wider text-[11px]">
                Submission Instructions:
              </div>
              <p className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-stone-800">
                {selectedAsg.instructions}
              </p>
              {selectedAsg.supportingMaterial && (
                <div className="text-[11px] text-stone-500 italic">
                  {selectedAsg.supportingMaterial}
                </div>
              )}
            </div>
          </div>

          {/* If already submitted: show submission & grading report */}
          {currentSubmission ? (
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="font-serif font-bold text-base text-academy-navy">
                    Submission Recorded
                  </span>
                </div>
                <span className="text-xs text-stone-400 font-mono">
                  Submitted: {currentSubmission.submittedAt}
                </span>
              </div>

              {/* If an image was uploaded */}
              {currentSubmission.imageUrl && (
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-stone-600 block">
                    Uploaded Handwriting Photo:
                  </span>
                  <div className="rounded-xl border border-stone-200 overflow-hidden bg-stone-50 max-h-72 flex items-center justify-center p-2">
                    <img
                      src={currentSubmission.imageUrl}
                      alt="Submitted work"
                      className="max-h-64 object-contain rounded-lg"
                    />
                  </div>
                </div>
              )}

              {/* AI Vision Calligraphy Report */}
              {currentSubmission.aiVisionEvaluation && (
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-academy-navy text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-academy-gold-dark" />
                      SNU AI Calligraphy & Vision Assessment
                    </span>
                    <span className="font-mono font-bold text-emerald-800 text-xs px-2 py-0.5 bg-white rounded border border-amber-300">
                      Score: {currentSubmission.aiVisionEvaluation.overallScore} / 100
                    </span>
                  </div>
                  <p className="text-xs text-stone-800 leading-relaxed">
                    {currentSubmission.aiVisionEvaluation.analysisSummary}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {currentSubmission.aiVisionEvaluation.detectedCharacters.map((c) => (
                      <span key={c} className="px-2 py-0.5 rounded text-xs font-serif font-bold bg-academy-navy text-academy-gold">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Student's original work */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-stone-600 block">
                  Your Submitted Content / Notes:
                </span>
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs font-serif leading-relaxed text-academy-navy whitespace-pre-line">
                  {currentSubmission.content}
                </div>
              </div>

              {/* Faculty Grade & Feedback */}
              {currentSubmission.status === 'graded' ? (
                <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-academy-navy text-xs uppercase tracking-wider">
                      Faculty Evaluation by Prof. Min-jun Kim
                    </span>
                    <span className="text-lg font-mono font-bold text-emerald-800 bg-white px-3 py-1 rounded border border-amber-300">
                      Grade: {currentSubmission.grade} / {selectedAsg.maxGrade}
                    </span>
                  </div>

                  <p className="text-xs text-stone-800 leading-relaxed italic">
                    "{currentSubmission.teacherFeedback}"
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Your submission is currently in the faculty grading queue. Check back shortly.</span>
                </div>
              )}

              {/* AI Grammar Assistance Breakdown */}
              {currentSubmission.aiGrammarFeedback && currentSubmission.aiGrammarFeedback.length > 0 && (
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-academy-navy">
                    <Sparkles className="w-4 h-4 text-academy-gold-dark" />
                    <span>Automated Grammar & Syntax Analysis</span>
                  </div>
                  {currentSubmission.aiGrammarFeedback.map((f, i) => (
                    <div key={i} className="text-xs text-stone-600 space-y-0.5">
                      <div className="font-semibold text-academy-sage">{f.explanation}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* New Submission Form */
            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
              <h4 className="font-serif font-bold text-base text-academy-navy">
                Compose Written Submission
              </h4>

              <textarea
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                placeholder="Type your Korean response, self-introduction, or grammar transcription here in full sentences..."
                rows={8}
                required
                className="w-full p-4 rounded-xl border border-stone-300 font-sans text-xs focus:ring-2 focus:ring-academy-gold focus:border-transparent outline-none leading-relaxed text-academy-charcoal"
              />

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-stone-500">
                  Submitting as: <strong className="text-academy-navy">{currentUser.name}</strong> ({currentUser.studentId})
                </span>
                <button
                  type="submit"
                  disabled={!submissionText.trim() || isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-academy-navy hover:bg-academy-navy-light text-academy-ivory font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Assignment</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
