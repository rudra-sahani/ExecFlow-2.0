import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExecutionGraphData, AgentNodeData, AgentLog, TimelineEvent } from '../types/agentMonitor';
import { AgentMonitorService, generateSampleExecutionGraph } from '../services/agentMonitorService';
import { ExecutionGraph } from '../components/ExecutionGraph';
import { AgentInspector } from '../components/AgentInspector';
import { MetricsPanel } from '../components/MetricsPanel';
import { AgentLogsViewer } from '../components/AgentLogsViewer';
import { TimelineView } from '../components/TimelineView';
import { AgentMonitorSkeleton } from '../components/AgentMonitorSkeleton';
import {
  Activity as ActivityIcon,
  Play as PlayIcon,
  Pause as PauseIcon,
  RefreshCw as RefreshCwIcon,
  Cpu as CpuIcon,
  Terminal as TerminalIcon,
  Clock as ClockIcon,
  Sparkles as SparklesIcon,
  ShieldCheck as ShieldCheckIcon,
  Layers as LayersIcon,
  CheckCircle2 as CheckCircle2Icon,
  AlertCircle as AlertCircleIcon,
  Zap as ZapIcon,
  Sliders as SlidersIcon,
  Search as SearchIcon,
  BrainCircuit as BrainCircuitIcon,
} from 'lucide-react';

