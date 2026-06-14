/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ControlRoomView from './components/ControlRoomView';
import InvestigationsView from './components/InvestigationsView';
import AuditLedgerView from './components/AuditLedgerView';
import CenterManagementView from './components/CenterManagementView';
import DigitalTwinExplorerView from './components/DigitalTwinExplorerView';
import SettingsView from './components/SettingsView';
import EvaluationBenchmarkView from './components/EvaluationBenchmarkView';
import BehaviorReplayView from './components/BehaviorReplayView';
import SyntheticGeneratorView from './components/SyntheticGeneratorView';
import BoardroomDashboardView from './components/BoardroomDashboardView';
import CandidatePortalView from './components/CandidatePortalView';
import ArchitectureCenterView from './components/ArchitectureCenterView';
import CommandPalette from './components/CommandPalette';
import JudgeWalkthroughPanel from './components/JudgeWalkthroughPanel';
import DemoSnapshotCenterView from './components/DemoSnapshotCenterView';
import WhyCdtxView from './components/WhyCdtxView';

import { 
  ActiveTab, 
  SecurityAlert, 
  ExamSession, 
  LedgerEntry, 
  TestingCenter, 
  AuditorNote 
} from './types';

import { 
  generateRandomAlert, 
  generateLedgerForAlert, 
  generateSystemLedger, 
  updateKPIFluctuations, 
  mutateSessions 
} from './SimulationEngine';

import {
  tickAlertsDecisionLifecycle,
  initializeAlertIntelligence
} from './DecisionEngine';

// Let's seed initial data
const initialAlerts: SecurityAlert[] = [
  {
    id: "AL-7712",
    type: "IMPERSONATION_ALERT",
    timestamp: "14:24:02",
    description: "Mismatch: Active typing biometrics drift exceeds 40% threshold for Station #SOL-18 (Candidate Rohan Patil)",
    centerId: "SOL-01",
    centerName: "Solapur Center",
    candidateName: "Rohan Patil",
    candidateId: "USR_89921_ROHAN",
    riskScore: 94.2,
    resolved: false,
    category: "IMPERSONATION"
  },
  {
    id: "AL-1102",
    type: "AI_ASSISTANCE_DETECTED",
    timestamp: "14:01:55",
    description: "Semantic phrasing matching speed indicates external LLM system assistance telemetry on Station #HYD-12",
    centerId: "HYD-02",
    centerName: "Hyderabad Center",
    candidateName: "Aarav Kulkarni",
    candidateId: "USR_73322_AARAV",
    riskScore: 72,
    resolved: false,
    category: "AI_ASSISTANCE"
  },
  {
    id: "AL-9942",
    type: "COLLUSION_CLUSTER_FOUND",
    timestamp: "13:59:42",
    description: "Continuous focus matching and sound rhythm correlation signals cooperative cheating behaviors on Station #PUN-05",
    centerId: "PUN-03",
    centerName: "Pune Center",
    candidateName: "Neha Joshi",
    candidateId: "USR_44112_NEHA",
    riskScore: 88,
    resolved: false,
    category: "COLLUSION"
  },
  {
    id: "AL-5510",
    type: "COGNITIVE_ANOMALY",
    timestamp: "13:58:10",
    description: "Anomalous cognitive reaction times: user solving high-complexity competitive exam matrices under 240 milliseconds on Station #MUM-22",
    centerId: "MUM-01",
    centerName: "Mumbai Center",
    candidateName: "Siddharth Jadhav",
    candidateId: "USR_00122_SIDD",
    riskScore: 68,
    resolved: false,
    category: "COGNITIVE"
  }
];

