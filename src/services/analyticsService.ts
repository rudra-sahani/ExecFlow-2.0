import { apiClient } from './api';
import { AnalyticsOverview, AnalyticsReport, AnalyticsFilterState } from '../types/analytics';

export const analyticsService = {
  async getOverviewMetrics(): Promise<AnalyticsOverview> {
    return apiClient.get<AnalyticsOverview>('/analytics/overview');
  },

  async getFullReport(
    period: '7d' | '30d' | '90d' | 'year' = '30d',
    _filters?: Partial<AnalyticsFilterState>
  ): Promise<AnalyticsReport> {
    const report = await apiClient.get<AnalyticsReport>('/analytics/report', { params: { period } });
    return report;
  },
};
