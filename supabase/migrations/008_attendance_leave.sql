-- Migration 8: Attendance records and leave requests

CREATE TABLE IF NOT EXISTS public.attendance_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  clock_in TIMESTAMPTZ,
  clock_out TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'present'
    CHECK (status IN ('present', 'absent', 'half_day', 'remote', 'holiday')),
  notes TEXT,
  UNIQUE (user_id, date)
);

CREATE TABLE IF NOT EXISTS public.leave_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  leave_type TEXT NOT NULL
    CHECK (leave_type IN ('annual', 'sick', 'casual', 'maternity', 'paternity', 'unpaid')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  days_count NUMERIC(4,1),
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES public.profiles(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;

-- Attendance policies
CREATE POLICY "Users view own attendance" ON public.attendance_records
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Users clock in/out" ON public.attendance_records
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users update own clock-out" ON public.attendance_records
  FOR UPDATE TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Admins manage all attendance" ON public.attendance_records
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- Leave policies
CREATE POLICY "Users manage own leave requests" ON public.leave_requests
  FOR ALL TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Admins manage all leave requests" ON public.leave_requests
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );
