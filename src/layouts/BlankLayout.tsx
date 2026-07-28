import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const BlankLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Suspense fallback={<div className="flex-1 flex items-center justify-center p-8"><LoadingSpinner size="xl" label="Loading view..." /></div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};
