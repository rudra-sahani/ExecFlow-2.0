import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  UploadCloud,
  FileText,
  Bot,
  CheckSquare,
  Database,
  Zap,
  BarChart3,
  Play,
  Pause,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  GitBranch,
  Slack,
  Calendar,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

const STEPS = [
  {
    id: 'upload',
    stepNumber: '01',
    title: 'Upload / Stream Meeting',
    icon: UploadCloud,
    description: 'Upload MP4, M4A, MP3 or connect Zoom, Google Meet, Teams bot.',
  },
  {
    id: 'transcript',
    stepNumber: '02',
    title: 'Speaker Diarization',
    icon: FileText,
    description: 'Real-time multi-speaker transcription with timestamped sentiment.',
  },
  {
    id: 'agents',
    stepNumber: '03',
    title: 'AI Agent Execution',
    icon: Bot,
    description: 'Multi-agent reflection loop extracts facts, tasks, and risks.',
  },
  {
    id: 'tasks',
    stepNumber: '04',
    title: 'Structured Tasks',
    icon: CheckSquare,
    description: 'Precision task payloads with assignees, priorities, and deadlines.',
  },
  {
    id: 'knowledge',
    stepNumber: '05',
    title: 'Knowledge Graph',
    icon: Database,
    description: 'Persistent semantic vector memory across meetings.',
  },
  {
    id: 'automation',
    stepNumber: '06',
    title: 'Tool Dispatches',
    icon: Zap,
    description: 'Auto-sync to Jira, GitHub, Slack, and Google Calendar.',
  },
  {
    id: 'dashboard',
    stepNumber: '07',
    title: 'Executive Insights',
    icon: BarChart3,
    description: 'Real-time decision velocity and risk telemetry.',
  },
];

