
import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Phone,
  Calendar,
  Edit2
} from 'lucide-react';
import { cn } from './utils';
import { Modal } from './Modal';
import { useData } from './context/DataContext';

export const ChildrenList: React.FC = () => {
  const { children, addChild, updateChild, t } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [selectedChild, setSelectedChild] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [formChild, setFormChild] = useState<any>(null);

  const filteredChildren = children.filter(child => {
    const matchesSearch = `${child.firstName} ${child.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = filterGroup === 'All' || child.group === filterGroup;
    return matchesSearch && matchesGroup;
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: any = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      birthDate: formData.get('birthDate'),
      gender: formData.get('gender') === 'Male' ? 'M' : 'F',
      group: formData.get('group'),
      parentName: formData.get('parentName'),
      parentPhone: formData.get('parentPhone'),
      medicalInfo: formData.get('medicalInfo'),
      status: 'Active',
      documents: { medicalCertificate: true, vaccinationRecord: true, insurance: true }
    };

    if (isEditMode && formChild) {
      updateChild(formChild.id, data);
    } else {
      data.id = Date.now().toString();
      addChild(data);
    }
    setIsModalOpen(false);
  };

  const handleViewDetails = (child: any) => {
    setSelectedChild(child);
    setIsDetailsOpen(true);
  };

  const openAddModal = () => {
    setFormChild(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (child: any) => {
    setFormChild(child);
    setIsEditMode(true);
    setIsModalOpen(true);
    setIsDetailsOpen(false); // Close details if coming from there
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#E9EFF2] pb-10">
        <div>
          <h2 className="text-4xl font-[1000] text-[#1A1C1E] tracking-tighter leading-none mb-4">{t('children')}</h2>
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
             <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.3em]">Registry Database • 2026</p>
          </div>
        </div>
        <button 
          onClick={openAddModal}
          className="figma-button-primary flex items-center gap-3"
        >
          <Plus className="w-5 h-5" />
          <span>{t('add_child')}</span>
        </button>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={isEditMode ? t('edit_profile') : t('add_child')}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{t('first_name')}</label>
              <input name="firstName" type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ahmed" defaultValue={formChild?.firstName || ''} required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{t('last_name')}</label>
              <input name="lastName" type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Benali" defaultValue={formChild?.lastName || ''} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{t('birth_date')}</label>
              <input name="birthDate" type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" defaultValue={formChild?.birthDate || ''} required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{t('blood_type')}</label>
              <select name="bloodType" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" defaultValue={formChild?.bloodType || 'A+'}>
                <option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{t('gender')}</label>
              <select name="gender" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" defaultValue={formChild?.gender === 'M' ? 'Male' : 'Female'}>
                <option value="Male">{t('male')}</option>
                <option value="Female">{t('female')}</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{t('group')}</label>
              <select name="group" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" defaultValue={formChild?.group || 'Babies'}>
                <option value="Babies">{t('babies')}</option>
                <option value="Middles">{t('middles')}</option>
                <option value="Bigs">{t('bigs')}</option>
              </select>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl space-y-3">
            <h5 className="text-xs font-bold text-gray-500 uppercase">Parental Info</h5>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">{t('parent')}</label>
                <input name="parentName" type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Karim Benali" defaultValue={formChild?.parentName || ''} required />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">{t('parent_phone')}</label>
                <input name="parentPhone" type="tel" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0555-00-00-00" defaultValue={formChild?.parentPhone || ''} required />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{t('work_address')}</label>
              <input name="workAddress" type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Entreprise, Adresse" defaultValue={formChild?.workAddress || ''} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{t('authorized_pickups')}</label>
              <input name="pickups" type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Grand-mère, Nounou, etc." defaultValue={formChild?.pickups || ''} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{t('nationality')}</label>
              <input name="nationality" type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Algérienne" defaultValue={formChild?.nationality || 'Algérienne'} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{t('national_id')}</label>
              <input name="nationalId" type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="000111222" defaultValue={formChild?.nationalId || ''} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">{t('medical_notes')}</label>
            <textarea name="medicalInfo" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" rows={2} placeholder="Allergies ou conditions..." defaultValue={formChild?.medicalInfo || ''}></textarea>
          </div>
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-bold">{t('cancel')}</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm font-bold">
              {isEditMode ? t('save') : t('add_child')}
            </button>
          </div>
        </form>
      </Modal>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('search')}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {['All', 'Babies', 'Middles', 'Bigs'].map((group) => (
              <button
                key={group}
                onClick={() => setFilterGroup(group)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors",
                  filterGroup === group
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {t(group.toLowerCase())}
              </button>
            ))}
            <button className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-50">
                <th className="pb-4 font-semibold text-gray-600">{t('name')}</th>
                <th className="pb-4 font-semibold text-gray-600">{t('group')}</th>
                <th className="pb-4 font-semibold text-gray-600">{t('parent')}</th>
                <th className="pb-4 font-semibold text-gray-600">Documents</th>
                <th className="pb-4 font-semibold text-gray-600">{t('status')}</th>
                <th className="pb-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredChildren.map((child) => (
                <tr key={child.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="py-5">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shadow-sm border border-white/50",
                        child.gender === 'M' ? "bg-blue-50 text-blue-600" : "bg-rose-50 text-rose-600"
                      )}>
                        {child.firstName[0]}{child.lastName[0]}
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{child.firstName} {child.lastName}</p>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-widest">
                          <Calendar className="w-3 h-3" />
                          {child.birthDate}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-semibold",
                      child.group === 'Babies' ? "bg-blue-50 text-blue-700" :
                      child.group === 'Middles' ? "bg-emerald-50 text-emerald-700" :
                      "bg-amber-50 text-amber-700"
                    )}>
                      {child.group}
                    </span>
                  </td>
                  <td className="py-5">
                    <div className="text-[11px]">
                      <p className="font-black text-slate-900 uppercase tracking-tighter leading-none mb-1.5">{child.parentName}</p>
                      <div className="flex items-center gap-1.5 text-slate-400 font-bold">
                        <Phone className="w-3 h-3" />
                        {child.parentPhone}
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex gap-1.5">
                      <DocIcon active={child.documents.medicalCertificate} label="MC" />
                      <DocIcon active={child.documents.vaccinationRecord} label="VR" />
                      <DocIcon active={child.documents.insurance} label="IN" />
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {child.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => openEditModal(child)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Profile"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleViewDetails(child)}
                        className="px-3 py-1.5 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-100"
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} title={t('details')}>
        {selectedChild && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold",
                selectedChild.gender === 'M' ? "bg-blue-100 text-blue-600" : "bg-pink-100 text-pink-600"
              )}>
                {selectedChild.firstName[0]}{selectedChild.lastName[0]}
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">{selectedChild.firstName} {selectedChild.lastName}</h4>
                <p className="text-gray-500">{t(selectedChild.group.toLowerCase())} • {selectedChild.birthDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h5 className="font-bold text-gray-800 border-b pb-2">{t('parent')}</h5>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">{t('name')}</p>
                  <p className="text-sm font-semibold text-gray-900">{selectedChild.parentName}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">{t('parent_phone')}</p>
                  <p className="text-sm font-semibold text-gray-900">{selectedChild.parentPhone}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">{t('profession')}</p>
                  <p className="text-sm font-semibold text-gray-900">Education Professional</p>
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="font-bold text-gray-800 border-b pb-2">{t('medical_safety')}</h5>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">{t('allergies')}</p>
                  <p className="text-sm font-semibold text-red-600">{selectedChild.medicalInfo || 'None'}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">{t('documents')}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className={cn("px-2 py-1 rounded-md text-[10px] font-bold border", selectedChild.documents.medicalCertificate ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200")}>{t('medical_certificate')}</span>
                    <span className={cn("px-2 py-1 rounded-md text-[10px] font-bold border", selectedChild.documents.vaccinationRecord ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200")}>{t('vaccination_record')}</span>
                    <span className={cn("px-2 py-1 rounded-md text-[10px] font-bold border", selectedChild.documents.insurance ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200")}>{t('insurance')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t flex gap-3">
              <button 
                onClick={() => openEditModal(selectedChild)}
                className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                {t('edit_profile')}
              </button>
              <button onClick={() => setIsDetailsOpen(false)} className="flex-1 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">{t('cancel')}</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

const DocIcon = ({ active, label }: { active: boolean, label: string }) => (
  <div className={cn(
    "w-6 h-6 rounded flex items-center justify-center text-[8px] font-bold border",
    active ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"
  )} title={label}>
    {label}
  </div>
);
