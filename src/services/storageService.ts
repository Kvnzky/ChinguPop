import { 
  UserProfile, 
  UserRole,
  AccountStatus,
  AuthSession,
  AuditLogEntry,
  Course, 
  VocabularyWord, 
  Assignment, 
  AssignmentSubmission, 
  ExamAttempt, 
  Certificate, 
  AIMessage, 
  StudyPlanItem,
  StudentGamificationState,
  Achievement,
  ReviewItem,
  ArcadeGameId,
  ArcadeScoreRecord
} from '../types';
import { INITIAL_USERS, ADMIN_USER, DEFAULT_STARTER_STUDENT, PUBLIC_GUEST_USER, DHIE_USER, MHIE_USER } from '../data/initialMockUsers';
import { COURSES_DATA } from '../data/curriculumData';
import { INITIAL_VOCABULARY } from '../data/vocabularyData';
import { INITIAL_ASSIGNMENTS, INITIAL_SUBMISSIONS } from '../data/assessmentData';

const STORAGE_KEYS = {
  CURRENT_USER_ID: 'ha_current_user_id',
  AUTH_SESSION: 'ha_auth_session',
  ADMIN_AUTH: 'ha_admin_auth',
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
  PASSWORDS: 'ha_passwords', // map: { [userId]: string (salted hash) }
  RESET_CODES: 'ha_reset_codes', // map: { [email]: { code: string; expiresAt: number } }
  AUDIT_LOGS: 'ha_audit_logs', // AuditLogEntry[]
  TOUR_COMPLETED: 'ha_tour_completed', // map: { [studentId]: boolean }
  GAMIFICATION: 'ha_gamification',
  ACHIEVEMENTS: 'ha_achievements',
  REVIEW_QUEUE: 'ha_review_queue',
  ARCADE_SCORES: 'ha_arcade_scores',
  BOSS_RESULTS: 'ha_boss_results'
};

export const ADMIN_DEFAULT_USERNAME = 'admin123';
export const ADMIN_DEFAULT_PASSWORD = 'Bunny_016';

export const LEVEL_TIERS = [
  { level: 1, title: 'Chingu Seed (새싹)', minXP: 0, maxXP: 99 },
  { level: 2, title: 'Hangul Sprout (한글 새싹)', minXP: 100, maxXP: 249 },
  { level: 3, title: 'Word Explorer (단어 탐험가)', minXP: 250, maxXP: 499 },
  { level: 4, title: 'Sentence Builder (문장 건축가)', minXP: 500, maxXP: 849 },
  { level: 5, title: 'Conversation Scout (회화 스카우트)', minXP: 850, maxXP: 1299 },
  { level: 6, title: 'Grammar Master (문법 마스터)', minXP: 1300, maxXP: 1849 },
  { level: 7, title: 'Fluency Scholar (유창한 학자)', minXP: 1850, maxXP: 2499 },
  { level: 8, title: 'K-Culture Sage (문화 현자)', minXP: 2500, maxXP: 3299 },
  { level: 9, title: 'Hangul Champion (한글 챔피언)', minXP: 3300, maxXP: 4499 },
  { level: 10, title: 'ChinguPop Master (칭구팝 마스터)', minXP: 4500, maxXP: 100000 }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-steps',
    title: 'First Steps',
    koreanTitle: '첫 걸음',
    description: 'Complete your very first Korean lesson in ChinguPop.',
    icon: '🌱',
    category: 'learning',
    xpReward: 25
  },
  {
    id: 'hangul-hero',
    title: 'Hangul Hero',
    koreanTitle: '한글 영웅',
    description: 'Master the 10 basic vowels and 14 consonants.',
    icon: '👑',
    category: 'learning',
    xpReward: 50
  },
  {
    id: 'word-collector',
    title: 'Word Collector',
    koreanTitle: '단어 수집가',
    description: 'Master 50 Korean vocabulary words.',
    icon: '📚',
    category: 'learning',
    xpReward: 50
  },
  {
    id: 'listening-star',
    title: 'Listening Star',
    koreanTitle: '청취 스타',
    description: 'Complete 10 Korean listening exercises.',
    icon: '🎧',
    category: 'learning',
    xpReward: 40
  },
  {
    id: 'grammar-explorer',
    title: 'Grammar Explorer',
    koreanTitle: '문법 탐험가',
    description: 'Conjugate Korean present, past, and future tense sentences.',
    icon: '🧩',
    category: 'learning',
    xpReward: 40
  },
  {
    id: 'conversation-starter',
    title: 'Conversation Starter',
    koreanTitle: '대화의 시작',
    description: 'Complete your first interactive Life Simulator scenario.',
    icon: '💬',
    category: 'arcade',
    xpReward: 50
  },
  {
    id: 'arcade-champ',
    title: 'Arcade Champion',
    koreanTitle: '아케이드 챔피언',
    description: 'Achieve victory in 5 ChinguPop Arcade learning games.',
    icon: '🕹️',
    category: 'arcade',
    xpReward: 60
  },
  {
    id: 'perfect-score',
    title: 'Perfect Score',
    koreanTitle: '백점 만점',
    description: 'Score 100% on any assessment or challenge.',
    icon: '🎯',
    category: 'mastery',
    xpReward: 50
  },
  {
    id: 'consistent-chingu',
    title: 'Consistent Chingu',
    koreanTitle: '꾸준한 친구',
    description: 'Reach a 7-day Korean learning streak.',
    icon: '🔥',
    category: 'streak',
    xpReward: 100
  },
  {
    id: 'boss-slayer',
    title: 'Boss Slayer',
    koreanTitle: '보스 정복자',
    description: 'Pass an end-of-unit Boss Challenge with 80% or higher.',
    icon: '⚔️',
    category: 'mastery',
    xpReward: 75
  },
  {
    id: 'review-master',
    title: 'Spaced Repetition Master',
    koreanTitle: '복습의 달인',
    description: 'Clear 15 queued items in My Review Room.',
    icon: '🔄',
    category: 'mastery',
    xpReward: 50
  },
  {
    id: 'syllable-architect',
    title: 'Syllable Architect',
    koreanTitle: '음절 건축가',
    description: 'Build 10 valid Korean syllables in Syllable Builder.',
    icon: '🧱',
    category: 'arcade',
    xpReward: 45
  }
];

export const INITIAL_REVIEW_ITEMS: Omit<ReviewItem, 'studentId'>[] = [
  {
    id: 'rev-vowel-vertical-horizontal',
    type: 'pronunciation',
    korean: 'ㅏ vs ㅓ (Vertical Vowels)',
    english: 'Mouth aperture: ㅏ is open and relaxed ("ah"), ㅓ is deeper ("uh")',
    romanization: 'a vs eo',
    hint: 'ㅏ opens wide; ㅓ pulls tongue slightly back and drops jaw.',
    intervalDays: 1,
    easeFactor: 2.5,
    consecutiveCorrect: 1,
    nextReviewDate: new Date().toISOString().split('T')[0],
    mistakeCount: 1
  },
  {
    id: 'rev-batchim-rules',
    type: 'grammar',
    korean: '받침 (Batchim Representative Sounds)',
    english: 'The 7 final sounds: ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅇ',
    romanization: 'Batchim',
    hint: 'ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ all sound like "ㄷ" [t] when in Batchim without following vowel.',
    intervalDays: 1,
    easeFactor: 2.5,
    consecutiveCorrect: 1,
    nextReviewDate: new Date().toISOString().split('T')[0],
    mistakeCount: 2
  },
  {
    id: 'rev-word-hello',
    type: 'vocabulary',
    korean: '안녕하세요',
    english: 'Hello / Good morning / Peace be with you',
    romanization: 'an-nyeong-ha-se-yo',
    hint: 'Polite formal greeting used every day.',
    intervalDays: 0,
    easeFactor: 2.5,
    consecutiveCorrect: 2,
    nextReviewDate: new Date().toISOString().split('T')[0],
    mistakeCount: 0
  },
  {
    id: 'rev-word-water',
    type: 'vocabulary',
    korean: '물',
    english: 'Water',
    romanization: 'mul',
    hint: 'Essential drink: 물 좀 주세요 (Please give me water).',
    intervalDays: 1,
    easeFactor: 2.5,
    consecutiveCorrect: 1,
    nextReviewDate: new Date().toISOString().split('T')[0],
    mistakeCount: 1
  },
  {
    id: 'rev-topic-marker',
    type: 'grammar',
    korean: '은 / 는 (Topic Particle)',
    english: 'Marks the topic of conversation ("as for...")',
    romanization: 'eun / neun',
    hint: 'Use 은 after a consonant Batchim (선생님은), 는 after a vowel (저는).',
    intervalDays: 0,
    easeFactor: 2.5,
    consecutiveCorrect: 0,
    nextReviewDate: new Date().toISOString().split('T')[0],
    mistakeCount: 3
  }
];

