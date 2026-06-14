/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Network, 
  Database, 
  Cpu, 
  Layers, 
  GitBranch, 
  ShieldCheck, 
  Lock,
  ArrowRight,
  Info,
  Sliders,
  Sparkles,
  FileText,
  Laptop
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ArchNode {
  id: string;
  name: string;
  label: string;
  valueSentence: string;
  inputs: string[];
  outputs: string[];
  models: string[];
  features: string[];
  structures: string;
  description: string;
}

const pipelineNodes: ArchNode[] = [
  {
    id: "device",
    name: "Student Device",
    label: "Physical Client Environment",
    valueSentence: "The physical workstation running the exam interface, generating local hardware events.",
    inputs: [
      "Candidate mechanical typing keystrokes",
      "Physical mouse movements & clicks",
      "Browser tab focus state signals"
    ],
    outputs: [
      "Hardware keystroke interrupt timings",
      "Raw viewport-relative mouse coordinate streams"
    ],
    models: [
      "Workstation Edge Agent Validation Filter"
    ],
    features: [
      "Key dwell rhythms",
      "Mouse coordinate streams",
      "Browser window blur triggers"
    ],
    structures: `struct LocalDeviceContext {
  uint64_t device_id_hash;
  char os_version[32];
  bool input_captures_granted;
};`,
    description: "Operates locally within the candidate's browser window, capturing raw user-generated hardware events before any server network delay or jitter can skew timing values."
  },
  {
    id: "collection",
    name: "Behavior Collection",
    label: "Microscopic Signal Ingestion",
    valueSentence: "Ingests microscopic mouse coordinates and keypress interrupt intervals directly from the client.",
    inputs: [
      "Hardware keystroke interrupt timings",
      "Raw viewport-relative mouse coordinate streams"
    ],
    outputs: [
      "Client-side timestamped event sequences",
      "Sanitized focus state logs"
    ],
    models: [
      "Low-pass Noise Reduction Filter"
    ],
    features: [
      "Key flight durations",
      "Spline coordinate density",
      "Page focus interval markers"
    ],
    structures: `struct RawTelemetryPacket {
  uint64_t timestamp_us;
  uint16_t raw_keycode;
  double mouse_x;
  double mouse_y;
};`,
    description: "Aggregates and filters raw temporal events, packaging them into structured telemetry blocks with sub-millisecond precision to construct an accurate record of candidates' physical interaction pacing."
  },
  {
    id: "feature",
    name: "Feature Processing",
    label: "Statistical Matrix Extraction",
    valueSentence: "Transforms unstructured raw events into statistical feature matrices over sliding time blocks.",
    inputs: [
      "Client-side timestamped event sequences",
      "Sanitized focus state logs"
    ],
    outputs: [
      "Extracted flight-time matrices",
      "Bezier spline coefficient vectors"
    ],
    models: [
      "Dynamic Pacing Density Evaluator",
      "Mouse Spline Bezier Curvature Fitting"
    ],
    features: [
      "Hold duration variance index",
      "Spline jerk coefficients",
      "Focus decay parameters"
    ],
    structures: `struct TelemetryFeatureMatrix {
  double keypress_dwell_entropy;
  double bezier_trajectory_jerk;
  double reading_hesitation_index;
};`,
    description: "Transforms unstructured temporal sequences into mathematical summaries, processing speed variations, pause patterns, and navigation metrics over sliding 15-second tracking blocks."
  },
  {
    id: "profile",
    name: "Digital Behavior Profile",
    label: "Latent Identity Twin Creation",
    valueSentence: "Compiles features into a continuous multi-dimensional cryptographic identity twin.",
    inputs: [
      "Extracted flight-time matrices",
      "Bezier spline coefficient vectors"
    ],
    outputs: [
      "512-Dimensional latent behavior profile vector"
    ],
    models: [
      "CDT-X Attention Transformer Encoder Module"
    ],
    features: [
      "Cross-modal behavioral attention maps",
      "Calibration baseline coordinate embeddings"
    ],
    structures: `struct CryptographicTwinEmbedding {
  float profile_vector_512[512];
  double baseline_fit_entropy;
  uint8_t calibration_version;
};`,
    description: "Integrates multiple temporal features into a unified 512-dimensional vector. This forms a cryptographic, hardware-invariant baseline that reflects the student's unique muscle memory patterns."
  },
  {
    id: "trust",
    name: "Trust Intelligence",
    label: "Real-time Anomaly Scoring",
    valueSentence: "Compares active session telemetry against the profile baseline using multi-agent risk models.",
    inputs: [
      "512-Dimensional latent behavior profile vector",
      "Live session feature matrices"
    ],
    outputs: [
      "Dynamic Bayesian trust score index",
      "Impersonation risk consensus probability"
    ],
    models: [
      "Bayesian Kalman Filtering Engine",
      "XGBoost Multi-agent Threat Classifier"
    ],
    features: [
      "Cosine similarity drift",
      "Linguistic cadence discrepancy score"
    ],
    structures: `struct TrustIntelligenceScore {
  double consensus_trust_score;
  double volatility_index;
  char active_threat_tier[16];
};`,
    description: "Runs continuous parallel evaluation checks against the baseline, computing a rolling Bayesian trust index rather than binary outcomes. This prevents disruptive false positives from natural physical changes."
  },
  {
    id: "investigation",
    name: "Investigation Engine",
    label: "Autonomous Review Orchestrator",
    valueSentence: "Flags behavior deviations and triggers automated review processes for security operators.",
    inputs: [
      "Dynamic Bayesian trust score index",
      "Impersonation risk consensus probability"
    ],
    outputs: [
      "Forensic review cases",
      "Automated Proctor notification signals"
    ],
    models: [
      "Decision Intelligence Lifecycle Automator"
    ],
    features: [
      "Threat escalation triggers",
      "Operator decision logs",
      "Drift timeline indicators"
    ],
    structures: `struct ActiveIncidentRecord {
  char case_id[16];
  double escalation_priority;
  uint32_t active_seconds;
};`,
    description: "Monitors trust scoring and automatically spins up a proctor case when behavioral indices drop below authorized compliance limits. Gives security operators detailed explanations of anomalous dynamics."
  },
  {
    id: "compliance",
    name: "Compliance Ledger",
    label: "Immutable Auditing Registry",
    valueSentence: "Binds audit events and proctor decisions to an immutable cryptographically-signed register.",
    inputs: [
      "Forensic review cases",
      "Operator decision logs"
    ],
    outputs: [
      "Signed cryptographic audit logs"
    ],
    models: [
      "SHA-256 Block Consensus Assembler"
    ],
    features: [
      "Tamper-proof audit blocks",
      "Operator review traces"
    ],
    structures: `struct ImmutableAuditBlock {
  uint32_t block_index;
  char event_hash[64];
  char previous_signature[64];
  char consensus_root[64];
};`,
    description: "Encapsulates proctor adjustments and telemetry history into signed cryptographic log records. Provides educational institutions and regulators with verifiable proof that exam integrity checks were unbiased and compliant."
  }
];

