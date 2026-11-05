import { StudyPlanItem, UserProfile } from '../types';

export class StudyPlannerService {
  /**
   * Generates a balanced 7-day, 60-minute daily academic timetable
   */
  generateWeeklyPlan(student: UserProfile): StudyPlanItem[] {
    const days = [
      { day: 1, name: 'Monday', focus: 'Hangul Vowels & Pronunciation Foundation' },
      { day: 2, name: 'Tuesday', focus: 'Consonant Anatomy & Syllable Construction' },
      { day: 3, name: 'Wednesday', focus: 'Batchim 7 Sound Rules & Audio Dictation' },
      { day: 4, name: 'Thursday', focus: 'Liaison Fluidity & Word Reading' },
      { day: 5, name: 'Friday', focus: 'Polite Greetings & University Self-Introduction' },
      { day: 6, name: 'Saturday', focus: 'Conversational Speaking Lab & Real Scenarios' },
      { day: 0, name: 'Sunday', focus: 'Weekly Cumulative Quiz & Homework Consolidation' }
    ];

    const plan: StudyPlanItem[] = [];

    days.forEach(({ day, name, focus }) => {
      // 1. Structured Lesson (20 mins)
      plan.push({
        id: `plan-${day}-1`,
        dayOfWeek: day,
        timeSlot: '08:00 - 08:20',
        durationMinutes: 20,
        activityType: 'Structured lesson',
        title: `${name} Core Class: ${focus}`,
        description: 'Read detailed grammar explanations, audio examples, and complete guided comprehension checks.',
        targetSkill: 'grammar',
        completed: day === 1 || day === 2 // default initial completed for demonstration
      });

      // 2. Grammar & Vocabulary (10 mins)
      plan.push({
        id: `plan-${day}-2`,
        dayOfWeek: day,
        timeSlot: '08:20 - 08:30',
        durationMinutes: 10,
        activityType: 'Grammar and vocabulary',
        title: 'Spaced Repetition Flashcard Drill (SM-2)',
        description: 'Review due cards: Again, Hard, Good, Easy to strengthen long-term memory.',
        targetSkill: 'vocabulary',
        completed: day === 1
      });

      // 3. Listening Practice (10 mins)
      plan.push({
        id: `plan-${day}-3`,
        dayOfWeek: day,
        timeSlot: '08:30 - 08:40',
        durationMinutes: 10,
        activityType: 'Listening practice',
        title: 'Native Audio Dictation & Shadowing',
        description: 'Listen to native Seoul speaker clips at normal and slow speeds, identifying Batchim sound shifts.',
        targetSkill: 'listening',
        completed: false
      });

      // 4. Speaking Practice (10 mins)
      plan.push({
        id: `plan-${day}-4`,
        dayOfWeek: day,
        timeSlot: '08:40 - 08:50',
        durationMinutes: 10,
        activityType: 'Speaking practice',
        title: 'Speaking Lab Voice Articulation',
        description: 'Record target Korean sentences, receive acoustic feedback, and correct missed syllables.',
        targetSkill: 'speaking',
        completed: false
      });

      // 5. Reading or Writing (5 mins)
      plan.push({
        id: `plan-${day}-5`,
        dayOfWeek: day,
        timeSlot: '08:50 - 08:55',
        durationMinutes: 5,
        activityType: 'Reading or writing',
        title: 'Graded Reading Comprehension',
        description: 'Read authentic campus notices or daily diaries and answer comprehension questions.',
        targetSkill: 'reading',
        completed: false
      });

      // 6. Review & Homework (5 mins)
      plan.push({
        id: `plan-${day}-6`,
        dayOfWeek: day,
        timeSlot: '08:55 - 09:00',
        durationMinutes: 5,
        activityType: 'Review and homework',
        title: 'Homework Submission & Professor Feedback',
        description: 'Submit written homework prompts and review tutor corrections.',
        targetSkill: 'writing',
        completed: false
      });
    });

    return plan;
  }
}

export const studyPlanner = new StudyPlannerService();
