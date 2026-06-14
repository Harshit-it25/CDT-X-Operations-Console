/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  HelpCircle, 
  Compass, 
  Zap, 
  Clock, 
  Lock,
  FileCheck2,
  CheckCircle,
  Database,
  Network,
  Fingerprint,
  Cpu
} from 'lucide-react';
import DemoSnapshotCard from './DemoSnapshotCard';
import ArchitectureCenterView from './ArchitectureCenterView';
import EvaluationBenchmarkView from './EvaluationBenchmarkView';
import BehavioralIdentityProfileView from './BehavioralIdentityProfileView';
import SyntheticGeneratorView from './SyntheticGeneratorView';

interface WhyCdtxViewProps {
  showTechNotes: boolean;
  setShowTechNotes: (val: boolean) => void;
  activeTechTab: 'architecture' | 'validation' | 'research' | 'simulation';
  setActiveTechTab: (val: 'architecture' | 'validation' | 'research' | 'simulation') => void;
}

export default function WhyCdtxView({
  showTechNotes,
  setShowTechNotes,
  activeTechTab,
  setActiveTechTab
}: WhyCdtxViewProps) {
  return (
    <div className="h-full overflow-y-auto p-3.5 bg-[#F8FAFC] custom-scrollbar text-slate-800 pb-16 font-sans">
      
      {/* Hero Section */}
      <div className="mb-3 bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-100 p-4 rounded-xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex items-center gap-3 mb-1">
          <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
          <span className="text-[11px] font-mono font-bold text-[#2563EB] uppercase tracking-wider bg-[#EFF6FF] px-1.5 py-0.5 rounded border border-[#BFDBFE]">
            Technology Whitepaper Page
          </span>
        </div>
        <h1 className="text-[14px] font-black tracking-tight text-[#0F172A] font-sans uppercase leading-none">
          Why CDT-X: Next-Generation Exam Integrity
        </h1>
        <p className="text-[11px] text-[#475569] mt-1 max-w-3xl leading-snug">
          Defending academic rigor and high-stakes certification credibility without invading examinee privacy or requiring high-bandwidth hardware streams.
        </p>
      </div>

      {/* Demo Snapshot Flow Card */}
      <DemoSnapshotCard currentStage={-1} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start mt-4">
        
        {/* PROBLEM & LEGACY SOLUTIONS (Left Column) */}
        <div className="space-y-4">
          
          {/* PROBLEM */}
          <div className="bg-white border border-[#E2E8F0] p-4.5 rounded-xl shadow-sm space-y-3">
            <h2 className="text-[12px] font-black text-[#0F172A] font-sans uppercase tracking-wide flex items-center gap-2 pb-2 border-b border-[#F1F5F9]">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              1. The Problem: Exam Fraud Scaling
            </h2>
            <div className="p-3 bg-red-50 border border-red-100 text-red-805 rounded-xl text-[12px] font-semibold leading-snug">
              ⚡ Cheating networks deploy virtual webcams, hardware splitters, and AI solvers that bypass traditional exam proctoring setups.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                { title: "Growing Exam Scaling", desc: "Remote testing volumes are scaling rapidly across professional certification bodies." },
                { title: "AI-Assistance Risk", desc: "Widespread generative AI enables real-time answer synthesis and proxy input systems." },
                { title: "Continuous Risk", desc: "One-time registration checks fail to stop mid-session handoffs or secondary hardware loops." },
                { title: "Intrusive Surveillance Fail", desc: "Institutions require passive, non-intrusive monitoring that does not rely on webcam surveillance." }
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 bg-blue-50/20 border border-blue-100 rounded-lg space-y-0.5">
                  <strong className="text-[11px] text-[#0F172A] font-black block">{item.title}</strong>
                  <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 border-t border-slate-100 mt-2">
              {[
                { title: "Virtual Webcams", desc: "Using virtual software drivers to loop pre-recorded compliant student feeds." },
                { title: "HDMI Splitters", desc: "Splitting video output to allow external proxy experts to solve problems in real-time." },
                { title: "Virtual Machines", desc: "Running assessments inside isolated environments where helpers take control." },
                { title: "Hardware USB Proxies", desc: "Plugging in physical keystroke injection devices to bypass lockdown boundaries." }
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 bg-rose-50/20 border border-rose-100 rounded-lg space-y-0.5">
                  <strong className="text-[11px] text-[#0F172A] font-bold block">{item.title}</strong>
                  <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Existing Solutions & Their Limitations */}
          <div className="bg-white border border-[#E2E8F0] p-4.5 rounded-xl shadow-sm space-y-3">
            <h2 className="text-[12px] font-black text-[#0F172A] font-sans uppercase tracking-wide flex items-center gap-2 pb-2 border-b border-[#F1F5F9]">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              2. Why Current Solutions Fail
            </h2>
            <div className="p-3 bg-amber-50 border border-amber-100 text-amber-805 rounded-xl text-[12px] font-semibold leading-snug">
              ⚠️ Legacy video proctoring incurs high bandwidth costs, high manual labor fees, and fails entirely against hardware-level bypasses.
            </div>

            <div className="space-y-2.5 pt-1">
              {[
                { 
                  name: "Live Video Proctoring", 
                  lim: "Extremely high bandwidth requirements, high labor costs, and failure to detect hardware-level splitters or secondary keyboards." 
                },
                { 
                  name: "AI Face/Eye Tracking", 
                  lim: "Yields high false-positive rates for students with visual impairments or screen anomalies, creating stressful testing environments." 
                },
                { 
                  name: "Lockdown Browsers", 
                  lim: "Easily bypassed by running inside Virtual Machines (VMs) or utilizing custom hardware USB descriptors that simulate human inputs." 
                }
              ].map((sol, sidx) => (
                <div key={sidx} className="p-3 bg-slate-50 border border-[#E2E8F0] rounded-xl flex items-start gap-2.5">
                  <span className="w-4.5 h-4.5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                    {sidx + 1}
                  </span>
                  <div>
                    <h4 className="text-[11.5px] font-bold text-[#0F172A] font-sans">{sol.name}</h4>
                    <p className="text-[11px] text-[#64748B] mt-0.5 leading-relaxed">
                      <strong className="text-rose-700 uppercase font-mono text-[10px] block mb-0.5">Limitation:</strong>
                      {sol.lim}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* HOW CDT-X WORKS & RESULT (Right Column) */}
        <div className="space-y-4">
          
          {/* The CDT-X Approach */}
          <div className="bg-white border border-[#E2E8F0] p-4.5 rounded-xl shadow-sm space-y-3">
            <h2 className="text-[12px] font-black text-[#0F172A] font-sans uppercase tracking-wide flex items-center gap-2 pb-2 border-b border-[#F1F5F9]">
              <Zap className="w-4 h-4 text-[#2563EB]" />
              3. How CDT-X Works: Passive Biometrics
            </h2>
            
            <div className="p-3 bg-blue-50 border border-blue-100 text-blue-805 rounded-xl text-[12px] font-semibold leading-snug">
              ✓ Shifting from surveillance to passive identity consistency. Extracts hardware-level behavioral fingerprints in real-time.
            </div>

            <div className="space-y-3 mt-2">
              {[
                { 
                  title: "Keyboard Hold Latency", 
                  desc: "Analyzes microscopic key hold-and-flight rhythms with sub-millisecond precision to verify student typing biometrics.",
                  icon: Clock
                },
                { 
                  title: "Bezier Spline Trajectories", 
                  desc: "Extracts velocity profiles and human micro-jitters to expose mechanical mouse trajectories or proxy inputs.",
                  icon: Compass
                },
                { 
                  title: "Lexical Reading Pacing", 
                  desc: "Measures foveal reading cadences, pause distributions, and scrolling behavior to identify cognitive anomaly shifts.",
                  icon: FileCheck2
                }
              ].map((appr, aidx) => {
                const Icon = appr.icon;
                return (
                  <div key={aidx} className="flex gap-2.5">
                    <div className="w-7.5 h-7.5 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-[#2563EB]" />
                    </div>
                    <div className="text-[11px]">
                      <strong className="text-[#0F172A] block font-sans text-[11.5px]">{appr.title}</strong>
                      <span className="text-slate-500 leading-normal block mt-0.5">{appr.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white border border-[#E2E8F0] p-4.5 rounded-xl shadow-sm space-y-3">
            <h2 className="text-[12px] font-black text-emerald-805 font-sans uppercase tracking-wide flex items-center gap-2 pb-2 border-b border-emerald-100">
              <Lock className="w-4 h-4 text-emerald-600" />
              4. CDT-X Benefits & Defensibility
            </h2>
            
            <div className="space-y-2.5 pt-1 text-xs">
              {[
                {
                  title: "Zero Privacy Intrusiveness",
                  desc: "Stores behavioral mathematical coefficients rather than webcam audio/video, respecting GDPR and privacy guidelines."
                },
                {
                  title: "Low Bandwidth Consumption",
                  desc: "Telemetry payloads average under 180 KB per hour, avoiding session disconnect crashes on legacy internet connections."
                },
                {
                  title: "Hardware-Descriptor-Invariant",
                  desc: "Identifies automated emulator pipelines or remote desktop surrogates even if disguised by physical spoofing adapters."
                },
                {
                  title: "Legally Defensible Cryptographic Audit",
                  desc: "All proctor determinations, anomalies, and logs are sealed on an immutable compliance ledger for compliance checks."
                }
              ].map((ben, bidx) => (
                <div key={bidx} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0F172A] block font-sans text-[11.5px]">{ben.title}</strong>
                    <span className="text-slate-500 leading-normal block mt-0.5 text-[11px]">{ben.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Flow Summary Card (Result Loop) */}
          <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl flex items-center gap-2.5 shadow-sm select-none">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0 border border-blue-100">
              <Database className="w-4.5 h-4.5" />
            </div>
            <div className="text-[11px]">
              <strong className="text-slate-805 block text-[11.5px] mb-0.5">Privacy-First Defensible Auditing Loop</strong>
              <span className="text-slate-500 leading-normal block">
                CDT-X shifts monitoring from webcams to physical telemetry, delivering legally defensible exam validation while eliminating manual surveillance costs.
              </span>
            </div>
          </div>

          {/* Technical Notes & Deep System Auditing Collapsible Section */}
          <div id="tech-notes-section" className="w-full">
            <button
              type="button"
              onClick={() => setShowTechNotes(!showTechNotes)}
              className="w-full flex items-center justify-between p-2.5 bg-white border border-[#E2E8F0] rounded-xl shadow-sm hover:bg-slate-50/80 transition-all cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50/80 text-[#2563EB] flex items-center justify-center border border-blue-100 shrink-0">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-[#0F172A] block text-[12px] font-bold">Technical Notes &amp; Deep Auditing Hub</strong>
                  <span className="text-slate-550 block text-[10px] mt-0.5">Architecture, F1 calibrations, and simulation metrics</span>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#2563EB] bg-[#EFF6FF] border border-[#BFDBFE] px-2.5 py-0.5 rounded-lg uppercase shrink-0">
                {showTechNotes ? 'Hide' : 'Expand'}
              </span>
            </button>

            {showTechNotes && (
              <div className="mt-3 border border-[#E2E8F0] rounded-xl overflow-hidden bg-white shadow-sm p-3 animate-in slide-in-from-top duration-200">
                
                {/* Sub-navigation Tabs */}
                <div className="flex flex-wrap border-b border-[#F1F5F9] p-0.5 bg-slate-50 rounded-lg mb-3 gap-0.5">
                  {[
                    { id: 'architecture', label: 'Architecture', icon: Network },
                    { id: 'validation', label: 'Validation', icon: Database },
                    { id: 'research', label: 'Research', icon: Fingerprint },
                    { id: 'simulation', label: 'Simulation', icon: Cpu }
                  ].map((tab) => {
                    const TabIcon = tab.icon;
                    const isTabActive = activeTechTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTechTab(tab.id as any)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded transition-all cursor-pointer ${
                          isTabActive 
                            ? 'bg-white text-[#2563EB] shadow-sm border border-[#E2E8F0]' 
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <TabIcon className="w-3 h-3" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Tab Contents */}
                <div className="border border-[#F1F5F9] rounded-lg overflow-hidden min-h-[300px]">
                  {activeTechTab === 'architecture' && <ArchitectureCenterView />}
                  {activeTechTab === 'validation' && <EvaluationBenchmarkView />}
                  {activeTechTab === 'research' && <BehavioralIdentityProfileView />}
                  {activeTechTab === 'simulation' && <SyntheticGeneratorView />}
                </div>

              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
