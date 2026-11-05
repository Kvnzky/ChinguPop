import { CharacterItemData } from '../components/classroom/interactive/HangulCharacterCard';
import { ListeningQuestion } from '../components/classroom/interactive/ListeningExercise';
import { WritingPracticeTarget } from '../components/classroom/interactive/HangulWritingCanvas';
import { InteractiveObjective } from '../components/classroom/interactive/LearningObjectiveChecklist';

export const BASIC_VOWELS_INTERACTIVE_DATA: CharacterItemData[] = [
  {
    char: 'ㅏ',
    name: '아',
    romanization: 'a',
    approxEnglish: 'Like "a" in father (clear open vowel)',
    mouthSummary: 'Open wide, jaw relaxed low',
    tongueSummary: 'Tongue flat and low in mouth',
    soundGuide: 'Open your mouth comfortably wide as if saying "ah" at a doctor clinic. The tongue stays flat and relaxed at the bottom of the mouth.',
    phoneticGuide: {
      char: 'ㅏ',
      name: '아 (a)',
      category: 'Vowel',
      mouthOpening: 'Wide Open',
      lipShape: 'Neutral / Relaxed',
      tonguePosition: 'Low & Flat',
      jawPosition: 'Dropped Low',
      airflowExplanation: 'Open acoustic vowel channel. Vocal cords vibrate freely with zero oral friction.',
      filipinoComparison: 'Katulad ng malinaw na "A" sa Tagalog (hal. "araw"), ngunit bahagyang mas bukas ang panga at nakarelaks ang dila.',
      commonMistake: 'Do not pronounce it like the English "cat" or "bad" (/æ/). In Korean, it is a pure, open central-back vowel.'
    }
  },
  {
    char: 'ㅑ',
    name: '야',
    romanization: 'ya',
    approxEnglish: 'Like "ya" in yard',
    mouthSummary: 'Glides rapidly from "i" to wide open "a"',
    tongueSummary: 'Tongue starts high front, then drops flat',
    soundGuide: 'Begin with the tongue high and front as in "ee", then glide instantaneously into wide open "ㅏ".',
    phoneticGuide: {
      char: 'ㅑ',
      name: '야 (ya)',
      category: 'Vowel',
      mouthOpening: 'Wide Open',
      lipShape: 'Spread Wide (Smile)',
      tonguePosition: 'Mid-Low',
      jawPosition: 'Dropped Low',
      airflowExplanation: 'Palatal glide [j] transitioning into open vowel [a].',
      filipinoComparison: 'Tulad ng "ya" sa "yaya" o "yaman". Mabilis ang paglipat mula sa ngiti patungo sa bukas na bibig.',
      commonMistake: 'Do not pause between "y" and "a". It is a single syllable diphthong glide.'
    }
  },
  {
    char: 'ㅓ',
    name: '어',
    romanization: 'eo',
    approxEnglish: 'Like "u" in cup or British "off" (unrounded "o")',
    mouthSummary: 'Half-open mouth, lips completely unrounded',
    tongueSummary: 'Tongue pulled slightly back, mid-low',
    soundGuide: 'Open your mouth half-way, pull your tongue toward the back of your throat, and DO NOT round your lips. English speakers often confuse this with ㅗ (o).',
    phoneticGuide: {
      char: 'ㅓ',
      name: '어 (eo)',
      category: 'Vowel',
      mouthOpening: 'Half-Open',
      lipShape: 'Neutral / Relaxed',
      tonguePosition: 'Mid-Low',
      jawPosition: 'Relaxed Mid',
      airflowExplanation: 'Open-mid back unrounded vowel [ʌ]. The vocal tract has zero lip protrusion.',
      filipinoComparison: 'Walang eksaktong katumbas sa Tagalog. Ito ay malalim na tunog sa likod ng lalamunan nang HINDI binibilog ang nguso (hindi tulad ng Tagalog na "O").',
      commonMistake: 'Rounding your lips! If your lips make a circle, you will accidentally pronounce ㅗ (o) instead of ㅓ (eo).'
    }
  },
  {
    char: 'ㅕ',
    name: '여',
    romanization: 'yeo',
    approxEnglish: 'Like "yo" in yawn / y-glide + eo',
    mouthSummary: 'Glides rapidly from "i" into unrounded "eo"',
    tongueSummary: 'Tongue starts high, pulls back to mid',
    soundGuide: 'Combine the "y" glide with the unrounded "eo" sound. Keep lips relaxed and flat.',
    phoneticGuide: {
      char: 'ㅕ',
      name: '여 (yeo)',
      category: 'Vowel',
      mouthOpening: 'Half-Open',
      lipShape: 'Neutral / Relaxed',
      tonguePosition: 'Mid-Low',
      jawPosition: 'Relaxed Mid',
      airflowExplanation: 'Palatal semivowel [j] into open-mid unrounded [ʌ].',
      filipinoComparison: 'Katulad ng pagsasabi ng "yuh" o simula ng "yellow", ngunit mas malalim sa lalamunan.',
      commonMistake: 'Rounding lips into "yo". Keep the mouth unrounded at the end.'
    }
  },
  {
    char: 'ㅗ',
    name: '오',
    romanization: 'o',
    approxEnglish: 'Like "o" in boat or Spanish "o" (tight circular lips)',
    mouthSummary: 'Tightly rounded circular lips pointing forward',
    tongueSummary: 'Tongue body raised toward mid-back',
    soundGuide: 'Round your lips tightly into a firm circle like looking through a small telescope. The vowel is pure and does not glide into "w".',
    phoneticGuide: {
      char: 'ㅗ',
      name: '오 (o)',
      category: 'Vowel',
      mouthOpening: 'Slightly Open',
      lipShape: 'Rounded (Circle)',
      tonguePosition: 'High & Back',
      jawPosition: 'Relaxed Mid',
      airflowExplanation: 'Close-mid back rounded vowel [o]. Strong lip pursing and high pharyngeal resonance.',
      filipinoComparison: 'Malapit sa bilog na "O" sa Tagalog tulad ng "oo" o "oras", ngunit mas pabilog at matigas ang nguso.',
      commonMistake: 'Adding an English "w" ending ("oh-oo"). Korean vowels are pure monophthongs that do not shift halfway.'
    }
  },
  {
    char: 'ㅛ',
    name: '요',
    romanization: 'yo',
    approxEnglish: 'Like "yo" in yogurt (tight rounded lips)',
    mouthSummary: 'Glides from "i" into tightly rounded "o"',
    tongueSummary: 'Tongue starts high front, then pulls back',
    soundGuide: 'Glide from high "ee" into tightly rounded "ㅗ". Very common as the polite sentence ending marker (-요).',
    phoneticGuide: {
      char: 'ㅛ',
      name: '요 (yo)',
      category: 'Vowel',
      mouthOpening: 'Slightly Open',
      lipShape: 'Rounded (Circle)',
      tonguePosition: 'High & Back',
      jawPosition: 'Relaxed Mid',
      airflowExplanation: 'Palatal glide [j] into close-mid rounded vowel [o].',
      filipinoComparison: 'Tulad ng "yo" sa "yoyo", pabilugin nang husto ang nguso sa pagtatapos.',
      commonMistake: 'Leaving the lips flat. Ensure tight circular lip rounding.'
    }
  },
  {
    char: 'ㅜ',
    name: '우',
    romanization: 'u',
    approxEnglish: 'Like "oo" in moon / food',
    mouthSummary: 'Lips pursed forward like sipping through a straw',
    tongueSummary: 'Tongue raised high toward the back roof',
    soundGuide: 'Pucker and project your lips forward as if sipping through a narrow drinking straw. Raise the back of your tongue high.',
    phoneticGuide: {
      char: 'ㅜ',
      name: '우 (u)',
      category: 'Vowel',
      mouthOpening: 'Narrow / Closed',
      lipShape: 'Puckered',
      tonguePosition: 'High & Back',
      jawPosition: 'High / Nearly Closed',
      airflowExplanation: 'Close back rounded vowel [u]. Lips strongly protruded.',
      filipinoComparison: 'Katumbas ng "U" sa Tagalog (hal. "ulan", "upo"), ngunit bahagyang mas nakanguso pasulong.',
      commonMistake: 'Confusing ㅗ with ㅜ. ㅗ is an "O" shape, while ㅜ is puckered forward like sipping a straw.'
    }
  },
  {
    char: 'ㅠ',
    name: '유',
    romanization: 'yu',
    approxEnglish: 'Like "you" in English',
    mouthSummary: 'Glides from "i" into pursed "u"',
    tongueSummary: 'Tongue starts high front, transitions to high back',
    soundGuide: 'Glide smoothly from the "y" sound directly into the puckered "ㅜ". Found in common words like 우유 (milk).',
    phoneticGuide: {
      char: 'ㅠ',
      name: '유 (yu)',
      category: 'Vowel',
      mouthOpening: 'Narrow / Closed',
      lipShape: 'Puckered',
      tonguePosition: 'High & Back',
      jawPosition: 'High / Nearly Closed',
      airflowExplanation: 'Palatal glide [j] into close back rounded [u].',
      filipinoComparison: 'Tulad ng "yu" sa "yugto". Pabilog at pasulong ang nguso.',
      commonMistake: 'Not puckering lips forward enough.'
    }
  },
  {
    char: 'ㅡ',
    name: '으',
    romanization: 'eu',
    approxEnglish: 'Unrounded "u" / grimace sound (no English equivalent)',
    mouthSummary: 'Lips pulled wide into a flat grimace (unrounded)',
    tongueSummary: 'Tongue pulled straight back, high and flat',
    soundGuide: 'Smile wide or make an unrounded grimace. Without moving your lips, pull your tongue back toward your throat and make a sound.',
    phoneticGuide: {
      char: 'ㅡ',
      name: '으 (eu)',
      category: 'Vowel',
      mouthOpening: 'Narrow / Closed',
      lipShape: 'Spread Wide (Smile)',
      tonguePosition: 'Pulled Back (Flat)',
      jawPosition: 'High / Nearly Closed',
      airflowExplanation: 'Close back unrounded vowel [ɯ]. ZERO lip rounding allowed.',
      filipinoComparison: 'Maihahalintulad sa tunog kapag nandidiri o walang nguso ("uhhh" na nakangiti). Napakahalaga sa Korean.',
      commonMistake: 'Rounding the lips into "oo" (/u/). You MUST keep your lips completely flat and spread wide!'
    }
  },
  {
    char: 'ㅣ',
    name: '이',
    romanization: 'i',
    approxEnglish: 'Like "ee" in see / meet',
    mouthSummary: 'Gentle relaxed smile, lips spread wide',
    tongueSummary: 'Tongue raised high toward the front hard palate',
    soundGuide: 'Spread your lips into a gentle smile and raise the front of your tongue close to the roof of your mouth. Very bright, high frequency vowel.',
    phoneticGuide: {
      char: 'ㅣ',
      name: '이 (i)',
      category: 'Vowel',
      mouthOpening: 'Narrow / Closed',
      lipShape: 'Spread Wide (Smile)',
      tonguePosition: 'High & Front',
      jawPosition: 'High / Nearly Closed',
      airflowExplanation: 'Close front unrounded vowel [i]. High front oral resonance.',
      filipinoComparison: 'Eksaktong katulad ng "I" sa Tagalog (hal. "ilong", "isda").',
      commonMistake: 'Pronouncing it as a lax English "ih" (as in "sit"). In Korean, it is always a tense, pure "ee" sound.'
    }
  }
];

