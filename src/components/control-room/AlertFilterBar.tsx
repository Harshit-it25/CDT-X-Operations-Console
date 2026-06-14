/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface AlertFilterBarProps {
  categoryFilter: 'ALL' | 'IMPERSONATION' | 'AI_ASSISTANCE' | 'COLLUSION' | 'COGNITIVE';
  setCategoryFilter: (category: 'ALL' | 'IMPERSONATION' | 'AI_ASSISTANCE' | 'COLLUSION' | 'COGNITIVE') => void;
  severityFilter: 'ALL' | 'HIGH' | 'MEDIUM' | 'LOW';
  setSeverityFilter: (severity: 'ALL' | 'HIGH' | 'MEDIUM' | 'LOW') => void;
}

export default function AlertFilterBar({
  categoryFilter,
  setCategoryFilter,
  severityFilter,
  setSeverityFilter
}: AlertFilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="flex items-center gap-1 px-2 py-1 bg-white border border-[#E2E8F0] rounded-lg">
        <span className="text-[9px] font-mono text-[#64748B] font-bold">TYPE:</span>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as any)}
          aria-label="Filter alerts by category"
          className="bg-transparent border-none text-[10px] font-mono text-[#2563EB] p-0 focus:ring-0 cursor-pointer outline-none"
        >
          <option value="ALL">ALL</option>
          <option value="IMPERSONATION">IMPERSONATION</option>
          <option value="AI_ASSISTANCE">AI ASSIST</option>
          <option value="COLLUSION">COLLUSION</option>
          <option value="COGNITIVE">COGNITIVE</option>
        </select>
      </div>

      <div className="flex items-center gap-1 px-2 py-1 bg-white border border-[#E2E8F0] rounded-lg">
        <span className="text-[9px] font-mono text-[#64748B] font-bold">SEVERITY:</span>
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value as any)}
          aria-label="Filter alerts by severity risk"
          className="bg-transparent border-none text-[10px] font-mono text-[#2563EB] p-0 focus:ring-0 cursor-pointer outline-none"
        >
          <option value="ALL">ALL</option>
          <option value="HIGH">{"HIGH (>=75%)"}</option>
          <option value="MEDIUM">{"MEDIUM (50-74%)"}</option>
          <option value="LOW">{"LOW (<50%)"}</option>
        </select>
      </div>
    </div>
  );
}
