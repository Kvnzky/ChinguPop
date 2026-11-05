import React from 'react';
import { NavItemKey } from './Sidebar';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Gamepad2, 
  Bot, 
  Menu
} from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: NavItemKey;
  onSelectTab: (tab: NavItemKey) => void;
  onOpenMenu: () => void;
  pendingAssignmentsCount?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenMenu,
  pendingAssignmentsCount = 0
}) => {
  const navTabs: {
    key: NavItemKey | 'menu';
    label: string;
    korean: string;
    icon: React.ComponentType<{ className?: string }>;
    isAction?: boolean;
    badge?: number;
  }[] = [
    { key: 'dashboard', label: 'Home', korean: '홈', icon: LayoutDashboard },
    { key: 'classroom', label: 'Learn', korean: '수업', icon: GraduationCap },
    { key: 'arcade', label: 'Arcade', korean: '게임', icon: Gamepad2 },
    { key: 'ai-tutor', label: 'AI Tutor', korean: 'AI튜터', icon: Bot },
    { key: 'menu', label: 'Menu', korean: '전체', icon: Menu, isAction: true, badge: pendingAssignmentsCount }
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-purple-200/80 shadow-[0_-4px_20px_rgba(44,30,109,0.08)] pb-[max(env(safe-area-inset-bottom),0.5rem)] select-none"
    >
      <div className="grid grid-cols-5 items-center justify-around h-16 max-w-lg mx-auto px-1">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = !tab.isAction && (
            currentTab === tab.key || 
            (tab.key === 'classroom' && currentTab === 'courses') ||
            (tab.key === 'hangul-lab' && (currentTab === 'speaking-lab' || currentTab === 'vocabulary'))
          );

          const handleClick = () => {
            if (tab.isAction) {
              onOpenMenu();
            } else {
              onSelectTab(tab.key as NavItemKey);
            }
          };

          return (
            <button
              key={tab.key}
              type="button"
              onClick={handleClick}
              className={`flex flex-col items-center justify-center h-full min-h-[48px] py-1 px-1 rounded-xl transition-all relative ${
                isActive
                  ? 'text-[#6C52EE]'
                  : 'text-stone-600 hover:text-[#6C52EE] active:scale-95'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Active Indicator Pill */}
              {isActive && (
                <span className="absolute top-1 w-8 h-1 rounded-full bg-gradient-to-r from-[#FF5CA8] to-[#6C52EE]" />
              )}

              {/* Icon Container */}
              <div className="relative mt-1">
                <div className={`p-1 rounded-lg transition-transform ${
                  isActive ? 'scale-110 bg-purple-50 text-[#6C52EE]' : ''
                }`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#6C52EE]' : 'text-stone-600'}`} />
                </div>

                {/* Badge for Pending Assignments or Tasks */}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-[#FF5CA8] text-white font-bold text-[9px] rounded-full flex items-center justify-center shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Text Label */}
              <span className={`text-[11px] font-bold tracking-tight mt-0.5 leading-none ${
                isActive ? 'text-[#6C52EE] font-extrabold' : 'text-stone-600 font-semibold'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
