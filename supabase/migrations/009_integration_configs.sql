-- Migration 9: Integration configurations (admin-only, stores credentials as JSONB)

CREATE TABLE IF NOT EXISTS public.integration_configs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  integration_type TEXT NOT NULL UNIQUE
    CHECK (integration_type IN ('smtp', 'whatsapp', 'hostinger_imap', 'claude_api')),
  config JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT false,
  updated_by UUID REFERENCES public.profiles(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default rows so admins can update them rather than insert
INSERT INTO public.integration_configs (integration_type, config, is_active)
VALUES
  ('smtp',           '{}', false),
  ('whatsapp',       '{}', false),
  ('hostinger_imap', '{}', false),
  ('claude_api',     '{}', false)
ON CONFLICT (integration_type) DO NOTHING;

ALTER TABLE public.integration_configs ENABLE ROW LEVEL SECURITY;

-- Only admins can read or write integration configs (they contain secrets)
CREATE POLICY "Admins manage integrations" ON public.integration_configs
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );
