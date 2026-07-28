import React from 'react';
import { Target, Users, ShieldCheck, Activity } from 'lucide-react';
import { AnalyticsReport } from '../../../types/analytics';

interface KPIGridProps {
  report: AnalyticsReport;
  onDrillDown: (key: string, title: string) => void;
}

export const KPIGrid: React.FC<KPIGridProps> = ({ report, onDrillDown }) => {
  const cards = [
    {
      key: 'conversion',
      title: 'Action Item Conversion',
      value: '3.7 per mtg',
      trend: '+14% vs last period',
      sub: 'Actionable tasks extracted per meeting',
      icon: Target,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/60',
    },
    {
      key: 'attendance',
      title: 'Meeting Participation Rate',
      value: '91.2%',
      trend: '+2.4% engagement',
      sub: 'Average 5.2 active attendees per sync',
      icon: Users,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/60',
    },
    {
      key: 'remediation',
      title: 'Risk Resolution Rate',
      value: '87.5%',
      trend: '14 of 16 resolved',
      sub: 'Avg 1.8 days to resolve flagged risks',
      icon: ShieldCheck,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/60',
    },
    {
      key: 'agent_health',
      title: 'Agent Pipeline Health',
      value: '98.9%',
      trend: '0.01s avg latency shift',
      sub: 'Sub-agent error rate <1.1%',
      icon: Activity,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-950/60',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <button
            key={c.key}
            onClick={() => onDrillDown(c.key, c.title)}
            className="text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {c.title}
              </span>
              <div className={`p-1.5 rounded-lg ${c.bg} ${c.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {c.value}
              </span>
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                {c.trend}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {c.sub}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};
