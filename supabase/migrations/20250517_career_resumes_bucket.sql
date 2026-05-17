-- Create storage bucket for career application resumes
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'career-resumes',
  'career-resumes',
  true,
  5242880,
  array['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
on conflict (id) do nothing;

-- Allow anyone to upload (anon insert) — the app validates file type client-side
create policy "Anyone can upload resumes"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'career-resumes');

-- Admins can read/delete
create policy "Admins can manage resumes"
  on storage.objects for all
  to authenticated
  using (
    bucket_id = 'career-resumes'
    and (select role from public.profiles where id = auth.uid()) = 'admin'
  );
