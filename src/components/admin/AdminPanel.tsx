import React, { useState, useMemo, useEffect } from 'react';
import {
  Course,
  Lesson,
  UserProfile,
  UserRole,
  AccountStatus,
  KoreanProficiency,
  ImmersionStage,
  AssignmentSubmission,
  AuditLogEntry
} from '../../types';
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
  Clock,
  Globe,
  CheckCircle,
  User,
  Eye,
  EyeOff,
  LogOut,
  ArrowLeft,
  Search,
  Filter,
  ArrowUpDown,
  UserPlus,
  Edit3,
  Trash2,
  ShieldAlert,
  AlertTriangle,
  X,
  Mail,
  Calendar,
  Activity,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  UserX,
  Award,
  FileText
} from 'lucide-react';

interface AdminPanelProps {
  onSwitchUser?: (user: UserProfile) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onSwitchUser }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return storage.isAdminAuthenticated();
  });
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'students' | 'grading' | 'curriculum' | 'audit' | 'settings'>('students');
  const [users, setUsers] = useState<UserProfile[]>(() => storage.getUsers());
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => storage.getAuditLogs());
  const [courses, setCourses] = useState<Course[]>(() => storage.getCourses());
  const [settings, setSettings] = useState(() => storage.getSettings());
  const [assignments] = useState(() => storage.getAssignments());
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>(() => storage.getSubmissions());
  const [selectedSub, setSelectedSub] = useState<AssignmentSubmission | null>(submissions[0] || null);
  const [gradeInput, setGradeInput] = useState<number>(selectedSub?.grade || 95);
  const [feedbackInput, setFeedbackInput] = useState<string>(selectedSub?.teacherFeedback || '');
  const [adminUnlockAll, setAdminUnlockAllState] = useState<boolean>(() => storage.isAdminUnlockAll());

  // Notifications
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // User Management Search, Filter, Sort & Pagination State
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | AccountStatus>('all');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'name-asc' | 'name-desc' | 'role'>('date-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Individual User Modals State
  const [viewingUser, setViewingUser] = useState<UserProfile | null>(null);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [deletingUser, setDeletingUser] = useState<UserProfile | null>(null);
  const [roleConfirmUser, setRoleConfirmUser] = useState<{ user: UserProfile; targetRole: UserRole } | null>(null);
  const [passwordModalUser, setPasswordModalUser] = useState<UserProfile | null>(null);
  const [modalNewPassword, setModalNewPassword] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Create User Form State
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('student');
  const [newUserStatus, setNewUserStatus] = useState<AccountStatus>('active');
  const [newUserProficiency, setNewUserProficiency] = useState<KoreanProficiency>('Pre-A1');

  // Edit User Form State
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState<UserRole>('student');
  const [editStatus, setEditStatus] = useState<AccountStatus>('active');
  const [editProficiency, setEditProficiency] = useState<KoreanProficiency>('Pre-A1');
  const [editImmersion, setEditImmersion] = useState<ImmersionStage>('beginner');
  const [editDailyMinutes, setEditDailyMinutes] = useState(60);
  const [editStudyDays, setEditStudyDays] = useState(7);
  const [editGrade, setEditGrade] = useState('Pending');
  const [editFilipinoSupport, setEditFilipinoSupport] = useState(true);
  const [editBio, setEditBio] = useState('');

  // Quick Password Reset Card State
  const [selectedStudentForPwd, setSelectedStudentForPwd] = useState<string>(() => users[0]?.id || '');
  const [newPassword, setNewPassword] = useState('');

  // New Lesson State
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || 'course-pre-a1');
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonKoreanTitle, setNewLessonKoreanTitle] = useState('');
  const [newLessonIntro, setNewLessonIntro] = useState('');
  const [newLessonExplanation, setNewLessonExplanation] = useState('');

  const refreshData = () => {
    const freshUsers = storage.getUsers();
    setUsers(freshUsers);
    setAuditLogs(storage.getAuditLogs());
    setSubmissions(storage.getSubmissions());
    setCourses(storage.getCourses());
  };

  useEffect(() => {
    refreshData();
    const handleStorageChange = () => refreshData();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const notifySuccess = (msg: string) => {
    setErrorMsg(null);
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const notifyError = (msg: string) => {
    setStatusMsg(null);
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(null), 5000);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const adminProfile = storage.authenticateAdminPortal(loginUsername, loginPassword);
      setIsAuthenticated(true);
      setLoginPassword('');
      refreshData();
      if (onSwitchUser) {
        onSwitchUser(adminProfile);
      }
    } catch (err: any) {
      setLoginError(err?.message || 'Invalid username or password. Please use authorized faculty credentials.');
    }
  };

  const handleAdminLogout = () => {
    const fallbackStudent = storage.logout();
    setIsAuthenticated(false);
    if (onSwitchUser) {
      onSwitchUser(fallbackStudent);
    }
  };

  // Computed Dashboard Metrics
  const dashboardStats = useMemo(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter(u => (u.status || 'active') === 'active').length;
    const inactiveOrSuspended = users.filter(u => u.status === 'inactive' || u.status === 'suspended').length;
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const newlyRegistered = users.filter(u => {
      const time = new Date(u.enrolledDate).getTime();
      return !isNaN(time) && time >= sevenDaysAgo;
    }).length;
    const totalAdmins = users.filter(u => u.role === 'admin').length;
    const totalStudents = users.filter(u => u.role === 'student').length;

    return {
      totalUsers,
      activeUsers,
      inactiveOrSuspended,
      newlyRegistered,
      totalAdmins,
      totalStudents
    };
  }, [users]);

  // Filtered and Sorted Users
  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = users.filter(u => {
      const matchesQuery =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.studentId || '').toLowerCase().includes(q);
      const matchesRole = roleFilter === 'all' || u.role === roleFilter;
      const uStatus = u.status || 'active';
      const matchesStatus = statusFilter === 'all' || uStatus === statusFilter;
      return matchesQuery && matchesRole && matchesStatus;
    });

    return list.sort((a, b) => {
      if (sortBy === 'date-desc') {
        const dDiff = new Date(b.enrolledDate).getTime() - new Date(a.enrolledDate).getTime();
        if (dDiff !== 0) return dDiff;
        return (b.updatedAt || '').localeCompare(a.updatedAt || '');
      }
      if (sortBy === 'date-asc') {
        const dDiff = new Date(a.enrolledDate).getTime() - new Date(b.enrolledDate).getTime();
        if (dDiff !== 0) return dDiff;
        return (a.updatedAt || '').localeCompare(b.updatedAt || '');
      }
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'role') return a.role.localeCompare(b.role);
      return 0;
    });
  }, [users, searchQuery, roleFilter, statusFilter, sortBy]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedUsers = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, safeCurrentPage, pageSize]);

  // Open Edit Modal
  const openEditUserModal = (user: UserProfile) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditRole(user.role);
    setEditStatus(user.status || 'active');
    setEditProficiency(user.proficiency);
    setEditImmersion(user.immersionStage);
    setEditDailyMinutes(user.dailyStudyMinutes);
    setEditStudyDays(user.studyDaysPerWeek);
    setEditGrade(user.currentAcademicGrade || 'Pending');
    setEditFilipinoSupport(user.filipinoSupport);
    setEditBio(user.bio || '');
  };

  const handleSaveEditedUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    try {
      storage.adminUpdateUser(editingUser.id, {
        name: editName,
        email: editEmail,
        role: editRole,
        status: editStatus,
        proficiency: editProficiency,
        immersionStage: editImmersion,
        dailyStudyMinutes: Number(editDailyMinutes),
        studyDaysPerWeek: Number(editStudyDays),
        currentAcademicGrade: editGrade,
        filipinoSupport: editFilipinoSupport,
        bio: editBio
      });
      setEditingUser(null);
      refreshData();
      notifySuccess(`Updated user profile for ${editName} successfully!`);
    } catch (err: any) {
      notifyError(err?.message || 'Failed to update user profile.');
    }
  };

  const handleCreateUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = storage.adminCreateUser({
        name: newUserName,
        email: newUserEmail,
        password: newUserPassword,
        role: newUserRole,
        status: newUserStatus,
        proficiency: newUserProficiency
      });
      setNewUserName('');
      setNewUserEmail('');
      setNewUserPassword('');
      setNewUserRole('student');
      setNewUserStatus('active');
      setIsCreateModalOpen(false);
      refreshData();
      notifySuccess(`Created ${created.role} account for ${created.name} (${created.email})!`);
    } catch (err: any) {
      notifyError(err?.message || 'Could not create user account.');
    }
  };

  const handleStatusChange = (user: UserProfile, nextStatus: AccountStatus) => {
    try {
      storage.adminChangeUserStatus(user.id, nextStatus);
      refreshData();
      notifySuccess(`Changed status for ${user.name} to "${nextStatus}".`);
    } catch (err: any) {
      notifyError(err?.message || 'Could not change account status.');
    }
  };

  const handleConfirmRoleChange = () => {
    if (!roleConfirmUser) return;
    try {
      storage.adminChangeUserRole(roleConfirmUser.user.id, roleConfirmUser.targetRole);
      setRoleConfirmUser(null);
      refreshData();
      notifySuccess(
        `${roleConfirmUser.targetRole === 'admin' ? 'Promoted' : 'Demoted'} ${roleConfirmUser.user.name} to ${roleConfirmUser.targetRole}.`
      );
    } catch (err: any) {
      setRoleConfirmUser(null);
      notifyError(err?.message || 'Role change failed.');
    }
  };

  const handleConfirmDeleteUser = () => {
    if (!deletingUser) return;
    try {
      const deletedName = deletingUser.name;
      storage.adminDeleteUser(deletingUser.id);
      setDeletingUser(null);
      if (viewingUser?.id === deletingUser.id) setViewingUser(null);
      refreshData();
      notifySuccess(`Permanently deleted user account "${deletedName}".`);
    } catch (err: any) {
      setDeletingUser(null);
      notifyError(err?.message || 'Could not delete user.');
    }
  };

  const handleModalPasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordModalUser) return;
    try {
      storage.adminResetUserPassword(passwordModalUser.id, modalNewPassword);
      const targetName = passwordModalUser.name;
      setPasswordModalUser(null);
      setModalNewPassword('');
      refreshData();
      notifySuccess(`Reset password for ${targetName} successfully!`);
    } catch (err: any) {
      notifyError(err?.message || 'Password reset failed.');
    }
  };

  // Sidebar quick password reset
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      storage.adminResetUserPassword(selectedStudentForPwd, newPassword);
      const target = storage.getUserById(selectedStudentForPwd);
      setNewPassword('');
      refreshData();
      notifySuccess(`Security password updated for ${target ? target.name : selectedStudentForPwd}!`);
    } catch (err: any) {
      notifyError(err?.message || 'Password reset failed.');
    }
  };

  const getAssignmentTitle = (assignmentId: string) => {
    return assignments.find(a => a.id === assignmentId)?.title || 'Korean Language Exercise';
  };

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
    notifySuccess('Grade and faculty academic feedback recorded successfully!');
  };

  // Toggle Master Lesson Unlock Override
  const handleToggleUnlockAll = () => {
    try {
      const nextVal = !adminUnlockAll;
      storage.setAdminUnlockAll(nextVal);
      setAdminUnlockAllState(nextVal);
      refreshData();
      notifySuccess(
        nextVal
          ? 'Master Override Enabled: All courses and lessons are temporarily unlocked for administrative preview.'
          : 'Strict Sequential Completion Restored: Lessons must be completed sequentially.'
      );
    } catch (err: any) {
      notifyError(err?.message || 'Unauthorized action.');
    }
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
    notifySuccess(`Lesson "${newLesson.title}" created and published in ${targetCourse.title}!`);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    storage.saveSettings(settings);
    notifySuccess('System & AI settings saved successfully!');
  };

  const handleExportDB = () => {
    try {
      const json = storage.exportDatabaseJSON();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chingupop-database-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    } catch (err: any) {
      notifyError(err?.message || 'Unauthorized export attempt.');
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Are you sure you want to reset the database to initial seed defaults?')) {
      try {
        storage.resetToInitialDefaults();
        refreshData();
        notifySuccess('Database restored to clean institutional seed state.');
      } catch (err: any) {
        notifyError(err?.message || 'Unauthorized reset attempt.');
      }
    }
  };

  // If not authenticated as Admin, render the secure Admin Login Gate
  if (!isAuthenticated) {
    const activeUserSession = storage.getSession();
    const isRegularUserLoggedIn = activeUserSession && activeUserSession.role !== 'admin';

    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-purple-200/90 relative overflow-hidden space-y-6">
          {isRegularUserLoggedIn && (
            <div role="alert" className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-800">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Access Restricted: Administrator Role Required</span>
              </div>
              <p className="text-[11px] text-amber-700 leading-relaxed">
                Your current session (<strong>{activeUserSession.email}</strong>) has a regular <strong>{activeUserSession.role}</strong> role. Please authenticate with administrator credentials below or return to the student dashboard.
              </p>
            </div>
          )}

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
              Please enter your institutional administrator credentials to access user management, grading, and platform controls.
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            {loginError && (
              <div role="alert" className="p-3 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 text-xs font-semibold">
                {loginError}
              </div>
            )}

            <div className="space-y-1">
              <label htmlFor="admin-username" className="text-xs font-bold text-[#1E1B4B] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#6C52EE]" />
                <span>Admin Username or Email</span>
              </label>
              <input
                id="admin-username"
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="admin123 or admin@chingupop.com"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#6C52EE]/30 focus:border-[#6C52EE]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="admin-password" className="text-xs font-bold text-[#1E1B4B] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#6C52EE]" />
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  id="admin-password"
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
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
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

  const currentAdminActor = storage.getCurrentUser();

  return (
    <div className="space-y-6">
      
      {/* Top Portal Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-100 text-purple-900 border border-purple-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif font-bold text-xl text-academy-navy">
                Academy Admin & User Management Portal
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200 font-bold uppercase">
                RBAC Protected
              </span>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              Manage all registered users, account statuses, role permissions, grading queues, and security audit logs.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{currentAdminActor.role === 'admin' ? currentAdminActor.name : 'Admin Active'}</span>
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
                const firstStudent = storage.getStudents().find(s => s.status === 'active') || storage.getStudents()[0];
                if (firstStudent) {
                  storage.setCurrentUser(firstStudent.id);
                  onSwitchUser(firstStudent);
                }
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

      {/* Feedback Notifications */}
      {statusMsg && (
        <div role="status" className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-semibold flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMsg}</span>
          </div>
          <button type="button" onClick={() => setStatusMsg(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {errorMsg && (
        <div role="alert" className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 font-semibold flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button type="button" onClick={() => setErrorMsg(null)} className="text-rose-700 hover:text-rose-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b border-stone-200 gap-4 overflow-x-auto pb-1 no-scrollbar scrollbar-none">
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
          <span>User Management ({users.length})</span>
        </button>

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
          onClick={() => setActiveTab('audit')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'audit'
              ? 'border-academy-navy text-academy-navy'
              : 'border-transparent text-stone-500 hover:text-academy-navy'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Security Audit Log ({auditLogs.length})</span>
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

      {/* ===================================================================== */}
      {/* TAB 1: COMPLETE USER MANAGEMENT DASHBOARD & TABLE                     */}
      {/* ===================================================================== */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          
          {/* KPI Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                  Total Registered Users
                </span>
                <span className="text-2xl font-bold text-[#1E1B4B] mt-1 block">
                  {dashboardStats.totalUsers}
                </span>
                <span className="text-[10px] text-stone-500 mt-0.5 block">
                  {dashboardStats.totalStudents} Scholars • {dashboardStats.totalAdmins} Admins
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#6C52EE] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                  Active Accounts
                </span>
                <span className="text-2xl font-bold text-emerald-700 mt-1 block">
                  {dashboardStats.activeUsers}
                </span>
                <span className="text-[10px] text-emerald-600 font-medium mt-0.5 block">
                  Authorized for portal sign-in
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                  Inactive / Suspended
                </span>
                <span className="text-2xl font-bold text-rose-700 mt-1 block">
                  {dashboardStats.inactiveOrSuspended}
                </span>
                <span className="text-[10px] text-stone-500 mt-0.5 block">
                  Restricted or disabled access
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <UserX className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                  Newly Registered (7d)
                </span>
                <span className="text-2xl font-bold text-[#6C52EE] mt-1 block">
                  {dashboardStats.newlyRegistered}
                </span>
                <span className="text-[10px] text-stone-500 mt-0.5 block">
                  Joined in the last 7 days
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Search, Filter, Sort & Add User Toolbar */}
          <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs space-y-3">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search users by full name, email address, or scholar ID..."
                  aria-label="Search users by name or email"
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#6C52EE]/30 focus:border-[#6C52EE]"
                />
              </div>

              {/* Filter & Sort Controls */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-stone-400" />
                  <select
                    aria-label="Filter users by role"
                    value={roleFilter}
                    onChange={(e) => {
                      setRoleFilter(e.target.value as any);
                      setCurrentPage(1);
                    }}
                    className="px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-700 bg-white focus:outline-none focus:border-[#6C52EE]"
                  >
                    <option value="all">All Roles</option>
                    <option value="student">Students Only</option>
                    <option value="admin">Admins Only</option>
                  </select>
                </div>

                <select
                  aria-label="Filter users by status"
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value as any);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-700 bg-white focus:outline-none focus:border-[#6C52EE]"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>

                <div className="flex items-center gap-1.5">
                  <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                  <select
                    aria-label="Sort users"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-700 bg-white focus:outline-none focus:border-[#6C52EE]"
                  >
                    <option value="date-desc">Newest Registered</option>
                    <option value="date-asc">Oldest Registered</option>
                    <option value="name-asc">Name (A–Z)</option>
                    <option value="name-desc">Name (Z–A)</option>
                    <option value="role">Role</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#2C1E6D] to-[#6C52EE] hover:from-[#3B288C] hover:to-[#553ACF] text-white font-bold text-xs shadow-xs transition-all"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+ Add User</span>
                </button>
              </div>
            </div>
          </div>

          {/* Registered Users Table */}
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
            {filteredUsers.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-academy-navy">
                    No matching users found
                  </h4>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    No registered accounts match your current search query or filter criteria.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setRoleFilter('all');
                    setStatusFilter('all');
                    setCurrentPage(1);
                  }}
                  className="px-3.5 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-50 text-xs font-semibold text-stone-700"
                >
                  Reset Search & Filters
                </button>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-stone-50/90 border-b border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-500">
                        <th className="py-3.5 px-4">User / Scholar ID</th>
                        <th className="py-3.5 px-4">Email Address</th>
                        <th className="py-3.5 px-4">Role</th>
                        <th className="py-3.5 px-4">Account Status</th>
                        <th className="py-3.5 px-4">Registered Date</th>
                        <th className="py-3.5 px-4">Proficiency & Progress</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-xs">
                      {paginatedUsers.map((u) => {
                        const uStatus: AccountStatus = u.status || 'active';
                        const completedCount = storage.getCompletedLessons(u.id).length;
                        const isSelf = u.id === currentAdminActor.id;

                        return (
                          <tr key={u.id} className="hover:bg-stone-50/70 transition-colors">
                            {/* Name & ID */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2C1E6D] to-[#6C52EE] text-white font-bold text-sm flex items-center justify-center shrink-0">
                                  {u.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="font-bold text-[#1E1B4B] flex items-center gap-1.5">
                                    <span>{u.name}</span>
                                    {isSelf && (
                                      <span className="text-[9px] font-mono bg-purple-100 text-[#6C52EE] px-1.5 py-0.2 rounded font-bold">
                                        You
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[10px] font-mono text-stone-500">
                                    {u.studentId || u.id}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Email */}
                            <td className="py-3.5 px-4">
                              <div className="font-medium text-stone-800">{u.email}</div>
                              <div className="text-[10px] text-emerald-700 flex items-center gap-1 mt-0.5">
                                <CheckCircle className="w-3 h-3 text-emerald-600" />
                                <span>Verified</span>
                              </div>
                            </td>

                            {/* Role */}
                            <td className="py-3.5 px-4">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                                  u.role === 'admin'
                                    ? 'bg-purple-100 text-[#2C1E6D] border border-purple-200'
                                    : 'bg-sky-50 text-sky-800 border border-sky-200'
                                }`}
                              >
                                {u.role === 'admin' ? <ShieldCheck className="w-3 h-3 text-[#6C52EE]" /> : <User className="w-3 h-3" />}
                                {u.role}
                              </span>
                            </td>

                            {/* Account Status */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`inline-block w-2 h-2 rounded-full ${
                                    uStatus === 'active'
                                      ? 'bg-emerald-500'
                                      : uStatus === 'suspended'
                                      ? 'bg-rose-500'
                                      : 'bg-amber-500'
                                  }`}
                                />
                                <select
                                  aria-label={`Change account status for ${u.name}`}
                                  value={uStatus}
                                  onChange={(e) => handleStatusChange(u, e.target.value as AccountStatus)}
                                  className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none ${
                                    uStatus === 'active'
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                      : uStatus === 'suspended'
                                      ? 'bg-rose-50 text-rose-800 border-rose-200'
                                      : 'bg-amber-50 text-amber-800 border-amber-200'
                                  }`}
                                >
                                  <option value="active">Active</option>
                                  <option value="inactive">Inactive</option>
                                  <option value="suspended">Suspended</option>
                                </select>
                              </div>
                            </td>

                            {/* Registered Date */}
                            <td className="py-3.5 px-4">
                              <div className="font-mono text-stone-700">{u.enrolledDate}</div>
                              {u.lastLoginAt && (
                                <div className="text-[10px] text-stone-400">
                                  Last active: {u.lastLoginAt.split('T')[0]}
                                </div>
                              )}
                            </td>

                            {/* Academic Progress */}
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-academy-navy">{u.proficiency}</div>
                              <div className="text-[10px] text-stone-500">
                                {completedCount} lessons • Grade: {u.currentAcademicGrade}
                              </div>
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 text-right">
                              <div className="inline-flex items-center justify-end gap-1.5 flex-wrap">
                                <button
                                  type="button"
                                  onClick={() => setViewingUser(u)}
                                  className="px-2.5 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-700 font-semibold text-[11px] transition-colors"
                                  title="View Complete User Details"
                                >
                                  View
                                </button>

                                <button
                                  type="button"
                                  onClick={() => openEditUserModal(u)}
                                  className="p-1.5 rounded-lg border border-stone-200 hover:bg-purple-50 hover:border-purple-200 text-stone-600 hover:text-[#6C52EE] transition-colors"
                                  title={`Edit ${u.name}`}
                                  aria-label={`Edit ${u.name}`}
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    setRoleConfirmUser({
                                      user: u,
                                      targetRole: u.role === 'admin' ? 'student' : 'admin'
                                    })
                                  }
                                  className="px-2 py-1.5 rounded-lg border border-purple-200 bg-purple-50/70 hover:bg-purple-100 text-[#2C1E6D] font-semibold text-[10px] transition-colors"
                                  title={u.role === 'admin' ? 'Demote to Student' : 'Promote to Admin'}
                                >
                                  {u.role === 'admin' ? 'Demote' : 'Make Admin'}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setPasswordModalUser(u);
                                    setModalNewPassword('');
                                  }}
                                  className="p-1.5 rounded-lg border border-stone-200 hover:bg-amber-50 hover:border-amber-200 text-stone-600 hover:text-amber-700 transition-colors"
                                  title={`Reset Password for ${u.name}`}
                                  aria-label={`Reset Password for ${u.name}`}
                                >
                                  <Key className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => setDeletingUser(u)}
                                  className="p-1.5 rounded-lg border border-rose-200 bg-rose-50/60 hover:bg-rose-100 text-rose-600 transition-colors"
                                  title={`Delete ${u.name}`}
                                  aria-label={`Delete ${u.name}`}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Bar */}
                <div className="px-4 py-3 bg-stone-50/80 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-stone-600">
                    <span>
                      Showing <strong>{(safeCurrentPage - 1) * pageSize + 1}</strong>–
                      <strong>{Math.min(safeCurrentPage * pageSize, filteredUsers.length)}</strong> of{' '}
                      <strong>{filteredUsers.length}</strong> users
                    </span>
                    <select
                      aria-label="Rows per page"
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="px-2 py-1 rounded border border-stone-200 bg-white text-[11px]"
                    >
                      <option value={5}>5 / page</option>
                      <option value={10}>10 / page</option>
                      <option value={25}>25 / page</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={safeCurrentPage <= 1}
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className="p-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 disabled:opacity-40"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="px-2.5 py-1 font-mono font-bold text-stone-700">
                      Page {safeCurrentPage} of {totalPages}
                    </span>
                    <button
                      type="button"
                      disabled={safeCurrentPage >= totalPages}
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className="p-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 disabled:opacity-40"
                      aria-label="Next page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: FACULTY GRADING QUEUE                                          */}
      {/* ===================================================================== */}
      {activeTab === 'grading' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="font-serif font-bold text-sm text-academy-navy">
                Submissions Queue
              </h3>
              <span className="text-xs font-mono text-stone-500">{submissions.length} Total</span>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {submissions.length === 0 ? (
                <div className="p-6 text-center text-xs text-stone-400">
                  No homework submissions in queue yet.
                </div>
              ) : (
                submissions.map((sub) => {
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
                })
              )}
            </div>
          </div>

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

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-academy-navy uppercase tracking-wider">
                    Student Written & Audio Response
                  </label>
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 font-serif leading-relaxed whitespace-pre-wrap">
                    {selectedSub.content || 'No text submitted.'}
                  </div>
                </div>

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

      {/* ===================================================================== */}
      {/* TAB 3: CURRICULUM & SEQUENTIAL LESSON CONTROLS                        */}
      {/* ===================================================================== */}
      {activeTab === 'curriculum' && (
        <div className="space-y-6">
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

      {/* ===================================================================== */}
      {/* TAB 4: SECURITY AUDIT LOG                                             */}
      {/* ===================================================================== */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <h3 className="font-serif font-bold text-base text-academy-navy">
                Administrative & Authentication Audit Log
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Immutable chronological trail of registrations, sign-ins, role changes, status updates, and deletions.
              </p>
            </div>
            <span className="text-xs font-mono text-stone-500">{auditLogs.length} Events</span>
          </div>

          <div className="space-y-2 max-h-[540px] overflow-y-auto">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-xl border border-stone-200/80 bg-stone-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-[#2C1E6D]">
                      {log.action}
                    </span>
                    <span className="font-bold text-stone-800">{log.actorName}</span>
                    {log.targetUserName && (
                      <span className="text-stone-500">
                        → Target: <strong>{log.targetUserName}</strong> ({log.targetUserEmail})
                      </span>
                    )}
                  </div>
                  <p className="text-stone-600 text-[11px]">{log.details}</p>
                </div>
                <div className="font-mono text-[10px] text-stone-400 shrink-0">
                  {new Date(log.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 5: PLATFORM & AI SETTINGS                                         */}
      {/* ===================================================================== */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form onSubmit={handleSaveSettings} className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-6">
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

          {/* Direct Password Reset Tool */}
          <form onSubmit={handleResetPassword} className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4 self-start">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
              <Key className="w-4 h-4 text-academy-navy" />
              <h3 className="font-serif font-bold text-sm text-academy-navy">
                Quick User Password Setup & Reset
              </h3>
            </div>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              Reset login credentials for any registered account. Uses salted SHA-256 password hashing (min. 8 characters with letters and numbers).
            </p>

            <div>
              <label className="block text-xs font-semibold text-academy-navy mb-1">
                Select User Account
              </label>
              <select
                value={selectedStudentForPwd}
                onChange={(e) => setSelectedStudentForPwd(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              >
                {users.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name} ({st.email} • {st.role})
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
                placeholder="Min 8 chars, letter + number/symbol"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-academy-navy hover:bg-academy-navy-light text-academy-ivory font-bold text-xs uppercase tracking-wider transition-all"
            >
              Update User Password
            </button>
          </form>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 1: VIEW COMPLETE USER DETAILS                                   */}
      {/* ===================================================================== */}
      {viewingUser && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="User Details"
        >
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 space-y-5 my-8">
            <div className="flex items-start justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2C1E6D] to-[#6C52EE] text-white font-bold text-xl flex items-center justify-center">
                  {viewingUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-academy-navy">{viewingUser.name}</h3>
                  <p className="text-xs text-stone-500 font-mono">
                    {viewingUser.studentId} • {viewingUser.email}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingUser(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] text-stone-500 uppercase font-bold block">Role</span>
                <span className="font-bold text-[#1E1B4B] capitalize mt-0.5 block">{viewingUser.role}</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] text-stone-500 uppercase font-bold block">Account Status</span>
                <span className="font-bold text-emerald-700 capitalize mt-0.5 block">{viewingUser.status || 'active'}</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] text-stone-500 uppercase font-bold block">Registered Date</span>
                <span className="font-mono font-bold text-stone-800 mt-0.5 block">{viewingUser.enrolledDate}</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] text-stone-500 uppercase font-bold block">Proficiency</span>
                <span className="font-bold text-academy-navy mt-0.5 block">{viewingUser.proficiency} ({viewingUser.immersionStage})</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] text-stone-500 uppercase font-bold block">Completed Lessons</span>
                <span className="font-mono font-bold text-stone-800 mt-0.5 block">
                  {storage.getCompletedLessons(viewingUser.id).length} Lessons
                </span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] text-stone-500 uppercase font-bold block">Attendance Days</span>
                <span className="font-mono font-bold text-stone-800 mt-0.5 block">
                  {storage.getAttendance(viewingUser.id).length} Days Active
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1">
              <span className="text-[10px] font-bold uppercase text-stone-500 block">Biography / Learning Goal</span>
              <p className="text-stone-700">{viewingUser.bio || 'No biography set.'}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-200">
              {onSwitchUser && (viewingUser.status || 'active') === 'active' && (
                <button
                  type="button"
                  onClick={() => {
                    storage.setCurrentUser(viewingUser.id);
                    onSwitchUser(viewingUser);
                    setViewingUser(null);
                  }}
                  className="px-4 py-2 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-[#6C52EE] text-xs font-bold transition-colors"
                >
                  Inspect Dashboard as {viewingUser.name}
                </button>
              )}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={() => {
                    const u = viewingUser;
                    setViewingUser(null);
                    openEditUserModal(u);
                  }}
                  className="px-4 py-2 rounded-xl bg-academy-navy text-white text-xs font-bold"
                >
                  Edit User
                </button>
                <button
                  type="button"
                  onClick={() => setViewingUser(null)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 text-xs font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 2: EDIT USER PROFILE                                            */}
      {/* ===================================================================== */}
      {editingUser && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Edit User Profile"
        >
          <form
            onSubmit={handleSaveEditedUser}
            className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 space-y-4 my-8"
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <h3 className="font-serif font-bold text-lg text-academy-navy">
                  Edit User Profile: {editingUser.name}
                </h3>
                <p className="text-xs text-stone-500 font-mono">ID: {editingUser.studentId || editingUser.id}</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-academy-navy mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-2.5 border border-stone-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-academy-navy mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full p-2.5 border border-stone-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-academy-navy mb-1">Role</label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value as UserRole)}
                  className="w-full p-2.5 border border-stone-300 rounded-lg bg-white"
                >
                  <option value="student">Regular User (Student)</option>
                  <option value="admin">Administrator (Admin)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-academy-navy mb-1">Account Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as AccountStatus)}
                  className="w-full p-2.5 border border-stone-300 rounded-lg bg-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-academy-navy mb-1">Proficiency Level</label>
                <select
                  value={editProficiency}
                  onChange={(e) => setEditProficiency(e.target.value as KoreanProficiency)}
                  className="w-full p-2.5 border border-stone-300 rounded-lg bg-white"
                >
                  <option value="Pre-A1">Pre-A1</option>
                  <option value="Level 1">Level 1</option>
                  <option value="Level 2">Level 2</option>
                  <option value="Level 3">Level 3</option>
                  <option value="Level 4">Level 4</option>
                  <option value="Level 5">Level 5</option>
                  <option value="Level 6">Level 6</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-academy-navy mb-1">Academic Grade</label>
                <input
                  type="text"
                  value={editGrade}
                  onChange={(e) => setEditGrade(e.target.value)}
                  className="w-full p-2.5 border border-stone-300 rounded-lg"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-academy-navy mb-1">Bio / Notes</label>
                <input
                  type="text"
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full p-2.5 border border-stone-300 rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-bold text-stone-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-academy-navy hover:bg-academy-navy-light text-white text-xs font-bold"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 3: CREATE NEW USER                                              */}
      {/* ===================================================================== */}
      {isCreateModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Create New User"
        >
          <form
            onSubmit={handleCreateUserSubmit}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4 my-8"
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-serif font-bold text-lg text-academy-navy">
                Create New User Account
              </h3>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-academy-navy mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Min-seo Park"
                  className="w-full p-2.5 border border-stone-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-academy-navy mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="e.g. minseo@example.com"
                  className="w-full p-2.5 border border-stone-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-academy-navy mb-1">Password * (min. 8 chars, letter + number)</label>
                <input
                  type="password"
                  required
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  placeholder="Strong password"
                  className="w-full p-2.5 border border-stone-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-academy-navy mb-1">Assign Role</label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                    className="w-full p-2.5 border border-stone-300 rounded-lg bg-white"
                  >
                    <option value="student">Student</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-academy-navy mb-1">Initial Status</label>
                  <select
                    value={newUserStatus}
                    onChange={(e) => setNewUserStatus(e.target.value as AccountStatus)}
                    className="w-full p-2.5 border border-stone-300 rounded-lg bg-white"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-bold text-stone-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#2C1E6D] to-[#6C52EE] text-white text-xs font-bold"
              >
                Create User
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 4: PROMOTE / DEMOTE ROLE CONFIRMATION                           */}
      {/* ===================================================================== */}
      {roleConfirmUser && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#6C52EE] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-academy-navy">
                  Confirm Role Change
                </h3>
                <p className="text-xs text-stone-500">
                  {roleConfirmUser.targetRole === 'admin'
                    ? 'Promote regular user to Administrator'
                    : 'Demote Administrator to regular Student'}
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Are you sure you want to change the role of <strong>{roleConfirmUser.user.name}</strong> ({roleConfirmUser.user.email}) from{' '}
              <strong className="uppercase">{roleConfirmUser.user.role}</strong> to{' '}
              <strong className="uppercase text-[#6C52EE]">{roleConfirmUser.targetRole}</strong>?
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRoleConfirmUser(null)}
                className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-bold text-stone-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRoleChange}
                className="px-5 py-2 rounded-xl bg-[#2C1E6D] hover:bg-[#3B288C] text-white text-xs font-bold"
              >
                Confirm Role Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 5: PASSWORD RESET MODAL                                         */}
      {/* ===================================================================== */}
      {passwordModalUser && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <form
            onSubmit={handleModalPasswordReset}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="font-serif font-bold text-base text-academy-navy">
                Reset Password: {passwordModalUser.name}
              </h3>
              <button
                type="button"
                onClick={() => setPasswordModalUser(null)}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs space-y-2">
              <p className="text-stone-600">
                Enter a new strong password for <strong>{passwordModalUser.email}</strong> (at least 8 characters with letters and numbers/symbols).
              </p>
              <input
                type="password"
                required
                value={modalNewPassword}
                onChange={(e) => setModalNewPassword(e.target.value)}
                placeholder="New password (min. 8 characters)"
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPasswordModalUser(null)}
                className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-bold text-stone-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-academy-navy text-white text-xs font-bold"
              >
                Save New Password
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 6: DELETE USER ACCOUNT CONFIRMATION                             */}
      {/* ===================================================================== */}
      {deletingUser && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-rose-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-rose-950">
                  Delete User Account Permanently?
                </h3>
                <p className="text-xs text-rose-700">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Are you sure you want to permanently delete the account for{' '}
              <strong>{deletingUser.name}</strong> ({deletingUser.email}, ID: {deletingUser.studentId}) and remove all associated study records?
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingUser(null)}
                className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-bold text-stone-600 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteUser}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm"
              >
                Yes, Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
