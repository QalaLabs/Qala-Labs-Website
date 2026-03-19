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

// Lazy load pages for performance
const Index = React.lazy(() => import("./pages/Index"));
const Services = React.lazy(() => import("./pages/Services"));
const ServiceDetail = React.lazy(() => import("./pages/ServiceDetail"));
const CaseStudies = React.lazy(() => import("./pages/CaseStudies"));
const CaseStudyDetail = React.lazy(() => import("./pages/CaseStudyDetail"));
const Portfolio = React.lazy(() => import("./pages/Portfolio"));
const PortfolioDetail = React.lazy(() => import("./pages/PortfolioDetail"));
const Blog = React.lazy(() => import("./pages/Blog"));
const BlogDetail = React.lazy(() => import("./pages/BlogDetail"));
const Pricing = React.lazy(() => import("./pages/Pricing"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Tools = React.lazy(() => import("./pages/Tools"));
const Quiz = React.lazy(() => import("./pages/Quiz"));
const Login = React.lazy(() => import("./pages/Login"));
const Admin = React.lazy(() => import("./pages/Admin"));
const PageList = React.lazy(() => import("./pages/admin/PageList"));
const PageEditor = React.lazy(() => import("./pages/admin/PageEditor"));
const MediaManager = React.lazy(() => import("./pages/admin/MediaManager"));
const Settings = React.lazy(() => import("./pages/admin/Settings"));
const SiteManagement = React.lazy(() => import("./pages/admin/SiteManagement"));
const CaseStudyManager = React.lazy(() => import("./pages/admin/CaseStudyManager"));
const CaseStudyEditor = React.lazy(() => import("./pages/admin/CaseStudyEditor"));
const PortfolioManager = React.lazy(() => import("./pages/admin/PortfolioManager"));
const PortfolioEditor = React.lazy(() => import("./pages/admin/PortfolioEditor"));
const BlogManager = React.lazy(() => import("./pages/admin/BlogManager"));
const BlogEditor = React.lazy(() => import("./pages/admin/BlogEditor"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const About = React.lazy(() => import("./pages/About"));
const Privacy = React.lazy(() => import("./pages/Privacy"));
const Terms = React.lazy(() => import("./pages/Terms"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const EditorGuide = React.lazy(() => import("./pages/EditorGuide"));
const Onboarding = React.lazy(() => import("./pages/Onboarding"));
const DynamicPage = React.lazy(() => import("./pages/DynamicPage"));
const KashmiriMusicCaseStudy = React.lazy(() => import("./pages/KashmiriMusicCaseStudy"));
const TrotrCaseStudy = React.lazy(() => import("./pages/TrotrCaseStudy"));
const GaffarCaseStudy = React.lazy(() => import("./pages/GaffarCaseStudy"));
const AmazonAdsPortfolio = React.lazy(() => import("./pages/AmazonAdsPortfolio"));
const InstagramUGCPortfolio = React.lazy(() => import("./pages/InstagramUGCPortfolio"));
const CSKInfluencerPortfolio = React.lazy(() => import("./pages/CSKInfluencerPortfolio"));
const CapitalKeysPortfolio = React.lazy(() => import("./pages/CapitalKeysPortfolio"));
const PickleballPortfolio = React.lazy(() => import("./pages/PickleballPortfolio"));
const IPLMerchPortfolio = React.lazy(() => import("./pages/IPLMerchPortfolio"));
const BNPLStrategy = React.lazy(() => import("./pages/BNPLStrategy"));
const Career = React.lazy(() => import("./pages/Career"));
const AgencyNetwork = React.lazy(() => import("./pages/AgencyNetwork"));
const CreatorCollective = React.lazy(() => import("./pages/CreatorCollective"));

const StickyCTA = React.lazy(() => import("./components/layout/StickyCTA"));
const WhatsAppButton = React.lazy(() => import("./components/layout/WhatsAppButton"));

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
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
              <Route path="/case-studies/kashmiri-movement" element={<KashmiriMusicCaseStudy />} />
              <Route path="/case-studies/Trotr-Meta-Lead-Generation" element={<TrotrCaseStudy />} />
              <Route path="/case-studies/gaffar-india-rebrand" element={<GaffarCaseStudy />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
              <Route path="/portfolio/Amazon-ads" element={<AmazonAdsPortfolio />} />
              <Route path="/portfolio/Instagram-user-generated-content" element={<InstagramUGCPortfolio />} />
              <Route path="/portfolio/influencer-marketing-campaign-chennai-super-kings" element={<CSKInfluencerPortfolio />} />
              <Route path="/portfolio/real-estate-website-development" element={<CapitalKeysPortfolio />} />
              <Route path="/portfolio/merchandise-design-apparel" element={<PickleballPortfolio />} />
              <Route path="/portfolio/ipl-merchandise-partner-playr" element={<IPLMerchPortfolio />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/blog/why-bnpl-core-payment-strategy-india" element={<BNPLStrategy />} />
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
          </React.Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;