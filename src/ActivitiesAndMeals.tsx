
import React, { useState } from 'react';
import { 
  Utensils, 
  Palette, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Coffee,
  Apple,
  Plus,
  Edit2
} from 'lucide-react';
import { cn } from './utils';
import { Modal } from './Modal';
import { useData } from './context/DataContext';

export const ActivitiesAndMeals: React.FC = () => {
  const [activeView, setActiveView] = useState<'activities' | 'meals'>('activities');
  const { activities, meals, addActivity, updateMeal, addMeal, t } = useData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{t('activities')}</h2>
          <p className="text-gray-500">Organisez le programme hebdomadaire.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveView('activities')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
              activeView === 'activities' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <Palette className="w-4 h-4" />
            {t('activities')}
          </button>
          <button
            onClick={() => setActiveView('meals')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
              activeView === 'meals' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <Utensils className="w-4 h-4" />
            {t('meal_plan')}
          </button>
        </div>
      </div>

      {activeView === 'activities' ? <ActivitiesView activities={activities} addActivity={addActivity} t={t} /> : <MealsView meals={meals} updateMeal={updateMeal} addMeal={addMeal} t={t} />}
    </div>
  );
};

const ActivitiesView = ({ activities, addActivity, t }: any) => {
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addActivity({
      id: Date.now().toString(),
      name: formData.get('name') as string,
      group: formData.get('group') as any,
      day: formData.get('day') as string,
      startTime: formData.get('startTime') as string,
      endTime: formData.get('endTime') as string,
    });
    setIsActivityModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-bold text-gray-800">{t('weekly_schedule')}</h3>
          <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <button className="p-1.5 hover:bg-gray-50 border-r border-gray-200"><ChevronLeft className="w-4 h-4 text-gray-600" /></button>
            <span className="px-3 text-sm font-medium text-gray-700">May 17 - May 23, 2026</span>
            <button className="p-1.5 hover:bg-gray-50 border-l border-gray-200"><ChevronRight className="w-4 h-4 text-gray-600" /></button>
          </div>
        </div>
        <button 
          onClick={() => setIsActivityModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-sm text-sm font-bold"
        >
          <Plus className="w-4 h-4" />
          {t('add_activity')}
        </button>
      </div>

      <Modal isOpen={isActivityModalOpen} onClose={() => setIsActivityModalOpen(false)} title="New Activity">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Activity Name</label>
            <input name="name" type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Painting, Singing, etc." required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Group</label>
              <select name="group" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Babies</option>
                <option>Middles</option>
                <option>Bigs</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Day</label>
              <select name="day" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Sunday</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Start Time</label>
              <input name="startTime" type="time" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">End Time</label>
              <input name="endTime" type="time" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>
          </div>
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsActivityModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm font-bold">Save Activity</button>
          </div>
        </form>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {['Babies', 'Middles', 'Bigs'].map((group) => (
          <div key={group} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className={cn(
              "p-4 text-center font-bold text-sm uppercase tracking-wider",
              group === 'Babies' ? "bg-blue-600 text-white" :
              group === 'Middles' ? "bg-emerald-600 text-white" :
              "bg-amber-600 text-white"
            )}>
              {group}
            </div>
            <div className="p-4 space-y-4">
              {activities.filter((a: any) => a.group === group).map((activity: any) => (
                <div key={activity.id} className="flex gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="w-12 h-12 rounded-lg bg-white border border-gray-100 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{activity.day.slice(0, 3)}</span>
                    <Clock className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{activity.name}</p>
                    <p className="text-xs text-gray-500">{activity.startTime} - {activity.endTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MealsView = ({ meals, updateMeal, addMeal, t }: any) => {
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<any>(null);

  const handleEdit = (meal: any) => {
    setEditingMeal(meal);
    setIsMealModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: any = {
      breakfast: formData.get('breakfast') as string,
      lunch: formData.get('lunch') as string,
      snack: formData.get('snack') as string,
      day: formData.get('day') as string || editingMeal?.day
    };

    if (editingMeal) {
      updateMeal(editingMeal.id, data);
    } else {
      addMeal(data);
    }
    setIsMealModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <h3 className="text-lg font-bold text-gray-800">Weekly Menu (2026)</h3>
        <button 
          onClick={() => { setEditingMeal(null); setIsMealModalOpen(true); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-sm text-sm font-bold"
        >
          <Plus className="w-4 h-4" />
          Add Meal Plan
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm font-semibold">
                <th className="p-4 border-b border-gray-100">{t('day')}</th>
                <th className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-amber-500" />
                    {t('breakfast')}
                  </div>
                </th>
                <th className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-blue-500" />
                    {t('lunch')}
                  </div>
                </th>
                <th className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Apple className="w-4 h-4 text-green-500" />
                    {t('snack')}
                  </div>
                </th>
                <th className="p-4 border-b border-gray-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {meals.map((meal: any) => (
                <tr key={meal.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="p-4 font-bold text-gray-900">{t(meal.day.toLowerCase())}</td>
                  <td className="p-4 text-sm text-gray-600">{meal.breakfast}</td>
                  <td className="p-4 text-sm text-gray-600 font-medium">{meal.lunch}</td>
                  <td className="p-4 text-sm text-gray-600">{meal.snack}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleEdit(meal)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isMealModalOpen} onClose={() => setIsMealModalOpen(false)} title={editingMeal ? `${t('edit_menu')}: ${t(editingMeal.day.toLowerCase())}` : t('add_meal')}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!editingMeal && (
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{t('day')}</label>
              <select name="day" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="Sunday">{t('sunday')}</option>
                <option value="Monday">{t('monday')}</option>
                <option value="Tuesday">{t('tuesday')}</option>
                <option value="Wednesday">{t('wednesday')}</option>
                <option value="Thursday">{t('thursday')}</option>
                <option value="Friday">{t('friday')}</option>
                <option value="Saturday">{t('saturday')}</option>
              </select>
            </div>
          )}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">{t('breakfast')}</label>
            <input 
              name="breakfast"
              type="text" 
              defaultValue={editingMeal?.breakfast}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              required 
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">{t('lunch')}</label>
            <input 
              name="lunch"
              type="text" 
              defaultValue={editingMeal?.lunch}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              required 
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">{t('snack')}</label>
            <input 
              name="snack"
              type="text" 
              defaultValue={editingMeal?.snack}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              required 
            />
          </div>
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsMealModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-bold">{t('cancel')}</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm font-bold">
              {editingMeal ? t('update_menu') : t('add_meal')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
