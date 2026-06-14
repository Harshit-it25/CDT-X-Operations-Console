/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Network, 
  Send, 
  Download, 
  CheckCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Info, 
  Cpu, 
  Terminal,
  Search,
  Check,
  Zap,
  Globe,
  User,
  Activity,
  UserX
} from 'lucide-react';
import { TestingCenter } from '../types';

interface CenterManagementViewProps {
  centers: TestingCenter[];
  searchQuery: string;
  onDeployPatch: () => void;
  updateCenterStatus: (id: string, status: 'PATCHED' | 'PENDING' | 'VULNERABILITY') => void;
}

export default function CenterManagementView({
  centers,
  searchQuery,
  onDeployPatch,
  updateCenterStatus,
}: CenterManagementViewProps) {
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string>('All Risks');
  const [selectedRegion, setSelectedRegion] = useState<string>('Global');
  const [isCommandModalOpen, setIsCommandModalOpen] = useState(false);
  const [commandProgress, setCommandProgress] = useState(0);
  const [commandStep, setCommandStep] = useState<string>('');
  const [commandCompleted, setCommandCompleted] = useState(false);

  // Filter candidates list dynamically
  const filteredCandidates = centers.filter(center => {
    if (selectedRiskFilter !== 'All Risks') {
      if (selectedRiskFilter === 'Low' && center.status !== 'PATCHED') return false;
      if (selectedRiskFilter === 'Medium' && center.status !== 'PENDING') return false;
      if (selectedRiskFilter === 'High' && center.status !== 'VULNERABILITY') return false;
    }
    
    if (selectedRegion !== 'Global') {
      const isMH = center.id.includes('SOL') || center.id.includes('PUN') || center.id.includes('MUM');
      const isTS = center.id.includes('HYD');
      if (selectedRegion === 'MH' && !isMH) return false;
      if (selectedRegion === 'TS' && !isTS) return false;
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        center.id.toLowerCase().includes(q) ||
        center.name.toLowerCase().includes(q) ||
        center.biometricHardware.toLowerCase().includes(q) ||
        center.osVersion.toLowerCase().includes(q)
      );
    }

    return true;
  });

  // Snappy remote sensor recalibration sequence
  const triggerGlobalCalibration = () => {
    setIsCommandModalOpen(true);
    setCommandProgress(5);
    setCommandCompleted(false);
    setCommandStep('Broadcasting remote biometric sensor handshakes to 2,514 active workstations...');

    const fastInterval = setInterval(() => {
      setCommandProgress(prev => {
        if (prev >= 100) {
          clearInterval(fastInterval);
          setCommandCompleted(true);
          setCommandStep('All workstation biometric signatures successfully recalibrated.');
          centers.forEach(c => {
            updateCenterStatus(c.id, 'PATCHED');
          });
          onDeployPatch();
          return 100;
        }
        const next = prev + 15;
        const bounded = Math.min(100, next);
        if (bounded < 40) {
          setCommandStep('Verifying encryption logs across Telangana zones...');
        } else if (bounded < 75) {
          setCommandStep('Normalizing continuous keyboard dwell averages...');
        } else {
          setCommandStep('Verifying compliance registry status codes...');
        }
        return bounded;
      });
    }, 250);
  };

  return (
    <div className="h-full overflow-y-auto p-8 bg-[#F8FAFC] custom-scrollbar text-slate-800 pb-16">
      
      {/* Overview Head */}
      <div className="mb-2.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-[13px] font-black tracking-tight text-[#0F172A] font-sans uppercase leading-none">
            Live Host Examination Monitor
          </h1>
          <p className="text-[10px] text-[#64748B] mt-0.5">
            Monitor active exam seats, response telemetry curves, and client system health parameters in real time.
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            onClick={triggerGlobalCalibration}
            className="bg-[#2563EB] hover:bg-blue-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer shadow-sm"
          >
            <Zap className="w-3.5 h-3.5" />
            Recalibrate Sensors
          </button>
          
          <button
            onClick={() => alert('Student biometric manifest report compiled successfully.')}
            className="bg-white border border-[#E2E8F0] hover:bg-slate-50 text-slate-700 text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Export Live Sheets
          </button>
        </div>
      </div>

      {/* Simplified High-Contrast KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 select-none">
        
        {/* Active Centers */}
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <span className="text-slate-400 text-[10px] font-mono tracking-widest uppercase block mb-1">
            Active Centers
          </span>
          <div className="text-lg font-mono font-extrabold text-[#0F172A] mt-1">
            12 National Hubs
          </div>
        </div>

        {/* Total Candidates */}
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <span className="text-slate-400 text-[10px] font-mono tracking-widest uppercase block mb-1">
            Total Candidates Live
          </span>
          <div className="text-lg font-mono font-extrabold text-[#0F172A] mt-1">
            2,514 Exam-Takers
          </div>
        </div>

        {/* Avg Trust */}
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <span className="text-slate-400 text-[10px] font-mono tracking-widest uppercase block mb-1">
            Average System Trust
          </span>
          <div className="text-lg font-mono font-extrabold text-emerald-700 mt-1">
            96.4% Compliance
          </div>
        </div>

        {/* Risk Alerts */}
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <span className="text-slate-400 text-[10px] font-mono tracking-widest uppercase block mb-1">
            Critical Risk Alerts
          </span>
          <div className="text-lg font-mono font-extrabold text-[#DC2626] mt-1">
            0 Blocked Anomalies
          </div>
        </div>

      </div>

      {/* Proctoring Matrix Table Card (Stripe-Style UI) */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        
        {/* Table Filters strip */}
        <div className="px-4 py-3 bg-slate-50 border border-[#E2E8F0] rounded-xl flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
          <h3 className="font-sans font-bold text-slate-800 text-[13px] uppercase tracking-wide">
            Live Candidate Session Matrix
          </h3>

          <div className="flex gap-3">
            
            <div className="flex items-center gap-2 px-3 py-1 bg-white border border-[#E2E8F0] rounded-lg text-xs font-mono text-slate-600">
              <span className="text-[#64748B] font-bold">RISK FILTER:</span>
              <select
                value={selectedRiskFilter}
                onChange={(e) => setSelectedRiskFilter(e.target.value)}
                className="bg-transparent border-none p-0 text-[#2563EB] font-bold focus:ring-0 cursor-pointer"
              >
                <option value="All Risks">All Risks</option>
                <option value="Low">Low Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="High">High Risk</option>
              </select>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 bg-white border border-[#E2E8F0] rounded-lg text-xs font-mono text-slate-600">
              <span className="text-[#64748B] font-bold">ZONE:</span>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="bg-transparent border-none p-0 text-[#2563EB] font-bold focus:ring-0 cursor-pointer"
              >
                <option value="Global">All India Hubs</option>
                <option value="MH">Maharashtra Zones</option>
                <option value="TS">Telangana Zones</option>
              </select>
            </div>

          </div>
        </div>

        {/* Table representation */}
        <div className="overflow-x-auto border border-[#E2E8F0] rounded-xl font-sans">
          <table className="w-full text-left border-collapse text-[11.5px]">
            <thead className="bg-[#F8FAFC] text-slate-500 font-mono text-[9px] uppercase border-b border-[#E2E8F0]">
              <tr>
                <th className="px-6 py-3 font-bold">CANDIDATE / REGISTRATION ID</th>
                <th className="px-6 py-3 font-bold">OVERALL TRUST SCORE</th>
                <th className="px-6 py-3 font-bold">ASSIGNED AUDITOR</th>
                <th className="px-6 py-3 font-bold">BEHAVIORAL RISK STATUS</th>
                <th className="px-6 py-3 font-bold">CURRENT AUDIT PROGRESS</th>
                <th className="px-6 py-3 font-bold text-right">MANUAL ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredCandidates.map((candidate) => {
                const isHighRisk = candidate.readinessScore < 70;
                return (
                  <tr 
                    key={candidate.id}
                    className="hover:bg-slate-50/40 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-xs">{candidate.personnelName} (Exam Seat)</span>
                        <span className="text-[10px] font-mono text-slate-400 mt-0.5">
                          {candidate.id} • Workstation #{candidate.workstationsCount}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-[#E2E8F0]">
                          <div 
                            className={`h-full ${candidate.readinessScore >= 80 ? 'bg-emerald-500' : candidate.readinessScore >= 60 ? 'bg-amber-500' : 'bg-[#DC2626]'}`} 
                            style={{ width: `${candidate.readinessScore}%` }}
                          />
                        </div>
                        <span className={`font-mono text-[11px] font-bold ${
                          candidate.readinessScore >= 80 ? 'text-emerald-700' : candidate.readinessScore >= 60 ? 'text-amber-800' : 'text-[#DC2626]'
                        }`}>
                          {candidate.readinessScore}/100
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold text-[10px] border border-blue-105">
                          {candidate.personnelCode}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11.5px] font-semibold text-slate-800">Proctor {candidate.personnelCode}</span>
                          <span className="text-[9px] font-mono text-slate-400 uppercase leading-none">Security Match</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div>
                        {/* Risk States must use color-coded badges rather than large colored backgrounds */}
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 font-mono text-[9.5px] font-bold rounded-lg uppercase border ${
                          candidate.status === 'PATCHED' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : candidate.status === 'PENDING' 
                            ? 'bg-amber-50 text-amber-700 border-amber-200' 
                            : 'bg-red-50 text-red-700 border-red-200 animate-pulse'
                        }`}>
                          {candidate.status === 'PATCHED' && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
                          {candidate.status === 'PENDING' && <Activity className="w-3.5 h-3.5 text-amber-600" />}
                          {candidate.status === 'VULNERABILITY' && <AlertTriangle className="w-3.5 h-3.5 text-red-600" />}
                          {candidate.status === 'PATCHED' ? 'OPTIMAL' : candidate.status === 'PENDING' ? 'SWAPPING' : 'KEYSTROKE DRIFT'}
                        </span>
                        <div className="text-[9.5px] text-slate-400 font-mono mt-1">{candidate.biometricHardware}</div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-[11px] text-slate-600">
                        <p className="font-bold text-slate-800">Question #{Math.floor(candidate.workstationsCount / 3)}/60</p>
                        <p className="font-mono text-slate-400 text-[9.5px] mt-0.5">{candidate.osVersion}</p>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => updateCenterStatus(candidate.id, candidate.status === 'PATCHED' ? 'PENDING' : 'PATCHED')}
                        className="p-1 px-2.5 rounded-lg text-xs bg-slate-50 hover:bg-slate-100 border border-[#E2E8F0] text-slate-500 hover:text-[#2563EB] transition-colors cursor-pointer"
                        title="Manually recalibrate channel sensor coefficient"
                      >
                        Adjust
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recalibration loading dialog */}
      {isCommandModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-[#E2E8F0] p-6 rounded-3xl max-w-md w-full shadow-2xl">
            
            <div className="flex justify-between items-center pb-3 border-b border-[#F1F5F9] mb-4">
              <span className="text-[12px] font-mono font-bold text-[#2563EB] uppercase tracking-wide flex items-center gap-1.5">
                <Terminal className="w-4 h-4" />
                Sensor Recalibration Dispatcher
              </span>
              <span className="text-[10px] font-mono text-slate-400">SEC-RECAL</span>
            </div>

            <div className="font-mono text-[11px] bg-[#0F172A] p-4 rounded-xl text-emerald-400 border border-slate-950 leading-relaxed mb-4 min-h-[60px]">
              <p>{commandStep}</p>
            </div>

            <div className="space-y-2 select-none font-sans">
              <div className="flex justify-between font-mono text-[10px] font-bold">
                <span className="text-slate-400">CALIBRATING SIGNATURE MATRIX</span>
                <span className="text-[#2563EB]">{commandProgress}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-[#E2E8F0]">
                <div 
                  className="bg-[#2563EB] h-full"
                  style={{ width: `${commandProgress}%` }}
                />
              </div>
            </div>

            {commandCompleted && (
              <div className="mt-5 flex flex-col gap-2 font-sans">
                <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold justify-center py-2 bg-emerald-50 rounded-xl border border-emerald-100">
                  <CheckCircle className="w-4 h-4" />
                  Sensors Recalibrated Successfully
                </div>
                <button 
                  type="button"
                  onClick={() => setIsCommandModalOpen(false)}
                  className="w-full py-2 bg-[#2563EB] hover:bg-blue-700 text-white font-mono font-bold text-xs uppercase rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  Dismiss Console
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
