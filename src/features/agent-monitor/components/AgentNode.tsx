import React, { memo } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { motion } from 'motion/react';
import { AgentNodeData } from '../types/agentMonitor';
import {
  CheckCircle2 as CheckCircle2Icon,
  Loader2 as Loader2Icon,
  AlertTriangle as AlertTriangleIcon,
  XCircle as XCircleIcon,
  Clock as ClockIcon,
  Cpu as CpuIcon,
  ShieldAlert as ShieldAlertIcon,
  Sparkles as SparklesIcon,
  BrainCircuit as BrainCircuitIcon,
  Database as DatabaseIcon,
  Search as SearchIcon,
  Wrench as WrenchIcon,
  UserCheck as UserCheckIcon,
  FileText as FileTextIcon,
} from 'lucide-react';

export type CustomAgentNode = Node<AgentNodeData, 'agentNode'>;

const categoryIcons: Record<string, React.ReactNode> = {
  INGESTION: <FileTextIcon className="w-4 h-4 text-sky-500" />,
  PLANNER: <BrainCircuitIcon className="w-4 h-4 text-purple-500" />,
  UNDERSTANDING: <SparklesIcon className="w-4 h-4 text-indigo-500" />,
  EXTRACTION: <SearchIcon className="w-4 h-4 text-amber-500" />,
  MEMORY: <DatabaseIcon className="w-4 h-4 text-emerald-500" />,
  REFLECTION: <CpuIcon className="w-4 h-4 text-teal-500" />,
  APPROVAL: <UserCheckIcon className="w-4 h-4 text-rose-500" />,
  EXECUTION: <WrenchIcon className="w-4 h-4 text-blue-500" />,
};

const categoryBadgeColors: Record<string, string> = {
  INGESTION: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
  PLANNER: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  UNDERSTANDING: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
  EXTRACTION: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  MEMORY: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  REFLECTION: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
  APPROVAL: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  EXECUTION: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
};

export const AgentNodeComponent: React.FC<NodeProps<CustomAgentNode>> = memo(({ data, selected }) => {
  const {
    label,
    agentName,
    agentCategory,
    status,
    durationMs,
    confidenceScore,
    stepIndex,
    retryCount,
  } = data;

  const getStatusDisplay = () => {
    switch (status) {
      case 'COMPLETED':
        return {
          icon: <CheckCircle2Icon className="w-4 h-4 text-emerald-500" />,
          label: 'Completed',
          badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
          border: selected ? 'border-emerald-500 shadow-lg shadow-emerald-500/10' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700',
        };
      case 'RUNNING':
        return {
          icon: <Loader2Icon className="w-4 h-4 text-blue-500 animate-spin" />,
          label: 'Running...',
          badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 animate-pulse',
          border: 'border-blue-500 ring-2 ring-blue-500/20 shadow-xl shadow-blue-500/20',
        };
      case 'RETRYING':
        return {
          icon: <Loader2Icon className="w-4 h-4 text-amber-500 animate-spin" />,
          label: `Retrying (${retryCount})`,
          badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
          border: 'border-amber-500 ring-2 ring-amber-500/20 shadow-lg shadow-amber-500/10',
        };
      case 'WARNING':
        return {
          icon: <AlertTriangleIcon className="w-4 h-4 text-amber-500" />,
          label: 'Warning',
          badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
          border: 'border-amber-500 shadow-md shadow-amber-500/10',
        };
      case 'FAILED':
        return {
          icon: <XCircleIcon className="w-4 h-4 text-rose-500" />,
          label: 'Failed',
          badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
          border: 'border-rose-500 shadow-lg shadow-rose-500/20',
        };
      case 'QUEUED':
        return {
          icon: <ClockIcon className="w-4 h-4 text-slate-400" />,
          label: 'Queued',
          badge: 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700',
          border: 'border-slate-200 dark:border-slate-800 opacity-70',
        };
      default:
        return {
          icon: <ClockIcon className="w-4 h-4 text-slate-400" />,
          label: 'Idle',
          badge: 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700',
          border: 'border-slate-200 dark:border-slate-800 opacity-60',
        };
    }
  };

  const statusInfo = getStatusDisplay();

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`relative min-w-[260px] max-w-[280px] rounded-xl bg-white dark:bg-slate-900 border ${statusInfo.border} p-3.5 shadow-sm transition-all duration-200 group cursor-pointer`}
    >
      {/* Target Handle (Left) */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-slate-400 dark:!bg-slate-600 !border-2 !border-white dark:!border-slate-900 group-hover:!bg-blue-500 transition-colors"
      />

      {/* Header with Step Index and Category */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold font-mono">
            #{stepIndex}
          </span>
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
              categoryBadgeColors[agentCategory] || 'bg-slate-100 text-slate-600'
            }`}
          >
            {categoryIcons[agentCategory]}
            <span className="truncate">{agentCategory}</span>
          </span>
        </div>

        {/* Status Badge */}
        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusInfo.badge}`}>
          {statusInfo.icon}
          <span>{statusInfo.label}</span>
        </div>
      </div>

      {/* Title & Agent Name */}
      <div className="mb-2.5">
        <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
          {label}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">{agentName}</p>
      </div>

      {/* Footer Metrics Bar */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1">
          <ClockIcon className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-mono text-[11px]">{durationMs > 0 ? `${(durationMs / 1000).toFixed(2)}s` : '--'}</span>
        </div>

        {confidenceScore > 0 && (
          <div className="flex items-center gap-1.5" title={`Confidence: ${(confidenceScore * 100).toFixed(0)}%`}>
            <div className="w-12 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  confidenceScore >= 0.95
                    ? 'bg-emerald-500'
                    : confidenceScore >= 0.85
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${Math.round(confidenceScore * 100)}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-slate-600 dark:text-slate-300 font-medium">
              {(confidenceScore * 100).toFixed(0)}%
            </span>
          </div>
        )}
      </div>

      {/* Running pulse effect ring */}
      {status === 'RUNNING' && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
        </span>
      )}

      {/* Source Handle (Right) */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-slate-400 dark:!bg-slate-600 !border-2 !border-white dark:!border-slate-900 group-hover:!bg-blue-500 transition-colors"
      />
    </motion.div>
  );
});

AgentNodeComponent.displayName = 'AgentNodeComponent';
