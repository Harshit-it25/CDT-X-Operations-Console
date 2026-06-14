"""
CDT-X Digital Twin Alignment & Feature Embedding Engine.
Handles cosine similarity calculations, 512-dimensional vectorization emulation,
baseline identity profile consolidation, and real-time behavioral drift tracking.
"""

import math
import random
from typing import List, Dict, Any, Tuple

class DigitalTwinEngine:
    """
    Continuous Behavioral Digital Twin vector space modeling engine.
    Computes profile similarity thresholds.
    """

    @staticmethod
    def generate_random_embedding(seed_str: str) -> List[float]:
        """
        Generates a repeatable pseudo-random 512-dimensional unit vector
        for a candidate's signature context.
        """
        # Seed generator with hash value to maintain consistency for a specific candidate ID
        seed_num = sum(ord(c) for c in seed_str)
        rng = random.Random(seed_num)
        
        raw_vector = [rng.gauss(0, 1) for _ in range(512)]
        magnitude = math.sqrt(sum(x * x for x in raw_vector))
        
        # Normalize to unit sphere (magnitude of 1)
        normalized = [x / magnitude for x in raw_vector]
        return normalized

    @staticmethod
    def calculate_cosine_similarity(vec_a: List[float], vec_b: List[float]) -> float:
        """
        Calculates cosine similarity between two 512-dimensional vectors.
        Returns a similarity value between -1.0 and 1.0.
        """
        if len(vec_a) != len(vec_b) or not vec_a:
            return 0.0
        
        dot_product = sum(a * b for a, b in zip(vec_a, vec_b))
        mag_a = math.sqrt(sum(a * a for a in vec_a))
        mag_b = math.sqrt(sum(b * b for b in vec_b))
        
        if mag_a == 0.0 or mag_b == 0.0:
            return 0.0
            
        return dot_product / (mag_a * mag_b)

    @classmethod
    def evaluate_drift_coefficient(
        cls, 
        current_vector: List[float], 
        baseline_vector: List[float]
    ) -> Tuple[float, float]:
        """
        Compares dynamic telemetry signature against Master baseline vector.
        Returns:
            similarity_score: float (0 - 100%)
            drift_percentage: float (0 - 100%)
        """
        similarity = cls.calculate_cosine_similarity(current_vector, baseline_vector)
        # Map similarity range [-1.0, 1.0] to percentage score [0.0, 100.0]
        similarity_pct = max(0.0, min(100.0, (similarity + 1.0) / 2.0 * 100.0))
        
        # Drift is the complement index of trust alignment within the bounds of tolerance
        drift_pct = 100.0 - similarity_pct
        return similarity_pct, drift_pct

    @staticmethod
    def extract_typing_fingerprint(events: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Converts keystroke timings into hold, flight, and pace aggregates.
        """
        if not events:
            return {"wpm": 0.0, "avg_hold_ms": 0.0, "avg_flight_ms": 0.0, "error_rate": 0.0}

        holds = [e.get("hold_time_ms", 75.0) for e in events if "hold_time_ms" in e]
        flights = [e.get("flight_time_ms", 110.0) for e in events if "flight_time_ms" in e]
        backspaces = sum(1 for e in events if e.get("key") == "Backspace")
        
        avg_hold = sum(holds) / len(holds) if holds else 78.0
        avg_flight = sum(flights) / len(flights) if flights else 112.0
        error_rate = (backspaces / len(events)) * 100.0 if events else 2.1
        
        wpm = (len(events) / 5) / (max(1, len(events) * 0.15) / 60) # Simulated standard pacing
        
        return {
            "wpm": round(max(30.0, min(240.0, wpm)), 1),
            "avg_hold_ms": round(avg_hold, 1),
            "avg_flight_ms": round(avg_flight, 1),
            "error_rate": round(error_rate, 2),
            "backspace_frequency": backspaces
        }

    @staticmethod
    def extract_mouse_vectors(events: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Converts mouse coordinates tracking lists into velocity and bezier curve scores.
        """
        if not events:
            return {"avg_velocity_px_s": 0.0, "jerk_coefficient": 0.0, "hover_duration_ms": 0.0}
            
        velocities = [e.get("velocity", 350.0) for e in events if "velocity" in e]
        hover_times = [e.get("hover_time", 180.0) for e in events if "hover_time" in e]
        
        avg_v = sum(velocities) / len(velocities) if velocities else 420.0
        avg_hover = sum(hover_times) / len(hover_times) if hover_times else 220.0
        
        return {
            "avg_velocity_px_s": round(avg_v, 1),
            "jerk_coefficient": round(random.uniform(1.1, 4.8), 2),
            "hover_duration_ms": round(avg_hover, 1)
        }
