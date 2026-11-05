import { 
  UserProfile, 
  Course, 
  VocabularyWord, 
  Assignment, 
  AssignmentSubmission, 
  ExamAttempt, 
  Certificate, 
  AIMessage, 
  StudyPlanItem 
} from '../types';
import { INITIAL_USERS } from '../data/initialMockUsers';
import { COURSES_DATA } from '../data/curriculumData';
import { INITIAL_VOCABULARY } from '../data/vocabularyData';
import { INITIAL_ASSIGNMENTS, INITIAL_SUBMISSIONS } from '../data/assessmentData';

const STORAGE_KEYS = {
  CURRENT_USER_ID: 'ha_current_user_id',
  USERS: 'ha_users',
  COURSES: 'ha_courses',
  COMPLETED_LESSONS: 'ha_completed_lessons', // map: { [studentId]: string[] }
  VOCABULARY: 'ha_vocabulary', // map: { [studentId]: VocabularyWord[] }
  ASSIGNMENTS: 'ha_assignments',
  SUBMISSIONS: 'ha_submissions',
  EXAM_ATTEMPTS: 'ha_exam_attempts',
  CERTIFICATES: 'ha_certificates',
  AI_CONVERSATIONS: 'ha_ai_conversations', // map: { [studentId]: AIMessage[] }
  STUDY_PLANS: 'ha_study_plans', // map: { [studentId]: StudyPlanItem[] }
  ATTENDANCE: 'ha_attendance', // map: { [studentId]: string[] (dates) }
  SETTINGS: 'ha_settings'
};

