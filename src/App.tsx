import React, { useState, useEffect } from 'react';
import { UserProfile, Course, Lesson } from './types';
import { storage } from './services/storageService';
import { Navbar } from './components/common/Navbar';
import { Sidebar, NavItemKey } from './components/common/Sidebar';
import { MobileBottomNav } from './components/common/MobileBottomNav';

// Screen Components
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { AcademyProgressOverview } from './components/overview/AcademyProgressOverview';
import { GuidedOnboardingTour } from './components/tour/GuidedOnboardingTour';
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
import { AdminPanel } from './components/admin/AdminPanel';
import { RegisterModal, AuthModalTab } from './components/auth/RegisterModal';
import { ChinguPopArcade } from './components/arcade/ChinguPopArcade';
import { ReviewRoom } from './components/review/ReviewRoom';

export function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => storage.getCurrentUser());
  const [currentTab, setCurrentTab] = useState<NavItemKey>('dashboard');
  const [courses, setCourses] = useState<Course[]>(() => storage.getCourses());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<AuthModalTab>('register');
  const [isTourOpen, setIsTourOpen] = useState(() => {
    return !storage.isTourCompleted(currentUser.id);
  });

  // Check URL routing for /admin or #/admin without elevating user role prior to authentication
  useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (path.endsWith('/admin') || hash === '#/admin' || hash === '#admin' || search.includes('admin=true')) {
        setCurrentTab('admin-portal');
        if (storage.isAdminAuthenticated()) {
          setCurrentUser(storage.getCurrentUser());
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);
    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
    };
  }, []);

  // Synchronize user state on cross-tab storage events
  useEffect(() => {
    const handleStorageSync = () => {
      setCurrentUser(storage.getCurrentUser());
      setCourses(storage.getCourses());
    };
    window.addEventListener('storage', handleStorageSync);
    return () => window.removeEventListener('storage', handleStorageSync);
  }, []);

  // Active lesson selected for Classroom
  const [activeLesson, setActiveLesson] = useState<Lesson>(() => {
    const preA1 = courses.find(c => c.id === 'course-pre-a1');
    return preA1?.units[0]?.lessons[0] || (courses[0]?.units[0]?.lessons[0] as Lesson);
  });

  // Track lesson completion
  const handleCompleteLesson = (lessonId: string) => {
    storage.markLessonCompleted(currentUser.id, lessonId);
    storage.recordAttendanceToday(currentUser.id);
    setCurrentUser(storage.getCurrentUser());
  };

  const handleSelectLessonFromCourses = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setCurrentTab('classroom');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUserChange = (user: UserProfile) => {
    setCurrentUser(user);
    if (user.role === 'admin' && storage.isAdminAuthenticated()) {
      setCurrentTab('admin-portal');
    } else {
      if (window.location.hash.toLowerCase().includes('admin')) {
        window.history.replaceState(null, '', window.location.pathname);
      }
      setCurrentTab('dashboard');
    }
  };

  const handleOpenAuth = (tab: AuthModalTab) => {
    setAuthModalTab(tab);
    setIsRegisterOpen(true);
  };

  const handleLogout = () => {
    const fallbackUser = storage.logout();
    setCurrentUser(fallbackUser);
    if (window.location.hash.toLowerCase().includes('admin') || window.location.pathname.toLowerCase().endsWith('/admin')) {
      window.history.replaceState(null, '', '/');
    }
    setCurrentTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Register & update PWA Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').then((reg) => {
        reg.update().catch(() => {});
      }).catch((err) => {
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
        onOpenTour={() => setIsTourOpen(true)}
        onOpenRegister={() => handleOpenAuth('register')}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onNavigateTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
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
          userRole={storage.isAdminAuthenticated() ? 'admin' : currentUser.role}
          pendingAssignmentsCount={Math.max(0, storage.getAssignments().length - storage.getSubmissions(currentUser.id).length)}
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
              <div className="p-4 bg-gradient-to-r from-[#2C1E6D] via-[#4F35C8] to-[#6C52EE] text-white flex items-center justify-between border-b border-purple-400/30">
                <div className="flex items-center gap-2">
                  <img src="/chingupop-logo.jpg" alt="ChinguPop" className="h-7 w-auto rounded-lg bg-white p-0.5" />
                  <span className="font-bold text-sm">
                    <span className="text-[#8E77F7]">Chingu</span><span className="text-[#FF5CA8]">Pop</span>
                  </span>
                </div>
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
                userRole={storage.isAdminAuthenticated() ? 'admin' : currentUser.role}
                pendingAssignmentsCount={Math.max(0, storage.getAssignments().length - storage.getSubmissions(currentUser.id).length)}
                className="w-full flex-1"
              />
            </div>
          </div>
        )}

        {/* Dynamic Main Stage View with mobile bottom nav clearance */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 max-w-6xl xl:max-w-7xl overflow-x-hidden min-h-[calc(100vh-4rem)] pb-24 md:pb-8">
          {currentTab === 'dashboard' && (
            <StudentDashboard
              currentUser={currentUser}
              courses={courses}
              onOpenAuth={handleOpenAuth}
              onNavigate={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* Protected Personal Tabs Gate when Signed Out */}
          {(['academy-overview', 'assignments', 'examinations', 'planner', 'records', 'certificates', 'settings'] as NavItemKey[]).includes(currentTab) &&
          !storage.isAuthenticated() &&
          !storage.isAdminAuthenticated() ? (
            <div className="max-w-xl mx-auto my-12 bg-white rounded-3xl border border-stone-200 shadow-lg p-8 text-center space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-[#6C52EE] flex items-center justify-center mx-auto font-extrabold text-xl">
                🔒
              </div>
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold uppercase tracking-wider">
                  Protected Member Area
                </span>
                <h2 className="text-xl font-extrabold text-[#1E1B4B]">
                  Sign In Required to Access Your Account
                </h2>
                <p className="text-xs text-stone-600 leading-relaxed max-w-md mx-auto">
                  You are currently signed out. Please sign in to your scholar account or create a free account to access personal profile settings, academic transcripts, assignments, and certificates.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleOpenAuth('signin')}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2C1E6D] to-[#6C52EE] hover:from-[#3B288C] hover:to-[#553ACF] text-white font-bold text-xs shadow-md transition-all"
                >
                  Sign In to Account
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenAuth('register')}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5CA8] to-[#FF3D9A] text-white font-bold text-xs shadow-md transition-all"
                >
                  Create Free Account
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentTab('dashboard')}
                  className="px-4 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 font-bold text-xs transition-all"
                >
                  Back to Public Homepage
                </button>
              </div>
            </div>
          ) : (
            <>
              {currentTab === 'academy-overview' && (
                <AcademyProgressOverview
                  currentUser={currentUser}
                  courses={courses}
                  onSelectStudent={(id) => {
                    if (storage.isAdminAuthenticated() || id === currentUser.id) {
                      const u = storage.getUserById(id);
                      if (u) {
                        storage.setCurrentUser(u.id);
                        handleUserChange(u);
                      }
                    } else {
                      handleOpenAuth('signin');
                    }
                  }}
                  onNavigateTab={(tab) => {
                    setCurrentTab(tab);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              )}

              {currentTab === 'assignments' && <AssignmentView currentUser={currentUser} />}

              {currentTab === 'examinations' && <ExamSystem currentUser={currentUser} />}

              {currentTab === 'planner' && <StudyPlanner currentUser={currentUser} />}

              {currentTab === 'records' && <AcademicRecords currentUser={currentUser} />}

              {currentTab === 'certificates' && <CertificateView currentUser={currentUser} />}

              {currentTab === 'settings' && (
                <SettingsView
                  currentUser={currentUser}
                  onUserUpdate={(updated) => setCurrentUser(updated)}
                />
              )}
            </>
          )}

          {currentTab === 'arcade' && (
            <ChinguPopArcade
              currentUser={currentUser}
              onNavigateTab={(tab) => {
                setCurrentTab(tab as any);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {currentTab === 'review-room' && (
            <ReviewRoom
              currentUser={currentUser}
              onNavigateTab={(tab) => {
                setCurrentTab(tab as any);
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

          {currentTab === 'materials' && <MaterialsLibrary />}

          {currentTab === 'admin-portal' && (
            <AdminPanel onSwitchUser={handleUserChange} />
          )}
        </main>

      </div>

      {/* Mobile-First Sticky Bottom Navigation Bar (md:hidden) */}
      <MobileBottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenMenu={() => setMobileMenuOpen(true)}
        pendingAssignmentsCount={Math.max(0, storage.getAssignments().length - storage.getSubmissions(currentUser.id).length)}
      />

      {/* Scholar Authentication & Registration Modal */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegistered={(user) => handleUserChange(user)}
        currentUserId={currentUser.id}
        initialTab={authModalTab}
      />

      {/* Guided Walkthrough Tour Modal */}
      <GuidedOnboardingTour
        currentUser={currentUser}
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onNavigateTab={(tab) => {
          setCurrentTab(tab);
          setIsTourOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Discrete Faculty Access Link for /admin */}
      <footer className="py-2 px-4 text-center text-[10px] text-stone-400 select-none">
        <span>ChinguPop Academy • </span>
        <a 
          href="#/admin" 
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = '/admin';
            setCurrentTab('admin-portal');
            if (storage.isAdminAuthenticated()) {
              setCurrentUser(storage.getCurrentUser());
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-stone-400 hover:text-stone-600 hover:underline"
        >
          Faculty Portal (/admin)
        </a>
      </footer>
    </div>
  );
}

export default App;
