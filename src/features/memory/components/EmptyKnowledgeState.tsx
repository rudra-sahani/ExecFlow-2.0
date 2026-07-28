import React from 'react';
import { Database, Sparkles, ArrowRight, Search, Zap, Shield, FileText } from 'lucide-react';

interface EmptyKnowledgeStateProps {
  onSelectSuggestion: (query: string) => void;
}

export const EmptyKnowledgeState: React.FC<EmptyKnowledgeStateProps> = ({
  onSelectSuggestion,
}) => {
  const suggestions = [
    {
      title: 'Upcoming Commitments',
      query: 'What deadlines are due next week?',
      desc: 'Retrieve cross-meeting action items and assigned completion dates',
    },
    {
      title: 'Infrastructure & Engineering',
      query: 'Show meetings discussing deployment.',
      desc: 'Find technical discussions on Express migration, Cloud Run, and Port 3000',
    },
    {
      title: 'Ownership & Roles',
      query: 'Who usually owns testing?',
      desc: 'Identify team leads and responsibility assignments',
    },
    {
      title: 'Risk Audit',
      query: 'What recurring risks have appeared?',
      desc: 'Inspect security compliance, approval bounds, and vector SLAs',
    },
  ];

  return (
    <div className="w-full bg-[#0F1110] rounded-xl border border-[#7CB518]/30 p-8 text-center shadow-sm space-y-6 font-mono text-white">
      <div className="w-16 h-16 rounded-xl bg-[#7CB518]/15 border border-[#7CB518]/30 flex items-center justify-center mx-auto text-[#39FF14] shadow-md shadow-[#7CB518]/10">
        <Database className="w-8 h-8" />
      </div>

      <div className="max-w-xl mx-auto space-y-2 font-mono">
        <h3 className="text-xl font-bold text-white font-heading flex items-center justify-center gap-2">
          <span>Enterprise Knowledge Hub & Vector Memory</span>
          <Sparkles className="w-5 h-5 text-[#39FF14] animate-pulse" />
        </h3>
        <p className="text-sm text-zinc-400 leading-relaxed font-mono">
          Search across thousands of organizational meetings, decisions, risks, transcripts, and action items with natural language vector search.
        </p>
      </div>

      {/* Suggested Prompts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left font-mono">
        {suggestions.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onSelectSuggestion(item.query)}
            className="p-4 rounded-lg border border-[#7CB518]/20 bg-[#050505] hover:border-[#7CB518]/60 transition-all group flex flex-col justify-between font-mono"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white group-hover:text-[#39FF14] flex items-center gap-1.5 font-mono">
                  <Search className="w-3.5 h-3.5 text-[#39FF14]" />
                  {item.title}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#39FF14] group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-xs font-medium text-zinc-300 mb-1 font-mono">
                "{item.query}"
              </p>
              <p className="text-[11px] text-zinc-400 font-mono">
                {item.desc}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Capabilities Badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-zinc-400 pt-4 border-t border-[#7CB518]/15 font-mono">
        <span className="flex items-center gap-1.5 font-mono">
          <Zap className="w-4 h-4 text-[#39FF14]" /> Sub-150ms Cosine Similarity
        </span>
        <span className="flex items-center gap-1.5 font-mono">
          <Shield className="w-4 h-4 text-[#7CB518]" /> SOC-2 RBAC Scope Privacy
        </span>
        <span className="flex items-center gap-1.5 font-mono">
          <FileText className="w-4 h-4 text-[#95D600]" /> Full Transcript Verbatim Citation
        </span>
      </div>
    </div>
  );
};
