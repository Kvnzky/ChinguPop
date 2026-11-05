import React, { useState, useEffect } from 'react';
import { Quiz, ExamAttempt, UserProfile } from '../../types';
import { ACADEMY_QUIZZES } from '../../data/assessmentData';
import { storage } from '../../services/storageService';
import { 
  Award, 
  Timer, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  BookOpen, 
  FileText 
} from 'lucide-react';

interface ExamSystemProps {
  currentUser: UserProfile;
}

export const ExamSystem: React.FC<ExamSystemProps> = ({ currentUser }) => {
  const [quizzes] = useState<Quiz[]>(ACADEMY_QUIZZES);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(0);
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const [examResult, setExamResult] = useState<ExamAttempt | null>(null);
  const [attempts, setAttempts] = useState<ExamAttempt[]>(storage.getExamAttempts(currentUser.id));

  useEffect(() => {
    let timer: any;
    if (activeQuiz && !isExamCompleted && timeLeftSeconds > 0) {
      timer = setInterval(() => {
        setTimeLeftSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeQuiz, isExamCompleted, timeLeftSeconds]);

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setTimeLeftSeconds(quiz.timeLimitMinutes * 60);
    setIsExamCompleted(false);
    setExamResult(null);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleAutoSubmit = () => {
    if (!activeQuiz) return;

    let scoreCount = 0;
    const answerBreakdown = activeQuiz.questions.map(q => {
      const chosen = selectedAnswers[q.id];
      const isCorrect = chosen === q.correctIndex;
      if (isCorrect) scoreCount++;
      return {
        questionId: q.id,
        selectedIndex: chosen ?? -1,
        isCorrect
      };
    });

    const scorePercentage = Math.round((scoreCount / activeQuiz.questions.length) * 100);
    const passed = scorePercentage >= activeQuiz.passingScore;

    const attempt: ExamAttempt = {
      id: `attempt-${Date.now()}`,
      quizId: activeQuiz.id,
      quizTitle: activeQuiz.title,
      studentId: currentUser.id,
      timestamp: new Date().toLocaleString(),
      score: scorePercentage,
      totalQuestions: activeQuiz.questions.length,
      passed,
      answers: answerBreakdown
    };

    storage.saveExamAttempt(attempt);
    setExamResult(attempt);
    setIsExamCompleted(true);
    setAttempts(storage.getExamAttempts(currentUser.id));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const calculateGradeLetter = (score: number) => {
    if (score >= 90) return { grade: 'A', label: 'Distinction' };
    if (score >= 80) return { grade: 'B', label: 'Merit' };
    if (score >= 70) return { grade: 'C', label: 'Satisfactory' };
    if (score >= 60) return { grade: 'D', label: 'Pass' };
    return { grade: 'F', label: 'Fail / Remedial' };
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-academy-navy text-academy-gold">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-xl text-academy-navy">
              Academic Quizzes, Evaluations & TOPIK I Examinations
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Timed university evaluations, instant automated grading, and comprehensive answers review.
            </p>
          </div>
        </div>
      </div>

      {!activeQuiz ? (
        /* Examination Catalog */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => {
            const pastAttempt = attempts.find(a => a.quizId === quiz.id);
            return (
              <div key={quiz.id} className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-bold">
                      {quiz.type}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-stone-500 font-mono">
                      <Timer className="w-3.5 h-3.5" /> {quiz.timeLimitMinutes} Mins
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-academy-navy">
                    {quiz.title}
                  </h3>

                  <p className="text-xs text-stone-600">
                    Comprehensive testing across Grammar, Vocabulary, Reading, and Listening. Passing threshold: {quiz.passingScore}%.
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  {pastAttempt ? (
                    <div className="text-xs">
                      <span className="text-stone-500">Latest Record: </span>
                      <strong className={pastAttempt.passed ? 'text-emerald-700' : 'text-rose-700'}>
                        {pastAttempt.score}% ({pastAttempt.passed ? 'PASSED' : 'FAILED'})
                      </strong>
                    </div>
                  ) : (
                    <span className="text-xs text-stone-400 italic">Not yet taken</span>
                  )}

                  <button
                    type="button"
                    onClick={() => handleStartQuiz(quiz)}
                    className="px-4 py-2 rounded-lg bg-academy-navy hover:bg-academy-navy-light text-academy-ivory font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    {pastAttempt ? 'Retake Exam' : 'Start Examination'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : isExamCompleted && examResult ? (
        /* Results & Review Screen */
        <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm space-y-8 animate-in fade-in duration-200">
          <div className="text-center space-y-3 pb-6 border-b border-stone-200">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-academy-navy text-academy-gold font-serif text-3xl font-bold shadow-lg">
              {calculateGradeLetter(examResult.score).grade}
            </div>
            <h3 className="font-serif font-bold text-2xl text-academy-navy">
              Examination Completed: {examResult.passed ? 'Passed with Honors' : 'Remedial Review Required'}
            </h3>
            <p className="text-sm text-stone-600">
              Final Academic Score: <strong className="text-academy-navy font-mono text-lg">{examResult.score}%</strong> ({examResult.score >= 70 ? `${calculateGradeLetter(examResult.score).label}` : 'Did not meet passing score'})
            </p>
          </div>

          {/* Question by Question Review */}
          <div className="space-y-6">
            <h4 className="font-serif font-bold text-base text-academy-navy">
              Detailed Answer Key & Linguistic Explanations
            </h4>

            {activeQuiz.questions.map((q, idx) => {
              const studentAnswerIdx = selectedAnswers[q.id];
              const isCorrect = studentAnswerIdx === q.correctIndex;
              return (
                <div key={q.id} className="p-5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-academy-gold-dark">
                      QUESTION {idx + 1} ({q.section})
                    </span>
                    <span className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded ${
                      isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {isCorrect ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-academy-navy">{q.question}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, oIdx) => {
                      const wasChosen = studentAnswerIdx === oIdx;
                      const isTargetCorrect = q.correctIndex === oIdx;
                      return (
                        <div
                          key={oIdx}
                          className={`p-3 rounded-lg border font-medium ${
                            isTargetCorrect
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                              : wasChosen
                              ? 'bg-rose-50 border-rose-300 text-rose-900 line-through'
                              : 'bg-white border-stone-200 text-stone-600'
                          }`}
                        >
                          {opt} {isTargetCorrect && '✓'}
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-950">
                    <span className="font-bold">Faculty Explanation:</span> {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={() => setActiveQuiz(null)}
              className="px-5 py-2.5 rounded-lg border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold"
            >
              Back to Examination Catalog
            </button>
            <button
              type="button"
              onClick={() => handleStartQuiz(activeQuiz)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-academy-navy hover:bg-academy-navy-light text-academy-ivory text-xs font-semibold uppercase tracking-wider"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Examination</span>
            </button>
          </div>
        </div>
      ) : (
        /* Live Timed Examination Interface */
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Top Bar: Progress & Timer */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <div>
              <span className="text-xs font-serif font-bold text-academy-navy">
                {activeQuiz.title}
              </span>
              <div className="text-xs text-stone-500 font-mono mt-0.5">
                Question {currentQIndex + 1} of {activeQuiz.questions.length}
              </div>
            </div>

            <div className="flex items-center gap-2 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-300 font-mono font-bold text-sm text-academy-navy">
              <Timer className="w-4 h-4 text-academy-wine" />
              <span>{formatTime(timeLeftSeconds)}</span>
            </div>
          </div>

          {/* Current Question Body */}
          {(() => {
            const q = activeQuiz.questions[currentQIndex];
            const currentSelected = selectedAnswers[q.id];
            return (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-academy-gold-dark px-2 py-0.5 bg-amber-50 rounded border border-amber-200">
                    Section: {q.section}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-academy-navy leading-relaxed">
                    {q.question}
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {q.options.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(q.id, idx)}
                      className={`w-full text-left p-4 rounded-xl border text-sm font-semibold transition-all flex items-center gap-3 min-h-[52px] active:scale-99 ${
                        currentSelected === idx
                          ? 'border-[#6C52EE] bg-purple-50 text-[#2C1E6D] shadow-sm ring-2 ring-purple-400/50'
                          : 'border-stone-200 hover:border-stone-300 bg-white text-stone-800'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        currentSelected === idx
                          ? 'bg-[#6C52EE] text-white shadow-xs'
                          : 'bg-stone-100 text-stone-600 border border-stone-300'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="flex-1">{opt}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={currentQIndex === 0}
              onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
              className="px-4 py-3 min-h-[44px] rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-50 disabled:opacity-40 transition-colors"
            >
              Previous
            </button>

            {currentQIndex < activeQuiz.questions.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentQIndex(prev => prev + 1)}
                className="px-6 py-3 min-h-[44px] rounded-xl bg-gradient-to-r from-[#6C52EE] to-[#8E77F7] text-white text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-md active:scale-95 transition-all"
              >
                Next Question
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAutoSubmit}
                className="px-6 py-3 min-h-[44px] rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-md active:scale-95 transition-all"
              >
                Submit Examination Now
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
