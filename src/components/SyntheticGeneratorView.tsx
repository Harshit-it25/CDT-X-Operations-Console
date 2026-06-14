/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Database, 
  Cpu, 
  Search, 
  Grid, 
  Sparkles, 
  FileSpreadsheet, 
  Filter, 
  RefreshCw,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Info
} from 'lucide-react';

interface SyntheticCandidate {
  id: string;
  name: string;
  profileType: 'NORMAL' | 'IMPERSONATION' | 'AI_ASSISTED' | 'COLLUSION';
  riskScore: number;
  trustScore: number;
  status: 'APPROVED' | 'REVIEW' | 'TERMINATED';
  keystrokeDrift: string;
  splineJitter: string;
  windowFocusLapses: number;
}

export default function SyntheticGeneratorView() {
  const [targetVolume, setTargetVolume] = useState<number>(100);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedCount, setGeneratedCount] = useState<number>(0);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  // Seeded mock candidate directory data
  const firstNames = ['Rohan', 'Aarav', 'Neha', 'Siddharth', 'Aditya', 'Ananya', 'Priya', 'Karan', 'Meera', 'Sai', 'Rahul', 'Jyoti', 'Shreya', 'Divya', 'Vikram'];
  const lastNames = ['Patil', 'Kulkarni', 'Joshi', 'Jadhav', 'Reddy', 'Sharma', 'Verma', 'Gupta', 'Rao', 'Deshmukh', 'More', 'Chavan', 'Nair', 'Shinde', 'Pillai'];
  
  const [candidatesList, setCandidatesList] = useState<SyntheticCandidate[]>([
    { id: "SYN-1029", name: "Rohan Patil", profileType: "IMPERSONATION", riskScore: 94, trustScore: 42, status: "TERMINATED", keystrokeDrift: "63.5% (High)", splineJitter: "Robotic Bezier Jitter", windowFocusLapses: 3 },
    { id: "SYN-4412", name: "Neha Joshi", profileType: "COLLUSION", riskScore: 82, trustScore: 48, status: "REVIEW", keystrokeDrift: "11.8% (Normal)", splineJitter: "Geometric Corelation", windowFocusLapses: 0 },
    { id: "SYN-7332", name: "Aarav Kulkarni", profileType: "AI_ASSISTED", riskScore: 72, trustScore: 61, status: "REVIEW", keystrokeDrift: "10.8% (Normal)", splineJitter: "Fast Context Trajectories", windowFocusLapses: 5 },
    { id: "SYN-8821", name: "Siddharth Jadhav", profileType: "NORMAL", riskScore: 4, trustScore: 96, status: "APPROVED", keystrokeDrift: "2.1% (Low)", splineJitter: "Natural Human Curves", windowFocusLapses: 0 },
    { id: "SYN-2022", name: "Aditya Deshmukh", profileType: "NORMAL", riskScore: 2, trustScore: 98, status: "APPROVED", keystrokeDrift: "1.4% (Low)", splineJitter: "Natural Human Curves", windowFocusLapses: 0 },
    { id: "SYN-5061", name: "Priya Chavan", profileType: "NORMAL", riskScore: 5, trustScore: 95, status: "APPROVED", keystrokeDrift: "2.8% (Low)", splineJitter: "Natural Human Curves", windowFocusLapses: 0 }
  ]);

  const runGeneration = () => {
    setIsGenerating(true);
    setGeneratedCount(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(targetVolume / 10);
      setGeneratedCount(Math.min(targetVolume, progress));

      if (progress >= targetVolume) {
        clearInterval(interval);
        
        const generatedList: SyntheticCandidate[] = [];
        const types: ('NORMAL' | 'IMPERSONATION' | 'AI_ASSISTED' | 'COLLUSION')[] = ['NORMAL', 'IMPERSONATION', 'AI_ASSISTED', 'COLLUSION'];
        
        for (let i = 0; i < 25; i++) {
          const type = types[Math.floor(Math.random() * 4)];
          const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
          const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
          const idNum = Math.floor(1000 + Math.random() * 9000);
          
          let risk = 2 + Math.floor(Math.random() * 10);
          let trust = 90 + Math.floor(Math.random() * 10);
          let status: 'APPROVED' | 'REVIEW' | 'TERMINATED' = 'APPROVED';
          let keystroke = `${(1 + Math.random() * 4).toFixed(1)}% (Low)`;
          let spline = 'Natural Human Curves';
          let focus = Math.floor(Math.random() * 2);

          if (type === 'IMPERSONATION') {
            risk = 85 + Math.floor(Math.random() * 15);
            trust = 30 + Math.floor(Math.random() * 25);
            status = 'TERMINATED';
            keystroke = `${(45 + Math.random() * 25).toFixed(1)}% (High)`;
            spline = 'Robotic Spline Macro';
            focus = 2 + Math.floor(Math.random() * 3);
          } else if (type === 'AI_ASSISTED') {
            risk = 65 + Math.floor(Math.random() * 20);
            trust = 50 + Math.floor(Math.random() * 20);
            status = 'REVIEW';
            keystroke = `${(8 + Math.random() * 8).toFixed(1)}% (Normal)`;
            spline = 'Fast Trajectory Jumps';
            focus = 4 + Math.floor(Math.random() * 4);
          } else if (type === 'COLLUSION') {
            risk = 60 + Math.floor(Math.random() * 25);
            trust = 45 + Math.floor(Math.random() * 25);
            status = 'REVIEW';
            keystroke = `${(5 + Math.random() * 10).toFixed(1)}% (Normal)`;
            spline = 'Correlated Coordinates';
            focus = Math.floor(Math.random() * 2);
          }

          generatedList.push({
            id: `SYN-${idNum}`,
            name: `${fName} ${lName}`,
            profileType: type,
            riskScore: risk,
            trustScore: trust,
            status,
            keystrokeDrift: keystroke,
            splineJitter: spline,
            windowFocusLapses: focus
          });
        }
        
        setCandidatesList(generatedList);
        setIsGenerating(false);
      }
    }, 150);
  };

  const filteredCandidates = candidatesList.filter(cand => {
    if (activeFilter !== 'ALL' && cand.profileType !== activeFilter) return false;

    if (!searchFilter) return true;
    const term = searchFilter.toLowerCase();
    return (
      cand.name.toLowerCase().includes(term) ||
      cand.id.toLowerCase().includes(term) ||
      cand.profileType.toLowerCase().includes(term)
    );
  });

  return (
    <div className="h-full overflow-y-auto p-8 bg-[#F8FAFC] custom-scrollbar text-slate-800 pb-16">
      
      {/* Executive Header Block */}
      <div className="mb-2.5">
        <h1 className="text-[13px] font-black tracking-tight text-[#0F172A] font-sans uppercase leading-none">
          Simulation Lab & Profile Synthesizer
        </h1>
        <p className="text-[10px] text-[#64748B] mt-0.5">
          Generate high-fidelity behavior datasets reflecting natural human and anomalous test progression curves.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Run Synthesis Control Card (4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between h-[360px]">
          <div>
            <span className="text-slate-400 text-[9.5px] font-mono tracking-widest uppercase block mb-3">
              Synthesizer Calibration
            </span>
            <p className="text-xs text-slate-500 leading-relaxed mb-6 font-sans">
              Calibrate multi-factor behavioral anomalies across designated exam counts. Generates comprehensive biometric coordinate manifolds.
            </p>

            {/* Target choice selection */}
            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1 rounded-xl border border-[#E2E8F0] mb-6 text-center text-[11px] font-mono font-bold">
              {([100, 1000, 10000] as const).map(vol => (
                <button
                  key={vol}
                  onClick={() => !isGenerating && setTargetVolume(vol)}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${
                    targetVolume === vol 
                      ? 'bg-white text-[#2563EB] shadow-sm border border-[#E2E8F0] font-black' 
                      : 'text-slate-500 hover:text-slate-900Item'
                  }`}
                  disabled={isGenerating}
                >
                  {vol} Profiles
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {isGenerating && (
              <div className="space-y-1 font-sans">
                <div className="flex justify-between text-[10px] font-mono text-[#2563EB] font-bold">
                  <span>VECTOR NODES SYNTHESIZING:</span>
                  <span>{generatedCount} / {targetVolume}</span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#2563EB] rounded-full transition-all duration-150" 
                    style={{ width: `${(generatedCount / targetVolume) * 100}%` }}
                  />
                </div>
                <span className="text-[9px] text-slate-400 font-mono block">VALIDATION STATUS: COMPLIANT CHECK IN PROCESS</span>
              </div>
            )}

            <button
              onClick={runGeneration}
              disabled={isGenerating}
              className={`w-full py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow ${
                isGenerating 
                  ? 'bg-slate-100 text-slate-400 border border-slate-200'
                  : 'bg-[#2563EB] hover:bg-blue-700 text-white'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? 'Synthesizing...' : 'Initialize Profile Synthesis'}
            </button>
          </div>
        </div>

        {/* Database List / Table Card (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <span className="text-[#0F172A] text-xs font-bold uppercase flex items-center gap-1.5 font-sans">
                <FileSpreadsheet className="w-4 h-4 text-[#2563EB]" />
                Generated Profile Manifold
              </span>

              {/* Scenario Selection Filters */}
              <div className="flex gap-1 bg-slate-50 p-1 rounded-xl border border-[#E2E8F0] text-[10px] font-mono font-bold uppercase">
                {['ALL', 'NORMAL', 'IMPERSONATION', 'AI_ASSISTED', 'COLLUSION'].map(fil => (
                  <button
                    key={fil}
                    onClick={() => setActiveFilter(fil)}
                    className={`px-2 py-1 rounded-lg cursor-pointer ${activeFilter === fil ? 'bg-white text-[#2563EB] shadow-sm font-black' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    {fil === 'ALL' ? 'All' : fil === 'NORMAL' ? 'Compliant' : fil.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick-Search */}
            <div className="relative mb-4 font-sans">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search synthesized candidate baseline records..."
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl pl-9 pr-4 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-[#E2E8F0] rounded-xl">
              <table className="w-full text-left text-[11px] border-collapse bg-white">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-mono text-[9px] uppercase border-b border-[#E2E8F0]">
                    <th className="px-4 py-2.5 font-bold">PROFILE ID</th>
                    <th className="px-4 py-2.5 font-bold">CANDIDATE NAME</th>
                    <th className="px-4 py-2.5 font-bold">BEHAVIOR VALUE</th>
                    <th className="px-4 py-2.5 font-bold text-center">KEYSTROKE DRIFT</th>
                    <th className="px-4 py-2.5 font-bold text-center">FOCUS LAPSE COUNT</th>
                    <th className="px-4 py-2.5 font-bold text-right">VALIDATION STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {filteredCandidates.map((cand) => (
                    <tr key={cand.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-4 py-3.5 font-mono text-[#0F172A] font-medium">{cand.id}</td>
                      <td className="px-4 py-3.5 font-bold text-slate-900 font-sans">{cand.name}</td>
                      <td className="px-4 py-3.5">
                        <span className={`px-2 py-0.5 font-mono text-[9px] font-bold rounded-lg uppercase border ${
                          cand.profileType === 'NORMAL' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : cand.profileType === 'IMPERSONATION' 
                            ? 'bg-red-50 text-red-750 border-red-200' 
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {cand.profileType === 'NORMAL' ? 'COMPLIANT' : cand.profileType}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-center font-mono text-slate-650">{cand.keystrokeDrift}</td>
                      <td className="px-4 py-3.5 text-center font-mono text-slate-650">{cand.windowFocusLapses}</td>
                      <td className="px-4 py-3.5 text-right font-bold font-sans">
                        <span className={`text-[10px] uppercase ${
                          cand.status === 'APPROVED' ? 'text-emerald-700' : 'text-amber-700'
                        }`}>
                          {cand.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredCandidates.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-sans text-xs italic">
                        No synthetic profiles match the active search filter parameters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-50 border border-[#E2E8F0] rounded-xl text-[10.5px] font-mono text-slate-500 flex justify-between items-center">
            <span>SYN CHANNELS INJECTION: COMPLIANT</span>
            <span>TOTAL PERSISTED SAMPLES IN MANIFOLD: <strong>{candidatesList.length}</strong></span>
          </div>

        </div>

      </div>

    </div>
  );
}
