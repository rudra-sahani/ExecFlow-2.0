import React from 'react';
import { History, X, ArrowUpRight, Trash2 } from 'lucide-react';
import { SearchHistoryItem } from '../types/memoryExplorer';

interface SearchHistoryProps {
  history: SearchHistoryItem[];
  onSelectSearch: (query: string) => void;
  onClearHistory: () => void;
  onRemoveItem: (id: string) => void;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({
  history,
  onSelectSearch,
  onClearHistory,
  onRemoveItem,
}) => {
  if (history.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          <History className="w-4 h-4 text-indigo-500" />
          <span>Recent Searches</span>
        </div>
        <button
          onClick={onClearHistory}
          className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear history</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-700 text-xs text-slate-700 dark:text-slate-300 group transition-all"
          >
            <button
              onClick={() => onSelectSearch(item.query)}
              className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <span className="font-medium truncate max-w-[200px]">{item.query}</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-500" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveItem(item.id);
              }}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
