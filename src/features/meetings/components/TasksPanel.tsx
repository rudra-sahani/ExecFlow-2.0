import React, { useState } from 'react';
import { Task, TaskPriority, TaskStatus } from '../../../types/task';
import { Icons } from '../../../components/ui/Icons';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Card, CardContent } from '../../../components/ui/Card';

interface TasksPanelProps {
  tasks: Task[];
  onTaskStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onAddTask: (title: string, priority: TaskPriority) => void;
  onExecuteTask?: (taskId: string) => void;
  onEvidenceClick?: (evidence: string) => void;
  isLoading?: boolean;
}

export const TasksPanel: React.FC<TasksPanelProps> = ({
  tasks,
  onTaskStatusChange,
  onAddTask,
  onExecuteTask,
  onEvidenceClick,
  isLoading,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState<TaskPriority>('MEDIUM');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddTask(newTitle, newPriority);
    setNewTitle('');
    setShowAddModal(false);
  };

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'URGENT':
      case 'HIGH':
        return <Badge variant="danger" className="text-[10px] py-0">{priority}</Badge>;
      case 'MEDIUM':
        return <Badge variant="warning" className="text-[10px] py-0">{priority}</Badge>;
      default:
        return <Badge variant="secondary" className="text-[10px] py-0">{priority}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-3 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-full"></div>
        <div className="h-24 bg-slate-100 rounded w-full"></div>
        <div className="h-24 bg-slate-100 rounded w-full"></div>
      </div>
    );
  }

  return (
    <div id="tasks-panel-container" className="space-y-3">
      {/* Panel Top Action */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2">
          <Icons.Tasks className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs font-semibold text-slate-900">Extracted Action Items</h3>
          <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">
            {tasks.length}
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAddModal(true)}
          className="h-7 text-xs px-2 gap-1 border-slate-300 text-slate-700 hover:bg-slate-50"
        >
          <Icons.Plus className="w-3.5 h-3.5" />
          Add Task
        </Button>
      </div>

      {/* Quick Add Modal / Inline Form */}
      {showAddModal && (
        <form onSubmit={handleCreate} className="p-3 bg-white border border-indigo-200 rounded-lg shadow-sm space-y-2">
          <input
            type="text"
            placeholder="Action item title..."
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
            autoFocus
          />
          <div className="flex items-center justify-between">
            <select
              value={newPriority}
              onChange={e => setNewPriority(e.target.value as TaskPriority)}
              className="text-xs border border-slate-300 rounded px-2 py-1 bg-white text-slate-700"
            >
              <option value="LOW">Low Priority</option>
              <option value="MEDIUM">Medium Priority</option>
              <option value="HIGH">High Priority</option>
              <option value="URGENT">Urgent</option>
            </select>

            <div className="flex gap-1.5">
              <Button type="button" variant="ghost" size="sm" onClick={() => setShowAddModal(false)} className="h-6 text-xs px-2">
                Cancel
              </Button>
              <Button type="submit" size="sm" className="h-6 text-xs px-2 bg-indigo-600 text-white hover:bg-indigo-700">
                Create
              </Button>
            </div>
          </div>
        </form>
      )}

      {/* Tasks List */}
      {tasks.length === 0 ? (
        <div className="text-center py-8 text-slate-400 space-y-1 bg-white border border-dashed border-slate-200 rounded-lg">
          <Icons.CheckCircle className="w-6 h-6 mx-auto opacity-40 text-slate-400" />
          <p className="text-xs font-medium">No tasks recorded for this meeting.</p>
        </div>
      ) : (
        tasks.map(task => {
          const isCompleted = task.status === 'COMPLETED';

          return (
            <Card
              key={task.id}
              variant="default"
              className={`transition-all hover:border-slate-300 ${
                isCompleted ? 'bg-slate-50/70 border-slate-200 opacity-75' : 'bg-white'
              }`}
            >
              <CardContent className="p-3 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={e => onTaskStatusChange(task.id, e.target.checked ? 'COMPLETED' : 'PENDING')}
                      className="mt-0.5 h-3.5 w-3.5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                    />
                    <div>
                      <h4
                        className={`text-xs font-bold ${
                          isCompleted ? 'line-through text-slate-400' : 'text-slate-900'
                        }`}
                      >
                        {task.title}
                      </h4>
                      {task.description && (
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{task.description}</p>
                      )}
                    </div>
                  </div>
                  {getPriorityBadge(task.priority)}
                </div>

                {/* Owner & Deadline Footer */}
                <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-100 pt-2">
                  <div className="flex items-center gap-1">
                    <Icons.User className="w-3 h-3 text-slate-400" />
                    <span>{task.assignee?.name || 'Unassigned'}</span>
                  </div>

                  {task.dueDate && (
                    <div className="flex items-center gap-1">
                      <Icons.Calendar className="w-3 h-3 text-slate-400" />
                      <span>Due {new Date(task.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                    </div>
                  )}
                </div>

                {/* Automation trigger button if available */}
                {task.automatedToolName && !isCompleted && (
                  <div className="pt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onExecuteTask && onExecuteTask(task.id)}
                      className="w-full h-6 text-[11px] text-indigo-700 bg-indigo-50/50 border-indigo-200 hover:bg-indigo-100 gap-1"
                    >
                      <Icons.Play className="w-2.5 h-2.5 text-indigo-600" />
                      Run Tool ({task.automatedToolName})
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
};