export const VOWEL_LISTENING_QUESTIONS: ListeningQuestion[] = [
  {
    id: 'lq-1',
    targetSound: 'ㅏ',
    audioText: '아',
    questionPrompt: 'Audio Question 1: Listen to the vowel sound.',
    options: ['ㅏ', 'ㅓ', 'ㅗ', 'ㅜ'],
    correctOption: 'ㅏ',
    soundDifferenceExplanation: 'ㅏ (a) is produced with an open wide mouth and dropped jaw. ㅓ (eo) is only half-open, while ㅗ and ㅜ have rounded lips.'
  },
  {
    id: 'lq-2',
    targetSound: 'ㅓ',
    audioText: '어',
    questionPrompt: 'Audio Question 2: Listen to the vowel sound.',
    options: ['ㅏ', 'ㅓ', 'ㅗ', 'ㅡ'],
    correctOption: 'ㅓ',
    soundDifferenceExplanation: 'ㅓ (eo) is an unrounded open-mid back vowel. Notice how the lips are completely flat compared to ㅗ (o).'
  },
  {
    id: 'lq-3',
    targetSound: 'ㅗ',
    audioText: '오',
    questionPrompt: 'Audio Question 3: Listen to the vowel sound.',
    options: ['ㅓ', 'ㅗ', 'ㅜ', 'ㅡ'],
    correctOption: 'ㅗ',
    soundDifferenceExplanation: 'ㅗ (o) has tightly rounded lips in a circle. Contrast this with ㅓ where lips are relaxed and flat.'
  },
  {
    id: 'lq-4',
    targetSound: 'ㅡ',
    audioText: '으',
    questionPrompt: 'Audio Question 4: Listen to the vowel sound.',
    options: ['ㅜ', 'ㅡ', 'ㅣ', 'ㅓ'],
    correctOption: 'ㅡ',
    soundDifferenceExplanation: 'ㅡ (eu) is completely unrounded with lips spread into a wide grimace, while ㅜ (u) has lips projected forward like a straw.'
  },
  {
    id: 'lq-5',
    targetSound: 'ㅣ',
    audioText: '이',
    questionPrompt: 'Audio Question 5: Listen to the vowel sound.',
    options: ['ㅡ', 'ㅣ', 'ㅏ', 'ㅓ'],
    correctOption: 'ㅣ',
    soundDifferenceExplanation: 'ㅣ (i) is a bright front vowel with a smiling mouth, raising the front of the tongue high.'
  }
];

