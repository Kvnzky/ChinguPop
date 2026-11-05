import React from 'react';
import { UserProfile } from '../../types';
import { storage } from '../../services/storageService';
import { ProgressBar } from '../common/ProgressBar';
import { 
  TrendingUp, 
  Calendar, 
  Award, 
  FileText, 
  Printer, 
  CheckCircle2 
} from 'lucide-react';

interface AcademicRecordsProps {
  currentUser: UserProfile;
}

export const AcademicRecords: React.FC<AcademicRecordsProps> = ({ currentUser }) => {
  const completedLessons = storage.getCompletedLessons(currentUser.id);
  const submissions = storage.getSubmissions(currentUser.id);
  const examAttempts = storage.getExamAttempts(currentUser.id);
  const attendance = storage.getAttendance(currentUser.id);
  const certs = storage.getCertificates(currentUser.id);

  const handlePrintTranscript = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-academy-navy text-academy-gold">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-xl text-academy-navy">
              Official Student Academic Record & Transcript
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Verified enrollment records, assessment histories, attendance percentages, and formal GPA.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePrintTranscript}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-gradient-to-r from-[#6C52EE] to-[#8E77F7] text-white text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-sm active:scale-95 transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print Official Transcript</span>
        </button>
      </div>

      {/* Academic Profile Snapshot */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-6 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 text-xs">
        <div className="p-3 bg-purple-50/40 rounded-xl border border-purple-100">
          <span className="text-[#6C52EE] font-mono uppercase font-bold text-[10px] block">Student Name</span>
          <div className="font-serif font-bold text-base text-[#2C1E6D] mt-1">{currentUser.name}</div>
          <div className="text-[11px] text-stone-600 font-mono font-medium">{currentUser.studentId}</div>
        </div>

        <div className="p-3 bg-purple-50/40 rounded-xl border border-purple-100">
          <span className="text-[#6C52EE] font-mono uppercase font-bold text-[10px] block">Current Proficiency</span>
          <div className="font-mono font-bold text-base text-[#FF5CA8] mt-1">{currentUser.proficiency}</div>
          <div className="text-[11px] text-stone-600 capitalize font-medium">{currentUser.immersionStage} Immersion</div>
        </div>

        <div className="p-3 bg-purple-50/40 rounded-xl border border-purple-100">
          <span className="text-[#6C52EE] font-mono uppercase font-bold text-[10px] block">Academic GPA / Standing</span>
          <div className="font-serif font-bold text-base text-[#2C1E6D] mt-1">
            {completedLessons.length > 0 || submissions.length > 0
              ? `Grade ${currentUser.currentAcademicGrade}`
              : 'Enrolled'}
          </div>
          <div className="text-[11px] text-stone-600 font-medium">
            {completedLessons.length > 0 ? "Dean's Honors List" : 'Awaiting Assessments'}
          </div>
        </div>

        <div className="p-3 bg-purple-50/40 rounded-xl border border-purple-100">
          <span className="text-[#6C52EE] font-mono uppercase font-bold text-[10px] block">Institutional Attendance</span>
          <div className="font-mono font-bold text-base text-[#2C1E6D] mt-1">
            {attendance.length > 0 ? `${currentUser.attendancePercentage}% Verified` : '0 Recorded Days'}
          </div>
          <div className="text-[11px] text-stone-600 font-medium">
            {attendance.length > 0 ? `${attendance.length} Sessions Logged` : 'Ready to Begin'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Examination & Quiz History */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <h3 className="font-serif font-bold text-base text-academy-navy flex items-center gap-2">
              <Award className="w-4 h-4 text-academy-gold-dark" />
              <span>Examination Records ({examAttempts.length})</span>
            </h3>
          </div>

          {examAttempts.length > 0 ? (
            <div className="divide-y divide-stone-100">
              {examAttempts.map((attempt) => (
                <div key={attempt.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-serif font-bold text-academy-navy">{attempt.quizTitle}</div>
                    <div className="text-stone-500 font-mono text-[10px] mt-0.5">{attempt.timestamp}</div>
                  </div>
                  <div className="text-right">
                    <span className={`font-mono font-bold text-sm ${attempt.passed ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {attempt.score}%
                    </span>
                    <div className="text-[10px] uppercase font-bold text-stone-400">
                      {attempt.passed ? 'Passed ✓' : 'Failed'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-stone-400">
              No examination attempts recorded yet.
            </div>
          )}
        </div>

        {/* Right: Assignment Submissions & Teacher Feedback */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <h3 className="font-serif font-bold text-base text-academy-navy flex items-center gap-2">
              <FileText className="w-4 h-4 text-academy-navy" />
              <span>Graded Coursework & Essays ({submissions.length})</span>
            </h3>
          </div>

          {submissions.length > 0 ? (
            <div className="divide-y divide-stone-100">
              {submissions.map((sub) => (
                <div key={sub.id} className="py-3 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-academy-navy">Submission #{sub.id.slice(-4)}</span>
                    <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Grade: {sub.grade ?? 'Pending'} / 100
                    </span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 font-serif text-[11px] text-stone-700 italic">
                    "{sub.content.slice(0, 80)}..."
                  </div>
                  {sub.teacherFeedback && (
                    <div className="text-[11px] text-stone-600">
                      <strong className="text-academy-navy">Faculty Feedback:</strong> {sub.teacherFeedback}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-stone-400 bg-stone-50 rounded-lg border border-stone-100">
              No homework submissions recorded yet. Complete and submit assignments in the Assignments portal to establish your record.
            </div>
          )}
        </div>

      </div>

      {/* Attendance Calendar History */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-3">
        <h3 className="font-serif font-bold text-base text-academy-navy flex items-center gap-2">
          <Calendar className="w-4 h-4 text-academy-sage" />
          <span>Institutional Daily Attendance Log</span>
        </h3>
        <p className="text-xs text-stone-600">
          Enrolled students must maintain at least 80% attendance to qualify for the TOPIK I Academy Diploma.
        </p>

        {attendance.length > 0 ? (
          <div className="flex flex-wrap gap-2 pt-2">
            {attendance.map((date) => (
              <div key={date} className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-mono text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{date} (Present)</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-stone-400 bg-stone-50 rounded-lg border border-stone-100">
            No attendance recorded yet. Complete your first study session to mark day 1 attendance.
          </div>
        )}
      </div>

    </div>
  );
};
