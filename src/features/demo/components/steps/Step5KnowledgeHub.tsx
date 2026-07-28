import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Database,
  Search,
  GitBranch,
  Calendar,
  Sparkles,
  ArrowRight,
  Share2,
  Cpu,
  Layers,
} from 'lucide-react';

export const Step5KnowledgeHub: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('Show Q3 decisions regarding vector database migration');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0F1110] border border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#7CB518]/15 text-[#7CB518] font-sans text-xs font-semibold border border-[#7CB518]/30">
              STEP 05
            </span>
            <h2 className="text-lg font-bold text-white font-heading">Knowledge Hub & Semantic Memory</h2>
          </div>
          <p className="text-xs text-zinc-400 font-sans mt-1">
            Persistent cross-meeting semantic graph with relationship embeddings and timeline search.
          </p>
        </div>

        <div className="flex items-center gap-2 font-sans text-xs">
          <span className="text-white bg-[#151817] px-3 py-1 rounded-full border border-zinc-800 font-medium flex items-center gap-1.5 font-mono text-[11px]">
            <Database className="w-3.5 h-3.5 text-[#7CB518]" />
            14,820 Vectors Indexed
          </span>
        </div>
      </div>

      {/* Semantic Search Query Bar */}
      <div className="p-4 rounded-xl bg-[#0F1110] border border-zinc-800 flex items-center gap-3">
        <Search className="w-5 h-5 text-[#7CB518] shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none font-sans"
          placeholder="Ask ExecFlow persistent memory..."
        />
        <button className="px-4 py-2 rounded-lg bg-[#7CB518] hover:bg-[#8DC621] text-black font-semibold text-xs shrink-0 flex items-center gap-1.5 shadow-xs transition-all">
          <Sparkles className="w-3.5 h-3.5" /> Semantic Query
        </button>
      </div>

      {/* Main Grid: Knowledge Relationship Graph + Embedded Node View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-sans">
        {/* Visual Relationship Node Graph */}
        <div className="lg:col-span-7 p-6 rounded-xl bg-[#0F1110] border border-zinc-800 space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3 text-xs">
            <span className="font-bold text-white font-heading flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-[#7CB518]" />
              Cross-Meeting Memory Relationship Graph
            </span>
            <span className="font-mono text-[10px] text-zinc-500">pgvector 1536-dim</span>
          </div>

          {/* SVG Canvas for Relationship Graph */}
          <div className="h-64 bg-[#050505] rounded-lg border border-zinc-800 relative flex items-center justify-center overflow-hidden">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="#7CB518" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="80%" y1="30%" x2="50%" y2="50%" stroke="#7CB518" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="30%" y1="80%" x2="50%" y2="50%" stroke="#7CB518" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="70%" y1="80%" x2="50%" y2="50%" stroke="#7CB518" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>

            {/* Center Node */}
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-3.5 rounded-xl bg-[#7CB518] text-black font-semibold text-xs shadow-md text-center"
            >
              <Database className="w-5 h-5 mx-auto mb-1 text-black" />
              <span className="font-heading font-bold">pgvector Migration</span>
              <span className="block text-[9px] font-sans text-black/80 font-medium">Central Node</span>
            </motion.div>

            {/* Surrounding Connected Memory Nodes */}
            <div className="absolute left-[15%] top-[25%] p-2.5 rounded-lg bg-[#151817] border border-zinc-800 text-[10px] text-zinc-200 font-sans shadow-xs">
              #m_801 Strategy Sync
            </div>
            <div className="absolute right-[15%] top-[25%] p-2.5 rounded-lg bg-[#151817] border border-zinc-800 text-[10px] text-zinc-200 font-sans shadow-xs">
              #m_884 Architecture Review
            </div>
            <div className="absolute left-[20%] bottom-[20%] p-2.5 rounded-lg bg-[#151817] border border-zinc-800 text-[10px] text-zinc-200 font-sans shadow-xs">
              #m_902 Operations Approval
            </div>
            <div className="absolute right-[20%] bottom-[20%] p-2.5 rounded-lg bg-[#151817] border border-zinc-800 text-[10px] text-zinc-200 font-sans shadow-xs">
              #m_915 Finance Budget Gate
            </div>
          </div>
        </div>

        {/* Vector Embeddings Details & Cross-Meeting Timeline */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-xl bg-[#0F1110] border border-zinc-800 space-y-4">
            <h3 className="text-xs font-bold text-zinc-200 font-heading uppercase tracking-wider border-b border-zinc-800 pb-2">
              Matched Semantic Vector Metadata
            </h3>

            <div className="p-4 rounded-lg bg-[#151817] border border-zinc-800 text-xs font-mono space-y-1.5 text-zinc-300">
              <div className="text-[#7CB518] font-bold">{`{`}</div>
              <div className="pl-4">{`"vector_id": "mem_pgvector_2026_q3",`}</div>
              <div className="pl-4">{`"similarity_score": 0.9842,`}</div>
              <div className="pl-4">{`"linked_departments": ["Engineering", "Finance"],`}</div>
              <div className="pl-4">{`"governance_status": "Verified & Indexed",`}</div>
              <div className="pl-4">{`"retrieval_latency": "12.4ms"`}</div>
              <div className="text-[#7CB518] font-bold">{`}`}</div>
            </div>
          </div>

          <div className="p-5 rounded-lg bg-[#151817] border border-zinc-800 space-y-2 text-xs font-sans">
            <span className="font-bold text-white font-heading flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#7CB518]" /> Cross-Meeting Context Timeline
            </span>
            <p className="text-zinc-400 text-xs leading-relaxed font-sans">
              ExecFlow linked today’s migration decision to 3 previous architecture proposals from June and July, preserving complete institutional memory.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
