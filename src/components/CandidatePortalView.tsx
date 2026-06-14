/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  User, 
  Key, 
  CheckCircle, 
  Sliders, 
  MousePointer, 
  BookOpen, 
  PenTool, 
  ShieldCheck, 
  Zap,
  Activity,
  Award,
  AlertTriangle,
  RotateCcw,
  Check,
  Lock,
  Eye,
  Server,
  Fingerprint,
  Keyboard,
  Laptop,
  Radio,
  Binary,
  Brain,
  Compass,
  TrendingUp,
  RefreshCw,
  Globe,
  Cpu,
  Database,
  Network,
  Monitor,
  Clock,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab } from '../types';

interface CandidatePortalViewProps {
  setActiveTab?: (tab: ActiveTab) => void;
}

export default function CandidatePortalView({ setActiveTab }: CandidatePortalViewProps) {
  // Config state
  const [candidateId, setCandidateId] = useState('USR_3094_HARSH');
  const [examId, setExamId] = useState('EXM-99121-CIVIL');
  const [enrollmentStatus, setEnrollmentStatus] = useState<'UNENROLLED' | 'CALIBRATING' | 'VERIFIED'>('UNENROLLED');
  const [calibrationStep, setCalibrationStep] = useState<'TYPING' | 'MOUSE' | 'READING' | 'WRITING'>('TYPING');

  // Calibration progress metrics
  const [typingProgress, setTypingProgress] = useState(0);
  const [mouseProgress, setMouseProgress] = useState(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const [writingProgress, setWritingProgress] = useState(0);

  // Active typing interactive test values
  const [typedText, setTypedText] = useState('');
  const [keystrokeLog, setKeystrokeLog] = useState<{ key: string; delay: number }[]>([]);
  const [keyPressTime, setKeyPressTime] = useState<number>(0);
  const targetSentence = "CDT-X Digital Behavior Profiles secure online assessments with continuous calibration.";

  // Mouse calibration interactive coordinates array
  const [mouseTrajectory, setMouseTrajectory] = useState<{ x: number; y: number }[]>([]);
  const [isTracing, setIsTracing] = useState(false);

  // Focus & writing telemetry
  const [readingTimer, setReadingTimer] = useState(0);
  const [isReadingActive, setIsReadingActive] = useState(false);
  const [isWritingCalibrated, setIsWritingCalibrated] = useState(false);
  const [sampleWriting, setSampleWriting] = useState('');

  // Live Telemetry states
  const [telemetry, setTelemetry] = useState({
    keyHoldDuration: 91,
    typingVelocity: 43,
    mouseVelocity: 842,
    focusChanges: 2,
    readingPace: 'Normal',
    writingConsistency: 94
  });

  const [evidenceCounts, setEvidenceCounts] = useState({
    keyboardEvents: 48231,
    mouseEvents: 124912,
    focusChanges: 2,
    tabSwitches: 1,
    copyAttempts: 0,
    questionInteractions: 42
  });

  const [liveSessionStats, setLiveSessionStats] = useState({
    connectedMinutes: 18,
    connectedSeconds: 24,
    eventsProcessed: 42831,
    trustScore: 94,
    candidateName: "Rohan Patil",
    sessionCode: "EXAM-2026-204",
    status: "Monitoring"
  });

  const [telemetryLog, setTelemetryLog] = useState<string[]>([
    "[14:24:00] Telemetry capture initialized.",
    "[14:24:01] Secure Device Agent check: OK",
    "[14:24:02] Awaiting baseline calibration inputs..."
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate live telemetry stream values
      setTelemetry(prev => ({
        keyHoldDuration: Math.max(78, Math.min(115, prev.keyHoldDuration + Math.floor((Math.random() - 0.5) * 8))),
        typingVelocity: Math.max(38, Math.min(50, prev.typingVelocity + Math.floor((Math.random() - 0.5) * 4))),
        mouseVelocity: Math.max(620, Math.min(980, prev.mouseVelocity + Math.floor((Math.random() - 0.5) * 110))),
        focusChanges: prev.focusChanges,
        readingPace: 'Normal',
        writingConsistency: Math.max(91, Math.min(97, prev.writingConsistency + Math.floor((Math.random() - 0.5) * 2)))
      }));

      // Increment counts as events stream in
      setEvidenceCounts(prev => ({
        keyboardEvents: prev.keyboardEvents + Math.floor(Math.random() * 3 + 1),
        mouseEvents: prev.mouseEvents + Math.floor(Math.random() * 12 + 4),
        focusChanges: prev.focusChanges + (Math.random() < 0.01 ? 1 : 0),
        tabSwitches: prev.tabSwitches + (Math.random() < 0.005 ? 1 : 0),
        copyAttempts: prev.copyAttempts + (Math.random() < 0.002 ? 1 : 0),
        questionInteractions: prev.questionInteractions + (Math.random() < 0.1 ? 1 : 0)
      }));

      setLiveSessionStats(prev => {
        let nextSecs = prev.connectedSeconds + 1;
        let nextMins = prev.connectedMinutes;
        if (nextSecs >= 60) {
          nextSecs = 0;
          nextMins += 1;
        }
        return {
          ...prev,
          connectedMinutes: nextMins,
          connectedSeconds: nextSecs,
          eventsProcessed: prev.eventsProcessed + Math.floor(Math.random() * 8 + 2)
        };
      });

      setTelemetryLog(prev => {
        const events = [
          `Hold duration: ${Math.floor(Math.random() * 20 + 80)}ms verified`,
          `Spline mouse coords: [${Math.floor(Math.random()*200)}, ${Math.floor(Math.random()*150)}]`,
          `Reading pace: Normal`,
          `Focus state: Secure`,
          `Keystroke pattern matches calibration baseline`
        ];
        const nextEvent = `[${new Date().toISOString().substring(11, 19)}] ${events[Math.floor(Math.random() * events.length)]}`;
        return [...prev.slice(-3), nextEvent];
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Pre-exam states
  const [deviceCheckOk, setDeviceCheckOk] = useState(false);
  const [twinVerificationConfidence, setTwinVerificationConfidence] = useState(0);
  const [isVerifyingTwin, setIsVerifyingTwin] = useState(false);

  // Collapsible Judge walkthrough state
  const [isWalkthroughCollapsed, setIsWalkthroughCollapsed] = useState(false);

  // Auto-updating reading timers
  useEffect(() => {
    let interval: any;
    if (isReadingActive && readingProgress < 100) {
      interval = setInterval(() => {
        setReadingTimer(t => t + 1);
        setReadingProgress(prev => {
          const next = Math.min(100, prev + 10);
          if (next === 100) {
            setIsReadingActive(false);
          }
          return next;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isReadingActive, readingProgress]);

  // Interactive Typing keydown capturing flight and dwell timing
  const handleTypingInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setTypedText(text);

    const now = Date.now();
    if (keyPressTime > 0) {
      const flightDelay = now - keyPressTime;
      const lastChar = text[text.length - 1] || '';
      setKeystrokeLog(prev => [...prev.slice(-10), { key: lastChar, delay: flightDelay }]);
      setTelemetry(prev => ({
        ...prev,
        keyHoldDuration: flightDelay,
        typingVelocity: Math.max(30, Math.min(65, Math.floor((text.length / 5) / ((now - keyPressTime) / 1000 / 60 || 1))))
      }));
      setEvidenceCounts(prev => ({ ...prev, keyboardEvents: prev.keyboardEvents + 1 }));
    }
    setKeyPressTime(now);

    // Calculate progression
    const matchCount = [...text].filter((char, i) => char === targetSentence[i]).length;
    const typingPercentage = Math.min(100, Math.floor((matchCount / targetSentence.length) * 105));
    setTypingProgress(typingPercentage);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isTracing || mouseProgress >= 100) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setMouseTrajectory(prev => [...prev.slice(-25), { x, y }]);
    setMouseProgress(prev => {
      const next = Math.min(100, prev + 5);
      return next;
    });
    setEvidenceCounts(prev => ({ ...prev, mouseEvents: prev.mouseEvents + 1 }));
  };

  const resetCalibration = () => {
    setTypingProgress(0);
    setMouseProgress(0);
    setReadingProgress(0);
    setWritingProgress(0);
    setTypedText('');
    setSampleWriting('');
    setKeystrokeLog([]);
    setMouseTrajectory([]);
    setEnrollmentStatus('UNENROLLED');
    setCalibrationStep('TYPING');
    setDeviceCheckOk(false);
    setTwinVerificationConfidence(0);
    setEvidenceCounts({
      keyboardEvents: 0,
      mouseEvents: 0,
      focusChanges: 0,
      tabSwitches: 0,
      copyAttempts: 0,
      questionInteractions: 0
    });
  };

  const triggerEnrollmentVerification = () => {
    if (typingProgress < 90 || mouseProgress < 90 || readingProgress < 90 || writingProgress < 90) {
      alert("Please complete all modality calibrations to at least 90% before baselining. Tip: Use 'Judge Walkthrough Assist' step 2 for immediate mock values!");
      return;
    }
    setEnrollmentStatus('CALIBRATING');
    setIsVerifyingTwin(true);
    setTimeout(() => {
      setEnrollmentStatus('VERIFIED');
      setDeviceCheckOk(true);
      setTwinVerificationConfidence(99.64);
      setIsVerifyingTwin(false);
    }, 2000);
  };

  const startWritingCalibration = () => {
    let p = 0;
    const interval = setInterval(() => {
      p += 20;
      setWritingProgress(Math.min(100, p));
      if (p >= 100) {
        clearInterval(interval);
        setIsWritingCalibrated(true);
      }
    }, 150);
  };

  // Helper calculation for enrollment completion tracker
  const completedModules = [
    typingProgress >= 90,
    mouseProgress >= 90,
    readingProgress >= 90,
    writingProgress >= 90
  ].filter(Boolean).length;

  const currentOverallProgress = Math.round((typingProgress + mouseProgress + readingProgress + writingProgress) / 4);

  // Dynamic Enrollment Journey Highlight index
  let activeJourneyIdx = 0;
  if (enrollmentStatus === 'VERIFIED') {
    activeJourneyIdx = 4; // Continuous Trust Monitoring
  } else if (enrollmentStatus === 'CALIBRATING') {
    activeJourneyIdx = 3; // Start Examination
  } else if (completedModules === 4) {
    activeJourneyIdx = 2; // Verify Readiness
  } else if (currentOverallProgress > 0) {
    activeJourneyIdx = 1; // Build Digital Twin
  } else {
    activeJourneyIdx = 0; // Enroll
  }

  // Interactive autofill accelerators for Judge Demo Mode
  const demoAutofill = () => {
    setCandidateId('USR_89921_ROHAN');
    setExamId('EXM-99121-CIVIL');
  };

  const demoAutoCalibrate = () => {
    setTypingProgress(100);
    setMouseProgress(100);
    setReadingProgress(100);
    setWritingProgress(100);
    setTypedText(targetSentence);
    setSampleWriting("CDT-X establishes secure client telemetry to capture hold dwell rhythms accurately.");
    setIsWritingCalibrated(true);
  };

  const demoLaunchExam = () => {
    setEnrollmentStatus('CALIBRATING');
    setIsVerifyingTwin(true);
    setTimeout(() => {
      setEnrollmentStatus('VERIFIED');
      setDeviceCheckOk(true);
      setTwinVerificationConfidence(99.85);
      setIsVerifyingTwin(false);
    }, 1000);
  };

  const activeCandidateName = candidateId === 'USR_89921_ROHAN' ? 'Rohan Patil' : candidateId;

  return (
    <div className="h-full overflow-y-auto p-8 bg-[#F8FAFC] custom-scrollbar text-slate-850 pb-16">
      
      {/* Page Title & Executive Summary */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] font-sans">
            Candidate Identity & Calibration Portal
          </h1>
          <p className="text-[13px] text-[#475569] mt-0.5">
            Cryptographic identity setup, physical enrollment, and continuous behavioral baseline calibration setup.
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex gap-2">
          <button 
            onClick={resetCalibration}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] text-[#475569] hover:text-[#0F172A] rounded-lg transition-all text-xs font-medium font-sans shadow-sm cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#64748B]" />
            Reset Session State
          </button>
        </div>
      </div>

      {/* Live Session Card */}
      <div className="bg-slate-900 border border-slate-800 text-white p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Operational Stream State</span>
            <div className="flex items-center gap-2 mt-0.5">
              <strong className="text-sm font-sans tracking-tight text-white">{activeCandidateName}</strong>
              <span className="text-slate-500 font-mono text-xs">|</span>
              <span className="text-[11px] font-mono text-[#60A5FA] bg-[#1E3A8A]/50 px-2 py-0.5 rounded border border-[#3B82F6]/30">{examId}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 font-mono text-xs">
          <div>
            <span className="text-[9px] text-slate-400 uppercase block font-bold">Connected Time</span>
            <span className="text-[13px] font-bold text-white block mt-0.5">
              {liveSessionStats.connectedMinutes}m {liveSessionStats.connectedSeconds}s
            </span>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 uppercase block font-bold">Telemetry Captured</span>
            <span className="text-[13px] font-bold text-white block mt-0.5">
              {liveSessionStats.eventsProcessed.toLocaleString()} events
            </span>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 uppercase block font-bold">Trust Score</span>
            <span className={`text-[13px] font-bold block mt-0.5 ${enrollmentStatus === 'VERIFIED' ? 'text-emerald-400' : 'text-amber-400'}`}>
              {enrollmentStatus === 'VERIFIED' ? '99%' : '94%'} TST
            </span>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 uppercase block font-bold">Status</span>
            <span className="inline-flex items-center gap-1 mt-0.5 text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
              {enrollmentStatus === 'VERIFIED' ? 'VERIFIED' : 'Monitoring'}
            </span>
          </div>
        </div>
      </div>

      {/* Banner disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-4.5 h-4.5 text-amber-600 shrink-0" />
          <p className="text-xs text-amber-800 font-sans">
            <strong>PILOT SIMULATION ENROLLMENT:</strong> All candidate profiling parameters and baseline characteristics represent generated, privacy-safe mock assets calibrated through simulated CDT-X identity verification protocols.
          </p>
        </div>
      </div>

      {/* ENROLLMENT PROGRESS STEPS ROADMAP */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center mb-3 border-b border-[#F1F5F9] pb-2">
          <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-[#2563EB]" />
            Continuous Verification Lifecycle
          </span>
          <span className="text-[9.5px] font-mono bg-[#EFF6FF] text-[#2563EB] px-2 py-0.5 rounded-md border border-[#BFDBFE]">
            STATION SOL-18 • LIVE VERIFICATION ACTIVE
          </span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-center">
          {[
            { label: "1. Enroll Base", step: 0 },
            { label: "2. Build profile", step: 1 },
            { label: "3. Verify Readiness", step: 2 },
            { label: "4. Run Session", step: 3 },
            { label: "5. Monitor Trust", step: 4 }
          ].map((stepObj) => {
            
                        const isActive = stepObj.step === activeJourneyIdx;
            const isCompleted = stepObj.step < activeJourneyIdx;
            
            let colorClasses = "bg-slate-50 border-[#E2E8F0] text-slate-400";
            if (isActive) {
              colorClasses = "bg-[#EFF6FF] border-[#2563EB] text-[#2563EB] font-bold shadow-sm";
            } else if (isCompleted) {
              colorClasses = "bg-emerald-50 border-emerald-250 text-emerald-700";
            }
            
            return (
              <div 
                key={stepObj.step}
                className={`flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-lg border text-[11px] font-sans leading-none transition-all ${colorClasses}`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : isActive ? (
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#2563EB]"></span>
                  </span>
                ) : null}
                <span className="truncate">{stepObj.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* COLUMN 1: REGISTRATION & MODULE CALIBRATIONS */}
        <div className="xl:col-span-8 space-y-6">
          
          {/* REGISTER CANDIDATE INPUTS CARD */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] relative overflow-hidden">
            <h2 className="text-[13px] font-bold text-[#0F172A] font-sans uppercase tracking-wide mb-1 flex items-center gap-2">
              <User className="w-4 h-4 text-[#2563EB]" />
              Examinee Secure Credentials
            </h2>
            <p className="text-[11.5px] text-[#475569] mb-4 font-sans leading-normal">
              Register active candidate credentials below to start calibrating typing Hold rhythms, cursor trajectories, and reading pacing profile.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-[#64748B] font-bold uppercase tracking-wider block">Candidate Alpha ID</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-xs font-mono">ID:</span>
                  <input 
                    type="text" 
                    value={candidateId}
                    onChange={(e) => setCandidateId(e.target.value)}
                    className="w-full bg-slate-50 border border-[#E2E8F0] rounded-lg pl-9 pr-3 py-1.5 font-mono text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Candidate Code"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-[#64748B] font-bold uppercase tracking-wider block">Target Examination Key</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-xs font-mono">KEY:</span>
                  <input 
                    type="text" 
                    value={examId}
                    onChange={(e) => setExamId(e.target.value)}
                    className="w-full bg-slate-50 border border-[#E2E8F0] rounded-lg pl-12 pr-3 py-1.5 font-mono text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Exam Specifier"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-[#64748B] font-bold uppercase tracking-wider block">Active Enrollment Status</label>
                <div className="h-[30px] flex items-center px-3 rounded-lg font-mono text-xs border font-bold transition-all" style={{
                  backgroundColor: enrollmentStatus === 'VERIFIED' ? '#ECFDF5' : enrollmentStatus === 'CALIBRATING' ? '#FFFBEB' : '#F8FAFC',
                  borderColor: enrollmentStatus === 'VERIFIED' ? '#10B981' : enrollmentStatus === 'CALIBRATING' ? '#F59E0B' : '#E2E8F0',
                  color: enrollmentStatus === 'VERIFIED' ? '#047857' : enrollmentStatus === 'CALIBRATING' ? '#B45309' : '#475569'
                }}>
                  {enrollmentStatus === 'VERIFIED' && <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mr-2 shrink-0" />}
                  {enrollmentStatus === 'CALIBRATING' && <Activity className="w-3.5 h-3.5 text-amber-600 mr-2 shrink-0 animate-spin" />}
                  {enrollmentStatus === 'UNENROLLED' && <Sliders className="w-3.5 h-3.5 text-slate-500 mr-2 shrink-0" />}
                  {enrollmentStatus}
                </div>
              </div>
            </div>
          </div>

          {/* BEHAVIORAL CALIBRATION SUITE */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-5">
            <div className="flex justify-between items-center border-b border-[#F1F5F9] pb-3 mb-2">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#2563EB]" />
                <h2 className="text-[13px] font-bold text-[#0F172A] font-sans uppercase tracking-wide">
                  Behavioral Calibration Checkpoints Suite
                </h2>
              </div>
              
              <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-[#E2E8F0] text-[10.5px] font-mono text-[#64748B]">
                <span>Calibration Progress:</span>
                <span className="text-[#2563EB] font-bold">{completedModules}/4 Modules</span>
              </div>
            </div>

            {/* Stepper Grid selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { step: 'TYPING', label: 'Typing patterns', progress: typingProgress, icon: Sliders },
                { step: 'MOUSE', label: 'Spline curvature', progress: mouseProgress, icon: MousePointer },
                { step: 'READING', label: 'Lexical foveal', progress: readingProgress, icon: BookOpen },
                { step: 'WRITING', label: 'Stylus dynamics', progress: writingProgress, icon: PenTool },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = calibrationStep === item.step;
                return (
                  <button
                    key={item.step}
                    onClick={() => setCalibrationStep(item.step as any)}
                    className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                      isSelected 
                        ? 'bg-[#EFF6FF] border-[#2563EB] shadow-sm' 
                        : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1.5">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-[#2563EB]' : 'text-slate-500'}`} />
                      <span className={`text-[12px] font-mono font-bold ${item.progress >= 90 ? 'text-emerald-600' : 'text-slate-705'}`}>
                        {item.progress}%
                      </span>
                    </div>
                    <span className="text-[11.5px] font-sans font-bold text-[#0F172A] block truncate">{item.step}</span>
                    <span className="text-[9px] text-[#64748B] font-mono leading-none mt-0.5">{item.label}</span>
                    
                    {/* Linear progress microbar */}
                    <div className="w-full bg-slate-100 h-1 mt-2.5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#2563EB]" style={{ width: `${item.progress}%` }}></div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Workspace Container */}
            <div className="bg-slate-50 rounded-2xl border border-[#E2E8F0] p-5 min-h-[200px] flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                {calibrationStep === 'TYPING' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 flex-grow flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[9.5px] font-mono text-[#64748B] uppercase font-bold tracking-wider">[ Baseline Target Phrase ]</span>
                        <span className="text-[10px] font-mono text-[#2563EB]">Latency Precision: sub-millisecond</span>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] font-mono text-xs text-[#0F172A] leading-relaxed select-all shadow-sm">
                        {targetSentence}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569] font-mono text-xs font-bold">TYPE HERE:</span>
                        <input
                          type="text"
                          value={typedText}
                          onChange={handleTypingInput}
                          className="w-full bg-white border border-[#E2E8F0] rounded-xl pl-24 pr-3 py-2.5 font-mono text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                          placeholder="Begin typing the target sentence exactly..."
                        />
                      </div>
                      
                      {/* Live Keystroke Deltas */}
                      <div className="space-y-1.5">
                        <span className="text-[9.5px] font-mono text-[#64748B] uppercase tracking-wider block">Live keystroke flight series (tactile hold timing)</span>
                        <div className="flex gap-1 bg-white p-2.5 rounded-xl border border-[#E2E8F0] overflow-x-auto min-h-[46px] custom-scrollbar shadow-sm">
                          {keystrokeLog.length === 0 ? (
                            <span className="text-[#94A3B8] font-mono text-[10px] self-center pl-2">Awaiting inputs...</span>
                          ) : (
                            keystrokeLog.map((log, idx) => (
                              <div key={idx} className="bg-slate-50 text-[#2563EB] px-2.5 py-1 rounded-lg text-[10.5px] font-mono border border-[#E2E8F0] text-center shrink-0 shadow-sm">
                                <span className="block font-bold text-[#0F172A]">"{log.key}"</span>
                                <span className="text-[8.5px] text-[#64748B]">{log.delay}ms</span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {calibrationStep === 'MOUSE' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 flex-grow flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[9.5px] font-mono text-[#64748B] uppercase font-bold tracking-wider">[ Spline Curvature Canvas ]</span>
                      <span className="text-[11px] font-sans text-[#475569]">Hold mouse and trace curvy trajectories below</span>
                    </div>

                    <div 
                      onMouseMove={handleMouseMove}
                      onMouseDown={() => { setIsTracing(true); setMouseTrajectory([]); }}
                      onMouseUp={() => setIsTracing(false)}
                      className="border-2 border-dashed border-[#CBD5E1] h-28 rounded-xl relative overflow-hidden bg-white flex items-center justify-center cursor-crosshair select-none shadow-inner"
                    >
                      {mouseProgress === 100 ? (
                        <div className="text-center font-mono space-y-1 z-10 bg-white p-3 rounded-xl border border-emerald-200 shadow-sm">
                          <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                          <span className="text-emerald-800 text-xs font-bold block">Bezier Velocity Profile Compiled</span>
                        </div>
                      ) : (
                        <span className="text-[#94A3B8] font-mono text-xs select-none pointer-events-none">[ Drag dynamic path shapes here ]</span>
                      )}

                      <svg className="absolute inset-0 pointer-events-none w-full h-full">
                        <polyline
                          fill="none"
                          stroke="#2563EB"
                          strokeWidth="2.5"
                          points={mouseTrajectory.map(p => `${p.x},${p.y}`).join(' ')}
                        />
                        {mouseTrajectory.map((p, i) => (
                          <circle key={i} cx={p.x} cy={p.y} r="1.5" fill="#10B981" />
                        ))}
                      </svg>
                    </div>

                    <div className="bg-white p-2 rounded-xl border border-[#E2E8F0] flex justify-between font-mono text-[10px] text-[#64748B] shadow-sm">
                      <span>Coordinates: <strong className="text-[#0F172A]">{mouseTrajectory.length} points</strong></span>
                      <span>Target Spline Velocity: <strong className="text-[#0F172A]">Consistent</strong></span>
                    </div>
                  </motion.div>
                )}

                {calibrationStep === 'READING' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 flex-grow flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[9.5px] font-mono text-[#64748B] uppercase font-bold tracking-wider">[ Lexical Gaze Calibration ]</span>
                      <span className="text-[11px] font-mono text-amber-600 font-bold">Simulating human reading cadence</span>
                    </div>

                    <p className="p-3 bg-white rounded-xl border border-[#E2E8F0] leading-relaxed text-xs text-[#475569] shadow-sm">
                      The Digital Behavior Profile calibration maps relative solver hesitation margins. While analyzing high-stakes prompts, candidates show distinct page progression and text-retention delays containing specific micro-hesitations.
                    </p>

                    <div className="flex gap-4 items-center">
                      <button 
                        onClick={() => { setIsReadingActive(true); setReadingProgress(0); }}
                        disabled={isReadingActive || readingProgress === 100}
                        className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-lg text-xs disabled:opacity-40 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        {isReadingActive ? "Capturing focus timers..." : "Start capture window"}
                      </button>
                      <div className="font-mono text-xs text-[#475569]">
                        Reading Window: <strong className="text-[#0F172A]">{(readingTimer / 10).toFixed(1)}s elapsed</strong>
                      </div>
                    </div>
                  </motion.div>
                )}

                {calibrationStep === 'WRITING' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 flex-grow flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[9.5px] font-mono text-[#64748B] uppercase font-bold tracking-wider">[ Stylus & Writing Entropy Calibrator ]</span>
                      <span className="text-[11px] font-sans text-[#475569]">Type a quick sentence below</span>
                    </div>

                    <textarea
                      value={sampleWriting}
                      onChange={(e) => {
                        setSampleWriting(e.target.value);
                        if (writingProgress < 100) startWritingCalibration();
                      }}
                      className="w-full bg-white border border-[#E2E8F0] rounded-xl p-3 text-xs font-mono text-[#0F172A] placeholder-[#94A3B8] h-20 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                      placeholder="Type a sentence describing your analytical background. We compile linguistic variety profiles..."
                    />

                    <div className="bg-white p-2 rounded-xl border border-[#E2E8F0] flex justify-between font-mono text-[10px] text-[#64748B] shadow-sm">
                      <span>Linguistic Type-Token score: <strong className="text-emerald-600">0.78 Match</strong></span>
                      <span>Stylus Variety: <strong className="text-emerald-600">Secure</strong></span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Verification trigger actions */}
            <div className="pt-3 border-t border-[#F1F5F9] flex justify-between items-center">
              <div className="space-y-0.5">
                <span className="text-xs text-[#0F172A] font-bold block">Consolidate Behavioral Baseline</span>
                <span className="text-[10px] text-[#64748B] font-sans block">Generate continuous digital twin token</span>
              </div>
              <button 
                onClick={triggerEnrollmentVerification}
                disabled={enrollmentStatus === 'VERIFIED' || isVerifyingTwin}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl text-xs hover:from-blue-500 hover:to-indigo-500 transition-all shadow-md flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
              >
                {isVerifyingTwin ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin" /> COMPILING BEHAVIORAL TWIN...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" /> COMPLETELY VERIFY BASES
                  </>
                )}
              </button>
            </div>
          </div>

          {/* LIVE BEHAVIOR EVIDENCE PANEL */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
            <div className="flex justify-between items-center border-b border-[#F1F5F9] pb-2.5">
              <span className="text-xs font-mono font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-[#2563EB] animate-pulse" />
                Live Behavior Evidence Panel
              </span>
              <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-250 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Collecting Telemetry Securely
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: "Keyboard Events Captured", icon: Keyboard, val: evidenceCounts.keyboardEvents.toLocaleString(), detail: "Sub-millisecond flight sequence" },
                { name: "Mouse Events Captured", icon: MousePointer, val: evidenceCounts.mouseEvents.toLocaleString(), detail: "Bezier coordinate velocity vectors" },
                { name: "Focus Events", icon: Eye, val: `${evidenceCounts.focusChanges}`, detail: "Active viewport focus lock" },
                { name: "Tab Switches", icon: Compass, val: `${evidenceCounts.tabSwitches}`, detail: "Context change detection" },
                { name: "Copy/Paste Attempts", icon: Lock, val: `${evidenceCounts.copyAttempts}`, detail: "System clipboard blocker active" },
                { name: "Question Interactions", icon: FileText, val: `${evidenceCounts.questionInteractions}`, detail: "Logical comprehension hesitation pace" }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-slate-50 border border-[#E2E8F0] p-3 rounded-xl shadow-inner flex items-start gap-2.5">
                    <Icon className="w-4 h-4 text-[#2563EB] mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[10px] font-mono text-[#64748B] uppercase font-bold block">{item.name}</span>
                      <span className="text-xs font-bold text-[#0F172A] block mt-0.5 font-mono">{item.val}</span>
                      <span className="text-[9.5px] text-[#475569] block mt-0.5 font-sans">{item.detail}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Behavior Collection Visualization */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" /> Live Signal Visualization Stream
              </span>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-white">
                {[
                  { name: "Keyboard Activity", color: "bg-emerald-500", scale: Math.max(15, (evidenceCounts.keyboardEvents % 10) * 10) },
                  { name: "Mouse Activity", color: "bg-blue-500", scale: Math.max(20, (evidenceCounts.mouseEvents % 8) * 12) },
                  { name: "Navigation Activity", color: "bg-amber-500", scale: evidenceCounts.tabSwitches > 0 ? 40 : 10 },
                  { name: "Reading Activity", color: "bg-purple-500", scale: Math.max(15, (evidenceCounts.questionInteractions % 5) * 20) },
                  { name: "Trust Signal", color: "bg-emerald-400", scale: 94 }
                ].map((sig, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <span className="text-[9px] font-mono text-slate-400 block truncate">{sig.name}</span>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden relative">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${sig.color}`} 
                        style={{ width: `${sig.scale}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-mono">
                      <span className="text-slate-500">Active</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DIGITAL TWIN PREVIEW SECTION */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
            <div className="flex justify-between items-center border-b border-[#F1F5F9] pb-2.5">
              <span className="text-xs font-mono font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#2563EB]" />
                Enrollment Manifest Output
              </span>
              <span className="text-[10px] font-mono text-emerald-600">DASHBOARD CONNECTED</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 text-xs font-sans">
                                {enrollmentStatus === 'VERIFIED' ? (
                  <div className="bg-emerald-50 border border-emerald-250 rounded-xl p-3.5 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold">
                      <CheckCircle className="w-4.5 h-4.5 text-emerald-600" />
                      <span>Behavior Collection Complete</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10.5px] font-mono text-slate-700">
                      <div>Typing Samples: <strong className="text-emerald-700">1,248</strong></div>
                      <div>Mouse Events: <strong className="text-emerald-700">12,421</strong></div>
                      <div>Navigation Events: <strong className="text-emerald-700">382</strong></div>
                      <div>Reading Interactions: <strong className="text-emerald-700">91</strong></div>
                      <div className="col-span-2 mt-1 pt-1.5 border-t border-emerald-200">
                        Behavior Features Extracted: <strong className="text-emerald-700">512</strong>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#2563EB] px-2 py-0.5 rounded text-[9.5px] font-bold uppercase border border-[#BFDBFE]">
                      <Fingerprint className="w-3.5 h-3.5" /> Digital Twin Generated
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-[#475569] text-[11.5px] leading-relaxed font-sans">
                      Upon finishing calibration, CDT-X outputs a hardened, cryptographic suite of behavioral properties utilized during authentication.
                    </p>

                    <div className="space-y-1.5 font-mono">
                      {[
                        "Digital Twin Profile Generated",
                        "Identity Confidence Index Calibrated",
                        "Behavioral Baseline Solidified",
                        "Continuous Trust Timeline Set",
                        "Examination Readiness Certified"
                      ].map((output, idx) => {
                        const isFitted = enrollmentStatus === 'VERIFIED';
                        return (
                          <div key={idx} className="flex items-center gap-2">
                            {isFitted ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                            )}
                            <span className={isFitted ? "text-[#0F172A] font-bold" : "text-[#94A3B8]"}>
                              {output}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col justify-center items-center p-4 bg-slate-50 rounded-xl border border-[#E2E8F0] text-center space-y-3 shadow-inner">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#64748B] uppercase block">Calibration Confidence</span>
                  <div className="text-2xl font-black font-mono text-emerald-600">
                    {enrollmentStatus === 'VERIFIED' ? '99.64%' : '0.00%'}
                  </div>
                  <span className="text-[10px] font-sans text-[#475569] block px-4 leading-normal">
                    {enrollmentStatus === 'VERIFIED' 
                      ? 'Secure behavioral baseline verified' 
                      : 'Awaiting 4/4 completed modules'}
                  </span>
                </div>

                <AnimatePresence>
                  {enrollmentStatus === 'VERIFIED' && (
                    <motion.button
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      onClick={() => setActiveTab?.(ActiveTab.DIGITAL_TWIN)}
                      className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-[11px] uppercase tracking-wider rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer w-full justify-center transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" /> Explore Twin Baseline
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>

        {/* COLUMN 2: WALKTHROUGH ASSIST & VALUE */}
        <div className="xl:col-span-4 space-y-6">

          {/* LIVE TELEMETRY PANEL */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
            <div className="flex justify-between items-center border-b border-[#F1F5F9] pb-2.5">
              <span className="text-xs font-mono font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-[#2563EB] animate-pulse" />
                Live Telemetry Stream
              </span>
              <span className="flex items-center gap-1 bg-red-50 text-red-700 border border-red-150 px-2 py-0.5 rounded text-[9px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                STREAM ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-[#E2E8F0]">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">Key Hold Duration</span>
                <span className="text-base font-bold text-[#0F172A] font-mono block mt-0.5">{telemetry.keyHoldDuration} ms</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-[#E2E8F0]">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">Typing Velocity</span>
                <span className="text-base font-bold text-[#0F172A] font-mono block mt-0.5">{telemetry.typingVelocity} WPM</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-[#E2E8F0]">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">Mouse Velocity</span>
                <span className="text-base font-bold text-[#0F172A] font-mono block mt-0.5">{telemetry.mouseVelocity} px/s</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-[#E2E8F0]">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">Focus Changes</span>
                <span className="text-base font-bold text-[#0F172A] font-mono block mt-0.5">{telemetry.focusChanges}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-[#E2E8F0]">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">Reading Pace</span>
                <span className="text-base font-bold text-[#0F172A] font-mono block mt-0.5">{telemetry.readingPace}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-[#E2E8F0]">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">Writing Consistency</span>
                <span className="text-base font-bold text-[#0F172A] font-mono block mt-0.5">{telemetry.writingConsistency}%</span>
              </div>
            </div>

            {/* Simulated Live Console Output */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 font-mono text-[9px] text-emerald-400 space-y-1">
              <span className="text-slate-500 block uppercase tracking-wider text-[8px] border-b border-slate-800 pb-1 mb-1">Raw telemetry frames</span>
              {telemetryLog.map((log, lIdx) => (
                <div key={lIdx} className="truncate">{log}</div>
              ))}
            </div>
          </div>
          
          {/* JUDGE DEMO ASSIST CARD */}
          <div className="bg-white border-2 border-blue-200 rounded-2xl shadow-sm overflow-hidden">
            <button 
              onClick={() => setIsWalkthroughCollapsed(prev => !prev)}
              className="w-full flex justify-between items-center bg-blue-50 px-5 py-3 border-b border-blue-200 text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#2563EB]" />
                <h3 className="text-xs font-black text-[#2563EB] font-sans tracking-wide uppercase">
                  Judge Walkthrough Assist
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#2563EB] underline font-extrabold pb-0.5">
                {isWalkthroughCollapsed ? 'EXPAND' : 'COLLAPSE'}
              </span>
            </button>

            {!isWalkthroughCollapsed && (
              <div className="p-4 space-y-3.5 font-sans text-xs">
                <p className="text-[#475569] leading-snug">
                  Follow this sequence to showcase the entire CDT-X proctoring lifecycle in <strong className="text-[#2563EB]">60 seconds</strong> during judging:
                </p>

                <div className="space-y-3 font-mono text-[10.5px]">
                  {/* Step 1 */}
                  <div className="flex items-start gap-2.5 p-2 bg-slate-50 rounded-xl border border-[#E2E8F0]">
                    <span className="bg-blue-100 text-[#2563EB] px-1.5 py-0.5 rounded text-[9.5px] font-bold">1</span>
                    <div className="flex-grow space-y-1">
                      <span className="text-[#0F172A] block font-bold">Enter Operator Credentials</span>
                      <button 
                        onClick={demoAutofill}
                        className="px-2 py-1 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-[9px] uppercase rounded-md transition-all cursor-pointer font-sans"
                      >
                        Load Test Candidate
                      </button>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-2.5 p-2 bg-slate-50 rounded-xl border border-[#E2E8F0]">
                    <span className="bg-blue-100 text-[#2563EB] px-1.5 py-0.5 rounded text-[9.5px] font-bold">2</span>
                    <div className="flex-grow space-y-1">
                      <span className="text-[#0F172A] block font-bold">Simulate Multi-modal Calibration</span>
                      <button 
                        onClick={demoAutoCalibrate}
                        className="px-2 py-1 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-[9px] uppercase rounded-md transition-all cursor-pointer font-sans"
                      >
                        Auto-Calibrate (100%)
                      </button>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-2.5 p-2 bg-slate-50 rounded-xl border border-[#E2E8F0]">
                    <span className="bg-blue-100 text-[#2563EB] px-1.5 py-0.5 rounded text-[9.5px] font-bold">3</span>
                    <div className="flex-grow space-y-1">
                      <span className="text-[#0F172A] block font-bold">Register & Lock Baseline</span>
                      <button 
                        onClick={demoLaunchExam}
                        className="px-2 py-1 bg-[#10B981] hover:bg-emerald-600 text-white font-bold text-[9px] uppercase rounded-md transition-all cursor-pointer font-sans"
                      >
                        Commit Baseline Check
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F1F5F9] flex justify-between items-center text-[10px] font-mono text-[#64748B]">
                  <span>Demo Flow</span>
                  <span className="text-blue-600 font-bold">YC Demo Ready</span>
                </div>
              </div>
            )}
          </div>

          {/* Privacy-First Verification */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-3">
            <h3 className="text-xs font-black text-emerald-800 font-sans tracking-wide uppercase flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              Privacy-First Architecture
            </h3>
            
            <p className="text-[11.5px] text-[#475569] font-sans leading-relaxed">
              CDT-X is designed with a strict data minimization philosophy. We protect candidate rights while ensuring optimal academic outcome fidelity:
            </p>

            <div className="space-y-2.5 text-xs text-[#475569]">
              {[
                "No live webcam video feeds compiled, cached or transmitted",
                "No physical biometric fingerprint/retina biological imagery stored",
                "Frictionless identity tracking operates 100% locally on edge devices",
                "Zero risk of personally identifiable data breaches or cloud database leaks"
              ].map((rule, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Digital Twin generation pipeline */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <h3 className="text-xs font-black text-[#0F172A] font-sans tracking-wide uppercase mb-3.5 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#2563EB]" />
              Digital Twin Creation Flow
            </h3>

            <div className="relative pl-6 space-y-4 text-xs text-[#475569]">
              {/* Vertical timeline line */}
              <div className="absolute top-2 bottom-2 left-2.5 w-0.5 bg-slate-100"></div>

              {[
                { name: "Student Device", desc: "Local workstation capturing hardware interrupts", icon: Laptop },
                { name: "Behavior Collection", desc: "Continuous signal capture of mouse & key sequences", icon: Radio },
                { name: "Feature Extraction", desc: "Transforms raw coordinate streams into vector matrices", icon: Sliders },
                { name: "Behavior Embedding", desc: "Integrates spatial/temporal parameters to 512D profile", icon: Cpu },
                { name: "Digital Twin Creation", desc: "Compiles a verified, hardened behavioral model", icon: Fingerprint },
                { name: "Trust Intelligence", desc: "Continuous behavior profile threat verification check", icon: Brain },
                { name: "Continuous Verification", desc: "Cross-checks live streams against verified twin", icon: ShieldCheck }
              ].map((step, idx) => {
                const Icon = step.icon;
                // Highlight active stages based on enrollment status
                const isCompleted = enrollmentStatus === 'VERIFIED';
                const isActive = enrollmentStatus === 'CALIBRATING' ? idx < 4 : isCompleted;
                const dotColor = isCompleted ? 'bg-emerald-500 text-white border-emerald-600' : isActive ? 'bg-blue-500 text-white animate-pulse border-blue-600' : 'bg-slate-100 text-slate-400 border-slate-200';
                
                return (
                  <div key={idx} className="relative flex items-start gap-3">
                    <span className={`absolute -left-[23px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center font-mono text-[9px] font-bold border shadow-sm transition-all ${dotColor}`}>
                      {idx + 1}
                    </span>
                    <div className="flex-grow">
                      <div className="flex items-center gap-1.5">
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#2563EB]' : 'text-slate-400'}`} />
                        <strong className={`font-sans font-bold block ${isActive ? 'text-[#0F172A]' : 'text-slate-400'}`}>{step.name}</strong>
                      </div>
                      <p className={`text-[10px] ${isActive ? 'text-[#64748B]' : 'text-slate-350'} mt-0.5`}>{step.desc}</p>
                    </div>
                  </div>
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

          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-3">
            <h3 className="text-xs font-black text-[#0F172A] font-sans tracking-wide uppercase flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#2563EB]" />
              LMS Deployment & Integrations
            </h3>
            
            <p className="text-[11px] text-slate-500 leading-normal font-sans">
              CDT-X integrates seamlessly into existing enterprise exam software via API and standard LMS protocols:
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
              {["Moodle", "Canvas", "Google Classroom", "ExamSoft", "Custom LMS"].map((lms, lIdx) => (
                <div key={lIdx} className="flex items-center gap-1.5 bg-slate-50 border border-[#E2E8F0] p-1.5 rounded-lg">
                  <Check className="w-3.5 h-3.5 text-emerald-600 font-extrabold shrink-0" />
                  <span>{lms}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#F1F5F9] flex justify-between items-center text-xs">
              <span className="text-[#64748B] font-mono text-[10px]">Deployment Time:</span>
              <span className="text-[#2563EB] font-bold font-mono bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">&lt; 1 Day</span>
            </div>
          </div>

          {/* Pre-Exam Device Telemetry check */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <h3 className="text-xs font-black text-[#0F172A] font-sans tracking-wide uppercase mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Pre-Exam Device Logs
            </h3>
            
            <div className="space-y-2 font-mono text-[10px] text-[#475569]">
              <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg border border-[#E2E8F0]">
                <span>Biometric Baseline:</span>
                <span className={`font-bold ${enrollmentStatus === 'VERIFIED' ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {enrollmentStatus === 'VERIFIED' ? 'READY (100%)' : 'AWAITING CALIBRATION'}
                </span>
              </div>

              <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg border border-[#E2E8F0]">
                <span>Verification Confidence Token:</span>
                <span className="font-bold text-[#0F172A]">
                  {twinVerificationConfidence > 0 ? `${twinVerificationConfidence}%` : 'N/A'}
                </span>
              </div>

              <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg border border-[#E2E8F0]">
                <span>Device Compatibility:</span>
                <span className="font-bold text-[#2563EB]">
                  {deviceCheckOk ? 'VALID (Secure Agent)' : 'AWAITING COGNITIVE CHECK'}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
