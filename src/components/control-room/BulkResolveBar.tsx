/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface BulkResolveBarProps {
  totalAlarmsCount: number;
  selectedCount: number;
  onSelectAllToggle: () => void;
  onBulkResolve: () => void;
  isAllSelected: boolean;
}

export default function BulkResolveBar({
  totalAlarmsCount,
  selectedCount,
  onSelectAllToggle,
  onBulkResolve,
  isAllSelected
}: BulkResolveBarProps) {
  if (totalAlarmsCount === 0) return null;

  return (
    <div className="flex justify-between items-center pt-1 border-t border-slate-200/60 font-sans">
      <label className="flex items-center gap-1.5 cursor-pointer text-[11px] font-medium text-slate-700">
        <input
          type="checkbox"
          checked={isAllSelected}
          onChange={onSelectAllToggle}
          className="rounded border-[#CBD5E1] text-[#2563EB] focus:ring-blue-500 w-3.5 h-3.5"
        />
        <span>Select All ({totalAlarmsCount})</span>
      </label>

      {selectedCount > 0 && (
        <button
          onClick={onBulkResolve}
          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10.5px] font-bold uppercase rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          Resolve Selected ({selectedCount})
        </button>
      )}
    </div>
  );
}