const initialSessions: ExamSession[] = [
  {
    id: "EXM-88219-B",
    location: "Solapur (SOL-01) Central Hub",
    candidatesActive: 142,
    candidatesTotal: 150,
    progress: 45,
    riskHigh: 2,
    riskMed: 8,
    riskLow: 132,
    status: "STABLE"
  },
  {
    id: "EXM-44102-X",
    location: "Hyderabad (HYD-02) Tech Center",
    candidatesActive: 89,
    candidatesTotal: 90,
    progress: 88,
    riskHigh: 0,
    riskMed: 1,
    riskLow: 88,
    status: "ANOMALY"
  },
  {
    id: "EXM-10294-Z",
    location: "Pune (PUN-03) Operations Hub",
    candidatesActive: 238,
    candidatesTotal: 240,
    progress: 92,
    riskHigh: 1,
    riskMed: 3,
    riskLow: 234,
    status: "STABLE"
  },
  {
    id: "EXM-55310-Y",
    location: "Mumbai (MUM-01) Host Center",
    candidatesActive: 31,
    candidatesTotal: 35,
    progress: 15,
    riskHigh: 0,
    riskMed: 0,
    riskLow: 31,
    status: "STABLE"
  }
];

const initialLedgerEntries: LedgerEntry[] = [
  {
    id: "LG-001",
    timestamp: "2023-11-24 14:02:11.002",
    type: "DATA_EXPORT",
    description: "Bulk export of Exam Center #SOL-01 seating logs for centralized regulatory compliance verification.",
    operator: "ADM_COMP_VERIFIED",
    hash: "0x4F92...B3A1"
  },
  {
    id: "LG-002",
    timestamp: "2023-11-24 14:01:58.421",
    type: "USER_ACTION",
    description: "Modification of 'Critical Failure' alert risk trigger values inside Region 4.",
    operator: "OPERATOR_ID_992",
    hash: "0x9E11...CC4D"
  },
  {
    id: "LG-003",
    timestamp: "2023-11-24 13:58:22.109",
    type: "SECURITY_ALERT",
    description: "Unauthenticated database read request block flag registered on Node-9 host.",
    operator: "IP_192.168.1.104",
    hash: "0x2A44...DD90"
  },
  {
    id: "LG-004",
    timestamp: "2023-11-24 13:55:01.000",
    type: "SYSTEM_EVENT",
    description: "Automated audit log rotational backup archival of record indexes 1.4M to 1.402M completed.",
    operator: "SYSTEM_CORE_ARCHIVER",
    hash: "0x1F22...EE33"
  },
  {
    id: "LG-005",
    timestamp: "2023-11-24 13:50:44.212",
    type: "USER_ACTION",
    description: "Revocation of Operator biometric clearances keys for UID:441 due to supervisor rotation.",
    operator: "ADM_S_OFFICER",
    hash: "0x5C81...FB22"
  },
  {
    id: "LG-006",
    timestamp: "2023-11-24 13:22:22.000",
    type: "USER_ACTION",
    description: "Login session established from new secure mobile satellite router node in Kolkata HQ.",
    operator: "OPERATOR_ID_102",
    hash: "0xBB31...AA42"
  },
  {
    id: "LG-007",
    timestamp: "2023-11-24 12:02:22.001",
    type: "DATA_EXPORT",
    description: "JSON manifest dispatch sequence generated for secure proctored courier transport routes.",
    operator: "SYSTEM_AUTOMATION",
    hash: "0xDD44...CC21"
  }
];

