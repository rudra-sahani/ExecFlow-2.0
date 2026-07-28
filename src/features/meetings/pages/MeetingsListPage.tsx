import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  Video,
  Plus,
  Search,
  Upload,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { PageHeader } from '../../../components/common/PageHeader';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { meetingService } from '../../../services/meetingService';
import toast from 'react-hot-toast';

export const MeetingsListPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const { data: meetingsResponse, isLoading } = useQuery({
    queryKey: ['meetingsList', searchTerm, statusFilter],
    queryFn: () => meetingService.getMeetings({ search: searchTerm, status: statusFilter, pageSize: 50 }),
  });

  const createMeetingMutation = useMutation({
    mutationFn: (data: { title: string; description: string }) =>
      meetingService.createMeeting({
        title: data.title,
        description: data.description,
        scheduledStartTime: new Date().toISOString(),
        scheduledEndTime: new Date(Date.now() + 3600000).toISOString(),
      }),
    onSuccess: (mtg) => {
      toast.success(`Meeting "${mtg.title}" created successfully!`);
      setShowCreateModal(false);
      setNewTitle('');
      setNewDesc('');
      queryClient.invalidateQueries({ queryKey: ['meetingsList'] });
    },
    onError: (err: any) => {
      toast.error(err?.message || 'Failed to create meeting');
    },
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    createMeetingMutation.mutate({ title: newTitle, description: newDesc });
  };

  const meetings = meetingsResponse?.items || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Meetings & AI Analysis Engine"
          description="Manage, record, upload, and extract AI insights from enterprise synchronization meetings"
        />
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#7CB518] hover:bg-[#689913] text-black font-semibold text-xs px-3 py-2 rounded-lg flex items-center gap-1.5"
        >
          <Plus className="h-4 w-4" />
          Create Meeting
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#111315] border border-[#7CB518]/20 rounded-xl p-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search meetings by title, overview, or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#16181a] border border-zinc-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#7CB518]"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-zinc-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#16181a] border border-zinc-700/80 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#7CB518]"
          >
            <option value="">All Statuses</option>
            <option value="COMPLETED">Completed</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="IN_PROGRESS">In Progress</option>
          </select>
        </div>
      </div>

      {/* Meetings Grid */}
      {isLoading ? (
        <div className="text-center py-12 text-zinc-500 font-mono text-xs">Loading meetings from database...</div>
      ) : meetings.length === 0 ? (
        <Card variant="default" className="bg-[#111315] border-[#7CB518]/20 py-12 text-center space-y-3">
          <Video className="mx-auto h-10 w-10 text-zinc-600" />
          <h4 className="text-sm font-bold text-white font-heading">No meetings found</h4>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Create a new meeting or record an execution sync to start automated multi-agent analysis.
          </p>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#7CB518] text-black font-semibold text-xs px-3 py-2 mt-2"
          >
            Create Meeting
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {meetings.map((mtg) => (
            <Link
              key={mtg.id}
              to={`/meetings/${mtg.id}`}
              className="block bg-[#111315] border border-[#7CB518]/20 hover:border-[#7CB518]/60 rounded-xl p-5 transition-all hover:scale-[1.005] group space-y-3"
            >
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className={
                    mtg.status === 'COMPLETED'
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-xs font-mono'
                      : 'bg-amber-500/15 text-amber-400 border-amber-500/30 text-xs font-mono'
                  }
                >
                  {mtg.status}
                </Badge>
                <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {mtg.actualDurationSeconds ? `${Math.round(mtg.actualDurationSeconds / 60)}m duration` : 'Scheduled'}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-[#95D600] transition-colors font-heading">
                  {mtg.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                  {mtg.summary?.overview || mtg.description || 'No summary available.'}
                </p>
              </div>

              {mtg.summary?.topicsCovered && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {mtg.summary.topicsCovered.slice(0, 3).map((topic, i) => (
                    <span
                      key={i}
                      className="bg-[#16181a] border border-zinc-700 text-zinc-300 text-[10px] px-2 py-0.5 rounded font-mono"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-3 border-t border-[#7CB518]/15 flex items-center justify-between text-xs text-[#7CB518] font-semibold">
                <span className="flex items-center gap-1">
                  Open Workspace <ArrowRight className="h-3 w-3" />
                </span>
                <span className="text-zinc-400 text-[11px] font-mono">
                  {mtg.summary?.actionItemsCount || 0} Action Items
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111315] border border-[#7CB518]/30 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white font-heading">Create New AI Meeting</h3>
            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Meeting Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q3 Architecture & Multi-Agent Sync"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#16181a] border border-zinc-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#7CB518]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Description / Goals</label>
                <textarea
                  rows={3}
                  placeholder="Goals and key alignment topics..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-[#16181a] border border-zinc-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#7CB518]"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowCreateModal(false)} className="text-xs">
                  Cancel
                </Button>
                <Button type="submit" disabled={createMeetingMutation.isPending} className="bg-[#7CB518] text-black font-semibold text-xs">
                  {createMeetingMutation.isPending ? 'Creating...' : 'Create Meeting'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
