/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

// Local cache representing running digital twin sessions on the server side
interface SimulatedCandidate {
  candidateId: string;
  scenario: string;
  trustScore: number;
  impersonationRisk: number;
  aiAssistanceRisk: number;
  collusionRisk: number;
  verdict: "APPROVED" | "REVIEW" | "TERMINATED";
  agentBreakdown: { agent_name: string; match: number; drift: number }[];
  timeline: { timestamp: string; title: string; desc: string; severity: "INFO" | "WARNING" | "CRITICAL" }[];
}

const dbCache: Record<string, SimulatedCandidate> = {};

// Generator simulation helper functions
function getNormalProfile(cid: string): SimulatedCandidate {
  return {
    candidateId: cid,
    scenario: "NORMAL_BASELINE",
    trustScore: 94.2,
    impersonationRisk: 5.8,
    aiAssistanceRisk: 4.2,
    collusionRisk: 2.1,
    verdict: "APPROVED",
    agentBreakdown: [
      { agent_name: "typing_biometrics", match: 94.2, drift: 5.8 },
      { agent_name: "mouse_dynamics", match: 88.5, drift: 11.5 },
      { agent_name: "navigation", match: 96.0, drift: 4.0 },
      { agent_name: "writing_stylometry", match: 93.0, drift: 7.0 },
      { agent_name: "cognitive_latency", match: 91.0, drift: 9.0 },
      { agent_name: "collusion_correlator", match: 97.9, drift: 2.1 }
    ],
    timeline: [
      { timestamp: "14:00", title: "Continuous Auth Active", desc: "Biometric channels initialized.", severity: "INFO" },
      { timestamp: "14:12", title: "Reference Signature Match", desc: "Typing and mouse drift indices securely aligned.", severity: "INFO" },
      { timestamp: "14:24", title: "Cognitive Response Peak", desc: "Response latency aligns with historical aptitude averages.", severity: "INFO" }
    ]
  };
}

function getImpersonationProfile(cid: string): SimulatedCandidate {
  return {
    candidateId: cid,
    scenario: "IMPERSONATION_THEFT",
    trustScore: 42.4,
    impersonationRisk: 94.2,
    aiAssistanceRisk: 12.5,
    collusionRisk: 8.4,
    verdict: "TERMINATED",
    agentBreakdown: [
      { agent_name: "typing_biometrics", match: 36.5, drift: 63.5 },
      { agent_name: "mouse_dynamics", match: 42.0, drift: 58.0 },
      { agent_name: "navigation", match: 88.0, drift: 12.0 },
      { agent_name: "writing_stylometry", match: 91.0, drift: 9.0 },
      { agent_name: "cognitive_latency", match: 85.0, drift: 15.0 },
      { agent_name: "collusion_correlator", match: 91.6, drift: 8.4 }
    ],
    timeline: [
      { timestamp: "14:00", title: "Continuous Auth Active", desc: "Biometric channels initialized.", severity: "INFO" },
      { timestamp: "14:02", title: "Flight-Time Mismatch", desc: "Continuous typing drift exceeds 40% threshold.", severity: "CRITICAL" },
      { timestamp: "14:07", title: "Robotic Arc Detected", desc: "Flat cursor paths indicating hardware script inputs.", severity: "WARNING" },
      { timestamp: "14:20", title: "Session Closed Code 48", desc: "Lockdown unit restricts access to workstation.", severity: "CRITICAL" }
    ]
  };
}

function getAiAssistedProfile(cid: string): SimulatedCandidate {
  return {
    candidateId: cid,
    scenario: "AI_GENERATED_INTELECT",
    trustScore: 61.2,
    impersonationRisk: 14.8,
    aiAssistanceRisk: 72.0,
    collusionRisk: 5.5,
    verdict: "REVIEW",
    agentBreakdown: [
      { agent_name: "typing_biometrics", match: 89.2, drift: 10.8 },
      { agent_name: "mouse_dynamics", match: 91.0, drift: 9.0 },
      { agent_name: "navigation", match: 58.0, drift: 42.0 },
      { agent_name: "writing_stylometry", match: 45.0, drift: 55.0 },
      { agent_name: "cognitive_latency", match: 48.0, drift: 52.0 },
      { agent_name: "collusion_correlator", match: 94.5, drift: 5.5 }
    ],
    timeline: [
      { timestamp: "14:00", title: "Continuous Auth Active", desc: "Biometric channels initialized.", severity: "INFO" },
      { timestamp: "14:11", title: "Linguistic Divergence", desc: "Vocabulary perplexity shifted. Stylometric drift +55%.", severity: "CRITICAL" },
      { timestamp: "14:15", title: "Fast Cognition Latency", desc: "High complexity question solved under 240ms.", severity: "WARNING" }
    ]
  };
}

