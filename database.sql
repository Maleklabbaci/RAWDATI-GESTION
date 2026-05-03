-- ######################################################
-- # RAWDATI MASTER SYSTEM - DATABASE SCHEMA 2026      #
-- # COMPATIBLE WITH SUPABASE / POSTGRESQL             #
-- ######################################################

-- 1. NURSERIES (The clients of the platform)
CREATE TABLE IF NOT EXISTS nurseries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL DEFAULT 'nursery123', -- Default password for created accounts
  phone TEXT,
  city TEXT,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Active', 'Inactive', 'Pending')),
  plan TEXT DEFAULT 'Trial' CHECK (plan IN ('Trial', 'Basic', 'Pro', 'Premium')),
  expiry_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. CHILDREN (Students of a specific nursery)
CREATE TABLE IF NOT EXISTS children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nursery_id UUID REFERENCES nurseries(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  birth_date DATE NOT NULL,
  gender CHAR(1) CHECK (gender IN ('M', 'F')),
  group_name TEXT NOT NULL, -- Babies, Middles, Bigs
  parent_name TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  work_address TEXT,
  authorized_pickups TEXT,
  nationality TEXT DEFAULT 'Algérienne',
  national_id TEXT,
  blood_type TEXT,
  medical_info TEXT,
  documents JSONB DEFAULT '{"medicalCertificate": false, "vaccinationRecord": false, "insurance": false}',
  status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. STAFF (Employees of a specific nursery)
CREATE TABLE IF NOT EXISTS staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nursery_id UUID REFERENCES nurseries(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Director', 'Educator', 'Assistant', 'Cook', 'Cleaner')),
  phone TEXT NOT NULL,
  email TEXT,
  join_date DATE NOT NULL,
  qualifications TEXT,
  assigned_class TEXT,
  status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. ATTENDANCE (Daily presence tracking)
CREATE TABLE IF NOT EXISTS attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nursery_id UUID REFERENCES nurseries(id) ON DELETE CASCADE,
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  check_in TIME,
  check_out TIME,
  status TEXT NOT NULL CHECK (status IN ('Present', 'Absent', 'Late')),
  UNIQUE(child_id, date)
);

-- 5. PAYMENTS (Financial transactions)
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nursery_id UUID REFERENCES nurseries(id) ON DELETE CASCADE,
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  amount DECIMAL(12, 2) NOT NULL,
  payment_date DATE DEFAULT CURRENT_DATE,
  month_year TEXT NOT NULL, -- Format: "May 2026"
  receipt_number TEXT,
  discount DECIMAL(12, 2) DEFAULT 0,
  method TEXT NOT NULL CHECK (method IN ('Cash', 'Card', 'Transfer', 'Check')),
  status TEXT DEFAULT 'Paid' CHECK (status IN ('Paid', 'Pending', 'Overdue')),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. CLASSES (Group organization)
CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nursery_id UUID REFERENCES nurseries(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  lead_teacher_id UUID REFERENCES staff(id),
  capacity INTEGER NOT NULL,
  age_range TEXT,
  color TEXT DEFAULT 'bg-blue-500',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. ACTIVITIES (Weekly schedule)
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nursery_id UUID REFERENCES nurseries(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  group_name TEXT NOT NULL,
  day_of_week TEXT NOT NULL CHECK (day_of_week IN ('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL
);

-- 8. MEALS (Weekly nutrition plan)
CREATE TABLE IF NOT EXISTS meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nursery_id UUID REFERENCES nurseries(id) ON DELETE CASCADE,
  day_of_week TEXT NOT NULL CHECK (day_of_week IN ('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')),
  breakfast TEXT,
  lunch TEXT,
  snack TEXT,
  UNIQUE(nursery_id, day_of_week)
);

-- 9. SUPPORT MESSAGES (Communication with Super Admin)
CREATE TABLE IF NOT EXISTS support_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_nursery_id UUID REFERENCES nurseries(id) ON DELETE CASCADE,
  sender_name TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. NOTIFICATIONS (In-app alerts)
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nursery_id UUID REFERENCES nurseries(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ######################################################
-- # ROW LEVEL SECURITY (RLS) - FOR SUPABASE PROTECTION #
-- ######################################################

-- Enable RLS on all tables
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Simple policy: Users can only see data where nursery_id matches their identity
-- (Requires Supabase Auth to be set up)
-- CREATE POLICY nursery_isolation ON children FOR ALL USING (nursery_id = auth.jwt()->>'nursery_id');
-- (Repeat for other tables)