const initialCenters: TestingCenter[] = [
  {
    id: "SOL-01",
    name: "Solapur Center",
    tier: "Tier 1 Infrastructure",
    readinessScore: 98,
    workstationsCount: 156,
    osVersion: "Core-OS 12.4 (Compliant)",
    biometricHardware: "BioMetric-V3 (Face/Palm Scan)",
    securityPatchStatus: "Patch 24.2.1 Stable",
    lastPushTime: "Pushed 14h ago",
    personnelCode: "RP",
    personnelName: "Rohan Patil",
    status: "PATCHED"
  },
  {
    id: "PUN-03",
    name: "Pune Center",
    tier: "Tier 1 Infrastructure",
    readinessScore: 92,
    workstationsCount: 240,
    osVersion: "Core-OS 12.3 (Update Needed)",
    biometricHardware: "BioMetric-V2 (Fingerprint Scan)",
    securityPatchStatus: "Update Pending",
    lastPushTime: "Last pushed: 3d ago",
    personnelCode: "AD",
    personnelName: "Aditi Deshmukh",
    status: "PENDING"
  },
  {
    id: "HYD-02",
    name: "Hyderabad Center",
    tier: "Tier 2 Infrastructure",
    readinessScore: 64,
    workstationsCount: 48,
    osVersion: "Core-OS 11.8 (Legacy Kernel)",
    biometricHardware: "BioMetric-V1 Scanner Model",
    securityPatchStatus: "Critical Overdue Gap",
    lastPushTime: "Overdue 12d",
    personnelCode: "NJ",
    personnelName: "Neha Joshi",
    status: "VULNERABILITY"
  }
];

