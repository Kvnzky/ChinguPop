import { CourseUnit } from '../types';

// ==========================================
// LEVEL 3: SENTENCE CONSTRUCTION & GRAMMAR (course-topik-2)
// ==========================================
export const LEVEL_3_UNITS: CourseUnit[] = [
  {
    id: 'unit-topik2-1',
    courseId: 'course-topik-2',
    unitNumber: 1,
    title: 'Sentence Order & Core Particles',
    koreanTitle: '제1단원: 한국어 문장 구조 및 기본 조사',
    description: 'Master Korean SOV (Subject-Object-Verb) sentence architecture and distinguish topic marker 은/는 from subject marker 이/가.',
    lessons: [
      {
        id: 'lesson-topik2-1',
        unitId: 'unit-topik2-1',
        courseId: 'course-topik-2',
        lessonNumber: 1,
        title: 'Korean SOV Word Order & Topic Particle (은/는)',
        koreanTitle: '한국어 기본 어순 (SOV)과 주제격 조사 (은/는)',
        objectives: [
          'Understand that Korean verbs always appear at the end of the sentence',
          'Use topic particle 은 after consonant Batchim and 는 after vowels',
          'Construct natural basic sentences introducing subjects and topics'
        ],
        introduction: 'Unlike English which follows SVO (Subject-Verb-Object), Korean is strictly an SOV language. Verbs and adjectives always anchor the final position in a Korean sentence.',
        explanation: `In Korean:
1. **Topic Marker (은 / 는)**:
   - Use **은** when the preceding noun ends in a consonant Batchim: 선생님 + 은 → 선생님은
   - Use **는** when the preceding noun ends in a vowel: 저 + 는 → 저는, 친구 + 는 → 친구는
2. **Word Order Formula**:
   - [Subject / Topic] + [Object / Context] + [Verb]
   - Example: 저는 (I) + 사과를 (apple) + 먹어요 (eat) = "I eat an apple."`,
        filipinoNotes: 'Sa Tagalog, karaniwan nauuna ang pandiwa ("Kumakain ako ng mansanas"). Sa Koreano, laging nasa dulo ang pandiwa ("Ako ay mansanas kumakain").',
        koreanExamples: [
          { korean: '저는 학생이에요.', english: 'I am a student.', explanation: 'Topic particle 는 after vowel 저.' },
          { korean: '선생님은 친절해요.', english: 'The teacher is kind.', explanation: 'Topic particle 은 after consonant Batchim 님.' },
          { korean: '민우는 한국 사람이에요.', english: 'Min-woo is Korean.', explanation: 'Min-woo is the topic of conversation.' }
        ],
        vocabularyList: [
          { korean: '학생', romanization: 'hak-saeng', english: 'Student', partOfSpeech: 'noun', exampleSentence: '저는 학생이에요.', exampleEnglish: 'I am a student.' },
          { korean: '선생님', romanization: 'seon-saeng-nim', english: 'Teacher', partOfSpeech: 'noun', exampleSentence: '선생님이 가르쳐요.', exampleEnglish: 'The teacher teaches.' },
          { korean: '사람', romanization: 'sa-ram', english: 'Person / People', partOfSpeech: 'noun', exampleSentence: '착한 사람이에요.', exampleEnglish: 'They are a kind person.' }
        ],
        grammarNotes: [
          {
            pattern: 'N + 은/는',
            koreanName: '주제격 조사',
            meaning: 'As for N (Topic marker)',
            rules: [
              'Vowel final → 는 (e.g. 저는, 우리는)',
              'Consonant final → 은 (e.g. 사람은, 책은)'
            ],
            examples: [
              { korean: '오늘은 날씨가 좋아요.', english: 'As for today, the weather is nice.' }
            ],
            commonMistakes: [
              'Attaching 은 to vowel nouns like "저은" (incorrect! Must be "저는").'
            ]
          }
        ],
        interactiveExercises: [
          {
            id: 'ex-l3-1-1',
            type: 'multiple-choice',
            question: 'Fill in the blank: "친구[ ? ] 한국어를 배워요." (My friend learns Korean)',
            options: ['는', '은', '을', '이'],
            correctAnswer: '는',
            explanation: '친구 ends in the vowel ㅜ, so topic marker 는 is used.'
          }
        ],
        comprehensionQuestions: [
          {
            id: 'cq-l3-1-1',
            question: 'Where does the conjugated verb always appear in a Korean sentence?',
            options: ['At the very end of the sentence (SOV)', 'At the beginning (VSO)', 'In the middle (SVO)', 'Anywhere'],
            correctAnswerIndex: 0,
            explanation: 'Korean is strictly a head-final / verb-final language.'
          }
        ],
        summary: 'You mastered Korean SOV word order and how to properly apply topic marker 은/는.',
        homeworkPrompt: 'Write 3 Korean sentences introducing yourself, your friend, and your teacher using 은/는.'
      },
      {
        id: 'lesson-topik2-2',
        unitId: 'unit-topik2-1',
        courseId: 'course-topik-2',
        lessonNumber: 2,
        title: 'Subject Particle (이/가) vs Topic Particle (은/는)',
        koreanTitle: '주격 조사 (이/가)와 주제격 조사 (은/는)의 차이',
        objectives: [
          'Master subject particle 이/가',
          'Understand the difference between introducing new information (이/가) vs established topic (은/는)',
          'Identify the focus of contrast vs the grammatical subject'
        ],
        introduction: 'One of the most famous distinctions in Korean grammar is between 은/는 and 이/가. While both can point to the subject of a sentence, their communicative nuance is distinctly different.',
        explanation: `1. **Subject Particle (이 / 가)**:
   - Use **이** after consonant: 책 + 이 → 책이 있어요 (There is a book).
   - Use **가** after vowel: 비 + 가 → 비가 와요 (Rain is falling).
2. **Key Nuance**:
   - **이/가**: Focuses on **WHO** did the action, or introduces **NEW information**.
   - **은/는**: Focuses on the **PREDICATE/TOPIC**, or indicates **CONTRAST**.`,
        filipinoNotes: 'Ang 이/가 ay parang pagtuturo kung SINO o ANO ang gumawa ng kilos, samantalang ang 은/는 ay ang pangkalahatang paksa o pagkokontras.',
        koreanExamples: [
          { korean: '제가 먹었어요.', english: 'I was the one who ate it (focus on "I").', explanation: 'Use 제가 (저 + 가) when emphasizing the actor.' },
          { korean: '사과가 맛있어요.', english: 'The apple is delicious.', explanation: 'Subject particle 가 after vowel 사과.' },
          { korean: '날씨가 참 맑아요.', english: 'The weather is really clear.', explanation: 'New observation: weather is sunny.' }
        ],
        vocabularyList: [
          { korean: '비', romanization: 'bi', english: 'Rain', partOfSpeech: 'noun', exampleSentence: '비가 와요.', exampleEnglish: 'Rain is falling.' },
          { korean: '사과', romanization: 'sa-gwa', english: 'Apple', partOfSpeech: 'noun', exampleSentence: '사과가 달아요.', exampleEnglish: 'The apple is sweet.' },
          { korean: '날씨', romanization: 'nal-ssi', english: 'Weather', partOfSpeech: 'noun', exampleSentence: '날씨가 좋아요.', exampleEnglish: 'The weather is good.' }
        ],
        grammarNotes: [
          {
            pattern: 'N + 이/가',
            koreanName: '주격 조사',
            meaning: 'Subject marker',
            rules: [
              'Vowel final → 가 (e.g. 친구가, 시계가)',
              'Consonant final → 이 (e.g. 가방이, 물이)'
            ],
            examples: [
              { korean: '누가 왔어요?', english: 'Who came?' }
            ],
            commonMistakes: [
              'Saying "저가" instead of the contracted irregular "제가"!'
            ]
          }
        ],
        interactiveExercises: [
          {
            id: 'ex-l3-2-1',
            type: 'multiple-choice',
            question: 'Select the correct phrase for "Rain is falling":',
            options: ['비가 와요', '비는 와요', '비를 와요', '비에 와요'],
            correctAnswer: '비가 와요',
            explanation: '비 ends in a vowel, so subject marker 가 is used for natural weather statements.'
          }
        ],
        comprehensionQuestions: [
          {
            id: 'cq-l3-2-1',
            question: 'When 저 (I) is combined with the subject marker 가, what does it become?',
            options: ['제가', '저가', '전가', '제는'],
            correctAnswerIndex: 0,
            explanation: '저 + 가 contracts irregularly to 제가.'
          }
        ],
        summary: 'You learned to use subject marker 이/가 and recognize when to use it over 은/는.',
        homeworkPrompt: 'Explain why we say "비가 와요" instead of "비는 와요".'
      }
    ]
  },
  {
    id: 'unit-topik2-2',
    courseId: 'course-topik-2',
    unitNumber: 2,
    title: 'Past & Future Verb Conjugations',
    koreanTitle: '제2단원: 과거형과 미래형 시제 정복',
    description: 'Conjugate Korean verbs into past tense (-았/었어요) and future intention (-을 거예요).',
    lessons: [
      {
        id: 'lesson-topik2-3',
        unitId: 'unit-topik2-2',
        courseId: 'course-topik-2',
        lessonNumber: 3,
        title: 'Past Tense: -았어요 / -었어요 / 했어요',
        koreanTitle: '과거 시제 (-았/었어요, 했어요)',
        objectives: [
          'Form past tense based on vowel harmony (ㅏ/ㅗ vs other vowels)',
          'Conjugate 하다 verbs to 했어요 in the past',
          'Describe completed actions in conversation'
        ],
        introduction: 'To talk about yesterday or completed events, Korean inserts the past tense infix -았/었- before the polite sentence ending.',
        explanation: `1. **If verb stem ends in ㅏ or ㅗ** → add **-았어요**:
   - 보다 (to see) → 보 + 았어요 → **봤어요** (saw)
   - 가다 (to go) → 가 + 았어요 → **갔어요** (went)
2. **If verb stem ends in other vowels** → add **-었어요**:
   - 먹다 (to eat) → 먹 + 었어요 → **먹었어요** (ate)
   - 마시다 (to drink) → 마시 + 었어요 → **마셨어요** (drank)
3. **하다 verbs** → become **했어요**:
   - 공부하다 (to study) → **공부했어요** (studied)
   - 운동하다 (to exercise) → **운동했어요** (exercised)`,
        filipinoNotes: 'Katumbas ito ng nagdaang kilos sa Tagalog (kumain, nag-aral, pumunta).',
        koreanExamples: [
          { korean: '어제 영화를 봤어요.', english: 'I watched a movie yesterday.', explanation: '보다 contracted with -았어요 to 봤어요.' },
          { korean: '한국 음식을 먹었어요.', english: 'I ate Korean food.', explanation: '먹다 + 었어요 = 먹었어요.' },
          { korean: '도서관에서 공부했어요.', english: 'I studied at the library.', explanation: '공부하다 past tense is 공부했어요.' }
        ],
        vocabularyList: [
          { korean: '어제', romanization: 'eo-je', english: 'Yesterday', partOfSpeech: 'noun', exampleSentence: '어제 친구를 만났어요.', exampleEnglish: 'I met a friend yesterday.' },
          { korean: '영화', romanization: 'yeong-hwa', english: 'Movie', partOfSpeech: 'noun', exampleSentence: '영화를 봤어요.', exampleEnglish: 'I watched a movie.' },
          { korean: '도서관', romanization: 'do-seo-gwan', english: 'Library', partOfSpeech: 'noun', exampleSentence: '도서관에서 책을 읽어요.', exampleEnglish: 'I read books at the library.' }
        ],
        grammarNotes: [
          {
            pattern: 'V/A + -았/었어요',
            koreanName: '과거 시제',
            meaning: 'Did / Was (Past tense)',
            rules: [
              'Vowel ㅏ, ㅗ → -았어요',
              'Other vowels → -었어요',
              '하다 → 했어요'
            ],
            examples: [
              { korean: '어제 많이 잤어요.', english: 'I slept a lot yesterday.' }
            ],
            commonMistakes: [
              'Forgetting contraction: writing "보았어요" instead of the natural "봤어요".'
            ]
          }
        ],
        interactiveExercises: [
          {
            id: 'ex-l3-3-1',
            type: 'multiple-choice',
            question: 'What is the past tense of 먹다 (to eat)?',
            options: ['먹었어요', '먹았어요', '먹했어요', '먹을 거예요'],
            correctAnswer: '먹었어요',
            explanation: 'The stem 먹 contains vowel ㅓ (not ㅏ or ㅗ), so -었어요 attaches.'
          }
        ],
        comprehensionQuestions: [
          {
            id: 'cq-l3-3-1',
            question: 'What is the correct past tense of 하다 (to do)?',
            options: ['했어요', '하였어요', '하았어요', '하했어요'],
            correctAnswerIndex: 0,
            explanation: '하다 conjugates irregularly into 했어요 in polite conversational Korean.'
          }
        ],
        summary: 'You mastered past tense conjugations (-았어요, -었어요, 했어요) to talk about past activities.',
        homeworkPrompt: 'Write 3 sentences about what you did yesterday using 어제.'
      }
    ]
  }
];

