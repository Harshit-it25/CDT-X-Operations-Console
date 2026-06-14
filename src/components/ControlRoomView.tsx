/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  AlertTriangle, 
  CheckCircle, 
  ExternalLink, 
  Fingerprint, 
  Sparkles, 
  Info, 
  X, 
  Shield, 
  Clock, 
  Laptop, 
  Accessibility, 
  Users, 
  Award, 
  ShieldAlert, 
  BrainCircuit, 
  Boxes,
  Globe,
  Check,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SecurityAlert, ExamSession, ActiveTab } from '../types';

interface ControlRoomViewProps {
  alerts: SecurityAlert[];
  sessions: ExamSession[];
  setAlerts: React.Dispatch<React.SetStateAction<SecurityAlert[]>>;
  setSelectedAlertId: (id: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
  searchQuery: string;
  currentScenario?: 'NORMAL' | 'IMPERSONATION' | 'AI_ASSISTED' | 'COLLUSION';
}

export default function ControlRoomView({
  alerts,
  sessions,
  setAlerts,
  setSelectedAlertId,
  setActiveTab,
  searchQuery,
  currentScenario = 'NORMAL',
}: ControlRoomViewProps) {
  const [selectedSessionId, setSelectedSessionId] = useState<string>('EXM-88219-B');
  const [selectedSeatIndex, setSelectedSeatIndex] = useState<number>(18);
  const [syncRate, setSyncRate] = useState(99.98);
  const [assessmentDelay, setAssessmentDelay] = useState(12);
  const [showLimitationsModal, setShowLimitationsModal] = useState(false);
  const [heatmapTick, setHeatmapTick] = useState(0);

  // Simulate real-time metric drift
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncRate(old => Math.max(99.92, Math.min(100.00, old + (Math.random() - 0.5) * 0.02)));
      setAssessmentDelay(old => Math.max(8, Math.min(18, old + Math.floor((Math.random() - 0.5) * 2))));
      setHeatmapTick(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredSessions = sessions.filter(session => {
    if (!searchQuery) return true;
    const term = searchQuery.toLowerCase();
    return (
      session.id.toLowerCase().includes(term) ||
      session.location.toLowerCase().includes(term)
    );
  });

  const activeAlarms = alerts.filter(a => !a.resolved);

  const handleAlertClick = (alertId: string) => {
    setSelectedAlertId(alertId);
    setActiveTab(ActiveTab.INVESTIGATIONS);
  };

  // Generate 24 seats dynamically for the selected session
  const workstations = React.useMemo(() => {
    const seats: any[] = [];
    for (let i = 1; i <= 24; i++) {
      let label = "";
      let status: 'STABLE' | 'WARNING' | 'ALERT' | 'EMPTY' = 'STABLE';
      let candidateName = "";
      // Dynamic baseline drift
      const drift = Math.floor(Math.sin((heatmapTick + i) / 1.5) * 2);
      let trustScore = 91 + (i % 8) + drift;
      let anomaly = "";
      let biometrics = "All continuous biometric similarity boundaries verified within normal limits.";
      let alertId = "";

      if (selectedSessionId === 'EXM-88219-B') { // Solapur
        label = `SOL-${i < 10 ? '0' + i : i}`;
        candidateName = `Candidate SOL-${100 + i}`;
        if (i === 12) {
          status = 'WARNING';
          candidateName = "Siddharth Jadhav";
          // Drift warning trust score slightly
          trustScore = 65 + Math.floor(Math.sin(heatmapTick / 2) * 3);
          anomaly = "Anomalous reaction dynamics detected. Response curve overlaps with historical outliers.";
          biometrics = "Cognitive Reaction Speed match: 89% | Response curves mismatch historical baseline";
          alertId = "AL-5510";
        } else if (i === 18 && alerts.some(a => a.id === 'AL-7712' && !a.resolved)) {
          status = 'ALERT';
          candidateName = "Rohan Patil";
          // Fluctuate alert trust score
          trustScore = 40 + Math.floor(Math.cos(heatmapTick / 3) * 3);
          anomaly = "Active typing biometric identity drift exceeds 40% threshold for Station #SOL-18.";
          biometrics = "Keystroke rhythm match: 58% | Primary impersonation risk suspect found";
          alertId = "AL-7712";
        } else if (i === 5) {
          // Add secondary dynamic threat under observation
          status = 'WARNING';
          candidateName = "Vikram Deshmukh";
          trustScore = Math.max(62, Math.min(78, 75 - (heatmapTick % 12)));
          anomaly = "Slight typing cadence similarity degradation flagged.";
          biometrics = `Fingerprint sequence: 82% similarity | Keystroke drift at ${74 - (heatmapTick % 12)}% confidence`;
        } else if (i > 22) {
          status = 'EMPTY';
          candidateName = "None";
          trustScore = 0;
          biometrics = "Station offline (Unoccupied).";
        }
      } else if (selectedSessionId === 'EXM-44102-X') { // Hyderabad
        label = `HYD-${i < 10 ? '0' + i : i}`;
        candidateName = `Candidate HYD-${200 + i}`;
        if (i === 6 && alerts.some(a => a.id === 'AL-1102' && !a.resolved)) {
          status = 'WARNING';
          candidateName = "Aarav Kulkarni";
          trustScore = 70 + Math.floor(Math.sin(heatmapTick / 2) * 2);
          anomaly = "Semantic syntax pacing variance indicates active writing assistance systems.";
          biometrics = "Writing template similarity: 72% | Automated text generation markers found";
          alertId = "AL-1102";
        } else if (i === 14) {
          status = 'WARNING';
          candidateName = "Neha Sharma";
          trustScore = Math.max(64, Math.min(79, 78 - (heatmapTick % 9)));
          anomaly = "Consistent uniform typing delay suspects copypaste macro.";
          biometrics = `Pacing consistency factor: 91% | Automated macros trigger probability at 72%`;
        } else if (i > 20) {
          status = 'EMPTY';
          candidateName = "None";
          trustScore = 0;
          biometrics = "Station offline (Unoccupied).";
        }
      } else if (selectedSessionId === 'EXM-10294-Z') { // Pune
        label = `PUN-${i < 10 ? '0' + i : i}`;
        candidateName = `Candidate PUN-${300 + i}`;
        if (i === 15 && alerts.some(a => a.id === 'AL-9942' && !a.resolved)) {
          status = 'ALERT';
          candidateName = "Neha Joshi";
          trustScore = 55 + Math.floor(Math.sin(heatmapTick / 3) * 4);
          anomaly = "Continuous keyboard cadences and track path alignment coordinate with neighbor PUN-16.";
          biometrics = "Dual workstation sound wave correlation: 88% similarity | Collusion high risk";
          alertId = "AL-9942";
        } else if (i === 10 || i === 11) {
          status = 'WARNING';
          candidateName = i === 10 ? "Kabir Bose" : "Rahul Verma";
          trustScore = Math.max(59, Math.min(75, 72 - (heatmapTick % 8)));
          anomaly = "Coordinated window focus changes detected with neighboring stations.";
          biometrics = `Spectrum soundwave overlap check: 85% similarity | Collusion risk suspect`;
        } else if (i > 22) {
          status = 'EMPTY';
          candidateName = "None";
          trustScore = 0;
          biometrics = "Station offline (Unoccupied).";
        }
      } else { // Mumbai
        label = `MUM-${i < 10 ? '0' + i : i}`;
        candidateName = `Candidate MUM-${400 + i}`;
        if (i > 18) {
          status = 'EMPTY';
          candidateName = "None";
          trustScore = 0;
          biometrics = "Station offline (Unoccupied).";
        }
      }

      seats.push({
        seatIndex: i,
        label,
        status,
        candidateName,
        trustScore,
        anomaly,
        biometrics,
        alertId
      });
    }
    return seats;
  }, [selectedSessionId, alerts, heatmapTick, currentScenario]);

  // Find currently selected workstation details
  const selectedStation = React.useMemo(() => {
    return workstations.find(w => w.seatIndex === selectedSeatIndex) || workstations[0];
  }, [workstations, selectedSeatIndex]);

  const seatFlags = React.useMemo(() => {
    const isR = selectedStation.candidateName === "Rohan Patil";
    const isA = selectedStation.candidateName === "Aarav Kulkarni";
    const isN = selectedStation.candidateName === "Neha Joshi";
    const isW = selectedStation.status === 'WARNING';
    const isAl = selectedStation.status === 'ALERT';

    if (isR) {
      return {
        identityDrift: 63.5,
        typingLoss: 58.0,
        writingShift: 12.5,
        mouseDrift: 82.0,
        trustReduction: 63.5,
        keyboardEvents: 48231 + heatmapTick * 2,
        mouseEvents: 124912 + heatmapTick * 11,
        focusChanges: 2,
        tabSwitches: 1,
        copyAttempts: 0,
        questionInteractions: 42
      };
    } else if (isA) {
      return {
        identityDrift: 10.8,
        typingLoss: 48.5,
        writingShift: 78.4,
        mouseDrift: 14.8,
        trustReduction: 42.0,
        keyboardEvents: 35102 + heatmapTick * 2,
        mouseEvents: 98121 + heatmapTick * 8,
        focusChanges: 5,
        tabSwitches: 3,
        copyAttempts: 2,
        questionInteractions: 38
      };
    } else if (isN) {
      return {
        identityDrift: 15.5,
        typingLoss: 18.8,
        writingShift: 15.0,
        mouseDrift: 88.0,
        trustReduction: 52.0,
        keyboardEvents: 29481 + heatmapTick * 2,
        mouseEvents: 85291 + heatmapTick * 9,
        focusChanges: 4,
        tabSwitches: 2,
        copyAttempts: 0,
        questionInteractions: 31
      };
    } else if (isAl) {
      return {
        identityDrift: 45.0,
        typingLoss: 40.0,
        writingShift: 25.0,
        mouseDrift: 55.0,
        trustReduction: 60.0,
        keyboardEvents: 15420 + heatmapTick * 2,
        mouseEvents: 45192 + heatmapTick * 10,
        focusChanges: 3,
        tabSwitches: 2,
        copyAttempts: 1,
        questionInteractions: 25
      };
    } else if (isW) {
      return {
        identityDrift: 18.0,
        typingLoss: 35.0,
        writingShift: 20.0,
        mouseDrift: 28.0,
        trustReduction: 32.0,
        keyboardEvents: 12400 + heatmapTick * 2,
        mouseEvents: 38100 + heatmapTick * 8,
        focusChanges: 2,
        tabSwitches: 1,
        copyAttempts: 0,
        questionInteractions: 18
      };
    } else {
      return {
        identityDrift: 2.5,
        typingLoss: 1.5,
        writingShift: 1.0,
        mouseDrift: 2.1,
        trustReduction: 1.8,
        keyboardEvents: 18420 + heatmapTick * 2,
        mouseEvents: 45192 + heatmapTick * 9,
        focusChanges: 0,
        tabSwitches: 0,
        copyAttempts: 0,
        questionInteractions: 28
      };
    }
  }, [selectedStation, heatmapTick]);

  // Auto-redirect to the anomalous seats when changing centers
  const handleSessionChange = (sessId: string) => {
    setSelectedSessionId(sessId);
    if (sessId === 'EXM-88219-B') setSelectedSeatIndex(18);
    else if (sessId === 'EXM-44102-X') setSelectedSeatIndex(6);
    else if (sessId === 'EXM-10294-Z') setSelectedSeatIndex(15);
    else setSelectedSeatIndex(1);
  };

  const centerTabs = [
    { id: 'EXM-88219-B', label: 'Solapur Central', code: 'SOL-01', activeCount: 142 },
    { id: 'EXM-44102-X', label: 'Hyderabad Tech', code: 'HYD-02', activeCount: 89 },
    { id: 'EXM-10294-Z', label: 'Pune Operations', code: 'PUN-03', activeCount: 238 },
    { id: 'EXM-55310-Y', label: 'Mumbai Host', code: 'MUM-01', activeCount: 31 }
  ];

  // Executive Summary Card calculations
  const currentRiskStatus = (() => {
    if (currentScenario === 'IMPERSONATION') return { text: 'CRITICAL', desc: 'Identity hijacking detected', color: 'text-red-750 bg-red-50 border-red-200' };
    if (currentScenario === 'AI_ASSISTED') return { text: 'WARNING', desc: 'Stylometry pacing anomalies', color: 'text-amber-800 bg-amber-50 border-amber-200' };
    if (currentScenario === 'COLLUSION') return { text: 'CRITICAL', desc: 'Coordinated answers suspected', color: 'text-red-750 bg-red-50 border-red-200' };
    return { text: 'STABLE', desc: 'All telemetry indices verified healthy', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
  })();

  const currentTrustScore = (() => {
    let score = 96.4 + Math.sin(heatmapTick / 6) * 0.4;
    if (currentScenario === 'IMPERSONATION') score -= 3.8;
    if (currentScenario === 'AI_ASSISTED') score -= 1.9;
    if (currentScenario === 'COLLUSION') score -= 3.1;
    return parseFloat(Math.max(89.5, Math.min(99.4, score)).toFixed(1));
  })();

  const currentRecommendedAction = (() => {
    if (currentScenario === 'IMPERSONATION') return 'Trigger Secondary Biometric Challenge Scan';
    if (currentScenario === 'AI_ASSISTED') return 'Conduct Manual Stylometry Cadence Review';
    if (currentScenario === 'COLLUSION') return 'Execute Spatial Acoustic Correlation on Clusters';
    return 'Maintain Passive Stream Continuous Verification';
  })();

  const currentDecisionConfidence = (() => {
    if (currentScenario === 'NORMAL') return '99.8% System Accuracy';
    return '96.4% Audit Confidence';
  })();

  const currentSystemStatus = (() => {
    if (currentScenario === 'NORMAL') return 'SHIELD PROTECTED';
    return 'INVESTIGATION RUNNING';
  })();

  // Global Impact stats
  const totalMonitoredCount = 2500 + Math.floor(Math.sin(heatmapTick / 4) * 8) + (alerts.length * 2);
  const activeThreatsCount = alerts.filter(a => !a.resolved && a.category !== 'COGNITIVE').length;
  const investigationsOpenedCount = alerts.filter(a => a.stage && a.stage !== 'CLOSED').length;
  const casesResolvedCount = alerts.filter(a => a.resolved || a.stage === 'CLOSED').length + 96; // 96 historical + live
  const behaviorSignalsProcessed = (41.7 + (heatmapTick * 0.0006)).toFixed(4) + "M";
  const evaluationsTuned = 42129 + Math.floor(heatmapTick * 1.5);
  const totalCandidates = sessions.reduce((acc, s) => acc + s.candidatesActive, 0);

  return (
    <div className="flex-1 overflow-y-auto h-[calc(100vh-3.5rem)] bg-[#F8FAFC] px-8 py-6 text-slate-800 custom-scrollbar">
      
      {/* 1. Page Title & 2. Executive Summary */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#0F172A] font-sans uppercase">
            Continuous Trust Heatmap
          </h1>
          <p className="text-xs text-[#475569] mt-0.5 font-medium leading-normal">
            Real-time behavioral alignment monitoring, physical identity verification streams, and continuous passive checking.
          </p>
        </div>
        <div className="mt-2 md:mt-0">
          <button 
            onClick={() => setShowLimitationsModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] text-[#475569] hover:text-[#0F172A] rounded-lg transition-all text-xs font-semibold font-sans shadow-sm cursor-pointer"
          >
            <Info className="w-4 h-4 text-[#2563EB]" />
            Accommodations & System Bounds
          </button>
        </div>
      </div>

      {/* NEW: Executive Summary Scorecard (Must sit at the very top of the page, replaces technical metrics) */}
      <h3 className="text-[11px] font-mono font-black uppercase tracking-wider text-slate-400 mb-2">Executive Summary Scoreboard</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        
        {/* Card 1: Current Risk */}
        <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl shadow-sm">
          <span className="text-[9.5px] font-mono font-black uppercase text-slate-500 tracking-wider block">Current Risk Level</span>
          <div className="flex items-center gap-2 mt-1.5">
            <span className={`px-2.5 py-0.5 rounded text-xs font-black uppercase border font-sans ${currentRiskStatus.color}`}>
              {currentRiskStatus.text}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 font-medium">{currentRiskStatus.desc}</p>
        </div>

        {/* Card 2: Trust Score */}
        <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl shadow-sm">
          <span className="text-[9.5px] font-mono font-black uppercase text-slate-500 tracking-wider block">Passive Integrity Index</span>
          <div className="flex items-baseline gap-1 mt-1.5 font-sans">
            <span className="text-2xl font-black text-[#0f172a] tracking-tight">{currentTrustScore}%</span>
            <span className={`text-[9.5px] font-extrabold ${currentTrustScore >= 94 ? 'text-emerald-650' : 'text-amber-600'}`}>
              {currentTrustScore >= 94 ? '✓ OPTIMAL' : '⚡ DRIFTING'}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 font-medium">Auto-calibrating telemetry</p>
        </div>

        {/* Card 3: Recommended Action */}
        <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl shadow-sm lg:col-span-1">
          <span className="text-[9.5px] font-mono font-black uppercase text-slate-500 tracking-wider block">Recommended Resolution</span>
          <div className="text-[11px] font-bold text-slate-800 tracking-tight mt-1.5 line-clamp-2 leading-relaxed">
            {currentRecommendedAction}
          </div>
          <p className="text-[10px] text-slate-500 mt-1 font-medium">Calculated by Decision Engine</p>
        </div>

        {/* Card 4: Decision Confidence */}
        <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl shadow-sm">
          <span className="text-[9.5px] font-mono font-black uppercase text-slate-500 tracking-wider block">Decision Confidence</span>
          <div className="text-xl font-black text-[#2563EB] tracking-tight mt-1.5 font-sans">
            {currentDecisionConfidence}
          </div>
          <p className="text-[10px] text-slate-500 mt-2.5 font-medium">99.8% verification reliability</p>
        </div>

        {/* Card 5: Protection Status */}
        <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl shadow-sm">
          <span className="text-[9.5px] font-mono font-black uppercase text-slate-500 tracking-wider block">Operational Mode</span>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11.5px] font-black text-slate-800 tracking-tight uppercase">{currentSystemStatus}</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 font-medium">Consensus ledger active</p>
        </div>

      </div>

      {/* NEW: Today's Examination Impact (Global Hero Panel) */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-850 text-white rounded-2xl p-6 shadow-md border border-slate-800 mb-6 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none select-none">
          <Fingerprint className="w-80 h-80 text-white" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-white/10 pb-3 mb-4 gap-2">
            <div>
              <h2 className="text-base font-black uppercase tracking-tight font-sans text-white">
                Today's National Examination Impact
              </h2>
              <p className="text-[11px] text-slate-400 font-medium">
                Autonomous auditing analytics & telemetry coverage across distributed examination centers.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-[10px] font-mono uppercase bg-white/10 px-2.5 py-1 rounded-md tracking-wider font-extrabold border border-white/5">
                AUTONOMOUS SYSTEM ONLINE
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            
            {/* Stat 1: Candidates Monitored */}
            <div className="space-y-1">
              <span className="text-[10.5px] font-semibold text-slate-400 font-sans block">Candidates Monitored</span>
              <div className="text-2xl font-black text-white tracking-tight font-sans">{totalMonitoredCount}</div>
              <span className="text-[9px] font-mono text-emerald-400 font-bold block">● {totalCandidates} ACTIVE NOW</span>
            </div>

            {/* Stat 2: Behavior Signals Processed */}
            <div className="space-y-1">
              <span className="text-[10.5px] font-semibold text-slate-400 block font-sans">Behavior Signals Processed</span>
              <div className="text-2xl font-black text-white tracking-tight font-mono">{behaviorSignalsProcessed}</div>
              <span className="text-[9px] font-mono text-emerald-400 font-bold block">● INGESTING LIVE</span>
            </div>

            {/* Stat 3: Threat Events Detected */}
            <div className="space-y-1">
              <span className="text-[10.5px] font-semibold text-slate-400 block">Threat Events Detected</span>
              <div className="text-2xl font-black text-rose-400 tracking-tight font-sans">{activeThreatsCount + 42}</div>
              <span className="text-[9px] font-mono text-slate-400 font-bold block">INCLUDES HISTORIC</span>
            </div>

            {/* Stat 4: Investigations Opened */}
            <div className="space-y-1">
              <span className="text-[10.5px] font-semibold text-slate-400 block">Investigations Opened</span>
              <div className="text-2xl font-black text-amber-500 tracking-tight font-sans">{investigationsOpenedCount}</div>
              <span className="text-[9px] font-mono text-amber-400 font-bold block">✓ ACTION TRANSITIONS</span>
            </div>

            {/* Stat 5: Cases Resolved */}
            <div className="space-y-1">
              <span className="text-[10.5px] font-semibold text-slate-400 block">Cases Resolved</span>
              <div className="text-2xl font-black text-emerald-400 tracking-tight font-sans">{casesResolvedCount}</div>
              <span className="text-[9px] font-mono text-emerald-400 font-bold block">AI REASONING ENFORCED</span>
            </div>

            {/* Stat 6: Trust Evaluations Completed */}
            <div className="space-y-1 col-span-2 lg:col-span-1">
              <span className="text-[10.5px] font-semibold text-slate-400 block">Trust Evaluations Completed</span>
              <div className="text-2xl font-black text-sky-400 tracking-tight font-sans">{evaluationsTuned.toLocaleString()}</div>
              <span className="text-[9px] font-mono text-sky-400 font-bold block">PASSIVE TELEMETRY LOGGED</span>
            </div>

          </div>

          {/* Horizontal divider & Signals Processed Today */}
          <div className="border-t border-white/10 mt-5 pt-4">
            <h4 className="text-[10px] font-mono font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              Signals Processed Today (Large-Scale Enterprise Telemetry Ingestion)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div className="space-y-1">
                <span className="text-[10.5px] font-semibold text-slate-400 block font-sans">Keyboard Events</span>
                <div className="text-xl font-black text-white font-mono">{(8.4 + (heatmapTick * 0.0001)).toFixed(4)}M</div>
                <span className="text-[9px] font-mono text-emerald-400 font-bold block">● STREAMING LIVE</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10.5px] font-semibold text-slate-400 block font-sans">Mouse Events</span>
                <div className="text-xl font-black text-white font-mono">{(31.2 + (heatmapTick * 0.0005)).toFixed(4)}M</div>
                <span className="text-[9px] font-mono text-emerald-400 font-bold block">● STREAMING LIVE</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10.5px] font-semibold text-slate-400 block font-sans">Navigation Events</span>
                <div className="text-xl font-black text-white font-mono">{(2.1 + (heatmapTick * 0.00001)).toFixed(5)}M</div>
                <span className="text-[9px] font-mono text-emerald-400 font-bold block">● STREAMING LIVE</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10.5px] font-semibold text-slate-400 block font-sans">Behavior Profiles</span>
                <div className="text-xl font-black text-white font-mono">2,514</div>
                <span className="text-[9px] font-mono text-slate-400 block font-bold">ACTIVE EMBEDDINGS</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10.5px] font-semibold text-slate-400 block font-sans">Trust Evaluations</span>
                <div className="text-xl font-black text-sky-400 font-mono">{(48203 + heatmapTick).toLocaleString()}</div>
                <span className="text-[9px] font-mono text-sky-400 font-bold block">✓ CONSENSUS ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Main Content: Grid & Inspector Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-start">
        
        {/* Workstation Grid Column */}
        <div className="lg:col-span-8 bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between shrink-0 min-h-[350px]">
          
          <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-3 border-b border-[#F1F5F9] mb-4 gap-2">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#2563EB]" />
              <h3 className="font-sans font-bold text-[#0F172A] text-[13.5px] uppercase tracking-wide">
                Examination Workstation Map
              </h3>
            </div>
            
            <div className="flex gap-1 overflow-x-auto">
              {centerTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleSessionChange(tab.id)}
                  className={`px-3 py-1 text-[11px] font-mono font-bold uppercase rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                    selectedSessionId === tab.id
                      ? 'bg-[#EFF6FF] text-[#2563EB] border-[#93C5FD]'
                      : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-slate-50'
                  }`}
                >
                  {tab.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Reduced Grid Height wrapper by 25% for high scannability */}
          <div className="grid grid-cols-6 gap-2 w-full content-center py-2 min-h-[160px]">
            {workstations.map((ws) => {
              const isSelected = ws.seatIndex === selectedSeatIndex;
              let bgBorderClass = '';
              
              if (ws.status === 'EMPTY') {
                bgBorderClass = 'bg-[#F8FAFC] text-[#94A3B8] border-[#E2E8F0] hover:border-[#CBD5E1] cursor-not-allowed';
              } else if (ws.status === 'ALERT') {
                bgBorderClass = 'bg-red-50 text-red-700 border-red-300 hover:border-red-400 animate-pulse shadow-[0_0_4px_rgba(239,68,68,0.15)]';
              } else if (ws.status === 'WARNING') {
                bgBorderClass = 'bg-amber-50 text-amber-700 border-amber-300 hover:border-amber-400 shadow-[0_0_3px_rgba(245,158,11,0.1)]';
              } else {
                bgBorderClass = 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-300';
              }

              if (isSelected && ws.status !== 'EMPTY') {
                bgBorderClass += ' ring-2 ring-[#2563EB] font-black text-[#0F172A]';
              }

              return (
                <button
                  key={ws.seatIndex}
                  onClick={() => ws.status !== 'EMPTY' && setSelectedSeatIndex(ws.seatIndex)}
                  disabled={ws.status === 'EMPTY'}
                  className={`h-11 flex flex-col items-center justify-center rounded-lg border text-sans text-[11px] font-bold uppercase transition-all duration-150 relative cursor-pointer ${bgBorderClass}`}
                >
                  <span className="text-[12px]">{ws.label}</span>
                  {ws.status !== 'EMPTY' && (
                    <span className="text-[8.5px] font-mono block opacity-80">{ws.trustScore}% TST</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Micro summary legend of current center session below grid */}
          <div className="mt-4 p-2 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex flex-col sm:flex-row justify-between sm:items-center text-[11px] text-[#475569] gap-2">
            <span className="font-semibold text-[#0F172A] flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-300 inline-block"></span>
              Secured Grid
              <span className="text-[#64748B] font-normal font-mono ml-1">
                ({centerTabs.find(t => t.id === selectedSessionId)?.label})
              </span>
            </span>
            <div className="flex gap-4 font-mono text-[10px]">
              <span className="text-red-650 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
                Impersonation Flag
              </span>
              <span className="text-amber-600 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span>
                Anomaly Flag
              </span>
              <span>
                Active Station Count: <b className="text-[#0F172A] font-bold">{workstations.filter(w => w.status !== 'EMPTY').length}/24</b>
              </span>
            </div>
          </div>

        </div>

        {/* Seat Inspector Detail Card Side column */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between shrink-0 min-h-[350px]">
          
          {/* Identity details and workstation label */}
          <div className="border-b border-[#F1F5F9] pb-3 mb-3">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[9.5px] font-mono bg-[#EFF6FF] text-[#2563EB] px-2 py-0.5 rounded-md border border-[#93C5FD] uppercase font-bold tracking-wider">
                Station {selectedStation.label}
              </span>
              
              {selectedStation.status === 'ALERT' ? (
                <span className="text-[9px] font-mono text-red-600 font-extrabold tracking-wider uppercase flex items-center gap-1">
                  ● HIGH DRIFT
                </span>
              ) : selectedStation.status === 'WARNING' ? (
                <span className="text-[9px] font-mono text-amber-600 font-extrabold tracking-wider uppercase flex items-center gap-1">
                  ● TELEMETRY SHIFT
                </span>
              ) : (
                <span className="text-[9px] font-mono text-emerald-600 font-extrabold tracking-wider uppercase flex items-center gap-1">
                  ● SECURED
                </span>
              )}
            </div>

            <h3 className="font-sans font-black text-[#0F172A] text-[17px] tracking-tight">
              {selectedStation.candidateName}
            </h3>
            <p className="text-[10.5px] font-mono text-[#64748B] mt-0.5">
              Registration Base: {selectedStation.label.startsWith('SOL') ? 'SOL-REG-2026' : selectedStation.label.startsWith('HYD') ? 'HYD-REG-2026' : 'PUN-REG-2026'}
            </p>
          </div>

          {/* Live Session Card (Mini) */}
          <div className="bg-slate-900 border border-slate-800 text-white p-3.5 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.1)] mb-4 relative overflow-hidden text-xs">
            <div className="flex justify-between items-center mb-2 pb-1.5 border-b border-slate-800 font-mono text-[9px] text-slate-400 font-bold uppercase tracking-wider">
              <span>Live Session Monitor</span>
              <span className="text-emerald-400">● Streaming</span>
            </div>
            <div className="grid grid-cols-2 gap-2 font-mono">
              <div>
                <span className="text-[8.5px] text-slate-400 uppercase block font-bold">Elapsed</span>
                <span className="font-bold text-white block mt-0.5">18m {heatmapTick % 60}s</span>
              </div>
              <div>
                <span className="text-[8.5px] text-slate-400 uppercase block font-bold">Telemetry</span>
                <span className="font-bold text-white block mt-0.5">{seatFlags.keyboardEvents.toLocaleString()} evs</span>
              </div>
            </div>
          </div>

          {/* PROMINENT VERDICT EXECUTIVE SUMMARY CARD (Judges see in 2 seconds) */}
          <div className={`p-4 rounded-xl border text-slate-800 transition-all mb-4 ${
            selectedStation.status === 'ALERT'
              ? 'bg-red-50/50 border-red-200'
              : selectedStation.status === 'WARNING'
              ? 'bg-amber-50/50 border-amber-200'
              : 'bg-emerald-50/45 border-emerald-100'
          }`}>
            <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-2">
              <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                Platform Action Verdict
              </span>
              <span className={`px-2 py-0.5 rounded text-[9.5px] font-sans font-extrabold uppercase tracking-wide border ${
                selectedStation.status === 'ALERT'
                  ? 'text-red-700 bg-red-100 border-red-300'
                  : selectedStation.status === 'WARNING'
                  ? 'text-amber-800 bg-amber-100 border-amber-300'
                  : 'text-emerald-800 bg-emerald-100 border-emerald-200'
              }`}>
                {selectedStation.status === 'ALERT'
                  ? 'High Impersonation Risk'
                  : selectedStation.status === 'WARNING'
                  ? 'Drift Suspected'
                  : 'Fully Integrity Verified'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-500 block text-[9px] font-mono uppercase tracking-tight">Behavior Similarity:</span>
                <span className={`text-[17px] font-semibold tracking-tight ${
                  selectedStation.status === 'ALERT' ? 'text-red-650' : selectedStation.status === 'WARNING' ? 'text-amber-700' : 'text-emerald-700'
                }`}>
                  {selectedStation.status === 'ALERT' ? '42%' : selectedStation.status === 'WARNING' ? '72%' : '95%'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px] font-mono uppercase tracking-tight">Confidence Score:</span>
                <span className={`text-[17px] font-semibold tracking-tight ${
                  selectedStation.status === 'ALERT' ? 'text-red-650' : selectedStation.status === 'WARNING' ? 'text-amber-700' : 'text-emerald-700'
                }`}>
                  {selectedStation.status === 'ALERT' ? '45%' : selectedStation.status === 'WARNING' ? '60%' : '98%'}
                </span>
              </div>
            </div>
          </div>

          {/* Flag Explanation Engine */}
          <div className="my-4 space-y-2">
            <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider block font-bold">
              Flag Explanation Engine
            </span>
            <div className="space-y-1.5 font-mono text-[9.5px]">
              {[
                { name: "Identity Verification Drift", val: seatFlags.identityDrift, color: "bg-red-500" },
                { name: "Typing Consistency Loss", val: seatFlags.typingLoss, color: "bg-amber-500" },
                { name: "Writing Pattern Shift", val: seatFlags.writingShift, color: "bg-purple-500" },
                { name: "Mouse Behavior Drift", val: seatFlags.mouseDrift, color: "bg-blue-500" },
                { name: "Overall Trust Reduction", val: seatFlags.trustReduction, color: "bg-red-650" }
              ].map((flag, idx) => (
                <div key={idx} className="space-y-0.5 bg-slate-50 p-1.5 rounded-lg border border-[#E2E8F0]">
                  <div className="flex justify-between items-center text-[8.5px] font-sans">
                    <span className="font-semibold text-[#0F172A]">{flag.name}</span>
                    <span className="font-bold text-red-650">{flag.val.toFixed(1)}%</span>
                  </div>
                  <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-350 ${flag.color}`}
                      style={{ width: `${flag.val}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Behavior Collection Visualization */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 shadow-sm space-y-3 text-white mb-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
              <span className="text-[9.5px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                Behavior Collection
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            <div className="space-y-2">
              {[
                { name: "Keyboard Rhythm", color: "bg-emerald-500", scale: Math.max(15, (seatFlags.keyboardEvents % 10) * 10) },
                { name: "Mouse Spline Consistency", color: "bg-blue-500", scale: Math.max(20, (seatFlags.mouseEvents % 8) * 12) },
                { name: "Focus & Window Adherence", color: "bg-emerald-400", scale: seatFlags.focusChanges > 3 ? 30 : 90 },
                { name: "Reading Pace Coherence", color: "bg-purple-500", scale: Math.max(15, (seatFlags.questionInteractions % 5) * 20) },
                { name: "Live Trust Signal", color: "bg-emerald-400", scale: selectedStation.trustScore }
              ].map((sig, sIdx) => (
                <div key={sIdx} className="space-y-0.5">
                  <div className="flex justify-between items-center text-[8.5px] font-mono text-slate-400">
                    <span>{sig.name}</span>
                    <span>{sig.scale.toFixed(0)}%</span>
                  </div>
                  <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${sig.color}`} 
                      style={{ width: `${sig.scale}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description alert text */}
          {(selectedStation.status === 'ALERT' || selectedStation.status === 'WARNING') && (
            <div className="p-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-[10.5px] text-[#0F172A] leading-snug mb-4">
              <span className="font-bold text-[#2563EB] block uppercase text-[9px] tracking-wider mb-1">Behavior Fingerprint Map:</span>
              {selectedStation.anomaly}
            </div>
          )}

          {/* HIGHLY OBVIOUS FORENSIC ACTION CTA */}
          <div className="border-t border-[#F1F5F9] pt-3 shrink-0">
            {selectedStation.status !== 'STABLE' && selectedStation.alertId ? (
              <button
                onClick={() => handleAlertClick(selectedStation.alertId!)}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white text-[12px] font-sans font-bold uppercase rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4 text-white" />
                Launch Full Auditing Review
              </button>
            ) : (
              <button
                onClick={() => {
                  setActiveTab(ActiveTab.DIGITAL_TWIN);
                }}
                className="w-full py-2.5 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#2563EB] text-[12px] font-sans font-bold uppercase rounded-lg border border-[#BFDBFE] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Fingerprint className="w-4 h-4" />
                Explore Behavioral Profile
              </button>
            )}
          </div>
          </div>

          {/* LMS Deployment Integrations Card */}
          <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-3">
            <h4 className="text-xs font-black text-[#0F172A] font-sans tracking-wide uppercase flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#2563EB]" />
              Enterprise LMS Integrations
            </h4>
            
            <p className="text-[11px] text-slate-500 leading-normal font-sans">
              CDT-X integrates directly with institutional infrastructure to enable rapid campus-wide deployment:
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
              {["Moodle", "Canvas", "Google Classroom", "ExamSoft", "Custom LMS"].map((lms, lIdx) => (
                <div key={lIdx} className="flex items-center gap-1 bg-slate-50 border border-[#E2E8F0] p-1.5 rounded-lg text-[10.5px]">
                  <Check className="w-3.5 h-3.5 text-emerald-600 font-extrabold shrink-0" />
                  <span>{lms}</span>
                </div>
              ))}
            </div>

            <div className="pt-2.5 border-t border-[#F1F5F9] flex justify-between items-center text-xs">
              <span className="text-[#64748B] font-mono text-[9.5px]">Deployment Time:</span>
              <span className="text-[#2563EB] font-bold font-mono bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">&lt; 1 Day</span>
            </div>
          </div>

        </div>

      </div>

      {/* 5. Supporting Data: Ongoing sessions & Critical Event Streams */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column Stack: Ongoing Rooms & Systems Actions */}
        <div className="lg:col-span-7 space-y-6">
          {/* Ongoing Exam Rooms Table (Left column) */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="px-5 py-3 border-b border-[#F1F5F9] bg-slate-50 flex justify-between items-center">
              <h4 className="font-sans font-bold text-[#0F172A] text-[12px] uppercase tracking-wider">
                Ongoing Exam Sessions
              </h4>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-mono text-[9px] font-bold">
                ● SECURE DATA COURIERS
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[12px]">
                <thead className="bg-[#F8FAFC] text-[#64748B] font-mono text-[9.5px] uppercase border-b border-[#E2E8F0]">
                  <tr>
                    <th className="text-left px-5 py-2.5 font-medium">Session ID</th>
                    <th className="text-left px-5 py-2.5 font-medium">Location Hub</th>
                    <th className="text-left px-5 py-2.5 font-medium">Student Spans</th>
                    <th className="text-left px-5 py-2.5 font-medium">Completion</th>
                    <th className="text-right px-5 py-2.5 font-medium">Verify</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {filteredSessions.map((session) => (
                    <tr key={session.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-2.5 font-mono text-[#0F172A] font-bold">
                        {session.id}
                      </td>
                      <td className="px-5 py-2.5 text-[#475569]">
                        {session.location}
                      </td>
                      <td className="px-5 py-2.5 text-[#64748B]">
                        {session.candidatesActive} active / {session.candidatesTotal} total
                      </td>
                      <td className="px-5 py-2.5 w-32">
                        <div className="flex items-center gap-1.5">
                          <div className="flex-1 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#2563EB] rounded-full" 
                              style={{ width: `${session.progress}%` }}
                            ></div>
                          </div>
                          <span className="font-mono text-[9px] text-[#475569]">{session.progress}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-2.5 text-right">
                        <button 
                          onClick={() => {
                            const associatedAlert = alerts.find(a => a.centerId.includes(session.location.split(' ')[0]));
                            if (associatedAlert) {
                              setSelectedAlertId(associatedAlert.id);
                            }
                            setActiveTab(ActiveTab.INVESTIGATIONS);
                          }}
                          className="p-1.5 rounded-lg text-[#2563EB] hover:bg-[#EFF6FF] transition-colors inline-block cursor-pointer"
                          title="Analyze Session Forensics"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SYSTEM ACTIONS PANEL */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#F1F5F9] mb-4">
              <h4 className="font-sans font-bold text-[#0F172A] text-[12px] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#2563EB]" />
                System Actions Executed Today
              </h4>
              <span className="text-[10px] font-mono bg-[#EFF6FF] text-[#2563EB] px-2 py-0.5 rounded-md border border-[#93C5FD] font-bold">
                AUTO-ENFORCED
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 bg-slate-50 border border-[#E2E8F0] rounded-xl hover:bg-slate-100/50 transition-colors shadow-sm">
                <span className="text-emerald-600 font-extrabold text-base">✓</span>
                <div>
                  <div className="text-[12px] font-bold text-slate-800">127 Identity Verifications</div>
                  <div className="text-[10px] text-slate-500 font-medium">Continuous biometric scans</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 border border-[#E2E8F0] rounded-xl hover:bg-slate-100/50 transition-colors shadow-sm">
                <span className="text-emerald-600 font-extrabold text-base">✓</span>
                <div>
                  <div className="text-[12px] font-bold text-slate-800">42 AI Reviews</div>
                  <div className="text-[10px] text-slate-500 font-medium font-sans">Cadence matching resolved</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 border border-[#E2E8F0] rounded-xl hover:bg-slate-100/50 transition-colors shadow-sm">
                <span className="text-emerald-600 font-extrabold text-base">✓</span>
                <div>
                  <div className="text-[12px] font-bold text-slate-800">18 Collusion Reviews</div>
                  <div className="text-[10px] text-slate-500 font-medium font-sans">Acoustic & focus correlated</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 border border-[#E2E8F0] rounded-xl hover:bg-slate-100/50 transition-colors shadow-sm">
                <span className="text-[#2563EB] font-extrabold text-base">✓</span>
                <div>
                  <div className="text-[12px] font-bold text-slate-800">9 Session Invalidations</div>
                  <div className="text-[10px] text-slate-500 font-medium font-sans">Compromised feeds locked</div>
                </div>
              </div>
            </div>

            <div className="mt-3.5 p-3.5 bg-emerald-50/40 border border-emerald-100 rounded-xl flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 font-extrabold text-sm">✓</span>
                <span className="text-[11px] font-bold text-emerald-805">96 Cases Resolved</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-wider bg-emerald-100/60 px-2 py-0.5 rounded border border-emerald-200">
                100% AUDIT SATISFIED
              </span>
            </div>
          </div>

          {/* Enterprise Readiness Panel */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#F1F5F9] mb-1">
              <h4 className="font-sans font-bold text-[#0F172A] text-[12px] uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-505" />
                Enterprise Readiness Status
              </h4>
              <span className="text-[10.5px] font-mono bg-emerald-50 text-emerald-750 px-2 py-0.5 rounded-md border border-emerald-250 font-bold uppercase">
                Ready
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                { name: "CDT-X Core API", status: "HEALTHY", speed: "14ms", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
                { name: "Dataset Registry", status: "SYNCHRONIZED", speed: "1.2M logs", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
                { name: "Behavior Engine", status: "PROCESSING", speed: "0.2ms lat", color: "text-[#2563EB] bg-[#EFF6FF] border-[#BFDBFE] animate-pulse" },
                { name: "Decision Engine", status: "ACTIVE", speed: "99.9% acc", color: "text-emerald-600 bg-emerald-50 border-emerald-200" }
              ].map((srv, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-[#E2E8F0] rounded-xl flex flex-col justify-between shadow-sm">
                  <span className="text-[9.5px] font-mono text-[#64748B] uppercase font-bold block">{srv.name}</span>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${srv.color}`}>
                      {srv.status}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono font-bold">{srv.speed}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Critical Integrity Stream Event Column (Right column) */}
        <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
          <div className="px-5 py-3 border-b border-[#F1F5F9] bg-slate-50 flex justify-between items-center">
            <h4 className="font-sans font-bold text-[#0F172A] text-[12px] uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
              Critical Integrity Event Feed
            </h4>
            <span className="text-[9.5px] font-mono text-slate-400">1S Refresh</span>
          </div>

          <div className="p-3 space-y-2.5 max-h-[220px] overflow-y-auto custom-scrollbar">
            {activeAlarms.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 text-[#64748B] text-center">
                <CheckCircle className="w-8 h-8 text-emerald-500 mb-1.5 animate-bounce" />
                <p className="font-sans text-[12px] font-semibold text-[#0F172A]">All Candidates Verified Compliance</p>
                <p className="text-[10px] text-[#64748B] mt-0.5">No continuous biometric exceptions registered.</p>
              </div>
            ) : (
              activeAlarms.map((alert) => {
                const isCrit = alert.riskScore >= 90;
                return (
                  <div
                    key={alert.id}
                    onClick={() => handleAlertClick(alert.id)}
                    className="p-3 bg-white hover:bg-slate-50 border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-xl transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`font-mono text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase line-none ${
                        isCrit ? 'text-red-700 bg-red-50 border border-red-200' : 'text-amber-805 bg-amber-50 border border-amber-200'
                      }`}>
                        {alert.type}
                      </span>
                      <span className="font-mono text-[9px] text-[#64748B]">{alert.timestamp}</span>
                    </div>
                    <p className="text-[12px] text-[#334155] leading-snug font-sans truncate">
                      {alert.description}
                    </p>
                    <div className="mt-1.5 flex justify-between items-center text-[9.5px] font-mono">
                      <span className="text-[#2563EB] font-bold">{alert.candidateName?.toUpperCase()}</span>
                      <span className={`font-bold ${isCrit ? 'text-red-650' : 'text-amber-600'}`}>Risk: {alert.riskScore}%</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* Limitations Modal Popup */}
      <AnimatePresence>
        {showLimitationsModal && (
          <div className="fixed inset-0 bg-slate-900/45 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-xl max-w-2xl w-full relative overflow-hidden"
            >
              <button 
                onClick={() => setShowLimitationsModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-[#0F172A] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 border-b border-[#F1F5F9] pb-4 mb-4">
                <Shield className="w-5 h-5 text-[#2563EB]" />
                <h2 className="text-sm font-black text-[#0F172A] uppercase tracking-tight font-sans">
                  CDT-X Robustness Ledger: System Bounds & Ethical Safeguards
                </h2>
              </div>

              <div className="space-y-4 font-sans text-xs">
                <p className="text-[#475569] leading-relaxed">
                  In alignment with our commitments as an enterprise-grade exam integrity platform, CDT-X maintains a strict ledger of operational limitations and boundary guidelines. Providing these constraints reduces false positives, protects student equity, and simplifies auditing.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-2">
                  {/* Limit 1 */}
                  <div className="p-3 bg-slate-50 border border-[#E2E8F0] rounded-xl space-y-1">
                    <div className="flex items-center gap-1.5 text-[#2563EB] font-bold text-xs uppercase font-sans">
                      <Clock className="w-4 h-4" />
                      Minimum Examination Thresholds
                    </div>
                    <p className="text-[#475569] text-[10.5px] leading-relaxed">
                      Linguistic stylometry and keyboard hold latency tracking require a minimum sample duration of <span className="text-[#0F172A] font-semibold">12-15 minutes</span>. Extremely brief exams bypass dynamic profiling to protect baseline integrity.
                    </p>
                  </div>

                  {/* Limit 2 */}
                  <div className="p-3 bg-slate-50 border border-[#E2E8F0] rounded-xl space-y-1">
                    <div className="flex items-center gap-1.5 text-[#2563EB] font-bold text-xs uppercase font-sans">
                      <Shield className="w-4 h-4" />
                      First-Time Profile Calibration
                    </div>
                    <p className="text-[#475569] text-[10.5px] leading-relaxed">
                      Undergoing first-time calibration prompts a cold start. Until a secure 3-session physical cache footprint is compiled under verified conditions, primary risk matching operates with lowered confidence multipliers.
                    </p>
                  </div>

                  {/* Limit 3 */}
                  <div className="p-3 bg-slate-50 border border-[#E2E8F0] rounded-xl space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-600 font-bold text-xs uppercase font-sans">
                      <Laptop className="w-4 h-4" />
                      Shared Device Calibrations
                    </div>
                    <p className="text-[#475569] text-[10.5px] leading-relaxed">
                      Physical key travel variance, double-tap timings (membrane vs mechanical keyboards), and custom DPI profiles alter keypress and mouse vectors. Local devices undergo instant, lightweight initial calibration steps.
                    </p>
                  </div>

                  {/* Limit 4 */}
                  <div className="p-3 bg-slate-50 border border-[#E2E8F0] rounded-xl space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs uppercase font-sans">
                      <Accessibility className="w-4 h-4" />
                      Authorized Accommodations
                    </div>
                    <p className="text-[#475569] text-[10.5px] leading-relaxed">
                      Candidates utilizing assistive screen readers, unique mechanical switches, oral recorders or customized interfaces exhibit unique biometric signatures. CDT-X supports <b>Pre-Authorized Overrides</b> to completely bypass false alerts.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F1F5F9] flex justify-end">
                  <button 
                    onClick={() => setShowLimitationsModal(false)}
                    className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all uppercase tracking-wider cursor-pointer shadow-sm"
                  >
                    Acknowledge System Bounds
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
