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

export const DHIE_USER: UserProfile = {
  id: 'student-dhie',
  name: 'Dhie',
  email: 'dhie@chingupop.com',
  phone: '+63 917 123 4567',
  role: 'student',
  status: 'active',
  emailVerified: true,
  lastLoginAt: '',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  studentId: 'CP-2026-DHIE',
  enrolledDate: '2026-11-01',
  proficiency: 'Pre-A1',
  immersionStage: 'beginner',
  explanationLanguage: 'English',
  filipinoSupport: true,
  dailyStudyMinutes: 60,
  studyDaysPerWeek: 7,
  assignedTeacherId: 'admin-faculty',
  currentCourseId: 'course-pre-a1',
  bio: 'Dhie’s Korean Learning Odyssey: Master Hangul foundations, grammar patterns, conversational confidence, and K-culture.',
  attendancePercentage: 0,
  currentAcademicGrade: 'Not Graded'
};

export const MHIE_USER: UserProfile = {
  id: 'student-mhie',
  name: 'Mhie',
  email: 'mhie@chingupop.com',
  phone: '+63 918 987 6543',
  role: 'student',
  status: 'active',
  emailVerified: true,
  lastLoginAt: '',
  avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
  studentId: 'CP-2026-MHIE',
  enrolledDate: '2026-11-01',
  proficiency: 'Pre-A1',
  immersionStage: 'beginner',
  explanationLanguage: 'English',
  filipinoSupport: true,
  dailyStudyMinutes: 60,
  studyDaysPerWeek: 7,
  assignedTeacherId: 'admin-faculty',
  currentCourseId: 'course-pre-a1',
  bio: 'Mhie’s Korean Language Journey: Focusing on pronunciation shadowing, everyday life expressions, and vocabulary retention.',
  attendancePercentage: 0,
  currentAcademicGrade: 'Not Graded'
};

export const DEFAULT_STARTER_STUDENT: UserProfile = DHIE_USER;

export const INITIAL_USERS: UserProfile[] = [
  DHIE_USER,
  MHIE_USER,
  ADMIN_USER
];

export const PUBLIC_GUEST_USER: UserProfile = {
  id: 'guest-visitor',
  name: 'Guest Visitor',
  email: '',
  phone: '',
  role: 'student',
  status: 'active',
  emailVerified: false,
  studentId: 'GUEST',
  enrolledDate: '2026-11-05',
  proficiency: 'Pre-A1',
  immersionStage: 'beginner',
  explanationLanguage: 'English',
  filipinoSupport: true,
  dailyStudyMinutes: 30,
  studyDaysPerWeek: 5,
  currentCourseId: 'course-pre-a1',
  bio: 'Welcome to ChinguPop! Sign in or create a free account to track your Korean learning journey.',
  attendancePercentage: 0,
  currentAcademicGrade: '-'
};
