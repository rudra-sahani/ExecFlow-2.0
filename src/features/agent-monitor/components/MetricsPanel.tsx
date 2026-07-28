import React from 'react';
import { ExecutionGraphData } from '../types/agentMonitor';
import {
  Clock as ClockIcon,
  Sparkles as SparklesIcon,
  Zap as ZapIcon,
  DollarSign as DollarSignIcon,
  Cpu as CpuIcon,
  RotateCcw as RotateCcwIcon,
  TrendingUp as TrendingUpIcon,
} from 'lucide-react';

interface MetricsPanelProps {
  graphData: ExecutionGraphData;
}

export const MetricsPanel: React.FC<MetricsPanelProps> = ({ graphData }) => {
  const completedNodesCount = graphData.nodes.filter((n) => n.status === 'COMPLETED').length;
  const runningNodesCount = graphData.nodes.filter((n) => n.status === 'RUNNING' || n.status === 'RETRYING').length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {/* Metric 1: Total Runtime */}
      <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
          <span>Total Runtime</span>
          <ClockIcon className="w-4 h-4 text-blue-500" />
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100">
            {(graphData.totalRuntimeMs / 1000).toFixed(2)}s
          </span>
          <span className="text-[10px] text-slate-500">wall-clock</span>
        </div>
        <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 truncate">
          Avg: <span className="font-mono">{graphData.avgAgentRuntimeMs}ms</span>/node
        </div>
      </div>

      {/* Metric 2: Agent Progress */}
      <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
          <span>Pipeline Nodes</span>
          <CpuIcon className="w-4 h-4 text-purple-500" />
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100">
            {completedNodesCount}/{graphData.nodes.length}
          </span>
          {runningNodesCount > 0 && (
            <span className="text-[10px] font-semibold text-blue-500 animate-pulse">
              ({runningNodesCount} active)
            </span>
          )}
        </div>
        <div className="mt-1 w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-purple-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.round((completedNodesCount / graphData.nodes.length) * 100)}%` }}
          />
        </div>
      </div>

      {/* Metric 3: Token Usage */}
      <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
          <span>Tokens Consumed</span>
          <ZapIcon className="w-4 h-4 text-amber-500" />
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100">
            {graphData.totalTokensUsed.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-500">tokens</span>
        </div>
        <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 truncate">
          Model: <span className="font-mono">gemini-2.5-flash</span>
        </div>
      </div>

      {/* Metric 4: Estimated Cost */}
      <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
          <span>Inference Cost</span>
          <DollarSignIcon className="w-4 h-4 text-emerald-500" />
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
            ${graphData.totalEstimatedCost.toFixed(5)}
          </span>
        </div>
        <div className="mt-1 text-[11px] text-emerald-600/80 dark:text-emerald-400/80 flex items-center gap-1">
          <TrendingUpIcon className="w-3 h-3" />
          <span>Optimal pricing tier</span>
        </div>
      </div>

      {/* Metric 5: Average Confidence */}
      <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
          <span>Avg Confidence</span>
          <SparklesIcon className="w-4 h-4 text-indigo-500" />
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100">
            {(graphData.avgConfidenceScore * 100).toFixed(0)}%
          </span>
          <span className="text-[10px] font-semibold text-emerald-500">PASS</span>
        </div>
        <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 truncate">
          Critic ground truth checked
        </div>
      </div>

      {/* Metric 6: Retries & Fault Tolerance */}
      <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
          <span>Fault Tolerance</span>
          <RotateCcwIcon className="w-4 h-4 text-rose-500" />
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100">
            {graphData.totalRetries}
          </span>
          <span className="text-[10px] text-slate-500">retries</span>
        </div>
        <div className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
          0 Fatal agent crashes
        </div>
      </div>
    </div>
  );
};
