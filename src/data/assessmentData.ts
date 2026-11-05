import { Assignment, AssignmentSubmission, Quiz } from '../types';

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    courseId: 'course-pre-a1',
    lessonId: 'lesson-pre-a1-8',
    title: 'Self-Introduction Essay (자기소개서 작성)',
    instructions: 'Write a complete 4-sentence Korean self-introduction introducing your name, nationality, occupation/student status, and closing polite greeting. Use correct copula (이에요/예요) and topic markers (은/는).',
    dueDate: '2026-11-12',
    maxGrade: 100,
    submissionType: 'text',
    supportingMaterial: 'Reference: Lesson 8 - 이에요 vs 예요 rule'
  },
  {
    id: 'asg-2',
    courseId: 'course-pre-a1',
    lessonId: 'lesson-pre-a1-5',
    title: 'Batchim Pronunciation & Liaison Analysis',
    instructions: 'Transcribe the spoken pronunciation of the following 5 phrases into Korean brackets: 1) 한국어, 2) 옷, 3) 꽃이, 4) 음악, 5) 밥을. Explain the phonetic rule applied in each case.',
    dueDate: '2026-11-15',
    maxGrade: 100,
    submissionType: 'text',
    supportingMaterial: 'Reference: Unit 3 - 7 Representative Batchim sounds & 연음 법칙'
  },
  {
    id: 'asg-3',
    courseId: 'course-topik-1',
    lessonId: 'lesson-topik1-1',
    title: 'Grammar Comparison: 은/는 vs 이/가 in Discourse',
    instructions: 'Formulate three natural mini-dialogues contrasting 은/는 and 이/가. Clearly highlight when you are introducing a general topic versus answering a specific "Who/Which" question.',
    dueDate: '2026-11-20',
    maxGrade: 100,
    submissionType: 'writing-prompt',
    supportingMaterial: 'Reference: TOPIK I Level 1 Lesson 1'
  }
];

export const INITIAL_SUBMISSIONS: AssignmentSubmission[] = [];

export const ACADEMY_QUIZZES: Quiz[] = [
  {
    id: 'quiz-pre-a1-1',
    title: 'Pre-A1 Weekly Mastery Quiz: Hangul & Phonology',
    courseId: 'course-pre-a1',
    type: 'weekly-quiz',
    timeLimitMinutes: 15,
    passingScore: 70,
    questions: [
      {
        id: 'q-1',
        section: 'Reading',
        question: 'Which of the following represents the horizontal vowel "o"?',
        options: ['ㅗ', 'ㅏ', 'ㅓ', 'ㅜ'],
        correctIndex: 0,
        explanation: 'ㅗ has the short stroke pointing upward into the sky, making the rounded "o" sound.'
      },
      {
        id: 'q-2',
        section: 'Vocabulary',
        question: 'What is the Korean word for "Bread"?',
        options: ['빵 (ppang)', '방 (bang)', '물 (mul)', '나무 (na-mu)'],
        correctIndex: 0,
        explanation: '빵 (ppang) uses the double tense consonant ㅃ.'
      },
      {
        id: 'q-3',
        section: 'Grammar',
        question: 'How is the phrase "한국어" (Korean language) naturally pronounced in fluent speech?',
        options: ['[한구거] (han-gu-geo)', '[한국어] (han-guk-eo)', '[한고거] (han-go-geo)', '[한구어] (han-gu-eo)'],
        correctIndex: 0,
        explanation: 'Due to the Liaison rule (연음 법칙), the final consonant ㄱ slides into the empty position of 어.'
      },
      {
        id: 'q-4',
        section: 'Grammar',
        question: 'If a person is leaving the room and you are staying, which farewell do you say?',
        options: ['안녕히 가세요 (an-nyeong-hi ga-se-yo)', '안녕히 계세요 (an-nyeong-hi gye-se-yo)', '감사합니다', '반갑습니다'],
        correctIndex: 0,
        explanation: '가세요 contains the verb 가다 (to go). You tell the departing person to "go in peace".'
      },
      {
        id: 'q-5',
        section: 'Grammar',
        question: 'Choose the grammatically correct sentence: "I am a student."',
        options: ['저는 학생이에요.', '저는 학생예요.', '저는 학생이다.', '저는 학생는.'],
        correctIndex: 0,
        explanation: '학생 ends in a consonant (Batchim ㅇ), so 이에요 attaches for phonetic balance.'
      }
    ]
  },
  {
    id: 'quiz-topik1-midterm',
    title: 'TOPIK I Level 1 Monthly Evaluation Examination',
    courseId: 'course-topik-1',
    type: 'monthly-exam',
    timeLimitMinutes: 30,
    passingScore: 75,
    questions: [
      {
        id: 'tq-1',
        section: 'Grammar',
        question: 'Fill in the blank: "사과가 맛있어요. 하지만 바나나[ ? ] 맛이 없어요."',
        options: ['는', '가', '를', '에'],
        correctIndex: 0,
        explanation: 'The sentence contrasts apples with bananas, so the contrast marker 는 is required.'
      },
      {
        id: 'tq-2',
        section: 'Grammar',
        question: 'Which is the correct polite present conjugation of 먹다 (to eat)?',
        options: ['먹어요', '먹아요', '먹해요', '먹습니다요'],
        correctIndex: 0,
        explanation: 'The stem vowel is ㅓ (not ㅏ or ㅗ), so -어요 attaches: 먹어요.'
      },
      {
        id: 'tq-3',
        section: 'Listening',
        question: 'Read the context: "지금 도서관[ ? ] 책을 읽어요." Which particle marks where the active studying is occurring?',
        options: ['에서', '에', '을', '는'],
        correctIndex: 0,
        explanation: '에서 marks the dynamic location where an action takes place. 에 is only for static existence or destination of movement.'
      },
      {
        id: 'tq-4',
        section: 'Vocabulary',
        question: 'Which word means "Tomorrow" in Korean?',
        options: ['내일 (nae-il)', '어제 (eo-je)', '오늘 (o-neul)', '지금 (ji-geum)'],
        correctIndex: 0,
        explanation: '내일 means tomorrow. (어제 = yesterday; 오늘 = today; 지금 = right now).'
      }
    ]
  }
];
