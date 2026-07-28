import React, { useState } from 'react';
import { Meeting } from '../../../types/meeting';
import { Icons } from '../../../components/ui/Icons';
import { Badge } from '../../../components/ui/Badge';
import { getSpeakerColor } from '../utils/speakerColors';

interface MeetingLeftSidebarProps {
  meeting: Meeting;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  onShowProcessingTrace: () => void;
  tasksCount: number;
}

export const MeetingLeftSidebar: React.FC<MeetingLeftSidebarProps> = ({
  meeting,
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  onShowProcessingTrace,
  tasksCount,
}) => {
  const [isParticipantsExpanded, setIsParticipantsExpanded] = useState(true);

  const confidencePct = Math.round(
    (meeting.summary?.confidenceScore || 0.96) * 100
  );

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}m ${s}s`;
  };

  const filterOptions = [
    { id: 'ALL', label: 'All Items' },
    { id: 'ACTION_ITEMS', label: 'Action Items' },
    { id: 'DECISIONS', label: 'Decisions' },
    { id: 'RISKS', label: 'Risks' },
    { id: 'POSITIVE', label: 'Positive Sentiment' },
    { id: 'HIGH_CONFIDENCE', label: 'High Confidence (>90%)' },
  ];

  return (
    <aside className="w-full h-full bg-[#0B0C0E] border-r border-zinc-800/80 flex flex-col overflow-y-auto p-4 space-y-6 text-zinc-300">
      {/* Workspace & Meeting Title Info Header */}
      <div className="space-y-3 pb-4 border-b border-zinc-800/80">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#7CB518] bg-[#7CB518]/10 px-2 py-0.5 rounded border border-[#7CB518]/20">
            {meeting.workspaceId ? 'Primary Workspace' : 'Executive Board Workspace'}
          </span>
          <Badge
            variant="outline"
            className="text-[10px] bg-emerald-950/60 text-emerald-400 border-emerald-800/60 flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {meeting.status}
          </Badge>
        </div>

        <div>
          <h2 className="text-sm font-bold text-zinc-100 tracking-tight leading-snug">
            {meeting.title}
          </h2>
          <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
            {meeting.description || 'Executive intelligence session workspace'}
          </p>
        </div>

        {/* Date & Time Metadata */}
        <div className="space-y-1.5 text-[11px] text-zinc-400 pt-1">
          <div className="flex items-center gap-2">
            <Icons.Calendar className="w-3.5 h-3.5 text-zinc-400" />
            <span>
              {new Date(meeting.scheduledStartTime).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Icons.Clock className="w-3.5 h-3.5 text-zinc-400" />
              {new Date(meeting.scheduledStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="font-mono text-[10px] bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 text-zinc-300">
              {formatDuration(meeting.actualDurationSeconds)}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {['AI-Extracted', 'Executive', 'Board-Level'].map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Search & Smart Filters Box */}
      <div className="space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
          Smart Workspace Search
        </span>
        <div className="relative">
          <Icons.Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search transcript, risks, decisions..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-7 py-1.5 text-xs bg-zinc-900/90 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-2 text-zinc-400 hover:text-zinc-200 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {filterOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => onFilterChange(opt.id)}
              className={`text-[10px] px-2.5 py-1 rounded-md font-medium transition-colors border ${
                selectedFilter === opt.id
                  ? 'bg-zinc-100 text-zinc-900 font-bold border-white'
                  : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* AI Confidence Visualisation */}
      <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-zinc-200">
            <Icons.Brain className="w-4 h-4 text-emerald-400" />
            AI Confidence Meter
          </span>
          <span className="font-mono text-emerald-400 font-bold">{confidencePct}%</span>
        </div>
        <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-emerald-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${confidencePct}%` }}
          />
        </div>
        <p className="text-[10px] text-zinc-400 leading-tight">
          Confidence derived from transcript grounding & model cross-validation.
        </p>
      </div>

      {/* Processing Status & Phase 4 Trace */}
      <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
            <Icons.Cpu className="w-3.5 h-3.5 text-indigo-400" />
            Pipeline Trace
          </span>
          <span className="text-[10px] font-mono text-emerald-400">✓ Phase 4 Active</span>
        </div>
        <button
          onClick={onShowProcessingTrace}
          className="w-full py-1.5 px-3 text-xs bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <Icons.Activity className="w-3.5 h-3.5" />
          View AI Execution Trace Log
        </button>
      </div>

      {/* Participants & Speaker Color Legend */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsParticipantsExpanded(!isParticipantsExpanded)}
            className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 hover:text-zinc-200"
          >
            <span>Meeting Participants ({meeting.participants.length})</span>
            <Icons.ChevronDown className={`w-3.5 h-3.5 transition-transform ${isParticipantsExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {isParticipantsExpanded && (
          <div className="space-y-2">
            {meeting.participants.map(p => {
              const spkColor = getSpeakerColor(p.name);

              return (
                <div
                  key={p.id}
                  className={`p-2.5 rounded-xl border ${spkColor.bg} ${spkColor.border} flex items-center justify-between transition-all hover:scale-[1.01]`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${spkColor.text} ${spkColor.bg} ring-1 ${spkColor.ring}`}>
                      {p.avatarUrl ? (
                        <img src={p.avatarUrl} alt={p.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        p.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${spkColor.text}`}>{p.name}</div>
                      <div className="text-[10px] text-zinc-400">{p.role || 'Executive Participant'}</div>
                    </div>
                  </div>

                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono border ${spkColor.badgeBg}`}>
                    {spkColor.dot.replace('bg-', '')}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
};
