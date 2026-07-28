import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export interface LoadingOverlayProps {
  message?: string;
  fullScreen?: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = 'Loading...',
  fullScreen = false,
}) => {
  return (
    <div
      className={
        fullScreen
          ? 'fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs dark:bg-slate-950/60'
          : 'absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/80 backdrop-blur-xs dark:bg-slate-900/80'
      }
    >
      <div className="rounded-xl border border-slate-200/80 bg-white px-6 py-4 shadow-lg dark:border-slate-800 dark:bg-slate-900">
        <LoadingSpinner size="lg" label={message} />
      </div>
    </div>
  );
};
