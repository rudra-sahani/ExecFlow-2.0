import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell,
} from 'recharts';
import { CheckSquare, AlertCircle, Clock, PieChart } from 'lucide-react';

interface ProductivityChartProps {
  onDrillDown: (category: string, count: number) => void;
}

export const ProductivityChart: React.FC<ProductivityChartProps> = ({ onDrillDown }) => {
  const taskDistribution = [
    { team: 'Core Eng', completed: 48, inProgress: 8, overdue: 2, total: 58 },
    { team: 'AI Systems', completed: 36, inProgress: 6, overdue: 3, total: 45 },
    { team: 'Sec & Infra', completed: 28, inProgress: 4, overdue: 1, total: 33 },
    { team: 'Exec Board', completed: 18, inProgress: 3, overdue: 1, total: 22 },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Productivity & Execution Velocity
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Task lifecycle completion, open backlogs, and resolution timelines by department
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-medium">
            <Clock className="w-3.5 h-3.5 text-indigo-500" /> Avg Resolution: 1.4 Days
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200/80 dark:border-slate-700/80 space-y-1">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Completed Tasks</span>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">130</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">88.5% completion velocity rate</p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200/80 dark:border-slate-700/80 space-y-1">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">In Progress / Pending</span>
          <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">21</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Active autonomous execution queue</p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200/80 dark:border-slate-700/80 space-y-1">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Overdue Tasks</span>
          <div className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 flex items-center gap-1">
            7 <AlertCircle className="w-4 h-4" />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Requires owner escalation</p>
        </div>
      </div>

      <div className="h-56 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={taskDistribution}
            onClick={(e: any) => e?.activePayload?.[0] && onDrillDown(e.activePayload[0].payload.team, e.activePayload[0].payload.total)}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
            <XAxis dataKey="team" tick={{ fontSize: 11 }} stroke="#64748b" />
            <YAxis tick={{ fontSize: 11 }} stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
            <Bar dataKey="completed" name="Completed" fill="#10b981" stackId="a" />
            <Bar dataKey="inProgress" name="In Progress" fill="#6366f1" stackId="a" />
            <Bar dataKey="overdue" name="Overdue" fill="#f43f5e" stackId="a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
