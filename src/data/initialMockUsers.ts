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
    assignedTeacherId: 'teacher-kim',
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
    assignedTeacherId: 'teacher-kim',
    currentCourseId: 'course-pre-a1',
    bio: "Mhie's Korean Language Journey: Dedicated daily practice for practical conversational fluency and TOPIK.",
    attendancePercentage: 100,
    currentAcademicGrade: 'A'
  },
  {
    id: 'teacher-kim',
    name: 'Prof. Min-jun Kim (김민준 교수)',
    email: 'kim.minjun@hangul.academy',
    role: 'teacher',
    enrolledDate: '2024-03-01',
    proficiency: 'Level 6',
    immersionStage: 'advanced',
    explanationLanguage: 'Korean',
    filipinoSupport: true,
    dailyStudyMinutes: 120,
    studyDaysPerWeek: 5,
    bio: 'Senior Korean Language Pedagogy Specialist, Ph.D. in Applied Korean Linguistics (Seoul National University). 12 years of university teaching experience.',
    attendancePercentage: 100,
    currentAcademicGrade: 'A'
  },
  {
    id: 'admin-dean',
    name: 'Dean Sung-ho Park (박성호 학장)',
    email: 'dean.park@hangul.academy',
    role: 'admin',
    enrolledDate: '2023-01-10',
    proficiency: 'Level 6',
    immersionStage: 'advanced',
    explanationLanguage: 'English',
    filipinoSupport: false,
    dailyStudyMinutes: 60,
    studyDaysPerWeek: 7,
    bio: 'Academic Dean and Curriculum Director of Hangul Academy.',
    attendancePercentage: 100,
    currentAcademicGrade: 'A'
  }
];
