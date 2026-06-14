/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  UserPlus, 
  Activity, 
  Cpu, 
  Play, 
  AlertTriangle, 
  Search, 
  CheckSquare, 
  FileCheck2,
  ChevronRight,
  ChevronLeft,
  Sparkles
} from 'lucide-react';
import { ActiveTab } from '../types';

interface Step {
  title: string;
  desc: string;
  tab: ActiveTab;
  icon: any;
  action: (utils: {
    setActiveTab: (tab: ActiveTab) => void;
    handleScenarioSelect: (sc: 'NORMAL' | 'IMPERSONATION' | 'AI_ASSISTED' | 'COLLUSION') => void;
    setSelectedAlertId: (id: string) => void;
    setSearchQuery: (query: string) => void;
  }) => void;
}

const steps: Step[] = [
  {
    title: "1. Candidate Enrollment",
    desc: "Establish candidate identity and initial biometric profile mapping.",
    tab: ActiveTab.CANDIDATE_PORTAL,
    icon: UserPlus,
    action: ({ setActiveTab }) => {
      setActiveTab(ActiveTab.CANDIDATE_PORTAL);
    }
  },
  {
    title: "2. Behavior Collection",
    desc: "SDK collects active keystroke timings, mouse paths, and focus inputs.",
    tab: ActiveTab.CANDIDATE_PORTAL,
    icon: Activity,
    action: ({ setActiveTab }) => {
      setActiveTab(ActiveTab.CANDIDATE_PORTAL);
    }
  },
  {
    title: "3. Digital Twin Creation",
    desc: "Generate a high-dimensional digital behavior profile representation.",
    tab: ActiveTab.DIGITAL_TWIN,
    icon: Cpu,
    action: ({ setActiveTab }) => {
      setActiveTab(ActiveTab.DIGITAL_TWIN);
    }
  },
  {
    title: "4. Examination Starts",
    desc: "Monitor continuous trust levels as the cohort begins testing.",
    tab: ActiveTab.CONTROL_ROOM,
    icon: Play,
    action: ({ setActiveTab, handleScenarioSelect }) => {
      setActiveTab(ActiveTab.CONTROL_ROOM);
      handleScenarioSelect('NORMAL');
    }
  },
  {
    title: "5. Identity Drift Detected",
    desc: "Detect keystroke latency anomalies and flag high risk in real-time.",
    tab: ActiveTab.CONTROL_ROOM,
    icon: AlertTriangle,
    action: ({ setActiveTab, handleScenarioSelect }) => {
      setActiveTab(ActiveTab.CONTROL_ROOM);
      handleScenarioSelect('IMPERSONATION');
    }
  },
  {
    title: "6. Investigation Triggered",
    desc: "Inspect granular typing drift signals on the Forensic Investigation desk.",
    tab: ActiveTab.INVESTIGATIONS,
    icon: Search,
    action: ({ setActiveTab, setSelectedAlertId, setSearchQuery }) => {
      setActiveTab(ActiveTab.INVESTIGATIONS);
      setSelectedAlertId('AL-7712');
      setSearchQuery('Rohan');
    }
  },
  {
    title: "7. Decision Generated",
    desc: "Explainable AI triggers automated lockdown recommendations.",
    tab: ActiveTab.INVESTIGATIONS,
    icon: CheckSquare,
    action: ({ setActiveTab, setSelectedAlertId, setSearchQuery }) => {
      setActiveTab(ActiveTab.INVESTIGATIONS);
      setSelectedAlertId('AL-7712');
      setSearchQuery('Rohan');
    }
  },
  {
    title: "8. Case Closed",
    desc: "Commit proctor decisions to the cryptographically signed ledger.",
    tab: ActiveTab.AUDIT_LEDGER,
    icon: FileCheck2,
    action: ({ setActiveTab }) => {
      setActiveTab(ActiveTab.AUDIT_LEDGER);
    }
  }
];

interface JudgeWalkthroughPanelProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  handleScenarioSelect: (sc: 'NORMAL' | 'IMPERSONATION' | 'AI_ASSISTED' | 'COLLUSION') => void;
  setSelectedAlertId: (id: string) => void;
  setSearchQuery: (query: string) => void;
  currentScenario: 'NORMAL' | 'IMPERSONATION' | 'AI_ASSISTED' | 'COLLUSION';
}

