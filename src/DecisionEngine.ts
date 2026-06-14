/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SecurityAlert, LedgerEntry } from './types';

const ANALYSTS = [
  "Analyst Sarah K.",
  "Lead Investigator Anil P.",
  "AI Monitor Omega",
  "Senior Auditor Ramesh G.",
  "L3 Chief Proctor Devendra M.",
  "System Trust Arbitrator Beta"
];

function getCategoryData(category: 'IMPERSONATION' | 'AI_ASSISTANCE' | 'COLLUSION' | 'COGNITIVE', candidateName: string) {
  let recommendedAction = "Secondary Verification Required";
  let confidenceScore = 94;
  let evidenceUsed = ["Continuous Keystroke Cadence Drift", "Mouse trajectory vector asymmetry"];
  let whatHappened = "Typing signature drift beyond permissible tolerance limits.";
  let whyItHappened = "Alternative rhythm matching coefficient dropped below baseline threshold, indicating proxy operator hijack.";

  if (category === 'AI_ASSISTANCE') {
    recommendedAction = "Manual Review of Writing Consistency";
    confidenceScore = 91;
    evidenceUsed = ["Stylometry Density Spike", "Vocabulary richness index explosion", "Pacing regularity index of 99.2%"];
    whatHappened = "Text entry patterns mimic LLM syntax models.";
    whyItHappened = "Sudden linguistic variation coupled with copy-paste events indicate clipboard external pipeline injection.";
  } else if (category === 'COLLUSION') {
    recommendedAction = "Escalate Investigation to Regional Lead";
    confidenceScore = 96;
    evidenceUsed = ["Soundwave acoustic correlation", "Synchronous active tab change delays", "Cross-station cursor trajectory match"];
    whatHappened = "Dual workstation collaborative sequence found.";
    whyItHappened = "Simultaneous question-solving cycles and matching incorrect responses indicate active side-channel peer coordination.";
  } else if (category === 'COGNITIVE') {
    recommendedAction = "Session Invalidation / Direct Auditing";
    confidenceScore = 98;
    evidenceUsed = ["Response velocity threshold breach", "250ms answer solving logs", "Focus-loss evasion timer"];
    whatHappened = "Cognitive speed anomaly threshold breach.";
    whyItHappened = "Candidate solved multiple hard analytical tasks in milliseconds, indicating automated browser-state pre-injection script.";
  }

  return { recommendedAction, confidenceScore, evidenceUsed, whatHappened, whyItHappened };
}

export function initializeAlertIntelligence(alert: SecurityAlert, count: number): SecurityAlert {
  const name = alert.candidateName || "Under Observation User";
  const { recommendedAction, confidenceScore, evidenceUsed, whatHappened, whyItHappened } = getCategoryData(alert.category, name);
  
  return {
    ...alert,
    stage: alert.stage || 'NEW',
    analystName: alert.analystName || ANALYSTS[(count + alert.id.charCodeAt(alert.id.length - 1)) % ANALYSTS.length],
    confidenceScore: alert.confidenceScore || (confidenceScore - 2 + Math.floor(Math.random() * 5)),
    elapsedTimeSeconds: alert.elapsedTimeSeconds || 0,
    recommendedAction: alert.recommendedAction || recommendedAction,
    evidenceUsed: alert.evidenceUsed || evidenceUsed,
    whyItHappened: alert.whyItHappened || whyItHappened,
    whatHappened: alert.whatHappened || whatHappened
  };
}

