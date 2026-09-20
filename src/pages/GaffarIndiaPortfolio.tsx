"use client";

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Store,
  Users,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Search,
  Globe,
  ShieldCheck,
  Zap,
  Smartphone,
  Monitor,
  Lock,
  Unlock,
  ExternalLink,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Package,
  Boxes,
  Truck,
  Sparkles,
  MessageCircle,
  Clock,
  Layers,
  BarChart3,
  Check
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from '@/utils/toast';

const LIVE_TARGET_URL = "http://gaffarindia.com/";

// Curated interactive items mirroring gaffarindia.com & the video ad
const DEMO_PRODUCTS = [
  {
    id: 1,
    title: "360 Rotating Magnetic Stand Case for Galaxy Z Fold",
    category: "Galaxy Z Series",
    price: "₹1,633",
    mrp: "₹6,802",
    discount: "76% OFF",
    tag: "Super Deal",
    badge: "Bestseller",
    image: "/portfolio/gaffar-india/catalog-thumb.jpg"
  },
  {
    id: 2,
    title: "EAOR 4G LTE Waterproof Rugged Walkie Talkie Phone",
    category: "Walkie Talkie",
    price: "₹6,631",
    mrp: "₹21,502",
    discount: "69% OFF",
    tag: "Hot Deal",
    badge: "Direct Market",
    image: "/portfolio/gaffar-india/hero-thumb.jpg"
  },
  {
    id: 3,
    title: "S25 Ultra Mini 4G Smartphone 2GB/16GB Dual SIM",
    category: "Mini Phones",
    price: "₹6,686",
    mrp: "₹11,234",
    discount: "40% OFF",
    tag: "Trending",
    badge: "Wholesale Ready",
    image: "/portfolio/gaffar-india/ad-thumb-1.jpg"
  },
  {
    id: 4,
    title: "28cm Anime Portgas D Ace Action Figurine PVC",
    category: "Action Figures",
    price: "₹1,633",
    mrp: "₹6,802",
    discount: "76% OFF",
    tag: "Super Deal",
    badge: "Verified Seller",
    image: "/portfolio/gaffar-india/catalog-thumb.jpg"
  }
];

