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

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredEntries, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `audit_ledger_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Timestamp', 'Type', 'Description', 'Operator', 'Hash'];
    const rows = filteredEntries.map(entry => [
      entry.id,
      entry.timestamp,
      entry.type,
      `"${entry.description.replace(/"/g, '""')}"`,
      entry.operator,
      entry.hash
    ]);
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `audit_ledger_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="h-full overflow-y-auto px-4 py-2.5 bg-[#F8FAFC] custom-scrollbar text-slate-800 pb-10">
      
      {/* Header Block — compact */}
      <div className="mb-2.5 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-[13px] font-black tracking-tight text-[#0F172A] font-sans flex items-center gap-1.5 uppercase leading-none">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
            Audit &amp; Compliance Ledger
          </h1>
          <p className="text-[11px] text-[#64748B] mt-0.5">Cryptographic log entries · verified in real time</p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button 
            type="button" 
            onClick={() => setSelectedType('ALL_EVENTS')}
            className="flex items-center gap-1.5 px-2 py-1 bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50 text-[11.5px] font-bold rounded-lg transition-all shadow-sm cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
          
          <button 
            type="button"
            onClick={handleTriggerExport}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#2563EB] hover:bg-blue-700 text-white text-[11.5px] font-bold rounded-lg transition-all disabled:opacity-50 shadow-sm cursor-pointer"
          >
            {isExporting ? (
              <>
                <RotateCcw className="w-3 h-3 animate-spin" />
                Signing...
              </>
            ) : (
              <>
                <Download className="w-3 h-3" />
                Export Ledger
              </>
            )}
          </button>
        </div>
      </div>

      {/* Standardized 4-Metric Header Strip */}
      <div className="grid grid-cols-4 gap-2 mb-2">
        {/* Metric 1: Trust Score */}
        <div className="bg-white border border-[#E2E8F0] px-2.5 py-1.5 rounded-lg shadow-sm h-[76px] flex flex-col justify-between">
          <span className="text-[9.5px] font-mono font-black uppercase text-slate-400 tracking-wider block">Trust Score</span>
          <div className="flex items-baseline gap-1 font-sans">
            <span className="text-[15px] font-black text-[#0f172a] tracking-tight leading-none">99.8%</span>
            <span className="text-[9.5px] font-extrabold text-emerald-600">✓ COMPLIANT</span>
          </div>
          <p className="text-[9.5px] text-slate-400 leading-none">System consensus score</p>
        </div>

        {/* Metric 2: Identity Confidence */}
        <div className="bg-white border border-[#E2E8F0] px-2.5 py-1.5 rounded-lg shadow-sm h-[76px] flex flex-col justify-between">
          <span className="text-[9.5px] font-mono font-black uppercase text-slate-400 tracking-wider block">Identity Confidence</span>
          <div className="text-[15px] font-black text-[#2563EB] tracking-tight font-sans leading-none">
            99.2%
          </div>
          <p className="text-[9.5px] text-slate-400 leading-none">Average profile match</p>
        </div>

        {/* Metric 3: Risk Level */}
        <div className="bg-white border border-[#E2E8F0] px-2.5 py-1.5 rounded-lg shadow-sm h-[76px] flex flex-col justify-between items-start">
          <span className="text-[9.5px] font-mono font-black uppercase text-slate-400 tracking-wider block">Risk Level</span>
          <span className="px-1.5 py-0.2 rounded text-[9.5px] font-black uppercase border font-sans leading-none text-emerald-700 bg-emerald-50 border-emerald-200">
            LOW
          </span>
          <p className="text-[9.5px] text-slate-400 leading-none">Continuous verification</p>
        </div>

        {/* Metric 4: Recommended Action */}
        <div className="bg-white border border-[#E2E8F0] px-2.5 py-1.5 rounded-lg shadow-sm h-[76px] flex flex-col justify-between">
          <span className="text-[9.5px] font-mono font-black uppercase text-slate-400 tracking-wider block">Recommended Action</span>
          <div className="text-[10px] font-bold text-slate-800 tracking-tight line-clamp-1 leading-tight uppercase">
            COMMIT RECORDS
          </div>
          <p className="text-[9.5px] text-slate-400 leading-none">Real-time prescription</p>
        </div>
      </div>

      {/* Secondary Ledger Metrics */}
      <div className="grid grid-cols-4 gap-2 mb-2.5 select-none">
        {/* 1. Ledger Integrity */}
        <div className="bg-white border border-[#E2E8F0] px-2.5 py-1.5 rounded-lg shadow-sm">
          <span className="text-slate-400 text-[9.5px] font-mono tracking-widest uppercase block leading-none mb-1">Ledger Integrity</span>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse border border-white" />
            <span className="text-[11px] font-black font-sans text-emerald-700 leading-none">VERIFIED</span>
          </div>
        </div>

        {/* 2. Total Logs */}
        <div className="bg-white border border-[#E2E8F0] px-2.5 py-1.5 rounded-lg shadow-sm">
          <span className="text-slate-400 text-[9.5px] font-mono tracking-widest uppercase block leading-none mb-1">Crypto Checkpoints</span>
          <div className="text-[12px] font-mono font-extrabold text-[#0F172A] leading-none">1,402,982</div>
        </div>

        {/* 3. Daily Records */}
        <div className="bg-white border border-[#E2E8F0] px-2.5 py-1.5 rounded-lg shadow-sm">
          <span className="text-slate-400 text-[9.5px] font-mono tracking-widest uppercase block leading-none mb-1">Compliance Today</span>
          <div className="text-[12px] font-mono font-extrabold text-[#0F172A] leading-none">42,810</div>
        </div>

        {/* 4. Chain Sync */}
        <div className="bg-[#FFFFFF] border border-[#E2E8F0] px-2.5 py-1.5 rounded-lg shadow-sm">
          <span className="text-slate-400 text-[9.5px] font-mono tracking-widest uppercase block leading-none mb-1">Last Sync</span>
          <div className="text-[12px] font-mono font-extrabold text-[#2563EB] leading-none">0.002s AGO</div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 shadow-sm space-y-2 mb-2.5">
        
        {/* Table Filters Top Strip */}
        <div className="flex items-center justify-between gap-3 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-[#E2E8F0]">
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white border border-[#E2E8F0] rounded-lg">
              <span className="text-[10px] font-mono text-[#64748B] font-bold uppercase">FAMILY:</span>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-transparent border-none text-[10px] font-mono text-[#2563EB] p-0 focus:ring-0 cursor-pointer"
              >
                <option value="ALL_EVENTS">ALL_EVENTS</option>
                <option value="USER_ACTION">USER_ACTION</option>
                <option value="SYSTEM_EVENT">SYSTEM_EVENT</option>
                <option value="DATA_EXPORT">DATA_EXPORT</option>
                <option value="SECURITY_ALERT">SECURITY_ALERT</option>
              </select>
            </div>

            <div className="flex items-center gap-1 px-2 py-0.5 bg-white border border-[#E2E8F0] rounded-lg text-[10px] text-[#64748B] font-sans font-bold">
              <span>TIME WINDOW:</span>
              <span className="text-slate-705">LAST 24h</span>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-500 font-bold">
            VERIFIED: <span className="text-[#2563EB]">{filteredEntries.length}</span>
          </div>
        </div>

        <div className="overflow-x-auto border border-[#E2E8F0] rounded-lg">
          <table className="w-full text-left text-[11px] border-collapse bg-white">
            <thead className="bg-[#F8FAFC] text-slate-500 font-mono text-[11px] uppercase border-b border-[#E2E8F0] select-none">
              <tr>
                <th className="px-2 py-1 font-bold w-10">ST</th>
                <th className="px-2 py-1 font-bold w-40">TIMESTAMP (UTC)</th>
                <th className="px-2 py-1 font-bold w-36">TYPE</th>
                <th className="px-2 py-1 font-bold">DESCRIPTION</th>
                <th className="px-2 py-1 font-bold w-40">OPERATOR</th>
                <th className="px-2 py-1 font-bold text-right w-36">CHECKSUM</th>
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
                    <td className="px-2 py-1 text-center">
                      {isAlert ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-red-655 inline" />
                      ) : (
                        <Lock className="w-3 h-3 text-slate-400 inline" />
                      )}
                    </td>
                    <td className="px-2 py-1 font-mono text-[11px] text-[#0F172A] font-medium">
                      {entry.timestamp}
                    </td>
                    <td className="px-2 py-1">
                      <span className={`px-1.5 py-0.2 font-mono text-[11px] font-bold rounded uppercase border ${
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
                    <td className="px-2 py-1 font-sans text-[11px] text-[#0D172A]">
                      {entry.description}
                    </td>
                    <td className="px-2 py-1 font-mono text-[11px] text-[#0F172A] font-bold">
                      {entry.operator}
                    </td>
                    <td className="px-2 py-1 text-right">
                      <button
                        onClick={() => handleCopyHash(entry.hash, entry.id)}
                        className="font-mono text-[11px] text-slate-400 hover:text-[#2563EB] transition-colors inline-flex items-center gap-1 justify-end ml-auto cursor-pointer"
                        title="Copy signature"
                      >
                        <span className="truncate max-w-[80px]">{entry.hash}</span>
                        {copiedId === entry.id ? (
                          <Check className="w-3 h-3 text-emerald-600 font-bold" />
                        ) : (
                          <Copy className="w-2.5 h-2.5 text-slate-400" />
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

      {/* Compact Audit Integrity Status Strip (replaces decorative terminal) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

        {/* Integrity Status */}
        <div className="bg-white border border-[#E2E8F0] p-3 rounded-lg shadow-sm">
          <h3 className="font-sans font-bold text-[#0F172A] text-[11px] uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Audit Chain Status
          </h3>
          <div className="space-y-1 text-[11px] font-mono">
            <div className="flex justify-between"><span className="text-slate-500">Replica Count</span><span className="font-bold text-[#0F172A]">12/12 ACTIVE</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Integrity Check</span><span className="font-bold text-emerald-700">SHA-256 VERIFIED</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Last Sync</span><span className="font-bold text-[#2563EB]">0.002s ago</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Index Alignment</span><span className="font-bold text-emerald-700">CONSISTENT</span></div>
          </div>
        </div>

        {/* Crypto Seed */}
        <div className="bg-white border border-[#E2E8F0] p-3 rounded-lg shadow-sm">
          <h3 className="font-sans font-bold text-[#0F172A] text-[11px] uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
            <Lock className="w-3.5 h-3.5 text-[#2563EB]" />
            Cryptographic Parameters
          </h3>
          <div className="space-y-1 text-[11px] font-mono">
            <div className="flex justify-between"><span className="text-slate-500">Seed Target</span><span className="font-bold text-[#0F172A] truncate ml-2">9a7c8e9b21d3f4a5</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Algorithm</span><span className="font-bold text-[#0F172A]">SHA-256</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Key Rotation</span><span className="font-bold text-emerald-700">24h CYCLE</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Entries Verified</span><span className="font-bold text-[#2563EB]">{filteredEntries.length}</span></div>
          </div>
        </div>

        {/* National Compliance Dispatch */}
        <div className="bg-white border border-[#E2E8F0] p-3 rounded-lg shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-sans font-extrabold text-[#0F172A] text-[11px] uppercase tracking-wide mb-1 leading-tight">
              National Compliance Dispatch
            </h3>
            <p className="text-[11px] text-slate-500 leading-tight mb-2">
              Dispatches authenticated telemetry to national registries for compliance audit.
            </p>
            <div className="flex justify-between font-mono text-[10.5px] font-bold mb-1">
              <span className="text-slate-400">SYNC QUOTA</span>
              <span className="text-[#16A34A]">98% COMPLETE</span>
            </div>
            <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full" style={{ width: '98%' }} />
            </div>
          </div>
          <button 
            type="button"
            onClick={handleTriggerExport}
            className="mt-2.5 w-full py-1.5 bg-slate-50 hover:bg-slate-100 border border-[#E2E8F0] text-slate-700 font-mono text-[11px] font-bold uppercase rounded-lg cursor-pointer flex items-center justify-center gap-1.5 leading-none"
          >
            <FileText className="w-3 h-3" />
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
                onClick={handleExportCSV}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-xs uppercase rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                EXPORT TO CSV (.CSV)
              </button>
              <button 
                type="button"
                onClick={handleExportJSON}
                className="w-full py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-mono font-bold text-xs uppercase rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                EXPORT TO JSON (.JSON)
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
