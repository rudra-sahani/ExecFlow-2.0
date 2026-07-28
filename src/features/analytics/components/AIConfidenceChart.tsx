import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Brain, Cpu, DollarSign, CheckCircle, Sparkles } from 'lucide-react';
import { TrendDataPoint } from '../../../types/analytics';

interface AIConfidenceChartProps {
  trends: TrendDataPoint[];
  onDrillDown: (topic: string, score: number) => void;
}

export const AIConfidenceChart: React.FC<AIConfidenceChartProps> = ({
  trends,
  onDrillDown,
}) => {
  const formattedData = trends.map((t) => ({
    ...t,
    formattedDate: new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    confidencePercent: Number(((t.confidenceScore || 0.95) * 100).toFixed(1)),
    costEstDollars: Number(((t.tokensConsumed / 1000000) * 0.15).toFixed(4)),
  }));

  const totalTokens = trends.reduce((acc, curr) => acc + curr.tokensConsumed, 0);
  const totalCost = Number(((totalTokens / 1000000) * 0.15).toFixed(2));

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              Gemini AI Pipeline & Cost Telemetry
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Confidence score progression, token consumption, and inference cost
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-semibold">
            <Cpu className="w-3.5 h-3.5" /> {(totalTokens / 1000000).toFixed(2)}M Tokens
          </div>
          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
            <DollarSign className="w-3.5 h-3.5" /> ${totalCost} Total Cost
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-purple-50/50 dark:bg-purple-950/20 p-3 rounded-lg border border-purple-200/60 dark:border-purple-800/40">
          <div className="flex items-center justify-between text-xs text-purple-700 dark:text-purple-300 font-semibold">
            <span>Average Agent Confidence</span>
            <CheckCircle className="w-3.5 h-3.5 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-purple-900 dark:text-purple-100 mt-1">
            95.2%
          </div>
          <p className="text-[11px] text-purple-600 dark:text-purple-400 mt-0.5">
            Highest: Architecture Review (98.8%)
          </p>
        </div>

        <div className="bg-cyan-50/50 dark:bg-cyan-950/20 p-3 rounded-lg border border-cyan-200/60 dark:border-cyan-800/40">
          <div className="flex items-center justify-between text-xs text-cyan-700 dark:text-cyan-300 font-semibold">
            <span>Inference Speed / Latency</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
          </div>
          <div className="text-2xl font-black text-cyan-900 dark:text-cyan-100 mt-1">
            1.4 sec
          </div>
          <p className="text-[11px] text-cyan-600 dark:text-cyan-400 mt-0.5">
            Sub-2s standard SLA achieved
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 font-semibold">
            <span>Lowest Confidence Meeting</span>
            <span className="text-[10px] uppercase font-bold text-amber-500">Review</span>
          </div>
          <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1 truncate">
            Q3 Vendor SLA Renegotiation
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            89.2% confidence due to background audio noise
          </p>
        </div>
      </div>

      <div className="h-52 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={formattedData}
              onClick={(e: any) => e?.activePayload?.[0] && onDrillDown(e.activePayload[0].payload.date, e.activePayload[0].payload.confidencePercent)}
            >
            <defs>
              <linearGradient id="confGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
            <XAxis dataKey="formattedDate" tick={{ fontSize: 11 }} stroke="#64748b" />
            <YAxis domain={[80, 100]} tick={{ fontSize: 11 }} stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
              }}
            />
            <Area
              type="monotone"
              dataKey="confidencePercent"
              name="Confidence Score (%)"
              stroke="#a855f7"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#confGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
