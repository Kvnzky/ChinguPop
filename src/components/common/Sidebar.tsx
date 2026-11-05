import React, { useState } from 'react';
import { UserRole } from '../../types';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  Bot, 
  Mic, 
  Sparkles, 
  FileCheck, 
  Award, 
  CalendarClock, 
  Library, 
  TrendingUp, 
  FileText, 
  Settings,
  ClipboardList,
  ShieldCheck,
  Grid,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export type NavItemKey = 
  | 'dashboard'
  | 'academy-overview'
  | 'courses'
  | 'hangul-lab'
  | 'classroom'
  | 'ai-tutor'
  | 'speaking-lab'
  | 'vocabulary'
  | 'assignments'
  | 'examinations'
  | 'planner'
  | 'materials'
  | 'records'
  | 'certificates'
  | 'settings'
  | 'admin-portal';

interface SidebarProps {
  currentTab: NavItemKey;
  onSelectTab: (tab: NavItemKey) => void;
  userRole: UserRole;
  pendingAssignmentsCount?: number;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  userRole,
  pendingAssignmentsCount = 1,
  className = ''
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('chingupop_sidebar_collapsed') === 'true';
  });

  const toggleCollapsed = () => {
    setIsCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('chingupop_sidebar_collapsed', String(next));
      return next;
    });
  };

  const primaryNavItems: { key: NavItemKey; label: string; korean: string; icon: React.ComponentType<{ className?: string }>; badge?: number }[] = [
    { key: 'dashboard', label: 'My Dashboard', korean: '개인 대시보드', icon: LayoutDashboard },
    { key: 'academy-overview', label: 'Academy Overview', korean: '학원 종합 현황', icon: Users },
    { key: 'courses', label: 'My Courses', korean: '내 강좌', icon: BookOpen },
    { key: 'hangul-lab', label: 'Hangul Lab', korean: '한글 연구소', icon: Grid },
    { key: 'classroom', label: 'Virtual Classroom', korean: '가상 강의실', icon: GraduationCap },
    { key: 'ai-tutor', label: 'AI Korean Teacher', korean: 'AI 튜터', icon: Bot },
    { key: 'speaking-lab', label: 'Speaking Lab', korean: '말하기 연습실', icon: Mic },
    { key: 'vocabulary', label: 'Vocabulary (SRS)', korean: '어휘 학습', icon: Sparkles },
    { key: 'assignments', label: 'Assignments', korean: '과제 제출', icon: FileCheck, badge: pendingAssignmentsCount },
    { key: 'examinations', label: 'Examinations', korean: '시험 및 평가', icon: Award },
    { key: 'planner', label: 'Study Planner', korean: '학습 계획', icon: CalendarClock },
    { key: 'materials', label: 'Learning Materials', korean: '학습 자료실', icon: Library },
    { key: 'records', label: 'Academic Records', korean: '성적 및 출석', icon: TrendingUp },
    { key: 'certificates', label: 'Certificates', korean: '수료증 발급', icon: FileText },
    { key: 'settings', label: 'Settings', korean: '환경 설정', icon: Settings }
  ];

  if (isCollapsed) {
    return (
      <aside className={`w-20 bg-white border-r border-stone-200/90 flex flex-col justify-between items-center h-[calc(100vh-4rem)] sticky top-16 py-4 select-none ${className}`}>
        
        {/* Top Mini Logo Mark */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6C52EE] to-[#FF5CA8] p-0.5 flex items-center justify-center shadow-xs">
            <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center text-xs font-black text-[#2C1E6D]">
              친구
            </div>
          </div>
        </div>

        {/* Scrollable Compact Icon Column */}
        <div className="overflow-y-auto px-2 py-2 space-y-2 flex flex-col items-center w-full">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onSelectTab(item.key)}
                title={`${item.label} (${item.korean})`}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center relative transition-all duration-150 ${
                  isActive
                    ? 'bg-[#18181B] text-white shadow-md'
                    : 'text-stone-500 hover:text-[#6C52EE] hover:bg-stone-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#FF5CA8] border-2 border-white" />
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Expand Toggle Button */}
        <div className="pt-2 border-t border-stone-200 w-full flex flex-col items-center">
          <button
            type="button"
            onClick={toggleCollapsed}
            title="Expand Full Menu"
            className="w-10 h-10 rounded-xl hover:bg-stone-100 flex items-center justify-center text-stone-500 hover:text-[#2C1E6D] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </aside>
    );
  }

  return (
    <aside className={`w-64 bg-academy-ivory border-r border-stone-200/90 flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 select-none ${className}`}>
      
      {/* Scrollable Navigation List */}
      <div className="overflow-y-auto px-3 py-4 space-y-1">
        
        {/* Academic Role Badge */}
        <div className="px-3 py-2 mb-2 bg-purple-50/60 rounded-xl border border-purple-200/60 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold text-[#6C52EE] uppercase tracking-wider">
              Portal Access
            </p>
            <span className="text-xs font-bold text-[#2C1E6D] capitalize block">
              {userRole} Portal
            </span>
          </div>
          <button
            type="button"
            onClick={toggleCollapsed}
            title="Collapse to Icon Rail"
            className="p-1 rounded-lg hover:bg-purple-100/70 text-[#6C52EE] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Primary Academic Sections */}
        <div className="text-[11px] font-bold uppercase tracking-wider text-purple-900/60 px-3 py-1">
          Academic Curriculum
        </div>

        {primaryNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelectTab(item.key)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-gradient-to-r from-[#6C52EE] to-[#7955E8] text-white shadow-md shadow-purple-500/20'
                  : 'text-[#2C1E6D]/80 hover:bg-purple-50 hover:text-[#6C52EE]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF5CA8]' : 'text-purple-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] font-korean hidden sm:inline ${isActive ? 'text-purple-100 font-semibold' : 'text-stone-600 font-medium'}`}>
                  {item.korean}
                </span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-[#FF5CA8] text-white' : 'bg-pink-100 text-pink-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}

        {/* Faculty Admin Link (Only visible if authenticated as admin) */}
        {userRole === 'admin' && (
          <div className="pt-3 mt-3 border-t border-stone-200 space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-purple-900/60 px-3 py-1 flex items-center justify-between">
              <span>Administration</span>
              <span className="text-[9px] font-mono bg-purple-100 text-[#6C52EE] px-1.5 py-0.2 rounded font-bold">Portal</span>
            </div>
            <button
              type="button"
              onClick={() => onSelectTab('admin-portal')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                currentTab === 'admin-portal'
                  ? 'bg-[#2C1E6D] text-white shadow-md ring-2 ring-purple-400/40'
                  : 'text-stone-700 hover:bg-purple-50 hover:text-[#6C52EE]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className={`w-4 h-4 ${currentTab === 'admin-portal' ? 'text-[#FF5CA8]' : 'text-[#6C52EE]'}`} />
                <span className="font-semibold">Admin Portal</span>
              </div>
              <span className={`text-[10px] font-korean ${currentTab === 'admin-portal' ? 'text-purple-200 font-semibold' : 'text-stone-600 font-medium'}`}>
                관리자 포털
              </span>
            </button>
          </div>
        )}

      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-purple-100 bg-purple-50/40 text-[11px] text-stone-700">
        <div className="flex items-center justify-between">
          <span className="font-bold text-[#2C1E6D] flex items-center">
            <span className="text-[#6C52EE]">Chingu</span>
            <span className="text-[#FF5CA8]">Pop</span>
          </span>
          <span className="font-mono text-[10px] text-purple-700 font-bold">v1.0.0 PWA</span>
        </div>
        <p className="text-[10px] mt-0.5 text-stone-600 font-medium">Korean Language Learning Academy</p>
      </div>

    </aside>
  );
};
