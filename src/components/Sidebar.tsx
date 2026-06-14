/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Radio, 
  Fingerprint, 
  ScrollText, 
  Network, 
  Settings, 
  ShieldCheck,
  UserCheck,
  Layers,
  Activity,
  BarChart3,
  Play,
  Database,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { ActiveTab } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  operatorName: string;
  operatorRole: string;
  onOpenTechNotes: () => void;
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  operatorName, 
  operatorRole,
  onOpenTechNotes
}: SidebarProps) {
  
  const navItems = [
    { 
      id: ActiveTab.WHY_CDT_X, 
      label: 'Why CDT-X?', 
      icon: Sparkles,
      description: 'Value, problem, & passive biometric approach'
    },
    { 
      id: ActiveTab.CANDIDATE_PORTAL, 
      label: 'Candidate Portal', 
      icon: UserCheck,
      description: 'Enrollment & pre-exam calibration'
    },
    { 
      id: ActiveTab.CONTROL_ROOM, 
      label: 'Trust Monitoring', 
      icon: Radio,
      description: 'Real-time candidate heatmap & alerts'
    },
    { 
      id: ActiveTab.INVESTIGATIONS, 
      label: 'Investigation Center', 
      icon: Fingerprint,
      description: 'Examine flagged behavior profile anomalies'
    },
    { 
      id: ActiveTab.AUDIT_LEDGER, 
      label: 'Audit Ledger', 
      icon: ScrollText,
      description: 'Immutable cryptographic compliance records'
    },
  ];

  const utilityItems = [
    { 
      id: ActiveTab.SETTINGS, 
      label: 'System Config', 
      icon: Settings 
    },
    { 
      id: 'TECH_NOTES', 
      label: 'Technical Notes', 
      icon: Database 
    },
  ];

  return (
    <aside id="nav-sidebar" className="fixed left-0 top-0 h-full w-[280px] flex flex-col py-4 bg-white border-r border-[#E2E8F0] z-50 shadow-sm">
      {/* Brand Header */}
      <div className="px-6 mb-3 select-none shrink-0 border-b border-[#F1F5F9] pb-2.5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4.5 h-4.5 text-blue-650 text-[#2563EB]" />
          <h1 className="font-sans text-[15.5px] font-black text-[#0F172A] tracking-tight">CDT-X PLATFORM</h1>
        </div>
        <p className="font-mono text-[10px] text-[#475569] uppercase tracking-widest mt-0.5 font-bold">
          Enterprise Security Hub
        </p>
      </div>

      {/* Main Navigation */}
      <nav className="flex-grow px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id.toLowerCase()}`}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-all duration-155 text-left border-l-4 ${
                isActive
                  ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold border-[#2563EB]'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] border-transparent'
              }`}
            >
              <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#2563EB]' : 'text-[#64748B]'}`} />
              <div className="flex flex-col min-w-0">
                <span className="font-sans text-[12.5px] tracking-tight truncate leading-tight">{item.label}</span>
                <span className={`text-[10px] font-normal leading-tight mt-0.5 truncate ${isActive ? 'text-[#2563EB]/80' : 'text-[#64748B]'}`}>{item.description}</span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer Navigation */}
      <div className="mt-auto px-3 pt-2 border-t border-[#E2E8F0] space-y-1 shrink-0">
        {utilityItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id.toLowerCase()}`}
              onClick={() => {
                if (item.id === 'TECH_NOTES') {
                  onOpenTechNotes();
                } else {
                  setActiveTab(item.id as ActiveTab);
                }
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-all duration-155 text-left border-l-4 ${
                isActive
                  ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold border-[#2563EB]'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] border-transparent'
              }`}
            >
              <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#2563EB]' : 'text-[#64748B]'}`} />
              <span className="font-sans text-[12.5px] tracking-tight">{item.label}</span>
            </button>
          );
        })}

        {/* User Identity Panel */}
        <div className="mt-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center gap-2.5">
          <div className="w-7.5 h-7.5 rounded-full bg-[#E2E8F0] flex items-center justify-center text-[#2563EB] font-bold text-[10.5px] border border-[#CBD5E1] shrink-0">
            {operatorName.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-sans font-semibold text-[12.5px] text-[#0F172A] truncate leading-tight">
              {operatorName}
            </span>
            <div className="flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-[#2563EB]" />
              <span className="text-[10px] text-[#475569] font-mono tracking-wider font-semibold leading-none">{operatorRole}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
