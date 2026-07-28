import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  BarChart3,
  TrendingUp,
  Shield,
  Clock,
  Zap,
  Sparkles,
  Users,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const PRODUCTIVITY_DATA = [
  { dept: 'Engineering', hoursSaved: 18.4, accuracy: 99.8 },
  { dept: 'Product', hoursSaved: 14.2, accuracy: 99.5 },
  { dept: 'Operations', hoursSaved: 12.8, accuracy: 98.9 },
  { dept: 'Finance', hoursSaved: 10.5, accuracy: 99.4 },
  { dept: 'Marketing', hoursSaved: 9.6, accuracy: 97.8 },
];

const RISK_DISTRIBUTION = [
  { name: 'Low Risk', value: 65, color: '#39FF14' },
  { name: 'Medium Risk', value: 25, color: '#95D600' },
  { name: 'High Risk', value: 10, color: '#f59e0b' },
];

export const Step7ExecutiveAnalytics: React.FC = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => (prev < 100 ? prev + 2 : 100));
    }, 20);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0F1110] border border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#7CB518]/15 text-[#7CB518] font-sans text-xs font-semibold border border-[#7CB518]/30">
              STEP 07
            </span>
            <h2 className="text-lg font-bold text-white font-heading">Executive Analytics & ROI Intelligence</h2>
          </div>
          <p className="text-xs text-zinc-400 font-sans mt-1">
            Real-time organizational decision velocity, executive time saved, and department productivity metrics.
          </p>
        </div>

        <div className="flex items-center gap-2 font-sans text-xs">
          <span className="text-white bg-[#151817] px-3 py-1 rounded-full border border-zinc-800 font-medium flex items-center gap-1.5 font-mono text-[11px]">
            <TrendingUp className="w-3.5 h-3.5 text-[#7CB518]" />
            Annual Savings: <span className="text-emerald-400 font-semibold">$284,000</span>
          </span>
        </div>
      </div>

      {/* Animated KPI Counters Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-sans">
        <div className="p-5 rounded-xl bg-[#0F1110] border border-zinc-800 space-y-1">
          <div className="text-xs text-zinc-400 font-medium">Sprint Decision Velocity</div>
          <div className="text-2xl font-bold text-white font-heading mt-1">
            +{Math.round((34 * counter) / 100)}%
          </div>
          <div className="text-[10px] text-zinc-500 font-sans">vs manual note taking</div>
        </div>

        <div className="p-5 rounded-xl bg-[#0F1110] border border-zinc-800 space-y-1">
          <div className="text-xs text-zinc-400 font-medium">Exec Hours Saved / Wk</div>
          <div className="text-2xl font-bold text-white font-heading mt-1">
            {((14.2 * counter) / 100).toFixed(1)} hrs
          </div>
          <div className="text-[10px] text-zinc-500 font-sans">Per leadership member</div>
        </div>

        <div className="p-5 rounded-xl bg-[#0F1110] border border-zinc-800 space-y-1">
          <div className="text-xs text-zinc-400 font-medium">Extraction Accuracy</div>
          <div className="text-2xl font-bold text-emerald-400 font-heading mt-1">
            {((99.8 * counter) / 100).toFixed(1)}%
          </div>
          <div className="text-[10px] text-emerald-400 font-sans font-medium">Zero Hallucinations</div>
        </div>

        <div className="p-5 rounded-xl bg-[#0F1110] border border-zinc-800 space-y-1">
          <div className="text-xs text-zinc-400 font-medium">Compliance Pass Rate</div>
          <div className="text-2xl font-bold text-emerald-400 font-heading mt-1">
            {Math.round((100 * counter) / 100)}%
          </div>
          <div className="text-[10px] text-zinc-500 font-sans">SOC2 & GDPR Compliant</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-sans">
        {/* Department Productivity Bar Chart */}
        <div className="lg:col-span-8 p-6 rounded-xl bg-[#0F1110] border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3 text-xs">
            <h3 className="font-bold text-white font-heading flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#7CB518]" />
              Hours Saved / Week by Department
            </h3>
            <span className="font-sans text-zinc-400 text-[10px]">Apex Global Technologies</span>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PRODUCTIVITY_DATA}>
                <XAxis dataKey="dept" stroke="#71717a" fontSize={11} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#151817', borderColor: '#27272a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="hoursSaved" fill="#7CB518" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution Donut Chart */}
        <div className="lg:col-span-4 p-6 rounded-xl bg-[#0F1110] border border-zinc-800 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3 text-xs">
            <h3 className="font-bold text-white font-heading flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#7CB518]" />
              Risk Severity Profile
            </h3>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={RISK_DISTRIBUTION} innerRadius={45} outerRadius={65} paddingAngle={4} dataKey="value">
                  {RISK_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 text-xs font-sans pt-2">
            <div className="flex items-center justify-between text-emerald-400">
              <span>• Low Risk Items</span>
              <span className="font-mono">65%</span>
            </div>
            <div className="flex items-center justify-between text-zinc-300">
              <span>• Medium Risk Items</span>
              <span className="font-mono">25%</span>
            </div>
            <div className="flex items-center justify-between text-amber-400">
              <span>• High Risk Mitigated</span>
              <span className="font-mono">10%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
