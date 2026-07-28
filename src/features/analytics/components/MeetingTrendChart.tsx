import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { Video, BarChart2, TrendingUp } from 'lucide-react';
import { TrendDataPoint } from '../../../types/analytics';

interface MeetingTrendChartProps {
  data: TrendDataPoint[];
  onDrillDown: (date: string, count: number) => void;
}

export const MeetingTrendChart: React.FC<MeetingTrendChartProps> = ({
  data,
  onDrillDown,
}) => {
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');
  const [metricView, setMetricView] = useState<'count' | 'duration' | 'attendance'>('count');

  const formattedData = data.map((item) => ({
    ...item,
    formattedDate: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              Meeting Analytics & Cadence Trends
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Track meeting volume, duration benchmarks, and executive participation rates
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Metric Selector */}
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg flex text-xs">
            <button
              onClick={() => setMetricView('count')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                metricView === 'count'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Volume
            </button>
            <button
              onClick={() => setMetricView('duration')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                metricView === 'duration'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Duration (mins)
            </button>
            <button
              onClick={() => setMetricView('attendance')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                metricView === 'attendance'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Attendance %
            </button>
          </div>

          {/* Chart Type Toggle */}
          <button
            onClick={() => setChartType(chartType === 'area' ? 'bar' : 'area')}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs flex items-center gap-1"
            title="Toggle Chart Type"
          >
            <BarChart2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={formattedData} onClick={(e: any) => e?.activePayload?.[0] && onDrillDown(e.activePayload[0].payload.date, e.activePayload[0].payload.meetingsCount)}>
              <defs>
                <linearGradient id="meetingGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
              <XAxis dataKey="formattedDate" tick={{ fontSize: 11 }} stroke="#64748b" />
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
              <Area
                type="monotone"
                dataKey={metricView === 'count' ? 'meetingsCount' : metricView === 'duration' ? 'meetingDurationMins' : 'attendanceRate'}
                name={metricView === 'count' ? 'Meetings Count' : metricView === 'duration' ? 'Duration (min)' : 'Attendance %'}
                stroke="#6366f1"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#meetingGrad)"
              />
            </AreaChart>
          ) : (
            <BarChart data={formattedData} onClick={(e: any) => e?.activePayload?.[0] && onDrillDown(e.activePayload[0].payload.date, e.activePayload[0].payload.meetingsCount)}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
              <XAxis dataKey="formattedDate" tick={{ fontSize: 11 }} stroke="#64748b" />
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
              <Bar
                dataKey={metricView === 'count' ? 'meetingsCount' : metricView === 'duration' ? 'meetingDurationMins' : 'attendanceRate'}
                name={metricView === 'count' ? 'Meetings Count' : metricView === 'duration' ? 'Duration (min)' : 'Attendance %'}
                fill="#6366f1"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
        <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
          <TrendingUp className="w-3.5 h-3.5" /> Average session length reduced by 14% this month
        </span>
        <button
          onClick={() => onDrillDown('all_meetings', formattedData.length)}
          className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
        >
          View Underlying Meeting Records &rarr;
        </button>
      </div>
    </div>
  );
};
