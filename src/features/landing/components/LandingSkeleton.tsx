import React from 'react';

export const LandingSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="w-full max-w-7xl flex items-center justify-between py-4">
        <div className="h-8 w-32 bg-slate-800 rounded-lg" />
        <div className="hidden md:flex space-x-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-20 bg-slate-800 rounded" />
          ))}
        </div>
        <div className="h-10 w-28 bg-slate-800 rounded-xl" />
      </div>

      {/* Hero Skeleton */}
      <div className="w-full max-w-4xl text-center space-y-6 pt-12">
        <div className="h-6 w-48 bg-slate-800 rounded-full mx-auto" />
        <div className="h-16 w-3/4 bg-slate-800 rounded-2xl mx-auto" />
        <div className="h-12 w-2/3 bg-slate-800/60 rounded-xl mx-auto" />
        <div className="flex justify-center gap-4 pt-4">
          <div className="h-12 w-36 bg-slate-800 rounded-xl" />
          <div className="h-12 w-44 bg-slate-800 rounded-xl" />
        </div>
      </div>

      {/* Hero Card Visual Skeleton */}
      <div className="w-full max-w-5xl h-96 bg-slate-900 border border-slate-800 rounded-3xl" />
    </div>
  );
};
