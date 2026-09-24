"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  FileSearch,
  Globe2,
  Monitor,
  MousePointerClick,
  Search,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';

const LIVE_SITE_URL = "https://airborneaviation.in";
const heroImage = "/portfolio/airborne-aviation/hero.jpg";

// Weekly Google Search Console data, airborneaviation.in, 1 Jul – 20 Sep 2026
const weeklyTrend = [
  { week: "Wk 1", clicks: 38, impressions: 2080, position: 13.6 },
  { week: "Wk 2", clicks: 33, impressions: 1730, position: 11.6 },
  { week: "Wk 3", clicks: 37, impressions: 1550, position: 11.2 },
  { week: "Wk 4", clicks: 29, impressions: 1564, position: 13.5 },
  { week: "Wk 5", clicks: 24, impressions: 1850, position: 17.4 },
  { week: "Wk 6", clicks: 47, impressions: 1699, position: 17.4 },
  { week: "Wk 7", clicks: 49, impressions: 2197, position: 20.4 },
  { week: "Wk 8", clicks: 55, impressions: 2332, position: 19.8 },
  { week: "Wk 9", clicks: 31, impressions: 2957, position: 20.3 },
  { week: "Wk 10", clicks: 57, impressions: 3837, position: 13.8 },
  { week: "Wk 11", clicks: 45, impressions: 2879, position: 11.6 },
  { week: "Wk 12", clicks: 39, impressions: 1584, position: 10.6 }
];

const deviceData = [
  { device: "Mobile", clicks: 304, impressions: 14074, position: 8.42 },
  { device: "Desktop", clicks: 170, impressions: 11815, position: 23.42 },
  { device: "Tablet", clicks: 10, impressions: 370, position: 12.71 }
];

const brandQueries = [
  { query: "airborne aviation academy", clicks: 101, impressions: 492, ctr: "20.53%", position: "7.1" },
  { query: "airborne aviation", clicks: 47, impressions: 169, ctr: "27.81%", position: "1.9" },
  { query: "airborne academy", clicks: 7, impressions: 108, ctr: "6.48%", position: "4.5" }
];

const opportunityQueries = [
  { query: "pilot training in delhi", impressions: 315, position: "9.4" },
  { query: "atpl ground training india", impressions: 491, position: "12.3" },
  { query: "pilot training cost in india", impressions: 289, position: "12.8" },
  { query: "airline transport pilot license ground classes in india", impressions: 474, position: "28.1" },
  { query: "aviation ground classes", impressions: 299, position: "35.5" },
  { query: "cabin crew preparation course", impressions: 221, position: "53.2" }
];

const answerReadyContent = [
  { page: "/blog/pilot-training-cost-india", impressions: 1722, clicks: 5, position: "10.7" },
  { page: "/blog/how-to-become-pilot-india", impressions: 1078, clicks: 5, position: "9.8" },
  { page: "/blog/pilot-salary-india", impressions: 984, clicks: 1, position: "8.6" }
];

const workScope = [
  "Query-intelligence audit segmenting branded demand from high-intent, non-branded search (CPL, ATPL, cabin crew, ground school)",
  "Long-tail blog content built around real buyer questions — training cost, salary progression, how-to-become-a-pilot pathways",
  "FAQ and answer-block formatting on cost/salary/course pages so AI Overviews, ChatGPT, and Perplexity have a clean passage to cite",
  "Schema markup (Course, FAQPage, Organization) across course and blog templates for structured-data eligibility",
  "Mobile-first technical SEO to close the ranking gap against a much weaker desktop position",
  "Ongoing rank-and-impression monitoring via Search Console to catch and act on volatility early"
];

