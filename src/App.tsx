
import React, { useState } from 'react';
import { Sidebar, SidebarContent } from './Sidebar';
import { Dashboard } from './Dashboard';
import { ChildrenList } from './ChildrenList';
import { AttendanceTracker } from './AttendanceTracker';
import { PaymentManager } from './PaymentManager';
import { StaffManagement } from './StaffManagement';
import { ActivitiesAndMeals } from './ActivitiesAndMeals';
import { ClassesList } from './ClassesList';
import { SettingsPage } from './SettingsPage';
import { LoginPage } from './LoginPage';
import { SignUpPage } from './SignUpPage';
import { SuperAdminDashboard } from './SuperAdminDashboard';
import { SupportBubble } from './SupportBubble';
import { DataProvider, useData } from './context/DataContext';
import { 
  Bell, 
  Search, 
  Menu, 
  X,
  MessageSquare,
  LogOut
} from 'lucide-react';
import { cn } from './utils';

const AppContent: React.FC = () => {
  const { notifications, clearNotifications, settings, user, logout, t } = useData();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');

  if (!user) {
    return authView === 'login' 
      ? <LoginPage onSignUp={() => setAuthView('signup')} /> 
      : <SignUpPage onBack={() => setAuthView('login')} />;
  }

  if (user.role === 'Platform Admin') {
    return <SuperAdminDashboard />;
  }

  const unreadCount = notifications.filter((n: any) => !n.read).length;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'children': return <ChildrenList />;
      case 'attendance': return <AttendanceTracker />;
      case 'payments': return <PaymentManager />;
      case 'staff': return <StaffManagement />;
      case 'classes': return <ClassesList />;
      case 'activities': return <ActivitiesAndMeals />;
      case 'settings': return <SettingsPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F6F8FB] font-sans text-[#1A1C1E] selection:bg-indigo-100 selection:text-indigo-700 transition-all duration-500">
      {/* Sidebar for desktop */}
      <div className="hidden lg:block">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Mobile menu overlay - Figma Premium Version */}
      <div className={cn(
        "fixed inset-0 z-[200] lg:hidden transition-all duration-500",
        isMobileMenuOpen ? "visible" : "invisible pointer-events-none"
      )}>
        <div 
          className={cn(
            "fixed inset-0 bg-[#0F172A]/20 backdrop-blur-md transition-opacity duration-500",
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          )} 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
        <div className={cn(
          "fixed inset-y-0 left-0 w-[280px] bg-white shadow-[20px_0_60px_-15px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-out flex flex-col z-[210]",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="p-4 flex justify-end">
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <SidebarContent activeTab={activeTab} setActiveTab={(tab) => {
              setActiveTab(tab);
              setIsMobileMenuOpen(false);
            }} />
          </div>
        </div>
      </div>

      <main className="flex-1 flex flex-col min-w-0 relative h-screen overflow-hidden">
        {user.role === 'Creche Owner' && <SupportBubble />}
        
        <header className="px-8 h-20 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2.5 bg-white border border-[#E9EFF2] text-[#64748B] rounded-2xl shadow-sm hover:text-[#1A1C1E] transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black text-[#1A1C1E] uppercase tracking-tighter leading-none">
                {t(activeTab)}
              </h1>
              <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mt-1.5">Management Suite 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] w-4 h-4" />
              <input 
                type="text" 
                placeholder={t('search')}
                className="pl-11 pr-6 py-2.5 bg-white border border-[#E9EFF2] focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/20 rounded-2xl text-sm w-72 transition-all outline-none"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-3 bg-white border border-[#E9EFF2] text-[#64748B] hover:text-indigo-600 rounded-2xl shadow-sm transition-all active:scale-95"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && settings.notificationsEnabled && (
                    <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-[#F43F5E] rounded-full border-2 border-white animate-pulse"></span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-4 w-96 bg-white rounded-[2rem] shadow-2xl shadow-slate-200 border border-[#E9EFF2] overflow-hidden z-[100] animate-in fade-in slide-in-from-top-3 duration-300">
                    <div className="p-6 border-b border-[#F8FAFC] flex justify-between items-center bg-[#F8FAFC]/50">
                      <h3 className="text-xs font-black uppercase tracking-widest text-[#1A1C1E]">Activity History</h3>
                      <button onClick={clearNotifications} className="text-[10px] font-black text-blue-600 uppercase hover:underline">Clear</button>
                    </div>
                    <div className="max-h-[32rem] overflow-y-auto no-scrollbar">
                      {notifications.length === 0 ? (
                        <div className="p-12 text-center">
                          <MessageSquare className="w-10 h-10 mx-auto mb-4 text-[#E2E8F0]" />
                          <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">No recent alerts</p>
                        </div>
                      ) : (
                        notifications.map((n: any) => (
                          <div key={n.id} className="p-6 border-b border-[#F8FAFC] hover:bg-[#F8FAFC] transition-colors group">
                            <p className="text-xs font-black text-[#1A1C1E]">{n.title}</p>
                            <p className="text-[11px] text-[#64748B] mt-1 font-medium leading-relaxed">{n.message}</p>
                            <p className="text-[9px] font-black text-[#CBD5E1] mt-3 uppercase">{n.time}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="h-8 w-px bg-[#E9EFF2] mx-2 hidden sm:block"></div>

              <button 
                onClick={logout}
                className="group flex items-center gap-3 bg-white border border-[#E9EFF2] px-4 py-2.5 rounded-2xl shadow-sm hover:border-rose-100 hover:bg-rose-50/50 transition-all active:scale-95"
              >
                <div className="w-7 h-7 rounded-xl bg-pastel-blue flex items-center justify-center text-primary-color font-black text-[10px] group-hover:scale-110 transition-transform">
                  {user.name.substring(0, 2).toUpperCase()}
                </div>
                <LogOut className="w-4 h-4 text-[#94A3B8] group-hover:text-rose-500 transition-colors" />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 px-8 pb-8 overflow-y-auto no-scrollbar scroll-smooth">
          <div className="max-w-7xl mx-auto h-full space-y-10 animate-in fade-in duration-700 delay-150">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
};

export default App;
