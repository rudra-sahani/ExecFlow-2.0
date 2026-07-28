import React, { useState, useMemo } from 'react';
import { AgentLog } from '../types/agentMonitor';
import {
  Search as SearchIcon,
  Copy as CopyIcon,
  Download as DownloadIcon,
  Check as CheckIcon,
  Terminal as TerminalIcon,
  Trash2 as Trash2Icon,
} from 'lucide-react';

interface AgentLogsViewerProps {
  logs: AgentLog[];
  onClearLogs?: () => void;
}

export const AgentLogsViewer: React.FC<AgentLogsViewerProps> = ({ logs, onClearLogs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [copied, setCopied] = useState(false);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch =
        searchTerm === '' ||
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.agentName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = selectedLevel === 'ALL' || log.level === selectedLevel;
      return matchesSearch && matchesLevel;
    });
  }, [logs, searchTerm, selectedLevel]);

  const handleCopyLogs = () => {
    const text = filteredLogs.map((l) => `[${l.timestamp}] [${l.level}] [${l.agentName}]: ${l.message}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadLogs = () => {
    const text = filteredLogs.map((l) => `[${l.timestamp}] [${l.level}] [${l.agentName}]: ${l.message}`).join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `execflow-agent-logs-${Date.now()}.log`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
      {/* Terminal Toolbar */}
      <div className="p-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-emerald-400" />
          <span className="font-mono font-bold text-slate-200">Execution Telemetry Stream</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono text-[11px]">
            {filteredLogs.length} events
          </span>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search bar */}
          <div className="relative">
            <SearchIcon className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter logs..."
              className="pl-8 pr-3 py-1 bg-slate-950 text-slate-200 rounded border border-slate-800 text-xs focus:outline-none focus:border-blue-500 w-36 sm:w-48 font-mono"
            />
          </div>

          {/* Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-2 py-1 bg-slate-950 text-slate-200 rounded border border-slate-800 text-xs font-mono focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Levels</option>
            <option value="INFO">INFO</option>
            <option value="WARN">WARN</option>
            <option value="ERROR">ERROR</option>
            <option value="DEBUG">DEBUG</option>
          </select>

          {/* Action Buttons */}
          <button
            onClick={handleCopyLogs}
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Copy logs to clipboard"
          >
            {copied ? <CheckIcon className="w-3.5 h-3.5 text-emerald-400" /> : <CopyIcon className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleDownloadLogs}
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Download log file"
          >
            <DownloadIcon className="w-3.5 h-3.5" />
          </button>

          {onClearLogs && (
            <button
              onClick={onClearLogs}
              className="p-1.5 rounded bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition-colors"
              title="Clear terminal"
            >
              <Trash2Icon className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Terminal Log Output List */}
      <div className="flex-1 overflow-y-auto p-3 font-mono text-xs space-y-1.5 bg-slate-950 selection:bg-blue-600/40">
        {filteredLogs.length === 0 ? (
          <div className="p-8 text-center text-slate-600 font-mono">No telemetry events match your criteria.</div>
        ) : (
          filteredLogs.map((log) => {
            const levelColor =
              log.level === 'ERROR'
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                : log.level === 'WARN'
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                : log.level === 'DEBUG'
                ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                : 'bg-blue-500/20 text-blue-400 border-blue-500/30';

            return (
              <div key={log.id} className="flex items-start gap-2.5 leading-relaxed group hover:bg-slate-900/60 p-1 rounded transition-colors">
                <span className="text-slate-500 text-[11px] flex-shrink-0 select-none">{log.timestamp}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold border ${levelColor} flex-shrink-0`}>
                  {log.level}
                </span>
                <span className="text-indigo-400 font-semibold flex-shrink-0">[{log.agentName}]</span>
                <span className="text-slate-300 break-all">{log.message}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
