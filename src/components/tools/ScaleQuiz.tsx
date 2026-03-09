"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  Zap, 
  Target, 
  TrendingUp, 
  ShieldCheck,
  IndianRupee,
  Rocket,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from '@/utils/toast';

const questions = [
  {
    id: 'revenue',
    title: "What is your current monthly revenue?",
    options: [
      { label: "Under ₹5L", score: 10 },
      { label: "₹5L - ₹20L", score: 25 },
      { label: "₹20L - ₹50L", score: 40 },
      { label: "₹50L+", score: 50 }
    ]
  },
  {
    id: 'roas',
    title: "What is your current average ROAS?",
    options: [
      { label: "Below 2.0x", score: 5 },
      { label: "2.0x - 3.5x", score: 20 },
      { label: "3.5x - 5.0x", score: 35 },
      { label: "Above 5.0x", score: 50 }
    ]
  },
  {
    id: 'creative',
    title: "How many new ad creatives do you test weekly?",
    options: [
      { label: "None / Irregular", score: 0 },
      { label: "1 - 3 variants", score: 15 },
      { label: "4 - 10 variants", score: 30 },
      { label: "10+ variants", score: 50 }
    ]
  },
  {
    id: 'tracking',
    title: "Do you have server-side tracking (CAPI) enabled?",
    options: [
      { label: "No / Not sure", score: 0 },
      { label: "Only basic Pixel", score: 10 },
      { label: "Yes, fully implemented", score: 50 }
    ]
  }
];

const ScaleQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");

  const totalSteps = questions.length + 1; // +1 for lead capture
  const progress = ((step) / totalSteps) * 100;

  const handleOptionSelect = (id: string, option: any) => {
    setAnswers({ ...answers, [id]: option });
    setStep(step + 1);
  };

  const calculateTotalScore = () => {
    return Object.values(answers).reduce((acc: number, curr: any) => acc + curr.score, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const score = calculateTotalScore();
    const maxScore = questions.length * 50;
    const percentage = Math.round((score / maxScore) * 100);

    const { error } = await supabase.from('leads').insert({
      email,
      tool_used: 'scale_potential_quiz',
      data: {
        answers: Object.entries(answers).map(([key, val]: [string, any]) => ({ question: key, answer: val.label })),
        score: percentage,
        status: 'qualified'
      }
    });

    setLoading(false);
    if (error) {
      showError("Something went wrong. Please try again.");
    } else {
      showSuccess("Report generated!");
      setShowResults(true);
    }
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 80) return "Prime for Explosive Scale. Your infrastructure is ready for 8-figure volume.";
    if (percentage >= 50) return "Ready for Growth Sprints. A few technical optimizations will unlock major ROAS.";
    return "Foundation Building Required. Focus on tracking and creative velocity before scaling spend.";
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Step {step + 1} of {totalSteps}</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">{Math.round(progress)}% Complete</p>
        </div>
        <Progress value={progress} className="h-1.5 bg-slate-100" />
      </div>

      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border border-slate-100"
          >
            {step < questions.length ? (
              <div className="space-y-8">
                <h3 className="text-3xl font-black text-slate-900 leading-tight">
                  {questions[step].title}
                </h3>
                <div className="grid gap-4">
                  {questions[step].options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionSelect(questions[step].id, option)}
                      className="group flex items-center justify-between p-6 bg-slate-50 hover:bg-blue-600 border border-slate-100 hover:border-blue-600 rounded-2xl transition-all text-left"
                    >
                      <span className="font-bold text-slate-700 group-hover:text-white transition-colors">{option.label}</span>
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <button 
                    onClick={() => setStep(step - 1)}
                    className="text-sm font-bold text-slate-400 hover:text-slate-600 flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous Question
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Rocket className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-2">Analyzing Results...</h3>
                  <p className="text-slate-500">We've calculated your score. Where should we send the full 90-day roadmap?</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Work Email</Label>
                    <Input 
                      type="email" 
                      required 
                      placeholder="ceo@brand.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 rounded-xl text-lg px-6"
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xl shadow-xl shadow-blue-500/20 transition-all">
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Generate My Scale Report"}
                  </Button>
                </form>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 rounded-[3.5rem] p-12 md:p-20 text-white text-center shadow-2xl relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-xs font-black uppercase tracking-widest mb-8">
                <CheckCircle2 className="w-4 h-4" /> Assessment Complete
              </div>
              
              <h3 className="text-sm font-black text-blue-400 uppercase tracking-[0.3em] mb-4">Your Scale Potential Score</h3>
              <div className="text-8xl font-black mb-8 tracking-tighter text-white">
                {calculateTotalScore() > 0 ? Math.round((calculateTotalScore() / (questions.length * 50)) * 100) : 0}%
              </div>
              
              <p className="text-2xl font-bold text-slate-300 mb-12 max-w-xl mx-auto leading-relaxed">
                {getScoreMessage(Math.round((calculateTotalScore() / (questions.length * 50)) * 100))}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <Target className="w-6 h-6 text-blue-400 mb-4 mx-auto" />
                  <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Efficiency</p>
                  <p className="font-bold">Optimized</p>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <Zap className="w-6 h-6 text-blue-400 mb-4 mx-auto" />
                  <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Velocity</p>
                  <p className="font-bold">Moderate</p>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <ShieldCheck className="w-6 h-6 text-blue-400 mb-4 mx-auto" />
                  <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Stability</p>
                  <p className="font-bold">High</p>
                </div>
              </div>

              <Button className="bg-white text-slate-900 hover:bg-slate-100 px-10 py-8 rounded-2xl text-xl font-black transition-all">
                Book Implementation Call <ChevronRight className="ml-2 w-6 h-6" />
              </Button>
            </div>

            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -ml-48 -mb-48" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScaleQuiz;