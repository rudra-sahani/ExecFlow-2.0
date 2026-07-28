import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  CheckSquare,
  Lightbulb,
  AlertTriangle,
  FileText,
  Clock,
  Sparkles,
  ArrowUpRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import {
  SAMPLE_ORGANIZATION,
  DEMO_ACTION_ITEMS,
  DEMO_DECISIONS,
  DEMO_RISKS,
} from '../../data/demoData';

export const Step4MeetingWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'summary' | 'tasks' | 'decisions' | 'risks'>('summary');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0F1110] border border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#7CB518]/15 text-[#7CB518] font-sans text-xs font-semibold border border-[#7CB518]/30">
              STEP 04
            </span>
            <h2 className="text-lg font-bold text-white font-heading">Meeting Workspace Preview</h2>
          </div>
          <p className="text-xs text-zinc-400 font-sans mt-1">
            Structured workspace containing executive summary, verified tasks, strategic decisions, and risk telemetry.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 bg-[#151817] p-1.5 rounded-lg border border-zinc-800 font-sans">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeTab === 'summary'
                ? 'bg-[#7CB518] text-black font-semibold shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Summary
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeTab === 'tasks'
                ? 'bg-[#7CB518] text-black font-semibold shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Tasks ({DEMO_ACTION_ITEMS.length})
          </button>
          <button
            onClick={() => setActiveTab('decisions')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeTab === 'decisions'
                ? 'bg-[#7CB518] text-black font-semibold shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Decisions ({DEMO_DECISIONS.length})
          </button>
          <button
            onClick={() => setActiveTab('risks')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeTab === 'risks'
                ? 'bg-[#7CB518] text-black font-semibold shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Risks ({DEMO_RISKS.length})
          </button>
        </div>
      </div>

      {/* Workspace Main Content Container */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#0F1110] border border-zinc-800 space-y-6 font-sans">
        <AnimatePresence mode="wait">
          {activeTab === 'summary' && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Executive Summary Card */}
              <div className="p-6 rounded-lg bg-[#151817] border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <h3 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#7CB518]" />
                    Executive Briefing & Strategic Alignment
                  </h3>
                  <span className="text-xs font-sans text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 font-medium">
                    AI Reflection Verified
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  The executive leadership team met to align on the Q3 AI architecture migration to PostgreSQL pgvector.
                  Key priorities include zero-downtime dual-write deployment, setting up mandatory human-in-the-loop approval gates for transactions over $10k, and broadcasting live updates to #eng-executive-updates.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-sans">
                  <div className="p-3.5 rounded-lg bg-[#050505] border border-zinc-800">
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">Action Velocity</div>
                    <div className="text-lg font-bold text-white font-heading mt-0.5">4 Items Dispatched</div>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#050505] border border-zinc-800">
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">Strategic Decisions</div>
                    <div className="text-lg font-bold text-white font-heading mt-0.5">2 Key Statements</div>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#050505] border border-zinc-800">
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">Compliance Audit</div>
                    <div className="text-lg font-bold text-emerald-400 font-heading mt-0.5">100% Pass Rate</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'tasks' && (
            <motion.div
              key="tasks"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans"
            >
              {DEMO_ACTION_ITEMS.map((item) => (
                <div key={item.id} className="p-5 rounded-lg bg-[#151817] border border-zinc-800 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-sans font-semibold bg-[#7CB518]/10 text-[#7CB518] border border-[#7CB518]/20">
                      {item.targetTool}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-medium ${
                      item.priority === 'High' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {item.priority} Priority
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white font-heading leading-snug">{item.title}</h4>

                  <div className="text-[11px] text-zinc-400 space-y-1 font-sans">
                    <div>Assignee: <span className="text-white font-medium">{item.assigneeName}</span> ({item.department})</div>
                    <div>Due Date: <span className="text-white font-medium">{item.dueDate}</span></div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#050505] text-[11px] text-zinc-300 border border-zinc-800/80 italic font-sans">
                    "{item.contextQuote}"
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-sans pt-1 text-zinc-400">
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Status: {item.status}
                    </span>
                    <span className="font-mono">Confidence: {item.confidenceScore}%</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'decisions' && (
            <motion.div
              key="decisions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 font-sans"
            >
              {DEMO_DECISIONS.map((dec) => (
                <div key={dec.id} className="p-5 rounded-lg bg-[#151817] border border-zinc-800 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#7CB518] flex items-center gap-1.5 font-heading">
                      <Lightbulb className="w-4 h-4" /> {dec.department} Decision
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-sans bg-[#7CB518]/10 text-[#7CB518] border border-[#7CB518]/20 font-medium">
                      {dec.impactLevel} Impact
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white font-heading">{dec.statement}</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">{dec.rationale}</p>

                  <div className="text-[10px] font-sans text-zinc-400 pt-2 border-t border-zinc-800 flex justify-between">
                    <span>Owner: {dec.ownerName}</span>
                    <span className="font-mono">Timestamp: {dec.timestamp}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'risks' && (
            <motion.div
              key="risks"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 font-sans"
            >
              {DEMO_RISKS.map((risk) => (
                <div key={risk.id} className="p-5 rounded-lg bg-[#151817] border border-zinc-800 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-amber-400 flex items-center gap-1.5 font-heading">
                      <AlertTriangle className="w-4 h-4" /> Flagged Risk ({risk.department})
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-sans bg-amber-500/10 text-amber-300 font-medium border border-amber-500/20">
                      {risk.severity} Severity
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white font-heading">{risk.title}</h4>
                  <div className="p-3 rounded-lg bg-[#050505] border border-zinc-800 text-xs text-zinc-300 space-y-1">
                    <span className="font-bold text-[#7CB518] block font-heading">Mitigation Strategy:</span>
                    {risk.mitigationPlan}
                  </div>

                  <div className="text-[10px] font-sans text-zinc-400 flex justify-between">
                    <span>Risk Owner: {risk.ownerName}</span>
                    <span className="font-mono">Detected Timestamp: {risk.detectedAt}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
