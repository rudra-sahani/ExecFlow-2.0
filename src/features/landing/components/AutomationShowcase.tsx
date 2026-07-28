import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Zap,
  Play,
  CheckCircle2,
  GitBranch,
  Slack,
  Calendar,
  Sparkles,
  ArrowRight,
  Filter,
  Layers,
  Clock,
  ShieldAlert,
} from 'lucide-react';

export const AutomationShowcase: React.FC = () => {
  const [isRunningDryRun, setIsRunningDryRun] = useState(false);
  const [dryRunComplete, setDryRunComplete] = useState(false);

  const handleTestDryRun = () => {
    setIsRunningDryRun(true);
    setDryRunComplete(false);
    setTimeout(() => {
      setIsRunningDryRun(false);
      setDryRunComplete(true);
    }, 1800);
  };

  return (
    <section id="automation" className="py-24 bg-[#050505] text-white relative font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7CB518]/15 border border-[#7CB518]/30 text-[#39FF14] text-xs font-mono">
            <Zap className="w-3.5 h-3.5" /> No-Code Automation Center
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-heading">
            Workflow Automation On Autopilot.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-mono">
            Connect meeting outputs directly to your tool ecosystem using visual triggers, conditional filters, and automated webhooks.
          </p>
        </div>

        {/* Visual Canvas Card */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#0F1110] border border-[#7CB518]/30 space-y-8 shadow-2xl font-mono">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#7CB518]/15">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#7CB518]/15 text-[#39FF14] border border-[#7CB518]/30">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-heading">Workflow: High-Priority Decision Dispatch</h3>
                <p className="text-xs text-zinc-400 font-mono">Trigger: Meeting Transcribed & Extracted</p>
              </div>
            </div>

            <button
              onClick={handleTestDryRun}
              disabled={isRunningDryRun}
              className="px-5 py-2.5 rounded-lg bg-[#7CB518] hover:bg-[#39FF14] text-black font-bold text-xs shadow-lg shadow-[#7CB518]/20 flex items-center gap-2 transition-all disabled:opacity-50 font-mono"
            >
              {isRunningDryRun ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" /> Simulating Dry Run...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" /> Run Dry-Run Test
                </>
              )}
            </button>
          </div>

          {/* Workflow Node Graph Representation */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative font-mono">
            {/* Node 1: Trigger */}
            <div className="p-4 rounded-lg bg-[#050505] border border-[#7CB518]/20 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#39FF14]">01. TRIGGER</span>
                <span className="text-[10px] font-mono bg-[#7CB518]/15 text-[#39FF14] px-2 py-0.5 rounded border border-[#7CB518]/30">
                  Meeting Done
                </span>
              </div>
              <div className="text-xs font-bold text-white font-heading">Transcript Processed</div>
              <p className="text-[11px] text-zinc-400 font-mono">Fires when AI finishes extracting tasks.</p>
            </div>

            {/* Node 2: Filter Condition */}
            <div className="p-4 rounded-lg bg-[#050505] border border-[#7CB518]/20 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#39FF14]">02. FILTER</span>
                <span className="text-[10px] font-mono bg-[#7CB518]/15 text-[#39FF14] px-2 py-0.5 rounded border border-[#7CB518]/30">
                  Priority Check
                </span>
              </div>
              <div className="text-xs font-bold text-white font-heading">Priority == 'High'</div>
              <p className="text-[11px] text-zinc-400 font-mono">Evaluates task urgency and confidence.</p>
            </div>

            {/* Node 3: Tool Action 1 */}
            <div className="p-4 rounded-lg bg-[#050505] border border-[#7CB518]/20 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#95D600]">03. ACTION</span>
                <span className="text-[10px] font-mono bg-[#95D600]/15 text-[#95D600] px-2 py-0.5 rounded border border-[#95D600]/30">
                  GitHub API
                </span>
              </div>
              <div className="text-xs font-bold text-white font-heading">Create GitHub Issue</div>
              <p className="text-[11px] text-zinc-400 font-mono">Assigns lead engineer & tags repo.</p>
            </div>

            {/* Node 4: Tool Action 2 */}
            <div className="p-4 rounded-lg bg-[#050505] border border-[#7CB518]/20 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#39FF14]">04. ACTION</span>
                <span className="text-[10px] font-mono bg-[#39FF14]/15 text-[#39FF14] px-2 py-0.5 rounded border border-[#39FF14]/30">
                  Slack Webhook
                </span>
              </div>
              <div className="text-xs font-bold text-white font-heading">Post to #engineering</div>
              <p className="text-[11px] text-zinc-400 font-mono">Notifies channel with decision summary.</p>
            </div>
          </div>

          {/* Dry Run Output Banner */}
          {dryRunComplete && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg bg-[#111315] border border-[#39FF14]/50 flex items-center justify-between text-xs text-[#39FF14] font-mono"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#39FF14]" />
                <span>Dry-Run Simulation Complete: All 4 webhook steps passed in 184ms!</span>
              </div>
              <span className="text-[#39FF14] font-bold">HTTP 200 OK</span>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
