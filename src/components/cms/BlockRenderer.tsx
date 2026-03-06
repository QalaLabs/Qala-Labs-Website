"use client";

import React from 'react';
import Hero from '@/components/layout/Hero';
import ServicesGrid from '@/components/services/ServicesGrid';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import { Block } from '@/types/editor';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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
            return (
              <Hero 
                key={block.id} 
                {...block.props} 
              />
            );
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
          case 'cta':
            return (
              <section key={block.id} className="py-24 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                  <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">{block.props.title}</h2>
                  <p className="text-slate-400 mb-12 text-xl leading-relaxed">{block.props.description}</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 px-12 py-8 rounded-2xl text-xl font-black shadow-2xl shadow-blue-500/20">
                    {block.props.buttonText} <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>
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
          default:
            return (
              <div key={block.id} className="p-10 text-center bg-slate-100 text-slate-400 italic">
                Block type "{block.type}" not yet implemented in renderer.
              </div>
            );
        }
      })}
    </div>
  );
};

export default BlockRenderer;