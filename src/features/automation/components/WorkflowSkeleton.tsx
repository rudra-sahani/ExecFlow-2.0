import React from 'react';

export const WorkflowSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse p-2">
      {/* Metrics Banner Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        ))}
      </div>

      {/* Main Canvas & Sidebar Container Skeleton */}
      <div className="flex flex-col lg:flex-row gap-4 h-[600px]">
        {/* Left Toolbox */}
        <div className="w-full lg:w-72 bg-slate-200 dark:bg-slate-800 rounded-xl p-4 space-y-4">
          <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded-lg w-3/4" />
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-12 bg-slate-300 dark:bg-slate-700 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 bg-slate-200 dark:bg-slate-800 rounded-xl flex items-center justify-center relative overflow-hidden">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto" />
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-48 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};
