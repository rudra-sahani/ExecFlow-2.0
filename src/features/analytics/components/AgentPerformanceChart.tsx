import React, { useState } from 'react';
import { Cpu, CheckCircle2, AlertTriangle, RefreshCw, Zap, ShieldCheck } from 'lucide-react';
import { AgentPerformanceMetric } from '../../../types/analytics';

interface AgentPerformanceChartProps {
  agents: AgentPerformanceMetric[];
  onDrillDown: (agentName: string, successRate: number) => void;
}

export const AgentPerformanceChart: React.FC<AgentPerformanceChartProps> = ({
  agents,
  onDrillDown,
}) => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              Autonomous Agent Subsystem Matrix
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Comparative benchmark across 7 specialized execution & synthesis agents
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          <ShieldCheck className="w-4 h-4" /> 98.4% Pipeline SLA Compliance
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              <th className="pb-3 pt-1 px-2">Sub-Agent Role</th>
              <th className="pb-3 pt-1 px-2">Invocations</th>
              <th className="pb-3 pt-1 px-2">Success Rate</th>
              <th className="pb-3 pt-1 px-2">Avg Latency</th>
              <th className="pb-3 pt-1 px-2">Confidence</th>
              <th className="pb-3 pt-1 px-2">Retries</th>
              <th className="pb-3 pt-1 px-2">Token Usage</th>
              <th className="pb-3 pt-1 px-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {agents.map((agent) => (
              <tr
                key={agent.agentName}
                onClick={() => onDrillDown(agent.agentName, agent.successRate)}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
              >
                <td className="py-3 px-2 font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    {agent.agentName}
                  </div>
                </td>
                <td className="py-3 px-2 font-semibold text-slate-700 dark:text-slate-300">
                  {agent.invocations}
                </td>
                <td className="py-3 px-2">
                  <span className={`inline-flex items-center gap-1 font-bold ${
                    agent.successRate >= 98 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                  }`}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {agent.successRate}%
                  </span>
                </td>
                <td className="py-3 px-2 font-medium text-slate-600 dark:text-slate-400">
                  {agent.avgDurationSec}s
                </td>
                <td className="py-3 px-2">
                  <span className="px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-semibold text-[11px]">
                    {((agent.confidence || 0.95) * 100).toFixed(0)}%
                  </span>
                </td>
                <td className="py-3 px-2 text-slate-600 dark:text-slate-400">
                  {agent.retries > 0 ? (
                    <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                      <RefreshCw className="w-3 h-3" /> {agent.retries}
                    </span>
                  ) : (
                    '0'
                  )}
                </td>
                <td className="py-3 px-2 text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                  {agent.avgTokens.toLocaleString()} / call
                </td>
                <td className="py-3 px-2 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDrillDown(agent.agentName, agent.successRate);
                    }}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Inspect Traces
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