function highlightCode(code: string) {
  const keywords = ['struct', 'uint64_t', 'uint16_t', 'uint8_t', 'uint32_t', 'char', 'bool', 'double', 'float', 'int'];
  const lines = code.split('\n');
  return lines.map((line, lineIdx) => {
    const parts = line.split(/(\s+|,|;|{|}|\(|\)|\[|\])/);
    const highlightedParts = parts.map((part, partIdx) => {
      if (keywords.includes(part)) {
        return <span key={partIdx} className="text-blue-600 font-bold">{part}</span>;
      }
      if (part.match(/^\d+$/) || part.match(/^\d+\.\d+$/)) {
        return <span key={partIdx} className="text-amber-600 font-bold">{part}</span>;
      }
      if (part.startsWith('//') || part.startsWith('/*')) {
        return <span key={partIdx} className="text-slate-400 italic">{part}</span>;
      }
      if (part.startsWith('"') || part.startsWith("'")) {
        return <span key={partIdx} className="text-emerald-600 font-semibold">{part}</span>;
      }
      if (part.match(/^[A-Z][a-zA-Z0-9_]*$/)) {
        return <span key={partIdx} className="text-indigo-600 font-bold">{part}</span>;
      }
      return <span key={partIdx} className="text-slate-800">{part}</span>;
    });
    return (
      <div key={lineIdx} className="min-h-[1.25rem]">
        {highlightedParts}
      </div>
    );
  });
}

