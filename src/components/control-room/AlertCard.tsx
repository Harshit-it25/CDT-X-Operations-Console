/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from 'react';
import { SecurityAlert } from '../../types';

interface AlertCardProps {
  alert: SecurityAlert;
  isSelected: boolean;
  onToggleSelect: () => void;
  onClick: () => void;
}

export default function AlertCard({ alert, isSelected, onToggleSelect, onClick }: AlertCardProps) {
  const isCrit = alert.riskScore >= 90;
  return (
    <div
      className={`p-3 bg-white border rounded-xl transition-all flex items-start gap-2.5 ${
        isSelected ? 'border-blue-400 bg-blue-50/10' : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
      }`}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onToggleSelect}
        aria-label={`Select alert ${alert.id}`}
        className="rounded border-[#CBD5E1] text-[#2563EB] focus:ring-blue-500 w-4 h-4 mt-0.5 cursor-pointer"
      />

      <div className="flex-1 min-w-0">
        <div 
          className="flex justify-between items-center mb-1 cursor-pointer" 
          onClick={onClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
          aria-label={`View details for alert ${alert.id}`}
        >
          <span className={`font-mono text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase ${
            isCrit ? 'text-red-700 bg-red-50 border border-red-200' : 'text-amber-850 bg-amber-50 border border-amber-200'
          }`}>
            {alert.type}
          </span>
          <span className="font-mono text-[9px] text-[#64748B]">{alert.timestamp}</span>
        </div>
        <p className="text-[12px] text-[#334155] leading-snug font-sans truncate cursor-pointer" onClick={onClick}>
          {alert.description}
        </p>
        <div className="mt-1.5 flex justify-between items-center text-[9.5px] font-mono cursor-pointer" onClick={onClick}>
          <span className="text-[#2563EB] font-bold">{alert.candidateName?.toUpperCase()}</span>
          <span className={`font-bold ${isCrit ? 'text-red-655' : 'text-amber-600'}`}>Risk: {alert.riskScore}%</span>
        </div>
      </div>
    </div>
  );
}
