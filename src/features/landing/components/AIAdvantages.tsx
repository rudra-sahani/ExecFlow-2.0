import React from 'react';
import { Bot, Sparkles, ShieldCheck, Zap, Database, BrainCircuit, Check, X } from 'lucide-react';

const COMPARISONS = [
  {
    feature: 'Core Architecture',
    execflow: 'Multi-Agent Swarm (Planner, Reflection, Risk, Dispatcher)',
    legacy: 'Basic Speech-to-Text LLM Wrapper',
  },
  {
    feature: 'Hallucination Defense',
    execflow: 'Self-consistency timestamp grounding & anti-hallucination guard',
    legacy: 'Frequent hallucinated tasks & ungrounded summaries',
  },
  {
    feature: 'Tool Execution',
    execflow: 'Automated 2-way REST & Webhook dispatch (Jira, GitHub, Slack)',
    legacy: 'Static email summaries requiring manual copying',
  },
  {
    feature: 'Enterprise Governance',
    execflow: 'Risk-based threshold approval gates & RBAC compliance',
    legacy: 'No approval gates or risk evaluation',
  },
  {
    feature: 'Organizational Memory',
    execflow: 'Connected vector graph indexing decisions across months',
    legacy: 'Siloed video recordings with basic keyword search',
  },
];

export const AIAdvantages: React.FC = () => {
  return (
    <section className="py-24 bg-[#050505] text-white relative font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7CB518]/15 border border-[#7CB518]/30 text-[#39FF14] text-xs font-mono">
            <BrainCircuit className="w-3.5 h-3.5" /> Next-Gen AI Advantage
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-heading">
            Beyond Standard Transcription Bots.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-mono">
            Legacy bots only record transcripts. ExecFlow operates as an agentic execution engine built for active workflow automation.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="rounded-xl border border-[#7CB518]/30 bg-[#0F1110] overflow-hidden shadow-2xl font-mono">
          <div className="grid grid-cols-12 bg-[#050505] p-4 border-b border-[#7CB518]/20 text-xs font-bold uppercase tracking-wider text-zinc-400">
            <div className="col-span-4 sm:col-span-3 font-mono">Platform Capability</div>
            <div className="col-span-5 sm:col-span-5 text-[#39FF14] font-extrabold flex items-center gap-1.5 font-heading">
              <Sparkles className="w-4 h-4 text-[#39FF14]" /> ExecFlow AI OS
            </div>
            <div className="col-span-3 sm:col-span-4 text-zinc-500">Legacy Meeting Bots</div>
          </div>

          <div className="divide-y divide-[#7CB518]/15">
            {COMPARISONS.map((row, idx) => (
              <div key={idx} className="grid grid-cols-12 p-4 sm:p-5 items-center text-xs sm:text-sm hover:bg-[#111315] transition-colors">
                <div className="col-span-4 sm:col-span-3 font-bold text-white font-heading">{row.feature}</div>
                <div className="col-span-5 sm:col-span-5 text-[#39FF14] font-semibold flex items-center gap-2 pr-2 font-mono">
                  <div className="p-1 rounded-full bg-[#7CB518]/20 text-[#39FF14] shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{row.execflow}</span>
                </div>
                <div className="col-span-3 sm:col-span-4 text-zinc-400 flex items-center gap-2 font-mono">
                  <div className="p-1 rounded-full bg-amber-500/20 text-amber-400 shrink-0">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span>{row.legacy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
