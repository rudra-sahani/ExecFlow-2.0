import React from 'react';
import { Cpu, ShieldCheck, Database, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PILLARS = [
  {
    icon: Cpu,
    title: 'Deterministic Multi-Agent Swarms',
    description:
      'Rather than relying on single LLM output, ExecFlow uses a multi-agent reflection and verification pipeline to cross-check extracted tasks directly against audio transcripts and context boundaries.',
    highlights: [
      'Multi-agent self-consistency verification',
      'Zero ungrounded hallucination model',
      'Configurable risk threshold gates',
    ],
    tag: 'Agentic Architecture',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Security & Policy Enforcement',
    description:
      'Built for organizations with strict compliance requirements. Action dispatch passes through RBAC policy rules before triggering REST APIs or webhook integrations.',
    highlights: [
      'Role-based access control (RBAC)',
      'Human-in-the-loop approval queues for high-impact actions',
      'Audit logging across all tool dispatches',
    ],
    tag: 'Security & Governance',
  },
  {
    icon: Database,
    title: 'Cross-Meeting Vector Memory Graph',
    description:
      'Store and query organizational decisions across months of team syncs with cosine similarity vector embeddings, enabling fast natural language retrieval.',
    highlights: [
      'Sub-150ms semantic search speed',
      'Historical decision dependency tracking',
      'Direct transcript quote citations',
    ],
    tag: 'Organizational Memory',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-[#050505] text-white relative border-t border-[#7CB518]/15 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7CB518]/15 border border-[#7CB518]/30 text-[#39FF14] text-xs font-mono">
            <Zap className="w-3.5 h-3.5" /> Platform Capabilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-heading">
            Why Technical Teams Choose ExecFlow.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-mono">
            Designed for engineering, product, and operations leaders who need verifiable AI execution rather than unverified summaries.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-xl bg-[#0F1110] border border-[#7CB518]/30 hover:border-[#7CB518]/60 transition-all flex flex-col justify-between space-y-6 shadow-xl font-mono"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-lg bg-[#7CB518]/15 text-[#39FF14] border border-[#7CB518]/30">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-[#7CB518]/10 text-[#39FF14] border border-[#7CB518]/20">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-heading">{item.title}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed font-mono">{item.description}</p>

                  <div className="space-y-2 pt-2 border-t border-[#7CB518]/15">
                    {item.highlights.map((point, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#39FF14] shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#7CB518]/15 flex items-center justify-between text-xs text-[#39FF14] font-medium font-mono">
                  <span>Engineered Feature</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Customer Success Note */}
        <div className="p-6 rounded-xl bg-[#0F1110] border border-[#7CB518]/20 text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold text-[#39FF14] font-mono">CUSTOMER CASE STUDIES & REVIEWS</div>
          <p className="text-sm text-zinc-300 font-mono">
            Detailed customer case studies and enterprise deployment benchmarks will be published as our early-access pilot cohorts finish evaluation.
          </p>
          <div className="pt-2">
            <Link
              to="/demo"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#39FF14] transition-colors"
            >
              <span>Explore Interactive Demo Mode</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#39FF14]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

