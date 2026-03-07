export type BlockType = 
  | 'hero' 
  | 'rich_text' 
  | 'image' 
  | 'video_upload' 
  | 'youtube_embed' 
  | 'instagram_embed' 
  | 'kpi_grid' 
  | 'team_grid' 
  | 'faq' 
  | 'cta'
  | 'testimonial';

export interface Block {
  id: string;
  type: BlockType;
  props: any;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: Block[];
  status: 'draft' | 'published';
  updated_at: string;
}