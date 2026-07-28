import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  MarkerType,
  BackgroundVariant,
  Panel,
} from '@xyflow/react';
import { AgentNodeComponent, CustomAgentNode } from './AgentNode';
import { AgentNodeData, GraphEdgeData } from '../types/agentMonitor';
import { Maximize2 as Maximize2Icon, RefreshCw as RefreshCwIcon, Layers as LayersIcon } from 'lucide-react';

interface ExecutionGraphProps {
  nodesData: AgentNodeData[];
  edgesData: GraphEdgeData[];
  selectedNodeId: string | null;
  onSelectNode: (node: AgentNodeData | null) => void;
  onRefreshGraph?: () => void;
}

const nodeTypes = {
  agentNode: AgentNodeComponent,
};

// Calculate horizontal auto-layout coordinates for 15 nodes in 6 logical layers
const computeAutoLayoutNodes = (nodesData: AgentNodeData[], selectedNodeId: string | null): CustomAgentNode[] => {
  // Layering map for horizontal DAG pipeline flow
  // Layer 0: Ingestion (node_1, node_2)
  // Layer 1: Diarization & Planner (node_3, node_4)
  // Layer 2: Extraction Parallel Sub-agents (node_5, node_6, node_7, node_8, node_9, node_10)
  // Layer 3: Memory Retrieval (node_11)
  // Layer 4: Reflection & Approval (node_12, node_13)
  // Layer 5: Tool Execution & Finalizer (node_14, node_15)

  const layerMap: Record<string, { layer: number; offset: number }> = {
    node_1: { layer: 0, offset: 0 },
    node_2: { layer: 0, offset: 1 },
    node_3: { layer: 1, offset: 0 },
    node_4: { layer: 1, offset: 1 },

    node_5: { layer: 2, offset: 0 },
    node_6: { layer: 2, offset: 1 },
    node_7: { layer: 2, offset: 2 },
    node_8: { layer: 2, offset: 3 },
    node_9: { layer: 2, offset: 4 },
    node_10: { layer: 2, offset: 5 },

    node_11: { layer: 3, offset: 0 },
    node_12: { layer: 4, offset: 0 },
    node_13: { layer: 4, offset: 1 },

    node_14: { layer: 5, offset: 0 },
    node_15: { layer: 5, offset: 1 },
  };

  const X_SPACING = 340;
  const Y_SPACING = 130;

  return nodesData.map((data, index) => {
    const layout = layerMap[data.id] || { layer: Math.floor(index / 2), offset: index % 2 };
    const x = layout.layer * X_SPACING + 50;
    const y = layout.offset * Y_SPACING + 50;

    return {
      id: data.id,
      type: 'agentNode',
      position: { x, y },
      data,
      selected: data.id === selectedNodeId,
    };
  });
};

const computeGraphEdges = (edgesData: GraphEdgeData[]): Edge[] => {
  return edgesData.map((e) => {
    const isActive = e.status === 'ACTIVE';
    const isCompleted = e.status === 'COMPLETED';

    return {
      id: e.id,
      source: e.source,
      target: e.target,
      type: 'smoothstep',
      animated: isActive || e.animated,
      label: e.label,
      style: {
        stroke: isActive ? '#3b82f6' : isCompleted ? '#10b981' : '#64748b',
        strokeWidth: isActive ? 2.5 : 1.5,
        strokeDasharray: isActive ? '5 5' : undefined,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 14,
        height: 14,
        color: isActive ? '#3b82f6' : isCompleted ? '#10b981' : '#64748b',
      },
    };
  });
};

export const ExecutionGraph: React.FC<ExecutionGraphProps> = ({
  nodesData,
  edgesData,
  selectedNodeId,
  onSelectNode,
  onRefreshGraph,
}) => {
  const initialNodes = useMemo(() => computeAutoLayoutNodes(nodesData, selectedNodeId), [nodesData, selectedNodeId]);
  const initialEdges = useMemo(() => computeGraphEdges(edgesData), [edgesData]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Sync internal flow state when props change
  React.useEffect(() => {
    setNodes(computeAutoLayoutNodes(nodesData, selectedNodeId));
  }, [nodesData, selectedNodeId, setNodes]);

  React.useEffect(() => {
    setEdges(computeGraphEdges(edgesData));
  }, [edgesData, setEdges]);

  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const match = nodesData.find((n) => n.id === node.id);
      onSelectNode(match || null);
    },
    [nodesData, onSelectNode]
  );

  const handlePaneClick = useCallback(() => {
    onSelectNode(null);
  }, [onSelectNode]);

  return (
    <div className="relative w-full h-[620px] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={1.5}
        colorMode="dark"
        defaultEdgeOptions={{ type: 'smoothstep' }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#334155" />
        <Controls
          className="!bg-slate-900 !border-slate-800 !text-slate-300 !rounded-lg shadow-xl"
          showInteractive={false}
        />
        <MiniMap
          nodeColor={(node) => {
            const status = ((node.data as unknown) as AgentNodeData)?.status;
            if (status === 'COMPLETED') return '#10b981';
            if (status === 'RUNNING') return '#3b82f6';
            if (status === 'FAILED') return '#ef4444';
            return '#475569';
          }}
          className="!bg-slate-900/90 !border-slate-800 !rounded-lg"
          zoomable
          pannable
        />

        {/* Floating Controls Overlay */}
        <Panel position="top-right" className="flex items-center gap-2">
          {onRefreshGraph && (
            <button
              onClick={onRefreshGraph}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-medium shadow-lg backdrop-blur-md transition-colors"
              title="Refresh Graph topology"
            >
              <RefreshCwIcon className="w-3.5 h-3.5 text-blue-400" />
              <span>Reset View</span>
            </button>
          )}
        </Panel>
      </ReactFlow>
    </div>
  );
};
