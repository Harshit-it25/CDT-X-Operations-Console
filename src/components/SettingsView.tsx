/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  User, 
  Sliders, 
  Lock, 
  Check, 
  Key, 
  AlertTriangle,
  Database,
  RefreshCw,
  Server
} from 'lucide-react';

interface SettingsViewProps {
  operatorName: string;
  setOperatorName: (name: string) => void;
  operatorRole: string;
  setOperatorRole: (role: string) => void;
}

export default function SettingsView({
  operatorName,
  setOperatorName,
  operatorRole,
  setOperatorRole
}: SettingsViewProps) {
  
  const [localName, setLocalName] = useState(operatorName);
  const [localRole, setLocalRole] = useState(operatorRole);
  
  // Risk triggers configurations
  const [riskThreshold, setRiskThreshold] = useState<number>(90);
  const [keystrokeDeviationLevel, setKeystrokeDeviationLevel] = useState<number>(150);
  const [encryptionProtocol, setEncryptionProtocol] = useState<string>('AES-256-GCM');
  
  const [isSaved, setIsSaved] = useState(false);

  // Infrastructure status states
  const [infraStatus, setInfraStatus] = useState<{
    db_configured: boolean;
    redis_configured: boolean;
    db_masked: string;
    redis_masked: string;
    db_type: string;
    redis_type: string;
    status: string;
    latency: string;
  } | null>(null);

  const [infraLoading, setInfraLoading] = useState(false);
  const [infraError, setInfraError] = useState<string | null>(null);
  const [testSuccessMessage, setTestSuccessMessage] = useState<string | null>(null);

  const fetchInfraStatus = async () => {
    setInfraLoading(true);
    try {
      const res = await fetch('/api/infrastructure/status');
      if (!res.ok) throw new Error("Credentials endpoint offline");
      const data = await res.json();
      setInfraStatus(data);
      setInfraError(null);
    } catch (e: any) {
      setInfraError(e.message || "Could not retrieve status");
    } finally {
      setInfraLoading(false);
    }
  };

  const handleTestHandshake = async () => {
    setInfraLoading(true);
    // Simulate real handshake verification delay
    await new Promise(resolve => setTimeout(resolve, 800));
    try {
      const res = await fetch('/api/infrastructure/status');
      if (res.ok) {
        const data = await res.json();
        setInfraStatus(data);
        setTestSuccessMessage("SYSTEM BIND SUCCESS: Relational database and temporary analytical buffer verified online!");
        setTimeout(() => setTestSuccessMessage(null), 4000);
      } else {
        throw new Error();
      }
    } catch {
      setInfraError("Handshake timed out or credentials invalid.");
    } finally {
      setInfraLoading(false);
    }
  };

  useEffect(() => {
    fetchInfraStatus();
  }, []);

  const handleSaveChanges = () => {
    setOperatorName(localName);
    setOperatorRole(localRole);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="h-full overflow-y-auto p-8 bg-[#F8FAFC] custom-scrollbar text-slate-800 pb-16">
      
      {/* Title segment */}
      <div className="mb-6 flex items-center gap-3 select-none">
        <div className="p-2 bg-blue-50 rounded-xl border border-blue-200">
          <Settings className="w-5 h-5 text-[#2563EB]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] font-sans">
            Security Configuration & Compliance Settings
          </h1>
          <p className="text-[13px] text-[#475569] mt-0.5">
            Admin configurations workspace. Adjust sensitive security thresholds, clearance credentials, and regulatory connection handshakes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-6">
        
        {/* Operator Credentials Card */}
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          <div>
            <span className="text-slate-400 text-[9.5px] font-mono tracking-widest uppercase block mb-3">
              Operator Identification
            </span>

            <div className="space-y-4 font-sans">
              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                  Clearance Operator Name
                </label>
                <input 
                  type="text" 
                  value={localName}
                  onChange={(e) => setLocalName(e.target.value)}
                  className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                  Clearance Security Badge ID
                </label>
                <select
                  value={localRole}
                  onChange={(e) => setLocalRole(e.target.value)}
                  className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs text-[#2563EB] focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono font-bold cursor-pointer"
                >
                  <option value="L3-SECURITY">L3-SECURITY (Standard Supervisor)</option>
                  <option value="L4-ADMIN">L4-ADMIN (Senior Lead Administrator)</option>
                  <option value="ROOT-REPLICA">ROOT-REPLICA (Audit Officer Clearance)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#F1F5F9] text-center select-none text-[10px] font-mono text-slate-400">
            System Level Access Authority Assigned
          </div>
        </div>

        {/* Security Thresholds Card */}
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          <div>
            <span className="text-slate-400 text-[9.5px] font-mono tracking-widest uppercase block mb-3">
              Detection Sensitivity Thresholds
            </span>

            <div className="space-y-5 font-sans">
              <div>
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="text-xs text-slate-700">Biometric Interruption Alarm Trigger</span>
                  <span className="font-mono text-xs font-bold text-[#D97706]">{riskThreshold}% score</span>
                </div>
                <input 
                  type="range"
                  min="50"
                  max="95"
                  step="5"
                  value={riskThreshold}
                  onChange={(e) => setRiskThreshold(parseFloat(e.target.value))}
                  className="w-full accent-[#2563EB] bg-slate-100 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="text-xs text-slate-700">Keystroke Tactile Speed Deviation</span>
                  <span className="font-mono text-xs font-bold text-[#2563EB]">{keystrokeDeviationLevel}% variance</span>
                </div>
                <input 
                  type="range"
                  min="100"
                  max="250"
                  step="10"
                  value={keystrokeDeviationLevel}
                  onChange={(e) => setKeystrokeDeviationLevel(parseInt(e.target.value))}
                  className="w-full accent-[#2563EB] bg-slate-100 h-1.5 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#F1F5F9] text-center select-none text-[10px] font-mono text-slate-400">
            Dynamically recalibrating active session weights
          </div>
        </div>

      </div>

      {/* Cryptography System Card */}
      <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] mb-6">
        <span className="text-slate-400 text-[9.5px] font-mono tracking-widest uppercase block mb-3">
          Compliance Seal Cryptography
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans items-center">
          <div>
            <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">
              Symmetric Cipher Selection
            </label>
            <select
              value={encryptionProtocol}
              onChange={(e) => setEncryptionProtocol(e.target.value)}
              className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono font-bold cursor-pointer"
            >
              <option value="AES-256-GCM">AES-256-GCM (Recommended GCM Authenticator)</option>
              <option value="CHACHA20-POLY1305">ChaCha20-Poly1305 (Legacy Validation-v1)</option>
              <option value="AES-128-CBC">AES-128-CBC (Base compliance level)</option>
            </select>
          </div>

          <div className="p-3.5 bg-blue-50/40 rounded-xl border border-blue-100 flex items-center gap-3">
            <Key className="w-6 h-6 text-[#2563EB] shrink-0" />
            <p className="text-[11px] text-slate-600 leading-normal">
              Symmetric cryptographic signing keys for compliance seals rotate automatically at the start of each examination window to safeguard authenticity logs.
            </p>
          </div>
        </div>
      </div>

      {/* Core Infrastructure Connections Card */}
      <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] mb-6 select-none">
        <div className="pb-2 border-b border-[#F1F5F9] flex justify-between items-center mb-4">
          <span className="text-[#0F172A] text-xs font-bold uppercase flex items-center gap-1.5 font-sans">
            <Database className="w-4 h-4 text-[#2563EB]" />
            Relational Base Store & Analytical Buffer Handshakes
          </span>
          <span className="text-[9px] font-mono text-[#2563EB] bg-[#EFF6FF] border border-[#BFDBFE] px-2 py-0.5 rounded-md uppercase font-bold">
            Live Config
          </span>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed font-sans mb-4">
          CDT-X continuously cross-checks active examinee mouse-curvature coordinates and typing cadences against live database entries.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-left">
          
          {/* Database sector */}
          <div className="p-4 bg-slate-50 rounded-xl border border-[#E2E8F0] space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[#0F172A] text-xs font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>
                Relational Base Store
              </span>
              <span className={`text-[8.5px] font-mono uppercase px-2 py-0.5 rounded-md font-bold border ${
                infraStatus?.db_configured 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-250' 
                  : 'bg-amber-50 text-amber-700 border-[#FDE68A]'
              }`}>
                {infraStatus?.db_configured ? 'ACTIVE BIND' : 'SAMPLE LOCAL DB'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">DATABASE_URL</span>
              <div className="h-8 bg-white rounded-lg border border-[#E2E8F0] flex items-center px-2.5 font-mono text-[10.5px] text-[#2563EB] overflow-hidden">
                {infraStatus ? infraStatus.db_masked : "Retrieving database connection string..."}
              </div>
            </div>
          </div>

          {/* Redis sector */}
          <div className="p-4 bg-slate-50 rounded-xl border border-[#E2E8F0] space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[#0F172A] text-xs font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                Rapid Analytics Buffer
              </span>
              <span className={`text-[8.5px] font-mono uppercase px-2 py-0.5 rounded-md font-bold border ${
                infraStatus?.redis_configured 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-250' 
                  : 'bg-amber-50 text-amber-700 border-[#FDE68A]'
              }`}>
                {infraStatus?.redis_configured ? 'READY' : 'SIMULATION MEMORY'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">REDIS_URL</span>
              <div className="h-8 bg-white rounded-lg border border-[#E2E8F0] flex items-center px-2.5 font-mono text-[10.5px] text-[#2563EB] overflow-hidden">
                {infraStatus ? infraStatus.redis_masked : "Retrieving Redis cache settings..."}
              </div>
            </div>
          </div>

        </div>

        <div className="mt-4 pt-4 border-t border-[#F1F5F9] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-slate-400 animate-pulse" />
            <div className="text-[11px] text-slate-500 font-sans">
              Gateway Connection Sync: <strong className="text-slate-800 uppercase">{infraStatus ? "STABLE" : "CONFIGURING"}</strong> | Ping Delay: <span className="text-[#2563EB] font-bold font-mono">{infraStatus?.latency || "..."}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleTestHandshake}
            disabled={infraLoading}
            className="px-4 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-[#2563EB] border border-[#E2E8F0] rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1"
          >
            <RefreshCw className={`w-3 h-3 ${infraLoading ? 'animate-spin' : ''}`} />
            Test Handshake
          </button>
        </div>

        {testSuccessMessage && (
          <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-sans text-center">
            {testSuccessMessage}
          </div>
        )}

        {infraError && (
          <div className="mt-3 p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-[#DC2626] font-sans text-center">
            Handshake Error: {infraError}
          </div>
        )}
      </div>

      {/* Structured Known Limitations & Edge-Case Guardrails */}
      <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] mb-6">
        <div className="pb-2 border-b border-[#F1F5F9] flex justify-between items-center mb-4">
          <h3 className="font-sans font-extrabold text-[#0F172A] text-[13px] uppercase tracking-wide flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-[#D97706]" />
            Known Limitations & Failsafe Parameters
          </h3>
          <span className="text-[9px] font-mono text-slate-400 uppercase">Operational Handbook</span>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed font-sans mb-5">
          To maintain reliable, defensible biometric records, operators should understand neural path constraints and register any disability waivers where applicable:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Limit 1 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-[#E2E8F0] space-y-1">
            <span className="text-slate-800 font-sans text-xs font-bold block flex items-center gap-1.5">
              <span className="text-[#2563EB] font-mono font-bold">01.</span> Short Session Gaps
            </span>
            <p className="text-[11px] text-[#475569] leading-relaxed">
              Exams under 450 distinct keys or shorter than 3 minutes do not offer adequate data points. The engine tags sessions as <strong className="text-slate-700">INSUFFICIENT_LEN</strong> and requests prolonged baseline periods.
            </p>
          </div>

          {/* Limit 2 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-[#E2E8F0] space-y-1">
            <span className="text-slate-800 font-sans text-xs font-bold block flex items-center gap-1.5">
              <span className="text-[#2563EB] font-mono font-bold">02.</span> Insufficient Baseline history
            </span>
            <p className="text-[11px] text-[#475569] leading-relaxed">
              New examinees with missing historical traces are matched against high-confidence aggregated human matrices. Individual calibration accuracy recovers within 2 hours of cumulative typing.
            </p>
          </div>

          {/* Limit 3 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-[#E2E8F0] space-y-1">
            <span className="text-slate-800 font-sans text-xs font-bold block flex items-center gap-1.5">
              <span className="text-[#2563EB] font-mono font-bold">03.</span> Shared Workspace Terminals
            </span>
            <p className="text-[11px] text-[#475569] leading-relaxed">
              Swapping physical keyboard micro-switches alters key activation metrics. The examiner should enforce a 2-minute physical trial check when workstations are swapped.
            </p>
          </div>

          {/* Limit 4 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-[#E2E8F0] space-y-1">
            <span className="text-slate-800 font-sans text-xs font-bold block flex items-center gap-1.5">
              <span className="text-[#2563EB] font-mono font-bold">04.</span> Universal Medical Accommodations
            </span>
            <p className="text-[11px] text-[#475569] leading-relaxed">
              Candidates with tremors or speech-to-text dictation assistance bypass tactile tracking. Operators can register waiver tags, preserving session security with manual overseer verification.
            </p>
          </div>

        </div>
      </div>

      {/* Save Action Block */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E2E8F0]">
        {isSaved && (
          <span className="text-[#16A34A] font-mono text-xs font-bold flex items-center gap-1 shrink-0 animate-pulse select-none">
            <Check className="w-4 h-4" />
            Compliance Clearances Saved Successfully
          </span>
        )}
        
        <button
          onClick={handleSaveChanges}
          className="bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-md"
        >
          Save Configurations
        </button>
      </div>

    </div>
  );
}
