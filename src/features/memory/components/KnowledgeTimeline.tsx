import React, { useState } from 'react';
import { KnowledgeTimelineItem } from '../types/memoryExplorer';
import { Calendar, CheckCircle2, AlertTriangle, Briefcase, ListTodo, ExternalLink } from 'lucide-react';

interface KnowledgeTimelineProps {
  timeline: KnowledgeTimelineItem[];
  onOpenMeeting: (meetingId: string) => void;
}

export const KnowledgeTimeline: React.FC<KnowledgeTimelineProps> = ({
  timeline,
  onOpenMeeting,
}) => {
  const [filterType, setFilterType] = useState<string>('ALL');

  const filtered = filterType === 'ALL'
    ? timeline
    : timeline.filter((item) => item.type === filterType);

  const getTypeIcon = (type: KnowledgeTimelineItem['type']) => {
    switch (type) {
      case 'DECISION':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'RISK':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'PROJECT':
        return <Briefcase className="w-4 h-4 text-purple-500" />;
      case 'TASK':
        return <ListTodo className="w-4 h-4 text-blue-500" />;
    }
  };

  const getTypeBadgeClass = (type: KnowledgeTimelineItem['type']) => {
    switch (type) {
      case 'DECISION':
        return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
      case 'RISK':
        return 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'PROJECT':
        return 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800';
      case 'TASK':
        return 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <span>Chronological Knowledge Evolution</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Historical progression of organizational decisions, risks, projects, and commitments
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-medium">
          {['ALL', 'DECISION', 'RISK', 'PROJECT', 'TASK'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-2.5 py-1 rounded-lg transition-all capitalize ${
                filterType === t
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {t.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:top-2 before:bottom-2 before:left-2.5 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {filtered.map((item) => (
          <div key={item.id} className="relative group">
            <div className="absolute -left-[23px] top-1 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-500 flex items-center justify-center shadow-sm">
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
            </div>

            <div className="bg-slate-50/80 dark:bg-slate-800/40 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getTypeBadgeClass(
                      item.type
                    )}`}
                  >
                    {getTypeIcon(item.type)}
                    {item.type}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {item.date}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Owner: <strong className="text-slate-800 dark:text-slate-200">{item.owner}</strong>
                  </span>
                  {item.status && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 uppercase">
                      {item.status}
                    </span>
                  )}
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {item.title}
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.description}
              </p>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 italic">
                  Origin: {item.meetingTitle}
                </span>

                <button
                  onClick={() => onOpenMeeting(item.meetingId)}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-1"
                >
                  <span>View Source</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
