"""
FastAPI Router Mapping for all CDT-X Integrity endpoints.
Details endpoints for biometric intakes, candidate audits, forensic replays and simulators.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.database import get_db
from app.schemas import (
    SuccessResponse,
    BehaviorEventCreate,
    RiskScoreResponse,
    DigitalTwinResponse,
    InvestigationResponse,
    TimelineEventResponse,
    ReplayResponse,
    DashboardStats,
    ArchitectureMetadata,
    AdjudicationRequest,
    AgentNoteCreate,
    AgentNoteResponse
)
from app.simulator import CDTIntegritySimulator
from app.services import ExplainabilityEngine, ReplayDataGenerator

api_router = APIRouter()

# Global in-memory cache representing running simulation sessions
SIMULATED_CANDIDATES_CACHE: Dict[str, Dict[str, Any]] = {}

def get_candidate_data(candidate_id: str) -> Dict[str, Any]:
    """Helper resolver pulling candidate states or providing automatic fallback defaults."""
    if candidate_id in SIMULATED_CANDIDATES_CACHE:
        return SIMULATED_CANDIDATES_CACHE[candidate_id]
        
    # Return default "normal" state if not specifically seeded
    default_data = CDTIntegritySimulator.simulate_normal_candidate(candidate_id)
    SIMULATED_CANDIDATES_CACHE[candidate_id] = default_data
    return default_data


# --- 1. CORE OPERATIONAL ENDPOINTS ---

@api_router.post("/exam/start", tags=["Operations"], response_model=SuccessResponse)
def start_exam(payload: Dict[str, Any]):
    candidate_id = payload.get("candidate_id", "USR_DEFAULT")
    exam_id = payload.get("exam_id", "EXM_DEFAULT")
    
    # Warm up cache with a normal simulated baseline
    SIMULATED_CANDIDATES_CACHE[candidate_id] = CDTIntegritySimulator.simulate_normal_candidate(candidate_id)
    
    return {
        "success": True,
        "message": f"Biometric integrity stream initialized successfully for Candidate {candidate_id} on Exam {exam_id}."
    }


@api_router.post("/behavior/event", tags=["Operations"], response_model=SuccessResponse)
def stream_behavior_event(event: BehaviorEventCreate):
    cid = event.candidate_id
    etype = event.event_type
    payload = event.payload
    
    current_state = get_candidate_data(cid)
    
    # Process copy-paste triggers or other anomalies (decrease score slightly dynamically)
    is_paste = False
    if etype == "KEYSTROKE" and payload.get("key") == "v" and any(m in payload.get("modifiers", []) for m in ["Ctrl", "Cmd", "Meta"]):
        is_paste = True
        
    if is_paste or payload.get("flight_time_ms", 100.0) < 2.0:
        # Deduct score values for safety flags
        current_state["trust_score"] = round(max(15.0, current_state["trust_score"] - 12.5), 1)
        current_state["ai_assistance_risk"] = round(min(100.0, current_state["ai_assistance_risk"] + 25.0), 1)
        
        # Insert safety warning timeline event
        current_state["timeline"].append({
            "timestamp": "Active",
            "title": "Clipboard Insertion Triggered",
            "desc": "Anomalous keystroke dwell profiles indicate instant external clipboard insertion.",
            "severity": "CRITICAL"
        })
        
    return {
        "success": True,
        "message": f"Telemetry block event of type {etype} ingested and filtered successfully."
    }


@api_router.post("/exam/submit", tags=["Operations"], response_model=SuccessResponse)
def submit_exam(payload: Dict[str, Any]):
    candidate_id = payload.get("candidate_id", "USR_DEFAULT")
    return {
        "success": True,
        "message": f"Exam session finalized. Biometric digital twin channel for Candidate {candidate_id} closed."
    }


# --- 2. FORENSIC VIEW ENDPOINTS ---

@api_router.get("/candidate/{id}/trust", tags=["Trust Core"])
def get_candidate_trust(id: str):
    data = get_candidate_data(id)
    return {
        "candidate_id": id,
        "trust_score": data["trust_score"],
        "impersonation_risk": data["impersonation_risk"],
        "ai_assistance_risk": data["ai_assistance_risk"],
        "collusion_risk": data["collusion_risk"],
        "verdict": data["verdict"],
        "findings": ExplainabilityEngine.generate_explainable_findings(
            data["trust_score"],
            data["impersonation_risk"] * 0.5,
            data["impersonation_risk"] * 0.5,
            data["ai_assistance_risk"] * 0.6,
            12.0 if data["trust_score"] < 80.0 else 0.0,
            any(t["title"] == "Clipboard Insertion Triggered" for t in data["timeline"])
        )
    }


@api_router.get("/candidate/{id}/timeline", tags=["Timeline"])
def get_candidate_timeline(id: str):
    data = get_candidate_data(id)
    return {
        "candidate_id": id,
        "events": data["timeline"]
    }


@api_router.get("/candidate/{id}/replay", tags=["Session Replay"], response_model=ReplayResponse)
def get_candidate_replay(id: str):
    data = get_candidate_data(id)
    profile = "normal"
    if data["scenario"] == "IMPERSONATION_THEFT":
        profile = "impersonation"
    elif data["scenario"] == "AI_GENERATED_INTELECT":
        profile = "ai_assisted"
    elif data["scenario"] == "COLLUSION_R_COHORT":
        profile = "collusion"
        
    replay = ReplayDataGenerator.synthesize_candidate_replay(id, profile)
    return replay


@api_router.get("/candidate/{id}/digital-twin", tags=["Digital Twin"], response_model=DigitalTwinResponse)
def get_candidate_digital_twin(id: str):
    return {
        "id": f"TWN-{id}",
        "candidate_id": id,
        "similarity_threshold": 85.0,
        "drift_tolerance": 15.0,
        "typing_signature": {"avg_hold_ms": 78.5, "avg_flight_ms": 112.1, "error_rate": 2.15, "backspaces_count": 4},
        "mouse_signature": {"bezier_jerk": 1.48, "avg_velocity": 412.0, "hover_ms": 224.5},
        "writing_signature": {"average_words": 15.4, "ttr_diversity": 0.68, "perplexity": 82.4},
        "created_at": "2026-06-11T10:02:23Z"
    }


@api_router.get("/candidate/{id}/investigation", tags=["Operations"])
def get_candidate_investigation(id: str):
    data = get_candidate_data(id)
    # Map category
    cat = "IMPERSONATION"
    if data["scenario"] == "AI_GENERATED_INTELECT":
        cat = "AI_ASSISTANCE"
    elif data["scenario"] == "COLLUSION_R_COHORT":
        cat = "COLLUSION"
        
    return {
        "id": f"AL-{id[:4].upper() if len(id) > 4 else '7712'}",
        "candidate_id": id,
        "candidate_name": f"Candidate {id}",
        "category": cat,
        "risk_score": 100.0 - data["trust_score"],
        "resolved": False,
        "resolution": None,
        "created_at": "2026-06-11T10:02:23Z",
        "notes": [
            {
                "id": 1,
                "investigation_id": "AL-7712",
                "text": f"Continuous monitoring triggered mismatch flags representing {data['scenario']}. Auditor dispatched and awaiting verification.",
                "author": "OP_SEC_04",
                "timestamp": "2026-06-11T09:12:00Z"
            }
        ]
    }


@api_router.post("/candidate/{id}/adjudicate", tags=["Operations"])
def adjudicate_candidate(id: str, request: AdjudicationRequest):
    data = get_candidate_data(id)
    if request.action == "RESOLVED_FALSE_POSITIVE":
        data["trust_score"] = 98.4
        data["verdict"] = "APPROVED"
        data["scenario"] = "NORMAL_BASELINE"
    else:
        data["trust_score"] = 0.0
        data["verdict"] = "TERMINATED"
        
    return {
        "success": True,
        "message": f"Incident adjudicates as {request.action}. Session record adjusted."
    }


@api_router.get("/dashboard/overview", tags=["Dashboard Summary"], response_model=DashboardStats)
def get_dashboard_overview():
    # Calculate global averge from simulated items
    total_trust = 0.0
    for cid in SIMULATED_CANDIDATES_CACHE:
        total_trust += SIMULATED_CANDIDATES_CACHE[cid]["trust_score"]
        
    avg_trust = total_trust / len(SIMULATED_CANDIDATES_CACHE) if SIMULATED_CANDIDATES_CACHE else 96.4
    
    # Static exam structures matching App.tsx initial states
    exams = [
        {"id": "EXM-88219-B", "title": "Civil Services Aptitude - LHR", "location": "London Central Testing Hub", "center_id": "LON-042", "candidates_active": 142, "candidates_total": 150, "progress": 45, "status": "STABLE"},
        {"id": "EXM-44102-X", "title": "Executive Services Entrance - SGP", "location": "Singapore Edge Center", "center_id": "SIN-009", "candidates_active": 89, "candidates_total": 90, "progress": 88, "status": "ANOMALY"},
        {"id": "EXM-10294-Z", "title": "System Security Administrator - NYC", "location": "New York Operations Hub", "center_id": "NYC-011", "candidates_active": 238, "candidates_total": 240, "progress": 92, "status": "STABLE"}
    ]
    
    return {
        "global_integrity_index": round(avg_trust, 2),
        "active_supervised_stations": 2514,
        "total_alerts": len(SIMULATED_CANDIDATES_CACHE),
        "resolved_alerts": sum(1 for c in SIMULATED_CANDIDATES_CACHE.values() if c["trust_score"] > 80.0),
        "active_sessions": exams
    }


# --- 3. DEMO SIMULATOR TRIGGER ENDPOINTS ---

@api_router.post("/simulate/normal", tags=["Simulator"], response_model=SuccessResponse)
def trigger_normal_simulation(payload: Dict[str, Any]):
    cid = payload.get("candidate_id", "USR_ALEXA")
    SIMULATED_CANDIDATES_CACHE[cid] = CDTIntegritySimulator.simulate_normal_candidate(cid)
    return {"success": True, "message": f"Candidate {cid} simulated as Optimal Normal Student."}


@api_router.post("/simulate/impersonation", tags=["Simulator"], response_model=SuccessResponse)
def trigger_impersonation_simulation(payload: Dict[str, Any]):
    cid = payload.get("candidate_id", "USR_ALEXA")
    SIMULATED_CANDIDATES_CACHE[cid] = CDTIntegritySimulator.simulate_impersonation(cid)
    return {"success": True, "message": f"Candidate {cid} simulated as Identity Impersonated cheating attempt."}


@api_router.post("/simulate/ai-assisted", tags=["Simulator"], response_model=SuccessResponse)
def trigger_ai_simulation(payload: Dict[str, Any]):
    cid = payload.get("candidate_id", "USR_ALEXA")
    SIMULATED_CANDIDATES_CACHE[cid] = CDTIntegritySimulator.simulate_ai_assistance(cid)
    return {"success": True, "message": f"Candidate {cid} simulated with clipboard / External GPT LLM assisted patterns."}


@api_router.post("/simulate/collusion", tags=["Simulator"], response_model=SuccessResponse)
def trigger_collusion_simulation(payload: Dict[str, Any]):
    cid = payload.get("candidate_id", "USR_ALEXA")
    SIMULATED_CANDIDATES_CACHE[cid] = CDTIntegritySimulator.simulate_collusion_group(cid)
    return {"success": True, "message": f"Candidate {cid} simulated as member of cooperative cheating cohort."}


# --- 4. PIPELINE METADATA ARCHITECTURE ENDPOINT ---

@api_router.get("/architecture", tags=["Root"], response_model=ArchitectureMetadata)
def get_system_architecture():
    return {
        "system_name": "CDT-X Behavioral Continuous Authentication Architecture",
        "description": "Continuous multi-agent intelligence pipeline correlating somatic mouse/keystroke coordinates into Digital Twin match curves.",
        "layers": [
            {"step": 1, "name": "Telemetry Client-In", "payload": "Coordinates, Milliseconds timings, keys buffers"},
            {"step": 2, "name": "Feature Extract Service", "payload": "Hold times, flight speed, type-token vocabulary density coefficient"},
            {"step": 3, "name": "Digital Twin Engine", "payload": "512-dimensional embedding Euclidean/Cosine alignments vector space"},
            {"step": 4, "name": "Multi-Agent Neural Array", "payload": "Decoupled evaluations of typing, mouse, nav, cognitive, stylometric and collusion signatures"},
            {"step": 5, "name": "Consensus Scoring Engine", "payload": "Weighted decision aggregation, trust calculations, anomaly alerts classification"},
            {"step": 6, "name": "Auditor Cryptledger", "payload": "Immutable compliance block logging hashing verification records"}
        ]
    }
