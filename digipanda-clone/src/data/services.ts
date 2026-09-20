export interface ServiceItem {
  slug: string;
  name: string;
  track: 'AI' | 'Design' | 'Development' | 'Marketing';
  tagline: string;
  description: string;
  deliverables: string[];
}

// TODO(concurrent session: Services): flesh out tagline/description/deliverables
// with real Qala capabilities and proof points from past client work.
export const services: ServiceItem[] = [
  { slug: 'ai-automation', name: 'AI Automation', track: 'AI', tagline: '', description: '', deliverables: [] },
  { slug: 'ai-voice-agents', name: 'AI Voice Agents', track: 'AI', tagline: '', description: '', deliverables: [] },
  { slug: 'branding', name: 'Branding', track: 'Design', tagline: '', description: '', deliverables: [] },
  { slug: 'ui-ux-design', name: 'UI/UX Design', track: 'Design', tagline: '', description: '', deliverables: [] },
  { slug: 'web-design', name: 'Web Design', track: 'Design', tagline: '', description: '', deliverables: [] },
  { slug: 'mobile-app-designing', name: 'Mobile App Designing', track: 'Design', tagline: '', description: '', deliverables: [] },
  { slug: 'landing-page-designing', name: 'Landing Page Designing', track: 'Design', tagline: '', description: '', deliverables: [] },
  { slug: 'web-development', name: 'Web Development', track: 'Development', tagline: '', description: '', deliverables: [] },
  { slug: 'mobile-app-development', name: 'Mobile App Development', track: 'Development', tagline: '', description: '', deliverables: [] },
  { slug: 'software-development', name: 'Software Development', track: 'Development', tagline: '', description: '', deliverables: [] },
  { slug: 'digital-marketing', name: 'Performance Marketing', track: 'Marketing', tagline: '', description: '', deliverables: [] },
  { slug: 'search-engine-optimization', name: 'Search Engine Optimization', track: 'Marketing', tagline: '', description: '', deliverables: [] },
  { slug: 'social-media-marketing', name: 'Social Media Marketing', track: 'Marketing', tagline: '', description: '', deliverables: [] },
];
