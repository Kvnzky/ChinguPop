import React from 'react';
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
  Users
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

  return (
    <aside className={`w-64 bg-academy-ivory border-r border-stone-200/90 flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 select-none ${className}`}>
      
      {/* Scrollable Navigation List */}
      <div className="overflow-y-auto px-3 py-4 space-y-1">
        
        {/* Academic Role Badge */}
        <div className="px-3 py-2 mb-2 bg-stone-100 rounded-lg border border-stone-200">
          <p className="text-[10px] font-semibold text-academy-charcoal-muted uppercase tracking-wider">
            Portal Access
          </p>
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-xs font-serif font-bold text-academy-navy capitalize">
              {userRole} Portal
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white text-academy-gold-dark border border-stone-200">
              Seoul Univ Standard
            </span>
          </div>
        </div>

        {/* Primary Academic Sections */}
        <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 px-3 py-1">
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
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-academy-navy text-academy-ivory shadow-sm'
                  : 'text-academy-charcoal hover:bg-stone-100/80 hover:text-academy-navy'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-academy-gold' : 'text-stone-500'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] font-korean hidden sm:inline ${isActive ? 'text-stone-300' : 'text-stone-500'}`}>
                  {item.korean}
                </span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-academy-gold text-academy-navy' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}

        {/* Direct Admin & Faculty Portal Link */}
        <div className="pt-3 mt-3 border-t border-stone-200 space-y-1">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 px-3 py-1 flex items-center justify-between">
            <span>Administration</span>
            <span className="text-[9px] font-mono bg-purple-100 text-purple-800 px-1.5 py-0.2 rounded font-bold">Portal</span>
          </div>
          <button
            type="button"
            onClick={() => onSelectTab('admin-portal')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              currentTab === 'admin-portal'
                ? 'bg-purple-950 text-white shadow-sm'
                : 'text-stone-700 hover:bg-stone-100/80 hover:text-academy-navy'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className={`w-4 h-4 ${currentTab === 'admin-portal' ? 'text-academy-gold' : 'text-purple-700'}`} />
              <span className="font-semibold">Admin Portal</span>
            </div>
            <span className={`text-[10px] font-korean ${currentTab === 'admin-portal' ? 'text-purple-300' : 'text-stone-500'}`}>
              관리자 포털
            </span>
          </button>
        </div>

      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-stone-200 bg-stone-50/80 text-[11px] text-stone-500">
        <div className="flex items-center justify-between">
          <span className="font-bold text-academy-navy flex items-center">
            <span className="text-[#7955E8]">Chingu</span>
            <span className="text-[#FF5CA8]">Pop</span>
          </span>
          <span className="font-mono text-[10px]">v1.0.0 PWA</span>
        </div>
        <p className="text-[10px] mt-0.5 text-stone-500">Korean Language Learning Academy</p>
      </div>

    </aside>
  );
};