// ==========================================
// LEVEL 4: EVERYDAY CONVERSATION & TRAVEL (course-topik-3)
// ==========================================
export const LEVEL_4_UNITS: CourseUnit[] = [
  {
    id: 'unit-topik3-1',
    courseId: 'course-topik-3',
    unitNumber: 1,
    title: 'Café & Restaurant Survival Korean',
    koreanTitle: '제1단원: 카페 및 식당 주문 실전',
    description: 'Order food, customize drinks, ask for the bill, and express culinary preferences with native confidence.',
    lessons: [
      {
        id: 'lesson-topik3-1',
        unitId: 'unit-topik3-1',
        courseId: 'course-topik-3',
        lessonNumber: 1,
        title: 'Ordering at a Seoul Café: -아/어 주세요',
        koreanTitle: '서울 카페에서 주문하기 (-아/어 주세요)',
        objectives: [
          'Order iced vs hot coffee beverages like a native',
          'Use -아/어 주세요 to request services politely',
          'Count cups and portions with native Korean numbers (한 잔, 두 잔)'
        ],
        introduction: 'Café culture is at the heart of daily life in Korea. In this lesson, learn the exact expressions used at cafés from Hongdae to Gangnam.',
        explanation: `1. **The Core Ordering Formula**:
   - [Item Name] + [Counter] + **주세요** (Please give me...)
   - Example: 아이스 아메리카노 한 잔 주세요. (Please give me one iced Americano.)
2. **Polite Request Ending (-아/어 주세요)**:
   - 따뜻하게 데워 주세요 (Please warm it up for me).
   - 영수증 버려 주세요 (Please discard the receipt).`,
        filipinoNotes: 'Ang "주세요" ay parang "Paki-bigay" o "Pabili po".',
        koreanExamples: [
          { korean: '아이스 아메리카노 한 잔 주세요.', english: 'One iced Americano, please.', explanation: 'Classic Seoul café order.' },
          { korean: '여기서 드세요, 테이크아웃 하세요?', english: 'For here, or to go?', explanation: 'Common cashier question.' },
          { korean: '포장해 주세요.', english: 'Please pack it to go (take out).', explanation: 'Essential for takeaway.' }
        ],
        vocabularyList: [
          { korean: '아이스 아메리카노', romanization: 'a-i-seu a-me-ri-ka-no', english: 'Iced Americano', partOfSpeech: 'noun', exampleSentence: '아아 한 잔 주세요.', exampleEnglish: 'One iced Americano please (slang: 아아).' },
          { korean: '한 잔', romanization: 'han jan', english: 'One cup / glass', partOfSpeech: 'counter', exampleSentence: '커피 한 잔 마셨어요.', exampleEnglish: 'I drank a cup of coffee.' },
          { korean: '영수증', romanization: 'yeong-su-jeung', english: 'Receipt', partOfSpeech: 'noun', exampleSentence: '영수증 버려 주세요.', exampleEnglish: 'Please discard the receipt.' }
        ],
        grammarNotes: [
          {
            pattern: 'V + -아/어 주세요',
            koreanName: '정중한 부탁',
            meaning: 'Please do (verb) for me',
            rules: [
              'Vowel ㅏ/ㅗ → -아 주세요',
              'Other vowels → -어 주세요',
              '하다 → 해 주세요'
            ],
            examples: [
              { korean: '도와주세요!', english: 'Please help me!' }
            ],
            commonMistakes: [
              'Just saying "주세요" without the verb when asking someone to perform an action.'
            ]
          }
        ],
        interactiveExercises: [
          {
            id: 'ex-l4-1-1',
            type: 'multiple-choice',
            question: 'How do you say "Please pack it to go (takeout)" in Korean?',
            options: ['포장해 주세요', '주문해 주세요', '계산해 주세요', '버려 주세요'],
            correctAnswer: '포장해 주세요',
            explanation: '포장하다 means to pack/wrap to-go; + 해 주세요 = please pack it.'
          }
        ],
        comprehensionQuestions: [
          {
            id: 'cq-l4-1-1',
            question: 'Which counter is used for cups of coffee in Korean?',
            options: ['잔 (jan)', '개 (gae)', '명 (myeong)', '병 (byeong)'],
            correctAnswerIndex: 0,
            explanation: '잔 (jan) is the specific Korean counter for cups and glasses.'
          }
        ],
        summary: 'You learned how to order drinks, customize orders, and handle cashier interactions in Korea.',
        homeworkPrompt: 'Practice ordering two different drinks and asking for the receipt.'
      }
    ]
  }
];

