import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart3, RefreshCw, AlertCircle, Sparkles, Building2 } from 'lucide-react';
import { analyticsService } from '../../../services/analyticsService';
import {
  AnalyticsFilterState,
  ComparisonState,
} from '../../../types/analytics';
import {
  ExecutiveOverview,
  KPIGrid,
  MeetingTrendChart,
  ProductivityChart,
  DecisionVelocityChart,
  RiskTrendChart,
  AIConfidenceChart,
  AgentPerformanceChart,
  TaskCompletionChart,
  TeamPerformanceTable,
  TimeSavedCard,
  ExecutiveInsights,
  PredictiveInsights,
  AIRecommendations,
  ExportCenter,
  AnalyticsFilters,
  ComparisonPanel,
  DrillDownDrawer,
  AnalyticsSkeleton,
} from '../components';

export const AnalyticsPage: React.FC = () => {
  // Filter state
  const [filters, setFilters] = useState<AnalyticsFilterState>({
    dateRange: '30d',
    workspace: 'all',
    meetingType: 'all',
    team: 'all',
    owner: 'all',
    riskLevel: 'all',
    agent: 'all',
  });

  // Comparison state
  const [comparison, setComparison] = useState<ComparisonState>({
    enabled: false,
    type: 'previous_period',
    targetB: 'previous_period',
  });

  // Drill down drawer state
  const [drillDownState, setDrillDownState] = useState<{
    isOpen: boolean;
    title: string;
  }>({
    isOpen: false,
    title: '',
  });

  const { data: report, isLoading, isError, refetch } = useQuery({
    queryKey: ['analyticsReport', filters.dateRange, filters.workspace, filters.team],
    queryFn: () => analyticsService.getFullReport(filters.dateRange, filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleResetFilters = () => {
    setFilters({
      dateRange: '30d',
      workspace: 'all',
      meetingType: 'all',
      team: 'all',
      owner: 'all',
      riskLevel: 'all',
      agent: 'all',
    });
  };

  const handleOpenDrillDown = (topicOrKey: string, customTitle?: string | number) => {
    const titleText =
      typeof customTitle === 'string'
        ? `${customTitle} (${topicOrKey})`
        : `Drill-Down Inspection: ${topicOrKey}`;

    setDrillDownState({
      isOpen: true,
      title: titleText,
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-indigo-600" /> Executive Analytics & Intelligence Platform
            </h1>
            <p className="text-xs text-slate-500">Loading live operational telemetry...</p>
          </div>
        </div>
        <AnalyticsSkeleton />
      </div>
    );
  }

  if (isError || !report) {
    return (
      <div className="p-12 max-w-xl mx-auto text-center space-y-4">
        <div className="p-3 bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Unable to load Analytics Telemetry</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Failed to fetch executive report metrics from backend service.
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Retry Telemetry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 pb-20">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-md">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                  Executive Intelligence Platform
                </h1>
                <span className="px-2 py-0.5 text-[10px] uppercase font-black tracking-wider rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-500" /> Production Live
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Business intelligence, predictive observations, team velocity, and AI sub-agent observability
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ExportCenter report={report} />
          <button
            onClick={() => refetch()}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Refresh Telemetry"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <AnalyticsFilters
        filters={filters}
        onChange={setFilters}
        onReset={handleResetFilters}
      />

      {/* Comparison Mode Panel */}
      <ComparisonPanel
        comparison={comparison}
        onChange={setComparison}
      />

      {/* Executive Overview KPIs */}
      <ExecutiveOverview
        overview={report.overview}
        onDrillDown={handleOpenDrillDown}
      />

      {/* Supplementary KPI Cards */}
      <KPIGrid
        report={report}
        onDrillDown={handleOpenDrillDown}
      />

      {/* Time Saved ROI Impact Card */}
      <TimeSavedCard
        hoursSaved={report.overview.timeSavedHours}
        totalMeetings={report.overview.totalMeetings}
      />

      {/* Meeting & Task Trends Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MeetingTrendChart
          data={report.trends}
          onDrillDown={(date, count) => handleOpenDrillDown(date, `Meetings on ${date}`)}
        />
        <TaskCompletionChart
          trends={report.trends}
          onDrillDown={(date, count) => handleOpenDrillDown(date, `Tasks completed on ${date}`)}
        />
      </div>

      {/* Productivity & Decision Velocity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductivityChart
          onDrillDown={(team, count) => handleOpenDrillDown(team, `Productivity breakdown for ${team}`)}
        />
        <DecisionVelocityChart
          decisions={report.decisionsBreakdown || []}
          onDrillDown={(cat, count) => handleOpenDrillDown(cat, `Decisions in ${cat}`)}
        />
      </div>

      {/* Risk Trends & AI Pipeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RiskTrendChart
          riskTrends={report.riskTrends || []}
          onDrillDown={(period, count) => handleOpenDrillDown(period, `Risk items for ${period}`)}
        />
        <AIConfidenceChart
          trends={report.trends}
          onDrillDown={(topic, score) => handleOpenDrillDown(topic, `Confidence score telemetry`)}
        />
      </div>

      {/* Agent Performance Subsystem Matrix */}
      <AgentPerformanceChart
        agents={report.agentPerformance || []}
        onDrillDown={(agentName, successRate) => handleOpenDrillDown(agentName, `Sub-Agent Subsystem: ${agentName}`)}
      />

      {/* Team Performance Table */}
      <TeamPerformanceTable
        teams={report.teamPerformance || []}
        onDrillDown={(teamName) => handleOpenDrillDown(teamName, `Department performance: ${teamName}`)}
      />

      {/* Strategic Synthesis, Predictive Insights & Recommendations */}
      <ExecutiveInsights
        report={report}
        onDrillDown={(topic) => handleOpenDrillDown(topic, `Executive takeaway`)}
      />

      <PredictiveInsights
        insights={report.predictiveInsights || []}
        onDrillDown={(title) => handleOpenDrillDown(title, `Predictive forecast detail`)}
      />

      <AIRecommendations
        recommendations={report.aiRecommendations || []}
      />

      {/* Drill-Down Inspection Drawer */}
      <DrillDownDrawer
        isOpen={drillDownState.isOpen}
        title={drillDownState.title}
        onClose={() => setDrillDownState({ isOpen: false, title: '' })}
      />
    </div>
  );
};
