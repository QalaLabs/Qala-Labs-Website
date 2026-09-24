import React, { useState, useEffect } from 'react';
import { PageLayout } from './PageLayout';
import { SEO } from '../components/SEO';
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
} from 'lucide-react';

export const ToolsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ecom' | 'roi' | 'profit' | 'ltv'>('ecom');

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

      setEmailSuccess(true);
    } catch {
      setEmailError('Network issue. You can also reach us at hello@qalalabs.com');
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <PageLayout>
      <SEO
        title="Growth Calculators & Unit Economics Tools"
        description="Free mathematical models, ROAS targets, contribution margin equations, and LTV models engineered by Qala Labs."
        image="/assets/og/og-tools.jpg"
        url="/tools"
      />
      {/* 1. Header Hero */}
      <section className="relative pt-40 pb-16 bg-transparent overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(63,224,224,0.12),rgba(255,255,255,0))] pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center max-w-4xl">
          <div className="eyebrow">
            <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-pulse" />
            FREE GROWTH ARCHITECTURE TOOLKIT
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-medium text-white tracking-tight leading-tight mt-4 mb-6">
            Data-Driven{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#3FE0E0] to-[#34D399]">
              Growth Calculators.
            </span>
          </h1>

          <p className="text-white/70 text-base sm:text-xl font-normal max-w-2xl mx-auto leading-relaxed mb-8">
            The exact mathematical models and contribution margin equations we use to audit, engineer, and scale 8-figure brands.
          </p>

          {/* Tool Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto p-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('ecom')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all ${
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
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all ${
                activeTab === 'roi'
                  ? 'bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white shadow-lg shadow-[#3FE0E0]/20'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>ROAS & Ad Spend</span>
            </button>

            <button
              onClick={() => setActiveTab('profit')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all ${
                activeTab === 'profit'
                  ? 'bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white shadow-lg shadow-[#3FE0E0]/20'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Profitability Forecast</span>
            </button>

            <button
              onClick={() => setActiveTab('ltv')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all ${
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

      {/* 2. Calculator Body */}
      <section className="py-12 bg-transparent">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
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
                        value={sellingPrice}
                        onChange={(e) => setSellingPrice(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-2">
                        Product COGS / Landing Cost (₹)
                      </label>
                      <input
                        type="number"
                        value={cogs}
                        onChange={(e) => setCogs(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                    <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider block">
                      Platform & Logistics Friction
                    </span>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-white/50 mb-1">Referral (%)</label>
                        <input
                          type="number"
                          value={referralPercent}
                          onChange={(e) => setReferralPercent(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#3FE0E0]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-white/50 mb-1">Closing / Gateway (₹)</label>
                        <input
                          type="number"
                          value={closingFee}
                          onChange={(e) => setClosingFee(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#3FE0E0]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-white/50 mb-1">Shipping & Packaging (₹)</label>
                        <input
                          type="number"
                          value={shippingFee}
                          onChange={(e) => setShippingFee(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#3FE0E0]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-2">
                      Target Ad CPA / Blended Customer Acquisition (₹)
                    </label>
                    <input
                      type="number"
                      value={cpa}
                      onChange={(e) => setCpa(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                    />
                  </div>
                </div>

                {/* Outputs */}
                <div className="lg:col-span-5 rounded-3xl bg-black/40 border border-white/10 p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-4">
                      UNIT MARGIN BREAKDOWN
                    </span>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-xs text-white/70">Gross Profit / Unit</span>
                        <span className="font-mono font-bold text-white text-base">₹{Math.max(0, grossProfit).toFixed(0)}</span>
                      </div>
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-xs text-white/70">Marketplace / Payment Fees</span>
                        <span className="font-mono text-red-400 text-xs">-₹{totalMarketplaceFees.toFixed(0)}</span>
                      </div>
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-xs text-white/70">Customer Acquisition Cost</span>
                        <span className="font-mono text-red-400 text-xs">-₹{cpa}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-semibold text-white">Contribution Net Profit</span>
                        <span className={`font-mono text-xl font-extrabold ${netProfit > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          ₹{netProfit.toFixed(0)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 gap-3 text-center">
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                        <span className="text-[10px] font-mono text-white/40 uppercase block">Gross Margin</span>
                        <span className="text-lg font-bold text-white font-mono mt-1 block">{grossMargin.toFixed(1)}%</span>
                      </div>
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                        <span className="text-[10px] font-mono text-white/40 uppercase block">Net Margin</span>
                        <span className={`text-lg font-bold font-mono mt-1 block ${netMargin >= 18 ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {netMargin.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-[11px] font-mono text-white/50 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                    {netMargin >= 20 ? (
                      <span className="text-emerald-400">✓ Healthy unit economics. Ready for aggressive ad spend scaling.</span>
                    ) : (
                      <span className="text-amber-400">⚠ Margin compressed. Recommend increasing AOV with bundles or reducing COGS.</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: AD SPEND ROI CALCULATOR */}
            {activeTab === 'roi' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#3FE0E0] uppercase tracking-wider mb-2">
                    <Target className="w-4 h-4" />
                    <span>Media Spend & Attribution Variables</span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-2">
                      Monthly Paid Ad Spend (₹)
                    </label>
                    <input
                      type="number"
                      value={adSpend}
                      onChange={(e) => setAdSpend(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-2">
                        Target Cost Per Purchase / CPA (₹)
                      </label>
                      <input
                        type="number"
                        value={roiCpa}
                        onChange={(e) => setRoiCpa(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-2">
                        Average Order Value / AOV (₹)
                      </label>
                      <input
                        type="number"
                        value={avgOrderValue}
                        onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-white/70 space-y-1.5">
                    <div className="font-semibold text-white">How Qala Labs optimizes this:</div>
                    <div>• Generative creative testing (50+ hooks/wk) drops CPA by 25-40%</div>
                    <div>• Post-click conversion rate tuning expands order velocity</div>
                    <div>• Server-side CAPI guarantees zero ad pixel signal loss</div>
                  </div>
                </div>

                <div className="lg:col-span-5 rounded-3xl bg-black/40 border border-white/10 p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-4">
                      PROJECTED RETURN ON AD SPEND
                    </span>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-xs text-white/70">Estimated Monthly Orders</span>
                        <span className="font-mono font-bold text-white text-base">{conversions} orders</span>
                      </div>
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-xs text-white/70">Current Monthly Revenue</span>
                        <span className="font-mono font-bold text-white text-base">₹{currentRevenue.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-xs text-white/70">Current Blended ROAS</span>
                        <span className="font-mono font-bold text-[#3FE0E0] text-base">{currentRoas}x</span>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-semibold text-white">With Qala Swarm & CRO</span>
                        <span className="font-mono text-xl font-extrabold text-emerald-400">
                          ₹{projectedRevenue.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 rounded-2xl bg-emerald-500/[0.08] border border-emerald-500/20 text-center">
                      <span className="text-[10px] font-mono text-emerald-300 uppercase block">Projected Scaled ROAS</span>
                      <span className="text-3xl font-extrabold text-emerald-400 font-mono mt-1 block">{projectedRoas}x</span>
                    </div>
                  </div>

                  <div className="mt-6 text-[11px] font-mono text-white/50 text-center">
                    Audited across Meta Ads & Google PMax architectures
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PROFITABILITY ESTIMATOR */}
            {activeTab === 'profit' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#3FE0E0] uppercase tracking-wider mb-2">
                    <Calculator className="w-4 h-4" />
                    <span>Annual Horizon Forecast</span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-2">
                      Current Annual GMV / Run-Rate (₹)
                    </label>
                    <input
                      type="number"
                      value={currentGmv}
                      onChange={(e) => setCurrentGmv(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-2">
                        Target Annual Growth Rate (%)
                      </label>
                      <input
                        type="number"
                        value={targetGrowth}
                        onChange={(e) => setTargetGrowth(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-2">
                        Target Net Profit Margin (%)
                      </label>
                      <input
                        type="number"
                        value={profitMargin}
                        onChange={(e) => setProfitMargin(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 rounded-3xl bg-black/40 border border-white/10 p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-4">
                      EXPANSION RUN-RATE
                    </span>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-xs text-white/70">Projected Annual GMV</span>
                        <span className="font-mono font-bold text-white text-base">₹{(projectedGmv / 10000000).toFixed(2)} Cr</span>
                      </div>
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-xs text-white/70">Current Net Annual Profit</span>
                        <span className="font-mono font-bold text-white text-base">₹{(currentNetProfit / 100000).toFixed(1)} Lakhs</span>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-semibold text-white">Projected Annual Profit</span>
                        <span className="font-mono text-xl font-extrabold text-[#34D399]">
                          ₹{(projectedNetProfit / 100000).toFixed(1)} Lakhs
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                      <span className="text-[10px] font-mono text-white/40 uppercase block">Incremental Profit Throughput</span>
                      <span className="text-2xl font-extrabold text-[#3FE0E0] font-mono mt-1 block">
                        +₹{(incrementalProfit / 100000).toFixed(1)} Lakhs
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: LTV : CAC RATIO */}
            {activeTab === 'ltv' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#3FE0E0] uppercase tracking-wider mb-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Customer Retention & Cohort Math</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-2">
                        Average Order Value / AOV (₹)
                      </label>
                      <input
                        type="number"
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
                        value={retentionYears}
                        onChange={(e) => setRetentionYears(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-2">
                        Blended CAC (₹)
                      </label>
                      <input
                        type="number"
                        value={acquisitionCost}
                        onChange={(e) => setAcquisitionCost(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#3FE0E0]"
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 rounded-3xl bg-black/40 border border-white/10 p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-4">
                      LTV TO CAC RATIO BENCHMARK
                    </span>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-xs text-white/70">Estimated Customer Lifetime Value</span>
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
                        <span className="text-emerald-400">✓ Healthy unit economics (&ge; 3:1). High reinvestment efficiency.</span>
                      ) : (
                        <span className="text-amber-400">⚠ Ratio is tight (&lt; 3:1). Recommend improving repeat orders or lowering CAC.</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Send Diagnostic Copy Section */}
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
                    <span>Audit sent! Check your inbox for confirmation and scheduling links.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSendReport} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      required
                      placeholder="work@company.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-full bg-white/[0.05] border border-white/15 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#3FE0E0]"
                    />
                    <button
                      type="submit"
                      disabled={emailLoading}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all disabled:opacity-50"
                    >
                      {emailLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                      <span>Send Strategy Copy</span>
                    </button>
                  </form>
                )}
                {emailError && (
                  <p className="text-xs text-red-400 font-mono mt-2">{emailError}</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ToolsPage;
