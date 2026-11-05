import { UserProfile } from '../types';

export const ADMIN_USER: UserProfile = {
  id: 'admin-faculty',
  name: 'ChinguPop Faculty Admin',
  email: 'admin@chingupop.com',
  role: 'admin',
  status: 'active',
  emailVerified: true,
  lastLoginAt: '2026-11-05T08:00:00.000Z',
  studentId: 'FACULTY-01',
  enrolledDate: '2026-11-01',
  proficiency: 'Level 6',
  immersionStage: 'advanced',
  explanationLanguage: 'English',
  filipinoSupport: false,
  dailyStudyMinutes: 60,
  studyDaysPerWeek: 7,
  currentCourseId: 'course-pre-a1',
  bio: 'ChinguPop Korean Language Learning Academy Faculty Administration',
  attendancePercentage: 100,
  currentAcademicGrade: 'A+'
};

export const DEFAULT_STARTER_STUDENT: UserProfile = {
  id: 'student-chingu-1',
  name: 'Chingu Learner',
  email: 'learner@chingupop.com',
  role: 'student',
  status: 'active',
  emailVerified: true,
  lastLoginAt: '2026-11-05T08:00:00.000Z',
  studentId: 'CP-2026-0001',
  enrolledDate: '2026-11-01',
  proficiency: 'Pre-A1',
  immersionStage: 'beginner',
  explanationLanguage: 'English',
  filipinoSupport: true,
  dailyStudyMinutes: 60,
  studyDaysPerWeek: 7,
  assignedTeacherId: 'admin-faculty',
  currentCourseId: 'course-pre-a1',
  bio: 'My Korean Language Journey: Learning Hangul foundations, K-culture, and practical conversational fluency.',
  attendancePercentage: 0,
  currentAcademicGrade: 'Pending'
};

export const INITIAL_USERS: UserProfile[] = [
  DEFAULT_STARTER_STUDENT,
  ADMIN_USER
];
