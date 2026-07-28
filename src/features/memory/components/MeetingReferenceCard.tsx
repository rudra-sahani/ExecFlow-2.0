import React from 'react';
import {
  Calendar,
  Users,
  CheckCircle2,
  ListTodo,
  AlertTriangle,
  FileText,
  ExternalLink,
  Tag,
  Zap,
} from 'lucide-react';
import { KnowledgeSearchResult } from '../types/memoryExplorer';

interface MeetingReferenceCardProps {
  result: KnowledgeSearchResult;
  onOpenMeeting: (meetingId: string) => void;
  onViewSourceEvidence: (result: KnowledgeSearchResult) => void;
}

export const MeetingReferenceCard: React.FC<MeetingReferenceCardProps> = ({
  result,
  onOpenMeeting,
  onViewSourceEvidence,
}) => {
  const similarityPct = (result.similarityScore * 100).toFixed(0);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col justify-between">
      <div>
        {/* Header Title & Match Score */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Meeting Record
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(result.meetingDate).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">
              {result.meetingTitle}
            </h3>
          </div>

          <div className="flex flex-col items-end flex-shrink-0">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800 shadow-sm">
              <Zap className="w-3.5 h-3.5 fill-indigo-500 text-indigo-500" />
              {similarityPct}% Match
            </span>
          </div>
        </div>

        {/* Summary Snippet */}
        <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed line-clamp-2">
          {result.summarySnippet}
        </p>

        {/* Topics Badges */}
        {result.topics && result.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {result.topics.map((topic, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                <Tag className="w-2.5 h-2.5 text-indigo-500" />
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Counts summary: Decisions, Tasks, Risks */}
        <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs mb-4">
          <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{result.decisions.length} Decisions</span>
          </div>
          <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400 font-medium">
            <ListTodo className="w-3.5 h-3.5" />
            <span>{result.tasks.length} Action Items</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-medium">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{result.risks.length} Risks Logged</span>
          </div>
        </div>
      </div>

      {/* Footer Actions & Participant Avatars */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5 text-slate-400 mr-1" />
          <div className="flex -space-x-2 overflow-hidden">
            {result.people.map((person, idx) => (
              <div
                key={idx}
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-900 bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-[10px] font-bold text-indigo-700 dark:text-indigo-300"
                title={`${person.name} (${person.role})`}
              >
                {person.avatarUrl ? (
                  <img src={person.avatarUrl} alt={person.name} className="h-6 w-6 rounded-full object-cover" />
                ) : (
                  person.name.charAt(0)
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewSourceEvidence(result)}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-500" />
            <span>Transcript Excerpts</span>
          </button>

          <button
            onClick={() => onOpenMeeting(result.meetingId)}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors"
          >
            <span>Open Meeting</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
