
import React from 'react';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  CreditCard, 
  Briefcase, 
  Utensils, 
  Users,
  Settings,
  Baby
} from 'lucide-react';
import { cn } from './utils';
import { useData } from './context/DataContext';

type NavItem = {
  id: string;
  key: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { id: 'dashboard', key: 'dashboard', icon: LayoutDashboard },
  { id: 'children', key: 'children', icon: Baby },
  { id: 'attendance', key: 'attendance', icon: CalendarCheck },
  { id: 'payments', key: 'payments', icon: CreditCard },
  { id: 'staff', key: 'staff', icon: Briefcase },
  { id: 'classes', key: 'classes', icon: Users },
  { id: 'activities', key: 'activities', icon: Utensils },
  { id: 'settings', key: 'settings', icon: Settings },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const SidebarContent: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { t, user } = useData();

  return (
    <div className="flex flex-col h-full bg-white transition-all duration-300">
      <div className="p-8 flex flex-col items-center text-center gap-4 flex-shrink-0">
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 via-purple-400 to-cyan-300 rounded-[2.5rem] opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
          <img src="https://i.ibb.co/cKc5kP5w/FAVICON.png" alt="Rawdati Logo" className="w-20 h-20 object-contain relative drop-shadow-2xl animate-in zoom-in-50 duration-700 hover:rotate-3 transition-transform" />
        </div>
        <div className="space-y-0.5">
          <h1 className="text-xl font-[1000] text-slate-900 tracking-tighter uppercase italic leading-none">RAWDATI</h1>
          <p className="text-[10px] text-[#6366F1] font-black uppercase tracking-[0.3em]">{t('dashboard')}</p>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1.5 mt-4 no-scrollbar overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center px-4 py-3.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all duration-200 group",
              activeTab === item.id
                ? "bg-[#6366F1] text-white shadow-xl shadow-indigo-500/20"
                : "text-[#94A3B8] hover:bg-[#F8FAFC] hover:text-[#1A1C1E]"
            )}
          >
            <item.icon className={cn(
              "w-4 h-4 mr-4 transition-transform duration-200",
              activeTab === item.id ? "text-white" : "text-[#94A3B8] group-hover:text-[#1A1C1E]"
            )} />
            <span className="truncate">{t(item.key)}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-6 flex-shrink-0">
        <div className="bg-[#F8FAFC] rounded-[1.5rem] p-4 flex items-center gap-4 border border-[#E9EFF2]">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-[#6366F1] font-black text-xs">
            {user?.name?.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-black text-[#1A1C1E] truncate leading-none mb-1">{user?.name}</p>
            <p className="text-[9px] text-[#94A3B8] truncate uppercase font-bold tracking-widest">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = (props) => {
  return (
    <aside className="w-64 bg-white border-r border-[#F1F5F9] h-screen sticky top-0 z-50">
      <SidebarContent {...props} />
    </aside>
  );
};
