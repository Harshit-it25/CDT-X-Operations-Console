"""
SQLAlchemy Entity Models defining CDT-X database schemas.
Includes relations representing user proctored exam sessions, telemetry stream structures,
biometric embeddings, agent-specific outputs, and crypt ledger hashes.
"""

from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    """System Overseers / L3 Security proctors authorized to audit exam sessions."""
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    role = Column(String, default="L3-SECURITY")  # L3-SECURITY, ADMIN, SYSTEM
    display_name = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    audit_logs = relationship("AuditLog", back_populates="operator_rel")


class Candidate(Base):
    """Students undergoing Civil Services / Cognitive aptitude examinations."""
    __tablename__ = "candidates"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    has_identity_lock = Column(Boolean, default=True)
    overall_baseline_trust = Column(Float, default=95.0)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    digital_twins = relationship("DigitalTwin", back_populates="candidate")
    risk_scores = relationship("RiskScore", back_populates="candidate")
    investigations = relationship("Investigation", back_populates="candidate")
    embeddings = relationship("BehaviorEmbedding", back_populates="candidate")
    timeline_events = relationship("TimelineEvent", back_populates="candidate")


class Exam(Base):
    """Active exam definitions including structural locations and candidate cohorts."""
    __tablename__ = "exams"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    location = Column(String, nullable=False)  # e.g., London Central Group
    center_id = Column(String, nullable=False, index=True)
    candidates_active = Column(Integer, default=0)
    candidates_total = Column(Integer, default=0)
    progress = Column(Integer, default=0)  # progress % 0-100
    status = Column(String, default="STABLE")  # STABLE, ANOMALY

    # Relationships
    risk_scores = relationship("RiskScore", back_populates="exam")


class BehaviorEvent(Base):
    """Raw telemetry inputs collected at high frequencies from student workstations."""
    __tablename__ = "behavior_events"

    id = Column(Integer, primary_key=True, autoincrement=True)
    candidate_id = Column(String, ForeignKey("candidates.id"), index=True, nullable=False)
    session_id = Column(String, index=True, nullable=False)
    
    # Event attributes
    event_type = Column(String, nullable=False, index=True)  # KEYSTROKE, MOUSE, SCROLL, FOCUS, NAV
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    
    # Raw JSON payload representing keys, durations, vector paths, coordinates, velocities
    payload = Column(JSON, nullable=False)