export const InteractiveDemo: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % STEPS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeStep = STEPS[activeStepIndex];

  return (
    <section id="demo" className="py-24 bg-[#050505] text-white relative font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7CB518]/15 border border-[#7CB518]/30 text-[#39FF14] text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Sandbox Experience
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-heading">
            See ExecFlow In Action Within Seconds.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-mono">
            Experience the complete end-to-end lifecycle from raw audio stream to automated enterprise tool dispatch.
          </p>

          <div className="pt-2 flex justify-center">
            <Link
              to="/demo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#7CB518] hover:bg-[#39FF14] text-black font-bold text-xs shadow-lg shadow-[#7CB518]/20 transition-all group font-mono"
            >
              <Play className="w-4 h-4 fill-current text-black" />
              <span>Launch 5-Minute Guided Demo Mode</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Step Selector Horizontal Bar */}
        <div className="flex items-center justify-between bg-[#0F1110] border border-[#7CB518]/30 p-2 rounded-xl overflow-x-auto gap-2 font-mono">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.id}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveStepIndex(idx);
                }}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg font-bold text-xs whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#7CB518] text-black font-bold shadow-lg shadow-[#7CB518]/20 scale-[1.02]'
                    : 'text-zinc-400 hover:text-white hover:bg-[#111315]'
                }`}
              >
                <span className="text-[10px] font-mono opacity-80">{step.stepNumber}</span>
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{step.title}</span>
              </button>
            );
          })}

          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="px-4 py-2.5 rounded-lg bg-[#111315] border border-[#7CB518]/30 hover:bg-[#181a1c] text-zinc-200 font-bold text-xs flex items-center gap-2 whitespace-nowrap ml-auto font-mono"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#39FF14]" /> Pause Tour
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#39FF14]" /> Play Auto-Tour
              </>
            )}
          </button>
        </div>

        {/* Dynamic Main Workspace Stage */}
        <div className="rounded-xl border border-[#7CB518]/30 bg-[#0F1110] p-6 sm:p-10 relative overflow-hidden shadow-2xl font-mono">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Top Banner inside stage */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#7CB518]/15">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-[#7CB518]/15 text-[#39FF14] border border-[#7CB518]/30">
                    <activeStep.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#39FF14] font-bold">
                        STAGE {activeStep.stepNumber}
                      </span>
                      <h3 className="text-xl font-bold text-white font-heading">{activeStep.title}</h3>
                    </div>
                    <p className="text-xs text-zinc-400 font-mono">{activeStep.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveStepIndex((prev) => (prev + 1) % STEPS.length)}
                    className="px-4 py-2 rounded-lg bg-[#7CB518] hover:bg-[#39FF14] text-black font-bold text-xs flex items-center gap-1.5 transition-colors font-mono"
                  >
                    Next Stage <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stage Specific Custom Content Renderers */}
              {activeStep.id === 'upload' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center font-mono">
                  <div className="p-8 rounded-lg border-2 border-dashed border-[#7CB518]/30 bg-[#050505] text-center space-y-4 hover:border-[#7CB518]/60 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-[#7CB518]/15 text-[#39FF14] flex items-center justify-center mx-auto">
                      <UploadCloud className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-heading">Drop Meeting Recording Here</h4>
                      <p className="text-xs text-zinc-400 mt-1 font-mono">Supports MP4, M4A, WAV, MP3 up to 2GB</p>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-[#7CB518] text-black font-bold text-xs shadow-lg shadow-[#7CB518]/20 font-mono">
                      Select Sample Meeting Recording
                    </button>
                  </div>

                  <div className="space-y-3 p-6 rounded-lg bg-[#050505] border border-[#7CB518]/20">
                    <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono">
                      Live Bot Integrations Available
                    </span>
                    <div className="space-y-2 pt-2">
                      <div className="p-3 rounded-lg bg-[#111315] border border-[#7CB518]/20 flex items-center justify-between text-xs">
                        <span className="font-bold text-zinc-200">Zoom Bot Integration</span>
                        <span className="text-[#39FF14] font-mono text-[10px] bg-[#7CB518]/15 px-2 py-0.5 rounded border border-[#7CB518]/30">Connected</span>
                      </div>
                      <div className="p-3 rounded-lg bg-[#111315] border border-[#7CB518]/20 flex items-center justify-between text-xs">
                        <span className="font-bold text-zinc-200">Google Meet Auto-Join</span>
                        <span className="text-[#39FF14] font-mono text-[10px] bg-[#7CB518]/15 px-2 py-0.5 rounded border border-[#7CB518]/30">Connected</span>
                      </div>
                      <div className="p-3 rounded-lg bg-[#111315] border border-[#7CB518]/20 flex items-center justify-between text-xs">
                        <span className="font-bold text-zinc-200">MS Teams Streamer</span>
                        <span className="text-[#39FF14] font-mono text-[10px] bg-[#7CB518]/15 px-2 py-0.5 rounded border border-[#7CB518]/30">Connected</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeStep.id === 'transcript' && (
                <div className="space-y-3 bg-[#050505] p-6 rounded-lg border border-[#7CB518]/20 font-mono">
                  <div className="flex justify-between items-center text-xs text-zinc-400 border-b border-[#7CB518]/15 pb-3">
                    <span className="font-mono">Transcript: Engineering Architecture Sync (42m)</span>
                    <span className="text-[#39FF14] font-mono">100% Diarization Complete</span>
                  </div>
                  <div className="space-y-3 pt-2">
                    <div className="p-3 rounded-lg bg-[#111315] border border-[#7CB518]/20">
                      <div className="flex items-center gap-2 mb-1 text-xs">
                        <span className="font-bold text-[#39FF14]">Alex (CTO)</span>
                        <span className="text-[10px] font-mono text-zinc-500">04:12</span>
                      </div>
                      <p className="text-xs text-zinc-300 font-mono">
                        "We need to migration our database indices to PostgreSQL pgvector by Friday to handle memory search."
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#111315] border border-[#7CB518]/20">
                      <div className="flex items-center gap-2 mb-1 text-xs">
                        <span className="font-bold text-[#95D600]">Rachel (Lead Engineer)</span>
                        <span className="text-[10px] font-mono text-zinc-500">04:28</span>
                      </div>
                      <p className="text-xs text-zinc-300 font-mono">
                        "Agreed. I will take ownership of the schema migration and set up approval gates for dry-run testing."
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeStep.id === 'agents' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
                  <div className="p-5 rounded-lg bg-[#050505] border border-[#7CB518]/20 space-y-3">
                    <div className="flex items-center gap-2 text-[#39FF14] font-bold text-xs">
                      <Bot className="w-4 h-4" /> Task Extraction Agent
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                      Scans transcript context using Gemini 2.5 Flash and extracts explicit commitments with assignee mapping.
                    </p>
                    <div className="text-[10px] font-mono text-[#39FF14] bg-[#7CB518]/15 p-2 rounded border border-[#7CB518]/30">
                      3 Actionable Items Identified
                    </div>
                  </div>

                  <div className="p-5 rounded-lg bg-[#050505] border border-[#7CB518]/20 space-y-3">
                    <div className="flex items-center gap-2 text-[#95D600] font-bold text-xs">
                      <ShieldCheck className="w-4 h-4" /> Reflection & Quality Agent
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                      Evaluates extraction accuracy against anti-hallucination guardrails and verifies timeline feasibility.
                    </p>
                    <div className="text-[10px] font-mono text-[#39FF14] bg-[#7CB518]/15 p-2 rounded border border-[#7CB518]/30">
                      0 Hallucinations Detected
                    </div>
                  </div>

                  <div className="p-5 rounded-lg bg-[#050505] border border-[#7CB518]/20 space-y-3">
                    <div className="flex items-center gap-2 text-[#39FF14] font-bold text-xs">
                      <Zap className="w-4 h-4" /> Tool Dispatch Planner
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                      Constructs REST & Webhook payloads for Jira, GitHub, Slack, and Google Calendar.
                    </p>
                    <div className="text-[10px] font-mono text-[#39FF14] bg-[#7CB518]/15 p-2 rounded border border-[#7CB518]/30">
                      4 Webhooks Prepared
                    </div>
                  </div>
                </div>
              )}

              {activeStep.id === 'tasks' && (
                <div className="space-y-3 font-mono">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-[#050505] border border-[#7CB518]/20 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-white font-heading">PostgreSQL pgvector Schema Migration</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#7CB518]/20 text-[#39FF14] border border-[#7CB518]/30">
                          High Priority
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 font-mono">Assignee: Rachel (Lead Engineer) • Due: Friday</p>
                      <div className="text-[11px] font-mono text-[#39FF14] pt-1">
                        Verification: Grounded • Context Match: Timestamp 04:28
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-[#050505] border border-[#7CB518]/20 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-white font-heading">Setup Dry-Run Testing Approval Gates</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#7CB518]/15 text-[#39FF14] border border-[#7CB518]/30">
                          Medium Priority
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 font-mono">Assignee: Alex (CTO) • Due: Monday</p>
                      <div className="text-[11px] font-mono text-[#39FF14] pt-1">
                        Confidence: 98.4% • Context Match: Timestamp 04:12
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeStep.id === 'knowledge' && (
                <div className="p-6 rounded-lg bg-[#050505] border border-[#7CB518]/20 space-y-4 font-mono">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-200">Semantic Vector Graph Record</span>
                    <span className="text-zinc-500 font-mono">ID: #mem_vector_90241</span>
                  </div>
                  <div className="p-4 rounded-lg bg-[#111315] font-mono text-xs text-[#39FF14] space-y-1">
                    <div>{`{`}</div>
                    <div className="pl-4">{`"decision": "Adopt pgvector for long-term agentic memory",`}</div>
                    <div className="pl-4">{`"impact": "Reduces query latency by 84%",`}</div>
                    <div className="pl-4">{`"tags": ["architecture", "database", "vector"],`}</div>
                    <div className="pl-4">{`"cross_meeting_links": ["#m_801", "#m_884"]`}</div>
                    <div>{`}`}</div>
                  </div>
                </div>
              )}

              {activeStep.id === 'automation' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                  <div className="p-4 rounded-lg bg-[#050505] border border-[#7CB518]/20 space-y-2">
                    <div className="flex items-center gap-2 text-[#39FF14] font-bold text-xs">
                      <GitBranch className="w-4 h-4" /> GitHub Issue
                    </div>
                    <p className="text-xs text-zinc-300 font-mono">#402 pgvector migration</p>
                    <span className="text-[10px] text-[#39FF14] bg-[#7CB518]/15 border border-[#7CB518]/30 px-2 py-0.5 rounded inline-block">
                      Created
                    </span>
                  </div>

                  <div className="p-4 rounded-lg bg-[#050505] border border-[#7CB518]/20 space-y-2">
                    <div className="flex items-center gap-2 text-[#95D600] font-bold text-xs">
                      <Slack className="w-4 h-4" /> Slack Channel
                    </div>
                    <p className="text-xs text-zinc-300 font-mono">#eng-decisions</p>
                    <span className="text-[10px] text-[#39FF14] bg-[#7CB518]/15 border border-[#7CB518]/30 px-2 py-0.5 rounded inline-block">
                      Notified
                    </span>
                  </div>

                  <div className="p-4 rounded-lg bg-[#050505] border border-[#7CB518]/20 space-y-2">
                    <div className="flex items-center gap-2 text-[#39FF14] font-bold text-xs">
                      <Calendar className="w-4 h-4" /> Google Calendar
                    </div>
                    <p className="text-xs text-zinc-300 font-mono">Migration Dry Run</p>
                    <span className="text-[10px] text-[#39FF14] bg-[#7CB518]/15 border border-[#7CB518]/30 px-2 py-0.5 rounded inline-block">
                      Scheduled
                    </span>
                  </div>
                </div>
              )}

              {activeStep.id === 'dashboard' && (
                <div className="p-6 rounded-lg bg-[#050505] border border-[#7CB518]/20 space-y-4 font-mono">
                  <div className="text-xs font-bold text-[#39FF14] font-mono">SAMPLE WORKSPACE TELEMETRY</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-[#111315] border border-[#7CB518]/20">
                      <div className="text-xs text-zinc-400">Grounding Reflection Pass</div>
                      <div className="text-2xl font-black text-[#39FF14] font-heading">100%</div>
                      <div className="text-[10px] text-zinc-500 font-mono">Transcript timestamp verified</div>
                    </div>

                    <div className="p-4 rounded-lg bg-[#111315] border border-[#7CB518]/20">
                      <div className="text-xs text-zinc-400">Active Pipeline Swarms</div>
                      <div className="text-2xl font-black text-[#39FF14] font-heading">7 Agents</div>
                      <div className="text-[10px] text-zinc-500 font-mono">Planner, Extractor, Dispatcher</div>
                    </div>

                    <div className="p-4 rounded-lg bg-[#111315] border border-[#7CB518]/20">
                      <div className="text-xs text-zinc-400">Dispatch Status</div>
                      <div className="text-2xl font-black text-[#39FF14] font-heading">Synchronized</div>
                      <div className="text-[10px] text-zinc-500 font-mono">Jira, Slack & GitHub active</div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
