import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, RotateCcw, Award, Play } from 'lucide-react';
import { KoreanAudioPlayer } from './KoreanAudioPlayer';

export interface ListeningQuestion {
  id: string;
  targetSound: string;
  audioText: string;
  questionPrompt: string;
  options: string[];
  correctOption: string;
  soundDifferenceExplanation: string;
}

interface ListeningExerciseProps {
  questions: ListeningQuestion[];
  onCompleteExercise?: (score: number) => void;
  className?: string;
}

export const ListeningExercise: React.FC<ListeningExerciseProps> = ({
  questions,
  onCompleteExercise,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [exerciseFinished, setExerciseFinished] = useState(false);

  const currentQ = questions[currentIndex];
  const selected = selectedAnswers[currentQ.id];
  const isCorrect = selected === currentQ.correctOption;

  const handleSelectOption = (opt: string) => {
    if (isAnswerChecked) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: opt }));
  };

  const handleCheckAnswer = () => {
    if (!selected) return;
    setIsAnswerChecked(true);
    if (selected === currentQ.correctOption) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsAnswerChecked(false);
    } else {
      setExerciseFinished(true);
      const finalScore = Math.round(((correctCount + (isCorrect ? 1 : 0)) / questions.length) * 100);
      if (onCompleteExercise) {
        onCompleteExercise(finalScore);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsAnswerChecked(false);
    setCorrectCount(0);
    setExerciseFinished(false);
  };

  return (
    <div className={`p-6 rounded-2xl border border-stone-200 bg-white shadow-sm space-y-6 ${className}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
        <div>
          <span className="text-[10px] uppercase font-mono font-bold text-academy-gold-dark tracking-wider block">
            Acoustic Discrimination Drill
          </span>
          <h4 className="font-serif font-bold text-lg text-academy-navy mt-0.5">
            Listen & Identify the Sound
          </h4>
        </div>
        <span className="text-xs font-mono text-stone-500 bg-stone-100 px-3 py-1 rounded-lg">
          Question {currentIndex + 1} of {questions.length}
        </span>
      </div>

      {!exerciseFinished ? (
        <div className="space-y-6">
          
          {/* Audio Player Banner */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col items-center justify-center text-center space-y-3">
            <span className="text-xs font-semibold text-academy-navy uppercase tracking-wider">
              {currentQ.questionPrompt}
            </span>
            <div className="py-2">
              <KoreanAudioPlayer text={currentQ.audioText} size="lg" label="Audio Prompt" />
            </div>
            <span className="text-[11px] text-stone-500">
              Listen carefully to the lip shape and tongue elevation in the audio.
            </span>
          </div>

          {/* Options Grid */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block">
              Choose the exact character you heard:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {currentQ.options.map((opt) => {
                const isSelected = selected === opt;
                let btnStyle = 'border-stone-200 hover:border-academy-gold bg-stone-50/60 text-academy-navy';

                if (isAnswerChecked) {
                  if (opt === currentQ.correctOption) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-300';
                  } else if (isSelected) {
                    btnStyle = 'border-rose-400 bg-rose-50 text-rose-800 line-through';
                  } else {
                    btnStyle = 'border-stone-200 opacity-50 bg-stone-50 text-stone-400';
                  }
                } else if (isSelected) {
                  btnStyle = 'border-academy-navy bg-academy-navy text-academy-ivory font-bold shadow-md';
                }

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelectOption(opt)}
                    className={`h-20 rounded-xl border-2 font-serif text-3xl font-bold flex items-center justify-center transition-all ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Answer Checked Feedback Box */}
          {isAnswerChecked && (
            <div className={`p-4 rounded-xl border text-xs space-y-1.5 animate-in fade-in duration-150 ${
              isCorrect ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950' : 'bg-rose-50/80 border-rose-200 text-rose-950'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>정답입니다! (Correct!) You identified {currentQ.correctOption} accurately.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>아쉽습니다. The correct answer was {currentQ.correctOption}.</span>
                  </>
                )}
              </div>
              <p className="leading-relaxed text-stone-700">
                <strong>Faculty Sound Breakdown:</strong> {currentQ.soundDifferenceExplanation}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
            <span className="text-xs font-mono text-stone-400">
              Current Score: {correctCount} / {currentIndex + (isAnswerChecked ? 1 : 0)}
            </span>

            {!isAnswerChecked ? (
              <button
                type="button"
                disabled={!selected}
                onClick={handleCheckAnswer}
                className="px-6 py-2.5 rounded-xl bg-academy-navy hover:bg-academy-navy-light text-academy-ivory font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-40"
              >
                Confirm My Answer
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-academy-gold hover:bg-academy-gold-light text-academy-navy font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                {currentIndex < questions.length - 1 ? 'Next Question →' : 'Complete Exercise'}
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Results View */
        <div className="text-center py-8 space-y-4 animate-in fade-in duration-200">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-emerald-700">
            <Award className="w-8 h-8" />
          </div>
          <h4 className="font-serif font-bold text-xl text-academy-navy">
            Listening Exercise Completed!
          </h4>
          <p className="text-xs text-stone-600 max-w-sm mx-auto">
            You accurately identified <strong className="text-academy-navy">{correctCount} of {questions.length}</strong> phonemes ({Math.round((correctCount / questions.length) * 100)}%).
          </p>

          <div className="pt-3">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-academy-navy text-academy-ivory text-xs font-semibold hover:bg-academy-navy-light transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Exercise</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
