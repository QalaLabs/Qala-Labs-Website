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
  LayoutList
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';

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

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-sky-100">
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
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-slate-500 hover:text-sky-600 font-bold mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <Badge className="bg-sky-600 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
              Website Design & Development
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              Airborne Aviation: <span className="text-sky-600">From Classroom</span> to Cockpit.
            </h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl">
              We designed and built the digital home for Airborne Aviation Academy — Delhi's DGCA-complied CPL & ATPL ground school. A course-catalog-driven site built to turn aspiring pilots and their parents into enrolled students.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 text-center hover:bg-white hover:shadow-xl hover:border-sky-100 transition-all group"
              >
                <div className="text-sky-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">{metric.icon}</div>
                <p className="text-3xl font-black mb-1 text-slate-900">{metric.value}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{metric.label}</p>
              </motion.div>
            ))}
          </div>

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
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-sky-600 mb-4 shadow-sm">
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
                <h3 className="text-2xl font-black mb-8 text-sky-400">Build Scope</h3>
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
                      <CheckCircle2 className="w-6 h-6 text-sky-400 shrink-0" />
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
                    <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest mb-1">Category</p>
                    <p className="font-bold text-slate-700">Aviation Education / Web Dev</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest mb-1">Location</p>
                    <p className="font-bold text-slate-700">Dwarka, Delhi, India</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest mb-1">Scope</p>
                    <p className="font-bold text-slate-700">UI/UX Design, Frontend Build, SEO</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest mb-1">Client</p>
                    <p className="font-bold text-slate-700">Airborne Aviation Academy</p>
                  </div>
                </div>
              </Card>

              <div className="p-8 bg-sky-600 rounded-[2.5rem] text-white text-center">
                <h4 className="text-xl font-black mb-4">Need a site that converts serious inquiries?</h4>
                <Link to="/contact">
                  <Button className="w-full bg-white text-sky-600 hover:bg-slate-100 rounded-xl font-black border-none">
                    Book Free Audit <ArrowRight className="ml-2 w-4 h-4" />
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

export default AirborneAviationPortfolio;
