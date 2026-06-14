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
    <div className="w-full bg-white border border-[#E2E8F0] p-3 rounded-lg shadow-sm select-none mb-2.5">
      <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">
        CDT-X Operational Lifecycle
      </div>
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStage;
          const isActive = idx === currentStage;
          
          let textStyle = "text-slate-400 font-medium";
          if (isActive) textStyle = "text-[#2563EB] font-black";
          else if (isCompleted) textStyle = "text-emerald-700 font-bold";

          return (
            <React.Fragment key={idx}>
              <span className={`text-[13px] whitespace-nowrap ${textStyle}`}>
                {step.name}
              </span>
              {idx < steps.length - 1 && (
                <span className="text-slate-300 font-bold text-[14px]">→</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
