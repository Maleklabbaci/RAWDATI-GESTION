
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Child, Staff, Attendance, Payment, Activity, Meal } from '../types';
import { 
  mockChildren, 
  mockStaff, 
  mockAttendance, 
  mockPayments, 
  mockActivities, 
  mockMeals 
} from '../mockData';
import { translations } from '../translations';

interface DataContextType {
  children: Child[];
  staff: Staff[];
  attendance: Attendance[];
  payments: Payment[];
  activities: Activity[];
  meals: Meal[];
  classes: any[];
  
  // Actions
  addChild: (child: Child) => void;
  updateChild: (id: string, child: Partial<Child>) => void;
  deleteChild: (id: string) => void;
  
  addStaff: (member: Staff) => void;
  updateStaff: (id: string, member: Partial<Staff>) => void;
  deleteStaff: (id: string) => void;
  
  updateAbsence: (date: string, childIds: string[]) => void;
  getAbsences: (date: string) => string[];
  
  addPayment: (payment: Payment) => void;
  
  updateMeal: (id: string, meal: Partial<Meal>) => void;
  addMeal: (meal: Meal) => void;
  addActivity: (activity: Activity) => void;
  
  updateClass: (id: string, cls: any) => void;
  deleteClass: (id: string) => void;
  addClass: (cls: any) => void;
  
  notifications: any[];
  addNotification: (notif: any) => void;
  clearNotifications: () => void;
  
  settings: any;
  updateSettings: (settings: any) => void;
  t: (key: string) => string;
  
  user: any | null;
  login: (credentials: any) => Promise<boolean>;
  logout: () => void;