export function tickAlertsDecisionLifecycle(
  prevAlerts: SecurityAlert[],
  tickSeconds: number = 3
): { alerts: SecurityAlert[]; newLedgerEntries: LedgerEntry[] } {
  const newLedgerEntries: LedgerEntry[] = [];
  
  const alerts = prevAlerts.map((alert, idx) => {
    // Make sure alert has all Decision Intelligence properties initialized
    let initialized = alert;
    if (!alert.stage) {
      initialized = initializeAlertIntelligence(alert, idx);
    }

    if (initialized.resolved) {
      if (initialized.stage !== 'CLOSED') {
        const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 23);
        const hash = '0x' + Array.from({length: 8}, () => Math.floor(Math.random()*16).toString(16)).join('').toUpperCase() + '...' + Math.floor(Math.random()*90 + 10);
        newLedgerEntries.push({
          id: `LG-DEC-${Date.now().toString().substring(11)}-${alert.id}`,
          timestamp,
          type: 'USER_ACTION',
          description: `Case Closed: Audit Decision of [${initialized.recommendedAction}] officially resolved and saved to secure ledger.`,
          operator: initialized.analystName?.toUpperCase() || "CDT-X OPERATIONS",
          hash
        });
        return {
          ...initialized,
          stage: 'CLOSED',
          elapsedTimeSeconds: (initialized.elapsedTimeSeconds || 0) + tickSeconds
        } as SecurityAlert;
      }
      return initialized;
    }

    const currentSecs = (initialized.elapsedTimeSeconds || 0) + tickSeconds;
    let nextStage: 'NEW' | 'UNDER_REVIEW' | 'EVIDENCE_COLLECTED' | 'RECOMMENDATION_ISSUED' | 'ACTION_TAKEN' | 'CLOSED' = initialized.stage || 'NEW';
    let changed = false;

    if (nextStage === 'NEW' && currentSecs >= 5) {
      nextStage = 'UNDER_REVIEW';
      changed = true;
    } else if (nextStage === 'UNDER_REVIEW' && currentSecs >= 12) {
      nextStage = 'EVIDENCE_COLLECTED';
      changed = true;
    } else if (nextStage === 'EVIDENCE_COLLECTED' && currentSecs >= 22) {
      nextStage = 'RECOMMENDATION_ISSUED';
      changed = true;
    } else if (nextStage === 'RECOMMENDATION_ISSUED' && currentSecs >= 35) {
      nextStage = 'ACTION_TAKEN';
      changed = true;
    } else if (nextStage === 'ACTION_TAKEN' && currentSecs >= 50) {
      nextStage = 'CLOSED';
      changed = true;
    }

    if (changed) {
      const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 23);
      const hash = '0x' + Array.from({length: 8}, () => Math.floor(Math.random()*16).toString(16)).join('').toUpperCase() + '...' + Math.floor(Math.random()*90 + 10);
      
      let description = `Compliance Decision Trace [Station ID ${alert.id}]: Case progressed to ${nextStage}.`;
      if (nextStage === 'UNDER_REVIEW') {
        description = `Investigation Opened: Analyst ${initialized.analystName} assigned to evaluate risk indicators on Station ID ${alert.id}.`;
      } else if (nextStage === 'EVIDENCE_COLLECTED') {
        description = `Evidence Compiled: Forensic indicators registered: [${(initialized.evidenceUsed || []).join(', ')}] on Station ID ${alert.id}.`;
      } else if (nextStage === 'RECOMMENDATION_ISSUED') {
        description = `Recommendation Issued: Recommended action [${initialized.recommendedAction}] with calculated ${initialized.confidenceScore}% decision confidence.`;
      } else if (nextStage === 'ACTION_TAKEN') {
        description = `Decision Approved & Executed: System executed autonomous defensive action: [${initialized.recommendedAction}] for Station ID ${alert.id}.`;
      } else if (nextStage === 'CLOSED') {
        description = `Case Audit Resolved: Automated active lifecycle complete. Retained secure hashes for verification.`;
      }

      newLedgerEntries.push({
        id: `LG-DEC-${Date.now().toString().substring(11)}-${alert.id}-${nextStage}`,
        timestamp,
        type: 'SECURITY_ALERT',
        description,
        operator: initialized.analystName?.toUpperCase() || "CDT-X CENTRAL",
        hash
      });
    }

    return {
      ...initialized,
      stage: nextStage,
      elapsedTimeSeconds: currentSecs
    } as SecurityAlert;
  });

  return { alerts, newLedgerEntries };
}
