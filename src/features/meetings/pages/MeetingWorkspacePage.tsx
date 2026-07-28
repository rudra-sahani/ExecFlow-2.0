import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Meeting, TranscriptSegment } from '../../../types/meeting';
import { Task, TaskPriority, TaskStatus } from '../../../types/task';
import { meetingService } from '../../../services/meetingService';
import { taskService } from '../../../services/taskService';
import { useAuthStore } from '../../../store/useAuthStore';
import { MeetingHeader } from '../components/MeetingHeader';
import { MeetingLeftSidebar } from '../components/MeetingLeftSidebar';
import { TranscriptViewer } from '../components/TranscriptViewer';
import { AIIntelligencePanel } from '../components/AIIntelligencePanel';
import { EvidenceViewer } from '../components/EvidenceViewer';
import { ProcessingTimelinePanel } from '../components/ProcessingTimelinePanel';
import { ChatWithMeeting } from '../components/ChatWithMeeting';
import { ShareModal } from '../components/ShareModal';
import { LiveMeetingStudio } from '../components/LiveMeetingStudio';
import { Icons } from '../../../components/ui/Icons';
import { Button } from '../../../components/ui/Button';

export const MeetingWorkspacePage: React.FC = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.user);

  // Primary Data States
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [transcript, setTranscript] = useState<TranscriptSegment[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  // UI States
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isReprocessing, setIsReprocessing] = useState<boolean>(false);
  const [showLiveStudio, setShowLiveStudio] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showProcessingTrace, setShowProcessingTrace] = useState<boolean>(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  // Evidence Inspector State
  const [evidenceViewerState, setEvidenceViewerState] = useState<{
    isOpen: boolean;
    evidenceText?: string;
    sourceType?: 'DECISION' | 'RISK' | 'ACTION_ITEM' | 'SUMMARY';
  }>({ isOpen: false });

  const [highlightedEvidenceText, setHighlightedEvidenceText] = useState<string | undefined>(undefined);

  // Mobile Tab Navigation
  const [activeMobileTab, setActiveMobileTab] = useState<'SIDEBAR' | 'TRANSCRIPT' | 'INSIGHTS'>('TRANSCRIPT');

  // Panel Widths (Desktop)
  const [leftWidth, setLeftWidth] = useState<number>(22); // 22%
  const [centerWidth, setCenterWidth] = useState<number>(45); // 45%
  const [isResizingLeft, setIsResizingLeft] = useState<boolean>(false);
  const [isResizingRight, setIsResizingRight] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load layout preferences from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('execflow_meeting_layout_v5');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.left) setLeftWidth(parsed.left);
        if (parsed.center) setCenterWidth(parsed.center);
      } catch {
        // default
      }
    }
  }, []);

  const saveLayoutWidths = (l: number, c: number) => {
    setLeftWidth(l);
    setCenterWidth(c);
    localStorage.setItem('execflow_meeting_layout_v5', JSON.stringify({ left: l, center: c }));
  };

  // Fetch Workspace Data
  const loadWorkspaceData = async () => {
    if (!meetingId) return;
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const [mtgData, trData, tskData] = await Promise.all([
        meetingService.getMeetingById(meetingId),
        meetingService.getTranscript(meetingId).catch(() => []),
        taskService.getTasks({ meetingId }).catch(() => ({ items: [] })),
      ]);

      setMeeting(mtgData);
      setTranscript(trData || []);
      setTasks(tskData.items || []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Meeting workspace data could not be retrieved.';
      setErrorMsg(msg);
    } fontally: {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWorkspaceData();
  }, [meetingId]);

  // Handlers
  const handleReprocessAI = async () => {
    if (!meetingId) return;
    setIsReprocessing(true);
    try {
      await meetingService.reprocessMeeting(meetingId);
      await loadWorkspaceData();
    } catch {
      setErrorMsg('Failed to reprocess AI intelligence pipeline.');
    } finally {
      setIsReprocessing(false);
    }
  };

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !meetingId) return;

    setIsLoading(true);
    try {
      await meetingService.uploadAudio(meetingId, file);
      await loadWorkspaceData();
    } catch {
      setErrorMsg('Failed to upload audio recording.');
      setIsLoading(false);
    }
  };

  const handleDeleteMeeting = async () => {
    if (!meetingId) return;
    try {
      await meetingService.deleteMeeting(meetingId);
      navigate('/meetings');
    } catch {
      setErrorMsg('Could not delete meeting workspace.');
    }
  };

  const handleTaskStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    try {
      await taskService.updateTaskStatus(taskId, newStatus);
      setTasks(prev =>
        prev.map(t => (t.id === taskId ? { ...t, status: newStatus } : t))
      );
    } catch {
      // fallback
    }
  };

  const handleTaskUpdate = async (taskId: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === taskId
          ? {
              ...t,
              ...updates,
              assignee: updates.assigneeName ? { id: 'usr_custom', name: updates.assigneeName, email: '' } : t.assignee,
            }
          : t
      )
    );
  };

  const handleAddTask = async (title: string, priority: TaskPriority) => {
    if (!meetingId) return;
    try {
      const newTask = await taskService.createTask({
        title,
        priority,
        meetingId,
      });
      setTasks(prev => [newTask, ...prev]);
    } catch {
      const fallbackTask: Task = {
        id: `tsk_local_${Date.now()}`,
        title,
        priority,
        status: 'PENDING',
        creatorId: 'usr_default_execflow',
        meetingId,
        tags: ['User-Added'],
        workspaceId: 'ws_execflow_primary',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTasks(prev => [fallbackTask, ...prev]);
    }
  };

  // Open Evidence Inspector
  const handleOpenEvidence = (text: string, sourceType: 'DECISION' | 'RISK' | 'ACTION_ITEM' | 'SUMMARY' = 'DECISION') => {
    setEvidenceViewerState({
      isOpen: true,
      evidenceText: text,
      sourceType,
    });
    setHighlightedEvidenceText(text);
  };

  // Panel Resizing
  const handleMouseDownLeft = () => setIsResizingLeft(true);
  const handleMouseDownRight = () => setIsResizingRight(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const totalW = window.innerWidth;
      if (isResizingLeft) {
        const newLeftPct = Math.max(15, Math.min(35, (e.clientX / totalW) * 100));
        saveLayoutWidths(newLeftPct, centerWidth);
      } else if (isResizingRight) {
        const remainingW = totalW - e.clientX;
        const newRightPct = Math.max(25, Math.min(45, (remainingW / totalW) * 100));
        const newCenterPct = Math.max(30, 100 - leftWidth - newRightPct);
        saveLayoutWidths(leftWidth, newCenterPct);
      }
    };

    const handleMouseUp = () => {
      setIsResizingLeft(false);
      setIsResizingRight(false);
    };

    if (isResizingLeft || isResizingRight) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingLeft, isResizingRight, leftWidth, centerWidth]);

  if (isLoading && !meeting) {
    return (
      <div className="flex flex-col h-screen bg-[#050505] p-6 space-y-4 animate-pulse">
        <div className="h-16 bg-zinc-900 rounded-xl w-full"></div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-900 rounded-xl"></div>
          <div className="bg-zinc-900 rounded-xl"></div>
          <div className="bg-zinc-900 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (errorMsg && !meeting) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-zinc-100">
        <div className="bg-[#0B0C0E] border border-zinc-800 rounded-2xl shadow-2xl max-w-md w-full p-6 text-center space-y-4">
          <div className="p-3 bg-rose-950 text-rose-400 rounded-full w-12 h-12 mx-auto flex items-center justify-center border border-rose-800">
            <Icons.AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-sm font-bold text-zinc-100">Meeting Intelligence Workspace Unavailable</h2>
          <p className="text-xs text-zinc-400">{errorMsg}</p>
          <div className="pt-2 flex justify-center gap-2">
            <Button variant="outline" onClick={() => navigate('/meetings')} size="sm" className="text-xs border-zinc-700 text-zinc-300">
              Return to Meetings List
            </Button>
            <Button onClick={loadWorkspaceData} size="sm" className="bg-[#7CB518] text-black font-bold hover:bg-[#689913] text-xs">
              Retry Connection
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!meeting) return null;

  const rightWidth = Math.max(25, 100 - leftWidth - centerWidth);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#050505] text-zinc-100">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAudioUpload}
        accept="audio/*,video/*"
        className="hidden"
      />

      {/* Top Header Navigation */}
      <MeetingHeader
        meeting={meeting}
        transcript={transcript}
        tasks={tasks}
        onHostLiveClick={() => setShowLiveStudio(true)}
        onUploadAudioClick={() => fileInputRef.current?.click()}
        onReprocessClick={handleReprocessAI}
        onDeleteClick={() => setShowDeleteModal(true)}
        onShareClick={() => setShowShareModal(true)}
        isReprocessing={isReprocessing}
      />

      {/* Error Toast Banner */}
      {errorMsg && (
        <div className="bg-rose-950/80 border-b border-rose-800 px-6 py-2 flex items-center justify-between text-xs text-rose-300 font-mono">
          <div className="flex items-center gap-2">
            <Icons.AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg(null)} className="font-bold text-rose-400 hover:text-rose-200">✕</button>
        </div>
      )}

      {/* Mobile Workspace Tab Selector */}
      <div className="lg:hidden bg-[#0B0C0E] border-b border-zinc-800 px-4 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveMobileTab('SIDEBAR')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
            activeMobileTab === 'SIDEBAR' ? 'bg-[#7CB518] text-black' : 'bg-zinc-900 text-zinc-400'
          }`}
        >
          Meeting Overview
        </button>
        <button
          onClick={() => setActiveMobileTab('TRANSCRIPT')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
            activeMobileTab === 'TRANSCRIPT' ? 'bg-[#7CB518] text-black' : 'bg-zinc-900 text-zinc-400'
          }`}
        >
          Transcript ({transcript.length})
        </button>
        <button
          onClick={() => setActiveMobileTab('INSIGHTS')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
            activeMobileTab === 'INSIGHTS' ? 'bg-[#7CB518] text-black' : 'bg-zinc-900 text-zinc-400'
          }`}
        >
          AI Insights & Action Items
        </button>
      </div>

      {/* Desktop 3-Panel Resizable Container */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT PANEL: Meetings, Metadata & Participants */}
        <div
          style={{ width: `${leftWidth}%` }}
          className={`h-full flex flex-col shrink-0 ${
            activeMobileTab === 'SIDEBAR' ? 'block w-full' : 'hidden lg:flex'
          }`}
        >
          <MeetingLeftSidebar
            meeting={meeting}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
            onShowProcessingTrace={() => setShowProcessingTrace(true)}
            tasksCount={tasks.length}
          />
        </div>

        {/* Left Resizer */}
        <div
          onMouseDown={handleMouseDownLeft}
          className="hidden lg:block w-1 bg-zinc-800/80 hover:bg-[#7CB518] cursor-col-resize transition-colors z-20"
          title="Resize Left Sidebar"
        />

        {/* CENTER PANEL: Transcript Workspace */}
        <div
          style={{ width: `${centerWidth}%` }}
          className={`h-full flex flex-col shrink-0 ${
            activeMobileTab === 'TRANSCRIPT' ? 'block w-full' : 'hidden lg:flex'
          }`}
        >
          <TranscriptViewer
            transcript={transcript}
            highlightedEvidenceText={highlightedEvidenceText}
            onTimestampClick={() => {}}
            isLoading={isLoading}
          />
        </div>

        {/* Right Resizer */}
        <div
          onMouseDown={handleMouseDownRight}
          className="hidden lg:block w-1 bg-zinc-800/80 hover:bg-[#7CB518] cursor-col-resize transition-colors z-20"
          title="Resize Insights Panel"
        />

        {/* RIGHT PANEL: AI Insights, Decisions, Risks & Kanban Action Items */}
        <div
          style={{ width: `${rightWidth}%` }}
          className={`h-full flex flex-col shrink-0 ${
            activeMobileTab === 'INSIGHTS' ? 'block w-full' : 'hidden lg:flex'
          }`}
        >
          <AIIntelligencePanel
            summary={meeting.summary}
            tasks={tasks}
            onEvidenceClick={(text, srcType) => handleOpenEvidence(text, srcType)}
            onTaskStatusChange={handleTaskStatusChange}
            onTaskUpdate={handleTaskUpdate}
            onAddTask={handleAddTask}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Evidence Inspector Side Panel Overlay */}
      <EvidenceViewer
        isOpen={evidenceViewerState.isOpen}
        onClose={() => setEvidenceViewerState({ isOpen: false })}
        evidenceText={evidenceViewerState.evidenceText}
        sourceType={evidenceViewerState.sourceType}
        title="Verifiable Transcript Evidence"
        onJumpToTranscript={text => {
          setHighlightedEvidenceText(text);
          setActiveMobileTab('TRANSCRIPT');
        }}
      />

      {/* AI Execution Trace Modal */}
      {showProcessingTrace && (
        <ProcessingTimelinePanel
          isOpen={showProcessingTrace}
          onClose={() => setShowProcessingTrace(false)}
        />
      )}

      {/* AI Copilot Chat Widget */}
      <ChatWithMeeting
        meetingId={meeting.id}
        meetingTitle={meeting.title}
        onReferenceClick={textSnippet => {
          setHighlightedEvidenceText(textSnippet);
          setActiveMobileTab('TRANSCRIPT');
        }}
      />

      {/* Live Studio Host */}
      {showLiveStudio && (
        <LiveMeetingStudio
          meetingId={meeting.id}
          meetingTitle={meeting.title}
          currentUserName={currentUser?.fullName || 'Host Executive'}
          onTranscriptAdd={async segment => {
            setTranscript(prev => [...prev, segment]);
            try {
              await meetingService.addTranscriptSegment(meeting.id, segment);
            } catch (err) {
              console.warn('Transcript segment persistence offline:', err);
            }
          }}
          onCommitmentExtracted={async ({ title, priority }) => {
            handleAddTask(title, priority);
          }}
          onRecordingSaved={async (audioBlob) => {
            if (meetingId) {
              const file = new File([audioBlob], `recording_${meetingId}.webm`, { type: 'audio/webm' });
              try {
                await meetingService.uploadAudio(meetingId, file);
                await loadWorkspaceData();
              } catch (e) {
                console.warn('Audio auto-upload skipped:', e);
              }
            }
          }}
          onClose={() => setShowLiveStudio(false)}
        />
      )}

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          meetingTitle={meeting.title}
          onClose={() => setShowShareModal(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0B0C0E] rounded-2xl shadow-2xl border border-zinc-800 max-w-sm w-full p-6 space-y-4 text-zinc-100">
            <div className="flex items-center gap-2 text-rose-400">
              <Icons.Trash className="w-5 h-5" />
              <h3 className="text-sm font-bold">Delete Meeting Workspace?</h3>
            </div>
            <p className="text-xs text-zinc-400">
              Are you sure you want to delete <strong>"{meeting.title}"</strong>? This action cannot be undone and will erase transcripts, decision logs, and risks.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setShowDeleteModal(false)} className="text-xs border-zinc-700 text-zinc-300">
                Cancel
              </Button>
              <Button size="sm" onClick={handleDeleteMeeting} className="text-xs bg-rose-600 text-white font-bold hover:bg-rose-700">
                Delete Workspace
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
