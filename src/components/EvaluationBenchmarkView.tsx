/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Award,
  Database,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Sliders,
  CheckCircle,
  Copy,
  Check,
  Zap,
  Lock,
  Scale
} from 'lucide-react';

export default function EvaluationBenchmarkView() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    });
  };

  return (
    <div className="h-full overflow-y-auto p-8 bg-[#F8FAFC] custom-scrollbar text-slate-800 pb-16">
      
      {/* Executive Header Block */}
      <div className="mb-2.5">
        <h1 className="text-[13px] font-black tracking-tight text-[#0F172A] font-sans uppercase leading-none">
          Dataset & Moat Credibility Dashboard
        </h1>
        <p className="text-[10px] text-[#64748B] mt-0.5">
          Verifiably demonstrating CDT-X's proprietary behavioral biometric foundations, elite model accuracy margins, and regulatory data superiority.
        </p>
      </div>

      {/* Five Pillars of Credibility - KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 select-none">
        
        {/* Synthetic Dataset Size */}
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between h-36">
          <div>
            <span className="text-slate-400 text-[10px] font-mono tracking-widest uppercase block mb-1">
              Dataset Size
            </span>
            <div className="text-xl font-extrabold text-[#0D172A] font-sans tracking-tight mt-1">
              40,000+ Profiles
            </div>
          </div>
          <div className="text-[10.5px] text-slate-500 font-sans leading-snug">
            Stratified behavioral samples with zero null value leakage.
          </div>
        </div>

        {/* Validation Coverage */}
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between h-36">
          <div>
            <span className="text-slate-400 text-[10px] font-mono tracking-widest uppercase block mb-1">
              Validation Coverage
            </span>
            <div className="text-xl font-extrabold text-[#16A34A] font-sans tracking-tight mt-1">
              99.98% Interval
            </div>
          </div>
          <div className="text-[10.5px] text-slate-500 font-sans leading-snug">
            Calibrated securely across diverse regional exam populations.
          </div>
        </div>

        {/* Model Evaluation */}
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between h-36">
          <div>
            <span className="text-slate-400 text-[10px] font-mono tracking-widest uppercase block mb-1">
              Model Evaluation
            </span>
            <div className="text-xl font-bold text-[#2563EB] font-sans tracking-tight mt-1">
              0.985 AUC-ROC
            </div>
          </div>
          <div className="text-[10.5px] text-slate-500 font-sans leading-snug">
            Extremely conservative operating settings to prevent false locks.
          </div>
        </div>

        {/* Detection Accuracy */}
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between h-36">
          <div>
            <span className="text-slate-400 text-[10px] font-mono tracking-widest uppercase block mb-1">
              Detection Accuracy
            </span>
            <div className="text-xl font-extrabold text-[#D97706] font-sans tracking-tight mt-1">
              97.4% Precision
            </div>
          </div>
          <div className="text-[10.5px] text-slate-500 font-sans leading-snug">
            High-fidelity verification of typing drift and spatial jumps.
          </div>
        </div>

        {/* Audit Reliability */}
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between h-36">
          <div>
            <span className="text-slate-400 text-[10px] font-mono tracking-widest uppercase block mb-1">
              Audit Reliability
            </span>
            <div className="text-xl font-extrabold text-[#7C3AED] font-sans tracking-tight mt-1">
              100% Cryptographic
            </div>
          </div>
          <div className="text-[10.5px] text-slate-500 font-sans leading-snug">
            Sealed automatically into SHA-256 replication logs.
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Section 1: Core Foundation Moat Block (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          <div>
            <div className="border-b border-[#F1F5F9] pb-3 mb-4 select-none">
              <span className="text-[9.5px] font-mono text-[#16A34A] bg-[#EFF6FF] border border-[#BFDBFE] px-2.5 py-0.5 rounded-md uppercase font-bold">
                Competitive Moat
              </span>
              <h3 className="font-sans font-extrabold text-[#0F172A] text-base mt-2.5">
                Our Proprietary Foundation Barriers
              </h3>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed mb-6 font-sans">
              CDT-X represents a foundational breakthrough in remote exam safety by moving completely away from noisy, easily bypassed webcams and storing zero invasive audio/video packets.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-4 rounded-xl border border-[#E2E8F0] hover:border-slate-300 transition-colors">
                <span className="text-xs font-bold text-slate-800 block flex items-center gap-1.5 font-sans mb-1">
                  <Zap className="w-4 h-4 text-[#2563EB]" />
                  Zero Biometric Liability
                </span>
                <p className="text-[11px] text-[#475569] leading-relaxed">
                  Eliminates retina scans, face records, and voice printing liabilities. Avoids severe class-action lawsuits and regulatory fines under GDPR or Indian data regulations.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#E2E8F0] hover:border-slate-300 transition-colors">
                <span className="text-xs font-bold text-slate-800 block flex items-center gap-1.5 font-sans mb-1">
                  <Database className="w-4 h-4 text-[#2563EB]" />
                  Passive Biometric Modeling
                </span>
                <p className="text-[11px] text-[#475569] leading-relaxed">
                  Captures typing velocity dwell-times, keystroke flight signatures, mouse curves, and visual context switches natively inside standard browser sandboxes.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#E2E8F0] hover:border-slate-300 transition-colors">
                <span className="text-xs font-bold text-slate-800 block flex items-center gap-1.5 font-sans mb-1">
                  <Lock className="w-4 h-4 text-[#2563EB]" />
                  100% Client Offline Resiliency
                </span>
                <p className="text-[11px] text-[#475569] leading-relaxed">
                  Raw behavioral coordinates are modeled securely at the edge, resisting active connection drops gracefully without corrupting forensic session logs.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#E2E8F0] hover:border-slate-300 transition-colors">
                <span className="text-xs font-bold text-slate-800 block flex items-center gap-1.5 font-sans mb-1">
                  <Scale className="w-4 h-4 text-[#2563EB]" />
                  Global Defense Scalability
                </span>
                <p className="text-[11px] text-[#475569] leading-relaxed">
                  Traditional video streams throttle bandwidth and physical audits. CDT-X operates at negligible server network overhead, reducing operational costs by over 80%.
                </p>
              </div>

            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#F1F5F9] flex justify-between items-center text-[11px] text-slate-400 font-mono">
            <span>REGISTERED CODES: 0x9821_CDTX_FOUNDATION</span>
            <button
              onClick={() => handleCopy("0x9821_CDTX_FOUNDATION", "reg")}
              className="hover:text-[#2563EB] transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedKey === 'reg' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              Copy ID
            </button>
          </div>

        </div>

        {/* Section 2: Relative Multi-modal Performance Comparison (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          <div>
            <div className="border-b border-[#F1F5F9] pb-3 mb-4 select-none">
              <span className="text-[9.5px] font-mono text-[#D97706] bg-[#FFFBEB] border border-[#FDE68A] px-2.5 py-0.5 rounded-md uppercase font-bold">
                Model Evaluation
              </span>
              <h3 className="font-sans font-extrabold text-[#0F172A] text-base mt-2.5">
                Evaluation Performance Lift
              </h3>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed mb-6 font-sans">
              Traditional proctors track single isolated factors which can be bypassed easily. Unified multi-modal analysis locks down bypass routes conclusively.
            </p>

            {/* Performance Comparison Blocks */}
            <div className="space-y-4 font-mono text-[10.5px]">
              
              {/* Keyboard Dynamic Gain */}
              <div className="space-y-1">
                <div className="flex justify-between font-bold text-slate-600">
                  <span>Traditional Single-Factor (Typing only)</span>
                  <span>F1: 0.78</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-lg overflow-hidden border border-[#E2E8F0]">
                  <div className="h-full bg-slate-400 rounded-lg" style={{ width: '78%' }} />
                </div>
              </div>

              {/* Spatial Mouse Dynamics alone */}
              <div className="space-y-1">
                <div className="flex justify-between font-bold text-slate-600">
                  <span>Traditional Single-Factor (Mouse only)</span>
                  <span>F1: 0.72</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-lg overflow-hidden border border-[#E2E8F0]">
                  <div className="h-full bg-slate-400 rounded-lg" style={{ width: '72%' }} />
                </div>
              </div>

              {/* CDT-X Multi-Modal lift */}
              <div className="space-y-1">
                <div className="flex justify-between font-bold text-[#2563EB]">
                  <span>CDT-X Multi-Modal Behavior Modeling</span>
                  <span>F1: 0.94</span>
                </div>
                <div className="w-full bg-[#EFF6FF] h-3 rounded-lg overflow-hidden border border-blue-200">
                  <div className="h-full bg-[#2563EB] rounded-lg" style={{ width: '94%' }} />
                </div>
              </div>

            </div>

            <div className="mt-5 p-4 bg-blue-50/50 border border-blue-100 rounded-xl text-xs text-slate-600 leading-relaxed font-sans">
              <span className="font-bold text-[#2563EB] uppercase block mb-0.5">Integration Advantage:</span>
              Combining hold-time vectors with response delay pacing and focus interval limits delivers a <strong className="text-slate-800">+20.5% F1 compliance boost</strong> over legacy tools.
            </div>

          </div>

          <div className="pt-4 border-t border-[#F1F5F9] text-center select-none text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            Audit Resilience Approved
          </div>

        </div>

      </div>

    </div>
  );
}
