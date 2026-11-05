export interface ReadingPassage {
  id: string;
  title: string;
  koreanTitle: string;
  level: string;
  category: 'Notice' | 'Diary' | 'Dialogue' | 'Short Story' | 'Academic Passage';
  koreanContent: string;
  englishTranslation: string;
  filipinoTranslation?: string;
  vocabulary: { korean: string; english: string }[];
  questions: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export const READING_PASSAGES: ReadingPassage[] = [
  {
    id: 'rp-1',
    title: 'University Korean Class Notice',
    koreanTitle: '한국어 수업 안내문',
    level: 'Pre-A1 / Level 1',
    category: 'Notice',
    koreanContent: `안녕하세요, 학생 여러분!
이번 주 금요일에 한국어 수업이 있습니다.
시간: 오후 2시부터 4시까지
장소: 어학관 301호
준비물: 교재, 필기도구
시간을 꼭 지켜 주세요. 감사합니다.`,
    englishTranslation: `Hello, students!
There is a Korean class this Friday.
Time: 2:00 PM to 4:00 PM
Place: Language Hall Room 301
Materials to prepare: Textbook, writing instruments
Please be strictly on time. Thank you.`,
    filipinoTranslation: `Magandang araw sa lahat ng mag-aaral!
Mayroong klase sa Koreano ngayong darating na Biyernes.
Oras: 2:00 PM hanggang 4:00 PM
Lugar: Gusali ng Wika Kwarto 301
Mga gamit: Aklat-aralin, panulat
Pakiusap na pumasok sa tamang oras. Salamat.`,
    vocabulary: [
      { korean: '금요일', english: 'Friday' },
      { korean: '시간', english: 'Time' },
      { korean: '장소', english: 'Place / Location' },
      { korean: '교재', english: 'Textbook' }
    ],
    questions: [
      {
        id: 'rp-1-q1',
        question: 'What day is the Korean class held?',
        options: ['Friday (금요일)', 'Monday (월요일)', 'Saturday (토요일)', 'Wednesday (수요일)'],
        correctIndex: 0,
        explanation: 'The notice specifically states "이번 주 금요일에 한국어 수업이 있습니다" (There is Korean class this Friday).'
      },
      {
        id: 'rp-1-q2',
        question: 'Where is the classroom located?',
        options: ['Language Hall Room 301 (어학관 301호)', 'Main Library Room 102', 'Student Cafeteria', 'Gymnasium'],
        correctIndex: 0,
        explanation: 'The notice specifies "장소: 어학관 301호".'
      }
    ]
  },
  {
    id: 'rp-2',
    title: 'Minji’s Daily Routine Diary',
    koreanTitle: '민지의 하루 일기',
    level: 'Level 1',
    category: 'Diary',
    koreanContent: `오늘 아침 7시에 일어났습니다.
부엌에서 따뜻한 물을 마시고 빵을 먹었습니다.
오전 9시에 대학교에 갔습니다.
도서관에서 친구와 함께 한국어를 열심히 공부했습니다.
저녁에는 한국 식당에서 맛있는 비빔밥을 먹었습니다.
오늘 하루는 정말 보람차고 즐거웠습니다.`,
    englishTranslation: `I woke up at 7 AM this morning.
I drank warm water in the kitchen and ate bread.
I went to university at 9 AM.
I studied Korean diligently with a friend at the library.
In the evening, I ate delicious bibimbap at a Korean restaurant.
Today was truly fulfilling and pleasant.`,
    filipinoTranslation: `Gumising ako kaninang 7:00 ng umaga.
Uminom ako ng maligamgam na tubig sa kusina at kumain ng tinapay.
Pumunta ako sa unibersidad bandang 9:00 ng umaga.
Masipag akong nag-aral ng Koreano kasama ang aking kaibigan sa aklatan.
Noong gabi, kumain ako ng masarap na bibimbap sa isang Koreanong restawran.
Tunay na makabuluhan at masaya ang araw na ito.`,
    vocabulary: [
      { korean: '일어났습니다', english: 'Woke up' },
      { korean: '부엌', english: 'Kitchen' },
      { korean: '도서관', english: 'Library' },
      { korean: '보람차다', english: 'To be worthwhile / fulfilling' }
    ],
    questions: [
      {
        id: 'rp-2-q1',
        question: 'What did Minji eat in the morning?',
        options: ['Bread and water (빵과 물)', 'Bibimbap', 'Kimchi stew', 'Milk and fruit'],
        correctIndex: 0,
        explanation: 'The passage says: "따뜻한 물을 마시고 빵을 먹었습니다".'
      },
      {
        id: 'rp-2-q2',
        question: 'Where did Minji study Korean with her friend?',
        options: ['Library (도서관)', 'At home', 'Cafe', 'Subway station'],
        correctIndex: 0,
        explanation: 'The passage states: "도서관에서 친구와 함께 한국어를 열심히 공부했습니다".'
      }
    ]
  }
];
