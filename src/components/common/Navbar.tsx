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
  Volume2
} from 'lucide-react';

interface NavbarProps {
  currentUser: UserProfile;
  onUserChange: (user: UserProfile) => void;
  onOpenMobileMenu?: () => void;
  onOpenTour?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentUser, 
  onUserChange, 
  onOpenMobileMenu,
  onOpenTour 
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const allUsers = storage.getUsers();

  const students = allUsers.filter(u => u.role === 'student');
  const faculty = allUsers.filter(u => u.role !== 'student');

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
    <header className="sticky top-0 z-30 bg-academy-navy text-academy-ivory border-b border-academy-navy-light shadow-md">
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
            <div className="w-10 h-10 rounded-lg bg-academy-navy-light border border-academy-gold/40 flex items-center justify-center text-academy-gold shadow-inner font-serif font-bold text-xl">
              한
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-lg tracking-wider text-academy-ivory">
                  HANGUL ACADEMY
                </span>
                <span className="hidden sm:inline-block text-xs font-korean text-academy-gold border border-academy-gold/30 px-1.5 py-0.5 rounded">
                  한글 아카데미
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-stone-300">
                Korean Institute of Language & Academic Management
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-academy-navy-light hover:bg-academy-navy-light/80 border border-academy-gold/40 text-academy-gold text-xs font-semibold transition-all shadow-sm active:scale-95"
              title="Launch Guided Academy Walkthrough"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Guided Tour</span>
            </button>
          )}

          {/* Multi-Student Role Switcher Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2.5 bg-academy-navy-light hover:bg-academy-navy-light/80 border border-academy-gold/30 hover:border-academy-gold/60 py-1.5 px-3 rounded-lg text-left transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-academy-gold text-academy-navy font-bold text-xs flex items-center justify-center">
                {currentUser.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-xs">
                <div className="font-semibold text-academy-ivory flex items-center gap-1.5">
                  <span>{currentUser.name}</span>
                  <span className="text-[10px] uppercase font-mono px-1 bg-academy-navy rounded text-academy-gold">
                    {currentUser.role}
                  </span>
                </div>
                <div className="text-[10px] text-stone-300">
                  {currentUser.role === 'student' ? currentUser.studentId : currentUser.email}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-stone-300 ml-1" />
            </button>

            {/* Switch User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white text-academy-charcoal rounded-xl shadow-2xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-stone-100">
                  <p className="text-xs font-semibold uppercase tracking-wider text-academy-navy flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-academy-gold-dark" />
                    Private Academy Directory
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Switch between authorized scholars & faculty
                  </p>
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {/* Authorized Students */}
                  <div className="px-3 pt-2 pb-1 text-[10px] font-mono uppercase text-stone-400 font-bold">
                    Enrolled Scholars (Dhie & Mhie)
                  </div>
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

                  {/* Academic Faculty */}
                  <div className="px-3 pt-3 pb-1 text-[10px] font-mono uppercase text-stone-400 font-bold border-t border-stone-100 mt-1">
                    Faculty & Administration
                  </div>
                  {faculty.map((u) => {
                    const isSelected = u.id === currentUser.id;
                    return (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => handleSelectUser(u)}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-stone-50 transition-colors ${
                          isSelected ? 'bg-stone-100 font-semibold' : ''
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                            u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-academy-charcoal font-medium">{u.name}</div>
                            <div className="text-[10px] text-stone-500 capitalize">{u.role}</div>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-academy-navy font-bold" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
