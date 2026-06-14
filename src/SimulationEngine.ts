/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SecurityAlert, LedgerEntry, ExamSession, AuditorNote } from './types';

export interface KPIStats {
  activeCandidates: number;
  secureCount: number;
  warningCount: number;
  criticalCount: number;
  aiAlertCount: number;
  collusionAlertCount: number;
  identityDriftCount: number;
}

// Simulated constant pools for names, stations, and centers
const FIRST_NAMES = ["Sohan", "Kabir", "Rohan", "Aarav", "Neha", "Pooja", "Vikram", "Anjali", "Karan", "Siddharth", "Sunita", "Rahul", "Aditya", "Meera", "Yash", "Rhea"];
const LAST_NAMES = ["Patil", "Deshmukh", "Kulkarni", "Joshi", "Sharma", "Jadhav", "Iyer", "Nair", "Mehta", "Bose", "Rao", "Reddy", "Verma", "Sen", "Pillai", "Gupta"];
const CENTERS = [
  { id: "SOL-01", name: "Solapur Center" },
  { id: "HYD-02", name: "Hyderabad Center" },
  { id: "PUN-03", name: "Pune Center" },
  { id: "MUM-01", name: "Mumbai Center" }
];

export function getRandomName(): string {
  const f = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const l = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  return `${f} ${l}`;
}

export function generateRandomAlert(
  scenario: 'NORMAL' | 'IMPERSONATION' | 'AI_ASSISTED' | 'COLLUSION',
  currentCount: number
): SecurityAlert {
  const uniqueSuffix = Math.floor(Math.random() * 90000) + 10000;
  const id = `AL-${uniqueSuffix}`;
  const center = CENTERS[Math.floor(Math.random() * CENTERS.length)];
  const candidateName = getRandomName();
  const stationNum = Math.floor(Math.random() * 24) + 1;
  const stationLabel = `${center.id.substring(0, 3)}-${stationNum < 10 ? '0' + stationNum : stationNum}`;
  const timestamp = new Date().toISOString().substring(11, 19);

  let type = "SYSTEM_EVENT";
  let description = "";
  let riskScore = 40 + Math.floor(Math.random() * 30);
  let category: 'IMPERSONATION' | 'AI_ASSISTANCE' | 'COLLUSION' | 'COGNITIVE' = 'IMPERSONATION';

  switch (scenario) {
    case 'IMPERSONATION': {
      category = 'IMPERSONATION';
      riskScore = 85 + Math.floor(Math.random() * 15);
      const types = ["Identity Drift Alert", "Behavior Mismatch Detected", "Verification Failure Flag", "Profile Divergence Trigger"];
      type = types[Math.floor(Math.random() * types.length)];
      const details = [
        `Keystroke cadence mismatch on station #${stationLabel} exceeds historical profile parameters (Candidate: ${candidateName})`,
        `Mouse motion trajectory deviation on station #${stationLabel} indicates alternative operator signature`,
        `Biometric continuous check failed for workstation #${stationLabel}. Hand geometry and typing speed mismatch.`
      ];
      description = details[Math.floor(Math.random() * details.length)];
      break;
    }
    case 'AI_ASSISTED': {
      category = 'AI_ASSISTANCE';
      riskScore = 70 + Math.floor(Math.random() * 25);
      const types = ["Stylometry Shift Checked", "Vocabulary Explosion Warning", "Response Velocity Spike", "Prompt Leakage Signal"];
      type = types[Math.floor(Math.random() * types.length)];
      const details = [
        `Typing composition vocabulary density on station #${stationLabel} shifted dynamically (Candidate: ${candidateName})`,
        `Complexity level question solved in under 280ms on #${stationLabel}, indicating copy-paste clipboard inject`,
        `Linguistic style match collapsed to 18% compared to initial baseline on Station #${stationLabel}`
      ];
      description = details[Math.floor(Math.random() * details.length)];
      break;
    }
    case 'COLLUSION': {
      category = 'COLLUSION';
      riskScore = 75 + Math.floor(Math.random() * 22);
      const types = ["Collusion Cluster Alarm", "Coordinated Focus Loss Error", "Simultaneous Answer Sync"];
      type = types[Math.floor(Math.random() * types.length)];
      const clusters = [
        `SOL-03 & SOL-05 & SOL-07`,
        `HYD-12 & HYD-13 & HYD-15`,
        `PUN-09 & PUN-10 & PUN-11`
      ];
      const targetCluster = clusters[Math.floor(Math.random() * clusters.length)];
      description = `High-stakes answers timing sequencing overlap. Correlated cluster ${targetCluster} showing identical cursor paths.`;
      break;
    }
    default: {
      category = Math.random() < 0.3 ? 'COGNITIVE' : 'IMPERSONATION';
      riskScore = 20 + Math.floor(Math.random() * 30);
      type = "Continuous Verification Stream";
      description = `Baseline telemetry alignment checked healthy for workstation #${stationLabel} (Candidate: ${candidateName})`;
      break;
    }
  }

  return {
    id,
    type,
    timestamp,
    description,
    centerId: center.id,
    centerName: center.name,
    candidateName,
    candidateId: `USR_${10000 + Math.floor(Math.random() * 90000)}_${candidateName.split(' ')[0].toUpperCase()}`,
    riskScore,
    resolved: false,
    category
  };
}

