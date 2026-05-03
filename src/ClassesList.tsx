
import React from 'react';
import { Users, Plus, Edit2, Trash2, UserPlus, AlertTriangle } from 'lucide-react';
import { cn } from './utils';
import { useState } from 'react';
import { Modal } from './Modal';
import { useData } from './context/DataContext';

export const ClassesList: React.FC = () => {
  const { classes: classesList, addClass, updateClass, deleteClass, children: allChildren } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formClass, setFormClass] = useState<any>(null);

  const handleViewDetails = (cls: any) => {
    setSelectedClass(cls);
    setIsDetailsOpen(true);
  };

  const handleAssignChild = (cls: any) => {
    setSelectedClass(cls);
    setIsAssignModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: any = {
      name: formData.get('name'),
      teacher: formData.get('teacher'),
      capacity: Number(formData.get('capacity')),
      ageRange: formData.get('ageRange'),
    };

    if (isEditMode && formClass) {
      updateClass(formClass.id, data);
    } else {
      addClass(data);
    }
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setFormClass(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (cls: any) => {
    setFormClass(cls);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const openDeleteModal = (cls: any) => {
    setSelectedClass(cls);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteClass(selectedClass.id);
    setIsDeleteModalOpen(false);
  };

  const { t } = useData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{t('class_management')}</h2>
          <p className="text-gray-500">Gérez les groupes, les enseignants et les capacités.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-sm font-bold"
        >
          <Plus className="w-5 h-5" />
          <span>{t('new_class')}</span>
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isEditMode ? t('edit_class') : t('new_class')}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">{t('name')}</label>
            <input name="name" type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Toddlers (Les Petits)" defaultValue={formClass?.name || ''} required />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">{t('lead_teacher')}</label>
            <input name="teacher" type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Teacher Name" defaultValue={formClass?.teacher || ''} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{t('capacity')}</label>
              <input name="capacity" type="number" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="12" defaultValue={formClass?.capacity || ''} required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{t('age_range')}</label>
              <input name="ageRange" type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="2-3 years" defaultValue={formClass?.ageRange || ''} />
            </div>
          </div>
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-bold">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm font-bold">
              {isEditMode ? "Update Class" : "Create Class"}
            </button>
          </div>
        </form>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classesList.map((cls) => (
          <div key={cls.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className={cn("h-2", cls.color)}></div>
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <Users className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => openEditModal(cls)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => openDeleteModal(cls)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-1">{cls.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{t('lead_teacher')}: <span className="text-gray-900 font-medium">{cls.teacher}</span></p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-500">{t('occupancy')}</span>
                  <span className="text-gray-900">{cls.count} / {cls.capacity} {t('children').toLowerCase()}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full transition-all", cls.color)} 
                    style={{ width: `${(cls.count / cls.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-2">
              <button 
                onClick={() => handleAssignChild(cls)}
                className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 py-2 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors shadow-sm"
              >
                <UserPlus className="w-4 h-4" />
                {t('assigned')}
              </button>
              <button 
                onClick={() => handleViewDetails(cls)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors shadow-sm"
              >
                {t('details')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Class Details Modal */}
      <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} title="Class Details">
        {selectedClass && (
          <div className="space-y-6">
            <div className={cn("p-4 rounded-2xl text-white", selectedClass.color)}>
              <h4 className="text-xl font-bold">{selectedClass.name}</h4>
              <p className="opacity-90">Teacher: {selectedClass.teacher}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 font-bold uppercase">Children</p>
                <p className="text-xl font-bold text-gray-900">{selectedClass.count}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 font-bold uppercase">Capacity</p>
                <p className="text-xl font-bold text-gray-900">{selectedClass.capacity}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="font-bold text-gray-800 border-b pb-2">Student List</h5>
              <div className="space-y-2">
                {allChildren.filter((c: any) => c.group === selectedClass.name.split(' ')[0]).map((child: any) => (
                  <div key={child.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">{child.firstName} {child.lastName}</span>
                    <span className="text-xs text-gray-400">{child.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setIsDetailsOpen(false)} className="w-full py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm">
              Close
            </button>
          </div>
        )}
      </Modal>

      {/* Assign Child Modal */}
      <Modal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} title={`Assign to ${selectedClass?.name || 'Class'}`}>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsAssignModalOpen(false); }}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Select Student</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
              {allChildren.map((c: any) => <option key={c.id}>{c.firstName} {c.lastName}</option>)}
            </select>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-xs text-blue-600 font-medium">The student will be automatically assigned to the {selectedClass?.name} group.</p>
          </div>
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsAssignModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-bold">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm font-bold">Confirm Assignment</button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Deletion">
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-red-50 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Are you sure?</p>
              <p className="text-sm text-gray-500">You are about to delete <span className="font-bold text-red-600">{selectedClass?.name}</span>.</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 px-2">
            This action cannot be undone. All associated data for this class will be permanently removed from the system.
          </p>

          <div className="flex gap-3">
            <button 
              onClick={() => setIsDeleteModalOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-bold"
            >
              Cancel
            </button>
            <button 
              onClick={handleDeleteConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors shadow-sm font-bold"
            >
              Delete Class
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
