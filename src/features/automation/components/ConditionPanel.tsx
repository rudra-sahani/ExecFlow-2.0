import React, { useState } from 'react';
import { Search, Brain, AlertTriangle, UserCheck, ShieldCheck, Clock, Tag, Plus } from 'lucide-react';
import { WorkflowConditionDefinition } from '../../../types/automation';
import { CONDITION_DEFINITIONS } from '../../../services/automationService';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Brain,
  AlertTriangle,
  UserCheck,
  ShieldCheck,
  Clock,
  Tag,
};

interface ConditionPanelProps {
  onAddConditionNode: (condition: WorkflowConditionDefinition) => void;
}

export const ConditionPanel: React.FC<ConditionPanelProps> = ({ onAddConditionNode }) => {
  const [search, setSearch] = useState('');

  const filteredConditions = CONDITION_DEFINITIONS.filter(
    (c) =>
      c.label.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search condition rules..."
          className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
        />
      </div>

      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
        {filteredConditions.map((condition) => {
          const Icon = ICON_MAP[condition.iconName] || Brain;
          return (
            <div
              key={condition.id}
              onClick={() => onAddConditionNode(condition)}
              className="group p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:bg-amber-50/50 dark:hover:bg-amber-950/30 hover:border-amber-300 dark:hover:border-amber-800 transition-all cursor-pointer flex items-start gap-3 shadow-xs hover:shadow-md"
            >
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {condition.label}
                  </h5>
                  <Plus className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity text-amber-600" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                  {condition.description}
                </p>
                <span className="inline-block mt-1.5 px-1.5 py-0.2 text-[9px] font-semibold rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  {condition.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
