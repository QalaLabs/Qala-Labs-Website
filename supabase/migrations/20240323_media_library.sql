-- Create media_library table
CREATE TABLE IF NOT EXISTS public.media_library (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  alt_text TEXT,
  file_size BIGINT,
  mime_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;

-- Database Policies
CREATE POLICY "Authenticated users can view media" ON public.media_library
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can manage their own media" ON public.media_library
FOR ALL TO authenticated USING (auth.uid() = user_id);

-- Storage Bucket Setup (Note: Bucket creation usually happens via Dashboard or API, 
-- but we ensure policies are ready for a bucket named 'media')
CREATE POLICY "Public Access to Media" ON storage.objects
FOR SELECT USING (bucket_id = 'media');

CREATE POLICY "Authenticated Uploads" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media');

CREATE POLICY "Users can delete their own objects" ON storage.objects
FOR DELETE TO authenticated USING (bucket_id = 'media' AND auth.uid() = owner);