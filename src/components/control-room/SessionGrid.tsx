/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, ExternalLink } from 'lucide-react';
import { ExamSession, SecurityAlert, ActiveTab } from '../../types';

interface SessionGridProps {
  filteredSessions: ExamSession[];
  sessionSearchQuery: string;
  setSessionSearchQuery: (query: string) => void;
  alerts: SecurityAlert[];
  setSelectedAlertId: (id: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function SessionGrid({
  filteredSessions,
  sessionSearchQuery,
  setSessionSearchQuery,
  alerts,
  setSelectedAlertId,
  setActiveTab
}: SessionGridProps) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="px-5 py-3 border-b border-[#F1F5F9] bg-slate-50 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
        <h4 className="font-sans font-bold text-[#0F172A] text-[12px] uppercase tracking-wider">
          Ongoing Exam Sessions
        </h4>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search session..."
              value={sessionSearchQuery}
              onChange={(e) => setSessionSearchQuery(e.target.value)}
              aria-label="Search exam sessions"
              className="pl-7 pr-2.5 py-1 bg-white border border-[#E2E8F0] rounded-lg text-[11px] font-sans text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-44 outline-none shadow-sm"
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          </div>
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-mono text-[11px] font-bold">
            ● SECURE DATA COURIERS
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[11.5px]">
          <thead className="bg-[#F8FAFC] text-[#64748B] font-mono text-[11px] uppercase border-b border-[#E2E8F0]">
            <tr>
              <th className="text-left px-3.5 py-1.5 font-medium">Session ID</th>
              <th className="text-left px-3.5 py-1.5 font-medium">Location Hub</th>
              <th className="text-left px-3.5 py-1.5 font-medium">Student Spans</th>
              <th className="text-left px-3.5 py-1.5 font-medium">Completion</th>
              <th className="text-right px-3.5 py-1.5 font-medium">Verify</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {filteredSessions.map((session) => (
              <tr key={session.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-3.5 py-1.5 font-mono text-[#0F172A] font-bold">
                  {session.id}
                </td>
                <td className="px-3.5 py-1.5 text-[#475569]">
                  {session.location}
                </td>
                <td className="px-3.5 py-1.5 text-[#64748B]">
                  {session.candidatesActive} active / {session.candidatesTotal} total
                </td>
                <td className="px-3.5 py-1.5 w-32">
                  <div className="flex items-center gap-1.5">
                    <div className="flex-1 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#2563EB] rounded-full" 
                        style={{ width: `${session.progress}%` }}
                      ></div>
                    </div>
                    <span className="font-mono text-[11px] text-[#475569]">{session.progress}%</span>
                  </div>
                </td>
                <td className="px-3.5 py-1.5 text-right">
                  <button 
                    onClick={() => {
                      const associatedAlert = alerts.find(a => a.centerId.includes(session.location.split(' ')[0]));
                      if (associatedAlert) {
                        setSelectedAlertId(associatedAlert.id);
                      }
                      setActiveTab(ActiveTab.INVESTIGATIONS);
                    }}
                    className="p-1 rounded-lg text-[#2563EB] hover:bg-[#EFF6FF] transition-colors inline-block cursor-pointer"
                    title="Analyze Session Forensics"
                    aria-label={`Analyze forensics for session ${session.id}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
