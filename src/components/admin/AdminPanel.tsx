import React, { useState } from 'react';
import { Course, Lesson, UserProfile } from '../../types';
import { storage } from '../../services/storageService';
import { 
  ShieldCheck, 
  Users, 
  BookOpen, 
  Settings, 
  Plus, 
  Check, 
  Download, 
  RotateCcw, 
  Edit3 
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'curriculum' | 'settings'>('students');
  const [users, setUsers] = useState<UserProfile[]>(storage.getUsers());
  const [courses, setCourses] = useState<Course[]>(storage.getCourses());
  const [settings, setSettings] = useState(storage.getSettings());
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // New Student Form
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentProficiency, setNewStudentProficiency] = useState<UserProfile['proficiency']>('Pre-A1');

  // New Lesson State
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || 'course-pre-a1');
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonKoreanTitle, setNewLessonKoreanTitle] = useState('');
  const [newLessonIntro, setNewLessonIntro] = useState('');
  const [newLessonExplanation, setNewLessonExplanation] = useState('');

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentEmail.trim()) return;

    const student: UserProfile = {
      id: `student-${Date.now()}`,
      name: newStudentName.trim(),
      email: newStudentEmail.trim(),
      role: 'student',
      studentId: `HA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      enrolledDate: new Date().toISOString().split('T')[0],
      proficiency: newStudentProficiency,
      immersionStage: newStudentProficiency === 'Pre-A1' ? 'beginner' : 'elementary',
      explanationLanguage: 'English',
      filipinoSupport: true,
      dailyStudyMinutes: 60,
      studyDaysPerWeek: 7,
      attendancePercentage: 100,
      currentAcademicGrade: 'A'
    };

    storage.saveUser(student);
    setUsers(storage.getUsers());
    setNewStudentName('');
    setNewStudentEmail('');
    setStatusMsg(`Student ${student.name} enrolled with ID ${student.studentId}!`);
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim() || !newLessonExplanation.trim()) return;

    const targetCourse = courses.find(c => c.id === selectedCourseId);
    if (!targetCourse || !targetCourse.units[0]) return;

    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      unitId: targetCourse.units[0].id,
      courseId: targetCourse.id,
      lessonNumber: targetCourse.totalLessons + 1,
      title: newLessonTitle.trim(),
      koreanTitle: newLessonKoreanTitle.trim() || newLessonTitle.trim(),
      objectives: ['Acquire target vocabulary and master grammatical patterns'],
      introduction: newLessonIntro.trim() || 'Welcome to this curriculum lesson.',
      explanation: newLessonExplanation.trim(),
      koreanExamples: [
        { korean: '한국어를 열심히 배워요.', english: 'I study Korean diligently.' }
      ],
      vocabularyList: [
        { korean: '공부', romanization: 'gong-bu', english: 'Study', partOfSpeech: 'noun', exampleSentence: '공부를 해요.', exampleEnglish: 'I study.' }
      ],
      grammarNotes: [],
      interactiveExercises: [],
      comprehensionQuestions: [],
      summary: 'Lesson completed successfully.',
      status: 'published'
    };

    targetCourse.units[0].lessons.push(newLesson);
    targetCourse.totalLessons += 1;
    storage.saveCourse(targetCourse);
    setCourses(storage.getCourses());

    setNewLessonTitle('');
    setNewLessonKoreanTitle('');
    setNewLessonIntro('');
    setNewLessonExplanation('');
    setStatusMsg(`Lesson "${newLesson.title}" created and published in ${targetCourse.title}!`);
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    storage.saveSettings(settings);
    setStatusMsg('System & AI settings saved successfully!');
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleExportDB = () => {
    const json = storage.exportDatabaseJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hangul-academy-database-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleResetDefaults = () => {
    if (confirm('Are you sure you want to reset the database to initial seed defaults?')) {
      storage.resetToInitialDefaults();
      setUsers(storage.getUsers());
      setCourses(storage.getCourses());
      setStatusMsg('Database restored to default institutional seed state.');
      setTimeout(() => setStatusMsg(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-100 text-purple-900 border border-purple-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-xl text-academy-navy">
              Academy Dean Administration & Curriculum Management
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Multi-student account administration, live curriculum publication, and AI provider controls.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportDB}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-stone-300 hover:bg-stone-50 text-xs font-semibold text-stone-700"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export DB JSON</span>
          </button>
          <button
            type="button"
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-xs font-semibold text-rose-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset DB</span>
          </button>
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-stone-200 gap-4">
        <button
          type="button"
          onClick={() => setActiveTab('students')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === 'students'
              ? 'border-academy-navy text-academy-navy'
              : 'border-transparent text-stone-500 hover:text-academy-navy'
          }`}
        >
          Manage Students ({users.filter(u => u.role === 'student').length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('curriculum')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === 'curriculum'
              ? 'border-academy-navy text-academy-navy'
              : 'border-transparent text-stone-500 hover:text-academy-navy'
          }`}
        >
          Curriculum & Lesson Editor
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === 'settings'
              ? 'border-academy-navy text-academy-navy'
              : 'border-transparent text-stone-500 hover:text-academy-navy'
          }`}
        >
          AI Integration & Platform Settings
        </button>
      </div>

      {/* Tab 1: Student Management */}
      {activeTab === 'students' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-academy-navy pb-2 border-b border-stone-200">
              Registered Students Directory
            </h3>
            <div className="divide-y divide-stone-100">
              {users.map((u) => (
                <div key={u.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold text-academy-navy flex items-center gap-2">
                      <span>{u.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-stone-100 uppercase">{u.role}</span>
                    </div>
                    <div className="text-stone-500 text-[11px] mt-0.5">
                      {u.email} • ID: {u.studentId || 'N/A'} • Enrolled: {u.enrolledDate}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-academy-gold-dark font-bold">{u.proficiency}</span>
                    <div className="text-[10px] text-stone-400">Attendance: {u.attendancePercentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enroll New Student Form */}
          <form onSubmit={handleAddStudent} className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-academy-navy pb-2 border-b border-stone-200">
              Enroll New Student
            </h3>

            <div>
              <label className="block text-xs font-semibold text-academy-navy mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                placeholder="e.g., Hannah Lopez"
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-academy-navy mb-1">
                Student Email *
              </label>
              <input
                type="email"
                required
                value={newStudentEmail}
                onChange={(e) => setNewStudentEmail(e.target.value)}
                placeholder="e.g., hannah@hangul.academy"
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-academy-navy mb-1">
                Initial Proficiency Placement
              </label>
              <select
                value={newStudentProficiency}
                onChange={(e) => setNewStudentProficiency(e.target.value as any)}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              >
                <option value="Pre-A1">Pre-A1 (Absolute Beginner)</option>
                <option value="Level 1">Level 1 (TOPIK I Level 1)</option>
                <option value="Level 2">Level 2 (TOPIK I Level 2)</option>
                <option value="Level 3">Level 3 (TOPIK II Level 3)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-academy-navy hover:bg-academy-navy-light text-academy-ivory font-bold text-xs uppercase tracking-wider transition-all"
            >
              Enroll Student Account
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: Curriculum & Lesson Management */}
      {activeTab === 'curriculum' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-academy-navy pb-2 border-b border-stone-200">
              Active Courses ({courses.length})
            </h3>
            <div className="space-y-3">
              {courses.map((c) => (
                <div key={c.id} className="p-3.5 rounded-lg border border-stone-200 bg-stone-50/50 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-academy-gold-dark">{c.level}</span>
                    <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                      {c.status}
                    </span>
                  </div>
                  <div className="font-serif font-bold text-sm text-academy-navy">{c.title}</div>
                  <div className="text-[11px] text-stone-500">{c.totalLessons} Lessons • {c.unitsCount} Units</div>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Lesson Form */}
          <form onSubmit={handleAddLesson} className="lg:col-span-2 bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-academy-navy pb-2 border-b border-stone-200">
              Create & Publish New Curriculum Lesson
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-academy-navy mb-1">
                  Target Course *
                </label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title} ({c.level})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-academy-navy mb-1">
                  Lesson Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={newLessonTitle}
                  onChange={(e) => setNewLessonTitle(e.target.value)}
                  placeholder="e.g., Location Particles 에 and 에서"
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-academy-navy mb-1">
                Korean Lesson Title
              </label>
              <input
                type="text"
                value={newLessonKoreanTitle}
                onChange={(e) => setNewLessonKoreanTitle(e.target.value)}
                placeholder="e.g., 장소 조사 에와 에서의 차이"
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-serif"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-academy-navy mb-1">
                Detailed Academic Explanation *
              </label>
              <textarea
                rows={5}
                required
                value={newLessonExplanation}
                onChange={(e) => setNewLessonExplanation(e.target.value)}
                placeholder="Write comprehensive grammar explanations, usage rules, and linguistic comparisons..."
                className="w-full p-3 border border-stone-300 rounded-lg text-xs leading-relaxed"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-academy-navy hover:bg-academy-navy-light text-academy-ivory font-bold text-xs uppercase tracking-wider transition-all"
              >
                Publish Lesson to Academy Curriculum
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: AI & System Settings */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="max-w-xl mx-auto bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-base text-academy-navy pb-2 border-b border-stone-200">
            AI Provider & Academic Passing Rules
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-academy-navy mb-1">
                AI Tutor Engine Provider
              </label>
              <select
                value={settings.aiProvider}
                onChange={(e) => setSettings({ ...settings, aiProvider: e.target.value as any })}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              >
                <option value="rule-based">Built-in Pedagogical Linguistics Engine (100% Free, Offline Ready)</option>
                <option value="ollama">Ollama Local Open-Source LLM (e.g. LLaMA-3 / Mistral)</option>
                <option value="custom-api">Custom Free Endpoint</option>
              </select>
              <p className="text-[11px] text-stone-500 mt-1">
                The built-in pedagogical engine provides instant particle correction, translation, and roleplays with zero paid API keys.
              </p>
            </div>

            {settings.aiProvider === 'ollama' && (
              <div>
                <label className="block text-xs font-semibold text-academy-navy mb-1">
                  Ollama Local API Endpoint URL
                </label>
                <input
                  type="text"
                  value={settings.ollamaEndpoint}
                  onChange={(e) => setSettings({ ...settings, ollamaEndpoint: e.target.value })}
                  placeholder="http://localhost:11434"
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-academy-navy mb-1">
                  Grade A Threshold (%)
                </label>
                <input
                  type="number"
                  min="50"
                  max="100"
                  value={settings.passingScoreGradeA}
                  onChange={(e) => setSettings({ ...settings, passingScoreGradeA: Number(e.target.value) })}
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-academy-navy mb-1">
                  Grade B Threshold (%)
                </label>
                <input
                  type="number"
                  min="50"
                  max="100"
                  value={settings.passingScoreGradeB}
                  onChange={(e) => setSettings({ ...settings, passingScoreGradeB: Number(e.target.value) })}
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200">
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-academy-navy hover:bg-academy-navy-light text-academy-ivory font-bold text-xs uppercase tracking-wider transition-all"
            >
              Save Platform Configuration
            </button>
          </div>
        </form>
      )}

    </div>
  );
};
