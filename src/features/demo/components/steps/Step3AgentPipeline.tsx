import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cpu,
  Brain,
  CheckSquare,
  Lightbulb,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Sparkles,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

const PIPELINE_NODES = [
  {
    id: 'planner',
    title: 'Planner Agent',
    icon: Brain,
    description: 'Constructs extraction topology & sets domain guardrails.',
    latency: '110ms',
    confidence: '99.9%',
    status: 'completed',
    color: 'bg-[#7CB518]',
  },
  {
    id: 'understanding',
    title: 'Context Engine',
    icon: Cpu,
    description: 'Parses cross-departmental jargon, semantics & timelines.',
    latency: '240ms',
    confidence: '99.5%',
    status: 'completed',
    color: 'bg-[#7CB518]',
  },
  {
    id: 'task_extractor',
    title: 'Task Extraction',
    icon: CheckSquare,
    description: 'Identifies explicit commitments, assignees, and deadlines.',
    latency: '310ms',
    confidence: '99.8%',
    status: 'completed',
    color: 'bg-[#7CB518]',
  },
  {
    id: 'decision_extractor',
    title: 'Decision Engine',
    icon: Lightbulb,
    description: 'Isolates executive strategy statements & rationale.',
    latency: '180ms',
    confidence: '99.2%',
    status: 'completed',
    color: 'bg-[#7CB518]',
  },
  {
    id: 'risk_detector',
    title: 'Risk Detector',
    icon: AlertTriangle,
    description: 'Scans for compliance, financial & downtime risks.',
    latency: '210ms',
    confidence: '98.9%',
    status: 'completed',
    color: 'bg-amber-500',
  },
  {
    id: 'reflection',
    title: 'Reflection Loop',
    icon: ShieldCheck,
    description: 'Verifies extraction accuracy & eliminates hallucinations.',
    latency: '290ms',
    confidence: '100%',
    status: 'completed',
    color: 'bg-[#7CB518]',
  },
  {
    id: 'approval',
    title: 'Human-in-the-Loop',
    icon: CheckCircle2,
    description: 'Applies $10k financial threshold verification gates.',
    latency: '95ms',
    confidence: '100%',
    status: 'completed',
    color: 'bg-[#7CB518]',
  },
  {
    id: 'automation',
    title: 'Tool Dispatcher',
    icon: Zap,
    description: 'Formulates webhooks for GitHub, Slack & Google Calendar.',
    latency: '150ms',
    confidence: '99.9%',
    status: 'completed',
    color: 'bg-[#7CB518]',
  },
];

export const Step3AgentPipeline: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % PIPELINE_NODES.length);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const activeNode = PIPELINE_NODES[activeStepIndex];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0F1110] border border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#7CB518]/15 text-[#7CB518] font-sans text-xs font-semibold border border-[#7CB518]/30">
              STEP 03
            </span>
            <h2 className="text-lg font-bold text-white font-heading">AI Agent Pipeline Execution</h2>
          </div>
          <p className="text-xs text-zinc-400 font-sans mt-1">
            Multi-agent architecture executing sequential reflection loops to extract high-precision enterprise telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2 font-sans text-xs">
          <span className="text-white bg-[#151817] px-3 py-1 rounded-full border border-zinc-800 font-medium flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-[#7CB518] animate-spin" />
            Total Pipeline Latency: 1.58s
          </span>
        </div>
      </div>

      {/* Sequential Pipeline Visualizer Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-sans">
        {PIPELINE_NODES.map((node, idx) => {
          const Icon = node.icon;
          const isActive = idx === activeStepIndex;
          const isPassed = idx < activeStepIndex;

          return (
            <div
              key={node.id}
              className={`p-4 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                isActive
                  ? 'bg-[#151817] border-[#7CB518] shadow-md'
                  : isPassed
                  ? 'bg-[#0F1110] border-zinc-800 text-zinc-300'
                  : 'bg-[#050505] border-zinc-900 text-zinc-600'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${node.color} text-black font-bold shadow-xs`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 font-medium">NODE 0{idx + 1}</span>
              </div>

              <h3 className="text-xs font-bold text-white font-heading mb-1">{node.title}</h3>
              <p className="text-[11px] text-zinc-400 font-sans line-clamp-2 leading-relaxed mb-3">
                {node.description}
              </p>

              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono">
                <span className="text-zinc-500">{node.latency}</span>
                <span className="text-emerald-400 font-semibold">{node.confidence}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Agent Thought Stream Showcase */}
      <div className="p-6 rounded-xl bg-[#0F1110] border border-zinc-800 space-y-4 font-sans">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#7CB518]" />
            <span className="text-xs font-bold text-white font-heading">Active Node Reflection Stream:</span>
            <span className="text-xs font-sans text-white font-bold uppercase">{activeNode.title}</span>
          </div>
          <span className="text-[10px] font-sans text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 font-medium">
            0 Hallucinations Detected
          </span>
        </div>

        <div className="p-4 rounded-lg bg-[#151817] text-xs text-zinc-300 space-y-2 border border-zinc-800">
          <div className="text-zinc-200 flex items-center gap-2 font-mono text-xs">
            <ArrowRight className="w-3.5 h-3.5 text-[#7CB518]" />
            <span>[AGENT_LOG] Executing node target: {activeNode.id}</span>
          </div>
          <p className="text-zinc-400 pl-5 leading-relaxed font-sans">
            "{activeNode.description}"
          </p>
          <div className="pl-5 text-emerald-400 text-[11px] font-sans font-medium">
            ✓ Confidence: {activeNode.confidence} • Output payload validated against enterprise policy rules.
          </div>
        </div>
      </div>
    </div>
  );
};
