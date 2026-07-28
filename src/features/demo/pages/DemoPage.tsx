import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { DemoHeader } from '../components/DemoHeader';
import { NarrationBar } from '../components/NarrationBar';
import { PresentationToolbar } from '../components/PresentationToolbar';
import { Step1Upload } from '../components/steps/Step1Upload';
import { Step2Transcript } from '../components/steps/Step2Transcript';
import { Step3AgentPipeline } from '../components/steps/Step3AgentPipeline';
import { Step4MeetingWorkspace } from '../components/steps/Step4MeetingWorkspace';
import { Step5KnowledgeHub } from '../components/steps/Step5KnowledgeHub';
import { Step6AgentMonitor } from '../components/steps/Step6AgentMonitor';
import { Step7ExecutiveAnalytics } from '../components/steps/Step7ExecutiveAnalytics';
import { Step8AutomationCenter } from '../components/steps/Step8AutomationCenter';
import { DEMO_STEPS } from '../data/demoData';

export const DemoPage: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [narrationEnabled, setNarrationEnabled] = useState(true);
  const navigate = useNavigate();

  const currentStep = DEMO_STEPS[currentStepIndex];

  const handleNext = useCallback(() => {
    setCurrentStepIndex((prev) => (prev < DEMO_STEPS.length - 1 ? prev + 1 : prev));
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentStepIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleRestart = useCallback(() => {
    setCurrentStepIndex(0);
    setIsPlaying(true);
  }, []);

  const handleSkip = useCallback(() => {
    handleNext();
  }, [handleNext]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.key === 'Escape') {
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, navigate]);

  // Auto-play timer loop
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = (6000 / playbackSpeed);
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < DEMO_STEPS.length - 1) {
          return prev + 1;
        } else {
          setIsPlaying(false);
          return prev;
        }
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed]);

  // Calculate estimated total remaining time in seconds
  const estimatedRemainingSeconds = DEMO_STEPS.slice(currentStepIndex).reduce(
    (acc, step) => acc + Math.round(step.estSecondsRemaining / playbackSpeed),
    0
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#7CB518] selection:text-black flex flex-col pb-36 pt-16">
      {/* Top Header Bar */}
      <DemoHeader
        narrationEnabled={narrationEnabled}
        onToggleNarration={() => setNarrationEnabled(!narrationEnabled)}
      />

      {/* Main Product Container Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-5 pt-4">
        {/* Product Demo Header Bar */}
        <div className="bg-[#0F1110] border border-zinc-800 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-white font-heading tracking-tight">
              ExecFlow Demo
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#7CB518]/15 text-[#7CB518] border border-[#7CB518]/30 text-xs font-medium">
              Interactive Presentation
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-zinc-400">
            <div className="flex items-center gap-1.5 bg-[#050505] px-3 py-1.5 rounded-lg border border-zinc-800">
              <span className="text-zinc-500 font-medium">Estimated Time:</span>
              <span className="text-white font-semibold">{Math.floor(estimatedRemainingSeconds / 60)}m {estimatedRemainingSeconds % 60}s</span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#050505] px-3 py-1.5 rounded-lg border border-zinc-800">
              <span className="text-zinc-500 font-medium">Progress:</span>
              <span className="text-white font-semibold">Step {currentStepIndex + 1} of {DEMO_STEPS.length} ({Math.round(((currentStepIndex + 1) / DEMO_STEPS.length) * 100)}%)</span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#050505] px-3 py-1.5 rounded-lg border border-zinc-800">
              <span className="text-zinc-500 font-medium">Current Step:</span>
              <span className="text-white font-semibold">{currentStep.shortLabel}</span>
            </div>
          </div>
        </div>

        {/* Step Narration Bar */}
        <NarrationBar
          narrationText={currentStep.narration}
          stepTitle={currentStep.title}
          narrationEnabled={narrationEnabled}
        />

        {/* Dynamic Step View Stage */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              {currentStepIndex === 0 && <Step1Upload />}
              {currentStepIndex === 1 && <Step2Transcript />}
              {currentStepIndex === 2 && <Step3AgentPipeline />}
              {currentStepIndex === 3 && <Step4MeetingWorkspace />}
              {currentStepIndex === 4 && <Step5KnowledgeHub />}
              {currentStepIndex === 5 && <Step6AgentMonitor />}
              {currentStepIndex === 6 && <Step7ExecutiveAnalytics />}
              {currentStepIndex === 7 && <Step8AutomationCenter />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Fixed Bottom Presentation Toolbar */}
      <PresentationToolbar
        currentStepIndex={currentStepIndex}
        totalSteps={DEMO_STEPS.length}
        steps={DEMO_STEPS}
        isPlaying={isPlaying}
        playbackSpeed={playbackSpeed}
        onNext={handleNext}
        onPrev={handlePrev}
        onRestart={handleRestart}
        onSkip={handleSkip}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onSelectStep={(idx) => {
          setIsPlaying(false);
          setCurrentStepIndex(idx);
        }}
        onChangeSpeed={(speed) => setPlaybackSpeed(speed)}
        estimatedRemainingTimeSeconds={estimatedRemainingSeconds}
      />
    </div>
  );
};

export default DemoPage;