// ==========================================
// LEVEL 5: INTERMEDIATE KOREAN (course-topik-4)
// ==========================================
export const LEVEL_5_UNITS: CourseUnit[] = [
  {
    id: 'unit-topik4-1',
    courseId: 'course-topik-4',
    unitNumber: 1,
    title: 'Complex Sentence Connectors & Indirect Speech',
    koreanTitle: '제1단원: 복합 문장 연결 어미 및 간접 화법',
    description: 'Connect clauses with cause, condition, contrast, and report what others said using indirect speech (-다고 하다).',
    lessons: [
      {
        id: 'lesson-topik4-1',
        unitId: 'unit-topik4-1',
        courseId: 'course-topik-4',
        lessonNumber: 1,
        title: 'Indirect Quotations: -다고 하다 (He/She said that...)',
        koreanTitle: '간접 화법: -다고 하다 (평서문 인용)',
        objectives: [
          'Quote statements made by teachers, friends, and news reporters',
          'Conjugate verbs and adjectives into plain form before -다고 하다',
          'Report events accurately without repeating verbatim quotes'
        ],
        introduction: 'In intermediate Korean, you move beyond simple dialogue to reporting what you heard, read, or were told by others using indirect speech.',
        explanation: `1. **Adjectives** + **-다고 하다**:
   - 바쁘다 → 바쁘다고 해요 (They say they are busy).
   - 좋다 → 좋다고 했어요 (They said it was good).
2. **Action Verbs (Present)**:
   - Consonant final: 먹다 → **먹는다고 하다** (Says they eat).
   - Vowel final: 가다 → **간다고 하다** (Says they are going).
3. **Past Tense**:
   - 갔다고 하다 (Said they went), 먹었다고 하다 (Said they ate).`,
        filipinoNotes: 'Katumbas ito ng "Sabi niya na..." sa Tagalog.',
        koreanExamples: [
          { korean: '민우가 내일 온다고 했어요.', english: 'Min-woo said he is coming tomorrow.', explanation: 'Action verb 오다 + ㄴ다고 했어요.' },
          { korean: '선생님이 오늘 시험이 쉽다고 하셨어요.', english: 'The teacher said today’s exam is easy.', explanation: 'Adjective 쉬운 + 다고 하셨어요 (honorific).' }
        ],
        vocabularyList: [
          { korean: '인용', romanization: 'in-yong', english: 'Quotation', partOfSpeech: 'noun', exampleSentence: '간접 인용을 배웠어요.', exampleEnglish: 'I learned indirect quotation.' },
          { korean: '소식', romanization: 'so-sik', english: 'News / Word', partOfSpeech: 'noun', exampleSentence: '좋은 소식을 들었어요.', exampleEnglish: 'I heard good news.' }
        ],
        grammarNotes: [
          {
            pattern: 'V/A + -다고 하다',
            koreanName: '간접 화법',
            meaning: 'To say that...',
            rules: [
              'Action Verb: -ㄴ/는다고 하다',
              'Descriptive Verb (Adjective): -다고 하다',
              'Noun: -(이)라고 하다'
            ],
            examples: [
              { korean: '친구가 한국에 간다고 해요.', english: 'My friend says they are going to Korea.' }
            ],
            commonMistakes: [
              'Using -는다고 on adjectives like "예쁜다고 하다" (incorrect! Adjectives use plain -다고: "예쁘다고 하다").'
            ]
          }
        ],
        interactiveExercises: [
          {
            id: 'ex-l5-1-1',
            type: 'multiple-choice',
            question: 'How do you report: "Min-ji says she is busy (바쁘다)"?',
            options: ['민지가 바쁘다고 해요', '민지가 바쁜다고 해요', '민지가 바쁘라고 해요', '민지가 바쁘자고 해요'],
            correctAnswer: '민지가 바쁘다고 해요',
            explanation: '바쁘다 is an adjective (descriptive verb), so it takes -다고 해요.'
          }
        ],
        comprehensionQuestions: [
          {
            id: 'cq-l5-1-1',
            question: 'Which plain ending attaches to action verbs with consonant Batchim for indirect speech?',
            options: ['-는다고 하다', '-ㄴ다고 하다', '-다고 하다', '-자고 하다'],
            correctAnswerIndex: 0,
            explanation: 'Action verbs ending in a consonant take -는다고 하다 (e.g. 먹는다고 하다).'
          }
        ],
        summary: 'You mastered indirect speech quotations for both verbs and adjectives.',
        homeworkPrompt: 'Report 3 things your friends or family told you this week in Korean.'
      }
    ]
  }
];

