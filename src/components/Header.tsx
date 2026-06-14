/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Activity, 
  User, 
  CheckCircle, 
  ShieldAlert,
  MapPin,
  Clock
} from 'lucide-react';
import { ActiveTab, SecurityAlert } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  alerts: SecurityAlert[];
  setActiveTab: (tab: ActiveTab) => void;
  operatorName: string;
  onScenarioSelect?: (scenario: 'NORMAL' | 'IMPERSONATION' | 'AI_ASSISTED' | 'COLLUSION') => void;
  currentScenario?: 'NORMAL' | 'IMPERSONATION' | 'AI_ASSISTED' | 'COLLUSION';
  onOpenCommandPalette?: () => void;
}

export default function Header({ 
  activeTab, 
  searchQuery, 
  setSearchQuery, 
  alerts,
  setActiveTab,
  operatorName,
  onScenarioSelect,
  currentScenario,
  onOpenCommandPalette
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  
  const activeAlarms = alerts.filter(a => !a.resolved);
  const activeAlertsCount = activeAlarms.length;

  const [activeCandidateCount, setActiveCandidateCount] = useState(469);
  const [uptimeSeconds, setUptimeSeconds] = useState(13524); // Start representing 3h 45m 24s

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/dashboard/overview');
        if (res.ok) {
          const data = await res.json();
          if (data.active_sessions) {
            const totalActive = data.active_sessions.reduce((acc: number, s: { candidatesActive: number }) => acc + s.candidatesActive, 0);
            setActiveCandidateCount(totalActive);
          }
        }
      } catch (e) {
        console.warn("Header telemetry fetch fallback:", e);
      }
    };

    fetchData();
    const fetchInterval = setInterval(fetchData, 3000);

    const jitterInterval = setInterval(() => {
      setActiveCandidateCount(prev => {
        // Subtle drift around base value to simulate active concurrent websocket updates
        const drift = Math.random() < 0.4 ? (Math.random() < 0.5 ? 1 : -1) : 0;
        return Math.max(420, Math.min(498, prev + drift));
      });
    }, 1500);

    const uptimeInterval = setInterval(() => {
      setUptimeSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(fetchInterval);
      clearInterval(jitterInterval);
      clearInterval(uptimeInterval);
    };
  }, []);

  const formatUptime = (totalSecs: number) => {
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Priority 4: Dynamic notifications matching exact schema requested
  const notificationCenterItems = [
    {
      id: 'n-1',
      title: 'Identity Drift Detected',
      candidate: 'Rohan Patil',
      candidateId: 'USR_89921_ROHAN',
      severity: 'CRITICAL',
      timestamp: '14:24:02',
      status: 'Investigation Required',
      description: 'Active typing biometrics drift exceeds 40% threshold for Station #SOL-18.',
      alertId: 'AL-7712'
    },
    {
      id: 'n-2',
      title: 'AI Assistance Detected',
      candidate: 'Aarav Kulkarni',
      candidateId: 'USR_73322_AARAV',
      severity: 'HIGH RISK',
      timestamp: '14:01:55',
      status: 'Investigation Required',
      description: 'Vocabulary complexity shifts indicate active LLM support templates.',
      alertId: 'AL-1102'
    },
    {
      id: 'n-3',
      title: 'Collusion Suspected',
      candidate: 'Neha Joshi',
      candidateId: 'USR_44112_NEHA',
      severity: 'MEDIUM RISK',
      timestamp: '13:59:42',
      status: 'Investigation Required',
      description: 'Workstation clicks overlap with neighbor Station PUN-16 sequence.',
      alertId: 'AL-9942'
    },
    {
      id: 'n-4',
      title: 'System Health Event',
      candidate: 'Global Nodes',
      candidateId: 'N/A',
      severity: 'VERIFIED/STABLE',
      timestamp: '13:55:01',
      status: 'HEALTHY',
      description: 'Rolling compliance updates applied cross-regional nodes cleanly.',
      alertId: 'AL-5510'
    }
  ];

  // Dynamic header titles & search placeholders
  const getTabDetails = () => {
    switch (activeTab) {
      case ActiveTab.WHY_CDT_X:
        return {
          title: 'Why CDT-X?',
          placeholder: 'Search product details, limitations...',
          subtitle: 'Core product explanation, architecture & benefits'
        };
      case ActiveTab.DEMO_SNAPSHOT:
        return {
          title: 'Demo Snapshot Center',
          placeholder: 'Explore operational pipeline steps...',
          subtitle: 'End-to-End Operational Lifecycle mental model'
        };
      case ActiveTab.CONTROL_ROOM:
        return {
          title: 'Continuous Trust Heatmap',
          placeholder: 'Search centers, candidates, active incidents...',
          subtitle: 'Centers, Candidates, Trust & Incidents Heatmap'
        };
      case ActiveTab.CANDIDATE_PORTAL:
        return {
          title: 'Candidate Identity Portal',
          placeholder: 'Search enrollment IDs, candidate status...',
          subtitle: 'Continuous Biometric Enrollment & Verification'
        };
      case ActiveTab.SYSTEM_ARCHITECTURE:
        return {
          title: 'System Architecture View',
          placeholder: 'Search pipeline layers, nodes, inputs...',
          subtitle: 'Interactive BFM Pipeline & Processing Canvas'
        };
      case ActiveTab.DIGITAL_TWIN:
        return {
          title: 'Digital Behavior Profile Explorer',
          placeholder: 'Search candidate name, biometric ID...',
          subtitle: 'Continuous Biometric Profiling & Similarity'
        };
      case ActiveTab.INVESTIGATIONS:
        return {
          title: 'Behavioral Forensics Desk',
          placeholder: 'Search Incident ID, Candidate, IP...',
          subtitle: 'Incident Investigation & Verification'
        };
      case ActiveTab.AUDIT_LEDGER:
        return {
          title: 'Compliance Audit Ledger',
          placeholder: 'Search compliance logs, operator entries...',
          subtitle: 'Regulatory Compliance Verified Records'
        };
      case ActiveTab.CENTER_MANAGEMENT:
        return {
          title: 'Cross-Center Trust Network',
          placeholder: 'Search workstations, proctors, candidates...',
          subtitle: 'Student Workstation Verification'
        };
      case ActiveTab.BEHAVIOR_REPLAY:
        return {
          title: 'High-Fidelity Replay',
          placeholder: 'Search candidates and keystroke logs...',
          subtitle: 'Mouse Coordinates & Typing Cadence Playback'
        };
      case ActiveTab.EVALUATION:
        return {
          title: 'Dataset Credibility Assurance',
          placeholder: 'Search accuracy scores, model criteria...',
          subtitle: 'Calibrating ROC Curves and Confusion Weights'
        };

      case ActiveTab.SYNTHETIC_GENERATOR:
        return {
          title: 'Behavior Simulation Lab',
          placeholder: 'Query simulated database registers...',
          subtitle: 'Passive Manifold Simulation Models'
        };
      case ActiveTab.BOARDROOM:
        return {
          title: 'Business Impact Center',
          placeholder: 'Consult financial metrics, proctor audits...',
          subtitle: 'Operations Security, ROI & Cost Defensibility'
        };

      case ActiveTab.SETTINGS:
        return {
          title: 'System Config',
          placeholder: 'Search configuration parameters...',
          subtitle: 'Supervised Security Parameters & Keys'
        };
      default:
        return {
          title: 'CDT-X OPERATIONS',
          placeholder: 'Search operational parameters...',
          subtitle: 'Enterprise Security Guard Engine'
        };
    }
  };

  const details = getTabDetails() || {
    title: 'CDT-X OPERATIONS',
    placeholder: 'Search operational parameters...',
    subtitle: 'Enterprise Security Guard Engine'
  };

  return (
    <header className="fixed top-0 left-[280px] right-0 z-40 bg-white/95 backdrop-blur-md shadow-[0_2px_12px_rgba(15,23,42,0.03)] h-10 flex justify-between items-center px-4 transition-all duration-300">
      {/* Title & Interactive Palette Trigger search bar */}
      <div className="flex items-center gap-4 flex-1 max-w-[340px]">
        <div className="flex items-center gap-2 select-none">
          <div className="p-1.5 bg-blue-50 text-[#2563EB] rounded-lg">
            <Activity className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-[13px] font-extrabold text-[#0F172A] uppercase tracking-wider whitespace-nowrap">
              {details.title.split(' ')[0]}
            </span>
            <span className="text-[10px] font-mono text-slate-400 font-medium leading-none uppercase mt-0.5 whitespace-nowrap">
              {activeTab.replace('_', ' ')}
            </span>
          </div>
        </div>
        
        {/* Soft layout flow spacing instead of harsh board lines */}
        <div className="flex-1 min-w-[160px]">
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center justify-between w-full bg-slate-50 border border-slate-200/50 hover:bg-slate-100 hover:border-slate-300/80 rounded-xl pl-3.5 pr-3 py-2 text-left text-[11px] text-[#475569] transition-all select-none cursor-pointer duration-150"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-sans font-medium text-slate-500">Search Command (⌘K)</span>
            </div>
            <kbd className="hidden lg:inline-block bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono text-[8.5px] text-[#475569] leading-none uppercase shadow-sm">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>

      {/* Live Integrity Indicators Section */}
      <div className="hidden xl:flex items-center gap-3 bg-slate-50 border border-slate-200/50 px-2.5 py-1 rounded-lg shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] select-none">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <div className="flex flex-col">
            <span className="text-[7.5px] font-mono font-bold text-slate-400 uppercase tracking-wider leading-none">Candidates Active</span>
            <span className="text-[10.5px] font-mono font-bold text-slate-700 leading-none mt-0.5">{activeCandidateCount}</span>
          </div>
        </div>
        <div className="h-3 w-px bg-slate-200/80"></div>
        <div className="flex items-center gap-1">
          <CheckCircle className="w-3 h-3 text-blue-500" />
          <div className="flex flex-col">
            <span className="text-[7.5px] font-mono font-bold text-slate-400 uppercase tracking-wider leading-none">Investigations</span>
            <span className="text-[10.5px] font-mono font-bold text-slate-700 leading-none mt-0.5">{activeAlertsCount} pending</span>
          </div>
        </div>
        <div className="h-3 w-px bg-slate-200/80"></div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-indigo-500/80" />
          <div className="flex flex-col">
            <span className="text-[7.5px] font-mono font-bold text-slate-400 uppercase tracking-wider leading-none">Engine Uptime</span>
            <span className="text-[10.5px] font-mono font-bold text-slate-700 leading-none mt-0.5">{formatUptime(uptimeSeconds)}</span>
          </div>
        </div>
      </div>

      {/* Control Tools & Live Badges */}
      <div className="flex items-center gap-3">
        {/* Unified Capsule enclosing consolidated Demo Scenarios */}
        <div className="flex items-center gap-1 bg-slate-50 border border-slate-200/50 p-1 rounded-lg shrink-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-1">
            <span className="text-[8.5px] font-mono font-bold text-slate-400 uppercase tracking-widest pl-1.5 pr-0.5 select-none">
              Demo:
            </span>
            
            {(['NORMAL', 'IMPERSONATION', 'AI_ASSISTED', 'COLLUSION'] as const).map((sc) => {
              const isActive = currentScenario === sc;
              let btnClass = '';
              let label = '';
              
              if (sc === 'NORMAL') {
                btnClass = isActive 
                  ? 'bg-emerald-600 text-white shadow-sm font-semibold' 
                  : 'text-slate-500 hover:text-emerald-600 hover:bg-slate-200/30';
                label = 'Normal';
              } else if (sc === 'IMPERSONATION') {
                btnClass = isActive 
                  ? 'bg-rose-600 text-white shadow-sm font-semibold' 
                  : 'text-slate-500 hover:text-rose-600 hover:bg-slate-200/30';
                label = 'Imperson';
              } else if (sc === 'AI_ASSISTED') {
                btnClass = isActive 
                  ? 'bg-blue-600 text-white shadow-sm font-semibold' 
                  : 'text-slate-500 hover:text-blue-600 hover:bg-slate-200/30';
                label = 'AI Assist';
              } else if (sc === 'COLLUSION') {
                btnClass = isActive 
                  ? 'bg-amber-600 text-white shadow-sm font-semibold' 
                  : 'text-slate-500 hover:text-amber-700 hover:bg-slate-200/30';
                label = 'Collusion';
              }

              return (
                <button
                  key={sc}
                  onClick={() => onScenarioSelect?.(sc)}
                  className={`px-1.5 py-0.5 text-[9px] font-sans rounded transition-all duration-150 uppercase tracking-wider cursor-pointer ${btnClass}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Streaming Indicator without raw solid bounds */}
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-50 text-[#2563EB] select-none shrink-0 font-medium font-sans">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#2563EB]"></span>
          </span>
          <span className="text-[9px] font-mono font-bold tracking-widest uppercase">
            LIVE
          </span>
        </div>

        {/* Action icons */}
        <div className="relative">
          <button 
            id="notifications-bell"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setUnreadCount(0);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-[#0F172A] hover:bg-slate-100 transition-colors relative cursor-pointer"
          >
            <Bell className="w-3.5 h-3.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 px-0.5 py-0.2 bg-rose-500 text-[7.5px] font-bold font-mono text-white rounded-full min-w-[10px] h-[10px] flex items-center justify-center animate-bounce leading-none">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Interactive Notifications Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-85 bg-white border border-slate-200 shadow-xl rounded-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-100 select-none">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#F1F5F9] mb-2.5">
                <span className="text-[10px] font-mono font-bold text-[#0F172A] tracking-wider uppercase flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-500" />
                  NOTIFICATION DESK
                </span>
                <span className="bg-slate-100 text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded font-mono text-[7.5px] tracking-wide">REALTIME</span>
              </div>
              
              <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                {notificationCenterItems.map((item) => {
                  let alertBadgeClass = '';
                  if (item.severity === 'CRITICAL') {
                    alertBadgeClass = 'text-red-700 bg-red-50 border border-red-200';
                  } else if (item.severity === 'HIGH RISK' || item.severity === 'MEDIUM RISK') {
                    alertBadgeClass = 'text-amber-800 bg-amber-50 border border-amber-200';
                  } else {
                    alertBadgeClass = 'text-emerald-700 bg-emerald-50 border border-emerald-200';
                  }

                  return (
                    <div 
                      key={item.id}
                      onClick={() => {
                        setActiveTab(ActiveTab.INVESTIGATIONS);
                        setShowNotifications(false);
                      }}
                      className="p-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-100 rounded-xl cursor-pointer transition-all space-y-1.5"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-bold text-[#0F172A] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>
                          {item.title}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400">{item.timestamp}</span>
                      </div>
                      <p className="text-[11.5px] font-sans text-[#475569] leading-snug">
                        {item.description}
                      </p>
                      
                      <div className="pt-2 flex justify-between items-center text-[9.5px] font-mono">
                        <div className="flex gap-1.5">
                          <span className="text-slate-400">Target:</span>
                          <span className="text-[#2563EB] font-bold">{item.candidate}</span>
                        </div>
                        <span className={`px-1.5 py-0.5 text-[8px] rounded uppercase font-extrabold ${alertBadgeClass}`}>
                          {item.severity}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <button 
                onClick={() => {
                  setActiveTab(ActiveTab.INVESTIGATIONS);
                  setShowNotifications(false);
                }}
                className="w-full mt-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 text-[#0F172A] text-[10px] font-mono font-bold uppercase rounded-xl text-center transition-colors border border-slate-205/60 cursor-pointer"
              >
                Go to Forensic Investigations Desk
              </button>
            </div>
          )}
        </div>

        {/* User Quick Identity profile with soft separation */}
        <div className="flex items-center gap-1.5 cursor-default select-none bg-slate-50 hover:bg-slate-100 p-0.5 pr-2 rounded-lg transition-colors duration-150 relative">
          <div className="w-6.5 h-6.5 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold font-mono text-[10.5px]">
            {operatorName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[9.5px] font-bold text-[#0F172A] hidden md:inline truncate max-w-[80px]">
              {operatorName}
            </span>
            <span className="text-[7.5px] font-mono text-slate-400 font-bold leading-none select-none uppercase tracking-wider hidden md:inline">
              OPERATOR
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
