
import React, { useState } from 'react';
import { useData } from './context/DataContext';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Activity,
  LogOut,
  ChevronRight,
  Plus,
  Clock,
  Mail,
  User,
  LayoutDashboard,
  Calendar,
  Search,
  ArrowUpRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from './utils';
import { Modal } from './Modal';

const chartData = [
  { name: 'Jan', revenue: 2.1 },
  { name: 'Feb', revenue: 2.5 },
  { name: 'Mar', revenue: 3.2 },
  { name: 'Apr', revenue: 3.8 },
  { name: 'May', revenue: 4.2 },
];

export const SuperAdminDashboard: React.FC = () => {
  const { logout, t, nurseries, updateNurserySub, supportMessages, registerNursery, loginAsNursery } = useData();
  const [selectedNursery, setSelectedNursery] = useState<any>(null);
  const [activeView, setActiveView] = useState<'stats' | 'users' | 'messages'>('stats');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddNursery = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    const data = {
      name: formData.get('nurseryName'),
      owner: formData.get('ownerName'),
      city: formData.get('city'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      password: password || 'nursery123'
    };
    registerNursery(data);
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FB] font-sans text-[#1A1C1E] transition-colors duration-300">
      {/* Desktop Header Master - Hidden on Mobile */}
      <header className="hidden lg:flex bg-white border-b border-[#E9EFF2] px-8 h-20 items-center justify-between sticky top-0 z-[100]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#6366F1] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 transform rotate-3">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-[1000] tracking-tighter uppercase italic leading-none text-indigo-600">RAWDATI MASTER</h1>
            <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.3em] mt-1.5">Système de Pilotage 2026</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <nav className="flex bg-[#F0F4F8] p-1.5 rounded-2xl">
            <button 
              onClick={() => setActiveView('stats')}
              className={cn(
                "px-6 py-2 text-[10px] font-[1000] uppercase tracking-widest rounded-xl transition-all",
                activeView === 'stats' ? "bg-white text-[#6366F1] shadow-sm" : "text-[#64748B] hover:text-[#1A1C1E]"
              )}
            >
              Stats
            </button>
            <button 
              onClick={() => setActiveView('users')}
              className={cn(
                "px-6 py-2 text-[10px] font-[1000] uppercase tracking-widest rounded-xl transition-all",
                activeView === 'users' ? "bg-white text-[#6366F1] shadow-sm" : "text-[#64748B] hover:text-[#1A1C1E]"
              )}
            >
              Crèches
            </button>
            <button 
              onClick={() => setActiveView('messages')}
              className={cn(
                "px-6 py-2 text-[10px] font-[1000] uppercase tracking-widest rounded-xl transition-all relative",
                activeView === 'messages' ? "bg-white text-[#6366F1] shadow-sm" : "text-[#64748B] hover:text-[#1A1C1E]"
              )}
            >
              Messages
              {supportMessages.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </button>
          </nav>
          
          <button 
            onClick={logout}
            className="flex items-center gap-3 bg-[#1A1C1E] text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-[1.05] active:scale-[0.95] transition-all"
          >
            <LogOut className="w-4 h-4" />
            {t('logout')}
          </button>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-[#E9EFF2] px-6 h-16 flex items-center justify-between sticky top-0 z-[100]">
        <h1 className="text-lg font-black text-indigo-600 tracking-tighter uppercase italic">RAWDATI</h1>
        <button 
          onClick={logout}
          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Nouveau Compte Administrateur">
         <form onSubmit={handleAddNursery} className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] font-[1000] text-slate-400 uppercase tracking-[0.2em] ml-1">Nom du Propriétaire</label>
                <input name="ownerName" type="text" placeholder="Ex: Karim Benali" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all" required />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-[1000] text-slate-400 uppercase tracking-[0.2em] ml-1">Ville</label>
                <input name="city" type="text" placeholder="Ex: Alger" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-[1000] text-slate-400 uppercase tracking-[0.2em] ml-1">Nom de l'Établissement (Crèche)</label>
              <input name="nurseryName" type="text" placeholder="Ex: Crèche Les Petits Pas" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all" required />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] font-[1000] text-slate-400 uppercase tracking-[0.2em] ml-1">Email de Connexion</label>
                <input name="email" type="email" placeholder="contact@creche.dz" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all" required />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-[1000] text-slate-400 uppercase tracking-[0.2em] ml-1">Mot de Passe</label>
                <input name="password" type="text" placeholder="nursery123" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[9px] font-[1000] text-slate-400 uppercase tracking-[0.2em] ml-1">Téléphone de Contact</label>
              <input name="phone" type="tel" placeholder="0555-00-00-00" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all" required />
            </div>

            <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-[1.5rem] flex gap-4">
               <ShieldCheck className="w-6 h-6 text-indigo-600 mt-1" />
               <div>
                  <p className="text-[11px] font-black text-indigo-900 uppercase tracking-tighter mb-1">Droits d'Accès Initiaux</p>
                  <p className="text-[10px] text-indigo-700 font-medium leading-relaxed">Le compte sera créé avec un mot de passe par défaut : <span className="font-bold underline">nursery123</span>. Une période d'essai de 7 jours sera activée automatiquement.</p>
               </div>
            </div>

            <div className="pt-6 flex gap-4">
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 py-4 bg-white border border-slate-200 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">Annuler</button>
              <button type="submit" className="flex-1 py-4 bg-[#1A1C1E] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Activer le Compte</button>
            </div>
         </form>
      </Modal>

      {/* Bottom Navigation for Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-[#E9EFF2] px-6 h-20 flex items-center justify-around z-[100] pb-2 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
        <MobileTabButton active={activeView === 'stats'} icon={TrendingUp} label="Stats" onClick={() => setActiveView('stats')} />
        <MobileTabButton active={activeView === 'users'} icon={Building2} label="Crèches" onClick={() => setActiveView('users')} />
        <MobileTabButton active={activeView === 'messages'} icon={Mail} label="Support" onClick={() => setActiveView('messages')} badge={supportMessages.length > 0} />
      </nav>

      <main className="max-w-[1400px] mx-auto p-6 md:p-10 space-y-10 animate-in fade-in duration-700 pb-32 lg:pb-10">
        {activeView === 'stats' ? (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <StatCard label="Crèches Actives" value={nurseries.length} icon={Building2} color="indigo" trend="+14%" />
              <StatCard label="Enfants Réseau" value="2.4k" icon={Users} color="emerald" trend="+5.2%" />
              <StatCard label="Volume Global" value="4.2M DA" icon={TrendingUp} color="purple" trend="+18%" />
              <StatCard label="État Système" value="100%" icon={Activity} color="blue" trend="Stable" />
            </div>

            <div className="figma-card p-10">
               <h3 className="text-xl font-[1000] uppercase tracking-tighter italic mb-10">Croissance du Réseau</h3>
               <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorIndigo" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                      <Tooltip />
                      <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fill="url(#colorIndigo)" />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>
          </div>
        ) : activeView === 'users' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* List */}
            <div className="lg:col-span-7 space-y-6">
               <div className="bg-white border border-[#E9EFF2] rounded-[2.5rem] overflow-hidden shadow-sm">
                  <div className="p-10 border-b border-[#F1F5F9] flex justify-between items-center bg-[#F8FAFC]/30">
                    <div className="flex items-center gap-4">
                      <h2 className="text-xl font-[1000] uppercase tracking-tighter italic text-[#1A1C1E]">Gestion des Comptes</h2>
                      <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-[#1A1C1E] text-white text-[9px] font-black px-4 py-2.5 rounded-xl uppercase tracking-widest shadow-xl hover:bg-black transition-all flex items-center gap-2"
                      >
                        <Plus className="w-3 h-3" /> Nouveau Compte Admin
                      </button>
                    </div>
                    <span className="bg-[#1A1C1E] text-white text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-[0.2em]">{nurseries.length} TOTAL</span>
                  </div>
                  <div className="divide-y divide-[#F1F5F9]">
                    {nurseries.map((n: any) => (
                      <div 
                        key={n.id} 
                        onClick={() => setSelectedNursery(n)}
                        className={cn(
                          "p-8 flex items-center justify-between cursor-pointer transition-all hover:bg-[#F8FAFC] group",
                          selectedNursery?.id === n.id && "bg-[#F0F4FF] border-l-4 border-l-[#6366F1]"
                        )}
                      >
                        <div className="flex items-center gap-6">
                          <div className={cn(
                            "w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg transition-transform group-hover:scale-110 shadow-sm",
                            selectedNursery?.id === n.id ? "bg-white text-[#6366F1]" : "bg-[#F8FAFC] text-slate-300"
                          )}>
                            {n.name[0]}
                          </div>
                          <div>
                            <p className="text-lg font-[1000] text-[#1A1C1E] tracking-tight mb-1 group-hover:text-[#6366F1] transition-colors">{n.name}</p>
                            <div className="flex items-center gap-3">
                               <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-widest">{n.owner}</p>
                               <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                               <p className="text-[11px] font-black text-indigo-600 uppercase tracking-tighter">{n.plan}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-8">
                           <div className="text-right hidden sm:block">
                              <p className="text-[10px] font-black text-slate-300 uppercase mb-0.5">Expire le</p>
                              <p className="text-[11px] font-black text-slate-900">{n.expiry}</p>
                           </div>
                           <ChevronRight className={cn("w-6 h-6 transition-all duration-300", selectedNursery?.id === n.id ? "text-[#6366F1] translate-x-2" : "text-slate-200")} />
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            {/* Sub Tools */}
            <div className="lg:col-span-5 space-y-8 sticky top-32 h-fit">
               {selectedNursery ? (
                 <div className="figma-card p-10 animate-in slide-in-from-right-8 duration-500 overflow-hidden">
                    <div className="flex items-center gap-6 mb-10 border-b border-[#F1F5F9] pb-10">
                       <div className="w-16 h-16 rounded-[1.5rem] bg-[#6366F1] text-white flex items-center justify-center font-[1000] text-2xl shadow-2xl shadow-indigo-600/30 transform rotate-3">
                         {selectedNursery.name[0]}
                       </div>
                       <div>
                         <h3 className="text-2xl font-[1000] text-[#1A1C1E] tracking-tighter uppercase leading-none mb-2 italic">{selectedNursery.name}</h3>
                         <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{selectedNursery.city}, Algérie</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-12">
                       <SubDetail label="Statut Accès" value={selectedNursery.status} active />
                       <SubDetail label="Date Expiration" value={selectedNursery.expiry} />
                       <SubDetail label="Propriétaire" value={selectedNursery.owner} />
                       <SubDetail label="Téléphone" value={selectedNursery.phone || 'N/A'} />
                    </div>

                    <div className="space-y-4 pt-10 border-t border-[#F1F5F9]">
                       <button 
                         onClick={() => loginAsNursery(selectedNursery)}
                         className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all mb-4 flex items-center justify-center gap-2"
                       >
                         <ShieldCheck className="w-4 h-4" /> Accéder au Dashboard
                       </button>

                       <p className="text-[10px] font-black text-[#1A1C1E] uppercase tracking-[0.3em] mb-6 text-center">Prolonger Manuellement</p>
                       <div className="grid grid-cols-1 gap-3">
                          <SubActionButton label="+7 JOURS (Essai)" onClick={() => updateNurserySub(selectedNursery.id, 7, 'days')} color="slate" />
                          <SubActionButton label="+1 MOIS (Renouvellement)" onClick={() => updateNurserySub(selectedNursery.id, 1, 'months')} color="indigo" />
                          <SubActionButton label="+1 AN (Licence Premium)" onClick={() => updateNurserySub(selectedNursery.id, 1, 'years')} color="black" />
                       </div>
                    </div>
                 </div>
               ) : (
                 <div className="figma-card h-80 flex flex-col items-center justify-center text-slate-300 p-16 text-center border-dashed border-2">
                    <User className="w-14 h-14 mb-6 opacity-10" />
                    <p className="text-xs font-[1000] uppercase tracking-[0.4em] leading-relaxed italic">Sélectionnez une crèche pour gérer ses droits d'accès au cloud</p>
                 </div>
               )}
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-300">
             <div className="flex justify-between items-center px-4">
                <h2 className="text-2xl font-[1000] uppercase tracking-tighter italic">Boîte de Support</h2>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{supportMessages.length} Messages</span>
             </div>
             <div className="grid grid-cols-1 gap-4">
                {supportMessages.map((m: any) => (
                   <div key={m.id} className="figma-card p-10 flex flex-col md:flex-row justify-between items-center gap-8 hover:border-indigo-600/30 transition-all group">
                      <div className="flex gap-8 items-center flex-1">
                         <div className="w-16 h-16 rounded-[1.25rem] bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-2xl border border-indigo-100 shadow-sm">
                            {m.senderName[0]}
                         </div>
                         <div className="space-y-2">
                            <div className="flex items-center gap-4">
                               <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">{m.senderName}</p>
                               <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                               <p className="text-[11px] font-bold text-slate-400">{m.date}</p>
                            </div>
                            <h3 className="text-xl font-[1000] text-[#1A1C1E] tracking-tight">{m.subject}</h3>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-3xl">{m.message}</p>
                         </div>
                      </div>
                      <div className="flex gap-4">
                         <button className="px-8 py-4 bg-[#F0F4F8] text-[#475569] rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#E2E8F0]">Archiver</button>
                         <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:bg-indigo-700">Répondre</button>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color, trend }: any) => {
  const colors: any = {
    indigo: "text-[#6366F1] bg-[#F0F4FF]",
    emerald: "text-[#10B981] bg-[#DCFCE7]",
    purple: "text-[#7C3AED] bg-[#F3E8FF]",
    blue: "text-[#2563EB] bg-[#EFF6FF]",
  };
  return (
    <div className="figma-card p-10 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group">
      <div className="flex justify-between items-start mb-8">
        <div className={cn("w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-3 shadow-sm", colors[color])}>
          <Icon className="w-7 h-7" />
        </div>
        <div className="text-right">
          <p className="text-[11px] font-[1000] text-[#10B981] italic">{trend}</p>
        </div>
      </div>
      <div>
        <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.3em] mb-3 leading-none">{label}</p>
        <p className="text-4xl font-[1000] text-[#1A1C1E] tracking-tighter leading-none">{value}</p>
      </div>
    </div>
  );
};

const MobileTabButton = ({ active, icon: Icon, label, onClick, badge }: any) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex flex-col items-center gap-1.5 transition-all relative",
      active ? "text-[#6366F1] scale-110" : "text-[#94A3B8]"
    )}
  >
    <div className={cn(
      "p-2 rounded-xl transition-all",
      active ? "bg-[#F0F4FF]" : "bg-transparent"
    )}>
      <Icon className="w-5 h-5" />
    </div>
    <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
    {badge && !active && (
      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
    )}
  </button>
);

const SubDetail = ({ label, value, active = false }: any) => (
  <div className="space-y-2">
    <p className="text-[9px] font-[1000] text-[#94A3B8] uppercase tracking-[0.2em] leading-none">{label}</p>
    <p className={cn("text-[13px] font-black tracking-tight", active ? "text-[#10B981]" : "text-[#1A1C1E]")}>
      {value}
    </p>
  </div>
);

const SubActionButton = ({ label, onClick, color }: any) => {
  const styles: any = {
    slate: "bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9] border border-[#E2E8F0]",
    indigo: "bg-[#6366F1] text-white hover:bg-[#4F46E5] shadow-xl shadow-indigo-500/20",
    black: "bg-[#1A1C1E] text-white hover:bg-black shadow-xl shadow-black/10",
  };
  return (
    <button 
      onClick={onClick}
      className={cn("py-4 rounded-[1.25rem] text-[11px] font-[1000] uppercase tracking-[0.2em] transition-all active:scale-95", styles[color])}
    >
      {label}
    </button>
  );
};
