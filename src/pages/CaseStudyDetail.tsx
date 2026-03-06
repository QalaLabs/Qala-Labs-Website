"use client";

import * as React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import InstagramEmbed from '@/components/social/InstagramEmbed';
import { 
  ArrowLeft, 
  TrendingUp, 
  Target, 
  Zap, 
  CheckCircle2,
  BarChart3,
  Users,
  Play,
  ArrowRight,
  XCircle,
  Quote,
  IndianRupee,
  MousePointer2,
  Loader2
} from 'lucide-react';
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const YouTubeEmbed = ({ videoId, title }: { videoId: string, title?: string }) => (
  <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-2xl mb-8 border border-slate-100 bg-slate-900">
    <iframe
      className="absolute top-0 left-0 w-full h-full"
      src={`https://www.youtube.com/embed/${videoId}`}
      title={title || "YouTube video player"}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      loading="lazy"
    ></iframe>
  </div>
);

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [study, setStudy] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchStudy = async () => {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .or(`slug.eq.${slug},id.eq.${slug}`)
        .single();
      
      if (error || !data) {
        navigate('/case-studies');
      } else {
        setStudy(data);
      }
      setLoading(false);
    };
    fetchStudy();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  const metrics = study.results?.metrics || [];
  const blocks = study.content?.blocks || [];
  const learnings = study.results?.learnings || [];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      <SEO title={study.title} description={study.description} image={study.image_url} />
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4">
          <Link to="/case-studies" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Case Studies
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <Badge className="bg-blue-600 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
              {study.category || "Case Study"}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 leading-tight">
              {study.title}
            </h1>
            
            {study.video_url && study.video_url.includes('youtube.com') ? (
              <YouTubeEmbed videoId={study.video_url.split('v=')[1]} title={study.title} />
            ) : study.image_url && (
              <div className="rounded-[2rem] overflow-hidden shadow-2xl mb-12 border border-slate-100">
                <img src={study.image_url} alt={study.title} className="w-full h-auto" loading="lazy" />
              </div>
            )}
          </motion.div>

          {metrics.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
              {metrics.map((metric: any, i: number) => (
                <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all">
                  <p className="text-3xl font-black mb-1 text-slate-900">{metric.value}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{metric.label}</p>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-12 mb-24">
            {blocks.map((block: any, i: number) => (
              <motion.div
                key={i}
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
                  {block.body}
                </div>
              </motion.div>
            ))}
          </div>

          {learnings.length > 0 && (
            <section className="py-16 bg-slate-50 rounded-[3rem] px-8 md:px-16 mb-24 border border-slate-100">
              <h2 className="text-3xl font-black mb-12 text-center text-slate-900">What We Learned</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {learnings.map((item: any, i: number) => (
                  <div key={i} className="space-y-4">
                    <div className="flex items-center gap-2 text-red-600">
                      <XCircle className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Myth</span>
                    </div>
                    <p className="text-sm font-bold text-slate-800">"{item.myth}"</p>
                    <div className="flex items-center gap-2 text-green-600 pt-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Reality</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.reality}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="py-20">
            <div className="relative p-12 md:p-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3.5rem] overflow-hidden text-center shadow-2xl shadow-blue-500/20">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight text-white">
                  Ready to build your <br /> own scale engine?
                </h2>
                <Link to="/contact">
                  <Button className="bg-white text-blue-600 hover:bg-slate-100 px-10 py-7 rounded-2xl text-lg font-black group">
                    Book Your Free Audit <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mb-32" />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CaseStudyDetail;