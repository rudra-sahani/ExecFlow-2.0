import React, { useState } from 'react';
import {
  Zap,
  Rocket,
  Calendar,
  ShieldAlert,
  Users,
  GitPullRequest,
  AlertOctagon,
  ArrowRight,
  Clock,
  Layers,
  Sparkles,
} from 'lucide-react';
import { WorkflowTemplate } from '../../../types/automation';
import { WORKFLOW_TEMPLATES } from '../../../services/automationService';
import { cn } from '../../../lib/cn';
import toast from 'react-hot-toast';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Zap,
  Rocket,
  Calendar,
  ShieldAlert,
  Users,
  GitPullRequest,
  AlertOctagon,
};

interface WorkflowTemplatesProps {
  onSelectTemplate: (template: WorkflowTemplate) => void;
}

export const WorkflowTemplates: React.FC<WorkflowTemplatesProps> = ({ onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    'all',
    'Sprint Planning',
    'Project Kickoff',
    'Weekly Stand-up',
    'Risk Escalation',
    'Client Follow-up',
    'Release Meeting',
    'Incident Review',
  ];

  const filteredTemplates = WORKFLOW_TEMPLATES.filter(
    (t) => selectedCategory === 'all' || t.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* Categories Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              'px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border',
              selectedCategory === cat
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            )}
          >
            {cat === 'all' ? 'All Templates' : cat}
          </button>
        ))}
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTemplates.map((template) => {
          const IconComponent = ICON_MAP[template.iconName] || Zap;

          return (
            <div
              key={template.id}
              className="group p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    {template.badgeText}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="flex items-center gap-1 font-medium">
                    <Layers className="w-3.5 h-3.5 text-indigo-500" /> {template.nodesCount} Nodes
                  </span>
                  <span className="flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
                    <Clock className="w-3.5 h-3.5" /> Save ~{template.estimatedTimeSavedMinutes}m / mtg
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    onSelectTemplate(template);
                    toast.success(`Loaded template: ${template.name}`);
                  }}
                  className="w-full py-2 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                >
                  <span>Use Template</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
