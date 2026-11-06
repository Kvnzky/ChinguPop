import React, { useState } from 'react';
import { SpeakingExercise, UserProfile } from '../../types';
import { SPEAKING_EXERCISES } from '../../data/speakingData';
import { speech } from '../../services/speechService';
import { storage } from '../../services/storageService';
import { AudioButton } from '../common/AudioButton';
import { Mic, MicOff, AlertCircle, CheckCircle2, RotateCcw, Info } from 'lucide-react';

interface SpeechLabProps {
  currentUser?: UserProfile;
}

export const SpeechLab: React.FC<SpeechLabProps> = ({ currentUser }) => {
  const [exercises] = useState<SpeakingExercise[]>(SPEAKING_EXERCISES);
  const [selectedEx, setSelectedEx] = useState<SpeakingExercise>(SPEAKING_EXERCISES[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [stopFn, setStopFn] = useState<(() => void) | null>(null);
  const [recognizedText, setRecognizedText] = useState<string>('');
  const [evalResult, setEvalResult] = useState<{
    accuracyScore: number;
    matchedSyllables: string[];
    missedSyllables: string[];
    phoneticFeedback: string;
    isApproximation: boolean;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isSupported = speech.isSpeechRecognitionSupported();

  const handleStartRecording = () => {
    setErrorMsg(null);
    setRecognizedText('');
    setEvalResult(null);
    setIsRecording(true);

    const stop = speech.startListening(
      (text) => {
        setRecognizedText(text);
        setIsRecording(false);
        const result = speech.evaluatePronunciation(selectedEx.koreanTarget, text);
        setEvalResult(result);
        if (result.accuracyScore >= 50 && currentUser && currentUser.id !== 'guest-visitor') {
          storage.addXP(currentUser.id, 20, `Completed Speaking Practice: ${selectedEx.title}`, `speech-${selectedEx.id}`);
        }
      },
      (err) => {
        setErrorMsg(err);
        setIsRecording(false);
      },
      () => {
        setIsRecording(false);
      }
    );

    setStopFn(() => stop);
  };

  const handleStopRecording = () => {
    if (stopFn) {
      stopFn();
    }
    setIsRecording(false);
  };

  const handleSelectExercise = (ex: SpeakingExercise) => {
    setSelectedEx(ex);
    setRecognizedText('');
    setEvalResult(null);
    setErrorMsg(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Speaking Lab Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-academy-wine-light text-academy-wine">
                <Mic className="w-5 h-5" />
              </span>
              <div>
                <h2 className="font-serif font-bold text-xl text-academy-navy">
                  Korean Oral Speaking & Pronunciation Laboratory
                </h2>
                <p className="text-xs text-stone-600 mt-0.5">
                  Listen to native targets, record your Korean voice, and compare syllable accuracy.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded bg-stone-100 border border-stone-200 text-stone-600 font-mono">
              WebSpeech Engine: {isSupported ? 'Active' : 'Microphone Unsupported'}
            </span>
          </div>
        </div>

        {/* Transparency Notice Requirement */}
        <div className="mt-4 p-3 bg-stone-50 border border-stone-200 rounded-lg flex items-start gap-2.5 text-xs text-stone-600">
          <Info className="w-4 h-4 text-academy-gold-dark shrink-0 mt-0.5" />
          <span>
            <strong>Transparency Notice:</strong> Pronunciation matching uses the browser speech recognition API and character normalization. It serves as an acoustic feedback approximation and does not claim certified phonetic laboratory scoring.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Exercise Queue */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-3">
          <h3 className="font-serif font-bold text-sm text-academy-navy pb-2 border-b border-stone-200">
            Speaking Exercises Queue
          </h3>
          <div className="space-y-2">
            {exercises.map((ex) => (
              <button
                key={ex.id}
                type="button"
                onClick={() => handleSelectExercise(ex)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedEx.id === ex.id
                    ? 'border-academy-navy bg-stone-50 shadow-sm'
                    : 'border-stone-100 hover:border-stone-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-stone-100 rounded text-stone-600">
                    {ex.category}
                  </span>
                  <span className="text-xs font-semibold text-academy-gold-dark">
                    {ex.difficulty}
                  </span>
                </div>
                <div className="text-sm font-serif font-bold text-academy-navy mt-1">
                  {ex.koreanTarget}
                </div>
                <div className="text-xs text-stone-600 truncate mt-0.5">
                  {ex.english}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Center/Right: Recording Booth & Analysis */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Target Card */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-academy-gold-dark uppercase tracking-wider">
                Target Korean Sentence
              </span>
              <AudioButton text={selectedEx.koreanTarget} size="md" showRateToggle />
            </div>

            <div className="text-2xl sm:text-3xl font-serif font-bold text-academy-navy leading-relaxed">
              {selectedEx.koreanTarget}
            </div>

            <div className="space-y-1 text-xs">
              <div className="font-mono text-stone-500">
                Romanization: {selectedEx.romanization}
              </div>
              <div className="font-medium text-stone-800">
                English: {selectedEx.english}
              </div>
              {selectedEx.filipino && (
                <div className="text-amber-800 italic">
                  🇵🇭 Filipino: {selectedEx.filipino}
                </div>
              )}
            </div>

            {/* Pronunciation Tips */}
            <div className="pt-3 border-t border-stone-100">
              <span className="text-xs font-bold text-academy-navy block mb-1.5">
                Professor's Phonetic Tips:
              </span>
              <ul className="list-disc list-inside space-y-1 text-xs text-stone-600">
                {selectedEx.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recording Action Booth */}
          <div className="bg-stone-50 rounded-xl border border-stone-200 p-6 text-center space-y-4">
            <div className="flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                disabled={!isSupported}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse ring-8 ring-rose-200'
                    : 'bg-academy-navy hover:bg-academy-navy-light text-academy-ivory ring-4 ring-academy-gold/30'
                } ${!isSupported ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
              >
                {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8 text-academy-gold" />}
              </button>

              <span className="text-xs font-semibold text-academy-navy mt-3 block">
                {isRecording ? 'Listening to your Korean speech... Click to finish' : 'Click to Speak into Microphone'}
              </span>
              <span className="text-[11px] text-stone-500 mt-0.5">
                Target language: 한국어 (ko-KR)
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-center gap-2 justify-center">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          {/* Assessment & Syllable Feedback Card */}
          {evalResult && (
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <h4 className="font-serif font-bold text-base text-academy-navy">
                  Pronunciation Accuracy Assessment
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-stone-500">Match Score:</span>
                  <span className={`text-lg font-bold font-mono px-2.5 py-0.5 rounded ${
                    evalResult.accuracyScore >= 80 ? 'bg-emerald-100 text-emerald-800' :
                    evalResult.accuracyScore >= 60 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {evalResult.accuracyScore}%
                  </span>
                </div>
              </div>

              {/* What the Speech Engine Heard */}
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs">
                <span className="text-stone-500 font-semibold block mb-1">Recognized Speech:</span>
                <span className="font-serif font-bold text-base text-academy-navy">
                  "{recognizedText || '(No clear speech detected)'}"
                </span>
              </div>

              {/* Syllable Breakdown */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-academy-navy block">
                  Syllable Articulation Diagnostics:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {evalResult.matchedSyllables.map((syl, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-serif font-bold text-sm">
                      {syl} ✓
                    </span>
                  ))}
                  {evalResult.missedSyllables.map((syl, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-rose-50 text-rose-800 border border-rose-200 font-serif font-bold text-sm">
                      {syl} ✗
                    </span>
                  ))}
                </div>
              </div>

              {/* Phonetic Feedback */}
              <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-lg text-xs text-amber-950 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{evalResult.phoneticFeedback}</p>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleStartRecording}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-academy-navy text-academy-ivory text-xs font-semibold hover:bg-academy-navy-light transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
