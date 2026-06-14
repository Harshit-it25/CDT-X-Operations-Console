/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Laptop, 
  Radio, 
  Sliders, 
  Fingerprint, 
  Brain, 
  Search, 
  ScrollText,
  ChevronRight
} from 'lucide-react';

interface BehaviorCollectionFlowProps {
  currentStage?: number; // Optional highlight index
}

export default function BehaviorCollectionFlow({ currentStage = 4 }: BehaviorCollectionFlowProps) {
  const steps = [
    { name: "Student Device", desc: "Local keystroke & mouse interrupts", icon: Laptop },
    { name: "Raw Events", desc: "Timestamped coordinate packets", icon: Radio },
    { name: "Feature Extraction", desc: "Bezier spline & dwell metrics", icon: Sliders },
    { name: "Digital Twin", desc: "512D muscle memory baseline", icon: Fingerprint },
    { name: "Trust Engine", desc: "Bayesian anomaly classification", icon: Brain },
    { name: "Investigation", desc: "Forensic dashboard verification", icon: Search },
    { name: "Audit Ledger", desc: "Legally defensible signed logs", icon: ScrollText }
  ];

  return (
    <div className="w-full bg-white border border-[#E2E8F0] p-3 rounded-xl shadow-sm select-none mb-3">
      <div className="flex justify-between items-center pb-2 border-b border-[#F1F5F9] mb-2.5">
        <span className="text-[10px] font-mono font-black text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
          <Radio className="w-3.5 h-3.5 text-[#2563EB] animate-pulse" />
          CDT-X Behavioral Integrity Pipeline Flow
        </span>
        <span className="text-[8.5px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded font-bold uppercase">
          Continuous Trust Verification Loop
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = idx < currentStage;
          const isActive = idx === currentStage;
          
          let cardStyle = "bg-white border-[#E2E8F0] text-slate-500";
          let iconStyle = "bg-slate-50 text-slate-400 border-[#E2E8F0]";
          
          if (isActive) {
            cardStyle = "bg-[#EFF6FF] border-[#93C5FD] text-[#2563EB] shadow-sm";
            iconStyle = "bg-[#2563EB] text-white border-transparent animate-pulse";
          } else if (isCompleted) {
            cardStyle = "bg-emerald-50/50 border-emerald-200 text-emerald-805";
            iconStyle = "bg-emerald-500 text-white border-transparent";
          }

          return (
            <div key={idx} className="relative flex items-center md:flex-col md:text-center">
              {/* Box */}
              <div className={`flex flex-row md:flex-col items-center gap-2.5 md:gap-1.5 p-2 rounded-xl border w-full h-full transition-all ${cardStyle}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 text-xs ${iconStyle}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 md:w-full">
                  <div className="text-[10.5px] font-bold tracking-tight leading-tight truncate md:whitespace-normal font-sans">
                    {step.name}
                  </div>
                  <p className="text-[8.5px] leading-snug mt-0.5 hidden sm:block md:hidden lg:block text-slate-400 truncate">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Connecting arrow (only for desktop md screens, not on the last item) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-1.5 z-20 items-center justify-center pointer-events-none">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