class StorageService {
  private isInitialized = false;

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
    }

    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, 'student-default');
    }

    if (!localStorage.getItem(STORAGE_KEYS.COURSES)) {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(COURSES_DATA));
    }

    if (!localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS)) {
      localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(INITIAL_ASSIGNMENTS));
    }

    if (!localStorage.getItem(STORAGE_KEYS.SUBMISSIONS)) {
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(INITIAL_SUBMISSIONS));
    }

    // Initialize default student vocabulary deck
    const existingVocab = localStorage.getItem(STORAGE_KEYS.VOCABULARY);
    if (!existingVocab) {
      const vocabMap: Record<string, VocabularyWord[]> = {
        'student-default': INITIAL_VOCABULARY,
        'student-2': INITIAL_VOCABULARY
      };
      localStorage.setItem(STORAGE_KEYS.VOCABULARY, JSON.stringify(vocabMap));
    }

    // Initialize completed lessons map
    if (!localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS)) {
      const completed: Record<string, string[]> = {
        'student-default': ['lesson-pre-a1-1', 'lesson-pre-a1-2'],
        'student-2': ['lesson-pre-a1-1', 'lesson-pre-a1-2', 'lesson-pre-a1-3', 'lesson-pre-a1-4', 'lesson-pre-a1-5', 'lesson-pre-a1-6', 'lesson-pre-a1-7', 'lesson-pre-a1-8']
      };
      localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(completed));
    }

    // Initialize default attendance
    if (!localStorage.getItem(STORAGE_KEYS.ATTENDANCE)) {
      const today = new Date().toISOString().split('T')[0];
      const attendanceMap: Record<string, string[]> = {
        'student-default': [today, '2026-11-04', '2026-11-03', '2026-11-02'],
        'student-2': [today, '2026-11-04', '2026-11-02']
      };
      localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendanceMap));
    }

    this.isInitialized = true;
  }

  // --- Users & Roles ---
  getUsers(): UserProfile[] {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    return raw ? JSON.parse(raw) : INITIAL_USERS;
  }

  getCurrentUser(): UserProfile {
    const users = this.getUsers();
    const currentId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID) || 'student-default';
    return users.find(u => u.id === currentId) || users[0];
  }

  setCurrentUser(userId: string): UserProfile {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, userId);
    return this.getCurrentUser();
  }

  saveUser(updatedUser: UserProfile): void {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index >= 0) {
      users[index] = updatedUser;
    } else {
      users.push(updatedUser);
    }
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  // --- Courses & Curriculum ---
  getCourses(): Course[] {
    const raw = localStorage.getItem(STORAGE_KEYS.COURSES);
    return raw ? JSON.parse(raw) : COURSES_DATA;
  }

  saveCourse(course: Course): void {
    const courses = this.getCourses();
    const idx = courses.findIndex(c => c.id === course.id);
    if (idx >= 0) {
      courses[idx] = course;
    } else {
      courses.push(course);
    }
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  }

  // --- Completed Lessons ---
  getCompletedLessons(studentId: string): string[] {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
    const map = raw ? JSON.parse(raw) : {};
    return map[studentId] || [];
  }

  markLessonCompleted(studentId: string, lessonId: string): void {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
    const map = raw ? JSON.parse(raw) : {};
    const list: string[] = map[studentId] || [];
    if (!list.includes(lessonId)) {
      list.push(lessonId);
      map[studentId] = list;
      localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(map));
    }
  }

  // --- Spaced Repetition Vocabulary ---
  getVocabulary(studentId: string): VocabularyWord[] {
    const raw = localStorage.getItem(STORAGE_KEYS.VOCABULARY);
    const map = raw ? JSON.parse(raw) : {};
    if (!map[studentId]) {
      map[studentId] = INITIAL_VOCABULARY;
      localStorage.setItem(STORAGE_KEYS.VOCABULARY, JSON.stringify(map));
    }
    return map[studentId] || [];
  }

  saveVocabularyWord(studentId: string, word: VocabularyWord): void {
    const words = this.getVocabulary(studentId);
    const idx = words.findIndex(w => w.id === word.id);
    if (idx >= 0) {
      words[idx] = word;
    } else {
      words.push(word);
    }
    const raw = localStorage.getItem(STORAGE_KEYS.VOCABULARY);
    const map = raw ? JSON.parse(raw) : {};
    map[studentId] = words;
    localStorage.setItem(STORAGE_KEYS.VOCABULARY, JSON.stringify(map));
  }

  // --- Assignments & Submissions ---
  getAssignments(): Assignment[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
    return raw ? JSON.parse(raw) : INITIAL_ASSIGNMENTS;
  }

  saveAssignment(assignment: Assignment): void {
    const list = this.getAssignments();
    const idx = list.findIndex(a => a.id === assignment.id);
    if (idx >= 0) list[idx] = assignment;
    else list.push(assignment);
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(list));
  }

  getSubmissions(studentId?: string): AssignmentSubmission[] {
    const raw = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    const list: AssignmentSubmission[] = raw ? JSON.parse(raw) : INITIAL_SUBMISSIONS;
    if (studentId) {
      return list.filter(s => s.studentId === studentId);
    }
    return list;
  }

  saveSubmission(submission: AssignmentSubmission): void {
    const list = this.getSubmissions();
    const idx = list.findIndex(s => s.id === submission.id);
    if (idx >= 0) {
      list[idx] = submission;
    } else {
      list.push(submission);
    }
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(list));
  }

  // --- Exam Attempts ---
  getExamAttempts(studentId: string): ExamAttempt[] {
    const raw = localStorage.getItem(STORAGE_KEYS.EXAM_ATTEMPTS);
    const list: ExamAttempt[] = raw ? JSON.parse(raw) : [];
    return list.filter(e => e.studentId === studentId);
  }

  saveExamAttempt(attempt: ExamAttempt): void {
    const raw = localStorage.getItem(STORAGE_KEYS.EXAM_ATTEMPTS);
    const list: ExamAttempt[] = raw ? JSON.parse(raw) : [];
    list.push(attempt);
    localStorage.setItem(STORAGE_KEYS.EXAM_ATTEMPTS, JSON.stringify(list));
  }

  // --- Certificates ---
  getCertificates(studentId?: string): Certificate[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
    const list: Certificate[] = raw ? JSON.parse(raw) : [];
    if (studentId) {
      return list.filter(c => c.studentId === studentId);
    }
    return list;
  }

  saveCertificate(cert: Certificate): void {
    const list = this.getCertificates();
    const idx = list.findIndex(c => c.id === cert.id);
    if (idx >= 0) list[idx] = cert;
    else list.push(cert);
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(list));
  }

  // --- AI Tutor Conversations ---
  getAIMessages(studentId: string): AIMessage[] {
    const raw = localStorage.getItem(STORAGE_KEYS.AI_CONVERSATIONS);
    const map = raw ? JSON.parse(raw) : {};
    return map[studentId] || [];
  }

  saveAIMessages(studentId: string, messages: AIMessage[]): void {
    const raw = localStorage.getItem(STORAGE_KEYS.AI_CONVERSATIONS);
    const map = raw ? JSON.parse(raw) : {};
    map[studentId] = messages;
    localStorage.setItem(STORAGE_KEYS.AI_CONVERSATIONS, JSON.stringify(map));
  }

  // --- Study Plan Items ---
  getStudyPlan(studentId: string): StudyPlanItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDY_PLANS);
    const map = raw ? JSON.parse(raw) : {};
    return map[studentId] || [];
  }

  saveStudyPlan(studentId: string, plan: StudyPlanItem[]): void {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDY_PLANS);
    const map = raw ? JSON.parse(raw) : {};
    map[studentId] = plan;
    localStorage.setItem(STORAGE_KEYS.STUDY_PLANS, JSON.stringify(map));
  }

  // --- Attendance ---
  getAttendance(studentId: string): string[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
    const map = raw ? JSON.parse(raw) : {};
    return map[studentId] || [];
  }

  recordAttendanceToday(studentId: string): void {
    const today = new Date().toISOString().split('T')[0];
    const raw = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
    const map = raw ? JSON.parse(raw) : {};
    const dates: string[] = map[studentId] || [];
    if (!dates.includes(today)) {
      dates.push(today);
      map[studentId] = dates;
      localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(map));
    }
  }

  // --- Platform Settings ---
  getSettings(): {
    aiProvider: 'rule-based' | 'ollama' | 'custom-api';
    ollamaEndpoint: string;
    customApiKey?: string;
    passingScoreGradeA: number;
    passingScoreGradeB: number;
  } {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return raw ? JSON.parse(raw) : {
      aiProvider: 'rule-based',
      ollamaEndpoint: 'http://localhost:11434',
      passingScoreGradeA: 90,
      passingScoreGradeB: 80
    };
  }

  saveSettings(settings: any): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }

  // --- Database Export / Reset ---
  exportDatabaseJSON(): string {
    const dump: Record<string, any> = {};
    Object.entries(STORAGE_KEYS).forEach(([_, key]) => {
      dump[key] = localStorage.getItem(key);
    });
    return JSON.stringify(dump, null, 2);
  }

  resetToInitialDefaults(): void {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    this.init();
  }
}

export const storage = new StorageService();
