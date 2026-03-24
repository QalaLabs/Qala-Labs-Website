import React from 'react';
import Hero from '@/components/layout/Hero';
import TeamGridBlock from '@/components/cms/blocks/TeamGridBlock';
import FAQBlock from '@/components/cms/blocks/FAQBlock';
import TestimonialBlock from '@/components/cms/blocks/TestimonialBlock';
import InstagramEmbed from '@/components/social/InstagramEmbed';
import { Block } from '@/types/editor';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TechStackRibbon from '@/components/home/TechStackRibbon';
import WhyDifferent from '@/components/home/WhyDifferent';
import ClientLogos from '@/components/home/ClientLogos';
import QuickMetrics from '@/components/home/QuickMetrics';
import WhatWeDo from '@/components/home/WhatWeDo';
import HowWeWork from '@/components/home/HowWeWork';
import CaseStudySnapshots from '@/components/home/CaseStudySnapshots';
import ResearchInsights from '@/components/home/ResearchInsights';
import ClosingCTA from '@/components/home/ClosingCTA';
import Team from '@/components/home/Team';
import FAQ from '@/components/home/FAQ';

export interface BlockRendererProps {
  blocks: Block[];
  editingId?: string | null;
  onUpdateBlock?: (id: string, props: any) => void;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks, editingId, onUpdateBlock }) => {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="flex flex-col">
      {blocks.map((block) => {
        const isEditing = editingId === block.id;
        const handleUpdate = (newProps: any) => {
          if (onUpdateBlock) onUpdateBlock(block.id, newProps);
        };

        switch (block.type) {
          case 'hero':
            return <Hero 
              key={block.id} 
              {...block.props} 
              isEditing={isEditing} 
              onUpdate={handleUpdate} 
            />;
          
          case 'rich_text':
            return (
              <section key={block.id} className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 prose prose-slate lg:prose-xl prose-headings:font-black prose-a:text-blue-600">
                  <div 
                    contentEditable={isEditing}
                    onBlur={(e) => handleUpdate({ content: e.currentTarget.innerHTML })}
                    suppressContentEditableWarning={true}
                    className={`outline-none ${isEditing ? 'hover:bg-blue-50/50 focus:bg-blue-50/50 rounded-lg p-4 transition-colors cursor-text' : ''}`}
                    dangerouslySetInnerHTML={{ __html: block.props.content }} 
                  />
                </div>
              </section>
            );

          case 'kpi_grid':
            return (
              <section key={block.id} className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {block.props.items?.map((item: any, i: number) => (
                      <div key={i} className="p-8 bg-white rounded-[2rem] border border-slate-100 text-center shadow-sm">
                        <p className="text-4xl font-black text-slate-900 mb-2">{item.value}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'team_grid':
            return <Team key={block.id} {...block.props} />;
          
          case 'faq':
            return <FAQ key={block.id} {...block.props} />;
          
          case 'testimonial':
            return <TestimonialBlock 
              key={block.id} 
              quote={block.props.quote || ''} 
              author={block.props.author || ''} 
              role={block.props.role || ''} 
              avatar={block.props.avatar} 
            />;
          
          case 'cta':
            return (
              <section key={block.id} className="py-24 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                  <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">{block.props.title}</h2>
                  <p className="text-slate-400 mb-12 text-xl leading-relaxed">{block.props.description}</p>
                  <Link to={block.props.buttonUrl || "/contact"} onClick={(e) => isEditing && e.preventDefault()}>
                    <Button className="bg-blue-600 hover:bg-blue-700 px-12 py-8 rounded-2xl text-xl font-black shadow-2xl shadow-blue-500/20">
                      {block.props.buttonText} <ArrowRight className="ml-2 w-6 h-6" />
                    </Button>
                  </Link>
                </div>
              </section>
            );

          case 'image':
            return (
              <section key={block.id} className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100">
                    <img src={block.props.url} alt={block.props.alt || ""} className="w-full h-auto" />
                  </div>
                </div>
              </section>
            );

          case 'youtube_embed':
            return (
              <section key={block.id} className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 bg-slate-900">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${block.props.videoId}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </section>
            );

          case 'tech_stack_ribbon':
            return <TechStackRibbon key={block.id} />;
          
          case 'why_different':
            return <WhyDifferent key={block.id} {...block.props} />;
          
          case 'client_logos':
            return <ClientLogos key={block.id} />;
          
          case 'quick_metrics':
            return <QuickMetrics key={block.id} {...block.props} />;
          
          case 'what_we_do':
            return <WhatWeDo key={block.id} {...block.props} />;
          
          case 'how_we_work':
            return <HowWeWork key={block.id} {...block.props} />;
          
          case 'case_study_snapshots':
            return <CaseStudySnapshots key={block.id} />;

          case 'research_insights':
            return <ResearchInsights key={block.id} {...block.props} />;
          
          case 'closing_cta':
            return <ClosingCTA key={block.id} {...block.props} />;

          default:
            return null;
        }
      })}
    </div>
  );
};

export default BlockRenderer;