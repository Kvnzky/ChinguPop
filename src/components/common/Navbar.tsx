import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { storage } from '../../services/storageService';
import { Badge } from './Badge';
import { 
  GraduationCap, 
  Users, 
  Globe, 
  Wifi, 
  WifiOff, 
  Check, 
  ChevronDown,
  Volume2,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  currentUser: UserProfile;
  onUserChange: (user: UserProfile) => void;
  onOpenMobileMenu?: () => void;
  onOpenTour?: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentUser, 
  onUserChange, 
  onOpenMobileMenu,
  onOpenTour,
  onOpenAdmin
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const allUsers = storage.getUsers();

  const students = allUsers.filter(u => u.role === 'student');

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

  const handleSelectUser = (user: UserProfile) => {
    storage.setCurrentUser(user.id);
    onUserChange(user);
    setShowUserMenu(false);
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

          <div className="flex items-center gap-2.5">
            <img
              src="/chingupop-logo.jpg"
              alt="ChinguPop Logo"
              className="h-10 w-auto rounded-xl object-contain bg-white shadow-sm ring-2 ring-purple-300/40 p-0.5"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-white flex items-center">
                  <span className="text-[#A78BFA]">Chingu</span>
                  <span className="text-[#FF5CA8]">Pop</span>
                </span>
                <span className="hidden sm:inline-block text-xs font-korean text-purple-200 border border-purple-400/40 px-1.5 py-0.2 rounded-full bg-purple-900/40 font-medium">
                  친구팝
                </span>
              </div>
              <p className="text-[10px] tracking-wide text-purple-200/90 font-medium">
                Korean Language Learning Academy • Learn Korean. Find Your Chingu.
              </p>
            </div>
          </div>
        </div>

        {/* Center / Right: Academic Status Indicators */}
        <div className="flex items-center gap-3">
          
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

          {/* Student Immersion / Filipino Support Indicator */}
          {currentUser.role === 'student' && (
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
              <span className="hidden sm:inline">Guided Tour</span>
            </button>
          )}

          {/* Admin Portal Direct Launcher Button */}
          {onOpenAdmin && (
            <button
              type="button"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2C1E6D]/80 hover:bg-[#2C1E6D] border border-purple-400/40 text-purple-200 text-xs font-semibold transition-all shadow-sm active:scale-95"
              title="Open Academy Administrative & Faculty Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF5CA8]" />
              <span className="hidden sm:inline">Admin Portal</span>
            </button>
          )}

          {/* Student Account Switcher Dropdown (Dhie & Mhie) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/20 py-1.5 px-3 rounded-xl text-left transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FF5CA8] to-[#6C52EE] text-white font-bold text-xs flex items-center justify-center shadow-sm">
                {currentUser.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-xs">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <span>{currentUser.name}</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 bg-white/20 rounded text-[#55C8F5] font-bold">
                    Scholar
                  </span>
                </div>
                <div className="text-[10px] text-purple-200">
                  {currentUser.studentId}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-purple-200 ml-1" />
            </button>

            {/* Switch User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white text-academy-charcoal rounded-xl shadow-2xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-stone-100">
                  <p className="text-xs font-semibold uppercase tracking-wider text-academy-navy flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-academy-gold-dark" />
                    Private Academy Scholars
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Switch between authorized accounts: Dhie & Mhie
                  </p>
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {students.map((u) => {
                    const isSelected = u.id === currentUser.id;
                    return (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => handleSelectUser(u)}
                        className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between hover:bg-stone-50 transition-colors ${
                          isSelected ? 'bg-amber-50/70 font-semibold' : ''
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs bg-amber-100 text-amber-900 border border-amber-300">
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-academy-navy font-bold">{u.name}</div>
                            <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                              <span className="font-mono text-[10px] text-academy-gold-dark font-semibold">{u.studentId}</span>
                              <span>• {u.proficiency}</span>
                            </div>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-academy-gold-dark font-bold" />}
                      </button>
                    );
                  })}
                </div>

                {onOpenAdmin && (
                  <div className="p-2 border-t border-stone-100 bg-stone-50/70 mt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setShowUserMenu(false);
                        onOpenAdmin();
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 font-semibold text-xs transition-colors"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
                      <span>Open Admin & Faculty Portal</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
