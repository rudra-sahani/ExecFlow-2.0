import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AgentNodeData } from '../types/agentMonitor';
import {
  X as XIcon,
  CheckCircle2 as CheckCircle2Icon,
  Loader2 as Loader2Icon,
  AlertTriangle as AlertTriangleIcon,
  XCircle as XCircleIcon,
  Clock as ClockIcon,
  BrainCircuit as BrainCircuitIcon,
  Cpu as CpuIcon,
  Database as DatabaseIcon,
  Sparkles as SparklesIcon,
  Search as SearchIcon,
  Wrench as WrenchIcon,
  FileText as FileTextIcon,
  Code2 as Code2Icon,
  Layers as LayersIcon,
  Terminal as TerminalIcon,
  ShieldCheck as ShieldCheckIcon,
  Copy as CopyIcon,
  ExternalLink as ExternalLinkIcon,
  Check as CheckIcon,
} from 'lucide-react';

interface AgentInspectorProps {
  node: AgentNodeData | null;
  onClose: () => void;
  onRunNode?: (nodeId: string) => void;
}

export const AgentInspector: React.FC<AgentInspectorProps> = ({ node, onClose, onRunNode }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'prompt' | 'memory' | 'tools' | 'logs' | 'validation'>('overview');
  const [copied, setCopied] = useState(false);

  if (!node) return null;

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-14 right-0 bottom-0 w-full sm:w-[480px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl z-40 flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between bg-slate-50/50 dark:bg-slate-950/50">
          <div className="space-y-1 min-w-0 pr-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-semibold text-slate-600 dark:text-slate-300">
                #{node.stepIndex}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                {node.agentCategory}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 truncate">{node.label}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">{node.agentName}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 p-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto text-xs font-medium bg-slate-50 dark:bg-slate-900">
          {[
            { id: 'overview', label: 'Overview', icon: <LayersIcon className="w-3.5 h-3.5" /> },
            { id: 'prompt', label: 'Prompt', icon: <Code2Icon className="w-3.5 h-3.5" /> },
            { id: 'memory', label: `Memory (${node.memoryContext.length})`, icon: <DatabaseIcon className="w-3.5 h-3.5" /> },
            { id: 'tools', label: `Tools (${node.toolInvocations.length})`, icon: <WrenchIcon className="w-3.5 h-3.5" /> },
            { id: 'validation', label: 'Validation', icon: <ShieldCheckIcon className="w-3.5 h-3.5" /> },
            { id: 'logs', label: `Logs (${node.logs.length})`, icon: <TerminalIcon className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Description */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Agent Description</div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{node.description}</p>
              </div>

              {/* Status & Confidence Card */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-500 dark:text-slate-400 mb-1">Execution Duration</div>
                  <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <ClockIcon className="w-4 h-4 text-blue-500" />
                    {(node.durationMs / 1000).toFixed(2)}s
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-500 dark:text-slate-400 mb-1">Confidence Score</div>
                  <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <SparklesIcon className="w-4 h-4 text-amber-500" />
                    {(node.confidenceScore * 100).toFixed(0)}%
                  </div>
                </div>
              </div>

              {/* Token Usage Breakdown */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between font-semibold text-slate-700 dark:text-slate-300">
                  <span>Token & Model Usage</span>
                  <span className="font-mono text-slate-500">{node.tokenUsage.model}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
                  <div>
                    <div className="text-slate-400">Prompt</div>
                    <div className="font-semibold">{node.tokenUsage.promptTokens}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Completion</div>
                    <div className="font-semibold">{node.tokenUsage.completionTokens}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Est. Cost</div>
                    <div className="font-semibold text-emerald-600 dark:text-emerald-400">${node.tokenUsage.estimatedCost.toFixed(5)}</div>
                  </div>
                </div>
              </div>

              {/* Input / Output Summaries */}
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <FileTextIcon className="w-3.5 h-3.5 text-blue-500" /> Input Payload Summary
                  </div>
                  <pre className="p-2 bg-white dark:bg-slate-900 rounded font-mono text-[11px] text-slate-700 dark:text-slate-300 whitespace-pre-wrap border border-slate-200 dark:border-slate-800">
                    {node.inputSummary}
                  </pre>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <CheckCircle2Icon className="w-3.5 h-3.5 text-emerald-500" /> Output Artifact Summary
                  </div>
                  <pre className="p-2 bg-white dark:bg-slate-900 rounded font-mono text-[11px] text-slate-700 dark:text-slate-300 whitespace-pre-wrap border border-slate-200 dark:border-slate-800">
                    {node.outputSummary}
                  </pre>
                </div>
              </div>

              {/* Reflection Notes */}
              {node.reflectionNotes.length > 0 && (
                <div className="p-3 bg-purple-500/5 rounded-lg border border-purple-500/20">
                  <div className="font-semibold text-purple-700 dark:text-purple-300 mb-1.5 flex items-center gap-1">
                    <BrainCircuitIcon className="w-3.5 h-3.5 text-purple-500" /> Self-Reflection Critique
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 text-[11px]">
                    {node.reflectionNotes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'prompt' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Prompt Config</span>
                  <button
                    onClick={() => handleCopyPrompt(`Template: ${node.promptVersion.templateName}\nVersion: ${node.promptVersion.version}`)}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition-colors"
                  >
                    {copied ? <CheckIcon className="w-3.5 h-3.5 text-emerald-500" /> : <CopyIcon className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-400 font-mono">
                  <div>Template: <span className="font-semibold text-slate-900 dark:text-slate-100">{node.promptVersion.templateName}</span></div>
                  <div>Version: <span className="font-semibold text-slate-900 dark:text-slate-100">{node.promptVersion.version}</span></div>
                  <div>Temperature: <span className="font-semibold text-slate-900 dark:text-slate-100">{node.promptVersion.temperature}</span></div>
                  <div>Checksum: <span className="font-semibold text-slate-900 dark:text-slate-100">{node.promptVersion.checksum}</span></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'memory' && (
            <div className="space-y-3">
              {node.memoryContext.length === 0 ? (
                <div className="p-6 text-center text-slate-400">No vector memories retrieved for this step.</div>
              ) : (
                node.memoryContext.map((mem) => (
                  <div key={mem.id} className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{mem.sourceMeeting}</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                        {(mem.similarityScore * 100).toFixed(1)}% match
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 font-mono text-[11px] p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                      {mem.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="space-y-3">
              {node.toolInvocations.length === 0 ? (
                <div className="p-6 text-center text-slate-400">No external tool calls issued by this agent.</div>
              ) : (
                node.toolInvocations.map((tool) => (
                  <div key={tool.id} className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                        <WrenchIcon className="w-3.5 h-3.5 text-blue-500" />
                        {tool.toolName}
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        tool.result === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                      }`}>
                        {tool.result}
                      </span>
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      Target: {tool.targetService} • Latency: {tool.durationMs}ms
                    </div>
                    {tool.outputSnippet && (
                      <pre className="p-2 bg-white dark:bg-slate-900 rounded text-slate-700 dark:text-slate-300 font-mono text-[10px] border border-slate-200 dark:border-slate-800">
                        {tool.outputSnippet}
                      </pre>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'validation' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">Overall Validation Score</div>
                  <div className="text-slate-500 text-[11px]">Verification against hallucination criteria</div>
                </div>
                <div className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  {(node.validationResult.score * 100).toFixed(0)}%
                </div>
              </div>

              <div className="space-y-2">
                {node.validationResult.checks.map((check, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium text-slate-800 dark:text-slate-200">{check.name}</div>
                      {check.details && <div className="text-slate-500 text-[11px]">{check.details}</div>}
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {check.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-2 font-mono text-[11px] bg-slate-950 text-slate-200 p-3 rounded-lg border border-slate-800 max-h-[400px] overflow-y-auto">
              {node.logs.map((log) => (
                <div key={log.id} className="flex items-start gap-2 py-1 border-b border-slate-900 last:border-0">
                  <span className="text-slate-500">{log.timestamp}</span>
                  <span className={`px-1 rounded text-[9px] font-bold ${
                    log.level === 'ERROR' ? 'bg-rose-500/20 text-rose-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {log.level}
                  </span>
                  <span className="text-slate-300 flex-1 break-all">{log.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex items-center justify-between">
          <span className="text-slate-500 text-[11px] font-mono">Node ID: {node.id}</span>
          {onRunNode && (
            <button
              onClick={() => onRunNode(node.id)}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-sm transition-colors flex items-center gap-1.5"
            >
              <CpuIcon className="w-3.5 h-3.5" />
              <span>Re-run Agent</span>
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
