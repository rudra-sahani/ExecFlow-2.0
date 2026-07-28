import React from 'react';

export const AgentMonitorSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse p-6">
      <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-24 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        ))}
      </div>
      <div className="h-[550px] bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
    </div>
  );
};
