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
  ArrowRight,
  IndianRupee,
  MousePointer2,
  Quote,
  CheckCircle2,
  XCircle,
  Play,
  Users,
  Heart,
  Bookmark,
  Share2,
  ChevronLeft,
  ChevronRight,
  Globe,
  Search,
  Zap,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const PortfolioDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .or(`slug.eq.${slug},id.eq.${slug}`)
        .single();
      
      if (error || !data) {
        navigate('/portfolio');
      } else {
        setProject(data);
      }
      setLoading(false);
    };
    fetchProject();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  const nextSlide = () => {
    if (project.slider_images) {
      setCurrentSlide((prev) => (prev + 1) % project.slider_images.length);
    }
  };

  const prevSlide = () => {
    if (project.slider_images) {
      setCurrentSlide((prev) => (prev - 1 + project.slider_images.length) % project.slider_images.length);
    }
  };

  const metrics = project.metrics || [];
  const blocks = project.content?.blocks || [];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      <SEO title={project.title} />
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
              {project.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 leading-tight">
              {project.title}
            </h1>
            
            {project.slider_images ? (
              <div className="relative group mb-12">
                <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 bg-slate-50 relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="w-full h-full"
                    >
                      <img 
                        src={project.slider_images[currentSlide].url} 
                        alt={project.slider_images[currentSlide].label}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                        <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20">
                          <Badge className={project.slider_images[currentSlide].type === 'Backend' ? 'bg-slate-900' : 'bg-blue-600'}>
                            {project.slider_images[currentSlide].type}
                          </Badge>
                          <p className="text-lg font-black text-slate-900 mt-2">{project.slider_images[currentSlide].label}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={prevSlide} className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all" aria-label="Previous slide">
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <button onClick={nextSlide} className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all" aria-label="Next slide">
                            <ChevronRight className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="flex justify-center gap-2 mt-6">
                  {project.slider_images.map((_: any, i: number) => (
                    <button 
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`w-2 h-2 rounded-full transition-all ${currentSlide === i ? 'w-8 bg-blue-600' : 'bg-slate-200'}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            ) : project.image_url && (
              <div className="rounded-[2rem] overflow-hidden shadow-2xl mb-12 border border-slate-100">
                <img src={project.image_url} alt={project.title} className="w-full h-auto" loading="lazy" />
              </div>
            )}

            {project.instagram_reels && (
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {project.instagram_reels.map((url: string, i: number) => (
                  <InstagramEmbed key={i} url={url} />
                ))}
              </div>
            )}

            {project.proof_images && (
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {project.proof_images.map((src: string, i: number) => (
                  <div key={i} className="rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 bg-white p-2">
                    <img src={src} alt={`Proof ${i + 1}`} className="w-full h-auto rounded-[1.5rem]" loading="lazy" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {metrics.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
              {metrics.map((metric: any, i: number) => (
                <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all">
                  <div className="text-blue-600 mb-3 flex justify-center">{metric.icon}</div>
                  <p className="text-3xl font-black mb-1 text-slate-900">{metric.value}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{metric.label}</p>
                </div>
              ))}
            </div>
          )}

          {project.project_info && (
            <div className="mb-20 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100">
              <h3 className="text-2xl font-black mb-8 text-slate-900">Project Info</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-2">Category:</p>
                  <p className="font-bold text-slate-700">{project.project_info.category}</p>
                </div>
                <div>
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-2">Location:</p>
                  <p className="font-bold text-slate-700">{project.project_info.location}</p>
                </div>
                {project.project_info.software && (
                  <div>
                    <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-2">Software:</p>
                    <p className="font-bold text-slate-700">{project.project_info.software}</p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-2">Dated:</p>
                  <p className="font-bold text-slate-700">{project.project_info.dated}</p>
                </div>
                <div>
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-2">Client:</p>
                  <p className="font-bold text-slate-700">{project.project_info.client}</p>
                </div>
                {project.project_info.platform && (
                  <div>
                    <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-2">Platform:</p>
                    <p className="font-bold text-slate-700">{project.project_info.platform}</p>
                  </div>
                )}
              </div>
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
                  {block.content}
                </div>
              </motion.div>
            ))}
          </div>

          <section className="py-20">
            <div className="relative p-12 md:p-20 bg-slate-900 rounded-[3.5rem] overflow-hidden text-center shadow-2xl">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight text-white">
                  {project.website_url ? "Ready to dominate your vertical?" : "Let's build your scale engine."}
                </h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {project.website_url && (
                    <a href={project.website_url} target="_blank" rel="noopener noreferrer">
                      <Button className="bg-white text-slate-900 hover:bg-slate-100 px-10 py-7 rounded-2xl text-lg font-black group">
                        Visit Website <Globe className="ml-2 w-5 h-5" />
                      </Button>
                    </a>
                  )}
                  <Link to="/contact">
                    <Button className="bg-blue-600 text-white hover:bg-blue-700 px-10 py-7 rounded-2xl text-lg font-black group">
                      Book Your Free Audit <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Button>
                  </Link>
                </div>
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