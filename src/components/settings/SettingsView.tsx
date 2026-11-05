import React, { useState } from 'react';
import { UserProfile, KoreanProficiency, ImmersionStage } from '../../types';
import { storage } from '../../services/storageService';
import { Settings, Save, Check, Globe, Clock, Calendar, Sparkles } from 'lucide-react';

interface SettingsViewProps {
  currentUser: UserProfile;
  onUserUpdate: (updated: UserProfile) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ currentUser, onUserUpdate }) => {
  const [proficiency, setProficiency] = useState<KoreanProficiency>(currentUser.proficiency);
  const [immersionStage, setImmersionStage] = useState<ImmersionStage>(currentUser.immersionStage);
  const [dailyMinutes, setDailyMinutes] = useState(currentUser.dailyStudyMinutes);
  const [studyDays, setStudyDays] = useState(currentUser.studyDaysPerWeek);
  const [filipinoSupport, setFilipinoSupport] = useState(currentUser.filipinoSupport);
  const [explanationLang, setExplanationLang] = useState(currentUser.explanationLanguage);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...currentUser,
      proficiency,
      immersionStage,
      dailyStudyMinutes: Number(dailyMinutes),
      studyDaysPerWeek: Number(studyDays),
      filipinoSupport,
      explanationLanguage: explanationLang
    };

    storage.saveUser(updated);
    onUserUpdate(updated);
    setStatusMsg('Student academic settings updated successfully!');
    setTimeout(() => setStatusMsg(null), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-academy-navy text-academy-gold">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-xl text-academy-navy">
              Personal Academic Profile & Immersion Settings
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Customize your daily study duration, teaching immersion progression, and Filipino language assistance.
            </p>
          </div>
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-6">
        
        {/* Proficiency Level */}
        <div>
          <label className="block text-xs font-bold text-academy-navy uppercase tracking-wider mb-1.5">
            Korean Academic Proficiency Level
          </label>
          <select
            value={proficiency}
            onChange={(e) => setProficiency(e.target.value as KoreanProficiency)}
            className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
          >
            <option value="Pre-A1">Absolute Beginner (Pre-A1) — Korean Foundations & Hangul</option>
            <option value="Level 1">Beginner (Level 1) — TOPIK I Level 1</option>
            <option value="Level 2">Elementary (Level 2) — TOPIK I Level 2</option>
            <option value="Level 3">Intermediate (Level 3) — TOPIK II Level 3</option>
            <option value="Level 4">Upper Intermediate (Level 4) — TOPIK II Level 4</option>
            <option value="Level 5">Advanced (Level 5) — TOPIK II Level 5</option>
            <option value="Level 6">Mastery (Level 6) — TOPIK II Level 6</option>
          </select>
          <p className="text-[11px] text-stone-500 mt-1">
            Governs curriculum enrollment and starting exercises.
          </p>
        </div>

        {/* Immersion Stage */}
        <div>
          <label className="block text-xs font-bold text-academy-navy uppercase tracking-wider mb-1.5">
            Progressive Immersion Stage
          </label>
          <select
            value={immersionStage}
            onChange={(e) => setImmersionStage(e.target.value as ImmersionStage)}
            className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
          >
            <option value="beginner">Beginner: Full English explanation + Filipino bridge</option>
            <option value="elementary">Elementary: Bilingual with classroom Korean commands</option>
            <option value="intermediate">Intermediate: Predominantly Korean with English for complex grammar</option>
            <option value="advanced">Advanced: 100% Native Korean immersion</option>
          </select>
        </div>

        {/* Filipino Support Toggle */}
        <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="font-serif font-bold text-sm text-academy-navy flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-800" />
              <span>Filipino Language Linguistic Support (Tagalog Bridge)</span>
            </span>
            <p className="text-xs text-stone-600 leading-relaxed">
              When enabled, difficult grammatical markers (such as 은/는 vs 이/가) and pronunciation rules will include Filipino comparisons (e.g. comparing topic markers to "ang" / "kung tungkol kay").
            </p>
          </div>
          <input
            type="checkbox"
            checked={filipinoSupport}
            onChange={(e) => setFilipinoSupport(e.target.checked)}
            className="w-5 h-5 rounded text-academy-gold focus:ring-academy-gold cursor-pointer mt-1"
          />
        </div>

        {/* Study Availability */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-academy-navy uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Daily Study Duration (Min)</span>
            </label>
            <input
              type="number"
              min="15"
              max="240"
              value={dailyMinutes}
              onChange={(e) => setDailyMinutes(Number(e.target.value))}
              className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono font-bold"
            />
            <span className="text-[10px] text-stone-500 mt-0.5 block">Default: 60 minutes/day</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-academy-navy uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Study Days Per Week</span>
            </label>
            <input
              type="number"
              min="1"
              max="7"
              value={studyDays}
              onChange={(e) => setStudyDays(Number(e.target.value))}
              className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono font-bold"
            />
            <span className="text-[10px] text-stone-500 mt-0.5 block">Default: 7 days/week</span>
          </div>
        </div>

        <div className="pt-4 border-t border-stone-200 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-academy-navy hover:bg-academy-navy-light text-academy-ivory font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Settings</span>
          </button>
        </div>
      </form>

    </div>
  );
};
