// CHINGUPOP - Core Type Definitions

export type UserRole = 'student' | 'teacher' | 'admin';

export type AccountStatus = 'active' | 'inactive' | 'suspended';

export type KoreanProficiency = 
  | 'Pre-A1' // Level 0: Korean Foundations
  | 'Level 1' // TOPIK I Level 1 (Beginner)
  | 'Level 2' // TOPIK I Level 2 (Elementary)
  | 'Level 3' // TOPIK II Level 3 (Intermediate)
  | 'Level 4' // TOPIK II Level 4 (Upper Intermediate)
  | 'Level 5' // TOPIK II Level 5 (Advanced)
  | 'Level 6'; // TOPIK II Level 6 (Mastery)

export type ImmersionStage = 'beginner' | 'elementary' | 'intermediate' | 'advanced';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status?: AccountStatus;
  emailVerified?: boolean;
  lastLoginAt?: string;
  updatedAt?: string;
  avatar?: string;
  studentId?: string;
  enrolledDate: string;
  proficiency: KoreanProficiency;
  immersionStage: ImmersionStage;
  explanationLanguage: 'English' | 'Filipino' | 'Korean';
  filipinoSupport: boolean;
  dailyStudyMinutes: number;
  studyDaysPerWeek: number;
  assignedTeacherId?: string;
  currentCourseId?: string;
  bio?: string;
  attendancePercentage: number;
  currentAcademicGrade: string; // 'A' | 'B' | 'C' | 'D' | 'F'
}

export interface AuthSession {
  userId: string;
  email: string;
  role: UserRole;
  isAuthenticated: boolean;
  isAdminAuthenticated?: boolean;
  loginAt: string;
  expiresAt: string;
  token: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorEmail?: string;
  action: string;
  targetUserId?: string;
  targetUserName?: string;
  targetUserEmail?: string;
  details: string;
}

export interface SkillProficiency {
  reading: number; // 0 - 100
  writing: number;
  listening: number;
  speaking: number;
  grammar: number;
  vocabulary: number;
}

export type CourseCompletionStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface CourseProgressInfo {
  courseId: string;
  totalLessons: number;
  completedLessonsCount: number;
  completionPercent: number; // 0 - 100
  status: CourseCompletionStatus;
}

export interface Course {
  id: string;
  title: string;
  koreanTitle: string;
  level: KoreanProficiency;
  topikLevel?: string;
  description: string;
  objectives: string[];
  unitsCount: number;
  totalLessons: number;
  status: 'published' | 'draft' | 'archived';
  prerequisites?: string[];
  units: CourseUnit[];
}

export interface CourseUnit {
  id: string;
  courseId: string;
  unitNumber: number;
  title: string;
  koreanTitle: string;
  description: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  unitId: string;
  courseId: string;
  lessonNumber: number;
  title: string;
  koreanTitle: string;
  objectives: string[];
  introduction: string;
  explanation: string;
  koreanExamples: LessonExample[];
  filipinoNotes?: string;
  vocabularyList: LessonVocabItem[];
  grammarNotes: GrammarNote[];
  interactiveExercises: LessonExercise[];
  comprehensionQuestions: ComprehensionQuestion[];
  summary: string;
  homeworkPrompt?: string;
  isCompleted?: boolean;
  status?: 'published' | 'draft';
}

export interface LessonExample {
  korean: string;
  pronunciation?: string;
  english: string;
  filipino?: string;
  explanation?: string;
  breakdown?: { word: string; role: string }[];
}

export interface LessonVocabItem {
  korean: string;
  english: string;
  filipino?: string;
  partOfSpeech: string;
  romanization: string;
  exampleSentence: string;
  exampleEnglish: string;
}

export interface GrammarNote {
  pattern: string;
  koreanName: string;
  meaning: string;
  filipinoComparison?: string;
  rules: string[];
  examples: LessonExample[];
  commonMistakes: string[];
}

export interface LessonExercise {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'sentence-arrange' | 'translation' | 'stroke-practice';
  question: string;
  koreanPrompt?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
}

