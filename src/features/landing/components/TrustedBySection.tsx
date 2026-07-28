import React from 'react';
import { ShieldCheck, Zap, Layers, Cpu, CheckCircle2 } from 'lucide-react';

const INTEGRATIONS = [
  { name: 'JIRA', category: 'Issue Tracking', style: 'tracking-widest font-black text-zinc-300' },
  { name: 'SLACK', category: 'Team Chat', style: 'tracking-widest font-extrabold text-zinc-300' },
  { name: 'GITHUB', category: 'Code & CI/CD', style: 'tracking-widest font-black text-zinc-300' },
  { name: 'GOOGLE WORKSPACE', category: 'Calendar & Drive', style: 'tracking-widest font-black text-zinc-300' },
  { name: 'MICROSOFT TEAMS', category: 'Video Meetings', style: 'tracking-wider font-extrabold text-zinc-300' },
  { name: 'NOTION', category: 'Documentation', style: 'tracking-widest font-black text-zinc-300' },
  { name: 'ZOOM', category: 'Audio & Video', style: 'tracking-widest font-bold text-zinc-300' },
];

const CAPABILITIES = [
  {
    icon: Layers,
    title: 'Multi-Speaker Intelligence',
    description: 'Real-time speaker diarization and transcript boundary detection.',
    badge: 'Core Engine',
  },
  {
    icon: Zap,
    title: 'Task & Decision Extraction',
    description: 'AI-powered task parsing, risk tagging, and decision reflection loops.',
    badge: 'Automated AI',
  },
  {
    icon: Cpu,
    title: 'Automated Tool Dispatch',
    description: 'Instant bi-directional dispatch to Jira, Slack, GitHub, and Workspace.',
    badge: 'Workflow Sync',
  },
  {
    icon: ShieldCheck,
    title: 'Built for Technical Teams',
    description: 'Enterprise security, strict policy checks, and SOC-2 privacy standards.',
    badge: 'Enterprise Security',
  },
];

export const TrustedBySection: React.FC = () => {
  return (
    <section className="py-16 bg-[#050505] border-y border-[#7CB518]/15 text-white relative font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Integrations Stack Bar */}
        <div className="text-center space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-mono">
            Works Alongside Your Existing Productivity Stack
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-2">
            {INTEGRATIONS.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0F1110] border border-[#7CB518]/20 hover:border-[#7CB518]/40 transition-colors"
              >
                <span className={`text-xs sm:text-sm font-mono text-white ${item.style}`}>
                  {item.name}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">• {item.category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Capability Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CAPABILITIES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#0F1110] border border-[#7CB518]/30 hover:border-[#7CB518]/60 hover:bg-[#111315] transition-all group font-mono flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-lg bg-[#7CB518]/15 text-[#39FF14] w-fit group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#7CB518]/10 text-[#39FF14] border border-[#7CB518]/20">
                      {item.badge}
                    </span>
                  </div>

                  <div className="text-base font-bold text-white tracking-tight mb-2 font-heading">
                    {item.title}
                  </div>
                  <div className="text-xs text-zinc-400 leading-relaxed font-mono">
                    {item.description}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#7CB518]/15 flex items-center gap-1.5 text-[11px] text-[#39FF14] font-medium font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Platform Capability</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

