import React, { useState } from 'react';
import { Course, Lesson, UserProfile, AssignmentSubmission } from '../../types';
import { storage } from '../../services/storageService';
import { 
  ShieldCheck, 
  Users, 
  BookOpen, 
  Settings, 
  ClipboardList, 
  Check, 
  Download, 
  RotateCcw, 
  Lock, 
  Unlock, 
  Key, 
  Sparkles, 
  Clock, 
  Globe, 
  CheckCircle, 
  User, 
  GraduationCap,
  Eye,
  EyeOff,
  LogOut,
  ArrowLeft
} from 'lucide-react';

const ADMIN_USERNAME = 'admin123';
const ADMIN_PASSWORD = 'Bunny_016';

interface AdminPanelProps {
  onSwitchUser?: (user: UserProfile) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onSwitchUser }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('ha_admin_auth') === 'true';
  });
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'grading' | 'students' | 'curriculum' | 'settings'>('grading');
  const [users, setUsers] = useState<UserProfile[]>(storage.getUsers());
  const [courses, setCourses] = useState<Course[]>(storage.getCourses());
  const [settings, setSettings] = useState(storage.getSettings());
  const [assignments] = useState(storage.getAssignments());
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>(storage.getSubmissions());
  const [selectedSub, setSelectedSub] = useState<AssignmentSubmission | null>(submissions[0] || null);
  const [gradeInput, setGradeInput] = useState<number>(selectedSub?.grade || 95);
  const [feedbackInput, setFeedbackInput] = useState<string>(selectedSub?.teacherFeedback || '');
  const [adminUnlockAll, setAdminUnlockAllState] = useState<boolean>(storage.isAdminUnlockAll());
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUsername.trim().toLowerCase() === ADMIN_USERNAME.toLowerCase() && loginPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('ha_admin_auth', 'true');
      setLoginError(null);
    } else {
      setLoginError('Invalid username or password. Please use the authorized faculty credentials.');
    }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('ha_admin_auth');
    if (onSwitchUser) {
      const student = storage.getStudents()[0] || storage.getCurrentUser();
      onSwitchUser(student);
    }
  };

  const getAssignmentTitle = (assignmentId: string) => {
    return assignments.find(a => a.id === assignmentId)?.title || 'Korean Language Exercise';
  };

  // Student password reset state
  const registeredStudents = storage.getStudents();
  const [selectedStudentForPwd, setSelectedStudentForPwd] = useState<string>(() => registeredStudents[0]?.id || '');
  const [newPassword, setNewPassword] = useState('');

  // New Lesson State
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || 'course-pre-a1');
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonKoreanTitle, setNewLessonKoreanTitle] = useState('');
  const [newLessonIntro, setNewLessonIntro] = useState('');
  const [newLessonExplanation, setNewLessonExplanation] = useState('');

  // If not authenticated, render the secure Admin Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-purple-200/90 relative overflow-hidden space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#2C1E6D] to-[#6C52EE] text-white flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck className="w-8 h-8 text-[#55C8F5]" />
            </div>
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-[#6C52EE] text-[10px] font-mono font-bold uppercase tracking-wider">
              Faculty / Admin Gate
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[#1E1B4B]">
              Admin Portal
            </h2>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              Please enter your institutional credentials to access the administrative grading queue & platform controls.
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 text-xs font-semibold">
                {loginError}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1E1B4B] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#6C52EE]" />
                <span>Username</span>
              </label>
              <input
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="admin123"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#6C52EE]/30 focus:border-[#6C52EE]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1E1B4B] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#6C52EE]" />
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#6C52EE]/30 focus:border-[#6C52EE]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#2C1E6D] to-[#6C52EE] hover:from-[#3B288C] hover:to-[#553ACF] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-98"
            >
              Log In to Admin Portal
            </button>
          </form>

          {onSwitchUser && (
            <div className="pt-2 text-center border-t border-stone-100">
              <button
                type="button"
                onClick={() => {
                  const student = storage.getStudents()[0] || storage.getCurrentUser();
                  onSwitchUser(student);
                }}
                className="text-xs font-bold text-stone-500 hover:text-[#6C52EE] transition-colors"
              >
                ← Return to Student Classroom
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Grading handler
  const handleSelectSub = (sub: AssignmentSubmission) => {
    setSelectedSub(sub);
    setGradeInput(sub.grade || 90);
    setFeedbackInput(sub.teacherFeedback || '');
    setStatusMsg(null);
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
    setStatusMsg('Grade and faculty academic feedback recorded successfully!');
    setTimeout(() => setStatusMsg(null), 3000);
  };

  // Student Password Reset
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    storage.setPassword(selectedStudentForPwd, newPassword);
    const student = storage.getUserById(selectedStudentForPwd);
    const studentName = student ? student.name : selectedStudentForPwd;
    setNewPassword('');
    setStatusMsg(`Security password updated for student ${studentName}!`);
    setTimeout(() => setStatusMsg(null), 3500);
  };

  // Toggle Master Lesson Unlock Override
  const handleToggleUnlockAll = () => {
    const nextVal = !adminUnlockAll;
    storage.setAdminUnlockAll(nextVal);
    setAdminUnlockAllState(nextVal);
    setStatusMsg(
      nextVal
        ? 'Master Override Enabled: All courses and lessons are temporarily unlocked for administrative preview.'
        : 'Strict Sequential Completion Restored: Lessons must be completed sequentially.'
    );
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim() || !newLessonExplanation.trim()) return;

    const targetCourse = courses.find(c => c.id === selectedCourseId);
    if (!targetCourse || !targetCourse.units[0]) return;

    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      unitId: targetCourse.units[0].id,
      courseId: targetCourse.id,
      lessonNumber: targetCourse.totalLessons + 1,
      title: newLessonTitle.trim(),
      koreanTitle: newLessonKoreanTitle.trim() || newLessonTitle.trim(),
      objectives: ['Acquire target vocabulary and master grammatical patterns'],
      introduction: newLessonIntro.trim() || 'Welcome to this curriculum lesson.',
      explanation: newLessonExplanation.trim(),
      koreanExamples: [
        { korean: '한국어를 열심히 배워요.', english: 'I study Korean diligently.' }
      ],
      vocabularyList: [
        { korean: '공부', romanization: 'gong-bu', english: 'Study', partOfSpeech: 'noun', exampleSentence: '공부를 해요.', exampleEnglish: 'I study.' }
      ],
      grammarNotes: [],
      interactiveExercises: [],
      comprehensionQuestions: [],
      summary: 'Lesson completed successfully.',
      status: 'published'
    };

    targetCourse.units[0].lessons.push(newLesson);
    targetCourse.totalLessons += 1;
    storage.saveCourse(targetCourse);
    setCourses(storage.getCourses());

    setNewLessonTitle('');
    setNewLessonKoreanTitle('');
    setNewLessonIntro('');
    setNewLessonExplanation('');
    setStatusMsg(`Lesson "${newLesson.title}" created and published in ${targetCourse.title}!`);
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    storage.saveSettings(settings);
    setStatusMsg('System & AI settings saved successfully!');
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleExportDB = () => {
    const json = storage.exportDatabaseJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hangul-academy-database-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleResetDefaults = () => {
    if (confirm('Are you sure you want to reset the database to initial seed defaults?')) {
      storage.resetToInitialDefaults();
      setUsers(storage.getUsers());
      setCourses(storage.getCourses());
      setSubmissions(storage.getSubmissions());
      setStatusMsg('Database restored to clean institutional seed state.');
      setTimeout(() => setStatusMsg(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-100 text-purple-900 border border-purple-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif font-bold text-xl text-academy-navy">
                Academy Admin & Faculty Portal
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200 font-bold uppercase">
                Dean & Faculty Control
              </span>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              Assignment grading queue, student scholar management, sequential curriculum unlocks, and platform settings.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>admin123 (Active)</span>
          </span>
          <button
            type="button"
            onClick={handleAdminLogout}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-xs font-semibold text-rose-700 border border-rose-200 transition-colors"
            title="Lock & Log Out of Admin Portal"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
          {onSwitchUser && (
            <button
              type="button"
              onClick={() => {
                const firstStudent = storage.getStudents()[0] || storage.getCurrentUser();
                onSwitchUser(firstStudent);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-xs font-semibold text-[#6C52EE] border border-purple-200 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Student Classroom</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleExportDB}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-stone-300 hover:bg-stone-50 text-xs font-semibold text-stone-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export DB JSON</span>
          </button>
          <button
            type="button"
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-xs font-semibold text-rose-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset DB</span>
          </button>
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-stone-200 gap-4 overflow-x-auto pb-1 no-scrollbar scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('grading')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'grading'
              ? 'border-academy-navy text-academy-navy'
              : 'border-transparent text-stone-500 hover:text-academy-navy'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>Grading & Feedback Queue ({submissions.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('students')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'students'
              ? 'border-academy-navy text-academy-navy'
              : 'border-transparent text-stone-500 hover:text-academy-navy'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Manage Registered Scholars</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('curriculum')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'curriculum'
              ? 'border-academy-navy text-academy-navy'
              : 'border-transparent text-stone-500 hover:text-academy-navy'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Curriculum & Unlock Controls</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'settings'
              ? 'border-academy-navy text-academy-navy'
              : 'border-transparent text-stone-500 hover:text-academy-navy'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Platform & AI Settings</span>
        </button>
      </div>

      {/* Tab 1: Faculty Grading Queue */}
      {activeTab === 'grading' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submissions List */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="font-serif font-bold text-sm text-academy-navy">
                Submissions Queue
              </h3>
              <span className="text-xs font-mono text-stone-500">{submissions.length} Total</span>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {submissions.map((sub) => {
                const isSelected = selectedSub?.id === sub.id;
                const student = storage.getUserById(sub.studentId);
                const studentName = student ? student.name : sub.studentId;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => handleSelectSub(sub)}
                    className={`w-full text-left p-3 rounded-lg border transition-all text-xs space-y-1 ${
                      isSelected
                        ? 'border-academy-navy bg-amber-50/60 font-semibold ring-1 ring-academy-gold/50'
                        : 'border-stone-200 hover:bg-stone-50 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-academy-navy flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-academy-gold-dark" />
                        <span>{studentName}</span>
                      </span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold uppercase ${
                        sub.status === 'graded' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {sub.status === 'graded' ? `${sub.grade}% Graded` : 'Needs Grading'}
                      </span>
                    </div>
                    <div className="text-stone-700 text-[11px] truncate">{getAssignmentTitle(sub.assignmentId)}</div>
                    <div className="text-stone-400 text-[10px] font-mono">Submitted: {sub.submittedAt}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grading & Feedback Editor */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
            {selectedSub ? (
              <form onSubmit={handleSaveGrade} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <div>
                    <h3 className="font-serif font-bold text-base text-academy-navy">
                      Grading: {getAssignmentTitle(selectedSub.assignmentId)}
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Student: <strong className="text-academy-navy">{storage.getUserById(selectedSub.studentId)?.name || selectedSub.studentId}</strong> • Submitted: {selectedSub.submittedAt}
                    </p>
                  </div>
                </div>

                {/* Student Response Display */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-academy-navy uppercase tracking-wider">
                    Student Written & Audio Response
                  </label>
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 font-serif leading-relaxed whitespace-pre-wrap">
                    {selectedSub.content || 'No text submitted.'}
                  </div>
                </div>

                {/* Score & Qualitative Feedback */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-academy-navy uppercase tracking-wider mb-1">
                      Academic Mark (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={gradeInput}
                      onChange={(e) => setGradeInput(Number(e.target.value))}
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-sm font-mono font-bold"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-academy-navy uppercase tracking-wider mb-1">
                      Faculty Pedagogical Feedback (Korean & English)
                    </label>
                    <textarea
                      rows={4}
                      value={feedbackInput}
                      onChange={(e) => setFeedbackInput(e.target.value)}
                      placeholder="e.g., 참 잘했어요! (Well done!) Your batchim liaison was articulate..."
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-xs leading-relaxed"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-academy-navy hover:bg-academy-navy-light text-academy-ivory font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                  >
                    <CheckCircle className="w-4 h-4 text-academy-gold" />
                    <span>Save Grade & Record Academic Feedback</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-8 text-center text-xs text-stone-400">
                Select a submission from the queue to review and grade.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Scholar Management */}
      {activeTab === 'students' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif font-bold text-base text-academy-navy pb-2 border-b border-stone-200">
              Registered Academy Scholars
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {users.map((student) => (
                <div key={student.id} className="p-5 rounded-xl border border-stone-200 bg-white shadow-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-academy-navy text-academy-gold font-serif font-bold text-xl flex items-center justify-center">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-base text-academy-navy">{student.name}</h4>
                      <p className="text-[11px] font-mono text-stone-500">{student.studentId} • {student.email}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between p-2 rounded bg-stone-50 border border-stone-100">
                      <span className="text-stone-500">Proficiency:</span>
                      <strong className="text-academy-navy">{student.proficiency} ({student.immersionStage})</strong>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-stone-50 border border-stone-100">
                      <span className="text-stone-500">Academic Grade:</span>
                      <strong className="text-academy-gold-dark">Grade {student.currentAcademicGrade} (100% Attendance)</strong>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-stone-50 border border-stone-100">
                      <span className="text-stone-500">Study Commitment:</span>
                      <span>{student.dailyStudyMinutes} min/day, {student.studyDaysPerWeek} days/wk</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-stone-50 border border-stone-100">
                      <span className="text-stone-500">Filipino Notes:</span>
                      <span className="font-semibold text-emerald-700">{student.filipinoSupport ? 'Enabled' : 'Disabled'}</span>
                    </div>
                  </div>

                  {onSwitchUser && (
                    <button
                      type="button"
                      onClick={() => onSwitchUser(student)}
                      className="w-full py-2 rounded-lg border border-academy-navy hover:bg-academy-navy hover:text-white text-academy-navy text-xs font-semibold transition-all"
                    >
                      Log In as {student.name}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Direct Password Reset Tool */}
          <form onSubmit={handleResetPassword} className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4 self-start">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
              <Key className="w-4 h-4 text-academy-navy" />
              <h3 className="font-serif font-bold text-sm text-academy-navy">
                Admin Password Setup & Reset
              </h3>
            </div>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              Reset login credentials for any registered student. Uses salted SHA-256 password hashing.
            </p>

            <div>
              <label className="block text-xs font-semibold text-academy-navy mb-1">
                Select Scholar
              </label>
              <select
                value={selectedStudentForPwd}
                onChange={(e) => setSelectedStudentForPwd(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              >
                {registeredStudents.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name} ({st.studentId})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-academy-navy mb-1">
                New Secure Password
              </label>
              <input
                type="password"
                required
                placeholder="Min 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-academy-navy hover:bg-academy-navy-light text-academy-ivory font-bold text-xs uppercase tracking-wider transition-all"
            >
              Update Scholar Password
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Curriculum & Sequential Lesson Controls */}
      {activeTab === 'curriculum' && (
        <div className="space-y-6">
          {/* Master Unlock Override Banner */}
          <div className="p-5 rounded-xl border border-amber-300 bg-amber-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-serif font-bold text-sm text-academy-navy flex items-center gap-2">
                {adminUnlockAll ? <Unlock className="w-4 h-4 text-amber-700" /> : <Lock className="w-4 h-4 text-academy-navy" />}
                <span>Master Lesson Unlock Override</span>
              </span>
              <p className="text-xs text-stone-600 max-w-2xl leading-relaxed">
                By default, lessons are strictly locked sequentially (Lesson n requires Lesson n-1 completed). Enabling this administrative override temporarily unlocks all curriculum lectures across all levels for faculty inspection.
              </p>
            </div>

            <button
              type="button"
              onClick={handleToggleUnlockAll}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shrink-0 flex items-center gap-1.5 shadow-sm ${
                adminUnlockAll
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-academy-navy hover:bg-academy-navy-light text-academy-ivory'
              }`}
            >
              {adminUnlockAll ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
              <span>{adminUnlockAll ? 'Restore Strict Locking' : 'Unlock All Lessons'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-base text-academy-navy pb-2 border-b border-stone-200">
                Active Courses ({courses.length})
              </h3>
              <div className="space-y-3">
                {courses.map((c) => (
                  <div key={c.id} className="p-3.5 rounded-lg border border-stone-200 bg-stone-50/50 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-academy-gold-dark">{c.level}</span>
                      <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                        {c.status}
                      </span>
                    </div>
                    <div className="font-serif font-bold text-sm text-academy-navy">{c.title}</div>
                    <div className="text-[11px] text-stone-500">{c.totalLessons} Lessons • {c.unitsCount} Units</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add New Lesson Form */}
            <form onSubmit={handleAddLesson} className="lg:col-span-2 bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-base text-academy-navy pb-2 border-b border-stone-200">
                Create & Publish New Curriculum Lesson
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-academy-navy mb-1">
                    Target Course *
                  </label>
                  <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>{c.title} ({c.level})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-academy-navy mb-1">
                    Lesson Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newLessonTitle}
                    onChange={(e) => setNewLessonTitle(e.target.value)}
                    placeholder="e.g., Location Particles 에 and 에서"
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-academy-navy mb-1">
                  Korean Lesson Title
                </label>
                <input
                  type="text"
                  value={newLessonKoreanTitle}
                  onChange={(e) => setNewLessonKoreanTitle(e.target.value)}
                  placeholder="e.g., 장소 조사 에와 에서의 차이"
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-academy-navy mb-1">
                  Detailed Academic Explanation *
                </label>
                <textarea
                  rows={4}
                  required
                  value={newLessonExplanation}
                  onChange={(e) => setNewLessonExplanation(e.target.value)}
                  placeholder="Write comprehensive grammar explanations, usage rules, and linguistic comparisons..."
                  className="w-full p-3 border border-stone-300 rounded-lg text-xs leading-relaxed"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-academy-navy hover:bg-academy-navy-light text-academy-ivory font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Publish Lesson to Academy Curriculum
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tab 4: AI & Platform Settings */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="max-w-xl mx-auto bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-base text-academy-navy pb-2 border-b border-stone-200">
            AI Provider & Academic Passing Rules
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-academy-navy mb-1">
                AI Tutor Engine Provider
              </label>
              <select
                value={settings.aiProvider}
                onChange={(e) => setSettings({ ...settings, aiProvider: e.target.value as any })}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              >
                <option value="rule-based">Built-in Pedagogical Linguistics Engine (100% Free, Offline Ready)</option>
                <option value="ollama">Ollama Local Open-Source LLM (e.g. LLaMA-3 / Mistral)</option>
                <option value="custom-api">Custom Free Endpoint</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-academy-navy mb-1">
                  Grade A Distinction Threshold (%)
                </label>
                <input
                  type="number"
                  min="50"
                  max="100"
                  value={settings.passingScoreGradeA}
                  onChange={(e) => setSettings({ ...settings, passingScoreGradeA: Number(e.target.value) })}
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-academy-navy mb-1">
                  Grade B Pass Threshold (%)
                </label>
                <input
                  type="number"
                  min="50"
                  max="100"
                  value={settings.passingScoreGradeB}
                  onChange={(e) => setSettings({ ...settings, passingScoreGradeB: Number(e.target.value) })}
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200">
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-academy-navy hover:bg-academy-navy-light text-academy-ivory font-bold text-xs uppercase tracking-wider transition-all"
            >
              Save Platform Configuration
            </button>
          </div>
        </form>
      )}

    </div>
  );
};
