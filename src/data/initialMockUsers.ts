import { UserProfile } from '../types';

export const AUTHORIZED_STUDENT_IDS = ['student-dhie', 'student-mhie'] as const;
export const AUTHORIZED_STUDENT_EMAILS = ['dhie@hangul.academy', 'mhie@hangul.academy'] as const;

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'student-dhie',
    name: 'Dhie',
    email: 'dhie@hangul.academy',
    role: 'student',
    studentId: 'HA-2026-DHIE',
    enrolledDate: '2026-11-01',
    proficiency: 'Pre-A1',
    immersionStage: 'beginner',
    explanationLanguage: 'English',
    filipinoSupport: true,
    dailyStudyMinutes: 60,
    studyDaysPerWeek: 7,
    assignedTeacherId: 'admin-faculty',
    currentCourseId: 'course-pre-a1',
    bio: "Dhie's Korean Language Journey: Aiming for full fluency from Hangul foundations to TOPIK mastery.",
    attendancePercentage: 100,
    currentAcademicGrade: 'A'
  },
  {
    id: 'student-mhie',
    name: 'Mhie',
    email: 'mhie@hangul.academy',
    role: 'student',
    studentId: 'HA-2026-MHIE',
    enrolledDate: '2026-11-01',
    proficiency: 'Pre-A1',
    immersionStage: 'beginner',
    explanationLanguage: 'English',
    filipinoSupport: true,
    dailyStudyMinutes: 60,
    studyDaysPerWeek: 7,
    assignedTeacherId: 'admin-faculty',
    currentCourseId: 'course-pre-a1',
    bio: "Mhie's Korean Language Journey: Dedicated daily practice for practical conversational fluency and TOPIK.",
    attendancePercentage: 100,
    currentAcademicGrade: 'A'
  }
];
