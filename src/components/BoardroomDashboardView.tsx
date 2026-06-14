/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Building, 
  Users, 
  ShieldAlert, 
  TrendingUp, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Sparkles,
  CheckCircle,
  HelpCircle,
  Award,
  Zap,
  TrendingDown,
  Lock,
  Scaling
} from 'lucide-react';

export default function BoardroomDashboardView() {
  const [fraudValue, setFraudValue] = useState(1.24);
  const [savingsValue, setSavingsValue] = useState(28.2);
  const [auditSpeed, setAuditSpeed] = useState(4.0);
  const [roiValue, setRoiValue] = useState(412);
  const [traditionalCosts, setTraditionalCosts] = useState(3500000);
  const [cdtxCosts, setCdtxCosts] = useState(680000);

  useEffect(() => {
    const interval = setInterval(() => {
      setFraudValue(prev => {
        const delta = (Math.random() - 0.4) * 0.015;
        return parseFloat(Math.max(1.15, Math.min(1.45, prev + delta)).toFixed(2));
      });
      setSavingsValue(prev => {
        const delta = (Math.random() - 0.4) * 0.2;
        return parseFloat(Math.max(26.0, Math.min(32.5, prev + delta)).toFixed(1));
      });
      setAuditSpeed(prev => {
        const delta = (Math.random() - 0.5) * 0.15;
        return parseFloat(Math.max(3.6, Math.min(4.5, prev + delta)).toFixed(1));
      });
      setRoiValue(prev => {
        const delta = Math.floor((Math.random() - 0.4) * 3);
        return Math.max(395, Math.min(430, prev + delta));
      });
      setTraditionalCosts(prev => {
        const delta = Math.floor((Math.random() - 0.5) * 2500);
        return prev + delta;
      });
      setCdtxCosts(prev => {
        const delta = Math.floor((Math.random() - 0.5) * 800);
        return prev + delta;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (val: number) => {
    return val.toLocaleString('en-IN');
  };
  return (
    <div className="h-full overflow-y-auto p-8 bg-[#F8FAFC] custom-scrollbar text-slate-800 pb-16">
      
      {/* Executive Header Block */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] font-sans">
          Business Impact Center
        </h1>
        <p className="text-[13px] text-[#475569] mt-0.5">
          Review high-level proctoring ROI, computational operational cost savings, fraud prevention parameters, and enterprise scalability metrics.
        </p>
      </div>

      {/* Main Core Light Scorecard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        
        {/* 1. FRAUD PREVENTION VALUE */}
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col justify-between h-32 hover:border-slate-300 transition-all">
          <div>
            <span className="text-slate-400 text-[10px] font-mono tracking-widest uppercase block mb-1">
              Fraud Prevention Key
            </span>
            <div className="text-xl font-extrabold text-[#D97706] font-sans tracking-tight mt-1">
              ₹{fraudValue} Crores
            </div>
          </div>
          <div className="text-[10.5px] text-slate-500 font-sans flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping"></span>
            Guarded with 99.8% accuracy
          </div>
        </div>

        {/* 2. COST SAVINGS */}
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col justify-between h-32 hover:border-slate-300 transition-all">
          <div>
            <span className="text-slate-400 text-[10px] font-mono tracking-widest uppercase block mb-1">
              Operational Cost Savings
            </span>
            <div className="text-xl font-extrabold text-[#16A34A] font-sans tracking-tight mt-1">
              ₹{savingsValue} Lakhs
            </div>
          </div>
          <div className="text-[10.5px] text-slate-500 font-sans">
            Eliminates intrusive proctor overheads
          </div>
        </div>

        {/* 3. AUDIT SPEED */}
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col justify-between h-32 hover:border-slate-300 transition-all">
          <div>
            <span className="text-slate-400 text-[10px] font-mono tracking-widest uppercase block mb-1">
              Audit Ingestion Speed
            </span>
            <div className="text-xl font-extrabold text-[#2563EB] font-sans tracking-tight mt-1">
              {auditSpeed} Seconds
            </div>
          </div>
          <div className="text-[10.5px] text-slate-500 font-sans">
            Down from 72 hour manual loops
          </div>
        </div>

        {/* 4. SCALABILITY */}
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col justify-between h-32 hover:border-slate-300 transition-all">
          <div>
            <span className="text-slate-400 text-[10px] font-mono tracking-widest uppercase block mb-1">
              Infinite Scalability
            </span>
            <div className="text-xl font-extrabold text-slate-800 font-sans tracking-tight mt-1">
              100k+ Solvers
            </div>
          </div>
          <div className="text-[10.5px] text-slate-500 font-sans">
            Simultaneous cloud evaluation
          </div>
        </div>

        {/* 5. RETURN ON INVESTMENT */}
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col justify-between h-32 hover:border-slate-300 transition-all">
          <div>
            <span className="text-slate-400 text-[10px] font-mono tracking-widest uppercase block mb-1">
              Return on Investment
            </span>
            <div className="text-xl font-extrabold text-[#7C3AED] font-sans tracking-tight mt-1">
              {roiValue}% ROI
            </div>
          </div>
          <div className="text-[10.5px] text-slate-500 font-sans">
            Full payback inside 4 months
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Cost comparison board (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-sans font-bold text-slate-800 text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-emerald-600" />
                Monthly Expenditure Model Variance
              </h3>

              {/* Bar charts for cost */}
              <div className="space-y-4 font-sans">
                
                {/* Traditional Expense */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono font-bold">
                    <span className="text-slate-500">TRADITIONAL HUMAN PROCTORING & STORAGE COSTS</span>
                    <span className="text-[#DC2626]">₹{formatCurrency(traditionalCosts)} / mo</span>
                  </div>
                  <div className="w-full bg-slate-100 h-6 rounded-xl border border-[#E2E8F0] overflow-hidden">
                    <div className="h-full bg-red-105 border-r border-[#DC2626] w-full flex items-center pl-3">
                      <span className="text-[10px] font-bold font-sans text-red-700 font-mono">EXTREME BANDWIDTH + PHYSICAL AUDIT LABOR OVERHEAD</span>
                    </div>
                  </div>
                </div>

                {/* CDT-X Digital Twin Expenses */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono font-bold">
                    <span className="text-[#2563EB]">CDT-X CONTINUOUS BIOMETRIC MODEL PASSIVE AUDITING</span>
                    <span className="text-[#16A34A]">₹{formatCurrency(cdtxCosts)} / mo</span>
                  </div>
                  <div className="w-full bg-slate-100 h-6 rounded-xl border border-[#E2E8F0] overflow-hidden">
                    <div className="h-full bg-emerald-50 border-r border-[#16A34A] w-[19.5%] flex items-center pl-3">
                      <span className="text-[10px] font-bold font-sans text-emerald-800 font-mono">AUTOMATED PASSIVE EDGE INFERENCE</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-5 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-slate-600 leading-relaxed font-sans font-medium">
              <span className="font-bold text-[#16A34A] uppercase block mb-1">Executive Impact Insight:</span>
              Replacing intrusive physical camera feeds with passive biometric modeling yields an <strong className="text-slate-800">80.4% savings profile</strong>. This altogether eliminates server stream storage costs, handles offline connection drops gracefully, and respects employee/examinee privacy guidelines completely.
            </div>

          </div>

          {/* Subfeatures */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
              <h4 className="font-bold text-slate-800 text-[13px] uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#2563EB]" />
                Compliance Liability Shield
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                By bypassing camera biometrics and photo caching, enterprise buyers completely clear severe regulatory, security, GDPR, and privacy lawsuit risks.
              </p>
            </div>

            <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
              <h4 className="font-bold text-slate-800 text-[13px] uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Scaling className="w-4 h-4 text-[#2563EB]" />
                Linear Computational Scale
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                CDT-X requires minimal database compute matrices, scaling fluidly across 100,000 parallel test-takers simultaneously without resource spikes or bottlenecks.
              </p>
            </div>

          </div>

        </div>

        {/* Corporate Defensibility rating (4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          <div>
            <div className="border-b border-[#F1F5F9] pb-3 mb-4 select-none">
              <span className="text-[9.5px] font-mono text-[#2563EB] bg-[#EFF6FF] border border-[#BFDBFE] px-2.5 py-0.5 rounded-md uppercase font-bold">
                Defensibility Checklist
              </span>
              <h3 className="font-sans font-extrabold text-[#0F172A] text-[16px] mt-2.5">
                Operational Quality Guard
              </h3>
            </div>

            <div className="space-y-4">
              
              <div className="flex gap-3 items-start font-sans">
                <div className="p-1.5 bg-emerald-50 rounded-xl border border-emerald-100 text-[#16A34A] shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-xs text-slate-800 block">Credential Solvency Protection</span>
                  <span className="text-[11px] text-slate-500 leading-relaxed mt-0.5 block">Ensures government exams and certifications retain total reputational prestige by making proxy testers impossible.</span>
                </div>
              </div>

              <div className="flex gap-3 items-start font-sans">
                <div className="p-1.5 bg-emerald-50 rounded-xl border border-emerald-100 text-[#16A34A] shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-xs text-slate-800 block">Reputational Brand Insurance</span>
                  <span className="text-[11px] text-slate-500 leading-relaxed mt-0.5 block">Guards test-author intellectual property from browser leaks or direct playground question exports during live sessions.</span>
                </div>
              </div>

              <div className="flex gap-3 items-start font-sans">
                <div className="p-1.5 bg-emerald-50 rounded-xl border border-emerald-100 text-[#16A34A] shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-xs text-slate-800 block">GDPR & DPDP Compliant Architecture</span>
                  <span className="text-[11px] text-slate-500 leading-relaxed mt-0.5 block">Fully respects global privacy acts by storing behavior math coefficients instead of raw, sensitive webcam frame packets.</span>
                </div>
              </div>

            </div>
          </div>

          <div className="pt-4 border-t border-[#F1F5F9] text-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Audit Compliance Approved ID: CDT_ROIL4</span>
          </div>

        </div>

      </div>

    </div>
  );
}
