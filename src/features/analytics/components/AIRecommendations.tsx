import React, { useState } from 'react';
import { Lightbulb, Check, Sparkles, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { AIRecommendationItem } from '../../../types/analytics';

interface AIRecommendationsProps {
  recommendations: AIRecommendationItem[];
}

export const AIRecommendations: React.FC<AIRecommendationsProps> = ({ recommendations }) => {
  const [appliedIds, setAppliedIds] = useState<string[]>([]);

  const toggleApply = (id: string) => {
    if (appliedIds.includes(id)) {
      setAppliedIds(appliedIds.filter((item) => item !== id));
    } else {
      setAppliedIds([...appliedIds, id]);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              Autonomous Optimization Directives
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              High-ROI executive action items to streamline team cadence and remove friction
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          <Zap className="w-3.5 h-3.5" /> 18.0 Total Hours Potential Weekly Savings
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {recommendations.map((rec) => {
          const isApplied = appliedIds.includes(rec.id);

          return (
            <div
              key={rec.id}
              className={`border rounded-xl p-4 space-y-3 transition-all ${
                isApplied
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                  : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                      {rec.category}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      {rec.impact}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {rec.title}
                  </h4>
                </div>

                <div className="text-right">
                  <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 block">
                    +{rec.estimatedHoursSavedPerWeek} hrs/wk
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Effort: {rec.effort}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {rec.description}
              </p>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {isApplied ? 'Directive active in workspace policies' : 'Ready to apply'}
                </span>

                <button
                  onClick={() => toggleApply(rec.id)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                    isApplied
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                  }`}
                >
                  {isApplied ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Policy Enforced
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" /> {rec.actionText}
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
