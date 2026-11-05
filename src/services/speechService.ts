// HANGUL ACADEMY - Speech Synthesis & Recognition Service

export interface SpeechVoiceInfo {
  hasKoreanVoice: boolean;
  voiceName: string;
  isSynthesized: boolean;
}

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private koreanVoice: SpeechSynthesisVoice | null = null;
  private recognition: any = null;
  private isVoicesLoaded = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }

    if (typeof window !== 'undefined') {
      const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRec) {
        this.recognition = new SpeechRec();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'ko-KR';
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prioritize genuine Korean voices
    this.koreanVoice = voices.find(v => v.lang === 'ko-KR' || v.lang.startsWith('ko') || v.name.toLowerCase().includes('korean')) || null;
    this.isVoicesLoaded = true;
  }

  getVoiceInfo(): SpeechVoiceInfo {
    this.loadVoices();
    return {
      hasKoreanVoice: !!this.koreanVoice,
      voiceName: this.koreanVoice?.name || 'Default Browser Voice',
      isSynthesized: true
    };
  }

  speak(text: string, options?: { rate?: number; pitch?: number; onEnd?: () => void }): void {
    if (!this.synth) {
      console.warn('SpeechSynthesis is not supported on this browser.');
      return;
    }

    // Cancel any ongoing speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    this.loadVoices();

    if (this.koreanVoice) {
      utterance.voice = this.koreanVoice;
      utterance.lang = 'ko-KR';
    } else {
      utterance.lang = 'ko-KR';
    }

    utterance.rate = options?.rate || 0.85; // slightly slower for optimal foreign learner comprehension
    utterance.pitch = options?.pitch || 1.0;

    if (options?.onEnd) {
      utterance.onend = options.onEnd;
    }

    this.synth.speak(utterance);
  }

  stopSpeaking(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  // --- Voice Recognition Lab ---
  isSpeechRecognitionSupported(): boolean {
    return !!this.recognition;
  }

  startListening(
    onResult: (recognizedText: string) => void,
    onError: (errorMsg: string) => void,
    onEnd?: () => void
  ): () => void {
    if (!this.recognition) {
      onError('Speech Recognition is not supported by your current browser. (Recommended: Chrome or Edge)');
      return () => {};
    }

    try {
      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        onError(`Recognition error: ${event.error}. Please check microphone permissions.`);
      };

      this.recognition.onend = () => {
        if (onEnd) onEnd();
      };

      this.recognition.start();

      return () => {
        try {
          this.recognition.stop();
        } catch (e) {
          // ignore already stopped
        }
      };
    } catch (err: any) {
      onError(`Failed to start microphone: ${err.message}`);
      return () => {};
    }
  }

  // --- Accurate Syllable & Accuracy Comparison Engine ---
  evaluatePronunciation(target: string, recognized: string): {
    accuracyScore: number;
    matchedSyllables: string[];
    missedSyllables: string[];
    phoneticFeedback: string;
    isApproximation: boolean;
  } {
    const cleanTarget = target.replace(/[^가-힣a-zA-Z0-9]/g, '');
    const cleanRecognized = recognized.replace(/[^가-힣a-zA-Z0-9]/g, '');

    if (!cleanRecognized) {
      return {
        accuracyScore: 0,
        matchedSyllables: [],
        missedSyllables: cleanTarget.split(''),
        phoneticFeedback: 'No speech was recognized. Please speak closer to the microphone.',
        isApproximation: true
      };
    }

    const targetChars = cleanTarget.split('');
    const recognizedChars = cleanRecognized.split('');

    const matched: string[] = [];
    const missed: string[] = [];

    targetChars.forEach(char => {
      if (recognizedChars.includes(char)) {
        matched.push(char);
      } else {
        missed.push(char);
      }
    });

    const matchRatio = cleanTarget.length > 0 ? (matched.length / cleanTarget.length) : 0;
    const accuracyScore = Math.min(100, Math.round(matchRatio * 100));

    let phoneticFeedback = '';
    if (accuracyScore >= 90) {
      phoneticFeedback = 'Excellent pronunciation! Your syllable articulation closely matches standard Korean.';
    } else if (accuracyScore >= 70) {
      phoneticFeedback = `Good effort! You clearly pronounced: "${matched.join(', ')}". Review missed sounds: "${missed.join(', ')}".`;
    } else {
      phoneticFeedback = `Needs more practice. Listen to the native audio and focus especially on: "${missed.join(', ')}".`;
    }

    return {
      accuracyScore,
      matchedSyllables: matched,
      missedSyllables: missed,
      phoneticFeedback,
      isApproximation: true // Transparency requirement: acknowledge browser limitations
    };
  }
}

export const speech = new SpeechService();
