/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Fingerprint, 
  Cpu, 
  Activity, 
  TrendingUp, 
  CheckCircle,
  Eye,
  Sparkles,
  MousePointer,
  Keyboard,
  FileText,
  Compass,
  Brain,
  Info,
  Network,
  Award,
  Zap,
  Sliders,
  Users,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  SlidersHorizontal,
  Monitor,
  Laptop,
  Radio,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CandidateProfile {
  id: string;
  name: string;
  exam: string;
  station: string;
  avatar: string;
  trustScore: number;
  impersonationRisk: number;
  aiAssistanceRisk: number;
  collusionRisk: number;
  verdict: 'APPROVED' | 'REVIEW' | 'TERMINATED';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  
  // Refactored Human-explainable Core Metrics
  identityMatch: number; // Identity Match %
  historicalConsistency: number; // Historical Consistency %
  riskConfidence: number; // Risk Confidence %
  similarBehaviorSessions: {
    sessionId: string;
    correlation: number;
    description: string;
  }[];
  
  findings: string[];
  driftTimeline: {
    time: string;
    description: string;
    severity: 'INFO' | 'WARNING' | 'CRITICAL';
    drift: string;
  }[];
}

export default function DigitalTwinExplorerView() {
  const cohorts: CandidateProfile[] = [
    {
      id: "USR_89921_ROHAN",
      name: "Rohan Patil",
      exam: "Advanced Civil Services Aptitude (UPSC-IV)",
      station: "SOL-01 System #18",
      avatar: "RP",
      trustScore: 36.5,
      impersonationRisk: 94.2,
      aiAssistanceRisk: 12.5,
      collusionRisk: 8.4,
      verdict: "TERMINATED",
      riskLevel: "HIGH",
      identityMatch: 36.5,
      historicalConsistency: 42.0,
      riskConfidence: 94.2,
      similarBehaviorSessions: [
        { sessionId: "SESS-8812-AI", correlation: 92.4, description: "Known script-injected emulator typing patterns" },
        { sessionId: "SESS-7192-PRX", correlation: 87.5, description: "Atypical external physical surrogate profile" }
      ],
      findings: [
        "Keystroke dwell intervals diverged from Master profile baseline by +41.5%",
        "Mouse trajectories matched scripted bezier curvature macros",
        "Linguistic structure shifted completely indicating probable physical driver proxy"
      ],
      driftTimeline: [
        { time: "09:00 AM", description: "Workstation session initiated", severity: "INFO", drift: "0%" },
        { time: "09:15 AM", description: "Typing cadence keys speed drift detected", severity: "CRITICAL", drift: "+41.5%" },
        { time: "09:45 AM", description: "Scripted Bezier mouse trajectories detected", severity: "CRITICAL", drift: "+82.0%" }
      ]
    },
    {
      id: "USR_73322_AARAV",
      name: "Aarav Kulkarni",
      exam: "State Civil Services Entrance (MPSC)",
      avatar: "AK",
      station: "HYD-02 System #06",
      trustScore: 58.0,
      impersonationRisk: 14.8,
      aiAssistanceRisk: 78.4,
      collusionRisk: 5.5,
      verdict: "REVIEW",
      riskLevel: "HIGH",
      identityMatch: 89.2,
      historicalConsistency: 51.5,
      riskConfidence: 78.4,
      similarBehaviorSessions: [
        { sessionId: "SESS-1092-GPT", correlation: 94.5, description: "Highly correlated with Generative AI composition intervals" },
        { sessionId: "SESS-0932-CLIP", correlation: 72.0, description: "Unusual browser focus viewport clipboard actions" }
      ],
      findings: [
        "Linguistic structure matches synthetic AI composition template density with 94.5% correlation",
        "Candidate response intervals far exceed maximum possible human comprehension speed",
        "Unauthorized viewport focus losses logged while copying complex answers"
      ],
      driftTimeline: [
        { time: "09:00 AM", description: "Session started securely", severity: "INFO", drift: "3%" },
        { time: "09:30 AM", description: "Significant linguistic style variation detected", severity: "CRITICAL", drift: "+32.0%" },
        { time: "10:10 AM", description: "Clipboard paste action detected on complex question", severity: "WARNING", drift: "+15.0%" }
      ]
    },
    {
      id: "USR_44112_NEHA",
      name: "Neha Joshi",
      avatar: "NJ",
      exam: "Telangana PSC Administrative Entrance",
      station: "PUN-03 System #15",
      trustScore: 48.0,
      impersonationRisk: 22.4,
      aiAssistanceRisk: 18.0,
      collusionRisk: 88.0,
      verdict: "REVIEW",
      riskLevel: "HIGH",
      identityMatch: 84.5,
      historicalConsistency: 81.2,
      riskConfidence: 88.0,
      similarBehaviorSessions: [
        { sessionId: "SESS-6612-COL", correlation: 98.4, description: "Shared coordinate answers sequence with Desk PUN-16" },
        { sessionId: "SESS-3382-SYNC", correlation: 81.0, description: "Simultaneous focus swaps and page navigation pattern" }
      ],
      findings: [
        "Answer pathways match neighboring workstation with 98.4% correlation matrix",
        "Simultaneous dynamic focus switches suggest an active local sharing mesh network",
        "Linguistic style progression shows strong synchronization behavior"
      ],
      driftTimeline: [
        { time: "09:00 AM", description: "Session started securely", severity: "INFO", drift: "1%" },
        { time: "09:40 AM", description: "Synchronized navigation registered with seat PUN-16", severity: "WARNING", drift: "+18.0%" },
        { time: "10:15 AM", description: "Overlapping coordinate sequence patterns logged", severity: "CRITICAL", drift: "+35.0%" }
      ]
    },
    {
      id: "USR_00122_SIDD",
      name: "Siddharth Jadhav",
      avatar: "SJ",
      exam: "Central Examination Services - MH",
      station: "MUM-01 System #22",
      trustScore: 98.2,
      impersonationRisk: 2.1,
      aiAssistanceRisk: 1.5,
      collusionRisk: 1.8,
      verdict: "APPROVED",
      riskLevel: "LOW",
      identityMatch: 97.4,
      historicalConsistency: 95.8,
      riskConfidence: 1.8,
      similarBehaviorSessions: [
        { sessionId: "SESS-9011-BAS", correlation: 98.2, description: "Perfect historical alignment with candidate's own baseline" }
      ],
      findings: [
        "Linguistic timing & micro-dwell frequencies perfectly align with master baseline",
        "Zero unauthorized viewport changes or clipboard transfers recorded",
        "Single-source cognitive footprint mathematically confirmed under compliant tolerances"
      ],
      driftTimeline: [
        { time: "09:00 AM", description: "Session started securely", severity: "INFO", drift: "0%" },
        { time: "09:50 AM", description: "Typing cadence hold ratios remain perfectly compliant", severity: "INFO", drift: "0.2%" },
        { time: "10:20 AM", description: "Bezier navigation spline curvature matches standard baseline", severity: "INFO", drift: "0.5%" }
      ]
    }
  ];

  const [activeCohortIdx, setActiveCohortIdx] = useState<number>(0);
  const selectedStudent = cohorts[activeCohortIdx];
  const [selectedProfileTab, setSelectedProfileTab] = useState<'details' | 'timeline'>('details');

  const [evidenceCounts, setEvidenceCounts] = useState<{ [key: string]: { keyboardEvents: number, mouseEvents: number, focusChanges: number, tabSwitches: number, copyAttempts: number, questionInteractions: number } }>({
    "USR_89921_ROHAN": { keyboardEvents: 48231, mouseEvents: 124912, focusChanges: 2, tabSwitches: 1, copyAttempts: 0, questionInteractions: 42 },
    "USR_73322_AARAV": { keyboardEvents: 35102, mouseEvents: 98121, focusChanges: 5, tabSwitches: 3, copyAttempts: 2, questionInteractions: 38 },
    "USR_44112_NEHA": { keyboardEvents: 29481, mouseEvents: 85291, focusChanges: 4, tabSwitches: 2, copyAttempts: 0, questionInteractions: 31 },
    "USR_00122_SIDD": { keyboardEvents: 18420, mouseEvents: 45192, focusChanges: 0, tabSwitches: 0, copyAttempts: 0, questionInteractions: 28 }
  });

  const [liveSessionStats, setLiveSessionStats] = useState({
    connectedSeconds: 12 * 60 + 34,
    eventsProcessed: 42831,
    trustScore: 94
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveSessionStats(prev => ({
        connectedSeconds: prev.connectedSeconds + 1,
        eventsProcessed: prev.eventsProcessed + Math.floor(Math.random() * 20 + 5),
        trustScore: Math.max(92, Math.min(96, prev.trustScore + (Math.random() - 0.5) * 0.4))
      }));

      setEvidenceCounts(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(key => {
          updated[key] = {
            keyboardEvents: updated[key].keyboardEvents + Math.floor(Math.random() * 3 + 1),
            mouseEvents: updated[key].mouseEvents + Math.floor(Math.random() * 12 + 4),
            focusChanges: updated[key].focusChanges + (Math.random() < 0.01 ? 1 : 0),
            tabSwitches: updated[key].tabSwitches + (Math.random() < 0.005 ? 1 : 0),
            copyAttempts: updated[key].copyAttempts + (Math.random() < 0.002 ? 1 : 0),
            questionInteractions: updated[key].questionInteractions + (Math.random() < 0.1 ? 1 : 0)
          };
        });
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [typingCount, setTypingCount] = useState(480);
  const [mouseCount, setMouseCount] = useState(8200);
  const [readingCount, setReadingCount] = useState(76);
  const [calibrationDone, setCalibrationDone] = useState(false);

  useEffect(() => {
    setTypingCount(410);
    setMouseCount(7300);
    setReadingCount(68);
    setCalibrationDone(false);

    const timer = setInterval(() => {
      setTypingCount(t => {
        if (t >= 500) return 500;
        return t + Math.floor(Math.random() * 12 + 8);
      });
      setMouseCount(m => {
        if (m >= 10000) return 10000;
        return m + Math.floor(Math.random() * 300 + 200);
      });
      setReadingCount(r => {
        if (r >= 100) return 100;
        return r + Math.floor(Math.random() * 4 + 2);
      });
    }, 150);

    return () => clearInterval(timer);
  }, [selectedStudent.id]);

  useEffect(() => {
    if (typingCount >= 500 && mouseCount >= 10000 && readingCount >= 100) {
      setCalibrationDone(true);
    }
  }, [typingCount, mouseCount, readingCount]);

  return (
    <div className="h-full overflow-y-auto p-8 bg-[#F8FAFC] custom-scrollbar text-slate-800 pb-16">
      
      {/* Executive Header Block */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] font-sans">
            Digital Behavior Profile Explorer
          </h1>
          <p className="text-[13px] text-[#475569] mt-0.5">
            Transparent analysis of candidate identity matches, historical behavioral consistency, and real-time risk scores.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-2 bg-white px-3 py-1.5 border border-[#E2E8F0] rounded-lg">
          <Activity className="w-4 h-4 text-[#2563EB]" />
          <span className="text-xs font-mono text-slate-500 font-bold uppercase tracking-wide">
            SIGNAL: ONLINE COMPLIANT
          </span>
        </div>
      </div>

      {/* Cohort Profile Selector Tabs */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#2563EB]" />
          <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider block">
            Select Live Candidate Session Profile:
          </span>
        </div>
        
        <div className="grid grid-cols-2 sm:flex gap-2 w-full md:w-auto">
          {cohorts.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => setActiveCohortIdx(idx)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 justify-center cursor-pointer ${
                activeCohortIdx === idx
                  ? 'bg-[#EFF6FF] border-[#2563EB] text-[#2563EB]'
                  : 'bg-white border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${
                c.verdict === 'APPROVED' ? 'bg-emerald-500' : c.verdict === 'REVIEW' ? 'bg-amber-500' : 'bg-red-500'
              }`} />
              <span className="truncate">{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Live Session Card */}
      <div className="bg-slate-900 border border-slate-800 text-white p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Operational Stream State</span>
            <div className="flex items-center gap-2 mt-0.5">
              <strong className="text-sm font-sans tracking-tight text-white">{selectedStudent.name}</strong>
              <span className="text-slate-500 font-mono text-xs">|</span>
              <span className="text-[11px] font-mono text-[#60A5FA] bg-[#1E3A8A]/50 px-2 py-0.5 rounded border border-[#3B82F6]/30">{selectedStudent.exam}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 font-mono text-xs">
          <div>
            <span className="text-[9px] text-slate-400 uppercase block font-bold">Connected Time</span>
            <span className="text-[13px] font-bold text-white block mt-0.5">
              {Math.floor(liveSessionStats.connectedSeconds / 60)}m {liveSessionStats.connectedSeconds % 60}s
            </span>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 uppercase block font-bold">Telemetry Captured</span>
            <span className="text-[13px] font-bold text-white block mt-0.5">
              {liveSessionStats.eventsProcessed.toLocaleString()} events
            </span>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 uppercase block font-bold">Trust Score</span>
            <span className={`text-[13px] font-bold block mt-0.5 ${selectedStudent.trustScore > 70 ? 'text-emerald-400' : selectedStudent.trustScore > 40 ? 'text-amber-400' : 'text-red-400'}`}>
              {selectedStudent.id === 'USR_89921_ROHAN' ? liveSessionStats.trustScore.toFixed(0) : selectedStudent.trustScore.toFixed(0)}% TST
            </span>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 uppercase block font-bold">Status</span>
            <span className={`inline-flex items-center gap-1 mt-0.5 font-bold uppercase tracking-wider text-[11px] ${
              selectedStudent.verdict === 'APPROVED' ? 'text-emerald-400' : selectedStudent.verdict === 'REVIEW' ? 'text-amber-400' : 'text-red-405'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full inline-block animate-pulse ${
                selectedStudent.verdict === 'APPROVED' ? 'bg-emerald-400' : selectedStudent.verdict === 'REVIEW' ? 'bg-amber-400' : 'bg-red-400'
              }`}></span>
              {selectedStudent.verdict}
            </span>
          </div>
        </div>
      </div>

      {/* Primary Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COLUMN: CRITICAL EXPLAINABILITY KPI METRICS (8/12) */}
        <div className="xl:col-span-8 space-y-6">
          
          {/* Behavioral Calibration Status Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#F1F5F9]">
              <span className="text-[11.5px] font-mono font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className={`w-4 h-4 text-[#2563EB] ${!calibrationDone ? 'animate-spin' : ''}`} />
                Behavioral Calibration Status
              </span>
              <span className={`px-2.5 py-0.5 rounded text-[9.5px] font-sans font-extrabold uppercase border ${
                calibrationDone
                  ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                  : 'text-blue-700 bg-blue-50 border-blue-200 animate-pulse'
              }`}>
                {calibrationDone ? 'Digital Twin Generated' : 'Behavior Baseline Collection'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 shadow-sm">
                <span className="text-[8.5px] text-slate-400 block uppercase font-bold">Typing Samples</span>
                <span className="text-[12.5px] font-bold text-[#0F172A] block mt-0.5">{typingCount} / 500</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 shadow-sm">
                <span className="text-[8.5px] text-slate-400 block uppercase font-bold">Mouse Events</span>
                <span className="text-[12.5px] font-bold text-[#0F172A] block mt-0.5">{mouseCount.toLocaleString()} / 10,000</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 shadow-sm">
                <span className="text-[8.5px] text-slate-400 block uppercase font-bold">Reading Actions</span>
                <span className="text-[12.5px] font-bold text-[#0F172A] block mt-0.5">{readingCount} / 100</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 shadow-sm flex flex-col justify-center">
                <span className="text-[8.5px] text-slate-400 block uppercase font-bold">Baseline Quality</span>
                <span className={`text-[11px] font-bold block mt-0.5 ${calibrationDone ? 'text-emerald-600' : 'text-blue-600 animate-pulse'}`}>
                  {calibrationDone ? '✓ OPTIMAL (100%)' : 'Building...'}
                </span>
              </div>
            </div>
          </div>

          {/* Active Candidate At-A-Glance Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#F1F5F9] pb-4 mb-5 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-sm border border-[#E2E8F0]">
                  {selectedStudent.avatar}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A] font-sans flex items-center gap-2">
                    {selectedStudent.name}
                    <span className="text-xs font-mono font-normal text-slate-500">({selectedStudent.id})</span>
                  </h3>
                  <p className="text-[11.5px] text-slate-500 mt-0.5">{selectedStudent.exam}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-slate-500 uppercase font-bold tracking-wide">VERDICT PREVIEW:</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  selectedStudent.verdict === "APPROVED" 
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-250" 
                    : selectedStudent.verdict === "REVIEW" 
                    ? "bg-amber-50 text-amber-700 border border-amber-250" 
                    : "bg-red-50 text-red-700 border border-red-250"
                }`}>
                  {selectedStudent.verdict}
                </span>
              </div>
            </div>

            {/* Core Refactored Quad-Meters for Explainability */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* 1. Identity Match */}
              <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-[#E2E8F0] space-y-3 shadow-inner">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Identity Match Probability</span>
                  <Fingerprint className="w-4 h-4 text-[#2563EB]" />
                </div>
                <div>
                  <div className="text-2xl font-black font-sans text-[#0F172A]">
                    {selectedStudent.identityMatch}%
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden mt-1.5">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        selectedStudent.identityMatch > 80 ? 'bg-emerald-500' : selectedStudent.identityMatch > 50 ? 'bg-amber-500' : 'bg-red-500'
                      }`} 
                      style={{ width: `${selectedStudent.identityMatch}%` }} 
                    />
                  </div>
                </div>
                <p className="text-[10.5px] text-slate-500 leading-snug">
                  Correlates active keyboard keystroke rhythms with pre-registered baseline.
                </p>
              </div>

              {/* 2. Historical Consistency */}
              <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-[#E2E8F0] space-y-3 shadow-inner">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Historical Consistency</span>
                  <Activity className="w-4 h-4 text-[#2563EB]" />
                </div>
                <div>
                  <div className="text-2xl font-black font-sans text-[#0F172A]">
                    {selectedStudent.historicalConsistency}%
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden mt-1.5">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        selectedStudent.historicalConsistency > 80 ? 'bg-emerald-500' : selectedStudent.historicalConsistency > 50 ? 'bg-amber-500' : 'bg-red-500'
                      }`} 
                      style={{ width: `${selectedStudent.historicalConsistency}%` }} 
                    />
                  </div>
                </div>
                <p className="text-[10.5px] text-slate-500 leading-snug">
                  Measures overall cursor path and reading speed consistency across examination blocks.
                </p>
              </div>

              {/* 3. Risk Confidence */}
              <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-[#E2E8F0] space-y-3 shadow-inner">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Risk Threat Prominence</span>
                  <ShieldAlert className="w-4 h-4 text-[#2563EB]" />
                </div>
                <div>
                  <div className="text-2xl font-black font-sans text-[#0F172A]">
                    {selectedStudent.riskConfidence}%
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden mt-1.5">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        selectedStudent.riskConfidence < 15 ? 'bg-emerald-500' : selectedStudent.riskConfidence < 50 ? 'bg-amber-500' : 'bg-red-500'
                      }`} 
                      style={{ width: `${selectedStudent.riskConfidence}%` }} 
                    />
                  </div>
                </div>
                <p className="text-[10.5px] text-slate-500 leading-snug">
                  Behavioral divergence indicating likelihood of cheating, collusion, or external tool usage.
                </p>
              </div>

            </div>
          </div>

          {/* SIMILAR BEHAVIOR SESSIONS (Co-reference logs) */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-3">
            <h3 className="text-xs font-black text-[#0F172A] font-sans tracking-wide uppercase flex items-center gap-2">
              <Users className="w-4 h-4 text-[#2563EB]" />
              Similar Anomaly Sessions
            </h3>
            
            <p className="text-[11.5px] text-slate-500 leading-relaxed font-sans">
              CDT-X automatically flags similarity links by correlating active typing, linguistic patterns, or navigation rhythms to known emulator types, proxy hardware, or other collusion seats in our database.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedStudent.similarBehaviorSessions.map((session, sidx) => (
                <div key={sidx} className="bg-slate-50 p-3 rounded-xl border border-[#E2E8F0] flex justify-between items-center shadow-sm">
                  <div className="space-y-0.5">
                    <span className="text-[11.5px] text-[#0F172A] font-bold font-sans block">{session.sessionId}</span>
                    <span className="text-[10px] text-slate-500 block leading-tight">{session.description}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">CORRELATION</span>
                    <span className="text-xs font-mono font-black text-red-600 block">{session.correlation}% match</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ACTIVE ADJUDICATED COMPLIANCE FINDINGS */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-3">
            <h3 className="text-xs font-black text-[#0F172A] font-sans tracking-wide uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#2563EB]" />
              Explainable Forensic Findings
            </h3>

            <div className="space-y-2.5">
              {selectedStudent.findings.map((item, idx) => (
                <div key={idx} className="flex gap-2.5 items-start p-3 bg-red-50/40 border border-red-100 rounded-xl">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[11.5px] font-bold text-[#0F172A] font-sans">{`Finding Anomaly Checkpoint #${idx + 1}`}</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 font-sans leading-relaxed">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: TIMELINE STREAM & TWIN CALIBRATION DETAIL (4/12) */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* Live Behavior Evidence Panel */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
            <div className="flex justify-between items-center border-b border-[#F1F5F9] pb-2.5">
              <span className="text-xs font-mono font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#2563EB]" />
                Live Behavior Evidence Panel
              </span>
              <span className="flex items-center gap-1 bg-red-50 text-red-700 border border-red-150 px-2 py-0.5 rounded text-[9px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                LIVE STREAM
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-[#E2E8F0]">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">Keyboard Events</span>
                <span className="text-sm font-bold text-[#0F172A] font-mono block mt-0.5">
                  {evidenceCounts[selectedStudent.id]?.keyboardEvents.toLocaleString() ?? 0}
                </span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-[#E2E8F0]">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">Mouse Events</span>
                <span className="text-sm font-bold text-[#0F172A] font-mono block mt-0.5">
                  {evidenceCounts[selectedStudent.id]?.mouseEvents.toLocaleString() ?? 0}
                </span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-[#E2E8F0]">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">Focus Events</span>
                <span className="text-sm font-bold text-[#0F172A] font-mono block mt-0.5">
                  {evidenceCounts[selectedStudent.id]?.focusChanges.toLocaleString() ?? 0}
                </span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-[#E2E8F0]">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">Tab Switches</span>
                <span className="text-sm font-bold text-[#0F172A] font-mono block mt-0.5">
                  {evidenceCounts[selectedStudent.id]?.tabSwitches.toLocaleString() ?? 0}
                </span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-[#E2E8F0]">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">Copy/Paste Attempts</span>
                <span className="text-sm font-bold text-[#0F172A] font-mono block mt-0.5">
                  {evidenceCounts[selectedStudent.id]?.copyAttempts.toLocaleString() ?? 0}
                </span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-[#E2E8F0]">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">Question Interactions</span>
                <span className="text-sm font-bold text-[#0F172A] font-mono block mt-0.5">
                  {evidenceCounts[selectedStudent.id]?.questionInteractions.toLocaleString() ?? 0}
                </span>
              </div>
            </div>
          </div>

          {/* Behavior Collection Visualization */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4 text-white">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                Behavior Collection Visualization
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            <div className="space-y-3">
              {[
                { name: "Keyboard Rhythm", color: "bg-emerald-500", scale: Math.max(15, ((evidenceCounts[selectedStudent.id]?.keyboardEvents ?? 0) % 10) * 10) },
                { name: "Mouse Spline Consistency", color: "bg-blue-500", scale: Math.max(20, ((evidenceCounts[selectedStudent.id]?.mouseEvents ?? 0) % 8) * 12) },
                { name: "Focus & Window Adherence", color: "bg-amber-500", scale: (evidenceCounts[selectedStudent.id]?.focusChanges ?? 0) > 3 ? 30 : 90 },
                { name: "Reading Pace Coherence", color: "bg-purple-500", scale: Math.max(15, ((evidenceCounts[selectedStudent.id]?.questionInteractions ?? 0) % 5) * 20) },
                { name: "Live Trust Signal", color: "bg-emerald-400", scale: selectedStudent.trustScore }
              ].map((sig, sIdx) => (
                <div key={sIdx} className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                    <span>{sig.name}</span>
                    <span>{sig.scale.toFixed(0)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${sig.color}`} 
                      style={{ width: `${sig.scale}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Profile Sub-Navigation Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
            <div className="flex border-b border-[#F1F5F9] p-0.5 bg-slate-50 rounded-xl">
              <button 
                onClick={() => setSelectedProfileTab('details')}
                className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedProfileTab === 'details' ? 'bg-white text-[#2563EB] shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Calibration Stats
              </button>
              <button 
                onClick={() => setSelectedProfileTab('timeline')}
                className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedProfileTab === 'timeline' ? 'bg-white text-[#2563EB] shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Verification Stream
              </button>
            </div>

            {selectedProfileTab === 'details' ? (
              <div className="space-y-4 text-xs font-sans">
                <div className="space-y-1">
                  <span className="text-[9.5px] font-mono text-slate-400 uppercase font-black tracking-wider block">Session Workstation ID</span>
                  <div className="text-xs font-mono font-bold text-[#0F172A] bg-slate-50 p-2 rounded-lg border border-[#E2E8F0] flex justify-between">
                    <span>{selectedStudent.station}</span>
                    <span className="text-[#2563EB]">CONNECTED</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-[11px] border-b border-[#F1F5F9] pb-2">
                    <span className="text-slate-500">Impersonation Likelihood:</span>
                    <span className="font-bold text-[#0F172A]">{selectedStudent.impersonationRisk}%</span>
                  </div>
                  <div className="flex justify-between text-[11px] border-b border-[#F1F5F9] pb-2">
                    <span className="text-slate-500">AI Assistance Metric:</span>
                    <span className="font-bold text-[#0F172A]">{selectedStudent.aiAssistanceRisk}%</span>
                  </div>
                  <div className="flex justify-between text-[11px] border-b border-[#F1F5F9] pb-2">
                    <span className="text-slate-500">Seating Collusion Overlap:</span>
                    <span className="font-bold text-[#0F172A]">{selectedStudent.collusionRisk}%</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-105 p-3 rounded-xl space-y-1">
                  <span className="text-[9px] font-mono font-bold text-[#1E3A8A] uppercase tracking-wide flex items-center gap-1">
                    <Info className="w-3.5 h-3.5" />
                    Explainability Rule
                  </span>
                  <p className="text-[10px] text-slate-600 leading-normal">
                    This profile encapsulates continuous physical behavior. If a metric declines below the dynamic thresholds, a supervisor review flag is emitted immediately.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="border-l-2 border-slate-100 pl-4 space-y-4">
                  {selectedStudent.driftTimeline.map((item, idx) => (
                    <div key={idx} className="relative space-y-0.5 text-xs">
                      {/* Timeline Dot */}
                      <span className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border-2 ${
                        item.severity === 'CRITICAL' ? 'bg-red-500 border-white' : item.severity === 'WARNING' ? 'bg-amber-500 border-white' : 'bg-emerald-500 border-white'
                      }`} />
                      
                      <div className="flex justify-between text-[10.5px] font-mono text-slate-400">
                        <span>{item.time}</span>
                        <span className={`text-[9px] font-bold uppercase ${
                          item.severity === 'CRITICAL' ? 'text-red-600' : item.severity === 'WARNING' ? 'text-amber-600' : 'text-emerald-600'
                        }`}>{item.severity}</span>
                      </div>
                      
                      <h4 className="text-[11.5px] font-bold text-[#0F172A]">{item.description}</h4>
                      <p className="text-[10px] text-slate-500">Telemetry variance: <strong className="font-mono text-slate-700">{item.drift}</strong></p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* System status details */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-3 select-none text-left">
            <h3 className="text-xs font-black text-[#0F172A] font-sans tracking-wide uppercase flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#2563EB]" />
              Behavior Feature Mapping Pipeline
            </h3>
            <p className="text-[10.5px] text-slate-500 leading-normal">
              Behavioral embedding features mapped on our secure edge processing servers. Dimensions are processed with hardware verified verification algorithms.
            </p>
            <div className="grid grid-cols-10 gap-1.5 p-2 bg-slate-50 rounded-xl border border-[#E2E8F0]">
              {Array.from({ length: 40 }).map((_, idx) => {
                const isActive = (idx + activeCohortIdx) % 4 === 0;
                return (
                  <div 
                    key={idx} 
                    className={`h-2.5 rounded-sm transition-all ${
                      selectedStudent.verdict === 'APPROVED'
                        ? isActive ? 'bg-emerald-500' : 'bg-slate-200'
                        : selectedStudent.verdict === 'REVIEW'
                        ? isActive ? 'bg-amber-500' : 'bg-slate-200'
                        : isActive ? 'bg-red-500' : 'bg-slate-200'
                    }`}
                  />
                );
              })}
            </div>
            <span className="text-[9.5px] font-mono text-slate-400 uppercase tracking-wider block text-center">40/512 feature vectors verified</span>
          </div>

          {/* Digital Twin generation pipeline */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <h3 className="text-xs font-black text-[#0F172A] font-sans tracking-wide uppercase mb-3.5 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#2563EB]" />
              Digital Twin Creation Flow
            </h3>

            <div className="relative pl-6 space-y-4 text-xs text-[#475569]">
              {/* Vertical timeline line */}
              <div className="absolute top-2 bottom-2 left-2.5 w-0.5 bg-slate-100"></div>

              {[
                { name: "Student Device", desc: "Local workstation capturing hardware interrupts", icon: Laptop },
                { name: "Behavior Collection", desc: "Continuous signal capture of mouse & key sequences", icon: Radio },
                { name: "Feature Extraction", desc: "Transforms raw coordinate streams into vector matrices", icon: Sliders },
                { name: "Behavior Embedding", desc: "Integrates spatial/temporal parameters to 512D profile", icon: Cpu },
                { name: "Digital Twin Creation", desc: "Compiles a verified, hardened behavioral model", icon: Fingerprint },
                { name: "Trust Intelligence", desc: "Continuous Bayesian model threat analysis check", icon: Brain },
                { name: "Continuous Verification", desc: "Cross-checks live streams against verified twin", icon: ShieldCheck }
              ].map((step, idx) => {
                const Icon = step.icon;
                // Highlight active stages based on selected candidate risk / status
                const isApproved = selectedStudent.verdict === 'APPROVED';
                const isActive = isApproved ? true : idx < 5; // if terminated/review, highlight up to twin creation
                const dotColor = isApproved ? 'bg-emerald-500 text-white border-emerald-600' : isActive ? 'bg-blue-500 text-white border-blue-600' : 'bg-slate-100 text-slate-400 border-slate-200';
                
                return (
                  <div key={idx} className="relative flex items-start gap-3 text-left">
                    <span className={`absolute -left-[23px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center font-mono text-[9px] font-bold border shadow-sm transition-all ${dotColor}`}>
                      {idx + 1}
                    </span>
                    <div className="flex-grow">
                      <div className="flex items-center gap-1.5">
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#2563EB]' : 'text-slate-400'}`} />
                        <strong className={`font-sans font-bold block ${isActive ? 'text-[#0F172A]' : 'text-slate-400'}`}>{step.name}</strong>
                      </div>
                      <p className={`text-[10px] ${isActive ? 'text-[#64748B]' : 'text-slate-350'} mt-0.5`}>{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