export default function ArchitectureCenterView() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("device");
  const selectedNode = pipelineNodes.find(n => n.id === selectedNodeId) || pipelineNodes[0];

  return (
    <div className="h-full overflow-y-auto p-8 bg-[#F8FAFC] custom-scrollbar text-slate-800 pb-16">
      
      {/* Page Header */}
      <div className="mb-2.5">
        <h1 className="text-[13px] font-black tracking-tight text-[#0F172A] font-sans uppercase leading-none">
          Core Engine Process Architecture
        </h1>
        <p className="text-[10px] text-[#64748B] mt-0.5">
          Step-by-step cryptographic pipeline map showing how applicant device signals are securely processed into verified decisions.
        </p>
      </div>

      {/* Student -> CDT-X Visual Pipeline */}
      <div className="mb-6 flex flex-wrap items-center gap-1.5 p-3.5 bg-slate-50 border border-slate-200/50 rounded-xl text-[10px] font-mono text-[#475569] justify-center select-none shadow-sm animate-in fade-in duration-200">
        <span className="bg-white border border-[#E2E8F0] px-2 py-0.5 rounded-lg text-slate-800 font-bold">Student Device</span>
        <span>➔</span>
        <span className="bg-white border border-[#E2E8F0] px-2 py-0.5 rounded-lg text-slate-800 font-bold">Behavior Collection</span>
        <span>➔</span>
        <span className="bg-white border border-[#E2E8F0] px-2 py-0.5 rounded-lg text-slate-800 font-bold">Feature Extraction</span>
        <span>➔</span>
        <span className="bg-white border border-[#E2E8F0] px-2 py-0.5 rounded-lg text-slate-800 font-bold">Digital Twin</span>
        <span>➔</span>
        <span className="bg-white border border-[#E2E8F0] px-2 py-0.5 rounded-lg text-[#2563EB] font-bold">Trust Engine</span>
        <span>➔</span>
        <span className="bg-white border border-[#E2E8F0] px-2 py-0.5 rounded-lg text-slate-800 font-bold">Investigation</span>
        <span>➔</span>
        <span className="bg-white border border-[#E2E8F0] px-2 py-0.5 rounded-lg text-slate-800 font-bold">Decision</span>
        <span>➔</span>
        <span className="bg-white border border-[#E2E8F0] px-2 py-0.5 rounded-lg text-emerald-700 font-bold">Audit Record</span>
      </div>

      {/* Overview disclaimer */}
      <div className="bg-slate-100 border border-[#CBD5E1] p-3.5 rounded-xl mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Info className="w-4 h-4 text-[#2563EB] shrink-0" />
          <p className="text-xs text-[#475569] font-sans">
            <strong>SYSTEM PROCESS INTEGRITY:</strong> This schematic maps verified machine learning pipelines calibrated under <strong>CDT-X Enterprise protocols</strong>. All data representations are completely anonymized.
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold bg-[#EFF6FF] text-[#2563EB] px-2 py-0.5 rounded border border-[#BFDBFE] shrink-0">
          PROPRIETARY BEHAVIOR ENGINE
        </span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* PIPELINE STAGES LEFT COLUMN */}
        <div className="xl:col-span-5 space-y-4">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <h2 className="text-[12.5px] font-bold text-[#0F172A] font-sans uppercase tracking-wide mb-3 flex items-center gap-2">
              <Network className="w-4 h-4 text-[#2563EB]" />
              System Pipeline Stages
            </h2>
            <p className="text-[11.5px] text-[#475569] leading-relaxed mb-4">
              Select any stage to inspect inputs, outputs, models, target metrics, or exact C++ memory alignments.
            </p>

            <div className="space-y-2.5 relative">
              {/* Vertical timeline connector */}
              <div className="absolute top-8 bottom-8 left-[19px] w-0.5 bg-slate-100 z-0"></div>

              {pipelineNodes.map((node, index) => {
                const isSelected = node.id === selectedNodeId;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`w-full flex items-center gap-3.5 p-3 rounded-xl border text-left transition-all relative z-10 cursor-pointer ${
                      isSelected
                        ? 'bg-[#EFF6FF] border-[#2563EB] shadow-sm'
                        : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-slate-50'
                    }`}
                  >
                    {/* Circle identifier */}
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-[11px] shrink-0 border transition-all ${
                      isSelected
                        ? 'bg-blue-100 text-[#2563EB] border-[#BFDBFE]'
                        : 'bg-slate-50 text-slate-500 border-[#E2E8F0]'
                    }`}>
                      0{index + 1}
                    </div>

                    <div className="min-w-0 flex-grow">
                      <span className={`text-[12px] font-sans font-bold block truncate transition-colors ${isSelected ? 'text-[#0F172A]' : 'text-slate-700'}`}>
                        {node.name}
                      </span>
                      <span className="text-[9.5px] font-mono text-[#64748B] block truncate uppercase mt-0.5">{node.label}</span>
                    </div>

                    <ArrowRight className={`w-4 h-4 transition-transform shrink-0 ${isSelected ? 'text-[#2563EB] translate-x-1' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* CDT-X BROWSER SDK CARD */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-3">
            <h3 className="text-xs font-black text-[#0F172A] font-sans tracking-wide uppercase flex items-center gap-2">
              <Laptop className="w-4 h-4 text-[#2563EB]" />
              Behavior Collection SDK
            </h3>
            
            <p className="text-[11px] text-[#475569] leading-normal font-sans">
              CDT-X integrates directly with institutional infrastructure to enable rapid campus-wide deployment:
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-700">
              <div className="bg-slate-50 border border-[#E2E8F0] p-1.5 rounded-lg flex flex-col">
                <span className="text-[8.5px] text-[#64748B] uppercase font-bold">SDK Size</span>
                <span className="font-bold text-[#0F172A] mt-0.5">180 KB</span>
              </div>
              <div className="bg-slate-50 border border-[#E2E8F0] p-1.5 rounded-lg flex flex-col">
                <span className="text-[8.5px] text-[#64748B] uppercase font-bold">Collection Rate</span>
                <span className="font-bold text-[#0F172A] mt-0.5">Real-Time</span>
              </div>
              <div className="bg-slate-50 border border-[#E2E8F0] p-1.5 rounded-lg flex flex-col">
                <span className="text-[8.5px] text-[#64748B] uppercase font-bold">Webcam Required</span>
                <span className="font-bold text-red-650 mt-0.5">No</span>
              </div>
              <div className="bg-slate-50 border border-[#E2E8F0] p-1.5 rounded-lg flex flex-col">
                <span className="text-[8.5px] text-[#64748B] uppercase font-bold">Microphone Required</span>
                <span className="font-bold text-red-650 mt-0.5">No</span>
              </div>
            </div>

            <div className="p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[10px] font-mono text-[#475569] flex justify-between items-center">
              <span>Installation:</span>
              <span className="text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 border border-[#BFDBFE] rounded font-bold">&lt;script src="cdtx.sdk.js"&gt;&lt;/script&gt;</span>
            </div>

            <div className="pt-2 border-t border-[#F1F5F9] flex flex-wrap gap-2 text-[10px] font-mono text-[#475569]">
              <span className="font-sans font-bold">Supported:</span>
              {["Chrome", "Edge", "Firefox", "Safari"].map((browser) => (
                <span key={browser} className="flex items-center gap-0.5 bg-emerald-50 text-emerald-800 border border-emerald-250 px-1.5 py-0.5 rounded font-bold">
                  ✓ {browser}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* DETAILS WORK-BENCH PRESTIGE RIGHT COLUMN */}
        <div className="xl:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-5"
            >
              <div className="flex justify-between items-start border-b border-[#F1F5F9] pb-3">
                <div>
                  <h3 className="text-[14px] font-bold text-[#0F172A] font-sans tracking-tight">
                    {selectedNode.name}
                  </h3>
                  <div className="text-[10px] text-[#2563EB] font-mono uppercase font-bold mt-0.5">{selectedNode.label}</div>
                </div>
                <div className="bg-slate-50 border border-[#E2E8F0] rounded-full px-3 py-1 text-center font-mono text-[9px] text-[#475569] font-bold shadow-sm">
                  PRODUCTION LAYER
                </div>
              </div>

              {/* Business Value One-Sentence Highlight */}
              <div className="bg-blue-50/50 border border-blue-100 p-3.5 rounded-xl">
                <span className="text-[9.5px] font-mono text-[#2563EB] uppercase font-black tracking-wider block mb-1">Business outcome</span>
                <p className="text-[12.5px] font-sans font-medium text-[#1E3A8A] leading-relaxed">
                  "{selectedNode.valueSentence}"
                </p>
              </div>

              {/* Architectural Description */}
              <p className="text-[#475569] text-xs leading-relaxed font-sans mt-2">
                {selectedNode.description}
              </p>

              {/* Data Inputs & Outputs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl border border-[#E2E8F0] p-4 space-y-2">
                  <span className="text-[9px] font-mono text-[#64748B] uppercase tracking-wider block font-bold">Input signals</span>
                  <ul className="space-y-1.5">
                    {selectedNode.inputs.map((inp, i) => (
                      <li key={i} className="text-[11px] text-[#334155] flex items-start gap-1.5 leading-snug font-sans">
                        <span className="text-[#2563EB] font-mono font-bold">•</span>
                        <span>{inp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 rounded-xl border border-[#E2E8F0] p-4 space-y-2">
                  <span className="text-[9px] font-mono text-[#64748B] uppercase tracking-wider block font-bold">Output signals</span>
                  <ul className="space-y-1.5">
                    {selectedNode.outputs.map((out, i) => (
                      <li key={i} className="text-[11px] text-[#334155] flex items-start gap-1.5 leading-snug font-sans">
                        <span className="text-emerald-600 font-mono font-bold">•</span>
                        <span>{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Frameworks & Biometrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl border border-[#E2E8F0] p-4 space-y-2">
                  <span className="text-[9px] font-mono text-[#64748B] uppercase tracking-wider block font-bold font-bold">In-production framework</span>
                  <ul className="space-y-1">
                    {selectedNode.models.map((mod, i) => (
                      <li key={i} className="text-[11px] text-indigo-700 font-mono font-semibold flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>{mod}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 rounded-xl border border-[#E2E8F0] p-4 space-y-2">
                  <span className="text-[9px] font-mono text-[#64748B] uppercase tracking-wider block font-bold">Biometric indicators</span>
                  <ul className="space-y-1 pt-0.5">
                    {selectedNode.features.map((feat, i) => (
                      <li key={i} className="text-[11px] text-emerald-700 font-bold flex items-center gap-1.5 font-sans">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Memory structural view */}
              <div className="space-y-1.5">
                <span className="text-[9.5px] font-mono text-[#64748B] uppercase font-bold tracking-wider block">[ Corresponding memory data alignment ]</span>
                <div className="bg-slate-50 px-4 py-3 rounded-xl border border-[#E2E8F0] font-mono text-[10.5px] leading-snug overflow-x-auto shadow-inner">
                  <pre>{highlightCode(selectedNode.structures)}</pre>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
