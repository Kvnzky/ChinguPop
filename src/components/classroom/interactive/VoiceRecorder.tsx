import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Play, Pause, RotateCcw, CheckCircle, AlertCircle, Volume2, Info } from 'lucide-react';
import { speech } from '../../../services/speechService';
import { KoreanAudioPlayer } from './KoreanAudioPlayer';

interface VoiceRecorderProps {
  targetKorean: string;
  targetRomanization?: string;
  targetEnglish?: string;
  onRecordCompleted?: () => void;
  className?: string;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  targetKorean,
  targetRomanization,
  targetEnglish,
  onRecordCompleted,
  className = ''
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlayingRecording, setIsPlayingRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<any>(null);
  const stopListeningRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      if (recordedAudioUrl) {
        URL.revokeObjectURL(recordedAudioUrl);
      }
      if (stopListeningRef.current) {
        stopListeningRef.current();
      }
    };
  }, []);

  const startRecording = async () => {
    setErrorMsg(null);
    setRecordedAudioUrl(null);
    setRecognizedText('');
    setRecordingSeconds(0);
    audioChunksRef.current = [];

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Your browser does not support audio recording (MediaDevices API). Please try Chrome, Edge, or Safari.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);

        // Stop all audio tracks to release microphone hardware
        stream.getTracks().forEach(track => track.stop());

        if (onRecordCompleted) {
          onRecordCompleted();
        }
      };

      recorder.start();
      setIsRecording(true);

      // Start duration counter
      timerRef.current = setInterval(() => {
        setRecordingSeconds(prev => {
          if (prev >= 10) {
            stopRecording();
            return 10;
          }
          return prev + 1;
        });
      }, 1000);

      // Simultaneously trigger Speech Recognition if supported
      if (speech.isSpeechRecognitionSupported()) {
        const stopRec = speech.startListening(
          (text) => setRecognizedText(text),
          (err) => console.log('Speech recognition notice:', err),
          () => {}
        );
        stopListeningRef.current = stopRec;
      }
    } catch (err: any) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setErrorMsg('Microphone access denied. Please click the lock/settings icon in your browser URL bar and allow microphone permissions.');
      } else if (err.name === 'NotFoundError') {
        setErrorMsg('No microphone detected. Please plug in or enable your microphone.');
      } else {
        setErrorMsg(err.message || 'Unable to start recording.');
      }
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (stopListeningRef.current) {
      stopListeningRef.current();
      stopListeningRef.current = null;
    }
    setIsRecording(false);
  };

  const togglePlayRecording = () => {
    if (!recordedAudioUrl) return;

    if (!audioElementRef.current) {
      audioElementRef.current = new Audio(recordedAudioUrl);
      audioElementRef.current.onended = () => setIsPlayingRecording(false);
    }

    if (isPlayingRecording) {
      audioElementRef.current.pause();
      setIsPlayingRecording(false);
    } else {
      audioElementRef.current.src = recordedAudioUrl;
      audioElementRef.current.play();
      setIsPlayingRecording(true);
    }
  };

  const evalResult = recognizedText ? speech.evaluatePronunciation(targetKorean, recognizedText) : null;

  return (
    <div className={`p-5 rounded-2xl border border-stone-200 bg-white shadow-sm space-y-4 ${className}`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200">
        <div>
          <span className="text-[10px] uppercase font-mono font-bold text-academy-gold-dark tracking-wider block">
            Pronunciation & Recording Studio
          </span>
          <h4 className="font-serif font-bold text-base text-academy-navy mt-0.5">
            Target Korean: <span className="text-xl text-academy-navy font-bold">{targetKorean}</span>
          </h4>
        </div>
        {targetRomanization && (
          <span className="text-xs font-mono text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md self-start sm:self-center">
            [{targetRomanization}] {targetEnglish ? `• ${targetEnglish}` : ''}
          </span>
        )}
      </div>

      {/* Step 1: Listen to Reference */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200">
        <div className="space-y-0.5">
          <span className="text-xs font-bold text-academy-navy block">
            Step 1: Listen to Native Model
          </span>
          <span className="text-[11px] text-stone-500">
            Listen closely at normal (1x) and slow (0.7x) speed.
          </span>
        </div>
        <KoreanAudioPlayer text={targetKorean} size="sm" />
      </div>

      {/* Step 2: Record Voice */}
      <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-academy-navy">
            Step 2: Record Your Articulation
          </span>
          {isRecording && (
            <span className="text-xs font-mono font-bold text-rose-600 animate-pulse flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              Recording: 00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={`flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 ${
              isRecording
                ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-200'
                : 'bg-gradient-to-r from-[#6C52EE] to-[#8E77F7] text-white hover:brightness-110'
            }`}
          >
            {isRecording ? (
              <>
                <MicOff className="w-4 h-4" />
                <span>Stop Recording</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 text-[#FF5CA8]" />
                <span>Record My Voice</span>
              </>
            )}
          </button>

          {recordedAudioUrl && !isRecording && (
            <button
              type="button"
              onClick={togglePlayRecording}
              className="flex items-center gap-2 px-4 py-3 min-h-[44px] rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-[#2C1E6D] font-bold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95"
            >
              {isPlayingRecording ? (
                <>
                  <Pause className="w-4 h-4 text-[#2C1E6D]" />
                  <span>Pause My Audio</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-[#FF5CA8]" />
                  <span>Play My Recording</span>
                </>
              )}
            </button>
          )}

          {recordedAudioUrl && !isRecording && (
            <button
              type="button"
              onClick={startRecording}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-stone-600 hover:text-[#6C52EE] hover:bg-purple-50 rounded-xl transition-colors shrink-0"
              title="Record again"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Step 3: Compare & Feedback */}
      {recordedAudioUrl && (
        <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200/80 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Step 3: Self-Evaluation & Acoustic Comparison</span>
            </span>
            <span className="text-[11px] font-mono text-emerald-800">
              Voice Saved ✓
            </span>
          </div>

          <p className="text-xs text-stone-700 leading-relaxed">
            Listen to your voice right after playing the reference. Did your mouth open wide enough? Did you match the tongue position?
          </p>

          {/* Speech Recognition Comparison (when available) */}
          {recognizedText && (
            <div className="p-3 bg-white rounded-lg border border-emerald-200 space-y-1 text-xs">
              <span className="text-[11px] font-bold text-stone-500 uppercase font-mono block">
                Speech Recognizer Transcription:
              </span>
              <div className="font-serif font-bold text-base text-academy-navy">
                "{recognizedText}"
              </div>
              {evalResult && (
                <div className="text-[11px] text-stone-600 mt-1">
                  {evalResult.phoneticFeedback}
                </div>
              )}
            </div>
          )}

          {/* Transparency Disclaimer */}
          <div className="flex items-start gap-1.5 text-[10px] text-stone-500 pt-1">
            <Info className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
            <span>
              Self-monitoring against the native model is the scientifically proven method for accent acquisition.
            </span>
          </div>
        </div>
      )}

    </div>
  );
};
