import React, { useState } from 'react';
import { Search, Calendar, GitPullRequest, CheckSquare, Mail, MessageSquare, Users, Bell, Globe, Plus, Shield } from 'lucide-react';
import { WorkflowActionDefinition } from '../../../types/automation';
import { ACTION_DEFINITIONS } from '../../../services/automationService';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Calendar,
  GitPullRequest,
  CheckSquare,
  Mail,
  MessageSquare,
  Users,
  Bell,
  Globe,
};

interface ActionPanelProps {
  onAddActionNode: (action: WorkflowActionDefinition) => void;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({ onAddActionNode }) => {
  const [search, setSearch] = useState('');

  const filteredActions = ACTION_DEFINITIONS.filter(
    (a) =>
      a.label.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search integration actions..."
          className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        />
      </div>

      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
        {filteredActions.map((action) => {
          const Icon = ICON_MAP[action.iconName] || Globe;
          return (
            <div
              key={action.id}
              onClick={() => onAddActionNode(action)}
              className="group p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 hover:border-indigo-300 dark:hover:border-indigo-800 transition-all cursor-pointer flex items-start gap-3 shadow-xs hover:shadow-md"
            >
              <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {action.label}
                  </h5>
                  <Plus className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                  {action.description}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="px-1.5 py-0.2 text-[9px] font-semibold rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    {action.category}
                  </span>
                  {action.requiresApprovalByDefault && (
                    <span className="flex items-center gap-1 px-1.5 py-0.2 text-[9px] font-bold rounded bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                      <Shield className="w-2.5 h-2.5" /> Approval Gate
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
