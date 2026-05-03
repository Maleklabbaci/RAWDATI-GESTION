
import React, { useState } from 'react';
import { 
  Palette, 
  Globe, 
  Bell, 
  Shield, 
  User, 
  Database,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { cn } from './utils';
import { useData } from './context/DataContext';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, t } = useData();
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('profile');

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    
    const formData = new FormData(e.currentTarget);
    const newSettings: any = {};
    formData.forEach((value, key) => {
      newSettings[key] = value;
    });

    setTimeout(() => {
      updateSettings(newSettings);
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {showSuccess && (
        <div className="fixed top-20 right-8 z-[100] bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-bold">Settings saved successfully!</span>
        </div>
      )}
      <header>
        <h2 className="text-2xl font-bold text-gray-800">{t('settings')}</h2>
        <p className="text-gray-500">Customize the platform and manage preferences.</p>
      </header>
      <form onSubmit={handleSave} className="space-y-6">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-2">
          <SettingsNav icon={User} label={t('profile_settings')} active={activeSubTab === 'profile'} onClick={() => setActiveSubTab('profile')} />
          <SettingsNav icon={Palette} label={t('appearance')} active={activeSubTab === 'appearance'} onClick={() => setActiveSubTab('appearance')} />
          <SettingsNav icon={Bell} label={t('notifications')} active={activeSubTab === 'notifications'} onClick={() => setActiveSubTab('notifications')} />
          <SettingsNav icon={Globe} label={t('language')} active={activeSubTab === 'language'} onClick={() => setActiveSubTab('language')} />
          <SettingsNav icon={Shield} label={t('security')} active={activeSubTab === 'security'} onClick={() => setActiveSubTab('security')} />
          <SettingsNav icon={Database} label={t('data_backup')} active={activeSubTab === 'data'} onClick={() => setActiveSubTab('data')} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          {activeSubTab === 'profile' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">{t('profile_settings')}</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">{t('nursery_name')}</label>
                    <input name="nurseryName" type="text" defaultValue={settings.nurseryName} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">{t('admin_email')}</label>
                    <input name="adminEmail" type="email" defaultValue={settings.adminEmail} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">{t('address')}</label>
                  <textarea name="address" rows={2} defaultValue={settings.address} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'appearance' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">{t('appearance')}</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg border border-gray-200 overflow-hidden">
                      <input 
                        type="color" 
                        name="primaryColor" 
                        defaultValue={settings.primaryColor} 
                        className="w-[150%] h-[150%] -ml-[25%] -mt-[25%] cursor-pointer"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{t('primary_color')}</p>
                      <p className="text-xs text-gray-500">Choisissez votre couleur de marque</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Palette className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{t('theme_mode')}</p>
                      <p className="text-xs text-gray-500">Basculer entre clair et sombre</p>
                    </div>
                  </div>
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    <label className={cn(
                      "px-4 py-1.5 text-xs font-bold rounded cursor-pointer transition-all",
                      settings.theme === 'light' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
                    )}>
                      <input type="radio" name="theme" value="light" className="hidden" defaultChecked={settings.theme === 'light'} onClick={() => updateSettings({theme: 'light'})} />
                      {t('light')}
                    </label>
                    <label className={cn(
                      "px-4 py-1.5 text-xs font-bold rounded cursor-pointer transition-all",
                      settings.theme === 'dark' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
                    )}>
                      <input type="radio" name="theme" value="dark" className="hidden" defaultChecked={settings.theme === 'dark'} onClick={() => updateSettings({theme: 'dark'})} />
                      {t('dark')}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'notifications' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">{t('notifications')}</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50/30">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg", settings.notificationsEnabled ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600")}>
                      <Bell className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{t('global_notif')}</p>
                      <p className="text-xs text-gray-500">Recevoir des alertes de paiement et d'activités</p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => updateSettings({ notificationsEnabled: !settings.notificationsEnabled })}
                    className={cn(
                      "w-12 h-6 rounded-full transition-all relative",
                      settings.notificationsEnabled ? "bg-green-500" : "bg-gray-300"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                      settings.notificationsEnabled ? "right-1" : "left-1"
                    )} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'language' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">{t('language')} & Region</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">{t('language')}</label>
                  <select name="language" defaultValue={settings.language} onChange={(e) => updateSettings({ language: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="fr">Français (Algérie)</option>
                    <option value="ar">العربية (Algeria)</option>
                    <option value="en">English (UK)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">{t('currency')}</label>
                    <select name="currency" defaultValue={settings.currency} onChange={(e) => updateSettings({ currency: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                      <option value="DZD">Algerian Dinar (DA)</option>
                      <option value="EUR">Euro (€)</option>
                      <option value="USD">Dollar ($)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Date Format</label>
                    <select name="dateFormat" defaultValue={settings.dateFormat} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                  <div className="flex gap-3">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-bold text-blue-900">{t('regional_sync')}</p>
                      <p className="text-xs text-blue-700">Changer la région mettra à jour tous les résumés financiers et les affichages de date sur la plateforme.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button type="button" className="px-6 py-2 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-colors">Discard Changes</button>
            <button 
              type="submit" 
              disabled={isSaving}
              className={cn(
                "px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2",
                isSaving && "opacity-70 cursor-not-allowed"
              )}
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
              {isSaving ? 'Saving...' : t('save')}
            </button>
          </div>
        </div>
      </div>
      </form>
    </div>
  );
};

const SettingsNav = ({ icon: Icon, label, active = false, onClick }: any) => (
  <button 
    type="button"
    onClick={onClick}
    className={cn(
      "w-full flex items-center justify-between p-4 rounded-xl transition-all",
      active ? "bg-blue-50 text-blue-600 border border-blue-100 shadow-sm" : "text-gray-600 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-sm"
    )}
  >
    <div className="flex items-center gap-3 font-bold text-sm">
      <Icon className="w-5 h-5" />
      {label}
    </div>
    <ChevronRight className={cn("w-4 h-4", active ? "text-blue-600" : "text-gray-400")} />
  </button>
);
