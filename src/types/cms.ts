export type BlockType = 'hero' | 'services' | 'case_study' | 'testimonial' | 'cta';

export interface CMSBlock {
  id: string;
  type: BlockType;
  content: any;
  order: number;
}

export interface CMSPage {
  id: string;
  slug: string;
  title: string;
  description: string;
  blocks: CMSBlock[];
  status: 'draft' | 'published';
  updated_at: string;
}