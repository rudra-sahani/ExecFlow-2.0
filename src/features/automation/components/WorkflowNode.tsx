import React, { memo } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import {
  Video,
  ShieldCheck,
  PlusSquare,
  CheckCircle2,
  ShieldAlert,
  FileCheck,
  Play,
  CalendarClock,
  Brain,
  AlertTriangle,
  UserCheck,
  Clock,
  Tag,
  Calendar,
  GitPullRequest,
  Mail,
  MessageSquare,
  Users,
  Bell,
  Globe,
  Zap,
  Rocket,
  CheckSquare,
  Sparkles,
  AlertOctagon,
  Loader2,
  Lock,
} from 'lucide-react';
import { WorkflowNodeData } from '../../../types/automation';
import { cn } from '../../../lib/cn';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Video,
  ShieldCheck,
  PlusSquare,
  CheckCircle2,
  ShieldAlert,
  FileCheck,
  Play,
  CalendarClock,
  Brain,
  AlertTriangle,
  UserCheck,
  Clock,
  Tag,
  Calendar,
  GitPullRequest,
  Mail,
  MessageSquare,
  Users,
  Bell,
  Globe,
  Zap,
  Rocket,
  CheckSquare,
  Sparkles,
  AlertOctagon,
};

export const WorkflowNode = memo(({ data: rawData, selected }: NodeProps<Node>) => {
  const data = rawData as unknown as WorkflowNodeData;
  const IconComponent = ICON_MAP[data.iconName] || Zap;

  const isTrigger = data.type === 'trigger';
  const isCondition = data.type === 'condition';
  const isAction = data.type === 'action';
  const isApproval = data.type === 'approval';

  const status = data.status || 'idle';

  return (
    <div
      className={cn(
        'group relative min-w-[240px] max-w-[300px] rounded-2xl border bg-white/95 dark:bg-slate-900/95 p-4 shadow-xl backdrop-blur-md transition-all duration-200 hover:shadow-2xl',
        selected
          ? 'border-indigo-500 ring-2 ring-indigo-500/40 shadow-indigo-500/10'
          : 'border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700',
        isTrigger && 'border-l-4 border-l-emerald-500',
        isCondition && 'border-l-4 border-l-amber-500',
        isAction && 'border-l-4 border-l-indigo-500',
        isApproval && 'border-l-4 border-l-rose-500'
      )}
    >
      {/* Target Handle (Input) */}
      {!isTrigger && (
        <Handle
          type="target"
          position={Position.Left}
          className="!w-3 !h-3 !bg-slate-400 dark:!bg-slate-600 !border-2 !border-white dark:!border-slate-900 transition-transform group-hover:scale-125"
        />
      )}

      {/* Header Badge & Status */}
      <div className="flex items-center justify-between mb-2 gap-2">
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              'px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border',
              isTrigger && 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
              isCondition && 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
              isAction && 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
              isApproval && 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800'
            )}
          >
            {data.type}
          </span>
          {data.linkedTool && (
            <span className="px-1.5 py-0.5 text-[9px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded">
              Tool
            </span>
          )}
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-1">
          {status === 'running' && (
            <span className="flex items-center gap-1 text-[10px] font-medium text-indigo-500 animate-pulse">
              <Loader2 className="w-3 h-3 animate-spin" /> Running
            </span>
          )}
          {status === 'success' && (
            <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-500">
              <CheckCircle2 className="w-3 h-3" /> OK
            </span>
          )}
          {status === 'failed' && (
            <span className="flex items-center gap-1 text-[10px] font-medium text-rose-500">
              <ShieldAlert className="w-3 h-3" /> Failed
            </span>
          )}
          {status === 'paused_for_approval' && (
            <span className="flex items-center gap-1 text-[10px] font-medium text-rose-500 animate-pulse">
              <Lock className="w-3 h-3" /> Approval Gate
            </span>
          )}
        </div>
      </div>

      {/* Main Node Info */}
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'p-2 rounded-xl text-white shadow-sm shrink-0',
            isTrigger && 'bg-emerald-500',
            isCondition && 'bg-amber-500',
            isAction && 'bg-indigo-600',
            isApproval && 'bg-rose-600'
          )}
        >
          <IconComponent className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
            {data.label}
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mt-0.5">
            {data.description}
          </p>
        </div>
      </div>

      {/* Footer Config / Meta Tags */}
      {data.executionMeta?.confidenceScore !== undefined && (
        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1 font-medium text-purple-600 dark:text-purple-400">
            <Sparkles className="w-3 h-3" /> {data.executionMeta.confidenceScore}% Confidence
          </span>
          {data.executionMeta.riskLevel && (
            <span
              className={cn(
                'font-bold px-1.5 py-0.2 rounded',
                data.executionMeta.riskLevel === 'HIGH' && 'text-rose-600 bg-rose-50 dark:bg-rose-950/60',
                data.executionMeta.riskLevel === 'MEDIUM' && 'text-amber-600 bg-amber-50 dark:bg-amber-950/60',
                data.executionMeta.riskLevel === 'LOW' && 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60'
              )}
            >
              {data.executionMeta.riskLevel} Risk
            </span>
          )}
        </div>
      )}

      {/* Source Handles (Output) */}
      {isCondition ? (
        <>
          <Handle
            type="source"
            position={Position.Right}
            id="true"
            style={{ top: '35%' }}
            className="!w-3 !h-3 !bg-emerald-500 !border-2 !border-white dark:!border-slate-900 transition-transform group-hover:scale-125"
          />
          <Handle
            type="source"
            position={Position.Right}
            id="false"
            style={{ top: '65%' }}
            className="!w-3 !h-3 !bg-rose-500 !border-2 !border-white dark:!border-slate-900 transition-transform group-hover:scale-125"
          />
        </>
      ) : (
        <Handle
          type="source"
          position={Position.Right}
          className="!w-3 !h-3 !bg-indigo-500 !border-2 !border-white dark:!border-slate-900 transition-transform group-hover:scale-125"
        />
      )}
    </div>
  );
});

WorkflowNode.displayName = 'WorkflowNode';
