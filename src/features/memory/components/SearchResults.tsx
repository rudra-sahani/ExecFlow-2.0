import React, { useState } from 'react';
import { MeetingReferenceCard } from './MeetingReferenceCard';
import { MemoryCard } from './MemoryCard';
import { KnowledgeSearchResult } from '../types/memoryExplorer';
import { MemoryEntry } from '../../../types/memory';
import { Search, Layers, FileText, Database } from 'lucide-react';

interface SearchResultsProps {
  results: KnowledgeSearchResult[];
  entries: MemoryEntry[];
  onOpenMeeting: (meetingId: string) => void;
  onViewSourceEvidence: (result: KnowledgeSearchResult) => void;
  onDeleteMemoryEntry?: (id: string) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  entries,
  onOpenMeeting,
  onViewSourceEvidence,
  onDeleteMemoryEntry,
}) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'MEETINGS' | 'MEMORIES'>('ALL');

  const totalCount = results.length + entries.length;

  return (
    <div className="space-y-4">
      {/* Sub-navigation bar for Results filter */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'ALL'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Results</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              {totalCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('MEETINGS')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'MEETINGS'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Meetings</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
              {results.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('MEMORIES')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'MEMORIES'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Memory Entries</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
              {entries.length}
            </span>
          </button>
        </div>

        <span className="text-xs text-slate-400 font-medium hidden sm:inline">
          Ranked by Cosine Similarity & Recency
        </span>
      </div>

      {/* Grid of Results */}
      {totalCount === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-6">
          <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            No matching semantic records found
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Try adjusting your query or expanding your filter date horizon.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {(activeTab === 'ALL' || activeTab === 'MEETINGS') &&
            results.map((res) => (
              <MeetingReferenceCard
                key={res.id}
                result={res}
                onOpenMeeting={onOpenMeeting}
                onViewSourceEvidence={onViewSourceEvidence}
              />
            ))}

          {(activeTab === 'ALL' || activeTab === 'MEMORIES') &&
            entries.length > 0 && (
              <div className="space-y-3 pt-2">
                {activeTab === 'ALL' && (
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Vector Episodic Memory Items</span>
                  </h4>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {entries.map((entry) => (
                    <MemoryCard
                      key={entry.id}
                      entry={entry}
                      onDelete={onDeleteMemoryEntry}
                      onOpenMeeting={onOpenMeeting}
                    />
                  ))}
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
};
