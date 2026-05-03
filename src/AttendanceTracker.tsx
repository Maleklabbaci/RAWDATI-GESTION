
import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Search,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { cn } from './utils';
import { format } from 'date-fns';
import { useData } from './context/DataContext';

export const AttendanceTracker: React.FC = () => {
  const { children, updateAbsence, getAbsences, t } = useData();
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const todayStr = format(selectedDate, 'yyyy-MM-dd');
  const currentAbsentIds = getAbsences(todayStr);

  const toggleAbsence = (id: string) => {
    const newDayAbsences = currentAbsentIds.includes(id) 
      ? currentAbsentIds.filter(i => i !== id) 
      : [...currentAbsentIds, id];
    
    updateAbsence(todayStr, newDayAbsences);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{t('attendance')}</h2>
          <p className="text-gray-500">Notez les absences pour la journée sélectionnée.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
          <button 
            onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="px-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-gray-800">{format(selectedDate, 'EEE, MMM d, yyyy')}</span>
          </div>
          <button 
            onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search children..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              {children.map((child: any) => {
                const isAbsent = currentAbsentIds.includes(child.id);
                return (
                  <div key={child.id} className={cn(
                    "flex items-center justify-between p-4 rounded-xl border transition-all",
                    isAbsent ? "bg-red-50 border-red-100" : "bg-white border-gray-50 hover:border-blue-100"
                  )}>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold",
                        isAbsent ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"
                      )}>
                        {child.firstName[0]}{child.lastName[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{child.firstName} {child.lastName}</p>
                        <p className="text-xs text-gray-500">{child.group}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {isAbsent ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-red-600 uppercase tracking-wider bg-red-100 px-2 py-1 rounded-lg">Absent</span>
                          <button 
                            onClick={() => toggleAbsence(child.id)}
                            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => toggleAbsence(child.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm"
                        >
                          <XCircle className="w-4 h-4" />
                          {t('mark_absent')}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4">Résumé du jour</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-600 font-medium">{t('total_absent')}</span>
                </div>
                <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-lg">{currentAbsentIds.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-600 font-medium">{t('total_present')}</span>
                </div>
                <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">{children.length - currentAbsentIds.length}</span>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-900">{t('attendance_rate')}</span>
                <span className="text-sm font-bold text-green-600">
                  {Math.round(((children.length - currentAbsentIds.length) / children.length) * 100)}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 p-6 rounded-2xl shadow-sm text-white">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5" />
              <h3 className="font-semibold">Expected Arrival</h3>
            </div>
            <p className="text-blue-100 text-sm mb-4">Most children arrive between 08:00 and 08:45 AM.</p>
            <div className="bg-white/10 rounded-xl p-3">
              <div className="flex justify-between text-xs mb-1 font-medium">
                <span>Current Peak</span>
                <span>8:15 AM</span>
              </div>
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="w-[75%] h-full bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
