create table if not exists public.email_templates (
  id uuid primary key default gen_random_uuid(),
  tool_used text not null unique,
  subject text not null,
  body text not null,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Insert default templates for common tools
insert into public.email_templates (tool_used, subject, body) values
  ('contact_form_v2', 'Your Qala Labs audit request received', 'Hi {{name}},\n\nThank you for reaching out to Qala Labs. We have received your audit request and will review it shortly. Our team will be in touch within 24 hours with a custom growth strategy.\n\nBest regards,\nThe Qala Labs Team') on conflict (tool_used) do nothing,
  ('scale_potential_quiz', 'Your Scale Potential Quiz results', 'Hi {{name}},\n\nThanks for taking our Scale Potential Quiz! Based on your responses, here is your personalized 90-day roadmap to scale your brand to 8-figures.\n\n[Attach or link to PDF]\\n\nBest regards,\nThe Qala Labs Team') on conflict (tool_used) do nothing,
  ('career_application', 'Application received - Qala Labs Careers', 'Hi {{name}},\n\nWe have received your application for the {{data.job_title}} position. Our team will review your portfolio and get back to you soon.\n\nBest regards,\nThe Qala Labs Team') on conflict (tool_used) do nothing,
  ('creator_onboarding_v2', 'Creator Collective onboarding received', 'Hi {{name}},\n\nThank you for applying to join the Qala Labs Creator Collective. Our talent team will review your profile and reach out via email within 48 hours.\n\nBest regards,\nThe Qala Labs Team') on conflict (tool_used) do nothing,
  ('agency_network_join', 'Agency Network application received', 'Hi {{name}},\n\nWe have received your application to join the Qala Labs Agency Network. Our team will review your expertise and reach out for a discovery call soon.\n\nBest regards,\nThe Qala Labs Team') on conflict (tool_used) do nothing,
  ('sticky_cta_microform', 'Your growth roadmap is on the way', 'Hi {{name}},\n\nThanks for submitting your details via our sticky CTA. Our team is already analyzing your potential and will send your custom growth roadmap shortly.\n\nBest regards,\nThe Qala Labs Team') on conflict (tool_used) do nothing
;

-- Ensure updated_at trigger
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language 'plpgsql';

drop trigger if exists update_email_templates_updated_at on public.email_templates;
create trigger update_email_templates_updated_at
before update on public.email_templates
for each row execute procedure public.update_updated_at_column();