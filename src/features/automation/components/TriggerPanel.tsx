import React, { useState } from 'react';
import { Search, Video, ShieldCheck, PlusSquare, CheckCircle2, ShieldAlert, FileCheck, Play, CalendarClock, Plus } from 'lucide-react';
import { WorkflowTriggerDefinition } from '../../../types/automation';
import { TRIGGER_DEFINITIONS } from '../../../services/automationService';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Video,
  ShieldCheck,
  PlusSquare,
  CheckCircle2,
  ShieldAlert,
  FileCheck,
  Play,
  CalendarClock,
};

interface TriggerPanelProps {
  onAddTriggerNode: (trigger: WorkflowTriggerDefinition) => void;
}

export const TriggerPanel: React.FC<TriggerPanelProps> = ({ onAddTriggerNode }) => {
  const [search, setSearch] = useState('');

  const filteredTriggers = TRIGGER_DEFINITIONS.filter(
    (t) =>
      t.label.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search triggers..."
          className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
        />
      </div>

      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
        {filteredTriggers.map((trigger) => {
          const Icon = ICON_MAP[trigger.iconName] || Video;
          return (
            <div
              key={trigger.id}
              onClick={() => onAddTriggerNode(trigger)}
              className="group p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 hover:border-emerald-300 dark:hover:border-emerald-800 transition-all cursor-pointer flex items-start gap-3 shadow-xs hover:shadow-md"
            >
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {trigger.label}
                  </h5>
                  <Plus className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                  {trigger.description}
                </p>
                <span className="inline-block mt-1.5 px-1.5 py-0.2 text-[9px] font-semibold rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  {trigger.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
