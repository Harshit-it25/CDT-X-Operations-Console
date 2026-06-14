/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  MousePointer, 
  Keyboard, 
  Monitor, 
  Clock, 
  Activity, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Shield,
  Sliders
} from 'lucide-react';

interface ReplayFrame {
  timestamp: string;
  mouseX: number;
  mouseY: number;
  wpm: number;
  focused: boolean;
  trustScore: number;
  note: string;
}

export default function BehaviorReplayView() {
  const [activeScenario, setActiveScenario] = useState<'NORMAL' | 'IMPERSONATION' | 'AI_ASSISTED' | 'COLLUSION'>('IMPERSONATION');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [currentFrameIdx, setCurrentFrameIdx] = useState<number>(0);
  const timerRef = useRef<any>(null);

  // High fidelity proctoring events
  const normalFrames: ReplayFrame[] = [
    { timestamp: "14:02:00", mouseX: 100, mouseY: 80, wpm: 55, focused: true, trustScore: 97, note: "Session initialized successfully. Candidate starts writing." },
    { timestamp: "14:02:05", mouseX: 180, mouseY: 120, wpm: 60, focused: true, trustScore: 97, note: "Natural mouse trajectories traversing active form regions." },
    { timestamp: "14:02:10", mouseX: 280, mouseY: 220, wpm: 58, focused: true, trustScore: 97, note: "Standard neuromascular jitter within human limits." },
    { timestamp: "14:02:15", mouseX: 390, mouseY: 240, wpm: 52, focused: true, trustScore: 97, note: "Steady answer typing cadence. Hold durations matching baseline." },
    { timestamp: "14:02:20", mouseX: 520, mouseY: 150, wpm: 56, focused: true, trustScore: 96, note: "Focus fully stabilized on exam frame." },
    { timestamp: "14:02:25", mouseX: 610, mouseY: 90, wpm: 55, focused: true, trustScore: 98, note: "Candidate advances to next task section securely." }
  ];

  const impersonationFrames: ReplayFrame[] = [
    { timestamp: "14:24:00", mouseX: 80, mouseY: 280, wpm: 32, focused: true, trustScore: 94, note: "Session initialized. Identity profile verification active." },
    { timestamp: "14:24:05", mouseX: 200, mouseY: 280, wpm: 88, focused: true, trustScore: 82, note: "Keystroke dwell-time shifts by +38% (Automated Injector Pattern)." },
    { timestamp: "14:24:10", mouseX: 350, mouseY: 282, wpm: 12, focused: true, trustScore: 68, note: "Mouse Bezier trajectory shows zero natural human micro-tremor." },
    { timestamp: "14:24:15", mouseX: 540, mouseY: 280, wpm: 92, focused: true, trustScore: 54, note: "Significant profile divergence logged across hold flight sequences." },
    { timestamp: "14:24:20", mouseX: 543, mouseY: 285, wpm: 5, focused: true, trustScore: 41, note: "Euclidean deviation confirms high-probability proxy driver." },
    { timestamp: "14:24:25", mouseX: 650, mouseY: 110, wpm: 0, focused: false, trustScore: 36, note: "Primary browser viewport focus lost. Alternative hardware suspect." }
  ];

  const aiAssistedFrames: ReplayFrame[] = [
    { timestamp: "14:01:00", mouseX: 120, mouseY: 110, wpm: 45, focused: true, trustScore: 95, note: "Initial handshake calibration compliant." },
    { timestamp: "14:01:05", mouseX: 190, mouseY: 120, wpm: 42, focused: true, trustScore: 92, note: "Telemetry monitors clipboard focus events." },
    { timestamp: "14:01:10", mouseX: 220, mouseY: 130, wpm: 290, focused: false, trustScore: 78, note: "Bulk insert trigger registered: copy-pasted 350 characters." },
    { timestamp: "14:01:15", mouseX: 220, mouseY: 130, wpm: 580, focused: true, trustScore: 64, note: "Composition perplexity instantly shifts to conform with synthetic templates." },
    { timestamp: "14:01:20", mouseX: 460, mouseY: 320, wpm: 410, focused: true, trustScore: 51, note: "Cognitive solve latency exception: Advanced block resolved in 210ms." },
    { timestamp: "14:01:25", mouseX: 520, mouseY: 330, wpm: 0, focused: true, trustScore: 48, note: "High score correlation matches LLM assistant patterns." }
  ];

  const collusionFrames: ReplayFrame[] = [
    { timestamp: "13:59:00", mouseX: 90, mouseY: 100, wpm: 51, focused: true, trustScore: 96, note: "Candidate logged in. Continuous proximity model awake." },
    { timestamp: "13:59:05", mouseX: 140, mouseY: 150, wpm: 55, focused: true, trustScore: 89, note: "Temporal coordinate overlaps matching workstation solver Desk B-03." },
    { timestamp: "13:59:10", mouseX: 270, mouseY: 250, wpm: 58, focused: true, trustScore: 78, note: "Simultaneous focus swaps and answer input sequences match (+98.4%)." },
    { timestamp: "13:59:15", mouseX: 410, mouseY: 310, wpm: 42, focused: true, trustScore: 61, note: "Shared coordinate answers sequence flagged synchronously." },
    { timestamp: "13:59:20", mouseX: 440, mouseY: 280, wpm: 50, focused: true, trustScore: 45, note: "Room acoustics identify localized vocal whispers matching neighbor." },
    { timestamp: "13:59:25", mouseX: 550, mouseY: 170, wpm: 0, focused: true, trustScore: 40, note: "Collusion mesh verified. Automatic supervisor alert dispatched." }
  ];

  const getFrames = () => {
    switch (activeScenario) {
      case 'NORMAL': return normalFrames;
      case 'IMPERSONATION': return impersonationFrames;
      case 'AI_ASSISTED': return aiAssistedFrames;
      case 'COLLUSION': return collusionFrames;
    }
  };

  const frames = getFrames();
  const currentFrame = frames[currentFrameIdx] || frames[0];

  useEffect(() => {
    if (isPlaying) {
      const ms = 1500 / playbackSpeed;
      timerRef.current = setInterval(() => {
        setCurrentFrameIdx(old => {
          if (old >= frames.length - 1) {
            setIsPlaying(false);
            return old;
          }
          return old + 1;
        });
      }, ms);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activeScenario, playbackSpeed, frames.length]);

  const handleScenarioChange = (scen: 'NORMAL' | 'IMPERSONATION' | 'AI_ASSISTED' | 'COLLUSION') => {
    setActiveScenario(scen);
    setCurrentFrameIdx(0);
    setIsPlaying(false);
  };

  return (
    <div className="h-full overflow-y-auto p-8 bg-[#F8FAFC] custom-scrollbar text-slate-800 pb-16">
      
      {/* Header Block */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] font-sans">
            Forensic Behavior Replay Deck
          </h1>
          <p className="text-[13px] text-[#475569] mt-0.5">
            Coordinate-accurate replay of proctored sessions. Inspect spline paths, clipboard triggers, and viewport focal shifts.
          </p>
        </div>

        {/* Scenic Tabs */}
        <div className="flex bg-slate-100 p-1 border border-[#E2E8F0] rounded-xl">
          {(['NORMAL', 'IMPERSONATION', 'AI_ASSISTED', 'COLLUSION'] as const).map(scen => (
            <button
              key={scen}
              onClick={() => handleScenarioChange(scen)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                activeScenario === scen 
                  ? 'bg-white text-[#2563EB] shadow-sm border border-[#E2E8F0]' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {scen === 'NORMAL' ? 'Compliant' : scen.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Replay Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Aspect: Replay Workspace */}
        <div className="lg:col-span-8 space-y-6 flex flex-col">
          
          {/* Canvas Component */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-4 text-xs font-mono">
              <span className="text-[#0F172A] font-bold uppercase flex items-center gap-1.5">
                <MousePointer className="w-3.5 h-3.5 text-[#2563EB]" />
                Spatial Pointer Replay Track
              </span>
              <span className="text-slate-500 font-semibold bg-slate-50 border border-[#E2E8F0] px-2 py-0.5 rounded">
                Active Coordinate: {currentFrame.mouseX}px, {currentFrame.mouseY}px
              </span>
            </div>

            {/* Visual Simulated lock frame */}
            <div className="aspect-video w-full bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] relative overflow-hidden flex items-center justify-center shadow-inner">
              
              {/* Simulated Browser UI Structure */}
              <div className="absolute inset-8 border border-slate-200 bg-white rounded-lg p-5 flex flex-col justify-between text-slate-400 font-sans text-[11px] select-none shadow-sm">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-700">EXAMINATION BLOCK: ADMINISTRATIVE REASONING</span>
                  <span className="font-mono">QUESTION 4 OF 15</span>
                </div>

                <div className="space-y-2 py-4">
                  <div className="w-1/2 h-2.5 bg-slate-100 rounded" />
                  <div className="w-full h-2 bg-slate-100/80 rounded" />
                  <div className="w-3/4 h-2 bg-slate-100/50 rounded" />
                </div>

                <div className="mt-auto border-t border-slate-100 pt-2.5 flex justify-end gap-2">
                  <div className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-slate-500 font-medium">Select Key B</div>
                  <div className="px-2.5 py-1 bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] rounded font-bold">Lock Response</div>
                </div>
              </div>

              {/* Vector Spline Path SVG overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path 
                  d={`M ${frames.slice(0, currentFrameIdx + 1).map(f => `${(f.mouseX / 800) * 100}% ${(f.mouseY / 400) * 100}%`).join(' L ')}`} 
                  fill="none" 
                  stroke={activeScenario === 'NORMAL' ? '#16A34A' : activeScenario==='IMPERSONATION' ? '#DC2626' : '#D97706'}
                  strokeWidth="2.5" 
                  strokeDasharray={activeScenario === 'IMPERSONATION' ? '0' : '2.5 2.5'}
                  className="transition-all duration-300"
                />

                {/* Spline node points */}
                {frames.slice(0, currentFrameIdx).map((f, i) => (
                  <circle 
                    key={i} 
                    cx={`${(f.mouseX / 800) * 100}%`} 
                    cy={`${(f.mouseY / 400) * 100}%`} 
                    r="4" 
                    fill={activeScenario === 'NORMAL' ? '#16A34A' : '#D97706'} 
                    opacity="0.3" 
                  />
                ))}
              </svg>

              {/* Pointer indicator */}
              <div 
                className={`absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full border-2 transition-all duration-305 flex items-center justify-center ${
                  activeScenario === 'NORMAL' 
                    ? 'border-emerald-500 bg-emerald-500/20' 
                    : activeScenario === 'IMPERSONATION'
                    ? 'border-red-500 bg-red-500/20'
                    : 'border-amber-500 bg-amber-500/20'
                }`}
                style={{ 
                  left: `${(currentFrame.mouseX / 800) * 100}%`, 
                  top: `${(currentFrame.mouseY / 400) * 100}%` 
                }}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${activeScenario === 'NORMAL' ? 'bg-emerald-600' : 'bg-red-600'}`} />
              </div>

              {/* Inner compliance badge */}
              <div className="absolute right-4 top-4 px-2 py-0.5 bg-white border border-[#E2E8F0] rounded text-[10px] font-mono text-slate-500 flex items-center gap-1.5 shadow-sm">
                <span className={`w-1.5 h-1.5 rounded-full ${currentFrame.focused ? 'bg-emerald-500' : 'bg-red-500'}`} />
                {currentFrame.focused ? 'FOCUSED ON EXAM' : 'VIEWPORT UNBOUND'}
              </div>
            </div>
          </div>

          {/* Controllers */}
          <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white flex items-center justify-center shadow transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white pl-0.5" />}
              </button>

              <button
                onClick={() => {
                  setCurrentFrameIdx(0);
                  setIsPlaying(false);
                }}
                className="p-2 bg-slate-50 hover:bg-slate-100 text-[#475569] rounded-lg border border-[#E2E8F0] transition-colors cursor-pointer"
                title="Reset Replay"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="h-6 w-px bg-slate-200" />

              {/* Micro multiplier speeds */}
              <div className="flex bg-slate-50 p-0.5 rounded border border-[#E2E8F0] text-[10px] font-mono">
                {([1, 2, 5] as const).map(speed => (
                  <button
                    key={speed}
                    onClick={() => setPlaybackSpeed(speed)}
                    className={`px-2 py-1 rounded font-bold transition-all cursor-pointer ${playbackSpeed === speed ? 'bg-white text-[#2563EB] shadow-sm font-black' : 'text-slate-550'}`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
              <span className="text-[#2563EB] font-bold">{currentFrame.timestamp}</span>
              <div className="h-4 w-px bg-slate-205" />
              <span>FRAME: <strong className="text-slate-800 font-bold">{currentFrameIdx + 1} / {frames.length}</strong></span>
            </div>
          </div>

        </div>

        {/* Right Aspect: Continuous Trust Changes vs Event Indicators */}
        <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
          
          {/* Continuous Trust Change Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
            <h3 className="text-xs font-black text-[#0F172A] font-sans tracking-wide uppercase flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-[#2563EB]" />
              Trust Score Profile Path
            </h3>

            {/* Simulated mini line chart with CSS indicators */}
            <div className="space-y-3.5">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wide">Continuous Trust Score:</span>
                <span className={`text-2xl font-mono font-black ${currentFrame.trustScore > 80 ? 'text-[#16A34A]' : currentFrame.trustScore > 60 ? 'text-[#D97706]' : 'text-[#DC2626]'}`}>
                  {currentFrame.trustScore}%
                </span>
              </div>

              {/* Progress Bar of active trust */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-[#E2E8F0]">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    currentFrame.trustScore > 80 ? 'bg-emerald-500' : currentFrame.trustScore > 60 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${currentFrame.trustScore}%` }}
                />
              </div>

              <div className="p-3 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs font-sans text-slate-600 leading-relaxed min-h-[85px]">
                <strong className="text-[#0F172A] block mb-0.5">Telemetry Frame Event:</strong>
                {currentFrame.note}
              </div>
            </div>
          </div>

          {/* Event markers & actions */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-3 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-black text-[#0F172A] font-sans tracking-wide uppercase flex items-center gap-1.5 mb-2.5">
                <Clock className="w-4 h-4 text-[#2563EB]" />
                Interactive Frame Steps
              </h3>

              <div className="space-y-1.5 max-h-[180px] overflow-y-auto custom-scrollbar">
                {frames.map((f, i) => {
                  const isActive = i === currentFrameIdx;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentFrameIdx(i);
                        setIsPlaying(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left border transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-[#EFF6FF] border-[#2563EB] text-[#2563EB]' 
                          : 'bg-white border-[#E2E8F0] hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400 font-bold">{f.timestamp}</span>
                        <span className="text-xs font-bold font-sans truncate pr-2 max-w-[120px]">{`Step #${i+1}`}</span>
                      </div>
                      <span className={`text-[10px] font-mono font-bold ${f.trustScore > 80 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                        {f.trustScore}%
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
              <Monitor className="w-4 h-4 text-slate-400 shrink-0" />
              <p className="text-[10px] text-slate-500 font-sans leading-tight">
                Adjust playheads, step selectors or multiplier controls to seek physical behavior intervals instantly.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
