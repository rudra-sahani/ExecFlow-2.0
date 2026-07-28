import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { BarChart3, TrendingUp, Clock, Users, DollarSign, Sparkles, ShieldAlert } from 'lucide-react';

const VELOCITY_DATA = [
  { week: 'W1', decisions: 14, timeSaved: 12 },
  { week: 'W2', decisions: 22, timeSaved: 18 },
  { week: 'W3', decisions: 38, timeSaved: 29 },
  { week: 'W4', decisions: 45, timeSaved: 36 },
  { week: 'W5', decisions: 62, timeSaved: 51 },
  { week: 'W6', decisions: 84, timeSaved: 72 },
];

export const AnalyticsShowcase: React.FC = () => {
  const [meetingCount, setMeetingCount] = useState(25);
  const [execCount, setExecCount] = useState(8);

  // ROI calculation
  const hoursSavedPerWeek = meetingCount * 0.8 * execCount;
  const annualDollarValue = Math.round(hoursSavedPerWeek * 52 * 95);

  return (
    <section className="py-24 bg-[#050505] text-white relative font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7CB518]/15 border border-[#7CB518]/30 text-[#39FF14] text-xs font-mono">
            <BarChart3 className="w-3.5 h-3.5" /> Executive BI & ROI Calculator
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-heading">
            Measurable Decision Velocity.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-mono">
            Track executive productivity gains, decision execution speed, and compute your organization's exact ROI.
          </p>
        </div>

        {/* Grid: Chart + Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Recharts Analytics Preview */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-xl bg-[#0F1110] border border-[#7CB518]/30 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#7CB518]/15">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#7CB518]/15 text-[#39FF14] border border-[#7CB518]/30">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-heading">Sprint Execution Velocity</h3>
                  <p className="text-xs text-zinc-400 font-mono">Decisions Dispatched vs. Executive Hours Saved</p>
                </div>
              </div>
              <span className="text-xs font-mono text-[#39FF14] bg-[#7CB518]/15 px-2.5 py-1 rounded border border-[#7CB518]/30 font-bold">
                +148% Speed
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={VELOCITY_DATA}>
                  <defs>
                    <linearGradient id="decisionsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7CB518" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#7CB518" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="timeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#39FF14" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#39FF14" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="week" stroke="#71717a" fontSize={11} />
                  <YAxis stroke="#71717a" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#111315', borderColor: 'rgba(124,181,24,0.3)', borderRadius: '8px', color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="decisions" stroke="#7CB518" fillOpacity={1} fill="url(#decisionsGrad)" name="Dispatched Decisions" />
                  <Area type="monotone" dataKey="timeSaved" stroke="#39FF14" fillOpacity={1} fill="url(#timeGrad)" name="Hours Saved" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Interactive ROI Calculator */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-xl bg-[#0F1110] border border-[#7CB518]/30 space-y-6 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#39FF14] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Interactive ROI Estimator
            </div>

            <div className="space-y-5 font-mono">
              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-300 mb-2">
                  <span>Weekly Meetings Conducted:</span>
                  <span className="text-[#39FF14] font-mono text-sm">{meetingCount} meetings/wk</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={meetingCount}
                  onChange={(e) => setMeetingCount(Number(e.target.value))}
                  className="w-full accent-[#7CB518] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-300 mb-2">
                  <span>Executive / Leader Count:</span>
                  <span className="text-[#95D600] font-mono text-sm">{execCount} leaders</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={execCount}
                  onChange={(e) => setExecCount(Number(e.target.value))}
                  className="w-full accent-[#7CB518] cursor-pointer"
                />
              </div>
            </div>

            <div className="p-5 rounded-lg bg-[#111315] border border-[#7CB518]/20 space-y-3 font-mono">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Estimated Hours Saved / Week:</span>
                <span className="text-[#39FF14] font-mono font-bold text-base">{Math.round(hoursSavedPerWeek)} hrs</span>
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-[#7CB518]/15">
                <span className="font-bold text-zinc-200">Annual Value Generated:</span>
                <span className="text-2xl font-black text-[#39FF14] font-mono font-heading">
                  ${annualDollarValue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
