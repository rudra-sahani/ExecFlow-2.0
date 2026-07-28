import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  Play,
  Clock,
  User,
  Tag,
  AlertCircle,
  CheckCircle2,
  Trash2,
  ChevronRight,
} from 'lucide-react';
import { PageHeader } from '../../../components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { taskService } from '../../../services/taskService';
import { Task, TaskStatus, TaskPriority } from '../../../types/task';
import toast from 'react-hot-toast';

export const TasksPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeResult, setActiveResult] = useState<{ title: string; result: string } | null>(null);

  // New task form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('MEDIUM');
  const [dueDate, setDueDate] = useState('');

  const { data: tasksData, isLoading } = useQuery({
    queryKey: ['tasksPage', searchTerm, priorityFilter],
    queryFn: () => taskService.getTasks({ search: searchTerm, priority: priorityFilter, pageSize: 100 }),
  });

  const createTaskMutation = useMutation({
    mutationFn: (data: { title: string; description: string; priority: TaskPriority; dueDate?: string }) =>
      taskService.createTask(data),
    onSuccess: (tsk) => {
      toast.success(`Task "${tsk.title}" created successfully!`);
      setShowCreateModal(false);
      setTitle('');
      setDescription('');
      setPriority('MEDIUM');
      setDueDate('');
      queryClient.invalidateQueries({ queryKey: ['tasksPage'] });
      queryClient.invalidateQueries({ queryKey: ['tasksDashboard'] });
    },
    onError: (err: any) => {
      toast.error(err?.message || 'Failed to create task');
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: TaskStatus }) =>
      taskService.updateTaskStatus(id, status),
    onSuccess: () => {
      toast.success('Task status updated');
      queryClient.invalidateQueries({ queryKey: ['tasksPage'] });
      queryClient.invalidateQueries({ queryKey: ['tasksDashboard'] });
    },
  });

  const executeTaskMutation = useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) =>
      taskService.executeAutomatedTask(id).then((res) => ({ ...res, taskTitle: title })),
    onSuccess: (res: any) => {
      toast.success('Agent execution finished!');
      setActiveResult({ title: res.taskTitle, result: res.result });
      queryClient.invalidateQueries({ queryKey: ['tasksPage'] });
    },
    onError: (err: any) => {
      toast.error(err?.message || 'Agent execution failed');
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => taskService.deleteTask(id),
    onSuccess: () => {
      toast.success('Task deleted');
      queryClient.invalidateQueries({ queryKey: ['tasksPage'] });
    },
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    createTaskMutation.mutate({ title, description, priority, dueDate: dueDate || undefined });
  };

  const tasks = tasksData?.items || [];

  const columns: { label: string; status: TaskStatus; color: string }[] = [
    { label: 'To Do', status: 'PENDING', color: 'border-zinc-700' },
    { label: 'In Progress', status: 'IN_PROGRESS', color: 'border-blue-500/50' },
    { label: 'Blocked', status: 'BLOCKED', color: 'border-amber-500/50' },
    { label: 'Completed', status: 'COMPLETED', color: 'border-emerald-500/50' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Task Kanban & Execution Engine"
          description="AI-extracted action items, automated tool execution, and team workflow state"
        />
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#7CB518] hover:bg-[#689913] text-black font-semibold text-xs px-3 py-2 rounded-lg flex items-center gap-1.5"
        >
          <Plus className="h-4 w-4" />
          Create Task
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#111315] border border-[#7CB518]/20 rounded-xl p-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#16181a] border border-zinc-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#7CB518]"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-zinc-400" />
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-[#16181a] border border-zinc-700/80 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#7CB518]"
          >
            <option value="">All Priorities</option>
            <option value="HIGH">High Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="LOW">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Kanban Board */}
      {isLoading ? (
        <div className="text-center py-12 text-zinc-500 font-mono text-xs">Loading tasks...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.status);
            return (
              <div key={col.status} className="bg-[#111315] border border-[#7CB518]/20 rounded-xl p-3 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                    {col.label}
                  </h4>
                  <Badge variant="outline" className="bg-[#16181a] text-zinc-300 text-[10px] font-mono">
                    {colTasks.length}
                  </Badge>
                </div>

                <div className="space-y-3 min-h-[300px]">
                  {colTasks.length === 0 ? (
                    <div className="text-center py-8 text-zinc-600 text-xs">No tasks</div>
                  ) : (
                    colTasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-[#16181a] border border-zinc-800 hover:border-[#7CB518]/40 rounded-lg p-3 space-y-2 text-xs transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <Badge
                            variant="outline"
                            className={
                              task.priority === 'HIGH'
                                ? 'bg-red-500/15 text-red-400 border-red-500/30 text-[10px]'
                                : task.priority === 'MEDIUM'
                                ? 'bg-blue-500/15 text-blue-400 border-blue-500/30 text-[10px]'
                                : 'bg-zinc-500/15 text-zinc-400 border-zinc-500/30 text-[10px]'
                            }
                          >
                            {task.priority}
                          </Badge>
                          <button
                            onClick={() => deleteTaskMutation.mutate(task.id)}
                            className="text-zinc-500 hover:text-red-400"
                            title="Delete Task"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <h5 className="font-bold text-white font-heading">{task.title}</h5>
                        {task.description && (
                          <p className="text-zinc-400 text-[11px] line-clamp-2">{task.description}</p>
                        )}

                        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono pt-2 border-t border-zinc-800">
                          <span>{task.assignee?.name || 'Unassigned'}</span>
                          {task.dueDate && <span>{new Date(task.dueDate).toLocaleDateString()}</span>}
                        </div>

                        {/* Status Change / Execute Buttons */}
                        <div className="pt-2 flex items-center justify-between gap-1">
                          {col.status !== 'COMPLETED' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                updateStatusMutation.mutate({
                                  id: task.id,
                                  status: col.status === 'PENDING' ? 'IN_PROGRESS' : 'COMPLETED',
                                })
                              }
                              className="text-[10px] px-2 py-0.5 h-auto text-zinc-300 border-zinc-700"
                            >
                              Move Next →
                            </Button>
                          )}
                          <Button
                            size="sm"
                            onClick={() => executeTaskMutation.mutate({ id: task.id, title: task.title })}
                            disabled={executeTaskMutation.isPending}
                            className="bg-[#7CB518]/20 hover:bg-[#7CB518]/30 text-[#7CB518] text-[10px] px-2 py-0.5 h-auto flex items-center gap-1 font-mono"
                          >
                            <Play className="h-2.5 w-2.5" />
                            Run Agent
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111315] border border-[#7CB518]/30 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white font-heading">Create New Action Item</h3>
            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Audit enterprise OAuth scope permissions"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#16181a] border border-zinc-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#7CB518]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Details and expected output..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#16181a] border border-zinc-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#7CB518]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as TaskPriority)}
                    className="w-full bg-[#16181a] border border-zinc-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#7CB518]"
                  >
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-[#16181a] border border-zinc-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#7CB518]"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowCreateModal(false)} className="text-xs">
                  Cancel
                </Button>
                <Button type="submit" disabled={createTaskMutation.isPending} className="bg-[#7CB518] text-black font-semibold text-xs">
                  {createTaskMutation.isPending ? 'Creating...' : 'Create Task'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Execution Result Modal */}
      {activeResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111315] border border-[#7CB518]/50 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
              <CheckCircle2 className="h-5 w-5 text-[#7CB518]" />
              <div>
                <h3 className="text-sm font-bold text-white font-heading">Agent Execution Complete</h3>
                <p className="text-[11px] text-zinc-400 font-mono">{activeResult.title}</p>
              </div>
            </div>
            <div className="bg-[#16181a] border border-zinc-800 rounded-lg p-3 text-xs text-zinc-300 font-mono space-y-2 max-h-60 overflow-y-auto leading-relaxed whitespace-pre-wrap">
              {activeResult.result}
            </div>
            <div className="flex justify-end pt-2">
              <Button
                onClick={() => setActiveResult(null)}
                className="bg-[#7CB518] text-black font-semibold text-xs px-4 py-1.5"
              >
                Close Output
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
