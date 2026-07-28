import React, { useState } from 'react';
import { X, Search, Video, CheckSquare, ShieldAlert, Cpu, FileText, ChevronRight, Sparkles } from 'lucide-react';
import { DrillDownItem } from '../../../types/analytics';

interface DrillDownDrawerProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  items?: DrillDownItem[];
}

export const DrillDownDrawer: React.FC<DrillDownDrawerProps> = ({
  isOpen,
  title,
  onClose,
  items = [],
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'meetings' | 'tasks' | 'risks' | 'evidence'>('all');

  if (!isOpen) return null;

  // Generate rich mock/real drill-down items if empty
  const displayItems: DrillDownItem[] = items.length > 0 ? items : [
    {
      id: 'dd-1',
      title: 'Q3 Autonomous AI Platform Architecture Sync',
      date: '2026-07-24',
      type: 'meeting',
      status: 'PROCESSED',
      owner: 'Alex Chen',
      confidence: 0.98,
      details: 'Evaluated sub-agent orchestrator pipeline. Extracted 4 tasks and 1 infrastructure risk regarding vector retrieval latency.',
      evidenceSnippet: 'Alex Chen (00:14:20): "Regarding Q3 execution, we must enforce strict human-in-the-loop authorization bounds and maintain sub-150ms vector index retrieval latency."',
      tags: ['Architecture', 'Sub-Agents', 'Vector Search'],
    },
    {
      id: 'dd-2',
      title: 'Implement Human-in-the-Loop Approval Boundary for High-Risk Tools',
      date: '2026-07-24',
      type: 'task',
      status: 'COMPLETED',
      owner: 'Sarah Jenkins',
      confidence: 0.96,
      details: 'Configured Express backend middleware to validate JWT authorization headers before dispatching tool operations.',
      tags: ['Security', 'Approval Workflow'],
    },
    {
      id: 'dd-3',
      title: 'Vector Search Index Sharding Under Heavy Concurrent Ingestion',
      date: '2026-07-23',
      type: 'risk',
      status: 'OPEN',
      owner: 'Elena Rostova',
      confidence: 0.94,
      details: 'High severity risk identified: Pinecone / Firestore index lock contention under >500 concurrent meeting transcript segment streams.',
      evidenceSnippet: 'Sarah Jenkins (00:28:45): "Security audit confirmed SOC-2 compliance requirements depend on explicit RBAC controls for autonomous agent tools."',
      tags: ['High Severity', 'Infrastructure'],
    },
    {
      id: 'dd-4',
      title: 'Executive AI Strategy & Resource Allocation Review',
      date: '2026-07-22',
      type: 'meeting',
      status: 'PROCESSED',
      owner: 'Michael Vance',
      confidence: 0.97,
      details: 'Reviewed Q3 headcount & budget allocation across Core Platform Eng and AI Research teams.',
      tags: ['Executive', 'Budget'],
    },
  ];

  const filteredItems = displayItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.owner && item.owner.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'meetings') return matchesSearch && item.type === 'meeting';
    if (activeTab === 'tasks') return matchesSearch && item.type === 'task';
    if (activeTab === 'risks') return matchesSearch && item.type === 'risk';
    return matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end transition-opacity">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {title}
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Underlying meeting records, extracted tasks, risk logs & transcript evidence
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Tabs */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-3 bg-white dark:bg-slate-900">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search evidence, title, or assignee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              All Items ({displayItems.length})
            </button>
            <button
              onClick={() => setActiveTab('meetings')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                activeTab === 'meetings'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              Meetings
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                activeTab === 'tasks'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              Tasks
            </button>
            <button
              onClick={() => setActiveTab('risks')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                activeTab === 'risks'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              Risks
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No matching drill-down evidence found.
            </div>
          ) : (
            filteredItems.map((item) => {
              const Icon =
                item.type === 'meeting'
                  ? Video
                  : item.type === 'task'
                  ? CheckSquare
                  : item.type === 'risk'
                  ? ShieldAlert
                  : FileText;

              return (
                <div
                  key={item.id}
                  className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl p-4 space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          {item.date} • Owner: {item.owner || 'AI Sub-Agent'}
                        </span>
                      </div>
                    </div>

                    {item.confidence && (
                      <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
                        {(item.confidence * 100).toFixed(0)}% AI Match
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.details}
                  </p>

                  {item.evidenceSnippet && (
                    <div className="p-2.5 rounded-lg bg-slate-900 text-slate-200 font-mono text-[11px] border border-slate-800 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-indigo-400 block">
                        Transcript Verification Grounding
                      </span>
                      <p className="italic">"{item.evidenceSnippet}"</p>
                    </div>
                  )}

                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
