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
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { ActiveTab } from '../types';
import DemoSnapshotCard from './DemoSnapshotCard';

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
    title: "1. Why CDT-X?",
    desc: "Understand the core problem & passive biometrics solution.",
    tab: ActiveTab.WHY_CDT_X,
    icon: Sparkles,
    action: ({ setActiveTab }) => {
      setActiveTab(ActiveTab.WHY_CDT_X);
    }
  },
  {
    title: "2. Candidate Enrollment",
    desc: "Candidate identity registration & workspace setup.",
    tab: ActiveTab.CANDIDATE_PORTAL,
    icon: UserPlus,
    action: ({ setActiveTab }) => {
      setActiveTab(ActiveTab.CANDIDATE_PORTAL);
    }
  },
  {
    title: "3. Behavior Calibration",
    desc: "SDK captures typing, mouse, and focus baseline.",
    tab: ActiveTab.CANDIDATE_PORTAL,
    icon: Activity,
    action: ({ setActiveTab }) => {
      setActiveTab(ActiveTab.CANDIDATE_PORTAL);
    }
  },
  {
    title: "4. Live Trust Monitoring",
    desc: "Continuous passive checks during live examination.",
    tab: ActiveTab.CONTROL_ROOM,
    icon: Play,
    action: ({ setActiveTab, handleScenarioSelect }) => {
      setActiveTab(ActiveTab.CONTROL_ROOM);
      handleScenarioSelect('NORMAL');
    }
  },
  {
    title: "5. Anomaly Detection",
    desc: "Typing drift triggers alerts in real-time.",
    tab: ActiveTab.CONTROL_ROOM,
    icon: AlertTriangle,
    action: ({ setActiveTab, handleScenarioSelect }) => {
      setActiveTab(ActiveTab.CONTROL_ROOM);
      handleScenarioSelect('IMPERSONATION');
    }
  },
  {
    title: "6. Forensic Investigation",
    desc: "Inspect explainable typing & navigation drift signals.",
    tab: ActiveTab.INVESTIGATIONS,
    icon: Search,
    action: ({ setActiveTab, setSelectedAlertId, setSearchQuery }) => {
      setActiveTab(ActiveTab.INVESTIGATIONS);
      setSelectedAlertId('AL-7712');
      setSearchQuery('Rohan');
    }
  },
  {
    title: "7. Sealed Audit Ledger",
    desc: "Decisions committed to immutable compliance ledger.",
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
        <span className="text-[11px] font-bold font-mono tracking-wider uppercase rotate-180 writing-mode-vertical" style={{ writingMode: 'vertical-lr' }}>
          Walkthrough
        </span>
      </button>
    );
  }

  return (
    <aside className="w-[272px] bg-white border-l border-[#E2E8F0] h-full flex flex-col shrink-0 relative z-40 shadow-sm animate-in slide-in-from-right duration-250 font-sans">
      {/* Header */}
      <div className="px-3.5 py-2.5 border-b border-[#F1F5F9] bg-slate-50 flex justify-between items-center select-none">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
          <span className="text-[11px] font-mono font-extrabold text-[#0F172A] uppercase tracking-wider">
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

      {/* Executive Verdict Card — always visible */}
      <div className="px-3 py-2.5 border-b border-[#F1F5F9] select-none bg-slate-50/50">
        <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
          Platform Executive Verdict
        </span>

        {currentScenario !== 'NORMAL' ? (
          <div className="p-2 bg-red-50/60 border border-red-200 rounded-lg space-y-1.5 text-[11px]">
            <div className="flex items-center gap-1 text-red-700 font-bold uppercase tracking-wider text-[11px]">
              <ShieldAlert className="w-3.5 h-3.5 text-red-500 animate-pulse shrink-0" />
              Why Flagged
            </div>
            
            <div className="space-y-1 font-mono text-[11px]">
              <div className="flex justify-between items-center bg-white/80 px-2 py-0.5 rounded border border-red-100">
                <span className="text-slate-500 font-sans">Typing Drift:</span>
                <span className="font-bold text-red-655 text-red-600">
                  {currentScenario === 'IMPERSONATION' ? "+31%" : currentScenario === 'COLLUSION' ? "+15%" : "+11%"}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white/80 px-2 py-0.5 rounded border border-red-100">
                <span className="text-slate-500 font-sans">Navigation Drift:</span>
                <span className="font-bold text-red-655 text-red-600">
                  {currentScenario === 'IMPERSONATION' ? "+14%" : currentScenario === 'COLLUSION' ? "+18%" : "+42%"}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white/80 px-2 py-0.5 rounded border border-red-100">
                <span className="text-slate-500 font-sans">Clipboard Activity:</span>
                <span className="font-bold text-red-655 text-red-600">
                  {currentScenario === 'IMPERSONATION' ? "+6" : currentScenario === 'COLLUSION' ? "+2" : "+3"}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white/80 px-2 py-0.5 rounded border border-red-100">
                <span className="text-slate-500 font-sans">Identity Confidence:</span>
                <span className="font-bold text-[#2563EB]">
                  {currentScenario === 'IMPERSONATION' ? "44%" : currentScenario === 'COLLUSION' ? "84%" : "89%"}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white/80 px-2 py-0.5 rounded border border-red-100">
                <span className="text-slate-500 font-sans">Recommended Action:</span>
                <span className="font-bold text-red-600 text-[11px] uppercase truncate">
                  {currentScenario === 'IMPERSONATION' ? "Investigation Triggered" : "Audit Queue"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {/* 4-metric compact grid */}
            <div className="grid grid-cols-2 gap-1.5 mb-1">
              <div className="bg-slate-50 px-2 py-1 rounded-lg border border-slate-200/80 text-center">
                <span className="text-[11px] text-slate-400 block font-sans">Trust Score</span>
                <span className={`text-[11px] font-black ${trustScore < 50 ? 'text-red-700' : trustScore < 70 ? 'text-amber-700' : 'text-emerald-700'}`}>{trustScore}/100</span>
              </div>
              <div className="bg-slate-50 px-2 py-1 rounded-lg border border-slate-200/80 text-center">
                <span className="text-[11px] text-slate-400 block font-sans">Identity Conf.</span>
                <span className={`text-[11px] font-black ${parseInt(identityConfidence) < 50 ? 'text-red-700' : parseInt(identityConfidence) < 80 ? 'text-amber-700' : 'text-emerald-700'}`}>{identityConfidence}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] text-slate-500 font-sans">Risk:</span>
              <span className={`px-2 py-0.5 rounded font-mono text-[11px] font-extrabold border uppercase ${riskColor}`}>
                {riskLevel}
              </span>
            </div>

            <div className="flex flex-col text-[11px] font-sans border-t border-slate-100 pt-1">
              <span className="text-slate-400 font-mono text-[11px]">Action:</span>
              <strong className="text-[#0F172A] leading-tight text-[11px]">{recommendedAction}</strong>
            </div>
          </div>
        )}
      </div>

      {/* Demo Snapshot Flow Card (collapsible or compact in walkthrough) */}
      <div className="p-2 border-b border-[#F1F5F9]">
        <DemoSnapshotCard currentStage={currentStep === 0 ? -1 : currentStep === 1 ? 0 : currentStep === 2 ? 1 : (currentStep === 3 || currentStep === 4) ? 2 : currentStep === 5 ? 3 : 4} />
      </div>

      {/* Demo Progress List */}
      <div className="flex-1 overflow-y-auto py-2 px-3 space-y-2 custom-scrollbar">
        <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">
          Demo Progress
        </div>

        {steps.map((step, idx) => {
          const isSelected = currentStep === idx;
          const isCompleted = idx < currentStep;

          return (
            <button
              key={idx}
              onClick={() => handleStepClick(idx)}
              className="w-full text-left flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-4 h-4 flex items-center justify-center shrink-0">
                {isCompleted ? (
                  <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />
                ) : isSelected ? (
                  <Play className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-300 group-hover:border-slate-400 transition-colors" />
                )}
              </div>

              <div className={`text-[12px] font-medium truncate ${
                isSelected ? 'text-blue-700 font-bold' : 
                isCompleted ? 'text-emerald-700' : 'text-slate-500'
              }`}>
                {step.title.replace(/^\d+\.\s*/, '')}
              </div>
            </button>
          );
        })}
      </div>

      {/* Compact footer */}
      <div className="px-3 py-1.5 border-t border-[#F1F5F9] bg-slate-50 text-[11px] font-mono text-center text-slate-400 select-none">
        CDT-X PIPELINE V4.2 · ASIA-PACIFIC
      </div>
    </aside>
  );
}
