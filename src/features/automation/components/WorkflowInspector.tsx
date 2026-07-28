import React, { useState, useEffect } from 'react';
import {
  X,
  Sliders,
  Code2,
  Wrench,
  Shield,
  Trash2,
  Play,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Info,
} from 'lucide-react';
import { CustomWorkflowNode } from '../../../types/automation';
import { cn } from '../../../lib/cn';
import toast from 'react-hot-toast';

interface WorkflowInspectorProps {
  selectedNode: CustomWorkflowNode | null;
  onClose: () => void;
  onUpdateNode: (nodeId: string, updatedData: Partial<CustomWorkflowNode['data']>) => void;
  onDeleteNode: (nodeId: string) => void;
}

export const WorkflowInspector: React.FC<WorkflowInspectorProps> = ({
  selectedNode,
  onClose,
  onUpdateNode,
  onDeleteNode,
}) => {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [activeTab, setActiveTab] = useState<'config' | 'schema' | 'tool' | 'permissions'>('config');
  const [config, setConfig] = useState<Record<string, any>>({});
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    if (selectedNode) {
      setLabel(selectedNode.data.label || '');
      setDescription(selectedNode.data.description || '');
      setConfig(selectedNode.data.config || {});
    }
  }, [selectedNode]);

  if (!selectedNode) return null;

  const data = selectedNode.data;

  const handleSaveGeneral = () => {
    onUpdateNode(selectedNode.id, {
      label,
      description,
      config,
    });
    toast.success('Node configuration updated');
  };

  const handleTestNode = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      toast.success(`Node "${label}" executed test successfully! Expected status: 200 OK`);
    }, 1200);
  };

  return (
    <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-full shadow-2xl z-30 shrink-0">
      {/* Inspector Header */}
      <div className="p-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 shrink-0">
            <Sliders className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider truncate">
              Node Inspector
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              ID: {selectedNode.id} • Type: {data.type}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs Row */}
      <div className="grid grid-cols-4 p-1.5 gap-1 bg-slate-100/80 dark:bg-slate-800/60 m-3 rounded-xl text-[10px] font-bold">
        <button
          onClick={() => setActiveTab('config')}
          className={cn(
            'py-1.5 rounded-lg transition-all flex items-center justify-center gap-1',
            activeTab === 'config'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          )}
        >
          <Sliders className="w-3 h-3" /> Config
        </button>
        <button
          onClick={() => setActiveTab('schema')}
          className={cn(
            'py-1.5 rounded-lg transition-all flex items-center justify-center gap-1',
            activeTab === 'schema'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          )}
        >
          <Code2 className="w-3 h-3" /> Schema
        </button>
        <button
          onClick={() => setActiveTab('tool')}
          className={cn(
            'py-1.5 rounded-lg transition-all flex items-center justify-center gap-1',
            activeTab === 'tool'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          )}
        >
          <Wrench className="w-3 h-3" /> Tool
        </button>
        <button
          onClick={() => setActiveTab('permissions')}
          className={cn(
            'py-1.5 rounded-lg transition-all flex items-center justify-center gap-1',
            activeTab === 'permissions'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          )}
        >
          <Shield className="w-3 h-3" /> Rules
        </button>
      </div>

      {/* Inspector Body */}
      <div className="p-4 flex-1 overflow-y-auto space-y-4 custom-scrollbar text-xs">
        {activeTab === 'config' && (
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Node Title
              </label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Description / Intent
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              />
            </div>

            {/* Dynamic Config Key-Values */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>Parameters Configuration</span>
                <Sparkles className="w-3 h-3 text-indigo-500" />
              </h4>

              {Object.keys(config).length === 0 ? (
                <p className="text-[11px] text-slate-400 italic">No specific parameters configured for this node.</p>
              ) : (
                Object.entries(config).map(([key, val]) => (
                  <div key={key}>
                    <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5 capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <input
                      type="text"
                      value={typeof val === 'object' ? JSON.stringify(val) : String(val)}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 font-mono text-slate-800 dark:text-slate-200"
                    />
                  </div>
                ))
              )}
            </div>

            <button
              onClick={handleSaveGeneral}
              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              Apply Configurations
            </button>
          </div>
        )}

        {activeTab === 'schema' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-emerald-500" /> Expected Input Schema
              </h4>
              <div className="p-3 bg-slate-900 text-slate-200 font-mono text-[11px] rounded-xl overflow-x-auto border border-slate-800">
                <pre>
                  {JSON.stringify(
                    {
                      triggerId: 'mtg-8823',
                      meetingType: 'Sprint Planning',
                      transcript: 'Summary of sprint deliverables...',
                      extractedItems: 5,
                      confidenceScore: 94.2,
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-indigo-500" /> Expected Output Schema
              </h4>
              <div className="p-3 bg-slate-900 text-slate-200 font-mono text-[11px] rounded-xl overflow-x-auto border border-slate-800">
                <pre>
                  {JSON.stringify(
                    {
                      status: 'SUCCESS',
                      nodeExecuted: data.label,
                      timestamp: new Date().toISOString(),
                      outputPayload: {
                        createdCount: 4,
                        externalIds: ['EXEC-410', 'EXEC-411', 'EXEC-412'],
                      },
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tool' && (
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 space-y-1.5">
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h4 className="text-xs font-bold text-indigo-900 dark:text-indigo-300">
                  Linked Backend Engine
                </h4>
              </div>
              <p className="text-[11px] text-indigo-700 dark:text-indigo-400">
                {data.linkedTool || 'ExecFlow Tool Calling Execution Service'}
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Execution Timeout</h5>
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
                <span>Max Timeout Limit</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">30,000 ms</span>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Retry Policy</h5>
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
                <span>Max Automatic Retries</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">3 Retries</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-rose-500" /> Permission Matrix
              </h4>
              <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span>Execute Tool Calling Handler (`tool:execute`)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span>Access Meeting Transcripts (`meeting:read`)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span>Dispatch Integrations (`integration:write`)</span>
                </li>
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-[11px] text-amber-800 dark:text-amber-300 space-y-1">
              <div className="flex items-center gap-1 font-bold">
                <Info className="w-3.5 h-3.5" /> Human Approval Requirement
              </div>
              <p>
                If risk classification is HIGH or confidence is below threshold, an automatic Human Approval item will be queued.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Inspector Footer Actions */}
      <div className="p-4 border-t border-slate-200/80 dark:border-slate-800 space-y-2 bg-slate-50/50 dark:bg-slate-900/50">
        <button
          onClick={handleTestNode}
          disabled={isTesting}
          className="w-full py-2 rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-bold text-xs transition-colors flex items-center justify-center gap-2"
        >
          <Play className="w-3.5 h-3.5" /> {isTesting ? 'Simulating Node...' : 'Test Run Node Only'}
        </button>

        <button
          onClick={() => onDeleteNode(selectedNode.id)}
          className="w-full py-2 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-950/80 text-rose-600 dark:text-rose-400 font-bold text-xs transition-colors flex items-center justify-center gap-2"
        >
          <Trash2 className="w-3.5 h-3.5" /> Delete Node from Canvas
        </button>
      </div>
    </div>
  );
};