export const VOWEL_WRITING_TARGETS: WritingPracticeTarget[] = [
  {
    char: 'ㅏ',
    name: '아 (a)',
    romanization: 'a',
    strokesCount: 2,
    strokeDirections: [
      'Stroke 1: Draw the long vertical line from top to bottom (ㅣ)',
      'Stroke 2: Draw the short horizontal notch from left to right pointing outward (ㅏ)'
    ]
  },
  {
    char: 'ㅓ',
    name: '어 (eo)',
    romanization: 'eo',
    strokesCount: 2,
    strokeDirections: [
      'Stroke 1: Draw the short horizontal notch from left to right (ㅓ)',
      'Stroke 2: Draw the long vertical line from top to bottom (ㅓ)'
    ]
  },
  {
    char: 'ㅗ',
    name: '오 (o)',
    romanization: 'o',
    strokesCount: 2,
    strokeDirections: [
      'Stroke 1: Draw the short vertical stroke pointing upward (ㅗ)',
      'Stroke 2: Draw the long horizontal base line from left to right (ㅗ)'
    ]
  },
  {
    char: 'ㅜ',
    name: '우 (u)',
    romanization: 'u',
    strokesCount: 2,
    strokeDirections: [
      'Stroke 1: Draw the long horizontal top line from left to right (ㅜ)',
      'Stroke 2: Draw the short vertical stroke downward from the center (ㅜ)'
    ]
  },
  {
    char: 'ㅡ',
    name: '으 (eu)',
    romanization: 'eu',
    strokesCount: 1,
    strokeDirections: [
      'Stroke 1: Draw a single steady horizontal line from left to right across the horizon (ㅡ)'
    ]
  },
  {
    char: 'ㅣ',
    name: '이 (i)',
    romanization: 'i',
    strokesCount: 1,
    strokeDirections: [
      'Stroke 1: Draw a single straight vertical line from top to bottom representing standing humanity (ㅣ)'
    ]
  }
];

