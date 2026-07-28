import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  SkipForward,
  Play,
  Pause,
  Clock,
  Keyboard,
  Gauge,
} from 'lucide-react';
import { DemoStepDefinition } from '../types/demoTypes';

interface PresentationToolbarProps {
  currentStepIndex: number;
  totalSteps: number;
  steps: DemoStepDefinition[];
  isPlaying: boolean;
  playbackSpeed: number;
  onNext: () => void;
  onPrev: () => void;
  onRestart: () => void;
  onSkip: () => void;
  onTogglePlay: () => void;
  onSelectStep: (index: number) => void;
  onChangeSpeed: (speed: number) => void;
  estimatedRemainingTimeSeconds: number;
}

export const PresentationToolbar: React.FC<PresentationToolbarProps> = ({
  currentStepIndex,
  totalSteps,
  steps,
  isPlaying,
  playbackSpeed,
  onNext,
  onPrev,
  onRestart,
  onSkip,
  onTogglePlay,
  onSelectStep,
  onChangeSpeed,
  estimatedRemainingTimeSeconds,
}) => {
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);

  const formatRemainingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#050505]/95 border-t border-zinc-800/80 backdrop-blur-2xl px-4 sm:px-8 py-3 space-y-3">
      {/* Top Row: Visual Progress Timeline Dots */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 max-w-7xl mx-auto">
        {steps.map((step, idx) => {
          const isActive = idx === currentStepIndex;
          const isPassed = idx < currentStepIndex;

          return (
            <button
              key={step.id}
              onClick={() => onSelectStep(idx)}
              aria-label={`Go to step ${step.id}: ${step.title}`}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-xs whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#7CB518] text-black font-semibold shadow-md shadow-[#7CB518]/20 scale-[1.02]'
                  : isPassed
                  ? 'bg-[#0F1110] border border-zinc-800 text-zinc-300 hover:text-white'
                  : 'bg-[#050505] border border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <span className="text-[10px] font-sans opacity-80">0{step.id}</span>
              <span>{step.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Main Controls Row */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Step Counter & Estimated Remaining Time */}
        <div className="flex items-center gap-4 text-xs font-sans">
          <div className="text-zinc-300">
            <span className="text-white font-semibold">Step {currentStepIndex + 1}</span>
            <span className="text-zinc-500"> of {totalSteps}</span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-400 bg-[#0F1110] px-2.5 py-1 rounded-lg border border-zinc-800">
            <Clock className="w-3.5 h-3.5 text-[#7CB518]" />
            <span>Est. Remaining:</span>
            <span className="text-white font-semibold">{formatRemainingTime(estimatedRemainingTimeSeconds)}</span>
          </div>
        </div>

        {/* Center: Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={currentStepIndex === 0}
            aria-label="Previous Step"
            className="p-2 rounded-lg bg-[#0F1110] border border-zinc-800 text-zinc-200 hover:bg-[#151817] disabled:opacity-30 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={onTogglePlay}
            aria-label={isPlaying ? 'Pause Auto Play' : 'Start Auto Play'}
            className="px-4 py-2 rounded-lg bg-[#7CB518] hover:bg-[#8DC621] text-black font-semibold text-xs flex items-center gap-2 shadow-md shadow-[#7CB518]/15 transition-all cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 text-black" /> Pause Tour
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current text-black" /> Auto Play Demo
              </>
            )}
          </button>

          <button
            onClick={onNext}
            disabled={currentStepIndex === totalSteps - 1}
            aria-label="Next Step"
            className="p-2 rounded-lg bg-[#0F1110] border border-zinc-800 text-zinc-200 hover:bg-[#151817] disabled:opacity-30 transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-zinc-800 mx-1 hidden sm:block" />

          <button
            onClick={onRestart}
            aria-label="Restart Demo"
            className="p-2 rounded-lg bg-[#0F1110] hover:bg-[#151817] border border-zinc-800 text-zinc-300 hover:text-white transition-all cursor-pointer"
            title="Restart Demo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onSkip}
            aria-label="Skip Step"
            className="p-2 rounded-lg bg-[#0F1110] hover:bg-[#151817] border border-zinc-800 text-zinc-300 hover:text-white transition-all cursor-pointer"
            title="Skip Step"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Speed Control & Keyboard Help Modal Toggle */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1 bg-[#0F1110] p-1 rounded-lg border border-zinc-800">
            <Gauge className="w-3.5 h-3.5 text-[#7CB518] ml-1.5" />
            {[1, 1.5, 2].map((s) => (
              <button
                key={s}
                onClick={() => onChangeSpeed(s)}
                aria-label={`Set speed to ${s}x`}
                className={`px-2 py-0.5 rounded text-[10px] font-sans font-semibold transition-all cursor-pointer ${
                  playbackSpeed === s
                    ? 'bg-[#7CB518] text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
            aria-label="Keyboard Shortcuts"
            className="p-2 rounded-lg bg-[#0F1110] border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Keyboard Shortcuts"
          >
            <Keyboard className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts Popover Modal */}
      {showKeyboardHelp && (
        <div className="fixed bottom-20 right-8 z-50 p-5 rounded-xl bg-[#0F1110] border border-[#7CB518]/30 shadow-2xl text-xs space-y-3 max-w-xs animate-fade-in">
          <div className="flex justify-between items-center border-b border-[#7CB518]/15 pb-2">
            <span className="font-bold text-white font-heading">Keyboard Navigation</span>
            <button
              onClick={() => setShowKeyboardHelp(false)}
              className="text-zinc-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="space-y-2 font-mono text-[11px] text-zinc-300">
            <div className="flex justify-between">
              <span className="px-1.5 py-0.5 rounded bg-[#111315] text-[#95D600] border border-[#7CB518]/20">→</span>
              <span>Next Step</span>
            </div>
            <div className="flex justify-between">
              <span className="px-1.5 py-0.5 rounded bg-[#111315] text-[#95D600] border border-[#7CB518]/20">←</span>
              <span>Previous Step</span>
            </div>
            <div className="flex justify-between">
              <span className="px-1.5 py-0.5 rounded bg-[#111315] text-[#95D600] border border-[#7CB518]/20">Space</span>
              <span>Pause / Auto Play</span>
            </div>
            <div className="flex justify-between">
              <span className="px-1.5 py-0.5 rounded bg-[#111315] text-[#95D600] border border-[#7CB518]/20">Esc</span>
              <span>Exit Demo Mode</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

