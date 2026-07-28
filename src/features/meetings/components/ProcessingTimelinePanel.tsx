import React, { useState } from 'react';
import { Icons } from '../../../components/ui/Icons';
import { Badge } from '../../../components/ui/Badge';

export interface AIExecutionStage {
  id: string;
  name: string;
  status: 'COMPLETED' | 'RUNNING' | 'PENDING' | 'FAILED';
  durationMs: number;
  modelUsed: string;
  confidenceScore: number;
  metadata: Record<string, string | number>;
}

interface ProcessingTimelinePanelProps {
  stages?: AIExecutionStage[];
  isOpen?: boolean;
  onClose?: () => void;
  isCompact?: boolean;
}

const DEFAULT_STAGES: AIExecutionStage[] = [
  {
    id: 'stage_1',
    name: 'Transcript Normalisation & Diarization',
    status: 'COMPLETED',
    durationMs: 420,
    modelUsed: 'gemini-3.6-flash',
    confidenceScore: 0.98,
    metadata: {
      segmentsProcessed: 48,
      speakersIdentified: 3,
      audioQualityIndex: '0.96',
    },
  },
  {
    id: 'stage_2',
    name: 'Executive Summary Synthesis',
    status: 'COMPLETED',
    durationMs: 890,
    modelUsed: 'gemini-3.6-flash',
    confidenceScore: 0.96,
    metadata: {
      keyOutcomesExtracted: 3,
      openQuestionsFound: 2,
      sentimentPolarity: 'POSITIVE_ALIGNMENT',
    },
  },
  {
    id: 'stage_3',
    name: 'Action Item & Task Extraction',
    status: 'COMPLETED',
    durationMs: 610,
    modelUsed: 'gemini-3.6-flash',
    confidenceScore: 0.95,
    metadata: {
      actionItemsFound: 4,
      assigneesMapped: '100%',
      toolIntegrationsMatched: 1,
    },
  },
  {
    id: 'stage_4',
    name: 'Decision & Rationale Detection',
    status: 'COMPLETED',
    durationMs: 530,
    modelUsed: 'gemini-3.6-flash',
    confidenceScore: 0.97,
    metadata: {
      decisionsDetected: 3,
      rationaleConfidence: 'HIGH',
      unambiguousGrounding: 'TRUE',
    },
  },
  {
    id: 'stage_5',
    name: 'Risk & Severity Assessment',
    status: 'COMPLETED',
    durationMs: 480,
    modelUsed: 'gemini-3.6-flash',
    confidenceScore: 0.94,
    metadata: {
      risksEvaluated: 2,
      maxSeverity: 'HIGH',
      mitigationPlansGenerated: 2,
    },
  },
];

export const ProcessingTimelinePanel: React.FC<ProcessingTimelinePanelProps> = ({
  stages = DEFAULT_STAGES,
  isOpen = true,
  onClose,
  isCompact = false,
}) => {
  const [expandedStageId, setExpandedStageId] = useState<string | null>('stage_3');

  if (!isOpen) return null;

  const totalDurationMs = stages.reduce((acc, s) => acc + s.durationMs, 0);

  const content = (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Icons.Cpu className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-bold text-zinc-100">Phase 4 AI Execution Trace</h3>
        </div>
        <Badge variant="outline" className="text-[10px] bg-emerald-950/60 text-emerald-400 border-emerald-800">
          Total Time: {(totalDurationMs / 1000).toFixed(2)}s
        </Badge>
      </div>

      {/* Execution Pipeline Steps */}
      <div className="space-y-2">
        {stages.map((stage, idx) => {
          const isExpanded = expandedStageId === stage.id;

          return (
            <div
              key={stage.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 transition-all overflow-hidden"
            >
              <button
                onClick={() => setExpandedStageId(isExpanded ? null : stage.id)}
                className="w-full p-3 flex items-center justify-between text-left hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold flex items-center justify-center shrink-0">
                    ✓
                  </div>
                  <span className="text-xs font-semibold text-zinc-200">{stage.name}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-zinc-400">{stage.durationMs}ms</span>
                  <Icons.ChevronDown
                    className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>

              {/* Expanded Stage Metadata */}
              {isExpanded && (
                <div className="p-3 bg-zinc-950/80 border-t border-zinc-800/80 text-xs space-y-2.5 font-mono">
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-400">
                    <div>
                      <span className="text-zinc-400">Model:</span>{' '}
                      <span className="text-indigo-400 font-bold">{stage.modelUsed}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400">Confidence:</span>{' '}
                      <span className="text-emerald-400 font-bold">{(stage.confidenceScore * 100).toFixed(0)}%</span>
                    </div>
                  </div>

                  <div className="space-y-1 pt-1 border-t border-zinc-800/50">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-zinc-400">Execution Metadata</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                      {Object.entries(stage.metadata).map(([key, val]) => (
                        <div key={key} className="bg-zinc-900 p-1.5 rounded border border-zinc-800 text-[10px] flex justify-between">
                          <span className="text-zinc-400">{key}:</span>
                          <span className="text-zinc-200 font-bold">{String(val)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  if (isCompact) {
    return content;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#0B0C0E] border border-zinc-800 rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4">
        {content}
        {onClose && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg"
            >
              Close Trace Log
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
