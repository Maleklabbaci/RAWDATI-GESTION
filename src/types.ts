
export type Child = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: 'M' | 'F';
  group: string; // Dynamic class names
  parentName: string;
  parentPhone: string;
  medicalInfo?: string;
  documents: {
    medicalCertificate: boolean;
    vaccinationRecord: boolean;
    insurance: boolean;
  };
  status: 'Active' | 'Inactive';
};

export type Staff = {
  id: string;
  firstName: string;
  lastName: string;
  role: 'Director' | 'Educator' | 'Assistant' | 'Cook' | 'Cleaner';
  phone: string;
  email: string;
  joinDate: string;
  status: 'Active' | 'Inactive';
};

export type Attendance = {
  id: string;
  childId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'Present' | 'Absent' | 'Late';
};

export type Payment = {
  id: string;
  childId: string;
  amount: number;
  date: string;
  month: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  method: 'Cash' | 'Card' | 'Transfer' | 'Check';
};

export type Activity = {
  id: string;
  name: string;
  group: string; // Dynamic class names
  day: string;
  startTime: string;
  endTime: string;
};

export type Meal = {
  id: string;
  day: string;
  breakfast: string;
  lunch: string;
  snack: string;
};
