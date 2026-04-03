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
  | 'testimonial'
  | 'tech_stack_ribbon'
  | 'why_different'
  | 'client_logos'
  | 'quick_metrics'
  | 'what_we_do'
  | 'how_we_work'
  | 'case_study_snapshots'
  | 'portfolio_snapshots'
  | 'research_insights'
  | 'closing_cta';

export interface Block {
  id: string;
  page_id?: string;
  type: BlockType;
  props: Record<string, any>;
  sort_order: number;
}

export interface Page {
  id?: string;
  title: string;
  slug: string;
  description?: string;
  content: Block[]; // We'll keep this for the UI state, but map it to page_blocks on save
  status: 'draft' | 'published';
  user_id?: string;
  created_at?: string;
  updated_at: string;
}

export interface BlockRendererProps {
  blocks: Block[];
}