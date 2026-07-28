import React, { useState } from 'react';
import {
  History,
  CheckCircle2,
  AlertCircle,
  Clock,
  RotateCw,
  Search,
  Filter,
  Lock,
  ChevronRight,
  FileText,
  X,
} from 'lucide-react';
import { WorkflowExecution, AutomationLogEntry } from '../../../types/automation';
import { MOCK_EXECUTIONS } from '../../../services/automationService';
import { cn } from '../../../lib/cn';

export const ExecutionHistory: React.FC = () => {
  const [executions] = useState<WorkflowExecution[]>(MOCK_EXECUTIONS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedExecution, setSelectedExecution] = useState<WorkflowExecution | null>(null);

  const filtered = executions.filter((exec) => {
    const matchesSearch =
      exec.workflowName.toLowerCase().includes(search.toLowerCase()) ||
      exec.triggerEvent.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || exec.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search execution runs..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="all">All Execution Statuses</option>
            <option value="success">Success Only</option>
            <option value="awaiting_approval">Awaiting Approval</option>
            <option value="failed">Failed Runs</option>
          </select>
        </div>
      </div>

      {/* Execution History Table */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Workflow & Trigger</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Started At</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Actions Executed</th>
                <th className="py-3 px-4">Approvals</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filtered.map((exec) => (
                <tr
                  key={exec.id}
                  className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100">{exec.workflowName}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{exec.triggerEvent}</p>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    {exec.status === 'success' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 inline-flex items-center gap-1 border border-emerald-300 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Success
                      </span>
                    )}
                    {exec.status === 'awaiting_approval' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 inline-flex items-center gap-1 border border-rose-300 dark:border-rose-800 animate-pulse">
                        <Lock className="w-3 h-3 text-rose-500" /> Approval Gate
                      </span>
                    )}
                    {exec.status === 'failed' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 inline-flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Failed
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                    {new Date(exec.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                    {exec.durationMs} ms
                  </td>

                  <td className="py-3.5 px-4 font-bold text-slate-700 dark:text-slate-300">
                    {exec.actionsTriggered} Actions
                  </td>

                  <td className="py-3.5 px-4">
                    {exec.approvalsTriggered > 0 ? (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                        {exec.approvalsTriggered} Gate
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">Auto</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedExecution(exec)}
                      className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:border-indigo-300 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors inline-flex items-center gap-1"
                    >
                      Inspect Logs <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Execution Inspection Modal */}
      {selectedExecution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Execution Log Telemetry: {selectedExecution.workflowName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedExecution(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-3 custom-scrollbar flex-1 bg-slate-950 text-slate-200 font-mono text-xs">
              {selectedExecution.logs.map((log) => (
                <div key={log.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="text-emerald-400 uppercase font-bold">[{log.level}]</span>
                    <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-slate-200">{log.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
