
import React, { useState } from 'react';
import { useData } from './context/DataContext';
import { MessageCircle, X, Send, AlertCircle, Calendar } from 'lucide-react';
import { cn } from './utils';

export const SupportBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'send' | 'history'>('send');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const { user, sendSupportMessage, supportMessages, t } = useData();

  const userMessages = supportMessages.filter((m: any) => m.senderId === user.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    
    sendSupportMessage({
      senderId: user.id,
      senderName: user.name,
      subject: subject || 'Besoin d\'aide',
      message: message
    });
    
    setSubject('');
    setMessage('');
    setView('history');
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
        >
          <MessageCircle className="w-8 h-8" />
          <span className="absolute right-full mr-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
            {t('contact_support')}
          </span>
        </button>
      ) : (
        <div className="w-96 bg-white rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border border-[#E9EFF2] overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
          <div className="bg-indigo-600 p-8 flex justify-between items-center text-white">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h4 className="font-black tracking-tighter uppercase italic">Master Support</h4>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-xl transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex bg-[#F8FAFC] border-b border-[#F1F5F9]">
             <button onClick={() => setView('send')} className={cn("flex-1 py-3.5 text-[10px] font-black uppercase tracking-widest transition-all", view === 'send' ? "text-indigo-600 border-b-2 border-indigo-600 bg-white" : "text-slate-400 hover:text-slate-600")}>Envoyer</button>
             <button onClick={() => setView('history')} className={cn("flex-1 py-3.5 text-[10px] font-black uppercase tracking-widest transition-all relative", view === 'history' ? "text-indigo-600 border-b-2 border-indigo-600 bg-white" : "text-slate-400 hover:text-slate-600")}>
               Suivi
               {userMessages.some((m: any) => m.replies?.length > 0) && <span className="absolute top-3 right-10 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>}
             </button>
          </div>
          
          <div className="p-8 max-h-[32rem] overflow-y-auto no-scrollbar">
            {view === 'send' ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sujet du message</label>
                  <select 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full"
                  >
                    <option value="">Besoin d'aide</option>
                    <option value="Abonnement">Prolonger Abonnement</option>
                    <option value="Signalement">Signaler un Problème</option>
                    <option value="Validation">Preuve de Paiement</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Détails</label>
                  <textarea 
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Comment pouvons-nous vous aider ?"
                    className="w-full resize-none"
                    required
                  />
                </div>

                <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <p className="text-[10px] text-amber-700 font-bold uppercase leading-relaxed">Le Master Admin vous répondra directement sur cette interface.</p>
                </div>

                <button type="submit" className="figma-button-primary w-full py-4 uppercase text-xs tracking-widest flex items-center justify-center gap-3">
                  <Send className="w-4 h-4" /> Envoyer au Master
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                {userMessages.length === 0 ? (
                  <div className="py-20 text-center text-slate-300">
                    <p className="text-[10px] font-black uppercase tracking-widest">Aucun historique</p>
                  </div>
                ) : (
                  userMessages.map((m: any) => (
                    <div key={m.id} className="space-y-4">
                      <div className="p-4 bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{m.subject}</span>
                          <span className="text-[8px] font-bold text-slate-300">{m.date}</span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">{m.message}</p>
                      </div>
                      
                      {m.replies?.map((r: any) => (
                        <div key={r.id} className="ml-6 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl animate-in slide-in-from-right-4 duration-300">
                          <div className="flex items-center gap-2 mb-2">
                             <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center text-white text-[8px] font-black">M</div>
                             <p className="text-[10px] font-black text-indigo-600 uppercase">Master Admin</p>
                          </div>
                          <p className="text-xs text-indigo-900 font-bold leading-relaxed">{r.text}</p>
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