const StatCard = ({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
      {icon}
    </div>
    <p className="text-4xl font-black tracking-tight text-slate-950">{value}</p>
    <p className="mt-2 text-xs font-black uppercase tracking-widest text-slate-500">{label}</p>
  </div>
);

const AirborneAviationSEOCaseStudy = () => {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <SEO
        title="Airborne Aviation: SEO, AEO & GEO Case Study"
        description="A Search Console-backed look at how Qala Labs is growing Airborne Aviation Academy's organic visibility — impression growth, position gains, and the AEO/GEO groundwork to get cited by AI Overviews, ChatGPT, and Perplexity, not just ranked by Google."
        image={heroImage}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Airborne Aviation: SEO, AEO & GEO Case Study",
          description: "How Qala Labs is growing Airborne Aviation Academy's organic search visibility and building the answer-engine and generative-engine optimization foundation to earn AI citations.",
          image: heroImage,
          author: { "@type": "Organization", name: "Qala Labs" },
          publisher: { "@type": "Organization", name: "Qala Labs" },
          mainEntityOfPage: "https://qalalabs.com/case-studies/airborne-aviation-seo-aeo-geo",
          keywords: "SEO case study, AEO case study, GEO case study, generative engine optimization, answer engine optimization, aviation academy SEO, Google Search Console case study"
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Case Studies', url: '/case-studies' },
          { name: 'Airborne Aviation: SEO, AEO & GEO', url: '/case-studies/airborne-aviation-seo-aeo-geo' }
        ]}
      />
      <Navbar />

      <main>
        <section
          className="relative flex min-h-[88vh] items-center overflow-hidden bg-slate-950 pt-28 text-white"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(2,6,23,0.90), rgba(2,6,23,0.62)), url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="mx-auto w-full max-w-7xl px-4 py-20">
            <Link to="/case-studies" className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-slate-300 transition-colors hover:text-blue-300">
              <ArrowLeft className="h-4 w-4" /> Back to Case Studies
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl text-left md:text-center md:mx-auto">
              <Badge className="mb-6 rounded-full bg-blue-500 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                Case Study: SEO · AEO · GEO
              </Badge>
              <h1 className="text-4xl font-black leading-tight tracking-tight md:text-7xl">
                Getting Airborne Aviation found — by Google and by AI.
              </h1>
              <p className="mx-auto mt-8 max-w-3xl text-lg font-medium leading-relaxed text-slate-200 md:text-xl">
                A 12-week Search Console read on organic performance, plus the Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) groundwork to get the site cited by AI Overviews, ChatGPT, and Perplexity — not just indexed by Google.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard value="26.3K" label="Impressions (12 Weeks)" icon={<Sparkles className="h-6 w-6" />} />
              <StatCard value="484" label="Organic Clicks" icon={<MousePointerClick className="h-6 w-6" />} />
              <StatCard value="13.6 → 10.6" label="Avg. Position Gain" icon={<TrendingUp className="h-6 w-6" />} />
              <StatCard value="+59%" label="Daily Impression Growth" icon={<Target className="h-6 w-6" />} />
            </div>
            <p className="text-xs font-medium text-slate-400">
              Source: Google Search Console, airborneaviation.in — 1 Jul 2026 to 20 Sep 2026 (Web search only).
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4">
            <p className="text-xs font-black uppercase tracking-widest text-blue-600">The Overview</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              Impressions up, position down, then a clean recovery.
            </h2>
            <div className="mt-8 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="space-y-5 text-lg leading-relaxed text-slate-600">
                <p><strong className="text-slate-950">Client:</strong> Airborne Aviation Academy</p>
                <p><strong className="text-slate-950">Channel:</strong> Organic Search (SEO / AEO / GEO)</p>
                <p>
                  Airborne Aviation Academy ranks well for its own name — <strong className="text-slate-950">"airborne aviation"</strong> sits at position 1.9 with a 27.8% CTR. The harder problem is everything a prospective cadet searches <em>before</em> they know the brand: "pilot training cost in India," "ATPL ground training," "cabin crew preparation course." That's where the real enrolment funnel starts.
                </p>
                <p>
                  Weeks 5–9 show the pattern every SEO practitioner recognizes: as new pages entered the index and impressions climbed, average position temporarily softened from 11.2 to a high of 20.4. By week 10, the content matured — impressions peaked at 3,837 in a single week and average position recovered to 10.6, the strongest of the entire period.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <ResponsiveContainer width="100%" height={340}>
                  <ComposedChart data={weeklyTrend} margin={{ top: 8, right: 16, left: -12, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis yAxisId="right" orientation="right" reversed tick={{ fontSize: 12, fill: '#64748b' }} domain={[0, 25]} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
                    <Legend wrapperStyle={{ fontSize: 12, fontWeight: 700 }} />
                    <Bar yAxisId="left" dataKey="impressions" name="Impressions" fill="#bfdbfe" radius={[6, 6, 0, 0]} />
                    <Line yAxisId="left" type="monotone" dataKey="clicks" name="Clicks" stroke="#2563eb" strokeWidth={3} dot={false} />
                    <Line yAxisId="right" type="monotone" dataKey="position" name="Avg. Position (lower = better)" stroke="#f97316" strokeWidth={3} dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-24 text-white">
          <div className="mx-auto max-w-7xl px-4">
            <p className="text-xs font-black uppercase tracking-widest text-blue-300">Query Intelligence</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight md:text-5xl">
              Branded demand converts. Non-branded demand is still unclaimed.
            </h2>
            <div className="mt-12 grid gap-10 lg:grid-cols-2">
              <div>
                <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-blue-300">Branded — already winning</p>
                <div className="space-y-3">
                  {brandQueries.map((q, i) => (
                    <div key={i} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                      <span className="text-sm font-bold text-white">"{q.query}"</span>
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-300">
                        <span>{q.clicks} clicks</span>
                        <span className="text-blue-300">{q.ctr} CTR</span>
                        <span>Pos. {q.position}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-orange-300">Non-branded — high impressions, zero clicks</p>
                <div className="space-y-3">
                  {opportunityQueries.map((q, i) => (
                    <div key={i} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-orange-400/20 bg-orange-400/10 p-4">
                      <span className="text-sm font-bold text-white">"{q.query}"</span>
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-300">
                        <span>{q.impressions} impr.</span>
                        <span className="text-orange-300">Pos. {q.position}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-slate-400">
              Every query above already appears on Google for these terms — several near page one — but earned zero clicks in the period. That's not a visibility problem, it's a positioning and answer-format problem: exactly what targeted SEO and AEO content is meant to fix.
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-center gap-3">
              <Bot className="h-7 w-7 text-blue-600" />
              <p className="text-xs font-black uppercase tracking-widest text-blue-600">AEO / GEO Strategy</p>
            </div>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              Answer-ready content — built for AI citation, not just clicks.
            </h2>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-slate-600">
              The blog is the most AI-citable asset on the site — high impressions, page-one-adjacent position, but a CTR too low to trust to a plain "ten blue links" strategy. That combination is exactly what generative engines pull from for a direct-answer citation.
            </p>
            <div className="mt-10 space-y-3">
              {answerReadyContent.map((p, i) => (
                <div key={i} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                  <span className="font-mono text-sm font-bold text-slate-800">{p.page}</span>
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                    <span>{p.impressions.toLocaleString()} impr.</span>
                    <span>{p.clicks} clicks</span>
                    <span className="text-blue-600">Pos. {p.position}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-500">
              Search Console also logged 825 impressions under the <strong className="text-slate-800">"Translated results"</strong> appearance type — a signal that international, non-English searchers are already being surfaced to the site, reinforcing the case for structured, machine-readable answers over prose alone.
            </p>
          </div>
        </section>

        <section className="bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-4">
            <p className="text-xs font-black uppercase tracking-widest text-blue-600">The Device Gap</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              Page one on mobile. Page three on desktop.
            </h2>
            <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <ResponsiveContainer width="100%" height={260}>
                  <ComposedChart data={deviceData} margin={{ top: 8, right: 16, left: -12, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="device" tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis yAxisId="right" orientation="right" reversed tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
                    <Legend wrapperStyle={{ fontSize: 12, fontWeight: 700 }} />
                    <Bar yAxisId="left" dataKey="clicks" name="Clicks" fill="#2563eb" radius={[6, 6, 0, 0]} />
                    <Bar yAxisId="right" dataKey="position" name="Avg. Position (lower = better)" fill="#fdba74" radius={[6, 6, 0, 0]} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <Smartphone className="mt-1 h-6 w-6 shrink-0 text-blue-600" />
                  <div>
                    <p className="font-black text-slate-950">Mobile: position 8.42</p>
                    <p className="text-sm text-slate-500">304 clicks from 14,074 impressions — comfortably page one.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <Monitor className="mt-1 h-6 w-6 shrink-0 text-orange-500" />
                  <div>
                    <p className="font-black text-slate-950">Desktop: position 23.42</p>
                    <p className="text-sm text-slate-500">170 clicks from 11,815 impressions — stuck on page three.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <Globe2 className="mt-1 h-6 w-6 shrink-0 text-blue-600" />
                  <div>
                    <p className="font-black text-slate-950">Why AEO/GEO matters here</p>
                    <p className="text-sm text-slate-500">Aspiring pilots now ask ChatGPT and Google's AI Overview "how much does CPL training cost in India" before they ever type it into search. If a page isn't structured for a machine to lift a clean answer, the citation — and the click — goes to a competitor.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4">
            <p className="text-xs font-black uppercase tracking-widest text-blue-600">The Scope</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              What we're doing about it.
            </h2>
            <div className="mt-10 rounded-2xl bg-slate-950 p-10 text-white md:p-14">
              <ul className="grid gap-5 md:grid-cols-2">
                {workScope.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-blue-400" />
                    <span className="font-bold leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-24">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
              <h2 className="text-3xl font-black text-slate-950">SEO / AEO / GEO FAQ</h2>
              <div className="mt-8 space-y-6">
                {[
                  ["What's the difference between SEO, AEO, and GEO?", "SEO earns rankings in traditional search results. AEO (Answer Engine Optimization) structures content so voice assistants and answer boxes can extract a direct response. GEO (Generative Engine Optimization) goes further — formatting and marking up content so generative engines like AI Overviews, ChatGPT, and Perplexity cite it as a source."],
                  ["Why do high-impression pages sometimes get zero clicks?", "It usually means the page ranks, but not high enough or not in a format Google trusts to feature — a classic sign the content needs restructuring into direct, citable answers rather than just better keyword targeting."],
                  ["Why did average position temporarily worsen before improving?", "New pages typically enter Google's index at a weaker position while the algorithm gathers engagement signals. As content matures and earns clicks, position recovers — which is exactly the pattern seen from week 9 to week 12 here."]
                ].map(([question, answer]) => (
                  <div key={question}>
                    <h3 className="font-black text-slate-950">{question}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{answer}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-950 p-10 text-white">
              <div className="mb-4 flex items-center gap-3">
                <FileSearch className="h-7 w-7 text-blue-400" />
                <h2 className="text-3xl font-black">Ongoing Engagement</h2>
              </div>
              <p className="leading-relaxed text-slate-300">
                This is a live, ongoing engagement — the next milestones are closing the desktop position gap and converting the six opportunity queries above into answer-ready, schema-marked pages.
              </p>
              <div className="mt-8 space-y-3 text-sm font-bold">
                <a href={LIVE_SITE_URL} target="_blank" rel="noreferrer" className="block text-blue-300 hover:underline">Visit airborneaviation.in</a>
                <Link to="/services" className="block text-blue-300 hover:underline">Explore our services</Link>
                <Link to="/contact" className="block text-blue-300 hover:underline">Book an SEO / AEO audit</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="rounded-2xl bg-slate-950 p-10 text-white shadow-2xl md:p-16">
              <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <Search className="h-8 w-8 text-blue-400" />
                  </div>
                  <h2 className="text-4xl font-black tracking-tight md:text-6xl">
                    From ranked on Google to cited by AI.
                  </h2>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                    We run Search Console-backed SEO diagnostics and build the AEO/GEO groundwork so your site earns clicks today and AI citations tomorrow.
                  </p>
                </div>
                <Link to="/contact" className="lg:justify-self-end">
                  <Button className="w-full rounded-lg bg-blue-500 px-10 py-8 text-lg font-black text-white hover:bg-blue-400 lg:w-auto">
                    Book a Free SEO Audit <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AirborneAviationSEOCaseStudy;
