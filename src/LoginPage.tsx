
import React, { useState } from 'react';
import { useData } from './context/DataContext';
import { Baby, Lock, Mail, Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react';
import { cn } from './utils';

interface LoginPageProps {
  onSignUp: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSignUp }) => {
  const { login, t } = useData();
  const [email, setEmail] = useState('admin@creche.dz');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const success = await login({ email, password });
    if (!success) {
      setError(t('invalid_credentials'));
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FB] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200/30 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-cyan-100/40 rounded-full blur-[80px]"></div>
      </div>

      <div className="w-full max-w-[480px] space-y-10 animate-in fade-in zoom-in-95 duration-700">
        <div className="text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute -inset-6 bg-gradient-to-tr from-indigo-500 via-purple-400 to-cyan-300 rounded-full opacity-30 blur-[40px] animate-pulse"></div>
            <img src="https://i.ibb.co/cKc5kP5w/FAVICON.png" alt="Rawdati Logo" className="w-28 h-28 object-contain relative drop-shadow-2xl hover:scale-105 transition-transform duration-500" />
          </div>
          <h1 className="text-5xl font-[1000] text-[#1A1C1E] tracking-tighter uppercase italic leading-none">RAWDATI</h1>
          <p className="mt-4 text-[#6366F1] font-black uppercase tracking-[0.5em] text-[10px]">Cloud Management 2026</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border border-[#E9EFF2] p-10 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="p-5 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-xs font-black uppercase tracking-widest leading-relaxed">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <label className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em] ml-1">
                {t('admin_email')}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[#CBD5E1] group-focus-within:text-indigo-600 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-14 pr-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] focus:border-indigo-600 focus:bg-white focus:ring-[6px] focus:ring-indigo-600/5 rounded-2xl text-[#1A1C1E] font-bold transition-all outline-none"
                  placeholder="admin@creche.dz"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em] ml-1">
                {t('password')}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[#CBD5E1] group-focus-within:text-indigo-600 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-14 pr-14 py-4 bg-[#F8FAFC] border border-[#E2E8F0] focus:border-indigo-600 focus:bg-white focus:ring-[6px] focus:ring-indigo-600/5 rounded-2xl text-[#1A1C1E] font-bold transition-all outline-none"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center text-[#94A3B8] hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded-lg border-[#E2E8F0] text-indigo-600 focus:ring-indigo-600/20 transition-all" defaultChecked />
                <span className="text-xs font-bold text-[#64748B] group-hover:text-[#1A1C1E] transition-colors">{t('remember_me')}</span>
              </label>
              <a href="#" className="text-xs font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-widest">{t('forgot_password')}</a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white py-5 px-8 rounded-2xl font-[1000] text-sm uppercase tracking-[0.2em] shadow-2xl shadow-indigo-600/30 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                t('sign_in')
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
             <p className="text-xs font-bold text-[#94A3B8]">{t('no_account')} <button onClick={onSignUp} className="text-indigo-600 font-black hover:underline">{t('sign_up')}</button></p>
          </div>
          

        </div>

        <p className="text-center text-[#CBD5E1] text-[10px] font-black uppercase tracking-[0.4em]">
          RAWDATI Master System &copy; 2026
        </p>
      </div>
    </div>
  );
};