export function generateLedgerForAlert(alert: SecurityAlert): LedgerEntry {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 23);
  const hash = '0x' + Array.from({length: 8}, () => Math.floor(Math.random()*16).toString(16)).join('').toUpperCase() + '...' + Math.floor(Math.random()*90 + 10);
  
  return {
    id: `LG-${Date.now().toString().substring(11) + Math.floor(Math.random() * 10)}`,
    timestamp,
    type: 'SECURITY_ALERT',
    description: `Automated compliance validation: Recorded active security block of type ${alert.type} on Station ID ${alert.id}. Security cryptographic ledger updated securely.`,
    operator: "CDT-X CO-AUDITOR",
    hash
  };
}

export function generateSystemLedger(): LedgerEntry {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 23);
  const hash = '0x' + Array.from({length: 8}, () => Math.floor(Math.random()*16).toString(16)).join('').toUpperCase() + '...' + Math.floor(Math.random()*90 + 10);
  
  const events = [
    "Biometric credentials pipeline verification completed on Node-12 EMEA edge.",
    "Cryptographic block consensus synchronized successfully across all registered sub-registers.",
    "Continuous keystroke cadence verification parameters recalulated according to regional baseline average.",
    "System security ledger rotational snapshot backup stored safely on isolated hypervisor vault.",
    "L3 Security Operator established backup tunnel with satellite connection."
  ];

  return {
    id: `LG-${Date.now().toString().substring(11) + Math.floor(Math.random() * 10)}`,
    timestamp,
    type: 'SYSTEM_EVENT',
    description: events[Math.floor(Math.random() * events.length)],
    operator: "SYSTEM_CORE",
    hash
  };
}

// Keeps local states of KPIs that we fluctuate realistically
let localKPIs: KPIStats = {
  activeCandidates: 2514,
  secureCount: 2312,
  warningCount: 152,
  criticalCount: 50,
  aiAlertCount: 18,
  collusionAlertCount: 12,
  identityDriftCount: 20
};

