import { SpeakingExercise } from '../types';

export const SPEAKING_EXERCISES: SpeakingExercise[] = [
  {
    id: 'spk-1',
    title: 'Formal Polite Greeting',
    koreanTarget: '안녕하세요. 반갑습니다.',
    romanization: 'an-nyeong-ha-se-yo. ban-gap-seum-ni-da.',
    english: 'Hello. Nice to meet you.',
    filipino: 'Magandang araw po. Ikinagagalak ko po kayong makilala.',
    difficulty: 'Pre-A1',
    category: 'Greetings',
    tips: [
      'Bow gently while speaking',
      'Keep the rhythm steady without rushing',
      'Pronounce 반갑습니다 as [반갑씀니다] with tense ㅆ sound'
    ]
  },
  {
    id: 'spk-2',
    title: 'Self-Introduction with Name',
    koreanTarget: '저는 민지예요. 학생이에요.',
    romanization: 'jeo-neun min-ji-ye-yo. hak-saeng-i-e-yo.',
    english: 'I am Minji. I am a student.',
    filipino: 'Ako po si Minji. Ako po ay mag-aaral.',
    difficulty: 'Pre-A1',
    category: 'Greetings',
    tips: [
      'Remember: 저 + 는 has no pause',
      '학생 + 이에요 flows together through liaison: [학쌩이에요]'
    ]
  },
  {
    id: 'spk-3',
    title: 'Ordering at a Restaurant',
    koreanTarget: '여기요, 비빔밥 하나 주세요.',
    romanization: 'yeo-gi-yo, bi-bim-bap ha-na ju-se-yo.',
    english: 'Excuse me, one bibimbap please.',
    filipino: 'Kayo po, isang bibimbap po.',
    difficulty: 'Level 1',
    category: 'Ordering',
    tips: [
      'Clear voice on 여기요 to get the waiter’s attention politely',
      '밥 ends in unreleased stop [bap]'
    ]
  },
  {
    id: 'spk-4',
    title: 'Expressing Daily Routine',
    koreanTarget: '저는 매일 도서관에서 한국어를 공부해요.',
    romanization: 'jeo-neun mae-il do-seo-gwan-e-seo han-gu-geo-reul gong-bu-hae-yo.',
    english: 'I study Korean at the library every day.',
    filipino: 'Nag-aaral ako ng Koreano sa aklatan araw-araw.',
    difficulty: 'Level 1',
    category: 'Daily Conversation',
    tips: [
      'Liaison on 한국어: [한구거]',
      'Notice 에서 indicates location where the dynamic action takes place'
    ]
  },
  {
    id: 'spk-5',
    title: 'Asking for Directions Politely',
    koreanTarget: '실례지만, 지하철역이 어디에 있어요?',
    romanization: 'sil-lye-ji-man, ji-ha-cheol-yeog-i eo-di-e iss-eo-yo?',
    english: 'Excuse me, but where is the subway station?',
    filipino: 'Paumanhin po, saan po naroroon ang estasyon ng tren?',
    difficulty: 'Level 1',
    category: 'Daily Conversation',
    tips: [
      'Soft tone on 실례지만 (excuse me)',
      '연음 법칙 on 지하철역이 -> [지하철려기]'
    ]
  }
];
