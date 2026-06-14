/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  UserCheck, 
  Radio, 
  Fingerprint, 
  ScrollText, 
  ArrowRight, 
  ArrowDown, 
  ArrowLeft, 
  ArrowUp,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { ActiveTab } from '../types';

interface DemoSnapshotCenterViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function DemoSnapshotCenterView({ setActiveTab }: DemoSnapshotCenterViewProps) {
  return (
    <div className="h-full overflow-y-auto p-8 bg-[#F8FAFC] custom-scrollbar text-slate-800 pb-16 font-sans">
      
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] font-sans flex items-center gap-2">
            <Sparkles className="w-5.5 h-5.5 text-[#2563EB]" />
            CDT-X End-to-End Operational Lifecycle
          </h1>
          <p className="text-[13px] text-[#475569] mt-0.5">
            Complete mental model of the CDT-X pipeline. Click any block to jump directly to that screen.
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold bg-[#EFF6FF] text-[#2563EB] px-2.5 py-1 rounded-lg border border-[#BFDBFE] shrink-0 mt-2 md:mt-0">
          FULL PIPELINE VISUALIZATION
        </span>
      </div>

      {/* Grid Layout with visual connections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto relative mt-8">
        
        {/* SVG connection lines overlaying the grid */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
          {/* Top Line: Left to Right */}
          <div className="absolute top-[20%] left-[45%] right-[45%] flex justify-center items-center">
            <ArrowRight className="w-8 h-8 text-[#2563EB] animate-pulse" />
          </div>
          {/* Right Line: Top to Bottom */}
          <div className="absolute top-[45%] bottom-[45%] right-[20%] flex justify-center items-center">
            <ArrowDown className="w-8 h-8 text-[#2563EB] animate-pulse" />
          </div>
          {/* Bottom Line: Right to Left */}
          <div className="absolute bottom-[20%] left-[45%] right-[45%] flex justify-center items-center">
            <ArrowLeft className="w-8 h-8 text-[#2563EB] animate-pulse" />
          </div>
          {/* Left Line: Bottom to Top */}
          <div className="absolute top-[45%] bottom-[45%] left-[20%] flex justify-center items-center">
            <ArrowUp className="w-8 h-8 text-[#2563EB] animate-pulse" />
          </div>
        </div>

        {/* 1. Candidate Portal (Enrollment) */}
        <button
          onClick={() => setActiveTab(ActiveTab.CANDIDATE_PORTAL)}
          className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:border-[#2563EB] hover:shadow-md transition-all text-left flex flex-col justify-between h-[250px] relative z-10 cursor-pointer group"
        >
          <div>
            <div className="flex justify-between items-center pb-2.5 border-b border-[#F1F5F9] mb-4">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-[#2563EB]" />
                Step 1: Enrollment Portal
              </span>
              <span className="text-[9.5px] font-mono text-emerald-600 font-bold uppercase">Candidate Facing</span>
            </div>
            <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
              Behavioral Baseline Ingestion
            </h3>
            <p className="text-[11.5px] text-slate-500 leading-relaxed mt-1.5">
              The candidate types and moves their cursor on the client device. The lightweight SDK captures keyboard micro-rhythms and mouse coordinates to generate the initial behavioral baseline.
            </p>
          </div>
          
          <div className="flex justify-between items-center pt-2.5 border-t border-[#F1F5F9] text-[10px] font-mono text-slate-400">
            <span>MODALITIES: KEYBOARD, MOUSE, FOCUS</span>
            <span className="text-[#2563EB] font-bold group-hover:translate-x-1 transition-transform">LAUNCH PORTAL ➔</span>
          </div>
        </button>

        {/* 2. Trust Heatmap (Control Room) */}
        <button
          onClick={() => setActiveTab(ActiveTab.CONTROL_ROOM)}
          className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:border-[#2563EB] hover:shadow-md transition-all text-left flex flex-col justify-between h-[250px] relative z-10 cursor-pointer group"
        >
          <div>
            <div className="flex justify-between items-center pb-2.5 border-b border-[#F1F5F9] mb-4">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-[#2563EB]" />
                Step 2: Trust Heatmap
              </span>
              <span className="text-[9.5px] font-mono text-[#2563EB] font-bold uppercase">Proctor Desk</span>
            </div>
            <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
              Continuous Integrity Monitoring
            </h3>
            <p className="text-[11.5px] text-slate-500 leading-relaxed mt-1.5">
              Proctors monitor active candidate workstations on a live 2D grid. The trust engine processes telemetry streams in real-time, instantly raising security alarms if candidate input behaviors drift.
            </p>
          </div>
          
          <div className="flex justify-between items-center pt-2.5 border-t border-[#F1F5F9] text-[10px] font-mono text-slate-400">
            <span>KPIs: TRUST INDEX, ACTIVE ALERTS</span>
            <span className="text-[#2563EB] font-bold group-hover:translate-x-1 transition-transform">VIEW HEATMAP ➔</span>
          </div>
        </button>

        {/* 4. Audit Ledger (Verification) */}
        <button
          onClick={() => setActiveTab(ActiveTab.AUDIT_LEDGER)}
          className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:border-[#2563EB] hover:shadow-md transition-all text-left flex flex-col justify-between h-[250px] relative z-10 cursor-pointer group"
        >
          <div>
            <div className="flex justify-between items-center pb-2.5 border-b border-[#F1F5F9] mb-4">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <ScrollText className="w-4 h-4 text-emerald-600" />
                Step 4: Compliance Ledger
              </span>
              <span className="text-[9.5px] font-mono text-emerald-600 font-bold uppercase">Auditor Desk</span>
            </div>
            <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
              Immutable Sealed Audit Trail
            </h3>
            <p className="text-[11.5px] text-slate-500 leading-relaxed mt-1.5">
              All proctor adjudications, system anomalies, and verified student scores are permanently signed and committed to a tamper-proof audit ledger, establishing legally defensible records.
            </p>
          </div>
          
          <div className="flex justify-between items-center pt-2.5 border-t border-[#F1F5F9] text-[10px] font-mono text-slate-400">
            <span>HASH ALGORITHM: SHA-256</span>
            <span className="text-[#2563EB] font-bold group-hover:translate-x-1 transition-transform">EXPLORE LEDGER ➔</span>
          </div>
        </button>

        {/* 3. Investigation Desk (Forensics) */}
        <button
          onClick={() => setActiveTab(ActiveTab.INVESTIGATIONS)}
          className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:border-[#2563EB] hover:shadow-md transition-all text-left flex flex-col justify-between h-[250px] relative z-10 cursor-pointer group"
        >
          <div>
            <div className="flex justify-between items-center pb-2.5 border-b border-[#F1F5F9] mb-4">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Fingerprint className="w-4 h-4 text-red-500" />
                Step 3: Forensics Desk
              </span>
              <span className="text-[9.5px] font-mono text-red-600 font-bold uppercase">Analyst Desk</span>
            </div>
            <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
              Explainable AI Anomaly Insights
            </h3>
            <p className="text-[11.5px] text-slate-500 leading-relaxed mt-1.5">
              Drill down into anomalous behavior timeline logs. The explainability engine isolates typing consistency loss, mouse drift percentages, and writing shifts, providing recommendations.
            </p>
          </div>
          
          <div className="flex justify-between items-center pt-2.5 border-t border-[#F1F5F9] text-[10px] font-mono text-slate-400">
            <span>METRICS: TYPING DRIFT, FOCUS LOSS</span>
            <span className="text-[#2563EB] font-bold group-hover:translate-x-1 transition-transform">INSPECT CASE ➔</span>
          </div>
        </button>

      </div>

      {/* Visual Pipeline Summary Card */}
      <div className="mt-12 p-5 bg-white border border-[#E2E8F0] rounded-2xl max-w-5xl mx-auto flex items-center gap-4 shadow-sm select-none">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5.5 h-5.5" />
        </div>
        <div className="text-xs">
          <strong className="text-slate-800 block text-[13px] mb-0.5">Defensible Verification Loop Completed</strong>
          <span className="text-slate-500 leading-relaxed">
            By closing the loop from raw browser capture to sealed compliance records, CDT-X ensures 100% auditable academic integrity without invading examinee privacy or storing high-bandwidth video files.
          </span>
        </div>
      </div>

    </div>
  );
}
