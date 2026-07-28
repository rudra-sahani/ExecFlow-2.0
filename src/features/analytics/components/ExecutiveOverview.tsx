import React from 'react';
import {
  Video,
  ListTodo,
  CheckCircle2,
  Clock,
  Brain,
  ShieldAlert,
  GitPullRequest,
  Zap,
  TrendingUp,
  FileCheck,
} from 'lucide-react';
import { AnalyticsOverview } from '../../../types/analytics';

interface ExecutiveOverviewProps {
  overview: AnalyticsOverview;
  onDrillDown: (metricKey: string, title: string) => void;
}

export const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({
  overview,
  onDrillDown,
}) => {
  const kpis = [
    {
      key: 'meetings',
      label: 'Meetings Analysed',
      value: overview.totalMeetings,
      unit: 'sessions',
      subtext: `${overview.totalHoursRecorded} hours recorded`,
      icon: Video,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/60',
      border: 'hover:border-indigo-300 dark:hover:border-indigo-700',
    },
    {
      key: 'tasks_generated',
      label: 'Tasks Generated',
      value: overview.tasksGenerated,
      unit: 'items',
      subtext: `${overview.tasksCompletedRate}% completion rate`,
      icon: ListTodo,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/60',
      border: 'hover:border-blue-300 dark:hover:border-blue-700',
    },
    {
      key: 'tasks_completed',
      label: 'Tasks Completed',
      value: Math.round((overview.tasksGenerated * overview.tasksCompletedRate) / 100),
      unit: 'completed',
      subtext: `Target: 85% completion`,
      icon: CheckCircle2,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/60',
      border: 'hover:border-emerald-300 dark:hover:border-emerald-700',
    },
    {
      key: 'pending_approvals',
      label: 'Pending Approvals',
      value: overview.pendingApprovals,
      unit: 'queued',
      subtext: `Avg approval velocity: 1.2 hrs`,
      icon: GitPullRequest,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/60',
      border: 'hover:border-amber-300 dark:hover:border-amber-700',
    },
    {
      key: 'agent_confidence',
      label: 'Average AI Confidence',
      value: `${(overview.averageAgentConfidence * 100).toFixed(1)}%`,
      unit: 'accuracy',
      subtext: `Sub-agent agreement score`,
      icon: Brain,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-950/60',
      border: 'hover:border-purple-300 dark:hover:border-purple-700',
    },
    {
      key: 'processing_time',
      label: 'Avg Processing Time',
      value: `${overview.avgProcessingTimeSec}s`,
      unit: 'latency',
      subtext: `Sub-1.5s sub-agent pipeline`,
      icon: Zap,
      color: 'text-cyan-600 dark:text-cyan-400',
      bg: 'bg-cyan-50 dark:bg-cyan-950/60',
      border: 'hover:border-cyan-300 dark:hover:border-cyan-700',
    },
    {
      key: 'meeting_duration',
      label: 'Avg Meeting Duration',
      value: `${overview.avgMeetingDurationMin} min`,
      unit: 'per meeting',
      subtext: `Company goal: <=30 min`,
      icon: Clock,
      color: 'text-slate-600 dark:text-slate-400',
      bg: 'bg-slate-100 dark:bg-slate-800',
      border: 'hover:border-slate-300 dark:hover:border-slate-700',
    },
    {
      key: 'decisions',
      label: 'Total Decisions',
      value: overview.totalDecisions,
      unit: 'extracted',
      subtext: `Avg resolution time: 1.1d`,
      icon: FileCheck,
      color: 'text-teal-600 dark:text-teal-400',
      bg: 'bg-teal-50 dark:bg-teal-950/60',
      border: 'hover:border-teal-300 dark:hover:border-teal-700',
    },
    {
      key: 'risks',
      label: 'Total Risks',
      value: overview.totalRisks,
      unit: 'flagged',
      subtext: `14 resolved, 2 open`,
      icon: ShieldAlert,
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-950/60',
      border: 'hover:border-rose-300 dark:hover:border-rose-700',
    },
    {
      key: 'action_items',
      label: 'Total Action Items',
      value: overview.totalActionItems,
      unit: 'dispatched',
      subtext: `100% assigned to leads`,
      icon: TrendingUp,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/60',
      border: 'hover:border-indigo-300 dark:hover:border-indigo-700',
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          Executive Performance Telemetry
          <span className="text-xs font-normal text-slate-500 dark:text-slate-400">(Click any card to inspect underlying data)</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <button
              key={kpi.key}
              onClick={() => onDrillDown(kpi.key, kpi.label)}
              className={`text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-sm transition-all duration-200 hover:shadow-md ${kpi.border} cursor-pointer group`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${kpi.bg} ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                  {kpi.unit}
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-2xl font-black text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {kpi.value}
                </span>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 line-clamp-1">
                  {kpi.label}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                  {kpi.subtext}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
