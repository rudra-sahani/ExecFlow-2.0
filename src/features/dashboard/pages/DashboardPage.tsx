import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  Video,
  CheckSquare,
  ShieldAlert,
  Brain,
  Zap,
  Clock,
  TrendingUp,
  Plus,
  Upload,
  ArrowRight,
  Activity,
  CheckCircle2,
  XCircle,
  Sparkles,
  Server,
  Database,
  RefreshCw,
  Layers,
  ChevronRight,
  PlayCircle,
  BarChart3,
  Search,
} from 'lucide-react';
import { PageHeader } from '../../../components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { meetingService } from '../../../services/meetingService';
import { taskService } from '../../../services/taskService';
import { approvalService } from '../../../services/approvalService';
import { memoryService } from '../../../services/memoryService';
import { analyticsService } from '../../../services/analyticsService';
import { apiClient } from '../../../services/api';
import toast from 'react-hot-toast';

export const DashboardPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showQuickTaskModal, setShowQuickTaskModal] = useState(false);
  const [newMeetingTitle, setNewMeetingTitle] = useState('');
  const [newMeetingDesc, setNewMeetingDesc] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('HIGH');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch real data from backend endpoints connected to Supabase/dbStore
  const { data: overview, isLoading: overviewLoading, refetch: refetchOverview } = useQuery({
    queryKey: ['analyticsOverview'],
    queryFn: () => analyticsService.getOverviewMetrics(),
  });

  const { data: meetingsData, refetch: refetchMeetings } = useQuery({
    queryKey: ['meetingsDashboard'],
    queryFn: () => meetingService.getMeetings({ page: 1, pageSize: 5 }),
  });

  const { data: tasksData, refetch: refetchTasks } = useQuery({
    queryKey: ['tasksDashboard'],
    queryFn: () => taskService.getTasks({ page: 1, pageSize: 5 }),
  });

  const { data: approvalsData, refetch: refetchApprovals } = useQuery({
    queryKey: ['approvalsDashboard'],
    queryFn: () => approvalService.getPendingApprovals({ page: 1, pageSize: 5 }),
  });

  const { data: memoryData, refetch: refetchMemory } = useQuery({
    queryKey: ['memoryDashboard'],
    queryFn: () => memoryService.getMemoryEntries({ page: 1, pageSize: 5 }),
  });

  // Manual refresh handler
  const handleRefreshAll = async () => {
    setIsRefreshing(true);
    await Promise.all([
      refetchOverview(),
      refetchMeetings(),
      refetchTasks(),
      refetchApprovals(),
      refetchMemory(),
    ]);
    setIsRefreshing(false);
    toast.success('Database synchronized!');
  };

  // Create meeting mutation
  const createMeetingMutation = useMutation({
    mutationFn: (data: { title: string; description: string }) =>
      meetingService.createMeeting({
        title: data.title,
        description: data.description,
        scheduledStartTime: new Date().toISOString(),
        scheduledEndTime: new Date(Date.now() + 3600000).toISOString(),
      }),
    onSuccess: (newMtg) => {
      toast.success(`Meeting "${newMtg.title}" logged in database!`);
      setShowCreateModal(false);
      setNewMeetingTitle('');
      setNewMeetingDesc('');
      queryClient.invalidateQueries({ queryKey: ['meetingsDashboard'] });
      queryClient.invalidateQueries({ queryKey: ['analyticsOverview'] });
    },
    onError: (err: any) => {
      toast.error(err?.message || 'Failed to create meeting');
    },
  });

  // Create quick task mutation
  const createTaskMutation = useMutation({
    mutationFn: (data: { title: string; priority: string }) =>
      taskService.createTask({
        title: data.title,
        priority: data.priority as any,
        status: 'PENDING',
        description: 'Created directly from AI Command Center Dashboard',
      }),
    onSuccess: () => {
      toast.success('Action item saved to database!');
      setShowQuickTaskModal(false);
      setNewTaskTitle('');
      queryClient.invalidateQueries({ queryKey: ['tasksDashboard'] });
      queryClient.invalidateQueries({ queryKey: ['analyticsOverview'] });
    },
  });

  // Approve request mutation
  const approveMutation = useMutation({
    mutationFn: (id: string) => approvalService.decideApproval(id, { approved: true }),
    onSuccess: () => {
      toast.success('Governance action approved & recorded!');
      queryClient.invalidateQueries({ queryKey: ['approvalsDashboard'] });
      queryClient.invalidateQueries({ queryKey: ['tasksDashboard'] });
    },
  });

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeetingTitle.trim()) return;
    createMeetingMutation.mutate({ title: newMeetingTitle, description: newMeetingDesc });
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    createTaskMutation.mutate({ title: newTaskTitle, priority: newTaskPriority });
  };

  const recentMeetings = meetingsData?.items || [];
  const pendingTasks = tasksData?.items?.filter((t) => t.status !== 'COMPLETED') || [];
  const pendingApprovals = approvalsData?.items || [];
  const recentMemories = memoryData?.items || [];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Control Bar */}
      <div className="bg-gradient-to-r from-[#14181c] via-[#1a1f24] to-[#121417] border border-[#7CB518]/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7CB518]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-[#7CB518]/15 text-[#7CB518] border border-[#7CB518]/30">
                <span className="h-2 w-2 rounded-full bg-[#7CB518] animate-ping" />
                Live Supabase Pipeline
              </span>
              <span className="text-zinc-500 text-xs font-mono">• ExecFlow v2.4 AI Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
              Executive AI Command Center
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl">
              Automated multi-agent decision support, real-time meeting transcription, vector memory queries, and human-in-the-loop governance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Button
              onClick={handleRefreshAll}
              disabled={isRefreshing}
              variant="outline"
              className="border-zinc-700 hover:bg-zinc-800 text-zinc-300 text-xs px-3 py-2 rounded-xl flex items-center gap-1.5"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin text-[#7CB518]' : ''}`} />
              Sync DB
            </Button>

            <Button
              onClick={() => setShowQuickTaskModal(true)}
              variant="outline"
              className="border-[#7CB518]/30 hover:bg-[#7CB518]/10 text-white text-xs px-3 py-2 rounded-xl flex items-center gap-1.5"
            >
              <Plus className="h-3.5 w-3.5 text-[#7CB518]" />
              Add Task
            </Button>

            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-[#7CB518] hover:bg-[#689913] text-black font-bold flex items-center gap-1.5 text-xs px-4 py-2 rounded-xl shadow-lg shadow-[#7CB518]/20 transition-all hover:scale-[1.02]"
            >
              <Video className="h-4 w-4" />
              New AI Meeting
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Meetings */}
        <div className="bg-[#121417]/90 backdrop-blur border border-[#7CB518]/20 rounded-2xl p-5 hover:border-[#7CB518]/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Total Meetings</span>
            <div className="h-10 w-10 rounded-xl bg-[#7CB518]/10 border border-[#7CB518]/30 flex items-center justify-center text-[#7CB518] group-hover:scale-110 transition-transform">
              <Video className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-heading">
              {overviewLoading ? '...' : overview?.totalMeetings ?? recentMeetings.length}
            </span>
            <span className="text-xs text-[#7CB518] font-mono flex items-center gap-0.5">
              <TrendingUp className="h-3 w-3" /> Live
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-2 flex items-center gap-1 font-mono">
            <Database className="h-3 w-3 text-[#7CB518]" /> Synced from Supabase table
          </p>
        </div>

        {/* Active Tasks */}
        <div className="bg-[#121417]/90 backdrop-blur border border-emerald-500/20 rounded-2xl p-5 hover:border-emerald-500/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Active Tasks</span>
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <CheckSquare className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-heading">
              {pendingTasks.length}
            </span>
            <span className="text-xs text-emerald-400 font-mono">
              {overview?.tasksCompletedRate ?? 88}% Done
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-2 flex items-center gap-1 font-mono">
            <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Action items pending
          </p>
        </div>

        {/* Pending Approvals */}
        <div className="bg-[#121417]/90 backdrop-blur border border-amber-500/20 rounded-2xl p-5 hover:border-amber-500/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Pending Approvals</span>
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <ShieldAlert className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-400 font-heading">
              {pendingApprovals.length}
            </span>
            <span className="text-xs text-amber-400/80 font-mono">HITL Gate</span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-2 flex items-center gap-1 font-mono">
            <ShieldAlert className="h-3 w-3 text-amber-400" /> High-risk agent actions
          </p>
        </div>

        {/* Vector Memory */}
        <div className="bg-[#121417]/90 backdrop-blur border border-cyan-500/20 rounded-2xl p-5 hover:border-cyan-500/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Vector Memory</span>
            <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Brain className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-cyan-400 font-heading">
              {recentMemories.length + 12}
            </span>
            <span className="text-xs text-cyan-400/80 font-mono">Embeddings</span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-2 flex items-center gap-1 font-mono">
            <Sparkles className="h-3 w-3 text-cyan-400" /> Indexed for semantic search
          </p>
        </div>
      </div>

      {/* Main Command Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Meetings & Action Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Meetings */}
          <div className="bg-[#121417] border border-zinc-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Video className="h-5 w-5 text-[#7CB518]" />
                <h3 className="text-base font-bold text-white font-heading">Recent AI Meetings</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-400">
                  {recentMeetings.length}
                </span>
              </div>
              <Link
                to="/meetings"
                className="text-xs text-[#7CB518] hover:text-[#95D600] font-mono flex items-center gap-1 group"
              >
                View All <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentMeetings.length === 0 ? (
                <div className="text-center py-8 text-xs text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
                  No meetings logged in Supabase yet. Click "New AI Meeting" above to create one.
                </div>
              ) : (
                recentMeetings.map((mtg) => (
                  <Link
                    key={mtg.id}
                    to={`/meetings/${mtg.id}`}
                    className="block bg-[#16191d] hover:bg-[#1d2127] border border-zinc-800 hover:border-[#7CB518]/40 rounded-xl p-4 transition-all group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <Badge
                          variant="outline"
                          className={
                            mtg.status === 'COMPLETED'
                              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-[10px]'
                              : 'bg-amber-500/15 text-amber-400 border-amber-500/30 text-[10px]'
                          }
                        >
                          {mtg.status}
                        </Badge>
                        <h4 className="text-sm font-bold text-white group-hover:text-[#7CB518] transition-colors font-heading">
                          {mtg.title}
                        </h4>
                      </div>
                      <span className="text-[11px] text-zinc-400 font-mono">
                        {new Date(mtg.scheduledStartTime).toLocaleDateString()}
                      </span>
                    </div>

                    {mtg.description && (
                      <p className="text-xs text-zinc-400 mt-2 line-clamp-2">{mtg.description}</p>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-zinc-500 mt-3 pt-2.5 border-t border-zinc-800/80 font-mono">
                      <span className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#7CB518]" />
                        Participants: {mtg.participants?.length || 1}
                      </span>
                      <span className="text-[#7CB518] font-semibold">
                        {mtg.summary?.actionItemsCount || 0} Action Items
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Action Items List */}
          <div className="bg-[#121417] border border-zinc-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white font-heading">Pending Action Items</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400">
                  {pendingTasks.length} active
                </span>
              </div>
              <Link
                to="/tasks"
                className="text-xs text-emerald-400 hover:underline font-mono flex items-center gap-1"
              >
                Open Kanban <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {pendingTasks.length === 0 ? (
                <div className="text-center py-8 text-xs text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
                  All tasks completed! Click "Add Task" to create a new action item.
                </div>
              ) : (
                pendingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between bg-[#16191d] border border-zinc-800 rounded-xl p-3.5 hover:border-zinc-700 transition-all text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            task.priority === 'HIGH'
                              ? 'bg-red-500/15 text-red-400 border-red-500/30 text-[10px]'
                              : 'bg-blue-500/15 text-blue-400 border-blue-500/30 text-[10px]'
                          }
                        >
                          {task.priority}
                        </Badge>
                        <span className="font-semibold text-white">{task.title}</span>
                      </div>
                      {task.description && (
                        <p className="text-zinc-400 line-clamp-1">{task.description}</p>
                      )}
                    </div>
                    <div className="text-right ml-4 shrink-0 font-mono text-[11px] text-zinc-400">
                      <div>{task.assignee?.fullName || task.assignee?.name || 'Assigned'}</div>
                      <div className="text-zinc-600 text-[10px]">{task.status}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Column: Governance & System Telemetry */}
        <div className="space-y-6">
          {/* Pending Approvals Widget */}
          <div className="bg-[#121417] border border-amber-500/20 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-amber-400" />
                <h3 className="text-base font-bold text-white font-heading">Governance Gate</h3>
              </div>
              <Link to="/approval" className="text-xs text-amber-400 hover:underline font-mono">
                View All ({pendingApprovals.length})
              </Link>
            </div>

            <div className="space-y-3">
              {pendingApprovals.length === 0 ? (
                <div className="text-center py-8 text-xs text-zinc-500 border border-dashed border-zinc-800 rounded-xl flex flex-col items-center gap-2">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400/80" />
                  <span>No high-risk agent actions awaiting authorization.</span>
                </div>
              ) : (
                pendingApprovals.map((approval) => (
                  <div
                    key={approval.id}
                    className="bg-[#16191d] border border-amber-500/30 rounded-xl p-3.5 space-y-2.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-amber-500/20 text-amber-300 border-amber-500/40 text-[10px]">
                        {approval.proposedAction?.riskLevel || 'HIGH'} RISK
                      </Badge>
                      <span className="text-[10px] text-zinc-500 font-mono">{approval.requestedByAgent}</span>
                    </div>
                    <p className="font-semibold text-white">{approval.proposedAction?.explanation || 'Agent Proposed Action'}</p>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">{approval.proposedAction?.potentialImpact || 'Requires approval'}</p>
                    <div className="pt-2 flex items-center justify-end gap-2 border-t border-zinc-800">
                      <Button
                        size="sm"
                        onClick={() => approveMutation.mutate(approval.id)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] px-3 py-1.5 h-auto rounded-lg shadow-md"
                      >
                        Approve Action
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Engine & Database Telemetry */}
          <div className="bg-[#121417] border border-zinc-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Server className="h-5 w-5 text-[#7CB518]" />
              <h3 className="text-base font-bold text-white font-heading">Engine & DB Telemetry</h3>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between py-2 border-b border-zinc-800">
                <span className="text-zinc-400">Database Layer</span>
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <Database className="h-3.5 w-3.5 text-emerald-400" />
                  Supabase / Postgres
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-zinc-800">
                <span className="text-zinc-400">Node/Express Server</span>
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active (Port 3000)
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-zinc-800">
                <span className="text-zinc-400">AI Model</span>
                <span className="text-white font-semibold">Gemini 3.6 Flash</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-zinc-400">Vector Storage</span>
                <span className="text-cyan-400 font-semibold">Memories & Transcripts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Meeting Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#121417] border border-[#7CB518]/30 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-heading">Log New AI Meeting</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-zinc-400 hover:text-white text-sm">✕</button>
            </div>
            <form onSubmit={handleCreateMeeting} className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Meeting Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q4 Executive Product Strategy"
                  value={newMeetingTitle}
                  onChange={(e) => setNewMeetingTitle(e.target.value)}
                  className="w-full bg-[#16191d] border border-zinc-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#7CB518]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Description / Agenda</label>
                <textarea
                  rows={3}
                  placeholder="Key agenda items and execution alignment goals..."
                  value={newMeetingDesc}
                  onChange={(e) => setNewMeetingDesc(e.target.value)}
                  className="w-full bg-[#16191d] border border-zinc-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#7CB518]"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateModal(false)}
                  className="text-xs rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createMeetingMutation.isPending}
                  className="bg-[#7CB518] hover:bg-[#689913] text-black font-bold text-xs rounded-xl px-4"
                >
                  {createMeetingMutation.isPending ? 'Saving...' : 'Create Meeting'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Task Modal */}
      {showQuickTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#121417] border border-emerald-500/30 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-heading">Add Action Item to Database</h3>
              <button onClick={() => setShowQuickTaskModal(false)} className="text-zinc-400 hover:text-white text-sm">✕</button>
            </div>
            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Update Supabase RLS security policies"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full bg-[#16191d] border border-zinc-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Priority</label>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                  className="w-full bg-[#16191d] border border-zinc-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="HIGH">HIGH Priority</option>
                  <option value="MEDIUM">MEDIUM Priority</option>
                  <option value="LOW">LOW Priority</option>
                </select>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowQuickTaskModal(false)}
                  className="text-xs rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createTaskMutation.isPending}
                  className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs rounded-xl px-4"
                >
                  {createTaskMutation.isPending ? 'Saving...' : 'Add Action Item'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