export const AgentMonitorPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [graphData, setGraphData] = useState<ExecutionGraphData | null>(null);
  const [selectedNode, setSelectedNode] = useState<AgentNodeData | null>(null);
  const [activeTab, setActiveTab] = useState<'graph' | 'logs' | 'timeline' | 'matrix'>('graph');
  const [isLivePolling, setIsLivePolling] = useState(true);
  const [simulating, setSimulating] = useState(true);
  const [tracesList, setTracesList] = useState<any[]>([]);
  const [selectedTraceId, setSelectedTraceId] = useState<string>('trc_execflow_prod_9021');

  // Load trace data
  const fetchGraph = useCallback(async (traceId: string) => {
    setLoading(true);
    const data = await AgentMonitorService.getExecutionGraph(traceId);
    setGraphData(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchGraph(selectedTraceId);
    AgentMonitorService.getTracesList().then(setTracesList);
  }, [selectedTraceId, fetchGraph]);

  // Live simulation ticker: advance step 14 -> 15 automatically to demonstrate real-time reactivity
  useEffect(() => {
    if (!simulating || !graphData) return;

    const interval = setInterval(() => {
      setGraphData((prev) => {
        if (!prev) return prev;

        const updatedNodes = prev.nodes.map((n) => {
          if (n.id === 'node_14' && n.status === 'RUNNING') {
            return {
              ...n,
              status: 'COMPLETED' as const,
              durationMs: 1850,
              toolInvocations: n.toolInvocations.map((t) => ({ ...t, result: 'SUCCESS' as const })),
            };
          }
          if (n.id === 'node_15' && n.status === 'QUEUED') {
            return {
              ...n,
              status: 'RUNNING' as const,
              durationMs: 400,
            };
          }
          if (n.id === 'node_15' && n.status === 'RUNNING') {
            return {
              ...n,
              status: 'COMPLETED' as const,
              durationMs: 650,
            };
          }
          return n;
        });

        const updatedEdges = prev.edges.map((e) => {
          if (e.id === 'e13_14') return { ...e, status: 'COMPLETED' as const };
          if (e.id === 'e14_15') return { ...e, status: 'ACTIVE' as const };
          return e;
        });

        const allDone = updatedNodes.every((n) => n.status === 'COMPLETED');

        return {
          ...prev,
          status: allDone ? 'COMPLETED' : 'RUNNING',
          nodes: updatedNodes,
          edges: updatedEdges,
        };
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [simulating, graphData]);

  // Aggregate logs from all nodes
  const allLogs: AgentLog[] = useMemo(() => {
    if (!graphData) return [];
    return graphData.nodes.flatMap((n) => n.logs).sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  }, [graphData]);

  // Generate timeline events
  const timelineEvents: TimelineEvent[] = useMemo(() => {
    if (!graphData) return [];
    return graphData.nodes.map((n) => ({
      id: `evt_${n.id}`,
      timestamp: n.logs[0]?.timestamp || '12:30:00',
      agentName: n.agentName,
      nodeId: n.id,
      event: `${n.label} ${n.status.toLowerCase()}`,
      status: n.status,
      details: n.outputSummary,
      durationMs: n.durationMs,
    }));
  }, [graphData]);

  if (loading || !graphData) {
    return <AgentMonitorSkeleton />;
  }

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto min-h-screen pb-12">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <ActivityIcon className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              AI Multi-Agent Monitor & Observability
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SYSTEM HEALTHY
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time DAG pipeline execution, token usage tracking, and multi-agent state inspector.
          </p>
        </div>

        {/* Trace Selector & Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Trace Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Trace:</span>
            <select
              value={selectedTraceId}
              onChange={(e) => setSelectedTraceId(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-mono focus:outline-none focus:border-blue-500"
            >
              {tracesList.map((t) => (
                <option key={t.traceId} value={t.traceId}>
                  {t.traceId} ({t.meetingTitle || 'Meeting'})
                </option>
              ))}
            </select>
          </div>

          {/* Simulation Toggle */}
          <button
            onClick={() => setSimulating(!simulating)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border shadow-sm transition-all ${
              simulating
                ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            {simulating ? <PauseIcon className="w-3.5 h-3.5" /> : <PlayIcon className="w-3.5 h-3.5" />}
            <span>{simulating ? 'Pause Stream' : 'Resume Live Feed'}</span>
          </button>

          {/* Refresh Graph */}
          <button
            onClick={() => fetchGraph(selectedTraceId)}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            title="Reload Execution Graph"
          >
            <RefreshCwIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <MetricsPanel graphData={graphData} />

      {/* Main Tab Controls */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
          {[
            { id: 'graph', label: 'DAG Execution Graph', icon: <BrainCircuitIcon className="w-4 h-4" /> },
            { id: 'logs', label: `Telemetry Logs (${allLogs.length})`, icon: <TerminalIcon className="w-4 h-4" /> },
            { id: 'timeline', label: 'Milestone Timeline', icon: <ClockIcon className="w-4 h-4" /> },
            { id: 'matrix', label: 'Sub-agent Performance Matrix', icon: <CpuIcon className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === 'graph' && (
        <div className="relative">
          <ExecutionGraph
            nodesData={graphData.nodes}
            edgesData={graphData.edges}
            selectedNodeId={selectedNode?.id || null}
            onSelectNode={setSelectedNode}
            onRefreshGraph={() => setGraphData(generateSampleExecutionGraph(selectedTraceId))}
          />

          {/* Inspector Drawer */}
          <AgentInspector
            node={selectedNode}
            onClose={() => setSelectedNode(null)}
            onRunNode={(nodeId) => {
              setGraphData((prev) => {
                if (!prev) return prev;
                return {
                  ...prev,
                  nodes: prev.nodes.map((n) => (n.id === nodeId ? { ...n, status: 'RUNNING' } : n)),
                };
              });
            }}
          />
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="h-[620px]">
          <AgentLogsViewer logs={allLogs} />
        </div>
      )}

      {activeTab === 'timeline' && (
        <TimelineView
          events={timelineEvents}
          onSelectNode={(nodeId) => {
            const match = graphData.nodes.find((n) => n.id === nodeId);
            if (match) {
              setSelectedNode(match);
              setActiveTab('graph');
            }
          }}
        />
      )}

      {activeTab === 'matrix' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm p-4 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <CpuIcon className="w-4 h-4 text-purple-500" />
            Agent Execution Matrix & Efficiency Metrics
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 uppercase font-mono border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Agent Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Latency</th>
                  <th className="p-3">Confidence</th>
                  <th className="p-3">Tokens</th>
                  <th className="p-3">Tools Called</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                {graphData.nodes.map((node) => (
                  <tr
                    key={node.id}
                    onClick={() => {
                      setSelectedNode(node);
                      setActiveTab('graph');
                    }}
                    className="hover:bg-slate-50 dark:hover:bg-slate-950 cursor-pointer transition-colors"
                  >
                    <td className="p-3 text-slate-400 font-semibold">#{node.stepIndex}</td>
                    <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">{node.agentName}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px]">
                        {node.agentCategory}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          node.status === 'COMPLETED'
                            ? 'bg-emerald-500/10 text-emerald-600'
                            : node.status === 'RUNNING'
                            ? 'bg-blue-500/10 text-blue-600 animate-pulse'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {node.status}
                      </span>
                    </td>
                    <td className="p-3">{(node.durationMs / 1000).toFixed(2)}s</td>
                    <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">
                      {(node.confidenceScore * 100).toFixed(0)}%
                    </td>
                    <td className="p-3">{node.tokenUsage.totalTokens}</td>
                    <td className="p-3 text-slate-500">{node.toolInvocations.length} tools</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
