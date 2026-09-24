"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion } from 'framer-motion';
import {
  Plane,
  GraduationCap,
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Gauge,
  MapPinned,
  BookOpenCheck,
  BarChart3,
  UsersRound,
  LayoutList,
  ExternalLink,
  Lock
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';

const LIVE_SITE_URL = "https://airborneaviation.in";

const AirborneAviationPortfolio = () => {
  const metrics = [
    { label: "Programs Listed", value: "12+", icon: <BookOpenCheck className="w-6 h-6" /> },
    { label: "Years of Legacy", value: "15+", icon: <GraduationCap className="w-6 h-6" /> },
    { label: "Alumni Airlines", value: "12+", icon: <Plane className="w-6 h-6" /> },
    { label: "Route Map Cities", value: "18+", icon: <MapPinned className="w-6 h-6" /> }
  ];

  const features = [
    {
      icon: <LayoutList className="w-6 h-6" />,
      title: "Full Course Catalog",
      description: "Structured listings for CPL, ATPL, cadet prep, A320 simulator training, cabin crew, and interview-prep programs — each with duration, fee, and a dedicated detail page."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Industry Outlook Data Viz",
      description: "Custom charts translating pilot-supply forecasts and salary progression (JFO to Captain) into a scroll-driven narrative that builds urgency to enrol."
    },
    {
      icon: <MapPinned className="w-6 h-6" />,
      title: "Interactive Alumni Route Map",
      description: "A flight-route visualization connecting the Dwarka campus to the airlines and cities where graduates now fly — IndiGo, Emirates, Lufthansa, Singapore Airlines, and more."
    },
    {
      icon: <UsersRound className="w-6 h-6" />,
      title: "Alumni Wall & Mentor Profile",
      description: "A credibility-first \"Wall\" of named alumni with batch codes and airline placements, plus a dedicated profile section for Chief Instructor Capt. Navrang Singh."
    },
    {
      icon: <Gauge className="w-6 h-6" />,
      title: "Cockpit-Themed Hero",
      description: "An aviation-instrument-inspired hero (altitude, heading, speed readouts) with animated counters for years mentoring, DGCA pass rate, and students placed."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Parent-Facing Trust Section",
      description: "A dedicated section addressing parents directly — smart attendance alerts, weekly performance reports, and education loan support via banking partners."
    }
  ];

  const snapshots = [
    {
      image: "/portfolio/airborne-aviation/hero.jpg",
      label: "Cockpit-Themed Hero",
      caption: "Full-bleed cockpit hero with live flight-instrument readouts and animated legacy counters."
    },
    {
      image: "/portfolio/airborne-aviation/simulator.webp",
      label: "A320 Simulator Program",
      caption: "Dedicated program media showcasing the in-house Airbus A320 FTD Level 5 simulator."
    },
    {
      image: "/portfolio/airborne-aviation/classroom.webp",
      label: "Interactive Classroom",
      caption: "Campus gallery highlighting mentor-led, smart-screen classroom training."
    },
    {
      image: "/portfolio/airborne-aviation/campus.jpg",
      label: "Dwarka Training Campus",
      caption: "5,000 sq ft purpose-built facility showcase used across the campus tour section."
    },
    {
      image: "/portfolio/airborne-aviation/reception.jpg",
      label: "Admissions & Reception",
      caption: "Reception and counselling-desk photography supporting the trust-building narrative."
    },
    {
      image: "/portfolio/airborne-aviation/og.jpg",
      label: "Campus Overview",
      caption: "Wide campus shot used for social sharing and the ambience-tour gallery."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      <SEO
        title="Airborne Aviation: DGCA Pilot Academy Website | Qala Labs"
        description="How Qala Labs designed and built Airborne Aviation Academy's website — a course-catalog-driven CPL/ATPL ground school platform with interactive route maps, industry data visualizations, and an alumni-led trust narrative."
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Portfolio', url: '/portfolio' },
          { name: 'Airborne Aviation Academy', url: '/portfolio/airborne-aviation-academy' }
        ]}
      />
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <Badge className="bg-blue-600 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
              Website Design & Development
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              Airborne Aviation: <span className="text-blue-600">From Classroom</span> to Cockpit.
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-3xl">
              We designed and built the digital home for Airborne Aviation Academy — Delhi's DGCA-complied CPL & ATPL ground school. A course-catalog-driven site built to turn aspiring pilots and their parents into enrolled students.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href={LIVE_SITE_URL} target="_blank" rel="noreferrer">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-6 rounded-2xl shadow-lg shadow-blue-500/20 text-base">
                  View Website <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </a>
              <Link to="/contact">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 font-black px-8 py-6 rounded-2xl text-base">
                  Start Your Project <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 text-center hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all group"
              >
                <div className="text-blue-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">{metric.icon}</div>
                <p className="text-3xl font-black mb-1 text-slate-900">{metric.value}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Website Showcase */}
          <section className="mb-24">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
              <div>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Live Preview</p>
                <h2 className="text-3xl font-black text-slate-900">What We Shipped</h2>
              </div>
              <a href={LIVE_SITE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors">
                airborneaviation.in <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Browser chrome mockup of the live homepage */}
            <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200 bg-slate-100 mb-10">
              <div className="flex items-center gap-2 px-5 py-3 bg-slate-200/80 border-b border-slate-300">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <div className="ml-4 flex-1 flex items-center gap-2 bg-white rounded-lg px-4 py-1.5 text-xs text-slate-500 font-medium">
                  <Lock className="w-3 h-3 text-slate-400" /> airborneaviation.in
                </div>
              </div>
              <a href={LIVE_SITE_URL} target="_blank" rel="noreferrer" className="block group relative overflow-hidden">
                <img
                  src="/portfolio/airborne-aviation/hero.jpg"
                  alt="Airborne Aviation Academy website homepage hero built by Qala Labs"
                  className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-slate-900 font-black px-6 py-3 rounded-xl shadow-xl flex items-center gap-2">
                    Visit Live Site <ExternalLink className="w-4 h-4" />
                  </span>
                </div>
              </a>
            </div>

            {/* Section snapshot grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {snapshots.slice(1).map((shot, i) => (
                <motion.a
                  key={i}
                  href={LIVE_SITE_URL}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all bg-slate-50"
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={shot.image}
                      alt={`${shot.label} — Airborne Aviation website section built by Qala Labs`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <p className="font-black text-slate-900 mb-1">{shot.label}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">{shot.caption}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </section>

          <section className="grid lg:grid-cols-3 gap-16 mb-24">
            <div className="lg:col-span-2 space-y-16">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">The Brief</h2>
                <div className="text-lg text-slate-600 leading-relaxed space-y-6">
                  <p>
                    Airborne Aviation Academy has spent 15 years training pilots under Capt. Navrang Singh in Dwarka, Delhi — but a founder-led, mentor-driven training system needs a site that earns the same trust a walk-through of the campus does. The brief was to translate a real, disciplined ground school into a site that doesn't feel like a brochure.
                  </p>
                  <p>
                    That meant a full program catalog (CPL, ATPL, cadet prep, simulator training, cabin crew, interview coaching) with transparent duration and fee information, an industry-outlook section built on real aviation-hiring forecasts, and a proof layer — named alumni, their batch codes, and the airlines they now fly for.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {features.map((feature, i) => (
                  <Card key={i} className="border-none shadow-sm bg-slate-50 rounded-3xl overflow-hidden">
                    <CardHeader className="p-8 pb-0">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-4 shadow-sm">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-4">
                      <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="p-10 bg-slate-900 rounded-[3rem] text-white">
                <h3 className="text-2xl font-black mb-8 text-blue-400">Build Scope</h3>
                <ul className="space-y-4">
                  {[
                    "12+ program pages with duration, fee, and enrolment CTAs",
                    "Scroll-driven industry outlook section with custom pilot-supply and salary charts",
                    "Interactive route map linking the Dwarka campus to alumni airline placements",
                    "Alumni wall, mentor profile, and campus gallery for trust-building",
                    "FAQ, admissions, and parent-facing trust sections (attendance alerts, loan support)",
                    "DGCA-compliant, mobile-first, SEO-structured build"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0" />
                      <span className="font-bold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <Card className="border-none shadow-sm rounded-[2.5rem] bg-slate-50 p-8">
                <h3 className="text-xl font-black mb-6 text-slate-900">Project Info</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Category</p>
                    <p className="font-bold text-slate-700">Aviation Education / Web Dev</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Location</p>
                    <p className="font-bold text-slate-700">Dwarka, Delhi, India</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Scope</p>
                    <p className="font-bold text-slate-700">UI/UX Design, Frontend Build, SEO</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Client</p>
                    <p className="font-bold text-slate-700">Airborne Aviation Academy</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Live Site</p>
                    <a href={LIVE_SITE_URL} target="_blank" rel="noreferrer" className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5">
                      airborneaviation.in <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </Card>

              <div className="p-8 bg-blue-600 rounded-[2.5rem] text-white text-center">
                <h4 className="text-xl font-black mb-4">Need a site that converts serious inquiries?</h4>
                <Link to="/contact">
                  <Button className="w-full bg-white text-blue-600 hover:bg-slate-100 rounded-xl font-black border-none">
                    Book Free Audit <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="p-12 md:p-16 bg-slate-900 rounded-[3rem] text-white text-center">
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">See It Live</p>
            <h3 className="text-3xl md:text-4xl font-black mb-6">Explore the full Airborne Aviation website.</h3>
            <p className="text-slate-400 max-w-xl mx-auto mb-8">
              Every section shown here is live on their production site — course pages, the route map, and the mentor profile included.
            </p>
            <a href={LIVE_SITE_URL} target="_blank" rel="noreferrer">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-black px-10 py-6 rounded-2xl shadow-lg shadow-blue-500/20 text-base">
                View Website <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AirborneAviationPortfolio;
