"use client";

import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  TrendingUp, 
  Target, 
  ArrowRight,
  IndianRupee,
  MousePointer2,
  Quote,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { motion } from "framer-motion";

const portfolioData: Record<string, any> = {
  'amazon-ads': {
    title: "Amazon Ads: Performance Scaling for Apparel Brand",
    category: "Ecommerce/Performance Marketing",
    heroImage: "/src/assets/amazon-ads-hero.png",
    proofImages: [
      "/src/assets/amazon-ads-1.jpeg",
      "/src/assets/amazon-ads-2.jpeg"
    ],
    metrics: [
      { label: "Max ROAS", value: "11.2x", icon: <TrendingUp className="w-5 h-5" /> },
      { label: "Monthly Sales", value: "₹2.7L+", icon: <IndianRupee className="w-5 h-5" /> },
      { label: "Account ROAS", value: "6.5x+", icon: <Target className="w-5 h-5" /> },
      { label: "CPC", value: "Reduced", icon: <MousePointer2 className="w-5 h-5" /> }
    ],
    projectInfo: {
      category: "Artwork",
      location: "United Kingdom",
      software: "Adobe Illustrator",
      dated: "14-Aug-2022",
      client: "Andreo Bowla"
    },
    blocks: [
      {
        id: "overview",
        title: "Sponsored Products & Sponsored Display",
        content: `This project focused on scaling Amazon Ads profitably for an apparel brand operating in a highly competitive marketplace environment. The objective was to drive sustained sales growth while maintaining healthy ROAS, using a structured performance marketing approach across Sponsored Products and Sponsored Display campaigns.

        We managed and optimized multiple campaigns across categories such as team merchandise, topwear, jerseys, and new product launches, ensuring budget efficiency, keyword relevance, and continuous performance improvement.`
      },
      {
        id: "challenges",
        title: "The Challenges We Faced",
        content: `• High competition in apparel keywords
        • Low CTR on new product launches
        • Scaling spend without hurting ROAS
        • Managing multiple campaigns across different product categories
        • Improving conversion efficiency while controlling CPC`
      },
      {
        id: "strategy",
        title: "Data-First Amazon Ads Strategy",
        content: `We implemented a data-first Amazon Ads strategy focused on profitability and scale:

        • Campaign Segmentation: Structured campaigns by product category, intent level, and performance maturity.
        • Search Term Mining & Optimization: Continuous extraction of converting search terms and elimination of non-performing keywords.
        • Bid & Placement Optimization: Strategic use of Top-of-Search bid adjustments only on high-converting campaigns.
        • Performance Scaling: Budgets were increased selectively on campaigns delivering consistent ROAS.
        • Inventory and Demand Control: Low-performing new launches were paused or rebuilt to prevent wasted spend.`
      },
      {
        id: "results",
        title: "This led to us achieving",
        content: `• Achieved ROAS up to 11.2 on top-performing campaigns
        • Generated ₹2.7L+ in sales within a single month
        • Maintained overall account ROAS above 6.5
        • Reduced CPC through relevance and bid control
        • Identified clear winners and stopped budget leakage on underperforming campaigns`
      }
    ]
  }
};

const PortfolioDetail = () => {
  const { slug } = useParams();
  const data = portfolioData[slug || 'amazon-ads'] || portfolioData['amazon-ads'];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      <SEO title={data.title} />
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <Badge className="bg-blue-600 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
              {data.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 leading-tight">
              {data.title}
            </h1>
            
            {data.heroImage && (
              <div className="rounded-[2rem] overflow-hidden shadow-2xl mb-12 border border-slate-100">
                <img src={data.heroImage} alt={data.title} className="w-full h-auto" />
              </div>
            )}

            {data.proofImages && (
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {data.proofImages.map((src: string, i: number) => (
                  <div key={i} className="rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 bg-white p-2">
                    <img src={src} alt={`Proof ${i + 1}`} className="w-full h-auto rounded-[1.5rem]" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {data.metrics.map((metric: any, i: number) => (
              <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all">
                <div className="text-blue-600 mb-3 flex justify-center">{metric.icon}</div>
                <p className="text-3xl font-black mb-1 text-slate-900">{metric.value}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{metric.label}</p>
              </div>
            ))}
          </div>

          {data.projectInfo && (
            <div className="mb-20 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100">
              <h3 className="text-2xl font-black mb-8 text-slate-900">Project Info -</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-2">Category:</p>
                  <p className="font-bold text-slate-700">{data.projectInfo.category}</p>
                </div>
                <div>
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-2">Location:</p>
                  <p className="font-bold text-slate-700">{data.projectInfo.location}</p>
                </div>
                <div>
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-2">Software:</p>
                  <p className="font-bold text-slate-700">{data.projectInfo.software}</p>
                </div>
                <div>
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-2">Dated:</p>
                  <p className="font-bold text-slate-700">{data.projectInfo.dated}</p>
                </div>
                <div>
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-2">Client:</p>
                  <p className="font-bold text-slate-700">{data.projectInfo.client}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-12 mb-24">
            {data.blocks.map((block: any, i: number) => (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 md:p-12 bg-white rounded-[2.5rem] border border-slate-100 hover:border-blue-200 hover:shadow-2xl transition-all group"
              >
                <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900 group-hover:text-blue-600 transition-colors">
                  {block.title}
                </h2>
                <div className="text-lg text-slate-600 leading-relaxed space-y-6 whitespace-pre-line">
                  {block.content}
                </div>
              </motion.div>
            ))}
          </div>

          <section className="py-20">
            <div className="relative p-12 md:p-20 bg-slate-900 rounded-[3.5rem] overflow-hidden text-center shadow-2xl">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight text-white">
                  Ready to build your <br /> own scale engine?
                </h2>
                <Link to="/contact">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 px-10 py-7 rounded-2xl text-lg font-black group">
                    Book Your Free Audit <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PortfolioDetail;