import React, { useState } from 'react';
import {
  X,
  Play,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Clock,
  Code2,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Brain,
  Zap,
} from 'lucide-react';
import { Workflow, SimulationResult } from '../../../types/automation';
import { automationService } from '../../../services/automationService';
import { cn } from '../../../lib/cn';
import toast from 'react-hot-toast';

interface SimulationModeProps {
  workflow: Workflow;
  onClose: () => void;
}

export const SimulationMode: React.FC<SimulationModeProps> = ({ workflow, onClose }) => {
  const [simulation, setSimulation] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const handleStartSimulation = async () => {
    setIsSimulating(true);
    setActiveStepIndex(0);
    try {
      const result = await automationService.simulateWorkflow(workflow);
      setSimulation(result);

      // Playback simulation steps
      for (let i = 0; i < result.steps.length; i++) {
        await new Promise((res) => setTimeout(res, 700));
        setActiveStepIndex(i);
      }
      toast.success('Simulation run completed!');
    } catch (err) {
      toast.error('Simulation failed');
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-purple-900/10 via-slate-900/5 to-indigo-900/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-600 text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Workflow Execution Simulator
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
                  Zero Side-Effects Dry Run
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Simulating: <span className="font-semibold text-slate-700 dark:text-slate-300">{workflow.name}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-6 custom-scrollbar flex-1">
          {/* Controls & Summary Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Dry-Run Simulation Sandbox
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Tests node inputs, decision path conditions, expected outputs, and human approval gates without invoking live external webhooks or APIs.
              </p>
            </div>

            <button
              onClick={handleStartSimulation}
              disabled={isSimulating}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              {isSimulating ? 'Simulating Step-by-Step...' : 'Run Dry Simulation'}
            </button>
          </div>

          {/* Simulation Output Dashboard */}
          {simulation ? (
            <div className="space-y-6">
              {/* Telemetry Overview Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Total Steps</span>
                  <p className="text-lg font-black text-slate-900 dark:text-slate-100">{simulation.totalSteps} Nodes</p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Overall Status</span>
                  <div className="flex items-center gap-1.5">
                    {simulation.overallStatus === 'completed' && (
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                    )}
                    {simulation.overallStatus === 'approval_required' && (
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" /> Paused (Approval Gate)
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Est. Runtime</span>
                  <p className="text-lg font-black text-indigo-600 dark:text-indigo-400 font-mono">
                    {simulation.totalEstimatedDurationMs} ms
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Approval Gates</span>
                  <p className="text-lg font-black text-rose-600 dark:text-rose-400">
                    {simulation.hasApprovalGates ? '1 Gate Required' : 'Auto-Passed'}
                  </p>
                </div>
              </div>

              {/* Step Execution Trace */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-600" /> Step Trace Execution Log
                </h3>

                <div className="space-y-3">
                  {simulation.steps.map((step, idx) => {
                    const isActive = idx === activeStepIndex;
                    const isPassed = idx <= activeStepIndex;

                    return (
                      <div
                        key={step.nodeId}
                        className={cn(
                          'p-4 rounded-xl border transition-all duration-300 space-y-3',
                          isActive
                            ? 'border-purple-500 bg-purple-50/40 dark:bg-purple-950/30 ring-2 ring-purple-500/30 shadow-lg'
                            : isPassed
                            ? 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80'
                            : 'border-slate-200/50 dark:border-slate-800/40 opacity-50 bg-slate-50 dark:bg-slate-900/30'
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                              {step.stepNumber}
                            </span>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                {step.nodeLabel}
                                <span className="px-1.5 py-0.2 text-[9px] font-mono rounded bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase">
                                  {step.nodeType}
                                </span>
                              </h4>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                                {step.logMessage}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-xs">
                            {step.status === 'success' && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> OK
                              </span>
                            )}
                            {step.status === 'paused_for_approval' && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 flex items-center gap-1">
                                <Lock className="w-3 h-3" /> Approval Gate
                              </span>
                            )}
                            <span className="font-mono text-[10px] text-slate-400">
                              {step.expectedDurationMs} ms
                            </span>
                          </div>
                        </div>

                        {/* Node Payload Inspection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800/60 text-[11px]">
                          <div className="p-2.5 rounded-lg bg-slate-900 text-slate-200 font-mono">
                            <span className="text-[10px] text-slate-400 block mb-1">Expected Input:</span>
                            <pre className="text-[10px] overflow-x-auto">
                              {JSON.stringify(step.input, null, 2)}
                            </pre>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-900 text-slate-200 font-mono">
                            <span className="text-[10px] text-slate-400 block mb-1">Simulated Output:</span>
                            <pre className="text-[10px] overflow-x-auto">
                              {JSON.stringify(step.output, null, 2)}
                            </pre>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 space-y-3 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Ready to simulate workflow execution
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Click "Run Dry Simulation" above to trace triggers, decision logic, payloads, and approval gates.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
