import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';
import { FileCheck, Shield, Zap } from 'lucide-react';
import { DecisionMetric } from '../../../types/analytics';

interface DecisionVelocityChartProps {
  decisions: DecisionMetric[];
  onDrillDown: (category: string, count: number) => void;
}

export const DecisionVelocityChart: React.FC<DecisionVelocityChartProps> = ({
  decisions,
  onDrillDown,
}) => {
  const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#a855f7'];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Decision Velocity & Governance
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Extracted executive decisions categorized by domain, impact, and time-to-resolution
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400">
          <Zap className="w-3.5 h-3.5" /> 1.1 Days Avg Resolution Time
        </div>
      </div>

      <div className="h-52 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={decisions}
            onClick={(e: any) => e?.activePayload?.[0] && onDrillDown(e.activePayload[0].payload.category, e.activePayload[0].payload.count)}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.15} />
            <XAxis type="number" tick={{ fontSize: 11 }} stroke="#64748b" />
            <YAxis dataKey="category" type="category" tick={{ fontSize: 11 }} width={140} stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="count" name="Decisions Extracted" radius={[0, 4, 4, 0]}>
              {decisions.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
        {decisions.map((d, i) => (
          <div key={i} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <div>
              <span className="font-semibold text-slate-800 dark:text-slate-200 block">{d.category}</span>
              <span className="text-slate-500 text-[11px]">Lead: {d.topDecisionMaker}</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-teal-600 dark:text-teal-400 block">{d.count} decisions</span>
              <span className="text-slate-400 text-[11px]">{d.avgResolutionDays}d avg time</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
