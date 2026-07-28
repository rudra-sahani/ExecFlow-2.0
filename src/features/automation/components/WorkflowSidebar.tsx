import React, { useState } from 'react';
import { Zap, Brain, Globe, Layers } from 'lucide-react';
import { TriggerPanel } from './TriggerPanel';
import { ConditionPanel } from './ConditionPanel';
import { ActionPanel } from './ActionPanel';
import {
  WorkflowTriggerDefinition,
  WorkflowConditionDefinition,
  WorkflowActionDefinition,
} from '../../../types/automation';
import { cn } from '../../../lib/cn';

interface WorkflowSidebarProps {
  onAddTrigger: (trigger: WorkflowTriggerDefinition) => void;
  onAddCondition: (condition: WorkflowConditionDefinition) => void;
  onAddAction: (action: WorkflowActionDefinition) => void;
}

export const WorkflowSidebar: React.FC<WorkflowSidebarProps> = ({
  onAddTrigger,
  onAddCondition,
  onAddAction,
}) => {
  const [activeTab, setActiveTab] = useState<'triggers' | 'conditions' | 'actions'>('triggers');

  return (
    <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/90 flex flex-col h-full overflow-hidden shadow-xs shrink-0">
      {/* Toolbox Header */}
      <div className="p-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Automation Toolbox
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Click to add nodes onto the workflow canvas
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="grid grid-cols-3 p-1.5 gap-1 bg-slate-100/80 dark:bg-slate-800/60 m-3 rounded-xl">
        <button
          onClick={() => setActiveTab('triggers')}
          className={cn(
            'flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-bold rounded-lg transition-all',
            activeTab === 'triggers'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          )}
        >
          <Zap className="w-3.5 h-3.5" /> Triggers
        </button>

        <button
          onClick={() => setActiveTab('conditions')}
          className={cn(
            'flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-bold rounded-lg transition-all',
            activeTab === 'conditions'
              ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          )}
        >
          <Brain className="w-3.5 h-3.5" /> Conditions
        </button>

        <button
          onClick={() => setActiveTab('actions')}
          className={cn(
            'flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-bold rounded-lg transition-all',
            activeTab === 'actions'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          )}
        >
          <Globe className="w-3.5 h-3.5" /> Actions
        </button>
      </div>

      {/* Tab Panels */}
      <div className="p-3 flex-1 overflow-y-auto custom-scrollbar">
        {activeTab === 'triggers' && <TriggerPanel onAddTriggerNode={onAddTrigger} />}
        {activeTab === 'conditions' && <ConditionPanel onAddConditionNode={onAddCondition} />}
        {activeTab === 'actions' && <ActionPanel onAddActionNode={onAddAction} />}
      </div>
    </div>
  );
};
