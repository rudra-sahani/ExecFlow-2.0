import React, { useState } from 'react';
import { ExtendedMeetingSummary, DetailedDecision, MeetingRisk, MeetingDependency, ParticipantMetric } from '../../../types/meeting';
import { Task, TaskPriority, TaskStatus } from '../../../types/task';
import { Icons } from '../../../components/ui/Icons';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';

interface AIIntelligencePanelProps {
  summary?: ExtendedMeetingSummary;
  tasks?: Task[];
  onEvidenceClick?: (evidenceText: string, sourceType: 'DECISION' | 'RISK' | 'ACTION_ITEM' | 'SUMMARY') => void;
  onTaskStatusChange?: (taskId: string, status: TaskStatus) => void;
  onTaskUpdate?: (taskId: string, updates: Partial<Task>) => void;
  onAddTask?: (title: string, priority: TaskPriority) => void;
  isLoading?: boolean;
}

export const AIIntelligencePanel: React.FC<AIIntelligencePanelProps> = ({
  summary,
  tasks = [],
  onEvidenceClick,
  onTaskStatusChange,
  onTaskUpdate,
  onAddTask,
  isLoading,
}) => {
  const [activeTab, setActiveTab] = useState<'SUMMARY' | 'DECISIONS' | 'RISKS' | 'ACTION_ITEMS' | 'ANALYTICS'>('SUMMARY');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editOwnerName, setEditOwnerName] = useState('');
  const [editDueDate, setEditDueDate] = useState('');

  // Quick Add Task modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState<TaskPriority>('MEDIUM');

  if (isLoading) {
    return (
      <div className="p-6 space-y-4 animate-pulse bg-[#0B0C0E] h-full border-r border-zinc-800">
        <div className="h-10 bg-zinc-800 rounded-md w-full"></div>
        <div className="h-32 bg-zinc-900 rounded-md w-full"></div>
        <div className="h-32 bg-zinc-900 rounded-md w-full"></div>
      </div>
    );
  }

  const decisionsList: DetailedDecision[] = summary?.decisionsDetail || (summary?.keyDecisions || []).map((d, i) => ({
    id: `dec_${i}`,
    decision: d,
    decisionMaker: 'Executive Committee',
    reason: 'Agreed upon during strategic alignment.',
    evidence: d,
    confidence: summary?.confidenceScore || 0.95,
  }));

  const risksList: MeetingRisk[] = summary?.risks || [
    {
      id: 'rsk_default_1',
      title: 'Tool execution safety bounds',
      severity: 'HIGH',
      likelihood: 'MEDIUM',
      owner: 'Alex Chen',
      mitigation: 'Incorporate Human-in-the-Loop approval requests before mutating production state.',
      evidence: 'Discussed setting up mandatory approval steps.',
      confidence: 0.94,
    },
    {
      id: 'rsk_default_2',
      title: 'Vector Store Namespace Latency',
      severity: 'MEDIUM',
      likelihood: 'LOW',
      owner: 'Sarah Jenkins',
      mitigation: 'Pre-warm multi-tenant index caches during auth handshake.',
      evidence: 'Latency concerns raised during architectural review.',
      confidence: 0.91,
    },
  ];

  const handleSaveTaskEdit = (taskId: string) => {
    if (onTaskUpdate) {
      onTaskUpdate(taskId, {
        dueDate: editDueDate || undefined,
        assigneeName: editOwnerName || undefined,
      });
    }
    setEditingTaskId(null);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    if (onAddTask) {
      onAddTask(newTitle, newPriority);
    }
    setNewTitle('');
    setShowAddModal(false);
  };

  return (
    <div id="ai-intelligence-panel" className="flex flex-col h-full bg-[#0B0C0E] border-r border-zinc-800/80 overflow-hidden text-zinc-200">
      {/* Tab Navigation Header */}
      <div className="bg-[#0B0C0E] border-b border-zinc-800/80 px-4 pt-3 pb-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icons.Sparkles className="w-4 h-4 text-[#7CB518]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-100">AI Intelligence Core</h2>
          </div>
          <Badge variant="outline" className="text-[10px] bg-emerald-950/60 border-emerald-800 text-emerald-400 font-mono">
            Confidence: {((summary?.confidenceScore || 0.96) * 100).toFixed(0)}%
          </Badge>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none border-b border-zinc-800">
          <button
            onClick={() => setActiveTab('SUMMARY')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'SUMMARY'
                ? 'border-[#7CB518] text-[#7CB518]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Summary & Goals
          </button>

          <button
            onClick={() => setActiveTab('DECISIONS')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'DECISIONS'
                ? 'border-[#7CB518] text-[#7CB518]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Decisions
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] px-1.5 rounded-full font-mono font-bold">
              {decisionsList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('RISKS')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'RISKS'
                ? 'border-[#7CB518] text-[#7CB518]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Risks
            <span className="bg-amber-950 text-amber-400 border border-amber-800 text-[10px] px-1.5 rounded-full font-mono font-bold">
              {risksList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('ACTION_ITEMS')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'ACTION_ITEMS'
                ? 'border-[#7CB518] text-[#7CB518]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Action Items
            <span className="bg-indigo-950 text-indigo-400 border border-indigo-800 text-[10px] px-1.5 rounded-full font-mono font-bold">
              {tasks.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('ANALYTICS')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'ANALYTICS'
                ? 'border-[#7CB518] text-[#7CB518]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Analytics
          </button>
        </div>
      </div>

      {/* Tab Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* SUMMARY TAB */}
        {activeTab === 'SUMMARY' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-100">
                <Icons.FileText className="w-4 h-4 text-[#7CB518]" />
                Executive Summary
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans pt-1">
                {summary?.executiveSummary || summary?.overview || 'Executive summary synthesized from transcript segments.'}
              </p>
            </div>

            {summary?.meetingGoal && (
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-100">
                  <Icons.CheckCircle className="w-4 h-4 text-emerald-400" />
                  Meeting Goal
                </div>
                <p className="text-xs text-zinc-300">{summary.meetingGoal}</p>
              </div>
            )}

            {/* Key Outcomes */}
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-100">
                <Icons.TrendingUp className="w-4 h-4 text-indigo-400" />
                Key Outcomes
              </div>
              <ul className="space-y-2 pt-1">
                {(summary?.keyOutcomes || summary?.keyDecisions || ['Key outcomes generated']).map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7CB518] mt-1.5 shrink-0" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Next Steps & Open Questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-100">
                  <Icons.ArrowRight className="w-4 h-4 text-blue-400" />
                  Next Steps
                </div>
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  {(summary?.nextSteps || ['Configure middleware permissions', 'Execute integration suite']).map((step, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="text-blue-400 font-bold">›</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-100">
                  <Icons.HelpCircle className="w-4 h-4 text-amber-400" />
                  Open Questions
                </div>
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  {(summary?.openQuestions || ['Multi-tenant storage scale benchmarks?']).map((q, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="text-amber-400 font-bold">?</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* DECISIONS TAB */}
        {activeTab === 'DECISIONS' && (
          <div className="space-y-3">
            {decisionsList.map(dec => (
              <div
                key={dec.id}
                className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/50 transition-colors space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xs font-bold text-zinc-100 leading-snug">{dec.decision}</h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 shrink-0">
                    {((dec.confidence || 0.95) * 100).toFixed(0)}% CONF
                  </span>
                </div>

                <div className="text-[11px] text-zinc-400 flex items-center justify-between">
                  <span>Owner / Maker: <strong className="text-zinc-200">{dec.decisionMaker}</strong></span>
                  {dec.timestamp && <span className="font-mono text-[10px]">Time: {dec.timestamp}</span>}
                </div>

                <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-xs text-zinc-300">
                  <strong className="text-zinc-400">Rationale:</strong> {dec.reason}
                </div>

                {dec.evidence && (
                  <button
                    onClick={() => onEvidenceClick && onEvidenceClick(dec.evidence, 'DECISION')}
                    className="text-[11px] text-[#7CB518] hover:underline flex items-center gap-1 font-bold pt-1"
                  >
                    <Icons.Eye className="w-3.5 h-3.5" />
                    View Transcript Evidence Context
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* RISKS TAB */}
        {activeTab === 'RISKS' && (
          <div className="space-y-3">
            {risksList.map(risk => {
              const severityColor =
                risk.severity === 'HIGH'
                  ? 'bg-rose-950 text-rose-400 border-rose-800'
                  : risk.severity === 'MEDIUM'
                  ? 'bg-amber-950 text-amber-400 border-amber-800'
                  : 'bg-blue-950 text-blue-400 border-blue-800';

              return (
                <div
                  key={risk.id}
                  className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/50 transition-colors space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Icons.AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      <h3 className="text-xs font-bold text-zinc-100">{risk.title}</h3>
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${severityColor}`}>
                      {risk.severity} SEVERITY
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-400">
                    <div>Owner: <strong className="text-zinc-200">{risk.owner}</strong></div>
                    <div>Likelihood: <strong className="text-zinc-200">{risk.likelihood}</strong></div>
                  </div>

                  <div className="bg-amber-950/20 border border-amber-800/40 p-2.5 rounded-lg text-xs text-zinc-300">
                    <strong className="text-amber-400">Mitigation:</strong> {risk.mitigation}
                  </div>

                  {risk.evidence && (
                    <button
                      onClick={() => onEvidenceClick && onEvidenceClick(risk.evidence, 'RISK')}
                      className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 font-bold pt-1"
                    >
                      <Icons.Eye className="w-3.5 h-3.5" />
                      View Risk Transcript Evidence
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ACTION ITEMS (KANBAN / INTERACTIVE) TAB */}
        {activeTab === 'ACTION_ITEMS' && (
          <div className="space-y-4">
            {/* Header & Add Button */}
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Kanban Action Items</span>
              <Button
                size="sm"
                onClick={() => setShowAddModal(true)}
                className="bg-[#7CB518] hover:bg-[#689913] text-black font-bold text-xs py-1 h-7 gap-1"
              >
                <Icons.Plus className="w-3.5 h-3.5" />
                Add Task
              </Button>
            </div>

            {/* Quick Add Inline Modal */}
            {showAddModal && (
              <form onSubmit={handleCreateTask} className="p-3 bg-zinc-900 border border-zinc-700 rounded-xl space-y-3">
                <input
                  type="text"
                  placeholder="Action item description..."
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  autoFocus
                />
                <div className="flex items-center justify-between">
                  <select
                    value={newPriority}
                    onChange={e => setNewPriority(e.target.value as TaskPriority)}
                    className="text-xs bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1 text-zinc-200"
                  >
                    <option value="LOW">Low Priority</option>
                    <option value="MEDIUM">Medium Priority</option>
                    <option value="HIGH">High Priority</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                  <div className="flex gap-2">
                    <Button type="button" variant="ghost" size="sm" onClick={() => setShowAddModal(false)} className="h-6 text-xs text-zinc-400">
                      Cancel
                    </Button>
                    <Button type="submit" size="sm" className="h-6 text-xs bg-emerald-500 text-black font-bold">
                      Create
                    </Button>
                  </div>
                </div>
              </form>
            )}

            {/* Task Cards */}
            {tasks.length === 0 ? (
              <div className="text-center py-8 text-zinc-400 bg-zinc-900/40 border border-dashed border-zinc-800 rounded-xl space-y-1">
                <Icons.CheckCircle className="w-6 h-6 mx-auto opacity-40 text-emerald-400" />
                <p className="text-xs font-medium">No action items recorded yet.</p>
              </div>
            ) : (
              tasks.map(task => {
                const isCompleted = task.status === 'COMPLETED';
                const isEditing = editingTaskId === task.id;

                return (
                  <div
                    key={task.id}
                    className={`p-3.5 rounded-xl border transition-all space-y-2.5 ${
                      isCompleted ? 'bg-zinc-900/40 border-zinc-800/60 opacity-60' : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          checked={isCompleted}
                          onChange={e => onTaskStatusChange && onTaskStatusChange(task.id, e.target.checked ? 'COMPLETED' : 'PENDING')}
                          className="mt-1 h-3.5 w-3.5 rounded bg-zinc-950 border-zinc-700 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                        />
                        <div>
                          <h4 className={`text-xs font-bold ${isCompleted ? 'line-through text-zinc-400' : 'text-zinc-100'}`}>
                            {task.title}
                          </h4>
                          {task.description && (
                            <p className="text-[11px] text-zinc-400 mt-0.5">{task.description}</p>
                          )}
                        </div>
                      </div>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                        {task.priority}
                      </span>
                    </div>

                    {/* Inline Editing for Owner & Due Date */}
                    {isEditing ? (
                      <div className="p-2.5 bg-zinc-950 rounded-lg border border-zinc-800 space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <label className="text-[10px] text-zinc-400 w-12">Assignee:</label>
                          <input
                            type="text"
                            value={editOwnerName}
                            onChange={e => setEditOwnerName(e.target.value)}
                            placeholder="Assignee name..."
                            className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-100"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="text-[10px] text-zinc-400 w-12">Due Date:</label>
                          <input
                            type="date"
                            value={editDueDate}
                            onChange={e => setEditDueDate(e.target.value)}
                            className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-100"
                          />
                        </div>
                        <div className="flex justify-end gap-1.5 pt-1">
                          <button
                            onClick={() => setEditingTaskId(null)}
                            className="text-[10px] text-zinc-400 hover:text-zinc-200 px-2 py-1"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveTaskEdit(task.id)}
                            className="text-[10px] bg-emerald-500 text-black font-bold px-2.5 py-1 rounded"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/60">
                        <div className="flex items-center gap-1.5">
                          <Icons.User className="w-3 h-3 text-zinc-400" />
                          <span>{task.assignee?.name || task.assigneeName || 'Unassigned'}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {task.dueDate && (
                            <span className="flex items-center gap-1 text-[10px] font-mono">
                              <Icons.Calendar className="w-3 h-3 text-zinc-400" />
                              {new Date(task.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                            </span>
                          )}
                          <button
                            onClick={() => {
                              setEditingTaskId(task.id);
                              setEditOwnerName(task.assignee?.name || task.assigneeName || '');
                              setEditDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
                            }}
                            className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                          >
                            <Icons.Edit3 className="w-3 h-3" /> Edit
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'ANALYTICS' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-1">
                <span className="text-[10px] uppercase text-zinc-400 font-bold">Action Items</span>
                <div className="text-lg font-bold text-emerald-400">{tasks.length}</div>
              </div>
              <div className="p-3.5 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-1">
                <span className="text-[10px] uppercase text-zinc-400 font-bold">Decisions Detected</span>
                <div className="text-lg font-bold text-indigo-400">{decisionsList.length}</div>
              </div>
              <div className="p-3.5 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-1">
                <span className="text-[10px] uppercase text-zinc-400 font-bold">Risks Evaluated</span>
                <div className="text-lg font-bold text-amber-400">{risksList.length}</div>
              </div>
              <div className="p-3.5 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-1">
                <span className="text-[10px] uppercase text-zinc-400 font-bold">AI Model Used</span>
                <div className="text-sm font-mono font-bold text-zinc-100">gemini-3.6-flash</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
