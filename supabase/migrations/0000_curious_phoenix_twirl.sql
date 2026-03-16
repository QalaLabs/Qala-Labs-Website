-- Create page_blocks table
CREATE TABLE public.page_blocks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE NOT NULL,
  block_type TEXT NOT NULL,
  content_data JSONB DEFAULT '{}'::jsonb NOT NULL,
  sort_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.page_blocks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Authenticated users can manage all page blocks" ON public.page_blocks
FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public can view blocks of published pages" ON public.page_blocks
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.pages
    WHERE pages.id = page_blocks.page_id
    AND pages.status = 'published'
  )
);

-- Add index for performance
CREATE INDEX idx_page_blocks_page_id ON public.page_blocks(page_id);
CREATE INDEX idx_page_blocks_sort_order ON public.page_blocks(sort_order);