import fs from "fs";
import path from "path";
import { ScenarioType } from "./src/types";

// Standard types
export interface SimulatedCandidate {
  candidateId: string;
  scenario: ScenarioType;
  trustScore: number;
  impersonationRisk: number;
  aiAssistanceRisk: number;
  collusionRisk: number;
  verdict: "APPROVED" | "REVIEW" | "TERMINATED";
  agentBreakdown: { agent_name: string; match: number; drift: number }[];
  timeline: { timestamp: string; title: string; desc: string; severity: "INFO" | "WARNING" | "CRITICAL" }[];
}

export interface AuditLog {
  timestamp: string;
  action: string;
  candidateId: string;
  details: any;
}

interface DatabaseSchema {
  candidates: Record<string, SimulatedCandidate>;
  logs: AuditLog[];
}

let writeQueue: Promise<void> = Promise.resolve();

class FileDatabase {
  private dbPath: string;
  private dataDir: string;
  private cachedData: DatabaseSchema;

  constructor() {
    this.dataDir = path.join(process.cwd(), "data");
    this.dbPath = path.join(this.dataDir, "db.json");
    
    this.ensureDirectoryExists();
    this.cachedData = this.loadDatabase();
  }

  private ensureDirectoryExists() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  private loadDatabase(): DatabaseSchema {
    if (fs.existsSync(this.dbPath)) {
      try {
        const raw = fs.readFileSync(this.dbPath, "utf-8");
        return JSON.parse(raw);
      } catch (err) {
        console.error("[Database] Corruption detected, rebuilding cache:", err);
      }
    }
    
    // Default structure
    const defaultStructure: DatabaseSchema = {
      candidates: {},
      logs: []
    };
    this.queueSave(defaultStructure);
    return defaultStructure;
  }

  private queueSave(data: DatabaseSchema) {
    const serialized = JSON.stringify(data, null, 2);
    writeQueue = writeQueue.then(async () => {
      const tempPath = `${this.dbPath}.tmp`;
      try {
        await fs.promises.writeFile(tempPath, serialized, "utf-8");
        await fs.promises.rename(tempPath, this.dbPath);
      } catch (err) {
        console.error("[Database] Atomic write failed:", err);
        // Fallback
        try {
          await fs.promises.writeFile(this.dbPath, serialized, "utf-8");
        } catch (fallbackErr) {
          console.error("[Database] Fallback write failed:", fallbackErr);
        }
      }
    }).catch(err => {
      console.error("[Database] Write queue error:", err);
    });
  }

  // API Methods
  public getCandidate(id: string): SimulatedCandidate | null {
    const norm = id.toUpperCase();
    return this.cachedData.candidates[norm] || null;
  }

  public saveCandidate(id: string, candidate: SimulatedCandidate): void {
    const norm = id.toUpperCase();
    this.cachedData.candidates[norm] = candidate;
    this.queueSave(this.cachedData);
  }

  public evictOldestCandidates(maxLimit: number = 200) {
    const keys = Object.keys(this.cachedData.candidates);
    if (keys.length >= maxLimit) {
      const coreKeys = ["ROHAN", "AARAV", "NEHA", "AL-7712", "EXM-88219-B", "EXM-44102-X", "EXM-10294-Z"];
      const keyToEvict = keys.find(key => !coreKeys.some(ck => key.includes(ck)));
      if (keyToEvict) {
        delete this.cachedData.candidates[keyToEvict];
        this.queueSave(this.cachedData);
      }
    }
  }

  public logAction(action: string, candidateId: string, details: any): void {
    const logEntry: AuditLog = {
      timestamp: new Date().toISOString(),
      action,
      candidateId,
      details
    };
    this.cachedData.logs.unshift(logEntry);
    // Limit log size to 1000 items
    if (this.cachedData.logs.length > 1000) {
      this.cachedData.logs.pop();
    }
    this.queueSave(this.cachedData);
  }

  public getLogs(): AuditLog[] {
    return this.cachedData.logs;
  }

  public getAllCandidates(): Record<string, SimulatedCandidate> {
    return this.cachedData.candidates;
  }
}

export const db = new FileDatabase();
