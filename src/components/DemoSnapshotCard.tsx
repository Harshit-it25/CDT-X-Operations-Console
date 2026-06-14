/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Laptop, 
  UserCheck, 
  Eye, 
  Search, 
  ScrollText, 
  ChevronRight 
} from 'lucide-react';

interface DemoSnapshotCardProps {
  currentStage?: number;
}

export default function DemoSnapshotCard({ currentStage = -1 }: DemoSnapshotCardProps) {
  const steps = [
    { name: "Device", icon: Laptop },
    { name: "Profile", icon: UserCheck },
    { name: "Trust", icon: Eye },
    { name: "Investigation", icon: Search },
    { name: "Audit", icon: ScrollText }
  ];

  return (
    <div className="w-full bg-white border border-[#E2E8F0] p-2.5 rounded-xl shadow-sm select-none mb-2.5">
      <div className="flex justify-between items-center pb-1.5 border-b border-[#F1F5F9] mb-2">
        <span className="text-[11px] font-mono font-black text-[#475569] uppercase tracking-wider flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
          CDT-X Operational Lifecycle
        </span>
        <span className="text-[10px] font-mono text-[#2563EB] bg-[#EFF6FF] border border-[#BFDBFE] px-2 py-0.5 rounded-md font-bold uppercase">
          Continuous Trust Verification
        </span>
      </div>

      <div className="grid grid-cols-5 gap-1.5">
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
            cardStyle = "bg-emerald-50/50 border-emerald-250 text-emerald-800";
            iconStyle = "bg-emerald-500 text-white border-transparent";
          }

          return (
            <div key={idx} className="relative flex items-center h-full">
              {/* Box */}
              <div className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg border w-full h-full transition-all ${cardStyle}`}>
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 text-[10px] ${iconStyle}`}>
                  <Icon className="w-3 h-3" />
                </div>
                <span className="text-[13px] font-black tracking-tight leading-none font-sans whitespace-nowrap">
                  {step.name}
                </span>
              </div>

              {/* Connecting arrow (only for desktop md screens, not on the last item) */}
              {idx < steps.length - 1 && (
                <div className="absolute top-1/2 -translate-y-1/2 -right-1 z-20 flex items-center justify-center pointer-events-none">
                  <ChevronRight className="w-3 h-3 text-slate-350" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
