"""
CDT-X Behavioral Integrity Simulator Engine.
Synthetically generates realistic physical stream patterns corresponding to:
1. Normal Candidate (Identity aligned, smooth keystroke rhythms, high trust)
2. Impersonated Candidate (Mismatching typing cadence, sharp geometric cursor lines, low trust)
3. AI Assisted Student (Clipboard pasting, rapid burst sentence structures, high perplexity)
4. Collusion Ring (Synthesized timing match grids, matching answers sequences, low trust)
"""

import random
from typing import Dict, Any, List

class CDTIntegritySimulator:
    
    @staticmethod
    def simulate_normal_candidate(candidate_id: str) -> Dict[str, Any]:
        """
        Generates normal metrics: Match: 90-100.
        Smooth curves.
        """
        rng = random.Random(sum(ord(c) for c in candidate_id))
        
        typing_match = rng.uniform(91.0, 96.5)
        mouse_match = rng.uniform(88.0, 93.5)
        nav_match = rng.uniform(94.0, 98.0)
        writing_match = rng.uniform(91.0, 95.5)
        cognitive_match = rng.uniform(90.0, 96.0)
        collusion_risk = rng.uniform(1.0, 8.5)
        
        # decision synthesis logic
        w_avg = (
            typing_match * 0.25 + 
            mouse_match * 0.15 + 
            nav_match * 0.15 + 
            writing_match * 0.20 + 
            cognitive_match * 0.15 + 
            (100.0 - collusion_risk) * 0.10
        )
        
        return {
            "candidate_id": candidate_id,
            "scenario": "NORMAL_BASELINE",
            "trust_score": round(w_avg, 1),
            "impersonation_risk": round(100.0 - (typing_match * 0.6 + mouse_match * 0.4), 1),
            "ai_assistance_risk": round(100.0 - (writing_match * 0.6 + cognitive_match * 0.4), 1),
            "collusion_risk": round(collusion_risk, 1),
            "verdict": "APPROVED",
            "agent_breakdown": [
                {"agent_name": "typing_biometrics", "match": round(typing_match, 1), "drift": round(100.0 - typing_match, 1)},
                {"agent_name": "mouse_dynamics", "match": round(mouse_match, 1), "drift": round(100.0 - mouse_match, 1)},
                {"agent_name": "navigation", "match": round(nav_match, 1), "drift": round(100.0 - nav_match, 1)},
                {"agent_name": "writing_stylometry", "match": round(writing_match, 1), "drift": round(100.0 - writing_match, 1)},
                {"agent_name": "cognitive_latency", "match": round(cognitive_match, 1), "drift": round(100.0 - cognitive_match, 1)},
                {"agent_name": "collusion_correlator", "match": round(100.0 - collusion_risk, 1), "drift": round(collusion_risk, 1)}
            ],
            "timeline": [
                {"timestamp": "09:00", "title": "Session Booted", "desc": "Continuous biometric telemetry collection channel initialized.", "severity": "INFO"},
                {"timestamp": "09:12", "title": "Keystroke Cadence Active", "desc": "Typing cadence matches historical 250-flight baseline matrix.", "severity": "INFO"},
                {"timestamp": "09:35", "title": "Cognitive Alignment Stable", "desc": "Response times perfectly match student baseline curve.", "severity": "INFO"}
            ]
        }

    @staticmethod
    def simulate_impersonation(candidate_id: str) -> Dict[str, Any]:
        """
        Generates impersonated metrics: Trust: 40-60.
        Very high typing & mouse drift.
        """
        rng = random.Random(sum(ord(c) for c in candidate_id))
        
        typing_match = rng.uniform(32.0, 48.0) # major mismatch
        mouse_match = rng.uniform(41.0, 56.0)  # robotic vector patterns
        nav_match = rng.uniform(85.0, 92.0)
        writing_match = rng.uniform(88.0, 93.0)
        cognitive_match = rng.uniform(85.0, 92.0)
        collusion_risk = rng.uniform(5.0, 15.0)
        
        w_avg = (
            typing_match * 0.25 + 
            mouse_match * 0.15 + 
            nav_match * 0.15 + 
            writing_match * 0.20 + 
            cognitive_match * 0.15 + 
            (100.0 - collusion_risk) * 0.10
        )
        
        return {
            "candidate_id": candidate_id,
            "scenario": "IMPERSONATION_THEFT",
            "trust_score": round(w_avg, 1),
            "impersonation_risk": round(100.0 - (typing_match * 0.6 + mouse_match * 0.4), 1),
            "ai_assistance_risk": round(100.0 - (writing_match * 0.6 + cognitive_match * 0.4), 1),
            "collusion_risk": round(collusion_risk, 1),
            "verdict": "TERMINATED",
            "agent_breakdown": [
                {"agent_name": "typing_biometrics", "match": round(typing_match, 1), "drift": round(100.0 - typing_match, 1)},
                {"agent_name": "mouse_dynamics", "match": round(mouse_match, 1), "drift": round(100.0 - mouse_match, 1)},
                {"agent_name": "navigation", "match": round(nav_match, 1), "drift": round(100.0 - nav_match, 1)},
                {"agent_name": "writing_stylometry", "match": round(writing_match, 1), "drift": round(100.0 - writing_match, 1)},
                {"agent_name": "cognitive_latency", "match": round(cognitive_match, 1), "drift": round(100.0 - cognitive_match, 1)},
                {"agent_name": "collusion_correlator", "match": round(100.0 - collusion_risk, 1), "drift": round(collusion_risk, 1)}
            ],
            "timeline": [
                {"timestamp": "09:00", "title": "Session Booted", "desc": "Security channel established on Station CN-48.", "severity": "INFO"},
                {"timestamp": "09:02", "title": "Typing Signature Diverged", "desc": "Keystroke rhythm flight timings diverged from identity lock. Drift +68%.", "severity": "CRITICAL"},
                {"timestamp": "09:07", "title": "Bezier Cursor Alert", "desc": "Flat mouse velocity paths indicate artificial robotic device templates.", "severity": "WARNING"},
                {"timestamp": "09:08", "title": "Identity Impersonation Anomaly", "desc": "Decision unit flags identity mismatch. Restricting session.", "severity": "CRITICAL"}
            ]
        }

    @staticmethod
    def simulate_ai_assistance(candidate_id: str) -> Dict[str, Any]:
        """
        Generates AI assisted metrics: Trust: 50-70.
        Very high writing & cognitive drift. Focus / Clipboard pasting alert.
        """
        rng = random.Random(sum(ord(c) for c in candidate_id))
        
        typing_match = rng.uniform(85.0, 92.0)
        mouse_match = rng.uniform(85.0, 91.0)
        nav_match = rng.uniform(45.0, 68.0) # switches pages to copy paste
        writing_match = rng.uniform(35.0, 48.0) # stylometric shift
        cognitive_match = rng.uniform(40.0, 52.0) # solves questions under 250ms
        collusion_risk = rng.uniform(2.0, 10.0)
        
        # decision averages with deduction
        w_avg = (
            typing_match * 0.25 + 
            mouse_match * 0.15 + 
            nav_match * 0.15 + 
            writing_match * 0.20 + 
            cognitive_match * 0.15 + 
            (100.0 - collusion_risk) * 0.10
        ) - 15.0 # penalty deduction for clear clipboard trigger
        
        return {
            "candidate_id": candidate_id,
            "scenario": "AI_GENERATED_INTELLECT",
            "trust_score": round(max(35.0, w_avg), 1),
            "impersonation_risk": round(100.0 - (typing_match * 0.6 + mouse_match * 0.4), 1),
            "ai_assistance_risk": round(100.0 - (writing_match * 0.6 + cognitive_match * 0.4), 1),
            "collusion_risk": round(collusion_risk, 1),
            "verdict": "REVIEW",
            "agent_breakdown": [
                {"agent_name": "typing_biometrics", "match": round(typing_match, 1), "drift": round(100.0 - typing_match, 1)},
                {"agent_name": "mouse_dynamics", "match": round(mouse_match, 1), "drift": round(100.0 - mouse_match, 1)},
                {"agent_name": "navigation", "match": round(nav_match, 1), "drift": round(100.0 - nav_match, 1)},
                {"agent_name": "writing_stylometry", "match": round(writing_match, 1), "drift": round(100.0 - writing_match, 1)},
                {"agent_name": "cognitive_latency", "match": round(cognitive_match, 1), "drift": round(100.0 - cognitive_match, 1)},
                {"agent_name": "collusion_correlator", "match": round(100.0 - collusion_risk, 1), "drift": round(collusion_risk, 1)}
            ],
            "timeline": [
                {"timestamp": "09:00", "title": "Session Booted", "desc": "Surveillance link active.", "severity": "INFO"},
                {"timestamp": "09:11", "title": "Focus Loss Mismatch", "desc": "Viewport focused loss tracked during essay question formulation block.", "severity": "WARNING"},
                {"timestamp": "09:18", "title": "Writing Style Aligned to AI", "desc": "Vocabulary perplexity shifted. Type-Token match indexes external GPT model.", "severity": "CRITICAL"},
                {"timestamp": "09:24", "title": "Fast Sub-human Latency", "desc": "Question #24 solved in 122ms. AI Assist risk index flagged.", "severity": "WARNING"}
            ]
        }

    @staticmethod
    def simulate_collusion_group(candidate_id: str) -> Dict[str, Any]:
        """
        Generates collusion metrics: Trust: 30-60.
        Very high collusion risk, synchronized timing click delays.
        """
        rng = random.Random(sum(ord(c) for c in candidate_id))
        
        typing_match = rng.uniform(85.0, 92.0)
        mouse_match = rng.uniform(82.0, 89.0)
        nav_match = rng.uniform(84.0, 90.0)
        writing_match = rng.uniform(82.0, 88.0)
        cognitive_match = rng.uniform(42.0, 58.0) # matching response latencies
        collusion_risk = rng.uniform(75.0, 92.0)   # massive risk
        
        w_avg = (
            typing_match * 0.25 + 
            mouse_match * 0.15 + 
            nav_match * 0.15 + 
            writing_match * 0.20 + 
            cognitive_match * 0.15 + 
            (100.0 - collusion_risk) * 0.10
        )
        
        return {
            "candidate_id": candidate_id,
            "scenario": "COLLUSION_R_COHORT",
            "trust_score": round(w_avg, 1),
            "impersonation_risk": round(100.0 - (typing_match * 0.6 + mouse_match * 0.4), 1),
            "ai_assistance_risk": round(100.0 - (writing_match * 0.6 + cognitive_match * 0.4), 1),
            "collusion_risk": round(collusion_risk, 1),
            "verdict": "REVIEW",
            "agent_breakdown": [
                {"agent_name": "typing_biometrics", "match": round(typing_match, 1), "drift": round(100.0 - typing_match, 1)},
                {"agent_name": "mouse_dynamics", "match": round(mouse_match, 1), "drift": round(100.0 - mouse_match, 1)},
                {"agent_name": "navigation", "match": round(nav_match, 1), "drift": round(100.0 - nav_match, 1)},
                {"agent_name": "writing_stylometry", "match": round(writing_match, 1), "drift": round(100.0 - writing_match, 1)},
                {"agent_name": "cognitive_latency", "match": round(cognitive_match, 1), "drift": round(100.0 - cognitive_match, 1)},
                {"agent_name": "collusion_correlator", "match": round(100.0 - collusion_risk, 1), "drift": round(collusion_risk, 1)}
            ],
            "timeline": [
                {"timestamp": "09:00", "title": "Session Established", "desc": "Network connection authorized.", "severity": "INFO"},
                {"timestamp": "09:12", "title": "Navigation Sync Registered", "desc": "Question choice selection synchronized across 3 workstations in New York hub.", "severity": "WARNING"},
                {"timestamp": "09:22", "title": "Answers Path Overlap", "desc": "Sequential response patterns yield 98% convergence matching adjacent seats.", "severity": "CRITICAL"},
                {"timestamp": "09:34", "title": "Cooperative Alert Flagged", "desc": "Collusion clustering agent alerts team of real-time cooperative answers sharing.", "severity": "CRITICAL"}
            ]
        }