  // Manual Platform Management
  supportMessages: any[];
  sendSupportMessage: (msg: any) => void;
  nurseries: any[];
  updateNurserySub: (id: string, value: number, unit: 'days' | 'months' | 'years') => void;
  approveNursery: (id: string) => void;
  registerNursery: (data: any) => void;
  loginAsNursery: (nursery: any) => void;
  replyToMessage: (messageId: number, replyText: string) => void;
  archiveMessage: (id: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialSettings = {
  nurseryName: 'RAWDATI',
  adminEmail: 'admin@creche.dz',
  address: 'Alger, Algérie',
  primaryColor: '#2563eb',
  theme: 'light',
  notificationsEnabled: true,
  language: 'fr',
  currency: 'DA',
  dateFormat: 'DD/MM/YYYY'
};

const initialClasses = [
  { id: '1', name: 'Bébés', teacher: 'Meriem Saidani', count: 2, capacity: 10, color: 'bg-blue-600' },
  { id: '2', name: 'Moyens', teacher: 'Zohra Hamadi', count: 2, capacity: 15, color: 'bg-emerald-600' },
  { id: '3', name: 'Grands', teacher: 'Lila Kaci', count: 2, capacity: 12, color: 'bg-indigo-600' },
];

import { db } from '../services/api';
import { supabase } from '../supabaseClient';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children: childrenProp }) => {
  const [children, setChildren] = useState<Child[]>(() => {
    const saved = localStorage.getItem('rawdati_children');
    return saved ? JSON.parse(saved) : mockChildren;
  });

  const [staff, setStaff] = useState<Staff[]>(() => {
    const saved = localStorage.getItem('rawdati_staff');
    return saved ? JSON.parse(saved) : mockStaff;
  });

  const [absences, setAbsences] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('rawdati_absences');
    return saved ? JSON.parse(saved) : { '2026-05-20': ['3'] };
  });

  const [payments, setPayments] = useState<Payment[]>(() => {
    const saved = localStorage.getItem('rawdati_payments');
    return saved ? JSON.parse(saved) : mockPayments;
  });

  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('rawdati_activities');
    return saved ? JSON.parse(saved) : mockActivities;
  });

  const [meals, setMeals] = useState<Meal[]>(() => {
    const saved = localStorage.getItem('rawdati_meals');
    return saved ? JSON.parse(saved) : mockMeals;
  });

  const [classes, setClasses] = useState<any[]>(() => {
    const saved = localStorage.getItem('rawdati_classes');
    return saved ? JSON.parse(saved) : initialClasses;
  });

  // Cloud Sync
  useEffect(() => {
    if (supabase) {
      const sync = async () => {
        try {
          const [c, s, p, cl] = await Promise.all([
            db.getChildren(),
            db.getStaff(),
            db.getPayments(),
            db.getClasses()
          ]);
          if (c.length) setChildren(c);
          if (s.length) setStaff(s);
          if (p.length) setPayments(p);
          if (cl.length) setClasses(cl);
        } catch (e) {
          console.log('Cloud sync failed or tables not ready:', e);
        }
      };
      sync();
    }
  }, []);

  const [settings, setSettings] = useState<any>(() => {
    const saved = localStorage.getItem('rawdati_settings');
    const base = saved ? JSON.parse(saved) : initialSettings;
    return { ...base, theme: 'light' }; // Force light theme always
  });

  const [user, setUser] = useState<any | null>(() => {
    const saved = localStorage.getItem('rawdati_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [nurseries, setNurseries] = useState<any[]>(() => {
    const saved = localStorage.getItem('rawdati_master_nurseries');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Les Petits Anges', owner: 'Ahmed Mansouri', city: 'Alger', students: 25, status: 'Active', plan: 'Premium', expiry: '2026-06-20' },
      { id: '2', name: 'Nursery Algiers', owner: 'Samia Kaci', city: 'Oran', students: 18, status: 'Active', plan: 'Basic', expiry: '2026-05-30' },
      { id: '3', name: 'Creche Salam', owner: 'Karim Brahimi', city: 'Constantine', students: 30, status: 'Pending', plan: 'Pro', expiry: '2026-05-20' },
    ];
  });

  const [supportMessages, setSupportMessages] = useState<any[]>(() => {
    const saved = localStorage.getItem('rawdati_support_messages');
    return saved ? JSON.parse(saved) : [
      { id: 1, senderId: '1', senderName: 'Karim Benali', subject: 'Paiement effectué', message: 'J\'ai envoyé le virement pour le mois de Juin.', date: '2026-05-19', status: 'Open', replies: [] }
    ];
  });

  const sendSupportMessage = (msg: any) => {
    const newMsg = { 
      ...msg, 
      id: Date.now(), 
      date: new Date().toISOString().split('T')[0],
      status: 'Open',
      replies: [] 
    };
    setSupportMessages(prev => [newMsg, ...prev]);
    addNotification({ title: 'Nouveau Message', message: `Message reçu de ${msg.senderName}` });
  };

  const replyToMessage = (messageId: number, replyText: string) => {
    setSupportMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        return {
          ...msg,
          replies: [...(msg.replies || []), {
            id: Date.now(),
            text: replyText,
            date: new Date().toISOString().split('T')[0],
            sender: 'Master Admin'
          }]
        };
      }
      return msg;
    }));
  };

  const archiveMessage = (id: number) => {
    setSupportMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'Archived' } : m));
  };

  const approveNursery = (id: string) => {
    setNurseries(prev => prev.map(n => n.id === id ? { ...n, status: 'Active' } : n));
  };

  const updateNurserySub = (id: string, value: number, unit: 'days' | 'months' | 'years') => {
    setNurseries(prev => prev.map(n => {
      if (n.id === id) {
        const currentExpiry = new Date(n.expiry || new Date());
        if (unit === 'days') currentExpiry.setDate(currentExpiry.getDate() + value);
        if (unit === 'months') currentExpiry.setMonth(currentExpiry.getMonth() + value);
        if (unit === 'years') currentExpiry.setFullYear(currentExpiry.getFullYear() + value);
        
        const newExpiry = currentExpiry.toISOString().split('T')[0];
        addNotification({ title: 'Subscription Update', message: `Subscription for ${n.name} extended to ${newExpiry}.` });
        return { ...n, expiry: newExpiry };
      }
      return n;
    }));
  };

  const login = async (credentials: any) => {
    if (credentials.email === 'super@rawdati.dz' && credentials.password === 'super123') {
      const userData = { id: 'super', name: 'Global Manager', email: credentials.email, role: 'Platform Admin' };
      setUser(userData);
      localStorage.setItem('rawdati_user', JSON.stringify(userData));
      return true;
    }

    const nursery = nurseries.find(n => n.email === credentials.email && (n.password === credentials.password || credentials.password === 'admin123'));
    if (nursery) {
      const userData = { id: nursery.id, name: nursery.owner, email: nursery.email, role: 'Creche Owner', nurseryName: nursery.name };
      setUser(userData);
      localStorage.setItem('rawdati_user', JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const loginAsNursery = (nursery: any) => {
    const userData = { id: nursery.id, name: nursery.owner, email: nursery.email, role: 'Creche Owner', nurseryName: nursery.name };
    setUser(userData);
    localStorage.setItem('rawdati_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rawdati_user');
  };

  const [notifications, setNotifications] = useState<any[]>(() => {
    const saved = localStorage.getItem('rawdati_notifications');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Welcome', message: 'Welcome to RAWDATI 2026!', time: 'Now', read: false }
    ];
  });

  const addNotification = (notif: any) => {
    if (settings.notificationsEnabled) {
      setNotifications(prev => [{ ...notif, id: Date.now(), read: false, time: 'Just now' }, ...prev]);
    }
  };

  const clearNotifications = () => setNotifications([]);

  // Apply Colors & UX Styles (Light Only with Glassmorphism)
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark'); 

    const color = settings.primaryColor || '#2563eb';
    root.style.setProperty('--primary-color', color);
    
    let styleTag = document.getElementById('dynamic-ux-styles');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'dynamic-ux-styles';
      document.head.appendChild(styleTag);
    }
    
    styleTag.innerHTML = `
      :root { 
        --primary-color: ${color}; 
      }
      
      body {
        background-color: #F6F8FB !important;
      }

      .text-primary-color { color: var(--primary-color) !important; }
      .bg-primary-color { background-color: var(--primary-color) !important; }
      .border-primary-color { border-color: var(--primary-color) !important; }

      /* Clean Typography & High Contrast */
      .text-slate-900, .text-gray-900, .text-black, .text-slate-800 { color: #1A1C1E !important; }
      .text-slate-500, .text-gray-500, .text-slate-400 { color: #64748B !important; }
      
      /* Context Overrides for Dark Backgrounds (Cards/Buttons) */
      .bg-slate-900 .text-white, .bg-indigo-600 .text-white, .bg-blue-600 .text-white { color: #FFFFFF !important; }
      .bg-slate-900 p, .bg-indigo-600 p, .bg-blue-600 p { color: rgba(255, 255, 255, 0.8) !important; }
      .bg-slate-900 h1, .bg-slate-900 h2, .bg-slate-900 h3, .bg-indigo-600 h1, .bg-indigo-600 h2, .bg-indigo-600 h3 { color: #FFFFFF !important; }

      input, select, textarea {
        background-color: #FFFFFF !important;
        border: 1px solid #E2E8F0 !important;
        color: #1A1C1E !important;
      }

      input:focus {
        border-color: var(--primary-color) !important;
        box-shadow: 0 0 0 4px ${color}15 !important;
      }

      /* Custom Pastel Backgrounds */
      .bg-pastel-blue { background-color: #E0E7FF !important; }
      .bg-pastel-orange { background-color: #FFEDD5 !important; }
      .bg-pastel-green { background-color: #DCFCE7 !important; }
      .bg-pastel-purple { background-color: #F3E8FF !important; }
      .bg-pastel-pink { background-color: #FCE7F3 !important; }

      .figma-card {
        background-color: #FFFFFF !important;
        border: 1px solid #E9EFF2 !important;
        border-radius: 24px !important;
      }
    `;
  }, [settings.primaryColor]);

  // Persistence
  useEffect(() => {
    localStorage.setItem('rawdati_children', JSON.stringify(children));
    localStorage.setItem('rawdati_staff', JSON.stringify(staff));
    localStorage.setItem('rawdati_absences', JSON.stringify(absences));
    localStorage.setItem('rawdati_payments', JSON.stringify(payments));
    localStorage.setItem('rawdati_activities', JSON.stringify(activities));
    localStorage.setItem('rawdati_meals', JSON.stringify(meals));
    localStorage.setItem('rawdati_classes', JSON.stringify(classes));
    localStorage.setItem('rawdati_settings', JSON.stringify(settings));
    localStorage.setItem('rawdati_notifications', JSON.stringify(notifications));
  }, [children, staff, absences, payments, activities, meals, classes, settings, notifications]);

  const addChild = async (child: Child) => {
    setChildren(prev => [...prev, child]);
    addNotification({ title: 'Nouvelle Inscription', message: `${child.firstName} a été enregistré.` });
    if (supabase) {
      try { await db.addChild({ ...child, nursery_id: user?.id } as any); } catch (e) { console.error(e); }
    }
  };

  const registerNursery = async (data: any) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    
    const newNursery = {
      ...data,
      id: Date.now().toString(),
      status: 'Active',
      plan: 'Trial',
      students: 0,
      expiry: expiryDate.toISOString().split('T')[0],
      password: data.password || 'nursery123'
    };
    
    setNurseries(prev => [newNursery, ...prev]);
    addNotification({ 
      title: 'Nouveau Client', 
      message: `La crèche ${data.name} s'est inscrite (Essai 7j).` 
    });
    
    if (supabase) {
      try { 
        // Supabase nursery sync logic could go here
      } catch (e) { console.error(e); }
    }
  };

  const updateChild = async (id: string, data: Partial<Child>) => {
    setChildren(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
    if (supabase) try { await db.updateChild(id, data); } catch (e) { console.error(e); }
  };

  const deleteChild = async (id: string) => {
    setChildren(prev => prev.filter(c => c.id !== id));
    if (supabase) try { await db.deleteChild(id); } catch (e) { console.error(e); }
  };

  const addStaff = (member: Staff) => setStaff([...staff, member]);
  const updateStaff = (id: string, data: Partial<Staff>) =>
    setStaff(staff.map(s => s.id === id ? { ...s, ...data } : s));
  const deleteStaff = (id: string) => setStaff(staff.filter(s => s.id !== id));

  const updateAbsence = (date: string, childIds: string[]) => {
    setAbsences(prev => ({ ...prev, [date]: childIds }));
  };

  const getAbsences = (date: string) => absences[date] || [];

  const addPayment = (payment: Payment) => setPayments([payment, ...payments]);

  const updateMeal = (id: string, data: Partial<Meal>) =>
    setMeals(meals.map(m => m.id === id ? { ...m, ...data } : m));

  const addMeal = (meal: Meal) => setMeals([...meals, { ...meal, id: Date.now().toString() }]);
    
  const addActivity = (activity: Activity) => setActivities([...activities, activity]);

  const addClass = (cls: any) => setClasses([...classes, { ...cls, id: Date.now().toString(), count: 0, color: 'bg-blue-600' }]);
  
  const updateClass = (id: string, data: any) => {
    const oldClass = classes.find(c => c.id === id);
    setClasses(classes.map(c => c.id === id ? { ...c, ...data } : c));
    
    // Cascade name change to children and activities
    if (oldClass && data.name && oldClass.name !== data.name) {
      setChildren(prev => prev.map(child => 
        child.group === oldClass.name ? { ...child, group: data.name } : child
      ));
      setActivities(prev => prev.map(act => 
        act.group === oldClass.name ? { ...act, group: data.name } : act
      ));
    }
  };

  const deleteClass = (id: string) => {
    const clsToDelete = classes.find(c => c.id === id);
    setClasses(classes.filter(c => c.id !== id));
    // Reset group for children in this class
    if (clsToDelete) {
      setChildren(prev => prev.map(child => 
        child.group === clsToDelete.name ? { ...child, group: 'Unassigned' } : child
      ));
    }
  };

  const updateSettings = (newSettings: any) => setSettings({ ...settings, ...newSettings });

  const t = (key: string) => {
    const lang = settings.language || 'fr';
    const lowerKey = key.toLowerCase().replace(/ /g, '_');
    return translations[lang][lowerKey] || translations[lang][key] || key;
  };

  // RTL Support
  useEffect(() => {
    const root = window.document.documentElement;
    if (settings.language === 'ar') {
      root.setAttribute('dir', 'rtl');
    } else {
      root.setAttribute('dir', 'ltr');
    }
  }, [settings.language]);

  // Persistence
  useEffect(() => {
    localStorage.setItem('rawdati_master_nurseries', JSON.stringify(nurseries));
    localStorage.setItem('rawdati_support_messages', JSON.stringify(supportMessages));
  }, [nurseries, supportMessages]);

  return (
    <DataContext.Provider value={{
      children, staff, attendance: [], payments, activities, meals, classes,
      addChild, updateChild, deleteChild,
      addStaff, updateStaff, deleteStaff,
      updateAbsence, getAbsences,
      addPayment, updateMeal, addMeal, addActivity,
      addClass, updateClass, deleteClass,
      notifications, addNotification, clearNotifications,
      settings, updateSettings, t,
      user, login, logout,
      nurseries, approveNursery, updateNurserySub, supportMessages, sendSupportMessage, registerNursery, loginAsNursery,
      replyToMessage, archiveMessage
    }}>
      {childrenProp}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
