/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  User, 
  AlertTriangle, 
  ShieldCheck, 
  MapPin, 
  Activity, 
  Terminal, 
  FileText, 
  Play, 
  Zap,
  Command
} from 'lucide-react';
import { ActiveTab } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (tab: ActiveTab, candidateId?: string, alertId?: string, scenario?: 'NORMAL' | 'IMPERSONATION' | 'AI_ASSISTED' | 'COLLUSION') => void;
}

interface PaletteItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'CANDIDATES' | 'ALERTS' | 'SESSIONS' | 'CENTERS' | 'ACTIONS';
  icon: React.ReactNode;
  tab: ActiveTab;
  candidateId?: string;
  alertId?: string;
  scenario?: 'NORMAL' | 'IMPERSONATION' | 'AI_ASSISTED' | 'COLLUSION';
  shortcut?: string;
}

export default function CommandPalette({ isOpen, onClose, onSelectAction }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const items: PaletteItem[] = [
    // ACTIONS
    {
      id: 'act-1',
      title: 'Analyze Continuous Trust Heatmap',
      subtitle: 'Open the main real-time student seat matrix',
      category: 'ACTIONS',
      icon: <Activity className="w-4 h-4 text-emerald-600" />,
      tab: ActiveTab.CONTROL_ROOM,
    },
    {
      id: 'act-2',
      title: 'Open Forensic Investigations Desk',
      subtitle: 'Analyze active alert telemetry profiles',
      category: 'ACTIONS',
      icon: <Terminal className="w-4 h-4 text-amber-600" />,
      tab: ActiveTab.INVESTIGATIONS,
    },
    {
      id: 'act-3',
      title: 'View Biometric Replay Player',
      subtitle: 'Interactive mouse trace & typing speed analysis',
      category: 'ACTIONS',
      icon: <Play className="w-4 h-4 text-blue-600" />,
      tab: ActiveTab.BEHAVIOR_REPLAY,
    },
    {
      id: 'act-4',
      title: 'Export Regulatory Dossier Report',
      subtitle: 'Download complete continuous validation logs',
      category: 'ACTIONS',
      icon: <FileText className="w-4 h-4 text-indigo-600" />,
      tab: ActiveTab.DIGITAL_TWIN,
    },
    {
      id: 'act-5',
      title: 'Verify System Architecture Moat',
      subtitle: 'Inspect deep pipeline and BFM model accuracy',
      category: 'ACTIONS',
      icon: <Zap className="w-4 h-4 text-pink-600" />,
      tab: ActiveTab.SYSTEM_ARCHITECTURE,
    },

    // CANDIDATES
    {
      id: 'cand-rohan',
      title: 'Rohan Patil',
      subtitle: 'ID: USR_89921_ROHAN • Station: SOL-01 #18 • High Risk',
      category: 'CANDIDATES',
      icon: <User className="w-4 h-4 text-rose-600" />,
      tab: ActiveTab.DIGITAL_TWIN,
      candidateId: 'USR_89921_ROHAN',
      alertId: 'AL-7712',
      scenario: 'IMPERSONATION'
    },
    {
      id: 'cand-aarav',
      title: 'Aarav Kulkarni',
      subtitle: 'ID: USR_73322_AARAV • Station: HYD-02 #06 • High Risk',
      category: 'CANDIDATES',
      icon: <User className="w-4 h-4 text-amber-600" />,
      tab: ActiveTab.DIGITAL_TWIN,
      candidateId: 'USR_73322_AARAV',
      alertId: 'AL-1102',
      scenario: 'AI_ASSISTED'
    },
    {
      id: 'cand-neha',
      title: 'Neha Joshi',
      subtitle: 'ID: USR_44112_NEHA • Station: PUN-03 #15 • High Risk',
      category: 'CANDIDATES',
      icon: <User className="w-4 h-4 text-amber-600" />,
      tab: ActiveTab.DIGITAL_TWIN,
      candidateId: 'USR_44112_NEHA',
      alertId: 'AL-9942',
      scenario: 'COLLUSION'
    },
    {
      id: 'cand-sidd',
      title: 'Siddharth Jadhav',
      subtitle: 'ID: USR_00122_SIDD • Station: MUM-01 #22 • Verified',
      category: 'CANDIDATES',
      icon: <User className="w-4 h-4 text-emerald-600" />,
      tab: ActiveTab.DIGITAL_TWIN,
      candidateId: 'USR_00122_SIDD',
      alertId: 'AL-5510',
      scenario: 'NORMAL'
    },

    // INCIDENTS / ALERTS
    {
      id: 'alert-7712',
      title: 'Case AL-7712: Identity Drift Detected',
      subtitle: 'Active typing biometrics drift exceeds 40% on Station SOL-18 (Rohan Patil)',
      category: 'ALERTS',
      icon: <AlertTriangle className="w-4 h-4 text-rose-600 animate-pulse" />,
      tab: ActiveTab.INVESTIGATIONS,
      alertId: 'AL-7712',
      scenario: 'IMPERSONATION'
    },
    {
      id: 'alert-1102',
      title: 'Case AL-1102: AI Assistance Detected',
      subtitle: 'Writing perplexity matching indicates external LLM assistance on Station HYD-12 (Aarav Kulkarni)',
      category: 'ALERTS',
      icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
      tab: ActiveTab.INVESTIGATIONS,
      alertId: 'AL-1102',
      scenario: 'AI_ASSISTED'
    },
    {
      id: 'alert-9942',
      title: 'Case AL-9942: Collusion Cluster Suspected',
      subtitle: 'Mouse coordinate overlap & click synchronization with workstation neighbors (Neha Joshi)',
      category: 'ALERTS',
      icon: <AlertTriangle className="w-4 h-4 text-amber-605 text-amber-600" />,
      tab: ActiveTab.INVESTIGATIONS,
      alertId: 'AL-9942',
      scenario: 'COLLUSION'
    },
    {
      id: 'alert-5510',
      title: 'Case AL-5510: Low Risk / Verified',
      subtitle: 'Cognitive matrices solved within standard historical reaction speeds (Siddharth Jadhav)',
      category: 'ALERTS',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
      tab: ActiveTab.INVESTIGATIONS,
      alertId: 'AL-5510',
      scenario: 'NORMAL'
    },

    // SESSIONS
    {
      id: 'sess-sol',
      title: 'Session EXM-88219-B',
      subtitle: 'Solapur Central Hub • 142 Active Candidates',
      category: 'SESSIONS',
      icon: <Activity className="w-4 h-4 text-indigo-600" />,
      tab: ActiveTab.CONTROL_ROOM,
    },
    {
      id: 'sess-hyd',
      title: 'Session EXM-44102-X',
      subtitle: 'Hyderabad Tech Center • 89 Active Candidates',
      category: 'SESSIONS',
      icon: <Activity className="w-4 h-4 text-indigo-600" />,
      tab: ActiveTab.CONTROL_ROOM,
    },
    {
      id: 'sess-pun',
      title: 'Session EXM-10294-Z',
      subtitle: 'Pune Operations Hub • 238 Active Candidates',
      category: 'SESSIONS',
      icon: <Activity className="w-4 h-4 text-indigo-600" />,
      tab: ActiveTab.CONTROL_ROOM,
    },

    // CENTERS
    {
      id: 'cntr-sol',
      title: 'Solapur Center (SOL-01)',
      subtitle: 'Tier 1 Infrastructure • BioMetric-V3 Compliant',
      category: 'CENTERS',
      icon: <MapPin className="w-4 h-4 text-slate-500" />,
      tab: ActiveTab.CENTER_MANAGEMENT,
    },
    {
      id: 'cntr-hyd',
      title: 'Hyderabad Center (HYD-02)',
      subtitle: 'Tier 2 Infrastructure • Critical Vulnerability Gaps Found',
      category: 'CENTERS',
      icon: <MapPin className="w-4 h-4 text-rose-600" />,
      tab: ActiveTab.CENTER_MANAGEMENT,
    },
    {
      id: 'cntr-pun',
      title: 'Pune Center (PUN-03)',
      subtitle: 'Tier 1 Infrastructure • BioMetric-V2 • Updates Pending',
      category: 'CENTERS',
      icon: <MapPin className="w-4 h-4 text-amber-600" />,
      tab: ActiveTab.CENTER_MANAGEMENT,
    },
  ];

  const filteredItems = items.filter(item => {
    if (!query) return true;
    const term = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(term) ||
      item.subtitle.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term)
    );
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          const item = filteredItems[selectedIndex];
          onSelectAction(item.tab, item.candidateId, item.alertId, item.scenario);
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onSelectAction, onClose]);

  // Click outside close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Group filtered items by category for visual organization
  const groupedCategories: { [key: string]: PaletteItem[] } = {};
  filteredItems.forEach(item => {
    if (!groupedCategories[item.category]) {
      groupedCategories[item.category] = [];
    }
    groupedCategories[item.category].push(item);
  });

  // Flat list index resolver helper for keyboard navigation
  let flatIdxCount = 0;

  return (
    <div className="fixed inset-0 bg-slate-900/35 backdrop-blur-md z-50 flex items-start justify-center pt-[15vh]">
      <div 
        ref={containerRef}
        className="w-full max-w-[620px] bg-white border border-slate-200/80 rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.12)] flex flex-col overflow-hidden max-h-[500px]"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 shrink-0">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a candidate name, session, exam center or action..."
            className="w-full bg-transparent text-[#0f172a] font-sans text-sm placeholder-slate-400 focus:outline-none"
          />
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 font-mono text-[9.5px] text-slate-500 uppercase select-none shadow-sm font-medium">
            ESC
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-2.5 custom-scrollbar">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-slate-400 font-sans text-sm">
              No entities found matching "<strong>{query}</strong>"
            </div>
          ) : (
            Object.keys(groupedCategories).map((category) => (
              <div key={category} className="mb-2 last:mb-0">
                <div className="px-3.5 py-1 text-[9.5px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50 rounded-lg select-none">
                  {category}
                </div>
                <div className="mt-1 space-y-0.5">
                  {groupedCategories[category].map((item) => {
                    const currentFlatIdx = flatIdxCount;
                    flatIdxCount++;
                    const isSelected = currentFlatIdx === selectedIndex;

                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          onSelectAction(item.tab, item.candidateId, item.alertId, item.scenario);
                          onClose();
                        }}
                        className={`px-3 py-2 rounded-xl flex items-center justify-between cursor-pointer transition-all duration-150 border ${
                          isSelected 
                            ? 'bg-slate-50 text-[#0f172a] shadow-sm border-slate-200/80 font-medium' 
                            : 'hover:bg-slate-50/60 text-slate-600 border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`p-1.5 rounded-lg flex items-center justify-center transition-all ${
                            isSelected 
                              ? 'bg-white border border-slate-200 shadow-sm' 
                              : 'bg-slate-50 border border-slate-100/50'
                          }`}>
                            {item.icon}
                          </span>
                          <div>
                            <span className={`text-[12.5px] font-bold font-sans block leading-tight ${isSelected ? 'text-[#0f172a]' : 'text-slate-700'}`}>
                              {item.title}
                            </span>
                            <span className="text-[10px] text-slate-400 block mt-0.5 leading-none">
                              {item.subtitle}
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <span className="text-[9px] font-mono font-semibold text-slate-500 border border-slate-200 bg-white px-2 py-0.5 rounded-lg shadow-sm select-none">
                            ENTER
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer hints */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-[10px] font-mono text-slate-500 select-none shrink-0 font-medium">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><span className="text-slate-400">↑↓</span> Navigation</span>
            <span className="flex items-center gap-1"><span className="text-slate-400">↵</span> Select</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold tracking-wide text-slate-400">
            <Command className="w-3.5 h-3.5 text-slate-350 text-slate-400" />
            <span>CDT-X COMMAND PROTOCOL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
