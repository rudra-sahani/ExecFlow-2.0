import React, { useState, useMemo, useRef, useEffect } from 'react';
import { TranscriptSegment } from '../../../types/meeting';
import { Icons } from '../../../components/ui/Icons';
import { getSpeakerColor } from '../utils/speakerColors';

interface TranscriptViewerProps {
  transcript: TranscriptSegment[];
  highlightedEvidenceText?: string;
  onTimestampClick?: (seconds: number) => void;
  isLoading?: boolean;
}

export const TranscriptViewer: React.FC<TranscriptViewerProps> = ({
  transcript,
  highlightedEvidenceText,
  onTimestampClick,
  isLoading,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>('ALL');
  const [selectedSentiment, setSelectedSentiment] = useState<string>('ALL');
  const [autoScroll, setAutoScroll] = useState(true);
  const [activeSegmentId, setActiveSegmentId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Unique speakers
  const uniqueSpeakers = useMemo(() => {
    const map = new Map<string, string>();
    transcript.forEach(seg => {
      map.set(seg.speakerId || seg.speakerName, seg.speakerName);
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [transcript]);

  // Filtered segments
  const filteredSegments = useMemo(() => {
    return transcript.filter(seg => {
      const matchesSpeaker =
        selectedSpeaker === 'ALL' ||
        seg.speakerId === selectedSpeaker ||
        seg.speakerName === selectedSpeaker;

      const matchesQuery =
        !searchQuery ||
        seg.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seg.speakerName.toLowerCase().includes(searchQuery.toLowerCase());

      const sentiment = (seg.sentiment || 'NEUTRAL').toUpperCase();
      const matchesSentiment =
        selectedSentiment === 'ALL' || sentiment === selectedSentiment;

      return matchesSpeaker && matchesQuery && matchesSentiment;
    });
  }, [transcript, selectedSpeaker, searchQuery, selectedSentiment]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSegmentClick = (segment: TranscriptSegment) => {
    setActiveSegmentId(segment.id);
    if (onTimestampClick) {
      onTimestampClick(segment.startTime ?? segment.startTimeSeconds ?? 0);
    }
  };

  // Auto-scroll when evidence text changes or active segment changes
  useEffect(() => {
    if (highlightedEvidenceText && containerRef.current) {
      // Find matching segment
      const targetSeg = transcript.find(s =>
        s.text.toLowerCase().includes(highlightedEvidenceText.toLowerCase())
      );
      if (targetSeg) {
        setActiveSegmentId(targetSeg.id);
        const el = document.getElementById(`seg-${targetSeg.id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, [highlightedEvidenceText, transcript]);

  // Sentiment badge renderer
  const renderSentimentBadge = (sentiment?: string) => {
    const s = (sentiment || 'NEUTRAL').toUpperCase();
    if (s === 'POSITIVE') {
      return (
        <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> POSITIVE
        </span>
      );
    }
    if (s === 'CONCERNED' || s === 'NEGATIVE' || s === 'RISK') {
      return (
        <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-rose-950/80 text-rose-400 border border-rose-800/60 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> CONCERN
        </span>
      );
    }
    return (
      <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-zinc-800 text-zinc-400 border border-zinc-700/60 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" /> NEUTRAL
      </span>
    );
  };

  // Text highlighting
  const renderHighlightedText = (text: string) => {
    if (!searchQuery && !highlightedEvidenceText) return text;

    if (highlightedEvidenceText && text.toLowerCase().includes(highlightedEvidenceText.toLowerCase())) {
      const parts = text.split(new RegExp(`(${highlightedEvidenceText})`, 'gi'));
      return (
        <span>
          {parts.map((part, i) =>
            part.toLowerCase() === highlightedEvidenceText.toLowerCase() ? (
              <mark key={i} className="bg-[#7CB518]/30 text-[#7CB518] font-bold px-1 rounded ring-1 ring-[#7CB518]/50">
                {part}
              </mark>
            ) : (
              part
            )
          )}
        </span>
      );
    }

    if (searchQuery) {
      const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
      return (
        <span>
          {parts.map((part, i) =>
            part.toLowerCase() === searchQuery.toLowerCase() ? (
              <mark key={i} className="bg-indigo-500/30 text-indigo-300 font-bold px-1 rounded ring-1 ring-indigo-400/50">
                {part}
              </mark>
            ) : (
              part
            )
          )}
        </span>
      );
    }

    return text;
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-4 animate-pulse bg-[#0B0C0E] h-full border-r border-zinc-800">
        <div className="h-9 bg-zinc-800 rounded-md w-full"></div>
        <div className="h-20 bg-zinc-900 rounded-md w-full"></div>
        <div className="h-20 bg-zinc-900 rounded-md w-full"></div>
        <div className="h-20 bg-zinc-900 rounded-md w-full"></div>
      </div>
    );
  }

  return (
    <div id="transcript-viewer-container" className="flex flex-col h-full bg-[#0B0C0E] border-r border-zinc-800/80">
      {/* Search & Filter Top Bar */}
      <div className="p-4 border-b border-zinc-800/80 space-y-3 bg-[#0B0C0E]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icons.Transcript className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xs font-bold text-zinc-100 uppercase tracking-wider">
              Transcript Workspace
            </h2>
            <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full font-mono font-bold">
              {filteredSegments.length} Segments
            </span>
          </div>

          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`text-[10px] px-2.5 py-1 rounded-md border flex items-center gap-1.5 transition-colors ${
              autoScroll
                ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300 font-bold'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Icons.Activity className="w-3 h-3" />
            Auto-Scroll
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Icons.Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search transcript, speakers, keywords..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-7 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2 text-zinc-400 hover:text-zinc-200 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Toolbar Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedSpeaker('ALL')}
            className={`text-[10px] px-2.5 py-1 rounded-full font-medium whitespace-nowrap transition-colors ${
              selectedSpeaker === 'ALL'
                ? 'bg-zinc-100 text-zinc-900 font-bold'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800'
            }`}
          >
            All Speakers
          </button>
          {uniqueSpeakers.map(spk => {
            const color = getSpeakerColor(spk.name);
            const isSelected = selectedSpeaker === spk.id;

            return (
              <button
                key={spk.id}
                onClick={() => setSelectedSpeaker(spk.id)}
                className={`text-[10px] px-2.5 py-1 rounded-full font-bold whitespace-nowrap transition-colors border ${
                  isSelected
                    ? `${color.bg} ${color.text} ${color.border} ring-1 ${color.ring}`
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                {spk.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Transcript Segments List */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredSegments.length === 0 ? (
          <div className="text-center py-12 text-zinc-400 space-y-2">
            <Icons.Search className="w-8 h-8 mx-auto opacity-40" />
            <p className="text-xs font-medium">No transcript segments match your filter criteria.</p>
          </div>
        ) : (
          filteredSegments.map(seg => {
            const spkColor = getSpeakerColor(seg.speakerName);
            const isActive = activeSegmentId === seg.id;
            const isEvidenceMatch =
              highlightedEvidenceText &&
              seg.text.toLowerCase().includes(highlightedEvidenceText.toLowerCase());

            return (
              <div
                key={seg.id}
                id={`seg-${seg.id}`}
                onClick={() => handleSegmentClick(seg)}
                className={`group p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-950/40 border-indigo-500/80 ring-1 ring-indigo-500/50'
                    : isEvidenceMatch
                    ? 'bg-emerald-950/40 border-emerald-500/80 ring-1 ring-emerald-500/50'
                    : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900'
                }`}
              >
                {/* Segment Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full font-bold text-[10px] flex items-center justify-center ${spkColor.text} ${spkColor.bg} ring-1 ${spkColor.ring}`}>
                      {seg.speakerName.charAt(0).toUpperCase()}
                    </div>
                    <span className={`text-xs font-bold ${spkColor.text}`}>{seg.speakerName}</span>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        if (onTimestampClick) onTimestampClick(seg.startTime ?? seg.startTimeSeconds ?? 0);
                      }}
                      className="text-[10px] font-mono bg-zinc-950 text-zinc-400 hover:text-emerald-400 px-1.5 py-0.5 rounded border border-zinc-800 transition-colors"
                      title="Click to jump to timestamp"
                    >
                      {formatTime(seg.startTime ?? seg.startTimeSeconds ?? 0)}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {renderSentimentBadge(seg.sentiment)}
                    <span className="text-[10px] text-zinc-400 font-mono">
                      {((seg.confidence || 0.95) * 100).toFixed(0)}% conf
                    </span>
                  </div>
                </div>

                {/* Segment Text Body */}
                <p className="text-xs text-zinc-200 leading-relaxed font-sans pl-8">
                  {renderHighlightedText(seg.text)}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
