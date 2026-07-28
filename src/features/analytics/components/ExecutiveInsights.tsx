import React from 'react';
import { Sparkles, TrendingUp, AlertCircle, Lightbulb, ArrowRight } from 'lucide-react';
import { AnalyticsReport } from '../../../types/analytics';

interface ExecutiveInsightsProps {
  report: AnalyticsReport;
  onDrillDown: (topic: string) => void;
}

export const ExecutiveInsights: React.FC<ExecutiveInsightsProps> = ({
  report,
  onDrillDown,
}) => {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-800/60 rounded-xl p-5 shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Executive AI Strategic Synthesis
            </h3>
            <p className="text-xs text-indigo-200">
              Auto-generated strategic takeaways synthesised from 38 meetings and 142 action items
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="bg-slate-900/70 p-3.5 rounded-lg border border-indigo-800/50 space-y-2">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <TrendingUp className="w-4 h-4" /> High Execution Velocity
          </div>
          <p className="text-slate-300 leading-relaxed">
            Core Platform Engineering achieved a 92.4% action item completion rate. Autonomous agent task dispatch reduced follow-up lag from 3.2 days to under 1.2 days.
          </p>
          <button
            onClick={() => onDrillDown('Core Platform Engineering')}
            className="text-indigo-300 font-semibold flex items-center gap-1 hover:underline text-[11px]"
          >
            Inspect Team Records <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-slate-900/70 p-3.5 rounded-lg border border-indigo-800/50 space-y-2">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <AlertCircle className="w-4 h-4" /> Infrastructure Risk Concentration
          </div>
          <p className="text-slate-300 leading-relaxed">
            4 recurring risks were flagged during vector memory indexing discussions. Security audit dependencies are currently blocking 2 production pull requests.
          </p>
          <button
            onClick={() => onDrillDown('Security & Infrastructure')}
            className="text-amber-300 font-semibold flex items-center gap-1 hover:underline text-[11px]"
          >
            Review Risk Log <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
