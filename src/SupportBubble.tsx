
import React, { useState } from 'react';
import { useData } from './context/DataContext';
import { MessageCircle, X, Send, AlertCircle, Calendar } from 'lucide-react';
import { cn } from './utils';

export const SupportBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const { user, sendSupportMessage, t } = useData();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    
    sendSupportMessage({
      senderId: user.id,
      senderName: user.name,
      subject: subject || 'Support Request',
      message: message
    });
    
    setSubject('');
    setMessage('');
    setIsOpen(false);
    alert('Message envoyé au support Master !');
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
        >
          <MessageCircle className="w-8 h-8" />
          <span className="absolute right-full mr-4 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {t('contact_support')}
          </span>
        </button>
      ) : (
        <div className="w-80 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-blue-600 p-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-6 h-6" />
              <h4 className="font-bold">RAWDATI MASTER</h4>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sujet</label>
              <select 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border-transparent focus:border-blue-600 rounded-xl px-3 py-2 text-sm font-bold outline-none border transition-all"
              >
                <option value="">Besoin d'aide</option>
                <option value="Abonnement">Prolonger Abonnement</option>
                <option value="Signalement">Signalement</option>
                <option value="Validation">Validation Paiement</option>
              </select>
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Message</label>
              <textarea 
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Décrivez votre besoin..."
                className="w-full bg-slate-50 dark:bg-slate-800 border-transparent focus:border-blue-600 rounded-xl px-3 py-2 text-sm font-medium outline-none border transition-all resize-none"
                required
              />
            </div>

            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl flex gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
              <p className="text-[10px] text-amber-700 dark:text-amber-500 font-bold leading-tight uppercase">Paiement Manuel: Envoyez une preuve de virement ici.</p>
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
              <Send className="w-4 h-4" /> Envoyer
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
