<div align="center">

# 🛡️ CDT-X Operations Console

**Continuous Digital Trust — Behavioral Identity Layer for High-Stakes Examinations**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Hugging%20Face-yellow?logo=huggingface)](https://huggingface.co/spaces/Harshit18930/cdt-x-operations-console)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue)](LICENSE)
[![Node](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org)

</div>

---

## What is CDT-X?

CDT-X is an enterprise-grade **examination integrity and behavioral forensics platform**. Instead of relying on invasive webcam proctoring, it builds a continuous **Digital Twin** of each candidate — a behavioral fingerprint derived from keystroke dynamics, mouse trajectories, cognitive response latency, and linguistic stylometry — and flags deviations in real time.

No camera. No privacy invasion. Just math.

---

## The Problem CDT-X Solves

Traditional online proctoring requires candidates to be recorded on video, raising serious privacy concerns and creating massive data liability for institutions. CDT-X replaces that model with **passive behavioral biometrics** — signals the candidate produces naturally while taking the exam — giving institutions the same fraud detection capability with a fraction of the privacy cost.

| Traditional Proctoring | CDT-X |
|---|---|
| Video recording required | No camera needed |
| Human review of footage | Automated multi-agent analysis |
| Binary pass/fail flag | Continuous trust score (0–100) |
| Post-hoc investigation | Real-time intervention capability |
| Data liability (video stored) | Lightweight telemetry only |

---

## Live Demo

> **[View the live deployment on Hugging Face Spaces →](https://huggingface.co/spaces/Harshit18930/cdt-x-operations-console)**

The console ships with a built-in scenario simulator. On first load, use the **Scenario Selector** in the header to switch between:

| Scenario | What it simulates |
|---|---|
| `NORMAL` | Clean baseline — all agents scoring above threshold |
| `IMPERSONATION` | Typing cadence and mouse dynamics mismatch the registered profile |
| `AI_ASSISTED` | Stylometric drift and sub-240ms cognitive solve times |
| `COLLUSION` | Cross-station navigation correlation and answer-sequence overlap |

The **Judge Walkthrough Panel** (bottom-right on any view) guides you through the key signals in each scenario.

---

## Core Capabilities

### 🧬 Behavioral Fingerprinting
Captures and continuously compares six biometric channels against the candidate's registered Digital Twin baseline:

- **Keystroke Dynamics** — dwell time, flight time, inter-key intervals
- **Mouse Dynamics** — Bézier curvature, angular velocity, jerk coefficient
- **Navigation Behavior** — question-jump patterns, focus-loss events, clipboard activity
- **Writing Stylometry** — type-token ratio, lexical diversity, perplexity index
- **Cognitive Latency** — response velocity per question complexity tier
- **Collusion Correlator** — cross-station behavioral synchrony detection

### 🤖 Multi-Agent Scoring Engine
Six decoupled agents run independently and feed a **Consensus Scoring Engine** that produces a weighted Trust Score. No single agent can trigger a flag alone — the system requires corroborating evidence across channels.

```
Telemetry In → Feature Extraction → Digital Twin Match → Agent Array → Consensus → Audit Log
```

### 🔬 Forensic Investigation Desk
Every flagged alert includes:
- **What happened** — plain-language summary of the detected anomaly
- **Why it happened** — probable cause with evidence chain
- **Evidence used** — which biometric channels triggered
- **Recommended action** — escalation path for the operator
- **Confidence score** — how certain the system is (0–100%)

### 📋 Immutable Audit Ledger
Every system action — alert raised, verdict issued, adjudication override — is written to a tamper-evident log with a hash chain. Operators can export ledger entries for regulatory compliance.

### 🏢 Operations Control Room
Real-time dashboard showing:
- Live Trust Score heatmap across all exam seats
- Active session progress per testing center
- Alert queue with bulk resolve capability
- KPI strip (active candidates, risk distribution, global integrity index)

### 🎭 Candidate Portal (SDK Demo)
A full simulation of what the candidate sees — enrollment, biometric calibration (typing, mouse, reading, writing), and the live telemetry stream during the exam. Ships with the `cdtx.sdk.js` browser SDK that any exam platform can embed.

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Browser (React 19)                  │
│  Control Room │ Investigations │ Digital Twin │ ...  │
└──────────────────────┬──────────────────────────────┘
                       │ REST API
┌──────────────────────▼──────────────────────────────┐
│            Express / TypeScript Server               │
│   In-memory simulation engine  │  REST API layer     │
│   Candidate state (db.json)    │  Input validation   │
└──────────────────────┬──────────────────────────────┘
                       │ (optional — set PYTHON_API_URL)
┌──────────────────────▼──────────────────────────────┐
│          Python FastAPI Backend (reference)          │
│  Multi-agent scoring  │  PostgreSQL  │  Redis cache  │
└─────────────────────────────────────────────────────┘
```

> **Architecture note:** The running demo uses the Express/TypeScript server with an in-memory simulation engine — no external database required. The Python/FastAPI backend in `/backend` is the production reference implementation with real PostgreSQL persistence and Redis caching. Set `PYTHON_API_URL` in `.env` to proxy API calls to it.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript 5.8, Tailwind CSS v4 |
| Animations | Motion (Framer Motion v12) |
| Charts | Recharts |
| Icons | Lucide React |
| Server | Express 4, TypeScript, tsx |
| Build | Vite 6, esbuild |
| Reference Backend | Python 3.11, FastAPI, SQLAlchemy, PostgreSQL, Redis |
| Deployment | Docker, Hugging Face Spaces |

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher

### Run locally (simulation mode — no database needed)

```bash
# 1. Clone
git clone https://github.com/your-org/cdt-x-operations-console.git
cd cdt-x-operations-console

# 2. Install dependencies
npm install

# 3. Copy environment template
cp .env.example .env
# Edit .env — at minimum set GEMINI_API_KEY if you want AI features

# 4. Start the dev server
npm run dev

# 5. Open the console
open http://localhost:3000
```

### Run with the Python backend (full stack)

```bash
# Terminal 1 — Python API
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
DATABASE_URL=postgresql://... uvicorn app.main:app --reload --port 8000

# Terminal 2 — Node server pointing at Python API
PYTHON_API_URL=http://localhost:8000 npm run dev
```

### Run with Docker Compose (full stack, one command)

```bash
cp .env.example .env
# Fill in POSTGRES_PASSWORD, REDIS_URL, GEMINI_API_KEY in .env

docker compose -f backend/docker-compose.yml up --build
# Console available at http://localhost:7860
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values. **Never commit `.env` to source control.**

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Yes (AI features) | Google Gemini API key for AI-powered analysis |
| `APP_URL` | Production | Public URL of the deployed app |
| `ALLOWED_ORIGINS` | Production | Comma-separated list of allowed CORS origins |
| `OPERATOR_TOKEN` | Production | Bearer token required for mutating API routes |
| `DATABASE_URL` | Full stack | PostgreSQL connection string |
| `REDIS_URL` | Full stack | Redis connection string |
| `PYTHON_API_URL` | Optional | URL of the FastAPI backend; enables full-stack mode |
| `PORT` | Optional | Server port (default: 3000) |

---

## Project Structure

```
cdt-x-operations-console/
├── src/
│   ├── components/
│   │   ├── ControlRoomView.tsx       # Main operations dashboard
│   │   ├── InvestigationsView.tsx    # Forensic investigation desk
│   │   ├── AuditLedgerView.tsx       # Immutable audit log
│   │   ├── CandidatePortalView.tsx   # Candidate-facing portal & SDK demo
│   │   ├── DigitalTwinExplorerView.tsx
│   │   ├── BehaviorReplayView.tsx
│   │   ├── BoardroomDashboardView.tsx
│   │   ├── JudgeWalkthroughPanel.tsx # Hackathon demo guide
│   │   └── ...
│   ├── App.tsx                       # Root — state, routing, simulation loop
│   ├── SimulationEngine.ts           # Alert + ledger generation
│   ├── DecisionEngine.ts             # Alert lifecycle & intelligence
│   ├── types.ts                      # Shared TypeScript types
│   └── index.css                     # Global styles (Tailwind)
├── server.ts                         # Express server + REST API
├── server-db.ts                      # File-based candidate state store
├── public/
│   └── cdtx.sdk.js                  # Embeddable browser telemetry SDK
├── backend/                          # Python FastAPI reference backend
│   ├── app/
│   │   ├── agents.py                 # Multi-agent scoring engine
│   │   ├── models.py                 # SQLAlchemy ORM models
│   │   ├── routers.py                # FastAPI route handlers
│   │   ├── services.py               # Business logic
│   │   ├── simulator.py              # Scenario simulation
│   │   └── twin_engine.py            # Digital twin matching
│   ├── requirements.txt
│   └── docker-compose.yml
├── data/
│   └── db.json                       # Runtime candidate state (gitignored in prod)
├── .env.example
├── Dockerfile
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## API Reference

All routes are served by the Express server at `/api`.

### Health

```
GET /api/health
→ { status: "ONLINE", engine: "CDT-X Express Replica Engine" }
```

### Exam Session

```
POST /api/exam/start          { candidate_id }
POST /api/exam/submit         { candidate_id }
POST /api/behavior/event      { candidate_id, event_type, payload }
```

### Candidate Intelligence

```
GET /api/candidate/:id/trust          Trust score + primary findings
GET /api/candidate/:id/timeline       Chronological event timeline
GET /api/candidate/:id/digital-twin   Baseline biometric profile
GET /api/candidate/:id/investigation  Investigation brief
GET /api/candidate/:id/replay         Cursor path + keystroke replay data
```

### Adjudication *(requires OPERATOR_TOKEN in production)*

```
POST /api/candidate/:id/adjudicate    { action: "RESOLVED_FALSE_POSITIVE" | "TERMINATE" }
```

### Simulation

```
POST /api/simulate/normal
POST /api/simulate/impersonation
POST /api/simulate/ai-assisted
POST /api/simulate/collusion
```

### Dashboard

```
GET /api/dashboard/overview    Global KPIs + active sessions
GET /api/architecture          System architecture metadata
GET /api/infrastructure/status Infra connection status (credentials masked)
```

---

## Browser SDK

Embed `cdtx.sdk.js` in any exam platform to start streaming telemetry:

```html
<script src="https://your-cdtx-instance.com/cdtx.sdk.js"></script>
<script>
  CDTX.init({ server: 'https://your-cdtx-instance.com' });
  CDTX.startExam('CANDIDATE_ID_HERE');

  // Call when the exam ends
  // CDTX.endExam();
</script>
```

The SDK captures keystrokes, mouse movement (throttled to 100ms), focus/blur events, and clipboard paste events — and batches them to `/api/behavior/event` every 5 seconds.

---

## Security & Ethics

CDT-X is built with privacy as a first-order constraint, not an afterthought.

**What we collect:**
- Keystroke timing metadata (not the content of what is typed)
- Mouse coordinate vectors and velocity profiles
- Focus/blur window events
- Aggregate writing style metrics (not the answer content)

**What we never collect:**
- Screen recordings or screenshots
- Webcam or microphone data
- Answer content or question responses
- Any personally identifiable information beyond the candidate ID

**Operator safeguards:**
- Every adjudication action is written to the immutable audit ledger
- No automated termination — all TERMINATE verdicts require a human operator
- All flagged alerts include a full evidence chain so operators can verify before acting
- False positive resolution is a first-class workflow

---

## Roadmap

- [x] Unit test suite for DecisionEngine and SimulationEngine (Vitest)
- [x] TypeScript strict mode across all components
- [x] Accessibility audit (WCAG 2.1 AA compliance)
- [ ] Plug Python FastAPI backend into the live demo (remove Express simulation layer)
- [ ] Add operator authentication (JWT-based login)
- [ ] Mobile-responsive layout for tablet-based proctoring stations
- [ ] Exportable PDF investigation reports
- [ ] Webhook support for real-time alert push to external SIEM systems

---

## Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

```bash
# Lint
npm run lint          # tsc --noEmit

# Build
npm run build

# Preview production build
npm run start
```

---

## License

Apache 2.0 — see [LICENSE](LICENSE) for details.

---

<div align="center">

Built with ❤️ by **Harshit Ranbhare**
B.Tech Information Technology (AI & ML)

Built for **Far Away 2026** Hackathon

*Examination integrity without surveillance.*

</div>
