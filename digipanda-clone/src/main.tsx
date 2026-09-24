import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import { ScrollToTop } from './components/ScrollToTop';
import './index.css';

// Lazy-loaded subpages for code-splitting and optimized initial load
const WhoWeArePage = React.lazy(() => import('./pages/WhoWeArePage').then((m) => ({ default: m.WhoWeArePage })));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const ServiceDetailPage = React.lazy(() => import('./pages/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage })));
const AgentDetailPage = React.lazy(() => import('./pages/AgentDetailPage').then((m) => ({ default: m.AgentDetailPage })));
const CaseStudiesPage = React.lazy(() => import('./pages/CaseStudiesPage').then((m) => ({ default: m.CaseStudiesPage })));
const CaseStudyDetailPage = React.lazy(() => import('./pages/CaseStudyDetailPage').then((m) => ({ default: m.CaseStudyDetailPage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const ProductsPage = React.lazy(() => import('./pages/ProductsPage').then((m) => ({ default: m.ProductsPage })));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage })));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsPage = React.lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })));
const CareersPage = React.lazy(() => import('./pages/CareersPage').then((m) => ({ default: m.CareersPage })));
const CreatorCollectivePage = React.lazy(() => import('./pages/CreatorCollectivePage').then((m) => ({ default: m.CreatorCollectivePage })));
const AgencyCollectivePage = React.lazy(() => import('./pages/AgencyCollectivePage').then((m) => ({ default: m.AgencyCollectivePage })));
const PortfolioPage = React.lazy(() => import('./pages/PortfolioPage').then((m) => ({ default: m.PortfolioPage })));
const PortfolioDetailPage = React.lazy(() => import('./pages/PortfolioDetailPage').then((m) => ({ default: m.PortfolioDetailPage })));
const ToolsPage = React.lazy(() => import('./pages/ToolsPage').then((m) => ({ default: m.ToolsPage })));
const BlogPage = React.lazy(() => import('./pages/BlogPage').then((m) => ({ default: m.BlogPage })));
const BlogDetailPage = React.lazy(() => import('./pages/BlogDetailPage').then((m) => ({ default: m.BlogDetailPage })));
const OurWorkPage = React.lazy(() => import('./pages/OurWorkPage').then((m) => ({ default: m.OurWorkPage })));

// Elegant minimal loading spinner matching Qala Labs futuristic aesthetic
const PageLoadingFallback: React.FC = () => (
  <div className="min-h-screen bg-[#06070D] flex flex-col items-center justify-center text-white selection:bg-[#3FE0E0]">
    <div className="relative flex items-center justify-center">
      <div className="w-14 h-14 rounded-full border-2 border-[#4F46E5]/20 animate-ping absolute" />
      <div className="w-12 h-12 rounded-full border-2 border-transparent border-t-[#3FE0E0] border-r-[#4F46E5] animate-spin" />
      <div className="w-2 h-2 rounded-full bg-[#3FE0E0] shadow-[0_0_12px_#3FE0E0] absolute" />
    </div>
    <div className="mt-5 text-[11px] font-mono tracking-widest text-white/50 uppercase">
      INITIALIZING HORIZON...
    </div>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <React.Suspense fallback={<PageLoadingFallback />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<WhoWeArePage />} />
          <Route path="/who-we-are" element={<WhoWeArePage />} />
          <Route path="/team" element={<WhoWeArePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/service" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/service/:slug" element={<ServiceDetailPage />} />
          <Route path="/agents/:slug" element={<AgentDetailPage />} />
          <Route path="/work" element={<OurWorkPage />} />
          <Route path="/our-work" element={<OurWorkPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-studies/d2c-bnpl-strategy" element={<Navigate to="/blog/d2c-bnpl-strategy-guide" replace />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<PortfolioDetailPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/growth-tools" element={<ToolsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/career" element={<CareersPage />} />
          <Route path="/creator-collective" element={<CreatorCollectivePage />} />
          <Route path="/creators" element={<CreatorCollectivePage />} />
          <Route path="/agency-collective" element={<AgencyCollectivePage />} />
          <Route path="/agencies" element={<AgencyCollectivePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/blogs/:slug" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  </React.StrictMode>,
);
