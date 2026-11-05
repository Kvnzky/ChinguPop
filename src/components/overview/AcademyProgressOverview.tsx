import React from 'react';
import { UserProfile, Course } from '../../types';
import { storage } from '../../services/storageService';
import { ProgressBar } from '../common/ProgressBar';
import { 
  Users, 
  GraduationCap, 
  Award, 
  Calendar, 
  BookOpen, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  HeartHandshake,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface AcademyProgressOverviewProps {
  currentUser: UserProfile;
  courses: Course[];
  onSelectStudent?: (studentId: string) => void;
  onNavigateTab?: (tab: any) => void;
}

export const AcademyProgressOverview: React.FC<AcademyProgressOverviewProps> = ({
  currentUser,
  courses,
  onSelectStudent,
  onNavigateTab
}) => {
  const dhie = storage.getUserById('student-dhie') || currentUser;
  const mhie = storage.getUserById('student-mhie') || currentUser;

  // Compute individual stats for Dhie
  const dhieCompletedLessons = storage.getCompletedLessons(dhie.id);
  const dhieVocabulary = storage.getVocabulary(dhie.id);
  const dhieSubmissions = storage.getSubmissions(dhie.id);
  const dhieCourse = courses.find(c => c.id === dhie.currentCourseId) || courses[0];
  const dhieCompletionRate = Math.min(100, Math.round((dhieCompletedLessons.length / (dhieCourse?.totalLessons || 12)) * 100));

  // Compute individual stats for Mhie
  const mhieCompletedLessons = storage.getCompletedLessons(mhie.id);
  const mhieVocabulary = storage.getVocabulary(mhie.id);
  const mhieSubmissions = storage.getSubmissions(mhie.id);
  const mhieCourse = courses.find(c => c.id === mhie.currentCourseId) || courses[0];
  const mhieCompletionRate = Math.min(100, Math.round((mhieCompletedLessons.length / (mhieCourse?.totalLessons || 12)) * 100));

  // Collaborative metrics
  const isWordLearned = (w: any) => w.status === 'mastered' || (w.status !== 'new' && w.timesCorrect > 0);
  const combinedLessonsCompleted = dhieCompletedLessons.length + mhieCompletedLessons.length;
  const combinedVocabLearned = dhieVocabulary.filter(isWordLearned).length + mhieVocabulary.filter(isWordLearned).length;
  const combinedSubmissions = dhieSubmissions.length + mhieSubmissions.length;
  const combinedStudyHours = (
    dhieCompletedLessons.length * 1.0 +
    mhieCompletedLessons.length * 1.0 +
    (storage.getAttendance(dhie.id).length + storage.getAttendance(mhie.id).length) * 0.5
  ).toFixed(1);

  const students = [
    {
      profile: dhie,
      course: dhieCourse,
      completedLessons: dhieCompletedLessons,
      vocabulary: dhieVocabulary,
      submissions: dhieSubmissions,
      completionRate: dhieCompletionRate,
      color: 'border-amber-300 bg-amber-50/30',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      topSkill: dhieCompletedLessons.length > 0 ? 'Hangul Vowels Articulation' : 'Enrolled • Ready to Begin'
    },
    {
      profile: mhie,
      course: mhieCourse,
      completedLessons: mhieCompletedLessons,
      vocabulary: mhieVocabulary,
      submissions: mhieSubmissions,
      completionRate: mhieCompletionRate,
      color: 'border-emerald-300 bg-emerald-50/30',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      topSkill: mhieCompletedLessons.length > 0 ? 'Consonant Architecture' : 'Enrolled • Ready to Begin'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#2C1E6D] via-[#3B288C] to-[#553ACF] text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-purple-400/20">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono tracking-widest text-[#55C8F5] uppercase font-bold">
                Private Academy Cohort
              </span>
              <span className="text-[10px] bg-white/10 border border-purple-300/40 text-purple-200 px-2 py-0.5 rounded font-mono font-bold">
                Dhie & Mhie
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Academy Progress & Cohort Overview
            </h1>
            
            <p className="text-xs sm:text-sm text-purple-100/90 max-w-2xl leading-relaxed">
              A private, non-competitive academic dashboard displaying independent progress, course completion milestones, and shared learning objectives for both enrolled students.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-white/10 border border-purple-300/30 text-center">
              <span className="block text-2xl font-bold text-[#FF5CA8]">2</span>
              <span className="text-[10px] text-purple-200 uppercase tracking-wider font-semibold">Enrolled Scholars</span>
            </div>
          </div>
        </div>

        {/* Combined Collaborative Metrics Bar */}
        <div className="mt-8 pt-6 border-t border-purple-400/30 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-purple-200 block text-[11px] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#55C8F5]" />
              <span>Combined Study Hours</span>
            </span>
            <div className="text-xl font-mono font-bold text-[#55C8F5]">
              {combinedStudyHours} hrs
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-purple-200 block text-[11px] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Lessons Mastered</span>
            </span>
            <div className="text-xl font-mono font-bold text-emerald-400">
              {combinedLessonsCompleted} Lessons
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-purple-200 block text-[11px] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5CA8]" />
              <span>Vocabulary Mastered</span>
            </span>
            <div className="text-xl font-mono font-bold text-[#FF5CA8]">
              {combinedVocabLearned} Terms
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-purple-200 block text-[11px] flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-purple-300" />
              <span>Homework & Quizzes</span>
            </span>
            <div className="text-xl font-mono font-bold text-white">
              {combinedSubmissions} Submissions
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Student Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {students.map((student) => {
          const isCurrent = student.profile.id === currentUser.id;
          return (
            <div
              key={student.profile.id}
              className={`rounded-2xl border bg-white p-6 shadow-sm space-y-6 relative transition-all ${
                isCurrent ? 'ring-2 ring-academy-gold/60' : ''
              }`}
            >
              {/* Active Badge */}
              {isCurrent && (
                <div className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-wider bg-academy-gold text-academy-navy font-bold px-2 py-0.5 rounded shadow-sm">
                  Logged In Account
                </div>
              )}

              {/* Student Header */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-academy-navy text-academy-gold font-serif font-bold text-2xl flex items-center justify-center shadow-md">
                  {student.profile.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif font-bold text-xl text-academy-navy">
                      {student.profile.name}
                    </h2>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200">
                      {student.profile.studentId}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {student.profile.email} • {student.profile.dailyStudyMinutes} min/day
                  </p>
                </div>
              </div>

              {/* Academic Overview Metrics */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-[11px] text-stone-500 block">Proficiency Level</span>
                  <span className="font-serif font-bold text-sm text-academy-navy">
                    {student.profile.proficiency}
                  </span>
                  <span className="text-[10px] text-stone-400 block mt-0.5 capitalize">
                    {student.profile.immersionStage} immersion
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-[11px] text-stone-500 block">Academic Standing</span>
                  <span className="font-serif font-bold text-sm text-academy-gold-dark">
                    {student.completedLessons.length > 0 || student.submissions.length > 0
                      ? `Grade ${student.profile.currentAcademicGrade}`
                      : 'Enrolled (Not Started)'}
                  </span>
                  <span className="text-[10px] text-stone-400 font-semibold block mt-0.5">
                    {student.completedLessons.length > 0 ? `${student.profile.attendancePercentage}% Attendance` : '0 Days Active'}
                  </span>
                </div>
              </div>

              {/* Course Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-serif font-bold text-academy-navy">
                    {student.course.title}
                  </span>
                  <span className="font-mono text-stone-500">
                    {student.completionRate}% ({student.completedLessons.length}/{student.course.totalLessons} Lessons)
                  </span>
                </div>
                <ProgressBar
                  value={student.completionRate}
                  color={student.profile.id === 'student-dhie' ? 'gold' : 'navy'}
                  height="h-2.5"
                />
              </div>

              {/* Verified Competency Summary */}
              <div className="space-y-3 pt-2 border-t border-stone-100 text-xs">
                <span className="font-serif font-bold text-academy-navy block text-xs uppercase tracking-wider">
                  Academic Milestones & Skills:
                </span>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50/70 border border-stone-100">
                    <span className="text-stone-600">Vocabulary Mastered (SRS)</span>
                    <span className="font-mono font-bold text-academy-navy">
                      {student.vocabulary.filter(isWordLearned).length} words
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50/70 border border-stone-100">
                    <span className="text-stone-600">Homework Submissions</span>
                    <span className="font-mono font-bold text-academy-navy">
                      {student.submissions.length} completed
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50/70 border border-stone-100">
                    <span className="text-stone-600">Top Competency Focus</span>
                    <span className="font-semibold text-academy-gold-dark truncate max-w-[180px]">
                      {student.topSkill}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              {onSelectStudent && (
                <button
                  type="button"
                  onClick={() => onSelectStudent(student.profile.id)}
                  className="w-full py-2.5 px-4 rounded-xl border border-academy-navy hover:bg-academy-navy hover:text-academy-ivory text-academy-navy font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <span>Switch to {student.profile.name}'s Dashboard</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Collaborative Academy Philosophy Card */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col sm:flex-row items-center gap-5">
        <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-academy-gold-dark flex items-center justify-center shrink-0">
          <HeartHandshake className="w-6 h-6" />
        </div>
        <div className="space-y-1 text-xs">
          <h3 className="font-serif font-bold text-base text-academy-navy">
            Collaborative Peer Learning & Academic Accountability
          </h3>
          <p className="text-stone-600 leading-relaxed">
            ChinguPop provides Dhie and Mhie with an intentional learning sanctuary. True to the spirit of Chingu (친구 - friend), both scholars support each other's pronunciation practice, share study continuity, and celebrate completing each unit together toward conversational fluency and TOPIK proficiency.
          </p>
        </div>
      </div>

    </div>
  );
};
