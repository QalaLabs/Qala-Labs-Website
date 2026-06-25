"use client";

import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoadingScreen from "./components/layout/LoadingScreen";

// Direct import for the landing page to ensure instant visibility
import Index from "./pages/Index";

// Lazy imports for all other pages
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
const About = React.lazy(() => import("./pages/About"));
const Career = React.lazy(() => import("./pages/Career"));
const AgencyNetwork = React.lazy(() => import("./pages/AgencyNetwork"));
const CreatorCollective = React.lazy(() => import("./pages/CreatorCollective"));
const DynamicPage = React.lazy(() => import("./pages/DynamicPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Privacy = React.lazy(() => import("./pages/Privacy"));
const Terms = React.lazy(() => import("./pages/Terms"));

// Specific Case Study & Portfolio Pages
const KashmiriMusicCaseStudy = React.lazy(() => import("./pages/KashmiriMusicCaseStudy"));
const TrotrCaseStudy = React.lazy(() => import("./pages/TrotrCaseStudy"));
const GaffarCaseStudy = React.lazy(() => import("./pages/GaffarCaseStudy"));
const NutrivendUKCaseStudy = React.lazy(() => import("./pages/NutrivendUKCaseStudy"));
const AmazonAdsPortfolio = React.lazy(() => import("./pages/AmazonAdsPortfolio"));
const InstagramUGCPortfolio = React.lazy(() => import("./pages/InstagramUGCPortfolio"));
const CSKInfluencerPortfolio = React.lazy(() => import("./pages/CSKInfluencerPortfolio"));
const CapitalKeysPortfolio = React.lazy(() => import("./pages/CapitalKeysPortfolio"));
const BNPLStrategy = React.lazy(() => import("./pages/BNPLStrategy"));
const WWFIndiaPortfolio = React.lazy(() => import("./pages/WWFIndiaPortfolio"));

// New strategic pages
const AISearchVisibility = React.lazy(() => import("./pages/AISearchVisibility"));
const EnterpriseAIAutomation = React.lazy(() => import("./pages/EnterpriseAIAutomation"));
const Industries = React.lazy(() => import("./pages/Industries"));
const AIAudit = React.lazy(() => import("./pages/AIAudit"));
const Results = React.lazy(() => import("./pages/Results"));

// Layout Components
import StickyCTA from "./components/layout/StickyCTA";
import WhatsAppButton from "./components/layout/WhatsAppButton";
import AIChatWidget from "./components/layout/AIChatWidget";

const queryClient = new QueryClient();

const pageTransition = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
  transition: { duration: 0.15, ease: "easeOut" },
};

const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={location.pathname} {...pageTransition} style={{ minHeight: "100vh" }}>
        <React.Suspense fallback={<LoadingScreen />}>
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />

            {/* Specific Case Study Routes */}
            <Route path="/case-studies/kashmiri-movement" element={<KashmiriMusicCaseStudy />} />
            <Route path="/case-studies/Trotr-Meta-Lead-Generation" element={<TrotrCaseStudy />} />
            <Route path="/case-studies/gaffar-india-rebrand" element={<GaffarCaseStudy />} />
            <Route path="/case-studies/Meta-Lead-Generation-Ad-UK-Market" element={<NutrivendUKCaseStudy />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />

            {/* Specific Portfolio Routes */}
            <Route path="/portfolio/Amazon-ads" element={<AmazonAdsPortfolio />} />
            <Route path="/portfolio/Instagram-user-generated-content" element={<InstagramUGCPortfolio />} />
            <Route path="/portfolio/influencer-marketing-campaign-playR" element={<CSKInfluencerPortfolio />} />
            <Route path="/portfolio/influencer-marketing-campaign-chennai-super-kings" element={<Navigate to="/portfolio/influencer-marketing-campaign-playR" replace />} />
            <Route path="/portfolio/real-estate-website-development" element={<CapitalKeysPortfolio />} />
            <Route path="/portfolio/ai-ad-creatives-wwfindia" element={<WWFIndiaPortfolio />} />
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

            <Route path="/about" element={<About />} />
            <Route path="/ai-search-visibility" element={<AISearchVisibility />} />
            <Route path="/enterprise-ai-automation" element={<EnterpriseAIAutomation />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/ai-audit" element={<AIAudit />} />
            <Route path="/results" element={<Results />} />
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
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
