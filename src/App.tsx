import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
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
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import PageList from "./pages/admin/PageList";
import PageEditor from "./pages/admin/PageEditor";
import MediaManager from "./pages/admin/MediaManager";
import Settings from "./pages/admin/Settings";
import CaseStudyManager from "./pages/admin/CaseStudyManager";
import CaseStudyEditor from "./pages/admin/CaseStudyEditor";
import PortfolioManager from "./pages/admin/PortfolioManager";
import PortfolioEditor from "./pages/admin/PortfolioEditor";
import BlogManager from "./pages/admin/BlogManager";
import BlogEditor from "./pages/admin/BlogEditor";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import EditorGuide from "./pages/EditorGuide";
import Onboarding from "./pages/Onboarding";
import DynamicPage from "./pages/DynamicPage";
import StickyCTA from "./components/layout/StickyCTA";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/login" element={<Login />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/pages" element={<PageList />} />
            <Route path="/admin/editor/:id" element={<PageEditor />} />
            
            <Route path="/admin/case-studies" element={<CaseStudyManager />} />
            <Route path="/admin/case-studies/new" element={<CaseStudyEditor />} />
            <Route path="/admin/case-studies/edit/:id" element={<CaseStudyEditor />} />
            
            <Route path="/admin/portfolio" element={<PortfolioManager />} />
            <Route path="/admin/portfolio/new" element={<PortfolioEditor />} />
            <Route path="/admin/portfolio/edit/:id" element={<PortfolioEditor />} />
            
            <Route path="/admin/blog" element={<BlogManager />} />
            <Route path="/admin/blog/new" element={<BlogEditor />} />
            <Route path="/admin/blog/edit/:id" element={<BlogEditor />} />
            
            <Route path="/admin/media" element={<MediaManager />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/guide" element={<EditorGuide />} />
            
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            
            {/* Dynamic CMS Pages */}
            <Route path="/p/:slug" element={<DynamicPage />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <StickyCTA />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;