import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Zap,
  Sparkles,
  Layers,
  History,
  ShieldCheck,
  FileText,
  BarChart2,
  Plus,
  RefreshCw,
  AlertCircle,
  Play,
  Download,
} from 'lucide-react';
import { automationService } from '../../../services/automationService';
import { Workflow, WorkflowTemplate } from '../../../types/automation';
import {
  WorkflowCanvas,
  WorkflowTemplates,
  ExecutionHistory,
  ApprovalRules,
  AutomationLogs,
  AutomationMetrics,
  SimulationMode,
  WorkflowSkeleton,
} from '../components';
import { cn } from '../../../lib/cn';
import toast from 'react-hot-toast';

export const AutomationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'canvas' | 'templates' | 'executions' | 'approval' | 'logs' | 'metrics'>('canvas');
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [showSimulationModal, setShowSimulationModal] = useState(false);

  const { data: workflows = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['automationWorkflows'],
    queryFn: () => automationService.getWorkflows(),
    staleTime: 1000 * 60 * 5,
  });

  // Default to first workflow when loaded
  const currentWorkflow = selectedWorkflow || workflows[0];

  const handleSelectTemplate = (template: WorkflowTemplate) => {
    const newWf: Workflow = {
      id: `wf-custom-${Date.now()}`,
      name: template.name,
      description: template.description,
      category: template.category,
      status: 'active',
      version: '1.0.0',
      nodes: template.workflowData.nodes,
      edges: template.workflowData.edges,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      successRate: 100,
      executionCount: 0,
      averageDurationMs: 1500,
      requiresApproval: template.workflowData.requiresApproval,
      createdBy: { id: 'usr-me', name: 'Executive User' },
      tags: template.workflowData.tags,
    };

    setSelectedWorkflow(newWf);
    setActiveTab('canvas');
    toast.success(`Loaded template "${template.name}" into canvas!`);
  };

  const handleCreateNewWorkflow = () => {
    const blankWorkflow: Workflow = {
      id: `wf-new-${Date.now()}`,
      name: 'Untitled Automation Workflow',
      description: 'Custom AI event trigger and action dispatch workflow.',
      category: 'Utility',
      status: 'draft',
      version: '1.0.0',
      nodes: [
        {
          id: 'node-1',
          type: 'custom',
          position: { x: 150, y: 150 },
          data: {
            label: 'Meeting Completed',
            description: 'Trigger when transcript processing finishes',
            type: 'trigger',
            category: 'Meetings',
            iconName: 'Video',
            config: {},
          },
        },
      ],
      edges: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      successRate: 100,
      executionCount: 0,
      averageDurationMs: 1200,
      createdBy: { id: 'usr-me', name: 'Executive User' },
      tags: ['Custom'],
    };

    setSelectedWorkflow(blankWorkflow);
    setActiveTab('canvas');
    toast.success('Created new blank canvas workflow');
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Zap className="w-6 h-6 text-indigo-600" /> AI Automation Center
            </h1>
            <p className="text-xs text-slate-500">Loading live workflow canvas and telemetry...</p>
          </div>
        </div>
        <WorkflowSkeleton />
      </div>
    );
  }

  if (isError || !currentWorkflow) {
    return (
      <div className="p-12 max-w-xl mx-auto text-center space-y-4">
        <div className="p-3 bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Unable to load Automation Workflows</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Failed to fetch workflow graph data from backend service.
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 pb-20">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-md">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                  AI Automation Engine & Workflow Builder
                </h1>
                <span className="px-2 py-0.5 text-[10px] uppercase font-black tracking-wider rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-500" /> Active Service
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Visual node graph workflow builder, trigger dispatchers, simulation dry-runs, and governance approval gates
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSimulationModal(true)}
            className="px-3.5 py-2 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900 text-purple-700 dark:text-purple-300 font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-purple-500" /> Simulation Mode
          </button>

          <button
            onClick={handleCreateNewWorkflow}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> New Workflow
          </button>

          <button
            onClick={() => refetch()}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Refresh Service Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Feature Tabs Navigation */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab('canvas')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap',
            activeTab === 'canvas'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          )}
        >
          <Zap className="w-4 h-4" /> Builder Canvas
        </button>

        <button
          onClick={() => setActiveTab('templates')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap',
            activeTab === 'templates'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          )}
        >
          <Layers className="w-4 h-4" /> Workflow Templates
        </button>

        <button
          onClick={() => setActiveTab('executions')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap',
            activeTab === 'executions'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          )}
        >
          <History className="w-4 h-4" /> Execution History
        </button>

        <button
          onClick={() => setActiveTab('approval')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap',
            activeTab === 'approval'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          )}
        >
          <ShieldCheck className="w-4 h-4" /> Approval Rules
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap',
            activeTab === 'logs'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          )}
        >
          <FileText className="w-4 h-4" /> Real-time Logs
        </button>

        <button
          onClick={() => setActiveTab('metrics')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap',
            activeTab === 'metrics'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          )}
        >
          <BarChart2 className="w-4 h-4" /> Telemetry Metrics
        </button>
      </div>

      {/* Main Active Tab Content View */}
      {activeTab === 'canvas' && (
        <WorkflowCanvas
          workflow={currentWorkflow}
          onSaveWorkflow={(updated) => setSelectedWorkflow(updated)}
          onRunSimulation={() => setShowSimulationModal(true)}
        />
      )}

      {activeTab === 'templates' && (
        <WorkflowTemplates onSelectTemplate={handleSelectTemplate} />
      )}

      {activeTab === 'executions' && <ExecutionHistory />}

      {activeTab === 'approval' && <ApprovalRules />}

      {activeTab === 'logs' && <AutomationLogs />}

      {activeTab === 'metrics' && <AutomationMetrics />}

      {/* Simulation Modal */}
      {showSimulationModal && (
        <SimulationMode
          workflow={currentWorkflow}
          onClose={() => setShowSimulationModal(false)}
        />
      )}
    </div>
  );
};
