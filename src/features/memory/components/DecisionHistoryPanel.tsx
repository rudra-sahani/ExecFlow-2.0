import React from 'react';
import { DecisionHistoryItem } from '../types/memoryExplorer';
import { CheckCircle2, User, Quote, ShieldCheck, ExternalLink } from 'lucide-react';

interface DecisionHistoryPanelProps {
  decisions: DecisionHistoryItem[];
  onOpenMeeting?: (meetingId: string) => void;
}

export const DecisionHistoryPanel: React.FC<DecisionHistoryPanelProps> = ({
  decisions,
  onOpenMeeting,
}) => {
  if (decisions.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Organizational Decision History</span>
        </div>
        <span className="text-xs text-slate-400 font-medium">
          Evidence-Backed Governance
        </span>
      </div>

      <div className="space-y-3">
        {decisions.map((item) => (
          <div
            key={item.id}
            className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 space-y-2 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 uppercase">
                  {item.category || 'DECISION'}
                </span>
                <span className="text-xs text-slate-400">{item.date}</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck className="w-3 h-3" />
                {(item.confidence * 100).toFixed(0)}% Confidence
              </div>
            </div>

            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {item.decision}
            </h4>

            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <User className="w-3.5 h-3.5 text-indigo-500" />
              <span>Decision Maker: <strong>{item.decisionMaker}</strong></span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200/60 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-serif italic">
              <div className="flex items-start gap-1.5">
                <Quote className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" />
                <span>"{item.evidence}"</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="truncate max-w-[300px]">
                Meeting: <strong>{item.meetingTitle}</strong>
              </span>

              {onOpenMeeting && (
                <button
                  onClick={() => onOpenMeeting(item.meetingId)}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-1"
                >
                  <span>Open Meeting</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
