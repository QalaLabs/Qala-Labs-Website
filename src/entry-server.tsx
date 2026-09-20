import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import * as HelmetAsync from 'react-helmet-async';
const HelmetProvider = HelmetAsync.HelmetProvider || (HelmetAsync as any).default?.HelmetProvider;
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
import ServiceFinder from './pages/ServiceFinder';
import AIAgentFinder from './pages/AIAgentFinder';

// Specific case study & portfolio pages (mostly static content)
import KashmiriMusicCaseStudy from './pages/KashmiriMusicCaseStudy';
import TrotrCaseStudy from './pages/TrotrCaseStudy';
import GaffarCaseStudy from './pages/GaffarCaseStudy';
import NutrivendUKCaseStudy from './pages/NutrivendUKCaseStudy';
import AmazonAdsPortfolio from './pages/AmazonAdsPortfolio';
import StreetplayrPortfolio from './pages/StreetplayrPortfolio';
import InstagramUGCPortfolio from './pages/InstagramUGCPortfolio';
import CSKInfluencerPortfolio from './pages/CSKInfluencerPortfolio';
import CapitalKeysPortfolio from './pages/CapitalKeysPortfolio';
import BNPLStrategy from './pages/BNPLStrategy';
import WWFIndiaPortfolio from './pages/WWFIndiaPortfolio';
import MizunoIndiaPortfolio from './pages/MizunoIndiaPortfolio';
import HiAstroPortfolio from './pages/HiAstroPortfolio';
import BilluCampaignPortfolio from './pages/BilluCampaignPortfolio';
import AirtelBusinessPortfolio from './pages/AirtelBusinessPortfolio';
import AirborneAviationPortfolio from './pages/AirborneAviationPortfolio';

// Homepage — direct import so SSR renders the loading state with static meta tags
import Index from './pages/Index';

// Data-fetching pages — lazy so Suspense renders their loading state
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
                  <Route path="/case-studies/Meta-Lead-Generation-Ad-UK-Market" element={<NutrivendUKCaseStudy />} />
                  <Route path="/case-studies" element={<CaseStudies />} />
                  <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />

                  <Route path="/portfolio/Amazon-ads" element={<AmazonAdsPortfolio />} />
                  <Route path="/portfolio/streetplayr" element={<StreetplayrPortfolio />} />
                  <Route path="/portfolio/Instagram-user-generated-content" element={<InstagramUGCPortfolio />} />
                  <Route path="/portfolio/influencer-marketing-campaign-playR" element={<CSKInfluencerPortfolio />} />
                  <Route path="/portfolio/real-estate-website-development" element={<CapitalKeysPortfolio />} />
                  <Route path="/portfolio/ai-ad-creatives-wwfindia" element={<WWFIndiaPortfolio />} />
                  <Route path="/portfolio/mizuno-india-launch-campaign" element={<MizunoIndiaPortfolio />} />
                  <Route path="/portfolio/hi-astro-ai-character-videos" element={<HiAstroPortfolio />} />
                  <Route path="/portfolio/billu-salon-social-content" element={<BilluCampaignPortfolio />} />
                  <Route path="/portfolio/airtel-business-exhibition" element={<AirtelBusinessPortfolio />} />
                  <Route path="/portfolio/airborne-aviation-academy" element={<AirborneAviationPortfolio />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/portfolio/:slug" element={<PortfolioDetail />} />

                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/why-bnpl-core-payment-strategy-india" element={<BNPLStrategy />} />
                  <Route path="/blog/:slug" element={<BlogDetail />} />

                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/tools" element={<Tools />} />
                  <Route path="/service-finder" element={<ServiceFinder />} />
                  <Route path="/ai-agent-finder" element={<AIAgentFinder />} />
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