function getCollusionProfile(cid: string): SimulatedCandidate {
  return {
    candidateId: cid,
    scenario: "COLLUSION_R_COHORT",
    trustScore: 48.0,
    impersonationRisk: 22.4,
    aiAssistanceRisk: 18.0,
    collusionRisk: 88.0,
    verdict: "REVIEW",
    agentBreakdown: [
      { agent_name: "typing_biometrics", match: 88.2, drift: 11.8 },
      { agent_name: "mouse_dynamics", match: 84.0, drift: 16.0 },
      { agent_name: "navigation", match: 82.0, drift: 18.0 },
      { agent_name: "writing_stylometry", match: 86.0, drift: 14.0 },
      { agent_name: "cognitive_latency", match: 52.0, drift: 48.0 },
      { agent_name: "collusion_correlator", match: 12.0, drift: 88.0 }
    ],
    timeline: [
      { timestamp: "14:00", title: "Continuous Auth Active", desc: "Biometric channels initialized.", severity: "INFO" },
      { timestamp: "14:12", title: "Synchronized Page Hop", desc: "Question navigation correlated on adjacent stations.", severity: "WARNING" },
      { timestamp: "14:22", title: "Answers Path Overlap", desc: "Response sequences show 98% matching pattern.", severity: "CRITICAL" }
    ]
  };
}

function resolveCandidate(cid: string): SimulatedCandidate {
  const norm_cid = cid.toUpperCase();
  if (dbCache[norm_cid]) return dbCache[norm_cid];
  
  // Seed initial values to keep preview beautiful without blank screens
  if (norm_cid.includes("ROHAN") || norm_cid.includes("AL-7712") || norm_cid.includes("89921")) {
    dbCache[norm_cid] = getImpersonationProfile(cid);
  } else if (norm_cid.includes("AARAV") || norm_cid.includes("1102") || norm_cid.includes("73322")) {
    dbCache[norm_cid] = getAiAssistedProfile(cid);
  } else if (norm_cid.includes("NEHA") || norm_cid.includes("9942") || norm_cid.includes("44112")) {
    dbCache[norm_cid] = getCollusionProfile(cid);
  } else {
    // Memory limit guard: prevent infinite cache growth DoS
    const cacheKeys = Object.keys(dbCache);
    if (cacheKeys.length >= 200) {
      // Evict an arbitrary item (first one that isn't one of the core mock candidates)
      const coreKeys = ["ROHAN", "AARAV", "NEHA", "AL-7712", "EXM-88219-B", "EXM-44102-X", "EXM-10294-Z"];
      const keyToEvict = cacheKeys.find(key => !coreKeys.some(ck => key.includes(ck)));
      if (keyToEvict) {
        delete dbCache[keyToEvict];
      } else {
        // Fallback: evict the first key
        delete dbCache[cacheKeys[0]];
      }
    }
    dbCache[norm_cid] = getNormalProfile(cid);
  }
  return dbCache[norm_cid];
}


