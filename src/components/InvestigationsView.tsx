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

  return (
    <div className="h-full overflow-y-auto p-8 bg-[#F8FAFC] custom-scrollbar text-slate-800 pb-16">
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] font-sans">
          Behavioral Evidence & Forensics Desk
        </h1>
        <p className="text-[13px] text-[#475569] mt-0.5">
          Review automated telemetry alerts, inspect behavior drift metrics, and record operator decisions.
        </p>
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
              <strong className="text-sm font-sans tracking-tight text-white">{currentCase.candidateName}</strong>
              <span className="text-slate-500 font-mono text-xs">|</span>
              <span className="text-[11px] font-mono text-[#60A5FA] bg-[#1E3A8A]/50 px-2 py-0.5 rounded border border-[#3B82F6]/30">
                {currentCase.id === 'AL-7712' ? 'Advanced Civil Services Aptitude (UPSC-IV)' : currentCase.id === 'AL-1102' ? 'State Civil Services Entrance (MPSC)' : currentCase.id === 'AL-9942' ? 'Telangana PSC Administrative Entrance' : 'Standard Recruitment Examination'}
              </span>
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
            <span className={`text-[13px] font-bold block mt-0.5 ${100 - currentCase.riskScore > 70 ? 'text-emerald-400' : 100 - currentCase.riskScore > 40 ? 'text-amber-400' : 'text-red-400'}`}>
              {(100 - currentCase.riskScore).toFixed(0)}% TST
            </span>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 uppercase block font-bold">Status</span>
            <span className={`inline-flex items-center gap-1 mt-0.5 font-bold uppercase tracking-wider text-[11px] ${
              currentCase.resolved ? 'text-emerald-400' : 'text-red-400 animate-pulse'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full inline-block ${
                currentCase.resolved ? 'bg-emerald-400' : 'bg-red-400 animate-ping'
              }`}></span>
              {currentCase.resolved ? 'AUDITED' : 'UNDER AUDIT'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COLUMN: ACTIVE CASES QUEUE (4/12) */}
        <div className="xl:col-span-4 space-y-4">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <h2 className="text-[12.5px] font-bold text-[#0F172A] font-sans uppercase tracking-wide mb-3 flex items-center gap-2">
              <History className="w-4 h-4 text-[#2563EB]" />
              Active Review Queue
            </h2>

            <div className="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
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
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        c.resolved 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-red-50 text-red-750 border border-red-200 animate-pulse'
                      }`}>
                        {c.resolved ? 'AUDITED' : 'PENDING'}
                      </span>
                    </div>

                    <span className="text-[12.5px] font-bold text-[#0F172A] block">{c.candidateName}</span>
                    <span className="text-[10px] text-slate-500 font-sans block mt-0.5 truncate">{c.centerName}</span>

                    <div className="mt-2.5 pt-2 border-t border-[#F1F5F9] flex justify-between items-center text-[10px] font-mono">
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

        {/* RIGHT COLUMN: FORENSIC INVESTIGATION WORKSPACE (8/12) */}
        <div className="xl:col-span-8 space-y-6">
          
          {/* Active Briefing Top Card & Quick Adjudication */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#F1F5F9] pb-4 mb-4 gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-[10px] font-mono font-bold bg-slate-50 border border-[#E2E8F0] text-slate-500 px-2.5 py-0.5 rounded-md">
                    CASE_REF: {currentCase.id}
                  </span>
                  
                  {currentCase.resolved && (
                    <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                      RESOLUTION COMPILED
                    </span>
                  )}
                </div>

                <h2 className="text-lg font-bold text-[#0F172A] font-sans">
                  {currentCase.candidateName}
                </h2>
                <p className="text-[11.5px] text-slate-500 font-sans">{currentCase.centerName}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => onAdjudicate(currentCase.id, 'RESOLVED_FALSE_POSITIVE')}
                  disabled={currentCase.resolved}
                  className="px-3.5 py-2 border border-[#E2E8F0] bg-white hover:border-[#CBD5E1] text-[#475569] hover:text-[#0F172A] font-bold text-xs rounded-xl disabled:opacity-40 transition-all cursor-pointer shadow-sm"
                >
                  Clear (False Positive)
                </button>
                <button
                  onClick={() => onAdjudicate(currentCase.id, 'TERMINATED_INVALID')}
                  disabled={currentCase.resolved}
                  className="px-3.5 py-2 bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs rounded-xl disabled:opacity-40 transition-all cursor-pointer shadow-md"
                >
                  Invalidate Exam Session
                </button>
              </div>
            </div>

            {/* Quick Metrics Summary Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-center">
                <span className="text-[9px] font-mono uppercase text-slate-500 block">Assessed Case Risk</span>
                <span className={`text-xl font-mono font-extrabold block mt-0.5 ${currentCase.riskScore > 80 ? 'text-[#DC2626]' : 'text-[#D97706]'}`}>
                  {currentCase.riskScore}%
                </span>
              </div>
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-center">
                <span className="text-[9px] font-mono uppercase text-slate-500 block">Identity Confidence</span>
                <span className="text-xl font-mono font-extrabold text-[#0F172A] block mt-0.5">
                  {identityConfidence.split(' - ')[0]}
                </span>
              </div>
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-center">
                <span className="text-[9px] font-mono uppercase text-slate-500 block">Behavior Drift</span>
                <span className="text-xl font-mono font-extrabold text-[#2563EB] block mt-0.5">
                  {behaviorDriftIdx.split(' (')[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Why This Candidate Was Flagged */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
            <h3 className="text-xs font-black text-[#0F172A] font-sans tracking-wide uppercase flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" />
              Why This Candidate Was Flagged
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2.5 font-mono text-[11px]">
                <div className="flex justify-between items-center p-2.5 bg-slate-50 border border-slate-200/50 rounded-xl">
                  <span className="text-slate-500 font-sans">Typing Drift:</span>
                  <span className="font-bold text-red-650">{isRohan ? "+31%" : isAarav ? "+10.8%" : isNeha ? "+15.5%" : "+1.5%"}</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-50 border border-slate-200/50 rounded-xl">
                  <span className="text-slate-500 font-sans">Navigation Anomaly:</span>
                  <span className="font-bold text-red-650">{isRohan ? "+14%" : isAarav ? "+42.0%" : isNeha ? "+18.0%" : "+0.8%"}</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-50 border border-slate-200/50 rounded-xl">
                  <span className="text-slate-500 font-sans">Writing Pattern Shift:</span>
                  <span className="font-bold text-red-650">{isRohan ? "+22%" : isAarav ? "+55.0%" : isNeha ? "+14.0%" : "+0.5%"}</span>
                </div>
              </div>
              <div className="space-y-2.5 font-mono text-[11px]">
                <div className="flex justify-between items-center p-2.5 bg-slate-50 border border-slate-200/50 rounded-xl">
                  <span className="text-slate-500 font-sans">Trust Reduction:</span>
                  <span className="font-bold text-red-650">{isRohan ? "-42%" : isAarav ? "-38.8%" : isNeha ? "-52.0%" : "-5.8%"}</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-50 border border-slate-200/50 rounded-xl">
                  <span className="text-slate-500 font-sans">Confidence:</span>
                  <span className="font-bold text-[#2563EB]">{isRohan ? "94.2%" : isAarav ? "78.4%" : isNeha ? "88.0%" : "98.2%"}</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-50 border border-slate-200/50 rounded-xl">
                  <span className="text-slate-500 font-sans">Decision:</span>
                  <span className={`font-bold uppercase ${isRohan ? "text-red-700" : isAarav || isNeha ? "text-amber-800" : "text-emerald-700"}`}>
                    {isRohan ? "Lockdown Recommended" : isAarav || isNeha ? "Manual Review Required" : "System Approved"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Decision Trace Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
            <h3 className="text-xs font-black text-[#0F172A] font-sans tracking-wide uppercase flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#2563EB]" />
              Decision Trace Pipeline
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-center text-[10.5px]">
              {[
                { name: "Evidence Collected", desc: "Telemetry captured", status: "complete", color: "bg-emerald-500 text-white border-emerald-600" },
                { name: "Risk Calculated", desc: `${currentCase.riskScore}% risk score`, status: "complete", color: "bg-emerald-500 text-white border-emerald-600" },
                { name: "Confidence Generated", desc: `${isRohan ? '94.2%' : isAarav ? '78.4%' : isNeha ? '88.0%' : '98.2%'} confidence`, status: "complete", color: "bg-emerald-500 text-white border-emerald-600" },
                { name: "Recommendation Issued", desc: isRohan ? "Terminate" : isAarav || isNeha ? "Audit" : "Approve", status: "complete", color: "bg-emerald-500 text-white border-emerald-600" },
                { name: "Operator Action", desc: currentCase.resolved ? "Resolved" : "Awaiting Review", status: currentCase.resolved ? "complete" : "pending", color: currentCase.resolved ? "bg-emerald-500 text-white border-emerald-600" : "bg-amber-500 text-white border-amber-600 animate-pulse" },
                { name: "Final Outcome", desc: currentCase.resolved ? "Case Closed" : "Pending Decision", status: currentCase.resolved ? "complete" : "pending", color: currentCase.resolved ? "bg-emerald-500 text-white border-emerald-600" : "bg-slate-100 text-slate-400 border-slate-200" }
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center p-2 rounded-xl bg-slate-50 border border-[#E2E8F0] shadow-sm">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold mb-1.5 ${step.color}`}>
                    {idx + 1}
                  </span>
                  <strong className="text-[#0F172A] block leading-tight font-sans">{step.name}</strong>
                  <span className="text-[9px] text-[#64748B] block mt-0.5 leading-none">{step.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* BEHAVIORAL EVIDENCE SUMMARY */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
            <div className="flex border-b border-[#F1F5F9] pb-2 p-0.5 bg-slate-50 rounded-xl">
              <button
                onClick={() => setActiveAnalysisTab('indicators')}
                className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeAnalysisTab === 'indicators' ? 'bg-white text-[#2563EB]' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Risk Indicators
              </button>
              <button
                onClick={() => setActiveAnalysisTab('drift')}
                className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeAnalysisTab === 'drift' ? 'bg-white text-[#2563EB]' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Behavior Drift Analysis
              </button>
              <button
                onClick={() => setActiveAnalysisTab('timeline')}
                className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeAnalysisTab === 'timeline' ? 'bg-white text-[#2563EB]' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Timeline Events
              </button>
            </div>

            <div className="min-h-[220px]">
              
              {activeAnalysisTab === 'indicators' && (
                <div className="space-y-4 font-sans text-xs">
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
                    <span className="text-[9px] font-mono font-bold text-[#1E3A8A] block uppercase mb-1">Final Verdict Recommendation:</span>
                    <strong className="text-sm font-sans text-[#1D4ED8] block">"{verdictString}"</strong>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[9.5px] font-mono text-slate-500 uppercase font-black block tracking-wider">Identified Risk Indicators Checkpoints</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-50 rounded-xl border border-[#E2E8F0] space-y-1">
                        <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">Keyboard Hold Rhythms</span>
                        <p className="text-[11.5px] text-[#0F172A] font-bold">
                          {isRohan ? "Automated Keystroke Driver Pattern Flagged" : "Within Baseline Parameters (Nominal)"}
                        </p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-[#E2E8F0] space-y-1">
                        <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">Bezier Path Trajectories</span>
                        <p className="text-[11.5px] text-[#0F172A] font-bold">
                          {isRohan ? "Mechanical Curve Lines Registered" : isNeha ? "Cooperative Workstation Path Synced" : "Normal Human Jitter Registered"}
                        </p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-[#E2E8F0] space-y-1">
                        <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">Composition Stylometry</span>
                        <p className="text-[11.5px] text-[#0F172A] font-bold">
                          {isAarav ? "LLM Synthetic Content Score Over Threshold" : "Normal Conversational Pattern Logged"}
                        </p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-[#E2E8F0] space-y-1">
                        <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">Solver Latency Window</span>
                        <p className="text-[11.5px] text-[#0F172A] font-bold">
                          {isAarav ? "Fast Solve Cadence Index Anomaly" : "Standard Comprehension Ticks"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeAnalysisTab === 'drift' && (
                <div className="space-y-4 font-sans text-xs">
                  <p className="text-slate-500 leading-relaxed text-[11.5px]">
                    Analysis of continuous behavioral divergence from candidate baseline records across consecutive 5-minute segments.
                  </p>

                  <div className="p-4 bg-slate-50 rounded-xl border border-[#E2E8F0] space-y-2 font-mono text-[10.5px]">
                    <div className="flex justify-between border-b border-[#E2E8F0] pb-1.5 font-bold text-slate-500">
                      <span>Telemetry Block Interval</span>
                      <span>Variance Dev</span>
                      <span>Integrity Status</span>
                    </div>
                    
                    <div className="flex justify-between text-[#0F172A]">
                      <span>Block 01 (09:00 - 09:15)</span>
                      <span>{isRohan ? '+4.2%' : '+0.3%'}</span>
                      <span className="text-emerald-700 font-bold">PROVISIONAL_STABLE</span>
                    </div>

                    <div className="flex justify-between text-[#0F172A]">
                      <span>Block 02 (09:15 - 09:30)</span>
                      <span className={isRohan ? 'text-red-600 font-bold' : ''}>{isRohan ? '+41.5%' : '+1.1%'}</span>
                      <span className={isRohan ? 'text-red-700 font-bold' : 'text-emerald-700 font-bold'}>
                        {isRohan ? 'CRITICAL_DRIFT' : 'PROVISIONAL_STABLE'}
                      </span>
                    </div>

                    <div className="flex justify-between text-[#0F172A]">
                      <span>Block 03 (09:30 - 10:00)</span>
                      <span className={isRohan || isAarav ? 'text-red-600 font-bold' : ''}>
                        {isRohan ? '+82.0%' : isAarav ? '+78.4%' : isNeha ? '+35.0%' : '+0.8%'}
                      </span>
                      <span className={isRohan || isAarav || isNeha ? 'text-red-700 font-bold' : 'text-emerald-700 font-bold'}>
                        {isRohan || isAarav || isNeha ? 'SUSPECT_LOCKOUT_EMITTED' : 'APPROVED_SECURE'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeAnalysisTab === 'timeline' && (
                <div className="relative border-l-2 border-[#E2E8F0] pl-5 space-y-4 font-sans text-xs">
                  <div className="relative">
                    <span className="absolute -left-[26px] top-1.5 w-2.5 h-2.5 bg-red-600 rounded-full border border-white" />
                    <span className="text-[10px] font-mono text-slate-400 block">10:15 UTC</span>
                    <strong className="text-[#0F172A] block text-[11.5px] mt-0.5">Automated input sequence blocked</strong>
                    <p className="text-slate-500 text-[11px] mt-0.5">Keystroke frequencies accelerated beyond physical muscular tolerances.</p>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[26px] top-1.5 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white" />
                    <span className="text-[10px] font-mono text-slate-400 block">09:40 UTC</span>
                    <strong className="text-[#0F172A] block text-[11.5px] mt-0.5">Offscreen browser contextual swerve registered</strong>
                    <p className="text-slate-500 text-[11px] mt-0.5">Temporary lost focus on the primary assessment window twice.</p>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[26px] top-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white" />
                    <span className="text-[10px] font-mono text-slate-400 block">09:00 UTC</span>
                    <strong className="text-[#0F172A] block text-[11.5px] mt-0.5">Identity Verification Baseline Secure</strong>
                    <p className="text-slate-500 text-[11px] mt-0.5">Workstation handshake and initial physical calibration finalized.</p>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Live Behavior Evidence Panel */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
            <div className="flex justify-between items-center border-b border-[#F1F5F9] pb-2.5">
              <span className="text-xs font-mono font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#2563EB]" />
                Live Behavior Evidence Panel
              </span>
              <span className="flex items-center gap-1 bg-red-50 text-red-700 border border-red-150 px-2 py-0.5 rounded text-[9px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                LIVE CASE TELEMETRY
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-[#E2E8F0]">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">Keyboard Events</span>
                <span className="text-sm font-bold text-[#0F172A] font-mono block mt-0.5">
                  {evidenceCounts[currentCase.id]?.keyboardEvents.toLocaleString() ?? 0}
                </span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-[#E2E8F0]">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">Mouse Events</span>
                <span className="text-sm font-bold text-[#0F172A] font-mono block mt-0.5">
                  {evidenceCounts[currentCase.id]?.mouseEvents.toLocaleString() ?? 0}
                </span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-[#E2E8F0]">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">Focus Events</span>
                <span className="text-sm font-bold text-[#0F172A] font-mono block mt-0.5">
                  {evidenceCounts[currentCase.id]?.focusChanges.toLocaleString() ?? 0}
                </span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-[#E2E8F0]">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">Tab Switches</span>
                <span className="text-sm font-bold text-[#0F172A] font-mono block mt-0.5">
                  {evidenceCounts[currentCase.id]?.tabSwitches.toLocaleString() ?? 0}
                </span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-[#E2E8F0]">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">Copy/Paste Attempts</span>
                <span className="text-sm font-bold text-[#0F172A] font-mono block mt-0.5">
                  {evidenceCounts[currentCase.id]?.copyAttempts.toLocaleString() ?? 0}
                </span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-[#E2E8F0]">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">Question Interactions</span>
                <span className="text-sm font-bold text-[#0F172A] font-mono block mt-0.5">
                  {evidenceCounts[currentCase.id]?.questionInteractions.toLocaleString() ?? 0}
                </span>
              </div>
            </div>
          </div>

          {/* Forensic Explainability Q&A */}
          <div className="bg-[#0F172A] text-white border border-slate-800 rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.15)] space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <h3 className="text-xs font-black text-slate-300 font-sans tracking-wide uppercase flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-blue-400" />
              Investigation Explainability Workspace
            </h3>

            <div className="space-y-4 text-xs font-sans">
              {[
                { 
                  q: "What Happened?", 
                  a: isRohan 
                    ? "Keystroke dynamics and mouse movements diverged significantly from Rohan Patil's historical baseline, indicating an active impersonation or physical proxy driver event."
                    : isAarav
                    ? "Response composition structure aligned with synthetic generative text templates, indicating AI assistance usage during short-answer questions."
                    : isNeha
                    ? "High-correlation sequence mapping detected with adjacent seat PUN-16, indicating active exam collusion."
                    : "Standard session monitoring. Telemetry matches candidate baseline."
                },
                { 
                  q: "Why Did It Happen?", 
                  a: isRohan 
                    ? "The key hold times increased by 41.5%, and the cursor trajectories followed scripted bezier curve shapes with zero human tremor/jitter."
                    : isAarav
                    ? "Answers were entered at typing speeds exceeding human reading/comprehension limits, combined with repeated viewport focus losses."
                    : isNeha
                    ? "Viewport focus losses and page navigation events occurred within 500ms of the adjacent candidate's actions."
                    : "Telemetry hold times, mouse movements, and focus changes remain compliant."
                },
                { 
                  q: "What Evidence Was Used?", 
                  a: isRohan 
                    ? "1,248 keyboard hold/dwell timing frames, 12,421 cursor position coordinates, and a complete shift in active writing cadence."
                    : isAarav
                    ? "Text style composition analysis (94.5% AI correlation), keyboard input rate (120 WPM instant bursts), and 5 logged browser window switches."
                    : isNeha
                    ? "Overlapping coordinate answer patterns, simultaneous page navigation logs, and matching response choice sequences."
                    : "Live signal verification stream."
                },
                { 
                  q: "How Confident Is CDT-X?", 
                  a: isRohan 
                    ? "94.2% confidence based on similarity comparison with known remote desktop proxy emulator profiles."
                    : isAarav
                    ? "78.4% confidence that response content was generated externally."
                    : isNeha
                    ? "88.0% confidence based on cross-candidate spatial-temporal correlation."
                    : "98.5% identity verification confidence."
                },
                { 
                  q: "What Action Is Recommended?", 
                  a: isRohan 
                    ? "Session invalidation recommended. The behavioral signature does not match the registered candidate."
                    : isAarav
                    ? "Supervisor audit recommended. Clear clipboard paste actions were registered on complex questions."
                    : isNeha
                    ? "Desk audit recommended. Inter-candidate signal mesh correlation is abnormally high."
                    : "No action required."
                },
                { 
                  q: "What Was The Outcome?", 
                  a: currentCase.resolved 
                    ? "Case officially closed by operator adjudication." 
                    : isRohan
                    ? "Awaiting operator adjudication decision (Invalidate recommended)."
                    : isAarav
                    ? "Awaiting supervisor audit review."
                    : isNeha
                    ? "Pending operator audit of seat mesh telemetry."
                    : "Compliant."
                }
              ].map((qa, idx) => (
                <div key={idx} className="border-b border-slate-800 pb-3 last:border-0 last:pb-0">
                  <span className="text-[10px] font-mono text-blue-400 font-bold block mb-1">Q: {qa.q}</span>
                  <p className="text-slate-200 leading-relaxed pl-2 border-l-2 border-slate-700">{qa.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AUDITOR INVESTIGATION NOTES TRACKER */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
            <h3 className="text-xs font-black text-[#0F172A] font-sans tracking-wide uppercase flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#2563EB]" />
              Auditor Discussion Notes
            </h3>

            <div className="flex gap-2">
              <input
                type="text"
                value={noteValue}
                onChange={(e) => setNoteValue(e.target.value)}
                className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400"
                placeholder="Append a compliance audit observation note describing findings..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveNote();
                }}
              />
              <button
                onClick={handleSaveNote}
                className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
              >
                <Save className="w-3.5 h-3.5" /> Save Note
              </button>
            </div>

            {/* List notes logs */}
            <div className="space-y-2 max-h-[140px] overflow-y-auto custom-scrollbar">
              {notes.length === 0 ? (
                <span className="text-[10.5px] text-slate-400 font-mono italic block pl-1">No auditor commentary logged on active file yet.</span>
              ) : (
                notes.map((n) => (
                  <div key={n.id} className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex justify-between items-center text-xs shadow-sm">
                    <div>
                      <strong className="text-[#0F172A] block">{n.text}</strong>
                      <span className="text-[9.5px] text-slate-500 block font-mono mt-0.5">{n.timestamp}</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 bg-white px-2 py-0.5 border border-[#E2E8F0] rounded">
                      BLOCK_ID: {n.id}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
