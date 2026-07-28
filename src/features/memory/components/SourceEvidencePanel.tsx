import React from 'react';
import { X, Quote, ShieldCheck, Clock, User, ExternalLink, Sparkles } from 'lucide-react';
import { KnowledgeSearchResult } from '../types/memoryExplorer';

interface SourceEvidencePanelProps {
  result: KnowledgeSearchResult | null;
  onClose: () => void;
  onOpenMeeting: (meetingId: string) => void;
}

export const SourceEvidencePanel: React.FC<SourceEvidencePanelProps> = ({
  result,
  onClose,
  onOpenMeeting,
}) => {
  if (!result) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl h-full bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between overflow-hidden">
        {/* Panel Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              Source Evidence & Transcripts
            </span>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1 line-clamp-1">
              {result.meetingTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Panel Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Executive Overview */}
          <div className="bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-800/80 rounded-xl p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Semantic Overview Snippet</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {result.summarySnippet}
            </p>
          </div>

          {/* Transcript Excerpts */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Quote className="w-3.5 h-3.5 text-indigo-500" />
              <span>Verbatim Transcript Excerpts</span>
            </h3>

            <div className="space-y-3">
              {result.transcriptExcerpts.map((excerpt) => (
                <div
                  key={excerpt.id}
                  className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 space-y-2 relative"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
                      <User className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{excerpt.speaker}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Clock className="w-3 h-3" />
                        {excerpt.timestamp}
                      </span>
                      <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-200/60 dark:border-emerald-800">
                        <ShieldCheck className="w-2.5 h-2.5" />
                        {(excerpt.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 font-serif italic leading-relaxed pl-3 border-l-2 border-indigo-500">
                    "{excerpt.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Extracted Decisions & Tasks */}
          {result.decisions.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Decisions Produced
              </h3>
              <ul className="space-y-1.5">
                {result.decisions.map((dec, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-slate-700 dark:text-slate-300 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60 p-2.5 rounded-lg flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                    <span>{dec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Panel Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Meeting ID: {result.meetingId}
          </span>

          <button
            onClick={() => {
              onOpenMeeting(result.meetingId);
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-md shadow-indigo-600/20 transition-colors"
          >
            <span>Open Full Meeting Transcript</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
