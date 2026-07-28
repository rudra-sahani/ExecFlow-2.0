import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Copy, Check, ShieldCheck, Users, Flame, Tag } from 'lucide-react';
import { AIKnowledgeSummaryData } from '../types/memoryExplorer';

interface AIKnowledgeSummaryProps {
  summaryData: AIKnowledgeSummaryData | null;
  query?: string;
  isSynthesizing?: boolean;
}

export const AIKnowledgeSummary: React.FC<AIKnowledgeSummaryProps> = ({
  summaryData,
  query,
  isSynthesizing,
}) => {
  const [copied, setCopied] = useState(false);

  if (isSynthesizing) {
    return (
      <div className="w-full bg-gradient-to-r from-indigo-900/10 via-purple-900/10 to-blue-900/10 dark:from-indigo-950/40 dark:via-purple-950/40 dark:to-blue-950/40 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-6 shadow-sm animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-500">
            <Sparkles className="w-5 h-5 animate-spin" />
          </div>
          <div className="space-y-1">
            <div className="h-4 w-48 bg-indigo-200 dark:bg-indigo-800 rounded"></div>
            <div className="h-3 w-32 bg-indigo-100 dark:bg-indigo-900/60 rounded"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3.5 w-full bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="h-3.5 w-5/6 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="h-3.5 w-4/6 bg-slate-200 dark:bg-slate-800 rounded"></div>
        </div>
      </div>
    );
  }

  if (!summaryData) return null;

  const handleCopy = () => {
    if (!summaryData.summary) return;
    navigator.clipboard.writeText(summaryData.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-slate-500/5 dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-slate-900 border border-indigo-200/80 dark:border-indigo-800/80 rounded-2xl p-6 shadow-sm relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                AI Executive Knowledge Synthesis
              </h2>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck className="w-3 h-3" />
                {(summaryData.confidence * 100).toFixed(0)}% Confidence
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Synthesized from vector embeddings across organizational meetings for "{query || 'Query'}"
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          title="Copy synthesis"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Main Synthesis Text */}
      <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-4 rounded-xl border border-indigo-100/60 dark:border-indigo-900/40 mb-4">
        {summaryData.summary}
      </div>

      {/* Metadata Badges & Pill Tags */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
        {/* Key Themes */}
        <div className="bg-white/40 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300 mb-2">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Key Themes</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {summaryData.keyThemes.map((theme, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800 text-[11px] font-medium"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>

        {/* Frequently Discussed Topics */}
        <div className="bg-white/40 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300 mb-2">
            <Tag className="w-3.5 h-3.5 text-indigo-500" />
            <span>Top Topics</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {summaryData.frequentlyDiscussedTopics.map((topic, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800 text-[11px] font-medium"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Related Teams */}
        <div className="bg-white/40 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300 mb-2">
            <Users className="w-3.5 h-3.5 text-emerald-500" />
            <span>Impacted Teams</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {summaryData.relatedTeams.map((team, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800 text-[11px] font-medium"
              >
                {team}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
