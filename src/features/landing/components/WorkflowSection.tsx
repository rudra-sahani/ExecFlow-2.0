import React from 'react';
import { XCircle, CheckCircle2, ArrowRight, Zap, AlertTriangle, ShieldCheck } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 text-white relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono">
            <Zap className="w-3.5 h-3.5" /> Operational Transformation
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Stop Losing 40% Of Meeting Decisions.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Traditional meetings produce scattered notes and forgotten action items. ExecFlow converts talk directly into trackable enterprise execution.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Before ExecFlow Card */}
          <div className="p-8 rounded-3xl bg-slate-900/40 border border-rose-500/30 space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-rose-500/20">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-lg">
                <XCircle className="w-5 h-5" /> Without ExecFlow
              </div>
              <span className="text-[10px] font-mono uppercase bg-rose-500/10 text-rose-300 px-2.5 py-1 rounded border border-rose-500/20">
                High Operational Friction
              </span>
            </div>

            <ul className="space-y-4 text-xs text-slate-300">
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block font-semibold">Manual Note-Taking Distractions</strong>
                  Designated note-takers miss 35% of critical technical nuances during fast-paced architectural debates.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block font-semibold">Lost Action Items & Deadlines</strong>
                  Commitments voiced verbally never make it into Jira, leading to missed sprint commitments.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block font-semibold">Unrecorded Architectural Risks</strong>
                  Security risks mentioned in passing are forgotten until production outages occur weeks later.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block font-semibold">Zero Executive Alignment</strong>
                  VPs spend hours asking team leads for status updates that were already discussed in Monday’s sync.
                </div>
              </li>
            </ul>
          </div>

          {/* After ExecFlow Card */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-emerald-500/40 space-y-6 relative overflow-hidden shadow-2xl shadow-emerald-500/5">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
                <CheckCircle2 className="w-5 h-5" /> With ExecFlow AI OS
              </div>
              <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-300 px-2.5 py-1 rounded border border-emerald-500/20">
                Autonomous Execution
              </span>
            </div>

            <ul className="space-y-4 text-xs text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block font-semibold">100% Present Engagement</strong>
                  Everyone focuses on high-level decision making while ExecFlow transcribes and attributes voice in real time.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block font-semibold">Instant Multi-Tool Synchronization</strong>
                  Tasks, Jira tickets, and Slack announcements are created and dispatched before the call even ends.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block font-semibold">Automated Risk & Guardrail Engine</strong>
                  Identifies technical risks immediately and sets up governance approval gates for human review.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block font-semibold">Real-Time Executive BI Dashboards</strong>
                  C-suite views live decision velocity, team participation balance, and ROI metric reports automatically.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
