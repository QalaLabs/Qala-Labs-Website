"use client";

import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoadingScreen from "./components/layout/LoadingScreen";

// Direct imports for critical pages to ensure reliability and fix 404s
import Index from "./pages/Index";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Portfolio from "./pages/Portfolio";
import PortfolioDetail from "./pages/PortfolioDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Tools from "./pages/Tools";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Career from "./pages/Career";
import AgencyNetwork from "./pages/AgencyNetwork";
import CreatorCollective from "./pages/CreatorCollective";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import DynamicPage from "./pages/DynamicPage";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

// Specific Case Study & Portfolio Pages
import KashmiriMusicCaseStudy from "./pages/KashmiriMusicCaseStudy";
import TrotrCaseStudy from "./pages/TrotrCaseStudy";
import GaffarCaseStudy from "./pages/GaffarCaseStudy";
import AmazonAdsPortfolio from "./pages/AmazonAdsPortfolio";
import InstagramUGCPortfolio from "./pages/InstagramUGCPortfolio";
import CSKInfluencerPortfolio from "./pages/CSKInfluencerPortfolio";
import CapitalKeysPortfolio from "./pages/CapitalKeysPortfolio";
import PickleballPortfolio from "./pages/PickleballPortfolio";
import IPLMerchPortfolio from "./pages/IPLMerchPortfolio";
import BNPLStrategy from "./pages/BNPLStrategy";

// Admin Sub-pages
import PageList from "./pages/admin/PageList";
import PageEditor from "./pages/admin/PageEditor";
import MediaManager from "./pages/admin/MediaManager";
import Settings from "./pages/admin/Settings";
import SiteManagement from "./pages/admin/SiteManagement";
import CaseStudyManager from "./pages/admin/CaseStudyManager";
import CaseStudyEditor from "./pages/admin/CaseStudyEditor";
import PortfolioManager from "./pages/admin/PortfolioManager";
import PortfolioEditor from "./pages/admin/PortfolioEditor";
import BlogManager from "./pages/admin/BlogManager";
import BlogEditor from "./pages/admin/BlogEditor";
import EditorGuide from "./pages/EditorGuide";

// Layout Components
import StickyCTA from "./components/layout/StickyCTA";
import WhatsAppButton from "./components/layout/WhatsAppButton";
import AIChatWidget from "./components/layout/AIChatWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <React.Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              
              {/* Specific Case Study Routes */}
              <Route path="/case-studies/kashmiri-movement" element={<KashmiriMusicCaseStudy />} />
              <Route path="/case-studies/Trotr-Meta-Lead-Generation" element={<TrotrCaseStudy />} />
              <Route path="/case-studies/gaffar-india-rebrand" element={<GaffarCaseStudy />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
              
              {/* Specific Portfolio Routes */}
              <Route path="/portfolio/Amazon-ads" element={<AmazonAdsPortfolio />} />
              <Route path="/portfolio/Instagram-user-generated-content" element={<InstagramUGCPortfolio />} />
              <Route path="/portfolio/influencer-marketing-campaign-chennai-super-kings" element={<CSKInfluencerPortfolio />} />
              <Route path="/portfolio/real-estate-website-development" element={<CapitalKeysPortfolio />} />
              <Route path="/portfolio/merchandise-design-apparel" element={<PickleballPortfolio />} />
              <Route path="/portfolio/ipl-merchandise-partner-playr" element={<IPLMerchPortfolio />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
              
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/why-bnpl-core-payment-strategy-india" element={<BNPLStrategy />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/login" element={<Login />} />
              <Route path="/career" element={<Career />} />
              <Route path="/agency-network" element={<AgencyNetwork />} />
              <Route path="/creator-collective" element={<CreatorCollective />} />
              
              {/* Admin Routes (Protected) */}
              <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
              <Route path="/admin/pages" element={<ProtectedRoute><PageList /></ProtectedRoute>} />
              <Route path="/admin/editor/:id" element={<ProtectedRoute><PageEditor /></ProtectedRoute>} />
              
              <Route path="/admin/case-studies" element={<ProtectedRoute><CaseStudyManager /></ProtectedRoute>} />
              <Route path="/admin/case-studies/new" element={<ProtectedRoute><CaseStudyEditor /></ProtectedRoute>} />
              <Route path="/admin/case-studies/edit/:id" element={<ProtectedRoute><CaseStudyEditor /></ProtectedRoute>} />
              
              <Route path="/admin/portfolio" element={<ProtectedRoute><PortfolioManager /></ProtectedRoute>} />
              <Route path="/admin/portfolio/new" element={<ProtectedRoute><PortfolioEditor /></ProtectedRoute>} />
              <Route path="/admin/portfolio/edit/:id" element={<ProtectedRoute><PortfolioEditor /></ProtectedRoute>} />
              
              <Route path="/admin/blog" element={<ProtectedRoute><BlogManager /></ProtectedRoute>} />
              <Route path="/admin/blog/new" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />
              <Route path="/admin/blog/edit/:id" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />
              
              <Route path="/admin/media" element={<ProtectedRoute><MediaManager /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/admin/site-management" element={<ProtectedRoute><SiteManagement /></ProtectedRoute>} />
              <Route path="/admin/guide" element={<ProtectedRoute><EditorGuide /></ProtectedRoute>} />
              
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
              
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              
              {/* Dynamic CMS Pages */}
              <Route path="/p/:slug" element={<DynamicPage />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <StickyCTA />
            <WhatsAppButton />
            <AIChatWidget />
          </React.Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;