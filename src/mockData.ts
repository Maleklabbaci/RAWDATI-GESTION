
import { Child, Staff, Attendance, Payment, Activity, Meal } from './types';

export const mockChildren: Child[] = [
  { id: '1', firstName: 'Mehdi', lastName: 'Ziane', birthDate: '2023-08-12', gender: 'M', group: 'Bébés', parentName: 'Sofiane Ziane', parentPhone: '0550-12-34-56', medicalInfo: 'Asthme léger', documents: { medicalCertificate: true, vaccinationRecord: true, insurance: true }, status: 'Active' },
  { id: '2', firstName: 'Ines', lastName: 'Hadjadj', birthDate: '2022-11-05', gender: 'F', group: 'Moyens', parentName: 'Amel Hadjadj', parentPhone: '0661-98-76-54', documents: { medicalCertificate: true, vaccinationRecord: true, insurance: true }, status: 'Active' },
  { id: '3', firstName: 'Yanis', lastName: 'Belkacem', birthDate: '2021-02-28', gender: 'M', group: 'Grands', parentName: 'Omar Belkacem', parentPhone: '0770-45-67-89', documents: { medicalCertificate: true, vaccinationRecord: true, insurance: true }, status: 'Active' },
  { id: '4', firstName: 'Lina', lastName: 'Amrani', birthDate: '2023-12-15', gender: 'F', group: 'Bébés', parentName: 'Fouad Amrani', parentPhone: '0555-22-33-44', medicalInfo: 'Allergie Fraise', documents: { medicalCertificate: true, vaccinationRecord: true, insurance: false }, status: 'Active' },
  { id: '5', firstName: 'Amine', lastName: 'Bouaza', birthDate: '2021-09-10', gender: 'M', group: 'Grands', parentName: 'Zohra Bouaza', parentPhone: '0662-11-00-99', documents: { medicalCertificate: true, vaccinationRecord: true, insurance: true }, status: 'Active' },
  { id: '6', firstName: 'Sonia', lastName: 'Khelifi', birthDate: '2022-04-20', gender: 'F', group: 'Moyens', parentName: 'Riad Khelifi', parentPhone: '0550-88-77-66', documents: { medicalCertificate: false, vaccinationRecord: true, insurance: true }, status: 'Active' }
];

export const mockStaff: Staff[] = [
  { id: '1', firstName: 'Fatima', lastName: 'Zohra', role: 'Director', phone: '0555-11-22-33', email: 'fatima@creche.dz', joinDate: '2022-01-01', status: 'Active' },
  { id: '2', firstName: 'Meriem', lastName: 'Saidani', role: 'Educator', phone: '0662-33-44-55', email: 'meriem@creche.dz', joinDate: '2023-03-15', status: 'Active' },
  { id: '3', firstName: 'Zohra', lastName: 'Hamadi', role: 'Educator', phone: '0550-44-55-66', email: 'zohra@creche.dz', joinDate: '2024-09-01', status: 'Active' },
  { id: '4', firstName: 'Lila', lastName: 'Kaci', role: 'Assistant', phone: '0770-11-22-33', email: 'lila@creche.dz', joinDate: '2025-01-10', status: 'Active' },
  { id: '5', firstName: 'Rachid', lastName: 'Bouri', role: 'Cook', phone: '0551-88-99-00', email: 'rachid@creche.dz', joinDate: '2023-06-20', status: 'Active' }
];

export const mockAttendance: Attendance[] = [
  { id: '1', childId: '1', date: '2026-05-20', checkIn: '08:15', checkOut: '16:30', status: 'Present' },
  { id: '2', childId: '2', date: '2026-05-20', checkIn: '08:30', status: 'Present' },
  { id: '3', childId: '3', date: '2026-05-20', status: 'Absent' },
  { id: '4', childId: '4', date: '2026-05-20', checkIn: '09:00', status: 'Late' }
];

export const mockPayments: Payment[] = [
  { id: '1', childId: '1', amount: 18000, date: '2026-05-02', month: 'May 2026', status: 'Paid', method: 'Cash' },
  { id: '2', childId: '2', amount: 15000, date: '2026-05-05', month: 'May 2026', status: 'Paid', method: 'Transfer' },
  { id: '3', childId: '3', amount: 15000, date: '2026-05-10', month: 'May 2026', status: 'Paid', method: 'Cash' },
  { id: '4', childId: '4', amount: 18000, date: '', month: 'May 2026', status: 'Pending', method: 'Cash' },
  { id: '5', childId: '5', amount: 15000, date: '2026-05-08', month: 'May 2026', status: 'Paid', method: 'Transfer' },
  { id: '6', childId: '6', amount: 15000, date: '', month: 'May 2026', status: 'Overdue', method: 'Cash' }
];

export const mockActivities: Activity[] = [
  { id: '1', name: 'Coloring', group: 'Babies', day: 'Monday', startTime: '09:30', endTime: '10:30' },
  { id: '2', name: 'Storytelling', group: 'Middles', day: 'Monday', startTime: '10:00', endTime: '11:00' },
  { id: '3', name: 'Music', group: 'Bigs', day: 'Tuesday', startTime: '14:00', endTime: '15:00' }
];

export const mockMeals: Meal[] = [
  { id: '1', day: 'Sunday', breakfast: 'Milk & Biscuits', lunch: 'Lentil Soup', snack: 'Apple' },
  { id: '2', day: 'Monday', breakfast: 'Cereal', lunch: 'Pasta with veggies', snack: 'Yogurt' },
  { id: '3', day: 'Tuesday', breakfast: 'Hot Chocolate', lunch: 'Couscous', snack: 'Banana' },
  { id: '4', day: 'Wednesday', breakfast: 'Tea & Bread', lunch: 'Chicken with Rice', snack: 'Orange' },
  { id: '5', day: 'Thursday', breakfast: 'Milk', lunch: 'Lentils', snack: 'Dates' },
  { id: '6', day: 'Friday', breakfast: 'Special Breakfast', lunch: 'Family Style Couscous', snack: 'Fruit Salad' },
  { id: '7', day: 'Saturday', breakfast: 'Pancakes', lunch: 'Veggies & Meat', snack: 'Yogurt' }
];
