import React from 'react';
import { Link } from 'react-router-dom';
import { X, Volume2, VolumeX, Sparkles, Building2 } from 'lucide-react';
import { SAMPLE_ORGANIZATION } from '../data/demoData';
import { ExecFlowLogo } from '../../../components/common/ExecFlowLogo';

interface DemoHeaderProps {
  narrationEnabled: boolean;
  onToggleNarration: () => void;
}

export const DemoHeader: React.FC<DemoHeaderProps> = ({
  narrationEnabled,
  onToggleNarration,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/95 backdrop-blur-xl border-b border-zinc-800/80 px-4 sm:px-8 py-3 flex items-center justify-between">
      {/* Brand & Demo Mode Badge */}
      <div className="flex items-center gap-3">
        <ExecFlowLogo to="/" size="sm" showSubtitle={false} />

        <div className="h-4 w-px bg-zinc-800 hidden sm:block" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F1110] border border-zinc-800 text-zinc-300 text-xs font-sans font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#7CB518]" />
          <span>Interactive Demo Mode</span>
        </div>
      </div>

      {/* Target Fictional Organization Branding */}
      <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0F1110] border border-zinc-800 text-xs font-sans text-zinc-400">
        <Building2 className="w-3.5 h-3.5 text-[#7CB518]" />
        <span>Organization:</span>
        <span className="text-white font-medium">{SAMPLE_ORGANIZATION.name}</span>
      </div>

      {/* Controls & Exit */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleNarration}
          aria-label={narrationEnabled ? 'Mute Narration' : 'Enable Narration'}
          className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
            narrationEnabled
              ? 'bg-[#7CB518]/10 border-[#7CB518]/30 text-white'
              : 'bg-[#0F1110] border-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          {narrationEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#7CB518]" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden md:inline">{narrationEnabled ? 'Audio On' : 'Audio Off'}</span>
        </button>

        <Link
          to="/"
          aria-label="Exit Demo Mode"
          className="px-3.5 py-1.5 rounded-lg bg-[#0F1110] hover:bg-[#151817] border border-zinc-800 text-zinc-300 hover:text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Exit Demo</span>
        </Link>
      </div>
    </header>
  );
};

