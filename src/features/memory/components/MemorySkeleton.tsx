import React from 'react';

export const MemorySkeleton: React.FC = () => {
  return (
    <div className="w-full space-y-6 animate-pulse">
      {/* Search Bar Skeleton */}
      <div className="h-16 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl" />

      {/* AI Summary Skeleton */}
      <div className="p-6 bg-slate-200 dark:bg-slate-800 rounded-2xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-300 dark:bg-slate-700" />
          <div className="space-y-2">
            <div className="h-4 w-48 bg-slate-300 dark:bg-slate-700 rounded" />
            <div className="h-3 w-32 bg-slate-300 dark:bg-slate-700 rounded" />
          </div>
        </div>
        <div className="space-y-2 pt-2">
          <div className="h-3.5 w-full bg-slate-300 dark:bg-slate-700 rounded" />
          <div className="h-3.5 w-5/6 bg-slate-300 dark:bg-slate-700 rounded" />
          <div className="h-3.5 w-4/6 bg-slate-300 dark:bg-slate-700 rounded" />
        </div>
      </div>

      {/* Results Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
      </div>
    </div>
  );
};
