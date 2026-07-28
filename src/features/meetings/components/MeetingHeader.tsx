import React, { useState } from 'react';
import { Meeting } from '../../../types/meeting';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Icons } from '../../../components/ui/Icons';
import {
  exportMeetingAsPDF,
  exportMeetingAsMarkdown,
  exportMeetingAsDOCX,
  exportMeetingAsJSON,
  exportMeetingAsCSV,
} from '../utils/exportUtils';
import { TranscriptSegment } from '../../../types/meeting';
import { Task } from '../../../types/task';

interface MeetingHeaderProps {
  meeting: Meeting;
  transcript: TranscriptSegment[];
  tasks: Task[];
  onHostLiveClick?: () => void;
  onUploadAudioClick: () => void;
  onReprocessClick: () => void;
  onDeleteClick: () => void;
  onShareClick: () => void;
  isReprocessing: boolean;
}

export const MeetingHeader: React.FC<MeetingHeaderProps> = ({
  meeting,
  transcript,
  tasks,
  onHostLiveClick,
  onUploadAudioClick,
  onReprocessClick,
  onDeleteClick,
  onShareClick,
  isReprocessing,
}) => {
  const [showExportMenu, setShowExportMenu] = useState(false);

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}m ${s}s`;
  };

  const getStatusBadge = (status: Meeting['status']) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <Badge variant="outline" className="gap-1 bg-emerald-950/60 text-emerald-400 border-emerald-800">
            <Icons.CheckCircle className="w-3 h-3 text-emerald-400" /> Completed
          </Badge>
        );
      case 'PROCESSING':
        return (
          <Badge variant="outline" className="gap-1 bg-amber-950/60 text-amber-400 border-amber-800 animate-pulse">
            <Icons.Activity className="w-3 h-3 text-amber-400" /> AI Processing
          </Badge>
        );
      case 'RECORDING':
        return (
          <Badge variant="outline" className="gap-1 bg-rose-950/60 text-rose-400 border-rose-800">
            <Icons.Activity className="w-3 h-3 text-rose-400" /> Recording
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="gap-1 bg-zinc-900 text-zinc-300 border-zinc-700">
            <Icons.Calendar className="w-3 h-3 text-zinc-400" /> Scheduled
          </Badge>
        );
    }
  };

  return (
    <header id="meeting-header" className="bg-[#0B0C0E] border-b border-zinc-800/80 px-6 py-3.5 shadow-md text-zinc-100">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left Info Column */}
        <div className="space-y-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-lg md:text-xl font-bold text-zinc-100 tracking-tight">
              {meeting.title}
            </h1>
            {getStatusBadge(meeting.status)}
            <Badge variant="outline" className="gap-1 border-[#7CB518]/30 text-[#7CB518] bg-[#7CB518]/10 font-mono text-[11px]">
              <Icons.Brain className="w-3.5 h-3.5 text-[#7CB518]" /> Confidence {((meeting.summary?.confidenceScore || 0.96) * 100).toFixed(0)}%
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-xs text-zinc-400 flex-wrap">
            <span className="flex items-center gap-1">
              <Icons.Calendar className="w-3.5 h-3.5 text-zinc-400" />
              {new Date(meeting.scheduledStartTime).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1">
              <Icons.Clock className="w-3.5 h-3.5 text-zinc-400" />
              {new Date(meeting.scheduledStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            {meeting.actualDurationSeconds ? (
              <span className="flex items-center gap-1 font-mono text-[11px]">
                <Icons.Activity className="w-3.5 h-3.5 text-zinc-400" />
                Duration: {formatDuration(meeting.actualDurationSeconds)}
              </span>
            ) : null}

            {/* Participants Stack */}
            <div className="flex items-center gap-1.5 ml-2 border-l border-zinc-800 pl-3">
              <span className="text-zinc-400 text-[11px]">Participants:</span>
              <div className="flex -space-x-1.5 overflow-hidden">
                {meeting.participants.slice(0, 5).map((p, idx) => (
                  <div
                    key={p.id || idx}
                    title={`${p.name} (${p.email || ''})`}
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-zinc-900 bg-zinc-800 text-zinc-200 font-bold text-[10px] flex items-center justify-center overflow-hidden"
                  >
                    {p.avatarUrl ? (
                      <img src={p.avatarUrl} alt={p.name} className="h-full w-full object-cover" />
                    ) : (
                      p.name.charAt(0).toUpperCase()
                    )}
                  </div>
                ))}
                {meeting.participants.length > 5 && (
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800 text-[10px] font-medium text-zinc-400 ring-2 ring-zinc-900 font-mono">
                    +{meeting.participants.length - 5}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Action Suite */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {onHostLiveClick && (
            <Button
              size="sm"
              onClick={onHostLiveClick}
              className="gap-1.5 text-xs bg-[#7CB518] hover:bg-[#689913] text-black font-bold shadow-md h-8"
            >
              <Icons.Activity className="w-3.5 h-3.5 text-black" />
              Live Studio
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={onUploadAudioClick}
            className="gap-1.5 text-xs text-zinc-300 border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 h-8"
          >
            <Icons.Upload className="w-3.5 h-3.5 text-zinc-400" />
            Upload
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onReprocessClick}
            isLoading={isReprocessing}
            className="gap-1.5 text-xs text-indigo-300 border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 h-8"
          >
            <Icons.RefreshCw className={`w-3.5 h-3.5 ${isReprocessing ? 'animate-spin' : ''}`} />
            Reprocess AI
          </Button>

          {/* Export Dropdown Menu */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="gap-1.5 text-xs text-zinc-300 border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 h-8"
            >
              <Icons.Download className="w-3.5 h-3.5 text-zinc-400" />
              Export
              <Icons.ChevronDown className="w-3 h-3 text-zinc-400" />
            </Button>

            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-[#0B0C0E] rounded-xl shadow-2xl border border-zinc-800 py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150 text-zinc-200">
                <button
                  onClick={() => {
                    setShowExportMenu(false);
                    exportMeetingAsPDF(meeting, transcript, tasks);
                  }}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-zinc-800 flex items-center gap-2"
                >
                  <Icons.FileText className="w-3.5 h-3.5 text-rose-400" /> Executive PDF Report
                </button>
                <button
                  onClick={() => {
                    setShowExportMenu(false);
                    exportMeetingAsDOCX(meeting, transcript, tasks);
                  }}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-zinc-800 flex items-center gap-2"
                >
                  <Icons.FileText className="w-3.5 h-3.5 text-blue-400" /> Word DOCX Document
                </button>
                <button
                  onClick={() => {
                    setShowExportMenu(false);
                    exportMeetingAsMarkdown(meeting, transcript, tasks);
                  }}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-zinc-800 flex items-center gap-2"
                >
                  <Icons.FileCode className="w-3.5 h-3.5 text-indigo-400" /> Markdown (.md)
                </button>
                <button
                  onClick={() => {
                    setShowExportMenu(false);
                    exportMeetingAsJSON(meeting, transcript, tasks);
                  }}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-zinc-800 flex items-center gap-2"
                >
                  <Icons.Code className="w-3.5 h-3.5 text-emerald-400" /> JSON Structure (.json)
                </button>
                <button
                  onClick={() => {
                    setShowExportMenu(false);
                    exportMeetingAsCSV(meeting, tasks);
                  }}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-zinc-800 flex items-center gap-2"
                >
                  <Icons.FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" /> CSV Action Items (.csv)
                </button>
              </div>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onShareClick}
            className="gap-1.5 text-xs text-zinc-300 border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 h-8"
          >
            <Icons.Share className="w-3.5 h-3.5 text-zinc-400" />
            Share
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onDeleteClick}
            className="gap-1.5 text-xs text-rose-400 border-rose-900/50 hover:bg-rose-950/30 h-8"
          >
            <Icons.Trash className="w-3.5 h-3.5" />
            Delete
          </Button>
        </div>
      </div>
    </header>
  );
};
