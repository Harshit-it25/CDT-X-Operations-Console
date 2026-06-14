/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ActiveTab {
  DEMO_SNAPSHOT = 'DEMO_SNAPSHOT',
  CONTROL_ROOM = 'CONTROL_ROOM',
  CANDIDATE_PORTAL = 'CANDIDATE_PORTAL',
  SYSTEM_ARCHITECTURE = 'SYSTEM_ARCHITECTURE',
  INVESTIGATIONS = 'INVESTIGATIONS',
  AUDIT_LEDGER = 'AUDIT_LEDGER',
  CENTER_MANAGEMENT = 'CENTER_MANAGEMENT',
  DIGITAL_TWIN = 'DIGITAL_TWIN',
  EVALUATION = 'EVALUATION',
  BEHAVIOR_REPLAY = 'BEHAVIOR_REPLAY',
  SYNTHETIC_GENERATOR = 'SYNTHETIC_GENERATOR',
  BOARDROOM = 'BOARDROOM',
  SETTINGS = 'SETTINGS',
}

export interface SecurityAlert {
  id: string;
  type: string;
  timestamp: string;
  description: string;
  centerId: string;
  centerName: string;
  candidateName?: string;
  candidateId?: string;
  riskScore: number;
  resolved: boolean;
  resolution?: string;
  category: 'IMPERSONATION' | 'AI_ASSISTANCE' | 'COLLUSION' | 'COGNITIVE';
  stage?: 'NEW' | 'UNDER_REVIEW' | 'EVIDENCE_COLLECTED' | 'RECOMMENDATION_ISSUED' | 'ACTION_TAKEN' | 'CLOSED';
  analystName?: string;
  confidenceScore?: number;
  elapsedTimeSeconds?: number;
  recommendedAction?: string;
  evidenceUsed?: string[];
  whyItHappened?: string;
  whatHappened?: string;
}

export interface ExamSession {
  id: string;
  location: string;
  candidatesActive: number;
  candidatesTotal: number;
  progress: number;
  riskHigh: number;
  riskMed: number;
  riskLow: number;
  status: 'STABLE' | 'ANOMALY';
}

export interface LedgerEntry {
  id: string;
  timestamp: string;
  type: 'DATA_EXPORT' | 'USER_ACTION' | 'SECURITY_ALERT' | 'SYSTEM_EVENT';
  description: string;
  operator: string;
  hash: string;
}

export interface TestingCenter {
  id: string;
  name: string;
  tier: string;
  readinessScore: number;
  workstationsCount: number;
  osVersion: string;
  biometricHardware: string;
  securityPatchStatus: string;
  lastPushTime: string;
  personnelCode: string;
  personnelName: string;
  status: 'PATCHED' | 'PENDING' | 'VULNERABILITY';
}

export interface AuditorNote {
  id: string;
  timestamp: string;
  caseId: string;
  text: string;
  author: string;
}
