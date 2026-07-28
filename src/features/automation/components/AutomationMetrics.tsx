import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Zap,
  CheckSquare,
  MessageSquare,
  Mail,
  GitPullRequest,
  Calendar,
} from 'lucide-react';
import { AutomationMetricsData } from '../../../types/automation';
import { MOCK_AUTOMATION_METRICS } from '../../../services/automationService';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  CheckSquare,
  MessageSquare,
  Mail,
  GitPullRequest,
  Calendar,
};

export const AutomationMetrics: React.FC = () => {
  const metrics: AutomationMetricsData = MOCK_AUTOMATION_METRICS;

  return (
    <div className="space-y-6">
      {/* Top Telemetry KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Workflows</span>
          <p className="text-xl font-black text-slate-900 dark:text-slate-100">{metrics.totalWorkflows}</p>
          <span className="text-[10px] text-emerald-600 font-semibold">{metrics.activeWorkflows} Active</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Executions</span>
          <p className="text-xl font-black text-slate-900 dark:text-slate-100">{metrics.totalExecutions.toLocaleString()}</p>
          <span className="text-[10px] text-slate-500">7-day telemetry</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Success Rate</span>
          <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">{metrics.successRate}%</p>
          <span className="text-[10px] text-emerald-600 font-semibold">+1.2% this week</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Failure Rate</span>
          <p className="text-xl font-black text-rose-600 dark:text-rose-400">{metrics.failureRate}%</p>
          <span className="text-[10px] text-slate-400">0.4% pending retry</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Avg Runtime</span>
          <p className="text-xl font-black text-indigo-600 dark:text-indigo-400 font-mono">{metrics.averageRuntimeMs} ms</p>
          <span className="text-[10px] text-indigo-500 font-semibold">Fast execution</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Approval Rate</span>
          <p className="text-xl font-black text-purple-600 dark:text-purple-400">{metrics.approvalRate}%</p>
          <span className="text-[10px] text-slate-500">Human signed-off</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Time Saved</span>
          <p className="text-xl font-black text-amber-600 dark:text-amber-400">{metrics.timeSavedHours} hrs</p>
          <span className="text-[10px] text-amber-600 font-semibold">Saved team effort</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Execution Trend Chart */}
        <div className="lg:col-span-2 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-600" /> Weekly Workflow Executions Telemetry
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">Last 7 Days</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.executionsTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#64748b" />
                <YAxis tick={{ fontSize: 11 }} stroke="#64748b" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="success" name="Successful Executions" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="failed" name="Failed Executions" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Executed Integration Actions */}
        <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" /> Most Frequent Actions
          </h3>

          <div className="space-y-3">
            {metrics.topActions.map((action) => {
              const Icon = ICON_MAP[action.iconName] || Zap;
              return (
                <div
                  key={action.name}
                  className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{action.name}</span>
                  </div>

                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {action.count} runs
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