async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(express.json());

  // Input Sanitization Security Middleware (Prototype Pollution & Command Injection defense)
  app.param("id", (req, res, next, id) => {
    const upper = String(id).toUpperCase();
    if (upper === "__PROTO__" || upper === "CONSTRUCTOR" || upper === "PROTOTYPE" || !/^[A-Z0-9_\-]+$/i.test(id)) {
      res.status(400).json({ error: "Invalid candidate identifier format." });
      return;
    }
    next();
  });

  app.use((req, res, next) => {
    if (req.body && req.body.candidate_id) {
      const cid = String(req.body.candidate_id);
      const upper = cid.toUpperCase();
      if (upper === "__PROTO__" || upper === "CONSTRUCTOR" || upper === "PROTOTYPE" || !/^[A-Z0-9_\-]+$/i.test(cid)) {
        res.status(400).json({ error: "Invalid candidate identifier format." });
        return;
      }
    }
    next();
  });

  // --- REST ARCHITECTURE APIS ---

  app.get("/api/health", (req, res) => {
    res.json({ status: "ONLINE", engine: "CDT-X Express Replica Engine" });
  });

  app.get("/api/infrastructure/status", (req, res) => {
    const dbUrl = process.env.DATABASE_URL || "postgresql://cdtx_admin:cdtx_secure_pass@localhost:5432/cdtx_integrity_db";
    const redisUrl = process.env.REDIS_URL || "redis://localhost:6379/0";

    const maskUrl = (raw: string) => {
      try {
        // Handle protocol://user:pass@host/db format
        const withProtocol = raw.includes("://") ? raw : `http://${raw}`;
        const parts = withProtocol.split("@");
        if (parts.length > 1) {
          const prefix = parts[0].split("://");
          const protocol = prefix[0];
          const suffix = parts.slice(1).join("@");
          return `${protocol}://***:***@${suffix}`;
        }
        return raw;
      } catch (e) {
        return "configured";
      }
    };

    res.json({
      db_configured: !!process.env.DATABASE_URL,
      redis_configured: !!process.env.REDIS_URL,
      db_masked: maskUrl(dbUrl),
      redis_masked: maskUrl(redisUrl),
      db_type: "PostgreSQL Server Link",
      redis_type: "Redis In-Memory Cache Store",
      status: "STABLE",
      latency: "0.85ms"
    });
  });

  // Start Exam
  app.post("/api/exam/start", (req, res) => {
    const cid = (req.body.candidate_id || "USR_DEFAULT").toUpperCase();
    dbCache[cid] = getNormalProfile(cid);
    res.json({ success: true, message: `Telemetry channels initialized for Candidate ${cid}.` });
  });

  // Track behavior
  app.post("/api/behavior/event", (req, res) => {
    const { candidate_id, event_type, payload } = req.body;
    const cid = (candidate_id || "USR_DEFAULT").toUpperCase();
    const candidate = resolveCandidate(cid);
    
    // Simulate interactive copy paste drop in score!
    if (event_type === "KEYSTROKE" && payload?.key === "v" && Array.isArray(payload.modifiers) && payload.modifiers.length > 0) {
      candidate.trustScore = Math.max(10, candidate.trustScore - 15);
      candidate.aiAssistanceRisk = Math.min(100, candidate.aiAssistanceRisk + 20);
      candidate.timeline.unshift({
        timestamp: "Active",
        title: "Virtual Clipboard Paste Blocked",
        desc: "Instantaneous character stream insert action detected on active response textarea.",
        severity: "CRITICAL"
      });
    }

    res.json({ success: true, message: "Telemetry packet filtered and recorded." });
  });

  // Submit
  app.post("/api/exam/submit", (req, res) => {
    res.json({ success: true, message: "Continuous authentication channel closed safely." });
  });

  // Get Candidate Trust details
  app.get("/api/candidate/:id/trust", (req, res) => {
    const cid = req.params.id;
    const candidate = resolveCandidate(cid);
    
    // Formulate explainable findings automatically
    const findings: string[] = [];
    if (candidate.scenario === "IMPERSONATION_THEFT") {
      findings.push("Typing Cadence Drift +63.5% (Severe keystroke rhythm mismatch)");
      findings.push("Mouse Fluidity Deviation +58.0% (Robotic mouse acceleration profiles)");
    } else if (candidate.scenario === "AI_GENERATED_INTELECT") {
      findings.push("Linguistic Style Shift +55.0% (Type-Token word distributions indicating AI templates)");
      findings.push("Cognitive Solves Latency Alert (Complexity matrices solved under 240ms)");
    } else if (candidate.scenario === "COLLUSION_R_COHORT") {
      findings.push("Answers Sequencing Correlated +88.0% (High risk coefficient matching nearby workstation)");
    } else {
      findings.push("Linguistic styles, mouse movements and flight velocity profiles perfectly aligned.");
    }

    res.json({
      candidate_id: cid,
      trust_score: candidate.trustScore,
      impersonation_risk: candidate.impersonationRisk,
      ai_assistance_risk: candidate.aiAssistanceRisk,
      collusion_risk: candidate.collusionRisk,
      verdict: candidate.verdict,
      findings: {
        trust_score: candidate.trustScore,
        primary_findings: findings,
        confidence: candidate.trustScore > 80 ? "98.2%" : "94.5%",
        evaluated_at: "REAL-TIME SYNC"
      }
    });
  });

  // Timeline events
  app.get("/api/candidate/:id/timeline", (req, res) => {
    const candidate = resolveCandidate(req.params.id);
    res.json({ candidate_id: req.params.id, events: candidate.timeline });
  });

  // Digital twin baseline profile
  app.get("/api/candidate/:id/digital-twin", (req, res) => {
    res.json({
      id: `TWN-${req.params.id.toUpperCase()}`,
      candidate_id: req.params.id,
      similarity_threshold: 85.0,
      drift_tolerance: 15.0,
      typing_signature: { avg_hold_ms: 78.5, avg_flight_ms: 112.1, error_rate: 2.15 },
      mouse_signature: { bezier_jerk: 1.48, avg_velocity: 412.0 },
      writing_signature: { average_words: 15.4, ttr_diversity: 0.68, perplexity: 82.4 },
      created_at: new Date().toISOString()
    });
  });

  // Investigations brief
  app.get("/api/candidate/:id/investigation", (req, res) => {
    const candidate = resolveCandidate(req.params.id);
    let category = "IMPERSONATION";
    if (candidate.scenario === "AI_GENERATED_INTELECT") {
      category = "AI_ASSISTANCE";
    } else if (candidate.scenario === "COLLUSION_R_COHORT") {
      category = "COLLUSION";
    }

    res.json({
      id: `AL-${req.params.id.substring(0, 4).toUpperCase()}`,
      candidate_id: req.params.id,
      candidate_name: req.params.id,
      category,
      risk_score: 100 - candidate.trustScore,
      resolved: candidate.verdict === "APPROVED",
      resolution: candidate.verdict === "APPROVED" ? "RESOLVED_FALSE_POSITIVE" : null,
      created_at: new Date().toISOString()
    });
  });

  // Adjudicate verdict override
  app.post("/api/candidate/:id/adjudicate", (req, res) => {
    const { action } = req.body;
    const candidate = resolveCandidate(req.params.id);
    
    if (action === "RESOLVED_FALSE_POSITIVE") {
      candidate.trustScore = 98.4;
      candidate.verdict = "APPROVED";
      candidate.scenario = "NORMAL_BASELINE";
      candidate.impersonationRisk = 1.2;
      candidate.aiAssistanceRisk = 0.8;
      candidate.collusionRisk = 0.5;
    } else {
      candidate.trustScore = 0.0;
      candidate.verdict = "TERMINATED";
      candidate.timeline.unshift({
        timestamp: "Active",
        title: "Session Terminated",
        desc: "L3 Supervisor invalidated exam session due to forensic breaches.",
        severity: "CRITICAL"
      });
    }

    res.json({ success: true, message: `Resolution updated to ${action}.` });
  });

  // Replay data coordinates compiler
  app.get("/api/candidate/:id/replay", (req, res) => {
    const cid = req.params.id;
    const candidate = resolveCandidate(cid);
    
    // Synthesize 40 random vector coordinates matching candidate scenario
    const cursor_paths = [];
    const keystroke_sequences = [];
    const trust_score_evolution = [];
    
    for (let i = 0; i < 40; i++) {
      let x = 150 + i * 15;
      let y = 200 + Math.floor(Math.sin(i * 0.4) * 80);
      let vel = 180 + Math.random() * 90;
      
      if (candidate.scenario === "IMPERSONATION_THEFT") {
        x += (Math.random() > 0.5 ? 4 : -4); // Jagged jerky lines
        y += (Math.random() > 0.5 ? 2 : -2);
        vel = 750; // Script fast speed
      }
      
      cursor_paths.push({ x, y, timestamp: i * 500, velocity: vel });
      keystroke_sequences.push({ key: String.fromCharCode(97 + Math.floor(Math.random() * 25)), hold_ms: candidate.scenario === "IMPERSONATION_THEFT" ? 3 : 75 + Math.floor(Math.random() * 20), timestamp: i * 500 });
      trust_score_evolution.push({ seconds: i, trust: Math.max(0, candidate.trustScore + Math.sin(i * 0.5) * 2) });
    }

    res.json({
      id: cid,
      cursor_paths,
      keystroke_sequences,
      navigation_path: candidate.scenario === "NORMAL_BASELINE" ? ["Q1", "Q2", "Q3", "Q4"] : ["Q1", "Q4", "Q1", "Q30"],
      focus_changes: candidate.scenario !== "NORMAL_BASELINE" ? [{ timestamp: 8000, event: "blur" }] : [],
      trust_score_evolution
    });
  });

  // Overall dashboard stats summary
  app.get("/api/dashboard/overview", (req, res) => {
    let trustSum = 0;
    let count = 0;
    for (const key in dbCache) {
      if (dbCache[key].trustScore) {
        trustSum += dbCache[key].trustScore;
        count++;
      }
    }
    const global_index = count > 0 ? trustSum / count : 94.6;
    
    // Add realistic fluctuations in candidates and risk counts
    const solapurActive = 140 + Math.floor(Math.sin(Date.now() / 15000) * 8);
    const hyderabadActive = 87 + Math.floor(Math.cos(Date.now() / 12000) * 3);
    const puneActive = 233 + Math.floor(Math.sin(Date.now() / 18000) * 5);
    
    res.json({
      global_integrity_index: parseFloat(Math.max(88, Math.min(99, global_index + Math.sin(Date.now() / 5000) * 1.5)).toFixed(2)),
      active_supervised_stations: 2500 + Math.floor(Math.cos(Date.now() / 8000) * 15),
      total_alerts: count || 4,
      resolved_alerts: Object.values(dbCache).filter(c => c.verdict === "APPROVED").length,
      active_sessions: [
        { id: "EXM-88219-B", location: "Solapur (SOL-01) Central Hub", candidatesActive: solapurActive, candidatesTotal: 150, progress: Math.min(99, 45 + Math.floor((Date.now() % 100000) / 10000)), riskHigh: 2, riskMed: 8, riskLow: solapurActive - 10, status: "STABLE" },
        { id: "EXM-44102-X", location: "Hyderabad (HYD-02) Tech Center", candidatesActive: hyderabadActive, candidatesTotal: 90, progress: Math.min(99, 88 + Math.floor((Date.now() % 50000) / 10000)), riskHigh: 1, riskMed: 3, riskLow: hyderabadActive - 4, status: "ANOMALY" },
        { id: "EXM-10294-Z", location: "Pune (PUN-03) Operations Hub", candidatesActive: puneActive, candidatesTotal: 240, progress: Math.min(99, 92 + Math.floor((Date.now() % 40000) / 10000)), riskHigh: 1, riskMed: 4, riskLow: puneActive - 5, status: "STABLE" }
      ]
    });
  });

  // Trigger Simulators
  app.post("/api/simulate/normal", (req, res) => {
    const cid = (req.body.candidate_id || "AL-7712").toUpperCase();
    dbCache[cid] = getNormalProfile(cid);
    res.json({ success: true, message: `Simulator: Candidate ${cid} initialized with Normal baseline.` });
  });

  app.post("/api/simulate/impersonation", (req, res) => {
    const cid = (req.body.candidate_id || "AL-7712").toUpperCase();
    dbCache[cid] = getImpersonationProfile(cid);
    res.json({ success: true, message: `Simulator: Candidate ${cid} initialized as Impersonation.` });
  });

  app.post("/api/simulate/ai-assisted", (req, res) => {
    const cid = (req.body.candidate_id || "AL-7712").toUpperCase();
    dbCache[cid] = getAiAssistedProfile(cid);
    res.json({ success: true, message: `Simulator: Candidate ${cid} initialized as AI Assisted.` });
  });

  app.post("/api/simulate/collusion", (req, res) => {
    const cid = (req.body.candidate_id || "AL-7712").toUpperCase();
    dbCache[cid] = getCollusionProfile(cid);
    res.json({ success: true, message: `Simulator: Candidate ${cid} initialized as Colluding.` });
  });

  // System Architecture Endpoints
  app.get("/api/architecture", (req, res) => {
    res.json({
      system_name: "CDT-X Behavioral Continuous Authentication Architecture",
      description: "Continuous multi-agent intelligence pipeline correlating somatic mouse/keystroke coordinates into Digital Twin match curves.",
      layers: [
        { step: 1, name: "Telemetry Client-In", payload: "Coordinates, Milliseconds timings, key press ranges" },
        { step: 2, name: "Feature Extract Service", payload: "Hold times, flight speed, type-token vocabulary density coefficient" },
        { step: 3, name: "Digital Twin Engine", payload: "512-dimensional embedding Euclidean/Cosine alignments vector space" },
        { step: 4, name: "Multi-Agent Neural Array", payload: "Decoupled evaluations of typing, mouse, nav, cognitive, stylometric and collusion signatures" },
        { step: 5, name: "Consensus Scoring Engine", payload: "Weighted decision aggregation, trust calculations, anomaly alerts classification" },
        { step: 6, name: "Auditor Cryptledger", payload: "Immutable compliance block logging hashing verification records" }
      ]
    });
  });


  // --- VITE DEV MIDDLEWARE AND STATIC SERVING CONFIGS ---

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[CDT-X] Intelligent server deployed on port ${PORT}`);
    console.log(`  ➜  Local:   http://localhost:${PORT}/`);
  });
}

startServer();
