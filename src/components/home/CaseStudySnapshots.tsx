"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import ProjectCard from '../portfolio/ProjectCard';
import StatusChip from '@/components/ui/status-chip';
import { CaseStudyCardSkeleton } from '@/components/ui/skeleton';
import GaffarLogo from '@/assets/gaffar-new-logo.webp';
import NutrivendThumbnail from '@/assets/nutrivend/training-boxers-gym.jpg?w=900&format=webp&quality=82';
import TrotrFeatured from '@/assets/trotr-featured.jpeg?w=900&format=webp&quality=82';
import KashmirFeatured from '@/assets/kashmir-street-musician.jpg?w=900&format=webp&quality=82';

const CLIENT_LOGOS = [
  { src: "/clients/special-olympics.webp", alt: "Special Olympics" },
  { src: "/clients/human-race.png", alt: "Human Race" },
  { src: "/clients/usaid.png", alt: "USAID" },
  { src: "/clients/chrono-seconds.png", alt: "Chrono Seconds" },
  { src: "/clients/cybint.png", alt: "Cybint" },
  { src: "/clients/inkclick.png", alt: "Inkclick" },
  { src: "/clients/super-teacher.png", alt: "Super Teacher" },
  { src: "/clients/recomm.png", alt: "Recomm" },
  { src: "/clients/playr-white.png", alt: "playR" },
  { src: "/clients/wwf.png", alt: "WWF" },
  { src: "/clients/shruum.png", alt: "Shruum" },
];

const FEATURED_STUDIES = [
  {
    id: 'nutrivend-uk-meta-lead-gen',
    title: "Nutrivend UK: B2B Market Validation",
    slug: "Meta-Lead-Generation-Ad-UK-Market",
    category: "Meta Lead Generation",
    result: "45 B2B Leads • 71% Untapped Market",
    image: NutrivendThumbnail,
    imageClassName: "object-center",
    imageAlt: "Nutrivend UK Meta lead generation case study thumbnail showing boxing gym audience validation"
  },
  {
    id: 'trotr-featured',
    title: "Trotr: Spain Pivot",
    slug: "Trotr-Meta-Lead-Generation",
    category: "Lead Generation",
    result: "28x ROAS • ₹14L Revenue",
    image: TrotrFeatured,
    imageClassName: "object-center",
    imageAlt: "Trotr Meta lead generation case study thumbnail showing Spain travel campaign audience"
  },
  {
    id: 'gaffar-featured',
    title: "Gaffar India",
    slug: "gaffar-india-rebrand",
    category: "Brand Identity",
    result: "Marketplace Rebrand",
    image: GaffarLogo,
    isLogo: true
  },
  {
    id: 'kashmiri-featured',
    title: "Kashmiri Sound",
    slug: "kashmiri-movement",
    category: "Cultural Movement",
    result: "Zero Ad Spend • 25K Subs",
    image: KashmirFeatured,
    imageClassName: "object-center",
    imageAlt: "Kashmiri music organic growth case study thumbnail showing a traditional street musician"
  }
];

const FEATURED_SLUGS = new Set(FEATURED_STUDIES.map(s => s.slug));

const CaseStudySnapshots = () => {
  const [additionalStudies, setAdditionalStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const duplicatedLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  useEffect(() => {
    const fetchStudies = async () => {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(8);

      if (!error && data) {
        const extra = data
          .filter(s => !FEATURED_SLUGS.has(s.slug))
          .map(s => ({
            ...s,
            result: s.results?.headline || "View Results",
            image: s.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
          }));
        setAdditionalStudies(extra);
      }
      setLoading(false);
    };
    fetchStudies();
  }, []);

  return (
    <>
      <section className="py-20 bg-white dark:bg-slate-950 border-y border-slate-50 dark:border-slate-900 overflow-hidden transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <div className="text-center">
            <h2 className="text-[#94a3b8] dark:text-slate-500 text-[11px] font-black uppercase tracking-[0.4em] mb-4">
              Strategic Partnerships
            </h2>
            <div className="h-px w-12 bg-blue-600/20 mx-auto" />
          </div>
        </div>

        <div className="relative flex">
          <motion.div
            className="flex whitespace-nowrap gap-20 md:gap-32 items-center py-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 35,
              repeat: Infinity
            }}
          >
            {duplicatedLogos.map((logo, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center group shrink-0 px-4"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  width={160}
                  height={64}
                  loading="lazy"
                  className="h-12 md:h-16 w-auto object-contain transition-all duration-500 filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                />
              </div>
            ))}
          </motion.div>

          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white dark:from-slate-950 via-white/80 dark:via-slate-950/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white dark:from-slate-950 via-white/80 dark:via-slate-950/80 to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      <section className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <StatusChip label="Live portfolio" className="mb-4" />
              <h2 className="text-sm font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] mb-4">
                Case study snapshots
              </h2>
              <h3 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
                Proven Results.
              </h3>
            </div>
            <a href="/case-studies">
              <Button variant="outline" className="rounded-2xl px-8 py-6 font-black border-2 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-white group">
                View All Work <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-8">
            {FEATURED_STUDIES.map((study, idx) => (
              <div key={study.id} className={idx === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}>
                <ProjectCard
                  project={study}
                  featured={idx === 0}
                  onClick={() => navigate(`/case-studies/${study.slug}`)}
                />
              </div>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              {Array.from({ length: 4 }).map((_, i) => <CaseStudyCardSkeleton key={i} />)}
            </div>
          ) : additionalStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              {additionalStudies.map((study) => (
                <ProjectCard
                  key={study.id || study.slug}
                  project={study}
                  onClick={() => navigate(`/case-studies/${study.slug}`)}
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default CaseStudySnapshots;