export default function JudgeWalkthroughPanel({
  activeTab,
  setActiveTab,
  handleScenarioSelect,
  setSelectedAlertId,
  setSearchQuery,
  currentScenario
}: JudgeWalkthroughPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
    steps[index].action({
      setActiveTab,
      handleScenarioSelect,
      setSelectedAlertId,
      setSearchQuery
    });
  };

  // Executive Verdict calculations
  let trustScore = 94;
  let identityConfidence = "98%";
  let riskLevel = "LOW";
  let recommendedAction = "Continue Monitoring";
  let riskColor = "text-emerald-700 bg-emerald-50 border-emerald-200";

  if (currentScenario === 'IMPERSONATION') {
    trustScore = 42;
    identityConfidence = "36%";
    riskLevel = "CRITICAL";
    recommendedAction = "Lockdown Workstation";
    riskColor = "text-red-700 bg-red-50 border-red-200 animate-pulse";
  } else if (currentScenario === 'AI_ASSISTED') {
    trustScore = 61;
    identityConfidence = "89%";
    riskLevel = "MEDIUM";
    recommendedAction = "Trigger Proctor Review";
    riskColor = "text-amber-800 bg-amber-50 border-amber-200";
  } else if (currentScenario === 'COLLUSION') {
    trustScore = 48;
    identityConfidence = "84%";
    riskLevel = "HIGH";
    recommendedAction = "Escalate to Security Desk";
    riskColor = "text-red-750 bg-red-50 border-red-200";
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-20 bg-[#2563EB] hover:bg-blue-700 text-white p-2.5 rounded-l-xl shadow-lg z-50 flex items-center gap-1 cursor-pointer transition-all"
        title="Open Judge Walkthrough"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="text-[10px] font-bold font-mono tracking-wider uppercase rotate-180 writing-mode-vertical" style={{ writingMode: 'vertical-lr' }}>
          Walkthrough
        </span>
      </button>
    );
  }

  return (
    <aside className="w-[300px] bg-white border-l border-[#E2E8F0] h-full flex flex-col shrink-0 relative z-40 shadow-sm animate-in slide-in-from-right duration-250 font-sans">
      {/* Header */}
      <div className="p-4 border-b border-[#F1F5F9] bg-slate-50 flex justify-between items-center select-none">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#2563EB]" />
          <span className="text-[11.5px] font-mono font-extrabold text-[#0F172A] uppercase tracking-wider">
            JUDGE WALKTHROUGH
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-200/50 rounded-lg cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Executive Verdict Card (Always visible on every screen) */}
      <div className="p-3.5 border-b border-[#F1F5F9] bg-slate-50/50 space-y-2 select-none">
        <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
          Platform Executive Verdict
        </span>
        
        <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
          <div className="bg-white p-2 rounded-xl border border-slate-200/60 shadow-sm">
            <span className="text-[8.5px] text-slate-400 block font-sans">Trust Score</span>
            <span className="text-sm font-black text-slate-800">{trustScore}/100</span>
          </div>
          <div className="bg-white p-2 rounded-xl border border-slate-200/60 shadow-sm">
            <span className="text-[8.5px] text-slate-400 block font-sans">Identity Conf.</span>
            <span className="text-sm font-black text-slate-800">{identityConfidence}</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-1">
          <span className="text-[10px] text-slate-500 font-sans">Risk Level:</span>
          <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-extrabold border uppercase ${riskColor}`}>
            {riskLevel}
          </span>
        </div>

        <div className="pt-2 border-t border-slate-200/60 flex flex-col text-[10px] font-sans">
          <span className="text-slate-400 font-mono text-[9px]">Recommended Action:</span>
          <strong className="text-[#0F172A] mt-0.5 leading-snug">{recommendedAction}</strong>
        </div>
      </div>

      {/* Steps List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
        <div className="p-2.5 bg-blue-50/50 rounded-xl border border-blue-100 mb-3 text-[11px] text-[#475569] leading-relaxed">
          <p className="font-semibold text-slate-800 mb-1">90-Second Quick Demo Flow</p>
          Click each step to auto-navigate the workspace and trigger real behavior streams.
        </div>

        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          const isSelected = currentStep === idx;
          const isTabActive = activeTab === step.tab;

          return (
            <button
              key={idx}
              onClick={() => handleStepClick(idx)}
              className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex gap-3 ${
                isSelected 
                  ? 'bg-[#EFF6FF] border-[#93C5FD] text-[#0F172A] shadow-sm'
                  : isTabActive
                  ? 'bg-slate-50 border-slate-300 text-slate-700'
                  : 'bg-white border-[#E2E8F0] hover:border-slate-350 text-slate-600'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                isSelected 
                  ? 'bg-[#2563EB] text-white' 
                  : isTabActive
                  ? 'bg-slate-200 text-slate-700'
                  : 'bg-slate-100 text-slate-400'
              }`}>
                <StepIcon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <p className={`text-[12px] font-bold ${isSelected ? 'text-[#2563EB]' : 'text-[#0F172A]'}`}>
                  {step.title}
                </p>
                <p className="text-[10px] text-slate-500 leading-snug mt-0.5">
                  {step.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Visual Pipeline Map (Vertical) */}
      <div className="p-3 border-t border-[#F1F5F9] bg-slate-50/50 space-y-1 text-[9px] font-mono select-none text-slate-500">
        <span className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1 text-center">
          CDT-X System Pipeline
        </span>
        <div className="flex flex-col items-center gap-0.5 text-center">
          <div className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700 font-bold">Student Device</div>
          <div className="text-[7.5px] leading-none">⬇</div>
          <div className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700 font-bold">Behavior Ingestion</div>
          <div className="text-[7.5px] leading-none">⬇</div>
          <div className="bg-white px-2 py-0.5 rounded border border-slate-200 text-[#2563EB] font-bold">Digital Twin Modeling</div>
          <div className="text-[7.5px] leading-none">⬇</div>
          <div className="bg-white px-2 py-0.5 rounded border border-[#93C5FD] text-[#2563EB] font-bold">Trust Engine Scoring</div>
          <div className="text-[7.5px] leading-none">⬇</div>
          <div className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700 font-bold">Forensic Investigation</div>
          <div className="text-[7.5px] leading-none">⬇</div>
          <div className="bg-white px-2 py-0.5 rounded border border-emerald-250 text-emerald-700 font-bold">Sealed Audit Record</div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-[#F1F5F9] bg-slate-50 text-[10px] font-mono text-center text-slate-400 select-none">
        PIPELINE ID: CDT-X-WIN-2026
      </div>
    </aside>
  );
}