const GaffarIndiaPortfolio = () => {
  const [previewType, setPreviewType] = useState<'iframe' | 'simulator'>('iframe');
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile');
  const [activeAdTab, setActiveAdTab] = useState<'lead_ad' | 'promo'>('lead_ad');
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [cartToast, setCartToast] = useState<string | null>(null);
  const [activeViewTab, setActiveViewTab] = useState<'store' | 'seller' | 'admin'>('store');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [loadingLead, setLoadingLead] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);

  const formRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Form State
  const [leadForm, setLeadForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    projectType: 'Multi-Vendor Marketplace',
    timeline: 'Immediately (Next 7-14 Days)',
    notes: ''
  });

  // Check if lead was already verified in this browser
  useEffect(() => {
    try {
      const stored = localStorage.getItem('qala_gaffar_unlocked');
      if (stored === 'true') {
        setIsUnlocked(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleAddToCart = (productName: string) => {
    setCartCount(prev => prev + 1);
    setCartToast(`Added: ${productName.substring(0, 32)}...`);
    setTimeout(() => setCartToast(null), 3000);
  };

  const scrollToLeadForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleDirectLinkClick = (e: React.MouseEvent) => {
    if (!isUnlocked) {
      e.preventDefault();
      scrollToLeadForm();
      showError("Please fill the quick form below to unlock direct access to gaffarindia.com");
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.fullName.trim() || !leadForm.phone.trim() || !leadForm.email.trim()) {
      showError("Please enter your name, phone number, and email.");
      return;
    }

    setLoadingLead(true);

    const payload = {
      ...leadForm,
      source: 'gaffar_portfolio_ad_funnel',
      target_url: LIVE_TARGET_URL,
      submitted_at: new Date().toISOString()
    };

    // 1. Store lead in Supabase
    try {
      await supabase.from('leads').insert({
        email: leadForm.email.trim(),
        tool_used: 'gaffar_portfolio_ad_funnel',
        data: payload
      });
    } catch (dbErr) {
      console.warn("Supabase lead insertion note:", dbErr);
    }

    // 2. Notify internal lead endpoint
    try {
      await fetch('/api/lead.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: leadForm.email.trim(),
          tool_used: 'gaffar_portfolio_ad_funnel',
          data: payload
        })
      });
    } catch (netErr) {
      console.warn("Lead notification warning:", netErr);
    }

    setLoadingLead(false);
    setIsUnlocked(true);
    try {
      localStorage.setItem('qala_gaffar_unlocked', 'true');
    } catch {
      // ignore
    }

    showSuccess("Access Granted! Unlocking gaffarindia.com...");
    setRedirectCountdown(3);

    // Countdown and automatic redirect
    let timer = 3;
    const interval = setInterval(() => {
      timer -= 1;
      if (timer <= 0) {
        clearInterval(interval);
        setRedirectCountdown(null);
        window.open(LIVE_TARGET_URL, '_blank', 'noopener,noreferrer');
      } else {
        setRedirectCountdown(timer);
      }
    }, 1000);
  };

  const metrics = [
    { label: "Products Listed", value: "1,000+", icon: <Package className="w-6 h-6" /> },
    { label: "Turnaround Time", value: "7 Days", icon: <Clock className="w-6 h-6" /> },
    { label: "Seller Trust Lift", value: "+40%", icon: <ShieldCheck className="w-6 h-6" /> },
    { label: "Architecture", value: "Multi-Vendor", icon: <Boxes className="w-6 h-6" /> }
  ];

  const features = [
    {
      icon: <Store className="w-6 h-6" />,
      title: "Multi-Seller Marketplace Engine",
      description: "Supports independent vendor profiles, product catalog feeds, wholesale bulk pricing tiers, and direct-to-consumer checkout."
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Dedicated Seller Center Portal",
      description: "Vendors get an autonomous dashboard to track incoming orders, monitor stock levels, print shipping labels, and receive automated payouts."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Admin Control Center",
      description: "Central command center covering master catalog control, seller application approval, dispute management, and live GMV revenue analytics."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Wallet Cashback & Checkout",
      description: "Gamified reward mechanism offering instant wallet cashback credited at checkout to maximize repeat purchase retention."
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "WhatsApp Order Engine Integration",
      description: "Direct WhatsApp ordering bridge (+91 6006760151) allowing customers to order via chat or receive real-time dispatch updates."
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Blinkit & Amazon-Style App UX",
      description: "Optimized mobile-first progressive web app (PWA) with sub-second page loads, bottom navigation, and zero app-store install friction."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      <SEO
        title="Gaffar India: Wholesale & Retail Mobile Marketplace | Qala Labs"
        description="How Qala Labs engineered GaffarIndia.com — a full-scale multi-vendor marketplace digitizing Delhi's legendary Gaffar Market with vendor portals, live catalog, and 7-day launch architecture."
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Portfolio', url: '/portfolio' },
          { name: 'Gaffar India Marketplace', url: '/portfolio/gaffar-india-marketplace' }
        ]}
      />
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Back link */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
            </Link>

            <Link to="/case-studies/gaffar-india-rebrand" className="text-xs font-bold text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors">
              View Brand Identity Case Study <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-14"
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge className="bg-blue-600 text-white px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
                Full-Stack Marketplace Build
              </Badge>
              <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50/50 font-bold text-[10px] uppercase tracking-widest">
                Amazon & Blinkit-Style Architecture
              </Badge>
              <Badge variant="outline" className="border-emerald-200 text-emerald-700 bg-emerald-50/50 font-bold text-[10px] uppercase tracking-widest">
                Live Production
              </Badge>
            </div>

            <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              Gaffar India: Delhi's Iconic Market <span className="text-blue-600">Digitized.</span>
            </h1>

            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-3xl">
              Gaffar Market in Delhi has been India's gadget hub since 1952. We engineered a complete digital marketplace architecture for GaffarIndia.com — multi-vendor onboarding, 1,000+ SKU live inventory, seller management portal, instant cashback wallet, and seamless WhatsApp ordering.
            </p>

            {/* Top Action CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToLeadForm}
                className="bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-blue-500/20 text-base flex items-center gap-2 transition-all hover:scale-[1.02]"
              >
                {isUnlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                {isUnlocked ? "Access GaffarIndia.com (Unlocked)" : "Unlock Live Website Access"}
              </button>

              <a
                href={isUnlocked ? LIVE_TARGET_URL : "#lead-gate"}
                onClick={handleDirectLinkClick}
                target={isUnlocked ? "_blank" : undefined}
                rel={isUnlocked ? "noreferrer" : undefined}
                className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 text-slate-700 font-black px-7 py-4 rounded-2xl text-base transition-all bg-white"
              >
                Visit Live Site (gaffarindia.com) <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/916006760151?text=Hi%20Qala%20Labs%2C%20I%20saw%20the%20Gaffar%20India%20marketplace%20build.%20I%20want%20to%20build%20a%20similar%20marketplace."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 font-black px-6 py-4 rounded-2xl text-base transition-all border border-emerald-200"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" /> WhatsApp Quick Chat
              </a>
            </div>
          </motion.div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-7 bg-slate-50 rounded-[2rem] border border-slate-100 text-center hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all group"
              >
                <div className="text-blue-600 mb-3 flex justify-center group-hover:scale-110 transition-transform">{metric.icon}</div>
                <p className="text-3xl font-black mb-1 text-slate-900">{metric.value}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          {/* ========================================================================= */}
          {/* FUNCTIONING WEBSITE IFRAME & INTERACTIVE PREVIEW */}
          {/* ========================================================================= */}
          <section className="mb-24">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
              <div>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Live Functional Prototype</p>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900">Experience How The Website Functions</h2>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Mode Selector: Live Iframe vs Interactive Demo */}
                <div className="bg-slate-100 p-1 rounded-xl flex text-xs font-bold">
                  <button
                    onClick={() => setPreviewType('iframe')}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${previewType === 'iframe' ? 'bg-blue-600 shadow text-white' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    <Globe className="w-3.5 h-3.5" /> Live Web Iframe
                  </button>
                  <button
                    onClick={() => setPreviewType('simulator')}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${previewType === 'simulator' ? 'bg-blue-600 shadow text-white' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    <Layers className="w-3.5 h-3.5" /> Catalog & Portal Demo
                  </button>
                </div>

                {/* View Tabs (when in simulator mode) */}
                {previewType === 'simulator' && (
                  <div className="bg-slate-100 p-1 rounded-xl flex text-xs font-bold">
                    <button
                      onClick={() => setActiveViewTab('store')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${activeViewTab === 'store' ? 'bg-white shadow text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      Storefront
                    </button>
                    <button
                      onClick={() => setActiveViewTab('seller')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${activeViewTab === 'seller' ? 'bg-white shadow text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      Seller Center
                    </button>
                    <button
                      onClick={() => setActiveViewTab('admin')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${activeViewTab === 'admin' ? 'bg-white shadow text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      Admin Control
                    </button>
                  </div>
                )}

                {/* Device Mode Switcher */}
                <div className="bg-slate-100 p-1 rounded-xl flex text-xs font-bold">
                  <button
                    onClick={() => setDeviceMode('mobile')}
                    className={`p-1.5 rounded-lg flex items-center gap-1 transition-all ${deviceMode === 'mobile' ? 'bg-white shadow text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
                    title="Mobile App View (As Seen in Video Ad)"
                  >
                    <Smartphone className="w-4 h-4" /> <span className="hidden sm:inline">Mobile (9:16)</span>
                  </button>
                  <button
                    onClick={() => setDeviceMode('desktop')}
                    className={`p-1.5 rounded-lg flex items-center gap-1 transition-all ${deviceMode === 'desktop' ? 'bg-white shadow text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
                    title="Desktop Browser View"
                  >
                    <Monitor className="w-4 h-4" /> <span className="hidden sm:inline">Desktop</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Browser / Device Shell */}
            <div className="bg-slate-900 rounded-[2.5rem] p-3 sm:p-5 shadow-2xl border border-slate-800">
              
              {/* Browser Chrome Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 px-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>

                <div className="flex-1 max-w-lg mx-4 flex items-center justify-center gap-2 bg-slate-800/80 border border-slate-700 text-slate-300 rounded-full px-4 py-1 text-xs">
                  {isUnlocked ? <Unlock className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5 text-amber-400" />}
                  <span className="font-mono truncate">https://gaffarindia.com</span>
                  <span className="ml-auto text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-600 text-white">
                    {activeViewTab}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {isUnlocked ? (
                    <a
                      href={LIVE_TARGET_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 bg-emerald-950/60 border border-emerald-700/50 px-3 py-1 rounded-full transition-colors"
                    >
                      Live Link Active <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <button
                      onClick={scrollToLeadForm}
                      className="text-xs text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 bg-amber-950/60 border border-amber-700/50 px-3 py-1 rounded-full transition-colors animate-pulse"
                    >
                      <Lock className="w-3 h-3" /> Form Required to Unlock
                    </button>
                  )}
                </div>
              </div>

              {/* Viewport Frame Container */}
              <div className="flex justify-center bg-slate-950/50 rounded-2xl overflow-hidden min-h-[640px] relative">
                <div
                  className={`transition-all duration-500 bg-white overflow-hidden ${
                    deviceMode === 'mobile'
                      ? 'w-full max-w-[420px] rounded-[2rem] border-4 border-slate-800 shadow-2xl my-3 h-[720px]'
                      : 'w-full rounded-xl min-h-[660px]'
                  }`}
                >
                  {previewType === 'iframe' ? (
                    <div className="w-full h-full min-h-[660px] bg-white relative flex flex-col">
                      <iframe
                        src="/api/proxy-gaffar"
                        className="w-full flex-1 h-full min-h-[660px] border-0"
                        title="Live Gaffar India Iframe Preview"
                        sandbox="allow-scripts allow-same-origin allow-forms"
                      />
                    </div>
                  ) : (
                    <div className="h-full overflow-y-auto">
                      {/* Active Tab View 1: STOREFRONT */}
                      {activeViewTab === 'store' && (
                    <div className="p-4 sm:p-6 text-slate-900">
                      
                      {/* Storefront Header */}
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-sm">
                            G
                          </div>
                          <div>
                            <p className="font-black text-slate-900 leading-tight">Gaffar<span className="text-blue-600">India</span></p>
                            <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Wholesale & Retail</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleAddToCart("Quick Item")}
                            className="relative p-2 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                          >
                            <ShoppingBag className="w-5 h-5 text-slate-700" />
                            {cartCount > 0 && (
                              <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white rounded-full text-[10px] font-black flex items-center justify-center animate-bounce">
                                {cartCount}
                              </span>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Store Search */}
                      <div className="relative mb-5">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search 1,000+ Galaxy Z Fold, Mini Phones, Cases..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-medium focus:outline-none focus:border-blue-600"
                        />
                      </div>

                      {/* Category Pills */}
                      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 no-scrollbar text-xs">
                        {["All", "Galaxy Z Series", "Walkie Talkie", "Mini Phones", "Action Figures"].map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
                              activeCategory === cat
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      {/* Cash Back & Fast Order Banner */}
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-2xl mb-6 flex items-center justify-between shadow-md">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-yellow-300 shrink-0" />
                          <div>
                            <p className="text-xs font-black">Direct Cashback Credited Instantly</p>
                            <p className="text-[10px] text-blue-100">Wholesale pricing on verified sellers</p>
                          </div>
                        </div>
                        <span className="text-[10px] bg-white/20 px-2 py-1 rounded-full font-bold">
                          Launch Offer
                        </span>
                      </div>

                      {/* Product Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {DEMO_PRODUCTS
                          .filter(p => activeCategory === "All" || p.category === activeCategory)
                          .map((prod) => (
                            <div
                              key={prod.id}
                              className="border border-slate-100 rounded-2xl p-2.5 bg-white hover:shadow-lg transition-all flex flex-col justify-between group"
                            >
                              <div className="relative aspect-square rounded-xl overflow-hidden mb-2 bg-slate-100">
                                <img
                                  src={prod.image}
                                  alt={prod.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <span className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md">
                                  {prod.discount}
                                </span>
                              </div>

                              <div>
                                <p className="text-[11px] font-bold text-slate-800 line-clamp-2 mb-1 leading-snug">
                                  {prod.title}
                                </p>
                                <div className="flex items-baseline gap-1.5 mb-2">
                                  <span className="text-xs font-black text-blue-600">{prod.price}</span>
                                  <span className="text-[10px] text-slate-400 line-through">{prod.mrp}</span>
                                </div>
                              </div>

                              <button
                                onClick={() => handleAddToCart(prod.title)}
                                className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-1.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
                              >
                                <ShoppingBag className="w-3 h-3" /> Add +
                              </button>
                            </div>
                          ))}
                      </div>

                      {/* Floating Toast */}
                      <AnimatePresence>
                        {cartToast && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="sticky bottom-3 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-xl flex items-center justify-between border border-slate-700"
                          >
                            <span className="flex items-center gap-1.5 font-bold">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> {cartToast}
                            </span>
                            <span className="text-[10px] text-blue-300 font-mono">Cart: {cartCount} items</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Active Tab View 2: SELLER CENTER PORTAL */}
                  {activeViewTab === 'seller' && (
                    <div className="p-4 sm:p-6 text-slate-900">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                        <div>
                          <p className="text-xs font-black text-blue-600 uppercase tracking-widest">Gaffar Seller Hub</p>
                          <h4 className="text-lg font-black text-slate-900">Vendor Management Portal</h4>
                        </div>
                        <Badge className="bg-emerald-600 text-white text-[10px]">Active Seller</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100">
                          <p className="text-[10px] uppercase font-bold text-slate-500">Today's Orders</p>
                          <p className="text-xl font-black text-blue-600">38</p>
                          <p className="text-[9px] text-emerald-600 font-bold">↑ 14% vs yesterday</p>
                        </div>
                        <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                          <p className="text-[10px] uppercase font-bold text-slate-500">Pending Payout</p>
                          <p className="text-xl font-black text-emerald-700">₹84,250</p>
                          <p className="text-[9px] text-slate-500">Instant T+1 Transfer</p>
                        </div>
                      </div>

                      <div className="rounded-xl overflow-hidden border border-slate-200 mb-4 shadow-sm">
                        <img
                          src="/portfolio/gaffar-india/seller-center-thumb.jpg"
                          alt="Gaffar India Dedicated Seller Center Portal"
                          className="w-full h-auto object-cover"
                        />
                      </div>

                      <div className="space-y-2 text-xs">
                        {[
                          "Order Control: 12 awaiting courier pickup",
                          "Catalog Control: 144 items verified & active",
                          "Customer Chat: Direct WhatsApp customer resolution",
                          "Automated GST Invoice & Packaging Slips"
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg font-medium text-slate-700">
                            <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Active Tab View 3: ADMIN CONTROL CENTER */}
                  {activeViewTab === 'admin' && (
                    <div className="p-4 sm:p-6 text-slate-900">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                        <div>
                          <p className="text-xs font-black text-purple-600 uppercase tracking-widest">Super Admin</p>
                          <h4 className="text-lg font-black text-slate-900">Marketplace Command</h4>
                        </div>
                        <Badge variant="outline" className="text-purple-700 border-purple-200 text-[10px]">Master Access</Badge>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                          <span className="font-bold text-slate-700">Total Marketplace GMV</span>
                          <span className="font-black text-blue-600 text-sm">₹24,80,000</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                          <span className="font-bold text-slate-700">Active Vendor Accounts</span>
                          <span className="font-black text-slate-900">42 Verified Sellers</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                          <span className="font-bold text-slate-700">Pending Seller KYC Applications</span>
                          <span className="font-bold text-amber-600">6 Pending</span>
                        </div>
                      </div>

                      <div className="rounded-xl overflow-hidden border border-slate-200 mb-4 shadow-sm">
                        <img
                          src="/portfolio/gaffar-india/ad-thumb-1.jpg"
                          alt="Gaffar India Marketplace Architecture Demo"
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  )}

                </div>

                {/* Persistent Gated Lock Indicator Banner */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md text-white p-4 rounded-2xl border border-slate-700/80 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isUnlocked ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                      {isUnlocked ? <Unlock className="w-5 h-5 text-white" /> : <Lock className="w-5 h-5 text-slate-900" />}
                    </div>
                    <div>
                      <p className="font-black text-sm">
                        {isUnlocked ? "Live Site Unlocked!" : "Direct Access to gaffarindia.com is Gated"}
                      </p>
                      <p className="text-xs text-slate-300">
                        {isUnlocked
                          ? "You have full access to visit the production storefront."
                          : "Fill out the quick project form to unlock the live production website and receive full source code & pricing."}
                      </p>
                    </div>
                  </div>

                  {isUnlocked ? (
                    <a
                      href={LIVE_TARGET_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shadow-lg"
                    >
                      Visit gaffarindia.com Now <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <button
                      onClick={scrollToLeadForm}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shadow-lg shadow-blue-500/30"
                    >
                      Fill Form to Unlock <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* HIGH-CONVERTING LEAD GENERATION GATE FORM */}
          {/* ========================================================================= */}
          <section id="lead-gate" ref={formRef} className="mb-24 scroll-mt-24">
            <div className="relative p-8 md:p-14 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-[3.5rem] shadow-2xl border border-blue-900/40 text-white overflow-hidden">
              
              {/* Background Glows */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10 grid lg:grid-cols-12 gap-10 items-center">
                
                {/* Value Prop Column */}
                <div className="lg:col-span-5 space-y-6">
                  <Badge className="bg-blue-500 text-white px-3 py-1 rounded-full font-black text-[10px] tracking-widest uppercase">
                    Lead Generation Gate
                  </Badge>

                  <h2 className="text-3xl md:text-5xl font-black leading-tight text-white">
                    Want to Build an App Like <span className="text-blue-400">Amazon or Blinkit?</span>
                  </h2>

                  <p className="text-base text-slate-300 leading-relaxed">
                    We engineer complete multi-vendor marketplaces, quick-commerce engines, and high-converting storefronts. Get the complete architecture blueprint, pricing breakdown, and unlock direct access to GaffarIndia.com.
                  </p>

                  <div className="space-y-3 pt-2">
                    {[
                      "Custom Marketplace Starting @ ₹40,000",
                      "Launch Ready in 7 to 14 Days",
                      "100% Full Source Code & Admin Ownership",
                      "Instant Redirection to Live GaffarIndia.com"
                    ].map((bullet, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-sm font-bold text-slate-200">
                        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Direct WhatsApp Consultation</p>
                      <p className="text-[11px] text-slate-400">+91 6006760151 • Instant replies within 15 mins</p>
                    </div>
                  </div>
                </div>

                {/* The Form Card */}
                <div className="lg:col-span-7 bg-white text-slate-900 p-6 md:p-8 rounded-[2.5rem] shadow-2xl border border-slate-100">
                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-slate-900 mb-1">
                      {isUnlocked ? "Your Access is Unlocked!" : "Unlock Live Website & Get Blueprint"}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {isUnlocked
                        ? "You can now visit gaffarindia.com or submit a new project enquiry below."
                        : "Enter your details below. You will be immediately redirected to gaffarindia.com upon submission."}
                    </p>
                  </div>

                  {redirectCountdown !== null && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-center animate-pulse">
                      <p className="font-black text-sm">🎉 Success! Redirecting to gaffarindia.com in {redirectCountdown}s...</p>
                      <a
                        href={LIVE_TARGET_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-emerald-700 underline mt-1 inline-block"
                      >
                        Click here if you are not redirected automatically
                      </a>
                    </div>
                  )}

                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName" className="text-xs font-bold text-slate-700 mb-1.5 block">
                          Your Name *
                        </Label>
                        <Input
                          id="fullName"
                          required
                          value={leadForm.fullName}
                          onChange={e => setLeadForm({ ...leadForm, fullName: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="h-11 text-xs rounded-xl bg-slate-50 border-slate-200 focus:bg-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-xs font-bold text-slate-700 mb-1.5 block">
                          WhatsApp / Phone Number *
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                            +91
                          </span>
                          <Input
                            id="phone"
                            required
                            type="tel"
                            value={leadForm.phone}
                            onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                            placeholder="98765 43210"
                            className="h-11 text-xs rounded-xl pl-12 bg-slate-50 border-slate-200 focus:bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-xs font-bold text-slate-700 mb-1.5 block">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          required
                          type="email"
                          value={leadForm.email}
                          onChange={e => setLeadForm({ ...leadForm, email: e.target.value })}
                          placeholder="rahul@company.com"
                          className="h-11 text-xs rounded-xl bg-slate-50 border-slate-200 focus:bg-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="projectType" className="text-xs font-bold text-slate-700 mb-1.5 block">
                          What Do You Want to Build?
                        </Label>
                        <select
                          id="projectType"
                          value={leadForm.projectType}
                          onChange={e => setLeadForm({ ...leadForm, projectType: e.target.value })}
                          className="w-full h-11 text-xs rounded-xl px-3 bg-slate-50 border border-slate-200 font-medium focus:bg-white focus:outline-none focus:border-blue-600"
                        >
                          <option value="Multi-Vendor Marketplace">Multi-Vendor Marketplace (Like Amazon/Gaffar)</option>
                          <option value="Quick Commerce Engine">Quick Commerce / Blinkit-Style 10-Min Delivery</option>
                          <option value="D2C Brand Flagship">D2C Brand Store with Custom Checkout</option>
                          <option value="B2B Wholesale Portal">B2B Wholesale & Distributor Platform</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="timeline" className="text-xs font-bold text-slate-700 mb-1.5 block">
                        Estimated Launch Timeline
                      </Label>
                      <select
                        id="timeline"
                        value={leadForm.timeline}
                        onChange={e => setLeadForm({ ...leadForm, timeline: e.target.value })}
                        className="w-full h-11 text-xs rounded-xl px-3 bg-slate-50 border border-slate-200 font-medium focus:bg-white focus:outline-none focus:border-blue-600"
                      >
                        <option value="Immediately (Next 7-14 Days)">Immediately (Need fast 7-14 day delivery)</option>
                        <option value="Next 1 Month">Within next 1 month</option>
                        <option value="Exploring / Planning Phase">Currently gathering proposals & pricing</option>
                      </select>
                    </div>

                    <Button
                      type="submit"
                      disabled={loadingLead}
                      className="w-full h-13 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl text-sm shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                    >
                      {loadingLead ? (
                        <span>Processing & Verifying...</span>
                      ) : (
                        <>
                          <Unlock className="w-4 h-4" />
                          <span>Unlock GaffarIndia.com & Get Blueprint →</span>
                        </>
                      )}
                    </Button>

                    <p className="text-[11px] text-center text-slate-400 font-medium">
                      🔒 No spam. Instant redirection to http://gaffarindia.com/ upon submission.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* VIDEO AD SHOWCASE: "AS SEEN IN OUR META ADS CAMPAIGN" */}
          {/* ========================================================================= */}
          <section className="mb-24">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge className="bg-slate-900 text-white mb-4 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
                Paid Acquisition Campaign
              </Badge>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
                The Video Ad Creative & Reference
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                We produced high-velocity 9:16 vertical video ads engineered for Meta lead generation. Watch the exact ad creative running to acquire marketplace founders and business owners.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-center bg-slate-50 p-6 md:p-10 rounded-[3rem] border border-slate-100">
              
              {/* Video Player Column */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[340px] aspect-[9/16] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-slate-800 bg-black">
                  <video
                    ref={videoRef}
                    src={activeAdTab === 'lead_ad' ? "/portfolio/gaffar-india/gaffar-lead-ad.mp4" : "/portfolio/gaffar-india/gaffar-promo.mp4"}
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                    poster="/portfolio/gaffar-india/ad-thumb-1.jpg"
                  />
                  <div className="absolute top-4 left-4 bg-red-600 text-white font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    Ad Creative
                  </div>
                </div>
              </div>

              {/* Video Ad Strategy & Highlights Column */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Switcher between 91s Lead Ad and 35s Promo */}
                <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm max-w-md">
                  <button
                    onClick={() => setActiveAdTab('lead_ad')}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all ${
                      activeAdTab === 'lead_ad' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Meta Lead Ad (91s)
                  </button>
                  <button
                    onClick={() => setActiveAdTab('promo')}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all ${
                      activeAdTab === 'promo' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Marketplace Promo (35s)
                  </button>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1">
                    {activeAdTab === 'lead_ad' ? "Core Conversion Hook" : "Retail & Wholesale Hook"}
                  </p>
                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    {activeAdTab === 'lead_ad'
                      ? '"Want to Build Apps Like Amazon & Blinkit? Check Out This Complete Marketplace!"'
                      : '"Delhi\'s Iconic Gaffar Market Now Online — Wholesale & Retail"'}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {activeAdTab === 'lead_ad'
                      ? 'Engineered specifically for Meta feed and reels. Directly demonstrates the functioning app UI, instant wallet cashback, multi-vendor cart, seller center, and admin center — closing with a high-urgency offer: "Starting at ₹40,000, Launch in 7 Days, Full Source Code Included."'
                      : 'Showcases the deep catalogue of trending gadgets, mini phones, and walkie talkies at direct Delhi market wholesale rates, driving instant WhatsApp inquiries to +91 6006760151.'}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-4 bg-white rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Video Creative Format</p>
                    <p className="text-sm font-black text-slate-900">9:16 Vertical (Reels / Stories / TikTok)</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Primary Call-to-Action</p>
                    <p className="text-sm font-black text-emerald-600">WhatsApp & Lead Generation Form</p>
                  </div>
                </div>

                <div className="p-5 bg-blue-50/70 rounded-2xl border border-blue-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-blue-900">Want high-performing video ads like this?</p>
                    <p className="text-xs text-blue-700">We produce complete creator & screen walkthrough ads for your product.</p>
                  </div>
                  <Link to="/contact">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-4 py-2 rounded-xl">
                      Get Ad Creative
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* ARCHITECTURE & DELIVERABLES */}
          {/* ========================================================================= */}
          <section className="mb-24">
            <div className="max-w-3xl mb-12">
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">What We Shipped</p>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
                The Full Marketplace Ecosystem
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                From frontend customer UX to backend seller settlements, here is the architectural breakdown delivered for Gaffar India.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <Card key={i} className="border-none shadow-sm bg-slate-50 hover:bg-white hover:shadow-xl transition-all rounded-3xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-5 shadow-sm border border-slate-100">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-bold mb-2.5 text-slate-900">
                      {feature.title}
                    </CardTitle>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* FINAL CTA BANNER */}
          {/* ========================================================================= */}
          <section className="py-12">
            <div className="relative p-10 md:p-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3.5rem] overflow-hidden text-center shadow-2xl shadow-blue-500/20 text-white">
              <div className="relative z-10 max-w-2xl mx-auto">
                <Badge className="bg-white/20 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
                  Turnkey Launch in 7 Days
                </Badge>
                <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                  Ready to Launch Your Custom Marketplace?
                </h2>
                <p className="text-blue-100 text-base mb-8 leading-relaxed">
                  Whether you are digitizing an offline wholesale market, building a Blinkit quick-commerce service, or launching a multi-seller niche platform — Qala Labs delivers the full software and ad generation system.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={scrollToLeadForm}
                    className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-4 rounded-2xl text-base font-black transition-all shadow-xl hover:scale-105"
                  >
                    Request Marketplace Blueprint →
                  </button>
                  <a
                    href="https://wa.me/916006760151?text=Hi%20Qala%20Labs%2C%20let's%20talk%20about%20building%20a%20marketplace."
                    target="_blank"
                    rel="noreferrer"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl text-base font-black transition-all shadow-xl flex items-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[120px] -mr-48 -mt-48" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[120px] -ml-48 -mb-48" />
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GaffarIndiaPortfolio;
