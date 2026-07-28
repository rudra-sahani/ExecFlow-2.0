import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap,
  GitBranch,
  Slack,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { DEMO_WORKFLOW } from '../../data/demoData';

export const Step8AutomationCenter: React.FC = () => {
  const [activeStepCount, setActiveStepCount] = useState(1);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStepCount((prev) => {
        if (prev < DEMO_WORKFLOW.steps.length) {
          return prev + 1;
        } else {
          setApproved(true);
          return prev;
        }
      });
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0F1110] border border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#7CB518]/15 text-[#7CB518] font-sans text-xs font-semibold border border-[#7CB518]/30">
              STEP 08
            </span>
            <h2 className="text-lg font-bold text-white font-heading">Automation Center & Tool Dispatches</h2>
          </div>
          <p className="text-xs text-zinc-400 font-sans mt-1">
            End-to-end event execution replayed live across GitHub, Slack, Google Calendar, and Human Approval Gates.
          </p>
        </div>

        <div className="flex items-center gap-2 font-sans text-xs">
          <span className="text-white bg-[#151817] px-3 py-1 rounded-full border border-zinc-800 font-medium flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            Workflow Status: <span className="text-emerald-400 font-semibold">EXECUTED</span>
          </span>
        </div>
      </div>

      {/* Replayed Workflow Steps Sequence */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#0F1110] border border-zinc-800 space-y-6 font-sans">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#7CB518]" />
            <span className="font-bold text-white font-heading">{DEMO_WORKFLOW.name}</span>
          </div>
          <span className="font-mono text-zinc-500 text-[10px]">ID: {DEMO_WORKFLOW.id}</span>
        </div>

        <div className="space-y-4">
          {DEMO_WORKFLOW.steps.map((step, idx) => {
            const isVisible = idx < activeStepCount;

            let SystemIcon = Zap;
            if (step.targetSystem === 'GitHub') SystemIcon = GitBranch;
            if (step.targetSystem === 'Slack') SystemIcon = Slack;
            if (step.targetSystem === 'Google Calendar') SystemIcon = Calendar;
            if (step.targetSystem === 'Executive Approval') SystemIcon = ShieldCheck;

            return (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: isVisible ? 1 : 0.3, x: isVisible ? 0 : -5 }}
                transition={{ duration: 0.4 }}
                className={`p-4 rounded-lg border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans ${
                  isVisible
                    ? 'bg-[#151817] border-zinc-800 text-white shadow-xs'
                    : 'bg-[#050505] border-zinc-900 text-zinc-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg font-mono text-xs font-semibold flex items-center justify-center shrink-0 ${
                      isVisible
                        ? 'bg-[#7CB518] text-black'
                        : 'bg-[#151817] text-zinc-600'
                    }`}
                  >
                    0{step.stepNumber}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <SystemIcon className="w-4 h-4 text-[#7CB518]" />
                      <h3 className="text-xs font-bold text-white font-heading">{step.title}</h3>
                    </div>
                    <p className="text-xs text-zinc-400 font-sans mt-0.5">{step.details}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 font-sans text-[10px]">
                  <span className="text-zinc-500 font-mono">{step.timestamp}</span>
                  {isVisible ? (
                    <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Dispatched
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded bg-[#050505] text-zinc-600 border border-zinc-900">
                      Pending
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Human-in-the-Loop Gate Approval Banner */}
        <AnimatePresence>
          {approved && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 rounded-lg bg-[#151817] border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-heading">
                    Executive Financial Threshold Gate Approved
                  </h4>
                  <p className="text-[11px] text-zinc-300 font-sans mt-0.5">
                    Sofia Chen (VP of Finance) verified and approved the staging budget expansion ticket.
                  </p>
                </div>
              </div>

              <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 font-sans text-xs font-medium border border-emerald-500/20 whitespace-nowrap">
                ✓ Governance Audit Passed
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
