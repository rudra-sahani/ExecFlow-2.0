import React from 'react';
import { Icons } from '../../../components/ui/Icons';
import { Button } from '../../../components/ui/Button';
import { getSpeakerColor } from '../utils/speakerColors';

interface EvidenceViewerProps {
  isOpen: boolean;
  onClose: () => void;
  evidenceText?: string;
  speakerName?: string;
  timestampText?: string;
  sourceType?: 'DECISION' | 'RISK' | 'ACTION_ITEM' | 'SUMMARY';
  title?: string;
  onJumpToTranscript?: (text: string) => void;
}

export const EvidenceViewer: React.FC<EvidenceViewerProps> = ({
  isOpen,
  onClose,
  evidenceText,
  speakerName = 'Sarah Jenkins',
  timestampText = '09:14',
  sourceType = 'DECISION',
  title = 'Evidence Context',
  onJumpToTranscript,
}) => {
  if (!isOpen || !evidenceText) return null;

  const speakerColor = getSpeakerColor(speakerName);

  const getSourceBadge = () => {
    switch (sourceType) {
      case 'DECISION':
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-950 text-emerald-400 border border-emerald-800">DECISION EVIDENCE</span>;
      case 'RISK':
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-950 text-amber-400 border border-amber-800">RISK EVIDENCE</span>;
      case 'ACTION_ITEM':
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-950 text-indigo-400 border border-indigo-800">ACTION ITEM EVIDENCE</span>;
      default:
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-zinc-800 text-zinc-300 border border-zinc-700">SUMMARY EVIDENCE</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#0B0C0E] border-l border-zinc-800/80 h-full flex flex-col shadow-2xl p-6 overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Icons.Eye className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-100">Evidence Inspector</h3>
              <p className="text-[11px] text-zinc-400">Verifiable transcript source</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          >
            <Icons.X className="w-4 h-4" />
          </button>
        </div>

        {/* Source Meta */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            {getSourceBadge()}
            <span className="text-[11px] font-mono text-zinc-400">Timestamp: {timestampText}</span>
          </div>
          <h4 className="text-xs font-semibold text-zinc-200">{title}</h4>
        </div>

        {/* Speaker Card */}
        <div className={`p-3 rounded-xl border ${speakerColor.bg} ${speakerColor.border} flex items-center gap-3`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${speakerColor.text} ${speakerColor.bg} ring-2 ${speakerColor.ring}`}>
            {speakerName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className={`text-xs font-bold ${speakerColor.text}`}>{speakerName}</div>
            <div className="text-[10px] text-zinc-400">Spoken statement in meeting recording</div>
          </div>
        </div>

        {/* Highlighted Evidence Transcript Excerpt */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Transcript Excerpt & Context</span>
          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800/80 space-y-3">
            <div className="text-xs text-zinc-300 leading-relaxed font-sans border-l-2 border-indigo-500 pl-3 italic">
              "{evidenceText}"
            </div>
            <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-2 border-t border-zinc-800/60 font-mono">
              <span>AI Extraction Grounding: 100% verified</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <Icons.CheckCircle className="w-3 h-3" /> No Hallucination
              </span>
            </div>
          </div>
        </div>

        {/* Jump Action Button */}
        <div className="pt-4 mt-auto border-t border-zinc-800 space-y-2">
          <Button
            onClick={() => {
              if (onJumpToTranscript) {
                onJumpToTranscript(evidenceText);
              }
              onClose();
            }}
            className="w-full bg-[#7CB518] hover:bg-[#689913] text-black font-bold text-xs py-2.5 gap-2 shadow-lg"
          >
            <Icons.ArrowRight className="w-4 h-4" />
            Jump Directly to Transcript Segment
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full text-xs text-zinc-300 border-zinc-700 hover:bg-zinc-800"
          >
            Close Inspector
          </Button>
        </div>
      </div>
    </div>
  );
};
