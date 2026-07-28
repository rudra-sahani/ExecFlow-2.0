import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Brain, Target } from 'lucide-react';
import { PredictiveInsightItem } from '../../../types/analytics';

interface PredictiveInsightsProps {
  insights: PredictiveInsightItem[];
  onDrillDown: (title: string) => void;
}

export const PredictiveInsights: React.FC<PredictiveInsightsProps> = ({
  insights,
  onDrillDown,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              Predictive Intelligence & Anomalies
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Autonomous trend detection and forward-looking operational risk forecasts
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {insights.map((item) => {
          const isPositive = item.trend === 'up' && item.category !== 'risk' && item.category !== 'workload';
          const isRisk = item.category === 'risk' || item.category === 'workload';

          return (
            <div
              key={item.id}
              onClick={() => onDrillDown(item.title)}
              className="bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl p-4 space-y-2.5 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`p-1.5 rounded-lg ${
                    isRisk ? 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {item.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h4>
                </div>

                <span className={`px-2 py-0.5 text-[10px] uppercase font-extrabold rounded-full ${
                  item.impactScore === 'HIGH'
                    ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300'
                    : 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300'
                }`}>
                  {item.impactScore} IMPACT
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.description}
              </p>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold">
                  <Target className="w-3.5 h-3.5" />
                  <span>Rec: {item.recommendation}</span>
                </div>

                <span className="text-slate-400 font-mono">
                  {(item.confidenceScore * 100).toFixed(0)}% AI confidence
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
