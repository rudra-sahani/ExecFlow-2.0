import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mic,
  Activity,
  Database,
  BarChart3,
  Layers,
  Sparkles,
  CheckCircle2,
  Zap,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

const SHOWCASE_TABS = [
  {
    id: 'meeting',
    title: 'Meeting Workspace',
    icon: Mic,
    badge: 'Live Diarization',
    headline: 'Real-Time Diarization & Instant Task Extraction',
    description:
      'View synchronized audio waveforms, speaker timelines, auto-generated executive summaries, and task commitments side-by-side.',
    highlights: [
      'Multi-speaker timeline with voice sentiment',
      'Auto-extracted commitments & deadlines',
      'One-click push to Jira, GitHub & Slack',
    ],
  },
  {
    id: 'monitor',
    title: 'AI Agent Monitor',
    icon: Activity,
    badge: 'Real-Time Observability',
    headline: 'Full Telemetry & Model Execution Tracing',
    description:
      'Track every reasoning step, LLM token consumption, API latency, and confidence score across your active agent swarms.',
    highlights: [
      'Step-by-step reasoning trace logs',
      'Token expenditure & cost optimization',
      'Model latency breakdown across Gemini models',
    ],
  },
  {
    id: 'memory',
    title: 'Knowledge Memory Graph',
    icon: Database,
    badge: 'Semantic Vector Engine',
    headline: 'Connected Cross-Meeting Organisational Intelligence',
    description:
      'Ask any question across months of team meetings. ExecFlow retrieves exact decisions, contextual quotes, and related architectural specs.',
    highlights: [
      'Natural language vector search',
      'Cross-meeting decision dependency graph',
      'Exportable executive summaries & briefs',
    ],
  },
  {
    id: 'analytics',
    title: 'Executive Insights',
    icon: BarChart3,
    badge: 'Leadership BI',
    headline: 'Decision Velocity & Organizational Risk Heatmaps',
    description:
      'Empower C-suite and VPs with high-level analytics on task completion rates, unassigned risks, and team participation balance.',
    highlights: [
      'Sprint decision velocity tracking',
      'Risk heatmap & bottleneck identification',
      'ROI time savings reporting per department',
    ],
  },
];

export const ProductShowcase: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState('meeting');
  const activeTab = SHOWCASE_TABS.find((t) => t.id === activeTabId) || SHOWCASE_TABS[0];

  return (
    <section className="py-24 bg-[#050505] text-white relative font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7CB518]/15 border border-[#7CB518]/30 text-[#39FF14] text-xs font-mono">
            <Layers className="w-3.5 h-3.5" /> High-Craft Workspace UI
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-heading">
            Designed For Modern Technical Teams.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-mono">
            Purpose-built interfaces designed for speed, clarity, and deep operational visibility.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center flex-wrap gap-2">
          {SHOWCASE_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-xs sm:text-sm transition-all font-mono ${
                  isActive
                    ? 'bg-[#7CB518] text-black shadow-xl shadow-[#7CB518]/20 scale-105'
                    : 'bg-[#0F1110] border border-[#7CB518]/20 text-zinc-400 hover:text-white hover:bg-[#111315]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Showcase Content Container */}
        <div className="rounded-xl border border-[#7CB518]/30 bg-[#0F1110] p-6 sm:p-10 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center font-mono"
            >
              {/* Text Highlights */}
              <div className="lg:col-span-5 space-y-6">
                <span className="px-3 py-1 rounded-full bg-[#7CB518]/15 border border-[#7CB518]/30 text-[#39FF14] text-xs font-mono font-bold">
                  {activeTab.badge}
                </span>

                <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading tracking-tight">
                  {activeTab.headline}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed font-mono">{activeTab.description}</p>

                <div className="space-y-3 pt-2">
                  {activeTab.highlights.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-200 font-medium">
                      <div className="p-1 rounded-full bg-[#7CB518]/20 text-[#39FF14]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Graphic Mockup Area */}
              <div className="lg:col-span-7 rounded-lg bg-[#050505] border border-[#7CB518]/20 p-6 space-y-4 shadow-inner">
                <div className="flex items-center justify-between border-b border-[#7CB518]/15 pb-3 text-xs text-zinc-400 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7CB518]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#39FF14]" />
                    <span className="pl-2 border-l border-[#7CB518]/20 text-white font-bold font-heading">
                      ExecFlow // {activeTab.title}
                    </span>
                  </div>
                  <span className="text-[#39FF14]">Active Module</span>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-lg bg-[#111315] border border-[#7CB518]/20 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white font-heading">Q3 Product Roadmap & Engineering Sync</div>
                      <div className="text-[10px] text-zinc-400 font-mono">Recorded today at 10:00 AM • 4 Participants</div>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-[#7CB518]/15 text-[#39FF14] text-[10px] font-mono font-bold">
                      Analyzed
                    </span>
                  </div>

                  <div className="p-4 rounded-lg bg-[#111315] border border-[#7CB518]/20 space-y-2">
                    <div className="text-xs font-bold text-zinc-300 font-heading">Extracted Action Commitments</div>
                    <div className="space-y-1.5 text-xs font-mono">
                      <div className="p-2 rounded bg-[#050505] border border-[#7CB518]/15 flex justify-between items-center text-zinc-300">
                        <span>• Complete OAuth RS256 token migration</span>
                        <span className="text-[#39FF14] font-mono text-[10px]">Sarah (VP)</span>
                      </div>
                      <div className="p-2 rounded bg-[#050505] border border-[#7CB518]/15 flex justify-between items-center text-zinc-300">
                        <span>• Deploy pgvector database indices for memory search</span>
                        <span className="text-[#95D600] font-mono text-[10px]">David (Architect)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