// ==========================================
// LEVEL 6: ADVANCED KOREAN & IDIOMS (course-topik-5)
// ==========================================
export const LEVEL_6_UNITS: CourseUnit[] = [
  {
    id: 'unit-topik5-1',
    courseId: 'course-topik-5',
    unitNumber: 1,
    title: 'Sino-Korean Four-Character Idioms (사자성어)',
    koreanTitle: '제1단원: 고사성어 및 사자성어 완전 정복',
    description: 'Master core Sino-Korean idioms that elevate your writing and formal speaking to native proficiency.',
    lessons: [
      {
        id: 'lesson-topik5-1',
        unitId: 'unit-topik5-1',
        courseId: 'course-topik-5',
        lessonNumber: 1,
        title: 'Core Idioms: 일석이조, 작심삼일, 고진감래',
        koreanTitle: '핵심 사자성어: 일석이조, 작심삼일, 고진감래',
        objectives: [
          'Recognize the historical and cultural origins of four-character idioms',
          'Use 일석이조 (killing two birds with one stone) in daily discourse',
          'Express perseverance through 고진감래 (sweetness comes after bitterness)'
        ],
        introduction: 'Four-character idioms (사자성어) are condensed cultural metaphors derived from classical Chinese literature and Korean history.',
        explanation: `1. **일석이조 (一石二鳥)**:
   - Meaning: "One stone, two birds" (Killing two birds with one stone).
   - Usage: 한국어를 배우면 드라마도 이해하고 취업에도 도움이 되니 일석이조예요.
2. **작심삼일 (作心三日)**:
   - Meaning: "A resolution lasting only three days" (Giving up quickly).
   - Usage: 새해 다짐이 작심삼일로 끝나지 않도록 꾸준히 공부해야 해요.
3. **고진감래 (苦盡甘來)**:
   - Meaning: "Bitterness ends, sweetness comes" (No pain, no gain; hard work pays off).
   - Usage: 지금은 힘들지만 고진감래라는 말처럼 좋은 결과가 있을 거예요.`,
        filipinoNotes: 'Tulad ito ng mga salawikain o matalinghagang pananalita sa Tagalog.',
        koreanExamples: [
          { korean: '운동도 하고 친구도 사귀니 일석이조네요.', english: 'I exercise and make friends, so it’s two birds with one stone.', explanation: 'Dual benefit.' },
          { korean: '열심히 노력했으니 고진감래일 겁니다.', english: 'Since you worked hard, sweet success will surely follow.', explanation: 'Encouragement for exams.' }
        ],
        vocabularyList: [
          { korean: '일석이조', romanization: 'il-seog-i-jo', english: 'Killing two birds with one stone', partOfSpeech: 'idiom', exampleSentence: '일석이조의 효과가 있어요.', exampleEnglish: 'There is a dual benefit effect.' },
          { korean: '작심삼일', romanization: 'jak-sim-sam-il', english: 'Short-lived resolution (giving up in 3 days)', partOfSpeech: 'idiom', exampleSentence: '작심삼일은 이제 그만!', exampleEnglish: 'No more giving up after 3 days!' },
          { korean: '고진감래', romanization: 'go-jin-gam-rae', english: 'Sweetness comes after bitterness', partOfSpeech: 'idiom', exampleSentence: '고진감래를 믿어요.', exampleEnglish: 'I believe hard work pays off.' }
        ],
        grammarNotes: [
          {
            pattern: '사자성어 + -이다 / -라고 하다',
            koreanName: '사자성어 활용',
            meaning: 'Idiomatic statement',
            rules: ['Idioms function as nouns in sentences and can take copula -이다.'],
            examples: [{ korean: '이것이야말로 일석이조입니다.', english: 'This is truly killing two birds with one stone.' }],
            commonMistakes: ['Translating word-for-word instead of memorizing the four-character unit as a whole.']
          }
        ],
        interactiveExercises: [
          {
            id: 'ex-l6-1-1',
            type: 'multiple-choice',
            question: 'Which idiom means "Giving up on a resolution after just three days"?',
            options: ['작심삼일', '일석이조', '고진감래', '동문서답'],
            correctAnswer: '작심삼일',
            explanation: '작심삼일 (作心三日) literally means making a heart/resolution for three days.'
          }
        ],
        comprehensionQuestions: [
          {
            id: 'cq-l6-1-1',
            question: 'What does "고진감래" promise to someone working hard through difficulties?',
            options: ['Sweet reward follows after hard work', 'Danger is ahead', 'Time passes too fast', 'Friends are loyal'],
            correctAnswerIndex: 0,
            explanation: '고 (苦, bitter) 진 (盡, ends) 감 (甘, sweet) 래 (來, arrives).'
          }
        ],
        summary: 'You enriched your Korean expressive repertoire with classical four-character idioms.',
        homeworkPrompt: 'Describe a situation in your life that illustrates 일석이조 or 고진감래.'
      }
    ]
  }
];