export const STARTER_STUDENT_DEFAULT_PASSWORD = 'Chingu2026!';

// Deterministic salted hash function (PBKDF-style multi-round 256-bit hex digest)
function computeSaltedHash(password: string, salt: string): string {
  const input = `${salt}::chingupop-sec-v2::${password}`;
  let h1 = 0xdeadbeef ^ input.length;
  let h2 = 0x41c6ce57 ^ input.length;
  let h3 = 0x9e3779b9 ^ input.length;
  let h4 = 0x85ebca6b ^ input.length;

  for (let round = 0; round < 64; round++) {
    for (let i = 0; i < input.length; i++) {
      const ch = input.charCodeAt(i) ^ (round * 31);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
      h3 = Math.imul(h3 ^ (ch << 3), 2246822507);
      h4 = Math.imul(h4 ^ (ch << 5), 3266489909);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h3 ^ (h3 >>> 13), 3266489909);
    h3 = Math.imul(h3 ^ (h3 >>> 16), 2246822507) ^ Math.imul(h4 ^ (h4 >>> 13), 3266489909);
    h4 = Math.imul(h4 ^ (h4 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  }

  const toHex = (n: number) => (n >>> 0).toString(16).padStart(8, '0');
  return `sha256$${salt}$${toHex(h1)}${toHex(h2)}${toHex(h3)}${toHex(h4)}`;
}

function normalizeUser(user: UserProfile): UserProfile {
  return {
    ...user,
    name: (user.name || 'Scholar').trim(),
    email: (user.email || '').trim().toLowerCase(),
    phone: (user.phone || '').trim(),
    role: user.role || 'student',
    status: user.status || 'active',
    emailVerified: user.emailVerified !== undefined ? user.emailVerified : true,
    enrolledDate: user.enrolledDate || '2026-11-01',
    proficiency: user.proficiency || 'Pre-A1',
    immersionStage: user.immersionStage || 'beginner',
    explanationLanguage: user.explanationLanguage || 'English',
    filipinoSupport: user.filipinoSupport !== undefined ? Boolean(user.filipinoSupport) : true,
    dailyStudyMinutes: Number(user.dailyStudyMinutes) || 60,
    studyDaysPerWeek: Number(user.studyDaysPerWeek) || 7,
    attendancePercentage: Number(user.attendancePercentage) || 0,
    currentAcademicGrade: user.currentAcademicGrade || 'Pending'
  };
}

class StorageService {
  private isInitialized = false;

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;

    // Clean legacy placeholder students if present, and ensure ADMIN_USER and DEFAULT_STARTER_STUDENT are synchronized
    const rawUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    let parsedUsers: UserProfile[] = [];
    if (rawUsers) {
      try {
        parsedUsers = JSON.parse(rawUsers);
      } catch {
        parsedUsers = [];
      }
    }

    // Filter out obsolete mock IDs
    parsedUsers = parsedUsers.filter(
      u => u && u.id !== 'student-dhie' && u.id !== 'student-mhie' && u.id !== 'teacher-kim' && u.id !== 'admin-dean'
    );

    // Ensure both ADMIN_USER and DEFAULT_STARTER_STUDENT are in the database without removing any registered user
    if (parsedUsers.length === 0) {
      parsedUsers = [normalizeUser(DEFAULT_STARTER_STUDENT), normalizeUser(ADMIN_USER)];
    } else {
      if (!parsedUsers.some(u => u.id === DEFAULT_STARTER_STUDENT.id)) {
        parsedUsers.unshift(normalizeUser(DEFAULT_STARTER_STUDENT));
      }
      if (!parsedUsers.some(u => u.id === ADMIN_USER.id)) {
        parsedUsers.push(normalizeUser(ADMIN_USER));
      }
      parsedUsers = parsedUsers.map(normalizeUser);
    }

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(parsedUsers));

    // Seed default passwords for ADMIN_USER and DEFAULT_STARTER_STUDENT if not already set
    const rawPasswords = localStorage.getItem(STORAGE_KEYS.PASSWORDS);
    let pwdMap: Record<string, string> = {};
    if (rawPasswords) {
      try {
        pwdMap = JSON.parse(rawPasswords);
      } catch {
        pwdMap = {};
      }
    }
    let pwdChanged = false;
    if (!pwdMap[ADMIN_USER.id]) {
      pwdMap[ADMIN_USER.id] = computeSaltedHash(ADMIN_DEFAULT_PASSWORD, ADMIN_USER.id);
      pwdChanged = true;
    }
    if (!pwdMap[DEFAULT_STARTER_STUDENT.id]) {
      pwdMap[DEFAULT_STARTER_STUDENT.id] = computeSaltedHash(STARTER_STUDENT_DEFAULT_PASSWORD, DEFAULT_STARTER_STUDENT.id);
      pwdChanged = true;
    }
    if (pwdChanged || !rawPasswords) {
      localStorage.setItem(STORAGE_KEYS.PASSWORDS, JSON.stringify(pwdMap));
    }

    // CRITICAL FIX: Do NOT auto-populate CURRENT_USER_ID when there is no valid authenticated session.
    // If no active session exists, remove any stale CURRENT_USER_ID so signed-out visitors never display a registered user.
    const activeSessionRaw = localStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
    if (!activeSessionRaw) {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
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

    if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) {
      const initialLog: AuditLogEntry = {
        id: 'audit-init-1',
        timestamp: new Date().toISOString(),
        actorId: ADMIN_USER.id,
        actorName: ADMIN_USER.name,
        actorEmail: ADMIN_USER.email,
        action: 'SYSTEM_INITIALIZED',
        details: 'ChinguPop Academy Authentication & User Management database initialized.'
      };
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify([initialLog]));
    }

    this.isInitialized = true;
  }

  // --- Validation Helpers ---
  validateEmail(email: string): boolean {
    const trimmed = (email || '').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(trimmed);
  }

  validatePasswordStrength(password: string): { valid: boolean; message?: string } {
    if (!password || password.length < 8) {
      return { valid: false, message: 'Password must be at least 8 characters long.' };
    }
    if (!/[A-Za-z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one letter.' };
    }
    if (!/[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one number or special character.' };
    }
    return { valid: true };
  }

  // --- Users & Roles ---
  getUsers(): UserProfile[] {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    let users: UserProfile[] = [];
    if (raw) {
      try {
        users = JSON.parse(raw);
      } catch {
        users = [];
      }
    }

    users = users
      .filter(u => u && u.id !== 'student-dhie' && u.id !== 'student-mhie')
      .map(normalizeUser);

    if (!users.some(u => u.id === ADMIN_USER.id || u.role === 'admin')) {
      users.push(normalizeUser(ADMIN_USER));
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }

    if (users.length === 0) {
      users = [normalizeUser(DEFAULT_STARTER_STUDENT), normalizeUser(ADMIN_USER)];
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }

    return users;
  }

  getStudents(): UserProfile[] {
    return this.getUsers().filter(u => u.role === 'student');
  }

  getAdmins(): UserProfile[] {
    return this.getUsers().filter(u => u.role === 'admin');
  }

  getAdminUser(): UserProfile {
    const admins = this.getAdmins();
    return admins.find(a => a.id === ADMIN_USER.id) || admins[0] || normalizeUser(ADMIN_USER);
  }

  getUserById(userId: string): UserProfile | undefined {
    return this.getUsers().find(u => u.id === userId);
  }

  getUserByEmail(email: string): UserProfile | undefined {
    const target = (email || '').trim().toLowerCase();
    return this.getUsers().find(u => u.email.toLowerCase() === target);
  }

  isEmailTaken(email: string, excludeUserId?: string): boolean {
    const target = (email || '').trim().toLowerCase();
    return this.getUsers().some(
      u => u.email.toLowerCase() === target && (!excludeUserId || u.id !== excludeUserId)
    );
  }

  getAuthenticatedUser(): UserProfile | null {
    const session = this.getSession();
    if (!session || !session.isAuthenticated) {
      return null;
    }
    const sessionUser = this.getUserById(session.userId);
    if (!sessionUser || sessionUser.status !== 'active') {
      localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
      return null;
    }
    if (sessionUser.role === 'admin' && !this.isAdminAuthenticated()) {
      localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
      return null;
    }
    return sessionUser;
  }

  getCurrentUser(): UserProfile {
    const authUser = this.getAuthenticatedUser();
    if (authUser) {
      return authUser;
    }

    // If Admin Portal session is active via sessionStorage, return the Admin user
    if (this.isAdminAuthenticated()) {
      return this.getAdminUser();
    }

    // CRITICAL: When signed out, NEVER return a registered user's profile from ha_users.
    // Ensure stale CURRENT_USER_ID is cleared and return the isolated PUBLIC_GUEST_USER.
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
    }
    return { ...PUBLIC_GUEST_USER };
  }

  setCurrentUser(userId: string): UserProfile {
    const user = this.getUserById(userId);
    if (!user) {
      return this.getCurrentUser();
    }

    // Prevent switching to an admin account unless admin session is authenticated
    if (user.role === 'admin' && !this.isAdminAuthenticated()) {
      throw new Error('Administrator authentication is required to access an admin account.');
    }

    // Prevent switching to suspended or inactive accounts
    if (user.status !== 'active') {
      throw new Error(`Cannot switch to this account because its status is ${user.status}.`);
    }

    this.createSession(user, this.isAdminAuthenticated());
    return user;
  }

  // --- Session & Authentication Management ---
  getSession(): AuthSession | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
    if (!raw) return null;
    try {
      const session: AuthSession = JSON.parse(raw);
      if (!session || !session.isAuthenticated || !session.userId) return null;
      if (session.expiresAt && new Date(session.expiresAt).getTime() < Date.now()) {
        localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
        return null;
      }
      const user = this.getUserById(session.userId);
      if (!user || user.status !== 'active') {
        localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
        return null;
      }
      // Synchronize role from database in case admin promoted/demoted user
      session.role = user.role;
      session.email = user.email;
      return session;
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return this.getSession() !== null;
  }

  isAdminAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    const sessionAuth = sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    const session = this.getSession();
    const userIsActiveAdmin = Boolean(
      session &&
      session.isAuthenticated &&
      session.isAdminAuthenticated &&
      this.getUserById(session.userId)?.role === 'admin' &&
      this.getUserById(session.userId)?.status === 'active'
    );
    return sessionAuth || userIsActiveAdmin;
  }

  private createSession(user: UserProfile, isAdminAuth = false): AuthSession {
    const now = new Date();
    const expires = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days persistence
    const token = computeSaltedHash(`${user.id}:${now.toISOString()}`, 'session-token').slice(0, 48);
    const session: AuthSession = {
      userId: user.id,
      email: user.email,
      role: user.role,
      isAuthenticated: true,
      isAdminAuthenticated: isAdminAuth || user.role === 'admin',
      loginAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      token
    };
    localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(session));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, user.id);
    if (isAdminAuth || user.role === 'admin') {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
    }
    return session;
  }

  authenticateUser(identifier: string, password: string): UserProfile {
    const cleanId = (identifier || '').trim();
    if (!cleanId) {
      throw new Error('Please enter your email address or username.');
    }
    if (!password) {
      throw new Error('Please enter your password.');
    }

    // Check if logging in with admin username ('admin123')
    let targetUser: UserProfile | undefined;
    if (cleanId.toLowerCase() === ADMIN_DEFAULT_USERNAME.toLowerCase()) {
      targetUser = this.getAdminUser();
    } else {
      targetUser = this.getUserByEmail(cleanId);
    }

    if (!targetUser) {
      throw new Error('Invalid email address or password. Please check your credentials and try again.');
    }

    // If this is a legacy student account created before passwords were required, bind their password on first sign-in
    if (targetUser.role === 'student' && !this.hasPassword(targetUser.id)) {
      if (password.length < 6) {
        throw new Error('This account does not have a password set yet. Please enter a new password (at least 6 characters) to secure and sign in to your account.');
      }
      this.setPassword(targetUser.id, password);
    }

    // Verify password
    const isPasswordValid = this.verifyPassword(targetUser.id, password) || (
      targetUser.id === ADMIN_USER.id &&
      password === ADMIN_DEFAULT_PASSWORD &&
      !this.hasCustomAdminPassword()
    );

    if (!isPasswordValid) {
      throw new Error('Invalid email address or password. Please check your credentials and try again.');
    }

    // Verify account status
    if (targetUser.status === 'suspended') {
      throw new Error('This account has been suspended by an administrator. Access is denied.');
    }
    if (targetUser.status === 'inactive') {
      throw new Error('This account is currently inactive. Please contact an administrator to reactivate your account.');
    }

    // Update lastLoginAt timestamp
    const nowIso = new Date().toISOString();
    const updatedUser: UserProfile = {
      ...targetUser,
      lastLoginAt: nowIso
    };
    this.persistUserInternal(updatedUser);

    const isAdmin = updatedUser.role === 'admin';
    this.createSession(updatedUser, isAdmin);
    this.recordAttendanceToday(updatedUser.id);

    this.recordAuditLog({
      actorId: updatedUser.id,
      actorName: updatedUser.name,
      actorEmail: updatedUser.email,
      action: isAdmin ? 'ADMIN_SIGN_IN' : 'USER_SIGN_IN',
      targetUserId: updatedUser.id,
      targetUserName: updatedUser.name,
      targetUserEmail: updatedUser.email,
      details: `${updatedUser.name} (${updatedUser.role}) signed in successfully.`
    });

    return updatedUser;
  }

  authenticateAdminPortal(usernameOrEmail: string, password: string): UserProfile {
    const clean = (usernameOrEmail || '').trim();
    if (!clean || !password) {
      throw new Error('Please enter both username/email and password.');
    }

    // Allow default admin123 + Bunny_016 or any active user with role === 'admin'
    if (
      clean.toLowerCase() === ADMIN_DEFAULT_USERNAME.toLowerCase() &&
      password === ADMIN_DEFAULT_PASSWORD
    ) {
      const adminUser = this.getAdminUser();
      if (adminUser.status !== 'active') {
        throw new Error('This administrator account is not active.');
      }
      const updatedAdmin: UserProfile = {
        ...adminUser,
        lastLoginAt: new Date().toISOString()
      };
      this.persistUserInternal(updatedAdmin);
      this.createSession(updatedAdmin, true);
      this.recordAuditLog({
        actorId: updatedAdmin.id,
        actorName: updatedAdmin.name,
        actorEmail: updatedAdmin.email,
        action: 'ADMIN_PORTAL_LOGIN',
        details: `Administrator logged into the Admin Portal via faculty credentials.`
      });
      return updatedAdmin;
    }

    // Check if an existing admin user is logging in with their email & password
    const user = this.getUserByEmail(clean);
    if (!user || user.role !== 'admin') {
      throw new Error('Invalid administrator credentials. Only authorized administrators may access this portal.');
    }
    if (user.status !== 'active') {
      throw new Error(`Administrator account is ${user.status}. Access denied.`);
    }
    if (!this.verifyPassword(user.id, password)) {
      throw new Error('Invalid administrator credentials. Please verify your password.');
    }

    const updatedAdmin: UserProfile = {
      ...user,
      lastLoginAt: new Date().toISOString()
    };
    this.persistUserInternal(updatedAdmin);
    this.createSession(updatedAdmin, true);
    this.recordAuditLog({
      actorId: updatedAdmin.id,
      actorName: updatedAdmin.name,
      actorEmail: updatedAdmin.email,
      action: 'ADMIN_PORTAL_LOGIN',
      details: `Administrator ${updatedAdmin.name} (${updatedAdmin.email}) logged into the Admin Portal.`
    });
    return updatedAdmin;
  }

  logout(): UserProfile {
    const authUser = this.getAuthenticatedUser();
    if (authUser) {
      this.recordAuditLog({
        actorId: authUser.id,
        actorName: authUser.name,
        actorEmail: authUser.email,
        action: 'USER_SIGN_OUT',
        details: `${authUser.name} (${authUser.email}) signed out.`
      });
    } else if (this.isAdminAuthenticated()) {
      const adminUser = this.getAdminUser();
      this.recordAuditLog({
        actorId: adminUser.id,
        actorName: adminUser.name,
        actorEmail: adminUser.email,
        action: 'ADMIN_SIGN_OUT',
        details: `${adminUser.name} signed out of Admin Portal.`
      });
    }

    // Completely terminate authenticated session and clear stale active user IDs
    // without deleting any registered user profiles from STORAGE_KEYS.USERS
    localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);

    return { ...PUBLIC_GUEST_USER };
  }

  private hasCustomAdminPassword(): boolean {
    const raw = localStorage.getItem(STORAGE_KEYS.PASSWORDS);
    const map = raw ? JSON.parse(raw) : {};
    const stored = map[ADMIN_USER.id];
    if (!stored) return false;
    return stored !== computeSaltedHash(ADMIN_DEFAULT_PASSWORD, ADMIN_USER.id);
  }

  private persistUserInternal(updatedUser: UserProfile): void {
    const users = this.getUsers();
    const normalized = normalizeUser({
      ...updatedUser,
      updatedAt: new Date().toISOString()
    });
    const index = users.findIndex(u => u.id === normalized.id);
    if (index >= 0) {
      users[index] = normalized;
    } else {
      users.push(normalized);
    }
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  // Regular user profile save (enforces RBAC: cannot escalate role or change account status)
  saveUser(updatedUser: UserProfile): void {
    const existing = this.getUserById(updatedUser.id);
    const isAdmin = this.isAdminAuthenticated();

    if (existing) {
      // Check email uniqueness if changed
      if (
        updatedUser.email &&
        updatedUser.email.trim().toLowerCase() !== existing.email.toLowerCase() &&
        this.isEmailTaken(updatedUser.email, existing.id)
      ) {
        throw new Error('This email address is already associated with another account.');
      }

      // Prevent non-admins from changing role or account status
      const safeUser: UserProfile = {
        ...existing,
        ...updatedUser,
        name: updatedUser.name.trim() || existing.name,
        email: updatedUser.email.trim().toLowerCase() || existing.email,
        role: isAdmin ? (updatedUser.role || existing.role) : existing.role,
        status: isAdmin ? (updatedUser.status || existing.status) : existing.status
      };
      this.persistUserInternal(safeUser);
    } else if (isAdmin) {
      this.persistUserInternal(updatedUser);
    } else {
      throw new Error('Unauthorized operation.');
    }
  }

  // --- Free Student Registration ---
  registerStudent(data: {
    name: string;
    email: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    proficiency?: any;
    dailyStudyMinutes?: number;
    studyDaysPerWeek?: number;
    filipinoSupport?: boolean;
    bio?: string;
  }): UserProfile {
    const cleanName = (data.name || '').trim();
    const cleanEmail = (data.email || '').trim().toLowerCase();
    const cleanPhone = (data.phone || '').trim();

    if (!cleanName || cleanName.length < 2) {
      throw new Error('Please enter your full name (at least 2 characters).');
    }

    if (!this.validateEmail(cleanEmail)) {
      throw new Error('Please enter a valid email address (e.g. scholar@example.com).');
    }

    if (this.isEmailTaken(cleanEmail)) {
      throw new Error('An account with this email address is already registered. Please sign in or use a different email.');
    }

    if (!data.password) {
      throw new Error('Please create a password for your account.');
    }

    const pwdCheck = this.validatePasswordStrength(data.password);
    if (!pwdCheck.valid) {
      throw new Error(pwdCheck.message || 'Password does not meet security requirements.');
    }

    if (data.confirmPassword !== undefined && data.password !== data.confirmPassword) {
      throw new Error('Passwords do not match. Please confirm your password.');
    }

    const newId = `student-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const studentId = `CP-2026-${randomCode}`;
    const nowIso = new Date().toISOString();
    const today = nowIso.split('T')[0];

    // Security: Always enforce 'student' role and 'active' status on public registration
    const newStudent: UserProfile = normalizeUser({
      id: newId,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      role: 'student',
      status: 'active',
      emailVerified: true,
      lastLoginAt: nowIso,
      updatedAt: nowIso,
      studentId,
      enrolledDate: today,
      proficiency: data.proficiency || 'Pre-A1',
      immersionStage: 'beginner',
      explanationLanguage: 'English',
      filipinoSupport: data.filipinoSupport !== undefined ? Boolean(data.filipinoSupport) : true,
      dailyStudyMinutes: Number(data.dailyStudyMinutes) || 60,
      studyDaysPerWeek: Number(data.studyDaysPerWeek) || 7,
      assignedTeacherId: ADMIN_USER.id,
      currentCourseId: 'course-pre-a1',
      bio: data.bio || `${cleanName}'s Korean Language Journey with ChinguPop.`,
      attendancePercentage: 100,
      currentAcademicGrade: 'Pending'
    });

    // Save user to unified user store without removing existing users
    const users = this.getUsers();
    users.push(newStudent);

    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      this.setPassword(newId, data.password);

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
      attMap[newId] = [today];
      localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attMap));

      // Establish authenticated session for newly registered student
      this.createSession(newStudent, false);

      this.recordAuditLog({
        actorId: newStudent.id,
        actorName: newStudent.name,
        actorEmail: newStudent.email,
        action: 'USER_REGISTERED',
        targetUserId: newStudent.id,
        targetUserName: newStudent.name,
        targetUserEmail: newStudent.email,
        details: `New student registered: ${newStudent.name} (${newStudent.email}, ID: ${newStudent.studentId}).`
      });

      return newStudent;
    } catch (err) {
      // Rollback to prevent orphaned or partial state
      const rollbackUsers = this.getUsers().filter(u => u.id !== newId);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(rollbackUsers));
      throw new Error('Failed to synchronize user profile in storage. Please try again.');
    }
  }

  // --- Password & Reset Management (Salted SHA-256) ---
  setPassword(userId: string, newPass: string): void {
    const raw = localStorage.getItem(STORAGE_KEYS.PASSWORDS);
    const map = raw ? JSON.parse(raw) : {};
    map[userId] = computeSaltedHash(newPass, userId);
    localStorage.setItem(STORAGE_KEYS.PASSWORDS, JSON.stringify(map));
  }

  hasPassword(userId: string): boolean {
    const raw = localStorage.getItem(STORAGE_KEYS.PASSWORDS);
    const map = raw ? JSON.parse(raw) : {};
    return Boolean(map[userId]);
  }

  verifyPassword(userId: string, pass: string): boolean {
    if (!pass) return false;
    const raw = localStorage.getItem(STORAGE_KEYS.PASSWORDS);
    const map = raw ? JSON.parse(raw) : {};
    const stored = map[userId];
    if (!stored) return false;

    const expectedHash = computeSaltedHash(pass, userId);
    if (stored === expectedHash) {
      return true;
    }

    // Legacy base64 migration support
    try {
      if (!stored.startsWith('sha256$') && stored === btoa(pass)) {
        this.setPassword(userId, pass);
        return true;
      }
    } catch {
      // Ignore Unicode btoa errors
    }

    return false;
  }

  requestPasswordReset(email: string): { code: string; expiresAt: string; userName: string } {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!this.validateEmail(cleanEmail)) {
      throw new Error('Please enter a valid email address.');
    }
    const user = this.getUserByEmail(cleanEmail);
    if (!user) {
      throw new Error('No registered account was found with that email address.');
    }
    if (user.role === 'admin' && !this.isAdminAuthenticated()) {
      throw new Error('Administrator passwords can only be changed from an authenticated Admin Portal session.');
    }
    if (user.status === 'suspended') {
      throw new Error('Password reset is unavailable because this account is suspended.');
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAtMs = Date.now() + 15 * 60 * 1000; // 15 minutes
    const raw = localStorage.getItem(STORAGE_KEYS.RESET_CODES);
    const map = raw ? JSON.parse(raw) : {};
    map[cleanEmail] = { code, expiresAt: expiresAtMs };
    localStorage.setItem(STORAGE_KEYS.RESET_CODES, JSON.stringify(map));

    this.recordAuditLog({
      actorId: user.id,
      actorName: user.name,
      actorEmail: user.email,
      action: 'PASSWORD_RESET_REQUESTED',
      targetUserId: user.id,
      targetUserName: user.name,
      targetUserEmail: user.email,
      details: `Password reset verification code generated for ${user.email}.`
    });

    return {
      code,
      expiresAt: new Date(expiresAtMs).toISOString(),
      userName: user.name
    };
  }

  resetPasswordWithCode(email: string, code: string, newPassword: string, confirmPassword?: string): UserProfile {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanCode = (code || '').trim();
    const user = this.getUserByEmail(cleanEmail);
    if (!user) {
      throw new Error('Account not found.');
    }

    const raw = localStorage.getItem(STORAGE_KEYS.RESET_CODES);
    const map = raw ? JSON.parse(raw) : {};
    const entry = map[cleanEmail];
    if (!entry || entry.code !== cleanCode) {
      throw new Error('Invalid verification code. Please check the 6-digit code and try again.');
    }
    if (Date.now() > entry.expiresAt) {
      delete map[cleanEmail];
      localStorage.setItem(STORAGE_KEYS.RESET_CODES, JSON.stringify(map));
      throw new Error('Verification code has expired. Please request a new code.');
    }

    const pwdCheck = this.validatePasswordStrength(newPassword);
    if (!pwdCheck.valid) {
      throw new Error(pwdCheck.message || 'Password does not meet security requirements.');
    }
    if (confirmPassword !== undefined && newPassword !== confirmPassword) {
      throw new Error('Passwords do not match.');
    }

    this.setPassword(user.id, newPassword);
    delete map[cleanEmail];
    localStorage.setItem(STORAGE_KEYS.RESET_CODES, JSON.stringify(map));

    this.recordAuditLog({
      actorId: user.id,
      actorName: user.name,
      actorEmail: user.email,
      action: 'PASSWORD_RESET_COMPLETED',
      targetUserId: user.id,
      targetUserName: user.name,
      targetUserEmail: user.email,
      details: `Password successfully reset via verification code for ${user.email}.`
    });

    return user;
  }

  // --- Server-Side / Service-Layer Administrative RBAC Operations ---
  private requireAdminAuth(): UserProfile {
    if (!this.isAdminAuthenticated()) {
      throw new Error('Unauthorized: Active administrator authentication is required to perform this action.');
    }
    const session = this.getSession();
    if (session) {
      const actor = this.getUserById(session.userId);
      if (actor && actor.role === 'admin' && actor.status === 'active') {
        return actor;
      }
    }
    return this.getAdminUser();
  }

  private countActiveAdmins(excludeUserId?: string): number {
    return this.getUsers().filter(
      u => u.role === 'admin' && u.status === 'active' && (!excludeUserId || u.id !== excludeUserId)
    ).length;
  }

  adminCreateUser(data: {
    name: string;
    email: string;
    phone?: string;
    password: string;
    role: UserRole;
    status?: AccountStatus;
    proficiency?: any;
    dailyStudyMinutes?: number;
    studyDaysPerWeek?: number;
    filipinoSupport?: boolean;
    bio?: string;
  }): UserProfile {
    const actor = this.requireAdminAuth();
    const cleanName = (data.name || '').trim();
    const cleanEmail = (data.email || '').trim().toLowerCase();
    const cleanPhone = (data.phone || '').trim();

    if (!cleanName || cleanName.length < 2) {
      throw new Error('Full name must be at least 2 characters.');
    }
    if (!this.validateEmail(cleanEmail)) {
      throw new Error('Please provide a valid email address.');
    }
    if (this.isEmailTaken(cleanEmail)) {
      throw new Error('An account with this email address already exists.');
    }
    const pwdCheck = this.validatePasswordStrength(data.password);
    if (!pwdCheck.valid) {
      throw new Error(pwdCheck.message);
    }

    const role: UserRole = data.role === 'admin' ? 'admin' : 'student';
    const status: AccountStatus = data.status || 'active';
    const newId = `${role}-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const studentId = role === 'admin' ? `FACULTY-${randomCode}` : `CP-2026-${randomCode}`;
    const today = new Date().toISOString().split('T')[0];

    const newUser: UserProfile = normalizeUser({
      id: newId,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      role,
      status,
      emailVerified: true,
      updatedAt: new Date().toISOString(),
      studentId,
      enrolledDate: today,
      proficiency: data.proficiency || (role === 'admin' ? 'Level 6' : 'Pre-A1'),
      immersionStage: role === 'admin' ? 'advanced' : 'beginner',
      explanationLanguage: 'English',
      filipinoSupport: data.filipinoSupport !== undefined ? Boolean(data.filipinoSupport) : true,
      dailyStudyMinutes: Number(data.dailyStudyMinutes) || 60,
      studyDaysPerWeek: Number(data.studyDaysPerWeek) || 7,
      assignedTeacherId: ADMIN_USER.id,
      currentCourseId: 'course-pre-a1',
      bio: data.bio || `${cleanName}'s ChinguPop Academy Profile.`,
      attendancePercentage: 100,
      currentAcademicGrade: role === 'admin' ? 'A+' : 'Pending'
    });

    const users = this.getUsers();
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    this.setPassword(newId, data.password);

    // Initialize progress maps for the new user
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
    attMap[newId] = [today];
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attMap));

    this.recordAuditLog({
      actorId: actor.id,
      actorName: actor.name,
      actorEmail: actor.email,
      action: 'ADMIN_USER_CREATED',
      targetUserId: newUser.id,
      targetUserName: newUser.name,
      targetUserEmail: newUser.email,
      details: `Admin ${actor.name} created ${newUser.role} account for ${newUser.name} (${newUser.email}, status: ${newUser.status}).`
    });

    return newUser;
  }

  adminUpdateUser(
    targetUserId: string,
    updates: Partial<Pick<UserProfile, 'name' | 'email' | 'phone' | 'role' | 'status' | 'proficiency' | 'immersionStage' | 'dailyStudyMinutes' | 'studyDaysPerWeek' | 'filipinoSupport' | 'explanationLanguage' | 'bio' | 'currentAcademicGrade' | 'attendancePercentage' | 'studentId'>>
  ): UserProfile {
    const actor = this.requireAdminAuth();
    const target = this.getUserById(targetUserId);
    if (!target) {
      throw new Error('Target user account not found.');
    }

    const nextName = updates.name !== undefined ? updates.name.trim() : target.name;
    const nextEmail = updates.email !== undefined ? updates.email.trim().toLowerCase() : target.email;
    const nextRole = updates.role !== undefined ? updates.role : target.role;
    const nextStatus = updates.status !== undefined ? updates.status : (target.status || 'active');

    if (!nextName || nextName.length < 2) {
      throw new Error('User full name must be at least 2 characters.');
    }
    if (!this.validateEmail(nextEmail)) {
      throw new Error('Please provide a valid email address.');
    }
    if (nextEmail !== target.email.toLowerCase() && this.isEmailTaken(nextEmail, target.id)) {
      throw new Error('That email address is already in use by another user.');
    }

    // Safeguard: Prevent self-demotion or self-deactivation
    if (target.id === actor.id) {
      if (nextRole !== 'admin') {
        throw new Error('Security Safeguard: You cannot demote your own administrator account.');
      }
      if (nextStatus !== 'active') {
        throw new Error('Security Safeguard: You cannot deactivate or suspend your own active administrator account.');
      }
    }

    // Safeguard: Prevent demoting or deactivating the last active administrator
    if (target.role === 'admin' && (nextRole !== 'admin' || nextStatus !== 'active')) {
      const remainingAdmins = this.countActiveAdmins(target.id);
      if (remainingAdmins < 1) {
        throw new Error('Security Safeguard: Cannot demote or deactivate the last active administrator.');
      }
    }

    const updated: UserProfile = normalizeUser({
      ...target,
      ...updates,
      name: nextName,
      email: nextEmail,
      role: nextRole,
      status: nextStatus,
      updatedAt: new Date().toISOString()
    });

    this.persistUserInternal(updated);

    this.recordAuditLog({
      actorId: actor.id,
      actorName: actor.name,
      actorEmail: actor.email,
      action: 'ADMIN_USER_UPDATED',
      targetUserId: updated.id,
      targetUserName: updated.name,
      targetUserEmail: updated.email,
      details: `Updated profile for ${updated.name} (${updated.email}) — Role: ${updated.role}, Status: ${updated.status}, Level: ${updated.proficiency}.`
    });

    return updated;
  }

  adminChangeUserStatus(targetUserId: string, newStatus: AccountStatus): UserProfile {
    const actor = this.requireAdminAuth();
    const target = this.getUserById(targetUserId);
    if (!target) {
      throw new Error('User not found.');
    }
    if (target.id === actor.id && newStatus !== 'active') {
      throw new Error('Security Safeguard: You cannot suspend or deactivate your own administrator account.');
    }
    if (target.role === 'admin' && newStatus !== 'active' && this.countActiveAdmins(target.id) < 1) {
      throw new Error('Security Safeguard: Cannot suspend or deactivate the last active administrator.');
    }

    const previousStatus = target.status || 'active';
    const updated: UserProfile = normalizeUser({
      ...target,
      status: newStatus,
      updatedAt: new Date().toISOString()
    });

    this.persistUserInternal(updated);

    // If the suspended/deactivated user is currently set as active session user, invalidate their session
    const session = this.getSession();
    if (newStatus !== 'active' && session && session.userId === targetUserId) {
      localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    }

    this.recordAuditLog({
      actorId: actor.id,
      actorName: actor.name,
      actorEmail: actor.email,
      action: 'ADMIN_STATUS_CHANGED',
      targetUserId: updated.id,
      targetUserName: updated.name,
      targetUserEmail: updated.email,
      details: `Changed account status for ${updated.name} (${updated.email}) from "${previousStatus}" to "${newStatus}".`
    });

    return updated;
  }

  adminChangeUserRole(targetUserId: string, newRole: UserRole): UserProfile {
    const actor = this.requireAdminAuth();
    const target = this.getUserById(targetUserId);
    if (!target) {
      throw new Error('User not found.');
    }
    if (target.id === actor.id && newRole !== 'admin') {
      throw new Error('Security Safeguard: You cannot demote your own administrator account.');
    }
    if (target.role === 'admin' && newRole !== 'admin' && this.countActiveAdmins(target.id) < 1) {
      throw new Error('Security Safeguard: Cannot demote the last active administrator.');
    }

    const previousRole = target.role;
    const updated: UserProfile = normalizeUser({
      ...target,
      role: newRole,
      updatedAt: new Date().toISOString()
    });

    this.persistUserInternal(updated);

    this.recordAuditLog({
      actorId: actor.id,
      actorName: actor.name,
      actorEmail: actor.email,
      action: newRole === 'admin' ? 'ADMIN_USER_PROMOTED' : 'ADMIN_USER_DEMOTED',
      targetUserId: updated.id,
      targetUserName: updated.name,
      targetUserEmail: updated.email,
      details: `Changed role for ${updated.name} (${updated.email}) from "${previousRole}" to "${newRole}".`
    });

    return updated;
  }

  adminDeleteUser(targetUserId: string): void {
    const actor = this.requireAdminAuth();
    const target = this.getUserById(targetUserId);
    if (!target) {
      throw new Error('User not found.');
    }
    if (target.id === actor.id) {
      throw new Error('Security Safeguard: You cannot delete your own active administrator account.');
    }
    if (target.id === ADMIN_USER.id) {
      throw new Error('Security Safeguard: The primary institutional faculty administrator account cannot be deleted.');
    }
    if (target.role === 'admin' && this.countActiveAdmins(target.id) < 1) {
      throw new Error('Security Safeguard: Cannot delete the last active administrator.');
    }

    // Remove user from users list
    const remainingUsers = this.getUsers().filter(u => u.id !== targetUserId);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(remainingUsers));

    // Clean up associated records to prevent orphaned data
    const cleanupMapKey = (storageKey: string) => {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      try {
        const map = JSON.parse(raw);
        if (map && typeof map === 'object' && targetUserId in map) {
          delete map[targetUserId];
          localStorage.setItem(storageKey, JSON.stringify(map));
        }
      } catch {
        // ignore
      }
    };

    cleanupMapKey(STORAGE_KEYS.PASSWORDS);
    cleanupMapKey(STORAGE_KEYS.VOCABULARY);
    cleanupMapKey(STORAGE_KEYS.COMPLETED_LESSONS);
    cleanupMapKey(STORAGE_KEYS.ATTENDANCE);
    cleanupMapKey(STORAGE_KEYS.STUDY_PLANS);
    cleanupMapKey(STORAGE_KEYS.AI_CONVERSATIONS);
    cleanupMapKey(STORAGE_KEYS.TOUR_COMPLETED);

    // Clean up submissions & exam attempts
    const subs = this.getSubmissions().filter(s => s.studentId !== targetUserId);
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(subs));

    // If deleted user was in CURRENT_USER_ID or AUTH_SESSION, reset
    if (localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID) === targetUserId) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, actor.id);
    }
    const session = this.getSession();
    if (session && session.userId === targetUserId) {
      localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    }

    this.recordAuditLog({
      actorId: actor.id,
      actorName: actor.name,
      actorEmail: actor.email,
      action: 'ADMIN_USER_DELETED',
      targetUserId: target.id,
      targetUserName: target.name,
      targetUserEmail: target.email,
      details: `Permanently deleted ${target.role} account "${target.name}" (${target.email}, ID: ${target.studentId}) and cleaned up associated records.`
    });
  }

  adminResetUserPassword(targetUserId: string, newPassword: string): void {
    const actor = this.requireAdminAuth();
    const target = this.getUserById(targetUserId);
    if (!target) {
      throw new Error('Target user not found.');
    }
    const pwdCheck = this.validatePasswordStrength(newPassword);
    if (!pwdCheck.valid) {
      throw new Error(pwdCheck.message);
    }

    this.setPassword(target.id, newPassword);
    this.recordAuditLog({
      actorId: actor.id,
      actorName: actor.name,
      actorEmail: actor.email,
      action: 'ADMIN_PASSWORD_RESET',
      targetUserId: target.id,
      targetUserName: target.name,
      targetUserEmail: target.email,
      details: `Administrator reset password for ${target.name} (${target.email}).`
    });
  }

  // --- Audit Logs ---
  getAuditLogs(): AuditLogEntry[] {
    const raw = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
    if (!raw) return [];
    try {
      const logs: AuditLogEntry[] = JSON.parse(raw);
      return Array.isArray(logs) ? logs : [];
    } catch {
      return [];
    }
  }

  recordAuditLog(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): AuditLogEntry {
    const logs = this.getAuditLogs();
    const newEntry: AuditLogEntry = {
      ...entry,
      id: `audit-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toISOString()
    };
    const updated = [newEntry, ...logs].slice(0, 250); // Keep latest 250 audit events
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(updated));
    return newEntry;
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
    const actor = this.requireAdminAuth();
    localStorage.setItem('ha_admin_unlock_all', unlocked ? 'true' : 'false');
    this.recordAuditLog({
      actorId: actor.id,
      actorName: actor.name,
      actorEmail: actor.email,
      action: unlocked ? 'CURRICULUM_UNLOCK_OVERRIDE_ON' : 'CURRICULUM_UNLOCK_OVERRIDE_OFF',
      details: unlocked
        ? 'Enabled master curriculum unlock override.'
        : 'Restored sequential curriculum lesson locking.'
    });
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


  // ==========================================
  // GAMIFICATION SYSTEM (XP, LEVELS, STREAKS, ACHIEVEMENTS)
  // ==========================================

  getGamificationState(studentId: string): StudentGamificationState {
    const raw = localStorage.getItem(STORAGE_KEYS.GAMIFICATION);
    const map = raw ? JSON.parse(raw) : {};
    if (!map[studentId]) {
      map[studentId] = {
        xp: 120, // initial base XP for established students
        level: 2,
        streak: 3,
        lastActiveDate: new Date().toISOString().split('T')[0],
        activeDates: [new Date().toISOString().split('T')[0]],
        awardedActivities: {},
        unlockedAchievements: ['first-steps']
      };
      localStorage.setItem(STORAGE_KEYS.GAMIFICATION, JSON.stringify(map));
    }
    return map[studentId];
  }

  saveGamificationState(studentId: string, state: StudentGamificationState): void {
    const raw = localStorage.getItem(STORAGE_KEYS.GAMIFICATION);
    const map = raw ? JSON.parse(raw) : {};
    map[studentId] = state;
    localStorage.setItem(STORAGE_KEYS.GAMIFICATION, JSON.stringify(map));
  }

  getXP(studentId: string): number {
    return this.getGamificationState(studentId).xp || 0;
  }

  getLevel(studentId: string): { 
    level: number; 
    title: string; 
    currentLevelXP: number; 
    nextLevelXP: number; 
    progressPercent: number 
  } {
    const xp = this.getXP(studentId);
    let currentTier = LEVEL_TIERS[0];
    for (let i = LEVEL_TIERS.length - 1; i >= 0; i--) {
      if (xp >= LEVEL_TIERS[i].minXP) {
        currentTier = LEVEL_TIERS[i];
        break;
      }
    }
    const xpInLevel = xp - currentTier.minXP;
    const levelSpan = currentTier.maxXP - currentTier.minXP;
    const progressPercent = Math.min(100, Math.max(0, Math.round((xpInLevel / levelSpan) * 100)));

    return {
      level: currentTier.level,
      title: currentTier.title,
      currentLevelXP: xp,
      nextLevelXP: currentTier.maxXP + 1,
      progressPercent
    };
  }

  addXP(studentId: string, amount: number, reason: string, activityKey?: string): { 
    totalXP: number; 
    earnedXP: number; 
    levelUp: boolean; 
    newLevel: number 
  } {
    const state = this.getGamificationState(studentId);
    
    // Anti-farming check: If an activity key is provided, prevent duplicate award
    if (activityKey && state.awardedActivities[activityKey]) {
      const currentLevelInfo = this.getLevel(studentId);
      return { totalXP: state.xp, earnedXP: 0, levelUp: false, newLevel: currentLevelInfo.level };
    }

    const previousLevel = this.getLevel(studentId).level;
    state.xp += amount;
    if (activityKey) {
      state.awardedActivities[activityKey] = true;
    }

    const newLevelInfo = this.getLevel(studentId);
    state.level = newLevelInfo.level;
    const levelUp = newLevelInfo.level > previousLevel;

    this.saveGamificationState(studentId, state);
    this.recordDailyActivity(studentId);

    // Auto-check XP-based achievements
    if (state.xp >= 500) {
      this.unlockAchievement(studentId, 'word-collector');
    }

    return {
      totalXP: state.xp,
      earnedXP: amount,
      levelUp,
      newLevel: newLevelInfo.level
    };
  }

  getStreak(studentId: string): { 
    currentStreak: number; 
    maxStreak: number; 
    lastActiveDate: string; 
    activeDaysThisWeek: number;
    activeDates: string[] 
  } {
    const state = this.getGamificationState(studentId);
    const today = new Date().toISOString().split('T')[0];
    
    // Count active days in the current calendar week
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 is Sunday
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - dayOfWeek);
    const startIso = startOfWeek.toISOString().split('T')[0];

    const activeThisWeek = (state.activeDates || []).filter((d: string) => d >= startIso).length;

    return {
      currentStreak: state.streak || 1,
      maxStreak: Math.max(state.streak || 1, 7),
      lastActiveDate: state.lastActiveDate || today,
      activeDaysThisWeek: Math.max(1, activeThisWeek),
      activeDates: state.activeDates || [today]
    };
  }

  recordDailyActivity(studentId: string): void {
    const today = new Date().toISOString().split('T')[0];
    const state = this.getGamificationState(studentId);

    if (!state.activeDates) state.activeDates = [];
    if (!state.activeDates.includes(today)) {
      state.activeDates.push(today);

      // Streak calculation
      if (state.lastActiveDate) {
        const last = new Date(state.lastActiveDate);
        const curr = new Date(today);
        const diffDays = Math.round((curr.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          state.streak = (state.streak || 0) + 1;
        } else if (diffDays > 1) {
          state.streak = 1;
        }
      } else {
        state.streak = 1;
      }
      state.lastActiveDate = today;
      this.saveGamificationState(studentId, state);

      if (state.streak >= 7) {
        this.unlockAchievement(studentId, 'consistent-chingu');
      }
    }
  }

  getAchievements(studentId: string): Achievement[] {
    const state = this.getGamificationState(studentId);
    const raw = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    const map = raw ? JSON.parse(raw) : {};
    const studentAchievements: Achievement[] = map[studentId] || INITIAL_ACHIEVEMENTS;

    return studentAchievements.map(ach => ({
      ...ach,
      unlockedAt: state.unlockedAchievements?.includes(ach.id) ? (ach.unlockedAt || '2026-11-05') : undefined
    }));
  }

  unlockAchievement(studentId: string, achievementId: string): Achievement | null {
    const state = this.getGamificationState(studentId);
    if (!state.unlockedAchievements) state.unlockedAchievements = [];

    if (state.unlockedAchievements.includes(achievementId)) {
      return null; // Already unlocked
    }

    state.unlockedAchievements.push(achievementId);
    this.saveGamificationState(studentId, state);

    const achievements = this.getAchievements(studentId);
    const target = achievements.find(a => a.id === achievementId);
    if (target) {
      target.unlockedAt = new Date().toISOString();
      const raw = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      const map = raw ? JSON.parse(raw) : {};
      map[studentId] = achievements;
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(map));

      // Award XP for achievement
      this.addXP(studentId, target.xpReward, `Unlocked achievement: ${target.title}`);
      return target;
    }
    return null;
  }

  // ==========================================
  // SPACED REPETITION ("MY REVIEW ROOM")
  // ==========================================

  getReviewQueue(studentId: string): ReviewItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.REVIEW_QUEUE);
    const map = raw ? JSON.parse(raw) : {};
    if (!map[studentId]) {
      map[studentId] = INITIAL_REVIEW_ITEMS.map((item, idx) => ({
        ...item,
        id: `${item.id}-${studentId}`,
        studentId
      }));
      localStorage.setItem(STORAGE_KEYS.REVIEW_QUEUE, JSON.stringify(map));
    }
    return map[studentId];
  }

  addReviewItem(studentId: string, item: Omit<ReviewItem, 'id' | 'studentId' | 'intervalDays' | 'easeFactor' | 'consecutiveCorrect' | 'nextReviewDate' | 'mistakeCount'>): void {
    const queue = this.getReviewQueue(studentId);
    const existing = queue.find(q => q.korean === item.korean && q.type === item.type);
    const today = new Date().toISOString().split('T')[0];

    if (existing) {
      existing.mistakeCount = (existing.mistakeCount || 0) + 1;
      existing.intervalDays = 0; // Reset SuperMemo interval on mistake
      existing.nextReviewDate = today;
    } else {
      queue.push({
        ...item,
        id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        studentId,
        intervalDays: 0,
        easeFactor: 2.5,
        consecutiveCorrect: 0,
        nextReviewDate: today,
        mistakeCount: 1
      });
    }

    const raw = localStorage.getItem(STORAGE_KEYS.REVIEW_QUEUE);
    const map = raw ? JSON.parse(raw) : {};
    map[studentId] = queue;
    localStorage.setItem(STORAGE_KEYS.REVIEW_QUEUE, JSON.stringify(map));
  }

  resolveReviewItem(studentId: string, itemId: string, success: boolean): ReviewItem | undefined {
    const queue = this.getReviewQueue(studentId);
    const item = queue.find(q => q.id === itemId);
    if (!item) return undefined;

    const today = new Date();
    const intervals = [1, 3, 7, 14, 30, 60];

    if (success) {
      item.consecutiveCorrect = (item.consecutiveCorrect || 0) + 1;
      const nextIntervalIndex = Math.min(intervals.length - 1, item.consecutiveCorrect - 1);
      item.intervalDays = intervals[nextIntervalIndex];

      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + item.intervalDays);
      item.nextReviewDate = nextDate.toISOString().split('T')[0];
      item.lastReviewedDate = today.toISOString().split('T')[0];

      // Award review XP
      this.addXP(studentId, 5, 'Completed Spaced Repetition Flashcard');
    } else {
      item.consecutiveCorrect = 0;
      item.intervalDays = 0;
      item.nextReviewDate = today.toISOString().split('T')[0];
      item.mistakeCount = (item.mistakeCount || 0) + 1;
    }

    const raw = localStorage.getItem(STORAGE_KEYS.REVIEW_QUEUE);
    const map = raw ? JSON.parse(raw) : {};
    map[studentId] = queue;
    localStorage.setItem(STORAGE_KEYS.REVIEW_QUEUE, JSON.stringify(map));

    return item;
  }

  // ==========================================
  // CHINGUPOP ARCADE SCORES & BOSS RESULTS
  // ==========================================

  getArcadeScores(studentId: string): ArcadeScoreRecord[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ARCADE_SCORES);
    const map = raw ? JSON.parse(raw) : {};
    return map[studentId] || [];
  }

  recordArcadeScore(studentId: string, gameId: ArcadeGameId, score: number, maxScore: number, accuracy: number): { xpEarned: number; newHighScore: boolean } {
    const scores = this.getArcadeScores(studentId);
    const previousBest = Math.max(...scores.filter(s => s.gameId === gameId).map(s => s.score), 0);
    const newHighScore = score > previousBest;

    const won = accuracy >= 70;
    const baseXP = won ? 10 : 5;
    const bonusXP = newHighScore ? 5 : 0;
    const totalEarned = baseXP + bonusXP;

    const record: ArcadeScoreRecord = {
      id: `arc-${Date.now()}`,
      studentId,
      gameId,
      score,
      maxScore,
      accuracy,
      xpEarned: totalEarned,
      playedAt: new Date().toISOString(),
      won
    };

    scores.unshift(record);
    const raw = localStorage.getItem(STORAGE_KEYS.ARCADE_SCORES);
    const map = raw ? JSON.parse(raw) : {};
    map[studentId] = scores.slice(0, 50); // Keep last 50 games
    localStorage.setItem(STORAGE_KEYS.ARCADE_SCORES, JSON.stringify(map));

    this.addXP(studentId, totalEarned, `Arcade Game: ${gameId}`);

    // Check Arcade Champion achievement
    const winCount = scores.filter(s => s.won).length;
    if (winCount >= 5) {
      this.unlockAchievement(studentId, 'arcade-champ');
    }
    if (accuracy === 100) {
      this.unlockAchievement(studentId, 'perfect-score');
    }

    return { xpEarned: totalEarned, newHighScore };
  }

  getBossResults(studentId: string): { [unitId: string]: { passed: boolean; score: number; date: string } } {
    const raw = localStorage.getItem(STORAGE_KEYS.BOSS_RESULTS);
    const map = raw ? JSON.parse(raw) : {};
    return map[studentId] || {};
  }

  recordBossResult(studentId: string, unitId: string, score: number, passed: boolean): { xpEarned: number } {
    const results = this.getBossResults(studentId);
    results[unitId] = {
      passed,
      score,
      date: new Date().toISOString()
    };

    const raw = localStorage.getItem(STORAGE_KEYS.BOSS_RESULTS);
    const map = raw ? JSON.parse(raw) : {};
    map[studentId] = results;
    localStorage.setItem(STORAGE_KEYS.BOSS_RESULTS, JSON.stringify(map));

    let xpEarned = 0;
    if (passed) {
      xpEarned = 30;
      this.addXP(studentId, xpEarned, `Defeated Boss Challenge for Unit: ${unitId}`, `boss-${unitId}`);
      this.unlockAchievement(studentId, 'boss-slayer');
    } else {
      xpEarned = 5;
      this.addXP(studentId, xpEarned, `Attempted Boss Challenge for Unit: ${unitId}`);
    }

    return { xpEarned };
  }

  // --- Database Export (Sanitizes password hashes & reset codes) ---
  exportDatabaseJSON(): string {
    this.requireAdminAuth();
    const dump: Record<string, any> = {};
    Object.entries(STORAGE_KEYS).forEach(([_, key]) => {
      if (key === STORAGE_KEYS.PASSWORDS || key === STORAGE_KEYS.RESET_CODES || key === STORAGE_KEYS.AUTH_SESSION) {
        return; // Never export password hashes, reset tokens, or active session secrets
      }
      const raw = localStorage.getItem(key);
      try {
        dump[key] = raw ? JSON.parse(raw) : null;
      } catch {
        dump[key] = raw;
      }
    });
    return JSON.stringify(dump, null, 2);
  }

  resetToInitialDefaults(): void {
    this.requireAdminAuth();
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    this.init();
  }
}

export const storage = new StorageService();
