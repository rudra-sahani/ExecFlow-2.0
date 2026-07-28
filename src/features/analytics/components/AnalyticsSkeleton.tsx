import React from 'react';

export const AnalyticsSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse p-1">
      {/* Filters Skeleton */}
      <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>

      {/* Overview Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-24 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        ))}
      </div>

      {/* Main Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        <div className="h-80 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
      </div>

      {/* Lower Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
      </div>
    </div>
  );
};
