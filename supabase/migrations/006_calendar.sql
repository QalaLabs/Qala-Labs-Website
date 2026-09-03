-- Migration 6: Calendar events

CREATE TABLE IF NOT EXISTS public.calendar_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_by UUID REFERENCES public.profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,
  all_day BOOLEAN NOT NULL DEFAULT false,
  location TEXT,
  event_type TEXT NOT NULL DEFAULT 'personal'
    CHECK (event_type IN ('personal', 'company', 'meeting', 'deadline')),
  color TEXT NOT NULL DEFAULT '#6366f1',
  is_company_wide BOOLEAN NOT NULL DEFAULT false,
  recurrence_rule TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.calendar_event_attendees (
  event_id UUID NOT NULL REFERENCES public.calendar_events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rsvp TEXT NOT NULL DEFAULT 'pending' CHECK (rsvp IN ('pending', 'accepted', 'declined')),
  PRIMARY KEY (event_id, user_id)
);

ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_event_attendees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own and company events" ON public.calendar_events
  FOR SELECT TO authenticated USING (
    created_by = auth.uid()
    OR is_company_wide = true
    OR EXISTS (SELECT 1 FROM public.calendar_event_attendees a WHERE a.event_id = id AND a.user_id = auth.uid())
  );

CREATE POLICY "Staff create events" ON public.calendar_events
  FOR INSERT TO authenticated WITH CHECK (
    created_by = auth.uid() AND
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role IN ('admin', 'employee'))
  );

CREATE POLICY "Creators manage own events" ON public.calendar_events
  FOR ALL TO authenticated USING (created_by = auth.uid());

CREATE POLICY "Attendees can view event attendees" ON public.calendar_event_attendees
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.calendar_event_attendees a WHERE a.event_id = event_id AND a.user_id = auth.uid())
  );
