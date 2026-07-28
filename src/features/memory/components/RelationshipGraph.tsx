import React, { useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { RelationshipGraphData, GraphNode } from '../types/memoryExplorer';
import {
  Users,
  Video,
  Briefcase,
  AlertTriangle,
  ListTodo,
  CheckCircle2,
  Share2,
} from 'lucide-react';

interface RelationshipGraphProps {
  graphData: RelationshipGraphData;
  onSelectEntity?: (entity: GraphNode) => void;
}

// Custom Node Component
const KnowledgeNodeComponent: React.FC<{ data: Record<string, unknown> }> = ({ data }) => {
  const nodeData = data as unknown as GraphNode;
  const getIcon = () => {
    switch (nodeData.type) {
      case 'MEETING':
        return <Video className="w-4 h-4 text-[#39FF14]" />;
      case 'PERSON':
        return <Users className="w-4 h-4 text-[#7CB518]" />;
      case 'PROJECT':
        return <Briefcase className="w-4 h-4 text-[#95D600]" />;
      case 'RISK':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'TASK':
        return <ListTodo className="w-4 h-4 text-[#39FF14]" />;
      case 'DECISION':
        return <CheckCircle2 className="w-4 h-4 text-[#7CB518]" />;
    }
  };

  const getBorderColor = () => {
    return 'border-[#7CB518]/40 bg-[#0F1110] text-white';
  };

  return (
    <div
      className={`px-3 py-2 rounded-lg border shadow-md hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer font-mono ${getBorderColor()}`}
    >
      <Handle type="target" position={Position.Top} className="!bg-[#7CB518]" />
      <div className="p-1.5 rounded-lg bg-[#050505] flex items-center justify-center border border-[#7CB518]/20">
        {getIcon()}
      </div>
      <div className="text-left font-mono">
        <div className="text-xs font-bold text-white line-clamp-1">
          {nodeData.label}
        </div>
        <div className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider font-mono">
          {nodeData.type}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-[#7CB518]" />
    </div>
  );
};

const nodeTypes = {
  knowledgeNode: KnowledgeNodeComponent,
};

export const RelationshipGraph: React.FC<RelationshipGraphProps> = ({
  graphData,
  onSelectEntity,
}) => {
  // Map graphData nodes to ReactFlow nodes
  const initialNodes: Node[] = useMemo(() => {
    const layoutPositions: Record<string, { x: number; y: number }> = {
      node_mtg1: { x: 300, y: 150 },
      node_usr1: { x: 80, y: 50 },
      node_usr2: { x: 520, y: 50 },
      node_usr3: { x: 80, y: 280 },
      node_prj1: { x: 300, y: 10 },
      node_dec1: { x: 520, y: 280 },
      node_rsk1: { x: 300, y: 320 },
      node_tsk1: { x: 80, y: 400 },
    };

    return graphData.nodes.map((n, idx) => ({
      id: n.id,
      type: 'knowledgeNode',
      position: layoutPositions[n.id] || {
        x: (idx % 3) * 220 + 100,
        y: Math.floor(idx / 3) * 140 + 80,
      },
      data: n as unknown as Record<string, unknown>,
    }));
  }, [graphData.nodes]);

  const initialEdges: Edge[] = useMemo(() => {
    return graphData.edges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      label: e.label,
      animated: e.animated ?? true,
      style: { stroke: '#7CB518', strokeWidth: 2 },
      labelStyle: { fill: '#39FF14', fontWeight: 600, fontSize: 10, fontFamily: 'monospace' },
    }));
  }, [graphData.edges]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="bg-[#0F1110] rounded-xl border border-[#7CB518]/30 p-5 shadow-sm space-y-4 font-mono text-white">
      <div className="flex items-center justify-between pb-3 border-b border-[#7CB518]/15 font-mono">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider font-mono">
            <Share2 className="w-4 h-4 text-[#39FF14]" />
            <span>Interactive Entity Relationship Graph</span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5 font-mono">
            Visual map connecting meetings, team leads, projects, identified risks, tasks, and decisions
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold font-mono">
          <span className="flex items-center gap-1 text-[#39FF14]">
            <span className="w-2 h-2 rounded-full bg-[#39FF14]" /> Meeting
          </span>
          <span className="flex items-center gap-1 text-[#7CB518]">
            <span className="w-2 h-2 rounded-full bg-[#7CB518]" /> Person
          </span>
          <span className="flex items-center gap-1 text-[#95D600]">
            <span className="w-2 h-2 rounded-full bg-[#95D600]" /> Project
          </span>
          <span className="flex items-center gap-1 text-amber-500">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Risk
          </span>
          <span className="flex items-center gap-1 text-[#39FF14]">
            <span className="w-2 h-2 rounded-full bg-[#39FF14]" /> Decision
          </span>
        </div>
      </div>

      <div className="w-full h-[450px] bg-[#050505] rounded-lg border border-[#7CB518]/20 relative overflow-hidden font-mono">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          onNodeClick={(_, node) => {
            if (onSelectEntity) {
              onSelectEntity(node.data as unknown as GraphNode);
            }
          }}
          fitView
          attributionPosition="bottom-right"
        >
          <Background color="#7CB518" gap={16} size={1} />
          <Controls className="bg-[#0F1110] border border-[#7CB518]/30 text-white shadow-md rounded-lg font-mono" />
          <MiniMap
            nodeColor={(node) => {
              const type = (node.data as unknown as GraphNode)?.type;
              if (type === 'MEETING') return '#39FF14';
              if (type === 'PERSON') return '#7CB518';
              if (type === 'PROJECT') return '#95D600';
              if (type === 'RISK') return '#f59e0b';
              if (type === 'DECISION') return '#39FF14';
              return '#7CB518';
            }}
            className="bg-[#0F1110] border border-[#7CB518]/30 rounded-lg"
          />
        </ReactFlow>
      </div>
    </div>
  );
};
