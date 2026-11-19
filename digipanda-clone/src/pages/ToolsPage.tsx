import React, { useState } from 'react';
import { PageLayout } from './PageLayout';
import { SEO } from '../components/SEO';
import { AiGrowthDiagnostic } from '../components/AiGrowthDiagnostic';
import {
  ShoppingCart,
  Target,
  Calculator,
  TrendingUp,
  IndianRupee,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Percent,
  Truck,
  Loader2,
  AlertCircle,
  HelpCircle,
  Send,
  MessageCircle,
} from 'lucide-react';

const WHATSAPP_URL =
  "https://wa.me/916006760151?text=Hi%20Qala%20Labs%2C%20I%20used%20your%20growth%20calculator%20and%20wanted%20to%20discuss%20our%20metrics.";

export const ToolsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'diagnostic' | 'ecom' | 'roi' | 'profit' | 'ltv'>('diagnostic');

  // 1. Ecommerce Cost Calculator State
  const [sellingPrice, setSellingPrice] = useState(1499);
  const [cogs, setCogs] = useState(450);
  const [referralPercent, setReferralPercent] = useState(15);
  const [closingFee, setClosingFee] = useState(40);
  const [shippingFee, setShippingFee] = useState(70);
  const [cpa, setCpa] = useState(320);
  const [otherFees, setOtherFees] = useState(0);

  const referralFee = (sellingPrice * referralPercent) / 100;
  const totalMarketplaceFees = referralFee + closingFee + shippingFee + otherFees;
  const grossProfit = sellingPrice - cogs - totalMarketplaceFees;
  const netProfit = grossProfit - cpa;
  const grossMargin = sellingPrice > 0 ? (grossProfit / sellingPrice) * 100 : 0;
  const netMargin = sellingPrice > 0 ? (netProfit / sellingPrice) * 100 : 0;

  // 2. Ad Spend ROI Calculator State
  const [adSpend, setAdSpend] = useState(300000);
  const [roiCpa, setRoiCpa] = useState(1200);
  const [avgOrderValue, setAvgOrderValue] = useState(4200);

  const conversions = roiCpa > 0 ? Math.floor(adSpend / roiCpa) : 0;
  const currentRevenue = conversions * avgOrderValue;
  const currentRoas = adSpend > 0 ? (currentRevenue / adSpend).toFixed(2) : '0.00';
  const projectedRevenue = Math.round(currentRevenue * 1.28); // 28% Qala optimization uplift
  const projectedRoas = adSpend > 0 ? (projectedRevenue / adSpend).toFixed(2) : '0.00';

  // 3. Profitability Estimator State
  const [currentGmv, setCurrentGmv] = useState(7500000);
  const [targetGrowth, setTargetGrowth] = useState(35);
  const [profitMargin, setProfitMargin] = useState(22);

  const projectedGmv = currentGmv * (1 + targetGrowth / 100);
  const currentNetProfit = currentGmv * (profitMargin / 100);
  const projectedNetProfit = projectedGmv * (profitMargin / 100);
  const incrementalProfit = projectedNetProfit - currentNetProfit;

  // 4. LTV:CAC Unit Economics State
  const [ltvAov, setLtvAov] = useState(3200);
  const [purchaseFrequency, setPurchaseFrequency] = useState(3.2);
  const [retentionYears, setRetentionYears] = useState(2.5);
  const [acquisitionCost, setAcquisitionCost] = useState(1400);

  const customerLtv = Math.round(ltvAov * purchaseFrequency * retentionYears);
  const ltvCacRatio = acquisitionCost > 0 ? (customerLtv / acquisitionCost).toFixed(2) : '0.00';

  // Email report capture state
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleSendReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail || !userEmail.includes('@')) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailLoading(true);
    setEmailError(null);

    try {
      const payload = {
        name: userName || 'Growth Founder',
        companyName: 'Growth Tool Diagnostic',
        phone: '+91 00000 00000',
        email: userEmail,
        description: `Diagnostic Tool: ${activeTab.toUpperCase()}\n\nCalculated Metrics:\n- Selling/AOV: ₹${sellingPrice}\n- Net Margin: ${netMargin.toFixed(1)}%\n- Projected ROAS: ${projectedRoas}x\n- LTV:CAC Ratio: ${ltvCacRatio}:1`,
        source: 'growth_tools_calculator',
      };

      let response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.status === 404) {
        response = await fetch('/api/lead.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        let errDesc = `Audit delivery failed with status (${response.status})`;
        try {
          const resJson = await response.json();
          if (resJson?.error) errDesc = resJson.error;
        } catch {
          // ignore
        }
        throw new Error(errDesc);
      }

      // Strictly gate success only on response.ok (Rule 1)
      setEmailSuccess(true);
    } catch (err: any) {
      setEmailError(
        err?.message || 'Network issue. You can also reach our engineering team directly at hello@qalalabs.com or WhatsApp.'
      );
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <PageLayout>
      <SEO
        title="AI Growth Diagnostic & Unit Economics Toolkit • Qala Labs"
        description="Calculate your CAC velocity, operational back-office drag, and autonomous swarm capital recovery with Qala Labs' free GAAS growth tools."
        image="/assets/og/og-tools.jpg"
        url="/tools"
      />
      {/* 1. Header Hero */}
      <section className="relative pt-40 pb-16 bg-transparent overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(63,224,224,0.12),rgba(255,255,255,0))] pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center max-w-4xl">
          <div className="eyebrow">
            <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-pulse" />
            FREE GAAS GROWTH ARCHITECTURE TOOLKIT
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-medium text-white tracking-tight leading-tight mt-4 mb-6">
            Autonomous{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#3FE0E0] to-[#34D399]">
              Growth Calculators.
            </span>
          </h1>

          <p className="text-white/70 text-base sm:text-xl font-normal max-w-2xl mx-auto leading-relaxed mb-8">
            The exact mathematical models, AI diagnostic engines, and contribution margin equations we use to audit and scale 8-figure brands.
          </p>

          {/* Tool Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto p-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('diagnostic')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'diagnostic'
                  ? 'bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-black shadow-lg shadow-[#3FE0E0]/20'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Growth Diagnostic (Flagship)</span>
            </button>

            <button
              onClick={() => setActiveTab('ecom')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'ecom'
                  ? 'bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white shadow-lg shadow-[#3FE0E0]/20'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Unit Economics</span>
            </button>

            <button
              onClick={() => setActiveTab('roi')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'roi'
                  ? 'bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white shadow-lg shadow-[#3FE0E0]/20'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>ROAS &amp; Ad Spend</span>
            </button>

            <button
              onClick={() => setActiveTab('profit')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'profit'
                  ? 'bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white shadow-lg shadow-[#3FE0E0]/20'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Profit Forecast</span>
            </button>

            <button
              onClick={() => setActiveTab('ltv')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'ltv'
                  ? 'bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white shadow-lg shadow-[#3FE0E0]/20'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>LTV : CAC Ratio</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Tool Body */}
      <section className="py-12 bg-transparent">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          {/* TAB 0: FLAGSHIP AI GROWTH DIAGNOSTIC */}
          {activeTab === 'diagnostic' && (
            <AiGrowthDiagnostic source="tools_page_primary" />
          )}

          {activeTab !== 'diagnostic' && (
            <div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 sm:p-10 shadow-2xl backdrop-blur-xl">

              {/* TAB 1: E-COMMERCE UNIT ECONOMICS */}
              {activeTab === 'ecom' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* Inputs */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#3FE0E0] uppercase tracking-wider mb-2">
                      <ShoppingCart className="w-4 h-4" />
                      <span>DTC / Marketplace Parameters</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-white/60 mb-2">
                          Selling Price (₹)
                        </label>
                        <input
                          type="number"
                          aria-label="Selling Price"
                          value={sellingPrice}
                          onChange={(e) => setSellingPrice(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-white/60 mb-2">
                          Cost of Goods Sold (₹)
                        </label>
                        <input
                          type="number"
                          aria-label="Cost of Goods Sold"
                          value={cogs}
                          onChange={(e) => setCogs(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-white/60 mb-2">
                          Referral Fee (%)
                        </label>
                        <input
                          type="number"
                          aria-label="Referral Fee"
                          value={referralPercent}
                          onChange={(e) => setReferralPercent(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-white/60 mb-2">
                          Closing Fee (₹)
                        </label>
                        <input
                          type="number"
                          aria-label="Closing Fee"
                          value={closingFee}
                          onChange={(e) => setClosingFee(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-white/60 mb-2">
                          Shipping Fee (₹)
                        </label>
                        <input
                          type="number"
                          aria-label="Shipping Fee"
                          value={shippingFee}
                          onChange={(e) => setShippingFee(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-white/60 mb-2">
                          Customer Acquisition Cost (₹ CPA)
                        </label>
                        <input
                          type="number"
                          aria-label="Customer Acquisition Cost"
                          value={cpa}
                          onChange={(e) => setCpa(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-white/60 mb-2">
                          Packaging &amp; Other Fees (₹)
                        </label>
                        <input
                          type="number"
                          aria-label="Packaging and Other Fees"
                          value={otherFees}
                          onChange={(e) => setOtherFees(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Outputs Card */}
                  <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div>
                      <div className="text-xs font-mono text-[#3FE0E0] uppercase tracking-wider mb-6">
                        Margin Analysis
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-white/10">
                          <span className="text-xs text-white/70">Total Platform / Shipping Fees</span>
                          <span className="font-mono font-bold text-white text-base">₹{totalMarketplaceFees.toFixed(0)}</span>
                        </div>
                        <div className="flex items-center justify-between pb-3 border-b border-white/10">
                          <span className="text-xs text-white/70">Gross Profit (Pre-Ad Spend)</span>
                          <span className="font-mono font-bold text-white text-base">₹{grossProfit.toFixed(0)}</span>
                        </div>
                        <div className="flex items-center justify-between pb-3 border-b border-white/10">
                          <span className="text-xs text-white/70">Gross Margin</span>
                          <span className="font-mono font-bold text-emerald-400 text-base">{grossMargin.toFixed(1)}%</span>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm font-semibold text-white">Net Contribution Margin</span>
                          <span className={`font-mono text-2xl font-extrabold ${netProfit >= 0 ? 'text-[#3FE0E0]' : 'text-rose-400'}`}>
                            ₹{netProfit.toFixed(0)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/60">Net Profit Margin</span>
                          <span className={`font-mono font-bold text-sm ${netMargin >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {netMargin.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-center">
                      {netMargin > 15 ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>Profitable unit economics. High scalability runway.</span>
                        </span>
                      ) : netMargin > 0 ? (
                        <span className="inline-flex items-center gap-1.5 text-amber-400">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>Slim margins. Optimize repeat orders or scale AOV.</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-rose-400">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>Loss-making on acquisition. Requires immediate audit.</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ROAS & AD SPEND */}
              {activeTab === 'roi' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#3FE0E0] uppercase tracking-wider mb-2">
                      <Target className="w-4 h-4" />
                      <span>Campaign Performance Metrics</span>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-2">
                        Monthly Paid Ad Spend (₹)
                      </label>
                      <input
                        type="number"
                        aria-label="Monthly Paid Ad Spend"
                        value={adSpend}
                        onChange={(e) => setAdSpend(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-white/60 mb-2">
                          Cost Per Acquisition (₹ CPA)
                        </label>
                        <input
                          type="number"
                          aria-label="Cost Per Acquisition"
                          value={roiCpa}
                          onChange={(e) => setRoiCpa(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-white/60 mb-2">
                          Average Order Value (₹ AOV)
                        </label>
                        <input
                          type="number"
                          aria-label="Average Order Value"
                          value={avgOrderValue}
                          onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div>
                      <div className="text-xs font-mono text-[#3FE0E0] uppercase tracking-wider mb-6">
                        ROAS &amp; Uplift Projections
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-white/10">
                          <span className="text-xs text-white/70">Estimated Monthly Conversions</span>
                          <span className="font-mono font-bold text-white text-base">{conversions} orders</span>
                        </div>
                        <div className="flex items-center justify-between pb-3 border-b border-white/10">
                          <span className="text-xs text-white/70">Current Attributed Revenue</span>
                          <span className="font-mono font-bold text-white text-base">₹{currentRevenue.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex items-center justify-between pb-3 border-b border-white/10">
                          <span className="text-xs text-white/70">Current Blended ROAS</span>
                          <span className="font-mono font-bold text-white text-base">{currentRoas}x</span>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm font-semibold text-white">Projected Qala Uplift (+28%)</span>
                          <span className="font-mono text-2xl font-extrabold text-[#3FE0E0]">
                            ₹{projectedRevenue.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/60">Optimized Target ROAS</span>
                          <span className="font-mono font-bold text-emerald-400 text-sm">{projectedRoas}x</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-center">
                      <span className="text-white/80">Average 28% ROAS uplift unlocked via CAPI and autonomous creative testing.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PROFITABILITY FORECAST */}
              {activeTab === 'profit' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#3FE0E0] uppercase tracking-wider mb-2">
                      <Calculator className="w-4 h-4" />
                      <span>Growth Horizon Modeling</span>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-2">
                        Current Annual / Monthly GMV (₹)
                      </label>
                      <input
                        type="number"
                        aria-label="Current GMV"
                        value={currentGmv}
                        onChange={(e) => setCurrentGmv(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-white/60 mb-2">
                          Target Growth Target (%)
                        </label>
                        <input
                          type="number"
                          aria-label="Target Growth Target"
                          value={targetGrowth}
                          onChange={(e) => setTargetGrowth(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-white/60 mb-2">
                          Expected Net Profit Margin (%)
                        </label>
                        <input
                          type="number"
                          aria-label="Net Profit Margin"
                          value={profitMargin}
                          onChange={(e) => setProfitMargin(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-xs text-white/70">Projected Scaled GMV</span>
                        <span className="font-mono font-bold text-white text-base">₹{projectedGmv.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-xs text-white/70">Current Net Profit</span>
                        <span className="font-mono font-bold text-white text-base">₹{currentNetProfit.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-semibold text-white">Incremental Net Profit</span>
                        <span className="font-mono text-2xl font-extrabold text-[#3FE0E0]">
                          +₹{incrementalProfit.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: LTV : CAC UNIT ECONOMICS */}
              {activeTab === 'ltv' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#3FE0E0] uppercase tracking-wider mb-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>Cohort Lifetime Value Metrics</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-white/60 mb-2">
                          Average Order Value (₹)
                        </label>
                        <input
                          type="number"
                          aria-label="Average Order Value"
                          value={ltvAov}
                          onChange={(e) => setLtvAov(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-white/60 mb-2">
                          Annual Purchase Frequency
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          aria-label="Purchase Frequency"
                          value={purchaseFrequency}
                          onChange={(e) => setPurchaseFrequency(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-white/60 mb-2">
                          Customer Lifespan (Years)
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          aria-label="Customer Lifespan"
                          value={retentionYears}
                          onChange={(e) => setRetentionYears(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-white/60 mb-2">
                          Blended Acquisition Cost (₹ CAC)
                        </label>
                        <input
                          type="number"
                          aria-label="Blended CAC"
                          value={acquisitionCost}
                          onChange={(e) => setAcquisitionCost(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-xs text-white/70">Estimated Lifetime Value (LTV)</span>
                        <span className="font-mono font-bold text-white text-base">₹{customerLtv.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-xs text-white/70">Blended CAC</span>
                        <span className="font-mono font-bold text-white text-base">₹{acquisitionCost}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-semibold text-white">LTV : CAC Multiple</span>
                        <span className="font-mono text-2xl font-extrabold text-[#3FE0E0]">
                          {ltvCacRatio} : 1
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-center">
                      {Number(ltvCacRatio) >= 3 ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>Healthy unit economics (&ge; 3:1). High reinvestment efficiency.</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-amber-400">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>Tight ratio (&lt; 3:1). Recommend improving repeat orders or lowering CAC.</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Send Diagnostic Copy Section */}
              <div className="mt-10 pt-8 border-t border-white/10">
                <div className="max-w-2xl mx-auto text-center">
                  <span className="text-xs font-mono text-[#3FE0E0] uppercase tracking-wider block mb-2">
                    RECEIVE A COPY BY EMAIL
                  </span>
                  <p className="text-xs text-white/60 mb-5">
                    Enter your details to receive an executive PDF breakdown with actionable growth recommendations.
                  </p>

                  {emailSuccess ? (
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Audit dispatched! Check your inbox for confirmation and scheduling links.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleSendReport} className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        required
                        aria-label="Work Email Address"
                        placeholder="work@company.com"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-full bg-white/[0.05] border border-white/15 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#3FE0E0]"
                      />
                      <button
                        type="submit"
                        disabled={emailLoading}
                        className="cursor-pointer px-6 py-3 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all disabled:opacity-50"
                      >
                        {emailLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                        <span>Send Strategy Copy</span>
                      </button>
                    </form>
                  )}

                  {emailError && (
                    <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                        <span>{emailError}</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <a href="mailto:hello@qalalabs.com" className="underline font-semibold hover:text-white">
                          Email Support
                        </a>
                        <span>&bull;</span>
                        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline font-semibold text-[#34D399]">
                          WhatsApp Direct
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default ToolsPage;
