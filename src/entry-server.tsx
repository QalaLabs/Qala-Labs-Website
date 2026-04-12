import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Routes, Route } from 'react-router-dom';

// Static pages — imported directly so they render fully (no async data fetching)
import About from './pages/About';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Career from './pages/Career';
import AgencyNetwork from './pages/AgencyNetwork';
import CreatorCollective from './pages/CreatorCollective';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Tools from './pages/Tools';

// Specific case study & portfolio pages (mostly static content)
import KashmiriMusicCaseStudy from './pages/KashmiriMusicCaseStudy';
import TrotrCaseStudy from './pages/TrotrCaseStudy';
import GaffarCaseStudy from './pages/GaffarCaseStudy';
import AmazonAdsPortfolio from './pages/AmazonAdsPortfolio';
import InstagramUGCPortfolio from './pages/InstagramUGCPortfolio';
import CSKInfluencerPortfolio from './pages/CSKInfluencerPortfolio';
import CapitalKeysPortfolio from './pages/CapitalKeysPortfolio';
import PickleballPortfolio from './pages/PickleballPortfolio';
import IPLMerchPortfolio from './pages/IPLMerchPortfolio';
import BNPLStrategy from './pages/BNPLStrategy';
import WWFIndiaPortfolio from './pages/WWFIndiaPortfolio';

// Data-fetching pages — lazy so Suspense renders their loading state (meta tags still captured)
const Index = React.lazy(() => import('./pages/Index'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogDetail = React.lazy(() => import('./pages/BlogDetail'));
const CaseStudies = React.lazy(() => import('./pages/CaseStudies'));
const CaseStudyDetail = React.lazy(() => import('./pages/CaseStudyDetail'));
const Portfolio = React.lazy(() => import('./pages/Portfolio'));
const PortfolioDetail = React.lazy(() => import('./pages/PortfolioDetail'));
const ServiceDetail = React.lazy(() => import('./pages/ServiceDetail'));
const Quiz = React.lazy(() => import('./pages/Quiz'));
const DynamicPage = React.lazy(() => import('./pages/DynamicPage'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

export async function render(url: string): Promise<{ html: string; helmet: any }> {
  const helmetContext: Record<string, any> = {};
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  });

  let html = '';
  try {
    html = renderToString(
      <QueryClientProvider client={queryClient}>
        <HelmetProvider context={helmetContext}>
          <TooltipProvider>
            <StaticRouter location={url}>
              <React.Suspense fallback={<div id="ssr-loading" />}>
                <Routes>
                  <Route path="/" element={<Index />} />

                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:slug" element={<ServiceDetail />} />

                  <Route path="/case-studies/kashmiri-movement" element={<KashmiriMusicCaseStudy />} />
                  <Route path="/case-studies/Trotr-Meta-Lead-Generation" element={<TrotrCaseStudy />} />
                  <Route path="/case-studies/gaffar-india-rebrand" element={<GaffarCaseStudy />} />
                  <Route path="/case-studies" element={<CaseStudies />} />
                  <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />

                  <Route path="/portfolio/Amazon-ads" element={<AmazonAdsPortfolio />} />
                  <Route path="/portfolio/Instagram-user-generated-content" element={<InstagramUGCPortfolio />} />
                  <Route path="/portfolio/influencer-marketing-campaign-chennai-super-kings" element={<CSKInfluencerPortfolio />} />
                  <Route path="/portfolio/real-estate-website-development" element={<CapitalKeysPortfolio />} />
                  <Route path="/portfolio/merchandise-design-apparel" element={<PickleballPortfolio />} />
                  <Route path="/portfolio/ipl-merchandise-partner-playr" element={<IPLMerchPortfolio />} />
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
                  <Route path="/about" element={<About />} />
                  <Route path="/career" element={<Career />} />
                  <Route path="/agency-network" element={<AgencyNetwork />} />
                  <Route path="/creator-collective" element={<CreatorCollective />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/p/:slug" element={<DynamicPage />} />

                  {/* /login and /admin/* are intentionally absent — served as SPA shell by Express */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </React.Suspense>
            </StaticRouter>
          </TooltipProvider>
        </HelmetProvider>
      </QueryClientProvider>
    );
  } catch (err) {
    console.error(`[SSR] Render error for ${url}:`, err);
    // Return empty html — Express will fall back to serving the SPA shell
  }

  return { html, helmet: helmetContext.helmet };
}
