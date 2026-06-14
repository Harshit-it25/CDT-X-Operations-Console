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
  Activity,
  Search
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
  
  const [sessionSearchQuery, setSessionSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'ALL' | 'HIGH' | 'MEDIUM' | 'LOW'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'IMPERSONATION' | 'AI_ASSISTANCE' | 'COLLUSION' | 'COGNITIVE'>('ALL');
  const [selectedAlertIds, setSelectedAlertIds] = useState<string[]>([]);

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
    if (!sessionSearchQuery) return true;
    const term = sessionSearchQuery.toLowerCase();
    return (
      session.id.toLowerCase().includes(term) ||
      session.location.toLowerCase().includes(term)
    );
  });

  const activeAlarms = alerts.filter(a => !a.resolved);

  const filteredAlarms = React.useMemo(() => {
    return activeAlarms.filter(a => {
      // Category filter
      if (categoryFilter !== 'ALL' && a.category !== categoryFilter) return false;

      // Severity filter based on riskScore
      if (severityFilter === 'HIGH' && a.riskScore < 75) return false;
      if (severityFilter === 'MEDIUM' && (a.riskScore < 50 || a.riskScore >= 75)) return false;
      if (severityFilter === 'LOW' && a.riskScore >= 50) return false;

      return true;
    });
  }, [activeAlarms, severityFilter, categoryFilter]);

  const handleBulkResolve = async () => {
    if (selectedAlertIds.length === 0) return;
    
    // 1. Update backend database for all selected alerts
    for (const alertId of selectedAlertIds) {
      const alertItem = alerts.find(a => a.id === alertId);
      if (alertItem && alertItem.candidateId) {
        try {
          await fetch(`/api/candidate/${alertItem.candidateId}/adjudicate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'RESOLVED_FALSE_POSITIVE' })
          });
        } catch (err) {
          console.error(`Failed to adjudicate ${alertItem.candidateId}:`, err);
        }
      }
    }

    // 2. Update frontend state
    setAlerts(prev => prev.map(a => selectedAlertIds.includes(a.id) ? { ...a, resolved: true } : a));
    setSelectedAlertIds([]);
  };

  const handleToggleSelectAllAlerts = () => {
    if (selectedAlertIds.length === filteredAlarms.length) {
      setSelectedAlertIds([]);
    } else {
      setSelectedAlertIds(filteredAlarms.map(a => a.id));
    }
  };

  const handleToggleSelectAlert = (id: string) => {
    setSelectedAlertIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

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
    if (currentScenario === 'COLLUSION') return 'Execute Spatial Behavioral Correlation on Clusters';
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
    <div className="flex-grow overflow-y-auto h-[calc(100vh-3rem)] bg-[#F8FAFC] px-4 py-2.5 text-slate-800 custom-scrollbar">
      
      {/* 1. Page Title — compact inline header */}
      <div className="mb-2.5 flex items-center justify-between">
        <div>
          <h1 className="text-[13px] font-black tracking-tight text-[#0F172A] font-sans uppercase leading-none">
            Continuous Trust Heatmap
          </h1>
          <p className="text-[11px] text-[#64748B] mt-0.5 font-medium leading-none">
            Real-time behavioral identity monitoring · passive verification
          </p>
        </div>
        <button 
          onClick={() => setShowLimitationsModal(true)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] text-[#475569] hover:text-[#0F172A] rounded-lg transition-all text-[11px] font-semibold font-sans shadow-sm cursor-pointer shrink-0"
        >
          <Info className="w-3.5 h-3.5 text-[#2563EB]" />
          System Bounds
        </button>
      </div>

      {/* Standardized 4-Metric Header Strip */}
      <div className="grid grid-cols-4 gap-2 mb-2">
        {/* Metric 1: Trust Score */}
        <div className="bg-white border border-[#E2E8F0] px-2.5 py-1.5 rounded-lg shadow-sm h-[76px] flex flex-col justify-between">
          <span className="text-[9.5px] font-mono font-black uppercase text-slate-400 tracking-wider block">Trust Score</span>
          <div className="flex items-baseline gap-1 font-sans">
            <span className="text-[15px] font-black text-[#0f172a] tracking-tight leading-none">{currentTrustScore}%</span>
            <span className={`text-[9.5px] font-extrabold ${currentTrustScore >= 94 ? 'text-emerald-600' : 'text-amber-600'}`}>
              {currentTrustScore >= 94 ? '✓ READY' : '⚡ EXCEPTION'}
            </span>
          </div>
          <p className="text-[9.5px] text-slate-400 leading-none">Auto-calibrating telemetry</p>
        </div>

        {/* Metric 2: Identity Confidence */}
        <div className="bg-white border border-[#E2E8F0] px-2.5 py-1.5 rounded-lg shadow-sm h-[76px] flex flex-col justify-between">
          <span className="text-[9.5px] font-mono font-black uppercase text-slate-400 tracking-wider block">Identity Confidence</span>
          <div className="text-[15px] font-black text-[#2563EB] tracking-tight font-sans leading-none">
            {currentDecisionConfidence.split(' System')[0]}
          </div>
          <p className="text-[9.5px] text-slate-400 leading-none">Rhythm match index</p>
        </div>

        {/* Metric 3: Risk Level */}
        <div className="bg-white border border-[#E2E8F0] px-2.5 py-1.5 rounded-lg shadow-sm h-[76px] flex flex-col justify-between items-start">
          <span className="text-[9.5px] font-mono font-black uppercase text-slate-400 tracking-wider block">Risk Level</span>
          <span className={`px-1.5 py-0.2 rounded text-[9.5px] font-black uppercase border font-sans leading-none ${currentRiskStatus.color}`}>
            {currentRiskStatus.text}
          </span>
          <p className="text-[9.5px] text-slate-400 leading-none">{currentRiskStatus.desc}</p>
        </div>

        {/* Metric 4: Recommended Action */}
        <div className="bg-white border border-[#E2E8F0] px-2.5 py-1.5 rounded-lg shadow-sm h-[76px] flex flex-col justify-between">
          <span className="text-[9.5px] font-mono font-black uppercase text-slate-400 tracking-wider block">Recommended Action</span>
          <div className="text-[10px] font-bold text-slate-800 tracking-tight line-clamp-1 leading-tight">
            {currentRecommendedAction}
          </div>
          <p className="text-[9.5px] text-slate-400 leading-none">Real-time prescription</p>
        </div>
      </div>

      {/* Examination Impact — optimized light-themed strip */}
      <div className="bg-white rounded-xl px-4 py-2 border border-[#E2E8F0] mb-2.5 shadow-sm text-slate-800">
        <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-mono uppercase tracking-widest font-extrabold text-slate-450">Today's National Examination Impact</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 border border-emerald-200 rounded">AUTONOMOUS ONLINE</span>
        </div>
        <div className="grid grid-cols-6 gap-2.5">
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-2.5 rounded-xl shadow-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Monitored</span>
            <div className="text-[18px] font-black text-[#0F172A] tracking-tight leading-none">{totalMonitoredCount}</div>
            <span className="text-[11px] font-mono text-emerald-600 block mt-1">{totalCandidates} active</span>
          </div>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-2.5 rounded-xl shadow-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Behavior Signals</span>
            <div className="text-[18px] font-black text-[#0F172A] tracking-tight font-mono leading-none">{behaviorSignalsProcessed}</div>
            <span className="text-[11px] font-mono text-emerald-600 block mt-1">live ingestion</span>
          </div>
          <div className="bg-[#FEF2F2] border border-red-250 p-2.5 rounded-xl shadow-sm">
            <span className="text-[11px] font-bold text-rose-500 uppercase tracking-wider block mb-0.5">Threats Detected</span>
            <div className="text-[18px] font-black text-rose-600 tracking-tight leading-none">{activeThreatsCount + 42}</div>
            <span className="text-[11px] font-mono text-rose-500 block mt-1">incl. historic</span>
          </div>
          <div className="bg-[#FFFBEB] border border-amber-200 p-2.5 rounded-xl shadow-sm">
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block mb-0.5">Investigations</span>
            <div className="text-[18px] font-black text-amber-600 tracking-tight leading-none">{investigationsOpenedCount}</div>
            <span className="text-[11px] font-mono text-amber-600 block mt-1">active cases</span>
          </div>
          <div className="bg-[#ECFDF5] border border-emerald-200 p-2.5 rounded-xl shadow-sm">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-0.5">Cases Resolved</span>
            <div className="text-[18px] font-black text-emerald-600 tracking-tight leading-none">{casesResolvedCount}</div>
            <span className="text-[11px] font-mono text-emerald-600 block mt-1">AI enforced</span>
          </div>
          <div className="bg-[#F0F9FF] border border-sky-200 p-2.5 rounded-xl shadow-sm">
            <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider block mb-0.5">Trust Evals</span>
            <div className="text-[18px] font-black text-sky-600 tracking-tight leading-none">{evaluationsTuned.toLocaleString()}</div>
            <span className="text-[11px] font-mono text-sky-600 block mt-1">consensus active</span>
          </div>
        </div>
      </div>

      {/* 4. Main Content: Grid & Inspector Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4 items-start">
        
        {/* Workstation Grid Column */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between shrink-0">
          
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

          {/* Compact workstation grid */}
          <div className="grid grid-cols-6 gap-1.5 w-full content-center py-1">
            {workstations.map((ws) => {
              const isSelected = ws.seatIndex === selectedSeatIndex;
              let bgBorderClass = '';
              
              if (ws.status === 'EMPTY') {
                bgBorderClass = 'bg-[#F8FAFC] text-[#94A3B8] border-[#E2E8F0] cursor-not-allowed';
              } else if (ws.status === 'ALERT') {
                bgBorderClass = 'bg-red-50 text-red-700 border-red-300 hover:border-red-400 animate-pulse';
              } else if (ws.status === 'WARNING') {
                bgBorderClass = 'bg-amber-50 text-amber-700 border-amber-300 hover:border-amber-400';
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
                  className={`h-8 flex flex-col items-center justify-center rounded-lg border text-[10px] font-bold uppercase transition-all duration-150 relative cursor-pointer ${bgBorderClass}`}
                >
                  <span className="text-[10px] leading-tight">{ws.label}</span>
                  {ws.status !== 'EMPTY' && (
                    <span className="text-[7.5px] font-mono block opacity-75 leading-none">{ws.trustScore}%</span>
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
            <div className="flex gap-4 font-mono text-[11px]">
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

          {/* Ongoing Exam Rooms Table (Left column) */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="px-5 py-3 border-b border-[#F1F5F9] bg-slate-50 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <h4 className="font-sans font-bold text-[#0F172A] text-[12px] uppercase tracking-wider">
                Ongoing Exam Sessions
              </h4>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search session..."
                    value={sessionSearchQuery}
                    onChange={(e) => setSessionSearchQuery(e.target.value)}
                    className="pl-7 pr-2.5 py-1 bg-white border border-[#E2E8F0] rounded-lg text-[11px] font-sans text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-44 outline-none shadow-sm"
                  />
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                </div>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-mono text-[11px] font-bold">
                  ● SECURE DATA COURIERS
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[11.5px]">
                <thead className="bg-[#F8FAFC] text-[#64748B] font-mono text-[11px] uppercase border-b border-[#E2E8F0]">
                  <tr>
                    <th className="text-left px-3.5 py-1.5 font-medium">Session ID</th>
                    <th className="text-left px-3.5 py-1.5 font-medium">Location Hub</th>
                    <th className="text-left px-3.5 py-1.5 font-medium">Student Spans</th>
                    <th className="text-left px-3.5 py-1.5 font-medium">Completion</th>
                    <th className="text-right px-3.5 py-1.5 font-medium">Verify</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {filteredSessions.map((session) => (
                    <tr key={session.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-3.5 py-1.5 font-mono text-[#0F172A] font-bold">
                        {session.id}
                      </td>
                      <td className="px-3.5 py-1.5 text-[#475569]">
                        {session.location}
                      </td>
                      <td className="px-3.5 py-1.5 text-[#64748B]">
                        {session.candidatesActive} active / {session.candidatesTotal} total
                      </td>
                      <td className="px-3.5 py-1.5 w-32">
                        <div className="flex items-center gap-1.5">
                          <div className="flex-1 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#2563EB] rounded-full" 
                              style={{ width: `${session.progress}%` }}
                            ></div>
                          </div>
                          <span className="font-mono text-[11px] text-[#475569]">{session.progress}%</span>
                        </div>
                      </td>
                      <td className="px-3.5 py-1.5 text-right">
                        <button 
                          onClick={() => {
                            const associatedAlert = alerts.find(a => a.centerId.includes(session.location.split(' ')[0]));
                            if (associatedAlert) {
                              setSelectedAlertId(associatedAlert.id);
                            }
                            setActiveTab(ActiveTab.INVESTIGATIONS);
                          }}
                          className="p-1 rounded-lg text-[#2563EB] hover:bg-[#EFF6FF] transition-colors inline-block cursor-pointer"
                          title="Analyze Session Forensics"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Seat Inspector Detail Card Side column */}
        <div className="lg:col-span-4 lg:row-span-2 space-y-3 flex flex-col">
          <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between shrink-0">
          
          {/* Identity details and workstation label */}
          <div className="border-b border-[#F1F5F9] pb-3 mb-3">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[11px] font-mono bg-[#EFF6FF] text-[#2563EB] px-2 py-0.5 rounded-md border border-[#93C5FD] uppercase font-bold tracking-wider">
                Station {selectedStation.label}
              </span>
              
              {selectedStation.status === 'ALERT' ? (
                <span className="text-[11px] font-mono text-red-600 font-extrabold tracking-wider uppercase flex items-center gap-1">
                  ● HIGH DRIFT
                </span>
              ) : selectedStation.status === 'WARNING' ? (
                <span className="text-[11px] font-mono text-amber-600 font-extrabold tracking-wider uppercase flex items-center gap-1">
                  ● TELEMETRY SHIFT
                </span>
              ) : (
                <span className="text-[11px] font-mono text-emerald-600 font-extrabold tracking-wider uppercase flex items-center gap-1">
                  ● SECURED
                </span>
              )}
            </div>

            <h3 className="font-sans font-black text-[#0F172A] text-[17px] tracking-tight">
              {selectedStation.candidateName}
            </h3>
            <p className="text-[11px] font-mono text-[#64748B] mt-0.5">
              Registration Base: {selectedStation.label.startsWith('SOL') ? 'SOL-REG-2026' : selectedStation.label.startsWith('HYD') ? 'HYD-REG-2026' : 'PUN-REG-2026'}
            </p>
          </div>

          {/* Live Session Card (Mini) */}
          <div className="bg-white border border-[#E2E8F0] text-slate-800 p-3.5 rounded-xl shadow-sm mb-4 relative overflow-hidden text-xs">
            <div className="flex justify-between items-center mb-2 pb-1.5 border-b border-[#F1F5F9] font-mono text-[11px] text-slate-500 font-bold uppercase tracking-wider">
              <span>Live Session Monitor</span>
              <span className="text-emerald-600">● Streaming</span>
            </div>
            <div className="grid grid-cols-2 gap-2 font-mono">
              <div>
                <span className="text-[11px] text-slate-400 uppercase block font-bold">Elapsed</span>
                <span className="font-bold text-slate-800 block mt-0.5">18m {heatmapTick % 60}s</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase block font-bold">Telemetry</span>
                <span className="font-bold text-slate-800 block mt-0.5">{seatFlags.keyboardEvents.toLocaleString()} evs</span>
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
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                Platform Action Verdict
              </span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-sans font-extrabold uppercase tracking-wide border ${
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
                <span className="text-slate-500 block text-[11px] font-mono uppercase tracking-tight">Behavior Similarity:</span>
                <span className={`text-[17px] font-semibold tracking-tight ${
                  selectedStation.status === 'ALERT' ? 'text-red-650' : selectedStation.status === 'WARNING' ? 'text-amber-700' : 'text-emerald-700'
                }`}>
                  {selectedStation.status === 'ALERT' ? '42%' : selectedStation.status === 'WARNING' ? '72%' : '95%'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-mono uppercase tracking-tight">Confidence Score:</span>
                <span className={`text-[17px] font-semibold tracking-tight ${
                  selectedStation.status === 'ALERT' ? 'text-red-650' : selectedStation.status === 'WARNING' ? 'text-amber-700' : 'text-emerald-700'
                }`}>
                  {selectedStation.status === 'ALERT' ? '45%' : selectedStation.status === 'WARNING' ? '60%' : '98%'}
                </span>
              </div>
            </div>
          </div>

          {/* Why Flagged (Priority 1) */}
          {(selectedStation.status === 'ALERT' || selectedStation.status === 'WARNING') ? (
            <div className="bg-white border border-red-200 rounded-xl p-3 shadow-sm space-y-2.5 my-3">
              <h3 className="text-[11px] font-black text-[#0F172A] font-sans tracking-wide uppercase flex items-center gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                Why Flagged
              </h3>
              
              <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center px-2 py-1 bg-slate-50 border border-slate-200/50 rounded-lg">
                    <span className="text-slate-500 font-sans">Typing Drift:</span>
                    <span className="font-bold text-red-600">
                      {selectedStation.candidateName === "Rohan Patil" ? "+31%" : selectedStation.candidateName === "Aarav Kulkarni" ? "+11%" : selectedStation.candidateName === "Neha Joshi" ? "+15%" : "+2%"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-2 py-1 bg-slate-50 border border-slate-200/50 rounded-lg">
                    <span className="text-slate-500 font-sans">Navigation Drift:</span>
                    <span className="font-bold text-red-650">
                      {selectedStation.candidateName === "Rohan Patil" ? "+14%" : selectedStation.candidateName === "Aarav Kulkarni" ? "+42%" : selectedStation.candidateName === "Neha Joshi" ? "+18%" : "+1%"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-2 py-1 bg-slate-50 border border-slate-200/50 rounded-lg">
                    <span className="text-slate-500 font-sans">Clipboard:</span>
                    <span className="font-bold text-red-600">
                      {selectedStation.candidateName === "Rohan Patil" ? "+6" : selectedStation.candidateName === "Aarav Kulkarni" ? "+3" : selectedStation.candidateName === "Neha Joshi" ? "+2" : "0"}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center px-2 py-1 bg-slate-50 border border-slate-200/50 rounded-lg">
                    <span className="text-slate-500 font-sans">Identity Conf:</span>
                    <span className="font-bold text-[#2563EB]">
                      {selectedStation.candidateName === "Rohan Patil" ? "44%" : selectedStation.candidateName === "Aarav Kulkarni" ? "89%" : selectedStation.candidateName === "Neha Joshi" ? "84%" : "98%"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-2 py-1 bg-slate-50 border border-slate-200/50 rounded-lg">
                    <span className="text-slate-500 font-sans">Action:</span>
                    <span className="font-bold text-red-650 text-[10px] uppercase truncate">
                      {selectedStation.status === 'ALERT' ? "Investigation Triggered" : "Audit Queue"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50/20 border border-emerald-100 rounded-xl p-3 shadow-sm my-3 text-[11px] text-emerald-800 font-sans">
              <span className="font-bold uppercase tracking-wider block mb-0.5">Behavior Verification Stable</span>
              All biometric metrics are within historical deviation bounds. No manual audit triggers registered.
            </div>
          )}

          {/* Behavior Collection Visualization */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 shadow-sm space-y-3 text-slate-800 mb-4">
            <div className="flex justify-between items-center border-b border-[#F1F5F9] pb-1.5">
              <span className="text-[9.5px] font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                Behavior Collection
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            <div className="space-y-2">
              {[
                { name: "Keyboard Rhythm", color: "bg-emerald-500", scale: Math.max(15, (seatFlags.keyboardEvents % 10) * 10) },
                { name: "Mouse Spline Consistency", color: "bg-blue-500", scale: Math.max(20, (seatFlags.mouseEvents % 8) * 12) },
                { name: "Focus & Window Adherence", color: "bg-emerald-500", scale: seatFlags.focusChanges > 3 ? 30 : 90 },
                { name: "Reading Pace Coherence", color: "bg-purple-500", scale: Math.max(15, (seatFlags.questionInteractions % 5) * 20) },
                { name: "Live Trust Signal", color: "bg-emerald-500", scale: selectedStation.trustScore }
              ].map((sig, sIdx) => (
                <div key={sIdx} className="space-y-0.5">
                  <div className="flex justify-between items-center text-[8.5px] font-mono text-slate-550">
                    <span>{sig.name}</span>
                    <span>{sig.scale.toFixed(0)}%</span>
                  </div>
                  <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
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

          {/* Student Device Connector Card */}
          <div className="bg-white border-2 border-slate-200/80 p-3.5 rounded-xl shadow-sm mb-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#2563EB]"></div>
            <div className="flex items-center justify-between mb-2 pl-2">
              <h4 className="text-[12px] font-black text-[#0F172A] font-sans tracking-wide uppercase flex items-center gap-1.5">
                <Laptop className="w-4 h-4 text-[#2563EB]" />
                Connected Candidate Device
              </h4>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                SDK LIVE
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono mb-2 pl-2">
              {[
                { label: "Keyboard SDK", status: "Active", ok: true },
                { label: "Mouse SDK", status: "Active", ok: true },
                { label: "Focus Monitor", status: "Active", ok: true },
                { label: "Clipboard Monitor", status: "Active", ok: true },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center bg-slate-50 px-2 py-1 rounded-lg border border-[#E2E8F0]">
                  <span className="text-slate-500">{item.label}</span>
                  <span className={item.ok ? 'text-emerald-600 font-bold flex items-center gap-1' : 'text-red-600 font-bold'}>
                    {item.ok && <CheckCircle className="w-3 h-3 text-emerald-500" />} {item.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono bg-slate-50 px-2 py-1.5 rounded-lg border border-[#E2E8F0] ml-2">
              <span className="text-slate-400">Events Processed</span>
              <span className="font-black text-[#0F172A]">{(seatFlags.keyboardEvents + seatFlags.mouseEvents).toLocaleString()}</span>
            </div>
         </div>

            {/* HIGHLY OBVIOUS FORENSIC ACTION CTA */}
            <div className="border-t border-[#F1F5F9] pt-3 shrink-0">
              {selectedStation.status !== 'STABLE' && selectedStation.alertId ? (
                <button
                  onClick={() => handleAlertClick(selectedStation.alertId!)}
                  className="w-full py-2 bg-red-50 border border-red-200 hover:bg-red-100 text-red-700 text-[11px] font-sans font-bold uppercase rounded-lg shadow-none transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Launch Full Auditing Review
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab(ActiveTab.INVESTIGATIONS);
                  }}
                  className="w-full py-2 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#2563EB] text-[11px] font-sans font-bold uppercase rounded-lg border border-[#BFDBFE] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Fingerprint className="w-3.5 h-3.5" />
                  Explore Forensic Desk
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Area (Left Column Stack) */}
        <div className="lg:col-span-8 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
          {/* Left Column Stack: Ongoing Rooms & Systems Actions */}
          <div className="lg:col-span-7 space-y-4">

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
                  <div className="text-[10px] text-slate-500 font-medium font-sans">Behavioral & focus correlated</div>
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

          {/* Alert Filters and Selection Controls */}
          <div className="p-3 bg-slate-50 border-b border-[#E2E8F0] space-y-2 text-xs">
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-white border border-[#E2E8F0] rounded-lg">
                <span className="text-[9px] font-mono text-[#64748B] font-bold">TYPE:</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as any)}
                  className="bg-transparent border-none text-[10px] font-mono text-[#2563EB] p-0 focus:ring-0 cursor-pointer outline-none"
                >
                  <option value="ALL">ALL</option>
                  <option value="IMPERSONATION">IMPERSONATION</option>
                  <option value="AI_ASSISTANCE">AI ASSIST</option>
                  <option value="COLLUSION">COLLUSION</option>
                  <option value="COGNITIVE">COGNITIVE</option>
                </select>
              </div>

              <div className="flex items-center gap-1 px-2 py-1 bg-white border border-[#E2E8F0] rounded-lg">
                <span className="text-[9px] font-mono text-[#64748B] font-bold">SEVERITY:</span>
                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value as any)}
                  className="bg-transparent border-none text-[10px] font-mono text-[#2563EB] p-0 focus:ring-0 cursor-pointer outline-none"
                >
                  <option value="ALL">ALL</option>
                  <option value="HIGH">{"HIGH (>=75%)"}</option>
                  <option value="MEDIUM">{"MEDIUM (50-74%)"}</option>
                  <option value="LOW">{"LOW (<50%)"}</option>
                </select>
              </div>
            </div>

            {filteredAlarms.length > 0 && (
              <div className="flex justify-between items-center pt-1 border-t border-slate-200/60 font-sans">
                <label className="flex items-center gap-1.5 cursor-pointer text-[11px] font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={filteredAlarms.length > 0 && selectedAlertIds.length === filteredAlarms.length}
                    onChange={handleToggleSelectAllAlerts}
                    className="rounded border-[#CBD5E1] text-[#2563EB] focus:ring-blue-500 w-3.5 h-3.5"
                  />
                  <span>Select All ({filteredAlarms.length})</span>
                </label>

                {selectedAlertIds.length > 0 && (
                  <button
                    onClick={handleBulkResolve}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10.5px] font-bold uppercase rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    Resolve Selected ({selectedAlertIds.length})
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="p-3 space-y-2.5 max-h-[145px] overflow-y-auto custom-scrollbar">
            {filteredAlarms.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 text-[#64748B] text-center">
                <CheckCircle className="w-8 h-8 text-emerald-500 mb-1.5" />
                <p className="font-sans text-[12px] font-semibold text-[#0F172A]">No Matching Exceptions</p>
                <p className="text-[10px] text-[#64748B] mt-0.5">Try altering your severity or type filters.</p>
              </div>
            ) : (
              filteredAlarms.map((alert) => {
                const isCrit = alert.riskScore >= 90;
                const isSelected = selectedAlertIds.includes(alert.id);
                return (
                  <div
                    key={alert.id}
                    className={`p-3 bg-white border rounded-xl transition-all flex items-start gap-2.5 ${
                      isSelected ? 'border-blue-400 bg-blue-50/10' : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleSelectAlert(alert.id)}
                      className="rounded border-[#CBD5E1] text-[#2563EB] focus:ring-blue-500 w-4 h-4 mt-0.5 cursor-pointer"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1 cursor-pointer" onClick={() => handleAlertClick(alert.id)}>
                        <span className={`font-mono text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase line-none ${
                          isCrit ? 'text-red-700 bg-red-50 border border-red-200' : 'text-amber-850 bg-amber-50 border border-amber-200'
                        }`}>
                          {alert.type}
                        </span>
                        <span className="font-mono text-[9px] text-[#64748B]">{alert.timestamp}</span>
                      </div>
                      <p className="text-[12px] text-[#334155] leading-snug font-sans truncate cursor-pointer" onClick={() => handleAlertClick(alert.id)}>
                        {alert.description}
                      </p>
                      <div className="mt-1.5 flex justify-between items-center text-[9.5px] font-mono cursor-pointer" onClick={() => handleAlertClick(alert.id)}>
                        <span className="text-[#2563EB] font-bold">{alert.candidateName?.toUpperCase()}</span>
                        <span className={`font-bold ${isCrit ? 'text-red-650' : 'text-amber-600'}`}>Risk: {alert.riskScore}%</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
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
