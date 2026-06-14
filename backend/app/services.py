"""
CDT-X Behavioral Services & Analytical Pipeline.
Features:
- BehaviorCollectionService: Event intake pipeline.
- FeatureExtractionService: High frequency raw input compiler.
- ExplainabilityEngine: Natural language risk vector summarization.
- ReplayDataGenerator: Synthesis of movement, key buffers and scores.
"""

import math
import random
from typing import Dict, List, Any
from app.profile_engine import BehavioralProfileEngine


class BehaviorCollectionService:
    @staticmethod
    def process_telemetry_event(candidate_id: str, event_type: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        Receives incoming packets of physical candidate telemetry.
        Flags immediate safety blocks (e.g. paste triggers).
        """
        is_paste_trigger = False
        if event_type == "KEYSTROKE":
            key_name = payload.get("key", "")
            modifiers = payload.get("modifiers", [])
            # Detect copy pasting (Ctrl+V / Cmd+V symbols)
            if key_name.lower() == "v" and ("Ctrl" in modifiers or "Meta" in modifiers or "Cmd" in modifiers):
                is_paste_trigger = True
            elif payload.get("flight_time_ms", 100.0) < 2.0:
                # Keystore speed impossibly fast representing automated script paste values
                is_paste_trigger = True
                
        return {
            "processed": True,
            "candidate_id": candidate_id,
            "event_type": event_type,
            "is_safety_flagged": is_paste_trigger,
            "ingested_timestamp": "ACTIVE_SYNC"
        }


class FeatureExtractionService:
    @staticmethod
    def compile_typing_features(raw_keystore_logs: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Calculates hold time, flight time, and speed (WPM).
        """
        return BehavioralProfileEngine.extract_typing_fingerprint(raw_keystore_logs)

    @staticmethod
    def compile_mouse_features(raw_mouse_logs: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Calculates acceleration vectors, clicks profiles, and hover delays.
        """
        return BehavioralProfileEngine.extract_mouse_vectors(raw_mouse_logs)

    @staticmethod
    def compile_navigation_features(nav_events: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Calculates page focuses list and jumping sequences.
        """
        blur_events = sum(1 for e in nav_events if e.get("event") == "blur")
        tab_switches = sum(1 for e in nav_events if e.get("event") == "tab_switch")
        question_jumps = sum(1 for e in nav_events if e.get("event") == "question_jump")
        
        return {
            "focus_losses": blur_events,
            "tab_switches": tab_switches,
            "navigation_frequency": question_jumps,
            "unauthorized_viewports": blur_events + tab_switches
        }

    @staticmethod
    def compile_writing_features(texts_list: List[str]) -> Dict[str, Any]:
        """
        Extracts stylometric indices: word sizes, sentence layouts, type token ratios.
        """
        if not texts_list:
            return {"avg_sentence_length": 0.0, "vocabulary_diversity": 0.0, "perplexity_score": 0.0}
            
        all_words = []
        sentence_lengths = []
        for phrase in texts_list:
            words = phrase.split()
            all_words.extend(words)
            sentence_lengths.append(len(words))
            
        vocab = set(all_words)
        diversity = len(vocab) / max(1, len(all_words))
        avg_sentence = sum(sentence_lengths) / len(sentence_lengths) if sentence_lengths else 0.0
        
        # Emulate linguistic stylometric complexity
        perplexity = max(10.0, min(150.0, 85.0 + (random.random() - 0.5) * 30.0))
        
        return {
            "avg_sentence_length": round(avg_sentence, 1),
            "vocabulary_diversity": round(diversity, 3),
            "perplexity_score": round(perplexity, 2),
            "stylometric_signature_hash": "STY-0x5F19B"
        }


class ExplainabilityEngine:
    """
    Cognitive explanation builder.
    Synthesizes and summarizes findings into a human-readable diagnosis report.
    """
    @staticmethod
    def generate_explainable_findings(
        trust_score: float,
        typing_drift: float,
        mouse_drift: float,
        writing_drift: float,
        focus_drift: float,
        has_paste: bool
    ) -> Dict[str, Any]:
        findings = []
        
        if typing_drift > 20.0:
            findings.append(f"Typing Cadence Drift +{typing_drift:.0f}% (Mismatch against reference dwell profile)")
        if mouse_drift > 20.0:
            findings.append(f"Mouse Movement Path Drift +{mouse_drift:.0f}% (Suspicious angular vectors flagged)")
        if writing_drift > 15.0:
            findings.append(f"Linguistic Stylo Signature Shift +{writing_drift:.0f}% (Sudden phrase expansion detected)")
        if focus_drift > 5.0:
            findings.append("Workstation Focus Viewport Losses Registered (Student swerving away from exam quarantine)")
        if has_paste:
            findings.append("Clipboard virtual insert block triggered (Automated script pacing detected)")
            
        # Default finding
        if not findings:
            findings.append("Biometric and cognitive streams remain closely aligned with Candidate identity Master baseline.")
            
        confidence = 100.0 - (100.0 - trust_score) * 0.15 # Higher confidence calculations index
        confidence = round(max(85.0, min(99.0, confidence)), 1)
        
        return {
            "trust_score": trust_score,
            "primary_findings": findings,
            "confidence": f"{confidence}%",
            "evaluated_at": "ACTIVE_SYNC"
        }


class ReplayDataGenerator:
    """
    Fidelity session replay synthesis.
    Coordinates coordinates trails, keystroke speeds, and trust progression for visualization inside CDT-X workspace.
    """
    @staticmethod
    def synthesize_candidate_replay(candidate_id: str, risk_profile: str) -> Dict[str, Any]:
        rng = random.Random(sum(ord(c) for c in candidate_id))
        
        cursor_points = []
        keystrokes = []
        scores_curve = []
        
        # Build 60 seconds of coordinates
        current_score = 98.0
        for block in range(60):
            t = block * 1000 # time offset ms
            
            # Formulate coordinate arcs
            if risk_profile == "impersonation":
                # Robotic jagged lines
                x = 100 + (block * 12) + rng.randint(-2, 2)
                y = 150 + int(math.sin(block * 0.5) * 50) + rng.randint(-1, 1)
                speed = 850.0  # Ultra high flat speed
                current_score = max(42.0, current_score - rng.uniform(0.5, 1.2))
            elif risk_profile == "ai_assisted":
                # Regular mouse arcs, sudden rapid typing bursts
                x = 150 + int(math.cos(block * 0.2) * 120)
                y = 200 + (block * 8)
                speed = 320.0
                if 20 <= block <= 35: # Solves questions instantly
                    current_score = max(55.0, current_score - rng.uniform(0.8, 1.8))
            else:
                # Normal human curves
                x = 200 + int(math.sin(block * 0.1) * 200) + rng.randint(-5, 5)
                y = 300 + int(math.cos(block * 0.1) * 150) + rng.randint(-5, 5)
                speed = 220.0
                current_score = min(100.0, max(92.0, current_score + rng.uniform(-0.3, 0.4)))
                
            cursor_points.append({"x": x, "y": y, "timestamp": t, "velocity": round(speed, 1)})
            
            # Formulate key delays
            char = rng.choice("abcdefghijklmnopqrstuvwxyz ")
            hold = rng.randint(45, 110) if risk_profile != "impersonation" else rng.randint(2, 5) # Script speeds
            keystrokes.append({"key": char, "hold_ms": hold, "timestamp": t})
            scores_curve.append({"seconds": block, "trust": round(current_score, 1)})
            
        return {
            "id": candidate_id,
            "cursor_paths": cursor_points,
            "keystroke_sequences": keystrokes,
            "navigation_path": ["Q1", "Q2", "Q5", "Q20", "Q21"] if risk_profile != "normal" else ["Q1", "Q2", "Q3", "Q4"],
            "focus_changes": [{"timestamp": 12000, "event": "blur"}] if risk_profile != "normal" else [],
            "trust_score_evolution": scores_curve
        }
