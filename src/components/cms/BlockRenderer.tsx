import React from 'react';
import Hero from '@/components/layout/Hero';
import Team from '@/components/home/Team';
import FAQ from '@/components/home/FAQ';
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
import PortfolioSnapshots from '@/components/home/PortfolioSnapshots';
import ResearchInsights from '@/components/home/ResearchInsights';
import ClosingCTA from '@/components/home/ClosingCTA';

// Import images for fallback
import AashirwadImg from '@/assets/Aashirwad.png';
import DipikaImg from '@/assets/Dipika.jpg';
import AryamanImg from '@/assets/Aryaman.png';
import ManpreetImg from '@/assets/Manpreet.png';
import AayushImg from '@/assets/Aayush.png';

export interface BlockRendererProps {
  blocks: Block[];
  editingId?: string | null;
  onUpdateBlock?: (id: string, props: any) => void;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks, editingId, onUpdateBlock }) => {
  if (!blocks || blocks.length === 0) {
    // Fallback: If no blocks are defined, render the homepage structure anyway
    return (
      <>
        <Hero 
          title="India's Full-Service AI Growth Agency."
          subtitle="Performance marketing, AI automation, and AI search visibility — we build brands that scale." 
          ctaText="Get Proposal" 
          ctaUrl="/contact" 
        />
        <TechStackRibbon />
        <WhyDifferent 
          title="Why we're different" 
          description="We're revenue engineers, not growth hackers. We pair rigorous research with hands-on execution so every experiment has a clear hypothesis, an attribution plan, and measurable revenue impact." 
        />
        <ClientLogos />
        <QuickMetrics 
          title="Recent Results" 
          subtitle="Proven Performance." 
          results={[
            { brand: "Amazon Ads: Apparel Scale", stats: [{ label: "Top ROAS", value: "11.2x", iconType: 'zap' }, { label: "Monthly Sales", value: "₹2.7L+", iconType: 'trending' }], color: "from-blue-600/20 to-indigo-600/20" },
            { brand: "playR: Real Fans, Real Roar", stats: [{ label: "Viral Reach", value: "5M+", iconType: 'share' }, { label: "Engagement", value: "12%", iconType: 'heart' }], color: "from-yellow-600/20 to-orange-600/20" }
          ]}
        />
        <WhatWeDo title="What we do" />
        <HowWeWork title="How we work" />
        <CaseStudySnapshots />
        <PortfolioSnapshots />
        <ResearchInsights 
          title="Research & Insights" 
          description="We believe in doing the right research and finding the perfect insight for your brand to work on: from customer micro-segments to creative triggers and measurement design." 
        />
        <Team 
          title="The Team" 
          members={[
            { name: "Aashirwad Bhansali", role: "Growth & Performance Strategy", desc: "Data-first paid media, experiment design, and scaling playbooks.", image: AashirwadImg, linkedin: "https://www.linkedin.com/in/aashirwad-bhansali/" },
            { name: "Dipika", role: "Ecommerce Scaling", desc: "Listing optimization, retention engineering, and lifecycle flows.", image: DipikaImg, linkedin: "https://www.linkedin.com/in/dipika-k-53a3bb138/" },
            { name: "Aryaman", role: "Social Media and Talent Management", desc: "Creator programs, UGC production, and cross-platform distribution.", image: AryamanImg, linkedin: "https://www.linkedin.com/in/aryaman-chatterjee-b8971b208/" },
            { name: "Aayush Singh", role: "AI and Tech Lead", desc: "Engineering autonomous AI agents, custom LLM workflows, and high-performance tech stacks.", image: AayushImg, linkedin: "https://www.linkedin.com/in/captn1107/" },
            { name: "Manpreet Singh", role: "Visualiser", desc: "Visual storytelling, brand aesthetics, and high-impact design.", image: ManpreetImg, linkedin: "https://www.linkedin.com/in/manpreet-singh-020549237" }
          ]}
        />
        <FAQ 
          title="Frequently Asked Questions" 
          items={[
            { question: "How do you measure success?", answer: "We track contribution margin, ROAS, and LTV:CAC — not vanity metrics." },
            { question: "Do you work with startups?", answer: "Yes — we only work with brands ready to scale beyond ₹5L/month revenue." }
          ]}
        />
        <ClosingCTA />
      </>
    );
  }

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

          case 'faq':
            return <FAQ 
              key={block.id} 
              {...block.props} 
              isEditing={isEditing} 
              onUpdate={handleUpdate} 
            />;
          
          case 'cta':
            return (
              <section key={block.id} className="py-24 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                  <h2 
                    contentEditable={isEditing}
                    onBlur={(e) => handleUpdate({ title: e.currentTarget.innerText })}
                    suppressContentEditableWarning={true}
                    className={`text-4xl md:text-6xl font-black mb-8 leading-tight outline-none ${isEditing ? 'hover:bg-white/10 focus:bg-white/10 rounded-lg transition-colors' : ''}`}
                  >
                    {block.props.title}
                  </h2>
                  <p 
                    contentEditable={isEditing}
                    onBlur={(e) => handleUpdate({ description: e.currentTarget.innerText })}
                    suppressContentEditableWarning={true}
                    className={`text-slate-400 mb-12 text-xl leading-relaxed outline-none ${isEditing ? 'hover:bg-white/10 focus:bg-white/10 rounded-lg transition-colors' : ''}`}
                  >
                    {block.props.description}
                  </p>
                  <Link to={block.props.buttonUrl || "/contact"} onClick={(e) => isEditing && e.preventDefault()}>
                    <Button className="bg-blue-600 hover:bg-blue-700 px-12 py-8 rounded-2xl text-xl font-black shadow-2xl shadow-blue-500/20">
                      {block.props.buttonText} <ArrowRight className="ml-2 w-6 h-6" />
                    </Button>
                  </Link>
                </div>
              </section>
            );

          case 'team_grid':
            return <Team key={block.id} title={block.props?.title} />;
          
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

          case 'portfolio_snapshots':
            return <PortfolioSnapshots key={block.id} />;

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