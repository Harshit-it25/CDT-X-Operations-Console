/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  History, 
  CheckCircle, 
  AlertTriangle, 
  User, 
  MapPin, 
  Monitor, 
  FileText, 
  Save, 
  ShieldAlert, 
  Activity, 
  Cpu, 
  Info,
  Clock,
  Sparkles,
  Search,
  Eye,
  Keyboard,
  Compass,
  Check,
  X,
  FileBadge,
  Laptop,
  Radio,
  Brain,
  ShieldCheck,
  Sliders
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SecurityAlert, AuditorNote } from '../types';

interface InvestigationsViewProps {
  alerts: SecurityAlert[];
  selectedAlertId: string;
  setSelectedAlertId: (id: string) => void;
  notes: AuditorNote[];
  addNote: (text: string) => void;
  onAdjudicate: (alertId: string, action: 'RESOLVED_FALSE_POSITIVE' | 'TERMINATED_INVALID') => void;
  searchQuery: string;
}

export default function InvestigationsView({
  alerts,
  selectedAlertId,
  setSelectedAlertId,
  notes,
  addNote,
  onAdjudicate,
  searchQuery,
}: InvestigationsViewProps) {
  const [noteValue, setNoteValue] = useState('');
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<'indicators' | 'drift' | 'timeline'>('indicators');

  const [evidenceCounts, setEvidenceCounts] = useState<{ [key: string]: { keyboardEvents: number, mouseEvents: number, focusChanges: number, tabSwitches: number, copyAttempts: number, questionInteractions: number } }>({
    "AL-7712": { keyboardEvents: 48231, mouseEvents: 124912, focusChanges: 2, tabSwitches: 1, copyAttempts: 0, questionInteractions: 42 },
    "AL-1102": { keyboardEvents: 35102, mouseEvents: 98121, focusChanges: 5, tabSwitches: 3, copyAttempts: 2, questionInteractions: 38 },
    "AL-9942": { keyboardEvents: 29481, mouseEvents: 85291, focusChanges: 4, tabSwitches: 2, copyAttempts: 0, questionInteractions: 31 }
  });

  const [liveSessionStats, setLiveSessionStats] = useState({
    connectedSeconds: 12 * 60 + 34,
    eventsProcessed: 42831
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveSessionStats(prev => ({
        connectedSeconds: prev.connectedSeconds + 1,
        eventsProcessed: prev.eventsProcessed + Math.floor(Math.random() * 20 + 5)
      }));

      setEvidenceCounts(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(key => {
          updated[key] = {
            keyboardEvents: (updated[key]?.keyboardEvents ?? 12000) + Math.floor(Math.random() * 3 + 1),
            mouseEvents: (updated[key]?.mouseEvents ?? 35000) + Math.floor(Math.random() * 12 + 4),
            focusChanges: (updated[key]?.focusChanges ?? 1) + (Math.random() < 0.01 ? 1 : 0),
            tabSwitches: (updated[key]?.tabSwitches ?? 0) + (Math.random() < 0.005 ? 1 : 0),
            copyAttempts: (updated[key]?.copyAttempts ?? 0) + (Math.random() < 0.002 ? 1 : 0),
            questionInteractions: (updated[key]?.questionInteractions ?? 10) + (Math.random() < 0.1 ? 1 : 0)
          };
        });
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Find currently selected case
  const currentCase = alerts.find(a => a.id === selectedAlertId) || alerts[0];

  const handleSaveNote = () => {
    if (!noteValue.trim()) return;
    addNote(noteValue);
    setNoteValue('');
  };

  if (!currentCase) {
    return (
      <div className="flex-grow flex items-center justify-center bg-[#F8FAFC] text-slate-500 p-12 h-full text-sans">
        <div className="text-center">
          <CheckCircle className="w-12 h-12 text-[#16A34A] mx-auto mb-4" />
          <h2 className="text-lg font-bold text-[#0F172A]">All Clearance Levels Checked</h2>
          <p className="mt-1 text-sm">No active behavioral forensics files are flagged for manual review.</p>
        </div>
      </div>
    );
  }

  const searchableCases = alerts.filter(a => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      a.id.toLowerCase().includes(q) ||
      a.type.toLowerCase().includes(q) ||
      (a.candidateName && a.candidateName.toLowerCase().includes(q))
    );
  });

  // Calculate mock values for the explainability section
  const isRohan = currentCase.id === 'AL-7712';
  const isAarav = currentCase.id === 'AL-1102';
  const isNeha = currentCase.id === 'AL-9942';

  let identityConfidence = "98.5%";
  let behaviorDriftIdx = "0.02 (Stable)";
  let verdictString = "SECURE / VERIFIED";

  if (isRohan) {
    identityConfidence = "36.5% - Signature Mismatch";
    behaviorDriftIdx = "42.0% (Automated/Emulator)";
    verdictString = "CRITICAL / TERMINATE RECOMMENDED";
  } else if (isAarav) {
    identityConfidence = "89.2% - Minor Drift";
    behaviorDriftIdx = "78.4% (Stylometric Shift / AI)";
    verdictString = "WARNING / AUDIT REQUIRED";
  } else if (isNeha) {
    identityConfidence = "84.5% - Mesh Sync Detected";
    behaviorDriftIdx = "88.0% (Collusion Matching PUN-16)";
    verdictString = "WARNING / COLLUSION DESK CORES";
  }

  // Dynamic Risk details
  const riskColor = currentCase.riskScore >= 75 
    ? "text-red-700 bg-red-50 border-red-200" 
    : currentCase.riskScore >= 50 
    ? "text-amber-800 bg-amber-50 border-amber-200" 
    : "text-emerald-750 bg-emerald-50 border-emerald-250";

  const recommendedActionVal = currentCase.id === 'AL-7712' 
    ? 'Lockdown Workstation' 
    : currentCase.id === 'AL-1102' 
    ? 'Trigger Proctor Review' 
    : currentCase.id === 'AL-9942' 
    ? 'Escalate to Security Desk' 
    : 'Continue Monitoring';

  return (
    <div className="h-full overflow-y-auto px-4 py-2.5 bg-[#F8FAFC] custom-scrollbar text-slate-800 pb-10">
      
      {/* Page Header — compact */}
      <div className="mb-2.5 flex items-center justify-between">
        <div>
          <h1 className="text-[13px] font-black tracking-tight text-[#0F172A] font-sans uppercase leading-none">
            Behavioral Evidence &amp; Forensics Desk
          </h1>
          <p className="text-[11px] text-[#64748B] mt-0.5">Telemetry alerts · behavior drift · operator decisions</p>
        </div>
      </div>

      {/* Standardized 4-Metric Header Strip */}
      <div className="grid grid-cols-4 gap-2.5 mb-2.5">
        {/* Metric 1: Trust Score */}
        <div className="bg-white border border-[#E2E8F0] px-3 py-2 rounded-xl shadow-sm">
          <span className="text-[11px] font-mono font-black uppercase text-slate-400 tracking-wider block mb-1">Trust Score</span>
          <div className="flex items-baseline gap-1 font-sans">
            <span className="text-[17px] font-black text-[#0f172a] tracking-tight leading-none">{(100 - currentCase.riskScore).toFixed(0)}%</span>
            <span className={`text-[11px] font-extrabold ${100 - currentCase.riskScore >= 70 ? 'text-emerald-600' : 'text-amber-605'}`}>
              {100 - currentCase.riskScore >= 70 ? '✓ COMPLIANT' : '⚡ EXCEPTION'}
            </span>
          </div>
          <p className="text-[11px] text-slate-455 mt-0.5 font-medium">Session trust rating</p>
        </div>

        {/* Metric 2: Identity Confidence */}
        <div className="bg-white border border-[#E2E8F0] px-3 py-2 rounded-xl shadow-sm">
          <span className="text-[11px] font-mono font-black uppercase text-slate-400 tracking-wider block mb-1">Identity Confidence</span>
          <div className="text-[17px] font-black text-[#2563EB] tracking-tight font-sans leading-none">
            {identityConfidence.split(' - ')[0]}
          </div>
          <p className="text-[11px] text-slate-455 mt-0.5 font-medium">Biometric profile match</p>
        </div>

        {/* Metric 3: Risk Level */}
        <div className="bg-white border border-[#E2E8F0] px-3 py-2 rounded-xl shadow-sm">
          <span className="text-[11px] font-mono font-black uppercase text-slate-400 tracking-wider block mb-1">Risk Level</span>
          <span className={`px-2 py-0.5 rounded text-[11px] font-black uppercase border font-sans inline-block mt-0.5 ${riskColor}`}>
            {currentCase.riskScore >= 75 ? 'CRITICAL' : currentCase.riskScore >= 50 ? 'MEDIUM' : 'LOW'}
          </span>
          <p className="text-[11px] text-slate-455 mt-0.5 font-medium">Bayesian classification</p>
        </div>

        {/* Metric 4: Recommended Action */}
        <div className="bg-white border border-[#E2E8F0] px-3 py-2 rounded-xl shadow-sm">
          <span className="text-[11px] font-mono font-black uppercase text-slate-400 tracking-wider block mb-1">Recommended Action</span>
          <div className="text-[11px] font-bold text-slate-800 tracking-tight line-clamp-1 leading-tight mt-0.5">
            {recommendedActionVal}
          </div>
          <p className="text-[11px] text-slate-455 mt-0.5 font-medium">Real-time prescription</p>
        </div>
      </div>

      {/* Live Session Card — compact 1-row strip (light themed) */}
      <div className="bg-white border border-[#E2E8F0] text-slate-800 px-4 py-2 rounded-xl flex items-center justify-between gap-4 mb-2.5 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></div>
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Operational Stream</span>
            <div className="flex items-center gap-2 mt-0">
              <strong className="text-[12px] font-sans tracking-tight text-slate-800">{currentCase.candidateName}</strong>
              <span className="text-slate-355 font-mono text-xs">|</span>
              <span className="text-[11px] font-mono text-[#2563EB] bg-[#EFF6FF] px-1.5 py-0.5 rounded border border-[#93C5FD]">
                {currentCase.id === 'AL-7712' ? 'UPSC-IV' : currentCase.id === 'AL-1102' ? 'MPSC' : currentCase.id === 'AL-9942' ? 'Telangana PSC' : 'Standard Exam'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-6 font-mono text-xs shrink-0">
          <div>
            <span className="text-[11px] text-slate-455 uppercase block font-bold">Connected</span>
            <span className="text-[12px] font-bold text-slate-800">
              {Math.floor(liveSessionStats.connectedSeconds / 60)}m {liveSessionStats.connectedSeconds % 60}s
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-455 uppercase block font-bold">Events</span>
            <span className="text-[12px] font-bold text-slate-800">{liveSessionStats.eventsProcessed.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-455 uppercase block font-bold">Trust Score</span>
            <span className={`text-[12px] font-bold ${100 - currentCase.riskScore > 70 ? 'text-emerald-600' : 100 - currentCase.riskScore > 40 ? 'text-amber-600' : 'text-red-650'}`}>
              {(100 - currentCase.riskScore).toFixed(0)}%
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-455 uppercase block font-bold">Status</span>
            <span className={`inline-flex items-center gap-1 font-bold uppercase tracking-wider text-[11px] ${
              currentCase.resolved ? 'text-emerald-600' : 'text-red-650'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full inline-block ${
                currentCase.resolved ? 'bg-emerald-500' : 'bg-red-500 animate-ping'
              }`}></span>
              {currentCase.resolved ? 'AUDITED' : 'UNDER AUDIT'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
        
        {/* LEFT COLUMN: ACTIVE CASES QUEUE (4/12) */}
        <div className="xl:col-span-4 space-y-3">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 shadow-sm">
            <h2 className="text-[11.5px] font-bold text-[#0F172A] font-sans uppercase tracking-wide mb-2.5 flex items-center gap-2">
              <History className="w-3.5 h-3.5 text-[#2563EB]" />
              Active Review Queue
            </h2>

            <div className="space-y-1.5 max-h-[480px] overflow-y-auto custom-scrollbar pr-1">
              {searchableCases.map((c) => {
                const isSelected = c.id === selectedAlertId;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedAlertId(c.id)}
                    className={`w-full flex flex-col p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-[#EFF6FF] border-[#2563EB] shadow-sm' 
                        : 'bg-white border-[#E2E8F0] hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full mb-1">
                      <span className="text-[11px] font-mono font-bold text-slate-500">{c.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        c.resolved 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-red-50 text-red-750 border border-red-200 animate-pulse'
                      }`}>
                        {c.resolved ? 'AUDITED' : 'PENDING'}
                      </span>
                    </div>

                    <span className="text-[12.5px] font-bold text-[#0F172A] block">{c.candidateName}</span>
                    <span className="text-[11px] text-slate-500 font-sans block mt-0.5 truncate">{c.centerName}</span>

                    <div className="mt-2.5 pt-2 border-t border-[#F1F5F9] flex justify-between items-center text-[11px] font-mono">
                      <span className="text-slate-400">Risk Score:</span>
                      <span className={`font-bold ${c.riskScore > 80 ? 'text-[#DC2626]' : c.riskScore > 50 ? 'text-[#D97706]' : 'text-[#16A34A]'}`}>
                        {c.riskScore}%
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="xl:col-span-8 space-y-3">
          
          {/* Active Case Header & Adjudication Bar */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono font-bold bg-slate-50 border border-[#E2E8F0] text-slate-500 px-1.5 py-0.5 rounded">
                  CASE: {currentCase.id}
                </span>
                {currentCase.resolved && (
                  <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded">
                    ADJUDICATION COMPILED
                  </span>
                )}
              </div>
              <h2 className="text-[14px] font-black text-[#0F172A] font-sans mt-0.5">
                {currentCase.candidateName} <span className="text-slate-450 font-normal text-[11px]">({currentCase.centerName})</span>
              </h2>
            </div>
            <div className="flex gap-2 shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
              <button
                onClick={() => onAdjudicate(currentCase.id, 'RESOLVED_FALSE_POSITIVE')}
                disabled={currentCase.resolved}
                className="flex-1 sm:flex-initial px-3 py-1 bg-white border border-[#E2E8F0] hover:bg-slate-50 text-[#475569] font-bold text-[11px] rounded-md disabled:opacity-40 transition-all cursor-pointer text-center leading-none"
              >
                Clear (False Positive)
              </button>
              <button
                onClick={() => onAdjudicate(currentCase.id, 'TERMINATED_INVALID')}
                disabled={currentCase.resolved}
                className="flex-1 sm:flex-initial px-3 py-1 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-bold text-[11px] rounded-md disabled:opacity-40 transition-all cursor-pointer text-center leading-none"
              >
                Invalidate Session
              </button>
            </div>
          </div>

          {/* WHY FLAGGED - MASSIVE OUTCOME CARD */}
          <div className="bg-[#FEF2F2] border border-red-250 rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex justify-between items-center border-b border-red-100 pb-2">
              <h3 className="text-[12px] font-black text-red-750 font-sans tracking-wide uppercase flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-600 animate-pulse" />
                Behavioral Anomalies Found: WHY FLAGGED
              </h3>
              <span className="bg-red-105 text-red-800 px-2 py-0.5 rounded text-[10px] font-black tracking-widest uppercase">
                {isRohan ? "CRITICAL RISK" : "UNDER INVESTIGATION"}
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono">
              <div className="bg-white p-3 rounded-lg border border-red-100 text-center flex flex-col justify-between shadow-sm">
                <span className="text-[10px] font-sans text-slate-500 font-bold block mb-1">Typing Drift</span>
                <span className="text-[22px] font-black text-red-600 tracking-tight leading-none">
                  {isRohan ? "+31%" : isAarav ? "+11%" : isNeha ? "+15%" : "+1.5%"}
                </span>
                <span className="text-[9px] text-slate-400 block mt-1 leading-none">vs baseline keys</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-red-100 text-center flex flex-col justify-between shadow-sm">
                <span className="text-[10px] font-sans text-slate-500 font-bold block mb-1">Navigation Drift</span>
                <span className="text-[22px] font-black text-red-600 tracking-tight leading-none">
                  {isRohan ? "+14%" : isAarav ? "+42%" : isNeha ? "+18%" : "+0.8%"}
                </span>
                <span className="text-[9px] text-slate-400 block mt-1 leading-none">browser focus</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-red-100 text-center flex flex-col justify-between shadow-sm">
                <span className="text-[10px] font-sans text-slate-500 font-bold block mb-1">Clipboard Events</span>
                <span className="text-[22px] font-black text-red-600 tracking-tight leading-none">
                  {isRohan ? "+6" : isAarav ? "+3" : isNeha ? "+2" : "0"}
                </span>
                <span className="text-[9px] text-slate-400 block mt-1 leading-none">copy-paste acts</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-red-100 text-center flex flex-col justify-between shadow-sm">
                <span className="text-[10px] font-sans text-slate-500 font-bold block mb-1">Identity Conf.</span>
                <span className="text-[22px] font-black text-[#2563EB] tracking-tight leading-none">
                  {isRohan ? "44%" : isAarav ? "89%" : isNeha ? "84%" : "98%"}
                </span>
                <span className="text-[9px] text-slate-400 block mt-1 leading-none">stylometry sync</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-red-100 text-center flex flex-col justify-between shadow-sm col-span-2 sm:col-span-1">
                <span className="text-[10px] font-sans text-slate-500 font-bold block mb-1">Recommended Action</span>
                <span className="text-[11px] font-black text-red-700 uppercase leading-none my-auto">
                  {isRohan ? "Lockdown Exam" : isAarav ? "Proctor Review" : isNeha ? "Escalate Case" : "Monitor Only"}
                </span>
                <span className="text-[9px] text-slate-400 block mt-1 leading-none">threat engine</span>
              </div>
            </div>
          </div>

          {/* EVIDENCE SECTION - VISUALLY OUTWEIGHS PIPELINE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
            {/* Connected Candidate Device */}
            <div className="bg-white border-2 border-slate-200/80 rounded-xl p-3.5 shadow-sm space-y-2 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#2563EB]"></div>
              <div className="flex justify-between items-center border-b border-[#F1F5F9] pb-1.5 pl-2">
                <span className="text-[12px] font-mono font-black text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
                  <Monitor className="w-4 h-4 text-[#2563EB]" />
                  Connected Candidate Device
                </span>
                <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  ACTIVE
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] flex-grow mt-1.5 pl-2">
                <div className="bg-slate-50 p-2 rounded-lg border border-[#E2E8F0] flex flex-col justify-between">
                  <span className="text-[10px] font-sans text-slate-500 font-bold block leading-tight">Keyboard SDK</span>
                  <span className="text-[14px] font-bold text-[#0F172A] font-mono block mt-1 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-500" /> Receiving
                  </span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-[#E2E8F0] flex flex-col justify-between">
                  <span className="text-[10px] font-sans text-slate-500 font-bold block leading-tight">Mouse SDK</span>
                  <span className="text-[14px] font-bold text-[#0F172A] font-mono block mt-1 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-500" /> Receiving
                  </span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-[#E2E8F0] flex flex-col justify-between">
                  <span className="text-[10px] font-sans text-slate-500 font-bold block leading-tight">Focus Monitor</span>
                  <span className="text-[14px] font-bold text-[#0F172A] font-mono block mt-1 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-500" /> Active
                  </span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-[#E2E8F0] flex flex-col justify-between">
                  <span className="text-[10px] font-sans text-slate-500 font-bold block leading-tight">Clipboard Monitor</span>
                  <span className="text-[14px] font-bold text-[#0F172A] font-mono block mt-1 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-500" /> Active
                  </span>
                </div>
              </div>
            </div>

            {/* Behavioral Evidence Summary (Tabs) */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="flex border-b border-[#F1F5F9] pb-1.5 p-0.5 bg-slate-50 rounded-lg">
                <button
                  onClick={() => setActiveAnalysisTab('indicators')}
                  className={`flex-1 text-center py-1.5 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                    activeAnalysisTab === 'indicators' ? 'bg-white text-[#2563EB] shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Indicators
                </button>
                <button
                  onClick={() => setActiveAnalysisTab('drift')}
                  className={`flex-1 text-center py-1.5 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                    activeAnalysisTab === 'drift' ? 'bg-white text-[#2563EB] shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Drift
                </button>
                <button
                  onClick={() => setActiveAnalysisTab('timeline')}
                  className={`flex-1 text-center py-1.5 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                    activeAnalysisTab === 'timeline' ? 'bg-white text-[#2563EB] shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Timeline
                </button>
              </div>

              <div className="min-h-[140px] flex-grow flex flex-col justify-center">
                {activeAnalysisTab === 'indicators' && (
                  <div className="space-y-2 font-sans text-[11px]">
                    <div className="p-1.5 bg-blue-50 border border-blue-100 rounded-lg">
                      <span className="text-[9px] font-mono font-bold text-[#1E3A8A] block uppercase leading-none mb-0.5">Recommendation:</span>
                      <strong className="text-[11px] font-sans text-[#1D4ED8] block">"{verdictString}"</strong>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                      <div className="p-1.5 bg-slate-50 rounded border border-[#E2E8F0]">
                        <span className="text-[#64748B] block font-semibold leading-none mb-0.5">Tactile Hold</span>
                        <p className="font-bold text-[#0F172A] truncate">
                          {isRohan ? "Automated Keystroke Driver" : "Nominal limits"}
                        </p>
                      </div>
                      <div className="p-1.5 bg-slate-50 rounded border border-[#E2E8F0]">
                        <span className="text-[#64748B] block font-semibold leading-none mb-0.5">Mouse Trajectory</span>
                        <p className="font-bold text-[#0F172A] truncate">
                          {isRohan ? "Mechanical Bezier curve" : "Normal human jitter"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeAnalysisTab === 'drift' && (
                  <div className="space-y-1.5 font-sans text-[10.5px]">
                    <div className="p-1.5 bg-slate-50 rounded-lg border border-[#E2E8F0] space-y-1 font-mono text-[10px]">
                      <div className="flex justify-between border-b border-[#E2E8F0] pb-0.5 font-bold text-slate-400">
                        <span>Block Interval</span>
                        <span>Variance</span>
                      </div>
                      <div className="flex justify-between text-[#0F172A]">
                        <span>Block 01 (09:00)</span>
                        <span>{isRohan ? '+4.2%' : '+0.3%'}</span>
                      </div>
                      <div className="flex justify-between text-[#0F172A]">
                        <span>Block 02 (09:15)</span>
                        <span className={isRohan ? 'text-red-600 font-bold' : ''}>{isRohan ? '+41.5%' : '+1.1%'}</span>
                      </div>
                      <div className="flex justify-between text-[#0F172A]">
                        <span>Block 03 (09:30)</span>
                        <span className={isRohan || isAarav ? 'text-red-600 font-bold' : ''}>
                          {isRohan ? '+82.0%' : isAarav ? '+78.4%' : '+0.8%'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeAnalysisTab === 'timeline' && (
                  <div className="relative border-l border-[#E2E8F0] pl-3 space-y-1.5 font-sans text-[10px] pt-1">
                    <div className="relative">
                      <span className="absolute -left-[15.5px] top-1 w-1.5 h-1.5 bg-red-600 rounded-full border border-white" />
                      <strong className="text-[#0F172A] block leading-none">Automated inputs blocked</strong>
                      <span className="text-slate-400 font-mono block">10:15 UTC</span>
                    </div>
                    <div className="relative">
                      <span className="absolute -left-[15.5px] top-1 w-1.5 h-1.5 bg-amber-500 rounded-full border border-white" />
                      <strong className="text-[#0F172A] block leading-none">Window focus swerve</strong>
                      <span className="text-slate-400 font-mono block">09:40 UTC</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* BOTTOM AUDIT & WORKSPACE CELLS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
            
            {/* Decision Trace Pipeline - Compressed Height */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 shadow-sm flex flex-col justify-between">
              <h3 className="text-[10.5px] font-black text-[#0F172A] font-sans tracking-wide uppercase flex items-center gap-1.5 mb-2">
                <Compass className="w-3.5 h-3.5 text-[#2563EB]" />
                Decision Pipeline
              </h3>
              <div className="space-y-1 text-[10.5px]">
                {[
                  { name: "Evidence Collected", desc: "Telemetry captured", color: "text-emerald-600" },
                  { name: "Risk Calculated", desc: `${currentCase.riskScore}% risk`, color: "text-emerald-600" },
                  { name: "Confidence Generated", desc: `${isRohan ? '94.2%' : '98.2%'} accuracy`, color: "text-emerald-600" },
                  { name: "Recommendation", desc: isRohan ? "Terminate" : "Audit", color: "text-red-600 font-bold" },
                  { name: "Final Outcome", desc: currentCase.resolved ? "Audited Case" : "Awaiting Review", color: "text-amber-605" }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-1 bg-slate-50 border border-slate-200/50 rounded-lg">
                    <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-705 flex items-center justify-center font-mono text-[9px] font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold truncate text-[#0F172A] leading-tight">{step.name}</div>
                      <div className={`text-[9.5px] ${step.color} truncate leading-none mt-0.5`}>{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Explainability Workspace - Compact height */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 shadow-sm flex flex-col justify-between relative overflow-hidden text-slate-800">
              <h3 className="text-[10.5px] font-black text-[#0F172A] font-sans tracking-wide uppercase flex items-center gap-1.5 mb-2">
                <Brain className="w-3.5 h-3.5 text-[#2563EB]" />
                Explainability Workspace
              </h3>
              <div className="space-y-2 max-h-[160px] overflow-y-auto custom-scrollbar pr-1 text-[10.5px]">
                {[
                  { 
                    q: "What Happened?", 
                    a: isRohan 
                      ? "Keystroke dynamics and mouse movements diverged significantly from Rohan Patil's historical baseline, indicating an active proxy driver."
                      : isAarav
                      ? "Response structure aligned with synthetic AI templates, indicating writing assistance."
                      : isNeha
                      ? "High-correlation sequence mapping detected with adjacent seat, indicating exam collusion."
                      : "Standard session monitoring compliant with baseline."
                  },
                  { 
                    q: "Why Did It Happen?", 
                    a: isRohan 
                      ? "Key hold times increased by 41.5%, and cursor followed scripted curves with zero human tremor."
                      : isAarav
                      ? "Entered answers at speeds exceeding human reading limits with repeated viewport focus losses."
                      : isNeha
                      ? "Viewport focus losses occurred within 500ms of the adjacent candidate's actions."
                      : "Hold times, mouse movements, and focus changes remain compliant."
                  },
                  { 
                    q: "What Evidence?", 
                    a: isRohan 
                      ? "1,248 keyboard hold/dwell timing frames and 12,421 cursor position coordinates."
                      : isAarav
                      ? "Text style composition analysis (94% AI match) and 5 browser window switches."
                      : "Live signal verification baseline."
                  }
                ].map((qa, idx) => (
                  <div key={idx} className="border-b border-[#F1F5F9] pb-1.5 last:border-0 last:pb-0">
                    <span className="text-[9.5px] font-mono text-[#2563EB] font-bold block">Q: {qa.q}</span>
                    <p className="text-slate-600 leading-normal pl-1.5 border-l border-slate-200 mt-0.5">{qa.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Auditor Commentary */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 shadow-sm flex flex-col justify-between">
              <h3 className="text-[10.5px] font-black text-[#0F172A] font-sans tracking-wide uppercase flex items-center gap-1.5 mb-1.5">
                <FileText className="w-3.5 h-3.5 text-[#2563EB]" />
                Auditor Notes
              </h3>
              <div className="space-y-1.5">
                <div className="flex gap-1">
                  <input
                    type="text"
                    value={noteValue}
                    onChange={(e) => setNoteValue(e.target.value)}
                    className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-2 py-1 text-xs text-[#0F172A] focus:outline-none placeholder-slate-400 text-[11px]"
                    placeholder="Append compliance note..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveNote();
                    }}
                  />
                  <button
                    onClick={handleSaveNote}
                    className="px-2 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-lg text-xs flex items-center justify-center cursor-pointer shadow-sm transition-all text-[11px] leading-none"
                  >
                    Save
                  </button>
                </div>
                
                <div className="space-y-1.5 max-h-[110px] overflow-y-auto custom-scrollbar">
                  {notes.length === 0 ? (
                    <span className="text-[9.5px] text-slate-400 font-mono italic block pl-1">No proctor commentary logged.</span>
                  ) : (
                    notes.map((n) => (
                      <div key={n.id} className="p-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded flex justify-between items-center text-[10px] shadow-sm">
                        <span className="text-[#0F172A] font-medium truncate max-w-[130px]">{n.text}</span>
                        <span className="text-[9px] font-mono text-slate-400">ID: {n.id}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
