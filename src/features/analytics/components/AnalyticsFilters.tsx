import React from 'react';
import { Filter, RotateCcw, Calendar, Building2, Users, ShieldAlert, Cpu, User } from 'lucide-react';
import { AnalyticsFilterState } from '../../../types/analytics';

interface AnalyticsFiltersProps {
  filters: AnalyticsFilterState;
  onChange: (filters: AnalyticsFilterState) => void;
  onReset: () => void;
}

export const AnalyticsFilters: React.FC<AnalyticsFiltersProps> = ({
  filters,
  onChange,
  onReset,
}) => {
  const activeCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'dateRange') return value !== '30d';
    return value !== 'all';
  }).length;

  const handleFieldChange = (field: keyof AnalyticsFilterState, value: string) => {
    onChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Filter className="w-4 h-4" />
          </div>
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Executive Filters
          </span>
          {activeCount > 0 && (
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-100 dark:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300">
              {activeCount} active
            </span>
          )}
        </div>

        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {/* Date Range */}
        <div className="space-y-1">
          <label className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Calendar className="w-3 h-3" /> Time Horizon
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleFieldChange('dateRange', e.target.value)}
            className="w-full text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="year">Past Year</option>
          </select>
        </div>

        {/* Workspace */}
        <div className="space-y-1">
          <label className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Building2 className="w-3 h-3" /> Workspace
          </label>
          <select
            value={filters.workspace}
            onChange={(e) => handleFieldChange('workspace', e.target.value)}
            className="w-full text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="all">All Workspaces</option>
            <option value="prod">Production Engineering</option>
            <option value="ai-lab">AI Research Lab</option>
            <option value="exec">Executive Office</option>
          </select>
        </div>

        {/* Meeting Type */}
        <div className="space-y-1">
          <label className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Users className="w-3 h-3" /> Meeting Type
          </label>
          <select
            value={filters.meetingType}
            onChange={(e) => handleFieldChange('meetingType', e.target.value)}
            className="w-full text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="all">All Types</option>
            <option value="architecture">Architecture Review</option>
            <option value="sprint">Sprint Planning</option>
            <option value="security">Security Audit</option>
            <option value="executive">Executive Sync</option>
          </select>
        </div>

        {/* Team */}
        <div className="space-y-1">
          <label className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Users className="w-3 h-3" /> Department / Team
          </label>
          <select
            value={filters.team}
            onChange={(e) => handleFieldChange('team', e.target.value)}
            className="w-full text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="all">All Teams</option>
            <option value="eng">Core Platform Eng</option>
            <option value="ai">Product & AI Systems</option>
            <option value="sec">Security & Infra</option>
            <option value="exec">Executive Board</option>
          </select>
        </div>

        {/* Owner */}
        <div className="space-y-1">
          <label className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            <User className="w-3 h-3" /> Lead / Owner
          </label>
          <select
            value={filters.owner}
            onChange={(e) => handleFieldChange('owner', e.target.value)}
            className="w-full text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="all">All Owners</option>
            <option value="alex">Alex Chen</option>
            <option value="sarah">Sarah Jenkins</option>
            <option value="michael">Michael Vance</option>
            <option value="elena">Elena Rostova</option>
          </select>
        </div>

        {/* Risk Level */}
        <div className="space-y-1">
          <label className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            <ShieldAlert className="w-3 h-3" /> Risk Severity
          </label>
          <select
            value={filters.riskLevel}
            onChange={(e) => handleFieldChange('riskLevel', e.target.value)}
            className="w-full text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="all">All Severities</option>
            <option value="HIGH">High Severity</option>
            <option value="MEDIUM">Medium Severity</option>
            <option value="LOW">Low Severity</option>
          </select>
        </div>

        {/* Agent */}
        <div className="space-y-1">
          <label className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Cpu className="w-3 h-3" /> Agent Subsystem
          </label>
          <select
            value={filters.agent}
            onChange={(e) => handleFieldChange('agent', e.target.value)}
            className="w-full text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="all">All Autonomous Agents</option>
            <option value="planner">Planner Agent</option>
            <option value="understanding">Understanding Agent</option>
            <option value="tasks">Task Extraction Agent</option>
            <option value="decisions">Decision Extraction Agent</option>
            <option value="risks">Risk Detection Agent</option>
            <option value="reflection">Reflection Agent</option>
          </select>
        </div>
      </div>
    </div>
  );
};
