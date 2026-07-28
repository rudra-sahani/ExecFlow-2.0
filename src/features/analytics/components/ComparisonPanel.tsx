import React from 'react';
import { ArrowLeftRight, TrendingUp, TrendingDown, CheckCircle2 } from 'lucide-react';
import { ComparisonState } from '../../../types/analytics';

interface ComparisonPanelProps {
  comparison: ComparisonState;
  onChange: (comparison: ComparisonState) => void;
}

export const ComparisonPanel: React.FC<ComparisonPanelProps> = ({
  comparison,
  onChange,
}) => {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/60 rounded-xl p-4 text-white shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <ArrowLeftRight className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Comparative Intelligence Mode</h3>
              <span className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full ${
                comparison.enabled ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
              }`}>
                {comparison.enabled ? 'Active Delta Comparison' : 'Disabled'}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Benchmark current performance metrics against historic periods or cross-functional teams
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={comparison.enabled}
              onChange={(e) => onChange({ ...comparison, enabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            <span className="ml-2 text-xs font-semibold text-slate-200">
              Enable Comparison
            </span>
          </label>

          {comparison.enabled && (
            <select
              value={comparison.type}
              onChange={(e) => onChange({ ...comparison, type: e.target.value as ComparisonState['type'] })}
              className="text-xs bg-slate-900/90 border border-indigo-500/40 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="previous_period">This Period vs Previous Period</option>
              <option value="team_vs_team">Core Platform Eng vs Security Infra</option>
              <option value="workspace_vs_workspace">Production vs AI Research Workspace</option>
            </select>
          )}
        </div>
      </div>

      {comparison.enabled && (
        <div className="mt-4 pt-3 border-t border-indigo-900/50 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block">Meeting Volume Delta</span>
            <div className="flex items-center gap-1.5 mt-1 font-semibold text-emerald-400">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
              <span>-12.4% shorter meetings</span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block">Task Resolution Velocity</span>
            <div className="flex items-center gap-1.5 mt-1 font-semibold text-emerald-400">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>+18.5% completion rate</span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block">AI Agent Confidence</span>
            <div className="flex items-center gap-1.5 mt-1 font-semibold text-emerald-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>+2.1% accuracy surge</span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block">Risk Incident Mitigation</span>
            <div className="flex items-center gap-1.5 mt-1 font-semibold text-indigo-300">
              <TrendingDown className="w-4 h-4 text-indigo-300" />
              <span>-35% open risks</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
