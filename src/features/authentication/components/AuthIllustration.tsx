import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Zap, Layers, Cpu, CheckCircle2 } from 'lucide-react';
import { ExecFlowLogo } from '../../../components/common/ExecFlowLogo';

export const AuthIllustration: React.FC = () => {
  const highlights = [
    {
      icon: <Layers className="w-4 h-4 text-[#7CB518]" />,
      title: 'Multi-Speaker Intelligence',
      description: 'Precise audio diarization and transcript boundary detection across team syncs.',
    },
    {
      icon: <Zap className="w-4 h-4 text-[#7CB518]" />,
      title: 'Task & Decision Extraction',
      description: 'Zero-hallucination reflection engine parses action items and risk tags in real time.',
    },
    {
      icon: <Cpu className="w-4 h-4 text-[#7CB518]" />,
      title: 'Automated Tool Dispatch',
      description: 'Instant bi-directional dispatch to Jira, Slack, GitHub, and Workspace.',
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-[#7CB518]" />,
      title: 'Enterprise Security & Governance',
      description: 'Role-based access control, human-in-the-loop approvals, and audit trails.',
    },
  ];

  return (
    <div className="flex flex-col justify-between h-full bg-[#0F1110] text-white p-8 lg:p-10 relative overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl shadow-black/80">
      {/* Subtle Dark Backdrop */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#7CB518]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Section: ExecFlow Primary Logo & Tagline */}
      <div className="relative z-10 space-y-4">
        <ExecFlowLogo to="/" size="lg" showSubtitle={false} />
        
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-sans font-medium">
          <span>Autonomous Meeting Execution</span>
        </div>
      </div>

      {/* Hero Body */}
      <div className="relative z-10 my-6 space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading tracking-tight leading-tight">
            Turn Discussions into <br />
            <span className="text-[#7CB518]">Verified System Action</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-sans leading-relaxed mt-2.5 max-w-md">
            ExecFlow connects to your meeting streams to extract tasks, log key decisions, and execute integrations across your enterprise tech stack automatically.
          </p>
        </div>

        {/* 4 Feature Highlights */}
        <div className="space-y-3 max-w-md">
          {highlights.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 * idx + 0.1, duration: 0.35 }}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-[#151817] border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-heading">{item.title}</h4>
                <p className="text-[11px] text-zinc-400 font-sans mt-0.5 leading-snug">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Live Agent Telemetry Bar */}
      <div className="relative z-10 pt-4 border-t border-zinc-800">
        <div className="flex items-center justify-between text-xs text-zinc-400 font-sans">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7CB518] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7CB518]"></span>
            </span>
            <span className="font-semibold text-white">Agent Swarms Active</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#7CB518]" />
            <span>Zero-Hallucination Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
