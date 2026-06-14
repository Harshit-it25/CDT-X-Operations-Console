"""
Pydantic Schemas defining request/response schemas for all CDT-X endpoints.
Ensures strong typing, serialization, and input compliance parsing.
"""

from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime

# --- Common / Utility Shared Schemas ---
class SuccessResponse(BaseModel):
    success: bool
    message: str

# --- User Schemas ---
class UserBase(BaseModel):
    id: str
    username: str
    role: str = "L3-SECURITY"
    display_name: str

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    created_at: datetime

    class Config:
        orm_mode = True
        from_attributes = True


# --- Candidate Schemas ---
class CandidateBase(BaseModel):
    id: str
    name: str
    has_identity_lock: bool = True
    overall_baseline_trust: float = 95.0

class CandidateCreate(CandidateBase):
    pass

class CandidateResponse(CandidateBase):
    created_at: datetime

    class Config:
        orm_mode = True
        from_attributes = True


# --- Exam Schemas ---
class ExamBase(BaseModel):
    id: str
    title: str
    location: str
    center_id: str
    candidates_active: int = 0
    candidates_total: int = 0
    progress: int = 0
    status: str = "STABLE"

class ExamCreate(ExamBase):
    pass

class ExamResponse(ExamBase):
    class Config:
        orm_mode = True
        from_attributes = True


# --- Telemetry Behavior Event Schemas ---
class BehaviorEventCreate(BaseModel):
    candidate_id: str = Field(..., description="Unique ID of the candidate stream")
    session_id: str = Field(..., description="Active session ID code")
    event_type: str = Field(..., description="Type of event: KEYSTROKE, MOUSE, SCROLL, FOCUS, NAV")
    payload: Dict[str, Any] = Field(..., description="Raw JSON data of vector speeds, flight times, coords, text, etc.")

class BehaviorEventResponse(BaseModel):
    id: int
    candidate_id: str
    session_id: str
    event_type: str
    timestamp: datetime
    payload: Dict[str, Any]

    class Config:
        orm_mode = True
        from_attributes = True


# --- Twin Engine / Biometric Embeddings Schemas ---
class DigitalTwinResponse(BaseModel):
    id: str
    candidate_id: str
    similarity_threshold: float
    drift_tolerance: float
    typing_signature: Optional[Dict[str, Any]] = None
    mouse_signature: Optional[Dict[str, Any]] = None
    writing_signature: Optional[Dict[str, Any]] = None
    created_at: datetime

    class Config:
        orm_mode = True
        from_attributes = True


# --- Multi-Agent Risk Scores Schemas ---
class AgentScoreSchema(BaseModel):
    agent_name: str
    match_percentage: float
    drift_percentage: float

class RiskScoreResponse(BaseModel):
    candidate_id: str
    exam_id: str
    trust_score: float
    impersonation_risk: float
    ai_assistance_risk: float
    collusion_risk: float
    verdict: str
    timestamp: datetime
    agent_breakdown: List[AgentScoreSchema] = []

    class Config:
        orm_mode = True
        from_attributes = True


# --- Investigation / Incident Case Schemas ---
class AgentNoteCreate(BaseModel):
    text: str = Field(..., min_length=1, description="Comment notes content")
    author: str = Field(..., description="Operator display name")

class AgentNoteResponse(BaseModel):
    id: int
    investigation_id: str
    text: str
    author: str
    timestamp: datetime

    class Config:
        orm_mode = True
        from_attributes = True

class InvestigationResponse(BaseModel):
    id: str
    candidate_id: str
    candidate_name: Optional[str] = None
    category: str
    risk_score: float
    resolved: bool
    resolution: Optional[str] = None
    created_at: datetime
    notes: List[AgentNoteResponse] = []

    class Config:
        orm_mode = True
        from_attributes = True

class AdjudicationRequest(BaseModel):
    action: str = Field(..., description="Action verdict: RESOLVED_FALSE_POSITIVE or TERMINATED_INVALID")


# --- Timeline Event Schemas ---
class TimelineEventCreate(BaseModel):
    candidate_id: str
    timestamp: str
    title: str
    description: str
    severity: str = "INFO"

class TimelineEventResponse(TimelineEventCreate):
    id: int

    class Config:
        orm_mode = True
        from_attributes = True


# --- Replay Schemas ---
class ReplayResponse(BaseModel):
    id: str
    cursor_paths: List[Dict[str, Any]]
    keystroke_sequences: List[Dict[str, Any]]
    navigation_path: List[str]
    focus_changes: List[Dict[str, Any]]
    trust_score_evolution: List[Dict[str, Any]]

    class Config:
        orm_mode = True
        from_attributes = True


# --- Dashboard Overview Summaries ---
class DashboardStats(BaseModel):
    global_integrity_index: float
    active_supervised_stations: int
    total_alerts: int
    resolved_alerts: int
    active_sessions: List[ExamResponse]


# --- Architecture System Metadata ---
class ArchitectureMetadata(BaseModel):
    system_name: str = "CDT-X Biometric Alignment Pipeline"
    layers: List[Dict[str, Any]]
    description: str
