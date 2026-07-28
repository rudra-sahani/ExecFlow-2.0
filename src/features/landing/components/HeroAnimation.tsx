import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mic,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  GitPullRequest,
  Slack,
  Database,
  Zap,
  Bot,
  Play,
  RotateCw,
  Clock,
  Sparkles,
} from 'lucide-react';

const SAMPLE_TRANSCRIPTS = [
  {
    speaker: 'Sarah (VP Product)',
    time: '10:14 AM',
    text: '"We need Sarah to finalize the Q3 API Spec by Thursday and flag security risk on OAuth deprecation."',
  },
  {
    speaker: 'David (Staff Architect)',
    time: '10:16 AM',
    text: '"Decided: We will migrate auth tokens to RS256 by end of sprint and automate Slack updates."',
  },
];

export const HeroAnimation: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-xl border border-[#7CB518]/30 bg-[#0F1110] shadow-2xl overflow-hidden p-6 sm:p-8 font-mono">
      {/* Background Subtle Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#7CB518]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#39FF14]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Controls Bar */}
      <div className="relative z-10 flex items-center justify-between pb-6 border-b border-[#7CB518]/15 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#7CB518]/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#39FF14]/80 inline-block" />
          </div>
          <span className="text-xs font-mono text-zinc-400 pl-2 border-l border-[#7CB518]/20 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-ping" />
            Live Processing Pipeline v2.5
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1.5 rounded bg-[#111315] border border-[#7CB518]/30 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
          >
            {isPlaying ? (
              <>
                <RotateCw className="w-3 h-3 animate-spin text-[#39FF14]" /> Auto-Looping
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-[#39FF14]" /> Resume Demo
              </>
            )}
          </button>
        </div>
      </div>

      {/* Grid Content: Input Voice Stream -> Agentic Reasoning -> Dispatched Actions */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Step 1: Voice Input Stream (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 font-heading">
              <Mic className="w-3.5 h-3.5 text-[#39FF14]" /> Voice Stream
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#7CB518]/15 text-[#39FF14] border border-[#7CB518]/30">
              Diarization On
            </span>
          </div>

          <div className="space-y-2.5 font-mono">
            {SAMPLE_TRANSCRIPTS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className={`p-3.5 rounded-lg border transition-all text-xs ${
                  activeStep === idx
                    ? 'border-[#7CB518]/60 bg-[#111315] text-white shadow-md shadow-[#7CB518]/10'
                    : 'border-[#7CB518]/15 bg-[#050505] text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-white flex items-center gap-1.5 font-heading">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
                    {item.speaker}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">{item.time}</span>
                </div>
                <p className="italic text-[11px] leading-relaxed font-mono">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Central Agent Pipeline Node (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 rounded-lg bg-[#050505] border border-[#7CB518]/30 relative shadow-inner">
          <div className="absolute -top-3 px-3 py-0.5 rounded bg-[#7CB518] text-black text-[10px] font-black uppercase tracking-widest shadow-md flex items-center gap-1 font-mono">
            <Sparkles className="w-3 h-3 text-black" /> Multi-Agent Execution
          </div>

          <div className="w-full space-y-3 pt-2 font-mono">
            <div className="p-3 rounded-lg bg-[#111315] border border-[#7CB518]/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded bg-[#7CB518]/20 text-[#39FF14]">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-heading">Task Extractor Agent</div>
                  <div className="text-[10px] text-zinc-400 font-mono">Verification: Grounded (0.99)</div>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
            </div>

            <div className="p-3 rounded-lg bg-[#111315] border border-[#7CB518]/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded bg-[#95D600]/20 text-[#95D600]">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-heading">Risk Evaluator Agent</div>
                  <div className="text-[10px] text-zinc-400 font-mono">Score: 0.12 (Low)</div>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
            </div>

            <div className="p-3 rounded-lg bg-[#111315] border border-[#7CB518]/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded bg-[#39FF14]/20 text-[#39FF14]">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-heading">Tool Dispatcher</div>
                  <div className="text-[10px] text-zinc-400 font-mono">Status: Dispatched</div>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Step 3: Instant Structured Outputs (4 Cols) */}
        <div className="lg:col-span-4 space-y-3 font-mono">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 font-heading">
              <Zap className="w-3.5 h-3.5 text-[#39FF14]" /> Dispatched Artifacts
            </span>
            <span className="text-[10px] font-mono text-[#39FF14] bg-[#7CB518]/15 px-2 py-0.5 rounded border border-[#7CB518]/30">
              Synced
            </span>
          </div>

          <div className="space-y-2.5">
            <motion.div
              animate={{ scale: activeStep === 1 ? 1.02 : 1 }}
              className="p-3.5 rounded-lg border border-[#7CB518]/20 bg-[#050505] hover:bg-[#111315] transition-all text-xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[#39FF14] font-bold flex items-center gap-1.5 font-heading">
                  <GitPullRequest className="w-3.5 h-3.5" /> Jira #API-902
                </span>
                <span className="px-2 py-0.5 text-[9px] rounded font-mono bg-[#7CB518]/20 text-[#39FF14]">
                  High Priority
                </span>
              </div>
              <p className="text-zinc-300 text-[11px] font-medium font-mono">Finalize Q3 API Specification draft</p>
              <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                <span>Assignee: Sarah</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-zinc-500" /> Due: Thursday
                </span>
              </div>
            </motion.div>

            <motion.div
              animate={{ scale: activeStep === 2 ? 1.02 : 1 }}
              className="p-3.5 rounded-lg border border-[#7CB518]/20 bg-[#050505] hover:bg-[#111315] transition-all text-xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[#95D600] font-bold flex items-center gap-1.5 font-heading">
                  <Slack className="w-3.5 h-3.5" /> Slack #engineering
                </span>
                <span className="px-2 py-0.5 text-[9px] rounded font-mono bg-[#95D600]/20 text-[#95D600]">
                  Decision Logged
                </span>
              </div>
              <p className="text-zinc-300 text-[11px] font-medium font-mono">Migrate Auth Tokens to RS256</p>
              <div className="mt-2 text-[10px] text-zinc-400 font-mono">Notified 14 developers in channel</div>
            </motion.div>

            <motion.div
              animate={{ scale: activeStep === 3 ? 1.02 : 1 }}
              className="p-3.5 rounded-lg border border-[#7CB518]/20 bg-[#050505] hover:bg-[#111315] transition-all text-xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[#39FF14] font-bold flex items-center gap-1.5 font-heading">
                  <Database className="w-3.5 h-3.5" /> Knowledge Graph
                </span>
                <span className="px-2 py-0.5 text-[9px] rounded font-mono bg-[#7CB518]/20 text-[#39FF14]">
                  Vector Saved
                </span>
              </div>
              <p className="text-zinc-300 text-[11px] font-medium font-mono">Linked to Q3 Roadmap & Security Hub</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