const initialNotes: AuditorNote[] = [
  {
    id: "N-1",
    timestamp: "14:26:00 UTC",
    caseId: "AL-7712",
    text: "Initial telemetry matches typical workstation signature drift. Suspicion points to virtual webcam driver injection injection.",
    author: "OP_SEC_04"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.WHY_CDT_X);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Lifted Technical Notes states
  const [showTechNotes, setShowTechNotes] = useState(false);
  const [activeTechTab, setActiveTechTabTech] = useState<'architecture' | 'validation' | 'research' | 'simulation'>('architecture');
  
  // Command Palette settings
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCommandSelect = (
    tab: ActiveTab,
    candidateId?: string,
    alertId?: string,
    scenario?: 'NORMAL' | 'IMPERSONATION' | 'AI_ASSISTED' | 'COLLUSION'
  ) => {
    if (scenario) {
      handleScenarioSelect(scenario);
    } else {
      if (alertId) {
        setSelectedAlertId(alertId);
      }
      if (candidateId) {
        setSearchQuery(candidateId);
      }
      setActiveTab(tab);
    }
  };

  // Custom states
  const [operatorName, setOperatorName] = useState('Operator_44');
  const [operatorRole, setOperatorRole] = useState('L3-SECURITY');
  const [currentScenario, setCurrentScenario] = useState<'NORMAL' | 'IMPERSONATION' | 'AI_ASSISTED' | 'COLLUSION'>('IMPERSONATION');
  
  const handleScenarioSelect = async (scenario: 'NORMAL' | 'IMPERSONATION' | 'AI_ASSISTED' | 'COLLUSION') => {
    setCurrentScenario(scenario);
    let targetAlert = 'AL-7712';
    let targetQuery = 'Rohan';
    let apiEndpoint = '/api/simulate/impersonation';
    let targetTab = ActiveTab.INVESTIGATIONS;

    if (scenario === 'NORMAL') {
      targetAlert = 'AL-5510';
      targetQuery = 'Siddharth';
      apiEndpoint = '/api/simulate/normal';
      targetTab = ActiveTab.CONTROL_ROOM;
    } else if (scenario === 'AI_ASSISTED') {
      targetAlert = 'AL-1102';
      targetQuery = 'Aarav';
      apiEndpoint = '/api/simulate/ai-assisted';
      targetTab = ActiveTab.INVESTIGATIONS;
    } else if (scenario === 'COLLUSION') {
      targetAlert = 'AL-9942';
      targetQuery = 'Neha';
      apiEndpoint = '/api/simulate/collusion';
      targetTab = ActiveTab.INVESTIGATIONS;
    }

    setSelectedAlertId(targetAlert);
    setSearchQuery(targetQuery);
    setActiveTab(targetTab);

    try {
      await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidate_id: targetAlert === 'AL-7712' ? 'USR_89921_ROHAN' : targetAlert === 'AL-1102' ? 'USR_73322_AARAV' : targetAlert === 'AL-9942' ? 'USR_44112_NEHA' : 'USR_00122_SIDD' })
      });
      
      // Pull active metrics automatically
      const responseLog = await fetch('/api/dashboard/overview');
      if (responseLog.ok) {
        const stats = await responseLog.json();
        if (stats.active_sessions) {
          setSessions(stats.active_sessions);
        }
      }
    } catch (e) {
      console.warn("Telemetry backend post error fallback:", e);
    }
  };
  
  const [alerts, setAlerts] = useState<SecurityAlert[]>(() => 
    initialAlerts.map((alert, idx) => initializeAlertIntelligence(alert, idx))
  );
  const [sessions, setSessions] = useState<ExamSession[]>(initialSessions);
  const [ledgerEntries, setLedgerEntries] = useState<LedgerEntry[]>(initialLedgerEntries);
  const [centers, setCenters] = useState<TestingCenter[]>(initialCenters);
  const [notes, setNotes] = useState<AuditorNote[]>(initialNotes);
  const [selectedAlertId, setSelectedAlertId] = useState<string>('AL-7712');

  // Dynamic ticking UTC clock state
  const [liveClockTime, setLiveClockTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toISOString().substring(11, 19);
      setLiveClockTime(`UTC ${timeString}`);
    };
    updateTime();
    const timerId = setInterval(updateTime, 1000);
    return () => clearInterval(timerId);
  }, []);

  const alertsRef = useRef(alerts);
  alertsRef.current = alerts;

  const ledgerEntriesRef = useRef(ledgerEntries);
  ledgerEntriesRef.current = ledgerEntries;

  // CDT-X Central Inteligency Simulation Engine Background Thread
  useEffect(() => {
    let expectedInterval = 15; // default NORMAL
    if (currentScenario === 'IMPERSONATION') expectedInterval = 3;
    else if (currentScenario === 'AI_ASSISTED') expectedInterval = 4;
    else if (currentScenario === 'COLLUSION') expectedInterval = 2;

    let secondsElapsedSinceAlert = 0;
    let active = true;
    let timerId: any = null;

    const tick = () => {
      if (!active) return;
      secondsElapsedSinceAlert += 1;

      // Local copy of current synchronous values to prevent React double updates / side effect runs
      let nextAlerts = [...alertsRef.current];
      let nextLedger = [...ledgerEntriesRef.current];

      // 1. Generate live events when state threshold matches frequency
      if (secondsElapsedSinceAlert >= expectedInterval) {
        secondsElapsedSinceAlert = 0;
        
        const newAlert = generateRandomAlert(currentScenario, nextAlerts.length);
        
        // Ensure no duplicate IDs
        if (!nextAlerts.some(a => a.id === newAlert.id)) {
          nextAlerts = [newAlert, ...nextAlerts].slice(0, 50);

          const newLedger = generateLedgerForAlert(newAlert);
          nextLedger = [newLedger, ...nextLedger].slice(0, 50);
        }
      }

      // 2. Perform background auditing ledger logs (simulates platform operations)
      if (Math.random() < 0.12) {
        const newLedger = generateSystemLedger();
        nextLedger = [newLedger, ...nextLedger].slice(0, 50);
      }

      // 3. Mutate testing seats KPI counts and active centers/sessions
      setSessions(prevSessions => mutateSessions(prevSessions, currentScenario));
      updateKPIFluctuations(currentScenario);

      // 4. Advance decision intelligence lifecycle
      const { alerts: updatedAlerts, newLedgerEntries } = tickAlertsDecisionLifecycle(nextAlerts, 1);
      nextAlerts = updatedAlerts;
      
      if (newLedgerEntries.length > 0) {
        // Enforce uniqueness of ledger entry IDs
        const existingIds = new Set(nextLedger.map(l => l.id));
        const filteredNewLedgerEntries = newLedgerEntries.filter(l => !existingIds.has(l.id));
        nextLedger = [...filteredNewLedgerEntries, ...nextLedger].slice(0, 50);
      }

      // 5. Update React states exactly once per tick
      setAlerts(nextAlerts);
      setLedgerEntries(nextLedger);

      // Re-schedule with standard randomized interval variance as requested (randomized jitter)
      const randomDelay = 800 + Math.random() * 400; // ~1s with slight jitter
      timerId = setTimeout(tick, randomDelay);
    };

    timerId = setTimeout(tick, 1000);

    return () => {
      active = false;
      if (timerId) clearTimeout(timerId);
    };
  }, [currentScenario]);

  // Full-Stack Synchronization & Pre-Seeding
  useEffect(() => {
    const seedBackendScenarios = async () => {
      try {
        // Pre-seed normal baseline
        await fetch('/api/simulate/normal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ candidate_id: 'USR_00122_SIDD' })
        });
        // Pre-seed impersonation
        await fetch('/api/simulate/impersonation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ candidate_id: 'USR_89921_ROHAN' })
        });
        // Pre-seed AI assisted
        await fetch('/api/simulate/ai-assisted', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ candidate_id: 'USR_73322_AARAV' })
        });
        // Pre-seed collusion
        await fetch('/api/simulate/collusion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ candidate_id: 'USR_44112_NEHA' })
        });

        // Pull active metrics automatically
        const responseLog = await fetch('/api/dashboard/overview');
        if (responseLog.ok) {
          const stats = await responseLog.json();
          if (stats.active_sessions) {
            setSessions(stats.active_sessions);
          }
        }
      } catch (err) {
        console.warn("Backend API offline or starting up, falling back to local client state buffers.", err);
      }
    };

    seedBackendScenarios();
  }, []);

  // Proctor note persistence
  const addNote = (text: string) => {
    const now = new Date();
    const timeString = now.toISOString().substring(11, 19) + ' UTC';
    const newNote: AuditorNote = {
      id: `N-${Date.now()}`,
      timestamp: timeString,
      caseId: selectedAlertId,
      text: text,
      author: operatorName === 'Operator_44' ? 'OP_SEC_04' : operatorName.substring(0, 10).toUpperCase()
    };
    setNotes(prev => [...prev, newNote]);

    // Also push a record block dynamically to the Audit Ledger for high-stakes compliance!
    const newLedger: LedgerEntry = {
      id: `LG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: `2023-11-24 ${newNote.timestamp.replace(' UTC', '')}.102`,
      type: 'USER_ACTION',
      description: `Case comment appended for Case ID ${selectedAlertId}: "${text.substring(0, 45)}..."`,
      operator: operatorName.toUpperCase(),
      hash: '0x' + Math.floor(Math.random() * 16777215).toString(16).toUpperCase() + '...4A' + Math.floor(Math.random() * 90 + 10)
    };
    setLedgerEntries(prev => [newLedger, ...prev]);
  };

  // Case adjudication: terminating or resolving updates logs and balances state counters
  const handleAdjudicate = (alertId: string, action: 'RESOLVED_FALSE_POSITIVE' | 'TERMINATED_INVALID') => {
    setAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        return {
          ...a,
          resolved: true,
          resolution: action
        };
      }
      return a;
    }));

    // Trigger backend state updates for consistency
    let candidateId = 'USR_89921_ROHAN';
    if (alertId === 'AL-1102') candidateId = 'USR_73322_AARAV';
    else if (alertId === 'AL-9942') candidateId = 'USR_44112_NEHA';
    else if (alertId === 'AL-5510') candidateId = 'USR_00122_SIDD';
    
    fetch(`/api/candidate/${candidateId}/adjudicate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action })
    }).catch(err => console.warn("Adjudication API Offline:", err));

    // Post to Audit Crypt Ledger dynamically
    const newLedger: LedgerEntry = {
      id: `LG-${Date.now().toString().substring(10)}`,
      timestamp: `2023-11-24 ${new Date().toISOString().substring(11, 19)}.002`,
      type: action === 'RESOLVED_FALSE_POSITIVE' ? 'USER_ACTION' : 'SECURITY_ALERT',
      description: `Audit decision: ${action === 'RESOLVED_FALSE_POSITIVE' ? 'Case marked resolved false positive' : 'Exam Session Invalidated & Terminated'} for alert ID ${alertId}.`,
      operator: operatorName.toUpperCase(),
      hash: '0x' + Math.floor(Math.random() * 16777215).toString(16).toUpperCase() + '...E7' + Math.floor(Math.random() * 90 + 10)
    };
    setLedgerEntries(prev => [newLedger, ...prev]);

    // Update session risk distribution based on escalation termination
    if (action === 'TERMINATED_INVALID') {
      setSessions(prev => prev.map(s => {
        // Find Hyderabad session and decrement candidates
        if (s.id === 'EXM-44102-X') {
          return {
            ...s,
            candidatesActive: s.candidatesActive - 1,
            riskHigh: Math.max(0, s.riskHigh - 1)
          };
        }
        return s;
      }));
    }
  };

  // Update center readiness compliance parameters locally
  const updateCenterStatus = (id: string, status: 'PATCHED' | 'PENDING' | 'VULNERABILITY') => {
    setCenters(prev => prev.map(c => {
      if (c.id === id) {
        let pushText = 'Last push: 1m ago';
        let score = 98;
        if (status === 'PENDING') {
          pushText = 'Update Needed';
          score = 92;
        } else if (status === 'VULNERABILITY') {
          pushText = 'Critical Patch Missing';
          score = 64;
        }
        return {
          ...c,
          status,
          readinessScore: score,
          securityPatchStatus: status === 'PATCHED' ? 'Patch 24.2.2 Stable' : status === 'PENDING' ? 'Update Pending' : 'Vulnerability Detected',
          lastPushTime: pushText
        };
      }
      return c;
    }));
  };

  // Triggered when global patch broadcast complete
  const onDeployPatch = () => {
    // Generate system audit log block
    const newLedger: LedgerEntry = {
      id: `LG-${Date.now().toString().substring(10)}`,
      timestamp: `2023-11-24 ${new Date().toISOString().substring(11, 19)}.952`,
      type: 'SYSTEM_EVENT',
      description: `Security Patch SEC-PATCH-24.2.2 applied successfully across EMEA/APAC workstation aggregates.`,
      operator: "SYSTEM_ORCHESTRATOR",
      hash: '0x' + Math.floor(Math.random() * 16777215).toString(16).toUpperCase() + '...FF99'
    };
    setLedgerEntries(prev => [newLedger, ...prev]);
  };

  // Select dynamic workspace page panel
  const renderTabContent = () => {
    switch (activeTab) {
      case ActiveTab.WHY_CDT_X:
        return (
          <WhyCdtxView 
            showTechNotes={showTechNotes} 
            setShowTechNotes={setShowTechNotes} 
            activeTechTab={activeTechTab} 
            setActiveTechTab={setActiveTechTabTech} 
          />
        );
      case ActiveTab.DEMO_SNAPSHOT:
        return <DemoSnapshotCenterView setActiveTab={setActiveTab} />;
      case ActiveTab.CONTROL_ROOM:
        return (
          <ControlRoomView 
            alerts={alerts}
            sessions={sessions}
            setAlerts={setAlerts}
            setSelectedAlertId={setSelectedAlertId}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            currentScenario={currentScenario}
          />
        );
      case ActiveTab.CANDIDATE_PORTAL:
        return <CandidatePortalView setActiveTab={setActiveTab} />;
      case ActiveTab.SYSTEM_ARCHITECTURE:
        return <ArchitectureCenterView />;
      case ActiveTab.INVESTIGATIONS:
        return (
          <InvestigationsView 
            alerts={alerts}
            selectedAlertId={selectedAlertId}
            setSelectedAlertId={setSelectedAlertId}
            notes={notes}
            addNote={addNote}
            onAdjudicate={handleAdjudicate}
            searchQuery={searchQuery}
          />
        );
      case ActiveTab.AUDIT_LEDGER:
        return (
          <AuditLedgerView 
            entries={ledgerEntries}
            searchQuery={searchQuery}
          />
        );
      case ActiveTab.CENTER_MANAGEMENT:
        return (
          <CenterManagementView 
            centers={centers}
            searchQuery={searchQuery}
            onDeployPatch={onDeployPatch}
            updateCenterStatus={updateCenterStatus}
          />
        );
      case ActiveTab.DIGITAL_TWIN:
        return <DigitalTwinExplorerView />;
      case ActiveTab.BEHAVIOR_REPLAY:
        return <BehaviorReplayView />;
      case ActiveTab.EVALUATION:
        return <EvaluationBenchmarkView />;
      case ActiveTab.SYNTHETIC_GENERATOR:
        return <SyntheticGeneratorView />;
      case ActiveTab.BOARDROOM:
        return <BoardroomDashboardView />;
      case ActiveTab.SETTINGS:
        return (
          <SettingsView 
            operatorName={operatorName}
            setOperatorName={setOperatorName}
            operatorRole={operatorRole}
            setOperatorRole={setOperatorRole}
          />
        );
      default:
        return (
          <div className="flex-1 flex items-center justify-center text-white">
            Workspace tab not initialized.
          </div>
        );
    }
  };

  return (
    <div className="bg-[#f8fafc] text-[#0f172a] h-screen w-screen overflow-hidden flex font-sans antialiased text-[13px] theme-light">
      
      {/* Navigation rails */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        operatorName={operatorName}
        operatorRole={operatorRole}
        onOpenTechNotes={() => {
          setActiveTab(ActiveTab.WHY_CDT_X);
          setShowTechNotes(true);
          setTimeout(() => {
            const el = document.getElementById('tech-notes-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }}
      />

      {/* Primary diagnostic workbench container */}
      <div className="flex-grow ml-[280px] flex flex-col h-screen relative overflow-hidden font-sans">
        
        {/* Dynamic header metrics and search box */}
        <Header 
          activeTab={activeTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          alerts={alerts}
          setActiveTab={setActiveTab}
          operatorName={operatorName}
          onScenarioSelect={handleScenarioSelect}
          currentScenario={currentScenario}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />

        {/* Command Palette Modal overlay */}
        <CommandPalette 
          isOpen={isCommandPaletteOpen} 
          onClose={() => setIsCommandPaletteOpen(false)} 
          onSelectAction={handleCommandSelect} 
        />

        {/* Dynamic Panel Screen & Walkthrough */}
        <div className="flex-grow flex overflow-hidden mt-10 bg-[#f8fafc]">
          <main className="flex-1 overflow-hidden bg-[#f8fafc]">
            {renderTabContent()}
          </main>
          <JudgeWalkthroughPanel 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleScenarioSelect={handleScenarioSelect}
            setSelectedAlertId={setSelectedAlertId}
            setSearchQuery={setSearchQuery}
            currentScenario={currentScenario}
          />
        </div>

        {/* Immutability compliance footer bar */}
        <footer className="h-6 w-full bg-white border-t border-[#E2E8F0] px-6 flex items-center justify-between text-[10px] font-mono uppercase text-[#475569] select-none shrink-0 z-40">
          <div className="flex gap-4 items-center">
            <span className="text-[#2563EB] flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              SECURE CONNECTED AGENTS
            </span>
            <span>ENC: TLS 1.3</span>
            <span>REGION: ASIA-PACIFIC</span>
          </div>

          <div className="flex gap-4 items-center font-bold">
            <span>PLATFORM: V4.2</span>
            <span id="live-clock" className="font-bold text-[#2563EB]">
              {liveClockTime}
            </span>
          </div>
        </footer>

      </div>
    </div>
  );
}
