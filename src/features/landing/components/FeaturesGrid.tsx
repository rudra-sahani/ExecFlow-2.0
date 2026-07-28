import React from 'react';
import {
  Mic,
  Bot,
  Database,
  BarChart3,
  Zap,
  ShieldCheck,
  Activity,
  Sparkles,
  ArrowRight,
  Layers,
  Cpu,
  Lock,
} from 'lucide-react';

const FEATURES = [
  {
    id: 'intelligence',
    icon: Mic,
    title: 'AI Meeting Intelligence',
    subtitle: 'Voice-to-Task & Diarization',
    description:
      'Ultra-precise speaker diarization, multi-lingual audio ingestion, and sentiment analysis for Zoom, Meet, Teams, and uploaded audio streams.',
    tag: 'Core Ingestion',
    color: 'from-[#7CB518]/20 to-[#39FF14]/10 text-[#39FF14] border-[#7CB518]/30',
    colSpan: 'lg:col-span-8',
  },
  {
    id: 'agents',
    icon: Bot,
    title: 'Multi-Agent Pipeline',
    subtitle: 'Planner & Reflection Agents',
    description:
      'Coordinated agentic swarm where Planner, Extractor, Risk Engine, and Reflection Agents double-check commitments to eliminate hallucinations.',
    tag: 'Agentic Core',
    color: 'from-[#7CB518]/20 to-[#95D600]/10 text-[#39FF14] border-[#7CB518]/30',
    colSpan: 'lg:col-span-4',
  },
  {
    id: 'knowledge',
    icon: Database,
    title: 'Knowledge Memory Graph',
    subtitle: 'Semantic Vector Store',
    description:
      'Persistent semantic memory indexing every meeting decision, architectural choice, and risk item across team workspaces for instant natural language querying.',
    tag: 'Vector Memory',
    color: 'from-[#7CB518]/20 to-[#39FF14]/10 text-[#39FF14] border-[#7CB518]/30',
    colSpan: 'lg:col-span-4',
  },
  {
    id: 'automation',
    icon: Zap,
    title: 'Automation & Workflows',
    subtitle: 'Visual Trigger Canvas',
    description:
      'n8n and Zapier-inspired visual workflow canvas supporting conditional triggers, multi-step tool calls, and automated webhooks to Jira, GitHub, Slack, and Google Workspace.',
    tag: 'No-Code Canvas',
    color: 'from-amber-500/20 to-amber-500/10 text-amber-400 border-amber-500/30',
    colSpan: 'lg:col-span-8',
  },
  {
    id: 'governance',
    icon: ShieldCheck,
    title: 'Human Approval Gates',
    subtitle: 'Enterprise Governance',
    description:
      'Risk-based approval gates ensuring high-impact tool dispatches or critical budget commitments require explicit human sign-off before execution.',
    tag: 'Risk Protection',
    color: 'from-[#7CB518]/20 to-amber-500/10 text-amber-300 border-[#7CB518]/30',
    colSpan: 'lg:col-span-4',
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Executive BI & Analytics',
    subtitle: 'Decision Velocity Metrics',
    description:
      'High-level dashboards monitoring organizational execution velocity, decision completion rates, risk heatmaps, and executive ROI time savings.',
    tag: 'Leadership BI',
    color: 'from-[#7CB518]/20 to-[#39FF14]/10 text-[#39FF14] border-[#7CB518]/30',
    colSpan: 'lg:col-span-4',
  },
  {
    id: 'monitor',
    icon: Activity,
    title: 'Agent Monitor & Telemetry',
    subtitle: 'Real-Time Observability',
    description:
      'Granular latency monitoring, LLM token usage tracking, step-by-step agent logs, and full execution tracing for compliance and debugging.',
    tag: 'Live Telemetry',
    color: 'from-[#7CB518]/20 to-[#95D600]/10 text-[#39FF14] border-[#7CB518]/30',
    colSpan: 'lg:col-span-4',
  },
];

export const FeaturesGrid: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-[#050505] text-white relative font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7CB518]/15 border border-[#7CB518]/30 text-[#39FF14] text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" /> Complete Platform Capabilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-heading">
            Architected For Absolute Precision.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-mono">
            ExecFlow unifies meeting transcription, agentic reasoning, knowledge graphing, and enterprise automations into a single seamless OS.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {FEATURES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`group relative p-8 rounded-xl bg-[#0F1110] border border-[#7CB518]/30 hover:border-[#7CB518]/60 hover:bg-[#111315] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl ${item.colSpan}`}
              >
                {/* Top Subtle Gradient */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-lg bg-[#111315] border border-[#7CB518]/20 text-[#39FF14] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#050505] border border-[#7CB518]/20 text-zinc-300">
                      {item.tag}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-[#39FF14] font-bold block mb-1">
                      {item.subtitle}
                    </span>
                    <h3 className="text-2xl font-bold text-white font-heading tracking-tight">{item.title}</h3>
                  </div>

                  <p className="text-zinc-400 text-sm leading-relaxed font-mono">{item.description}</p>
                </div>

                <div className="pt-6 mt-4 border-t border-[#7CB518]/15 flex items-center justify-between text-xs font-bold text-zinc-400 group-hover:text-[#39FF14] transition-colors">
                  <span>Explore Architecture</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
