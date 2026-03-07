"use client";

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

interface BlockRendererProps {
  blocks: Block[];
}

const BlockRenderer = ({ blocks }: BlockRendererProps) => {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="flex flex-col">
      {blocks.map((block) => {
        switch (block.type) {
          case 'hero':
            return <Hero key={block.id} {...block.props} />;
          
          case 'rich_text':
            return (
              <section key={block.id} className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 prose prose-slate lg:prose-xl prose-headings:font-black prose-a:text-blue-600">
                  <div dangerouslySetInnerHTML={{ __html: block.props.content }} />
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
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'team_grid':
            return <TeamGridBlock key={block.id} {...block.props} />;

          case 'faq':
            return <FAQBlock key={block.id} {...block.props} />;

          case 'testimonial':
            return <TestimonialBlock key={block.id} {...block.props} />;

          case 'cta':
            return (
              <section key={block.id} className="py-24 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                  <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">{block.props.title}</h2>
                  <p className="text-slate-400 mb-12 text-xl leading-relaxed">{block.props.description}</p>
                  <Link to={block.props.buttonUrl || "/contact"}>
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

          case 'video_upload':
            return (
              <section key={block.id} className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 bg-slate-900 aspect-video">
                    <video 
                      src={block.props.url} 
                      controls 
                      className="w-full h-full object-cover"
                      poster={block.props.poster}
                    />
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

          case 'instagram_embed':
            return (
              <section key={block.id} className="py-12 bg-white">
                <div className="max-w-xl mx-auto px-4">
                  <InstagramEmbed url={block.props.url} />
                </div>
              </section>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default BlockRenderer;