export interface ComprehensionQuestion {
  id: string;
  question: string;
  koreanContext?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface VocabularyWord {
  id: string;
  korean: string;
  hanja?: string;
  romanization: string;
  pronunciationGuide: string;
  english: string;
  filipino?: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'particle' | 'expression';
  exampleKorean: string;
  exampleEnglish: string;
  exampleFilipino?: string;
  category: string;
  difficulty: KoreanProficiency;
  // SM-2 Spaced Repetition fields:
  repetitionNumber: number;
  intervalDays: number;
  easeFactor: number;
  nextReviewDate: string;
  lastReviewedDate?: string;
  status: 'new' | 'learning' | 'review' | 'mastered';
  timesCorrect: number;
  timesIncorrect: number;
}

export type SRSGrade = 0 | 1 | 2 | 3 | 4 | 5; // 0-1: Again, 2-3: Hard/Good, 4-5: Easy

export interface SpeakingExercise {
  id: string;
  title: string;
  koreanTarget: string;
  romanization: string;
  english: string;
  filipino?: string;
  difficulty: KoreanProficiency;
  category: 'Greetings' | 'Particles' | 'Daily Conversation' | 'Ordering' | 'Honorifics';
  audioPrompt?: string;
  tips: string[];
}

export interface SpeakingAssessmentResult {
  exerciseId: string;
  studentId: string;
  timestamp: string;
  targetSentence: string;
  recognizedText: string;
  accuracyScore: number; // 0 - 100
  matchedSyllables: string[];
  missedSyllables: string[];
  phoneticFeedback: string;
  isApproximation: boolean;
}

export interface Assignment {
  id: string;
  courseId: string;
  lessonId: string;
  title: string;
  instructions: string;
  dueDate: string;
  maxGrade: number;
  submissionType: 'text' | 'writing-prompt' | 'audio';
  supportingMaterial?: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  content: string;
  imageUrl?: string;
  imageFileName?: string;
  status: 'submitted' | 'under-review' | 'graded';
  grade?: number;
  teacherFeedback?: string;
  aiGrammarFeedback?: {
    original: string;
    corrected: string;
    explanation: string;
    mistakeType: string;
  }[];
  aiVisionEvaluation?: {
    overallScore: number;
    strokeAccuracyScore: number;
    symmetryScore: number;
    alignmentScore: number;
    detectedCharacters: string[];
    analysisSummary: string;
    strokeOrderFeedback: string;
    strengths: string[];
    recommendations: string[];
  };
}

export interface Quiz {
  id: string;
  title: string;
  courseId: string;
  lessonId?: string;
  type: 'weekly-quiz' | 'monthly-exam' | 'topik-mock';
  timeLimitMinutes: number;
  passingScore: number;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  section: 'Reading' | 'Listening' | 'Grammar' | 'Vocabulary';
  question: string;
  koreanText?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ExamAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  studentId: string;
  timestamp: string;
  score: number;
  totalQuestions: number;
  passed: boolean;
  answers: {
    questionId: string;
    selectedIndex: number;
    isCorrect: boolean;
  }[];
}

export interface StudyPlanItem {
  id: string;
  dayOfWeek: number; // 0 (Sunday) to 6 (Saturday)
  timeSlot: string;
  durationMinutes: number;
  activityType: 'Structured lesson' | 'Grammar and vocabulary' | 'Listening practice' | 'Speaking practice' | 'Reading or writing' | 'Review and homework';
  title: string;
  description: string;
  targetSkill: keyof SkillProficiency;
  completed: boolean;
  lessonId?: string;
}

export interface Certificate {
  id: string;
  certificateNumber: string;
  studentId: string;
  studentName: string;
  courseTitle: string;
  level: KoreanProficiency;
  issueDate: string;
  finalGrade: string;
  scorePercentage: number;
  instructorName: string;
  verificationCode: string;
}

export interface AIMessage {
  id: string;
  sender: 'student' | 'tutor';
  text: string;
  timestamp: string;
  koreanSnippet?: string;
  grammarTip?: string;
  filipinoExplanation?: string;
  corrections?: {
    original: string;
    corrected: string;
    reason: string;
  }[];
}

export type AIMode = 
  | 'Grammar Tutor'
  | 'Vocabulary Tutor'
  | 'Speaking Partner'
  | 'Pronunciation Practice'
  | 'Writing Assistant'
  | 'Reading Comprehension Tutor'
  | 'Listening Practice Tutor'
  | 'TOPIK Preparation Tutor'
  | 'Real-Life Conversation Simulator';

// ==========================================
// GAMIFICATION, ARCADE & SPACED REPETITION
// ==========================================

export interface StudentGamificationState {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  activeDates: string[];
  awardedActivities: { [activityKey: string]: boolean };
  unlockedAchievements: string[];
}

export interface Achievement {
  id: string;
  title: string;
  koreanTitle: string;
  description: string;
  icon: string;
  category: 'learning' | 'arcade' | 'streak' | 'mastery';
  xpReward: number;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

export interface ReviewItem {
  id: string;
  studentId: string;
  type: 'vocabulary' | 'grammar' | 'pronunciation' | 'listening';
  korean: string;
  english: string;
  romanization?: string;
  hint?: string;
  intervalDays: number; // 0, 1, 3, 7, 14, 30 (SuperMemo SM-2)
  easeFactor: number;
  consecutiveCorrect: number;
  nextReviewDate: string; // ISO string YYYY-MM-DD
  lastReviewedDate?: string;
  mistakeCount: number;
}

export type ArcadeGameId = 
  | 'hangul-match'
  | 'syllable-builder'
  | 'listen-pick'
  | 'word-hunter'
  | 'sentence-scramble'
  | 'memory-flip'
  | 'pronunciation-challenge'
  | 'korean-life-simulator'
  | 'boss-challenge';

export interface ArcadeGameMetadata {
  id: ArcadeGameId;
  title: string;
  koreanTitle: string;
  description: string;
  category: 'Alphabet' | 'Syllables' | 'Listening' | 'Vocabulary' | 'Grammar' | 'Speaking' | 'Culture' | 'Mastery';
  icon: string;
  color: string;
  badge: string;
  durationMinutes: number;
  learningGoal: string;
}

export interface ArcadeScoreRecord {
  id: string;
  studentId: string;
  gameId: ArcadeGameId;
  score: number;
  maxScore: number;
  accuracy: number;
  xpEarned: number;
  playedAt: string;
  won: boolean;
}

export interface LifeScenarioNode {
  id: string;
  characterName: string;
  characterKorean: string;
  avatar: string;
  koreanText: string;
  englishTranslation: string;
  romanization?: string;
  audioPrompt?: string;
  culturalNote?: string;
  options: {
    id: string;
    textKorean: string;
    textEnglish: string;
    isPolite: boolean;
    isNatural: boolean;
    feedback: string;
    xp: number;
    nextNodeId?: string;
  }[];
}