export const INITIAL_VOWEL_OBJECTIVES: InteractiveObjective[] = [
  {
    id: 'obj-1',
    title: 'Recognize the 10 basic Korean vowels (ㅏ, ㅑ, ㅓ, ㅕ, ㅗ, ㅛ, ㅜ, ㅠ, ㅡ, ㅣ)',
    isCompleted: false,
    requiredAction: 'Review vowel cards in Alphabet Classroom'
  },
  {
    id: 'obj-2',
    title: 'Understand the philosophical origins of Hangul: Heaven (•), Earth (ㅡ), and Man (ㅣ)',
    isCompleted: false,
    requiredAction: 'Read philosophical origins overview'
  },
  {
    id: 'obj-3',
    title: 'Distinguish vertical vowels (ㅏ, ㅓ, ㅣ) from horizontal vowels (ㅗ, ㅜ, ㅡ)',
    isCompleted: false,
    requiredAction: 'Inspect geometric placement rules'
  },
  {
    id: 'obj-4',
    title: 'Master mouth opening and tongue elevation in the Vocal Tract Guide',
    isCompleted: false,
    requiredAction: 'View biomechanical mouth diagrams'
  },
  {
    id: 'obj-5',
    title: 'Accurately distinguish vowel sounds in the Listen & Identify drill',
    isCompleted: false,
    requiredAction: 'Achieve at least 80% on the acoustic test'
  },
  {
    id: 'obj-6',
    title: 'Shadow and record syllable series (가-나-다, 거-너-더, 고-노-도) in the Studio',
    isCompleted: false,
    requiredAction: 'Record voice in Listen & Repeat studio'
  },
  {
    id: 'obj-7',
    title: 'Trace and write Korean vowels in correct stroke sequence',
    isCompleted: false,
    requiredAction: 'Practice on the Hangul Writing Canvas'
  },
  {
    id: 'obj-8',
    title: 'Construct valid 2-part and 3-part Korean syllable blocks',
    isCompleted: false,
    requiredAction: 'Assemble blocks in the Syllable Builder'
  }
];
