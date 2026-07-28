import React from 'react';
import { Layers, Calendar, ExternalLink, Zap } from 'lucide-react';
import { KnowledgeSearchResult } from '../types/memoryExplorer';

interface SimilarMeetingsPanelProps {
  results: KnowledgeSearchResult[];
  onOpenMeeting: (meetingId: string) => void;
}

export const SimilarMeetingsPanel: React.FC<SimilarMeetingsPanelProps> = ({
  results,
  onOpenMeeting,
}) => {
  if (results.length <= 1) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          <Layers className="w-4 h-4 text-indigo-500" />
          <span>Cross-Referenced Meetings</span>
        </div>
        <span className="text-xs text-slate-400 font-medium">
          Vector Cosine Clustering
        </span>
      </div>

      <div className="space-y-2.5">
        {results.slice(0, 4).map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenMeeting(item.meetingId)}
            className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="space-y-1 max-w-[80%]">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                {item.meetingTitle}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                {item.summarySnippet}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-2.5 h-2.5" />
                  {new Date(item.meetingDate).toLocaleDateString()}
                </span>
                <span>•</span>
                <span>{item.topics.slice(0, 2).join(', ')}</span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-0.5">
                <Zap className="w-3 h-3 fill-current" />
                {(item.similarityScore * 100).toFixed(0)}%
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
