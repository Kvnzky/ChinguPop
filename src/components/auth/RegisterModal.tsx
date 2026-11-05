import React, { useState } from 'react';
import { UserProfile, KoreanProficiency } from '../../types';
import { storage } from '../../services/storageService';
import { Sparkles, User, Mail, Clock, Compass, CheckCircle2, Globe, ArrowRight, X } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistered: (user: UserProfile) => void;
  currentUserId?: string;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onRegistered,
  currentUserId
}) => {
  const [tab, setTab] = useState<'register' | 'switch'>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dailyMinutes, setDailyMinutes] = useState<number>(60);
  const [studyDaysPerWeek, setStudyDaysPerWeek] = useState<number>(7);
  const [goal, setGoal] = useState<string>('K-Pop, K-Drama & Conversational Fluency');
  const [filipinoSupport, setFilipinoSupport] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const existingStudents = storage.getStudents();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const newStudent = storage.registerStudent({
        name: name.trim(),
        email: email.trim(),
        dailyStudyMinutes: dailyMinutes,
        studyDaysPerWeek,
        filipinoSupport,
        bio: `${name.trim()}'s Korean Journey: Focused on ${goal}.`
      });

      onRegistered(newStudent);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Registration failed. Please try again.');
    }
  };

  const handleSelectExisting = (student: UserProfile) => {
    storage.setCurrentUser(student.id);
    onRegistered(student);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-purple-200 relative my-8">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#2C1E6D] via-[#4F35C8] to-[#6C52EE] text-white p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono tracking-widest text-[#55C8F5] uppercase font-bold">
              ChinguPop Academy
            </span>
            <span className="text-[10px] bg-white/20 border border-purple-300/40 text-purple-100 px-2 py-0.5 rounded-full font-bold">
              100% Free
            </span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Free Student Registration</span>
            <span className="text-lg font-korean text-purple-200 font-normal">무료 가입</span>
          </h2>

          <p className="text-xs text-purple-100/90 mt-1">
            Join thousands of scholars mastering Korean Hangul, pronunciation, and vocabulary.
          </p>

          {/* Toggle between Register & Switch Account */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-purple-400/30">
            <button
              type="button"
              onClick={() => { setTab('register'); setError(null); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                tab === 'register'
                  ? 'bg-white text-[#2C1E6D] shadow-sm'
                  : 'text-purple-200 hover:text-white hover:bg-white/10'
              }`}
            >
              New Student Account
            </button>
            {existingStudents.length > 0 && (
              <button
                type="button"
                onClick={() => { setTab('switch'); setError(null); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  tab === 'switch'
                    ? 'bg-white text-[#2C1E6D] shadow-sm'
                    : 'text-purple-200 hover:text-white hover:bg-white/10'
                }`}
              >
                Existing Students ({existingStudents.length})
              </button>
            )}
          </div>
        </div>

        {/* Tab 1: New Registration Form */}
        {tab === 'register' && (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 text-xs font-semibold">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1E1B4B] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#6C52EE]" />
                <span>Full Name (성명)</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Kim"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#6C52EE]/30 focus:border-[#6C52EE]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1E1B4B] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#6C52EE]" />
                <span>Email Address (이메일)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. alex@example.com"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#6C52EE]/30 focus:border-[#6C52EE]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1E1B4B] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#6C52EE]" />
                <span>Primary Learning Goal (학습 목표)</span>
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#6C52EE]/30 focus:border-[#6C52EE] bg-white"
              >
                <option value="K-Pop, K-Drama & Conversational Fluency">K-Pop, K-Drama & Conversational Korean</option>
                <option value="Travel & Daily Survival Korean">Travel & Everyday Communication in Korea</option>
                <option value="TOPIK I Certification & Grammar Foundation">TOPIK I Certification & Academic Foundation</option>
                <option value="Business & Workplace Korean">Business & Professional Korean Communication</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1E1B4B] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#6C52EE]" />
                  <span>Daily Commitment</span>
                </label>
                <select
                  value={dailyMinutes}
                  onChange={(e) => setDailyMinutes(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#6C52EE]/30 focus:border-[#6C52EE] bg-white"
                >
                  <option value={15}>15 Mins / Day</option>
                  <option value={30}>30 Mins / Day</option>
                  <option value={60}>60 Mins / Day (Standard)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1E1B4B]">
                  Study Schedule
                </label>
                <select
                  value={studyDaysPerWeek}
                  onChange={(e) => setStudyDaysPerWeek(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#6C52EE]/30 focus:border-[#6C52EE] bg-white"
                >
                  <option value={5}>5 Days / Week</option>
                  <option value={7}>7 Days / Week (Daily)</option>
                </select>
              </div>
            </div>

            {/* Filipino Support Option */}
            <label className="flex items-start gap-2.5 p-3 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer hover:bg-stone-100/70 transition-colors">
              <input
                type="checkbox"
                checked={filipinoSupport}
                onChange={(e) => setFilipinoSupport(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded text-[#6C52EE] focus:ring-[#6C52EE]"
              />
              <div className="text-xs">
                <span className="font-bold text-[#1E1B4B] block flex items-center gap-1">
                  <Globe className="w-3 h-3 text-amber-600" />
                  Enable Filipino bilingual study notes (Tagalog hints)
                </span>
                <span className="text-[11px] text-stone-500 block">
                  Includes helpful phonetic and grammar comparisons with Tagalog alongside English.
                </span>
              </div>
            </label>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF5CA8] to-[#FF4D94] hover:from-[#FF4D94] hover:to-[#E63985] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
              >
                <span>Create Free Student Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[10px] text-center text-stone-400">
              By registering, you get full access to Hangul Lab, Virtual Classroom, Speaking Lab, and SRS flashcards.
            </p>
          </form>
        )}

        {/* Tab 2: Existing Students List */}
        {tab === 'switch' && (
          <div className="p-6 space-y-3">
            <p className="text-xs text-stone-600">
              Select an account registered on this browser to resume learning:
            </p>

            <div className="space-y-2 max-h-72 overflow-y-auto">
              {existingStudents.map((st) => {
                const isActive = st.id === currentUserId;
                return (
                  <div
                    key={st.id}
                    onClick={() => handleSelectExisting(st)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'border-[#6C52EE] bg-purple-50/60 shadow-xs'
                        : 'border-stone-200 hover:border-purple-300 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF5CA8] to-[#6C52EE] p-0.5 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        <div className="w-full h-full rounded-full bg-white text-[#2C1E6D] flex items-center justify-center">
                          {st.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs text-[#1E1B4B]">{st.name}</h4>
                        <div className="text-[10px] text-stone-500 font-mono">
                          ID: {st.studentId} • {st.email}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isActive && (
                        <span className="text-[10px] bg-purple-100 text-[#6C52EE] px-2 py-0.5 rounded font-bold">
                          Active
                        </span>
                      )}
                      <ArrowRight className="w-4 h-4 text-stone-400" />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setTab('register')}
                className="w-full py-2.5 px-4 rounded-xl border border-dashed border-[#6C52EE] text-[#6C52EE] hover:bg-purple-50 text-xs font-bold transition-colors"
              >
                + Register Another Student Account
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
