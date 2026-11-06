import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { storage } from '../../services/storageService';
import { Badge } from './Badge';
import { AuthModalTab } from '../auth/RegisterModal';
import { 
  GraduationCap, 
  Users, 
  Globe, 
  Wifi, 
  WifiOff, 
  ChevronDown,
  Sparkles,
  LogIn,
  LogOut,
  Settings,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  currentUser: UserProfile;
  onUserChange: (user: UserProfile) => void;
  onOpenMobileMenu?: () => void;
  onOpenTour?: () => void;
  onOpenRegister?: () => void;
  onOpenAuth?: (tab: AuthModalTab) => void;
  onLogout?: () => void;
  onNavigateTab?: (tab: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentUser, 
  onUserChange, 
  onOpenMobileMenu,
  onOpenTour,
  onOpenRegister,
  onOpenAuth,
  onLogout,
  onNavigateTab
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const isAuthenticated = (storage.isAuthenticated() || storage.isAdminAuthenticated()) && currentUser.id !== 'guest-visitor';
  const isAdminAuth = storage.isAdminAuthenticated();

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const triggerAuthModal = (tab: AuthModalTab) => {
    setShowUserMenu(false);
    if (onOpenAuth) {
      onOpenAuth(tab);
    } else if (onOpenRegister) {
      onOpenRegister();
    }
  };

  const handleLogoutClick = () => {
    setShowUserMenu(false);
    if (onLogout) {
      onLogout();
    } else {
      const guestUser = storage.logout();
      onUserChange(guestUser);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-[#2C1E6D] via-[#4F35C8] to-[#6C52EE] text-white border-b border-purple-300/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Academy Brand */}
        <div className="flex items-center gap-3">
          {onOpenMobileMenu && (
            <button
              type="button"
              onClick={onOpenMobileMenu}
              className="md:hidden p-2 text-stone-300 hover:text-white rounded-lg hover:bg-academy-navy-light"
              aria-label="Open navigation menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              if (onNavigateTab) {
                onNavigateTab('dashboard');
              } else {
                window.location.hash = '';
              }
            }}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer transition-transform active:scale-95"
            aria-label="Return to ChinguPop Home"
            title="Return to ChinguPop Home Dashboard"
          >
            <img
              src="/chingupop-logo.jpg"
              alt="ChinguPop Logo"
              className="h-10 w-auto rounded-xl object-contain bg-white shadow-sm ring-2 ring-purple-300/40 p-0.5 group-hover:ring-purple-200 transition-all"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-white flex items-center group-hover:opacity-95 transition-opacity">
                  <span className="text-[#8E77F7]">Chingu</span>
                  <span className="text-[#FF5CA8]">Pop</span>
                </span>
                <span className="hidden sm:inline-block text-xs font-korean text-purple-200 border border-purple-400/40 px-1.5 py-0.2 rounded-full bg-purple-900/40 font-medium">
                  친구팝
                </span>
              </div>
              <p className="text-[10px] tracking-wide text-purple-200/90 font-medium truncate max-w-[150px] xs:max-w-[220px] sm:max-w-none">
                Korean Language Learning Academy • Learn Korean. Find Your Chingu.
              </p>
            </div>
          </button>
        </div>

        {/* Center / Right: Academic Status & Auth Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Online/Offline Status */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-stone-300 bg-academy-navy-light/60 px-2.5 py-1 rounded-full border border-academy-navy-light">
            {isOnline ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-stone-300">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-200">Offline Cache</span>
              </>
            )}
          </div>

          {/* Student Immersion / Filipino Support Indicator (ONLY when authenticated) */}
          {isAuthenticated && currentUser.role === 'student' && (
            <div className="hidden md:flex items-center gap-2">
              <Badge variant="gold" size="sm">
                {currentUser.proficiency}
              </Badge>
              {currentUser.filipinoSupport && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-amber-950/40 text-amber-200 border border-amber-800/50 px-2 py-0.5 rounded">
                  <Globe className="w-3 h-3 text-amber-300" />
                  Filipino Notes
                </span>
              )}
            </div>
          )}

          {/* Guided Onboarding Tour Button */}
          {onOpenTour && (
            <button
              type="button"
              onClick={onOpenTour}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-all shadow-sm active:scale-95"
              title="Launch Guided ChinguPop Walkthrough"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#55C8F5]" />
              <span className="hidden xl:inline">Guided Tour</span>
            </button>
          )}

          {/* SIGNED-OUT PUBLIC VISITOR CONTROLS (No user profile pill shown!) */}
          {!isAuthenticated ? (
            <>
              <button
                type="button"
                onClick={() => triggerAuthModal('signin')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-[#2C1E6D] hover:bg-purple-50 border border-white text-xs font-extrabold transition-all shadow-sm active:scale-95"
                title="Sign In to Existing Account"
              >
                <LogIn className="w-3.5 h-3.5 text-[#6C52EE]" />
                <span>Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => triggerAuthModal('register')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#FF5CA8] to-[#FF4D94] hover:from-[#FF4D94] hover:to-[#E63985] text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                title="Create Free Student Account"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Free Sign Up</span>
                <span className="xs:hidden">Sign Up</span>
              </button>
            </>
          ) : (
            /* AUTHENTICATED USER PROFILE PILL & SIGN OUT CONTROLS */
            <>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/20 py-1.5 px-3 rounded-xl text-left transition-colors"
                  aria-expanded={showUserMenu}
                  aria-label="Account menu"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FF5CA8] to-[#6C52EE] text-white font-bold text-xs flex items-center justify-center shadow-sm relative">
                    {currentUser.name.charAt(0)}
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#2C1E6D]" title="Authenticated Session" />
                  </div>
                  <div className="hidden sm:block text-xs">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <span className="truncate max-w-[140px]">{currentUser.name}</span>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 bg-white/20 rounded text-[#55C8F5] font-bold">
                        {currentUser.role === 'admin' ? 'Admin' : 'Scholar'}
                      </span>
                    </div>
                    <div className="text-[10px] text-purple-200 flex items-center gap-1">
                      <span>{currentUser.studentId}</span>
                      <span className="text-emerald-300 font-semibold">• Signed In</span>
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-purple-200 ml-0.5" />
                </button>

                {/* Authenticated Account Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-72 bg-white text-academy-charcoal rounded-xl shadow-2xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-3 border-b border-stone-100 bg-stone-50/60">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-[#6C52EE] font-bold">
                          {currentUser.role === 'admin' ? 'Administrator' : 'Student Account'}
                        </span>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase bg-emerald-100 text-emerald-800">
                          Authenticated
                        </span>
                      </div>
                      <div className="font-bold text-sm text-[#1E1B4B] mt-1.5">{currentUser.name}</div>
                      <div className="text-xs text-stone-500 truncate">{currentUser.email}</div>
                      <div className="text-[10px] font-mono text-stone-400 mt-0.5">
                        ID: {currentUser.studentId} • Level: {currentUser.proficiency}
                      </div>
                    </div>

                    <div className="py-1.5 px-2 space-y-1">
                      {onNavigateTab && (
                        <button
                          type="button"
                          onClick={() => {
                            setShowUserMenu(false);
                            onNavigateTab('settings');
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-stone-700 hover:bg-purple-50 hover:text-[#6C52EE] flex items-center gap-2.5 transition-colors"
                        >
                          <Settings className="w-4 h-4 text-stone-400" />
                          <span>Profile & Security Settings</span>
                        </button>
                      )}

                      {isAdminAuth && onNavigateTab && (
                        <button
                          type="button"
                          onClick={() => {
                            setShowUserMenu(false);
                            onNavigateTab('admin-portal');
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#2C1E6D] bg-purple-50/70 hover:bg-purple-100 flex items-center gap-2.5 transition-colors"
                        >
                          <ShieldCheck className="w-4 h-4 text-[#6C52EE]" />
                          <span>Open Admin Portal</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => triggerAuthModal('signin')}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-100 flex items-center gap-2.5 transition-colors"
                      >
                        <Users className="w-4 h-4 text-stone-400" />
                        <span>Switch Account</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleLogoutClick}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-rose-700 hover:bg-rose-50 flex items-center gap-2.5 transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-rose-600" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleLogoutClick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/25 hover:bg-rose-500/40 border border-rose-300/40 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                title="Sign Out of Current Session"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-200" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </>
          )}

        </div>

      </div>
    </header>
  );
};