// ==========================================
// LEVEL 7: KOREAN FLUENCY & PROFESSIONAL (course-topik-6)
// ==========================================
export const LEVEL_7_UNITS: CourseUnit[] = [
  {
    id: 'unit-topik6-1',
    courseId: 'course-topik-6',
    unitNumber: 1,
    title: 'Professional Business Korean & Formal Debate',
    koreanTitle: '제1단원: 비즈니스 실무 한국어 및 학술 토론',
    description: 'Master formal corporate registers, diplomatic email etiquette, professional negotiations, and TOPIK II Level 6 essay writing.',
    lessons: [
      {
        id: 'lesson-topik6-1',
        unitId: 'unit-topik6-1',
        courseId: 'course-topik-6',
        lessonNumber: 1,
        title: 'Corporate Business Email & Formal Proposals',
        koreanTitle: '비즈니스 이메일 작성 및 공식 제안 화법',
        objectives: [
          'Draft professional corporate emails with appropriate honorific openings and sign-offs',
          'Use formal deferential verb endings (-기 바랍니다, -아/어 주시기 바랍니다)',
          'Present arguments persuasively in professional board meetings'
        ],
        introduction: 'In Korean corporate environments, the linguistic register is highly structured. Professional emails and presentations require high-level deference and precise vocabulary.',
        explanation: `1. **Standard Business Email Openings**:
   - 안녕하십니까, [회사명] [직책] [이름]입니다.
   - 바쁘신 와중에도 검토해 주셔서 감사드립니다.
2. **Formal Requests**:
   - 첨부된 문서를 확인해 주시기 바랍니다 (Please review the attached document).
   - 회신 부탁드립니다 (We kindly request your reply).
3. **Closing Remarks**:
   - 감사합니다. [이름] 배상 (Sincerely, [Name]).`,
        filipinoNotes: 'Pormal na pambansang liham para sa opisina at kumpanya sa Korea.',
        koreanExamples: [
          { korean: '첨부 문서를 검토해 주시기 바랍니다.', english: 'Please be so kind as to review the attached document.', explanation: 'Standard high-form corporate request.' },
          { korean: '추가 문의 사항이 있으시면 언제든지 연락 주십시오.', english: 'If you have further inquiries, please feel free to contact us anytime.', explanation: 'Polite professional closing.' }
        ],
        vocabularyList: [
          { korean: '검토', romanization: 'geom-to', english: 'Review / Examination', partOfSpeech: 'noun', exampleSentence: '문서를 면밀히 검토했습니다.', exampleEnglish: 'I reviewed the document thoroughly.' },
          { korean: '첨부 파일', romanization: 'cheom-bu pa-il', english: 'Attachment / Attached file', partOfSpeech: 'noun', exampleSentence: '첨부 파일을 확인해 주세요.', exampleEnglish: 'Please check the attached file.' },
          { korean: '협조', romanization: 'hyeop-jo', english: 'Cooperation', partOfSpeech: 'noun', exampleSentence: '협조에 감사드립니다.', exampleEnglish: 'Thank you for your cooperation.' }
        ],
        grammarNotes: [
          {
            pattern: 'V + -(으)시기 바랍니다',
            koreanName: '공식적 정중 요청',
            meaning: 'We request that you please...',
            rules: ['Consonant stem → -으시기 바랍니다', 'Vowel stem → -시기 바랍니다'],
            examples: [{ korean: '시간을 준수해 주시기 바랍니다.', english: 'Please be punctual.' }],
            commonMistakes: ['Using casual -주세요 in formal legal/corporate agreements.']
          }
        ],
        interactiveExercises: [
          {
            id: 'ex-l7-1-1',
            type: 'multiple-choice',
            question: 'What is the professional corporate way to say "Please review the document"?',
            options: ['문서를 검토해 주시기 바랍니다', '문서 봐 줘', '문서 보시기 바랍니다', '문서 확인해'],
            correctAnswer: '문서를 검토해 주시기 바랍니다',
            explanation: '검토해 주시기 바랍니다 is the most professional corporate register.'
          }
        ],
        comprehensionQuestions: [
          {
            id: 'cq-l7-1-1',
            question: 'What does the formal closing "배상 (拜上)" indicate at the end of a Korean business letter?',
            options: ['Respectfully presented by / Sincerely yours', 'Urgent response required', 'Draft version only', 'Confidential'],
            correctAnswerIndex: 0,
            explanation: '배상 (拜上) is the highest respectful sign-off, meaning "bowing and submitting".'
          }
        ],
        summary: 'You acquired top-tier professional business Korean skills for corporate and academic success.',
        homeworkPrompt: 'Draft a short 5-sentence professional business email proposing a partnership in Korean.'
      }
    ]
  }
];
