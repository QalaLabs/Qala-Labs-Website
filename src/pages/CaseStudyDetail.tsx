"use client";

import * as React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  CheckCircle2,
  ArrowRight,
  XCircle,
  Loader2,
  Target,
  Zap,
  Gift,
  TrendingUp
} from 'lucide-react';
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { generateCaseStudySchema } from '@/lib/seo';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend
} from 'recharts';

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

const FUNNEL_ICONS: Record<string, React.ReactNode> = {
  target: <Target className="w-5 h-5" />,
  zap: <Zap className="w-5 h-5" />,
  gift: <Gift className="w-5 h-5" />,
  "trending-up": <TrendingUp className="w-5 h-5" />,
};

const ChartBlock = ({ block }: { block: any }) => {
  if (block.chartType === 'bar') {
    return (
      <div className="p-8 md:p-12 bg-white rounded-[2.5rem] border border-slate-100 hover:border-blue-200 hover:shadow-2xl transition-all">
        <h2 className="text-2xl font-black mb-2 text-slate-900">{block.title}</h2>
        {block.subtitle && <p className="text-slate-500 mb-8 text-sm">{block.subtitle}</p>}
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={block.data} margin={{ top: 4, right: 8, left: -16, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey={block.xKey} tick={{ fontSize: 11, fill: '#94a3b8' }} angle={-45} textAnchor="end" interval={2} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }}
              cursor={{ fill: '#f1f5f9' }}
            />
            <Bar dataKey={block.dataKey} fill={block.color || '#6366f1'} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (block.chartType === 'donut') {
    return (
      <div className="p-8 md:p-12 bg-white rounded-[2.5rem] border border-slate-100 hover:border-blue-200 hover:shadow-2xl transition-all">
        <h2 className="text-2xl font-black mb-2 text-slate-900">{block.title}</h2>
        {block.subtitle && <p className="text-slate-500 mb-8 text-sm">{block.subtitle}</p>}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={block.data} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="value">
                {block.data.map((entry: any, i: number) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }} />
              <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: 13 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  if (block.chartType === 'stats-grid') {
    return (
      <div className="p-8 md:p-12 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[2.5rem] border border-indigo-900 shadow-2xl">
        <h2 className="text-2xl font-black mb-2 text-white">{block.title}</h2>
        {block.subtitle && <p className="text-slate-400 mb-8 text-sm">{block.subtitle}</p>}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {block.stats.map((s: any, i: number) => (
            <div key={i} className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
              <p className="text-2xl font-black text-white mb-1">{s.value}</p>
              <p className={`text-xs font-bold mb-2 ${s.positive ? 'text-emerald-400' : 'text-red-400'}`}>{s.change}</p>
              <p className="text-[11px] text-slate-400 uppercase tracking-wider leading-tight">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (block.chartType === 'funnel-stats') {
    return (
      <div className="p-8 md:p-12 bg-white rounded-[2.5rem] border border-slate-100 hover:border-blue-200 hover:shadow-2xl transition-all">
        <h2 className="text-2xl font-black mb-2 text-slate-900">{block.title}</h2>
        {block.subtitle && <p className="text-slate-500 mb-8 text-sm">{block.subtitle}</p>}
        <div className="flex flex-col gap-3">
          {block.steps.map((step: any, i: number) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0" style={{ backgroundColor: step.color }}>
                  {FUNNEL_ICONS[step.icon] || <Target className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-black text-slate-900 text-sm">{step.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{step.sub}</p>
                </div>
                <div className="ml-auto text-slate-300 font-black text-lg">{i + 1}</div>
              </div>
              {i < block.steps.length - 1 && (
                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-slate-300 rotate-90" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  if (block.chartType === 'comparison-bar') {
    return (
      <div className="p-8 md:p-12 bg-white rounded-[2.5rem] border border-slate-100 hover:border-blue-200 hover:shadow-2xl transition-all">
        <h2 className="text-2xl font-black mb-2 text-slate-900">{block.title}</h2>
        {block.subtitle && <p className="text-slate-500 mb-8 text-sm">{block.subtitle}</p>}
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={block.data} margin={{ top: 4, right: 8, left: -16, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="metric" tick={{ fontSize: 12, fill: '#64748b' }} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }} />
            <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: 13 }} />
            <Bar dataKey="before" name={block.labels?.[0] || 'Before'} fill={block.colors?.[0] || '#cbd5e1'} radius={[6, 6, 0, 0]} />
            <Bar dataKey="after" name={block.labels?.[1] || 'After'} fill={block.colors?.[1] || '#6366f1'} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return null;
};

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [study, setStudy] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchStudy = async () => {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug || '');
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .or(isUuid ? `slug.eq.${slug},id.eq.${slug}` : `slug.eq.${slug}`)
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

  if (!study) return null;

  const metrics = study.results?.metrics || [];
  const blocks = study.content?.blocks || [];
  const learnings = study.results?.learnings || [];
  const schema = JSON.parse(generateCaseStudySchema(study));

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      <SEO 
        title={study.title} 
        description={study.description} 
        image={study.image_url} 
        jsonLd={schema}
      />
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
                transition={{ delay: i * 0.05 }}
              >
                {block.type === 'chart' ? (
                  <ChartBlock block={block} />
                ) : (
                  <div className="p-8 md:p-12 bg-white rounded-[2.5rem] border border-slate-100 hover:border-blue-200 hover:shadow-2xl transition-all group">
                    <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900 group-hover:text-blue-600 transition-colors">
                      {block.title}
                    </h2>
                    <div className="text-lg text-slate-600 leading-relaxed space-y-6 whitespace-pre-line">
                      {block.body}
                    </div>
                  </div>
                )}
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