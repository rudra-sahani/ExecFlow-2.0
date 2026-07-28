import React from 'react';
import { RecurringRiskItem } from '../types/memoryExplorer';
import { AlertTriangle, TrendingDown, TrendingUp, Minus, Shield, Video, UserCheck } from 'lucide-react';

interface RecurringRisksPanelProps {
  risks: RecurringRiskItem[];
  onOpenMeeting?: (meetingId: string) => void;
}

export const RecurringRisksPanel: React.FC<RecurringRisksPanelProps> = ({
  risks,
  onOpenMeeting,
}) => {
  if (risks.length === 0) return null;

  const getSeverityBadge = (severity: RecurringRiskItem['severity']) => {
    switch (severity) {
      case 'HIGH':
        return 'bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 border-red-300 dark:border-red-800';
      case 'MEDIUM':
        return 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'LOW':
        return 'bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800';
    }
  };

  const getTrendIcon = (trend: RecurringRiskItem['trend']) => {
    switch (trend) {
      case 'DECREASING':
        return (
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
            <TrendingDown className="w-3.5 h-3.5" /> Decreasing
          </span>
        );
      case 'INCREASING':
        return (
          <span className="flex items-center gap-1 text-red-600 dark:text-red-400 text-xs font-bold">
            <TrendingUp className="w-3.5 h-3.5" /> Escalating
          </span>
        );
      case 'STABLE':
        return (
          <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs font-bold">
            <Minus className="w-3.5 h-3.5" /> Stable
          </span>
        );
    }
  };

  return (
    <div className="bg-[#0F1110] rounded-xl border border-[#7CB518]/30 p-5 shadow-sm space-y-4 font-mono text-white">
      <div className="flex items-center justify-between pb-2 border-b border-[#7CB518]/15 font-mono">
        <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider font-mono">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>Recurring Risk Analysis & Mitigation Audit</span>
        </div>
        <span className="text-xs text-zinc-400 font-medium font-mono">
          Cross-Meeting Risk Patterns
        </span>
      </div>

      <div className="space-y-4 font-mono">
        {risks.map((item) => (
          <div
            key={item.id}
            className="bg-[#050505] rounded-lg p-4 border border-[#7CB518]/20 space-y-3 font-mono"
          >
            {/* Header */}
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase font-mono ${getSeverityBadge(
                      item.severity
                    )}`}
                  >
                    {item.severity} SEVERITY
                  </span>
                  <span className="text-xs font-semibold text-zinc-400 font-mono">
                    Flagged in {item.frequency} meetings
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white font-heading">
                  {item.risk}
                </h4>
              </div>

              <div>{getTrendIcon(item.trend)}</div>
            </div>

            {/* Affected Meetings */}
            <div className="space-y-1.5 pt-1 font-mono">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block font-mono">
                Occurrences in Meetings
              </span>
              <div className="flex flex-wrap gap-2">
                {item.affectedMeetings.map((mtg) => (
                  <button
                    key={mtg.id}
                    onClick={() => onOpenMeeting?.(mtg.id)}
                    className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-[#111315] border border-[#7CB518]/30 text-[#39FF14] hover:underline font-mono"
                  >
                    <Video className="w-3 h-3 text-[#39FF14]" />
                    <span>{mtg.title}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">({mtg.date})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mitigation History */}
            <div className="space-y-1.5 pt-2 border-t border-[#7CB518]/15 font-mono">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1 font-mono">
                <Shield className="w-3 h-3 text-[#39FF14]" />
                Mitigation Actions Logged
              </span>

              <div className="space-y-1 font-mono">
                {item.mitigationHistory.map((mit, idx) => (
                  <div
                    key={idx}
                    className="text-xs bg-[#7CB518]/10 border border-[#7CB518]/30 p-2 rounded-lg flex items-center justify-between text-zinc-200 font-mono"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
                      <span>{mit.action}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-medium font-mono">
                      <span className="flex items-center gap-1">
                        <UserCheck className="w-3 h-3 text-zinc-400" />
                        {mit.owner}
                      </span>
                      <span>•</span>
                      <span>{mit.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
