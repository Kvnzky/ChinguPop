import { VocabularyWord, SRSGrade } from '../types';

/**
 * SuperMemo SM-2 Algorithm Implementation
 * Quality grades:
 * 0 or 1: Again (Complete blackout or incorrect response)
 * 2: Hard (Correct response with significant hesitation)
 * 3: Good (Correct response with moderate effort)
 * 4: Easy (Perfect response with zero hesitation)
 * 5: Mastered (Instant effortless recall)
 */
export function calculateSM2(word: VocabularyWord, grade: SRSGrade): VocabularyWord {
  let { repetitionNumber, intervalDays, easeFactor, timesCorrect, timesIncorrect } = word;

  if (grade >= 3) {
    timesCorrect += 1;
    if (repetitionNumber === 0) {
      intervalDays = 1;
    } else if (repetitionNumber === 1) {
      intervalDays = 6;
    } else {
      intervalDays = Math.round(intervalDays * easeFactor);
    }
    repetitionNumber += 1;
  } else {
    timesIncorrect += 1;
    repetitionNumber = 0;
    intervalDays = 1;
  }

  // Calculate new Ease Factor:
  // EF' = EF + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))
  easeFactor = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  // Calculate next review date:
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + intervalDays);
  const nextReviewDate = nextDate.toISOString().split('T')[0];

  let status: VocabularyWord['status'] = 'learning';
  if (repetitionNumber === 0) {
    status = 'learning';
  } else if (repetitionNumber >= 4 && intervalDays >= 14) {
    status = 'mastered';
  } else {
    status = 'review';
  }

  return {
    ...word,
    repetitionNumber,
    intervalDays,
    easeFactor: Number(easeFactor.toFixed(2)),
    nextReviewDate,
    lastReviewedDate: new Date().toISOString().split('T')[0],
    status,
    timesCorrect,
    timesIncorrect
  };
}
