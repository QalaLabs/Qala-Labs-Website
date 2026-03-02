"use client";

import React from 'react';
import Hero from '@/components/layout/Hero';
import ServicesGrid from '@/components/services/ServicesGrid';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import { CMSBlock } from '@/types/cms';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const BlockRenderer = ({ blocks }: { blocks: CMSBlock[] }) => {
  return (
    <div className="flex flex-col">
      {blocks.sort((a, b) => a.order - b.order).map((block) => {
        switch (block.type) {
          case 'hero':
            return <Hero key={block.id} {...block.content} />;
          case 'services':
            return (
              <section key={block.id} className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-black mb-4">{block.content.title}</h2>
                    <p className="text-slate-600">{block.content.description}</p>
                  </div>
                  <ServicesGrid />
                </div>
              </section>
            );
          case 'case_study':
            return (
              <section key={block.id} className="py-24 bg-slate-50">
                <div className="max-w-[1600px] mx-auto px-4">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-black mb-4">{block.content.title}</h2>
                  </div>
                  <PortfolioGrid />
                </div>
              </section>
            );
          case 'cta':
            return (
              <section key={block.id} className="py-24 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                  <h2 className="text-4xl font-bold mb-6">{block.content.title}</h2>
                  <p className="text-slate-400 mb-10 text-xl">{block.content.description}</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 px-10 py-8 rounded-2xl text-xl font-black">
                    {block.content.buttonText} <ArrowRight className="ml-2" />
                  </Button>
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