
import React, { useState } from 'react';
import { useData } from './context/DataContext';
import { Baby, Lock, Mail, User, MapPin, Building2, Loader2, ArrowLeft } from 'lucide-react';
import { cn } from './utils';

interface SignUpPageProps {
  onBack: () => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({ onBack }) => {
  const { t, registerNursery } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('nurseryName'),
      owner: formData.get('ownerName'),
      city: formData.get('city'),
      email: formData.get('email'),
      phone: formData.get('phone'),
    };

    setTimeout(() => {
      registerNursery(data);
      setIsLoading(false);
      setIsSuccess(true);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#F6F8FB] flex items-center justify-center p-6">
        <div className="w-full max-w-[480px] figma-card p-12 text-center space-y-6 animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/10">
            <Building2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-[1000] text-[#1A1C1E] uppercase tracking-tighter italic">Demande Envoyée !</h2>
          <p className="text-[#64748B] font-medium leading-relaxed">
            Votre demande d'inscription pour 2026 a été transmise au Super Admin. Vous recevrez un email dès que votre accès sera validé.
          </p>
          <button onClick={onBack} className="figma-button-primary w-full mt-4 uppercase text-[11px] tracking-widest font-black">
            Retour à la connexion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F8FB] flex items-center justify-center p-6">
      <div className="w-full max-w-[520px] space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center justify-between px-2">
          <button onClick={onBack} className="p-3 bg-white border border-[#E9EFF2] text-[#64748B] rounded-2xl hover:text-[#1A1C1E] transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-right">
             <h1 className="text-2xl font-[1000] text-[#1A1C1E] tracking-tighter uppercase italic leading-none">RAWDATI</h1>
             <p className="text-[9px] text-[#94A3B8] font-black uppercase tracking-[0.3em] mt-1">Nouveau Compte 2026</p>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.06)] border border-[#E9EFF2] p-10 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-[1000] text-[#94A3B8] uppercase tracking-[0.2em] ml-1">{t('owner_name')}</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#CBD5E1] group-focus-within:text-indigo-600 transition-colors" />
                  <input name="ownerName" type="text" placeholder="Karim" className="w-full pl-11 pr-4 py-4 bg-[#F8FAFC] border border-[#E2E8F0] focus:border-indigo-600 focus:bg-white rounded-2xl text-sm font-bold outline-none transition-all" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-[1000] text-[#94A3B8] uppercase tracking-[0.2em] ml-1">{t('city')}</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#CBD5E1] group-focus-within:text-indigo-600 transition-colors" />
                  <input name="city" type="text" placeholder="Alger" className="w-full pl-11 pr-4 py-4 bg-[#F8FAFC] border border-[#E2E8F0] focus:border-indigo-600 focus:bg-white rounded-2xl text-sm font-bold outline-none transition-all" required />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-[1000] text-[#94A3B8] uppercase tracking-[0.2em] ml-1">{t('nursery_name')}</label>
                <div className="relative group">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#CBD5E1] group-focus-within:text-indigo-600 transition-colors" />
                  <input name="nurseryName" type="text" placeholder="Ma Crèche d'Alger" className="w-full pl-11 pr-4 py-4 bg-[#F8FAFC] border border-[#E2E8F0] focus:border-indigo-600 focus:bg-white rounded-2xl text-sm font-bold outline-none transition-all" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-[1000] text-[#94A3B8] uppercase tracking-[0.2em] ml-1">Téléphone</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#CBD5E1] group-focus-within:text-indigo-600 transition-colors" />
                  <input name="phone" type="tel" placeholder="0555-00-00-00" className="w-full pl-11 pr-4 py-4 bg-[#F8FAFC] border border-[#E2E8F0] focus:border-indigo-600 focus:bg-white rounded-2xl text-sm font-bold outline-none transition-all" required />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-[1000] text-[#94A3B8] uppercase tracking-[0.2em] ml-1">{t('admin_email')}</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#CBD5E1] group-focus-within:text-indigo-600 transition-colors" />
                <input name="email" type="email" placeholder="contact@creche.dz" className="w-full pl-11 pr-4 py-4 bg-[#F8FAFC] border border-[#E2E8F0] focus:border-indigo-600 focus:bg-white rounded-2xl text-sm font-bold outline-none transition-all" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-[1000] text-[#94A3B8] uppercase tracking-[0.2em] ml-1">{t('password')}</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#CBD5E1] group-focus-within:text-indigo-600 transition-colors" />
                <input name="password" type="password" placeholder="••••••••" className="w-full pl-11 pr-4 py-4 bg-[#F8FAFC] border border-[#E2E8F0] focus:border-indigo-600 focus:bg-white rounded-2xl text-sm font-bold outline-none transition-all" required />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="figma-button-primary w-full py-5 text-sm font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : t('register_nursery')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
