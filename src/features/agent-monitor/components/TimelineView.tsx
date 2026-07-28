import React from 'react';
import { TimelineEvent, AgentStatus } from '../types/agentMonitor';
import {
  CheckCircle2 as CheckCircle2Icon,
  Loader2 as Loader2Icon,
  AlertTriangle as AlertTriangleIcon,
  XCircle as XCircleIcon,
  Clock as ClockIcon,
  Cpu as CpuIcon,
} from 'lucide-react';

interface TimelineViewProps {
  events: TimelineEvent[];
  onSelectNode?: (nodeId: string) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ events, onSelectNode }) => {
  const getStatusIcon = (status: AgentStatus) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle2Icon className="w-4 h-4 text-emerald-500" />;
      case 'RUNNING':
        return <Loader2Icon className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'RETRYING':
      case 'WARNING':
        return <AlertTriangleIcon className="w-4 h-4 text-amber-500" />;
      case 'FAILED':
        return <XCircleIcon className="w-4 h-4 text-rose-500" />;
      default:
        return <ClockIcon className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ClockIcon className="w-4 h-4 text-blue-500" />
          Execution Progression Timeline
        </h3>
        <span className="text-xs text-slate-500 font-mono">{events.length} milestones recorded</span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {events.map((evt) => (
          <div
            key={evt.id}
            onClick={() => onSelectNode && onSelectNode(evt.nodeId)}
            className="relative flex items-start gap-3 group cursor-pointer"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-6 top-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm group-hover:scale-110 transition-transform">
              {getStatusIcon(evt.status)}
            </div>

            {/* Event Card */}
            <div className="flex-1 p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 group-hover:border-blue-500/40 transition-colors">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <CpuIcon className="w-3.5 h-3.5 text-blue-500" />
                  {evt.agentName}
                </span>
                <span className="font-mono text-slate-400 text-[11px]">{evt.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-mono">{evt.event}</p>
              {evt.details && <p className="text-[11px] text-slate-500 mt-1">{evt.details}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
