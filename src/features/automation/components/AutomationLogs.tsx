import React, { useState } from 'react';
import {
  FileText,
  Search,
  Download,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldAlert,
  ArrowDown,
} from 'lucide-react';
import { AutomationLogEntry } from '../../../types/automation';
import { MOCK_EXECUTIONS } from '../../../services/automationService';
import { cn } from '../../../lib/cn';
import toast from 'react-hot-toast';

export const AutomationLogs: React.FC = () => {
  const allLogs: AutomationLogEntry[] = MOCK_EXECUTIONS.flatMap((exec) => exec.logs);

  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');

  const filteredLogs = allLogs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(search.toLowerCase()) ||
      log.workflowName.toLowerCase().includes(search.toLowerCase()) ||
      (log.nodeLabel && log.nodeLabel.toLowerCase().includes(search.toLowerCase()));
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const handleDownloadLogs = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `automation-logs-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success('Downloaded logs JSON file!');
  };

  return (
    <div className="space-y-6">
      {/* Search & Download Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search log messages or node labels..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="all">All Log Levels</option>
              <option value="info">INFO</option>
              <option value="success">SUCCESS</option>
              <option value="warn">WARN</option>
              <option value="error">ERROR</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleDownloadLogs}
          className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors flex items-center gap-2 shrink-0"
        >
          <Download className="w-4 h-4" /> Download Logs JSON
        </button>
      </div>

      {/* Terminal View */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 shadow-xl space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar">
        {filteredLogs.length === 0 ? (
          <p className="text-slate-500 italic text-center py-12">No automation log entries match your search query.</p>
        ) : (
          filteredLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 transition-colors space-y-1.5"
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-1">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'font-bold uppercase px-1.5 py-0.2 rounded',
                      log.level === 'info' && 'bg-indigo-950 text-indigo-400 border border-indigo-800',
                      log.level === 'success' && 'bg-emerald-950 text-emerald-400 border border-emerald-800',
                      log.level === 'warn' && 'bg-amber-950 text-amber-400 border border-amber-800',
                      log.level === 'error' && 'bg-rose-950 text-rose-400 border border-rose-800'
                    )}
                  >
                    [{log.level}]
                  </span>
                  <span className="font-bold text-slate-300">{log.workflowName}</span>
                  {log.nodeLabel && <span className="text-slate-500">• Node: {log.nodeLabel}</span>}
                </div>

                <span className="text-slate-500">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>

              <p className="text-slate-200 leading-relaxed font-mono">{log.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
