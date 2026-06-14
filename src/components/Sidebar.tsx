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
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  operatorName, 
  operatorRole 
}: SidebarProps) {
  
  const navItems = [
    { 
      id: ActiveTab.DEMO_SNAPSHOT, 
      label: 'Demo Snapshot Center', 
      icon: Sparkles,
      description: 'Complete operational loop mental model'
    },
    { 
      id: ActiveTab.CONTROL_ROOM, 
      label: 'Continuous Trust Heatmap', 
      icon: Radio,
      description: 'Real-time behavior flow & center health'
    },
    { 
      id: ActiveTab.CANDIDATE_PORTAL, 
      label: 'Candidate Identity Portal', 
      icon: UserCheck,
      description: 'Enrollment & pre-exam readiness'
    },
    { 
      id: ActiveTab.SYSTEM_ARCHITECTURE, 
      label: 'System Architecture View', 
      icon: Network,
      description: 'Behavior Intelligence Engine canvas'
    },
    { 
      id: ActiveTab.DIGITAL_TWIN, 
      label: 'Digital Behavior Profile Explorer', 
      icon: Layers,
      description: 'Behavioral fingerprint profiles'
    },
    { 
      id: ActiveTab.INVESTIGATIONS, 
      label: 'Behavioral Forensics Desk', 
      icon: Fingerprint,
      description: 'Anomalous drift & integrity reviews'
    },
    { 
      id: ActiveTab.BEHAVIOR_REPLAY, 
      label: 'High-Fidelity Replay', 
      icon: Play,
      description: 'Replay mouse trajectories & pacing'
    },
    { 
      id: ActiveTab.EVALUATION, 
      label: 'Dataset Credibility Assurance', 
      icon: BarChart3,
      description: 'Accuracy metrics & calibration curves'
    },
    { 
      id: ActiveTab.SYNTHETIC_GENERATOR, 
      label: 'Behavior Simulation Lab', 
      icon: Database,
      description: 'Simulate high-dimensional behavior manifolds'
    },
    { 
      id: ActiveTab.BOARDROOM, 
      label: 'Business Impact Center', 
      icon: TrendingUp,
      description: 'Operations security, ROI & cost savings'
    },
    { 
      id: ActiveTab.CENTER_MANAGEMENT, 
      label: 'Cross-Center Trust Network', 
      icon: Activity,
      description: 'Federated learning node configurations'
    },
    { 
      id: ActiveTab.AUDIT_LEDGER, 
      label: 'Compliance Audit Ledger', 
      icon: ScrollText,
      description: 'Cryptographically sealed audit logs'
    },
  ];

  const utilityItems = [
    { 
      id: ActiveTab.SETTINGS, 
      label: 'System Config', 
      icon: Settings 
    },
  ];

  return (
    <aside id="nav-sidebar" className="fixed left-0 top-0 h-full w-[280px] flex flex-col py-6 bg-white border-r border-[#E2E8F0] z-50 shadow-sm">
      {/* Brand Header */}
      <div className="px-6 mb-6 select-none shrink-0 border-b border-[#F1F5F9] pb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-650 text-[#2563EB]" />
          <h1 className="font-sans text-[17px] font-black text-[#0F172A] tracking-tight">CDT-X PLATFORM</h1>
        </div>
        <p className="font-mono text-[9px] text-[#475569] uppercase tracking-widest mt-1 font-bold">
          Enterprise Security Hub
        </p>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id.toLowerCase()}`}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-155 text-left border-l-4 ${
                isActive
                  ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold border-[#2563EB]'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] border-transparent'
              }`}
            >
              <IconComponent className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-[#2563EB]' : 'text-[#64748B]'}`} />
              <div className="flex flex-col min-w-0">
                <span className="font-sans text-[13px] tracking-tight truncate">{item.label}</span>
                <span className={`text-[10px] font-normal leading-tight mt-0.5 truncate ${isActive ? 'text-[#2563EB]/80' : 'text-[#64748B]'}`}>{item.description}</span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer Navigation */}
      <div className="mt-auto px-3 pt-4 border-t border-[#E2E8F0] space-y-1.5">
        {utilityItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id.toLowerCase()}`}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-155 text-left border-l-4 ${
                isActive
                  ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold border-[#2563EB]'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] border-transparent'
              }`}
            >
              <IconComponent className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-[#2563EB]' : 'text-[#64748B]'}`} />
              <span className="font-sans text-[13px] tracking-tight">{item.label}</span>
            </button>
          );
        })}

        {/* User Identity Panel */}
        <div className="mt-4 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#E2E8F0] flex items-center justify-center text-[#2563EB] font-bold text-[11px] border border-[#CBD5E1]">
            {operatorName.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-sans font-semibold text-[13.5px] text-[#0F172A] truncate">
              {operatorName}
            </span>
            <div className="flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-[#2563EB]" />
              <span className="text-[9.5px] text-[#475569] font-mono tracking-wider font-semibold">{operatorRole}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
