export interface ScenarioRoleplay {
  id: string;
  category: 'Everyday Life' | 'Food & Restaurants' | 'Shopping' | 'Transportation' | 'Travel' | 'Workplace';
  title: string;
  koreanTitle: string;
  situation: string;
  level: string;
  targetVocab: string[];
  usefulExpressions: { korean: string; english: string; filipino: string }[];
  dialogue: {
    speaker: string;
    role: 'tutor' | 'student';
    korean: string;
    english: string;
    filipino?: string;
    targetSyllables?: string[];
  }[];
}

export const REAL_LIFE_SCENARIOS: ScenarioRoleplay[] = [
  {
    id: 'sc-1',
    category: 'Everyday Life',
    title: 'Polite Self-Introduction at University',
    koreanTitle: '대학교 첫 수업 자기소개',
    situation: 'It is the first day of the Korean semester at Seoul National University. You introduce yourself to the professor and fellow students.',
    level: 'Pre-A1 / Level 1',
    targetVocab: ['안녕하세요', '이름', '학생', '반갑습니다', '사람'],
    usefulExpressions: [
      { korean: '처음 뵙겠습니다.', english: 'Pleasure to meet you for the first time.', filipino: 'Ikinagagalak ko po kayong makilala sa unang pagkakataon.' },
      { korean: '잘 부탁드립니다.', english: 'Please treat me well / Looking forward to working together.', filipino: 'Maaasahan po ninyo ako / Pakiusap na patnubayan ninyo ako.' }
    ],
    dialogue: [
      {
        speaker: 'Professor Kim (김 교수님)',
        role: 'tutor',
        korean: '안녕하세요! 반갑습니다. 이름이 무엇입니까?',
        english: 'Hello! Welcome. What is your name?',
        filipino: 'Magandang araw! Maligayang pagdating. Ano ang inyong pangalan?'
      },
      {
        speaker: 'You (Student)',
        role: 'student',
        korean: '안녕하세요, 교수님! 저는 민지예요. 필리핀 사람이에요.',
        english: 'Hello, Professor! I am Minji. I am Filipino.',
        filipino: 'Magandang araw po, Propesor! Ako po si Minji. Ako po ay Pilipino.'
      },
      {
        speaker: 'Professor Kim (김 교수님)',
        role: 'tutor',
        korean: '반가워요, 민지 씨. 한국어 공부 열심히 하세요!',
        english: 'Nice to meet you, Minji. Study Korean diligently!',
        filipino: 'Ikinagagalak kitang makilala, Minji. Mag-aral kang mabuti ng Koreano!'
      },
      {
        speaker: 'You (Student)',
        role: 'student',
        korean: '네, 열심히 하겠습니다. 감사합니다!',
        english: 'Yes, I will do my best. Thank you!',
        filipino: 'Opo, gagawin ko po ang aking makakaya. Salamat po!'
      }
    ]
  },
  {
    id: 'sc-2',
    category: 'Food & Restaurants',
    title: 'Ordering at a Traditional Korean Restaurant (식당 주문)',
    koreanTitle: '식당에서 비빔밥과 찌개 주문하기',
    situation: 'You are seated in an authentic Korean restaurant in Insadong. You call the server, order food, and ask for water.',
    level: 'Level 1',
    targetVocab: ['여기요', '주세요', '비빔밥', '김치찌개', '물'],
    usefulExpressions: [
      { korean: '여기요, 주문할게요!', english: 'Excuse me (over here), I would like to order!', filipino: 'Dito po, o-order na po kami!' },
      { korean: '물 좀 더 주세요.', english: 'Please give us a little more water.', filipino: 'Pahingi po ng kaunting tubig pa.' },
      { korean: '맵지 않게 해 주세요.', english: 'Please make it not too spicy.', filipino: 'Pakiusap, huwag po masyadong maanghang.' }
    ],
    dialogue: [
      {
        speaker: 'You (Student)',
        role: 'student',
        korean: '저기요! 주문할게요.',
        english: 'Excuse me! We would like to order.',
        filipino: 'Kayo po! O-order na po kami.'
      },
      {
        speaker: 'Server (직원)',
        role: 'tutor',
        korean: '네, 손님! 무엇으로 드릴까요?',
        english: 'Yes, guest! What can I get for you?',
        filipino: 'Opo! Ano po ang nais ninyong kainin?'
      },
      {
        speaker: 'You (Student)',
        role: 'student',
        korean: '비빔밥 하나하고 김치찌개 하나 주세요. 물도 주세요.',
        english: 'One bibimbap and one kimchi stew please. Water too, please.',
        filipino: 'Isang bibimbap at isang kimchi stew po. Tubig din po.'
      },
      {
        speaker: 'Server (직원)',
        role: 'tutor',
        korean: '네, 알겠습니다. 잠시만 기다려 주세요!',
        english: 'Yes, understood. Please wait just a moment!',
        filipino: 'Opo, masusunod po. Maghintay lamang po ng sandali!'
      }
    ]
  },
  {
    id: 'sc-3',
    category: 'Transportation',
    title: 'Navigating the Seoul Subway & Asking for Directions',
    koreanTitle: '지하철역에서 길 묻기 (명동역 찾기)',
    situation: 'You are at City Hall station and want to reach Myeongdong. You politely ask a station officer.',
    level: 'Level 1 / Level 2',
    targetVocab: ['지하철역', '어디', '어떻게', '가요', '호선'],
    usefulExpressions: [
      { korean: '실례지만, 명동역이 어디에 있어요?', english: 'Excuse me, but where is Myeongdong Station?', filipino: 'Paumanhin po, saan po ang Estasyon ng Myeongdong?' },
      { korean: '몇 호선을 타야 해요?', english: 'Which line do I need to take?', filipino: 'Aling linya po ang kailangan kong sakyan?' }
    ],
    dialogue: [
      {
        speaker: 'You (Student)',
        role: 'student',
        korean: '실례지만, 명동역에 어떻게 가요?',
        english: 'Excuse me, but how do I get to Myeongdong Station?',
        filipino: 'Paumanhin po, paano po pumunta sa Myeongdong Station?'
      },
      {
        speaker: 'Officer (역무원)',
        role: 'tutor',
        korean: '저쪽 4호선 승강장으로 가셔서 타시면 됩니다.',
        english: 'Go toward that platform for Line 4 and board the train.',
        filipino: 'Pumunta po kayo roon sa sakayan ng Line 4 at sumakay.'
      },
      {
        speaker: 'You (Student)',
        role: 'student',
        korean: '감사합니다! 좋은 하루 보내세요.',
        english: 'Thank you! Have a nice day.',
        filipino: 'Salamat po! Magkaroon kayo ng magandang araw.'
      }
    ]
  },
  {
    id: 'sc-4',
    category: 'Shopping',
    title: 'Asking for Price & Sizes in Myeongdong',
    koreanTitle: '명동 옷가게에서 가격 묻기',
    situation: 'You find a jacket you like in a clothing boutique. You ask for the price and if there is a medium size.',
    level: 'Level 1',
    targetVocab: ['얼마예요', '사이즈', '있어요', '이거', '원'],
    usefulExpressions: [
      { korean: '이거 얼마예요?', english: 'How much is this?', filipino: 'Magkano po ito?' },
      { korean: '다른 사이즈 있어요?', english: 'Do you have another size?', filipino: 'Mayroon po ba kayong ibang sukat?' }
    ],
    dialogue: [
      {
        speaker: 'You (Student)',
        role: 'student',
        korean: '저기요, 이 코트 얼마예요?',
        english: 'Excuse me, how much is this coat?',
        filipino: 'Kayo po, magkano po ang coat na ito?'
      },
      {
        speaker: 'Shopkeeper (가게 직원)',
        role: 'tutor',
        korean: '네, 5만 원(오만원)이에요. 한번 입어 보세요.',
        english: 'Yes, it is 50,000 won. Please try it on.',
        filipino: 'Opo, 50,000 won po. Pakisukat po ninyo.'
      },
      {
        speaker: 'You (Student)',
        role: 'student',
        korean: '조금 커요. 미디엄(M) 사이즈 있어요?',
        english: 'It is a little big. Do you have a medium (M) size?',
        filipino: 'Medyo malaki po. Mayroon po kayong katamtamang sukat (M)?'
      }
    ]
  }
];
