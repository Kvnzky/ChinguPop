import { LEVEL_3_UNITS, LEVEL_4_UNITS, LEVEL_5_UNITS, LEVEL_6_UNITS, LEVEL_7_UNITS } from './extendedCurriculumData';
import { Course } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'course-pre-a1',
    title: 'Korean Foundations & Hangul Mastery',
    koreanTitle: '한국어 기초 및 한글 완성',
    level: 'Pre-A1',
    topikLevel: 'Pre-TOPIK I',
    description: 'A comprehensive academic introduction to Korean script (Hangul), syllable architecture, pronunciation rules, Batchim (받침), basic greetings, Sino/Native numbers, and essential classroom expressions. Zero prior knowledge assumed.',
    objectives: [
      'Master the 21 Korean vowels (10 basic, 11 combined) and 19 consonants (14 basic, 5 double)',
      'Understand Hangul syllable block construction (Initial + Medial + Final)',
      'Pronounce Korean phonemes accurately and master the 7 Batchim (받침) representative sounds',
      'Introduce yourself politely using basic greetings and Sino-Korean & Native Korean numbers',
      'Follow university classroom commands in spoken and written Korean'
    ],
    unitsCount: 4,
    totalLessons: 12,
    status: 'published',
    units: [
      {
        id: 'unit-pre-a1-1',
        courseId: 'course-pre-a1',
        unitNumber: 1,
        title: 'The Hangul Alphabet & Vowel Architecture',
        koreanTitle: '제1단원: 한글 모음의 원리',
        description: 'Explore King Sejong the Great’s scientific design of Hangul based on Heaven (•), Earth (ㅡ), and Humanity (ㅣ).',
        lessons: [
          {
            id: 'lesson-pre-a1-1',
            unitId: 'unit-pre-a1-1',
            courseId: 'course-pre-a1',
            lessonNumber: 1,
            title: 'Basic Vowels (기본 모음 10자)',
            koreanTitle: '기본 모음 10자 (ㅏ, ㅑ, ㅓ, ㅕ, ㅗ, ㅛ, ㅜ, ㅠ, ㅡ, ㅣ)',
            objectives: [
              'Recognize the 10 basic Korean vowels',
              'Understand the philosophical origins: Heaven (•), Earth (ㅡ), and Man (ㅣ)',
              'Pronounce each vowel with correct mouth shapes',
              'Distinguish vertical vowels (ㅏ, ㅓ, ㅣ) from horizontal vowels (ㅗ, ㅜ, ㅡ)'
            ],
            introduction: 'Created in 1443 by King Sejong the Great, Hangul is one of the most scientific writing systems in human history. Unlike English letters which represent arbitrary shapes, Hangul vowels visually depict philosophical elements: Heaven (round dot), Earth (flat line ㅡ), and Humanity (standing vertical line ㅣ).',
            explanation: `Hangul vowels are classified into two primary geometrical orientations:
1. **Vertical Vowels**: Written to the right of the consonant (e.g., ㅏ, ㅑ, ㅓ, ㅕ, ㅣ).
2. **Horizontal Vowels**: Written below the consonant (e.g., ㅗ, ㅛ, ㅜ, ㅠ, ㅡ).

A Korean vowel cannot stand alone in writing. When pronounced without an initial consonant sound, the silent placeholder consonant 'ㅇ' (ieung) is prefixed:
- 아 (a), 야 (ya), 어 (eo), 여 (yeo), 오 (o), 요 (yo), 우 (u), 유 (yu), 으 (eu), 이 (i).

**Mouth Shape Guidance**:
- **ㅏ (a)**: Open mouth wide, tongue relaxed, similar to 'father'.
- **ㅓ (eo)**: Open mouth moderately, pull tongue slightly back. NOT like English 'o'; it sounds closer to 'uh' or the vowel in British 'cup'.
- **ㅗ (o)**: Round your lips tightly into a circular 'O' shape.
- **ㅜ (u)**: Pucker lips forward like sipping through a straw.
- **ㅡ (eu)**: Spread lips wide in an unrounded grimace, pull tongue back. (Very common in Korean, often challenging for foreign speakers).
- **ㅣ (i)**: Smile gently and raise tongue high, like 'ee' in 'see'.`,
            filipinoNotes: 'Sa Tagalog, mayroon tayong 5 pangunahing patinig (A, E, I, O, U). Ang Koreanong "ㅡ (eu)" ay kahalintulad ng tunog kapag nandidiri o walang nguso ("uhhh" na nakangiti). Ang "ㅓ (eo)" naman ay malalim na "o/a" tunog, hindi bilog ang nguso tulad ng Tagalog "O".',
            koreanExamples: [
              { korean: '아이', pronunciation: 'a-i', english: 'child / baby', filipino: 'bata / sanggol', explanation: 'Composed of ㅏ and ㅣ with silent initial ㅇ.' },
              { korean: '오이', pronunciation: 'o-i', english: 'cucumber', filipino: 'pipino', explanation: 'Composed of horizontal vowel ㅗ and vertical vowel ㅣ.' },
              { korean: '우유', pronunciation: 'u-yu', english: 'milk', filipino: 'gatas', explanation: 'Composed of ㅜ and ㅠ.' },
              { korean: '여우', pronunciation: 'yeo-u', english: 'fox', filipino: 'soro (fox)', explanation: 'Composed of ㅕ and ㅜ.' }
            ],
            vocabularyList: [
              { korean: '아이', romanization: 'a-i', english: 'Child', filipino: 'Bata', partOfSpeech: 'noun', exampleSentence: '아이가 웃어요.', exampleEnglish: 'The child smiles.' },
              { korean: '오이', romanization: 'o-i', english: 'Cucumber', filipino: 'Pipino', partOfSpeech: 'noun', exampleSentence: '오이가 싱싱해요.', exampleEnglish: 'The cucumber is fresh.' },
              { korean: '우유', romanization: 'u-yu', english: 'Milk', filipino: 'Gatas', partOfSpeech: 'noun', exampleSentence: '우유를 마셔요.', exampleEnglish: 'I drink milk.' },
              { korean: '이유', romanization: 'i-yu', english: 'Reason', filipino: 'Dahilan', partOfSpeech: 'noun', exampleSentence: '이유가 있어요.', exampleEnglish: 'There is a reason.' }
            ],
            grammarNotes: [
              {
                pattern: 'ㅇ + Vowel Syllable Rule',
                koreanName: '초성 자음 ㅇ의 음가 규칙',
                meaning: 'When a syllable starts with a vowel sound, the initial position (초성) must be filled with the silent circle letter ㅇ.',
                filipinoComparison: 'Walang patinig na lumulutang mag-isa sa Hangul. Laging may kasamang bilog (ㅇ) kapag walang nauunang katinig.',
                rules: [
                  'ㅇ in the initial position (초성) has ZERO sound value (pure silence).',
                  'If the vowel is vertical (ㅏ, ㅓ, ㅣ), ㅇ is placed to its left: 아, 어, 이.',
                  'If the vowel is horizontal (ㅗ, ㅜ, ㅡ), ㅇ is placed directly above: 오, 우, 으.'
                ],
                examples: [
                  { korean: '아', english: 'a (silent consonant + vowel a)' },
                  { korean: '오', english: 'o (silent consonant + vowel o)' }
                ],
                commonMistakes: [
                  'Writing just "ㅏ" without "아". In modern Korean orthography, a vowel alone is invalid; it must be written within a syllable block.'
                ]
              }
            ],
            interactiveExercises: [
              {
                id: 'ex-pre-a1-1-1',
                type: 'multiple-choice',
                question: 'Which Korean word means "milk"?',
                koreanPrompt: '우유',
                options: ['오이 (o-i)', '우유 (u-yu)', '아이 (a-i)', '여우 (yeo-u)'],
                correctAnswer: '우유 (u-yu)',
                explanation: '우유 (u-yu) is formed from ㅜ (u) and ㅠ (yu), meaning milk.'
              },
              {
                id: 'ex-pre-a1-1-2',
                type: 'fill-blank',
                question: 'What is the silent initial consonant used when a syllable begins with a vowel?',
                koreanPrompt: 'The circular letter: [?]',
                options: ['ㅁ', 'ㅇ', 'ㄴ', 'ㄹ'],
                correctAnswer: 'ㅇ',
                explanation: 'The letter ㅇ (ieung) serves as a silent placeholder when in the initial (초성) position.'
              },
              {
                id: 'ex-pre-a1-1-3',
                type: 'multiple-choice',
                question: 'How do you distinguish between ㅗ (o) and ㅜ (u)?',
                options: [
                  'ㅗ points upward and has rounded lips; ㅜ points downward with lips puckered',
                  'ㅗ is vertical; ㅜ is horizontal',
                  'ㅗ is silent; ㅜ makes an "r" sound',
                  'They are pronounced identically'
                ],
                correctAnswer: 'ㅗ points upward and has rounded lips; ㅜ points downward with lips puckered',
                explanation: 'ㅗ has the short stroke pointing UP (skyward), producing a clear rounded "o", while ㅜ points DOWN with pursed lips "u".'
              }
            ],
            comprehensionQuestions: [
              {
                id: 'cq-pre-a1-1-1',
                question: 'Why did King Sejong invent Hangul in 1443?',
                options: [
                  'To create an accessible, phonetic writing system for all people so they could express their thoughts easily',
                  'To eliminate all Chinese vocabulary from Korean language',
                  'To replace spoken Korean with a new royal dialect',
                  'For secret military communication'
                ],
                correctAnswerIndex: 0,
                explanation: 'King Sejong declared in the Hunminjeongeum that Chinese characters did not fit Korean speech, causing ordinary citizens to remain illiterate. He created 28 original letters so anyone could learn them within days.'
              }
            ],
            summary: 'You learned the 10 basic Korean vowels (ㅏ, ㅑ, ㅓ, ㅕ, ㅗ, ㅛ, ㅜ, ㅠ, ㅡ, ㅣ), their orientation (vertical vs horizontal), and how the silent initial consonant ㅇ is used to form legal syllable blocks like 아, 오, 우유.',
            homeworkPrompt: 'Write out all 10 basic vowels with initial ㅇ (아, 야, 어, 여, 오, 요, 우, 유, 으, 이) 5 times each on paper or the digital canvas, and practice saying "우유" and "아이" aloud.'
          },
          {
            id: 'lesson-pre-a1-2',
            unitId: 'unit-pre-a1-1',
            courseId: 'course-pre-a1',
            lessonNumber: 2,
            title: 'Compound & Combined Vowels (이중 모음 11자)',
            koreanTitle: '이중 모음 11자 (ㅐ, ㅒ, ㅔ, ㅖ, ㅘ, ㅙ, ㅚ, ㅝ, ㅞ, ㅟ, ㅢ)',
            objectives: [
              'Understand how compound vowels are constructed from basic vowels',
              'Distinguish between ㅐ (ae) and ㅔ (e) in modern pronunciation',
              'Pronounce the "w" glide vowels: ㅘ (wa), ㅝ (wo), ㅙ (wae), ㅞ (we), ㅚ (oe)',
              'Master the tricky pronunciation of ㅢ (ui) in various syllable positions'
            ],
            introduction: 'Once you know the basic vowels, you can easily read the 11 combined vowels! They are created by blending two vowels together or adding a "w" or "y" glide sound.',
            explanation: `Let's break down the 11 compound vowels:
1. **ㅐ (ae) & ㅔ (e)**:
   - ㅐ = ㅏ + ㅣ (mouth slightly wider, like 'apple')
   - ㅔ = ㅓ + ㅣ (mouth slightly more closed, like 'egg')
   *Note for modern Korean*: Native speakers in Seoul today pronounce ㅐ and ㅔ almost identically (like 'e' in 'pet'). Context clarifies the word!
2. **ㅒ (yae) & ㅖ (ye)**:
   - ㅒ = ㅑ + ㅣ (rarely used except in words like 얘기)
   - ㅖ = ㅕ + ㅣ (common in polite copula 예요, 네)
3. **The "W" Glides**:
   - ㅗ + ㅏ = **ㅘ (wa)** as in 와 (come/and)
   - ㅗ + ㅐ = **ㅙ (wae)** as in 왜 (why?)
   - ㅗ + ㅣ = **ㅚ (oe)** (pronounced like "weh" in modern Korean, e.g., 회사)
   - ㅜ + ㅓ = **ㅝ (wo)** as in 뭘 (what)
   - ㅜ + ㅔ = **ㅞ (we)** as in 웨딩 (wedding)
   - ㅜ + ㅣ = **ㅟ (wi)** as in 위 (above / stomach)
4. **The Unique Diphthong ㅢ (ui)**:
   - ㅡ + ㅣ = **ㅢ (ui)**. At the start of a word, pronounce as "eu-ee" (의사). When acting as the possessive particle, it sounds like "에 (e)"!`,
            filipinoNotes: 'Ang "왜 (wae)" ay nangangahulugang "Bakit?". Madalas mo itong maririnig sa mga K-Drama! Ang "와 (wa)" naman ay parang "Wow" o "Halika".',
            koreanExamples: [
              { korean: '왜', pronunciation: 'wae', english: 'Why?', filipino: 'Bakit?', explanation: 'Extremely common question word.' },
              { korean: '의사', pronunciation: 'ui-sa', english: 'Doctor', filipino: 'Doktor', explanation: 'Begins with the diphthong ㅢ.' },
              { korean: '회사', pronunciation: 'hoe-sa / hwe-sa', english: 'Company / Workplace', filipino: 'Kompanya', explanation: 'Uses compound vowel ㅚ.' },
              { korean: '위에', pronunciation: 'wi-e', english: 'On top of / Above', filipino: 'Sa ibabaw', explanation: 'Uses ㅟ (wi).' }
            ],
            vocabularyList: [
              { korean: '왜', romanization: 'wae', english: 'Why', filipino: 'Bakit', partOfSpeech: 'adverb', exampleSentence: '왜 그래요?', exampleEnglish: 'Why are you being like that?' },
              { korean: '의사', romanization: 'ui-sa', english: 'Medical doctor', filipino: 'Doktor', partOfSpeech: 'noun', exampleSentence: '의사 선생님이에요.', exampleEnglish: 'He is a medical doctor.' },
              { korean: '회의', romanization: 'hoe-ui', english: 'Meeting / Conference', filipino: 'Pagpupulong', partOfSpeech: 'noun', exampleSentence: '지금 회의 중이에요.', exampleEnglish: 'I am in a meeting right now.' },
              { korean: '시계', romanization: 'si-gye', english: 'Clock / Watch', filipino: 'Orasan', partOfSpeech: 'noun', exampleSentence: '시계를 봐요.', exampleEnglish: 'I look at the clock.' }
            ],
            grammarNotes: [
              {
                pattern: 'Pronunciation Rule for ㅢ',
                koreanName: '모음 ㅢ의 3가지 발음 규칙',
                meaning: 'The vowel ㅢ has three distinct standard pronunciations depending on its structural role in the word.',
                rules: [
                  '1. At word-initial position with ㅇ (e.g., 의자 chair, 의사 doctor): Pronounced clearly as [ui].',
                  '2. In non-initial syllables or when preceded by a consonant (e.g., 희망 hope, 회의 meeting): Pronounced as [i] (e.g., 희망 [히망]).',
                  '3. When functioning as the possessive particle -의 (of): Pronounced as [e] (e.g., 나의 친구 [나에 친구]).'
                ],
                examples: [
                  { korean: '의사', english: 'Doctor [ui-sa]' },
                  { korean: '희망', english: 'Hope [hi-mang]' },
                  { korean: '선생님의 책', english: "Teacher's book [seon-saeng-nim-e chaek]" }
                ],
                commonMistakes: [
                  'Trying to force a harsh "eu-ee" sound in non-initial syllables like 희망. It naturally flattens to [i].'
                ]
              }
            ],
            interactiveExercises: [
              {
                id: 'ex-pre-a1-2-1',
                type: 'multiple-choice',
                question: 'Which word means "Why?" in Korean?',
                options: ['왜 (wae)', '와 (wa)', '워 (wo)', '의 (ui)'],
                correctAnswer: '왜 (wae)',
                explanation: '왜 (wae) is the Korean interrogative adverb for "Why?".'
              },
              {
                id: 'ex-pre-a1-2-2',
                type: 'sentence-arrange',
                question: 'How do ㅗ and ㅏ combine to make "wa"?',
                correctAnswer: 'ㅗ + ㅏ = ㅘ',
                explanation: 'Horizontal vowel ㅗ links directly with vertical vowel ㅏ to produce the diphthong ㅘ (wa).'
              }
            ],
            comprehensionQuestions: [
              {
                id: 'cq-pre-a1-2-1',
                question: 'In modern Seoul Korean, how are ㅐ and ㅔ pronounced by most native speakers?',
                options: [
                  'Almost identically as an open "e" sound',
                  'One is silent and the other is loud',
                  'As "ah" and "oh"',
                  'As "w" and "y"'
                ],
                correctAnswerIndex: 0,
                explanation: 'Acoustic studies show young and adult Seoul speakers merge ㅐ and ㅔ into a single phonetic vowel [ɛ/e].'
              }
            ],
            summary: 'You mastered the 11 combined vowels including ㅐ, ㅔ, the "w" glides (ㅘ, ㅙ, ㅚ, ㅝ, ㅞ, ㅟ), and the 3 pronunciation rules for ㅢ.',
            homeworkPrompt: 'Listen to the audio for 의사 (ui-sa) and 회사 (hoe-sa) in the audio player and repeat 10 times.'
          }
        ]
      },
      {
        id: 'unit-pre-a1-2',
        courseId: 'course-pre-a1',
        unitNumber: 2,
        title: 'Consonants & Syllable Construction',
        koreanTitle: '제2단원: 한글 자음과 음절 조합',
        description: 'Master the 14 basic consonants, 5 double consonants, 4 aspirated consonants, and the mechanics of building Korean syllable blocks.',
        lessons: [
          {
            id: 'lesson-pre-a1-3',
            unitId: 'unit-pre-a1-2',
            courseId: 'course-pre-a1',
            lessonNumber: 3,
            title: 'Basic Consonants (기본 자음 14자)',
            koreanTitle: '기본 자음 14자 (ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅅ, ㅇ, ㅈ, ㅊ, ㅋ, ㅌ, ㅍ, ㅎ)',
            objectives: [
              'Understand how consonants mimic the vocal tract shapes (tongue, teeth, lips, throat)',
              'Learn the 14 basic consonants and their alphabetical names (기역, 니은, 디귿...)',
              'Recognize position-dependent sounds (e.g., ㄱ sounds like k/g, ㄹ sounds like r/l)',
              'Combine consonants with vowels to read 50+ basic words'
            ],
            introduction: 'Hangul consonants are anatomical diagrams! When you look at ㄱ, you are looking at a diagram of your tongue pressing against the soft palate in the back of your mouth. When you look at ㅁ, you are looking at your closed lips.',
            explanation: `Let's examine the 5 foundational consonant families:
1. **Molar sound (ㄱ)**: Tongue root blocks throat.
   - **ㄱ** (기역, g/k): Between vowels it sounds voiced like 'g'; at word start it sounds soft like an unvoiced 'k'.
   - **ㅋ** (키읔, k): Aspirated version of ㄱ, accompanied by a strong burst of air!
2. **Lingual sound (ㄴ)**: Tongue tip touches upper gums.
   - **ㄴ** (니은, n): Exactly like 'n' in 'nose'.
   - **ㄷ** (디귿, d/t): Tongue touches upper palate.
   - **ㅌ** (티읔, t): Strong aspirated 't'.
   - **ㄹ** (리을, r/l): Between vowels it is a tongue tap flap [ɾ] like Spanish single 'r' or American 'butter'. At the end of a syllable, it sounds like clear [l].
3. **Labial sound (ㅁ)**: Shape of the two lips.
   - **ㅁ** (미음, m): Clean 'm' sound.
   - **ㅂ** (비읍, b/p): Lips close and release softly.
   - **ㅍ** (피읗, p): Strong burst of air like 'p' in 'park'.
4. **Dental sound (ㅅ)**: Shape of the teeth.
   - **ㅅ** (시옷, s): Soft 's'. Before 'ㅣ' (i) or 'y' vowels, it softens to 'sh' (e.g., 시간 = shi-gan).
   - **ㅈ** (지읒, j): Soft 'j/ch'.
   - **ㅊ** (치읓, ch): Aspirated 'ch'.
5. **Throat sound (ㅇ, ㅎ)**: Shape of the open throat.
   - **ㅇ** (이응): Silent at start of syllable; produces "ng" at the end of a syllable!
   - **ㅎ** (히읗, h): Like English 'h'.`,
            filipinoNotes: 'Ang "ㄹ" sa Korean ay katulad ng "R" sa Tagalog kapag nasa gitna ng salita (tulad ng "araw"), pero nagiging "L" kapag nasa dulo ng pantig (tulad ng "mahal").',
            koreanExamples: [
              { korean: '가구', pronunciation: 'ga-gu', english: 'Furniture', filipino: 'Muwebles', explanation: 'Initial ㄱ is soft, medial ㄱ is voiced.' },
              { korean: '나라', pronunciation: 'na-ra', english: 'Country / Nation', filipino: 'Bansa', explanation: 'Uses ㄴ and flapped ㄹ.' },
              { korean: '모자', pronunciation: 'mo-ja', english: 'Hat / Cap', filipino: 'Sombrero', explanation: 'Uses ㅁ and ㅈ.' },
              { korean: '바지', pronunciation: 'ba-ji', english: 'Pants / Trousers', filipino: 'Pantalon', explanation: 'Uses ㅂ and ㅈ.' }
            ],
            vocabularyList: [
              { korean: '가구', romanization: 'ga-gu', english: 'Furniture', filipino: 'Muwebles', partOfSpeech: 'noun', exampleSentence: '새 가구를 샀어요.', exampleEnglish: 'I bought new furniture.' },
              { korean: '나무', romanization: 'na-mu', english: 'Tree', filipino: 'Puno', partOfSpeech: 'noun', exampleSentence: '나무가 커요.', exampleEnglish: 'The tree is tall.' },
              { korean: '다리', romanization: 'da-ri', english: 'Leg / Bridge', filipino: 'Binti / Tulay', partOfSpeech: 'noun', exampleSentence: '다리가 아파요.', exampleEnglish: 'My leg hurts.' },
              { korean: '모자', romanization: 'mo-ja', english: 'Hat', filipino: 'Sombrero', partOfSpeech: 'noun', exampleSentence: '모자를 써요.', exampleEnglish: 'I wear a hat.' }
            ],
            grammarNotes: [
              {
                pattern: 'The 3-Way Korean Consonant Distinction',
                koreanName: '평음, 격음, 경음 삼지적 대립',
                meaning: 'Korean consonants are unique in the world because they contrast in three ways: Plain (평음), Aspirated (격음), and Tense (경음).',
                rules: [
                  'Plain (ㄱ, ㄷ, ㅂ, ㅅ, ㅈ): Relaxed muscles, slight puff of air.',
                  'Aspirated (ㅋ, ㅌ, ㅍ, ㅊ): Strong burst of air (if you hold a tissue before your mouth, it flies away).',
                  'Tense (ㄲ, ㄸ, ㅃ, ㅆ, ㅉ): Glottal tension, zero air release, high pitch.'
                ],
                examples: [
                  { korean: '달', english: 'Moon (Plain ㄷ)' },
                  { korean: '탈', english: 'Mask (Aspirated ㅌ)' },
                  { korean: '딸', english: 'Daughter (Tense ㄸ)' }
                ],
                commonMistakes: [
                  'Confusing plain ㄱ with aspirated ㅋ. In English, initial "k" is heavily aspirated; in Korean, plain ㄱ is gentle and un-aspirated.'
                ]
              }
            ],
            interactiveExercises: [
              {
                id: 'ex-pre-a1-3-1',
                type: 'multiple-choice',
                question: 'Which consonant represents the tongue touching the upper gums?',
                options: ['ㄴ (n)', 'ㅁ (m)', 'ㅇ (ng)', 'ㅅ (s)'],
                correctAnswer: 'ㄴ (n)',
                explanation: 'ㄴ depicts the shape of the tongue curling up to touch the alveolar ridge (upper gums).'
              },
              {
                id: 'ex-pre-a1-3-2',
                type: 'multiple-choice',
                question: 'What is the word for "Tree" in Korean?',
                options: ['나무 (na-mu)', '다리 (da-ri)', '바지 (ba-ji)', '치마 (chi-ma)'],
                correctAnswer: '나무 (na-mu)',
                explanation: '나무 (na-mu) is formed from ㄴ+ㅏ and ㅁ+ㅜ.'
              }
            ],
            comprehensionQuestions: [
              {
                id: 'cq-pre-a1-3-1',
                question: 'When the letter ㅅ is followed by the vowel ㅣ (i), what phonetic change happens?',
                options: [
                  'It softens from "s" to "sh" (palatalization)',
                  'It becomes completely silent',
                  'It changes to a "z" sound',
                  'It becomes an "f" sound'
                ],
                correctAnswerIndex: 0,
                explanation: 'In Korean phonology, ㅅ + ㅣ becomes [ʃi] ("shi"), as seen in 시간 [shigan] (time).'
              }
            ],
            summary: 'You learned the 14 basic consonants, their phonetic classifications (molar, lingual, labial, dental, throat), and combined them with vowels to read common Korean words.',
            homeworkPrompt: 'Practice reading and writing: 가구, 나무, 다리, 라디오, 모자, 바지, 사자.'
          },
          {
            id: 'lesson-pre-a1-4',
            unitId: 'unit-pre-a1-2',
            courseId: 'course-pre-a1',
            lessonNumber: 4,
            title: 'Double Consonants & Syllable Blocks (쌍자음과 음절 조합)',
            koreanTitle: '쌍자음 (ㄲ, ㄸ, ㅃ, ㅆ, ㅉ) 및 음절 조합 원리',
            objectives: [
              'Master the 5 tense double consonants (ㄲ, ㄸ, ㅃ, ㅆ, ㅉ)',
              'Build 2-part and 3-part syllable blocks correctly',
              'Trace strokes in correct order: Top to bottom, left to right',
              'Distinguish between sound pairs: 방 (room) vs 빵 (bread)'
            ],
            introduction: 'Double consonants (쌍자음) look like two identical consonants side by side. They are NOT pronounced twice; rather, they are pronounced with tight vocal cords and zero breath release. This tension changes meanings completely in Korean!',
            explanation: `The 5 Double Consonants (쌍자음):
1. **ㄲ (ssang-giyeok)**: Like the 'k' in 'skate' (high, sharp, no air).
2. **ㄸ (ssang-digeut)**: Like the 't' in 'stop'.
3. **ㅃ (ssang-bieup)**: Like the 'p' in 'spin'.
4. **ㅆ (ssang-siot)**: A hiss-like intense 'ss'.
5. **ㅉ (ssang-jieut)**: High-pitch tense 'jj'.

**Critical Contrast Drill**:
- 방 (bang) = Room
- 빵 (ppang) = Bread! (Tense ㅃ)
- 달 (dal) = Moon
- 딸 (ttal) = Daughter! (Tense ㄸ)

**Syllable Architecture**:
Every Korean syllable fits into an invisible square box:
1. **Consonant + Vertical Vowel**: Consonant on left, vowel on right (e.g., 가, 나, 다).
2. **Consonant + Horizontal Vowel**: Consonant on top, vowel below (e.g., 고, 노, 도).
3. **With Final Consonant (Batchim)**: Consonant + Vowel on top, Batchim on the bottom floor (e.g., 강, 눈, 달).`,
            filipinoNotes: 'Sa Tagalog, walang eksaktong katumbas ng tense consonants. Isipin mong sinasabi mo ang "p" sa salitang "pispis" nang may diin sa lalamunan pero walang hangin na lumalabas sa bibig.',
            koreanExamples: [
              { korean: '빵', pronunciation: 'ppang', english: 'Bread', filipino: 'Tinapay', explanation: 'Tense double consonant ㅃ with vowel ㅏ and final batchim ㅇ.' },
              { korean: '아빠', pronunciation: 'a-ppa', english: 'Dad / Daddy', filipino: 'Tatay / Papa', explanation: 'Informal affectionate term for father.' },
              { korean: '싸다', pronunciation: 'ssa-da', english: 'To be cheap / inexpensive', filipino: 'Mura (hindi mahal)', explanation: 'Notice contrast with 사다 (to buy).' },
              { korean: '찌개', pronunciation: 'jji-gae', english: 'Korean stew', filipino: 'Nilagang sabaw / Sinigang-style stew', explanation: 'Famous Korean hotpot stew.' }
            ],
            vocabularyList: [
              { korean: '빵', romanization: 'ppang', english: 'Bread', filipino: 'Tinapay', partOfSpeech: 'noun', exampleSentence: '빵을 먹어요.', exampleEnglish: 'I eat bread.' },
              { korean: '아빠', romanization: 'a-ppa', english: 'Dad', filipino: 'Tatay', partOfSpeech: 'noun', exampleSentence: '아빠가 와요.', exampleEnglish: 'Dad is coming.' },
              { korean: '토끼', romanization: 'to-kki', english: 'Rabbit', filipino: 'Kuneho', partOfSpeech: 'noun', exampleSentence: '토끼가 귀여워요.', exampleEnglish: 'The rabbit is cute.' },
              { korean: '코끼리', romanization: 'ko-kki-ri', english: 'Elephant', filipino: 'Elepante', partOfSpeech: 'noun', exampleSentence: '코끼리가 커요.', exampleEnglish: 'The elephant is big.' }
            ],
            grammarNotes: [
              {
                pattern: 'Stroke Order Fundamental Rule',
                koreanName: '한글 획순의 기본 원칙',
                meaning: 'Standard stroke order ensures balance, beauty, and rapid handwriting legibility.',
                rules: [
                  'Rule 1: Always write from Top to Bottom (위에서 아래로).',
                  'Rule 2: Always write from Left to Right (왼쪽에서 오른쪽으로).',
                  'Rule 3: Syllable order is always Initial (초성) -> Medial (중성) -> Final Batchim (종성).'
                ],
                examples: [
                  { korean: '한', english: 'ㅎ (top) -> ㅏ (middle right) -> ㄴ (bottom foundation)' }
                ],
                commonMistakes: [
                  'Writing the bottom Batchim before the vowel. The foundation is always drawn last!'
                ]
              }
            ],
            interactiveExercises: [
              {
                id: 'ex-pre-a1-4-1',
                type: 'multiple-choice',
                question: 'Which word means "Bread" in Korean?',
                options: ['방 (bang)', '빵 (ppang)', '밤 (bam)', '발 (bal)'],
                correctAnswer: '빵 (ppang)',
                explanation: '빵 (ppang) uses the double consonant ㅃ and means bread.'
              },
              {
                id: 'ex-pre-a1-4-2',
                type: 'multiple-choice',
                question: 'In which order are components written in a 3-part syllable block?',
                options: [
                  'Initial Consonant -> Medial Vowel -> Final Consonant (Batchim)',
                  'Final Consonant -> Initial Consonant -> Vowel',
                  'Vowel first, then consonants',
                  'Any order is acceptable'
                ],
                correctAnswer: 'Initial Consonant -> Medial Vowel -> Final Consonant (Batchim)',
                explanation: 'Hangul is systematically written from Initial (초성) to Medial (중성) to Final Batchim (종성).'
              }
            ],
            comprehensionQuestions: [
              {
                id: 'cq-pre-a1-4-1',
                question: 'If you want to say "Dad", which Korean word do you use?',
                options: ['아빠 (a-ppa)', '오빠 (o-ppa)', '엄마 (eom-ma)', '누나 (nu-na)'],
                correctAnswerIndex: 0,
                explanation: '아빠 (a-ppa) is "Dad". (오빠 means older brother used by females; 엄마 means mom).'
              }
            ],
            summary: 'You mastered the 5 double tense consonants (ㄲ, ㄸ, ㅃ, ㅆ, ㅉ) and the geometric principles of constructing 2-part and 3-part Korean syllable blocks.',
            homeworkPrompt: 'Practice writing the word 한글 (Han-geul) 10 times in proper stroke order.'
          }
        ]
      },
      {
        id: 'unit-pre-a1-3',
        courseId: 'course-pre-a1',
        unitNumber: 3,
        title: 'Batchim (받침) Rules & Sound Shifts',
        koreanTitle: '제3단원: 받침의 7대 대표음과 음운 변화',
        description: 'Understand final consonants (받침), the 7 representative sounds, and fundamental phonetic changes including liaison (연음 법칙).',
        lessons: [
          {
            id: 'lesson-pre-a1-5',
            unitId: 'unit-pre-a1-3',
            courseId: 'course-pre-a1',
            lessonNumber: 5,
            title: 'The 7 Representative Batchim Sounds (7종성 원리)',
            koreanTitle: '받침의 7대 대표음 (ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅇ)',
            objectives: [
              'Understand what Batchim (받침, "supporting floor") is',
              'Learn why 16 different written consonants collapse into only 7 phonetic sounds at syllable end',
              'Pronounce unreleased final stops [k̚], [t̚], [p̚]',
              'Distinguish between the ㄷ-representative family (ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ -> [t̚])'
            ],
            introduction: 'Batchim (받침) literally means "support" or "prop". In Hangul, it refers to any consonant located at the very bottom of a syllable block. While there are many consonants that can be written in Batchim position, when pronounced by themselves, your mouth simplifies them into just 7 representative sounds!',
            explanation: `The 7 Representative Final Consonant Sounds (7종성):
1. **[ㄱ] Family**: ㄱ, ㅋ, ㄲ
   - All sound like an unreleased [k̚] (tongue closes the throat, no puff of air).
   - Examples: 국 (soup) [국], 밖 (outside) [박], 부엌 (kitchen) [부억].
2. **[ㄴ] Family**: ㄴ
   - Sounds like clean final [n].
   - Examples: 문 (door), 산 (mountain).
3. **[ㄷ] Family**: ㄷ, ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ
   - ALL collapse into an unreleased [t̚]! (Tongue seals against upper teeth).
   - Examples: 옷 (clothes) [옫], 낮 (daytime) [낟], 꽃 (flower) [꼳], 끝 (end) [끋], 있다 (to exist) [읻따].
4. **[ㄹ] Family**: ㄹ
   - Sounds like a soft, liquid [l].
   - Examples: 물 (water), 달 (moon), 말 (word/horse).
5. **[ㅁ] Family**: ㅁ
   - Sounds like a closed-lip [m].
   - Examples: 봄 (spring), 밤 (night/chestnut).
6. **[ㅂ] Family**: ㅂ, ㅍ
   - Both collapse into an unreleased [p̚] (lips seal, no release).
   - Examples: 밥 (rice/meal) [밥], 잎 (leaf) [입].
7. **[ㅇ] Family**: ㅇ
   - Sounds like the English "ng" in 'sing'.
   - Examples: 강 (river), 방 (room), 사랑 (love).`,
            filipinoNotes: 'Sa Tagalog, mayroon tayong "ng" sa dulo tulad ng "ilong" o "hangin". Eksaktong iyan ang tunog ng "ㅇ" sa ilalim ng pantig (Batchim). Huwag malilito: sa itaas tahimik ang "ㅇ", pero sa ilalim ito ay "NG"!',
            koreanExamples: [
              { korean: '한국', pronunciation: 'han-guk', english: 'Korea', filipino: 'Korea', explanation: 'ㄴ in first syllable, ㄱ in second syllable.' },
              { korean: '옷', pronunciation: 'ot [옫]', english: 'Clothes', filipino: 'Damit', explanation: 'Written with ㅅ, but pronounced as representative [ㄷ].' },
              { korean: '물', pronunciation: 'mul', english: 'Water', filipino: 'Tubig', explanation: 'ㄹ batchim sounds like liquid [l].' },
              { korean: '꽃', pronunciation: 'kkot [꼳]', english: 'Flower', filipino: 'Bulaklak', explanation: 'Written with ㅊ, pronounced as [ㄷ].' }
            ],
            vocabularyList: [
              { korean: '한국', romanization: 'han-guk', english: 'Korea', filipino: 'Korea', partOfSpeech: 'noun', exampleSentence: '한국에 가요.', exampleEnglish: 'I go to Korea.' },
              { korean: '사람', romanization: 'sa-ram', english: 'Person / Human', filipino: 'Tao', partOfSpeech: 'noun', exampleSentence: '좋은 사람이에요.', exampleEnglish: 'He is a good person.' },
              { korean: '물', romanization: 'mul', english: 'Water', filipino: 'Tubig', partOfSpeech: 'noun', exampleSentence: '물을 마셔요.', exampleEnglish: 'I drink water.' },
              { korean: '밥', romanization: 'bap', english: 'Cooked rice / Meal', filipino: 'Kanin / Pagkain', partOfSpeech: 'noun', exampleSentence: '밥을 먹어요.', exampleEnglish: 'I eat rice/meal.' }
            ],
            grammarNotes: [
              {
                pattern: 'The Unreleased Stop Concept',
                koreanName: '불파음화 원리',
                meaning: 'Final stops [k̚], [t̚], [p̚] in Korean are not released with an audible puff of breath.',
                rules: [
                  'Do NOT say "oh-teu" for 옷. Stop your breath with your tongue at your teeth: [옫].',
                  'Do NOT say "bah-peu" for 밥. Close your lips firmly and hold: [밥].'
                ],
                examples: [
                  { korean: '옷', english: 'Clothes [ot]' },
                  { korean: '밥', english: 'Rice [bap]' }
                ],
                commonMistakes: [
                  'Adding an extra "eu" vowel to final consonants (e.g., pronouncing 한국 as "han-goo-koo"). In Korean it is crisp and unreleased!'
                ]
              }
            ],
            interactiveExercises: [
              {
                id: 'ex-pre-a1-5-1',
                type: 'multiple-choice',
                question: 'What is the representative pronunciation of the word 옷 (clothes)?',
                options: ['[옫] (ot)', '[옷] (os)', '[옥] (ok)', '[옴] (om)'],
                correctAnswer: '[옫] (ot)',
                explanation: 'In Batchim position, ㅅ belongs to the ㄷ-representative family, pronounced as [t̚].'
              },
              {
                id: 'ex-pre-a1-5-2',
                type: 'multiple-choice',
                question: 'Which of the following has an unreleased [p̚] Batchim sound?',
                options: ['밥 (bap)', '방 (bang)', '발 (bal)', '밤 (bam)'],
                correctAnswer: '밥 (bap)',
                explanation: 'ㅂ at the bottom of 밥 produces the unreleased [p̚] sound.'
              }
            ],
            comprehensionQuestions: [
              {
                id: 'cq-pre-a1-5-1',
                question: 'How many phonetic representative sounds exist in Korean Batchim pronunciation?',
                options: ['7 representative sounds', '14 representative sounds', '28 representative sounds', '3 representative sounds'],
                correctAnswerIndex: 0,
                explanation: 'The 7 representative Batchim sounds are: ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅇ.'
              }
            ],
            summary: 'You discovered Batchim (final consonants) and learned that regardless of how they are spelled, isolated final consonants resolve into one of 7 representative sounds: ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅇ.',
            homeworkPrompt: 'Categorize the following words by their representative sound: 꽃, 밖, 입, 산, 물, 옷, 공.'
          },
          {
            id: 'lesson-pre-a1-6',
            unitId: 'unit-pre-a1-3',
            courseId: 'course-pre-a1',
            lessonNumber: 6,
            title: 'Liaison & Sound Flow (연음 법칙)',
            koreanTitle: '연음 법칙 (Liaison)과 자연스러운 발음',
            objectives: [
              'Master Liaison (연음 법칙): the fundamental rule of fluid Korean speech',
              'Learn how a final consonant floats into the next empty syllable (ㅇ)',
              'Practice real-life phonetic shifts: 한국어 [한구거], 음악 [으막], 할아버지 [하라버지]'
            ],
            introduction: 'Have you ever listened to native Koreans and felt like words blur into each other smoothly? That is because of the Liaison Rule (연음 법칙)! When a syllable with a Batchim is followed by a syllable starting with silent ㅇ, the Batchim naturally migrates into the empty spot.',
            explanation: `The Liaison Rule (연음 법칙):
When a syllable ending in a Batchim is followed by a syllable beginning with the silent placeholder consonant 'ㅇ', the Batchim sound slides over to become the initial consonant of the second syllable!

**Formula**:
[Batchim] + [ㅇ + Vowel] -> [Empty] + [Batchim Sound + Vowel]

**Real Examples in Context**:
1. **한국어 (Korean language)**:
   - Written: 한-국-어
   - Pronounced: **[한구거]** (han-gu-geo)
   - Why? The ㄱ in 국 slides into the empty position of 어!
2. **음악 (Music)**:
   - Written: 음-악
   - Pronounced: **[으막]** (eu-mak)
   - Why? The ㅁ in 음 slides into the empty spot of 악!
3. **할아버지 (Grandfather)**:
   - Written: 할-아-버-지
   - Pronounced: **[하라버지]** (ha-ra-beo-ji)
   - Why? The ㄹ in 할 slides over to become a flapped 'r' in 아!
4. **집에 (At/To home)**:
   - Written: 집-에
   - Pronounced: **[지베]** (ji-be)
   - Why? The ㅂ in 집 slides into 에!`,
            filipinoNotes: 'Tulad ito ng liaison sa wikang Pranses o sa Tagalog kapag nagiging mabilis ang pagsasalita: "anong oras" -> "anong-oras". Sa Korean, mandatory at natural ito.',
            koreanExamples: [
              { korean: '한국어', pronunciation: '[한구거] han-gu-geo', english: 'Korean language', filipino: 'Wikang Koreano', explanation: 'ㄱ carries over into 어.' },
              { korean: '음악', pronunciation: '[으막] eu-mak', english: 'Music', filipino: 'Musika', explanation: 'ㅁ carries over into 악.' },
              { korean: '이름이', pronunciation: '[이르미] i-reu-mi', english: 'Name (with subject marker)', filipino: 'Pangalan (paksa)', explanation: 'ㅁ in 름 carries over into 이.' },
              { korean: '있어요', pronunciation: '[이써요] i-sseo-yo', english: 'There is / I have', filipino: 'Mayroon / Meron', explanation: 'Double consonant ㅆ carries over as tense [써].' }
            ],
            vocabularyList: [
              { korean: '한국어', romanization: 'han-gu-geo', english: 'Korean language', filipino: 'Wikang Koreano', partOfSpeech: 'noun', exampleSentence: '한국어를 배워요.', exampleEnglish: 'I learn Korean.' },
              { korean: '음악', romanization: 'eu-mak', english: 'Music', filipino: 'Musika', partOfSpeech: 'noun', exampleSentence: '음악을 들어요.', exampleEnglish: 'I listen to music.' },
              { korean: '이름', romanization: 'i-reum', english: 'Name', filipino: 'Pangalan', partOfSpeech: 'noun', exampleSentence: '이름이 뭐예요?', exampleEnglish: 'What is your name?' },
              { korean: '선생님', romanization: 'seon-saeng-nim', english: 'Teacher', filipino: 'Guro / Propesor', partOfSpeech: 'noun', exampleSentence: '선생님, 안녕하세요!', exampleEnglish: 'Hello, teacher!' }
            ],
            grammarNotes: [
              {
                pattern: 'Exception: The Letter ㅇ Does NOT Float',
                koreanName: '받침 ㅇ의 불이동 규칙',
                meaning: 'When the Batchim is ㅇ (the "ng" sound), it NEVER floats to the next syllable!',
                rules: [
                  'Example: 종이 (paper) is pronounced [종이] (jong-i), NEVER [조기].',
                  'The "ng" sound stays locked in the bottom floor of its syllable.'
                ],
                examples: [
                  { korean: '종이', english: 'Paper [jong-i]' },
                  { korean: '강아지', english: 'Puppy [gang-a-ji]' }
                ],
                commonMistakes: [
                  'Trying to pronounce 종이 as "조기". Remember that only consonants with movable tongue closures float.'
                ]
              }
            ],
            interactiveExercises: [
              {
                id: 'ex-pre-a1-6-1',
                type: 'multiple-choice',
                question: 'How is the word 한국어 (Korean language) naturally pronounced?',
                options: ['[한구거] (han-gu-geo)', '[한국-어] (han-guk-eo with pause)', '[한고거] (han-go-geo)', '[하누거] (ha-nu-geo)'],
                correctAnswer: '[한구거] (han-gu-geo)',
                explanation: 'Due to liaison (연음), the final consonant ㄱ slides into the empty initial ㅇ of 어.'
              },
              {
                id: 'ex-pre-a1-6-2',
                type: 'multiple-choice',
                question: 'How is 이름이 (Name + subject particle) pronounced?',
                options: ['[이르미] (i-reu-mi)', '[이름이] (i-reum-i)', '[이르이] (i-reu-i)', '[이리미] (i-ri-mi)'],
                correctAnswer: '[이르미] (i-reu-mi)',
                explanation: 'The ㅁ in 름 floats into the silent ㅇ of 이, sounding like [이르미].'
              }
            ],
            comprehensionQuestions: [
              {
                id: 'cq-pre-a1-6-1',
                question: 'What happens when a syllable ending in Batchim is followed by a syllable starting with silent ㅇ?',
                options: [
                  'The Batchim moves to the initial position of the following syllable',
                  'The following vowel is deleted',
                  'The Batchim becomes silent',
                  'A pause must be inserted between the words'
                ],
                correctAnswerIndex: 0,
                explanation: 'This is the definition of liaison (연음 법칙) in Korean.'
              }
            ],
            summary: 'You mastered the Liaison Rule (연음 법칙), making your spoken Korean sound natural, fluid, and native-like.',
            homeworkPrompt: 'Read aloud: 한국어 [한구거], 음악 [으막], 책을 [채글], 집에 [지베]. Record your voice in the Speaking Lab.'
          }
        ]
      },
      {
        id: 'unit-pre-a1-4',
        courseId: 'course-pre-a1',
        unitNumber: 4,
        title: 'Essential Greetings, Self-Introduction & Numbers',
        koreanTitle: '제4단원: 기본 인사, 자기소개 및 한국어 숫자',
        description: 'Polite academic greetings, introducing yourself, Sino-Korean vs Native Korean numbers, and Korean classroom commands.',
        lessons: [
          {
            id: 'lesson-pre-a1-7',
            unitId: 'unit-pre-a1-4',
            courseId: 'course-pre-a1',
            lessonNumber: 7,
            title: 'Korean Polite Greetings (인사말과 예절)',
            koreanTitle: '안녕하세요 & 감사합니다 (Polite Classroom Greetings)',
            objectives: [
              'Use formal and polite standard greetings confidently',
              'Understand the cultural concept of bow (절/인사) and hierarchy in speech',
              'Distinguish between 안녕히 계세요 (Stay in peace) and 안녕히 가세요 (Go in peace)'
            ],
            introduction: 'Greeting someone in Korean is not just exchanging words—it is showing mutual respect and social harmony. The most important phrase in Korean is 안녕하세요 (an-nyeong-ha-se-yo), which literally translates to "Are you at peace?"',
            explanation: `Core Polite Korean Greetings:
1. **안녕하세요? (an-nyeong-ha-se-yo)**:
   - Meaning: "Hello / Good morning / How are you?"
   - Level: 존댓말 (Polite formal standard). Used with teachers, strangers, elders, and colleagues.
2. **감사합니다 / 고맙습니다 (gam-sa-ham-ni-da / go-map-seum-ni-da)**:
   - Meaning: "Thank you."
   - 감사합니다 comes from Sino-Korean roots (感謝) and is formal and universal.
3. **죄송합니다 / 미안합니다 (joe-song-ham-ni-da / mi-an-ham-ni-da)**:
   - Meaning: "I am sorry / Excuse me."
4. **The Two Farewell Phrases (VERY IMPORTANT)**:
   - **안녕히 가세요 (an-nyeong-hi ga-se-yo)**: Said to someone who is LEAVING. (가다 = to go; "Please go peacefully!").
   - **안녕히 계세요 (an-nyeong-hi gye-se-yo)**: Said to someone who is STAYING when YOU are leaving. (계시다 = honorific to stay; "Please stay peacefully!").`,
            filipinoNotes: 'Sa Pilipinas, nagmamano tayo o nagsasabi ng "po" at "opo". Sa Korea, ang pagyuko (bow) habang nagsasabing "안녕하세요" ay ang pinakapangunahing tanda ng paggalang.',
            koreanExamples: [
              { korean: '안녕하세요, 선생님!', pronunciation: 'an-nyeong-ha-se-yo, seon-saeng-nim', english: 'Hello, teacher!', filipino: 'Magandang araw po, guro!', explanation: 'Standard respectful student-teacher greeting.' },
              { korean: '감사합니다.', pronunciation: 'gam-sa-ham-ni-da', english: 'Thank you.', filipino: 'Salamat po.', explanation: 'Formal gratitude.' },
              { korean: '안녕히 가세요.', pronunciation: 'an-nyeong-hi ga-se-yo', english: 'Goodbye (to one leaving).', filipino: 'Ingat po sa pag-alis.', explanation: 'Said when the other person departs.' },
              { korean: '안녕히 계세요.', pronunciation: 'an-nyeong-hi gye-se-yo', english: 'Goodbye (to one staying).', filipino: 'Maiwan na po kayo.', explanation: 'Said when you depart and the host stays.' }
            ],
            vocabularyList: [
              { korean: '안녕하세요', romanization: 'an-nyeong-ha-se-yo', english: 'Hello / Good day', filipino: 'Kumusta / Magandang araw', partOfSpeech: 'expression', exampleSentence: '선생님, 안녕하세요!', exampleEnglish: 'Hello, teacher!' },
              { korean: '감사합니다', romanization: 'gam-sa-ham-ni-da', english: 'Thank you', filipino: 'Salamat po', partOfSpeech: 'expression', exampleSentence: '도와주셔서 감사합니다.', exampleEnglish: 'Thank you for helping.' },
              { korean: '죄송합니다', romanization: 'joe-song-ham-ni-da', english: 'I am sorry', filipino: 'Patawad po', partOfSpeech: 'expression', exampleSentence: '늦어서 죄송합니다.', exampleEnglish: 'I am sorry for being late.' },
              { korean: '네 / 아니요', romanization: 'ne / a-ni-yo', english: 'Yes / No', filipino: 'Opo / Hindi po', partOfSpeech: 'expression', exampleSentence: '네, 알겠습니다.', exampleEnglish: 'Yes, I understand.' }
            ],
            grammarNotes: [
              {
                pattern: 'The Difference: 가세요 vs 계세요',
                koreanName: '가세요와 계세요의 구별',
                meaning: 'Distinguishing farewell phrases based on who is leaving vs who is staying.',
                rules: [
                  'If the other person walks away -> 안녕히 가세요 (가 = Go).',
                  'If you walk away and they stay in the room/office -> 안녕히 계세요 (계 = Stay).'
                ],
                examples: [
                  { korean: 'Student leaves classroom: "선생님, 안녕히 계세요!"', english: 'Goodbye teacher (stay peacefully)!' },
                  { korean: 'Teacher replies: "민지 씨, 안녕히 가세요!"', english: 'Goodbye Min-ji (go peacefully)!' }
                ],
                commonMistakes: [
                  'Saying 안녕히 가세요 to a store clerk when leaving their shop. The clerk is STAYING, so you must say 안녕히 계세요!'
                ]
              }
            ],
            interactiveExercises: [
              {
                id: 'ex-pre-a1-7-1',
                type: 'multiple-choice',
                question: 'You finish your Korean lesson and leave the teacher’s office. What do you say to your teacher who is staying?',
                options: ['안녕히 계세요 (an-nyeong-hi gye-se-yo)', '안녕히 가세요 (an-nyeong-hi ga-se-yo)', '죄송합니다 (joe-song-ham-ni-da)', '아니요 (a-ni-yo)'],
                correctAnswer: '안녕히 계세요 (an-nyeong-hi gye-se-yo)',
                explanation: 'Since the teacher is staying in the office, you say 안녕히 계세요 (stay peacefully).'
              },
              {
                id: 'ex-pre-a1-7-2',
                type: 'multiple-choice',
                question: 'What is the polite Korean word for "Yes"?',
                options: ['네 (ne)', '아니요 (a-ni-yo)', '왜 (wae)', '뭐 (mwo)'],
                correctAnswer: '네 (ne)',
                explanation: '네 (ne) or 예 (ye) is the polite standard way to say "Yes".'
              }
            ],
            comprehensionQuestions: [
              {
                id: 'cq-pre-a1-7-1',
                question: 'What does "안녕하세요" literally mean in Korean cultural etymology?',
                options: [
                  'Are you in peace / health?',
                  'How is the weather today?',
                  'Have you eaten rice?',
                  'Where are you going?'
                ],
                correctAnswerIndex: 0,
                explanation: '안녕 (安寧) means peace, tranquility, and wellness.'
              }
            ],
            summary: 'You learned the core polite greetings of Korean society: 안녕하세요, 감사합니다, 죄송합니다, and the crucial distinction between 안녕히 가세요 and 안녕히 계세요.',
            homeworkPrompt: 'Roleplay with the AI Korean Teacher: greet the teacher, thank them for class, and say goodbye appropriately when leaving the classroom.'
          },
          {
            id: 'lesson-pre-a1-8',
            unitId: 'unit-pre-a1-4',
            courseId: 'course-pre-a1',
            lessonNumber: 8,
            title: 'Self-Introduction & Polite Copula (저는 ...이에요/예요)',
            koreanTitle: '제8강: 자기소개와 이에요/예요',
            objectives: [
              'Introduce your name and nationality proudly in Korean',
              'Use the polite topic particle 은/는 correctly',
              'Conjugate the polite identification copula 이에요 / 예요 based on Batchim'
            ],
            introduction: 'Being able to introduce yourself is your first major milestone as a Korean speaker. In this lesson, you will learn how to say: "Hello, my name is [Name]. I am a student. Nice to meet you!"',
            explanation: `The Self-Introduction Template:
1. **Greetings**:
   - 안녕하세요? (Hello!)
   - 만나서 반갑습니다! (Nice to meet you!)
2. **Stating Your Name**:
   - 저는 [Name]이에요/예요.
   - Example: 저는 민지예요. (I am Min-ji).
   - Example: 저는 케빈이에요. (I am Kevin).
3. **The Copula Rule (이에요 vs 예요)**:
   - "To be" (am/is/are) in polite speech:
   - If the noun ends in a **Batchim (Consonant)** -> attach **이에요** (e.g., 케빈 + 이에요 = 케빈이에요).
   - If the noun ends in a **Vowel (No Batchim)** -> attach **예요** (e.g., 민지 + 예요 = 민지예요).
4. **Stating Nationality**:
   - Country Name + 사람 (person):
   - 한국 사람이에요 (I am Korean).
   - 필리핀 사람이에요 (I am Filipino).
   - 미국 사람이에요 (I am American).
   - 프랑스 사람이에요 (I am French).`,
            filipinoNotes: 'Sa Tagalog: "Ako po si Min-ji. Ako ay estudyante." Ang "저는" ay katumbas ng "Ako naman...", at ang "이에요/예요" ay ang "ay / si".',
            koreanExamples: [
              { korean: '저는 민지예요.', pronunciation: 'jeo-neun min-ji-ye-yo', english: 'I am Min-ji.', filipino: 'Ako po si Min-ji.', explanation: '민지 ends in vowel ㅣ, so 예요 is attached.' },
              { korean: '저는 학생이에요.', pronunciation: 'jeo-neun hak-saeng-i-e-yo', english: 'I am a student.', filipino: 'Ako po ay estudyante.', explanation: '학생 ends in consonant ㅇ, so 이에요 is attached.' },
              { korean: '만나서 반갑습니다.', pronunciation: 'man-na-seo ban-gap-seum-ni-da', english: 'Nice to meet you.', filipino: 'Ikinagagalak ko po kayong makilala.', explanation: 'Polite formal introduction closing.' },
              { korean: '저는 필리핀 사람이에요.', pronunciation: 'jeo-neun pil-li-pin sa-ram-i-e-yo', english: 'I am Filipino.', filipino: 'Ako po ay Pilipino.', explanation: '사람 ends in consonant ㅁ, so 이에요 attaches.' }
            ],
            vocabularyList: [
              { korean: '저', romanization: 'jeo', english: 'I / Me (humble/polite)', filipino: 'Ako (magalang)', partOfSpeech: 'noun', exampleSentence: '저는 학생이에요.', exampleEnglish: 'I am a student.' },
              { korean: '학생', romanization: 'hak-saeng', english: 'Student', filipino: 'Estudyante / Mag-aaral', partOfSpeech: 'noun', exampleSentence: '대학교 학생이에요.', exampleEnglish: 'I am a university student.' },
              { korean: '선생님', romanization: 'seon-saeng-nim', english: 'Teacher / Instructor', filipino: 'Guro', partOfSpeech: 'noun', exampleSentence: '선생님이 친절해요.', exampleEnglish: 'The teacher is kind.' },
              { korean: '반갑습니다', romanization: 'ban-gap-seum-ni-da', english: 'Pleased to meet you', filipino: 'Ikinagagalak ko kayong makilala', partOfSpeech: 'expression', exampleSentence: '처음 뵙겠습니다. 반갑습니다.', exampleEnglish: 'Pleasure to meet you for the first time.' }
            ],
            grammarNotes: [
              {
                pattern: 'Noun + 이에요 / 예요',
                koreanName: '서술격 조사 이다의 비격식 해요체',
                meaning: 'Polite informal present tense of "to be" (am, is, are).',
                rules: [
                  'Noun with final Batchim -> + 이에요 (e.g., 선생님 -> 선생님이에요).',
                  'Noun without final Batchim (vowel) -> + 예요 (e.g., 의사 -> 의사예요).'
                ],
                examples: [
                  { korean: '한국 사람이에요', english: 'I am a Korean person (사람 ends in ㅁ -> 이에요)' },
                  { korean: '친구예요', english: 'He/she is a friend (친구 ends in ㅜ -> 예요)' }
                ],
                commonMistakes: [
                  'Saying "학생예요". Because 학생 ends in consonant ㅇ, you must say "학생이에요" for phonetic comfort!'
                ]
              }
            ],
            interactiveExercises: [
              {
                id: 'ex-pre-a1-8-1',
                type: 'multiple-choice',
                question: 'Which is the correct sentence for "I am a student"?',
                options: [
                  '저는 학생이에요.',
                  '저는 학생예요.',
                  '저는 학생이다.',
                  '저는 학생아니요.'
                ],
                correctAnswer: '저는 학생이에요.',
                explanation: '학생 ends in the final consonant (Batchim) ㅇ, so 이에요 is grammatically correct.'
              },
              {
                id: 'ex-pre-a1-8-2',
                type: 'multiple-choice',
                question: 'If your name is 수지 (Su-ji, ends in vowel ㅣ), how do you say "I am Su-ji"?',
                options: ['저는 수지예요.', '저는 수지이에요.', '저는 수지입니다요.', '저는 수지야.'],
                correctAnswer: '저는 수지예요.',
                explanation: '수지 ends in vowel ㅣ (no Batchim), so 예요 attaches.'
              }
            ],
            comprehensionQuestions: [
              {
                id: 'cq-pre-a1-8-1',
                question: 'What is the polite phrase meaning "Pleased to meet you"?',
                options: [
                  '만나서 반갑습니다 (man-na-seo ban-gap-seum-ni-da)',
                  '안녕히 가세요 (an-nyeong-hi ga-se-yo)',
                  '감사합니다 (gam-sa-ham-ni-da)',
                  '죄송합니다 (joe-song-ham-ni-da)'
                ],
                correctAnswerIndex: 0,
                explanation: '만나서 반갑습니다 is the standard academic polite formula for "Pleased to meet you".'
              }
            ],
            summary: 'You learned to formulate a complete Korean self-introduction: 안녕하세요, 저는 [이름]이에요/예요. [국적] 사람이에요. 만나서 반갑습니다!',
            homeworkPrompt: 'Write your own complete 4-sentence self-introduction in Korean on the Assignment tab.'
          }
        ]
      }
    ]
  },
  {
    id: 'course-topik-1',
    title: 'Beginner Korean & TOPIK I Level 1',
    koreanTitle: '초급 한국어 및 토픽 I 1급 대비',
    level: 'Level 1',
    topikLevel: 'TOPIK I (Level 1)',
    description: 'Master core Korean syntax, the essential particle system (은/는, 이/가, 을/를, 에, 에서), present tense conjugations (-아요/어요), Sino/Native numbers, daily routines, food ordering, and TOPIK I question types.',
    objectives: [
      'Master the distinction between Topic markers (은/는) and Subject markers (이/가)',
      'Accurately conjugate verbs and adjectives into polite present tense (-아요/어요)',
      'Use location particles 에 (destination/static time) and 에서 (dynamic action location)',
      'Count objects, money, and time using Sino-Korean and Native Korean numbering systems',
      'Read short daily passages and comprehend native beginner dialogues'
    ],
    unitsCount: 4,
    totalLessons: 12,
    status: 'published',
    units: [
      {
        id: 'unit-topik1-1',
        courseId: 'course-topik-1',
        unitNumber: 1,
        title: 'The Great Korean Particle Architecture',
        koreanTitle: '제1단원: 조사의 핵심 체계 (은/는, 이/가, 을/를)',
        description: 'Demystifying the foundational grammar particles that define sentence roles in Korean.',
        lessons: [
          {
            id: 'lesson-topik1-1',
            unitId: 'unit-topik1-1',
            courseId: 'course-topik-1',
            lessonNumber: 1,
            title: 'Topic Markers (은/는) vs Subject Markers (이/가)',
            koreanTitle: '은/는 vs 이/가 완벽 비교 분석',
            objectives: [
              'Understand the exact syntactic and pragmatic difference between 은/는 and 이/가',
              'Identify when to introduce old/known information (은/는) versus new information (이/가)',
              'Apply contrastive nuance (은/는) and exclusive focus (이/가)'
            ],
            introduction: 'The distinction between 은/는 and 이/가 is famous for confusing foreign learners. However, when taught through university linguistics, it becomes crystal clear! Korean uses particles like badges to indicate whether a noun is the overarching topic (what we are talking about) or the grammatical subject that performs an action.',
            explanation: `### 1. Topic Marker: 은 / 는
- **Consonant ending** -> **은** (선생님은)
- **Vowel ending** -> **는** (저는)
**Functions**:
1. **Announcing the Topic / As for...**: Sets the stage. ("As for me, I am a student" = 저는 학생이에요).
2. **Contrast & Comparison**: Emphasizes a contrast between two things. (사과는 맛있어요. 하지만 바나나는 맛없어요. = "Apples are delicious. But as for bananas, they don't taste good").

### 2. Subject Marker: 이 / 가
- **Consonant ending** -> **이** (가방이)
- **Vowel ending** -> **가** (비가)
**Functions**:
1. **Introducing New Information**: Used when introducing something new to the conversation, or reporting an observation. (비가 와요 = "It is raining!").
2. **Exclusive Focus / Answering "Who?" or "Which?":**
   - Question: 누가 학생이에요? (Who is the student?)
   - Answer: 제가 학생이에요! (I am the one who is the student - exclusive focus on "I").

### Real-Life Comparison in Context:
- **어디가 아파요?** (Where hurts?) -> **머리가 아파요.** (My HEAD hurts - specific subject).
- **오늘 날씨는 좋아요.** (As for today's weather, it is nice - contrast with yesterday).`,
            filipinoNotes: 'Sa Tagalog, ang "은/는" ay maihahalintulad sa panandang "Ang" o "Kung tungkol kay..." (topic marker). Ang "이/가" naman ay nagbibigay-diin sa mismong gumagawa ng kilos o sumasagot sa "Sino?" at "Ano?".',
            koreanExamples: [
              { korean: '저는 한국 사람이에요.', pronunciation: 'jeo-neun han-guk sa-ram-i-e-yo', english: 'As for me, I am Korean.', filipino: 'Tungkol sa akin, ako ay Koreano.', explanation: 'Topic marker 는 establishes "I" as the conversation topic.' },
              { korean: '비가 와요.', pronunciation: 'bi-ga wa-yo', english: 'Rain is falling (It is raining).', filipino: 'Umuulan (Ulan ang pumapatak).', explanation: 'Subject marker 가 marks rain as the direct agent of falling.' },
              { korean: '이것은 사과예요.', pronunciation: 'i-geo-seun sa-gwa-ye-yo', english: 'This is an apple.', filipino: 'Ito ay mansanas.', explanation: 'Topic marker 은 on 이것 (this item).' },
              { korean: '누가 왔어요? - 민지가 왔어요.', pronunciation: 'nu-ga wat-sseo-yo? - min-ji-ga wat-sseo-yo', english: 'Who came? - Minji came.', filipino: 'Sino ang dumating? - Dumating si Minji.', explanation: 'Subject marker 가 identifies the specific individual answering "Who?".' }
            ],
            vocabularyList: [
              { korean: '오늘', romanization: 'o-neul', english: 'Today', filipino: 'Ngayon / Ngayong araw', partOfSpeech: 'noun', exampleSentence: '오늘은 날씨가 좋아요.', exampleEnglish: "Today's weather is good." },
              { korean: '날씨', romanization: 'nal-ssi', english: 'Weather', filipino: 'Panahon / Klima', partOfSpeech: 'noun', exampleSentence: '날씨가 따뜻해요.', exampleEnglish: 'The weather is warm.' },
              { korean: '사과', romanization: 'sa-gwa', english: 'Apple', filipino: 'Mansanas', partOfSpeech: 'noun', exampleSentence: '사과가 맛있어요.', exampleEnglish: 'The apple is delicious.' },
              { korean: '이것 / 그것 / 저것', romanization: 'i-geot / geu-geot / jeo-geot', english: 'This / That / That over there', filipino: 'Ito / Iyan / Iyon', partOfSpeech: 'noun', exampleSentence: '이것은 제 책이에요.', exampleEnglish: 'This is my book.' }
            ],
            grammarNotes: [
              {
                pattern: 'Topic Marker (은/는) vs Subject Marker (이/가)',
                koreanName: '주제격 조사 은/는과 주격 조사 이/가',
                meaning: 'Grammatical particles indicating discourse topic vs grammatical subject.',
                rules: [
                  'Use 은/는 for general truths, introducing yourself, or contrasting two items.',
                  'Use 이/가 for specific spontaneous occurrences, descriptions with adjectives, or answering "Who/Which?".',
                  'Pronoun shift with 이/가: 저 (I) becomes 제가; 나 becomes 내가; 너 becomes 네가.'
                ],
                examples: [
                  { korean: '제가 갈게요.', english: 'I will go (I am the one).' },
                  { korean: '저는 갈게요.', english: 'As for me, I will be on my way.' }
                ],
                commonMistakes: [
                  'Saying "저가". In Korean, when 저 takes the particle 가, it must contract to 제가!'
                ]
              }
            ],
            interactiveExercises: [
              {
                id: 'ex-topik1-1-1',
                type: 'multiple-choice',
                question: 'Fill in the blank: "저[ ? ] 학생이에요." (Introducing yourself)',
                options: ['는', '은', '이', '가'],
                correctAnswer: '는',
                explanation: '저 ends in a vowel, and is setting the topic of self-introduction, so 는 is correct: 저는 학생이에요.'
              },
              {
                id: 'ex-topik1-1-2',
                type: 'multiple-choice',
                question: 'When the polite pronoun 저 (I) meets the subject marker 가, what does it become?',
                options: ['제가 (je-ga)', '저가 (jeo-ga)', '내가 (nae-ga)', '저이 (jeo-i)'],
                correctAnswer: '제가 (je-ga)',
                explanation: '저 + 가 undergoes an irregular phonological shift to become 제가.'
              }
            ],
            comprehensionQuestions: [
              {
                id: 'cq-topik1-1-1',
                question: 'Which particle would you use to contrast two items (e.g. "Tea is hot, but juice is cold")?',
                options: [
                  '은 / 는 (Topic & Contrast marker)',
                  '이 / 가 (Subject marker)',
                  '을 / 를 (Object marker)',
                  '에 / 에서 (Location marker)'
                ],
                correctAnswerIndex: 0,
                explanation: 'The primary pragmatic function of 은/는 beyond topicalization is expressing contrast.'
              }
            ],
            summary: 'You mastered the critical distinction between Topic markers (은/는) and Subject markers (이/가), the irregular pronoun shift 제가, and contextual usage rules.',
            homeworkPrompt: 'Write 3 pairs of sentences in the Assignment portal demonstrating when you use 은/는 vs 이/가.'
          },
          {
            id: 'lesson-topik1-2',
            unitId: 'unit-topik1-1',
            courseId: 'course-topik-1',
            lessonNumber: 2,
            title: 'Object Markers (을/를) & Basic Verb Conjugation (-아요/어요)',
            koreanTitle: '목적격 조사 을/를 및 해요체 기본 활용 (-아요/어요)',
            objectives: [
              'Identify direct objects in Korean sentences using 을 / 를',
              'Understand the vowel harmony principle of polite present conjugation (-아요 vs -어요 vs -해요)',
              'Conjugate common verbs: 가다 (to go), 먹다 (to eat), 마시다 (to drink), 공부하다 (to study)'
            ],
            introduction: 'Korean sentences follow the Subject-Object-Verb (SOV) order! In English you say "I drink water", but in Korean you say "I [water] drink" (저는 물을 마셔요). In this lesson, you will master the object marker and conjugate real verbs into polite present tense.',
            explanation: `### 1. Object Marker: 을 / 를
Attached to the noun that directly receives the action of the verb:
- **Consonant ending (Batchim)** -> **을** (밥을, 책을, 물을)
- **Vowel ending (No Batchim)** -> **를** (커피를, 사과를, 영화를)

### 2. Polite Present Tense Conjugation: -아요 / -어요 / 해요
Take the dictionary verb stem (drop '다'):
1. **If the last vowel of the stem is ㅏ or ㅗ** -> attach **-아요**:
   - 가다 (to go) -> 가 + 아요 -> **가요** (contracts)
   - 보다 (to see/watch) -> 보 + 아요 -> **봐요**
   - 살다 (to live) -> 살 + 아요 -> **살아요**
2. **If the last vowel is NOT ㅏ or ㅗ (anything else: ㅓ, ㅜ, ㅣ, ㅡ, ㅐ, ㅔ)** -> attach **-어요**:
   - 먹다 (to eat) -> 먹 + 어요 -> **먹어요**
   - 마시다 (to drink) -> 마시 + 어요 -> **마셔요** (ㅣ+ㅓ collapses into ㅕ)
   - 읽다 (to read) -> 읽 + 어요 -> **읽어요**
3. **All verbs ending in 하다 (to do)** -> turn into **해요**:
   - 공부하다 (to study) -> **공부해요**
   - 일하다 (to work) -> **일해요**
   - 운동하다 (to exercise) -> **운동해요**`,
            filipinoNotes: 'Sa Tagalog, mayroon tayong "ng" para sa layon (object): "Kumakain ako ng kanin." Sa Korean, ang "ng kanin" ay "밥을 (bap-eul)". Ang ayos ng pangungusap ay laging nasa dulo ang pandiwa (verb)!',
            koreanExamples: [
              { korean: '저는 밥을 먹어요.', pronunciation: 'jeo-neun ba-beul meo-geo-yo', english: 'I eat a meal / rice.', filipino: 'Kumakain ako ng kanin.', explanation: '밥 has batchim ㅂ -> 을; 먹다 vowel is ㅓ -> 먹어요.' },
              { korean: '커피를 마셔요.', pronunciation: 'keo-pi-reul ma-syeo-yo', english: 'I drink coffee.', filipino: 'Umiinom ako ng kape.', explanation: '커피 ends in vowel ㅣ -> 를; 마시다 becomes 마셔요.' },
              { korean: '한국어를 공부해요.', pronunciation: 'han-gu-geo-reul gong-bu-hae-yo', english: 'I study Korean.', filipino: 'Nag-aaral ako ng Koreano.', explanation: '한국어 takes 를; 공부하다 becomes 공부해요.' },
              { korean: '책을 읽어요.', pronunciation: 'chae-geul il-geo-yo', english: 'I read a book.', filipino: 'Nagbabasa ako ng aklat.', explanation: '책 takes 을; 읽다 becomes 읽어요.' }
            ],
            vocabularyList: [
              { korean: '먹다', romanization: 'meok-da', english: 'To eat', filipino: 'Kumain', partOfSpeech: 'verb', exampleSentence: '점심을 먹어요.', exampleEnglish: 'I eat lunch.' },
              { korean: '마시다', romanization: 'ma-si-da', english: 'To drink', filipino: 'Uminom', partOfSpeech: 'verb', exampleSentence: '차를 마셔요.', exampleEnglish: 'I drink tea.' },
              { korean: '공부하다', romanization: 'gong-bu-ha-da', english: 'To study', filipino: 'Mag-aral', partOfSpeech: 'verb', exampleSentence: '도서관에서 공부해요.', exampleEnglish: 'I study at the library.' },
              { korean: '보다', romanization: 'bo-da', english: 'To see / watch', filipino: 'Manood / Makita', partOfSpeech: 'verb', exampleSentence: '영화를 봐요.', exampleEnglish: 'I watch a movie.' }
            ],
            grammarNotes: [
              {
                pattern: 'Verb Stem + 아요 / 어요 / 해요',
                koreanName: '동사/형용사의 현재 시제 해요체 활용',
                meaning: 'Standard polite informal present tense in modern Korean conversation.',
                rules: [
                  'Stem with ㅏ/ㅗ -> -아요 (e.g., 가다 -> 가요; 좋다 -> 좋아요).',
                  'Stem with other vowels -> -어요 (e.g., 먹다 -> 먹어요; 배우다 -> 배워요).',
                  '하다 verbs -> 해요 (e.g., 말하다 -> 말해요).'
                ],
                examples: [
                  { korean: '사과를 사요.', english: 'I buy an apple (사다 + 아요).' },
                  { korean: '물을 마셔요.', english: 'I drink water (마시다 + 어요 -> 마셔요).' }
                ],
                commonMistakes: [
                  'Leaving the "다" ending when speaking. Never say "저는 밥을 먹다요". Always drop 다 and conjugate to "먹어요"!'
                ]
              }
            ],
            interactiveExercises: [
              {
                id: 'ex-topik1-2-1',
                type: 'multiple-choice',
                question: 'Fill in the blank: "저는 물[ ? ] 마셔요." (I drink water)',
                options: ['을', '를', '은', '이'],
                correctAnswer: '을',
                explanation: '물 ends in the final consonant (Batchim) ㄹ, so object marker 을 is used.'
              },
              {
                id: 'ex-topik1-2-2',
                type: 'multiple-choice',
                question: 'What is the correct polite present tense form of the verb 가다 (to go)?',
                options: ['가요', '가어요', '가해요', '갔어요'],
                correctAnswer: '가요',
                explanation: '가 + 아요 contracts into 가요.'
              }
            ],
            comprehensionQuestions: [
              {
                id: 'cq-topik1-2-1',
                question: 'In standard Korean word order, where does the main verb always appear in a sentence?',
                options: [
                  'At the very end of the sentence (SOV)',
                  'At the very beginning of the sentence (VSO)',
                  'Between the subject and the object (SVO)',
                  'Position does not matter'
                ],
                correctAnswerIndex: 0,
                explanation: 'Korean is strictly a verb-final language; verbs and adjectives always close the clause.'
              }
            ],
            summary: 'You mastered the object marker 을/를 and the core present tense conjugation rules (-아요, -어요, 해요), allowing you to form hundreds of practical Korean sentences.',
            homeworkPrompt: 'Conjugate 5 verbs (먹다, 마시다, 보다, 공부하다, 읽다) and write complete sentences with direct objects.'
          }
        ]
      }
    ]
  },
  {
    id: 'course-topik-2',
    title: 'Sentence Construction & Grammar',
    koreanTitle: '한국어 문장 구성 및 기초 문법 (TOPIK I 2급)',
    level: 'Level 2',
    topikLevel: 'TOPIK I (Level 2)',
    description: 'Past and future tenses, negation (안 / 못), topic marker 은/는 vs subject marker 이/가, object marker 을/를, and polite honorifics.',
    objectives: [
      'Master Korean SOV word order and particle distinction (은/는 vs 이/가)',
      'Conjugate past tense (-았/었어요) and future intention (-을 거예요)',
      'Construct grammatically correct Korean compound sentences'
    ],
    unitsCount: LEVEL_3_UNITS.length,
    totalLessons: LEVEL_3_UNITS.reduce((acc, u) => acc + u.lessons.length, 0),
    status: 'published',
    units: LEVEL_3_UNITS
  },
  {
    id: 'course-topik-3',
    title: 'Everyday Conversation & Seoul Life',
    koreanTitle: '일상 실전 회화 및 여행 한국어 (TOPIK II 3급)',
    level: 'Level 3',
    topikLevel: 'TOPIK II (Level 3)',
    description: 'Order at Seoul cafés, shop in Myeongdong, navigate the subway, ask for directions, and converse naturally in daily situations.',
    objectives: [
      'Order food and customize requests using -아/어 주세요',
      'Navigate public transportation and shop with native Korean counters',
      'Hold everyday conversations with confidence'
    ],
    unitsCount: LEVEL_4_UNITS.length,
    totalLessons: LEVEL_4_UNITS.reduce((acc, u) => acc + u.lessons.length, 0),
    status: 'published',
    units: LEVEL_4_UNITS
  },
  {
    id: 'course-topik-4',
    title: 'Intermediate Korean & Honorifics',
    koreanTitle: '중고급 한국어 및 높임말 마스터 (TOPIK II 4급)',
    level: 'Level 4',
    topikLevel: 'TOPIK II (Level 4)',
    description: 'Complex sentence structures, indirect speech quotations (-다고 하다), honorific vs informal registers, and news comprehension.',
    objectives: [
      'Master indirect speech quotations across all sentence types',
      'Navigate Korean honorifics and polite vs casual speech registers',
      'Express opinions and explain experiences with clarity'
    ],
    unitsCount: LEVEL_5_UNITS.length,
    totalLessons: LEVEL_5_UNITS.reduce((acc, u) => acc + u.lessons.length, 0),
    status: 'published',
    units: LEVEL_5_UNITS
  },
  {
    id: 'course-topik-5',
    title: 'Advanced Korean & Cultural Idioms',
    koreanTitle: '고급 한국어 및 사자성어 (TOPIK II 5급)',
    level: 'Level 5',
    topikLevel: 'TOPIK II (Level 5)',
    description: 'Sino-Korean four-character idioms (사자성어), proverbs, formal written prose, and nuanced grammatical particles.',
    objectives: [
      'Master classical four-character idioms like 일석이조, 작심삼일, and 고진감래',
      'Understand written formal Korean and native media broadcasts',
      'Communicate with depth and cultural sophistication'
    ],
    unitsCount: LEVEL_6_UNITS.length,
    totalLessons: LEVEL_6_UNITS.reduce((acc, u) => acc + u.lessons.length, 0),
    status: 'published',
    units: LEVEL_6_UNITS
  },
  {
    id: 'course-topik-6',
    title: 'Korean Fluency & Professional Mastery',
    koreanTitle: '최고급 한국어 및 비즈니스 실무 (TOPIK II 6급)',
    level: 'Level 6',
    topikLevel: 'TOPIK II (Level 6)',
    description: 'Corporate business communication, formal debate, advanced essay composition, and native-level fluency in professional settings.',
    objectives: [
      'Draft executive-level Korean business emails and project proposals',
      'Engage in persuasive academic debates with sophisticated registers',
      'Achieve near-native fluency in professional communication'
    ],
    unitsCount: LEVEL_7_UNITS.length,
    totalLessons: LEVEL_7_UNITS.reduce((acc, u) => acc + u.lessons.length, 0),
    status: 'published',
    units: LEVEL_7_UNITS
  }
];