export function updateKPIFluctuations(scenario: 'NORMAL' | 'IMPERSONATION' | 'AI_ASS_MODE' | 'COLLUSION' | 'AI_ASSISTED'): KPIStats {
  // Candidate delta
  const deltaCandidates = Math.floor((Math.random() - 0.48) * 6); // slight drift up
  localKPIs.activeCandidates = Math.max(2200, Math.min(2800, localKPIs.activeCandidates + deltaCandidates));

  // Determine distributions based on active scenario mode
  let securePct = 0.92;
  let warnPct = 0.06;
  let critPct = 0.02;

  if (scenario === 'IMPERSONATION') {
    securePct = 0.70;
    warnPct = 0.15;
    critPct = 0.15;
    localKPIs.identityDriftCount += Math.random() < 0.6 ? 1 : 0;
  } else if (scenario === 'AI_ASSISTED' || scenario === 'AI_ASS_MODE') {
    securePct = 0.75;
    warnPct = 0.10;
    critPct = 0.15;
    localKPIs.aiAlertCount += Math.random() < 0.5 ? 1 : 0;
  } else if (scenario === 'COLLUSION') {
    securePct = 0.60;
    warnPct = 0.20;
    critPct = 0.20;
    localKPIs.collusionAlertCount += Math.random() < 0.7 ? 1 : 0;
  } else { // NORMAL
    securePct = 0.92;
    warnPct = 0.06;
    critPct = 0.02;
  }

  // Calculate matching stats based on total
  const total = localKPIs.activeCandidates;
  localKPIs.secureCount = Math.floor(total * (securePct + (Math.random() - 0.5) * 0.02));
  localKPIs.warningCount = Math.floor(total * (warnPct + (Math.random() - 0.5) * 0.01));
  localKPIs.criticalCount = total - localKPIs.secureCount - localKPIs.warningCount;

  if (localKPIs.criticalCount < 0) localKPIs.criticalCount = 2;

  return { ...localKPIs };
}

export function mutateSessions(
  prevSessions: ExamSession[],
  scenario: 'NORMAL' | 'IMPERSONATION' | 'AI_ASSISTED' | 'COLLUSION'
): ExamSession[] {
  return prevSessions.map(session => {
    // 1. Progress moves forward slightly over time
    let progress = session.progress;
    if (progress < 100 && Math.random() < 0.25) {
      progress = Math.min(100, progress + 1);
    }

    // 2. Candidates Active fluctuates slightly
    let candidatesActive = session.candidatesActive;
    if (Math.random() < 0.2) {
      const diff = Math.floor((Math.random() - 0.5) * 4);
      candidatesActive = Math.max(10, Math.min(session.candidatesTotal, candidatesActive + diff));
    }

    // 3. Risks distribution changes based on active mode
    let riskHigh = session.riskHigh;
    let riskMed = session.riskMed;
    
    if (scenario === 'NORMAL') {
      if (Math.random() < 0.15) {
        riskHigh = Math.max(0, riskHigh + (Math.random() < 0.3 ? 1 : -1));
        riskMed = Math.max(0, riskMed + (Math.random() < 0.4 ? 1 : -1));
      }
    } else if (scenario === 'IMPERSONATION') {
      if (session.id === 'EXM-88219-B') { // Solapur
        riskHigh = Math.max(2, Math.min(10, riskHigh + (Math.random() < 0.6 ? 1 : -1)));
        riskMed = Math.max(8, Math.min(25, riskMed + (Math.random() < 0.6 ? 1 : -1)));
      }
    } else if (scenario === 'AI_ASSISTED') {
      if (session.id === 'EXM-44102-X') { // Hyderabad
        riskHigh = Math.max(1, Math.min(8, riskHigh + (Math.random() < 0.6 ? 1 : -1)));
        riskMed = Math.max(4, Math.min(18, riskMed + (Math.random() < 0.6 ? 1 : -1)));
      }
    } else if (scenario === 'COLLUSION') {
      if (session.id === 'EXM-10294-Z') { // Pune
        riskHigh = Math.max(2, Math.min(12, riskHigh + (Math.random() < 0.7 ? 1 : -1)));
        riskMed = Math.max(6, Math.min(24, riskMed + (Math.random() < 0.6 ? 1 : -1)));
      }
    }

    const riskLow = Math.max(0, candidatesActive - riskHigh - riskMed);
    const status = (riskHigh > 2 || riskMed > 12) ? 'ANOMALY' : 'STABLE';

    return {
      ...session,
      progress,
      candidatesActive,
      riskHigh,
      riskMed,
      riskLow,
      status
    };
  });
}
