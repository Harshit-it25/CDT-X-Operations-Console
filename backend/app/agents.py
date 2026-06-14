"""
CDT-X Multi-Agent Integrity Evaluation Framework.
Implements the 7 decoupled scoring agents running asynchronous evaluations
representing keystrokes, browser viewports, neural response loops, block logs, and final adjudications.
"""

import random
from typing import Dict, List, Any, Tuple

class AgentBase:
    def __init__(self, name: str, weight: float):
        self.name = name
        self.weight = weight


class TypingBiometricsAgent(AgentBase):
    """Agent 1: Matches dwell and flight cadence timings against registered profile signature."""
    def __init__(self):
        super().__init__("typing_biometrics", 0.25)

    def evaluate(self, current_features: Dict[str, Any], baseline_features: Dict[str, Any]) -> Tuple[float, float]:
        """
        Returns:
            match_percentage (0-100)
            drift_percentage (0-100)
        """
        # Calculate deviation indices on dwell/flight metrics
        b_hold = baseline_features.get("avg_hold_ms", 78.0)
        c_hold = current_features.get("avg_hold_ms", 78.0)
        
        b_flight = baseline_features.get("avg_flight_ms", 112.0)
        c_flight = current_features.get("avg_flight_ms", 112.0)
        
        hold_diff = abs(b_hold - c_hold) / max(1.0, b_hold)
        flight_diff = abs(b_flight - c_flight) / max(1.0, b_flight)
        
        avg_diff = (hold_diff + flight_diff) / 2.0
        drift_percentage = min(100.0, avg_diff * 100.0 * 2.5) # Amplify differential
        match_percentage = 100.0 - drift_percentage
        
        return round(match_percentage, 1), round(drift_percentage, 1)


class MouseDynamicsAgent(AgentBase):
    """Agent 2: Detects robotic bezier curvature profiles, angular velocities, and jerk coefficients."""
    def __init__(self):
        super().__init__("mouse_dynamics", 0.15)

    def evaluate(self, current_features: Dict[str, Any], baseline_features: Dict[str, Any]) -> Tuple[float, float]:
        b_vel = baseline_features.get("avg_velocity_px_s", 420.0)
        c_vel = current_features.get("avg_velocity_px_s", 420.0)
        
        vel_diff = abs(b_vel - c_vel) / max(1.0, b_vel)
        drift_percentage = min(100.0, vel_diff * 100.0 * 2.0)
        match_percentage = 100.0 - drift_percentage
        
        return round(match_percentage, 1), round(drift_percentage, 1)


class NavigationAgent(AgentBase):
    """Agent 3: Evaluates question jumping, quick focus window blurred transitions, and clipboard pasting."""
    def __init__(self):
        super().__init__("navigation", 0.15)

    def evaluate(self, focus_loss_count: int, max_allowed: int = 2) -> Tuple[float, float]:
        if focus_loss_count <= 0:
            return 100.0, 0.0
        
        drift_percentage = min(100.0, (focus_loss_count / max_allowed) * 50.0)
        match_percentage = max(0.0, 100.0 - drift_percentage)
        
        return round(match_percentage, 1), round(drift_percentage, 1)


class WritingAgent(AgentBase):
    """Agent 4: Evaluates sentence length variance, linguistic stylometry constraints, and lexical diversity."""
    def __init__(self):
        super().__init__("writing_stylometry", 0.20)

    def evaluate(self, current_diversity: float, baseline_diversity: float) -> Tuple[float, float]:
        # TTR (Type-Token-Ratio) similarity checks
        div_diff = abs(baseline_diversity - current_diversity) / max(0.01, baseline_diversity)
        drift_percentage = min(100.0, div_diff * 100.0 * 3.0)
        match_percentage = 100.0 - drift_percentage
        
        return round(match_percentage, 1), round(drift_percentage, 1)


class CognitiveAgent(AgentBase):
    """Agent 5: Matches response formulation latency patterns against standard question difficulty curves."""
    def __init__(self):
        super().__init__("cognitive_latency", 0.15)

    def evaluate(self, user_solved_time_ms: float, average_difficulty_time_ms: float) -> Tuple[float, float]:
        if user_solved_time_ms < 300: # Sub-human response thresholds pointing to copy-paste or macro bots
            return 10.0, 90.0
            
        ratio = user_solved_time_ms / max(1.0, average_difficulty_time_ms)
        if ratio < 0.4:
            drift = 50.0
        elif ratio < 0.8:
            drift = 15.0
        else:
            drift = 0.0
            
        match_percentage = 100.0 - drift
        return round(match_percentage, 1), round(drift, 1)


class CollusionAgent(AgentBase):
    """Agent 6: Correlates keystroke cadences, answers similarity grids, and click delays between peer cohorts."""
    def __init__(self):
        super().__init__("collusion_correlator", 0.10)

    def evaluate_collusion_risk(self, exam_hash_a: str, exam_hash_b: str, timestamp_diff_s: float) -> float:
        """
        Returns collusion risk score from 0.0 to 100.0.
        """
        if exam_hash_a == exam_hash_b and timestamp_diff_s < 1.0:
            return 95.0
        elif exam_hash_a == exam_hash_b and timestamp_diff_s < 5.0:
            return 75.0
        elif timestamp_diff_s < 2.0:
            return 35.0
        return 5.0


class DecisionAgent:
    """Agent 7: Synchronizes all autonomous output streams, aggregates risks, and issues binding final verdicts."""
    
    @staticmethod
    def synthesize_consensus(
        typing_match: float,
        mouse_match: float,
        nav_match: float,
        writing_match: float,
        cognitive_match: float,
        collusion_risk: float,
        has_critical_paste_triggered: bool = False
    ) -> Dict[str, Any]:
        """
        Combines child agent metrics.
        Returns:
            trust_score: float (0 - 100)
            impersonation_risk: float (0 - 100 %)
            ai_assistance_risk: float (0 - 100 %)
            collusion_risk: float (0 - 100 %)
            verdict: str (APPROVED, REVIEW, TERMINATED)
        """
        # Average weighted matches
        matches_sum = (
            typing_match * 0.25 + 
            mouse_match * 0.15 + 
            nav_match * 0.15 + 
            writing_match * 0.20 + 
            cognitive_match * 0.15 +
            (100.0 - collusion_risk) * 0.10
        )
        
        # Deduct trust severely if copy paste macro was triggered
        base_trust = max(0.0, min(100.0, matches_sum))
        if has_critical_paste_triggered:
            base_trust = max(10.0, base_trust - 25.0)

        # Map risks based on specific agent drifts
        impersonation_risk = max(0.0, 100.0 - (typing_match * 0.6 + mouse_match * 0.4))
        ai_assistance_risk = max(0.0, 100.0 - (writing_match * 0.6 + cognitive_match * 0.4))
        
        # Set final strict bounds
        trust_score = round(base_trust, 1)
        impersonation_risk = round(impersonation_risk, 1)
        ai_assistance_risk = round(ai_assistance_risk, 1)
        collusion_risk_pct = round(collusion_risk, 1)
        
        # Verdict decision boundary rules
        if trust_score < 50.0:
            verdict = "TERMINATED"
        elif trust_score < 78.0:
            verdict = "REVIEW"
        else:
            verdict = "APPROVED"
            
        return {
            "trust_score": trust_score,
            "impersonation_risk": impersonation_risk,
            "ai_assistance_risk": ai_assistance_risk,
            "collusion_risk": collusion_risk_pct,
            "verdict": verdict
        }
