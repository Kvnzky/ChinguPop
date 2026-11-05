import React, { useState, useEffect } from 'react';
import { UserProfile, Course, Lesson } from './types';
import { storage } from './services/storageService';
import { Navbar } from './components/common/Navbar';
import { Sidebar, NavItemKey } from './components/common/Sidebar';

// Screen Components
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { CoursesView } from './components/courses/CoursesView';
import { HangulLabPage } from './components/hangul/HangulLabPage';
import { VirtualClassroom } from './components/classroom/VirtualClassroom';
import { AITutorChat } from './components/ai/AITutorChat';
import { SpeechLab } from './components/speaking/SpeechLab';
import { VocabularySRS } from './components/vocabulary/VocabularySRS';
import { AssignmentView } from './components/assignments/AssignmentView';
import { ExamSystem } from './components/exams/ExamSystem';
import { StudyPlanner } from './components/planner/StudyPlanner';
import { MaterialsLibrary } from './components/materials/MaterialsLibrary';
import { AcademicRecords } from './components/records/AcademicRecords';
import { CertificateView } from './components/certificates/CertificateView';
import { SettingsView } from './components/settings/SettingsView';
import { TeacherGrading } from './components/admin/TeacherGrading';
import { AdminPanel } from './components/admin/AdminPanel';

export function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile>(storage.getCurrentUser());
  const [currentTab, setCurrentTab] = useState<NavItemKey>('dashboard');
  const [courses, setCourses] = useState<Course[]>(storage.getCourses());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active lesson selected for Classroom
  const [activeLesson, setActiveLesson] = useState<Lesson>(() => {
    const preA1 = courses.find(c => c.id === 'course-pre-a1');
    return preA1?.units[0]?.lessons[0] || (courses[0]?.units[0]?.lessons[0] as Lesson);
  });

  // Track lesson completion
  const handleCompleteLesson = (lessonId: string) => {
    storage.markLessonCompleted(currentUser.id, lessonId);
    storage.recordAttendanceToday(currentUser.id);
    // Refresh user state to reflect updated attendance/records
    setCurrentUser(storage.getCurrentUser());
  };

  const handleSelectLessonFromCourses = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setCurrentTab('classroom');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUserChange = (user: UserProfile) => {
    setCurrentUser(user);
    // Route to appropriate initial dashboard if teacher or admin
    if (user.role === 'teacher') {
      setCurrentTab('teacher-grading');
    } else if (user.role === 'admin') {
      setCurrentTab('admin-portal');
    } else {
      setCurrentTab('dashboard');
    }
  };

  // Register PWA Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.log('SW registration error:', err);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-academy-ivory text-academy-charcoal flex flex-col font-sans selection:bg-academy-gold/30">
      
      {/* Top University Header */}
      <Navbar
        currentUser={currentUser}
        onUserChange={handleUserChange}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
      />

      {/* Main LMS Grid Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Desktop Sidebar (Fixed Left) */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          userRole={currentUser.role}
          pendingAssignmentsCount={storage.getAssignments().length - storage.getSubmissions(currentUser.id).length}
          className="hidden md:flex shrink-0"
        />

        {/* Mobile Sidebar Overlay Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative z-10 w-72 bg-academy-ivory h-full shadow-2xl flex flex-col">
              <div className="p-4 bg-academy-navy text-white flex items-center justify-between">
                <span className="font-serif font-bold text-sm">Navigation Menu</span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded text-stone-300 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <Sidebar
                currentTab={currentTab}
                onSelectTab={(tab) => {
                  setCurrentTab(tab);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                userRole={currentUser.role}
                pendingAssignmentsCount={storage.getAssignments().length - storage.getSubmissions(currentUser.id).length}
                className="w-full flex-1"
              />
            </div>
          </div>
        )}

        {/* Dynamic Main Stage View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl overflow-x-hidden min-h-[calc(100vh-4rem)]">
          {currentTab === 'dashboard' && (
            <StudentDashboard
              currentUser={currentUser}
              courses={courses}
              onNavigate={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {currentTab === 'courses' && (
            <CoursesView
              courses={courses}
              currentUser={currentUser}
              onSelectLesson={handleSelectLessonFromCourses}
            />
          )}

          {currentTab === 'hangul-lab' && <HangulLabPage />}

          {currentTab === 'classroom' && (
            <VirtualClassroom
              currentLesson={activeLesson}
              currentUser={currentUser}
              onCompleteLesson={handleCompleteLesson}
            />
          )}

          {currentTab === 'ai-tutor' && <AITutorChat currentUser={currentUser} />}

          {currentTab === 'speaking-lab' && <SpeechLab />}

          {currentTab === 'vocabulary' && <VocabularySRS currentUser={currentUser} />}

          {currentTab === 'assignments' && <AssignmentView currentUser={currentUser} />}

          {currentTab === 'examinations' && <ExamSystem currentUser={currentUser} />}

          {currentTab === 'planner' && <StudyPlanner currentUser={currentUser} />}

          {currentTab === 'materials' && <MaterialsLibrary />}

          {currentTab === 'records' && <AcademicRecords currentUser={currentUser} />}

          {currentTab === 'certificates' && <CertificateView currentUser={currentUser} />}

          {currentTab === 'settings' && (
            <SettingsView
              currentUser={currentUser}
              onUserUpdate={(updated) => setCurrentUser(updated)}
            />
          )}

          {currentTab === 'teacher-grading' && (
            <TeacherGrading currentUser={currentUser} />
          )}

          {currentTab === 'admin-portal' && <AdminPanel />}
        </main>

      </div>
    </div>
  );
}

export default App;
