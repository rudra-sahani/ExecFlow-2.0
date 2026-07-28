import React from 'react';
import { TopicClusterItem } from '../types/memoryExplorer';
import { Grid, Tag, ChevronRight } from 'lucide-react';

interface TopicClustersProps {
  clusters: TopicClusterItem[];
  onSelectCluster?: (category: string) => void;
  selectedCategory?: string;
}

export const TopicClusters: React.FC<TopicClustersProps> = ({
  clusters,
  onSelectCluster,
  selectedCategory,
}) => {
  if (clusters.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          <Grid className="w-4 h-4 text-indigo-500" />
          <span>Semantic Topic Clusters</span>
        </div>
        <span className="text-[11px] font-medium text-slate-400">
          Auto-Grouped Knowledge Domains
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {clusters.map((item) => {
          const isSelected = selectedCategory === item.category;

          return (
            <button
              key={item.id}
              onClick={() => onSelectCluster?.(isSelected ? '' : item.category)}
              className={`text-left p-3 rounded-xl border transition-all flex flex-col justify-between group ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                  : 'bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-xs font-bold truncate ${
                      isSelected ? 'text-white' : 'text-slate-900 dark:text-slate-100'
                    }`}
                  >
                    {item.category}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                    }`}
                  >
                    {item.count}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[10px] opacity-80 mb-2">
                  <Tag className="w-2.5 h-2.5" />
                  <span className="truncate">{item.keywords.slice(0, 2).join(', ')}</span>
                </div>
              </div>

              {/* Relevance Indicator */}
              <div className="w-full space-y-1 mt-1">
                <div className="flex items-center justify-between text-[10px] opacity-75">
                  <span>Relevance</span>
                  <span>{(item.relevance * 100).toFixed(0)}%</span>
                </div>
                <div
                  className={`w-full h-1 rounded-full overflow-hidden ${
                    isSelected ? 'bg-white/30' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                >
                  <div
                    className={`h-full ${isSelected ? 'bg-white' : 'bg-indigo-500'}`}
                    style={{ width: `${item.relevance * 100}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
