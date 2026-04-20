"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Crosshair,
  Dumbbell,
  Gauge,
  Network,
  Target,
  Trophy,
  Users,
  Zap
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import TrainingBoxersImage from '@/assets/nutrivend/training-boxers-gym.jpg?w=1800&format=webp&quality=82';
import PersonalTrainerImage from '@/assets/nutrivend/personal-trainer.jpg?w=1200&format=webp&quality=82';
import ConsumerVendingImage from '@/assets/nutrivend/consumer-paying-vending.jpg?w=1200&format=webp&quality=82';

const heroImage = TrainingBoxersImage;
const decisionImage = PersonalTrainerImage;
const vendingImage = ConsumerVendingImage;

const StatCard = ({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 text-cyan-700">
      {icon}
    </div>
    <p className="text-4xl font-black tracking-tight text-slate-950">{value}</p>
    <p className="mt-2 text-xs font-black uppercase tracking-widest text-slate-500">{label}</p>
  </div>
);

const MarketSplitChart = () => (
  <div className="rounded-2xl border border-slate-200 bg-slate-950 p-8 text-white shadow-xl">
    <div className="mb-8 flex items-center justify-between gap-4">
      <div>
        <h3 className="mt-2 text-2xl font-black">Blue Ocean Expansion</h3>
      </div>
      <Trophy className="h-10 w-10 text-cyan-300" />
    </div>
    <div className="relative mx-auto mb-8 h-64 w-64 rounded-full bg-[conic-gradient(#22d3ee_0_71%,#475569_71%_100%)] p-5 shadow-[0_0_50px_rgba(34,211,238,0.35)]">
      <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-slate-950 text-center">
        <span className="text-6xl font-black text-cyan-300">71%</span>
        <span className="mt-2 max-w-32 text-xs font-black uppercase tracking-widest text-slate-400">Untapped Market</span>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3 text-sm font-bold">
      <div className="rounded-lg bg-cyan-400/10 p-4 text-cyan-100">
        <span className="mb-2 block h-2 w-full rounded-full bg-cyan-300" />
        MMA, Rugby, Crossfit
      </div>
      <div className="rounded-lg bg-slate-700/40 p-4 text-slate-300">
        <span className="mb-2 block h-2 w-full rounded-full bg-slate-500" />
        Commercial Gyms
      </div>
    </div>
  </div>
);

const VelocityChart = () => (
  <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-8 text-center">
    <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-white text-cyan-700 shadow-sm">
      <Gauge className="h-7 w-7" />
    </div>
    <p className="mt-3 text-7xl font-black tracking-tight text-slate-950">78%</p>
    <p className="mx-auto mt-4 max-w-xs text-sm font-bold leading-relaxed text-slate-600">
      51% immediate urgency plus 27% within the current quarter.
    </p>
  </div>
);

const AccountSizeChart = () => {
  const bars = [
    { label: '1 Site', height: 'h-24', tone: 'bg-slate-300' },
    { label: '2-5 Sites', height: 'h-36', tone: 'bg-cyan-400' },
    { label: '20+ Sites', height: 'h-48', tone: 'bg-blue-600' }
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="mt-2 text-2xl font-black text-slate-950">Account Size Penetration</h3>
        </div>
        <Target className="h-8 w-8 text-blue-600" />
      </div>
      <div className="flex h-56 items-end justify-around gap-5 border-b border-slate-200 px-2">
        {bars.map((bar) => (
          <div key={bar.label} className="flex flex-1 flex-col items-center">
            {bar.label === '20+ Sites' && (
              <div className="mb-3 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                Enterprise
              </div>
            )}
            <div className={`w-full max-w-20 rounded-t-lg ${bar.height} ${bar.tone}`} />
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-black uppercase tracking-widest text-slate-500">
        {bars.map((bar) => <span key={bar.label}>{bar.label}</span>)}
      </div>
    </div>
  );
};

const NutrivendUKCaseStudy = () => {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <SEO
        title="Nutrivend UK Meta Lead Generation Case Study for B2B Fitness"
        description="How Qala Labs used Meta lead generation and A/B audience engineering to help Nutrivend UK validate untapped B2B fitness facility markets and generate 45 qualified leads in 7 days."
        image={heroImage}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Nutrivend UK Meta Lead Generation Case Study for B2B Fitness",
          description: "How Qala Labs validated untapped B2B sports facility markets for Nutrivend UK using Meta lead generation, A/B audience engineering, and lead-form qualification.",
          image: heroImage,
          author: { "@type": "Organization", name: "Qala Labs" },
          publisher: { "@type": "Organization", name: "Qala Labs" },
          mainEntityOfPage: "https://qalalabs.com/case-studies/Meta-Lead-Generation-Ad-UK-Market",
          keywords: "Meta lead generation case study, B2B lead generation UK, fitness facility leads, Meta Ads for B2B, audience testing strategy"
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Case Studies', url: '/case-studies' },
          { name: 'Nutrivend UK Meta Lead Generation', url: '/case-studies/Meta-Lead-Generation-Ad-UK-Market' }
        ]}
      />
      <Navbar />

      <main>
        <section
          className="relative flex min-h-[88vh] items-center overflow-hidden bg-slate-950 pt-28 text-white"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(2,6,23,0.88), rgba(2,6,23,0.58)), url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="mx-auto w-full max-w-7xl px-4 py-20">
            <Link to="/case-studies" className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-slate-300 transition-colors hover:text-cyan-300">
              <ArrowLeft className="h-4 w-4" /> Back to Case Studies
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl text-left md:text-center md:mx-auto">
              <Badge className="mb-6 rounded-full bg-cyan-400 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-slate-950">
                Case Study: Meta Lead Generation
              </Badge>
              <h1 className="text-4xl font-black leading-tight tracking-tight md:text-7xl">
                Validating Massive Untapped B2B Markets for Nutrivend UK.
              </h1>
              <p className="mx-auto mt-8 max-w-3xl text-lg font-medium leading-relaxed text-slate-200 md:text-xl">
                A head-to-head Meta audience engineering sprint that proved niche athletic facilities could outperform the saturated commercial gym sector.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard value="45" label="Qualified B2B Leads" icon={<Users className="h-6 w-6" />} />
            <StatCard value="71%" label="From Untapped Markets" icon={<Network className="h-6 w-6" />} />
            <StatCard value="78%" label="Short-Term Revenue Intent" icon={<Zap className="h-6 w-6" />} />
            <StatCard value="20+" label="Enterprise Site Operators" icon={<Building2 className="h-6 w-6" />} />
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-2">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-blue-600">The Overview</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                Escaping the red ocean.
              </h2>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-slate-600">
                <p><strong className="text-slate-950">Client:</strong> Nutrivend UK</p>
                <p><strong className="text-slate-950">Platform:</strong> Meta Ads Lead Generation</p>
                <p>
                  The commercial gym sector had become saturated and expensive. Nutrivend UK needed blue ocean markets with high demand, lower vendor competition, and enough urgency to justify reallocating spend.
                </p>
                <p>
                  The risk was clear: how do you test MMA academies, rugby clubs, Crossfit boxes, and leisure centres without stalling an existing B2B pipeline?
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <img src={decisionImage} alt="Nutrivend UK B2B fitness lead generation audience research with gym decision maker" className="h-full w-full object-cover" />
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-24 text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-cyan-300">The Strategy</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
                Head-to-head audience engineering.
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-slate-300">
                We deployed one universal B2B creative across two isolated Meta ad sets. The value proposition stayed constant: hassle-free operational efficiency and passive revenue. Only the audience changed.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-slate-700 bg-slate-900 text-white">
                  <CardContent className="p-6">
                    <Dumbbell className="mb-5 h-8 w-8 text-slate-400" />
                    <h3 className="text-xl font-black">AS-1: Firmographic Baseline</h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-400">
                      Gym owners, gym managers, and directors. The traditional commercial facility decision-maker set.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-cyan-400/30 bg-cyan-400/10 text-white">
                  <CardContent className="p-6">
                    <Crosshair className="mb-5 h-8 w-8 text-cyan-300" />
                    <h3 className="text-xl font-black">AS-2: Facility Expansion</h3>
                    <p className="mt-4 text-sm leading-relaxed text-cyan-50">
                      Crossfit, MMA, rugby clubs, leisure centres, and specialized athletic facility operators.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-4 rounded-2xl bg-white p-6 text-slate-950">
                <p className="text-xs font-black uppercase tracking-widest text-blue-600">Deep Intent Qualification</p>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  <div className="rounded-lg bg-slate-100 p-4 font-bold">When do you want to avail this service?</div>
                  <div className="rounded-lg bg-slate-100 p-4 font-bold">How many sites do you manage?</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <img src={vendingImage} alt="Nutrivend UK vending machine customer payment experience used in B2B Meta Ads creative" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-blue-600">The Offer</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                One value proposition, two isolated markets.
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-slate-600">
                The creative focused on operational efficiency, customer convenience, and passive facility revenue. By holding the offer constant, the test isolated the real variable: which audience had the strongest buying intent.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <p className="text-xs font-black uppercase tracking-widest text-blue-600">The Results</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                7 days to validate a new market.
              </h2>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-slate-600">
                <p>
                  The expansion campaign did not just match the core market. It eclipsed it, validating a new revenue stream for Nutrivend UK in less than a week.
                </p>
                <p>
                  The sprint generated <strong className="text-slate-950">45 highly qualified B2B leads</strong>, with <strong className="text-slate-950">71% of all acquired leads</strong> coming from the untapped AS-2 market.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <MarketSplitChart />
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 max-w-4xl">
              <p className="text-xs font-black uppercase tracking-widest text-blue-600">Pipeline Quality</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                Short sales cycle signals and high-tier account capture.
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-slate-600">
                The qualification layer showed that 51% of leads had immediate urgency and another 27% wanted service within the current quarter. Alongside single-site operators, the campaign reached decision-makers managing 2 to 5 sites and enterprise operators managing 20+ locations.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <BarChart3 className="mb-6 h-9 w-9 text-blue-600" />
                <h3 className="text-2xl font-black text-slate-950">What the data proved</h3>
                <ul className="mt-6 space-y-4 text-sm font-bold text-slate-600">
                  <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-600" /> Niche sporting facilities were underserved.</li>
                  <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-600" /> Lead urgency defied long B2B sales-cycle assumptions.</li>
                  <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-600" /> Multi-site and enterprise accounts were reachable through Meta.</li>
                </ul>
              </div>
              <VelocityChart />
              <AccountSizeChart />
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10">
              <h2 className="text-3xl font-black text-slate-950">B2B Meta Lead Generation FAQ</h2>
              <div className="mt-8 space-y-6">
                {[
                  ["Can Meta Ads generate qualified B2B leads?", "Yes, when targeting is paired with qualification questions that capture urgency, site count, and decision-maker fit."],
                  ["Why test niche sports facilities against commercial gyms?", "The gym market was saturated. MMA, rugby, Crossfit, and leisure facilities offered a cleaner test for blue ocean demand."],
                  ["What made the Nutrivend campaign scalable?", "The campaign reached both single-site operators and multi-site decision-makers, including enterprise-level accounts managing 20+ locations."]
                ].map(([question, answer]) => (
                  <div key={question}>
                    <h3 className="font-black text-slate-950">{question}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{answer}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
              <h2 className="text-3xl font-black text-slate-950">Share This Case Study</h2>
              <p className="mt-6 text-slate-600 leading-relaxed">
                Use this page as the canonical source for Nutrivend UK's B2B audience validation sprint when sharing results with founders, sales teams, LinkedIn audiences, and partner networks.
              </p>
              <div className="mt-8 space-y-3 text-sm font-bold">
                <Link to="/services/performance" className="block text-blue-600 hover:underline">Explore Meta Ads and performance marketing services</Link>
                <Link to="/case-studies/Trotr-Meta-Lead-Generation" className="block text-blue-600 hover:underline">Read another Meta lead generation case study</Link>
                <Link to="/contact" className="block text-blue-600 hover:underline">Book a B2B lead generation audit</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="rounded-2xl bg-slate-950 p-10 text-white shadow-2xl md:p-16">
              <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <h2 className="text-4xl font-black tracking-tight md:text-6xl">
                    Ready to find your next blue ocean?
                  </h2>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                    We design audience tests that reduce risk, qualify buyer intent, and convert market curiosity into a measurable sales pipeline.
                  </p>
                </div>
                <Link to="/contact" className="lg:justify-self-end">
                  <Button className="w-full rounded-lg bg-cyan-400 px-10 py-8 text-lg font-black text-slate-950 hover:bg-cyan-300 lg:w-auto">
                    Book a Growth Audit <ArrowRight className="ml-2 h-5 w-5" />
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

export default NutrivendUKCaseStudy;
