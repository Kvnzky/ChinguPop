import React, { useState, useEffect, useRef } from 'react';
import { AIMessage, AIMode, UserProfile } from '../../types';
import { aiTutor } from '../../services/aiTutorService';
import { storage } from '../../services/storageService';
import { AudioButton } from '../common/AudioButton';
import { 
  Bot, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Globe, 
  BookOpen, 
  Check, 
  HelpCircle, 
  Compass 
} from 'lucide-react';

const AI_MODES: AIMode[] = [
  'Grammar Tutor',
  'Speaking Partner',
  'Vocabulary Tutor',
  'Writing Assistant',
  'Pronunciation Practice',
  'Reading Comprehension Tutor',
  'Listening Practice Tutor',
  'TOPIK Preparation Tutor',
  'Real-Life Conversation Simulator'
];

interface AITutorChatProps {
  currentUser: UserProfile;
}

export const AITutorChat: React.FC<AITutorChatProps> = ({ currentUser }) => {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [currentMode, setCurrentMode] = useState<AIMode>('Grammar Tutor');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const saved = storage.getAIMessages(currentUser.id);
    if (saved && saved.length > 0) {
      setMessages(saved);
    } else {
      // Seed initial welcome message from Professor Kim
      const welcome: AIMessage = {
        id: 'msg-welcome',
        sender: 'tutor',
        text: `안녕하세요, ${currentUser.name} 씨! I am your AI Korean Language Teacher at ChinguPop (친구팝).

I am here to guide you from ${currentUser.proficiency} to advanced fluency. You can ask me any grammar questions, practice Korean dialogues, test particle usage (은/는 vs 이/가), or simulate real conversations in Seoul.

${currentUser.filipinoSupport ? '🇵🇭 Filipino grammatical explanations are active to help clarify tough concepts.' : ''}

How can I help you today? Try saying: "선생님, 안녕하세요!" or ask: "What is the difference between 은/는 and 이/가?"`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        koreanSnippet: '안녕하세요! 무엇을 도와드릴까요?',
        grammarTip: 'Classroom Polite Opening'
      };
      setMessages([welcome]);
      storage.saveAIMessages(currentUser.id, [welcome]);
    }
  }, [currentUser.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsg: AIMessage = {
      id: `usr-${Date.now()}`,
      sender: 'student',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setInputText('');
    setIsLoading(true);

    try {
      const tutorReply = await aiTutor.generateResponse(userMsg.text, currentMode, currentUser);
      const withReply = [...updated, tutorReply];
      setMessages(withReply);
      storage.saveAIMessages(currentUser.id, withReply);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetConversation = () => {
    storage.saveAIMessages(currentUser.id, []);
    setMessages([]);
  };

  const quickPrompts = [
    '저는 학교 가요.',
    '은/는 and 이/가 차이가 뭐예요?',
    'How do I say "Thank you" and "Goodbye" politely?',
    'What is the rule for Batchim (받침)?'
  ];

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm flex flex-col h-[calc(100vh-10rem)] max-h-[850px] overflow-hidden">
      
      {/* AI Tutor Chat Header */}
      <div className="bg-academy-navy text-academy-ivory px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-academy-navy-light shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-academy-gold/20 border border-academy-gold/40 flex items-center justify-center text-academy-gold font-bold">
            <Bot className="w-5 h-5 text-academy-gold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif font-bold text-base text-academy-ivory">
                Personal AI Korean Teacher
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-academy-navy-light text-academy-gold border border-academy-gold/30">
                Seoul Pedagogy Engine
              </span>
            </div>
            <p className="text-xs text-stone-300">
              Interactive Tutoring • Immersion: <span className="capitalize text-academy-gold">{currentUser.immersionStage}</span>
            </p>
          </div>
        </div>

        {/* Mode Selector & Reset */}
        <div className="flex items-center gap-2">
          <select
            value={currentMode}
            onChange={(e) => setCurrentMode(e.target.value as AIMode)}
            className="text-xs bg-academy-navy-light text-academy-ivory border border-academy-gold/40 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-academy-gold cursor-pointer"
          >
            {AI_MODES.map((mode) => (
              <option key={mode} value={mode} className="bg-academy-navy text-white">
                Mode: {mode}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleResetConversation}
            title="Reset conversation"
            className="p-1.5 rounded-lg bg-academy-navy-light text-stone-300 hover:text-white border border-stone-700 hover:bg-stone-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-stone-50/50">
        {messages.map((msg) => {
          const isTutor = msg.sender === 'tutor';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isTutor ? 'justify-start' : 'justify-end'}`}
            >
              {isTutor && (
                <div className="w-8 h-8 rounded-full bg-academy-navy text-academy-gold flex items-center justify-center font-bold text-xs shrink-0 mt-1 shadow-sm">
                  한
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed shadow-sm ${
                  isTutor
                    ? 'bg-white text-academy-charcoal border border-stone-200'
                    : 'bg-academy-navy text-academy-ivory'
                }`}
              >
                {/* Message Header */}
                <div className="flex items-center justify-between text-[10px] text-stone-400 mb-1.5 pb-1 border-b border-stone-100">
                  <span className="font-semibold text-academy-gold-dark">
                    {isTutor ? 'Professor Kim (AI Tutor)' : currentUser.name}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Korean Audio Snippet Playback */}
                {isTutor && msg.koreanSnippet && (
                  <div className="mb-2.5 p-2 bg-amber-50/70 border border-amber-200/60 rounded-lg flex items-center justify-between gap-2">
                    <span className="font-serif font-bold text-sm text-academy-navy">
                      {msg.koreanSnippet}
                    </span>
                    <AudioButton text={msg.koreanSnippet} size="sm" />
                  </div>
                )}

                {/* Main Text Content */}
                <div className="whitespace-pre-line font-sans">
                  {msg.text}
                </div>

                {/* Grammar Tip Callout */}
                {isTutor && msg.grammarTip && (
                  <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-mono text-academy-sage font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-academy-gold" />
                    <span>Focus Concept: {msg.grammarTip}</span>
                  </div>
                )}

                {/* Detailed Corrections Breakdown */}
                {isTutor && msg.corrections && msg.corrections.length > 0 && (
                  <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200 space-y-1.5">
                    <div className="text-[10px] uppercase font-bold text-academy-navy tracking-wider">
                      Linguistic Analysis & Correction:
                    </div>
                    {msg.corrections.map((c, i) => (
                      <div key={i} className="text-xs space-y-0.5">
                        <div className="line-through text-rose-700">Original: {c.original}</div>
                        <div className="font-bold text-emerald-800">Corrected: {c.corrected}</div>
                        <div className="text-[11px] text-stone-600">Why: {c.reason}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {!isTutor && (
                <div className="w-8 h-8 rounded-full bg-academy-gold text-academy-navy flex items-center justify-center font-bold text-xs shrink-0 mt-1 shadow-sm">
                  {currentUser.name.charAt(0)}
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-stone-500 italic p-2">
            <span className="w-2 h-2 rounded-full bg-academy-gold animate-bounce" />
            <span>Professor Kim is analyzing your Korean sentence...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="p-2.5 bg-stone-100/90 border-t border-stone-200 flex items-center gap-2 overflow-x-auto text-[11px] shrink-0 no-scrollbar scrollbar-none">
        <span className="text-stone-500 font-semibold shrink-0 flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-academy-gold-dark" />
          Try asking:
        </span>
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setInputText(prompt)}
            className="px-2.5 py-1 rounded-full bg-white hover:bg-stone-200 border border-stone-300 text-stone-700 whitespace-nowrap transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-stone-200 flex items-center gap-2 shrink-0">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Type a Korean sentence or question in English... (Current Mode: ${currentMode})`}
          className="flex-1 p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-academy-gold text-xs text-academy-charcoal"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="px-4 py-3 rounded-xl bg-academy-navy hover:bg-academy-navy-light text-academy-ivory disabled:opacity-50 transition-colors flex items-center gap-1.5 text-xs font-semibold"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
};
