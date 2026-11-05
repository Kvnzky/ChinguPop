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
import { INITIAL_USERS, ADMIN_USER, DEFAULT_STARTER_STUDENT } from '../data/initialMockUsers';
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
  SETTINGS: 'ha_settings',
  PASSWORDS: 'ha_passwords', // map: { [userId]: string (hash/credential) }
  TOUR_COMPLETED: 'ha_tour_completed' // map: { [studentId]: boolean }
};

class StorageService {
  private isInitialized = false;

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;

    // Strict cleanup of legacy placeholder students or mock progress from localStorage
    const rawUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    if (
      !rawUsers || 
      rawUsers.includes('student-dhie') || 
      rawUsers.includes('student-mhie') || 
      rawUsers.includes('teacher-kim') || 
      rawUsers.includes('admin-dean')
    ) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([DEFAULT_STARTER_STUDENT]));
    }

    const currentId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
    if (
      !currentId || 
      currentId === 'student-dhie' || 
      currentId === 'student-mhie' || 
      currentId === 'teacher-kim'
    ) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, DEFAULT_STARTER_STUDENT.id);
    }

    if (!localStorage.getItem(STORAGE_KEYS.COURSES)) {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(COURSES_DATA));
    }

    const rawAssignments = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
    if (!rawAssignments || !rawAssignments.includes('asg-vowels-1')) {
      localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(INITIAL_ASSIGNMENTS));
    }

    const rawSubmissions = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    if (!rawSubmissions || rawSubmissions.includes('student-dhie') || rawSubmissions.includes('student-mhie')) {
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify([]));
    }

    // Clean legacy vocabulary deck
    const existingVocab = localStorage.getItem(STORAGE_KEYS.VOCABULARY);
    if (
      !existingVocab || 
      existingVocab.includes('student-dhie') || 
      existingVocab.includes('student-mhie')
    ) {
      const vocabMap: Record<string, VocabularyWord[]> = {
        [DEFAULT_STARTER_STUDENT.id]: INITIAL_VOCABULARY
      };
      localStorage.setItem(STORAGE_KEYS.VOCABULARY, JSON.stringify(vocabMap));
    }

    // Clean legacy completed lessons
    const rawCompleted = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
    if (!rawCompleted || rawCompleted.includes('student-dhie') || rawCompleted.includes('student-mhie')) {
      const completed: Record<string, string[]> = {
        [DEFAULT_STARTER_STUDENT.id]: []
      };
      localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(completed));
    }

    // Clean legacy attendance
    const rawAttendance = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
    if (!rawAttendance || rawAttendance.includes('student-dhie') || rawAttendance.includes('student-mhie')) {
      const attendanceMap: Record<string, string[]> = {
        [DEFAULT_STARTER_STUDENT.id]: []
      };
      localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendanceMap));
    }

    this.isInitialized = true;
  }

  // --- Users & Roles ---
  getUsers(): UserProfile[] {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    let users: UserProfile[] = raw ? JSON.parse(raw) : [DEFAULT_STARTER_STUDENT];
    
    // Filter out any legacy dhie/mhie
    users = users.filter(u => u.id !== 'student-dhie' && u.id !== 'student-mhie');

    if (users.length === 0) {
      users = [DEFAULT_STARTER_STUDENT];
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }

    return users;
  }

  getStudents(): UserProfile[] {
    return this.getUsers().filter(u => u.role === 'student');
  }

  getAdminUser(): UserProfile {
    return ADMIN_USER;
  }

  getUserById(userId: string): UserProfile | undefined {
    if (userId === ADMIN_USER.id) return ADMIN_USER;
    return this.getUsers().find(u => u.id === userId);
  }

  getCurrentUser(): UserProfile {
    const currentId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID) || DEFAULT_STARTER_STUDENT.id;
    
    if (currentId === ADMIN_USER.id) {
      return ADMIN_USER;
    }

    const students = this.getStudents();
    return students.find(u => u.id === currentId) || students[0] || DEFAULT_STARTER_STUDENT;
  }

  setCurrentUser(userId: string): UserProfile {
    if (userId === ADMIN_USER.id) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, ADMIN_USER.id);
      return ADMIN_USER;
    }

    const student = this.getUserById(userId);
    const targetId = student ? student.id : DEFAULT_STARTER_STUDENT.id;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, targetId);
    return this.getCurrentUser();
  }

  saveUser(updatedUser: UserProfile): void {
    if (updatedUser.id === ADMIN_USER.id) return;

    const users = this.getUsers();
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index >= 0) {
      users[index] = updatedUser;
    } else {
      users.push(updatedUser);
    }
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  // --- Free Student Registration ---
  registerStudent(data: {
    name: string;
    email: string;
    proficiency?: any;
    dailyStudyMinutes?: number;
    studyDaysPerWeek?: number;
    filipinoSupport?: boolean;
    bio?: string;
    password?: string;
  }): UserProfile {
    const newId = `student-${Date.now()}`;
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const studentId = `CP-2026-${randomCode}`;
    const today = new Date().toISOString().split('T')[0];

    const newStudent: UserProfile = {
      id: newId,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      role: 'student',
      studentId,
      enrolledDate: today,
      proficiency: data.proficiency || 'Pre-A1',
      immersionStage: 'beginner',
      explanationLanguage: 'English',
      filipinoSupport: Boolean(data.filipinoSupport),
      dailyStudyMinutes: data.dailyStudyMinutes || 60,
      studyDaysPerWeek: data.studyDaysPerWeek || 7,
      assignedTeacherId: 'admin-faculty',
      currentCourseId: 'course-pre-a1',
      bio: data.bio || `${data.name.trim()}'s Korean Language Journey with ChinguPop.`,
      attendancePercentage: 0,
      currentAcademicGrade: 'Pending'
    };

    // If only the placeholder starter student exists, replace it
    let users = this.getStudents();
    if (users.length === 1 && users[0].id === 'student-chingu-1') {
      users = [];
    }
    users.push(newStudent);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    // Set as active user
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, newId);

    // Initialize clean student progress maps
    const vocabRaw = localStorage.getItem(STORAGE_KEYS.VOCABULARY);
    const vocabMap = vocabRaw ? JSON.parse(vocabRaw) : {};
    vocabMap[newId] = INITIAL_VOCABULARY;
    localStorage.setItem(STORAGE_KEYS.VOCABULARY, JSON.stringify(vocabMap));

    const compRaw = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
    const compMap = compRaw ? JSON.parse(compRaw) : {};
    compMap[newId] = [];
    localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(compMap));

    const attRaw = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
    const attMap = attRaw ? JSON.parse(attRaw) : {};
    attMap[newId] = [];
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attMap));

    if (data.password) {
      this.setPassword(newId, data.password);
    }

    return newStudent;
  }

  // Password / Security Management (Mock Secure Storage)
  setPassword(userId: string, newPass: string): void {
    const raw = localStorage.getItem(STORAGE_KEYS.PASSWORDS);
    const map = raw ? JSON.parse(raw) : {};
    map[userId] = btoa(newPass);
    localStorage.setItem(STORAGE_KEYS.PASSWORDS, JSON.stringify(map));
  }

  hasPassword(userId: string): boolean {
    const raw = localStorage.getItem(STORAGE_KEYS.PASSWORDS);
    const map = raw ? JSON.parse(raw) : {};
    return Boolean(map[userId]);
  }

  verifyPassword(userId: string, pass: string): boolean {
    const raw = localStorage.getItem(STORAGE_KEYS.PASSWORDS);
    const map = raw ? JSON.parse(raw) : {};
    if (!map[userId]) return true; // Default no password set yet
    return map[userId] === btoa(pass);
  }

  // --- Tour Status ---
  isTourCompleted(studentId: string): boolean {
    const raw = localStorage.getItem(STORAGE_KEYS.TOUR_COMPLETED);
    const map = raw ? JSON.parse(raw) : {};
    return Boolean(map[studentId]);
  }

  setTourCompleted(studentId: string, completed: boolean): void {
    const raw = localStorage.getItem(STORAGE_KEYS.TOUR_COMPLETED);
    const map = raw ? JSON.parse(raw) : {};
    map[studentId] = completed;
    localStorage.setItem(STORAGE_KEYS.TOUR_COMPLETED, JSON.stringify(map));
  }

  // --- Course & Lesson Progression ---
  isLessonUnlocked(studentId: string, lessonNumber: number, previousLessonId?: string): boolean {
    if (this.isAdminUnlockAll()) return true;

    // First lesson in course is always unlocked
    if (lessonNumber === 1 || !previousLessonId) return true;

    // Subsequent lessons require previous lesson completed
    const completed = this.getCompletedLessons(studentId);
    return completed.includes(previousLessonId);
  }

  isAdminUnlockAll(): boolean {
    return localStorage.getItem('ha_admin_unlock_all') === 'true';
  }

  setAdminUnlockAll(unlocked: boolean): void {
    localStorage.setItem('ha_admin_unlock_all', unlocked ? 'true' : 'false');
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
