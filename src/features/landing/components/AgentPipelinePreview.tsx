import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  BrainCircuit,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Zap,
  ChevronRight,
  Code2,
  CheckCircle2,
  Lock,
  Layers,
} from 'lucide-react';

const PIPELINE_NODES = [
  {
    id: 'planner',
    number: '01',
    title: 'Planner Agent',
    role: 'Context Decomposition',
    icon: BrainCircuit,
    badge: 'Gemini 2.5 Pro',
    promptPreview:
      'System: Analyze multi-speaker transcript. Identify action item boundaries, decision rationale, and potential risk thresholds.',
    outputJSON: `{
  "session_id": "mtg_90412",
  "speakers": ["Sarah", "David", "Alex"],
  "topics": ["API Spec", "RS256 Migration", "Q3 Deliverables"]
}`,
    latency: '120ms',
    confidence: 'Verified (0.99)',
  },
  {
    id: 'extractor',
    number: '02',
    title: 'Task Extractor Agent',
    role: 'Structured Extraction',
    icon: SearchCheck,
    badge: 'Gemini 2.5 Flash',
    promptPreview:
      'Extract all explicit and implicit commitments. Map assignee, priority score, estimated complexity, and deadline.',
    outputJSON: `{
  "tasks": [
    {
      "title": "Finalize Q3 API Specification draft",
      "assignee": "Sarah",
      "priority": "High",
      "due": "Thursday"
    }
  ]
}`,
    latency: '85ms',
    confidence: 'Verified (0.98)',
  },
  {
    id: 'reflection',
    number: '03',
    title: 'Reflection & Verification Agent',
    role: 'Anti-Hallucination Guard',
    icon: ShieldCheck,
    badge: 'Self-Consistency Loop',
    promptPreview:
      'Cross-reference extracted tasks against raw transcript audio timestamps. Eliminate ungrounded assumptions.',
    outputJSON: `{
  "verification_status": "PASSED",
  "timestamp_grounding": "04:12 - 04:28",
  "hallucination_score": 0.00
}`,
    latency: '90ms',
    confidence: 'Grounding Pass (1.00)',
  },
  {
    id: 'governance',
    number: '04',
    title: 'Governance & Approval Gate',
    role: 'Risk-Based Thresholding',
    icon: Lock,
    badge: 'RBAC Policy Engine',
    promptPreview:
      'Check company security rule #SEC-90. Low-risk tasks auto-approved; high-budget items routed to CTO approval queue.',
    outputJSON: `{
  "policy_check": "AUTO_APPROVED",
  "risk_score": 0.12,
  "requires_human_approval": false
}`,
    latency: '15ms',
    confidence: 'Policy Match (100%)',
  },
  {
    id: 'dispatcher',
    number: '05',
    title: 'Tool Dispatcher Agent',
    role: 'Multi-System Sync',
    icon: Zap,
    badge: 'REST & Webhook Bus',
    promptPreview:
      'Construct authenticated payload and dispatch concurrently to Jira, Slack, GitHub, and Google Workspace.',
    outputJSON: `{
  "dispatches": [
    { "target": "JIRA", "issue": "API-902", "status": "201 Created" },
    { "target": "SLACK", "channel": "#eng", "status": "200 Sent" }
  ]
}`,
    latency: '140ms',
    confidence: 'Dispatch OK (200)',
  },
];

export const AgentPipelinePreview: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState('planner');
  const selectedNode = PIPELINE_NODES.find((n) => n.id === selectedNodeId) || PIPELINE_NODES[0];

  return (
    <section id="pipeline" className="py-24 bg-[#050505] text-white relative font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7CB518]/15 border border-[#7CB518]/30 text-[#39FF14] text-xs font-mono">
            <Bot className="w-3.5 h-3.5" /> Agentic Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-heading">
            Under The Hood Of ExecFlow’s Swarm.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-mono">
            A multi-agent reflection network that processes conversations with zero hallucination and mathematical precision.
          </p>
        </div>

        {/* Pipeline Step Sequence Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-mono">
          {PIPELINE_NODES.map((node) => {
            const Icon = node.icon;
            const isSelected = node.id === selectedNodeId;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`p-4 rounded-xl border text-left transition-all relative group ${
                  isSelected
                    ? 'bg-[#0F1110] border-[#7CB518] shadow-xl shadow-[#7CB518]/10 scale-[1.02]'
                    : 'bg-[#050505] border-[#7CB518]/20 hover:bg-[#0F1110] hover:border-[#7CB518]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold text-zinc-500">{node.number}</span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#7CB518]/15 text-[#39FF14] border border-[#7CB518]/30">
                    {node.badge}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#050505] border border-[#7CB518]/30 text-[#39FF14] w-fit mb-2">
                  <Icon className="w-4 h-4" />
                </div>

                <div className="text-sm font-bold text-white font-heading">{node.title}</div>
                <div className="text-xs text-zinc-400 mt-0.5 font-mono">{node.role}</div>

                {isSelected && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#7CB518] rotate-45 hidden lg:block" />
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed Inspector Card for Selected Node */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#0F1110] border border-[#7CB518]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-2xl font-mono">
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#7CB518]/15 text-[#39FF14] border border-[#7CB518]/30">
                <selectedNode.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-[#39FF14] font-bold">
                  STEP {selectedNode.number} INSPECTOR
                </span>
                <h3 className="text-2xl font-bold text-white font-heading">{selectedNode.title}</h3>
                <p className="text-xs text-zinc-400 font-mono">{selectedNode.role}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 font-mono">
              <div className="p-3.5 rounded-lg bg-[#050505] border border-[#7CB518]/20">
                <div className="text-[10px] text-zinc-400 font-mono">Model Latency</div>
                <div className="text-lg font-bold text-[#39FF14] font-mono">{selectedNode.latency}</div>
              </div>
              <div className="p-3.5 rounded-lg bg-[#050505] border border-[#7CB518]/20">
                <div className="text-[10px] text-zinc-400 font-mono">Confidence Precision</div>
                <div className="text-lg font-bold text-[#39FF14] font-mono">{selectedNode.confidence}</div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-[#39FF14]" /> Agent Instructions & Grounding
              </span>
              <div className="p-3.5 rounded-lg bg-[#050505] border border-[#7CB518]/20 text-xs text-zinc-300 font-mono leading-relaxed">
                {selectedNode.promptPreview}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-2 font-mono">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-[#39FF14] font-bold">
                <Code2 className="w-4 h-4" /> Structured JSON Output Payload
              </span>
              <span className="text-[10px] bg-[#050505] px-2 py-0.5 rounded border border-[#7CB518]/20 text-[#39FF14]">
                Schema Verified
              </span>
            </div>

            <div className="p-4 sm:p-6 rounded-lg bg-[#050505] border border-[#7CB518]/30 font-mono text-xs text-[#39FF14] overflow-x-auto shadow-inner leading-relaxed">
              <pre>{selectedNode.outputJSON}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
