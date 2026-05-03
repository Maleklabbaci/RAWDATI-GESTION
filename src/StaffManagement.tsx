
import React from 'react';
import { 
  Briefcase, 
  Mail, 
  Phone, 
  Plus, 
  Calendar,
  Edit2
} from 'lucide-react';
import { cn } from './utils';
import { Modal } from './Modal';
import { useState } from 'react';
import { useData } from './context/DataContext';

export const StaffManagement: React.FC = () => {
  const { staff, addStaff, updateStaff } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [formStaff, setFormStaff] = useState<any>(null);

  const handleViewProfile = (staff: any) => {
    setSelectedStaff(staff);
    setIsDetailsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: any = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      role: formData.get('role'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      joinDate: formData.get('joinDate'),
      status: 'Active',
      qualifications: formData.get('qualifications'),
      assignedClass: formData.get('assignedClass')
    };

    if (isEditMode && formStaff) {
      updateStaff(formStaff.id, data);
    } else {
      data.id = Date.now().toString();
      addStaff(data);
    }
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setFormStaff(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (staff: any) => {
    setFormStaff(staff);
    setIsEditMode(true);
    setIsModalOpen(true);
    setIsDetailsOpen(false);
  };

  const { t } = useData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{t('staff_management')}</h2>
          <p className="text-gray-500">Gérez votre équipe et leurs rôles respectifs.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-sm font-bold"
        >
          <Plus className="w-5 h-5" />
          <span>{t('add_employee')}</span>
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isEditMode ? "Edit Employee Profile" : "Add New Employee"}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{t('first_name')}</label>
              <input name="firstName" type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Jane" defaultValue={formStaff?.firstName || ''} required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{t('last_name')}</label>
              <input name="lastName" type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Doe" defaultValue={formStaff?.lastName || ''} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{t('role')}</label>
              <select name="role" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" defaultValue={formStaff?.role || 'Educator'}>
                <option>Director</option>
                <option>Educator</option>
                <option>Assistant</option>
                <option>Cook</option>
                <option>Cleaner</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{t('assigned_class')}</label>
              <select name="assignedClass" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" defaultValue={formStaff?.assignedClass || 'None'}>
                <option>None</option>
                <option value="Babies">{t('babies')}</option>
                <option value="Middles">{t('middles')}</option>
                <option value="Bigs">{t('bigs')}</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">{t('staff_qualifications')}</label>
            <input name="qualifications" type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Master in Early Childhood, etc." defaultValue={formStaff?.qualifications || ''} />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <input name="phone" type="tel" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0555-00-00-00" defaultValue={formStaff?.phone || ''} required />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input name="email" type="email" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="jane@creche.dz" defaultValue={formStaff?.email || ''} required />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">{t('join_date')}</label>
            <input name="joinDate" type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" defaultValue={formStaff?.joinDate || '2026-01-01'} />
          </div>
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-bold">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm font-bold">
              {isEditMode ? "Update Employee" : "Add Employee"}
            </button>
          </div>
        </form>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((person) => (
          <div key={person.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 text-xl font-bold">
                  {person.firstName[0]}{person.lastName[0]}
                </div>
                <button 
                  onClick={() => openEditModal(person)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit Employee"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900">{person.firstName} {person.lastName}</h3>
                <div className="flex items-center gap-1.5 text-blue-600 mt-1">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-sm font-medium">{person.role}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{person.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{person.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm italic">Joined {person.joinDate}</span>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <span className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                person.status === 'Active' ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
              )}>
                {person.status}
              </span>
              <button 
                onClick={() => handleViewProfile(person)}
                className="text-sm font-bold text-blue-600 hover:text-blue-800"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} title="Employee Profile">
        {selectedStaff && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                {selectedStaff.firstName[0]}{selectedStaff.lastName[0]}
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">{selectedStaff.firstName} {selectedStaff.lastName}</h4>
                <p className="text-blue-600 font-semibold">{selectedStaff.role}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-bold text-gray-800 border-b pb-2">Contact Details</h5>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase font-bold">Phone</p>
                  <p className="text-sm font-medium text-gray-900">{selectedStaff.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase font-bold">Email</p>
                  <p className="text-sm font-medium text-gray-900">{selectedStaff.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-bold text-gray-800 border-b pb-2">Employment</h5>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase font-bold">Hire Date</p>
                  <p className="text-sm font-medium text-gray-900">{selectedStaff.joinDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase font-bold">Status</p>
                  <p className="text-sm font-medium text-green-600">{selectedStaff.status}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t flex gap-3">
              <button 
                onClick={() => openEditModal(selectedStaff)}
                className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                Edit Profile
              </button>
              <button onClick={() => setIsDetailsOpen(false)} className="flex-1 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">Close</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