class BehaviorEmbedding(Base):
    """Dense 512-dimensional mathematical features vectorized from historical telemetry."""
    __tablename__ = "behavior_embeddings"

    id = Column(Integer, primary_key=True, autoincrement=True)
    candidate_id = Column(String, ForeignKey("candidates.id"), nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Embedding values stored as JSON list of 512 floats
    vector = Column(JSON, nullable=False)

    # Relationships
    candidate = relationship("Candidate", back_populates="embeddings")


class DigitalTwin(Base):
    """The aggregate reference baseline representing a student's optimal behavioral pattern."""
    __tablename__ = "digital_twins"

    id = Column(String, primary_key=True, index=True)
    candidate_id = Column(String, ForeignKey("candidates.id"), unique=True, nullable=False)
    similarity_threshold = Column(Float, default=85.0)
    drift_tolerance = Column(Float, default=15.0)
    
    # Baseline vectors (e.g. centroid of historical clustering)
    typing_signature = Column(JSON, nullable=True)  # Reference dwell/flight timings keymap
    mouse_signature = Column(JSON, nullable=True)   # Reference bezier curve coordinates
    writing_signature = Column(JSON, nullable=True) # Reference stylometric frequencies
    
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    candidate = relationship("Candidate", back_populates="digital_twins")


class RiskScore(Base):
    """Evaluated integrity scores aggregate and categorized risk metrics."""
    __tablename__ = "risk_scores"

    id = Column(Integer, primary_key=True, autoincrement=True)
    candidate_id = Column(String, ForeignKey("candidates.id"), nullable=False)
    exam_id = Column(String, ForeignKey("exams.id"), nullable=False)
    
    trust_score = Column(Float, default=100.0)      # 0-100 score
    impersonation_risk = Column(Float, default=0.0) # 0-100 risk %
    ai_assistance_risk = Column(Float, default=0.0) # 0-100 risk %
    collusion_risk = Column(Float, default=0.0)      # 0-100 risk %
    verdict = Column(String, default="APPROVED")     # APPROVED, REVIEW, TERMINATED
    
    timestamp = Column(DateTime, default=datetime.utcnow)

    # Relationships
    candidate = relationship("Candidate", back_populates="risk_scores")
    exam = relationship("Exam", back_populates="risk_scores")


class Investigation(Base):
    """Auditable proctor review records tracking incidents, notes, and adjudications."""
    __tablename__ = "investigations"

    id = Column(String, primary_key=True, index=True)  # e.g., AL-7712
    candidate_id = Column(String, ForeignKey("candidates.id"), nullable=False)
    category = Column(String, nullable=False)  # IMPERSONATION, AI_ASSISTANCE, COLLUSION, COGNITIVE
    risk_score = Column(Float, nullable=False)
    resolved = Column(Boolean, default=False)
    resolution = Column(String, nullable=True)  # RESOLVED_FALSE_POSITIVE, TERMINATED_INVALID
    
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    candidate = relationship("Candidate", back_populates="investigations")
    notes = relationship("AgentNote", back_populates="investigation")


class AgentNote(Base):
    """Supervisor notes appended during forensic audit procedures."""
    __tablename__ = "agent_notes"

    id = Column(Integer, primary_key=True, autoincrement=True)
    investigation_id = Column(String, ForeignKey("investigations.id"), nullable=False)
    text = Column(Text, nullable=False)
    author = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

    # Relationships
    investigation = relationship("Investigation", back_populates="notes")


class TimelineEvent(Base):
    """Continuous behavioral drift checkpoints logging deviations over time."""
    __tablename__ = "timeline_events"

    id = Column(Integer, primary_key=True, autoincrement=True)
    candidate_id = Column(String, ForeignKey("candidates.id"), nullable=False)
    timestamp = Column(String, nullable=False)  # Time format "HH:MM"
    title = Column(String, nullable=False)      # e.g., "Typing Drift Spike"
    description = Column(Text, nullable=False)
    severity = Column(String, default="INFO")    # INFO, WARNING, CRITICAL

    # Relationships
    candidate = relationship("Candidate", back_populates="timeline_events")


class AgentOutput(Base):
    """Individual sensor-specific agent match evaluation logs."""
    __tablename__ = "agent_outputs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    candidate_id = Column(String, index=True, nullable=False)
    session_id = Column(String, index=True, nullable=False)
    
    agent_name = Column(String, nullable=False) # typing_biometrics, mouse_dynamics, etc.
    match_percentage = Column(Float, nullable=False)
    drift_percentage = Column(Float, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)


class ReplaySession(Base):
    """Buffers containing cursor coordinates, speed evolutions, and keystrokes for forensic replay."""
    __tablename__ = "replay_sessions"

    id = Column(String, primary_key=True, index=True)  # candidate_id
    cursor_paths = Column(JSON, nullable=False)         # [{"x": 100, "y": 200, "t": 120}]
    keystroke_sequences = Column(JSON, nullable=False)  # [{"key": "A", "duration": 80, "t": 55}]
    navigation_path = Column(JSON, nullable=False)      # ["Q1", "Q5", "Q2"]
    focus_changes = Column(JSON, nullable=False)        # [{"event": "blur", "t": 1402}]
    trust_score_evolution = Column(JSON, nullable=False)# [{"t": 0, "score": 100}, {"t": 10, "score": 91}]


class AuditLog(Base):
    """Immutable record logs stamped into the regulatory digital-twin system ledger."""
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True, index=True)  # e.g., LG-001
    timestamp = Column(String, nullable=False)          # e.g. "2023-11-24 14:02:11.002"
    log_type = Column(String, nullable=False)           # DATA_EXPORT, USER_ACTION, SECURITY_ALERT, SYSTEM_EVENT
    description = Column(Text, nullable=False)
    operator = Column(String, ForeignKey("users.id"), nullable=False)
    hash = Column(String, nullable=False, unique=True)  # Cryptographic hash anchor block

    # Relationships
    operator_rel = relationship("User", back_populates="audit_logs")
