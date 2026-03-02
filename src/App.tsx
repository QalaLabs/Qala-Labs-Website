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
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Tools from "./pages/Tools";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import EditorGuide from "./pages/EditorGuide";
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
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/guide" element={<EditorGuide />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <StickyCTA />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;