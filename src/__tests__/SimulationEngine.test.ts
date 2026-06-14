/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect } from 'vitest';
import { 
  generateRandomAlert, 
  generateLedgerForAlert, 
  generateSystemLedger, 
  updateKPIFluctuations, 
  mutateSessions 
} from '../SimulationEngine';
import { ExamSession } from '../types';

describe('SimulationEngine', () => {
  it('should generate correct alert shapes and risk score ranges', () => {
    // Test NORMAL scenario
    const normalAlert = generateRandomAlert('NORMAL', 0);
    expect(normalAlert.id).toMatch(/^AL-\d{5}$/);
    expect(normalAlert.riskScore).toBeGreaterThanOrEqual(20);
    expect(normalAlert.riskScore).toBeLessThanOrEqual(50);
    expect(normalAlert.category).toBeDefined();

    // Test IMPERSONATION scenario
    const impAlert = generateRandomAlert('IMPERSONATION', 0);
    expect(impAlert.category).toBe('IMPERSONATION');
    expect(impAlert.riskScore).toBeGreaterThanOrEqual(85);
    expect(impAlert.riskScore).toBeLessThanOrEqual(100);

    // Test AI_ASSISTED scenario
    const aiAlert = generateRandomAlert('AI_ASSISTED', 0);
    expect(aiAlert.category).toBe('AI_ASSISTANCE');
    expect(aiAlert.riskScore).toBeGreaterThanOrEqual(70);
    expect(aiAlert.riskScore).toBeLessThanOrEqual(95);

    // Test COLLUSION scenario
    const collAlert = generateRandomAlert('COLLUSION', 0);
    expect(collAlert.category).toBe('COLLUSION');
    expect(collAlert.riskScore).toBeGreaterThanOrEqual(75);
    expect(collAlert.riskScore).toBeLessThanOrEqual(97);
  });

  it('should generate ledger entry for alert', () => {
    const alert = generateRandomAlert('IMPERSONATION', 0);
    const ledger = generateLedgerForAlert(alert);
    expect(ledger.id).toMatch(/^LG-\d+/);
    expect(ledger.type).toBe('SECURITY_ALERT');
    expect(ledger.description).toContain(alert.type);
    expect(ledger.description).toContain(alert.id);
  });

  it('should generate system ledger entry', () => {
    const ledger = generateSystemLedger();
    expect(ledger.id).toMatch(/^LG-\d+/);
    expect(ledger.type).toBe('SYSTEM_EVENT');
    expect(ledger.operator).toBe('SYSTEM_CORE');
  });

  it('should update KPI fluctuations based on scenario', () => {
    const normalKPIs = updateKPIFluctuations('NORMAL');
    expect(normalKPIs.activeCandidates).toBeGreaterThanOrEqual(2200);
    expect(normalKPIs.activeCandidates).toBeLessThanOrEqual(2800);

    const impKPIs = updateKPIFluctuations('IMPERSONATION');
    expect(impKPIs.identityDriftCount).toBeGreaterThanOrEqual(20);
  });

  it('should mutate sessions realistically', () => {
    const initialSessions: ExamSession[] = [
      {
        id: "EXM-88219-B",
        location: "Solapur Central Hub",
        candidatesActive: 100,
        candidatesTotal: 150,
        progress: 50,
        riskHigh: 0,
        riskMed: 0,
        riskLow: 100,
        status: "STABLE"
      }
    ];

    const mutated = mutateSessions(initialSessions, 'IMPERSONATION');
    expect(mutated[0].progress).toBeGreaterThanOrEqual(50);
    expect(mutated[0].progress).toBeLessThanOrEqual(51);
  });
});
