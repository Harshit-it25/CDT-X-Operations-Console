/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Layers } from 'lucide-react';

export interface Seat {
  seatIndex: number;
  label: string;
  status: 'STABLE' | 'WARNING' | 'ALERT' | 'EMPTY';
  candidateName: string;
  trustScore: number;
  anomaly: string;
  biometrics: string;
  alertId: string;
}

interface SeatHeatmapProps {
  selectedSessionId: string;
  selectedSeatIndex: number;
  setSelectedSeatIndex: (index: number) => void;
  handleSessionChange: (sessId: string) => void;
  workstations: Seat[];
  centerTabs: { id: string; label: string; code: string; activeCount: number }[];
}

export default function SeatHeatmap({
  selectedSessionId,
  selectedSeatIndex,
  setSelectedSeatIndex,
  handleSessionChange,
  workstations,
  centerTabs
}: SeatHeatmapProps) {
  return (
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
              aria-label={`Switch to ${tab.label}`}
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
              aria-label={`Station ${ws.label}, status ${ws.status}, trust score ${ws.trustScore}%`}
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
  );
}
