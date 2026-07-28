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
} from 'recharts';
import { ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { RiskTrendItem } from '../../../types/analytics';

interface RiskTrendChartProps {
  riskTrends: RiskTrendItem[];
  onDrillDown: (period: string, count: number) => void;
}

export const RiskTrendChart: React.FC<RiskTrendChartProps> = ({
  riskTrends,
  onDrillDown,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Risk Landscape & Severity Distribution
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Autonomous risk detection trends by severity tier and resolution status
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-semibold flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> 2 Open High-Severity Risks
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> 14 Resolved
          </span>
        </div>
      </div>

      <div className="h-56 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={riskTrends}
            onClick={(e: any) => e?.activePayload?.[0] && onDrillDown(e.activePayload[0].payload.period, e.activePayload[0].payload.highSeverity)}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
            <XAxis dataKey="period" tick={{ fontSize: 11 }} stroke="#64748b" />
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
            <Bar dataKey="highSeverity" name="High Severity" fill="#f43f5e" radius={[2, 2, 0, 0]} />
            <Bar dataKey="mediumSeverity" name="Medium Severity" fill="#f59e0b" radius={[2, 2, 0, 0]} />
            <Bar dataKey="lowSeverity" name="Low Severity" fill="#3b82f6" radius={[2, 2, 0, 0]} />
            <Bar dataKey="resolved" name="Resolved Risks" fill="#10b981" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
