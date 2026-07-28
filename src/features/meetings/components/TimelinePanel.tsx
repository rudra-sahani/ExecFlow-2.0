import React from 'react';
import { TimelineStep } from '../../../types/meeting';
import { Icons } from '../../../components/ui/Icons';
import { Card, CardContent } from '../../../components/ui/Card';

interface TimelinePanelProps {
  steps?: TimelineStep[];
  isLoading?: boolean;
}

export const TimelinePanel: React.FC<TimelinePanelProps> = ({
  steps,
  isLoading,
}) => {
  const defaultSteps: TimelineStep[] = [
    { id: 's1', stepName: 'Meeting Started', status: 'COMPLETED', timestamp: '10:00 AM', details: 'Session audio stream ingested.' },
    { id: 's2', stepName: 'Transcript Generated', status: 'COMPLETED', timestamp: '10:01 AM', details: 'Diarization & speech-to-text completed.' },
    { id: 's3', stepName: 'Planner Completed', status: 'COMPLETED', timestamp: '10:02 AM', details: 'Execution graph compiled by Planner Agent.' },
    { id: 's4', stepName: 'Understanding Completed', status: 'COMPLETED', timestamp: '10:02 AM', details: 'Executive summary & topics extracted.' },
    { id: 's5', stepName: 'Tasks Extracted', status: 'COMPLETED', timestamp: '10:03 AM', details: '4 action items mapped to owners.' },
    { id: 's6', stepName: 'Reflection Completed', status: 'COMPLETED', timestamp: '10:03 AM', details: 'Risk analysis & hallucination checks passed.' },
    { id: 's7', stepName: 'Approved', status: 'COMPLETED', timestamp: '10:04 AM', details: 'Human authorization granted.' },
    { id: 's8', stepName: 'Completed', status: 'COMPLETED', timestamp: '10:04 AM', details: 'Meeting intelligence store synchronized.' },
  ];

  const timeline = steps && steps.length > 0 ? steps : defaultSteps;

  if (isLoading) {
    return (
      <div className="p-4 space-y-3 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-full"></div>
        <div className="h-32 bg-slate-100 rounded w-full"></div>
      </div>
    );
  }

  return (
    <div id="timeline-panel-container" className="space-y-3">
      <div className="flex items-center gap-2 pb-1">
        <Icons.Activity className="w-4 h-4 text-indigo-600" />
        <h3 className="text-xs font-semibold text-slate-900">Execution Timeline</h3>
      </div>

      <div className="relative pl-4 space-y-3 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {timeline.map(step => {
          const isDone = step.status === 'COMPLETED';
          const isInProgress = step.status === 'IN_PROGRESS';

          return (
            <div key={step.id} className="relative flex items-start gap-3 text-xs">
              {/* Step Dot */}
              <div
                className={`absolute -left-4 top-0.5 w-3 h-3 rounded-full border-2 ring-2 ring-white flex items-center justify-center shrink-0 ${
                  isDone
                    ? 'bg-emerald-500 border-emerald-500'
                    : isInProgress
                    ? 'bg-indigo-500 border-indigo-500 animate-ping'
                    : 'bg-slate-300 border-slate-300'
                }`}
              />

              <div className="flex-1 bg-white border border-slate-200 p-2.5 rounded-lg shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{step.stepName}</span>
                  {step.timestamp && (
                    <span className="text-[10px] text-slate-400 font-mono">{step.timestamp}</span>
                  )}
                </div>
                {step.details && (
                  <p className="text-[11px] text-slate-500 mt-0.5">{step.details}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
