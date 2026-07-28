import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  BackgroundVariant,
  Node,
} from '@xyflow/react';
import {
  Play,
  Save,
  RotateCcw,
  Sparkles,
  Download,
  Plus,
  Zap,
  Sliders,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import { WorkflowNode } from './WorkflowNode';
import { WorkflowSidebar } from './WorkflowSidebar';
import { WorkflowInspector } from './WorkflowInspector';
import {
  Workflow,
  CustomWorkflowNode,
  WorkflowTriggerDefinition,
  WorkflowConditionDefinition,
  WorkflowActionDefinition,
} from '../../../types/automation';
import toast from 'react-hot-toast';

const nodeTypes = {
  custom: WorkflowNode,
};

interface WorkflowCanvasProps {
  workflow: Workflow;
  onSaveWorkflow?: (updatedWorkflow: Workflow) => void;
  onRunSimulation?: (workflow: Workflow) => void;
}

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  workflow,
  onSaveWorkflow,
  onRunSimulation,
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(workflow.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(workflow.edges);
  const [selectedNode, setSelectedNode] = useState<CustomWorkflowNode | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const onConnect = useCallback(
    (params: Connection | Edge) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: '#6366f1', strokeWidth: 2 },
          } as Edge,
          eds
        )
      ),
    [setEdges]
  );

  const handleNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node as CustomWorkflowNode);
  };

  const handleAddTriggerNode = (trigger: WorkflowTriggerDefinition) => {
    const newNode: CustomWorkflowNode = {
      id: `node-${Date.now()}`,
      type: 'custom',
      position: { x: 100 + nodes.length * 40, y: 150 + (nodes.length % 3) * 60 },
      data: {
        label: trigger.label,
        description: trigger.description,
        type: 'trigger',
        category: trigger.category,
        iconName: trigger.iconName,
        config: trigger.defaultConfig,
      },
    };
    setNodes((nds) => nds.concat(newNode));
    toast.success(`Added trigger node: ${trigger.label}`);
  };

  const handleAddConditionNode = (condition: WorkflowConditionDefinition) => {
    const newNode: CustomWorkflowNode = {
      id: `node-${Date.now()}`,
      type: 'custom',
      position: { x: 380 + nodes.length * 30, y: 150 + (nodes.length % 3) * 60 },
      data: {
        label: condition.label,
        description: condition.description,
        type: 'condition',
        category: condition.category,
        iconName: condition.iconName,
        config: condition.defaultConfig,
      },
    };
    setNodes((nds) => nds.concat(newNode));
    toast.success(`Added condition node: ${condition.label}`);
  };

  const handleAddActionNode = (action: WorkflowActionDefinition) => {
    const newNode: CustomWorkflowNode = {
      id: `node-${Date.now()}`,
      type: 'custom',
      position: { x: 680 + nodes.length * 20, y: 150 + (nodes.length % 3) * 60 },
      data: {
        label: action.label,
        description: action.description,
        type: 'action',
        category: action.category,
        iconName: action.iconName,
        config: action.defaultConfig,
        requiresApproval: action.requiresApprovalByDefault,
      },
    };
    setNodes((nds) => nds.concat(newNode));
    toast.success(`Added action node: ${action.label}`);
  };

  const handleUpdateNode = (nodeId: string, updatedData: Partial<CustomWorkflowNode['data']>) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === nodeId) {
          return {
            ...n,
            data: {
              ...n.data,
              ...updatedData,
            },
          };
        }
        return n;
      })
    );
  };

  const handleDeleteNode = (nodeId: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
    setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
    setSelectedNode(null);
    toast.success('Node removed from canvas');
  };

  const handleClearCanvas = () => {
    if (window.confirm('Clear all nodes and edges from canvas?')) {
      setNodes([]);
      setEdges([]);
      setSelectedNode(null);
      toast.success('Canvas cleared');
    }
  };

  const handleRunLiveExecution = () => {
    setIsRunning(true);
    toast.loading('Starting workflow live execution step-by-step...', { id: 'run-toast' });

    nodes.forEach((node, idx) => {
      setTimeout(() => {
        setNodes((nds) =>
          nds.map((n) => (n.id === node.id ? { ...n, data: { ...n.data, status: 'running' } } : n))
        );
      }, idx * 800);

      setTimeout(() => {
        setNodes((nds) =>
          nds.map((n) =>
            n.id === node.id
              ? {
                  ...n,
                  data: {
                    ...n.data,
                    status: 'success',
                    executionMeta: {
                      lastExecuted: new Date().toISOString(),
                      durationMs: Math.floor(Math.random() * 300) + 150,
                      confidenceScore: 95,
                    },
                  },
                }
              : n
          )
        );
      }, idx * 800 + 700);
    });

    setTimeout(() => {
      setIsRunning(false);
      toast.success('Workflow executed successfully across all nodes!', { id: 'run-toast' });
    }, nodes.length * 800 + 800);
  };

  const handleSave = () => {
    const updated: Workflow = {
      ...workflow,
      nodes,
      edges,
      updatedAt: new Date().toISOString(),
    };
    if (onSaveWorkflow) {
      onSaveWorkflow(updated);
    }
    toast.success('Workflow saved successfully!');
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ nodes, edges }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${workflow.name.toLowerCase().replace(/\s+/g, '-')}-workflow.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success('Exported workflow JSON');
  };

  return (
    <div className="flex flex-col lg:flex-row h-[720px] rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 overflow-hidden shadow-xl relative">
      {/* Left Toolbox Sidebar */}
      <WorkflowSidebar
        onAddTrigger={handleAddTriggerNode}
        onAddCondition={handleAddConditionNode}
        onAddAction={handleAddActionNode}
      />

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col relative h-full min-w-0">
        {/* Canvas Toolbar Header */}
        <div className="p-3 border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 z-20 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> {workflow.name}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              v{workflow.version} • {nodes.length} Nodes • {edges.length} Edges
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => onRunSimulation && onRunSimulation({ ...workflow, nodes, edges })}
              className="px-3 py-1.5 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900 text-purple-700 dark:text-purple-300 font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-500" /> Simulate Mode
            </button>

            <button
              onClick={handleRunLiveExecution}
              disabled={isRunning}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> {isRunning ? 'Running Live...' : 'Run Workflow'}
            </button>

            <button
              onClick={handleSave}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" /> Save
            </button>

            <button
              onClick={handleExportJSON}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              title="Export Workflow JSON"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={handleClearCanvas}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-600 dark:text-rose-400 transition-colors"
              title="Clear Canvas"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive React Flow Canvas */}
        <div className="flex-1 w-full h-full relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={handleNodeClick}
            nodeTypes={nodeTypes}
            fitView
            className="bg-slate-50 dark:bg-slate-950"
          >
            <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#64748b" />
            <Controls className="!bg-white dark:!bg-slate-900 !border-slate-200 dark:!border-slate-800 !shadow-lg !rounded-xl" />
            <MiniMap
              className="!bg-white dark:!bg-slate-900 !border-slate-200 dark:!border-slate-800 !rounded-xl !shadow-lg"
              nodeColor={(node) => {
                if (node.data?.type === 'trigger') return '#10b981';
                if (node.data?.type === 'condition') return '#f59e0b';
                if (node.data?.type === 'action') return '#6366f1';
                return '#94a3b8';
              }}
            />
          </ReactFlow>
        </div>
      </div>

      {/* Right Node Inspector Drawer */}
      {selectedNode && (
        <WorkflowInspector
          selectedNode={selectedNode}
          onClose={() => setSelectedNode(null)}
          onUpdateNode={handleUpdateNode}
          onDeleteNode={handleDeleteNode}
        />
      )}
    </div>
  );
};
