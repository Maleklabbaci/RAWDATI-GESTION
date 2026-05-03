
import React from 'react';
import { 
  Baby, 
  CreditCard, 
  TrendingUp, 
  AlertCircle,
  Calendar,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cn } from './utils';
import { useData } from './context/DataContext';

const data = [
  { name: 'Mon', attendance: 25 },
  { name: 'Tue', attendance: 28 },
  { name: 'Wed', attendance: 24 },
  { name: 'Thu', attendance: 27 },
  { name: 'Fri', attendance: 22 },
];

import { Modal } from './Modal';
import { useState } from 'react';

export const Dashboard: React.FC = () => {
  const { children, staff, payments, getAbsences, t, settings, notifications, user } = useData();
  const [isControlModalOpen, setIsControlModalOpen] = useState(false);
  
  const activeChildren = children.filter(c => c.status === 'Active').length;
  const pendingPayments = payments.filter(p => p.status === 'Pending').length;
  const overduePayments = payments.filter(p => p.status === 'Overdue').length;
  
  const totalRevenue = payments.reduce((acc, p) => p.status === 'Paid' ? acc + p.amount : acc, 0);
  
  const todayStr = '2026-05-20';
  const absentToday = getAbsences(todayStr).length;
  const totalEnrolled = children.length;
  const presentToday = totalEnrolled - absentToday;

  const groupData = [
    { name: 'Babies', value: children.filter(c => c.group === 'Babies').length, color: '#6366F1' },
    { name: 'Middles', value: children.filter(c => c.group === 'Middles').length, color: '#F97316' },
    { name: 'Bigs', value: children.filter(c => c.group === 'Bigs').length, color: '#8B5CF6' },
  ];
  
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Figma Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-[#E9EFF2] pb-12 relative overflow-hidden">
        <div className="flex items-center gap-8 relative z-10">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 via-purple-400 to-cyan-300 rounded-[2rem] opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="w-24 h-24 bg-white rounded-[2rem] shadow-2xl shadow-indigo-500/10 flex items-center justify-center p-4 border border-[#F1F5F9] animate-in zoom-in-50 duration-700 relative">
               <img src="https://i.ibb.co/cKc5kP5w/FAVICON.png" alt="Logo" className="w-full h-full object-contain hover:rotate-6 transition-transform" />
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-6xl font-[1000] text-[#1A1C1E] tracking-tighter leading-none">{t('dashboard')}</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100/50">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Active</span>
              </div>
              <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.3em]">{t('welcome').replace('Admin', user.name)} • 2026</p>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setIsControlModalOpen(true)}
          className="figma-button-primary flex items-center gap-2"
        >
          <ShieldCheck className="w-5 h-5" />
          <span>{t('master_dashboard')}</span>
        </button>
      </div>

      <Modal isOpen={isControlModalOpen} onClose={() => setIsControlModalOpen(false)} title="System Master Control">
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <ControlMiniCard label="Serveur Status" value="Online" color="green" />
            <ControlMiniCard label="Couche Sec" value="Active" color="blue" />
            <ControlMiniCard label="Database" value="98% Sync" color="purple" />
            <ControlMiniCard label="Trafic" value="Stable" color="amber" />
          </div>

          <div className="space-y-3">
            <h5 className="font-black text-slate-900 text-[10px] uppercase tracking-widest ml-1">Actions Systèmes</h5>
            <div className="grid grid-cols-1 gap-2">
              <button className="w-full py-3.5 bg-slate-50 text-slate-900 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Générer Rapport Global 2026</button>
              <button className="w-full py-3.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-100 transition-all">Nettoyer les Sessions</button>
            </div>
          </div>

          <button onClick={() => setIsControlModalOpen(false)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">
            Fermer le Panel
          </button>
        </div>
      </Modal>

      {/* Figma Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title={t('total_children')} value={activeChildren.toString()} icon={Baby} trend="+8% vs avril" color="blue" />
        <StatCard title={t('attendance_today')} value={`${presentToday}/${totalEnrolled}`} icon={Calendar} trend={`${Math.round((presentToday/totalEnrolled)*100)}% rate`} color="green" />
        <StatCard title={t('pending_payments')} value={`${pendingPayments + overduePayments}`} icon={CreditCard} trend={`${overduePayments} overdue`} color="orange" />
        <StatCard title={t('monthly_revenue')} value={`${totalRevenue.toLocaleString()} ${settings.currency || 'DA'}`} icon={TrendingUp} trend="Goal: 1M" color="purple" />
      </div>

      {/* Subscription Status for Creche Owner */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl animate-in zoom-in-95 duration-700">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
            <ShieldCheck className="w-7 h-7 text-blue-300" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-300 opacity-80 mb-2">Licence Active 2026</p>
            <h3 className="text-2xl font-black tracking-tighter uppercase italic flex items-center gap-3">
              RAWDATI <span className="bg-blue-600 text-white px-2.5 py-1 rounded-lg text-[11px] not-italic tracking-normal">PLATINUM</span>
            </h3>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Expiration</p>
            <p className="text-xl font-black text-white">20 Juin 2026</p>
          </div>
          <div className="h-12 w-px bg-white/20 hidden md:block"></div>
          <a 
            href="https://wa.me/213697660969?text=Je%20veux%20prolonger%20l'abonnement%20RAWDATI"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 bg-[#25D366] hover:bg-[#1fb355] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center gap-3"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            Prolonger via WhatsApp
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="figma-card p-8">
          <h3 className="font-black text-[#1A1C1E] mb-8 uppercase text-[10px] tracking-[0.2em]">{t('weekly_attendance')}</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}} />
                <Tooltip 
                  cursor={{fill: '#F8FAFC'}}
                  contentStyle={{backgroundColor: '#1A1C1E', border: 'none', borderRadius: '12px', color: '#fff'}}
                />
                <Bar dataKey="attendance" fill="#6366F1" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="figma-card p-8">
          <h3 className="font-black text-[#1A1C1E] mb-8 uppercase text-[10px] tracking-[0.2em]">{t('age_distribution')}</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={groupData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {groupData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-8 mt-6">
            {groupData.map((g) => (
              <div key={g.name} className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.color }} />
                <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">{t(g.name.toLowerCase())}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 figma-card overflow-hidden">
          <div className="p-8 border-b border-[#F1F5F9] flex justify-between items-center bg-[#F8FAFC]/50">
            <h3 className="font-black text-[#1A1C1E] uppercase text-[10px] tracking-[0.2em]">{t('recent_notif')}</h3>
          </div>
          <div className="divide-y divide-[#F1F5F9]">
            {notifications.length > 0 ? (
              notifications.slice(0, 5).map((notif: any) => (
                <NotificationItem 
                  key={notif.id}
                  icon={notif.title.includes('Registration') ? Baby : AlertCircle}
                  color={notif.title.includes('Registration') ? 'text-blue-500' : 'text-amber-500'}
                  title={notif.title}
                  desc={notif.message}
                  time={notif.time}
                />
              ))
            ) : (
              <div className="p-16 text-center text-[#94A3B8] font-bold uppercase text-[10px] tracking-[0.3em] italic opacity-40">No recent activities</div>
            )}
          </div>
        </div>

        <div className="figma-card p-8">
          <h3 className="font-black text-[#1A1C1E] mb-8 uppercase text-[10px] tracking-[0.2em]">{t('active_staff')}</h3>
          <div className="space-y-6">
            {staff.slice(0, 4).map((s) => (
              <div key={s.id} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-[#F0F4FF] flex items-center justify-center font-black text-[#6366F1] group-hover:bg-primary-color group-hover:text-white transition-all duration-300">
                  {s.firstName[0]}{s.lastName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-[#1A1C1E] leading-tight truncate">{s.firstName} {s.lastName}</p>
                  <p className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-widest mt-1">{s.role}</p>
                </div>
                <div className="flex items-center justify-center bg-[#DCFCE7] w-6 h-6 rounded-full">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
          <button className="figma-button-secondary w-full mt-10 text-[10px] uppercase tracking-widest font-black">View All Team</button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => {
  const colors: any = {
    blue: "bg-pastel-blue text-[#4F46E5]",
    green: "bg-pastel-green text-[#059669]",
    orange: "bg-pastel-orange text-[#EA580C]",
    purple: "bg-pastel-purple text-[#7C3AED]",
  };

  return (
    <div className="figma-card p-8 group hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start mb-8">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300", colors[color])}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="text-right">
          <p className="text-[9px] font-black text-[#94A3B8] uppercase tracking-[0.2em] mb-1">Growth</p>
          <p className="text-[10px] font-black text-[#059669]">{trend}</p>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest leading-none">{title}</p>
        <p className="text-3xl font-black text-[#1A1C1E] tracking-tighter leading-none">{value}</p>
      </div>
    </div>
  );
};

const NotificationItem = ({ icon: Icon, color, title, desc, time }: any) => {
  const pastelColors: any = {
    'text-blue-500': 'bg-pastel-blue text-[#4F46E5]',
    'text-amber-500': 'bg-pastel-orange text-[#EA580C]',
    'text-green-500': 'bg-pastel-green text-[#059669]',
  };
  
  return (
    <div className="p-6 flex items-start gap-6 hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9] last:border-0 group">
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 duration-200", pastelColors[color] || 'bg-slate-100 text-slate-600')}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-extrabold text-[#1A1C1E] uppercase tracking-tight">{title}</p>
        <p className="text-xs text-[#64748B] mt-1 leading-relaxed font-medium">{desc}</p>
      </div>
      <span className="text-[10px] font-black text-[#CBD5E1] uppercase tracking-widest mt-1">{time}</span>
    </div>
  );
};

const ControlMiniCard = ({ label, value, color }: any) => {
  const colors: any = {
    green: "text-emerald-600 bg-emerald-50/50",
    blue: "text-blue-600 bg-blue-50/50",
    purple: "text-purple-600 bg-purple-50/50",
    amber: "text-amber-600 bg-amber-50/50",
  };
  return (
    <div className="p-4 rounded-[1.5rem] border border-slate-100 glass-effect shadow-sm">
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{label}</p>
      <p className={cn("text-xs font-black px-2 py-1 rounded-lg inline-block", colors[color])}>{value}</p>
    </div>
  );
};


