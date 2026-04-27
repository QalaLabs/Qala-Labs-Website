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
import RoleRoute from "./components/auth/RoleRoute";
import LoadingScreen from "./components/layout/LoadingScreen";
import PortalLayout from "./components/layout/PortalLayout";

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
const Admin = React.lazy(() => import("./pages/Admin"));
const About = React.lazy(() => import("./pages/About"));
const Career = React.lazy(() => import("./pages/Career"));
const AgencyNetwork = React.lazy(() => import("./pages/AgencyNetwork"));
const CreatorCollective = React.lazy(() => import("./pages/CreatorCollective"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Onboarding = React.lazy(() => import("./pages/Onboarding"));
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
const PickleballPortfolio = React.lazy(() => import("./pages/PickleballPortfolio"));
const IPLMerchPortfolio = React.lazy(() => import("./pages/IPLMerchPortfolio"));
const BNPLStrategy = React.lazy(() => import("./pages/BNPLStrategy"));
const WWFIndiaPortfolio = React.lazy(() => import("./pages/WWFIndiaPortfolio"));

// New strategic pages
const AISearchVisibility = React.lazy(() => import("./pages/AISearchVisibility"));
const EnterpriseAIAutomation = React.lazy(() => import("./pages/EnterpriseAIAutomation"));
const Industries = React.lazy(() => import("./pages/Industries"));
const AIAudit = React.lazy(() => import("./pages/AIAudit"));
const Results = React.lazy(() => import("./pages/Results"));

// Admin Sub-pages
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
const TemplateManager = React.lazy(() => import("./pages/admin/TemplateManager"));
const EditorGuide = React.lazy(() => import("./pages/EditorGuide"));
const CareerLeads = React.lazy(() => import("./pages/admin/CareerLeads"));
const UserManagement = React.lazy(() => import("./pages/admin/UserManagement"));
const IntegrationsConfig = React.lazy(() => import("./pages/admin/IntegrationsConfig"));
const FullCRM = React.lazy(() => import("./pages/admin/FullCRM"));

// Client Portal
const ClientDashboard = React.lazy(() => import("./pages/client/ClientDashboard"));
const ClientProjects = React.lazy(() => import("./pages/client/ClientProjects"));
const ClientChat = React.lazy(() => import("./pages/client/ClientChat"));

// Employee Portal
const EmployeeDashboard = React.lazy(() => import("./pages/employee/EmployeeDashboard"));
const Contacts = React.lazy(() => import("./pages/employee/Contacts"));
const Deals = React.lazy(() => import("./pages/employee/Deals"));
const Pipeline = React.lazy(() => import("./pages/employee/Pipeline"));
const Tasks = React.lazy(() => import("./pages/employee/Tasks"));
const KanbanBoard = React.lazy(() => import("./pages/employee/KanbanBoard"));
const GanttChart = React.lazy(() => import("./pages/employee/GanttChart"));
const EmployeeCalendar = React.lazy(() => import("./pages/employee/Calendar"));
const EmployeeChat = React.lazy(() => import("./pages/employee/Chat"));
const EmailApp = React.lazy(() => import("./pages/employee/EmailApp"));
const InvoiceGenerator = React.lazy(() => import("./pages/employee/InvoiceGenerator"));
const Attendance = React.lazy(() => import("./pages/employee/Attendance"));
const LeaveRequest = React.lazy(() => import("./pages/employee/LeaveRequest"));

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
              <Route path="/case-studies/Meta-Lead-Generation-Ad-UK-Market" element={<NutrivendUKCaseStudy />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
              
              {/* Specific Portfolio Routes */}
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
              <Route path="/login" element={<Login />} />
              <Route path="/career" element={<Career />} />
              <Route path="/agency-network" element={<AgencyNetwork />} />
              <Route path="/creator-collective" element={<CreatorCollective />} />
              
              {/* ── Admin Portal (role-gated, with sidebar layout) ── */}
              <Route element={<RoleRoute allowedRoles={['admin']}><PortalLayout /></RoleRoute>}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/users" element={<UserManagement />} />
                <Route path="/admin/crm" element={<FullCRM />} />
                <Route path="/admin/integrations" element={<IntegrationsConfig />} />
                <Route path="/admin/careers" element={<CareerLeads />} />
                <Route path="/admin/pages" element={<PageList />} />
                <Route path="/admin/editor/:id" element={<PageEditor />} />
                <Route path="/admin/templates" element={<TemplateManager />} />
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
                <Route path="/admin/site-management" element={<SiteManagement />} />
                <Route path="/admin/guide" element={<EditorGuide />} />
              </Route>

              {/* ── Employee Portal ── */}
              <Route element={<RoleRoute allowedRoles={['employee']}><PortalLayout /></RoleRoute>}>
                <Route path="/employee" element={<EmployeeDashboard />} />
                <Route path="/employee/contacts" element={<Contacts />} />
                <Route path="/employee/deals" element={<Deals />} />
                <Route path="/employee/pipeline" element={<Pipeline />} />
                <Route path="/employee/tasks" element={<Tasks />} />
                <Route path="/employee/kanban" element={<KanbanBoard />} />
                <Route path="/employee/gantt" element={<GanttChart />} />
                <Route path="/employee/calendar" element={<EmployeeCalendar />} />
                <Route path="/employee/chat" element={<EmployeeChat />} />
                <Route path="/employee/email" element={<EmailApp />} />
                <Route path="/employee/invoices" element={<InvoiceGenerator />} />
                <Route path="/employee/attendance" element={<Attendance />} />
                <Route path="/employee/leave" element={<LeaveRequest />} />
              </Route>

              {/* ── Client Portal ── */}
              <Route element={<RoleRoute allowedRoles={['client']}><PortalLayout /></RoleRoute>}>
                <Route path="/client" element={<ClientDashboard />} />
                <Route path="/client/projects" element={<ClientProjects />} />
                <Route path="/client/chat" element={<ClientChat />} />
              </Route>

              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
              
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

              {/* Phase 2 UI Demos (temporary, public access) */}
              <Route path="/demo/user-management" element={<UserManagement />} />
              <Route path="/demo/integrations" element={<IntegrationsConfig />} />
              <Route path="/demo/crm" element={<FullCRM />} />

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
