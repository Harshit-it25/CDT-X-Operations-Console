/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Download, 
  Lock, 
  Unlock, 
  Terminal, 
  FileText, 
  Copy, 
  Check, 
  AlertTriangle,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { LedgerEntry } from '../types';

interface AuditLedgerViewProps {
  entries: LedgerEntry[];
  searchQuery: string;
}

export default function AuditLedgerView({ entries, searchQuery }: AuditLedgerViewProps) {
  const [selectedType, setSelectedType] = useState<string>('ALL_EVENTS');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [logMessages, setLogMessages] = useState<string[]>([
    '> Initializing SHA-256 log integrity check...',
    '> Last Verified Entry: 1,402,981 | Checksum: 0x822E...A902',
    '> Index Alignment Status: CONSISTENT',
    '> Comparing local sequence with simulated Central Registry... MATCH',
    '> Awaiting next compliance entry audit...'
  ]);

  // Command console simulation updates
  useEffect(() => {
    const timer = setInterval(() => {
      const hex = Math.floor(Math.random() * 16777215).toString(16).toUpperCase();
      const randomMsg = [
        `> compliance_receipt_${Math.floor(Math.random() * 200000)} logged | state: VERIFIED`,
        `> SHA-256 validation checksum: 0x${hex}...${hex.substring(0, 4)} matches Central Registry`,
        `> Sync integrity verified: 99.98% overall throughput`,
        `> Local database replica matches regional central records... SYNCED`
      ];
      const randomLine = randomMsg[Math.floor(Math.random() * randomMsg.length)];
      setLogMessages(msg => [...msg.slice(-4), randomLine]);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Filter entries based on selections
  const filteredEntries = entries.filter(entry => {
    // Dropdown Type Filter
    if (selectedType !== 'ALL_EVENTS' && entry.type !== selectedType) {
      return false;
    }
    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        entry.id.toLowerCase().includes(q) ||
        entry.description.toLowerCase().includes(q) ||
        entry.operator.toLowerCase().includes(q) ||
        entry.hash.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCopyHash = (hash: string, id: string) => {
    navigator.clipboard.writeText(hash).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  };

  const handleTriggerExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setShowExportModal(true);
    }, 1200);
  };

  return (
    <div className="h-full overflow-y-auto p-8 bg-[#F8FAFC] custom-scrollbar text-slate-800 pb-16">
      
      {/* Header Block */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] font-sans flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#2563EB]" />
            Audit & Compliance Ledger
          </h1>
          <p className="text-[13px] text-[#475569] mt-0.5">
            Verified cryptographic compliance logs and secure audit records tracked continuously in real time.
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button 
            type="button" 
            onClick={() => setSelectedType('ALL_EVENTS')}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50 text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Filter
          </button>
          
          <button 
            type="button"
            onClick={handleTriggerExport}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all disabled:opacity-50 shadow-md cursor-pointer"
          >
            {isExporting ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                Signing...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Export Ledger
              </>
            )}
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 select-none">
        
        {/* 1. Ledger Integrity */}
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <span className="text-slate-400 text-[9.5px] font-mono tracking-widest uppercase block mb-1">
            Ledger Safe Integrity
          </span>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full animate-pulse border border-white" />
            <span className="text-lg font-black font-sans text-emerald-700">VERIFIED SAFE</span>
          </div>
        </div>

        {/* 2. Total Logs */}
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <span className="text-slate-400 text-[9.5px] font-mono tracking-widest uppercase block mb-1">
            Cryptographic Checkpoints
          </span>
          <div className="text-lg font-mono font-extrabold text-[#0F172A] mt-1">
            1,402,982
          </div>
        </div>

        {/* 3. Daily Records */}
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <span className="text-slate-400 text-[9.5px] font-mono tracking-widest uppercase block mb-1">
            Compliance Operations Today
          </span>
          <div className="text-lg font-mono font-extrabold text-[#0F172A] mt-1">
            42,810
          </div>
        </div>

        {/* 4. Chain Sync */}
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <span className="text-slate-400 text-[9.5px] font-mono tracking-widest uppercase block mb-1">
            Audit Replication
          </span>
          <div className="text-lg font-mono font-extrabold text-[#2563EB] mt-1">
            0.002s AGO
          </div>
        </div>

      </div>

      {/* Main Table Card (Stripe-like SaaS UI) */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4 mb-6">
        
        {/* Table Filters Top Strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50 p-2.5 rounded-xl border border-[#E2E8F0]">
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E2E8F0] rounded-lg">
              <span className="text-[10px] font-mono text-[#64748B] font-bold uppercase">FAMILY:</span>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-transparent border-none text-[11px] font-mono text-[#2563EB] p-0 focus:ring-0 cursor-pointer"
              >
                <option value="ALL_EVENTS">ALL_EVENTS</option>
                <option value="USER_ACTION">USER_ACTION</option>
                <option value="SYSTEM_EVENT">SYSTEM_EVENT</option>
                <option value="DATA_EXPORT">DATA_EXPORT</option>
                <option value="SECURITY_ALERT">SECURITY_ALERT</option>
              </select>
            </div>

            <div className="flex items-center gap-1 px-3 py-1 bg-white border border-[#E2E8F0] rounded-lg text-[11px] text-[#64748B] font-sans font-bold">
              <span>TIME WINDOW:</span>
              <span className="text-slate-705">LAST 24h</span>
            </div>
          </div>

          <div className="text-[11px] font-mono text-slate-500 font-bold">
            ENTRIES VERIFIED: <span className="text-[#2563EB]">{filteredEntries.length}</span>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto border border-[#E2E8F0] rounded-xl">
          <table className="w-full text-left text-[11.5px] border-collapse bg-white">
            <thead className="bg-[#F8FAFC] text-slate-500 font-mono text-[9px] uppercase border-b border-[#E2E8F0] select-none">
              <tr>
                <th className="px-6 py-3 font-bold w-16">STATUS</th>
                <th className="px-6 py-3 font-bold w-48">TIMESTAMP (UTC)</th>
                <th className="px-6 py-3 font-bold w-40">EVENT FAMILY</th>
                <th className="px-6 py-3 font-bold">DESCRIPTION</th>
                <th className="px-6 py-3 font-bold w-48">OPERATOR</th>
                <th className="px-6 py-3 font-bold text-right w-44">SHA256 CHECKSUM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredEntries.map((entry) => {
                const isAlert = entry.type === 'SECURITY_ALERT';
                return (
                  <tr 
                    key={entry.id}
                    className={`hover:bg-slate-50/40 transition-colors ${isAlert ? 'bg-red-50/10' : ''}`}
                  >
                    <td className="px-6 py-3 text-center">
                      {isAlert ? (
                        <AlertTriangle className="w-4 h-4 text-red-650 inline" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-slate-400 inline" />
                      )}
                    </td>
                    <td className="px-6 py-3 font-mono text-[11.5px] text-[#0F172A] font-medium">
                      {entry.timestamp}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-0.5 font-mono text-[9px] font-bold rounded-lg uppercase border ${
                        entry.type === 'DATA_EXPORT' 
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : entry.type === 'USER_ACTION'
                          ? 'bg-slate-100 text-slate-700 border-slate-200'
                          : entry.type === 'SECURITY_ALERT'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : 'bg-slate-50 text-slate-500 border-slate-200'
                      }`}>
                        {entry.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-3 font-sans text-xs text-[#0D172A]">
                      {entry.description}
                    </td>
                    <td className="px-6 py-3 font-mono text-[11px] text-[#0F172A] font-bold">
                      {entry.operator}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <button
                        onClick={() => handleCopyHash(entry.hash, entry.id)}
                        className="font-mono text-[10px] text-slate-400 hover:text-[#2563EB] transition-colors inline-flex items-center gap-1 justify-end ml-auto cursor-pointer"
                        title="Copy cryptographic signature"
                      >
                        <span className="truncate max-w-[80px]">{entry.hash}</span>
                        {copiedId === entry.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                        ) : (
                          <Copy className="w-3 h-3 text-slate-400" />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* Terminal logs emulation and compliances quota cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Terminal Emulation (8/12) */}
        <div className="lg:col-span-8 bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-sans font-bold text-slate-800 text-[13px] uppercase tracking-wide flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#2563EB]" />
                Live Checksum verification terminal
              </h3>
              <span className="text-[9.5px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md uppercase font-bold">
                REPLICA_STABLE
              </span>
            </div>

            <div className="font-mono text-[11.5px] bg-[#0F172A] p-4 rounded-xl text-emerald-400 border border-slate-900 leading-relaxed mb-4 h-32 overflow-y-auto custom-scrollbar">
              {logMessages.map((msg, idx) => (
                <p key={idx}>{msg}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
              <span className="text-[8.5px] font-mono text-slate-400 block uppercase font-bold mb-1">Cryptographic Seed Target</span>
              <span className="text-[11.5px] font-mono text-slate-700 truncate block">
                9a7c8e9b21d3f4a56b7c8d9e0f1a2b3c
              </span>
            </div>
            <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
              <span className="text-[8.5px] font-mono text-slate-400 block uppercase font-bold mb-1">Audit Consensus Status</span>
              <span className="text-[11.5px] font-mono text-emerald-800 block font-bold">
                12/12 ACTIVE DEPLOYED REPLICAS RUNNING
              </span>
            </div>
          </div>
        </div>

        {/* Submit Compliance (4/12) */}
        <div className="lg:col-span-4 bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between select-none">
          <div>
            <h3 className="font-sans font-extrabold text-[#0F172A] text-[13.5px] uppercase tracking-wide mb-2">
              National Compliance Dispatch
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dispatches authenticated examination telemetry databases to national-level registries for forensic compliance logs audits.
            </p>
          </div>

          <div className="my-4">
            <div className="flex justify-between font-mono text-[9.5px] font-bold mb-2">
              <span className="text-slate-400">SYNC QUOTA COMPLETION RATE</span>
              <span className="text-[#16A34A] font-bold">98% COMPLETE</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-[#E2E8F0]">
              <div 
                className="bg-emerald-500 h-full" 
                style={{ width: '98%' }}
              />
            </div>
          </div>

          <button 
            type="button"
            onClick={handleTriggerExport}
            className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 border border-[#E2E8F0] text-slate-700 font-mono text-[10.5px] font-bold uppercase rounded-xl transition-all cursor-pointer shadow-sm text-center flex items-center justify-center gap-1.5"
          >
            <FileText className="w-4 h-4" />
            Validate Pending Logs
          </button>
        </div>

      </div>

      {/* Export Sign Report Modal Dialog */}
      {showExportModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-[#E2E8F0] p-8 rounded-3xl max-w-md w-full text-center relative shadow-2xl animate-in zoom-in duration-200">
            <div className="w-16 h-16 bg-[#EFF6FF] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#BFDBFE]">
              <Sparkles className="w-8 h-8 text-[#2563EB]" />
            </div>
            <h2 className="text-lg font-bold text-[#0F172A]">
              Official Audit Report Sealed
            </h2>
            <p className="text-slate-500 text-xs mt-2 mb-6 leading-relaxed">
              Legal compliance receipt logs for active batch verified and crypographically sealed with proctor authority key.
            </p>

            <div className="flex flex-col gap-2">
              <button 
                type="button"
                onClick={() => setShowExportModal(false)}
                className="w-full py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-mono font-bold text-xs uppercase rounded-xl transition-all cursor-pointer shadow-sm"
              >
                DOWNLOAD AUDIT COPIES (.PDF)
              </button>
              <button 
                type="button"
                onClick={() => setShowExportModal(false)}
                className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 border border-[#E2E8F0] text-slate-700 font-mono text-xs uppercase rounded-xl transition-all cursor-pointer"
              >
                Back to Workbench
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
