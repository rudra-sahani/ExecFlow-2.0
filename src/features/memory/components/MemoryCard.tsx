import React from 'react';
import { MemoryEntry, MemoryCategory } from '../../../types/memory';
import { Tag, Calendar, ExternalLink, ShieldCheck, Trash2 } from 'lucide-react';

interface MemoryCardProps {
  entry: MemoryEntry;
  onDelete?: (id: string) => void;
  onOpenMeeting?: (meetingId: string) => void;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({
  entry,
  onDelete,
  onOpenMeeting,
}) => {
  const getCategoryBadgeClass = (category: MemoryCategory) => {
    switch (category) {
      case 'DECISION':
        return 'bg-[#7CB518]/20 text-[#39FF14] border-[#7CB518]/40';
      case 'ACTION_ITEM':
        return 'bg-[#7CB518]/15 text-[#39FF14] border-[#7CB518]/30';
      case 'PROJECT_GOAL':
        return 'bg-[#95D600]/20 text-[#39FF14] border-[#95D600]/40';
      case 'CONTEXT':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-[#111315] text-zinc-300 border-[#7CB518]/20';
    }
  };

  return (
    <div className="bg-[#0F1110] rounded-xl border border-[#7CB518]/30 p-4 shadow-sm hover:border-[#7CB518]/60 transition-all flex flex-col justify-between font-mono text-white">
      <div>
        <div className="flex items-center justify-between mb-2 font-mono">
          <span
            className={`text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full border uppercase font-mono ${getCategoryBadgeClass(
              entry.category
            )}`}
          >
            {entry.category.replace('_', ' ')}
          </span>

          {entry.relevanceScore !== undefined && (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-[#39FF14] bg-[#7CB518]/15 px-2 py-0.5 rounded-md border border-[#7CB518]/30 font-mono">
              <ShieldCheck className="w-3 h-3" />
              {(entry.relevanceScore * 100).toFixed(0)}% Score
            </span>
          )}
        </div>

        <p className="text-sm font-medium text-white mb-3 leading-relaxed font-mono">
          {entry.content}
        </p>

        {entry.tags && entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3 font-mono">
            {entry.tags.map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-[#050505] text-zinc-300 border border-[#7CB518]/20 font-mono"
              >
                <Tag className="w-2.5 h-2.5 text-zinc-500" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-[#7CB518]/15 flex items-center justify-between text-xs text-zinc-400 font-mono">
        <div className="flex items-center gap-2 font-mono">
          <Calendar className="w-3.5 h-3.5 text-zinc-500" />
          <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
          {entry.sourceMeetingTitle && (
            <button
              onClick={() => entry.sourceMeetingId && onOpenMeeting?.(entry.sourceMeetingId)}
              className="text-[#39FF14] hover:underline flex items-center gap-1 font-medium truncate max-w-[180px] font-mono"
            >
              <span>{entry.sourceMeetingTitle}</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>

        {onDelete && (
          <button
            onClick={() => onDelete(entry.id)}
            className="text-zinc-500 hover:text-red-400 p-1 rounded transition-colors"
            title="Delete memory entry"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
