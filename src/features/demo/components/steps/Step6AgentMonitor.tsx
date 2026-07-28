import React from 'react';
import { motion } from 'motion/react';
import {
  Activity,
  Cpu,
  ShieldCheck,
  Zap,
  Terminal,
  Clock,
  Sparkles,
  CheckCircle2,
  Code2,
} from 'lucide-react';

export const Step6AgentMonitor: React.FC = () => {
  return (
    <div className="space-y-6 font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0F1110] border border-zinc-800 font-sans">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#7CB518]/15 text-[#7CB518] font-sans text-xs font-semibold border border-[#7CB518]/30">
              STEP 06
            </span>
            <h2 className="text-lg font-bold text-white font-heading">Agent Execution Monitor & Telemetry</h2>
          </div>
          <p className="text-xs text-zinc-400 font-sans mt-1">
            Real-time execution telemetry, node latencies, reflection score audits, and raw tool invocation payloads.
          </p>
        </div>

        <div className="flex items-center gap-2 font-sans text-xs">
          <span className="text-white bg-[#151817] px-3 py-1 rounded-full border border-zinc-800 font-medium flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            Execution Status: <span className="text-emerald-400 font-semibold">SUCCESS</span>
          </span>
        </div>
      </div>

      {/* Latency & Telemetry Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-sans">
        <div className="p-4 rounded-xl bg-[#0F1110] border border-zinc-800 space-y-1">
          <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">Total Execution Time</div>
          <div className="text-2xl font-bold text-white font-heading">1,580 ms</div>
          <div className="text-[10px] text-emerald-400 font-sans font-medium">Sub-2s SLA Guarantee</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0F1110] border border-zinc-800 space-y-1">
          <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">LLM Tokens Processed</div>
          <div className="text-2xl font-bold text-white font-heading">18,420</div>
          <div className="text-[10px] text-zinc-400 font-sans">Gemini 2.5 Flash Pipeline</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0F1110] border border-zinc-800 space-y-1">
          <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">Reflection Score</div>
          <div className="text-2xl font-bold text-emerald-400 font-heading">99.8%</div>
          <div className="text-[10px] text-emerald-400 font-sans font-medium">0 Hallucinations</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0F1110] border border-zinc-800 space-y-1">
          <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">Tool Invocations</div>
          <div className="text-2xl font-bold text-amber-400 font-heading">4 Dispatches</div>
          <div className="text-[10px] text-zinc-400 font-sans">GitHub, Slack, Calendar</div>
        </div>
      </div>

      {/* Replay Node Graph & Raw Tool Payload Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-sans">
        {/* Node Latency Breakdown */}
        <div className="lg:col-span-6 p-6 rounded-xl bg-[#0F1110] border border-zinc-800 space-y-4">
          <h3 className="text-xs font-bold text-zinc-200 font-heading uppercase tracking-wider border-b border-zinc-800 pb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#7CB518]" />
            Node Execution Latency Breakdown
          </h3>

          <div className="space-y-3 font-sans text-xs">
            <div>
              <div className="flex justify-between text-[11px] text-zinc-300 mb-1">
                <span>Planner Agent</span>
                <span className="font-mono text-zinc-400">110 ms (7%)</span>
              </div>
              <div className="h-2 w-full bg-[#050505] rounded-full overflow-hidden border border-zinc-800">
                <div className="h-full bg-[#7CB518] rounded-full" style={{ width: '7%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-zinc-300 mb-1">
                <span>Task Extraction Engine</span>
                <span className="font-mono text-zinc-400">310 ms (20%)</span>
              </div>
              <div className="h-2 w-full bg-[#050505] rounded-full overflow-hidden border border-zinc-800">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '20%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-zinc-300 mb-1">
                <span>Reflection & Quality Loop</span>
                <span className="font-mono text-zinc-400">290 ms (18%)</span>
              </div>
              <div className="h-2 w-full bg-[#050505] rounded-full overflow-hidden border border-zinc-800">
                <div className="h-full bg-[#7CB518] rounded-full" style={{ width: '18%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-zinc-300 mb-1">
                <span>Tool Payload Generator</span>
                <span className="font-mono text-zinc-400">150 ms (10%)</span>
              </div>
              <div className="h-2 w-full bg-[#050505] rounded-full overflow-hidden border border-zinc-800">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '10%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Tool Dispatches Payload Inspector */}
        <div className="lg:col-span-6 p-6 rounded-xl bg-[#0F1110] border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <h3 className="text-xs font-bold text-zinc-200 font-heading uppercase tracking-wider flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#7CB518]" />
              Tool Dispatch JSON Payload
            </h3>
            <span className="text-[10px] font-mono text-emerald-400">Validated Schema</span>
          </div>

          <div className="p-4 rounded-lg bg-[#151817] font-mono text-[11px] text-emerald-400 space-y-1 border border-zinc-800 overflow-x-auto">
            <div>{`{`}</div>
            <div className="pl-4">{`"action": "CREATE_GITHUB_ISSUE",`}</div>
            <div className="pl-4">{`"repo": "apex-platform/core",`}</div>
            <div className="pl-4">{`"title": "PostgreSQL pgvector Migration",`}</div>
            <div className="pl-4">{`"assignee": "Elena Rostova",`}</div>
            <div className="pl-4">{`"labels": ["high-priority", "database", "q3-sync"],`}</div>
            <div className="pl-4">{`"security_gate": "PASSED"`}</div>
            <div>{`}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
