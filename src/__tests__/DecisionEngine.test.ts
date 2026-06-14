/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect } from 'vitest';
import { initializeAlertIntelligence, tickAlertsDecisionLifecycle } from '../DecisionEngine';
import { SecurityAlert } from '../types';

describe('DecisionEngine', () => {
  const mockAlert: SecurityAlert = {
    id: "AL-1234",
    type: "TEST_ALERT",
    timestamp: "10:00:00",
    description: "Test description",
    centerId: "TEST-01",
    centerName: "Test Center",
    candidateName: "John Doe",
    candidateId: "USR_1234_JOHN",
    riskScore: 85,
    resolved: false,
    category: "IMPERSONATION"
  };

  it('should initialize alert intelligence properly', () => {
    const initialized = initializeAlertIntelligence(mockAlert, 0);
    expect(initialized.stage).toBe('NEW');
    expect(initialized.analystName).toBeDefined();
    expect(initialized.confidenceScore).toBeDefined();
    expect(initialized.evidenceUsed).toContain("Continuous Keystroke Cadence Drift");
    expect(initialized.whatHappened).toBeDefined();
    expect(initialized.whyItHappened).toBeDefined();
  });

  it('should advance alert lifecycle stages', () => {
    const alerts = [initializeAlertIntelligence(mockAlert, 0)];
    expect(alerts[0].stage).toBe('NEW');
    expect(alerts[0].elapsedTimeSeconds).toBe(0);

    // Tick by 6 seconds (should move to UNDER_REVIEW since >= 5)
    let result = tickAlertsDecisionLifecycle(alerts, 6);
    expect(result.alerts[0].stage).toBe('UNDER_REVIEW');
    expect(result.alerts[0].elapsedTimeSeconds).toBe(6);
    expect(result.newLedgerEntries.length).toBe(1);
    expect(result.newLedgerEntries[0].type).toBe('SECURITY_ALERT');
    expect(result.newLedgerEntries[0].description).toContain("Analyst");

    // Tick by another 7 seconds (total 13, should move to EVIDENCE_COLLECTED since >= 12)
    result = tickAlertsDecisionLifecycle(result.alerts, 7);
    expect(result.alerts[0].stage).toBe('EVIDENCE_COLLECTED');
    expect(result.alerts[0].elapsedTimeSeconds).toBe(13);
  });

  it('should close resolved alerts', () => {
    const alerts = [initializeAlertIntelligence(mockAlert, 0)];
    alerts[0].resolved = true;

    const result = tickAlertsDecisionLifecycle(alerts, 3);
    expect(result.alerts[0].stage).toBe('CLOSED');
    expect(result.newLedgerEntries.length).toBe(1);
    expect(result.newLedgerEntries[0].type).toBe('USER_ACTION');
    expect(result.newLedgerEntries[0].description).toContain("Case Closed");
  });
});
